import Link from "next/link";
import { nav, site } from "@/data/site";
import { getImage } from "@/lib/images";
import { asset } from "@/lib/base";

export default function Footer() {
  const logo = getImage("brand/logo");

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <span className="footer-brand__plate">
              <img
                src={logo.variants[0].src}
                width={logo.width}
                height={logo.height}
                sizes="160px"
                alt={`${site.legalName} — logo`}
                loading="lazy"
              />
            </span>
            <p>{site.shortDescription}</p>
          </div>

          <div>
            <h2>Dane firmy</h2>
            <address>
              {site.legalName}
              <br />
              {site.address.street}
              <br />
              {site.address.postalCode} {site.address.city}
              <br />
              NIP: {site.nip}
            </address>
          </div>

          <div>
            <h2>Kontakt</h2>
            <ul className="plain">
              <li>
                <a href={`tel:${site.phoneHref}`}>{site.phone}</a>
              </li>
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>
                <a href={asset("/dokumenty/zamowienie-dzwigu.pdf")}>Formularz zamówienia (PDF)</a>
              </li>
            </ul>
          </div>

          <div>
            <h2>Strona</h2>
            <ul className="plain">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {site.legalName}
          </span>
          <span>
            Usługi dźwigowe: {site.address.city}, Pabianice, Łódź i cała Polska
          </span>
        </div>
      </div>
    </footer>
  );
}
