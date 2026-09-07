import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import Img from "@/components/Img";
import { partners } from "@/data/partners";
import { absoluteUrl } from "@/lib/base";

export const metadata: Metadata = {
  title: "Partnerzy i klienci",
  description:
    "Firmy budowlane, zakłady przemysłowe i instytucje, dla których realizujemy usługi dźwigowe — m.in. Skanska, Strabag, Porr, Warbud, Mostostal Warszawa, ABB, Port Lotniczy Łódź.",
  alternates: { canonical: absoluteUrl("/partnerzy/") },
  openGraph: {
    title: "Partnerzy i klienci — Dźwigi Nawrot",
    url: absoluteUrl("/partnerzy/"),
  },
};

export default function PartnersPage() {
  return (
    <>
      <PageHero
        image="galeria/aaa"
        imageAlt="Żuraw samojezdny podczas montażu konstrukcji hali handlowej"
        title="Partnerzy"
        lede="Przez ponad trzy dekady pracowaliśmy dla generalnych wykonawców, zakładów produkcyjnych i instytucji publicznych. Oto część firm, które nam zaufały."
        trail={[{ href: "/partnerzy/", label: "Partnerzy" }]}
      />

      <section className="section">
        <div className="wrap">
          <ul className="logo-grid plain">
            {partners.map((partner) => (
              <li key={partner.id}>
                <Img
                  id={partner.id}
                  alt={`Logo — ${partner.name}`}
                  sizes="150px"
                  placeholder={false}
                />
              </li>
            ))}
          </ul>
          <p className="muted" style={{ marginTop: "2rem", fontSize: "0.92rem" }}>
            Logotypy są własnością odpowiednich firm i zostały użyte wyłącznie
            w celach referencyjnych.
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
