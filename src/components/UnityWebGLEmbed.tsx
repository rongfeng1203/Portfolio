"use client";

import { useState } from "react";

const starfallBuildUrl = "/starfallbuild1/index.html";

export default function UnityWebGLEmbed() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <section className="unity-webgl-panel" aria-label="Starfall Unity WebGL build">
      <header className="unity-webgl-header">
        <div>
          <span>unity_webgl / live build</span>
          <h2>Starfall Build 1</h2>
        </div>
        <a href={starfallBuildUrl} target="_blank" rel="noreferrer">
          open build
        </a>
      </header>

      <div className="unity-webgl-stage">
        {isLoaded ? (
          <iframe
            src={starfallBuildUrl}
            title="Starfall Build 1 Unity WebGL player"
            allow="fullscreen; gamepad; autoplay; xr-spatial-tracking"
            allowFullScreen
          />
        ) : (
          <button type="button" className="unity-webgl-loader" onClick={() => setIsLoaded(true)}>
            <span>load playable build</span>
            <strong>Starfall Build 1</strong>
            <em>large unity webgl file / click to start</em>
          </button>
        )}
      </div>

      <footer className="unity-webgl-meta" aria-label="Starfall build metadata">
        <span>build / starfallbuild1</span>
        <span>unity / webgl</span>
        <span>compressed / brotli</span>
      </footer>
    </section>
  );
}
