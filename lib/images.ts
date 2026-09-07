import manifest from "@/data/images.json";
import { asset } from "@/lib/base";

export type ImageVariant = { w: number; h: number; src: string };
export type ImageEntry = {
  width: number;
  height: number;
  variants: ImageVariant[];
  blur: string;
};

const images = manifest as Record<string, ImageEntry>;

export type ImageId = keyof typeof manifest;

/** Zwraca wpis z manifestu; rzuca w czasie builda, gdy brakuje pliku źródłowego. */
export function getImage(id: string): ImageEntry {
  const entry = images[id];
  if (!entry) {
    throw new Error(
      `Brak obrazu "${id}" w data/images.json — uruchom \`npm run images\`.`
    );
  }
  // Ścieżki w manifeście są względne wobec katalogu głównego serwisu —
  // przy hostingu w podkatalogu trzeba dodać prefiks.
  return { ...entry, variants: entry.variants.map((v) => ({ ...v, src: asset(v.src) })) };
}
