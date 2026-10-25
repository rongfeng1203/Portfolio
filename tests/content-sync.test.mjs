import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, rm, stat } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const sharp = createRequire(require.resolve('next/package.json'))('sharp');
const script = path.resolve('scripts/sync-portfolio-assets.mjs');

test('nested additions sync, repeat runs are stable, and absent sources preserve cloud galleries', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'portfolio-sync-'));
  try {
    await mkdir(path.join(root, 'src/lib'), { recursive: true });
    const retained = { stage: [{ src: '/existing.jpg', title: 'Existing' }] };
    for (const name of ['digital', 'visual', 'photography', 'theatre']) {
      await writeFile(path.join(root, `src/lib/${name}Media.json`), JSON.stringify(name === 'photography' ? retained : {}));
    }
    const source = path.join(root, 'assets/digital media/Concept/New project');
    await mkdir(source, { recursive: true });
    await sharp({ create: { width: 20, height: 10, channels: 3, background: '#ff8800' } }).png().toFile(path.join(source, 'new.png'));
    const run = () => execFileSync(process.execPath, [script], { cwd: root, stdio: 'pipe' });
    run();
    const manifest = JSON.parse(await readFile(path.join(root, 'src/lib/digitalMedia.json'), 'utf8'));
    assert.equal(manifest.concept[0].src, '/portfolio-assets/digital/concept/New project/new.jpg');
    assert.equal(manifest.concept[0].width, 20);
    const output = path.join(root, 'public', manifest.concept[0].src);
    const before = (await stat(output)).mtimeMs;
    run();
    assert.equal((await stat(output)).mtimeMs, before);
    assert.deepEqual(JSON.parse(await readFile(path.join(root, 'src/lib/photographyMedia.json'), 'utf8')), retained);
    await rm(path.join(root, 'assets'), { recursive: true });
    run();
    assert.deepEqual(JSON.parse(await readFile(path.join(root, 'src/lib/digitalMedia.json'), 'utf8')), manifest);
  } finally { await rm(root, { recursive: true, force: true }); }
});
