/* ============================================================
   src/app/layout.tsx
   Root layout. Wires all brand fonts as CSS variables on <html>
   so they're available everywhere via var(--font-*).
   ============================================================ */

import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rong Feng / 荣峰",
  description:
    "Game design, visual art, photography. A portfolio that behaves like a small game world.",
  openGraph: {
    title: "Rong Feng / 荣峰",
    description:
      "Game design, visual art, photography. Polished by default. Weird if you stay.",
    type: "website",
    locale: "en_US",
    alternateLocale: "zh_CN",
  },
  // Swap in your real social card once it's designed.
  // openGraph.images: [{ url: "/og.png", width: 1200, height: 630 }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
