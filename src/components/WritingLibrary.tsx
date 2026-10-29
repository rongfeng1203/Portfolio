"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, FileText, Search, X } from "lucide-react";
import { type CSSProperties, useEffect, useRef, useState } from "react";
import WritingLanguageSelector from "@/components/WritingLanguageSelector";
import { useWritingLanguage } from "@/hooks/useWritingLanguage";
import banner from "../../assets/icon.png";
import { writingSummaries } from "@/lib/writingDocuments";
import { getWritingSummaryTranslation } from "@/lib/writingSummaryTranslations";

export default function WritingLibrary({ category }: { category?: "chinese" | "english" | "drafts" }) {
  const documents = writingSummaries.filter(document => !category || (category === "drafts" ? document.status !== "COMPLETE" : document.status === "COMPLETE" && document.language === (category === "english" ? "ENGLISH" : "中文")));
  const [language, setLanguage] = useWritingLanguage();
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const localizedDocuments = documents.map((document) => {
    const originalLanguage = document.language === "ENGLISH" ? "en" : "zh-CN";
    const translation = getWritingSummaryTranslation(document.slug);
    const translated = language !== originalLanguage && translation;
    return {
      ...document,
      ...(translated || {}),
      language: translated ? (language === "en" ? "ENGLISH" : "中文") : document.language,
      searchText: [document.title, document.subtitle, document.excerpt,
        translation?.title, translation?.subtitle, translation?.excerpt].join(" "),
    };
  });
  const filteredDocuments = localizedDocuments.filter((document) =>
    !normalizedQuery || [
      document.title,
      document.subtitle,
      document.type,
      document.genre,
      document.language,
      document.excerpt,
      document.searchText,
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
        <Link href={category ? "/writing" : "/"} className="section-back" aria-label={category ? "Back to Writing" : "Back to home"}>
          {category ? "/writing" : "/index"}
        </Link>
        <Link href="/" className="section-banner-mark" aria-label="Back to home">
          <Image src={banner} alt="" className="section-banner-image" width={1242} height={406} quality={100} />
        </Link>
      </header>

      <section className="writing-library-hero">
        <div className="writing-library-title">
          <h1>{category ? { chinese: "中文", english: "English", drafts: "Drafts" }[category] : "Writing"}</h1>
          <p className="section-cn">写作</p>
        </div>
        <div className="writing-library-intro">
          <p className="writing-translation-note">Translations assisted by AI.</p>
          <WritingLanguageSelector language={language} onChange={setLanguage} />
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
              placeholder="Search writing"
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
        </div>

        <div className="writing-doc-grid">
          {filteredDocuments.length ? (
            filteredDocuments.map((document) => {

              return (
                <Link
                  key={document.slug}
                  href={`/writing/${document.slug}`}
                  className="writing-doc-card"
                  lang={document.language === "ENGLISH" ? "en" : "zh-CN"}
                  aria-label={`Read ${document.title}`}
                >
                  <div className="writing-doc-preview" aria-hidden="true">
                    <div className="writing-preview-paper">
                      <div className="writing-preview-header">
                        <FileText size={15} strokeWidth={1.5} />
                      </div>
                      <h3>{document.title}</h3>
                      <div className="writing-preview-lines">
                        <i />
                        <i />
                        <i />
                        <i />
                      </div>
                      <strong>{document.previewLine}</strong>
                    </div>
                    <span className="writing-open-cue">
                      <ArrowUpRight size={14} strokeWidth={1.5} />
                    </span>
                  </div>
                  <div className="writing-doc-meta">
                    <div>
                      <div className="writing-doc-flags">
                        {document.status !== "COMPLETE" && <span>{document.status}</span>}
                        <span>{document.language}</span>
                      </div>
                      <h3>{document.title}</h3>
                      <p>{document.excerpt}</p>
                    </div>
                    <dl>
                      <div>
                        <dt className="sr-only">Genre</dt>
                        <dd>{document.genre}</dd>
                      </div>
                      <div>
                        <dt className="sr-only">Reading time</dt>
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
              <p>No results for “{query}”.</p>
              <button type="button" onClick={() => setQuery("")}>RESET SEARCH</button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
