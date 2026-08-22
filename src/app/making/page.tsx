import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { type CSSProperties } from "react";
import MakingArchive from "@/components/MakingArchive";
import banner from "../../../assets/icon.png";

export const metadata: Metadata = {
  title: "Making Archive — Rong Feng / 冯熔",
  description:
    "A document archive of Rong Feng's fabrication, product, and applied design projects.",
};

export default function MakingPage() {
  return (
    <main
      className="section-page section-making making-library min-h-screen px-3 pb-3 pt-5 text-paper sm:px-5 lg:px-6"
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
        <Link href="/" className="section-back" aria-label="Back to home">
          /index
        </Link>
        <div className="section-banner-mark" aria-hidden="true">
          <Image src={banner} alt="" className="section-banner-image" width={1242} height={406} quality={100} />
        </div>
        <p>MATERIAL_LOG</p>
      </header>
      <MakingArchive />
    </main>
  );
}
