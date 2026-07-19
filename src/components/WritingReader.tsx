"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, FileText } from "lucide-react";
import { type CSSProperties, useEffect, useState } from "react";
import type { WritingDocument } from "@/lib/writingDocuments";

type WritingReaderProps = {
  document: WritingDocument;
  index: number;
  total: number;
  previous?: Pick<WritingDocument, "slug" | "title">;
  next?: Pick<WritingDocument, "slug" | "title">;
};

export default function WritingReader({
  document,
  index,
  total,
  previous,
  next,
}: WritingReaderProps) {
  const [progress, setProgress] = useState(0);
  const documentCode = `DOC_${(index + 1).toString().padStart(3, "0")}`;

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
      lang={document.language === "ENGLISH" ? "en" : "zh-CN"}
      style={{
        "--section-color": "#002FA7",
        "--section-accent": "#F04E98",
        "--section-text": "#F04E98",
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
        <div>
          <FileText size={14} strokeWidth={1.5} aria-hidden="true" />
          <span>{documentCode}</span>
        </div>
        <p>{Math.round(progress).toString().padStart(2, "0")}% READ</p>
      </header>

      <div className="writing-reader-shell">
        <aside className="writing-reader-rail" aria-label="Document information">
          <span>TEXT_ENGINE</span>
          <dl>
            <div>
              <dt>TYPE</dt>
              <dd>{document.genre}</dd>
            </div>
            <div>
              <dt>LENGTH</dt>
              <dd>{document.readingTime}</dd>
            </div>
            <div>
              <dt>STATUS</dt>
              <dd>{document.status}</dd>
            </div>
            <div>
              <dt>LANGUAGE</dt>
              <dd>{document.language}</dd>
            </div>
          </dl>
        </aside>

        <article
          className={`writing-reader-paper${document.language === "ENGLISH" ? " is-english" : ""}`}
          data-document-code={documentCode}
        >
          <header className="writing-article-header">
            <p>{document.genre} / {documentCode}</p>
            <h1>{document.title}</h1>
            <p className="writing-article-subtitle">{document.subtitle}</p>
            <div>
              <span>RONG FENG / 冯熔</span>
              <span>{document.readingTime}</span>
            </div>
          </header>

          <div className="writing-article-body">
            {document.blocks.map((block, blockIndex) => {
              if (block.type === "heading") {
                return block.level === 2 ? (
                  <h2 key={`${block.text}-${blockIndex}`}>{block.text}</h2>
                ) : (
                  <h3 key={`${block.text}-${blockIndex}`}>{block.text}</h3>
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
            <span>END OF DOCUMENT / {index + 1} OF {total}</span>
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

        <aside className="writing-reader-chapter" aria-hidden="true">
          <span>{(index + 1).toString().padStart(2, "0")}</span>
          <p>{document.genre}<br />→ {document.status}</p>
        </aside>
      </div>
    </main>
  );
}
