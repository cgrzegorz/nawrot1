import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site } from "@/data/site";
import { absoluteUrl, siteUrl } from "@/lib/base";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-sans",
});

const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700"],
  display: "swap",
  variable: "--font-display-face",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Dźwigi Nawrot — wynajem żurawi samojezdnych 10–80 t | Łódź",
    template: "%s | Dźwigi Nawrot",
  },
  description: site.shortDescription,
  applicationName: site.name,
  authors: [{ name: site.legalName }],
  keywords: [
    "wynajem dźwigu",
    "żurawie samojezdne",
    "usługi dźwigowe Łódź",
    "dźwig Pabianice",
    "transport ponadgabarytowy",
    "usługi koparkowe",
    "Ksawerów",
  ],
  openGraph: {
    type: "website",
    locale: "pl_PL",
    siteName: site.name,
    url: siteUrl,
    title: "Dźwigi Nawrot — wynajem żurawi samojezdnych 10–80 t",
    description: site.shortDescription,
    images: [
      { url: absoluteUrl("/og.jpg"), width: 1200, height: 630, alt: site.legalName },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dźwigi Nawrot — wynajem żurawi samojezdnych 10–80 t",
    description: site.shortDescription,
    images: [absoluteUrl("/og.jpg")],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: { telephone: true },
};

export const viewport: Viewport = {
  themeColor: "#17170f",
  colorScheme: "light",
};

/** Wizytówka firmy dla Google — Profil Firmy, wyniki lokalne i panel wiedzy. */
const localBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteUrl}/#firma`,
  name: site.name,
  legalName: site.legalName,
  description: site.shortDescription,
  url: siteUrl,
  telephone: site.phone,
  email: site.email,
  vatID: site.nip,
  foundingDate: String(site.founded),
  image: absoluteUrl("/og.jpg"),
  logo: absoluteUrl("/img/brand/logo-640.webp"),
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    postalCode: site.address.postalCode,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    addressCountry: site.address.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: site.geo.lat,
    longitude: site.geo.lng,
  },
  areaServed: site.areaServed.map((name) => ({ "@type": "Place", name })),
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [...site.openingHours.days],
      opens: site.openingHours.opens,
      closes: site.openingHours.closes,
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Usługi dźwigowo-transportowo-koparkowe",
    itemListElement: [
      "Wynajem żurawi samojezdnych 10–80 t",
      "Transport ponadgabarytowy",
      "Usługi koparkowe",
      "Doradztwo techniczne w doborze sprzętu",
    ].map((name) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name },
    })),
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl" className={`${inter.variable} ${archivo.variable}`}>
      <body>
        <a className="skip-link" href="#tresc">
          Przejdź do treści
        </a>
        <Header />
        <main id="tresc">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
        />
      </body>
    </html>
  );
}
