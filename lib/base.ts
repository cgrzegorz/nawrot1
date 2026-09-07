import { site } from "@/data/site";

/**
 * Hosting w podkatalogu (GitHub Pages: https://cgrzegorz.github.io/nawrot1/).
 * Wartość musi być zgodna z `basePath` w `next.config.ts`; nadpisz zmienną
 * `NEXT_PUBLIC_BASE_PATH` (pusty string = serwowanie z katalogu głównego,
 * np. po podpięciu własnej domeny).
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/nawrot1";

/** Origin wdrożenia — bez ścieżki. */
export const siteOrigin = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

/** Adres główny wdrożenia, razem z prefiksem katalogu. */
export const siteUrl = `${siteOrigin}${basePath}`;

/**
 * Prefiksuje ścieżkę do pliku z `public/`. `next/link` i `next/font` robią to
 * same, ale surowe `src`/`href` (obrazy z manifestu, PDF) — już nie.
 */
export function asset(path: string): string {
  return `${basePath}${path}`;
}

/** Bezwzględny adres strony lub pliku — do metadanych, JSON-LD i sitemapy. */
export function absoluteUrl(path: string): string {
  return `${siteUrl}${path}`;
}
