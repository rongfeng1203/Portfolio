import Link from "next/link";
import { type CSSProperties } from "react";
import type { PortfolioSection } from "@/lib/portfolioSections";

export default function PortfolioSectionPage({ section }: { section: PortfolioSection }) {
  return (
    <main
      className="section-page min-h-screen px-4 pb-12 pt-8 text-paper sm:px-6 lg:px-8"
      style={
        {
          "--section-color": section.color,
          "--section-accent": section.accent,
        } as CSSProperties
      }
    >
      <div className="section-noise-layer" aria-hidden="true" />
      <header className="section-topbar">
        <Link href="/" className="section-back" aria-label="Back to home">
          /index
        </Link>
        <p>{section.code}</p>
      </header>

      <section className="section-hero">
        <div>
          <p className="section-code">{section.code}</p>
          <h1 className={section.title.length > 9 ? "section-title-long" : undefined}>{section.title}</h1>
          <p className="section-cn">{section.cn}</p>
        </div>
        <p className="section-intro">{section.intro}</p>
      </section>

      <section className="section-workbench" aria-label={`${section.title} work slots`}>
        <div className="section-image-grid">
          {section.imageSlots.map((slot, index) => (
            <div key={slot} className={`section-image-slot slot-${index + 1}`}>
              <span>image slot</span>
              <strong>{slot}</strong>
              <em>drop assets here soon</em>
            </div>
          ))}
        </div>

        <aside className="section-note">
          <span>next upload</span>
          <p>{section.note}</p>
        </aside>
      </section>

      <section className="section-buckets" aria-label={`${section.title} categories`}>
        {section.buckets.map((bucket, index) => (
          <article key={bucket.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h2>{bucket.title}</h2>
            <p className="bucket-meta">{bucket.meta}</p>
            <p>{bucket.copy}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
