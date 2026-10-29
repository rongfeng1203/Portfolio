"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { type CSSProperties, useEffect, useState } from "react";
import type { WritingDocument } from "@/lib/writingDocuments";
import WritingLanguageSelector from "@/components/WritingLanguageSelector";
import { useWritingLanguage, type WritingLanguage } from "@/hooks/useWritingLanguage";
import type { WritingTranslation } from "@/lib/writingTranslations";
import { getWritingSummaryTranslation } from "@/lib/writingSummaryTranslations";

type WritingReaderProps = {
  document: WritingDocument;
  index: number;
  total: number;
  translation?: WritingTranslation;
  previous?: Pick<WritingDocument, "slug" | "title">;
  next?: Pick<WritingDocument, "slug" | "title">;
};

export default function WritingReader({
  document,
  translation,
  previous,
  next,
}: WritingReaderProps) {
  const [progress, setProgress] = useState(0);
  const [language, setLanguage] = useWritingLanguage();
  const originalLanguage = document.language === "ENGLISH" ? "en" : "zh-CN";
  const showingTranslation = language !== originalLanguage && Boolean(translation);
  const activeContent = showingTranslation && translation ? translation : document;
  const contentLanguage = showingTranslation ? language : originalLanguage;
  const activeSummary = (showingTranslation && getWritingSummaryTranslation(document.slug)) || document;

  const changeLanguage = (value: WritingLanguage) => {
    if (value === language) return;
    const page = window.document.documentElement;
    const scrollableBefore = page.scrollHeight - window.innerHeight;
    const position = scrollableBefore > 0 ? window.scrollY / scrollableBefore : 0;

    setLanguage(value);
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const scrollableAfter = window.document.documentElement.scrollHeight - window.innerHeight;
        window.scrollTo({ top: Math.max(0, scrollableAfter * position) });
      });
    });
  };

  useEffect(() => {
    const updateProgress = () => {
      const scrollable = documentElement().scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(100, (window.scrollY / scrollable) * 100) : 0);
    };

    const documentElement = () => window.document.documentElement;

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <main
      className="section-page section-writing writing-reader min-h-screen"
      lang="en"
      style={{
        "--section-color": "var(--pink)",
        "--section-accent": "var(--orange)",
        "--section-text": "var(--orange)",
      } as CSSProperties}
    >
      <div className="section-noise-layer" aria-hidden="true" />
      <div className="writing-reader-progress" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>

      <header className="writing-reader-toolbar">
        <Link href="/writing" aria-label="Back to writing library">
          <ArrowLeft size={15} strokeWidth={1.5} />
          <span>/WRITING</span>
        </Link>
        <div className="writing-reader-toolbar-center">
          {translation ? <WritingLanguageSelector language={language} onChange={changeLanguage} /> : null}
        </div>
      </header>

      <div className="writing-reader-shell">
        <article
          className={`writing-reader-paper${contentLanguage === "en" ? " is-english" : ""}`}
        >
          <header className="writing-article-header" lang={contentLanguage}>
            <p>{document.genre}</p>
            <h1>{activeSummary.title}</h1>
            <p className="writing-article-subtitle">{activeSummary.subtitle}</p>
            <div>
              <span>RONG FENG / 冯熔</span>
              <span>{document.readingTime}</span>
            </div>
          </header>

          <div className="writing-article-body" lang={contentLanguage}>
            {activeContent.blocks.map((block, blockIndex) => {
              if (block.type === "heading") {
                return block.level === 2 ? (
                  <h2 lang={originalLanguage} key={`${block.text}-${blockIndex}`}>{block.text}</h2>
                ) : (
                  <h3 lang={originalLanguage} key={`${block.text}-${blockIndex}`}>{block.text}</h3>
                );
              }
              if (block.type === "divider") {
                return <hr key={`divider-${blockIndex}`} />;
              }
              if (block.type === "emphasis") {
                return <p key={`${block.text}-${blockIndex}`} className="writing-emphasis"><strong>{block.text}</strong></p>;
              }
              return <p key={`${block.text.slice(0, 20)}-${blockIndex}`}>{block.text}</p>;
            })}
          </div>

          <footer className="writing-article-end">
            <Link href="/writing">RETURN TO LIBRARY ↗</Link>
          </footer>

          <nav className="writing-reader-pagination" aria-label="Writing archive navigation">
            {previous ? (
              <Link href={`/writing/${previous.slug}`}>
                <ArrowLeft size={15} strokeWidth={1.5} />
                <span><small>PREVIOUS</small>{previous.title}</span>
              </Link>
            ) : <span />}
            {next ? (
              <Link href={`/writing/${next.slug}`}>
                <span><small>NEXT</small>{next.title}</span>
                <ArrowRight size={15} strokeWidth={1.5} />
              </Link>
            ) : <span />}
          </nav>
        </article>
      </div>
    </main>
  );
}
