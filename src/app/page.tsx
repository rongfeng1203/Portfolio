"use client";

import Image from "next/image";
import { FaDiscord, FaEnvelope, FaGithub, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { type CSSProperties, useEffect, useRef, useState, useSyncExternalStore } from "react";
import ASCIIText from "@/components/ASCIIText";
import CircularText from "@/components/CircularText";
import DecryptedText from "@/components/DecryptedText";
import Dither from "@/components/Dither";
import FaultyTerminal from "@/components/FaultyTerminal";
import PixelTrail from "@/components/PixelTrail";
import TextType from "@/components/TextType";
import SocialFlipButton, { type SocialItem } from "@/components/ui/social-flip-button";
import portrait from "../../assets/Self-portrait.png";
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
    return window.localStorage.getItem(firstEntryStorageKey) === "true";
  } catch {
    return false;
  }
}

function writeFirstEntrySeen() {
  try {
    window.localStorage.setItem(firstEntryStorageKey, "true");
  } catch {
    // Ignore browsers that block persistent storage.
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
    secondaryColor: "var(--pink)",
    route: "/games",
    copy:
      "Unity games, immersive media, python code visualization, and prototypes. Where code meets art.",
    scraps: ["Unity", "Python", "Design", "Systems"],
  },
  {
    id: "photography",
    label: "Photography",
    cn: "攝影",
    code: "CONTACT SHEETS",
    color: "var(--violet)",
    secondaryColor: "var(--lime)",
    route: "/photography",
    copy:
      "Stage photos, street candids, portrait sequences. Peak in to my film-wannabe-self.",
    scraps: ["Archive", "Candid", "Stage", "Portrait"],
  },
  {
    id: "visual",
    label: "Visual Art",
    cn: "视觉",
    code: "SCAN / POSTER",
    color: "var(--pink)",
    secondaryColor: "var(--orange)",
    route: "/visual",
    copy:
      "Illustration, graphic collage, painting, drawing, and sketch. Where everything started. ",
    scraps: ["Illustration", "Poster", "Sketchbook", "Texture"],
  },
  {
    id: "digital",
    label: "Digital Arts",
    cn: "影像",
    code: "MOTION BUFFER",
    color: "var(--orange)",
    secondaryColor: "var(--lime)",
    route: "/digital",
    copy:
      "Animation, concept design, graphics, and digital collages. Thanks ASM3/4M.",
    scraps: ["Video", "Shader", "Loop", "Screen"],
  },
  {
    id: "theatre",
    label: "Theatre",
    cn: "戲劇",
    code: "SPACE CUE",
    color: "var(--purple)",
    secondaryColor: "var(--orange)",
    route: "/theatre",
    copy:
      "Stage management, light, cues, and bugeting. I love my team.",
    scraps: ["Light", "Stage", "Cue", "Space"],
  },
  {
    id: "making",
    label: "Making",
    cn: "制作",
    code: "MATERIAL LOG",
    color: "var(--lime)",
    secondaryColor: "var(--pink)",
    route: "/making",
    copy:
      "Sewing, laser cutting, woodworking, and engineering. I love Arduino:)",
    scraps: ["Wood", "Fabric", "Laser", "Model"],
  },
  {
    id: "writing",
    label: "Writing",
    cn: "写作",
    code: "TEXT ENGINE",
    color: "var(--pink)",
    secondaryColor: "var(--orange)",
    route: "/writing",
    copy:
      "Fiction, essays, scripts, and dystopia. My dream as a child.",
    scraps: ["Fiction", "Dreams", "Script", "Essay"],
  },
] as const;

const streamRows = [
  "RONGFENG//INDEX//0001//SCROLL//VISUALSYSTEM//",
  "GAMES PHOTOGRAPHY VISUAL DIGITAL ARTS THEATRE MAKING WRITING",
  "ASCII_WASH CHROMA_OFFSET HALFTONE_SCAN RELAXING_THEME",
];

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
  const cursorReady = useSyncExternalStore(
    subscribeToHydration,
    getClientHydrationSnapshot,
    getServerHydrationSnapshot,
  );
  const firstEntrySeen = useSyncExternalStore(
    subscribeToHydration,
    readFirstEntrySeen,
    () => true,
  );
  const active = sections[0];
  const contactFlipItems: SocialItem[] = [
    {
      letter: "C",
      icon: <FaEnvelope aria-hidden="true" />,
      label: "Email",
      href: "mailto:rongfeng1203@gmail.com",
    },
    {
      letter: "O",
      icon: <Image src={artstationLogo} alt="" className="h-5 w-5 object-contain" />,
      label: "ArtStation",
      href: "https://www.artstation.com/rongfeng",
    },
    {
      letter: "N",
      icon: <FaInstagram aria-hidden="true" />,
      label: "Instagram",
      href: "https://www.instagram.com/rongfeng1203/",
    },
    {
      letter: "T",
      icon: <FaGithub aria-hidden="true" />,
      label: "GitHub",
      href: "https://github.com/rongfeng1203",
    },
    {
      letter: "A",
      icon: <FaLinkedin aria-hidden="true" />,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/rong-feng-b65a15259/",
    },
    {
      letter: "C",
      icon: <FaYoutube aria-hidden="true" />,
      label: "YouTube",
      href: "https://www.youtube.com/@RongFeng1203",
    },
    {
      letter: "T",
      icon: <FaDiscord aria-hidden="true" />,
      label: "Discord",
      href: "https://discord.gg/rHFK8PS6",
    },
  ];

  useEffect(() => {
    if (firstEntrySeen) return;

    const timer = window.setTimeout(() => {
      setIntroDone(true);
      writeFirstEntrySeen();
    }, 3200);
    return () => window.clearTimeout(timer);
  }, [firstEntrySeen]);

  useEffect(() => {
    if (firstEntrySeen || introDone) return;

    const dismissIntro = () => {
      setIntroDone(true);
      writeFirstEntrySeen();
    };
    const dismissIntroFromKey = (event: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", "End", " "].includes(event.key)) {
        dismissIntro();
      }
    };

    window.addEventListener("wheel", dismissIntro, { once: true, passive: true });
    window.addEventListener("touchmove", dismissIntro, { once: true, passive: true });
    window.addEventListener("keydown", dismissIntroFromKey);

    return () => {
      window.removeEventListener("wheel", dismissIntro);
      window.removeEventListener("touchmove", dismissIntro);
      window.removeEventListener("keydown", dismissIntroFromKey);
    };
  }, [firstEntrySeen, introDone]);

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
      {cursorReady && !firstEntrySeen && !introDone && (
        <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden bg-pink">
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

    </main>
  );
}
