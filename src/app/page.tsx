import Link from "next/link";

const doors = [
  { href: "/games", label: "Games", cn: "游戏", accent: "bg-lime" },
  { href: "/photography", label: "Photography", cn: "摄影", accent: "bg-violet" },
  { href: "/visual", label: "Visual Art", cn: "视觉", accent: "bg-pink" },
  { href: "/digital", label: "Digital", cn: "影像", accent: "bg-orange" },
  { href: "/theatre", label: "Theatre", cn: "剧场", accent: "bg-purple" },
  { href: "/making", label: "Making", cn: "制作", accent: "bg-lime" },
  { href: "/writing", label: "Writing", cn: "写作", accent: "bg-pink" },
  { href: "/basement", label: "Basement", cn: "地下室", accent: "bg-orange" },
];

const asciiNoise = [
  "[]==[]==[]==[]",
  "::..::..::..::",
  "/\\/\\/\\/\\/\\/\\/",
  "##**##**##**##",
];

export default function Home() {
  return (
    <main className="relative z-30 min-h-screen overflow-hidden px-5 py-5 text-paper sm:px-8 lg:px-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 effect-noise-layer opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(circle at 12% 22%, rgb(255 51 84 / 0.26) 0 12px, transparent 13px), radial-gradient(circle at 84% 10%, rgb(45 77 255 / 0.24) 0 10px, transparent 11px), radial-gradient(circle at 65% 82%, rgb(24 240 210 / 0.18) 0 14px, transparent 15px), linear-gradient(180deg, rgba(255,255,255,0.04), transparent 26%, rgba(255,255,255,0.04) 56%, transparent 100%)",
          backgroundSize: "240px 240px, 320px 320px, 380px 380px, 100% 100%",
          backgroundRepeat: "repeat, repeat, repeat, no-repeat",
          filter: "blur(16px)",
        }}
      />

      <header className="sticky top-5 z-40 flex items-start justify-between gap-4">
        <Link
          href="/"
          className="effect-pulse group grid size-14 place-items-center border border-paper/20 bg-pink font-display-cn text-3xl leading-none text-paper shadow-[6px_6px_0_var(--ink)] transition-transform hover:-translate-y-0.5"
          aria-label="Rong Feng home"
        >
          冯
        </Link>

        <nav
          className="flex max-w-[72vw] flex-wrap items-center justify-end gap-1.5 font-mono text-[11px] uppercase tracking-normal"
          aria-label="Primary navigation"
        >
          {["games", "photo", "visual", "digital", "theatre", "making", "writing", "cv"].map(
            (item) => (
              <Link
                key={item}
                href={item === "photo" ? "/photography" : `/${item}`}
                className="effect-terminal border border-paper/20 bg-paper/10 px-2 py-1 shadow-[3px_3px_0_var(--violet)] backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-pink hover:text-paper"
              >
                {item}
              </Link>
            )
          )}
        </nav>
      </header>

      <section className="grid min-h-[82vh] gap-10 pt-20 lg:grid-cols-[1.12fr_0.88fr] lg:pt-24">
        <div>
          <p className="mb-4 inline-block border-y border-paper/25 bg-paper/10 px-2 py-1 font-mono text-xs uppercase tracking-normal text-lime">
            game design / visual art / things that move
          </p>
          <h1 className="effect-chroma max-w-5xl font-display text-[clamp(4.8rem,15vw,13.5rem)] uppercase leading-[0.76] tracking-normal text-paper">
            Rong
            <br />
            Feng
          </h1>
          <div className="mt-5 flex max-w-4xl flex-wrap items-end gap-4">
            <span className="effect-chroma font-display-cn text-[clamp(4rem,11vw,10rem)] font-black leading-none text-lime">
              冯熔
            </span>
            <span className="mb-3 max-w-72 border-l-4 border-pink pl-3 font-mono text-sm leading-snug text-paper">
              Hack the door, walk in calm. Stay long enough to find the basement.
            </span>
          </div>
        </div>

        <aside className="self-end overflow-hidden border border-paper/20 bg-ink-2 p-4 shadow-[8px_8px_0_var(--purple)]">
          <div className="flex items-center justify-between gap-3 border-b border-paper/20 pb-2 font-mono text-[11px] uppercase text-lime">
            <span>terminal / collage / signal</span>
            <span>live</span>
          </div>
          <div className="mt-4 grid gap-3">
            <div className="border border-paper/15 bg-paper/5 p-3">
              <p className="font-display text-2xl uppercase leading-none text-paper">
                Collage newspaper
                <br />
                in a bright terminal.
              </p>
            </div>
            <pre className="overflow-hidden border border-paper/15 bg-black/20 p-2 font-mono text-[10px] leading-tight text-lime">
{asciiNoise.join("\n")}
            </pre>
            <p className="max-w-xl font-body text-base leading-7 text-paper/90">
              A portfolio for game design applications, built as a small world:
              loud at the edges, readable in the center, and full of texture when
              you stay on the page.
            </p>
            <p className="font-body-cn text-base leading-8 text-paper/90">
              这里不是安静白盒子。它应该像终端窗口、海报、拼贴报纸和旧屏幕的混种，
              让人一眼记住，再慢慢翻页。
            </p>
          </div>
        </aside>
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="border border-paper/20 border-l-4 border-l-pink bg-ink-2 p-4 shadow-[8px_8px_0_var(--orange)]">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-lime">
            signal strip
          </p>
          <h2 className="mt-2 font-display text-5xl uppercase leading-none text-paper">
            Choose a door.
          </h2>
          <p className="mt-3 max-w-sm font-body text-sm leading-6 text-paper/80">
            Each door is a section, but it should feel like a different screen.
            Hover, and the card should wake up a little.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {doors.map((door, index) => (
            <Link
              key={door.href}
              href={door.href}
              className={`group relative min-h-40 overflow-hidden border border-paper/20 bg-ink-2 p-4 shadow-[5px_5px_0_var(--ink)] transition-transform duration-300 hover:-translate-y-1 hover:rotate-[-0.5deg] ${
                index === doors.length - 1 ? "xl:col-start-4" : ""
              }`}
              style={{
                animationDelay: `${index * 45}ms`,
              }}
            >
              <span
                className={`absolute inset-x-0 bottom-0 h-2 ${door.accent} transition-all duration-300 group-hover:h-full group-hover:opacity-95`}
                aria-hidden="true"
              />
              <span
                aria-hidden="true"
                className="absolute right-2 top-2 border border-paper/15 bg-black/20 px-1 py-0.5 font-mono text-[9px] leading-none text-paper/60 opacity-70 transition-transform duration-300 group-hover:translate-x-[-4px] group-hover:translate-y-[4px]"
              />
              <span className="absolute left-2 top-2 font-mono text-[9px] leading-none text-paper/45">
                {index % 2 === 0 ? "[]==[]" : "/\\/\\/"}
              </span>
              <span className="relative flex h-full flex-col justify-between">
                <span className="font-mono text-[11px] uppercase text-lime">/{door.label.toLowerCase()}</span>
                <span>
                  <span className="effect-chroma block font-display text-4xl uppercase leading-none text-paper">
                    {door.label}
                  </span>
                  <span className="mt-1 block font-display-cn text-2xl font-black text-paper">
                    {door.cn}
                  </span>
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-6 grid gap-3 md:grid-cols-3">
        {[
          "grain / halftone / blur",
          "terminal / pop art / collage",
          "bright colors / dark base / loud edges",
        ].map((label, index) => (
          <div
            key={label}
            className={`border border-paper/20 bg-ink-2 px-4 py-3 font-mono text-xs uppercase tracking-[0.18em] text-paper/90 shadow-[4px_4px_0_var(--purple)] ${
              index === 1 ? "border-violet" : index === 2 ? "border-pink" : "border-lime"
            }`}
          >
            {label}
          </div>
        ))}
      </section>
    </main>
  );
}
