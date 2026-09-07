import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Icon from "@/components/Icon";
import Img from "@/components/Img";
import { site } from "@/data/site";
import { absoluteUrl, asset } from "@/lib/base";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Usługi Dźwigowo-Transportowo-Koparkowe Andrzej Nawrot, ul. Twarda 3, 95-054 Ksawerów. Telefon +48 502 234 615, e-mail biuro@dzwigi-nawrot.pl.",
  alternates: { canonical: absoluteUrl("/kontakt/") },
  openGraph: {
    title: "Kontakt — Dźwigi Nawrot, Ksawerów k. Łodzi",
    url: absoluteUrl("/kontakt/"),
  },
};

/**
 * Mapa jest statycznym obrazem złożonym z kafelków OpenStreetMap
 * (`npm run map`). Brak osadzonej ramki oznacza brak ciasteczek stron trzecich
 * i żadnych zapytań poza naszym serwerem — klik prowadzi do nawigacji.
 */
const { lat, lng } = site.geo;
const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat}%2C${lng}`;

export default function ContactPage() {
  return (
    <>
      <PageHero
        image="galeria/dsc_0965"
        imageAlt="Żuraw samojezdny podczas prac przy zbiornikach technologicznych zakładu"
        title="Kontakt"
        lede="Najszybciej załatwimy sprawę telefonicznie — powiedz, co i gdzie trzeba podnieść, a dobierzemy sprzęt i podamy termin."
        trail={[{ href: "/kontakt/", label: "Kontakt" }]}
      />

      <section className="section">
        <div className="wrap split split--top">
          <div className="contact-card">
            <h2 className="contact-card__title">{site.legalName}</h2>

            <ul className="contact-list plain">
              <li>
                <span className="ico">
                  <Icon name="phone" size={20} />
                </span>
                <div>
                  <span className="contact-label">Telefon</span>
                  <a className="contact-value" href={`tel:${site.phoneHref}`}>
                    {site.phone}
                  </a>
                </div>
              </li>

              <li>
                <span className="ico">
                  <Icon name="mail" size={20} />
                </span>
                <div>
                  <span className="contact-label">E-mail</span>
                  <a className="contact-value" href={`mailto:${site.email}`}>
                    {site.email}
                  </a>
                </div>
              </li>

              <li>
                <span className="ico">
                  <Icon name="pin" size={20} />
                </span>
                <div>
                  <span className="contact-label">Adres</span>
                  <address className="contact-value">
                    {site.address.street}
                    <br />
                    {site.address.postalCode} {site.address.city}
                  </address>
                </div>
              </li>

              <li>
                <span className="ico">
                  <Icon name="doc" size={20} />
                </span>
                <div>
                  <span className="contact-label">NIP</span>
                  <span className="contact-value">{site.nip}</span>
                </div>
              </li>
            </ul>

            <div className="btn-row">
              <a className="btn btn--primary" href={`tel:${site.phoneHref}`}>
                <Icon name="phone" size={18} />
                Zadzwoń teraz
              </a>
              <a
                className="btn btn--ghost"
                href={asset("/dokumenty/zamowienie-dzwigu.pdf")}
                download
              >
                <Icon name="doc" size={18} />
                Formularz zamówienia
              </a>
            </div>
          </div>

          <div>
            <a
              className="map-frame"
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Wyznacz trasę do: ${site.address.street}, ${site.address.postalCode} ${site.address.city}`}
            >
              <Img
                id="mapa/dojazd"
                alt={`Mapa dojazdu — ${site.address.street}, ${site.address.postalCode} ${site.address.city}`}
                sizes="(max-width: 900px) 100vw, 46vw"
              />
              <span className="map-frame__cta">
                <Icon name="pin" size={18} />
                Wyznacz trasę
              </span>
            </a>
            <p className="map-note">
              Jesteśmy w Ksawerowie, tuż przy granicy Łodzi i Pabianic. Dane
              mapy:{" "}
              <a
                href="https://www.openstreetmap.org/copyright"
                target="_blank"
                rel="noopener noreferrer"
              >
                © współtwórcy OpenStreetMap
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
