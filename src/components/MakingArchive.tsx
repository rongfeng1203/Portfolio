"use client";

import Image from "next/image";
import {
  ArrowDownToLine,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  FileText,
  Maximize2,
  Minimize2,
  Minus,
  Plus,
  Scan,
} from "lucide-react";
import { type CSSProperties, useCallback, useEffect, useRef, useState } from "react";
import { getMakingPageImage, makingProjects } from "@/lib/makingProjects";

const zoomLevels = [70, 85, 100, 115, 130];

export default function MakingArchive() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [zoomIndex, setZoomIndex] = useState(2);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const viewerRef = useRef<HTMLDivElement>(null);
  const pageScrollerRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<Array<HTMLDivElement | null>>([]);
  const scrollFrameRef = useRef<number | null>(null);

  const activeProject = makingProjects[activeProjectIndex];
  const zoom = zoomLevels[zoomIndex];
  const pageIndexes = Array.from({ length: activeProject.pageCount }, (_, index) => index);

  const scrollToPage = useCallback((pageIndex: number) => {
    const targetIndex = Math.max(0, Math.min(pageIndex, activeProject.pageCount - 1));
    const target = pageRefs.current[targetIndex];

    setCurrentPage(targetIndex);
    target?.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
  }, [activeProject.pageCount]);

  const selectProject = (projectIndex: number) => {
    if (projectIndex === activeProjectIndex) {
      scrollToPage(0);
      return;
    }

    setActiveProjectIndex(projectIndex);
    setCurrentPage(0);
    setZoomIndex(2);
  };

  const toggleFullscreen = async () => {
    if (!viewerRef.current) return;

    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await viewerRef.current.requestFullscreen();
      }
    } catch {
      // Fullscreen can be blocked by the browser; the viewer remains usable.
    }
  };

  useEffect(() => {
    pageRefs.current = pageRefs.current.slice(0, activeProject.pageCount);
    pageScrollerRef.current?.scrollTo({ top: 0, left: 0 });
  }, [activeProject.id, activeProject.pageCount]);

  useEffect(() => {
    const scroller = pageScrollerRef.current;
    if (!scroller) return;

    const updateCurrentPage = () => {
      scrollFrameRef.current = null;
      const scrollerBounds = scroller.getBoundingClientRect();
      const viewportCenter = scrollerBounds.top + scrollerBounds.height / 2;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      pageRefs.current.forEach((page, index) => {
        if (!page) return;
        const bounds = page.getBoundingClientRect();
        const distance = Math.abs(bounds.top + bounds.height / 2 - viewportCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setCurrentPage(closestIndex);
    };

    const handleScroll = () => {
      if (scrollFrameRef.current !== null) return;
      scrollFrameRef.current = window.requestAnimationFrame(updateCurrentPage);
    };

    updateCurrentPage();
    scroller.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      scroller.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current);
      }
    };
  }, [activeProject.id]);

  useEffect(() => {
    const handleKeys = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.matches("input, textarea, select")) return;

      if (event.key === "ArrowRight" || event.key === "PageDown") {
        event.preventDefault();
        scrollToPage(currentPage + 1);
      } else if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        scrollToPage(currentPage - 1);
      } else if (event.key === "Home") {
        event.preventDefault();
        scrollToPage(0);
      } else if (event.key === "End") {
        event.preventDefault();
        scrollToPage(activeProject.pageCount - 1);
      }
    };

    window.addEventListener("keydown", handleKeys);
    return () => window.removeEventListener("keydown", handleKeys);
  }, [activeProject.pageCount, currentPage, scrollToPage]);

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  return (
    <section
      ref={viewerRef}
      className="making-viewer"
      aria-label="Making project document archive"
      style={
        {
          "--making-project-accent": activeProject.accent,
          "--making-page-width": `${zoom}%`,
        } as CSSProperties
      }
    >
      <aside className="making-project-rail" aria-label="Project library">
        <div className="making-archive-heading">
          <span>MATERIAL_LOG / LIBRARY</span>
          <h1>Making</h1>
          <p className="section-cn">制作</p>
          <p>
            Past projects kept as working documents: decisions, tests, failures, systems, and finished outcomes.
          </p>
        </div>

        <div className="making-project-list">
          <p>
            <span>{makingProjects.length.toString().padStart(2, "0")}</span>
            PROJECT FILES
          </p>
          {makingProjects.map((project, projectIndex) => (
            <button
              key={project.id}
              type="button"
              className={projectIndex === activeProjectIndex ? "is-active" : undefined}
              style={{ "--project-card-accent": project.accent } as CSSProperties}
              onClick={() => selectProject(projectIndex)}
              aria-pressed={projectIndex === activeProjectIndex}
            >
              <span className="making-project-cover" aria-hidden="true">
                <Image
                  src={getMakingPageImage(project, 0)}
                  alt=""
                  fill
                  sizes="(max-width: 760px) 42vw, 16rem"
                  loading={projectIndex === 0 ? "eager" : "lazy"}
                  unoptimized
                />
              </span>
              <span className="making-project-card-copy">
                <small>{project.code} / {project.year}</small>
                <strong>{project.title}</strong>
                <em>{project.discipline} / {project.pageCount} pages</em>
              </span>
            </button>
          ))}
        </div>

        <div className="making-project-details">
          <span>ACTIVE FILE</span>
          <h2>{activeProject.title}</h2>
          <p>{activeProject.description}</p>
          <dl>
            <div>
              <dt>ROLE</dt>
              <dd>{activeProject.role}</dd>
            </div>
            {activeProject.collaborators ? (
              <div>
                <dt>WITH</dt>
                <dd>{activeProject.collaborators}</dd>
              </div>
            ) : null}
            <div>
              <dt>FORMAT</dt>
              <dd>{activeProject.pageCount}-page deck</dd>
            </div>
          </dl>
          <ul>
            {activeProject.tags.map((tag) => <li key={tag}>{tag}</li>)}
          </ul>
        </div>
      </aside>

      <div className="making-document-panel">
        <header className="making-viewer-toolbar">
          <div className="making-file-identity">
            <FileText size={15} strokeWidth={1.5} aria-hidden="true" />
            <span>
              <strong>{activeProject.title}</strong>
              <small>{activeProject.subtitle}</small>
            </span>
          </div>

          <div className="making-page-controls" aria-label="Page controls">
            <button
              type="button"
              onClick={() => scrollToPage(currentPage - 1)}
              disabled={currentPage === 0}
              aria-label="Previous page"
            >
              <ArrowLeft size={15} strokeWidth={1.6} />
            </button>
            <span aria-live="polite">
              {(currentPage + 1).toString().padStart(2, "0")} / {activeProject.pageCount.toString().padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={() => scrollToPage(currentPage + 1)}
              disabled={currentPage === activeProject.pageCount - 1}
              aria-label="Next page"
            >
              <ArrowRight size={15} strokeWidth={1.6} />
            </button>
          </div>

          <div className="making-viewer-actions" aria-label="Document viewer controls">
            <button
              type="button"
              onClick={() => setZoomIndex((index) => Math.max(0, index - 1))}
              disabled={zoomIndex === 0}
              aria-label="Zoom out"
            >
              <Minus size={14} strokeWidth={1.6} />
            </button>
            <button type="button" onClick={() => setZoomIndex(2)} aria-label="Fit pages to viewer width">
              <Scan size={14} strokeWidth={1.6} />
              <span>{zoom}%</span>
            </button>
            <button
              type="button"
              onClick={() => setZoomIndex((index) => Math.min(zoomLevels.length - 1, index + 1))}
              disabled={zoomIndex === zoomLevels.length - 1}
              aria-label="Zoom in"
            >
              <Plus size={14} strokeWidth={1.6} />
            </button>
            <a href={activeProject.pdfUrl} download={`${activeProject.title}.pdf`} aria-label={`Download ${activeProject.title} PDF`}>
              <ArrowDownToLine size={14} strokeWidth={1.6} />
            </a>
            <a href={activeProject.pdfUrl} target="_blank" rel="noreferrer" aria-label={`Open ${activeProject.title} PDF in a new tab`}>
              <ExternalLink size={14} strokeWidth={1.6} />
            </a>
            <button type="button" onClick={toggleFullscreen} aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}>
              {isFullscreen ? <Minimize2 size={14} strokeWidth={1.6} /> : <Maximize2 size={14} strokeWidth={1.6} />}
            </button>
          </div>
        </header>

        <div ref={pageScrollerRef} className="making-page-scroller">
          <div className="making-page-stack">
            {pageIndexes.map((pageIndex) => (
              <div
                key={`${activeProject.id}-${pageIndex}`}
                ref={(node) => {
                  pageRefs.current[pageIndex] = node;
                }}
                className={`making-page-sheet${currentPage === pageIndex ? " is-current" : ""}`}
                data-page={(pageIndex + 1).toString().padStart(2, "0")}
              >
                <Image
                  src={getMakingPageImage(activeProject, pageIndex)}
                  alt={`${activeProject.title}, page ${pageIndex + 1} of ${activeProject.pageCount}`}
                  width={1800}
                  height={1013}
                  sizes="(max-width: 760px) 94vw, (max-width: 1200px) 72vw, 70vw"
                  quality={100}
                  loading={pageIndex === 0 ? "eager" : "lazy"}
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <nav className="making-page-rail" aria-label={`${activeProject.title} pages`}>
        <div>
          <span>PAGES</span>
          <strong>{activeProject.pageCount.toString().padStart(2, "0")}</strong>
        </div>
        <div className="making-page-thumbnails">
          {pageIndexes.map((pageIndex) => (
            <button
              key={`${activeProject.id}-thumb-${pageIndex}`}
              type="button"
              className={currentPage === pageIndex ? "is-current" : undefined}
              onClick={() => scrollToPage(pageIndex)}
              aria-label={`Go to page ${pageIndex + 1}`}
              aria-current={currentPage === pageIndex ? "page" : undefined}
            >
              <Image
                src={getMakingPageImage(activeProject, pageIndex)}
                alt=""
                width={160}
                height={90}
                sizes="6rem"
                loading={pageIndex === 0 ? "eager" : "lazy"}
                unoptimized
              />
              <span>{(pageIndex + 1).toString().padStart(2, "0")}</span>
            </button>
          ))}
        </div>
      </nav>
    </section>
  );
}
