import Image from "next/image";
import Link from "next/link";
import { type CSSProperties } from "react";
import { getPhotographyCategoryMedia, getTheatreCategoryMedia, getPortfolioSection, type TheatreCategory } from "@/lib/portfolioSections";
import banner from "../../assets/icon.png";

const categoryCopy = {
  dirtywork: { title: "Dirty Work", code: "THEATRE_DIRTYWORK", intro: "" },
  paperwork: { title: "Paperwork", code: "THEATRE_PAPERWORK", intro: "" },
  photos: { title: "Photos", code: "THEATRE_PHOTOS", intro: "" },
} as const;

export default function TheatreContactSheetPage({ category }: { category: TheatreCategory }) {
  const section = getPortfolioSection("theatre")!;
  const mediaItems = category === "photos"
    ? [...getTheatreCategoryMedia("photos"), ...getPhotographyCategoryMedia("stage")]
    : getTheatreCategoryMedia(category);
  const content = categoryCopy[category];

  return (
    <main
      className={`section-page section-theatre contact-sheet-page contact-${category} min-h-screen px-4 pb-12 pt-8 text-paper sm:px-6 lg:px-8`}
      style={
        {
          "--section-color": section.color,
          "--section-accent": section.accent,
          "--section-text": section.textColor,
        } as CSSProperties
      }
    >
      <div className="section-noise-layer" aria-hidden="true" />
      <header className="section-topbar">
        <Link href="/theatre" className="section-back" aria-label="Back to theatre">
          /theatre
        </Link>
        <Link href="/" className="section-banner-mark" aria-label="Back to home">
          <Image src={banner} alt="" className="section-banner-image" width={1242} height={406} quality={100} />
        </Link>
        <p>{content.code}</p>
      </header>

      <section className="contact-sheet-hero">
        <div>
          <p className="section-code">{content.code}</p>
          <h1>{content.title}</h1>
          <p className="section-cn">戲劇</p>
        </div>
        {content.intro && <p>{content.intro}</p>}
      </section>

      <section className="contact-sheet-grid" aria-label={`${content.title} contact sheet`}>
        {mediaItems.map((item, index) => (
          <figure key={`${category}-${item.src}`} className="contact-sheet-frame">
            <div>
              {item.type === "video" ? (
                <video src={item.src} controls playsInline preload="metadata" aria-label={item.title} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              ) : (
                <Image src={item.src} alt={`${content.title} contact ${index + 1}`} fill sizes="(max-width: 720px) 33vw, 12vw" />
              )}
            </div>
            <figcaption>{String(index + 1).padStart(2, "0")}</figcaption>
          </figure>
        ))}
      </section>
    </main>
  );
}
