# Site Structure — Rong Feng / 荣峰 v3

> **Status:** Locked. Anything below is now the spec for build week.
> **Brand anchor:** "Hack the door, walk in calm. Stay long enough to find the basement."
> **Last updated:** 2026-06-12 (v3 — added /writing page)

---

## 0. The big idea

The original anchor was *"polished by default, weird if you stay."* The new entry concept inverts it — chaos at the door, focus inside, depth as the reward:

1. **Door (intro takeover, first visit only).** Multi-window hacker overload — terminal windows cascade open across the viewport, each running its own animated content stream. Loud, dense, slightly overwhelming. Enacts the ADHD experience of arrival.
2. **Calm interior (landing scroll + section pages).** Once the windows collapse, the site is restrained, designer, slow. Type-driven, considered grid, real attention to craft. This is where the work lives.
3. **Reward depth (basement, chatbot, easter eggs).** The longer a visitor explores, the more they find. The basement is a collagey, personal, kid-work-included room. The chatbot wakes up. Sparks reveal hidden captions.

That arc — chaos → focus → reward — is the spine of the site.

---

## 1. Sitemap

```
/                                LANDING
                                 ▸ Long scroll about Rong → chooser at end
                                 ▸ INTRO TAKEOVER on first visit (localStorage)

/games                           GAMES INDEX (gallery of case-study cards)
/games/[slug]                    GAME CASE STUDY  (one full page per game)

/photography                     PHOTOGRAPHY  (series-grouped masonry + lightbox)
                                 ▸ Includes a "theatre / behind the scenes" series

/visual                          VISUAL ART  (Illustrator + traditional, irregular grid)
/digital                         DIGITAL / MEDIA ART  (hover-video gallery)

/theatre                         THEATRE / SPATIAL WORK
                                 ▸ Stage management, set + lighting concepts
                                 ▸ Recordings, Unity / Blender lighting practice

/making                          PHYSICAL / APPLIED DESIGN
                                 ▸ Interior, laser cutting, sewing, woodworking

/writing                         CREATIVE WRITING — index of pieces
/writing/[slug]                  WRITING READER — one full piece per page (longer works)

/basement                        SKETCHBOOK / PROCESS / KID WORK
                                 ▸ Collagey, interactive
                                 ▸ Also unlocked as the chaos easter egg at 90s

/cv                              RESUME — designed on-page + PDF download
/colophon                        CREDITS — fonts, libraries, references
/404                             DESIGNED 404 — personality moment
```

**Overlays** (not pages, but present cross-site):

- **Intro takeover** — first visit only, runs over the landing
- **Chatbot** — liquid-glass panel, bottom-right, reveals at ~60s session time
- **Custom cursor** — 3 states (default, link, art), always on
- **Chaos meter** — invisible system tracking time + discoveries
- **Language toggle** — top-right corner, persistent
- **Section nav** — top-right, expands to show all 8 disciplines + basement

Total: **12 page templates** + **5 overlay/persistent systems** + dynamic case-study + writing reader pages.

The chooser at the end of the landing scroll has **8 doors**, arranged in a 4-3-1 grid with basement as the off-rhythm last door:

```
[ GAMES ]    [ PHOTOGRAPHY ]   [ VISUAL ART ]   [ DIGITAL ART ]
[ THEATRE ]  [ MAKING ]        [ WRITING ]
                       [ BASEMENT ]
```

The asymmetric placement of BASEMENT telegraphs that it's a different kind of door (the reward-depth one).

---

## 2. Page-by-page detail

Each page below specifies: **purpose** · **content blocks** · **interactivity** · **personality channels active here** · **bilingual treatment** · **build day**.

---

### 2.1 INTRO TAKEOVER (overlay, not a URL)

**Purpose:** Make the first 6–10 seconds unforgettable. Enact the ADHD-arrival feeling, then resolve into calm.

**Trigger:** First visit only. Check `localStorage.getItem("rf_intro_seen")`. If null, run intro then set the flag. Skippable with `Esc`.

**Content (visual):** 5–7 absolutely-positioned terminal-style windows cascade onto the viewport in staggered timing (~150ms apart). Each window:

- Has a title bar like `[ root@feng:~/ ]` or `[ shader_compiler.exe ]` or `[ 荣峰.system ]`
- Is filled with its own animated content stream
- Sits at an irregular position and size, overlapping its neighbors

Window content options (mix and match — pick 5–7):

1. **Cascading hex / binary** — random `0x4F8A2E` style chunks rolling
2. **Faux command-line** — `> loading shader_pipeline.glsl ... OK\n> mounting /visual_archive ...`
3. **ASCII portrait** — pixel art forming character-by-character
4. **Bilingual character rain** — Chinese characters 荣 峰 字 系 统 dropping into place, intermixed with hex
5. **Faux GitHub commit log** — `feat(games): drift level 02 done · 2024-08-12` style entries
6. **System diagnostic readout** — `[ OK ] cursor service started · [ OK ] grain texture loaded · [ FAIL ] sleep — overriding`
7. **Glitchy quote** — your manifesto sentence appearing one mangled character at a time

**Resolution:** After ~7s, windows close in reverse order, each "crashing" off-screen. Last frame: a final terminal cursor blinks once, then everything fades to the calm landing hero.

**Skippable:** `Esc` at any moment → instant fade-out. Flag still set so they don't see it again.

**Reduced motion:** Replace animation with a single static composition of the windows (rendered once), held for 1.5s, then fade.

**Build day:** D11.

---

### 2.2 LANDING (`/`)

**Purpose:** The long-scroll introduction to who you are. Reads like a slow editorial feature. Ends with the visitor choosing where to go.

**Content blocks (top to bottom):**

1. **Hero** — your name in display type (RONG · FENG / 荣峰), one-line tagline, signature shader behind. After intro takeover, this is the resolved calm.
2. **Manifesto** — 2–3 short paragraphs of who you are, what you make, why. First-person, conversational. Bilingual — EN paragraph + 中文 paragraph alongside.
3. **Aesthetic strip** — a horizontal scrolling band of influences mixed with snippets of your own work. Items overlap in collage style. Hover reveals titles.
4. **Brief journey** — 4–5 dated milestones in a vertical timeline. Short, witty, honest.
5. **Process pillars** — 3 short blocks for how you work. Each pillar has an icon-sized animated badge.
6. **Recognition strip** — small horizontal row of awards as bordered tags (year + award name).
7. **THE CHOOSER** — 8 doors (see grid above). Each is a large clickable panel with a hover state that "wakes up" — the discipline's signature color, a hint of motion, a one-line preview.
8. **Footer** — CV link, colophon link, contact, social handles, copyright, tiny language toggle, link to /basement once 90s+ unlocked.

**Interactivity:**

- Signature GLSL shader behind hero, ripples toward cursor
- GSAP ScrollTrigger drives transitions between blocks
- Custom cursor in default state, becomes "VIEW" on chooser doors
- Lenis smooth scroll throughout
- Chooser doors: hover triggers a quiet sound effect (optional) + the door's signature color rises behind it

**Bilingual:** Heavy. Equal-weight EN + 中文 on manifesto, hero, and chooser.

**Build day:** D3.

---

### 2.3 GAMES INDEX (`/games`)

**Purpose:** Gallery of every game project, mixing playable web games and Unity videos.

**Content:**

- Header: title + 中文 + paragraph intro
- Grid of game cards (irregular sizes)
- Each card: thumbnail (filtered), title (EN + 中文), year, engine, role, badges (`▶ playable` or `🎬 watch`)
- Sticky filter strip: "all / playable / videos only / Unity / web / Python"

**Interactivity:**

- Card hover: card lifts, 2-second video loop preview starts
- Cursor becomes "VIEW" / "PLAY" / "WATCH"
- Click → `/games/[slug]`

**Build day:** D7.

---

### 2.4 GAME CASE STUDY (`/games/[slug]`)

**Purpose:** Real case study for game-design school applications. The most important page type for reviewers.

**Content (top to bottom):**

1. Hero — full-width image or video. Title + 中文. Compact metadata (year · engine · role · team · scope · status). Tagline.
2. The pitch — 2–3 paragraphs in your voice. Bilingual.
3. Embed — playable iframe (itch.io) or clean video player.
4. Process — 3–6 dated milestones with screenshots, sketches, mood boards.
5. Highlight — 1–2 things you talk about in depth.
6. Reflection — what you learned, what you'd do differently.
7. Credits — collaborators + awards (if any).
8. Related — 2–3 thumbnails of other games.

**Interactivity:** Sticky meta column on desktop, scroll-triggered reveals, inline video.

**Bilingual:** Headers bilingual. Body EN-primary with 中文 toggle.

**Build day:** D7.

---

### 2.5 PHOTOGRAPHY (`/photography`)

**Purpose:** Your largest archive. Curated as named series.

**Content:**

- Header
- 3–5 series, each with header + intro + masonry grid
- One named series is **"backstage" / "theatre"** — your production photography
- Click → series-scoped lightbox carousel
- Metadata in mono caption

**Interactivity:**

- Default photo filter (cyber duotone OR glitch+grain — TBD). Hover reveals true color.
- Lightbox: keyboard nav, swipe on mobile

**Build day:** D9.

---

### 2.6 VISUAL ART (`/visual`)

**Purpose:** Illustrator + traditional pieces.

**Content:**

- Header
- Irregular grid (intentional gaps). 2–3 columns
- Each card: thumbnail (filtered) + title (EN + 中文) + medium + year
- Click → fullscreen detail overlay

**Interactivity:**

- Card hover: filter lifts, chromatic aberration, riso shadow deepens
- Detail overlay: Esc closes, arrows navigate

**Build day:** D4.

---

### 2.7 DIGITAL / MEDIA ART (`/digital`)

**Purpose:** Motion graphics, shader experiments, video pieces.

**Content:**

- Header
- Grid with autoplay video previews on hover (muted, 4s loops)
- Each card: looping thumbnail + title + tool + year
- Click → detail with full video, longer caption

**Build day:** D5.

---

### 2.8 THEATRE (`/theatre`)

**Purpose:** Theatre / spatial / production work. Stage management, set + lighting concepts, recordings, Unity/Blender lighting practice.

**Content:**

- Header + paragraph intro (theatre work as spatial storytelling, the bridge to game design)
- Horizontal sub-nav: "PRODUCTIONS · CONCEPT DESIGN · LIGHTING PRACTICE"

**Section A: Productions** — real shows, one expandable card per show
**Section B: Concept design** — set + lighting boards, grid + detail overlay
**Section C: Lighting practice** — Unity/Blender lighting experiments, autoplay-loop on hover

**Interactivity:** Production cards expand inline (no nav away), sub-nav scrolls smoothly.

**Build day:** D8.

---

### 2.9 MAKING (`/making`)

**Purpose:** Physical / applied design — interior, laser cut, sewing, woodworking.

**Content:**

- Header + intro on physical making
- Filter chips: "ALL · INTERIOR · LASER CUT · SEWING · WOODWORKING"
- Grid of items with mixed sizes
- Each item: photo, title + 中文, year, materials, dimensions, 1-line story
- Click → detail overlay (larger photos, process, tools, longer story)

**Interactivity:** Filter chips smooth-filter, "TOUCH" cursor variant on hover.

**Build day:** D6.

---

### 2.10 WRITING (`/writing`) — NEW

**Purpose:** Your creative writing — fiction, poetry, game writing, essays, theatre scripts. The page that proves your voice exists in text, not just visuals. Strongest bilingual page on the site.

**Tone:** Literary journal meets zine. Type-heavy by necessity, but composed — wide leading, generous margins, justified columns where appropriate. Should feel like reading a small press magazine.

**Content:**

- Header: title + 中文 + paragraph intro on writing as one of your disciplines, how it ties to game design (worldbuilding, dialogue, narrative) and theatre (scripts, spatial language)
- Filter chips at top: "ALL · FICTION · POETRY · GAME WRITING · ESSAYS · SCRIPTS · 中文"
- Index of pieces. Each item:
  - **Title** (in display type)
  - **Subtitle / 中文 title** if bilingual
  - **Year**, **language** (EN / 中文 / bilingual), **type** (fiction / poetry / etc.), **read-time estimate** ("2 min read" or "long")
  - **First paragraph** as a preview (always visible — invites the reader in)
  - For SHORT pieces (under ~150 words, e.g. poems and flash): **inline expand** to show full text right in the index
  - For LONGER pieces: **link to `/writing/[slug]`** — its own reader page

**Filtering:**

- Click a chip to filter by category
- "中文" chip shows only Chinese-language pieces or bilingual ones
- Filter state persists in URL query string so a piece is shareable mid-filter

**Interactivity:**

- Type animates in slightly when scrolled into view (1-line stagger, not flashy)
- Hover on a card: card lifts, subtle riso shadow appears under the title
- Short pieces expand inline with a smooth height transition; "collapse" closes them
- Cursor becomes "READ" on writing cards (new cursor variant)

**Personality channels:**

- Heaviest voice page on the site (every word is yours)
- Bilingual is structural, not decorative — the toggle between EN and 中文 isn't a translation; it's a different register that you write into
- Awards in writing (if any, e.g., literary contests) live HERE inline with the relevant piece, not on /cv

**Bilingual treatment:**

- Each piece is tagged with its source language (EN / 中文 / bilingual)
- Bilingual pieces show side-by-side in a 2-column layout where the columns are paired but not translated 1:1
- The page chrome (header, filter chips, footer) respects the global language toggle
- Pieces themselves stay in their original language regardless of toggle — toggle changes the wrapping copy, not the work

**Build day:** D10 (alongside /cv — both text-heavy, share typographic system from D1).

---

### 2.11 WRITING READER (`/writing/[slug]`) — NEW

**Purpose:** Full reader page for a single longer piece. For prose, longer poems, essays, full scripts. Should feel like opening a single page of a book.

**Content:**

- Tight column. Max-width ~640px on desktop, 100% on mobile minus padding.
- Top metadata strip in mono: type · year · read-time · language · word count
- Title in display type
- Subtitle or 中文 title beneath
- Optional epigraph or dedication
- Body text in body type, generous line-height (1.7+), classic literary spacing
- Inline images / illustrations where the piece calls for them
- Optional small footer note: when/where written, what inspired it, what you'd change
- "Back to writing" link at top + bottom
- "Next piece →" link at bottom for navigation

**Interactivity:**

- A **reader mode toggle** in a corner — hides all global chrome (nav, footer, cursor reverts to native), leaves only the text. Brand colors stay but everything else is silent. Like Medium's reader mode but more curated.
- Progress bar at top showing scroll position through the piece
- Smooth scroll
- Selection styling matches brand (acid background on highlighted text)
- Print stylesheet for `Cmd+P` clean printing
- Easter egg: triple-clicking the title reveals a tiny director's commentary popup (your annotation about the piece)

**Personality channels:** Voice (the piece itself). Bilingual where the piece is bilingual.

**Bilingual:** Piece stays in its language. Wrapping UI respects toggle.

**Build day:** D10 (template), filled with content over week 2.

---

### 2.12 BASEMENT (`/basement`)

**Purpose:** The personality-heavy page. The reward floor. Process, sketches, kid drawings, scrapped projects, code experiments, found references, scrap.

**Tone:** Collagey, interactive, intentionally messy but composed.

**Content:**

- Header: "the basement / 地下室" with subtitle
- A "year shelf" toggle: filter items by decade/year
- Category chips: "kid me / sketches / failed games / shaders / collages / notebooks / drafts"
- Items in true collage layout
- Item types: childhood drawings, sketchbook pages, scrapped game prototypes, shader playgrounds, failed UI mockups, reference collages, tiny essays, drafts of writing pieces

**Interactivity:**

- Items can be picked up + dragged (v1 without drag, add later)
- Hover → annotation reveals
- "Kid mode" toggle flips palette for 10s
- Hidden easter eggs

**Bilingual:** Genuinely bilingual — some items only EN, some only 中文.

**Kid awards** (school art contests, science fairs) live here as mementos.

**Build day:** D12 — D13.

---

### 2.13 CV (`/cv`)

**Purpose:** Resume / CV. Required for university applications.

**Content:**

- Top: name + 中文 + tagline + contact + downloadable PDF button (EN + 中文 versions)
- Education
- Selected projects (links to case studies)
- Skills (Unity, shaders, Illustrator, photography, woodworking, writing, etc.)
- Software
- **Awards** — main home for non-writing awards
- Languages
- Print-ready alternate layout

**Interactivity:**

- EN ↔ 中文 toggle
- Print stylesheet
- One tiny easter egg in the margin

**Build day:** D10 (alongside /writing).

---

### 2.14 COLOPHON (`/colophon`)

**Purpose:** Designer-coded "behind the scenes" credits. Fonts, libraries, references, inspirations.

**Content:**

- Header: "colophon / 制作说明"
- Fonts used (links + license info)
- Libraries (Three.js, GSAP, Lenis, Framer Motion, Zustand, etc.) with thanks
- Specific references — artists, sites, games, writers — with credits and links
- "View source on GitHub" link
- Last updated date
- A tiny note in your voice — "if you stole something from this site, please at least credit. message me — 留个名"

**Build day:** D14.

---

### 2.15 404 (`/404`)

**Purpose:** Signature personality moment for any wrong-URL hit.

**Content:**

- Centered: "404 — you found a deleted level / 找不到这个关卡"
- Background: small ASCII glitch element echoing the intro takeover
- Three doors: `back home / chatbot / random work` (random work picks from games/photography/visual/digital/theatre/making/writing)
- One tiny line: "if you typed the URL right and still got here, sorry — message me at rongfeng1203@gmail.com"

**Interactivity:**

- Glitch ASCII gently animates
- Konami code triggers intro takeover in reverse

**Build day:** D14.

---

### 2.16 CHATBOT (overlay)

**Purpose:** Bilingual Q&A. Activates at 60s session time.

- Liquid-glass panel, bottom-right
- Claude Haiku, system-prompted with your CV + project descriptions + voice samples + selected writing excerpts (so it can speak in your register)
- Bilingual auto-detect
- Session-only memory, rate-limited
- A11y: Esc closes, full keyboard nav

**Build day:** D12.

---

## 3. Cross-page persistent elements

| Element | Behavior |
|---|---|
| **Top-left monogram** | Small `荣` mark. Click → home. Hover → riso-shadow rise. |
| **Top-right language toggle** | `EN / 中` pill. Persists in localStorage. |
| **Section nav** | Collapsed icon top-right. Hover slides out vertical list: Games · Photography · Visual · Digital · Theatre · Making · Writing · Basement · CV. |
| **Custom cursor** | 4 states: `+` default, halftone-circle link, "VIEW" art, "READ" writing. |
| **Chaos meter** | Invisible store tracking `timeOnSite` + `discoveries[]`. **Two thresholds:** 60s = sparks + chatbot, 90s + 3 discoveries = /basement link unlocks. |
| **Grain + scanlines** | CSS overlays from globals.css. |
| **Footer** | CV · Colophon · Contact · Social · © · tiny ASCII signature. |
| **Page transitions** | 280ms shader-bleed fade. |

---

## 4. Personality channel matrix

`●` light · `●●` present · `●●●` dominant

| Channel | / | /games | /games/[slug] | /photo | /visual | /digital | /theatre | /making | /writing | /writing/[slug] | /basement | /cv | /colophon | /404 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Hacker intro | ● first visit | | | | | | | | | | | | | |
| Handwritten voice | ●●● | ●● | ●●● | ●● | ●● | ●● | ●●● | ●●● | ●●● | ●●● | ●●● | ● | ●● | ●● |
| Bilingual register split | ●●● | ●● | ●●● | ●● | ●● | ●● | ●● | ●● | ●●● | ●●● | ●●● | ●●● | ●● | ●● |
| Custom cursor | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● |
| Chaos meter / unlocks | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ●●● | | | ●● |
| Chatbot | ● after 60s | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ●●● |
| Easter eggs | ● | ● | ● | ● | ● | ● | ● | ● | ● | ●● | ●●● | ● | ● | ●● |
| Collage layout | ●● strip | | | | | | | | | | ●●● | | | |
| Riso surfaces | ●● | ●●● | ●● | ●● | ●●● | ●● | ●● | ●● | ●● | ● | ●● | ● | ● | ● |
| Glass surfaces | ●● | | ● | | | | | | | ● reader mode | ● | | | ● |
| Signature shader | ●●● | ● | ● | ● | ● | ● | ● | ● | ● | | ● | | ● | ● |

---

## 5. Awards — placement recommendation

You said you have only a few awards. Don't make a dedicated awards page. Placements:

1. **Primary home: `/cv`** — every reviewer expects awards on the resume.
2. **Secondary: landing recognition strip** — small horizontal row of awards as bordered tags.
3. **Tertiary: per-case-study credits** — if a project won, mention inline.
4. **Writing awards (literary contests, journal acceptances) live inline with the piece on `/writing`** — different category, lives with the work.
5. **Kid awards (if any) live at `/basement`** — as mementos.

---

## 6. Bilingual treatment per page

| Page | EN | 中文 | Note |
|---|---|---|---|
| Landing | Primary | Equal-weight pair | Side-by-side in manifesto |
| Games index | Primary | Title pair | Cards bilingual |
| Game case study | Primary | Header pair + body toggle | Full 中文 translation behind toggle |
| Photography | Primary | Series header pair | Captions mixed |
| Visual | Primary | Title pair | Captions toggle |
| Digital | Primary | Title pair | Captions toggle |
| Theatre | Primary | Show titles in original lang | Productions in their language |
| Making | Primary | Title pair | Material lists in mono with 中文 |
| Writing index | Page chrome respects toggle | Page chrome respects toggle | Each piece keeps its original language regardless |
| Writing reader | Respects piece's own language | Respects piece's own language | Reader mode strips chrome — only the piece's language matters |
| Basement | Genuine mix | Genuine mix | Don't translate symmetrically |
| CV | Toggle | Toggle | Full translation, two complete PDFs |
| Colophon | Both | Both | Equal weight |
| 404 | Both | Both | Equal weight |
| Chatbot | Auto-detect per message | Auto-detect per message | Replies in matching language |

Language toggle behavior:
- Top-right pill, persistent across pages
- Defaults from `navigator.language`, saved in localStorage
- No page reload — swaps copy via React context
- Writing pieces themselves stay in their composed language regardless of toggle (the toggle is for site chrome, not for the work)
- Basement does NOT respect the toggle on items deliberately mono-lingual

---

## 7. Updated 14-day build map

| Day | Work |
|---|---|
| D0 ✓ | Environment setup, scaffold, Vercel deploy |
| D1 | Brand tokens in code, custom cursor (4 states), global layout shell, language toggle, footer |
| D2 | Signature GLSL shader on landing |
| D3 | Landing long-scroll content + 8-door chooser |
| D4 | `/visual` gallery + shared card component |
| D5 | `/digital` gallery (hover-video card variant) |
| D6 | `/making` gallery (reuses card, filter chips) |
| D7 | `/games` index + first `/games/[slug]` template |
| D8 | `/theatre` page |
| D9 | `/photography` (the big one — series + lightbox) |
| D10 | `/cv` designed page + `/writing` index + `/writing/[slug]` reader template + PDF generation |
| D11 | Hacker intro takeover (multi-window animation) |
| D12 | `/basement` v1 (collage layout) + chatbot module |
| D13 | `/basement` polish + a11y + reduced-motion pass |
| D14 | `/404` + `/colophon` + bug bash + final deploy |

**Why D10 fits both /cv AND /writing:** Both are text-heavy with no image/video/3D pipeline. /writing reuses the typographic system already built on D1 and the card component from D4. The `/writing/[slug]` reader template is mostly typography + scroll behavior, no new infrastructure. Realistic for one focused day.

**Cut-line order if behind:**

1. `/colophon` (drop entirely → put credits in footer)
2. `/404` (use default Next.js 404)
3. Chatbot (ship without — add post-deadline)
4. Hacker intro window complexity (reduce to 3 windows + simpler animations)
5. `/writing/[slug]` reader-mode toggle (ship with global chrome visible)
6. Basement easter eggs (ship with collage but no drag, no kid-mode)
7. Theatre lighting-practice section (keep productions + concept only)
8. `/making` filter chips (show all items)

**Never cut:** shader on landing, /photography, game case studies, /cv, /theatre productions, /making intro work, /writing index (at minimum, even if `/writing/[slug]` ships limited).

---

## 8. Implementation notes for pasted code (motion / scroll / cursor)

For animation/scroll/reactive-cursor code you paste from online:

1. **One component per pasted snippet.** File path: `src/components/[Name].tsx`. Don't dump code into existing files.
2. **Attribution comment at top of every file** with URL, original author, date, what you modified.
3. **Test in `/test` first.** Drop the component into the diagnostic page before integrating.
4. **Style on top, don't fork.** Override colors/sizes/timings via props or CSS variables.
5. **Cite on `/colophon`.** Every pasted snippet gets a credit line.
6. **License check.** MIT / public-domain / CC = fine. Anything restrictive or unclear, ask.

When you paste, drop the URL + the code and I'll do attribution + integration + colophon entry as one batch.

---

## 9. Still open — to lock before / during build week

| Item | Why it matters | Decision deadline |
|---|---|---|
| **Default photo filter** (cyber duotone A vs glitch+grain B) | Sets /photography mood | Before D9 |
| **Actual Chinese characters for your name** | Logo, favicon, OG card | Before D1 |
| **Social handles to display** | Footer + /cv | Before D10 |
| **Custom domain** | rongfeng.design vs default Vercel URL | Before D14 |
| **Awards list** | The actual awards to print on /cv + landing strip | Before D10 |
| **Photo series names** (3–5) | Sub-grouping in /photography | Before D9 |
| **Top 2–4 games for full case studies** | /games/[slug] focus | Before D7 |
| **Theatre productions list** | Show titles, year, venue, your role per show | Before D8 |
| **Making items list** | Pieces to feature per category | Before D6 |
| **Writing pieces inventory** | Title, year, type, language, length, body text per piece. Mark which are short (inline expand) vs long (own reader page) | Before D10 |
| **Writing awards** (literary contests, journal acceptances) | Live inline on /writing | Before D10 |
| **2 reference sites you love** | Aesthetic targets | Anytime helpful |
| **Hacker intro window content** | What each terminal window says | Before D11 |
| **Chatbot system prompt** | Bio, projects, voice samples + writing excerpts | Before D12 |

---

## 10. Summary card

```
PROJECT       Rong Feng / 荣峰 portfolio for university apps
ANCHOR        Hack the door, walk in calm. Stay long enough to find the basement.
STRUCTURE     Hybrid hub: long-scroll landing about you → 8-door chooser → discrete URLs
PAGES (12)    / · /games(/[slug]) · /photography · /visual · /digital · /theatre
              · /making · /writing(/[slug]) · /basement · /cv · /colophon · /404
OVERLAYS      Intro takeover (first visit) · Chatbot (60s) · Cursor (4 states)
              · Chaos meter · Language toggle · Section nav
PERSONALITY   Hacker intro · handwritten voice · bilingual split · basement collage
              · writing as voice · chaos meter · chatbot · easter eggs
              · custom cursor · signature shader (NO PET)
AWARDS        /cv (main) · landing strip · per-case-study · /writing inline · /basement (kid)
BUILD ORDER   D0✓ → D1 brand+cursor → D2 shader → D3 landing → D4 visual → D5 digital
              → D6 making → D7 games → D8 theatre → D9 photography
              → D10 cv + writing → D11 intro → D12 basement + bot
              → D13 basement polish + a11y → D14 404 + colophon + ship
NEXT          Lock the 14 items in §9 as you encounter them. Day 1 starts when you're ready.
```
