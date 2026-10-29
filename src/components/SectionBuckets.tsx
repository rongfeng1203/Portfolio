import Link from "next/link";
import Image from "next/image";
import { getDigitalCategoryMedia, getTheatreCategoryMedia, getPhotographyCategoryMedia, getVisualCategoryMedia, type PortfolioSection } from "@/lib/portfolioSections";
type MediaItem = NonNullable<PortfolioSection["mediaItems"]>[number];
const photographyPreviewIndexes = [
  [1, 14, 27],
  [6, 35, 52],
  [11, 43, 68],
];

function getBucketPreviewItems(sectionSlug: string, mediaItems: MediaItem[], bucket: PortfolioSection["buckets"][number], bucketIndex: number) {
  if (bucket.previewItems) return bucket.previewItems;
  if (bucket.digitalCategory) {
    const items = getDigitalCategoryMedia(bucket.digitalCategory);
    return items.filter((_, index, all) => [0, Math.floor(all.length / 2), all.length - 1].includes(index));
  }
  if (!mediaItems.length) return [];

  if (sectionSlug === "theatre" && bucket.theatreCategory) {
    const images = getTheatreCategoryMedia(bucket.theatreCategory).filter((item) => item.type === "image");
    return [0, Math.floor(images.length / 2), images.length - 1].map((index) => images[index]).filter(Boolean);
  }

  if (sectionSlug === "visual" && bucket.visualCategory) {
    const sketchbookItems = getVisualCategoryMedia(bucket.visualCategory);
    return [0, 3, 5].map((itemIndex) => sketchbookItems[itemIndex]).filter((item) => item?.type === "image");
  }

  if (sectionSlug !== "photography" || bucket.mediaCategory === "sketchbook") return [];

  const sourceItems = bucket.mediaCategory ? [...getPhotographyCategoryMedia(bucket.mediaCategory)] : mediaItems;

  return photographyPreviewIndexes[bucketIndex % photographyPreviewIndexes.length]
    .map((itemIndex) => sourceItems[(itemIndex - 1) % sourceItems.length])
    .filter((item) => item.type === "image");
}

export default function SectionBuckets({ section }: { section: PortfolioSection }) {
  const mediaItems = section.mediaItems ?? [];
  return (<>
      {section.buckets.length > 0 && <section className="section-buckets" aria-label={`${section.title} categories`}>
        {section.buckets.map((bucket, index) => {
          const previewItems = getBucketPreviewItems(section.slug, mediaItems, bucket, index);
          const preview = previewItems.length ? (
            <div className="bucket-preview" aria-hidden="true">
              {previewItems.map((item, previewIndex) => (
                <div key={`${bucket.title}-${item.src}-${previewIndex}`} className="bucket-preview-frame">
                  {item.type === "video" ? <video src={`${item.src}#t=0.1`} muted playsInline preload="metadata" /> : <Image
                    src={item.src}
                    alt=""
                    fill
                    sizes="(max-width: 720px) 28vw, 12vw"
                    unoptimized
                  />}
                </div>
              ))}
            </div>
          ) : null;

          return bucket.href ? (
            <Link key={bucket.title} href={bucket.href} className="section-bucket-link">
              {preview}

              <h2>{bucket.title}</h2>
            </Link>
          ) : (
            <article key={bucket.title}>
              <h2>{bucket.title}</h2>

              {preview}
            </article>
          );
        })}
      </section>}
  </>);
}
