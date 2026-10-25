# Automatic gallery sync

Add images, videos, or PDFs to these source folders. Nested folders inside them are scanned too:

- `assets/digital media/Video`, `Graphics`, `Concept`
- `assets/visual art/Charcoal`, `Colored`, `Ideation`
- `assets/photography/stage`, `scenery`, `humans`
- `assets/theatre/dirtywork`, `paperwork`, `LX`

Supported: JPG, JPEG, PNG, WebP, HEIC, MP4, MOV, PDF. PDFs become individual gallery slides. Design-source files such as AI, PSD, and Blender files must be exported to a supported format. New top-level categories, game projects, writing entries, and standalone featured slideshows still need page wiring; this sync does not invent new pages.

## Deployment workflow

`npm run build` automatically syncs first. `git commit` also syncs and stages generated gallery media and manifests through `.githooks/pre-commit`. Commit and push as usual; Vercel receives the generated content. For a content-only commit, `git commit --allow-empty -m "Update portfolio content"` invokes the hook and includes newly generated files.

The hook is installed in this checkout. Run `npm run setup:hooks` after cloning onto another computer. `npm run sync:content` can be used manually. `npm run build:sites` also syncs first.

GitHub/Vercel cannot read files that exist only on your computer. A dashboard redeploy alone cannot pick up local additions: first make a local commit and push. If source folders are absent on the build server, their committed manifests are preserved. Keep original media ignored to avoid uploading large originals twice.

PDF conversion requires Poppler (`pdftoppm`) on the local computer. HEIC and MOV conversion use macOS `sips` and `avconvert`. These are already available on the current computer. Sync failures stop the build/commit rather than silently publishing incomplete content.

Files removed from an existing source folder leave its gallery on the next sync. Previous generated media is retained to avoid breaking direct links. Missing source folders preserve the corresponding committed gallery. Avoid same-stem files such as `photo.png` and `photo.jpg` in one folder, since both generate `photo.jpg`.

Run `node --test tests/content-sync.test.mjs` to check nested additions, repeatability, and source-free cloud builds.
