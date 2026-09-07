import type { NextConfig } from "next";

// Musi być zgodne z `basePath` w `lib/base.ts` (tam trafia do surowych ścieżek).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/nawrot1";

const nextConfig: NextConfig = {
  // Eksport do statycznego HTML -> katalog `out/`
  output: "export",
  // Statyczny hosting nie ma serwera obrazków Next.js
  images: { unoptimized: true },
  // Adresy z ukośnikiem na końcu: /oferta/ -> /oferta/index.html
  trailingSlash: true,
  // GitHub Pages serwuje projekt z podkatalogu /nawrot1
  basePath,
};

export default nextConfig;
