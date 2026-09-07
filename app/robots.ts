import type { MetadataRoute } from "next";
import { absoluteUrl, siteOrigin } from "@/lib/base";

// Eksport statyczny: plik ma powstac raz, w czasie builda.
export const dynamic = "force-static";

/** Generuje out/robots.txt podczas eksportu statycznego. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteOrigin,
  };
}
