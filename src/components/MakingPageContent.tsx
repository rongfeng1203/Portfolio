import { type MakingCategory } from "@/lib/makingProjects";
import Image from "next/image";
import Link from "next/link";
import { type CSSProperties } from "react";
import MakingArchive from "@/components/MakingArchive";
import banner from "../../assets/icon.png";

export default function MakingPageContent({ category }: { category?: MakingCategory }) {
  return (
    <main
      className="section-page section-making making-library min-h-screen px-4 pb-12 pt-8 text-paper sm:px-6 lg:px-8"
      style={
        {
          "--section-color": "var(--lime)",
          "--section-accent": "var(--pink)",
          "--section-text": "var(--orange)",
        } as CSSProperties
      }
    >
      <div className="section-noise-layer" aria-hidden="true" />
      <header className="section-topbar making-topbar">
        <Link href={category ? "/making" : "/"} className="section-back" aria-label={category ? "Back to Tech Design" : "Back to home"}>
          {category ? "/making" : "/index"}
        </Link>
        <Link href="/" className="section-banner-mark" aria-label="Back to home">
          <Image src={banner} alt="" className="section-banner-image" width={1242} height={406} quality={100} />
        </Link>
      </header>
      <MakingArchive category={category} />
    </main>
  );
}
