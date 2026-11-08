"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import PhotographySlideshow from "@/components/PhotographySlideshow";
import type { PortfolioSection } from "@/lib/portfolioSections";

const pageCount = 11;
const theatreVideos = [
  { id: "HEWFHyZanHk", title: "Chicago Show Reel 1" },
  { id: "XmlhzrLPdno", title: "Chicago Show Reel 2" },
  { id: "4Zo1QtEwXVc", title: "Chicago Show Reel 3" },
];

export default function TheatreShowcase({ photos, processItems }: { photos: NonNullable<PortfolioSection["mediaItems"]>; processItems: NonNullable<PortfolioSection["mediaItems"]> }) {
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
          <div><h2>Portfolio</h2></div>
        </header>
        <div className="photo-slideshow-frame making-slideshow-frame">
          <button className="making-slide-arrow is-previous" type="button" aria-label="Previous theatre portfolio page" disabled={page === 0} onClick={() => turnPage(-1)}>
            <ArrowLeft size={18} aria-hidden="true" />
          </button>
          <Image
            src={`/portfolio-assets/theatre/portfolio/v3-page-${String(page + 1).padStart(2, "0")}.jpg?v=e6a0aadcc6`}
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
        </div>
      </article>
      <section id="theatre-videos" aria-labelledby="theatre-videos-title">
        <header className="making-slideshow-heading">
          <div><h2 id="theatre-videos-title">Show Reels</h2></div>
        </header>
        <div className="game-demo-grid" style={{ gridTemplateColumns: "minmax(0, 1fr)" }}>
          {theatreVideos.map((video) => (
            <article key={video.id} className="game-demo-card">
              <div className="game-video-frame">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${video.id}?rel=0`}
                  title={video.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
              <div className="game-demo-caption">
                <h3>{video.title}</h3>
                <a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noreferrer">
                  watch on youtube ↗
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section id="theatre-photos" aria-label="Theatre photos">
        <header className="making-slideshow-heading">
          <div><h2>Photos</h2></div>
        </header>
        <PhotographySlideshow items={photos} label="Theatre photo slideshow" />
      </section>
      <section id="theatre-process" aria-label="Dirty Work and Paper Work">
        <header className="making-slideshow-heading">
          <div><h2>Dirty Work &amp; Paper Work</h2></div>
        </header>
        <PhotographySlideshow items={processItems} label="Dirty Work and Paper Work slideshow" />
      </section>
    </div>
  );
}
