import type { MetadataRoute } from "next";
import { nav } from "@/data/site";
import { absoluteUrl } from "@/lib/base";

// Eksport statyczny: plik ma powstac raz, w czasie builda.
export const dynamic = "force-static";

/** Generuje out/sitemap.xml podczas eksportu statycznego. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return nav.map((item) => ({
    url: absoluteUrl(item.href),
    lastModified,
    changeFrequency: item.href === "/" ? "monthly" : "yearly",
    priority: item.href === "/" ? 1 : item.href === "/kontakt/" ? 0.8 : 0.7,
  }));
}
