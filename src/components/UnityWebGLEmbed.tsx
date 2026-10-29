"use client";

import { useState } from "react";

const starfallBuildUrl = "https://rongfeng1203.itch.io/starfall";
const starfallEmbedUrl = "https://itch.io/embed-upload/18686937?color=0a0a0f";

export default function UnityWebGLEmbed() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <section className="unity-webgl-panel" aria-label="Starfall Unity WebGL build">
      <header className="unity-webgl-header">
        <div>
          <h2>Starfall Build</h2>
        </div>
        <a href={starfallBuildUrl} target="_blank" rel="noreferrer">
          open build
        </a>
      </header>

      <div className="unity-webgl-stage">
        {isLoaded ? (
          <iframe
            src={starfallEmbedUrl}
            title="Starfall Build Unity WebGL player"
            allow="fullscreen; gamepad; autoplay; xr-spatial-tracking"
            allowFullScreen
          />
        ) : (
          <button type="button" className="unity-webgl-loader" onClick={() => setIsLoaded(true)}>
            <span>Play ↗</span>
            <strong>Starfall Build</strong>
          </button>
        )}
      </div>
    </section>
  );
}
