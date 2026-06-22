import Link from "next/link";

const doors = [
  { href: "/games", label: "Games", cn: "游戏", accent: "bg-teal" },
  { href: "/photography", label: "Photography", cn: "摄影", accent: "bg-riso-blue" },
  { href: "/visual", label: "Visual Art", cn: "视觉", accent: "bg-riso-red" },
  { href: "/digital", label: "Digital", cn: "影像", accent: "bg-acid" },
  { href: "/theatre", label: "Theatre", cn: "剧场", accent: "bg-riso-blue" },
  { href: "/making", label: "Making", cn: "制作", accent: "bg-teal" },
  { href: "/writing", label: "Writing", cn: "写作", accent: "bg-riso-red" },
  { href: "/basement", label: "Basement", cn: "地下室", accent: "bg-acid" },
];

export default function Home() {
  return (
    <main className="relative z-30 min-h-screen px-5 py-5 text-ink sm:px-8 lg:px-10">
      <header className="sticky top-5 z-40 flex items-start justify-between gap-4">
        <Link
          href="/"
          className="group grid size-14 place-items-center border border-ink bg-riso-red font-display-cn text-3xl leading-none text-paper shadow-[5px_5px_0_#0A0A0F] transition-transform hover:-translate-y-0.5"
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
                className="border border-ink/40 bg-paper/85 px-2 py-1 shadow-[2px_2px_0_rgb(10_10_15_/_0.22)] backdrop-blur-sm transition-colors hover:bg-acid"
              >
                {item}
              </Link>
            )
          )}
        </nav>
      </header>

      <section className="grid min-h-[82vh] content-between gap-12 pt-20 lg:grid-cols-[1.12fr_0.88fr] lg:pt-28">
        <div>
          <p className="mb-4 inline-block border-y border-ink px-1 py-1 font-mono text-xs uppercase tracking-normal">
            game design / visual art / things that move
          </p>
          <h1 className="max-w-5xl font-display text-[clamp(4.8rem,15vw,13.5rem)] uppercase leading-[0.78] tracking-normal">
            Rong
            <br />
            Feng
          </h1>
          <div className="mt-5 flex items-end gap-4">
            <span className="font-display-cn text-[clamp(4rem,11vw,10rem)] font-black leading-none text-riso-red [text-shadow:5px_5px_0_#1E3DFF]">
              冯熔
            </span>
            <span className="mb-3 max-w-64 border-l-4 border-ink pl-3 font-mono text-sm leading-snug">
              Hack the door, walk in calm. Stay long enough to find the basement.
            </span>
          </div>
        </div>

        <aside className="self-end border border-ink bg-paper/90 p-4 shadow-[8px_8px_0_#FF2D4A] backdrop-blur-sm">
          <p className="font-display text-3xl uppercase leading-none">
            Collage newspaper, with wet ink in the margins.
          </p>
          <p className="mt-4 font-body text-base leading-7">
            A portfolio for game design applications, built as a small world:
            calm enough for reviewers to read, strange enough to remember after
            they close the tab.
          </p>
          <p className="mt-4 font-body-cn text-base leading-8">
            这里会放游戏、视觉、摄影、剧场、制作和写作。先像报纸一样排版，
            再让互动慢慢渗出来。
          </p>
        </aside>
      </section>

      <section className="grid gap-4 border-y-2 border-ink py-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="font-mono text-xs uppercase">day 1 scaffold</p>
          <h2 className="mt-2 font-display text-6xl uppercase leading-none">
            Choose a door.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {doors.map((door, index) => (
            <Link
              key={door.href}
              href={door.href}
              className={`group relative min-h-36 overflow-hidden border border-ink bg-paper p-4 shadow-[5px_5px_0_rgb(10_10_15_/_0.9)] transition-transform hover:-translate-y-1 ${
                index === doors.length - 1 ? "xl:col-start-4" : ""
              }`}
            >
              <span
                className={`absolute inset-x-0 bottom-0 h-2 ${door.accent} transition-all duration-300 group-hover:h-full group-hover:opacity-85`}
                aria-hidden="true"
              />
              <span className="relative flex h-full flex-col justify-between">
                <span className="font-mono text-[11px] uppercase">/{door.label.toLowerCase()}</span>
                <span>
                  <span className="block font-display text-4xl uppercase leading-none">
                    {door.label}
                  </span>
                  <span className="mt-1 block font-display-cn text-2xl font-black">
                    {door.cn}
                  </span>
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
