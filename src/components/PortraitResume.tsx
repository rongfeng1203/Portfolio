"use client";

import Image from "next/image";
import { type CSSProperties, useRef, useState } from "react";
import portrait from "../../assets/Self-portrait.png";

export default function PortraitResume() {
  const [flipped, setFlipped] = useState(false);
  const front = useRef<HTMLButtonElement>(null);
  const back = useRef<HTMLButtonElement>(null);
  const close = () => {
    setFlipped(false);
    requestAnimationFrame(() => front.current?.focus({ preventScroll: true }));
  };

  return (
    <div
      className="portrait-resume"
      data-flipped={flipped}
      onPointerEnter={(event) => { if (event.pointerType === "mouse") setFlipped(true); }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse" && !event.currentTarget.contains(document.activeElement)) setFlipped(false);
      }}
      onKeyDown={(event) => { if (event.key === "Escape" && flipped) { event.preventDefault(); close(); } }}
    >
      <div className="portrait-resume-turn">
        <button
          ref={front}
          type="button"
          className="hero-portrait portrait-resume-front"
          style={{ "--active": "var(--lime)" } as CSSProperties}
          aria-label="Show Rong Feng’s résumé"
          aria-expanded={flipped}
          aria-controls="portrait-resume-back"
          aria-hidden={flipped}
          inert={flipped}
          onClick={() => {
            setFlipped(true);
            requestAnimationFrame(() => back.current?.focus({ preventScroll: true }));
          }}
        >
          <Image src={portrait} alt="Self portrait" className="portrait-chroma h-full w-full object-contain" priority />
          <span className="portrait-resume-hint">Résumé ↗</span>
        </button>
        <div id="portrait-resume-back" className="portrait-resume-back" aria-hidden={!flipped} inert={!flipped}>
          <div className="portrait-resume-toolbar">
            <a href="/portfolio-assets/resume/RESUME.pdf" target="_blank" rel="noopener noreferrer">Open résumé ↗</a>
            <a href="/portfolio-assets/resume/RESUME.pdf" download>Download ↓</a>
            <button ref={back} type="button" onClick={close} aria-label="Back to photo">↶ Photo</button>
          </div>
          <div className="portrait-resume-pages" tabIndex={flipped ? 0 : -1} role="region" aria-label="Résumé preview, two pages. Scroll to read.">
            {[1, 2].map((page) => (
              <Image key={page} src={`/portfolio-assets/resume/page-${page}.jpg`} alt={`Rong Feng’s résumé, page ${page} of 2. Open the PDF for selectable text.`} width={1237} height={1600} unoptimized />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
