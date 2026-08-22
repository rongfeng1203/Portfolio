# Project Context & Handoff Memory
## Rong Feng / 荣峰 — Game-Design Portfolio Website

> **Purpose of this document.** A self-contained handoff so any AI (Claude, GPT, Gemini, etc.) can pick up this project cold. It captures every instruction the user has given, every clarifying answer, every locked decision, every open item, and every file produced. Treat this as the project's persistent memory. Update it as decisions evolve.

> **Last updated:** 2026-06-12 (v4 — added /writing page, Vercel 404 resolved)
> **Project phase:** Build. Day 0 complete (env + Vercel deploy live + Next.js welcome page rendering). Site structure locked. **Day 1 of build is the next step.**

---

## 1. User profile

| Field | Value |
|---|---|
| Name | Rong (Rong Feng) |
| Email | rongfeng1203@gmail.com |
| Location | Unspecified |
| OS | macOS Apple Silicon |
| Skill level | Comfortable with React/JS. Had prior macOS npm/Node permission errors (resolved via nvm). |
| Design tools | Strong in Adobe Illustrator. |
| Disciplines | Game design (Unity, web, Python). Visual art (Illustrator + traditional). Digital/media art (motion, shaders, video). Photography (large inventory). Theatre (stage management, set + lighting concept, Unity/Blender lighting practice). Physical making (interior, laser cut, sewing, woodworking). **Creative writing** (fiction, poetry, game writing, essays, theatre scripts). Bilingual EN + 中文. |

---

## 2. Project goal

Build a **personal website portfolio for university applications**, focused on **game design** as the primary discipline, with strong showings across visual art, digital/media art, photography, theatre, physical making, and creative writing. The site must showcase personality heavily, function for ongoing use after applications, and be deployed publicly.

Hard constraints:

- Timeline: 1–2 weeks (14 days)
- Hosting: Vercel (DEPLOYED ✓ — Next.js welcome page loading on new project `portfolio-pi-two`)
- Bilingual: English + 中文 with similar-feeling type pairings
- Not clean/minimalistic — authentic, designer-feeling, textured

---

## 3. Locked brand anchor (v2)

> **"Hack the door, walk in calm. Stay long enough to find the basement."**

Three-mode arc:

1. **Door** — multi-window hacker takeover (first visit only) simulates ADHD overload at entry
2. **Calm interior** — landing scroll + section pages: restrained, designer, slow
3. **Reward depth** — basement, chatbot, easter eggs emerge with exploration

Original anchor was "polished by default, weird if you stay" — superseded on 2026-06-12.

---

## 4. Locked visual direction

- **Mood:** Dark cyber base + risograph pop accents + classic newspaper bones + Y2K accents.
- **Texture:** Heavy. Grain on everything. Newsprint paper for inverted sections. Liquid-glass for floating UI. Not metallic.
- **Bilingual treatment:** EN + 中文 paired typographically. Chinese characters get a riso offset shadow as signature.

### Color palette

| Role | Name | HEX | Use |
|---|---|---|---|
| Primary surface | Ink (墨) | `#0A0A0F` | 60% |
| Inverted surface | Paper (纸) | `#ECE6D2` | 18% |
| Cyber accent | Teal (青) | `#00E5C7` | 8% |
| Riso pop | Riso Red (朱) | `#FF2D4A` | 6% |
| Riso pop | Riso Blue (钴) | `#1E3DFF` | 5% |
| Reward color | Acid (毒绿) | `#D7FF00` | 3% — hover + secrets only |
| Secondary paper | Bone (骨) | `#D9D2BC` | – |
| Dark surface 2 | Ink-2 | `#14141C` | – |
| Mid gray | Ash / Smoke | `#2A2A33` / `#4A4A55` | – |

### Typography (free Google Fonts)

| Role | Latin | Chinese |
|---|---|---|
| Display / masthead | Anton | Noto Serif SC 900 |
| Body | Inter 500 | Noto Sans SC 500 |
| Mono / captions | Space Mono | Noto Sans SC tabular |
| Y2K accent | Bungee | ZCOOL QingKe HuangYou |
| Terminal accent | VT323 | Noto Serif SC 700 |

### Logo

- Bilingual lockup: `RONG·FENG` + `荣峰`
- 荣峰 is a placeholder — user must confirm or swap to actual Chinese name
- Variants: horizontal lockup, stacked, monogram (R+F)
- Favicon: 荣 in a riso-red square

### Photo filter

Two candidates demoed in brand book. **Default still to be locked before D9.**
- A — Cyber duotone (teal + ink)
- B — Glitch + grain desaturate

---

## 5. Locked site structure (v3)

Detailed in `site_structure.md`. Quick map (12 pages):

```
/                                LANDING (long scroll about + 8-door chooser at end)
                                 ▸ Intro takeover on first visit
/games                           Index
/games/[slug]                    Case studies (for 2–4 best games)
/photography                     Series gallery + lightbox (largest section)
                                 ▸ Includes theatre/backstage as a named series
/visual                          Illustrator + traditional gallery
/digital                         Motion / shader / video gallery
/theatre                         Stage mgmt, set/light concept, recordings, Unity/Blender practice
/making                          Interior design, laser cut, sewing, woodworking
/writing                         Creative writing index — fiction, poetry, game writing, essays, scripts
/writing/[slug]                  Reader page for longer pieces
/basement                        Collagey personality page — sketches, kid work, scrap
                                 ▸ Also unlocked via chaos meter at 90s
/cv                              Resume — designed page + PDF download
/colophon                        Credits — fonts, libs, refs
/404                             Designed 404
```

**Overlays:** Intro takeover (first visit), chatbot (60s), custom cursor (4 states — added "READ" for /writing), chaos meter, language toggle, persistent section nav.

**Chooser at end of landing:** 8 doors in a 4-3-1 grid (Games · Photography · Visual · Digital / Theatre · Making · Writing / Basement off-rhythm).

**Pet character: REMOVED.** Dropped on 2026-06-12.

**Awards placement:**
- Primary: `/cv`
- Secondary: landing recognition strip
- Tertiary: per-case-study credits
- Writing awards (literary contests): inline with the piece on `/writing`
- Kid awards: `/basement` as mementos

---

## 6. Locked tech stack

| Layer | Choice | Status |
|---|---|---|
| Framework | Next.js 16.2.9 (App Router, Turbopack) | Installed |
| Styling | Tailwind v4 + CSS variables via `@theme` block | Installed |
| 3D / shaders | React Three Fiber + drei + custom GLSL | Installed |
| Scroll motion | GSAP + ScrollTrigger | Installed |
| Component motion | Framer Motion | Installed |
| Smooth scroll | Lenis | Installed |
| State | Zustand | Installed |
| Content | MDX + JSON files (no CMS) | Installed |
| Image hosting | Vercel `<Image>` | Default |
| Video hosting | Mux or Cloudinary (TBD) | Pending |
| Analytics | Vercel Analytics | Pending |
| Package manager | pnpm 11 | Installed |
| Node manager | nvm + Node LTS v24 | Installed |

---

## 7. Environment setup (DONE)

- nvm installed, Node v24.16.0 (LTS), `which node` confirms it's in `~/.nvm/`
- pnpm + Vercel CLI installed globally (CLI required `vercel login` re-auth on D0)
- Project scaffolded inside existing GitHub repo at `~/Downloads/Art/Portfolio/Portfolio/`
- All interactive packages installed
- `/test` diagnostic page confirms R3F, Framer Motion, GSAP, Zustand, Tailwind all work locally
- **Vercel deploy: WORKING** on a new project `portfolio-pi-two` (CLI auto-created when the original `portfolio` project was broken).
  - Original `portfolio` Vercel project was returning 404. Cause: configuration issue (root cause unconfirmed; likely stale from when the repo only had an empty `index.html`).
  - Resolution: `vercel --prod` from local created a fresh working project. User should delete old broken project + rename new one to `portfolio` if desired.
  - Current production URL pattern: `portfolio-pi-two-[hash].vercel.app`

Folder structure on disk:

```
/Users/rongfeng/Downloads/Art/Portfolio/   ← planning docs live here
├── SETUP_GUIDE.md
├── CONTEXT_HANDOFF.md          (this file)
├── site_structure.md
├── starter-configs/             (drop-in components)
├── assets/                      (TBD — exported assets)
└── Portfolio/                   ← THE GITHUB REPO + Next.js project
    ├── src/
    ├── public/
    ├── node_modules/
    ├── package.json
    ├── pnpm-workspace.yaml
    └── .git/
```

Package name: `rong-portfolio`. Branch: `main`.

---

## 8. Locked 14-day build map (v3)

| Day | Work | Status |
|---|---|---|
| D0 | Environment + Vercel deploy | ✓ done |
| D1 | Brand tokens in code, custom cursor (4 states), global layout shell, language toggle, footer | next |
| D2 | Signature GLSL shader on landing | pending |
| D3 | Landing long-scroll content + 8-door chooser | pending |
| D4 | `/visual` gallery + shared card | pending |
| D5 | `/digital` gallery with hover-video card | pending |
| D6 | `/making` gallery (reuses card, filter chips) | pending |
| D7 | `/games` index + first `/games/[slug]` template | pending |
| D8 | `/theatre` page | pending |
| D9 | `/photography` (series + lightbox) | pending |
| D10 | `/cv` page + `/writing` index + `/writing/[slug]` reader template + PDF generation | pending |
| D11 | Hacker intro takeover (multi-window) | pending |
| D12 | `/basement` v1 + chatbot module | pending |
| D13 | `/basement` polish + a11y / reduced-motion pass | pending |
| D14 | `/404` + `/colophon` + bug bash + ship | pending |

**Note on D10:** /cv + /writing share the day because both are text-heavy with no media pipeline. /writing reuses typographic system from D1 + card pattern from D4. Reader template is mostly typography + scroll behavior, no new infrastructure.

**Cut-line order if behind:** `/colophon` → `/404` → chatbot → hacker intro complexity → `/writing/[slug]` reader-mode toggle → basement easter eggs → theatre lighting practice → `/making` filter chips.

**Never cut:** shader on landing, /photography, game case studies, /cv, /theatre productions, /making intro work, /writing index.

---

## 9. Q&A log — every clarifying question and the user's exact answers

### Round 1 — Initial scoping

Q1.1 React/JS comfort? → "I want to do something with react/js, earlier this year I encountered some difficulties running some of these tools though"
Q1.2 Aesthetic? → "love everything... shader coding in relation to game design... darker style... pop art/cyberpunk/zine/risograph/cyberpunk mix... deciding rough vs professional... needs to be deployed... social accounts... really interactive too, fun"
Q1.3 Interactivity? → "very polished, the interactiveness can come out in the background, transitions and motions. Some games are pure python, some unity, some web. Embedded video. Hard separation between small personal vs hardcore unity (video only)"
Q1.4 Hosting? → "either github or vercel, better experience with vercel"

### Round 2 — Environment, tone, content

Q2.1 OS / prior pain? → Mac, npm/node install errors
Q2.2 Rough vs polished? → "something in between... longer user spend the more craziness starts to come out, like a pet that walks on the web... explosions that shows secret information, or secret paths" *(pet later removed in Round 6)*
Q2.3 Content inventory? → "games I don't have that much, but visual art/media art/photography (especially photography I have a lot)"

### Round 3 — Brand book direction

Q3.1 Logo? → Bilingual lockup (Latin + 中文). [Placeholder 荣峰]
Q3.2 Color volume? → Mixed: dark cyber base + riso pop accents
Q3.3 Photo filter default? → "cyber duotone or glitch grain desaturation" (both demoed; default pending)
Q3.4 Deliverable? → Interactive HTML brand book

### Round 4 — Site structure pivot

Q4.1 Intro shape? → "full screen takeover of each section of hacker style windows filling the screen itself to be animated too, but it only happens once when someone new enters my web"
Q4.2 Navigation? → "intro page to be a long scroll about me, and then at the end the visitor can choose pages in depth"
Q4.3 Piece depth? → Case studies for games, galleries for everything else
Q4.4 Extra pages? → Process / sketchbook / basement + Designed 404 + chatbot + colophon. User added: "really like the sketchbook process idea, I want to make this page very collagey and interactive, basically I'll put all my extra work and works from when I was a kid"

### Round 5 — In-build clarifications

- New entry concept ratified: ADHD overload at the door → calm interior → reward depth
- Awards: no dedicated page

### Round 6 — Theatre + making + pet removal (2026-06-12)

Q6.1 Theatre work scope? → User listed: production photography (folds into /photography), stage manager work, recordings, initial concept design for set + lighting, lighting practice in Unity and Blender. Plus mentioned wanting a design page for interior design, laser cutting, sewing, woodworking.
- **Decision:** Added `/theatre` AND `/making` as two separate pages. Theatre photography stays as a named series inside `/photography`.

User instructions in same turn:
- "I don't want a pet anymore though" → pet character REMOVED everywhere
- Asked what colophon/404/cv are → explained
- "remember to update the context handoffs once in a while" → docs updated

### Round 7 — Vercel 404 debugging (2026-06-12)

- Original `portfolio` Vercel project returning 404 even after build was green and Deployment Protection disabled
- Confirmed: all scaffold files in latest GitHub commit (including page.tsx, layout.tsx)
- Confirmed: Framework = Next.js, Root Directory = empty
- Empty `index.html` placeholder still in repo (removed)
- Resolution: `vercel --prod` from local CLI auto-created a working project `portfolio-pi-two`. Old project should be deleted.

### Round 8 — Creative writing page (2026-06-12)

User request: "Add a creative writing page to the portfolio plan — update the site structure/sitemap and any relevant planning docs to include it."
- **Decision:** Added `/writing` index + `/writing/[slug]` reader pages.
- Categories: fiction, poetry, game writing, essays, scripts, 中文-tagged.
- Short pieces expand inline; longer pieces get their own reader page with reader-mode toggle.
- Strongest bilingual page on the site — registers don't translate symmetrically.
- Writing awards live inline with pieces, not on /cv.
- Added a new "READ" cursor state.
- Slotted into D10 alongside /cv (both text-heavy, share type system).
- Chooser at end of landing now has 8 doors instead of 7.

---

## 10. Pending decisions / data to lock during build

| Item | Why | Deadline |
|---|---|---|
| **Default photo filter** (A cyber duotone or B glitch+grain) | /photography mood | Before D9 |
| **Actual Chinese characters** for the name | Logo, favicon, OG card | Before D1 |
| **Social handles** to display | Footer + /cv | Before D10 |
| **Custom domain** | Vercel URL → real domain | Before D14 |
| **Awards list** | The actual awards to print | Before D10 |
| **Photo series names** (3–5) | Sub-grouping in /photography | Before D9 |
| **Top 2–4 games** for case studies | /games/[slug] focus | Before D7 |
| **Theatre productions list** | Show titles, year, venue, your role per show | Before D8 |
| **Making items list** | Pieces per category | Before D6 |
| **Writing pieces inventory** | Title, year, type, language, length, body text; mark short (inline) vs long (own reader page) | Before D10 |
| **Writing awards** | Literary contests, journal acceptances, etc. | Before D10 |
| **2 reference sites** the user loves | Aesthetic targets | Anytime helpful |
| **Hacker intro window content** | What each terminal window says | Before D11 |
| **Chatbot system prompt** | Bio, projects, voice samples + writing excerpts | Before D12 |

User plans to paste animation / scroll / reactive-cursor code from online. Integration pattern is in `site_structure.md §8`.

---

## 11. Active troubleshooting / housekeeping

### Vercel project cleanup (still pending user action)

- Old `portfolio` Vercel project: broken, should be deleted via Vercel dashboard → old project → Settings → bottom → Delete Project
- New `portfolio-pi-two` project: working, deploys on push
- Optional: rename `portfolio-pi-two` → `portfolio` once old project deleted (Settings → General → Project Name)
- Future workflow: `git push origin main` triggers auto-redeploy. No more CLI needed.

### globals.css brand version not yet committed

- Commit `6813158` shows `src/app/globals.css | 44 +` — that's the Next.js scaffold default, not the brand version
- Brand globals.css with `@theme` block + grain overlay needs to be re-pasted from `starter-configs/globals.css` and committed
- Will happen during D1 build work

---

## 12. Files produced

| File | Path | Purpose |
|---|---|---|
| Build plan v1 | `~/Downloads/Art/Portfolio/portfolio_plan.md` (if copied; else /outputs) | Original 14-day plan, superseded by site_structure.md |
| Brand book | `~/Downloads/Art/Portfolio/brand_book.html` (if copied; else /outputs) | Interactive visual identity book |
| Setup guide | `~/Downloads/Art/Portfolio/SETUP_GUIDE.md` | Day 0 step-by-step (DONE) |
| Starter configs | `~/Downloads/Art/Portfolio/starter-configs/` | Drop-in CSS + components for Tailwind v4 |
| **Site structure** | `~/Downloads/Art/Portfolio/site_structure.md` | **Locked sitemap + page specs (v3)** |
| **Context handoff** | `~/Downloads/Art/Portfolio/CONTEXT_HANDOFF.md` | **This file (v4)** |

---

## 13. Style / voice guidance for the next AI

- Personality-rich output, not corporate-clean. Match the user's voice in copy when writing examples.
- Bias toward asking 3–4 clarifying questions before producing a deliverable when something's ambiguous.
- Commit to a recommendation rather than presenting endless options.
- Bilingual content: EN as primary, include 中文 where it adds personality, not as decoration. Don't translate symmetrically — the two registers have different feelings. **Writing pieces themselves stay in their composed language regardless of the site's language toggle.**
- Long structured Markdown is welcome for planning. Interactive HTML for visuals.
- No more visual mockups or design assets until structure is locked. **Structure is locked (v3 as of 2026-06-12). Visual code work follows the D1–D14 schedule.**
- **Pet character is OUT.** Don't reintroduce.

---

## 14. How to continue from here

If you are the next AI picking this up:

1. **Read this document first**, then `site_structure.md`, then skim `brand_book.html`.
2. **Confirm with the user what day of the build they're on.** Day 0 is done. Vercel cleanup may still be pending (see §11).
3. **Day 1 deliverables:**
   - Apply brand tokens (re-paste `starter-configs/globals.css` into `src/app/globals.css` — current commit has the scaffold default, not the brand version)
   - Build custom cursor component (`src/components/CustomCursor.tsx` — 4 states now: default, link, art, READ)
   - Build global layout shell (header monogram, section nav with 8 disciplines, language toggle, footer)
   - Wire Lenis smooth scroll provider
4. **Confirm pending items in §10 as you encounter them** — don't guess Chinese characters, photo series names, theatre productions, making items, writing pieces, etc.
5. **Update this CONTEXT_HANDOFF.md** with any new decisions the user locks in. Bump version number in header.

---

## 15. Quick-reference summary card

```
PROJECT       Rong Feng / 荣峰 — game-design portfolio for university apps
DEADLINE      14 days
ANCHOR (v2)   Hack the door, walk in calm. Stay long enough to find the basement.
PHASE         Build. D0 done. D1 next.
LIVE URL      portfolio-pi-two-[hash].vercel.app (working). Old `portfolio` project: delete.
LOCAL DIR     ~/Downloads/Art/Portfolio/Portfolio/ (Next.js + .git)
STRUCTURE     Hybrid hub — long-scroll landing → 8-door chooser → discrete URLs
PAGES (12)    / · /games(/[slug]) · /photography · /visual · /digital · /theatre
              · /making · /writing(/[slug]) · /basement · /cv · /colophon · /404
OVERLAYS      Intro takeover (first visit) · chatbot (60s) · cursor 4 states · chaos
              · language toggle · section nav
PERSONALITY   Hacker intro · voice · bilingual · writing · basement collage · chaos
              · chatbot · easter eggs · cursor · signature shader (NO PET)
TECH STACK    Next 16 + React 19 + Tailwind v4 + R3F + GSAP + Lenis + Framer + Zustand
NEXT ACTION   1. Delete old broken Vercel project  2. Begin D1 build
FILES         site_structure.md v3 · CONTEXT_HANDOFF.md v4 (this) · brand_book.html
              · SETUP_GUIDE.md · starter-configs/
```

---

*End of handoff document. Update freely.*

---

## 16. Current Live Build State — 2026-06-28 Update

This section supersedes older planning notes where they conflict with the actual current code.

### Active project path

- Main Next.js app: `/Users/rongfeng/Downloads/Art/Portfolio/Portfolio`
- Local dev command: `pnpm dev`
- Local URL: `http://localhost:3000`
- Current dev server was started during this session and should be checked/restarted if a new chat cannot connect.

### Current visual direction

- Current style is Y2K dark collage / terminal / pop graphic, not the older calm interior plan.
- Core palette currently used in CSS variables:
  - `--lime: #CEDC00`
  - `--violet: #7D55C7`
  - `--pink: #F04E98`
  - `--orange: #FF8F1C`
  - `--purple: #963CBD`
  - plus Klein blue hard-coded in some effects as `#002FA7`
- Main CSS control document: `/Users/rongfeng/Downloads/Art/Portfolio/Portfolio/src/app/globals.css`
- Important: keep colors centralized in `:root` CSS variables when possible.

### Current homepage

- File: `/Users/rongfeng/Downloads/Art/Portfolio/Portfolio/src/app/page.tsx`
- Homepage uses:
  - `Dither` animated background
  - `Noise`
  - `SplashCursor`
  - `FaultyTerminal`, `ASCIIText`, `DecryptedText`, `CircularText` for the intro/loading overlay
  - `StaggeredMenu` on the right
  - self portrait from `assets/Self-portrait.png`
  - icon/banner from `assets/icon.png`
- Chinese homepage name is `馮熔` so both characters can render in `ZLabsPixel_12px_M_JP`.
- English title font is `Tiny5-Regular.ttf`.
- Chinese title font variable is `ZLabs Pixel Local`.
- Title decipher timing currently:
  - `heroDecipherStartMs = 3350`
  - `heroDecipherFrameMs = 260`
  - `heroDecipherFinalMs = 7200`
- Loading screen ASCII title is shifted right on large screens with `lg:translate-x-12 xl:translate-x-20`; only the ASCII name title should move, not the circular/decrypted loading text.
- Moving bar is at the bottom of the homepage hero.
- Self-portrait frame is square, image is object-contained, and color overlay has been moved toward the bottom. Do not reduce dot density unless user asks.

### Fonts currently in assets

- `assets/Tiny5-Regular.ttf`
- `assets/ZLabsPixel_12px_M_JP.ttf`
- `assets/Barrio-Regular.ttf`
- `assets/BlackOpsOne-Regular.ttf`
- `assets/Handjet-VariableFont_ELGR,ELSH,wght.ttf`
- `assets/Micro5Charted-Regular.ttf`
- `assets/chinese-handwriting-style.ttf`
- Generated subset font: `public/fonts/chinese-handwriting-name.woff2`

Important font finding:

- `ZLabsPixel_12px_M_JP.ttf` contains `馮` and `熔`.
- It does not contain simplified `冯`.
- Use `馮熔` if the user wants the name in ZLabs.

### Current routes

Implemented routes:

- `/`
- `/games`
- `/photography`
- `/photography/stage`
- `/photography/scenery`
- `/photography/humans`
- `/visual`
- `/digital`
- `/theatre`
- `/making`
- `/writing`

Removed/deleted:

- `/basement` should remain removed unless user asks to restore it.

### Shared section page system

- Data file: `/Users/rongfeng/Downloads/Art/Portfolio/Portfolio/src/lib/portfolioSections.ts`
- Shared renderer: `/Users/rongfeng/Downloads/Art/Portfolio/Portfolio/src/components/PortfolioSectionPage.tsx`
- Photography slideshow: `/Users/rongfeng/Downloads/Art/Portfolio/Portfolio/src/components/PhotographySlideshow.tsx`
- Photography category grid pages: `/Users/rongfeng/Downloads/Art/Portfolio/Portfolio/src/components/PhotographyContactSheetPage.tsx`

Subpage top bars:

- A small banner/mark is shown in the top bar using `assets/icon.png`.
- It should be a larger transparent logo, not a small boxed thumbnail.
- CSS is controlled by `.section-banner-mark` and `.section-banner-image` in `src/app/globals.css`.
- Latest requested size is very large: `.section-banner-mark` is currently `clamp(13rem, 20vw, 21rem)`.

Subpage typography:

- Section English titles use `Tiny5`.
- Section Chinese labels use `ZLabsPixel`.
- Subpage title headings should be solid with no chromatic overlay text shadow.
- The ZLabs font does not contain simplified `摄`, but it does contain traditional `攝`.
- Use `攝影` instead of `摄影` anywhere the title-page Chinese font should stay consistent.

### Asset serving

Current served media lives in:

- `public/portfolio-assets/photography`
- `public/portfolio-assets/visual`
- `public/portfolio-assets/digital`

Current counts:

- Photography: 74 individual photos, numbered `001.jpg` through `074.jpg`
- Visual: 3 images
- Digital: 19 assets, including 1 video

Important: The original `assets/photography/contact sheet 1-1.jpg` through `contact sheet 1-4.jpg` must NOT be shown in the site. They were previously copied into `public/portfolio-assets/photography/075.jpg` through `078.jpg`, causing the user to see a literal white contact sheet image. Those files were removed, and `photographyMedia` length was changed from 78 to 74.

### Photography page behavior

- `/photography` should keep the current full-screen auto-advancing slideshow.
- Do not alter the slideshow unless user specifically asks.
- The slideshow comes before the title.
- Photos should preserve real proportions in slideshow:
  - implemented with a plain `<img>` in `PhotographySlideshow.tsx`
  - CSS uses `width: auto`, `height: auto`, `max-width: 100%`, and `max-height: calc(100svh - 12rem)`
- The lower three cards on `/photography` should be:
  - `Stage` -> `/photography/stage`
  - `Scenery` -> `/photography/scenery`
  - `Humans` -> `/photography/humans`

### Photography category subpages

User clarified:

- They do NOT want a literal contact sheet image anywhere.
- They want photos aligned in a contact-sheet-style layout.
- The current category pages are temporary: all three use the full 74-photo pool until the user classifies photos.

Current implementation:

- `/photography/stage`, `/photography/scenery`, `/photography/humans` use `PhotographyContactSheetPage.tsx`.
- CSS classes still say `contact-sheet-*`, but this is only implementation naming. Visually it should be a dense dark grid of individual photo tiles, not a white scanned contact sheet.
- The per-image captions were reduced to small numeric overlays.
- The grid should not show the old white `contact sheet 1-*` images.

If the user still sees a white contact sheet image:

1. Confirm `public/portfolio-assets/photography/075.jpg` through `078.jpg` are deleted.
2. Confirm `photographyMedia` in `src/lib/portfolioSections.ts` uses `Array.from({ length: 74 }, ...)`.
3. Hard refresh browser or restart dev server/cache if needed.

### Current pending content state

- Photography, visual, and digital have assets loaded.
- Games, theatre, making, writing still mostly show pending placeholders because matching assets are not gathered in `Portfolio/assets`.
- The user may add more images shortly.

### Most recent user request handled in this update

User said: “so the subpages still haven't been fixed, I don't want the contact sheet image anywhere, I want the photos to align in contact sheet style, also the context is almost full so continue adding to the context handoff.md to prep for the next chat”

Actions taken:

- Removed `public/portfolio-assets/photography/075.jpg` through `078.jpg`.
- Updated `photographyMedia` length to 74.
- Changed category intro wording from “Temporary contact sheet” to “Temporary photo wall.”
- Changed category grid so it displays individual photos in a dense dark contact-sheet-style layout, not a literal white contact sheet image.
- Appended this section to `CONTEXT_HANDOFF.md`.

### Latest homepage scroll/layout update

User said: “all the pages are clipping, remove the gradient, for the very first loading animation before the title page, change my name to loading”

Actions taken:

- In `src/app/page.tsx`, changed the intro `ASCIIText` from `RONG FENG` to `LOADING`.
- Replaced the intro loading overlay gradient with a flat `bg-ink/72` layer.
- In `src/app/globals.css`, changed the continuous-scroll page panels to full-width/no side padding so the dither/gradient background no longer leaks around the page edges.
- Removed scale from the scroll reveal keyframes so panels rise in without the page box visually clipping.
- Kept the main title-page styling unchanged because the user previously asked to revert/preserve title-page changes.

### Homepage scroll title effect follow-up

User said: “it's still very blurry at the end, some titles have more colors than others, photography is clipping on to the chinese title”

Actions taken:

- In `src/components/kokonutui/swoosh-text.tsx`, removed the blurred glow shadow from SwooshText and made `shadowLayerCount` control only hard, solid shadow layers.
- In `src/app/page.tsx`, added `swooshColorSequence`, `swooshVisibleColorCount`, and `sectionColorHex` so the title color rhythm is centralized and consistent.
- Current scroll-room title rule: active section color plus exactly 2 solid offset colors. Duplicate shadow colors are filtered against the active section color.
- In `src/app/globals.css`, removed blur filters from `@keyframes scroll-page-rise` and removed hover filter rasterization from `.scroll-page-title-swoosh`.
- Added `.scroll-page-title.is-long` sizing so `PHOTOGRAPHY` is smaller and should not run into the Chinese title `摄影`.
- Set scroll-room Swoosh title text to no-wrap so titles do not stack vertically letter by letter.
- Local dev server was restarted because Turbopack was briefly serving stale CSS for `.scroll-page-title-swoosh`.
