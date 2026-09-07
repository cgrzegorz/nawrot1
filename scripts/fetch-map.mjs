/**
 * Buduje statyczną mapkę dojazdu z kafelków OpenStreetMap i zapisuje ją jako
 * `assets/mapa/dojazd.png`. Dzięki temu strona kontaktowa nie osadza cudzej
 * ramki: nie ma ciasteczek (RODO), zapytań do zewnętrznych serwerów ani
 * zależności od WebGL. Skrypt uruchamiamy ręcznie (`npm run map`), gdy zmieni
 * się adres firmy — wynik trafia do repozytorium.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "assets", "mapa", "dojazd.png");

const LAT = 51.67696;
const LNG = 19.42547;
const ZOOM = 15;
const COLS = 4;
const ROWS = 3;
const TILE = 256;
const CROP = { width: 1000, height: 620 };
const UA = "dzwigi-nawrot.pl static map builder (kontakt: biuro@dzwigi-nawrot.pl)";

const lngToX = (lng, z) => ((lng + 180) / 360) * 2 ** z;
const latToY = (lat, z) => {
  const rad = (lat * Math.PI) / 180;
  return ((1 - Math.log(Math.tan(rad) + 1 / Math.cos(rad)) / Math.PI) / 2) * 2 ** z;
};

async function tile(x, y, z) {
  const url = `https://tile.openstreetmap.org/${z}/${x}/${y}.png`;
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

const centerX = lngToX(LNG, ZOOM);
const centerY = latToY(LAT, ZOOM);
const originX = Math.floor(centerX) - Math.floor(COLS / 2);
const originY = Math.floor(centerY) - Math.floor(ROWS / 2);

const composites = [];
for (let dy = 0; dy < ROWS; dy += 1) {
  for (let dx = 0; dx < COLS; dx += 1) {
    composites.push({
      input: await tile(originX + dx, originY + dy, ZOOM),
      left: dx * TILE,
      top: dy * TILE,
    });
    await new Promise((r) => setTimeout(r, 120)); // uprzejmie wobec serwera kafelków
  }
}

const stitched = await sharp({
  create: { width: COLS * TILE, height: ROWS * TILE, channels: 3, background: "#e8e4dd" },
})
  .composite(composites)
  .png()
  .toBuffer();

// pozycja firmy w pikselach na sklejonej mapie
const pinX = Math.round((centerX - originX) * TILE);
const pinY = Math.round((centerY - originY) * TILE);

const marker = Buffer.from(`<svg width="${COLS * TILE}" height="${ROWS * TILE}" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(${pinX - 22} ${pinY - 52})">
    <path d="M22 52C22 52 42 30 42 19A20 20 0 1 0 2 19c0 11 20 33 20 33z"
          fill="#17170f" stroke="#ffffff" stroke-width="3"/>
    <circle cx="22" cy="19" r="7.5" fill="#edb60c"/>
  </g>
</svg>`);

const left = Math.max(0, Math.min(COLS * TILE - CROP.width, pinX - CROP.width / 2));
const top = Math.max(0, Math.min(ROWS * TILE - CROP.height, pinY - CROP.height / 2));

await fs.mkdir(path.dirname(OUT), { recursive: true });
// najpierw naklejamy pinezkę, dopiero potem kadrujemy — sharp wykonuje
// `extract` przed `composite`, więc oba kroki muszą być osobnymi przebiegami
const withMarker = await sharp(stitched).composite([{ input: marker }]).png().toBuffer();
await sharp(withMarker)
  .extract({ left: Math.round(left), top: Math.round(top), ...CROP })
  .png()
  .toFile(OUT);

console.log(`[map] zapisano ${path.relative(ROOT, OUT)} (${CROP.width}×${CROP.height}, zoom ${ZOOM})`);
