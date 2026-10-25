// Sync folder-based galleries without changing the original assets.
import { createRequire } from 'node:module';
import { readdir, mkdir, stat, writeFile, copyFile, readFile, mkdtemp, rm } from 'node:fs/promises';
import path from 'node:path';
import { tmpdir } from 'node:os';
import { execFileSync } from 'node:child_process';
const require = createRequire(import.meta.url);
const sharp = createRequire(require.resolve('next/package.json'))('sharp');
const groups = {
  digital: { videos: ['digital media/Video', 'Videos'], graphics: ['digital media/Graphics', 'Graphics'], concept: ['digital media/Concept', 'Concept'] },
  visual: { charcoal: ['visual art/Charcoal', 'Charcoal'], colors: ['visual art/Colored', 'Colors'], ideation: ['visual art/Ideation', 'Ideation'] },
  photography: { stage: ['photography/stage', 'Theatre'], scenery: ['photography/scenery', 'Landscape'], humans: ['photography/humans', 'Humans'] },
  theatre: { dirtywork: ['theatre/dirtywork', 'Dirty Work'], paperwork: ['theatre/paperwork', 'Paperwork'], lx: ['theatre/LX', 'LX'] },
};
// Recurse within each existing gallery; folder names are preserved to avoid collisions.
async function listMedia(directory, prefix = '') {
  const entries = await readdir(path.join(directory, prefix), { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.name.startsWith('.') || entry.isSymbolicLink()) continue;
    const relative = path.join(prefix, entry.name);
    if (entry.isDirectory()) files.push(...await listMedia(directory, relative));
    else if (/\.(jpe?g|png|webp|heic|mp4|mov|pdf)$/i.test(entry.name)) files.push(relative);
  }
  return files.sort((a, b) => a.localeCompare(b, 'en', { numeric: true }));
}

for (const [section, categories] of Object.entries(groups)) {
  const manifestPath = `src/lib/${section}Media.json`;
  const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
  let synced = false;
  for (const [category, [folder, label]] of Object.entries(categories)) {
    const sourceDir = path.join('assets', folder);
    const destDir = `public/portfolio-assets/${section}/${category}`;
    // Original media is intentionally absent in GitHub/Vercel builds.
    // Preserve the already-committed manifest instead of replacing it with an empty gallery.
    if (!(await stat(sourceDir).catch(error => {
      if (error.code === 'ENOENT') return null;
      throw error;
    }))) {
      console.log(`${section}/${category}: using committed gallery (source folder absent)`);
      continue;
    }
    synced = true;
    await mkdir(destDir, { recursive: true });
    const files = await listMedia(sourceDir);
    const destinations = new Set();
    manifest[category] = [];
    for (const [index, file] of files.entries()) {
      const source = path.join(sourceDir, file);
      if (/\.pdf$/i.test(file)) {
        const slideDir = path.join(destDir, path.dirname(file), `${path.parse(file).name}-slides`);
        const sourceStat = await stat(source);
        const previous = await stat(path.join(slideDir, '.rendered')).catch(() => null);
        if (!previous || previous.mtimeMs < sourceStat.mtimeMs) {
          const temporary = await mkdtemp(path.join(tmpdir(), 'portfolio-pdf-'));
          try {
            execFileSync('pdftoppm', ['-scale-to', '1800', '-jpeg', '-jpegopt', 'quality=88', path.resolve(source), path.join(temporary, 'page')], { stdio: 'pipe' });
            await mkdir(slideDir, { recursive: true });
            const pages = (await readdir(temporary)).filter(name => /^page-\d+\.jpg$/.test(name));
            if (!pages.length) throw new Error(`No PDF pages rendered for ${source}`);
            // Remove only generated page images when a document becomes shorter.
            for (const old of await readdir(slideDir)) {
              if (/^page-\d+\.jpg$/.test(old)) await rm(path.join(slideDir, old));
            }
            for (const page of pages) await copyFile(path.join(temporary, page), path.join(slideDir, page));
            await writeFile(path.join(slideDir, '.rendered'), '');
          } finally { await rm(temporary, { recursive: true, force: true }); }
        }
        const pages = (await readdir(slideDir)).filter(name => /^page-\d+\.jpg$/.test(name)).sort((a, b) => a.localeCompare(b, 'en', { numeric: true }));
        for (const [pageIndex, page] of pages.entries()) {
          const dest = path.join(slideDir, page);
          const dimensions = await sharp(dest).metadata();
          manifest[category].push({ src: '/' + dest.replace(/^public\//, ''), type: 'image', title: `${path.parse(file).name} / ${pageIndex + 1}`, meta: `${section}_${category}_PDF`.toUpperCase(), width: dimensions.width, height: dimensions.height });
        }
        continue;
      }
      const video = /\.(mp4|mov)$/i.test(file);
      const stem = path.parse(file).name;
      const dest = path.join(destDir, path.dirname(file), `${stem}.${video ? 'mp4' : 'jpg'}`);
      if (destinations.has(dest.toLowerCase())) throw new Error(`Conflicting gallery filenames map to ${dest}. Rename one source file.`);
      destinations.add(dest.toLowerCase());
      await mkdir(path.dirname(dest), { recursive: true });
      const existing = await stat(dest).catch(() => null);
      const sourceStat = await stat(source);
      if (!existing || existing.mtimeMs < sourceStat.mtimeMs) {
        if (video) {
          if (/\.mp4$/i.test(file)) await copyFile(source, dest);
          else execFileSync('/usr/bin/avconvert', ['--source', path.resolve(source), '--output', path.resolve(dest), '--preset', 'Preset1280x720', '--replace']);
        } else if (/\.heic$/i.test(file)) {
          execFileSync('/usr/bin/sips', ['-s', 'format', 'jpeg', '-Z', '2400', source, '--out', dest], { stdio: 'pipe' });
        } else {
          await sharp(source).rotate().resize({ width: 2400, height: 2400, fit: 'inside', withoutEnlargement: true }).flatten({ background: '#ffffff' }).jpeg({ quality: 88 }).toFile(dest);
        }
      }
      const dimensions = video ? {} : await sharp(dest).metadata();
      manifest[category].push({ src: '/' + dest.replace(/^public\//, ''), type: video ? 'video' : 'image', title: `${label} ${String(index+1).padStart(2,'0')}`, meta: `${section}_${category}_${String(index+1).padStart(2,'0')}`.toUpperCase(), ...(!video ? { width: dimensions.width, height: dimensions.height } : {}) });
    }
    console.log(`${section}/${category}: ${files.length} assets`);
  }
  if (synced) await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
}
