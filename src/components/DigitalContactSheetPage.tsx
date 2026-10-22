import Image from "next/image";
import Link from "next/link";
import { type CSSProperties } from "react";
import { getDigitalCategoryMedia, getPortfolioSection, type DigitalCategory } from "@/lib/portfolioSections";
import banner from "../../assets/icon.png";

const categoryCopy = {
  videos: { title: "Videos", code: "DIGITAL_VIDEO", intro: "Moving images." },
  graphics: { title: "Graphics", code: "DIGITAL_GRAPHICS", intro: "I love compositions. Satisfying." },
  concept: { title: "Concept", code: "DIGITAL_CONCEPT", intro: "Blender renders, environments, and works in progress." },
};
export default function DigitalContactSheetPage({ category }: { category: DigitalCategory }) {
  const section = getPortfolioSection("digital")!;
  const mediaItems = getDigitalCategoryMedia(category);
  const content = categoryCopy[category];

  return (
    <main
      className={`section-page section-digital contact-sheet-page contact-${category} min-h-screen px-4 pb-12 pt-8 text-paper sm:px-6 lg:px-8`}
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
        <Link href="/digital" className="section-back" aria-label="Back to digital arts">
          /digital
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
          <p className="section-cn">媒体艺术</p>
        </div>
        {content.intro && <p>{content.intro}</p>}
      </section>

      <section className={`contact-sheet-grid${category === "videos" ? " digital-video-grid" : ""}`} aria-label={`${content.title} contact sheet`}>
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
