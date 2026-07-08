import Image from "next/image";
import Link from "next/link";
import { type CSSProperties } from "react";
import { getPhotographyCategoryMedia, getPortfolioSection, type PhotographyCategory } from "@/lib/portfolioSections";
import banner from "../../assets/icon.png";

const categoryCopy = {
  stage: {
    title: "Stage",
    code: "PHOTO_STAGE",
    intro: "Temporary photo wall for performance, rehearsal, production, and theatre-adjacent images.",
  },
  scenery: {
    title: "Scenery",
    code: "PHOTO_SCENERY",
    intro: "Temporary photo wall for places, surfaces, environments, textures, and location fragments.",
  },
  humans: {
    title: "Humans",
    code: "PHOTO_HUMANS",
    intro: "Temporary photo wall for portraits, people, gestures, styling, and character presence.",
  },
} as const;

export default function PhotographyContactSheetPage({ category }: { category: PhotographyCategory }) {
  const section = getPortfolioSection("photography")!;
  const mediaItems = getPhotographyCategoryMedia(category);
  const content = categoryCopy[category];

  return (
    <main
      className={`section-page section-photography contact-sheet-page contact-${category} min-h-screen px-4 pb-12 pt-8 text-paper sm:px-6 lg:px-8`}
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
        <Link href="/photography" className="section-back" aria-label="Back to photography">
          /photography
        </Link>
        <div className="section-banner-mark" aria-hidden="true">
          <Image src={banner} alt="" className="section-banner-image" width={1242} height={406} quality={100} />
        </div>
        <p>{content.code}</p>
      </header>

      <section className="contact-sheet-hero">
        <div>
          <p className="section-code">{content.code}</p>
          <h1>{content.title}</h1>
          <p className="section-cn">攝影</p>
        </div>
        <p>{content.intro} This page is now scoped to the {content.title.toLowerCase()} folder.</p>
      </section>

      <section className="contact-sheet-grid" aria-label={`${content.title} contact sheet`}>
        {mediaItems.map((item, index) => (
          <figure key={`${category}-${item.src}`} className="contact-sheet-frame">
            <div>
              <Image src={item.src} alt={`${content.title} contact ${index + 1}`} fill sizes="(max-width: 720px) 33vw, 12vw" />
            </div>
            <figcaption>{String(index + 1).padStart(2, "0")}</figcaption>
          </figure>
        ))}
      </section>
    </main>
  );
}
