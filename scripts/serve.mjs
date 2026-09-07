/**
 * Minimalny serwer statyczny do podglądu katalogu `out/` — odwzorowuje to, co
 * robi hosting: katalog -> index.html, brak pliku -> 404.html.
 * Uruchamiany przez `npm run start`; nie jest częścią wdrożenia.
 */
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "out"
);
const PORT = Number(process.env.PORT ?? 3000);
// Ten sam prefiks co `basePath` w next.config.ts — podgląd ma odwzorować Pages.
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "/nawrot1";

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".woff2": "font/woff2",
  ".pdf": "application/pdf",
};

if (!fs.existsSync(ROOT)) {
  console.error("Brak katalogu out/ — uruchom najpierw `npm run build`.");
  process.exit(1);
}

http
  .createServer((req, res) => {
    const url = decodeURIComponent((req.url ?? "/").split("?")[0]);

    if (BASE && !url.startsWith(`${BASE}/`) && url !== BASE) {
      res.writeHead(302, { location: `${BASE}/` });
      res.end();
      return;
    }

    let file = path.join(ROOT, url.slice(BASE.length));
    if (!path.relative(ROOT, file).startsWith("..")) {
      if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
        file = path.join(file, "index.html");
      }
    } else {
      file = path.join(ROOT, "404.html");
    }

    const found = fs.existsSync(file) && fs.statSync(file).isFile();
    const served = found ? file : path.join(ROOT, "404.html");
    res.writeHead(found ? 200 : 404, {
      "content-type": TYPES[path.extname(served)] ?? "application/octet-stream",
    });
    fs.createReadStream(served).pipe(res);
  })
  .listen(PORT, () => {
    console.log(`Podgląd out/ na http://localhost:${PORT}${BASE}/`);
  });
