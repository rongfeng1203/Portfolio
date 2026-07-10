"use client";

/**
 * @author: @dorianbaffier
 * @description: Swoosh Text
 * @version: 1.0.0
 * @date: 2025-06-26
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 */

import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface SwooshTextProps {
  text?: string;
  className?: string;
  wrapperClassName?: string;
  style?: CSSProperties;
  shadowOffset?: number;
  shadowLayerCount?: 1 | 2 | 3 | 4;
  shadowColors?: {
    first?: string;
    second?: string;
    third?: string;
    fourth?: string;
    glow?: string;
  };
}

export default function SwooshText({
  text = "Hover Me",
  className = "",
  wrapperClassName = "",
  style,
  shadowOffset = 10,
  shadowLayerCount = 4,
  shadowColors = {
    first: "#07bccc",
    second: "#e601c0",
    third: "#e9019a",
    fourth: "#f40468",
    glow: "#f40468",
  },
}: SwooshTextProps) {
  const step = shadowOffset;
  const colors = [
    shadowColors.first,
    shadowColors.second,
    shadowColors.third,
    shadowColors.fourth,
  ].filter(Boolean).slice(0, shadowLayerCount);
  const textShadowStyle = {
    textShadow: colors.map((color, index) => {
      const offset = Math.round(step * (1 + index * 0.5));
      return `${offset}px ${offset}px 0 ${color}`;
    }).join(", "),
  };

  return (
    <div className={cn("w-full", wrapperClassName)}>
      <div
        className={cn(
          "w-full cursor-pointer text-center font-bold text-3xl",
          "tracking-widest",
          "text-black italic dark:text-white",
          "stroke-[#d6f4f4]",
          className
        )}
        style={{ ...textShadowStyle, ...style }}
      >
        {text}
      </div>
    </div>
  );
}
