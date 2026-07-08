"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";
import { type CSSProperties, useEffect, useRef, useState, useSyncExternalStore } from "react";
import ASCIIText from "@/components/ASCIIText";
import CircularText from "@/components/CircularText";
import DecryptedText from "@/components/DecryptedText";
import Dither from "@/components/Dither";
import FaultyTerminal from "@/components/FaultyTerminal";
import PixelTrail from "@/components/PixelTrail";
import StaggeredMenu from "@/components/StaggeredMenu";
import TextType from "@/components/TextType";
import SocialFlipButton, { type SocialItem } from "@/components/ui/social-flip-button";
import portrait from "../../assets/Self-portrait.png";
import banner from "../../assets/icon.png";
import artstationLogo from "../../assets/blackartstation.png";

const relaxingThemeUrl = new URL("../../assets/relaxing theme.mp3", import.meta.url).toString();
const finalName = "Rong\nFeng";
const scrambledName = "R0N_\nF3N#";
const scrambleChars = "01/_#<>RONGFENG";
const heroDecipherStartMs = 3350;
const heroDecipherFrameMs = 260;
const heroDecipherFinalMs = 7200;
const firstEntryStorageKey = "rong-home-title-intro-seen";

function readFirstEntrySeen() {
  try {
    return window.sessionStorage.getItem(firstEntryStorageKey) === "true";
  } catch {
    return false;
  }
}

function writeFirstEntrySeen() {
  try {
    window.sessionStorage.setItem(firstEntryStorageKey, "true");
  } catch {
    // Ignore browsers that block session storage.
  }
}

function scrambleName(revealedCount: number) {
  let seen = 0;

  return finalName
    .split("")
    .map((char, index) => {
      if (char === "\n" || char === " ") return char;
      seen += 1;
      if (seen <= revealedCount) return char;
      return scrambleChars[(index + revealedCount * 3) % scrambleChars.length];
    })
    .join("");
}

const sections = [
  {
    id: "games",
    label: "Games",
    cn: "遊戲",
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
    cn: "攝影",
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
    cn: "戲劇",
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
] as const;

const streamRows = [
  "RONGFENG//INDEX//0001//SCROLL//VISUALSYSTEM//",
  "GAMES PHOTOGRAPHY VISUAL DIGITAL THEATRE MAKING WRITING",
  "ASCII_WASH CHROMA_OFFSET HALFTONE_SCAN RELAXING_THEME",
];

const menuItems = sections.map((section) => ({
  label: section.label,
  link: section.route,
  ariaLabel: `Open ${section.label}`,
}));

function subscribeToHydration(callback: () => void) {
  queueMicrotask(callback);
  return () => {};
}

function getClientHydrationSnapshot() {
  return true;
}

function getServerHydrationSnapshot() {
  return false;
}

export default function Home() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const heroNameRef = useRef<HTMLHeadingElement | null>(null);
  const [introDone, setIntroDone] = useState(false);
  const [, setHeroNameText] = useState(scrambledName);
  const [activeIndex] = useState(0);
  const cursorReady = useSyncExternalStore(
    subscribeToHydration,
    getClientHydrationSnapshot,
    getServerHydrationSnapshot,
  );
  const active = sections[activeIndex];
  const contactFlipItems: SocialItem[] = [
    {
      letter: "C",
      icon: <Mail className="h-4 w-4" aria-hidden="true" />,
      label: "Email",
      href: "mailto:mailrongfeng1203@gmail.com",
    },
    {
      letter: "O",
      icon: <Image src={artstationLogo} alt="" className="h-5 w-5 object-contain" />,
      label: "ArtStation",
      href: "https://www.artstation.com/",
    },
    {
      letter: "N",
      icon: <Mail className="h-4 w-4" aria-hidden="true" />,
      label: "Email",
      href: "mailto:mailrongfeng1203@gmail.com",
    },
    {
      letter: "T",
      icon: <Image src={artstationLogo} alt="" className="h-5 w-5 object-contain" />,
      label: "ArtStation",
      href: "https://www.artstation.com/",
    },
    {
      letter: "A",
      icon: <Image src={artstationLogo} alt="" className="h-5 w-5 object-contain" />,
      label: "ArtStation",
      href: "https://www.artstation.com/",
    },
    {
      letter: "C",
      icon: <Mail className="h-4 w-4" aria-hidden="true" />,
      label: "Email",
      href: "mailto:mailrongfeng1203@gmail.com",
    },
    {
      letter: "T",
      icon: <Image src={artstationLogo} alt="" className="h-5 w-5 object-contain" />,
      label: "ArtStation",
      href: "https://www.artstation.com/",
    },
  ];

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
    if (readFirstEntrySeen()) return;
    if (!heroName || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let step = 0;
    const positions = ["0% 50%", "32% 50%", "68% 50%", "100% 50%", "68% 50%", "32% 50%"];
    heroName.style.transition = "background-position 780ms ease-in-out";

    const interval = window.setInterval(() => {
      step = (step + 1) % positions.length;
      heroName.style.backgroundPosition = positions[step];
    }, 780);

    const stopTimer = window.setTimeout(() => window.clearInterval(interval), heroDecipherFinalMs + 900);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(stopTimer);
    };
  }, []);

  useEffect(() => {
    const timers: number[] = [];

    if (readFirstEntrySeen()) {
      timers.push(window.setTimeout(() => setHeroNameText(finalName), 0));
      return () => timers.forEach((timer) => window.clearTimeout(timer));
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      timers.push(window.setTimeout(() => {
        setHeroNameText(finalName);
        writeFirstEntrySeen();
      }, 0));
      return () => timers.forEach((timer) => window.clearTimeout(timer));
    }

    const revealableCharacters = finalName.replace(/\s/g, "").length;
    const frames = [
      scrambleName(0),
      scrambleName(0),
      ...Array.from({ length: revealableCharacters }, (_, index) => scrambleName(index + 1)),
      finalName,
    ];

    frames.forEach((frame, index) => {
      timers.push(window.setTimeout(() => setHeroNameText(frame), heroDecipherStartMs + index * heroDecipherFrameMs));
    });

    timers.push(window.setTimeout(() => {
      setHeroNameText(finalName);
      writeFirstEntrySeen();
    }, heroDecipherFinalMs));

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  return (
    <main className="front-page relative min-h-screen overflow-x-hidden text-paper">
      {!introDone && (
        <div className="fixed inset-0 z-[100] overflow-hidden bg-pink">
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
            tint="#F04E98"
            mouseReact={true}
            mouseStrength={0.35}
            pageLoadAnimation={true}
            brightness={1.12}
          />
          <div className="ascii-reveal absolute inset-0" />

          <div className="absolute inset-0 grid items-center px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:px-12">
            <div className="relative h-[48vh] min-h-[320px] lg:translate-x-12 xl:translate-x-20">
              <ASCIIText
                text="LOADING"
                asciiFontSize={7}
                textFontSize={210}
                textColor="#CEDC00"
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
          waveSpeed={0.058}
          waveFrequency={2.6}
          waveAmplitude={0.56}
          waveColor={[0.33, 0.15, 1]}
          colorNum={5}
          pixelSize={4}
          mouseRadius={0.9}
          enableMouseInteraction={true}
        />
      </div>
      <div className="texture-halftone fixed inset-0 pointer-events-none z-0" />
      {cursorReady ? (
        <div className="pixel-trail-cursor" aria-hidden="true">
          <PixelTrail
            gridSize={68}
            trailSize={0.075}
            maxAge={180}
            interpolate={2}
            color="#002FA7"
            gooeyFilter={undefined}
            canvasProps={{
              eventSource: document.body,
              eventPrefix: "client",
            }}
          />
        </div>
      ) : null}

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

      <section id="top" className="relative z-10 flex min-h-[100svh] flex-col px-4 pb-4 pt-4 sm:px-6 sm:pt-5 lg:px-8 lg:pt-6">
        <div className="grid flex-1 gap-8 lg:grid-cols-[1.35fr_0.8fr] lg:items-center">
          <div className="hero-copy relative">
            {/*
            <h1
              ref={heroNameRef}
              className="effect-chroma hero-name uppercase"
            >
              {heroNameText}
            </h1>
            */}
            <div className="mt-4 flex flex-wrap items-end gap-4">
              {/*
              <span className="hero-cn-name">
                馮熔
              </span>
              */}
              <TextType
                as="p"
                text="I am a 17 y/o highschool student, aspiring game designer and multi-disciplinary artist. 
                I LOVEEE creating interactive art, all kinds of design and experimenting with different mediums."
                className="max-w-xl font-body text-xl leading-7 text-paper/82"
                typingSpeed={28}
                initialDelay={320}
                loop={false}
                showCursor={true}
                cursorCharacter="_"
                cursorClassName="text-lime"
              />
            </div>
          </div>

          <div className="hero-side">
            <div className="hero-portrait" style={{ "--active": "var(--lime)" } as CSSProperties}>
              <Image src={portrait} alt="Self portrait" className="portrait-chroma h-full w-full object-contain" priority />
              <div className="portrait-caption">
                <span>active signal</span>
                <span>{active.label}</span>
              </div>
            </div>
            <div className="contact-panel hero-contact-panel" aria-label="Contact links">
              <p className="contact-panel-row">
                <span>mail</span>
                <strong>mailrongfeng1203@gmail.com</strong>
              </p>
              <p className="contact-panel-row">
                <span>social</span>
                <strong>artstation / portfolio in progress</strong>
              </p>
              <SocialFlipButton
                items={contactFlipItems}
                className="contact-flip"
                itemClassName="contact-flip-item"
                frontClassName="contact-flip-front"
                backClassName="contact-flip-back"
                showTooltips={false}
              />
            </div>
          </div>
        </div>

        <div className="hero-stream relative z-10 mt-auto overflow-hidden border-y border-paper/15 py-2">
          {streamRows.map((row) => (
            <p key={row} className="marquee-line font-mono text-[11px] uppercase text-paper/45">
              {row} {row} {row}
            </p>
          ))}
        </div>
      </section>

      <section className="scroll-page-stack relative z-10" aria-label="Scroll portfolio pages">
        <div className="scroll-stack-primer">
          <span>/scroll_index</span>
          <p>keep scrolling / each room opens slowly / side menu stays live</p>
        </div>

        {sections.map((section, index) => (
          <section
            key={section.id}
            className="scroll-page-band"
            style={{ "--active": section.color, "--row": index } as CSSProperties}
          >
            <Link href={section.route} className="scroll-page-link" aria-label={`Enter ${section.label}`}>
              <div className="scroll-page-shell">
                <div className="scroll-page-kicker">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span>{section.code}</span>
                </div>
                <h2>{section.label}</h2>
                <p className="scroll-page-cn">{section.cn}</p>
                <p className="scroll-page-copy">{section.copy}</p>
                <ul className="scroll-page-scraps" aria-label={`${section.label} topics`}>
                  {section.scraps.map((scrap) => (
                    <li key={scrap}>{scrap}</li>
                  ))}
                </ul>
                <span className="scroll-page-enter">enter / {section.id}</span>
              </div>
            </Link>
          </section>
        ))}
      </section>
    </main>
  );
}
