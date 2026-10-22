// Sync folder-based galleries without changing the original assets.
import { createRequire } from 'node:module';
import { readdir, mkdir, stat, writeFile, copyFile } from 'node:fs/promises';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
const require = createRequire(import.meta.url);
const sharp = createRequire(require.resolve('next/package.json'))('sharp');
const groups = {
  digital: { videos: ['digital media/Video', 'Videos'], graphics: ['digital media/Graphics', 'Graphics'], concept: ['digital media/Concept', 'Concept'] },
  visual: { charcoal: ['visual art/Charcoal', 'Charcoal'], colors: ['visual art/Colored', 'Colors'], ideation: ['visual art/Ideation', 'Ideation'] },
  photography: { stage: ['photography/stage', 'Theatre'], scenery: ['photography/scenery', 'Landscape'], humans: ['photography/humans', 'Humans'] },
  theatre: { dirtywork: ['theatre/dirtywork', 'Dirty Work'], paperwork: ['theatre/paperwork', 'Paperwork'], photos: ['theatre/photos', 'Photos'] },
};
for (const [section, categories] of Object.entries(groups)) {
  const manifest = {};
  for (const [category, [folder, label]] of Object.entries(categories)) {
    const sourceDir = path.join('assets', folder);
    const destDir = `public/portfolio-assets/${section}/${category}`;
    await mkdir(destDir, { recursive: true });
    const files = (await readdir(sourceDir)).filter(f => /\.(jpe?g|png|webp|heic|mp4|mov)$/i.test(f)).sort((a,b) => a.localeCompare(b, 'en', { numeric: true }));
    manifest[category] = [];
    for (const [index, file] of files.entries()) {
      const source = path.join(sourceDir, file);
      const video = /\.(mp4|mov)$/i.test(file);
      const stem = path.parse(file).name;
      const dest = path.join(destDir, `${stem}.${video ? 'mp4' : 'jpg'}`);
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
  await writeFile(`src/lib/${section}Media.json`, JSON.stringify(manifest, null, 2) + '\n');
}
