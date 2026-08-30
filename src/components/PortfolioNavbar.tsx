"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type CSSProperties } from "react";

const navigation = [
  { label: "Home", shortLabel: "RF", href: "/", color: "var(--paper)" },
  { label: "Games", shortLabel: "Games", href: "/games", color: "var(--lime)" },
  { label: "Photography", shortLabel: "Photo", href: "/photography", color: "var(--violet)" },
  { label: "Visual Art", shortLabel: "Visual", href: "/visual", color: "var(--pink)" },
  { label: "Digital Arts", shortLabel: "Digital", href: "/digital", color: "var(--orange)" },
  { label: "Theatre", shortLabel: "Theatre", href: "/theatre", color: "var(--purple)" },
  { label: "Making", shortLabel: "Making", href: "/making", color: "var(--lime)" },
  { label: "Writing", shortLabel: "Writing", href: "/writing", color: "var(--pink)" },
] as const;

export default function PortfolioNavbar() {
  const pathname = usePathname();

  return (
    <header className="portfolio-navbar">
      <nav className="portfolio-navbar-track" aria-label="Portfolio sections">
        {navigation.map((item, index) => {
          const isActive = item.href === "/"
            ? pathname === "/"
            : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`portfolio-navbar-link${isActive ? " is-active" : ""}`}
              aria-current={isActive ? "page" : undefined}
              style={{ "--nav-accent": item.color } as CSSProperties}
            >
              <span className="portfolio-navbar-index" aria-hidden="true">
                {String(index).padStart(2, "0")}
              </span>
              <span className="portfolio-navbar-label">
                <span className="portfolio-navbar-label-full">{item.label}</span>
                <span className="portfolio-navbar-label-short">{item.shortLabel}</span>
              </span>
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
