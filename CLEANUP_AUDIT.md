# Conservative cleanup — October 18, 2026

All removed source files are unreachable from the App Router entry points through static imports, dynamic imports, and require calls. CSS was removed only when owned exclusively by a removed component. Shared global styles and rendering dependencies are retained.

Backup: `../cleanup-backups/unused-ui-fonts-2026-10-18.zip` (includes pre-cleanup package manifest, lockfile, and global CSS).

## Removed files

- `src/components/Shuffle.jsx`
- `src/components/Shuffle.css`
- `src/components/SplashCursor.jsx`
- `src/components/Ribbons.jsx`
- `src/components/Ribbons.css`
- `src/components/StickerPeel.jsx`
- `src/components/StickerPeel.css`
- `src/components/StaggeredMenu.jsx`
- `src/components/StaggeredMenu.css`
- `src/components/Lanyard.jsx`
- `src/components/Lanyard.css`
- `src/components/PixelCard.jsx`
- `src/components/PixelCard.css`
- `src/components/ui/ascii-glitch-ripple.tsx`
- `src/components/ui/button.tsx`
- `src/components/kokonutui/swoosh-text.tsx`
- `src/lib/fonts.ts`
- `assets/Barrio-Regular.ttf`
- `public/fonts/chinese-handwriting-style.ttf`

The original Chinese font in `assets/` is retained as the source for regenerating the active WOFF2 subset. Original art, PDF sources, game build files, and alternate hosting configuration are retained.

Also removed five unreferenced Next.js starter SVGs: `public/file.svg`, `public/globe.svg`, `public/next.svg`, `public/vercel.svg`, `public/window.svg`.

Removed five unused direct dependencies: `@gsap/react`, `class-variance-authority`, `lenis`, `radix-ui`, and `zustand`. The lockfile update pruned 76 packages; libraries still required transitively are retained by pnpm.

## Deployment verification

Production: https://portfolio-rongfeng1203.vercel.app

Deployment: `dpl_95Uev23ki8iCC8ZmJbzT3jeAna35`. Local and Vercel builds passed. All 29 main/category/home pages and 23 representative media/font URLs passed live HTTP checks. All seven main pages retain three linked category cards.
