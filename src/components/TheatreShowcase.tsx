"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import PhotographySlideshow from "@/components/PhotographySlideshow";
import type { PortfolioSection } from "@/lib/portfolioSections";

const pageCount = 13;

export default function TheatreShowcase({ photos }: { photos: NonNullable<PortfolioSection["mediaItems"]> }) {
  const [page, setPage] = useState(0);
  const turnPage = (direction: number) => setPage((current) => Math.max(0, Math.min(pageCount - 1, current + direction)));

  return (
    <div className="making-slideshow-list">
      <article
        className="making-slideshow-card"
        tabIndex={0}
        aria-label="Theatre portfolio slideshow"
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            turnPage(event.key === "ArrowLeft" ? -1 : 1);
          }
        }}
      >
        <header className="making-slideshow-heading">
          <div><span>THEATRE / PORTFOLIO</span><h2>Portfolio</h2></div>
        </header>
        <div className="photo-slideshow-frame making-slideshow-frame">
          <button className="making-slide-arrow is-previous" type="button" aria-label="Previous theatre portfolio page" disabled={page === 0} onClick={() => turnPage(-1)}>
            <ArrowLeft size={18} aria-hidden="true" />
          </button>
          <Image
            src={`/portfolio-assets/theatre/portfolio/page-${String(page + 1).padStart(2, "0")}.jpg`}
            alt={`Theatre portfolio, page ${page + 1} of ${pageCount}`}
            width={1800}
            height={1013}
            className="photo-slideshow-image making-slideshow-image"
            sizes="(max-width: 760px) 94vw, 92vw"
            unoptimized
          />
          <button className="making-slide-arrow is-next" type="button" aria-label="Next theatre portfolio page" disabled={page === pageCount - 1} onClick={() => turnPage(1)}>
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
        <div className="photo-slideshow-meta making-slideshow-meta">
          <span aria-live="polite">{String(page + 1).padStart(2, "0")} / {pageCount}</span>
          <strong>Theatre</strong>
        </div>
      </article>
      <section id="theatre-photos" aria-label="Theatre photos">
        <header className="making-slideshow-heading">
          <div><span>THEATRE / PHOTOGRAPHY</span><h2>Photos</h2></div>
        </header>
        <PhotographySlideshow items={photos} label="Theatre photo slideshow" />
      </section>
    </div>
  );
}
