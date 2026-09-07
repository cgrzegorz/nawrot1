import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import Img from "@/components/Img";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Nie znaleziono strony",
};

export default function NotFound() {
  return (
    <section className="page-hero">
      <div className="page-hero__media">
        <Img
          id="galeria/dsc_0840"
          alt="Żurawie samojezdne podczas pracy w terenie otwartym"
          sizes="100vw"
          priority
        />
      </div>
      <div className="wrap">
        <div className="page-hero__inner" style={{ paddingBlock: "clamp(4rem, 12vw, 8rem)" }}>
          <span className="eyebrow">Błąd 404</span>
          <h1>Nie znaleźliśmy takiej strony</h1>
          <p className="lede">
            Adres mógł się zmienić razem z nową wersją serwisu. Zacznij od strony
            głównej albo zadzwoń — chętnie pomożemy.
          </p>
          <div className="btn-row">
            <Link className="btn btn--primary" href="/">
              Strona główna
              <Icon name="arrow" size={18} />
            </Link>
            <a className="btn btn--on-dark" href={`tel:${site.phoneHref}`}>
              <Icon name="phone" size={18} />
              {site.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
