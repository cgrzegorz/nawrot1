/**
 * Generuje zoptymalizowane warianty WebP z katalogu `assets/` do `public/img/`
 * oraz manifest `data/images.json` (wymiary + srcset) używany przez <Img />.
 *
 * Uruchamiane automatycznie przed `dev` i `build`. Pomija pliki, które są już
 * aktualne — `--force` przelicza wszystko od nowa.
 */
import { createHash } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(ROOT, "assets");
const OUT = path.join(ROOT, "public", "img");
const MANIFEST = path.join(ROOT, "data", "images.json");
const FORCE = process.argv.includes("--force");

/** Szerokości wariantów dla poszczególnych katalogów źródłowych. */
const PROFILES = {
  hero: { widths: [640, 1024, 1536, 2048], quality: 74 },
  galeria: { widths: [400, 800, 1400], quality: 76 },
  partnerzy: { widths: [240], quality: 88, fit: "inside", height: 120 },
  brand: { widths: [320, 640], quality: 90, trim: true },
  mapa: { widths: [640, 1000], quality: 82 },
};

const isImage = (f) => /\.(jpe?g|png|gif|webp)$/i.test(f);

async function listSources() {
  const out = [];
  for (const dir of Object.keys(PROFILES)) {
    let files;
    try {
      files = await fs.readdir(path.join(SRC, dir));
    } catch {
      continue;
    }
    for (const file of files.filter(isImage).sort()) {
      out.push({ dir, file, abs: path.join(SRC, dir, file) });
    }
  }
  return out;
}

async function mtime(file) {
  try {
    return (await fs.stat(file)).mtimeMs;
  } catch {
    return 0;
  }
}

async function build() {
  const sources = await listSources();
  if (sources.length === 0) {
    console.warn("[images] brak plików w assets/ — pomijam");
    return;
  }

  const manifest = {};
  let written = 0;

  for (const { dir, file, abs } of sources) {
    const profile = PROFILES[dir];
    const name = file.replace(/\.[^.]+$/, "");
    const id = `${dir}/${name}`;
    const outDir = path.join(OUT, dir);
    await fs.mkdir(outDir, { recursive: true });

    let pipeline = sharp(abs, { failOn: "none" });
    if (profile.trim) pipeline = pipeline.trim({ threshold: 12 });
    const base = await pipeline.toBuffer();
    const meta = await sharp(base).metadata();
    const srcMtime = await mtime(abs);

    // nie powiekszamy zrodla: kazda szerokosc jest przycieta do oryginalu
    const widths = [
      ...new Set(profile.widths.map((w) => Math.min(w, meta.width))),
    ].sort((a, b) => a - b);

    const variants = [];
    for (const width of widths) {
      const outFile = path.join(outDir, `${name}-${width}.webp`);
      if (FORCE || (await mtime(outFile)) < srcMtime) {
        await sharp(base)
          .resize({
            width,
            height: profile.height,
            fit: profile.fit ?? "cover",
            withoutEnlargement: true,
          })
          .webp({ quality: profile.quality })
          .toFile(outFile);
        written += 1;
      }
      const info = await sharp(outFile).metadata();
      variants.push({
        w: info.width,
        h: info.height,
        src: `/img/${dir}/${name}-${width}.webp`,
      });
    }

    const largest = variants[variants.length - 1];
    manifest[id] = {
      width: largest.w,
      height: largest.h,
      variants,
      // 12-znakowy placeholder LQIP — chroni przed migotaniem przy lazy-loadzie
      blur: `data:image/webp;base64,${(
        await sharp(base).resize(16).webp({ quality: 20 }).toBuffer()
      ).toString("base64")}`,
    };
  }

  const json = JSON.stringify(manifest, null, 2);
  const prev = await fs.readFile(MANIFEST, "utf8").catch(() => "");
  if (createHash("sha1").update(json).digest("hex") !== createHash("sha1").update(prev).digest("hex")) {
    await fs.writeFile(MANIFEST, `${json}\n`);
  }

  console.log(
    `[images] ${sources.length} źródeł, ${Object.keys(manifest).length} wpisów w manifeście, ${written} nowych plików`
  );
}

build().catch((err) => {
  console.error("[images] błąd:", err);
  process.exit(1);
});
