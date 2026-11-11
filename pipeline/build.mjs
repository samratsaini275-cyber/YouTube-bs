// Build one episode end to end:  node pipeline/build.mjs <episode-file-name-without-.js>
//
//   1. parse narration out of episodes/<name>.js
//   2. synthesize it with VoiceStudio/OmniVoice (pipeline/tts.py)
//   3. lay out the timeline (scene + word timings) from the real audio durations
//   4. render 1080x1920 frames in headless Chromium and mux with the audio
//   5. write videos/<name>.mp4 and videos/<name>.md (title, description, sources)
//
// Env: TTS_PYTHON (python with torch+transformers), VOICESTUDIO_DIR (checkout of
// debpalash/voicestudio), WORK_DIR (scratch space, default ./.work)

import { spawn, execFileSync } from 'node:child_process';
import { createServer } from 'node:http';
import { readFileSync, writeFileSync, mkdirSync, existsSync, createReadStream } from 'node:fs';
import { join, dirname, extname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const name = process.argv[2];
if (!name) { console.error('usage: node pipeline/build.mjs <episode>'); process.exit(1); }
const FPS = 30, LEAD = 0.30, GAP_SENT = 0.20, GAP_SCENE = 0.34, TAIL = 1.1;
const WORK = join(process.env.WORK_DIR || join(ROOT, '.work'), name);
mkdirSync(WORK, { recursive: true });
mkdirSync(join(ROOT, 'videos'), { recursive: true });

const ep = (await import(pathToFileURL(join(ROOT, 'episodes', name + '.js')))).default;

// ---- 1. narration ---------------------------------------------------------
// "{1940|nineteen forty}" shows "1940" in captions and speaks "nineteen forty".
function parse(say) {
  const words = [];
  for (const m of say.matchAll(/\{([^|}]+)\|([^}]+)\}(\S*)|(\S+)/g)) {
    const cap = m[4] ?? m[1] + m[3], spoken = m[4] ?? m[2] + m[3];
    words.push({ text: cap, spoken, weight: Math.max(2, spoken.replace(/[^A-Za-z]/g, '').length) + (/[,;:—]$/.test(spoken) ? 2 : 0) });
  }
  const sentences = [[]];
  for (const w of words) {
    sentences.at(-1).push(w);
    if (/[.?!]["']?$/.test(w.spoken)) sentences.push([]);
  }
  return sentences.filter(s => s.length);
}
const scenes = ep.scenes.map(s => parse(s.say));
const flat = scenes.flat();
writeFileSync(join(WORK, 'narration.json'), JSON.stringify({ sentences: flat.map(s => s.map(w => w.spoken).join(' ')) }));

// ---- 2. speech ------------------------------------------------------------
if (!existsSync(join(WORK, 'audio', 'durations.json'))) {
  execFileSync(process.env.TTS_PYTHON || 'python3', [join(ROOT, 'pipeline', 'tts.py'), join(WORK, 'narration.json'), join(WORK, 'audio')], {
    stdio: 'inherit',
    env: { ...process.env, PYTHONPATH: process.env.VOICESTUDIO_DIR || '', PYTHONWARNINGS: 'ignore', TRANSFORMERS_VERBOSITY: 'error' },
  });
}
const durs = JSON.parse(readFileSync(join(WORK, 'audio', 'durations.json'), 'utf8'));
// transcribe the clips back: quality check + real word timing
if (!existsSync(join(WORK, 'audio', 'align.json'))) {
  execFileSync(process.env.TTS_PYTHON || 'python3', [join(ROOT, 'pipeline', 'align.py'), join(WORK, 'narration.json'), join(WORK, 'audio')], { stdio: 'inherit' });
}
const align = JSON.parse(readFileSync(join(WORK, 'audio', 'align.json'), 'utf8'));
const onCurve = (curve, f) => {
  for (let i = 1; i < curve.length; i++) if (f <= curve[i][0]) {
    const [f0, t0] = curve[i - 1], [f1, t1] = curve[i];
    return t0 + (t1 - t0) * (f1 > f0 ? (f - f0) / (f1 - f0) : 1);
  }
  return curve.at(-1)[1];
};

// ---- 3. timeline ----------------------------------------------------------
let t = LEAD, k = 0;
const tl = { scenes: [], chunks: [], clips: [] };
scenes.forEach((sents, si) => {
  const start = si === 0 ? 0 : t - GAP_SCENE / 2;
  sents.forEach((words, wi) => {
    const d = durs[k];
    tl.clips.push({ file: join(WORK, 'audio', `s${String(k).padStart(3, '0')}.wav`), at: t });
    const total = words.reduce((n, w) => n + w.weight, 0);
    let c = 0, timed = [];
    const curve = align[k].curve;
    for (const w of words) {
      const a = t + Math.min(d, onCurve(curve, c / total)); c += w.weight;
      timed.push({ text: w.text, start: a, end: t + Math.min(d, onCurve(curve, c / total)) });
    }
    timed[0].start = t; timed.at(-1).end = t + d;
    // caption chunks: up to 3 words / ~18 characters, break after punctuation
    let chunk = [];
    const flush = () => { if (chunk.length) tl.chunks.push({ start: chunk[0].start, end: chunk.at(-1).end, words: chunk }); chunk = []; };
    for (const w of timed) {
      const len = chunk.reduce((n, x) => n + x.text.length + 1, 0);
      if (chunk.length >= 3 || len + w.text.length > 18) flush();
      chunk.push(w);
      if (/[,.;:?!—]$/.test(w.text)) flush();
    }
    flush();
    t += d + (wi === sents.length - 1 ? GAP_SCENE : GAP_SENT);
    k++;
  });
  tl.scenes.push({ start, end: 0 });
});
tl.duration = t - GAP_SCENE + TAIL;
tl.scenes.forEach((s, i) => { s.end = i + 1 < tl.scenes.length ? tl.scenes[i + 1].start : tl.duration; });
// hold each caption chunk until the next one starts (within the same breath)
tl.chunks.forEach((c, i) => { const n = tl.chunks[i + 1]; c.end = n && n.start - c.end < 0.5 ? n.start : c.end + 0.25; });
writeFileSync(join(WORK, 'timeline.json'), JSON.stringify(tl));

// ---- 4a. audio mix: narration + a quiet synthesized drone bed ---------------
const D = tl.duration.toFixed(3);
const args = ['-y', '-loglevel', 'error'];
tl.clips.forEach(c => args.push('-i', c.file));
const n = tl.clips.length;
args.push('-f', 'lavfi', '-t', D, '-i',
  `sine=f=55:r=48000,volume=0.5[a];sine=f=82.4:r=48000,volume=0.35[b];sine=f=110.3:r=48000,volume=0.2[c];` +
  `anoisesrc=c=brown:r=48000:a=0.25,lowpass=f=260[n];[a][b][c][n]amix=inputs=4:normalize=0,tremolo=f=0.13:d=0.5,lowpass=f=420,` +
  `afade=t=in:d=1.2,afade=t=out:st=${(tl.duration - 1.4).toFixed(2)}:d=1.4,volume=0.12`);
const fc = tl.clips.map((c, i) => `[${i}:a]aresample=48000,adelay=${Math.round(c.at * 1000)}:all=1[v${i}]`).join(';') +
  `;${tl.clips.map((_, i) => `[v${i}]`).join('')}amix=inputs=${n}:normalize=0,acompressor=threshold=-18dB:ratio=2.5:attack=8:release=120,` +
  `highpass=f=70[voice];[voice][${n}:a]amix=inputs=2:normalize=0:duration=longest,loudnorm=I=-15:TP=-1.5:LRA=9,apad,atrim=0:${D}[out]`;
args.push('-filter_complex', fc, '-map', '[out]', '-ar', '48000', '-ac', '2', join(WORK, 'mix.wav'));
execFileSync('ffmpeg', args, { stdio: 'inherit' });

// ---- 4b. frames -----------------------------------------------------------
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json' };
const server = createServer((req, res) => {
  const p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  const file = p.startsWith('/__work/') ? join(WORK, p.slice(8)) : join(ROOT, p);
  if (!existsSync(file)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'content-type': mime[extname(file)] || 'application/octet-stream' });
  createReadStream(file).pipe(res);
}).listen(0);
const port = server.address().port;

const { chromium } = createRequire(import.meta.url)('playwright');
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
page.on('pageerror', e => { console.error('PAGE ERROR', e.message); process.exit(1); });
await page.goto(`http://127.0.0.1:${port}/pipeline/stage.html?ep=${name}&tl=/__work/timeline.json`);
await page.waitForFunction('window.ready === true');

const stills = process.argv.includes('--stills');
const outFile = join(ROOT, 'videos', name + '.mp4');
const total = Math.round(tl.duration * FPS);
if (stills) {
  // one frame from the middle and near the end of every scene, for review
  for (const [i, s] of tl.scenes.entries()) for (const [j, f] of [[0, .45], [1, .92]]) {
    await page.evaluate(t => window.renderFrame(t), s.start + (s.end - s.start) * f);
    await page.screenshot({ path: join(WORK, `still-${i}-${j}.jpg`), type: 'jpeg', quality: 80 });
  }
} else {
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-c:v', 'mjpeg', '-framerate', String(FPS), '-i', '-',
    '-i', join(WORK, 'mix.wav'), '-c:v', 'libx264', '-preset', 'medium', '-crf', '21', '-pix_fmt', 'yuv420p',
    '-color_primaries', 'bt709', '-color_trc', 'bt709', '-colorspace', 'bt709',
    '-c:a', 'aac', '-b:a', '160k', '-movflags', '+faststart', '-shortest', outFile], { stdio: ['pipe', 'inherit', 'inherit'] });
  for (let f = 0; f < total; f++) {
    await page.evaluate(t => window.renderFrame(t), f / FPS);
    const buf = await page.screenshot({ type: 'jpeg', quality: 93 });
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    if (f % 150 === 0) console.log(`frame ${f}/${total}`);
  }
  ff.stdin.end();
  await new Promise(r => ff.on('close', r));
}
await browser.close();
server.close();

// ---- 5. upload metadata ---------------------------------------------------
if (!stills) {
  const script = ep.scenes.map(s => s.say.replace(/\{([^|}]+)\|[^}]+\}/g, '$1')).join('\n\n');
  writeFileSync(join(ROOT, 'videos', name + '.md'), `# ${ep.title}

**File:** \`${name}.mp4\` · 1080x1920 · ${tl.duration.toFixed(1)} s

## Description

${ep.description}

Sources:
${ep.sources.map(s => `- ${s}`).join('\n')}

Narration: synthetic voice (VoiceStudio / OmniVoice). Visuals: original animated diagrams, schematic and not to scale.

${ep.tags.map(x => '#' + x).join(' ')}

## Script

${script}
`);
  console.log('wrote', outFile, tl.duration.toFixed(1) + 's');
}
