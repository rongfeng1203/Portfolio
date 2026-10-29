import Image from "next/image";
import Link from "next/link";
import { type CSSProperties } from "react";
import { getPortfolioSection, getVisualCategoryMedia, type VisualCategory } from "@/lib/portfolioSections";
import banner from "../../assets/icon.png";

export default function VisualSketchbookPage({ category }: { category: VisualCategory }) {
  const section = getPortfolioSection("visual")!;
  const mediaItems = getVisualCategoryMedia(category);
  const title = { charcoal: "Charcoal", colors: "Colors", ideation: "Ideation" }[category];

  return (
    <main
      className="section-page section-visual contact-sheet-page contact-sketchbook min-h-screen px-4 pb-12 pt-8 text-paper sm:px-6 lg:px-8"
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
        <Link href="/visual" className="section-back" aria-label="Back to visual art">
          /visual
        </Link>
        <Link href="/" className="section-banner-mark" aria-label="Back to home">
          <Image src={banner} alt="" className="section-banner-image" width={1242} height={406} quality={100} />
        </Link>
      </header>

      <section className="contact-sheet-hero">
        <div>
          <h1>{title}</h1>
          <p className="section-cn">画画</p>
        </div>
        {category === "colors" && <p>My favorite medium no question.</p>}
        {category === "charcoal" && <p>But i feel like black and white are colors</p>}
      </section>

      <section className="contact-sheet-grid" aria-label={`${title} contact sheet`}>
        {!mediaItems.length && <p>No work added yet.</p>}
        {mediaItems.map((item, index) => (
          <figure key={item.src} className="contact-sheet-frame">
            <div>
              <Image
                src={item.src}
                alt={`${title} work ${index + 1}`}
                fill
                sizes="(max-width: 720px) 50vw, 20vw"
              />
            </div>

          </figure>
        ))}
      </section>
    </main>
  );
}
