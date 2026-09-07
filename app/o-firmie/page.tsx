import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import Icon from "@/components/Icon";
import Img from "@/components/Img";
import { services, site, values } from "@/data/site";
import { years } from "@/lib/format";
import { absoluteUrl } from "@/lib/base";

export const metadata: Metadata = {
  title: "O firmie — usługi dźwigowe od 1992 roku",
  description:
    "Usługi Dźwigowo-Transportowo-Koparkowe Andrzej Nawrot działają od 1992 roku. Wynajem żurawi samojezdnych 10–80 t, doradztwo techniczne i prace trudne.",
  alternates: { canonical: absoluteUrl("/o-firmie/") },
  openGraph: {
    title: "O firmie — Dźwigi Nawrot od 1992 roku",
    url: absoluteUrl("/o-firmie/"),
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        image="hero/3"
        imageAlt="Żuraw samojezdny podnoszący element konstrukcyjny przy hali produkcyjnej"
        title="O firmie"
        lede={`Usługi Dźwigowo-Transportowo-Koparkowe Andrzej Nawrot — ${years(
          new Date().getFullYear() - site.founded
        )} pracy na budowach w Łódzkiem i w całej Polsce.`}
        trail={[{ href: "/o-firmie/", label: "O firmie" }]}
      />

      <section className="section">
        <div className="wrap split">
          <div className="prose">
            <span className="eyebrow">Nasza historia</span>
            <h2>Od {site.founded} roku nieprzerwanie na budowach</h2>
            <p style={{ marginTop: "1.25rem" }}>
              Firma <strong>Usługi Dźwigowo-Transportowo-Koparkowe</strong>{" "}
              powstała w {site.founded} roku. Od tego czasu nieprzerwanie
              świadczy usługi w zakresie:
            </p>
            <ul>
              <li>
                wynajmu żurawi samojezdnych od 10 do 80 t z wysięgnikami
                hydraulicznymi,
              </li>
              <li>doradztwa technicznego w zakresie doboru sprzętu,</li>
              <li>wykonywania prac trudnych — w tym się specjalizujemy.</li>
            </ul>
            <p>
              Skupiamy się przede wszystkim na zadowoleniu klienta oraz fachowym
              wykonywaniu prac. Każde zlecenie zaczynamy od rozmowy o tym, co ma
              zostać podniesione, gdzie i w jakich warunkach — dopiero potem
              dobieramy sprzęt.
            </p>
          </div>

          <figure className="figure" style={{ margin: 0 }}>
            <Img
              id="galeria/16"
              alt="Podnoszenie kratownicy stalowej na wysokość przez dwa żurawie"
              sizes="(max-width: 900px) 100vw, 46vw"
            />
          </figure>
        </div>
      </section>

      <section className="section section--paper2" aria-labelledby="zakres">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Co robimy</span>
            <h2 id="zakres">Zakres usług</h2>
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

      <section className="section section--dark" aria-labelledby="zasady">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Jak pracujemy</span>
            <h2 id="zasady">Fachowo, profesjonalnie, solidnie i konkurencyjnie</h2>
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

      <CtaBand />
    </>
  );
}
