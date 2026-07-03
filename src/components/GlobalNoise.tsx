"use client";

import Noise from "@/components/Noise";
import { usePathname } from "next/navigation";

export default function GlobalNoise() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <div className={`noise-backdrop global-noise-backdrop ${isHome ? "is-home" : "is-subpage"}`} aria-hidden="true">
      <Noise patternSize={260} patternScaleX={1.1} patternScaleY={1.1} patternRefreshInterval={1} patternAlpha={120} />
    </div>
  );
}
