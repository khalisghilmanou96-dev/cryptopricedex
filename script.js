const API_BASE = "/api/crypto";
const PAGE_SIZE = 8;

const CRYPTO_LOGOS = {"ada":"data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22256%22%20height%3D%22256%22%20viewBox%3D%220%200%20256%20256%22%3E%3Ccircle%20cx%3D%22128%22%20cy%3D%22128%22%20r%3D%22112%22%20fill%3D%22%230033ad%22%2F%3E%3Ccircle%20cx%3D%22128%22%20cy%3D%2265%22%20r%3D%226%22%20fill%3D%22%23fff%22%2F%3E%3Ccircle%20cx%3D%22101%22%20cy%3D%2274%22%20r%3D%226%22%20fill%3D%22%23fff%22%2F%3E%3Ccircle%20cx%3D%22155%22%20cy%3D%2274%22%20r%3D%226%22%20fill%3D%22%23fff%22%2F%3E%3Ccircle%20cx%3D%2282%22%20cy%3D%2291%22%20r%3D%226%22%20fill%3D%22%23fff%22%2F%3E%3Ccircle%20cx%3D%22128%22%20cy%3D%2292%22%20r%3D%226%22%20fill%3D%22%23fff%22%2F%3E%3Ccircle%20cx%3D%22174%22%20cy%3D%2291%22%20r%3D%226%22%20fill%3D%22%23fff%22%2F%3E%3Ccircle%20cx%3D%2271%22%20cy%3D%22118%22%20r%3D%226%22%20fill%3D%22%23fff%22%2F%3E%3Ccircle%20cx%3D%22101%22%20cy%3D%22116%22%20r%3D%226%22%20fill%3D%22%23fff%22%2F%3E%3Ccircle%20cx%3D%22155%22%20cy%3D%22116%22%20r%3D%226%22%20fill%3D%22%23fff%22%2F%3E%3Ccircle%20cx%3D%22185%22%20cy%3D%22118%22%20r%3D%226%22%20fill%3D%22%23fff%22%2F%3E%3Ccircle%20cx%3D%2271%22%20cy%3D%22145%22%20r%3D%226%22%20fill%3D%22%23fff%22%2F%3E%3Ccircle%20cx%3D%22101%22%20cy%3D%22148%22%20r%3D%226%22%20fill%3D%22%23fff%22%2F%3E%3Ccircle%20cx%3D%22155%22%20cy%3D%22148%22%20r%3D%226%22%20fill%3D%22%23fff%22%2F%3E%3Ccircle%20cx%3D%22185%22%20cy%3D%22145%22%20r%3D%226%22%20fill%3D%22%23fff%22%2F%3E%3Ccircle%20cx%3D%2282%22%20cy%3D%22170%22%20r%3D%226%22%20fill%3D%22%23fff%22%2F%3E%3Ccircle%20cx%3D%22128%22%20cy%3D%22169%22%20r%3D%226%22%20fill%3D%22%23fff%22%2F%3E%3Ccircle%20cx%3D%22174%22%20cy%3D%22170%22%20r%3D%226%22%20fill%3D%22%23fff%22%2F%3E%3Ccircle%20cx%3D%22101%22%20cy%3D%22187%22%20r%3D%226%22%20fill%3D%22%23fff%22%2F%3E%3Ccircle%20cx%3D%22155%22%20cy%3D%22187%22%20r%3D%226%22%20fill%3D%22%23fff%22%2F%3E%3Ccircle%20cx%3D%22128%22%20cy%3D%22196%22%20r%3D%226%22%20fill%3D%22%23fff%22%2F%3E%3C%2Fsvg%3E","apt":"data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22256%22%20height%3D%22256%22%20viewBox%3D%220%200%20256%20256%22%3E%3Ccircle%20cx%3D%22128%22%20cy%3D%22128%22%20r%3D%22112%22%20fill%3D%22%23111111%22%2F%3E%3Ctext%20x%3D%22128%22%20y%3D%22158%22%20text-anchor%3D%22middle%22%20font-family%3D%22Arial%2CHelvetica%2Csans-serif%22%20font-weight%3D%22800%22%20font-size%3D%2292%22%20fill%3D%22%23ffffff%22%3EA%3C%2Ftext%3E%3C%2Fsvg%3E","arb":"data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22256%22%20height%3D%22256%22%20viewBox%3D%220%200%20256%20256%22%3E%3Ccircle%20cx%3D%22128%22%20cy%3D%22128%22%20r%3D%22112%22%20fill%3D%22%232d374b%22%2F%3E%3Ctext%20x%3D%22128%22%20y%3D%22158%22%20text-anchor%3D%22middle%22%20font-family%3D%22Arial%2CHelvetica%2Csans-serif%22%20font-weight%3D%22800%22%20font-size%3D%2292%22%20fill%3D%22%23ffffff%22%3EA%3C%2Ftext%3E%3C%2Fsvg%3E","atom":"data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22256%22%20height%3D%22256%22%20viewBox%3D%220%200%20256%20256%22%3E%3Ccircle%20cx%3D%22128%22%20cy%3D%22128%22%20r%3D%22112%22%20fill%3D%22%232e3148%22%2F%3E%3Ctext%20x%3D%22128%22%20y%3D%22158%22%20text-anchor%3D%22middle%22%20font-family%3D%22Arial%2CHelvetica%2Csans-serif%22%20font-weight%3D%22800%22%20font-size%3D%2292%22%20fill%3D%22%23ffffff%22%3EA%3C%2Ftext%3E%3C%2Fsvg%3E","avax":"data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22256%22%20height%3D%22256%22%20viewBox%3D%220%200%20256%20256%22%3E%3Ccircle%20cx%3D%22128%22%20cy%3D%22128%22%20r%3D%22112%22%20fill%3D%22%23e84142%22%2F%3E%3Ctext%20x%3D%22128%22%20y%3D%22158%22%20text-anchor%3D%22middle%22%20font-family%3D%22Arial%2CHelvetica%2Csans-serif%22%20font-weight%3D%22800%22%20font-size%3D%2292%22%20fill%3D%22%23ffffff%22%3EA%3C%2Ftext%3E%3C%2Fsvg%3E","bch":"data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22256%22%20height%3D%22256%22%20viewBox%3D%220%200%20256%20256%22%3E%3Ccircle%20cx%3D%22128%22%20cy%3D%22128%22%20r%3D%22112%22%20fill%3D%22%238dc351%22%2F%3E%3Ctext%20x%3D%22128%22%20y%3D%22158%22%20text-anchor%3D%22middle%22%20font-family%3D%22Arial%2CHelvetica%2Csans-serif%22%20font-weight%3D%22800%22%20font-size%3D%2292%22%20fill%3D%22%23ffffff%22%3E%E2%82%BF%3C%2Ftext%3E%3C%2Fsvg%3E","bnb":"data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22256%22%20height%3D%22256%22%20viewBox%3D%220%200%20256%20256%22%3E%3Ccircle%20cx%3D%22128%22%20cy%3D%22128%22%20r%3D%22112%22%20fill%3D%22%23f3ba2f%22%2F%3E%3Cg%20fill%3D%22%23111%22%3E%3Cpath%20d%3D%22M128%2048%2092%2084l20%2020%2016-16%2016%2016%2020-20-36-36Z%22%2F%3E%3Cpath%20d%3D%22m84%2092-28%2028%2020%2020%208-8%208%208%2020-20-28-28Z%22%2F%3E%3Cpath%20d%3D%22m172%2092-28%2028%2020%2020%208-8%208%208%2020-20-28-28Z%22%2F%3E%3Cpath%20d%3D%22m128%20136-36%2036%2036%2036%2036-36-36-36Zm0%2028%208%208-8%208-8-8%208-8Z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E","btc":"data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22256%22%20height%3D%22256%22%20viewBox%3D%220%200%20256%20256%22%3E%3Ccircle%20cx%3D%22128%22%20cy%3D%22128%22%20r%3D%22112%22%20fill%3D%22%23f7931a%22%2F%3E%3Ctext%20x%3D%22128%22%20y%3D%22158%22%20text-anchor%3D%22middle%22%20font-family%3D%22Arial%2CHelvetica%2Csans-serif%22%20font-weight%3D%22800%22%20font-size%3D%2292%22%20fill%3D%22%23ffffff%22%3E%E2%82%BF%3C%2Ftext%3E%3C%2Fsvg%3E","dai":"data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22256%22%20height%3D%22256%22%20viewBox%3D%220%200%20256%20256%22%3E%3Ccircle%20cx%3D%22128%22%20cy%3D%22128%22%20r%3D%22112%22%20fill%3D%22%23f5ac37%22%2F%3E%3Ctext%20x%3D%22128%22%20y%3D%22158%22%20text-anchor%3D%22middle%22%20font-family%3D%22Arial%2CHelvetica%2Csans-serif%22%20font-weight%3D%22800%22%20font-size%3D%2292%22%20fill%3D%22%23ffffff%22%3ED%3C%2Ftext%3E%3C%2Fsvg%3E","doge":"data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22256%22%20height%3D%22256%22%20viewBox%3D%220%200%20256%20256%22%3E%3Ccircle%20cx%3D%22128%22%20cy%3D%22128%22%20r%3D%22112%22%20fill%3D%22%23c2a633%22%2F%3E%3Ctext%20x%3D%22128%22%20y%3D%22158%22%20text-anchor%3D%22middle%22%20font-family%3D%22Arial%2CHelvetica%2Csans-serif%22%20font-weight%3D%22800%22%20font-size%3D%2292%22%20fill%3D%22%23ffffff%22%3E%C3%90%3C%2Ftext%3E%3C%2Fsvg%3E","dot":"data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22256%22%20height%3D%22256%22%20viewBox%3D%220%200%20256%20256%22%3E%3Ccircle%20cx%3D%22128%22%20cy%3D%22128%22%20r%3D%22112%22%20fill%3D%22%23e6007a%22%2F%3E%3Ctext%20x%3D%22128%22%20y%3D%22158%22%20text-anchor%3D%22middle%22%20font-family%3D%22Arial%2CHelvetica%2Csans-serif%22%20font-weight%3D%22800%22%20font-size%3D%2292%22%20fill%3D%22%23ffffff%22%3E%E2%97%8F%3C%2Ftext%3E%3C%2Fsvg%3E","etc":"data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22256%22%20height%3D%22256%22%20viewBox%3D%220%200%20256%20256%22%3E%3Ccircle%20cx%3D%22128%22%20cy%3D%22128%22%20r%3D%22112%22%20fill%3D%22%23328332%22%2F%3E%3Ctext%20x%3D%22128%22%20y%3D%22158%22%20text-anchor%3D%22middle%22%20font-family%3D%22Arial%2CHelvetica%2Csans-serif%22%20font-weight%3D%22800%22%20font-size%3D%2292%22%20fill%3D%22%23ffffff%22%3E%CE%9E%3C%2Ftext%3E%3C%2Fsvg%3E","eth":"data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22256%22%20height%3D%22256%22%20viewBox%3D%220%200%20256%20256%22%3E%3Ccircle%20cx%3D%22128%22%20cy%3D%22128%22%20r%3D%22112%22%20fill%3D%22%23f4f5f8%22%2F%3E%3Cpath%20d%3D%22M128%2034%2073%20128l55%2032%2055-32-55-94Z%22%20fill%3D%22%23343434%22%2F%3E%3Cpath%20d%3D%22M128%20160%2073%20128l55%2077%2055-77-55%2032Z%22%20fill%3D%22%235a5a5a%22%2F%3E%3C%2Fsvg%3E","fil":"data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22256%22%20height%3D%22256%22%20viewBox%3D%220%200%20256%20256%22%3E%3Ccircle%20cx%3D%22128%22%20cy%3D%22128%22%20r%3D%22112%22%20fill%3D%22%230090ff%22%2F%3E%3Ctext%20x%3D%22128%22%20y%3D%22158%22%20text-anchor%3D%22middle%22%20font-family%3D%22Arial%2CHelvetica%2Csans-serif%22%20font-weight%3D%22800%22%20font-size%3D%2292%22%20fill%3D%22%23ffffff%22%3EF%3C%2Ftext%3E%3C%2Fsvg%3E","generic":"data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22256%22%20height%3D%22256%22%20viewBox%3D%220%200%20256%20256%22%3E%3Ccircle%20cx%3D%22128%22%20cy%3D%22128%22%20r%3D%22112%22%20fill%3D%22%23152a25%22%2F%3E%3Ctext%20x%3D%22128%22%20y%3D%22158%22%20text-anchor%3D%22middle%22%20font-family%3D%22Arial%2CHelvetica%2Csans-serif%22%20font-weight%3D%22800%22%20font-size%3D%2292%22%20fill%3D%22%2349e0ad%22%3E%E2%82%BF%3C%2Ftext%3E%3C%2Fsvg%3E","icp":"data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22256%22%20height%3D%22256%22%20viewBox%3D%220%200%20256%20256%22%3E%3Ccircle%20cx%3D%22128%22%20cy%3D%22128%22%20r%3D%22112%22%20fill%3D%22%236b4eff%22%2F%3E%3Ctext%20x%3D%22128%22%20y%3D%22158%22%20text-anchor%3D%22middle%22%20font-family%3D%22Arial%2CHelvetica%2Csans-serif%22%20font-weight%3D%22800%22%20font-size%3D%2292%22%20fill%3D%22%23ffffff%22%3E%E2%88%9E%3C%2Ftext%3E%3C%2Fsvg%3E","inj":"data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22256%22%20height%3D%22256%22%20viewBox%3D%220%200%20256%20256%22%3E%3Ccircle%20cx%3D%22128%22%20cy%3D%22128%22%20r%3D%22112%22%20fill%3D%22%2300b8d9%22%2F%3E%3Ctext%20x%3D%22128%22%20y%3D%22158%22%20text-anchor%3D%22middle%22%20font-family%3D%22Arial%2CHelvetica%2Csans-serif%22%20font-weight%3D%22800%22%20font-size%3D%2292%22%20fill%3D%22%23ffffff%22%3EI%3C%2Ftext%3E%3C%2Fsvg%3E","link":"data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22256%22%20height%3D%22256%22%20viewBox%3D%220%200%20256%20256%22%3E%3Ccircle%20cx%3D%22128%22%20cy%3D%22128%22%20r%3D%22112%22%20fill%3D%22%232a5ada%22%2F%3E%3Ctext%20x%3D%22128%22%20y%3D%22158%22%20text-anchor%3D%22middle%22%20font-family%3D%22Arial%2CHelvetica%2Csans-serif%22%20font-weight%3D%22800%22%20font-size%3D%2292%22%20fill%3D%22%23ffffff%22%3EL%3C%2Ftext%3E%3C%2Fsvg%3E","ltc":"data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22256%22%20height%3D%22256%22%20viewBox%3D%220%200%20256%20256%22%3E%3Ccircle%20cx%3D%22128%22%20cy%3D%22128%22%20r%3D%22112%22%20fill%3D%22%23345d9d%22%2F%3E%3Ctext%20x%3D%22128%22%20y%3D%22158%22%20text-anchor%3D%22middle%22%20font-family%3D%22Arial%2CHelvetica%2Csans-serif%22%20font-weight%3D%22800%22%20font-size%3D%2292%22%20fill%3D%22%23ffffff%22%3E%C5%81%3C%2Ftext%3E%3C%2Fsvg%3E","matic":"data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22256%22%20height%3D%22256%22%20viewBox%3D%220%200%20256%20256%22%3E%3Ccircle%20cx%3D%22128%22%20cy%3D%22128%22%20r%3D%22112%22%20fill%3D%22%238247e5%22%2F%3E%3Ctext%20x%3D%22128%22%20y%3D%22158%22%20text-anchor%3D%22middle%22%20font-family%3D%22Arial%2CHelvetica%2Csans-serif%22%20font-weight%3D%22800%22%20font-size%3D%2292%22%20fill%3D%22%23ffffff%22%3EM%3C%2Ftext%3E%3C%2Fsvg%3E","near":"data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22256%22%20height%3D%22256%22%20viewBox%3D%220%200%20256%20256%22%3E%3Ccircle%20cx%3D%22128%22%20cy%3D%22128%22%20r%3D%22112%22%20fill%3D%22%23111111%22%2F%3E%3Ctext%20x%3D%22128%22%20y%3D%22158%22%20text-anchor%3D%22middle%22%20font-family%3D%22Arial%2CHelvetica%2Csans-serif%22%20font-weight%3D%22800%22%20font-size%3D%2292%22%20fill%3D%22%23ffffff%22%3EN%3C%2Ftext%3E%3C%2Fsvg%3E","op":"data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22256%22%20height%3D%22256%22%20viewBox%3D%220%200%20256%20256%22%3E%3Ccircle%20cx%3D%22128%22%20cy%3D%22128%22%20r%3D%22112%22%20fill%3D%22%23ff0420%22%2F%3E%3Ctext%20x%3D%22128%22%20y%3D%22158%22%20text-anchor%3D%22middle%22%20font-family%3D%22Arial%2CHelvetica%2Csans-serif%22%20font-weight%3D%22800%22%20font-size%3D%2256%22%20fill%3D%22%23ffffff%22%3EOP%3C%2Ftext%3E%3C%2Fsvg%3E","pol":"data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22256%22%20height%3D%22256%22%20viewBox%3D%220%200%20256%20256%22%3E%3Ccircle%20cx%3D%22128%22%20cy%3D%22128%22%20r%3D%22112%22%20fill%3D%22%238247e5%22%2F%3E%3Ctext%20x%3D%22128%22%20y%3D%22158%22%20text-anchor%3D%22middle%22%20font-family%3D%22Arial%2CHelvetica%2Csans-serif%22%20font-weight%3D%22800%22%20font-size%3D%2292%22%20fill%3D%22%23ffffff%22%3EP%3C%2Ftext%3E%3C%2Fsvg%3E","shib":"data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22256%22%20height%3D%22256%22%20viewBox%3D%220%200%20256%20256%22%3E%3Ccircle%20cx%3D%22128%22%20cy%3D%22128%22%20r%3D%22112%22%20fill%3D%22%23f00500%22%2F%3E%3Ctext%20x%3D%22128%22%20y%3D%22158%22%20text-anchor%3D%22middle%22%20font-family%3D%22Arial%2CHelvetica%2Csans-serif%22%20font-weight%3D%22800%22%20font-size%3D%2292%22%20fill%3D%22%23ffffff%22%3ES%3C%2Ftext%3E%3C%2Fsvg%3E","sol":"data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22256%22%20height%3D%22256%22%20viewBox%3D%220%200%20256%20256%22%3E%3Ccircle%20cx%3D%22128%22%20cy%3D%22128%22%20r%3D%22112%22%20fill%3D%22%23101218%22%2F%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20stop-color%3D%22%2300ffa3%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23dc1fff%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Cg%20fill%3D%22url(%23g)%22%3E%3Cpath%20d%3D%22M72%2074h100l20%2020H92L72%2074Z%22%2F%3E%3Cpath%20d%3D%22M92%20108h100l-20%2020H72l20-20Z%22%2F%3E%3Cpath%20d%3D%22M72%20142h100l20%2020H92l-20-20Z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E","steth":"data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22256%22%20height%3D%22256%22%20viewBox%3D%220%200%20256%20256%22%3E%3Ccircle%20cx%3D%22128%22%20cy%3D%22128%22%20r%3D%22112%22%20fill%3D%22%2300a3ff%22%2F%3E%3Ctext%20x%3D%22128%22%20y%3D%22158%22%20text-anchor%3D%22middle%22%20font-family%3D%22Arial%2CHelvetica%2Csans-serif%22%20font-weight%3D%22800%22%20font-size%3D%2292%22%20fill%3D%22%23ffffff%22%3EE%3C%2Ftext%3E%3C%2Fsvg%3E","ton":"data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22256%22%20height%3D%22256%22%20viewBox%3D%220%200%20256%20256%22%3E%3Ccircle%20cx%3D%22128%22%20cy%3D%22128%22%20r%3D%22112%22%20fill%3D%22%230098ea%22%2F%3E%3Ctext%20x%3D%22128%22%20y%3D%22158%22%20text-anchor%3D%22middle%22%20font-family%3D%22Arial%2CHelvetica%2Csans-serif%22%20font-weight%3D%22800%22%20font-size%3D%2292%22%20fill%3D%22%23ffffff%22%3ET%3C%2Ftext%3E%3C%2Fsvg%3E","trx":"data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22256%22%20height%3D%22256%22%20viewBox%3D%220%200%20256%20256%22%3E%3Ccircle%20cx%3D%22128%22%20cy%3D%22128%22%20r%3D%22112%22%20fill%3D%22%23ef0027%22%2F%3E%3Ctext%20x%3D%22128%22%20y%3D%22158%22%20text-anchor%3D%22middle%22%20font-family%3D%22Arial%2CHelvetica%2Csans-serif%22%20font-weight%3D%22800%22%20font-size%3D%2292%22%20fill%3D%22%23ffffff%22%3ET%3C%2Ftext%3E%3C%2Fsvg%3E","uni":"data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22256%22%20height%3D%22256%22%20viewBox%3D%220%200%20256%20256%22%3E%3Ccircle%20cx%3D%22128%22%20cy%3D%22128%22%20r%3D%22112%22%20fill%3D%22%23ff007a%22%2F%3E%3Ctext%20x%3D%22128%22%20y%3D%22158%22%20text-anchor%3D%22middle%22%20font-family%3D%22Arial%2CHelvetica%2Csans-serif%22%20font-weight%3D%22800%22%20font-size%3D%2292%22%20fill%3D%22%23ffffff%22%3EU%3C%2Ftext%3E%3C%2Fsvg%3E","usdc":"data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22256%22%20height%3D%22256%22%20viewBox%3D%220%200%20256%20256%22%3E%3Ccircle%20cx%3D%22128%22%20cy%3D%22128%22%20r%3D%22112%22%20fill%3D%22%232775ca%22%2F%3E%3Ctext%20x%3D%22128%22%20y%3D%22158%22%20text-anchor%3D%22middle%22%20font-family%3D%22Arial%2CHelvetica%2Csans-serif%22%20font-weight%3D%22800%22%20font-size%3D%2292%22%20fill%3D%22%23ffffff%22%3E%24%3C%2Ftext%3E%3C%2Fsvg%3E","usdt":"data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22256%22%20height%3D%22256%22%20viewBox%3D%220%200%20256%20256%22%3E%3Ccircle%20cx%3D%22128%22%20cy%3D%22128%22%20r%3D%22112%22%20fill%3D%22%2326a17b%22%2F%3E%3Ctext%20x%3D%22128%22%20y%3D%22158%22%20text-anchor%3D%22middle%22%20font-family%3D%22Arial%2CHelvetica%2Csans-serif%22%20font-weight%3D%22800%22%20font-size%3D%2292%22%20fill%3D%22%23ffffff%22%3E%E2%82%AE%3C%2Ftext%3E%3C%2Fsvg%3E","xlm":"data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22256%22%20height%3D%22256%22%20viewBox%3D%220%200%20256%20256%22%3E%3Ccircle%20cx%3D%22128%22%20cy%3D%22128%22%20r%3D%22112%22%20fill%3D%22%23000000%22%2F%3E%3Ctext%20x%3D%22128%22%20y%3D%22158%22%20text-anchor%3D%22middle%22%20font-family%3D%22Arial%2CHelvetica%2Csans-serif%22%20font-weight%3D%22800%22%20font-size%3D%2292%22%20fill%3D%22%23ffffff%22%3EX%3C%2Ftext%3E%3C%2Fsvg%3E","xrp":"data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22256%22%20height%3D%22256%22%20viewBox%3D%220%200%20256%20256%22%3E%3Ccircle%20cx%3D%22128%22%20cy%3D%22128%22%20r%3D%22112%22%20fill%3D%22%2323292f%22%2F%3E%3Ctext%20x%3D%22128%22%20y%3D%22158%22%20text-anchor%3D%22middle%22%20font-family%3D%22Arial%2CHelvetica%2Csans-serif%22%20font-weight%3D%22800%22%20font-size%3D%2292%22%20fill%3D%22%23ffffff%22%3EX%3C%2Ftext%3E%3C%2Fsvg%3E"};

const FALLBACK_IMAGE = CRYPTO_LOGOS.generic;

function cryptoLogo(symbol) {
  const clean = String(symbol || "").toLowerCase().replace(/[^a-z0-9]/g, "");
  if (!clean) return FALLBACK_IMAGE;
  const aliases = { wbtc: "btc", weth: "eth", busd: "bnb", usdttrc20: "usdt", usdceth: "usdc" };
  return CRYPTO_LOGOS[aliases[clean] || clean] || FALLBACK_IMAGE;
}
function setImageFallback(img) {
  img.onerror = null;
  img.src = FALLBACK_IMAGE;
}

const grid = document.querySelector("#cryptoGrid");
const statusEl = document.querySelector("#status");
const searchInput = document.querySelector("#searchInput");
const currencySelect = document.querySelector("#currencySelect");
const searchButton = document.querySelector("#searchButton");
const randomButton = document.querySelector("#randomButton");
const loadMoreButton = document.querySelector("#loadMoreButton");
const cardTemplate = document.querySelector("#cryptoCardTemplate");
const dialog = document.querySelector("#cryptoDialog");
const details = document.querySelector("#cryptoDetails");
const closeDialogButton = document.querySelector("#closeDialogButton");

let loadedCount = 0;
let loadedEntities = [];

function setStatus(message = "") { statusEl.textContent = message; }
function safe(value, fallback = "—") { return value ?? fallback; }
function currencyCode() { return currencySelect.value.toUpperCase(); }
function formatMoney(value, digits = 2) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) return "—";
  const n = Number(value);
  const maxDigits = Math.abs(n) < 1 ? 8 : digits;
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: currencyCode(), maximumFractionDigits: maxDigits }).format(n);
}
function formatCompact(value) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) return "—";
  return new Intl.NumberFormat("fr-FR", { notation: "compact", maximumFractionDigits: 2 }).format(Number(value));
}
function formatPercent(value) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) return "—";
  const n = Number(value);
  return `${n >= 0 ? "+" : ""}${n.toFixed(2)} %`;
}
async function fetchJson(url) {
  const response = await fetch(url, { headers: { accept: "application/json" } });
  if (!response.ok) throw new Error(`Erreur API (${response.status})`);
  return response.json();
}
async function directUsdRate(currency) {
  const code = String(currency || "usd").toUpperCase();
  if (code === "USD") return 1;
  if (!["EUR", "GBP"].includes(code)) return 1;
  const data = await fetchJson(`https://api.frankfurter.dev/v2/rate/USD/${code}`);
  return Number(data.rate) || 1;
}
function directNormalize(c, rate = 1) {
  const n = v => { const x = Number(v); return Number.isFinite(x) ? x : null; };
  const cv = v => { const x = n(v); return x === null ? null : x * rate; };
  return {
    id: String(c.id), name: c.name, symbol: c.symbol,
    market_cap_rank: n(c.rank), current_price: cv(c.price_usd),
    market_cap: cv(c.market_cap_usd), total_volume: cv(c.volume24 || c.volume24a),
    price_change_percentage_24h: n(c.percent_change_24h), circulating_supply: n(c.csupply),
    total_supply: n(c.tsupply), max_supply: n(c.msupply), percent_change_1h: n(c.percent_change_1h),
    percent_change_7d: n(c.percent_change_7d), image: cryptoLogo(c.symbol)
  };
}
async function apiGetDirect(endpoint, params = {}) {
  const currency = String(params.currency || currencySelect.value || "eur").toLowerCase();
  const rate = await directUsdRate(currency);
  if (endpoint === "markets") {
    const start = Math.max(0, Number(params.start) || 0);
    const limit = Math.min(100, Math.max(1, Number(params.limit) || PAGE_SIZE));
    const payload = await fetchJson(`https://api.coinlore.net/api/tickers/?start=${start}&limit=${limit}`);
    return (payload.data || []).map(c => directNormalize(c, rate));
  }
  if (endpoint === "search") {
    const q = String(params.query || "").trim().toLowerCase();
    const assetsPayload = await fetchJson("https://api.coinlore.net/api/assets/");
    const list = Array.isArray(assetsPayload) ? assetsPayload : (assetsPayload.data || []);
    const matches = list.filter(c => [c.name, c.symbol, c.nameid].some(v => String(v || "").toLowerCase().includes(q)))
      .sort((a,b) => (String(a.symbol||"").toLowerCase()===q||String(a.name||"").toLowerCase()===q?0:1) - (String(b.symbol||"").toLowerCase()===q||String(b.name||"").toLowerCase()===q?0:1) || Number(a.rank||999999)-Number(b.rank||999999));
    if (!matches.length) throw new Error("Crypto introuvable.");
    const payload = await fetchJson(`https://api.coinlore.net/api/ticker/?id=${encodeURIComponent(matches[0].id)}`);
    if (!payload[0]) throw new Error("Données de marché indisponibles.");
    return directNormalize(payload[0], rate);
  }
  if (endpoint.startsWith("coin/")) {
    const id = endpoint.slice(5);
    const [tickerPayload, infoPayload] = await Promise.all([
      fetchJson(`https://api.coinlore.net/api/ticker/?id=${encodeURIComponent(id)}`),
      fetchJson(`https://api.coinlore.net/api/coin/info/?id=${encodeURIComponent(id)}`).catch(() => [])
    ]);
    const ticker = tickerPayload[0];
    if (!ticker) throw new Error("Crypto introuvable.");
    const info = Array.isArray(infoPayload) ? (infoPayload[0] || {}) : infoPayload;
    const base = directNormalize(ticker, rate);
    return { ...base, image: cryptoLogo(ticker.symbol), ath: info.ath == null ? null : Number(info.ath) * rate,
      ath_date: info.ath_date || null, launch_date: info.startdate || info.first_price_date || null,
      platform: info.platform || null, website: info.website || null, explorer: info.explorer || null };
  }
  throw new Error("Endpoint inconnu.");
}
async function apiGet(endpoint, params = {}) {
  const url = new URL(`${API_BASE}/${endpoint}`, window.location.origin);
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));
  try {
    const response = await fetch(url, { headers: { accept: "application/json" } });
    if (response.ok) return response.json();
    if (response.status !== 404) {
      let message = `Erreur API (${response.status})`;
      try { const payload = await response.json(); if (payload?.error) message = payload.error; } catch (_) {}
      throw new Error(message);
    }
  } catch (error) {
    if (error && error.message && !/Failed to fetch|NetworkError|Load failed|404/.test(error.message)) throw error;
  }
  setStatus("Backend indisponible : connexion directe à CoinLore…");
  return apiGetDirect(endpoint, params);
}

function createPill(text, extraClass = "") {
  const pill = document.createElement("span");
  pill.className = `type-pill ${extraClass}`.trim();
  pill.textContent = text;
  return pill;
}
function createCard(coin) {
  const node = cardTemplate.content.cloneNode(true);
  const card = node.querySelector(".pokemon-card");
  const image = node.querySelector(".pokemon-image");
  const pills = node.querySelector(".pokemon-types");
  const change = Number(coin.price_change_percentage_24h);
  node.querySelector(".crypto-rank").textContent = coin.market_cap_rank ? `#${coin.market_cap_rank}` : "CRYPTO";
  node.querySelector(".pokemon-name").textContent = coin.name;
  node.querySelector(".crypto-price").textContent = formatMoney(coin.current_price);
  node.querySelector(".crypto-change").textContent = formatPercent(change);
  node.querySelector(".crypto-change").classList.add(change >= 0 ? "positive" : "negative");
  image.src = cryptoLogo(coin.symbol);
  image.alt = `Logo de ${coin.name}`;
  image.onerror = () => setImageFallback(image);
  pills.appendChild(createPill(String(coin.symbol || "").toUpperCase()));
  pills.appendChild(createPill(`MCap ${formatCompact(coin.market_cap)}`));
  card.addEventListener("click", () => openDetails(coin.id));
  return node;
}
async function loadPopular(count = PAGE_SIZE) {
  setStatus("Chargement des données de marché…");
  loadMoreButton.disabled = true;
  try {
    const coins = await apiGet("markets", { start: loadedCount, limit: count, currency: currencySelect.value });
    if (!coins.length) { setStatus("Aucune autre crypto disponible."); return; }
    loadedEntities.push(...coins);
    coins.forEach(coin => grid.appendChild(createCard(coin)));
    loadedCount += coins.length;
    setStatus(`${coins.length} nouvelles cryptos chargées depuis CoinLore.`);
  } catch (error) {
    console.error(error);
    setStatus(error.message || "Impossible de charger le marché.");
  } finally { loadMoreButton.disabled = false; }
}
function infoRow(label, value) { return `<div class="info-row"><span>${label}</span><strong>${safe(value)}</strong></div>`; }
async function openDetails(id) {
  setStatus("Chargement de la fiche crypto…");
  try {
    const coin = await apiGet(`coin/${encodeURIComponent(id)}`, { currency: currencySelect.value });
    const change24 = coin.price_change_percentage_24h;
    details.innerHTML = `
      <div class="detail-shell">
        <div class="detail-hero">
          <img src="${cryptoLogo(coin.symbol)}" alt="Logo de ${safe(coin.name, "crypto")}">
          <div>
            <div class="detail-number">${coin.market_cap_rank ? `#${coin.market_cap_rank}` : "CRYPTO"} · ${safe(coin.symbol, "").toUpperCase()}</div>
            <h2 id="detailTitle" class="detail-name">${safe(coin.name)}</h2>
            <div class="pokemon-types"><span class="type-pill">${safe(coin.symbol, "").toUpperCase()}</span>${coin.platform ? `<span class="type-pill">${coin.platform}</span>` : ""}</div>
            <div class="detail-meta">
              <span><strong>${formatMoney(coin.current_price)}</strong><br>Prix</span>
              <span><strong class="${Number(change24) >= 0 ? "positive" : "negative"}">${formatPercent(change24)}</strong><br>24 h</span>
              <span><strong>${formatCompact(coin.market_cap)}</strong><br>Market cap</span>
            </div>
          </div>
        </div>
        <div class="stats">
          <p class="eyebrow">Informations</p>
          ${infoRow("Symbole", safe(coin.symbol, "").toUpperCase())}
          ${infoRow("Rang market cap", coin.market_cap_rank ? `#${coin.market_cap_rank}` : null)}
          ${infoRow("Volume 24 h", formatMoney(coin.total_volume, 0))}
          ${infoRow("Variation 1 h", formatPercent(coin.percent_change_1h))}
          ${infoRow("Variation 7 j", formatPercent(coin.percent_change_7d))}
          ${infoRow("ATH", formatMoney(coin.ath))}
          ${infoRow("Offre en circulation", coin.circulating_supply ? `${formatCompact(coin.circulating_supply)} ${safe(coin.symbol, "").toUpperCase()}` : null)}
          ${coin.launch_date ? infoRow("Premières données", coin.launch_date) : ""}
          ${coin.website ? `<div class="description"><strong>Site officiel</strong><p><a href="${coin.website}" target="_blank" rel="noopener noreferrer">${coin.website}</a></p></div>` : ""}
        </div>
      </div>`;
    dialog.classList.remove("modal-hidden");
    setStatus(`${coin.name} chargé depuis CoinLore.`);
  } catch (error) {
    console.error(error);
    setStatus(error.message || "Impossible de charger la fiche détaillée.");
  }
}
async function searchCrypto() {
  const query = searchInput.value.trim();
  if (!query) { searchInput.focus(); setStatus("Entre le nom ou le symbole d’une cryptomonnaie."); return; }
  setStatus(`Recherche de “${query}”…`);
  try {
    const coin = await apiGet("search", { query, currency: currencySelect.value });
    await openDetails(coin.id);
  } catch (error) { console.error(error); setStatus(error.message || `Aucun résultat pour “${query}”.`); }
}
async function randomCrypto() {
  if (!loadedEntities.length) await loadPopular(PAGE_SIZE);
  const coin = loadedEntities[Math.floor(Math.random() * loadedEntities.length)];
  if (coin) openDetails(coin.id);
}
async function reloadCurrency() {
  grid.innerHTML = ""; loadedCount = 0; loadedEntities = []; loadMoreButton.disabled = false; await loadPopular(PAGE_SIZE);
}
searchButton.addEventListener("click", searchCrypto);
searchInput.addEventListener("keydown", event => { if (event.key === "Enter") searchCrypto(); });
randomButton.addEventListener("click", randomCrypto);
loadMoreButton.addEventListener("click", () => loadPopular(PAGE_SIZE));
currencySelect.addEventListener("change", reloadCurrency);
closeDialogButton.addEventListener("click", () => dialog.classList.add("modal-hidden"));
dialog.addEventListener("click", event => { if (event.target.classList.contains("modal-backdrop")) dialog.classList.add("modal-hidden"); });
loadPopular(PAGE_SIZE);
