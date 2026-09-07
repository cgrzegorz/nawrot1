import { site } from "@/data/site";
import Icon from "./Icon";

export default function CtaBand() {
  return (
    <section className="cta-band">
      <div className="wrap">
        <div>
          <h2>Potrzebujesz dźwigu? Zadzwoń i sprawdź termin.</h2>
          <p>
            Doradzimy w doborze żurawia, przygotujemy wycenę i ustalimy termin —
            również przy pracach nietypowych.
          </p>
        </div>
        <div className="btn-row" style={{ marginTop: 0 }}>
          <a className="btn btn--contrast" href={`tel:${site.phoneHref}`}>
            <Icon name="phone" size={18} />
            {site.phone}
          </a>
          <a className="btn btn--outline-dark" href={`mailto:${site.email}`}>
            <Icon name="mail" size={18} />
            Napisz e-mail
          </a>
        </div>
      </div>
    </section>
  );
}
