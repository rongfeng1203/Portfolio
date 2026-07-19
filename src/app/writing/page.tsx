"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, FileText, Search, X } from "lucide-react";
import { type CSSProperties, useEffect, useRef, useState } from "react";
import banner from "../../../assets/icon.png";
import { writingSummaries } from "@/lib/writingDocuments";

export default function WritingPage() {
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const filteredDocuments = writingSummaries.filter((document) =>
    !normalizedQuery || [
      document.title,
      document.subtitle,
      document.type,
      document.genre,
      document.language,
      document.excerpt,
    ].join(" ").toLocaleLowerCase().includes(normalizedQuery),
  );

  useEffect(() => {
    const focusSearch = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLocaleLowerCase() === "k") {
        event.preventDefault();
        searchRef.current?.focus();
      }
      if (event.key === "Escape" && document.activeElement === searchRef.current) {
        setQuery("");
        searchRef.current?.blur();
      }
    };
    window.addEventListener("keydown", focusSearch);
    return () => window.removeEventListener("keydown", focusSearch);
  }, []);

  return (
    <main
      className="section-page section-writing writing-library min-h-screen px-4 pb-12 pt-8 text-paper sm:px-6 lg:px-8"
      style={{
        "--section-color": "var(--pink)",
        "--section-accent": "var(--orange)",
        "--section-text": "var(--orange)",
      } as CSSProperties}
    >
      <div className="section-noise-layer" aria-hidden="true" />

      <header className="section-topbar">
        <Link href="/" className="section-back" aria-label="Back to home">
          /index
        </Link>
        <div className="section-banner-mark" aria-hidden="true">
          <Image src={banner} alt="" className="section-banner-image" width={1242} height={406} quality={100} />
        </div>
        <p>TEXT_ENGINE</p>
      </header>

      <section className="writing-library-hero">
        <div className="writing-library-title">
          <p className="section-code">TEXT_ENGINE / LIBRARY</p>
          <h1>Writing</h1>
          <p className="section-cn">写作</p>
        </div>
        <div className="writing-library-intro">
          <p>Speculative fiction about consciousness, systems, memory, freedom, and the people caught inside them.</p>
          <span>20 COMPLETE PIECES / 1 WORKING DRAFT</span>
        </div>
      </section>

      <section className="writing-documents" aria-labelledby="writing-documents-title">
        <div className="writing-documents-toolbar">
          <div>
            <span>{filteredDocuments.length.toString().padStart(2, "0")}</span>
            <h2 id="writing-documents-title">Documents</h2>
          </div>
          <label className="writing-search">
            <Search aria-hidden="true" size={15} strokeWidth={1.5} />
            <span className="sr-only">Search documents</span>
            <input
              ref={searchRef}
              type="search"
              placeholder="SEARCH TITLE, THEME, LANGUAGE"
              aria-label="Search documents"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            {query ? (
              <button type="button" onClick={() => setQuery("")} aria-label="Clear search">
                <X size={14} strokeWidth={1.5} />
              </button>
            ) : (
              <kbd>⌘ K</kbd>
            )}
          </label>
          <p>GRID_VIEW / {writingSummaries.length.toString().padStart(2, "0")} FILES</p>
        </div>

        <div className="writing-doc-grid">
          {filteredDocuments.length ? (
            filteredDocuments.map((document) => {
              const documentIndex = writingSummaries.findIndex((item) => item.slug === document.slug);
              const documentCode = `DOC_${(documentIndex + 1).toString().padStart(3, "0")}`;

              return (
                <Link
                  key={document.slug}
                  href={`/writing/${document.slug}`}
                  className="writing-doc-card"
                  aria-label={`Read ${document.title}`}
                >
                  <div className="writing-doc-preview" aria-hidden="true">
                    <div className="writing-preview-paper">
                      <div className="writing-preview-header">
                        <FileText size={15} strokeWidth={1.5} />
                        <span>{documentCode}</span>
                      </div>
                      <p className="writing-preview-genre">{document.genre}</p>
                      <h3>{document.title}</h3>
                      <p>{document.subtitle}</p>
                      <div className="writing-preview-lines">
                        <i />
                        <i />
                        <i />
                        <i />
                      </div>
                      <strong>{document.previewLine}</strong>
                    </div>
                    <span className="writing-open-cue">
                      OPEN <ArrowUpRight size={14} strokeWidth={1.5} />
                    </span>
                  </div>
                  <div className="writing-doc-meta">
                    <div>
                      <div className="writing-doc-flags">
                        <span>{document.status}</span>
                        <span>{document.language}</span>
                      </div>
                      <h3>{document.title}</h3>
                      <p>{document.excerpt}</p>
                    </div>
                    <dl>
                      <div>
                        <dt>TYPE</dt>
                        <dd>{document.genre}</dd>
                      </div>
                      <div>
                        <dt>LENGTH</dt>
                        <dd>{document.readingTime}</dd>
                      </div>
                    </dl>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="writing-no-results" role="status">
              <span>00 RESULTS</span>
              <p>No document signal matches “{query}”.</p>
              <button type="button" onClick={() => setQuery("")}>RESET SEARCH</button>
            </div>
          )}
        </div>
      </section>

      <footer className="writing-library-footer">
        <span>RONG FENG / WRITING ARCHIVE</span>
        <span>LAST SIGNAL: 20 COMPLETE / 01 IN PROGRESS</span>
      </footer>
    </main>
  );
}
