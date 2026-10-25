import SectionBuckets from "@/components/SectionBuckets";
import Link from "next/link";
import Image from "next/image";
import { type CSSProperties, type ReactNode } from "react";
import PhotographySlideshow from "@/components/PhotographySlideshow";
import { type PortfolioSection } from "@/lib/portfolioSections";
import banner from "../../assets/icon.png";

type MediaItem = NonNullable<PortfolioSection["mediaItems"]>[number];

export default function PortfolioSectionPage({ section, feature }: { section: PortfolioSection; feature?: ReactNode }) {
  const mediaItems = section.mediaItems ?? [];
  const hasMedia = mediaItems.length > 0;
  const usesGalleryLayout = ["photography", "visual", "digital"].includes(section.slug);
  const usesCompactBucketLibrary = section.slug === "theatre";
  const showMainMediaGrid = hasMedia && !usesCompactBucketLibrary;

  return (
    <main
      className={`section-page section-${section.slug} min-h-screen px-4 pb-12 pt-8 text-paper sm:px-6 lg:px-8`}
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
        <Link href="/" className="section-back" aria-label="Back to home">
          /index
        </Link>
        <Link href="/" className="section-banner-mark" aria-label="Back to home">
          <Image src={banner} alt="" className="section-banner-image" width={1242} height={406} quality={100} />
        </Link>
        <p>{section.code}</p>
      </header>

      {usesGalleryLayout && hasMedia ? (
        <PhotographySlideshow items={mediaItems} label={`${section.title} gallery`} shuffle={section.slug === "photography"} />
      ) : null}

      <section className="section-hero">
        <div>
          <p className="section-code">{section.code}</p>
          <h1 className={section.title.length > 9 ? "section-title-long" : undefined}>{section.title}</h1>
          <p className="section-cn">{section.cn}</p>
        </div>
        <p className="section-intro">{section.intro}</p>
      </section>

      {feature ? (
        <section className="section-workbench" aria-label={`${section.title} featured work`}>
          {feature}
          {!["theatre", "digital"].includes(section.slug) && <aside className="section-note">
            <span>{section.slug === "games" ? "game archive loaded" : "playable build loaded"}</span>
            <p>{section.note}</p>
          </aside>}
        </section>
      ) : !usesGalleryLayout ? (
        <section className="section-workbench" aria-label={`${section.title} work slots`}>
          {showMainMediaGrid ? (
            <div className="section-media-grid">
              {mediaItems.map((item, index) => (
                <figure key={`${item.src}-${index}`} className={`section-media-card media-${(index % 9) + 1}`}>
                  <div className="section-media-frame">
                    {item.type === "video" ? (
                      <video src={item.src} controls muted playsInline preload="metadata" />
                    ) : (
                      <Image
                        src={item.src}
                        alt={item.title}
                        width={item.width ?? 1600}
                        height={item.height ?? 1200}
                        unoptimized
                        sizes="(max-width: 720px) 92vw, (max-width: 1200px) 45vw, 50vw"
                      />
                    )}
                  </div>
                  <figcaption>
                    <span>{item.meta}</span>
                    <strong>{item.title}</strong>
                  </figcaption>
                </figure>
              ))}
            </div>
          ) : (
            <div className="section-image-grid is-pending">
              {section.imageSlots.map((slot, index) => {
                const isTheatreStageSlot = usesCompactBucketLibrary && hasMedia && slot === "stage photo";

                return (
                  <div key={slot} className={`section-image-slot slot-${index + 1}${isTheatreStageSlot ? " has-stage-gallery" : ""}`}>
                    <span>{isTheatreStageSlot ? "stage photo library" : "content pending"}</span>
                    <strong>{slot}</strong>
                    {isTheatreStageSlot ? (
                      <div className="theatre-stage-gallery">
                        <PhotographySlideshow items={mediaItems} label="Theatre stage photo preview" />
                      </div>
                    ) : (
                      <em>assets not gathered yet</em>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          <aside className="section-note">
            <span>
              {showMainMediaGrid
                ? `${mediaItems.length} asset${mediaItems.length === 1 ? "" : "s"} loaded`
                : usesCompactBucketLibrary && hasMedia
                  ? `${mediaItems.length} stage photos in compact screen`
                  : "next upload"}
            </span>
            <p>{section.note}</p>
          </aside>
        </section>
      ) : null}

      <SectionBuckets section={section} />
    </main>
  );
}
