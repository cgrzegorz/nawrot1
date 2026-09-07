import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Strona jest eksportowana statycznie (`output: "export"`), wiec serwer
      // optymalizacji next/image nie istnieje. Warianty WebP generuje
      // scripts/optimize-images.mjs, a <Img /> serwuje je przez srcset.
      "@next/next/no-img-element": "off",
    },
  },
  { ignores: [".next/**", "out/**", "node_modules/**"] },
];

export default eslintConfig;
