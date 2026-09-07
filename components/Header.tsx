"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { nav, site } from "@/data/site";
import Icon from "./Icon";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navId = useId();

  // Zamknij menu po przejściu na inną podstronę.
  useEffect(() => setOpen(false), [pathname]);

  // Po przewinięciu chowamy górny pasek i zagęszczamy nagłówek.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menu mobilne przykrywa stronę: blokujemy przewijanie i obsługujemy Escape.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="site-header" data-scrolled={scrolled || undefined}>
      <div className="topbar">
        <div className="wrap topbar__inner">
          <a href={`mailto:${site.email}`}>
            <Icon name="mail" size={15} strokeWidth={1.9} />
            {site.email}
          </a>
          <span className="topbar__item">
            <Icon name="pin" size={15} strokeWidth={1.9} />
            {site.address.street}, {site.address.postalCode} {site.address.city}
          </span>
          <span className="topbar__hours">{site.openingHours.label}</span>
        </div>
      </div>

      <div className="site-header__bar">
        <div className="wrap site-header__inner">
          <Link href="/" className="brand" aria-label={`${site.name} — strona główna`}>
            <span className="brand__mark" aria-hidden="true">
              <svg viewBox="0 0 64 64" width="26" height="26" fill="none">
                <g
                  stroke="currentColor"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 52h36" />
                  <path d="M20 52V16h30" />
                  <path d="M20 16 32 8" />
                  <path d="M42 16v10" />
                </g>
                <rect x="36" y="26" width="12" height="9" rx="2" fill="currentColor" />
              </svg>
            </span>
            <span>
              <span className="brand__name">Dźwigi Nawrot</span>
              <span className="brand__tag">Żurawie 10–80 t · od {site.founded}</span>
            </span>
          </Link>

          <nav id={navId} className="nav" hidden={!open} aria-label="Menu główne">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}

            {/* Widoczne tylko w menu mobilnym — na desktopie te dane są w pasku górnym. */}
            <span className="nav__contact">
              <a href={`tel:${site.phoneHref}`}>
                <Icon name="phone" size={18} />
                {site.phone}
              </a>
              <a href={`mailto:${site.email}`}>
                <Icon name="mail" size={18} />
                {site.email}
              </a>
            </span>
          </nav>

          <a className="header-cta" href={`tel:${site.phoneHref}`}>
            <Icon name="phone" size={17} strokeWidth={1.9} />
            <span>{site.phone}</span>
          </a>

          <button
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls={navId}
            aria-label={open ? "Zamknij menu" : "Otwórz menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? "close" : "menu"} size={22} strokeWidth={2} />
          </button>
        </div>
      </div>
    </header>
  );
}
