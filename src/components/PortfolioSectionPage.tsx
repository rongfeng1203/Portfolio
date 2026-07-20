import Link from "next/link";
import Image from "next/image";
import { type CSSProperties, type ReactNode } from "react";
import PhotographySlideshow from "@/components/PhotographySlideshow";
import { getPhotographyCategoryMedia, type PortfolioSection } from "@/lib/portfolioSections";
import banner from "../../assets/icon.png";

type MediaItem = NonNullable<PortfolioSection["mediaItems"]>[number];

const photographyPreviewIndexes = [
  [1, 14, 27],
  [6, 35, 52],
  [11, 43, 68],
];

function getBucketPreviewItems(sectionSlug: string, mediaItems: MediaItem[], bucket: PortfolioSection["buckets"][number], bucketIndex: number) {
  if (!mediaItems.length) return [];

  if (sectionSlug !== "photography") return [];

  const sourceItems = bucket.mediaCategory ? [...getPhotographyCategoryMedia(bucket.mediaCategory)] : mediaItems;

  return photographyPreviewIndexes[bucketIndex % photographyPreviewIndexes.length]
    .map((itemIndex) => sourceItems[(itemIndex - 1) % sourceItems.length])
    .filter((item) => item.type === "image");
}

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
        <div className="section-banner-mark" aria-hidden="true">
          <Image src={banner} alt="" className="section-banner-image" width={1242} height={406} quality={100} />
        </div>
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
          <aside className="section-note">
            <span>{section.slug === "games" ? "game archive loaded" : "playable build loaded"}</span>
            <p>{section.note}</p>
          </aside>
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

      <section className="section-buckets" aria-label={`${section.title} categories`}>
        {section.buckets.map((bucket, index) => {
          const previewItems = getBucketPreviewItems(section.slug, mediaItems, bucket, index);
          const preview = previewItems.length ? (
            <div className="bucket-preview" aria-hidden="true">
              {previewItems.map((item, previewIndex) => (
                <div key={`${bucket.title}-${item.src}-${previewIndex}`} className="bucket-preview-frame">
                  <Image
                    src={item.src}
                    alt=""
                    fill
                    sizes="(max-width: 720px) 28vw, 12vw"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          ) : null;

          return bucket.href ? (
            <Link key={bucket.title} href={bucket.href} className="section-bucket-link">
              {preview}
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h2>{bucket.title}</h2>
              <p className="bucket-meta">{bucket.meta}</p>
              <p>{bucket.copy}</p>
            </Link>
          ) : (
            <article key={bucket.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h2>{bucket.title}</h2>
              <p className="bucket-meta">{bucket.meta}</p>
              <p>{bucket.copy}</p>
              {preview}
            </article>
          );
        })}
      </section>
    </main>
  );
}
