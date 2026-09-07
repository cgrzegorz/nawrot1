import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import GalleryGrid, { type GalleryItem } from "@/components/GalleryGrid";
import { gallery } from "@/data/gallery";
import { site } from "@/data/site";
import { getImage } from "@/lib/images";
import { absoluteUrl, siteOrigin } from "@/lib/base";

export const metadata: Metadata = {
  title: "Galeria realizacji",
  description:
    "Zdjęcia z realizacji: montaże konstrukcji stalowych, prace przy obiektach handlowych i sakralnych, transport zbiorników, prace ziemne. Żurawie samojezdne 10–80 t.",
  alternates: { canonical: absoluteUrl("/galeria/") },
  openGraph: {
    title: "Galeria realizacji — Dźwigi Nawrot",
    url: absoluteUrl("/galeria/"),
  },
};

/**
 * Warianty obrazów rozwiązujemy na serwerze, żeby do przeglądarki nie trafiał
 * cały manifest obrazów — komponent kliencki dostaje tylko to, czego używa.
 */
const items: GalleryItem[] = gallery.map((photo) => {
  const image = getImage(photo.id);
  const thumb = image.variants[0];
  const full = image.variants[image.variants.length - 1];
  return {
    alt: photo.alt,
    thumbSrc: thumb.src,
    thumbSrcSet: image.variants.map((v) => `${v.src} ${v.w}w`).join(", "),
    width: image.width,
    height: image.height,
    fullSrc: full.src,
    blur: image.blur,
  };
});

const imageGallerySchema = {
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  name: `Galeria realizacji — ${site.name}`,
  url: absoluteUrl("/galeria/"),
  image: items.map((item) => ({
    "@type": "ImageObject",
    contentUrl: `${siteOrigin}${item.fullSrc}`,
    caption: item.alt,
  })),
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        image="galeria/20"
        imageAlt="Wysięgnik teleskopowy żurawia Usług Dźwigowych Nawrot na tle nieba"
        title="Galeria realizacji"
        lede={`${gallery.length} zdjęć z naszych budów — montaże konstrukcji stalowych, prace przy obiektach handlowych i sakralnych, transport zbiorników oraz roboty ziemne.`}
        trail={[{ href: "/galeria/", label: "Galeria" }]}
      />

      <section className="section">
        <div className="wrap">
          <GalleryGrid items={items} />
        </div>
      </section>

      <CtaBand />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(imageGallerySchema) }}
      />
    </>
  );
}
