"use client";

import { useEffect, useState } from "react";
import type { PortfolioSection } from "@/lib/portfolioSections";

type MediaItem = NonNullable<PortfolioSection["mediaItems"]>[number];

function shuffleMediaItems(items: MediaItem[]) {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled;
}

export default function PhotographySlideshow({
  items,
  label = "Gallery slideshow",
  shuffle = false,
}: {
  items: MediaItem[];
  label?: string;
  shuffle?: boolean;
}) {
  const [displayItems, setDisplayItems] = useState(items);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setActiveIndex(0);
      setDisplayItems(shuffle ? shuffleMediaItems(items) : items);
    }, 0);

    return () => window.clearTimeout(timer);
  }, [items, shuffle]);

  useEffect(() => {
    if (displayItems.length <= 1) return;
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % displayItems.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, [displayItems.length]);

  if (!displayItems.length) return null;

  const active = displayItems[activeIndex % displayItems.length];

  return (
    <section className="photo-slideshow" aria-label={label}>
      <div className="photo-slideshow-frame">
        {active.type === "video" ? (
          <video
            key={active.src}
            src={active.src}
            className="photo-slideshow-image"
            muted
            autoPlay
            loop
            playsInline
            controls
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={active.src}
            src={active.src}
            alt={active.title}
            className="photo-slideshow-image"
          />
        )}
      </div>
      <div className="photo-slideshow-meta">
        <span>{String(activeIndex + 1).padStart(2, "0")} / {String(displayItems.length).padStart(2, "0")}</span>
        <strong>{active.title}</strong>
        <em>{active.meta}</em>
      </div>
    </section>
  );
}
