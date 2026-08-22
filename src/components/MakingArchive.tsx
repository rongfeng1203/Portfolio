"use client";

import Image from "next/image";
import { ArrowDownToLine, ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { type CSSProperties, type KeyboardEvent, useState } from "react";
import { getMakingPageImage, makingProjects, type MakingProject } from "@/lib/makingProjects";

function MakingPdfSlideshow({ project, projectIndex }: { project: MakingProject; projectIndex: number }) {
  const [activePage, setActivePage] = useState(0);

  const goToPage = (pageIndex: number) => {
    setActivePage(Math.max(0, Math.min(pageIndex, project.pageCount - 1)));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goToPage(activePage - 1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      goToPage(activePage + 1);
    }
  };

  return (
    <article
      className="making-slideshow-card"
      style={{ "--making-project-accent": project.accent } as CSSProperties}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label={`${project.title} PDF slideshow`}
    >
      <header className="making-slideshow-heading">
        <div>
          <span>{project.code} / {project.year}</span>
          <h2>{project.title}</h2>
          <p>{project.subtitle}</p>
        </div>

        <div className="making-slideshow-actions">
          <a href={project.pdfUrl} download={`${project.title}.pdf`} aria-label={`Download ${project.title} PDF`}>
            <ArrowDownToLine size={16} strokeWidth={1.6} aria-hidden="true" />
            <span>PDF</span>
          </a>
          <a href={project.pdfUrl} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} PDF in a new tab`}>
            <ExternalLink size={16} strokeWidth={1.6} aria-hidden="true" />
          </a>
        </div>
      </header>

      <div className="photo-slideshow-frame making-slideshow-frame">
        <button
          type="button"
          className="making-slide-arrow is-previous"
          onClick={() => goToPage(activePage - 1)}
          disabled={activePage === 0}
          aria-label={`Previous page of ${project.title}`}
        >
          <ArrowLeft size={24} strokeWidth={1.5} aria-hidden="true" />
        </button>

        <Image
          key={`${project.id}-${activePage}`}
          src={getMakingPageImage(project, activePage)}
          alt={`${project.title}, page ${activePage + 1} of ${project.pageCount}`}
          className="photo-slideshow-image making-slideshow-image"
          width={1800}
          height={1013}
          sizes="(max-width: 760px) 94vw, 92vw"
          quality={100}
          priority={projectIndex === 0 && activePage === 0}
          unoptimized
        />

        <button
          type="button"
          className="making-slide-arrow is-next"
          onClick={() => goToPage(activePage + 1)}
          disabled={activePage === project.pageCount - 1}
          aria-label={`Next page of ${project.title}`}
        >
          <ArrowRight size={24} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>

      <div className="photo-slideshow-meta making-slideshow-meta">
        <span aria-live="polite">
          {String(activePage + 1).padStart(2, "0")} / {String(project.pageCount).padStart(2, "0")}
        </span>
        <strong>{project.title}</strong>
        <em>{project.discipline}</em>
      </div>
    </article>
  );
}

export default function MakingArchive() {
  return (
    <div className="making-archive">
      <section className="making-archive-intro">
        <div>
          <p className="section-code">MATERIAL_LOG / 06 FILES</p>
          <h1>Making</h1>
          <p className="section-cn">制作</p>
        </div>
        <p>
          Process books from material experiments, fabrication, product design, and collaborative builds. Use the arrows on each file to turn its pages.
        </p>
      </section>

      <section className="making-slideshow-list" aria-label="Making project PDF slideshows">
        {makingProjects.map((project, projectIndex) => (
          <MakingPdfSlideshow key={project.id} project={project} projectIndex={projectIndex} />
        ))}
      </section>
    </div>
  );
}
