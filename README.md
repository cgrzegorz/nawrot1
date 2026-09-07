# Dźwigi Nawrot — strona firmowa

Nowa witryna firmy **Usługi Dźwigowo-Transportowo-Koparkowe Andrzej Nawrot**,
zbudowana na Next.js 15 (App Router) + React 19 + TypeScript i eksportowana do
**statycznego HTML-a** — wynik wgrywa się na dowolny hosting (FTP, nginx,
Netlify, GitHub Pages), bez Node.js po stronie serwera.

Treść, zdjęcia i logotypy pochodzą ze starego serwisu Joomla
(`dzwigi-nawrot.pl`) i zostały przeniesione 1:1 pod te same podstrony.

## Wymagania

Node.js 18.18+ (projekt budowany na v18.20.8).

## Skrypty

| Komenda             | Opis                                                                 |
| ------------------- | -------------------------------------------------------------------- |
| `npm run dev`       | Serwer deweloperski — http://localhost:3000/nawrot1/                 |
| `npm run build`     | Optymalizacja obrazów + eksport statycznego HTML do `out/`            |
| `npm run start`     | Podgląd gotowego `out/` na lokalnym serwerze statycznym (z `/nawrot1/`) |
| `npm run preview`   | `build` + `start` w jednym kroku                                      |
| `npm run images`    | Przelicza wszystkie warianty obrazów od nowa (`--force`)              |
| `npm run map`       | Odświeża statyczną mapkę dojazdu z kafelków OpenStreetMap             |
| `npm run lint`      | ESLint (`next/core-web-vitals`)                                       |
| `npm run typecheck` | Sprawdzenie typów TypeScript                                          |
| `npm run clean`     | Usuwa `.next/`, `out/` i wygenerowane `public/img/`                   |

## Struktura

```
app/
  layout.tsx        wspólny layout, metadane, JSON-LD LocalBusiness
  page.tsx          strona główna          -> /
  o-firmie/         -> /o-firmie/
  partnerzy/        -> /partnerzy/
  galeria/          -> /galeria/
  kontakt/          -> /kontakt/
  not-found.tsx     404
  sitemap.ts        generuje out/sitemap.xml
  robots.ts         generuje out/robots.txt
  icon.svg          favicon      (apple-icon.png obok)
  globals.css       cały system stylów (zmienne CSS, brak frameworka)

components/         Header, Footer, PageHero, Img, GalleryGrid, Breadcrumbs, CtaBand, Icon
data/
  site.ts           dane firmy: adres, telefon, NIP, godziny, usługi, wartości
  gallery.ts        43 zdjęcia realizacji + opisy alternatywne
  partners.ts       42 logotypy partnerów + nazwy
  images.json       manifest wygenerowany przez skrypt obrazów
lib/                pomocnicze: dostęp do manifestu, odmiana liczebników
assets/             ORYGINAŁY zdjęć ze starej strony (źródło prawdy)
scripts/
  optimize-images.mjs   assets/ -> public/img/ (WebP + srcset + LQIP)
  fetch-map.mjs         statyczna mapka z OpenStreetMap
public/             pliki kopiowane 1:1 (PDF, og.jpg, .htaccess, przekierowania)
```

## Nagłówki podstron

Każda podstrona zaczyna się komponentem `<PageHero>` — zdjęciem z realizacji
przyciemnionym gradientem, na którym leżą okruszki, `h1` i lead. Zdjęcie
wskazujemy kluczem z manifestu (np. `image="hero/3"`); dobre kadry to te
o proporcjach ok. 16:9 i szerokości min. 1400 px.

## Obrazy

Zdjęcia trzymamy w `assets/` w oryginalnej rozdzielczości. Przed każdym `dev`
i `build` skrypt `scripts/optimize-images.mjs` generuje z nich warianty WebP
w `public/img/` (pomijając te, które są już aktualne) i zapisuje manifest
`data/images.json` z wymiarami i rozmytymi miniaturami LQIP.

Komponent `<Img>` czyta manifest i renderuje zwykły `<img srcset sizes>`
z `width`/`height` — czyli to, co dawałby `next/image`, ale bez serwera
optymalizacji, którego przy eksporcie statycznym nie ma.

**Dodanie zdjęcia do galerii:** wrzuć plik do `assets/galeria/`, dopisz wpis
`{ id: "galeria/nazwa-pliku", alt: "…" }` w `data/gallery.ts`, uruchom
`npm run dev`. Analogicznie logotypy: `assets/partnerzy/` + `data/partners.ts`.

## Wdrożenie

### GitHub Pages (automatyczne)

Każdy push na `main` uruchamia `.github/workflows/deploy.yml`: build statyczny
i publikacja na <https://cgrzegorz.github.io/nawrot1/>.

Jednorazowo w repozytorium: **Settings → Pages → Build and deployment →
Source: GitHub Actions**.

Pages serwuje projekt z podkatalogu, więc build używa `basePath` `/nawrot1`
(`next.config.ts` + `lib/base.ts`). `next/link` prefiksuje adresy sam; surowe
`src`/`href` (obrazy z manifestu, PDF z `public/dokumenty/`) przechodzą przez
`asset()`, a adresy kanoniczne i JSON-LD przez `absoluteUrl()`.

Sterują tym dwie zmienne środowiskowe ustawiane w workflow:

| zmienna                 | domyślnie                | opis                              |
| ----------------------- | ------------------------ | --------------------------------- |
| `NEXT_PUBLIC_BASE_PATH` | `/nawrot1`               | podkatalog hostingu; `` = katalog główny |
| `NEXT_PUBLIC_SITE_URL`  | `https://dzwigi-nawrot.pl` | origin w metadanych i sitemapie   |

Po podpięciu własnej domeny (`dzwigi-nawrot.pl`) wystarczy w workflow ustawić
`NEXT_PUBLIC_BASE_PATH: ""`, dodać plik `public/CNAME` z domeną i rekordy DNS.

### Własny hosting

```bash
npm run build      # -> katalog out/
```

Zawartość `out/` wgrywamy na hosting. W paczce jest `.htaccess`, który na
serwerach Apache:

- wymusza jedną kanoniczną domenę (`https://dzwigi-nawrot.pl`, bez `www`),
- przekierowuje **301** stare adresy Joomli na nowe:

  | stary adres                     | nowy adres    |
  | ------------------------------- | ------------- |
  | `/index.php/o-firmie`           | `/o-firmie/`  |
  | `/index.php/partnerzy`          | `/partnerzy/` |
  | `/index.php/galeria`            | `/galeria/`   |
  | `/index.php/kontakt`            | `/kontakt/`   |
  | `/index.php`                    | `/`           |

- ustawia `ErrorDocument 404 /404.html`, kompresję i nagłówki cache.

Gdyby hosting nie był Apache (albo `mod_rewrite` był wyłączony), w `out/index.php/*/`
leżą awaryjne strony z `<meta http-equiv="refresh">` i `rel=canonical`. Na nginx
warto zamiast nich dodać zwykłe `return 301`.

## SEO

Wbudowane w projekt:

- `title` + `description` + `rel=canonical` unikalne dla każdej podstrony,
- Open Graph i Twitter Card z gotowym obrazkiem `public/og.jpg` (1200×630),
- `sitemap.xml` i `robots.txt` generowane przy buildzie,
- dane strukturalne JSON-LD: `LocalBusiness` (adres, NIP, telefon, godziny,
  obszar działania, katalog usług), `BreadcrumbList` na podstronach,
  `ImageGallery` w galerii,
- opisy alternatywne przy wszystkich zdjęciach, `width`/`height` (brak CLS),
- semantyczny HTML, jeden `<h1>` na stronę, okruszki, „przejdź do treści”,
- fonty hostowane lokalnie — strona nie wysyła żadnych zapytań do zewnętrznych
  serwerów, mapka też jest statycznym obrazem, więc nie potrzeba banera zgód.

**Po uruchomieniu strony** zostaje do zrobienia po stronie właściciela:

1. Dodać domenę w [Google Search Console](https://search.google.com/search-console)
   i zgłosić `https://dzwigi-nawrot.pl/sitemap.xml`.
2. Sprawdzić w GSC raport „Strony” po ok. 2 tygodniach, czy stare adresy
   `/index.php/...` zostały przemapowane na nowe.
3. Zaktualizować/uzupełnić **Profil Firmy w Google** (godziny, zdjęcia, adres
   `ul. Twarda 3, 95-054 Ksawerów`) — to główne źródło ruchu lokalnego.
4. Podmienić domyślne godziny otwarcia w `data/site.ts` (`openingHours`) na
   faktyczne — teraz jest pn–pt 7:00–17:00. Jedna zmiana obejmuje pasek
   kontaktowy w nagłówku i dane strukturalne dla Google.
