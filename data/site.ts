/** Dane firmy w jednym miejscu — używane w treści, stopce, JSON-LD i metadanych. */
export const site = {
  name: "Dźwigi Nawrot",
  legalName: "Usługi Dźwigowo-Transportowo-Koparkowe Andrzej Nawrot",
  shortDescription:
    "Wynajem żurawi samojezdnych 10–80 t, transport i usługi koparkowe. Łódź i cała Polska, od 1992 roku.",
  url: "https://dzwigi-nawrot.pl",
  founded: 1992,
  phone: "+48 502 234 615",
  phoneHref: "+48502234615",
  email: "biuro@dzwigi-nawrot.pl",
  nip: "PL7311039769",
  address: {
    street: "ul. Twarda 3",
    postalCode: "95-054",
    city: "Ksawerów",
    region: "łódzkie",
    country: "PL",
  },
  geo: { lat: 51.67696, lng: 19.42547 },
  openingHours: {
    label: "Pn–Pt 7:00–17:00",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "07:00",
    closes: "17:00",
  },
  areaServed: ["Łódź", "Pabianice", "Ksawerów", "województwo łódzkie", "Polska"],
} as const;

export const nav = [
  { href: "/", label: "Start" },
  { href: "/o-firmie/", label: "O firmie" },
  { href: "/partnerzy/", label: "Partnerzy" },
  { href: "/galeria/", label: "Galeria" },
  { href: "/kontakt/", label: "Kontakt" },
] as const;

/** Zakres usług — treść przeniesiona ze starej strony i rozwinięta. */
export const services = [
  {
    icon: "crane",
    title: "Wynajem żurawi samojezdnych",
    text: "Żurawie o udźwigu od 10 do 80 ton z wysięgnikami hydraulicznymi. Prace montażowe, przeładunkowe i wysokościowe.",
  },
  {
    icon: "truck",
    title: "Transport ponadgabarytowy",
    text: "Dowóz i rozładunek elementów konstrukcyjnych, maszyn, zbiorników i prefabrykatów bezpośrednio na plac budowy.",
  },
  {
    icon: "excavator",
    title: "Usługi koparkowe",
    text: "Koparko-ładowarki do wykopów, niwelacji terenu, prac ziemnych i rozbiórkowych.",
  },
  {
    icon: "compass",
    title: "Doradztwo techniczne",
    text: "Pomożemy dobrać sprzęt do zadania i przygotować plan podnoszenia — także przy pracach trudnych i nietypowych.",
  },
] as const;

/** Cztery filary ze starej strony głównej — zachowane 1:1. */
export const values = [
  { title: "Fachowo", text: "Pomożemy Ci w wyborze sprzętu" },
  { title: "Profesjonalnie", text: "Używamy najlepszego sprzętu" },
  { title: "Solidnie", text: "Zadowolenie klienta to podstawa" },
  { title: "Konkurencyjnie", text: "Przejrzysta wycena dopasowana do zakresu prac" },
] as const;

export const stats = [
  { value: "1992", label: "Rok założenia firmy" },
  { value: "10–80 t", label: "Udźwig żurawi samojezdnych" },
  { value: "40+", label: "Stałych partnerów i klientów" },
] as const;
