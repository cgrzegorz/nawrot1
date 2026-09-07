import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import Icon from "@/components/Icon";
import Img from "@/components/Img";
import { gallery } from "@/data/gallery";
import { partners } from "@/data/partners";
import { services, site, stats, values } from "@/data/site";
import { getImage } from "@/lib/images";
import { absoluteUrl } from "@/lib/base";

export const metadata: Metadata = {
  title: "Dźwigi Nawrot — wynajem żurawi samojezdnych 10–80 t | Łódź",
  description:
    "Wynajem żurawi samojezdnych 10–80 t z wysięgnikami hydraulicznymi, transport ponadgabarytowy i usługi koparkowe. Łódź, Pabianice, Ksawerów i cała Polska. Firma działa od 1992 roku.",
  alternates: { canonical: absoluteUrl("/") },
};

const hero = "hero/1";
const teasers = gallery.slice(0, 6);

export default function HomePage() {
  const heroImage = getImage(hero);

  return (
    <>
      <section className="hero">
        <div className="hero__media">
          <img
            src={heroImage.variants[heroImage.variants.length - 1].src}
            srcSet={heroImage.variants
              .map((v) => `${v.src} ${v.w}w`)
              .join(", ")}
            sizes="100vw"
            width={heroImage.width}
            height={heroImage.height}
            alt="Żuraw samojezdny podczas rozładunku naczepy przed centrum handlowym Port Łódź"
            fetchPriority="high"
            decoding="sync"
          />
        </div>

        <div className="wrap">
          <div className="hero__inner">
            <p className="hero__badge">
              <b>OD {site.founded}</b> ponad 30 lat na budowach
            </p>
            <h1>
              Wynajem <em>żurawi samojezdnych</em> od 10 do 80 ton
            </h1>
            <p className="hero__lede">
              Prace montażowe, przeładunki i zadania nietypowe. Przyjeżdżamy na
              czas, z operatorem i doradztwem technicznym w cenie.
            </p>
            <div className="btn-row">
              <a className="btn btn--primary" href={`tel:${site.phoneHref}`}>
                <Icon name="phone" size={18} />
                Zamów dźwig: {site.phone}
              </a>
              <Link className="btn btn--on-dark" href="/galeria/">
                Zobacz realizacje
                <Icon name="arrow" size={18} />
              </Link>
            </div>
          </div>
        </div>

        <dl className="stat-strip">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt>{stat.value}</dt>
              <dd>{stat.label}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="section" aria-labelledby="uslugi">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Zakres usług</span>
            <h2 id="uslugi">
              Dźwig, transport i prace ziemne w jednym miejscu
            </h2>
            <p className="lede">
              Obsługujemy budowy, zakłady produkcyjne i klientów indywidualnych
              w Łodzi, Pabianicach, Ksawerowie i na terenie całej Polski.
            </p>
          </div>

          <div className="grid grid--4">
            {services.map((service) => (
              <article key={service.title} className="card">
                <span className="card__icon">
                  <Icon name={service.icon} size={26} />
                </span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--paper2" aria-labelledby="o-nas">
        <div className="wrap split">
          <div>
            <span className="eyebrow">O firmie</span>
            <h2 id="o-nas">
              Usługi Dźwigowo-Transportowo-Koparkowe Andrzej Nawrot
            </h2>
            <p className="lede" style={{ marginTop: "1.25rem" }}>
              Firma powstała w {site.founded} roku i od tego czasu nieprzerwanie
              świadczy usługi dźwigowe. Specjalizujemy się w pracach trudnych —
              tam, gdzie liczy się doświadczenie operatora i właściwie dobrany
              sprzęt.
            </p>
            <ul className="tick-list plain">
              {[
                "Żurawie samojezdne 10–80 t z wysięgnikami hydraulicznymi",
                "Doradztwo techniczne w zakresie doboru sprzętu",
                "Prace trudne i nietypowe — nasza specjalność",
                "Ponad 30 lat pracy dla firm budowlanych i przemysłu",
              ].map((item) => (
                <li key={item}>
                  <Icon name="check" size={18} strokeWidth={2.4} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="btn-row">
              <Link className="text-link" href="/o-firmie/">
                Poznaj naszą firmę
                <Icon name="arrow" size={18} />
              </Link>
            </div>
          </div>

          <figure className="figure" style={{ margin: 0 }}>
            <Img
              id="hero/2"
              alt="Żuraw samojezdny pracujący wewnątrz hali podczas montażu konstrukcji dachu"
              sizes="(max-width: 900px) 100vw, 46vw"
            />
          </figure>
        </div>
      </section>

      <section className="section section--dark" aria-labelledby="wartosci">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Dlaczego my</span>
            <h2 id="wartosci">Cztery rzeczy, na których nam zależy</h2>
          </div>
          <div className="grid grid--4">
            {values.map((value) => (
              <article key={value.title} className="card value-card">
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="realizacje">
        <div className="wrap">
          <div className="section-head head-row" style={{ maxWidth: "none" }}>
            <div>
              <span className="eyebrow">Realizacje</span>
              <h2 id="realizacje">Zdjęcia z naszych budów</h2>
            </div>
            <Link className="text-link" href="/galeria/">
              Cała galeria ({gallery.length} zdjęć)
              <Icon name="arrow" size={18} />
            </Link>
          </div>

          <div className="teaser-grid">
            {teasers.map((photo) => (
              <Link key={photo.id} href="/galeria/">
                <Img
                  id={photo.id}
                  alt={photo.alt}
                  sizes="(max-width: 560px) 100vw, (max-width: 1000px) 50vw, 33vw"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--paper2" aria-labelledby="partnerzy">
        <div className="wrap">
          <div className="section-head head-row" style={{ maxWidth: "none" }}>
            <div>
              <span className="eyebrow">Zaufali nam</span>
              <h2 id="partnerzy">Firmy, dla których pracujemy</h2>
            </div>
            <Link className="text-link" href="/partnerzy/">
              Wszyscy partnerzy
              <Icon name="arrow" size={18} />
            </Link>
          </div>

          <ul className="logo-grid plain">
            {partners.slice(0, 12).map((partner) => (
              <li key={partner.id}>
                <Img
                  id={partner.id}
                  alt={partner.name}
                  sizes="150px"
                  placeholder={false}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
