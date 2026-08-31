# CryptoPriceDex — backend CoinLore

Cette version utilise **CoinLore**, une API crypto publique qui ne demande **ni compte ni clé API**.
Le navigateur ne contacte pas directement CoinLore : il passe par le backend Node.js via `/api/crypto/...`.

Les prix source de CoinLore sont en USD. Le backend utilise aussi l'API publique Frankfurter pour convertir automatiquement les montants en EUR et GBP.

## Installation locale

1. Installe Node.js 18+.
2. Dans le dossier du projet : `npm install`
3. Lance : `npm start`
4. Ouvre `http://localhost:3000`

Aucune variable d'environnement ni clé API n'est nécessaire.

## Déploiement

Le projet nécessite un hébergeur Node.js (Render, Railway, Fly.io, VPS, etc.).
Il peut également être adapté en fonctions serverless.

APIs utilisées :
- CoinLore : données crypto publiques, sans clé API.
- Frankfurter : conversion USD → EUR/GBP, sans clé API.


## Logos crypto locaux
Les logos affichés dans les cartes et les fiches détaillées sont chargés depuis `assets/crypto/`. Aucun CDN externe n’est nécessaire pour les images, ce qui évite les problèmes de rendu sur GitHub Pages. Les symboles non inclus utilisent automatiquement `assets/crypto/generic.svg`.
