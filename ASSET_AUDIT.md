# Portfolio asset audit — October 18, 2026

Source: `assets/`. Originals remain in place; browser-ready media is in `public/portfolio-assets/`.

| Section | Collection | Assets |
| --- | --- | ---: |
| digital | videos | 1 |
| digital | graphics | 19 |
| digital | concept | 13 |
| visual | charcoal | 7 |
| visual | colors | 11 |
| visual | ideation | 1 |
| photography | stage | 36 |
| photography | scenery | 20 |
| photography | humans | 18 |
| theatre | dirtywork | 28 |
| theatre | paperwork | 27 |
| theatre | photos | 41 |

All seven main sections have three linked category blocks using the shared `SectionBuckets` component.

- Games: Play, Releases, Demos.
- Tech Design: Objects (fashion, tote bag, chocolate), Fabrication (Arduboy enclosure, lamp), Product (BSS Aura pitch).
- Writing: Chinese completed stories, English completed stories, working drafts. These reflect the available documents rather than empty essay/game-writing categories.

Run `node scripts/sync-portfolio-assets.mjs` after updating categorized media folders. It regenerates the four media manifests and web-sized images. HEIC and MOV conversion uses macOS tools; image processing uses the existing Next.js Sharp dependency.

Validation: production build and TypeScript passed; all 28 section/category routes returned HTTP 200, and all main sections contain exactly three category links. All 222 manifest entries resolve to local files. Narrow-screen visual checks covered category blocks, Concept, Videos, and Fabrication.

Changes are local; no deployment or Git push was performed.
