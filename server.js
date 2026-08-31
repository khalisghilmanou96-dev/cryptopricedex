const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const COINLORE_BASE = 'https://api.coinlore.net/api';
const FRANKFURTER_BASE = 'https://api.frankfurter.dev/v2';

app.disable('x-powered-by');
app.use(express.static(__dirname));

const cache = new Map();
function getCached(key) {
  const item = cache.get(key);
  if (!item || item.expires < Date.now()) { cache.delete(key); return null; }
  return item.value;
}
function setCached(key, value, ttlMs) { cache.set(key, { value, expires: Date.now() + ttlMs }); }

async function fetchJson(url, ttlMs = 0) {
  const key = String(url);
  if (ttlMs) {
    const hit = getCached(key);
    if (hit) return hit;
  }
  const response = await fetch(url, { headers: { accept: 'application/json', 'user-agent': 'CryptoPriceDex/3.0' } });
  if (!response.ok) throw new Error(`API distante: HTTP ${response.status}`);
  const data = await response.json();
  if (ttlMs) setCached(key, data, ttlMs);
  return data;
}

async function usdRate(currency = 'usd') {
  const code = String(currency).toUpperCase();
  if (code === 'USD') return 1;
  if (!['EUR', 'GBP'].includes(code)) return 1;
  const data = await fetchJson(`${FRANKFURTER_BASE}/rate/USD/${code}`, 10 * 60 * 1000);
  return Number(data.rate) || 1;
}

function num(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}
function converted(v, rate) {
  const n = num(v);
  return n === null ? null : n * rate;
}
function tickerData(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
}
function normalizeTicker(c, rate = 1) {
  return {
    id: String(c.id),
    name: c.name,
    symbol: c.symbol,
    market_cap_rank: num(c.rank),
    current_price: converted(c.price_usd, rate),
    market_cap: converted(c.market_cap_usd, rate),
    total_volume: converted(c.volume24 || c.volume24a, rate),
    price_change_percentage_24h: num(c.percent_change_24h),
    circulating_supply: num(c.csupply),
    total_supply: num(c.tsupply),
    max_supply: num(c.msupply),
    percent_change_1h: num(c.percent_change_1h),
    percent_change_7d: num(c.percent_change_7d),
    image: null,
  };
}

app.get('/api/crypto/markets', async (req, res) => {
  try {
    const start = Math.max(0, Number(req.query.start) || 0);
    const limit = Math.min(50, Math.max(1, Number(req.query.limit) || 8));
    const currency = String(req.query.currency || 'eur').toLowerCase();
    const [payload, rate] = await Promise.all([
      fetchJson(`${COINLORE_BASE}/tickers/?start=${start}&limit=${limit}`, 45 * 1000),
      usdRate(currency),
    ]);
    res.set('cache-control', 'public, max-age=30');
    res.json(tickerData(payload).map(c => normalizeTicker(c, rate)));
  } catch (error) {
    console.error(error);
    res.status(502).json({ error: 'Impossible de récupérer les données CoinLore.' });
  }
});

app.get('/api/crypto/search', async (req, res) => {
  try {
    const q = String(req.query.query || '').trim().toLowerCase();
    if (!q) return res.status(400).json({ error: 'Recherche vide.' });
    const currency = String(req.query.currency || 'eur').toLowerCase();
    const assets = await fetchJson(`${COINLORE_BASE}/assets/`, 60 * 60 * 1000);
    const list = Array.isArray(assets) ? assets : (assets?.data || []);
    const matches = list
      .filter(c => [c.name, c.symbol, c.nameid].some(v => String(v || '').toLowerCase().includes(q)))
      .sort((a, b) => {
        const ae = String(a.symbol || '').toLowerCase() === q || String(a.name || '').toLowerCase() === q ? 0 : 1;
        const be = String(b.symbol || '').toLowerCase() === q || String(b.name || '').toLowerCase() === q ? 0 : 1;
        return ae - be || Number(a.rank || 999999) - Number(b.rank || 999999);
      });
    if (!matches.length) return res.status(404).json({ error: 'Crypto introuvable.' });
    const id = matches[0].id;
    const [payload, rate] = await Promise.all([
      fetchJson(`${COINLORE_BASE}/ticker/?id=${encodeURIComponent(id)}`, 45 * 1000),
      usdRate(currency),
    ]);
    const coin = tickerData(payload)[0];
    if (!coin) return res.status(404).json({ error: 'Données de marché indisponibles.' });
    res.json(normalizeTicker(coin, rate));
  } catch (error) {
    console.error(error);
    res.status(502).json({ error: 'Impossible de rechercher sur CoinLore.' });
  }
});

app.get('/api/crypto/coin/:id', async (req, res) => {
  try {
    const id = encodeURIComponent(req.params.id);
    const currency = String(req.query.currency || 'eur').toLowerCase();
    const [tickerPayload, info, rate] = await Promise.all([
      fetchJson(`${COINLORE_BASE}/ticker/?id=${id}`, 45 * 1000),
      fetchJson(`${COINLORE_BASE}/coin/info/?id=${id}`, 10 * 60 * 1000).catch(() => []),
      usdRate(currency),
    ]);
    const ticker = tickerData(tickerPayload)[0];
    if (!ticker) return res.status(404).json({ error: 'Crypto introuvable.' });
    const meta = Array.isArray(info) ? (info[0] || {}) : info;
    const base = normalizeTicker(ticker, rate);
    res.json({
      ...base,
      image: meta.logo || meta.image || null,
      ath: converted(meta.ath_usd ?? meta.ath ?? null, rate),
      ath_date: meta.ath_date || null,
      launch_date: meta.startdate || meta.launch_date || meta.first_price_date || null,
      platform: meta.platform || null,
      website: meta.website || meta.website_url || null,
      explorer: meta.explorer || meta.explorer_url || null,
    });
  } catch (error) {
    console.error(error);
    res.status(502).json({ error: 'Impossible de charger la fiche CoinLore.' });
  }
});

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.listen(PORT, () => {
  console.log(`CryptoPriceDex (CoinLore) disponible sur http://localhost:${PORT}`);
});
