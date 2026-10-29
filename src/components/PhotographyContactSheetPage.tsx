import Image from "next/image";
import Link from "next/link";
import { type CSSProperties } from "react";
import { getPhotographyCategoryMedia, getPortfolioSection, type PhotographyCategory } from "@/lib/portfolioSections";
import banner from "../../assets/icon.png";

const categoryCopy = {
  stage: {
    title: "Theatre",
    code: "PHOTO_STAGE",
    intro: "Ummm can you tell I took photos while operating LX for a musical?",
  },
  scenery: {
    title: "Landscape",
    code: "PHOTO_SCENERY",
    intro: "IDK why but landscape photogrphy doesn't seem to work for me?",
  },
  humans: {
    title: "Humans",
    code: "PHOTO_HUMANS",
    intro: "Wow I can never trust any cameras out of my hands.",
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
        <Link href="/" className="section-banner-mark" aria-label="Back to home">
          <Image src={banner} alt="" className="section-banner-image" width={1242} height={406} quality={100} />
        </Link>
      </header>

      <section className="contact-sheet-hero">
        <div>
          <h1>{content.title}</h1>
          <p className="section-cn">攝影</p>
        </div>
      </section>

      <section className="contact-sheet-grid" aria-label={`${content.title} contact sheet`}>
        {mediaItems.map((item, index) => (
          <figure key={`${category}-${item.src}`} className="contact-sheet-frame">
            <div>
              <Image src={item.src} alt={`${content.title} contact ${index + 1}`} fill sizes="(max-width: 720px) 33vw, 12vw" />
            </div>

          </figure>
        ))}
      </section>
    </main>
  );
}
