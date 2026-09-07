import { getImage } from "@/lib/images";

type Props = {
  id: string;
  alt: string;
  sizes: string;
  className?: string;
  /** Pierwszy obraz nad zgięciem — ładowany od razu, z wysokim priorytetem. */
  priority?: boolean;
  /** Rozmyty placeholder pod obrazem. Wyłącz dla grafik z przezroczystością. */
  placeholder?: boolean;
};

/**
 * Statyczny odpowiednik `next/image`: korzysta z wariantów WebP wygenerowanych
 * przez `scripts/optimize-images.mjs`, więc działa bez serwera optymalizacji.
 * Zawsze podaje width/height, żeby przeglądarka zarezerwowała miejsce (brak CLS).
 */
export default function Img({
  id,
  alt,
  sizes,
  className,
  priority,
  placeholder = true,
}: Props) {
  const image = getImage(id);
  const largest = image.variants[image.variants.length - 1];

  return (
    <img
      src={largest.src}
      srcSet={image.variants.map((v) => `${v.src} ${v.w}w`).join(", ")}
      sizes={sizes}
      width={image.width}
      height={image.height}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding={priority ? "sync" : "async"}
      style={
        placeholder
          ? {
              backgroundImage: `url(${image.blur})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : undefined
      }
    />
  );
}
