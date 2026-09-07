import Breadcrumbs, { type Crumb } from "./Breadcrumbs";
import Img from "./Img";

type Props = {
  /** Klucz obrazu tła z data/images.json — kadr panoramiczny, min. 1400 px. */
  image: string;
  imageAlt: string;
  title: string;
  lede?: string;
  trail: Crumb[];
};

/** Nagłówek podstrony: zdjęcie z realizacji przyciemnione gradientem. */
export default function PageHero({ image, imageAlt, title, lede, trail }: Props) {
  return (
    <section className="page-hero">
      <div className="page-hero__media">
        <Img id={image} alt={imageAlt} sizes="100vw" priority />
      </div>
      <div className="wrap">
        <div className="page-hero__inner">
          <Breadcrumbs trail={trail} />
          <h1>{title}</h1>
          {lede && <p className="lede">{lede}</p>}
        </div>
      </div>
    </section>
  );
}
