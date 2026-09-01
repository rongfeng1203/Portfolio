import Image from "next/image";
import Link from "next/link";
import { type CSSProperties } from "react";
import { getPortfolioSection, getVisualSketchbookMedia } from "@/lib/portfolioSections";
import banner from "../../assets/icon.png";

export default function VisualSketchbookPage() {
  const section = getPortfolioSection("visual")!;
  const mediaItems = getVisualSketchbookMedia();

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
        <p>SKETCHBOOK_ARCHIVE</p>
      </header>

      <section className="contact-sheet-hero">
        <div>
          <p className="section-code">SKETCHBOOK_ARCHIVE</p>
          <h1>Sketchbook</h1>
          <p className="section-cn">手稿</p>
        </div>
        <p>Pages, fragments, material tests, and working drawings gathered from the sketchbook archive.</p>
      </section>

      <section className="contact-sheet-grid" aria-label="Sketchbook contact sheet">
        {mediaItems.map((item, index) => (
          <figure key={item.src} className="contact-sheet-frame">
            <div>
              <Image
                src={item.src}
                alt={`Sketchbook page ${index + 1}`}
                fill
                sizes="(max-width: 720px) 50vw, 20vw"
              />
            </div>
            <figcaption>{String(index + 1).padStart(2, "0")}</figcaption>
          </figure>
        ))}
      </section>
    </main>
  );
}
