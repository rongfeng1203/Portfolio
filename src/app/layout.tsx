/* ============================================================
   src/app/layout.tsx
   Root layout. Wires all brand fonts as CSS variables on <html>
   so they're available everywhere via var(--font-*).
   ============================================================ */

import type { Metadata } from "next";
import SplashCursor from "@/components/SplashCursor";
import { fontVariables } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rong Feng / 冯熔",
  description:
    "Game design, visual art, photography, writing, and spatial work. A portfolio that behaves like a small game world.",
  openGraph: {
    title: "Rong Feng / 冯熔",
    description:
      "Game design, visual art, photography. Hack the door, walk in calm. Stay long enough to find the basement.",
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
      <body>
        <SplashCursor
          RAINBOW_MODE={false}
          COLOR="var(--riso-blue)"
          DENSITY_DISSIPATION={4.2}
          VELOCITY_DISSIPATION={2.6}
          SPLAT_RADIUS={0.11}
          SPLAT_FORCE={4200}
          CURL={2.2}
        />
        {children}
      </body>
    </html>
  );
}
