/* ============================================================
   src/app/test/page.tsx
   Stack diagnostic. No design language — just verification.

   Each of the five checks below is a tiny smoke test for one
   library. If you see ✓ next to all five, the stack is alive
   and you can move on to actually building the site.
   ============================================================ */

"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { create } from "zustand";
import gsap from "gsap";
import * as THREE from "three";

/* ---------- 4. Zustand store ---------- */
const useCounter = create<{ count: number; bump: () => void }>((set) => ({
  count: 0,
  bump: () => set((s) => ({ count: s.count + 1 })),
}));

/* ---------- 1. R3F shader probe — pulsing gray plane ---------- */
function ShaderProbe() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  useFrame((state) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });
  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={`
          void main() { gl_Position = vec4(position.xy, 0.0, 1.0); }
        `}
        fragmentShader={`
          precision mediump float;
          uniform float uTime;
          void main() {
            float v = sin(uTime * 1.4) * 0.5 + 0.5;
            gl_FragColor = vec4(v, v, v, 1.0);
          }
        `}
        uniforms={{ uTime: { value: 0 } }}
      />
    </mesh>
  );
}

/* ---------- page ---------- */
export default function TestPage() {
  const { count, bump } = useCounter();
  const [mounted, setMounted] = useState(false);
  const gsapBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  return (
    <main
      style={{
        padding: "32px",
        maxWidth: 720,
        margin: "0 auto",
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
        fontSize: 14,
        lineHeight: 1.6,
        color: "#222",
      }}
    >
      <h1 style={{ fontSize: 22, marginBottom: 4 }}>Stack diagnostic</h1>
      <p style={{ color: "#666", marginTop: 0 }}>
        Five smoke tests. If every line below has a ✓, the environment is
        wired and you can move on.
      </p>

      <ol style={{ listStyle: "none", padding: 0, marginTop: 24 }}>
        {/* 1 */}
        <li style={rowStyle}>
          <span style={labelStyle}>[1] react three fiber</span>
          <div style={{ marginTop: 8 }}>
            <div
              style={{
                width: 140,
                height: 80,
                border: "1px solid #ccc",
                background: "#000",
              }}
            >
              {mounted && (
                <Canvas orthographic camera={{ position: [0, 0, 1], zoom: 1 }}>
                  <ShaderProbe />
                </Canvas>
              )}
            </div>
            <span style={hintStyle}>
              ↑ box should pulse from black to white. blank = R3F failed.
            </span>
          </div>
        </li>

        {/* 2 */}
        <li style={rowStyle}>
          <span style={labelStyle}>[2] framer motion</span>
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            style={{ marginLeft: 8 }}
          >
            ✓ this text faded in from the left
          </motion.span>
        </li>

        {/* 3 */}
        <li style={rowStyle}>
          <span style={labelStyle}>[3] gsap</span>
          <button
            ref={gsapBtnRef}
            onClick={() => {
              gsap.fromTo(
                gsapBtnRef.current,
                { scale: 0.85, rotate: -2 },
                {
                  scale: 1,
                  rotate: 0,
                  duration: 0.5,
                  ease: "elastic.out(1, 0.45)",
                }
              );
            }}
            style={btnStyle}
          >
            click to bounce
          </button>
        </li>

        {/* 4 */}
        <li style={rowStyle}>
          <span style={labelStyle}>[4] zustand</span>
          <span style={{ marginLeft: 8 }}>count = {count}</span>
          <button onClick={bump} style={{ ...btnStyle, marginLeft: 12 }}>
            + bump
          </button>
        </li>

        {/* 5 */}
        <li style={rowStyle}>
          <span style={labelStyle}>[5] tailwind v4</span>
          <span className="ml-2 inline-block rounded bg-blue-600 px-2 py-1 text-xs font-bold text-white">
            this badge is tailwind-styled
          </span>
          <span style={hintStyle}>
            ↑ should be a small blue pill. if it's plain unstyled text,
            Tailwind isn't compiling.
          </span>
        </li>
      </ol>

      <p style={{ marginTop: 32, color: "#666" }}>
        All five green? Environment OK. You can delete this route any time —
        it's not referenced from anywhere else.
      </p>
    </main>
  );
}

/* ---------- shared inline styles (plain, no brand) ---------- */
const rowStyle: React.CSSProperties = {
  padding: "10px 0",
  borderBottom: "1px dashed #ddd",
};
const labelStyle: React.CSSProperties = {
  display: "inline-block",
  minWidth: 200,
  color: "#0070f3",
  fontWeight: 700,
};
const btnStyle: React.CSSProperties = {
  padding: "4px 12px",
  border: "1px solid #ccc",
  background: "#fff",
  cursor: "pointer",
  borderRadius: 4,
  fontFamily: "inherit",
  fontSize: 13,
};
const hintStyle: React.CSSProperties = {
  display: "block",
  fontSize: 11,
  color: "#888",
  marginTop: 4,
};
