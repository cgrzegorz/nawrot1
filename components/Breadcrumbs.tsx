import Link from "next/link";
import { absoluteUrl } from "@/lib/base";

export type Crumb = { href: string; label: string };

/** Okruszki + odpowiadający im BreadcrumbList dla wyszukiwarek. */
export default function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  const items = [{ href: "/", label: "Start" }, ...trail];

  return (
    <>
      <nav className="crumbs" aria-label="Ścieżka nawigacji">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <span key={item.href}>
              {last ? (
                <span aria-current="page">{item.label}</span>
              ) : (
                <>
                  <Link href={item.href}>{item.label}</Link>
                  <span aria-hidden="true"> / </span>
                </>
              )}
            </span>
          );
        })}
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: items.map((item, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: item.label,
              item: absoluteUrl(item.href),
            })),
          }),
        }}
      />
    </>
  );
}
