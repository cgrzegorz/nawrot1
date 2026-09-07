"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Icon from "./Icon";

export type GalleryItem = {
  alt: string;
  thumbSrc: string;
  thumbSrcSet: string;
  width: number;
  height: number;
  fullSrc: string;
  blur: string;
};

export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => {
    setIndex(null);
    openerRef.current?.focus();
  }, []);

  const step = useCallback(
    (delta: number) =>
      setIndex((i) => (i === null ? i : (i + delta + items.length) % items.length)),
    [items.length]
  );

  useEffect(() => {
    if (index === null) return;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, close, step]);

  const active = index === null ? null : items[index];

  return (
    <>
      <div className="masonry">
        {items.map((item, i) => (
          <button
            key={item.fullSrc}
            type="button"
            aria-label={`Powiększ zdjęcie: ${item.alt}`}
            onClick={(e) => {
              openerRef.current = e.currentTarget;
              setIndex(i);
            }}
          >
            <img
              src={item.thumbSrc}
              srcSet={item.thumbSrcSet}
              sizes="(max-width: 560px) 100vw, (max-width: 1000px) 50vw, 33vw"
              width={item.width}
              height={item.height}
              alt={item.alt}
              loading={i < 6 ? "eager" : "lazy"}
              decoding="async"
              style={{ backgroundImage: `url(${item.blur})`, backgroundSize: "cover" }}
            />
          </button>
        ))}
      </div>

      {active && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <button
            ref={closeRef}
            type="button"
            className="lb-btn lightbox__close"
            onClick={close}
            aria-label="Zamknij podgląd"
          >
            <Icon name="close" size={22} strokeWidth={2} />
          </button>

          <div className="lightbox__stage">
            <img src={active.fullSrc} alt={active.alt} />
          </div>

          <div className="lightbox__bar">
            <button
              type="button"
              className="lb-btn"
              onClick={() => step(-1)}
              aria-label="Poprzednie zdjęcie"
            >
              <Icon name="prev" size={22} strokeWidth={2} />
            </button>
            <p className="lightbox__caption">
              {/*{active.alt}*/}
              <br />
              <span aria-hidden="true">
                {(index ?? 0) + 1} / {items.length}
              </span>
            </p>
            <button
              type="button"
              className="lb-btn"
              onClick={() => step(1)}
              aria-label="Następne zdjęcie"
            >
              <Icon name="next" size={22} strokeWidth={2} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
