/* ============================================================
   src/lib/fonts.ts
   next/font/google bindings for the brand type stack.
   All fonts are loaded as CSS variables so they cascade naturally
   in globals.css and Tailwind utilities.

   Latin fonts: preload = true (lightweight).
   Chinese fonts: preload = false (heavy — load after first paint).
   ============================================================ */

import {
  Anton,
  Inter,
  Space_Mono,
  Bungee,
  VT323,
  Noto_Serif_SC,
  Noto_Sans_SC,
  ZCOOL_QingKe_HuangYou,
} from "next/font/google";

// --- Latin: display ---
export const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

// --- Latin: body ---
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// --- Latin: mono ---
export const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

// --- Latin: Y2K accent ---
export const bungee = Bungee({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bungee",
  display: "swap",
});

// --- Latin: terminal accent ---
export const vt323 = VT323({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-vt323",
  display: "swap",
});

// --- Chinese: display (heavy weights, no preload) ---
export const notoSerifSC = Noto_Serif_SC({
  weight: ["400", "700", "900"],
  variable: "--font-noto-serif-sc",
  display: "swap",
  preload: false,
});

// --- Chinese: body ---
export const notoSansSC = Noto_Sans_SC({
  weight: ["400", "500", "700", "900"],
  variable: "--font-noto-sans-sc",
  display: "swap",
  preload: false,
});

// --- Chinese: Y2K display accent ---
export const zcoolQingKe = ZCOOL_QingKe_HuangYou({
  weight: "400",
  variable: "--font-zcool",
  display: "swap",
  preload: false,
});

/* Single combined className helper — apply this on <html> or <body>
   to make all the font CSS variables available everywhere. */
export const fontVariables = [
  anton.variable,
  inter.variable,
  spaceMono.variable,
  bungee.variable,
  vt323.variable,
  notoSerifSC.variable,
  notoSansSC.variable,
  zcoolQingKe.variable,
].join(" ");
