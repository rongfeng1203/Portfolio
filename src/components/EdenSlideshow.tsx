"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

const pageCount = 6;

export default function EdenSlideshow() {
  const [page, setPage] = useState(0);
  const turnPage = (direction: number) => setPage((current) => Math.max(0, Math.min(pageCount - 1, current + direction)));
  return (
    <div className="making-slideshow-list">
      <article
        className="making-slideshow-card"
        tabIndex={0}
        aria-label="Eden slideshow"
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            turnPage(event.key === "ArrowLeft" ? -1 : 1);
          }
        }}
      >
        <header className="making-slideshow-heading">
          <div><h2>Eden</h2></div>
        </header>
        <div className="photo-slideshow-frame making-slideshow-frame">
          <button className="making-slide-arrow is-previous" type="button" aria-label="Previous Eden page" disabled={page === 0} onClick={() => turnPage(-1)}>
            <ArrowLeft size={18} aria-hidden="true" />
          </button>
          <Image
            src={`/portfolio-assets/digital/eden/page-${page + 1}.jpg`}
            alt={`Eden, page ${page + 1} of ${pageCount}`}
            width={1800}
            height={846}
            className="photo-slideshow-image making-slideshow-image"
            sizes="(max-width: 760px) 94vw, 92vw"
            unoptimized
          />
          <button className="making-slide-arrow is-next" type="button" aria-label="Next Eden page" disabled={page === pageCount - 1} onClick={() => turnPage(1)}>
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
        <div className="photo-slideshow-meta making-slideshow-meta">
          <span aria-live="polite">{String(page + 1).padStart(2, "0")} / {pageCount}</span>
        </div>
      </article>
    </div>
  );
}
