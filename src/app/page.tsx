"use client";

import Image from "next/image";
import { type CSSProperties, useEffect, useRef, useState } from "react";
import ASCIIText from "@/components/ASCIIText";
import CircularText from "@/components/CircularText";
import DecryptedText from "@/components/DecryptedText";
import Dither from "@/components/Dither";
import FaultyTerminal from "@/components/FaultyTerminal";
import Noise from "@/components/Noise";
import Ribbons from "@/components/Ribbons";
import Shuffle from "@/components/Shuffle";
import StaggeredMenu from "@/components/StaggeredMenu";
import portrait from "../../assets/Self-portrait.png";
import banner from "../../assets/icon.png";

const relaxingThemeUrl = new URL("../../assets/relaxing theme.mp3", import.meta.url).toString();

const sections = [
  {
    id: "games",
    label: "Games",
    cn: "游戏",
    code: "PLAYABLE SYSTEMS",
    color: "var(--lime)",
    route: "/games",
    copy:
      "Unity worlds, Python experiments, web toys, design notes, and playable prototypes. This is where interaction becomes the first language.",
    scraps: ["Unity", "Python", "Level design", "Systems"],
  },
  {
    id: "photography",
    label: "Photography",
    cn: "摄影",
    code: "CONTACT SHEETS",
    color: "var(--violet)",
    route: "/photography",
    copy:
      "Backstage archives, street fragments, portrait sequences, and image walls. This chapter should eventually scroll like a live contact sheet.",
    scraps: ["Archive", "Series", "Stage", "Street"],
  },
  {
    id: "visual",
    label: "Visual Art",
    cn: "视觉",
    code: "SCAN / POSTER",
    color: "var(--pink)",
    route: "/visual",
    copy:
      "Illustration, graphic studies, painting, drawing, and visual research. I want this section to feel printed, handled, scanned, and reprinted.",
    scraps: ["Illustration", "Poster", "Sketchbook", "Texture"],
  },
  {
    id: "digital",
    label: "Digital",
    cn: "影像",
    code: "MOTION BUFFER",
    color: "var(--orange)",
    route: "/digital",
    copy:
      "Motion tests, video loops, shader ideas, sound-adjacent experiments, and digital images that should not stay still.",
    scraps: ["Video", "Shader", "Loop", "Screen"],
  },
  {
    id: "theatre",
    label: "Theatre",
    cn: "剧场",
    code: "SPACE CUE",
    color: "var(--purple)",
    route: "/theatre",
    copy:
      "Stage management, light, set, and spatial storytelling. This is the bridge between game space and physical performance.",
    scraps: ["Light", "Stage", "Cue", "Space"],
  },
  {
    id: "making",
    label: "Making",
    cn: "制作",
    code: "MATERIAL LOG",
    color: "var(--lime)",
    route: "/making",
    copy:
      "Interior work, sewing, laser cutting, woodworking, and object experiments. The evidence should stay tactile here.",
    scraps: ["Wood", "Fabric", "Laser", "Model"],
  },
  {
    id: "writing",
    label: "Writing",
    cn: "写作",
    code: "TEXT ENGINE",
    color: "var(--pink)",
    route: "/writing",
    copy:
      "Fiction, poetry, essays, scripts, and game writing. This is the quieter room inside the noise.",
    scraps: ["Fiction", "Poetry", "Script", "Essay"],
  },
  {
    id: "basement",
    label: "Basement",
    cn: "地下室",
    code: "UNSORTED DOOR",
    color: "var(--orange)",
    route: "/basement",
    copy:
      "Childhood work, failed prototypes, strange sketches, private experiments, and the pieces that explain how the rest of the site happened.",
    scraps: ["Scraps", "Old work", "Tests", "Secrets"],
  },
] as const;

const streamRows = [
  "RONGFENG//INDEX//0001//SCROLL//VISUALSYSTEM//",
  "GAMES PHOTOGRAPHY VISUAL DIGITAL THEATRE MAKING WRITING BASEMENT",
  "ASCII_WASH CHROMA_OFFSET HALFTONE_SCAN RELAXING_THEME",
];

const menuItems = sections.map((section) => ({
  label: section.label,
  link: section.route,
  ariaLabel: `Open ${section.label}`,
}));

export default function Home() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const heroNameRef = useRef<HTMLHeadingElement | null>(null);
  const [introDone, setIntroDone] = useState(false);
  const [activeIndex] = useState(0);
  const active = sections[activeIndex];

  useEffect(() => {
    const timer = window.setTimeout(() => setIntroDone(true), 3200);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const audio = new Audio(relaxingThemeUrl);
    audio.loop = true;
    audio.volume = 0.28;
    audioRef.current = audio;

    const startAudio = () => {
      audio.play().catch(() => {});
    };

    startAudio();
    window.addEventListener("pointerdown", startAudio, { once: true });

    return () => {
      window.removeEventListener("pointerdown", startAudio);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const heroName = heroNameRef.current;
    if (!heroName || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let step = 0;
    const positions = ["0% 50%", "32% 50%", "68% 50%", "100% 50%", "68% 50%", "32% 50%"];
    heroName.style.transition = "background-position 1600ms ease-in-out";

    const interval = window.setInterval(() => {
      step = (step + 1) % positions.length;
      heroName.style.backgroundPosition = positions[step];
    }, 1600);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <main className="front-page relative min-h-screen overflow-x-hidden text-paper">
      {!introDone && (
        <div className="fixed inset-0 z-[100] overflow-hidden bg-ink">
          <FaultyTerminal
            className="absolute inset-0"
            style={{}}
            scale={1.1}
            gridMul={[3, 2]}
            digitSize={1.5}
            timeScale={0.3}
            scanlineIntensity={0.55}
            glitchAmount={1.22}
            flickerAmount={0.88}
            noiseAmp={0.28}
            chromaticAberration={0.42}
            dither={0.9}
            curvature={0.14}
            tint="#CEDC00"
            mouseReact={true}
            mouseStrength={0.35}
            pageLoadAnimation={true}
            brightness={1.12}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,9,0.05),rgba(5,5,9,0.9))]" />
          <div className="ascii-reveal absolute inset-0" />

          <div className="absolute inset-0 grid items-center px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:px-12">
            <div className="relative h-[48vh] min-h-[320px]">
              <ASCIIText
                text="RONG FENG"
                asciiFontSize={7}
                textFontSize={210}
                textColor="#F2EAD7"
                planeBaseHeight={8}
                enableWaves={true}
              />
            </div>
            <div className="grid justify-items-start gap-5 lg:justify-items-end">
              <CircularText
                text="ENTER // SCROLL // SOUND // INDEX //"
                spinDuration={17}
                onHover="speedUp"
                className="text-lime"
              />
              <p className="max-w-sm font-mono text-xs uppercase text-lime">
                <DecryptedText
                  text="loading assets / washing text / opening the index"
                  animateOn="view"
                  sequential={true}
                  revealDirection="start"
                  speed={24}
                  maxIterations={14}
                  characters="01█▓▒░<>/_$#@RONGFENG"
                  className="text-lime"
                  encryptedClassName="text-pink"
                />
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="dither-backdrop" aria-hidden="true">
        <Dither
          waveSpeed={0.028}
          waveFrequency={2.2}
          waveAmplitude={0.42}
          waveColor={[0.49, 0.33, 0.78]}
          colorNum={5}
          pixelSize={5}
          mouseRadius={0.75}
          enableMouseInteraction={true}
        />
      </div>
      <div className="texture-halftone fixed inset-0 pointer-events-none z-0" />
      <div className="noise-backdrop" aria-hidden="true">
        <Noise patternSize={420} patternScaleX={1.25} patternScaleY={1.25} patternRefreshInterval={3} patternAlpha={18} />
      </div>
      <div className="ribbons-cursor" aria-hidden="true">
        <Ribbons
          colors={["#002FA7"]}
          baseThickness={34}
          baseSpring={0.024}
          baseFriction={0.9}
          offsetFactor={0}
          maxAge={280}
          pointCount={18}
          speedMultiplier={0.8}
          enableFade={false}
          enableShaderEffect={false}
        />
      </div>

      <StaggeredMenu
        className="portfolio-staggered-menu"
        position="right"
        isFixed={true}
        logoUrl={banner.src}
        items={menuItems}
        colors={["#CEDC00", "#F04E98", "#7D55C7", "#FF8F1C"]}
        accentColor="#CEDC00"
        menuButtonColor="#F2EAD7"
        openMenuButtonColor="#050509"
        displaySocials={false}
        displayItemNumbering={true}
      />

      <section id="top" className="relative z-10 min-h-[100svh] px-4 pb-10 pt-24 sm:px-6 lg:px-8 lg:pt-28">
        <div className="grid min-h-[calc(100svh-8rem)] gap-8 lg:grid-cols-[1.35fr_0.8fr] lg:items-end">
          <div className="hero-copy relative">
            <h1
              ref={heroNameRef}
              className="effect-chroma hero-name uppercase"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, var(--orange), var(--pink), var(--lime), var(--violet), var(--purple), var(--orange))",
                backgroundSize: "420% 100%",
                backgroundPosition: "0% 50%",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              <Shuffle
                text="Rong"
                tag="span"
                className="hero-name-shuffle"
                textAlign="left"
                shuffleDirection="left"
                duration={0.42}
                shuffleTimes={2}
                stagger={0.035}
                scrambleCharset="01/_#RONGFENG"
                colorFrom="#002FA7"
                colorTo="#F2EAD7"
                triggerOnce={false}
                onShuffleComplete={() => {}}
              />
              <br />
              <Shuffle
                text="Feng"
                tag="span"
                className="hero-name-shuffle"
                textAlign="left"
                shuffleDirection="right"
                duration={0.42}
                shuffleTimes={2}
                stagger={0.035}
                scrambleCharset="01/_#RONGFENG"
                colorFrom="#002FA7"
                colorTo="#F2EAD7"
                triggerOnce={false}
                onShuffleComplete={() => {}}
              />
            </h1>
            <div className="mt-4 flex flex-wrap items-end gap-4">
              <span className="effect-chroma font-display-cn text-[clamp(4rem,10vw,9rem)] font-black leading-none text-lime">
                冯熔
              </span>
              <p className="max-w-xl font-body text-xl leading-7 text-paper/82">
                One continuous index for playable work, images, writing, spaces, and the odd basement.
              </p>
            </div>
          </div>

          <div className="hero-portrait" style={{ "--active": active.color } as CSSProperties}>
            <Image src={portrait} alt="Self portrait" className="portrait-chroma h-full w-full object-cover" priority />
            <div className="portrait-caption">
              <span>active signal</span>
              <span>{active.label}</span>
            </div>
          </div>
        </div>

        <div className="hero-stream relative z-10 mt-12 overflow-hidden border-y border-paper/15 py-2">
          {streamRows.map((row) => (
            <p key={row} className="marquee-line font-mono text-[11px] uppercase text-paper/45">
              {row} {row} {row}
            </p>
          ))}
        </div>
      </section>
    </main>
  );
}
