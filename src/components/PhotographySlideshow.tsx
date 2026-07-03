"use client";

import { useEffect, useState } from "react";
import type { PortfolioSection } from "@/lib/portfolioSections";

type MediaItem = NonNullable<PortfolioSection["mediaItems"]>[number];

export default function PhotographySlideshow({ items }: { items: MediaItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % items.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, [items.length]);

  if (!items.length) return null;

  const active = items[activeIndex];

  return (
    <section className="photo-slideshow" aria-label="Photography slideshow">
      <div className="photo-slideshow-frame">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={active.src}
          src={active.src}
          alt={active.title}
          className="photo-slideshow-image"
        />
      </div>
      <div className="photo-slideshow-meta">
        <span>{String(activeIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>
        <strong>{active.title}</strong>
        <em>{active.meta}</em>
      </div>
    </section>
  );
}
