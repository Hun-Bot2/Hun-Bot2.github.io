#!/usr/bin/env node
/**
 * Optimize documentation images by producing web-ready WebP copies.
 * - Scans: docs images/ folders and static/img directories
 * - Outputs: <name>-web.webp beside the original
 * - Resizes large images to a sensible max width to keep bundle size small
 *
 * Run from /study:
 *   node scripts/optimize-images.mjs
 *
 * Requires: sharp (install once with `npm install sharp`)
 */

import {promises as fs} from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const studyRoot = path.resolve(__dirname, '..');

const TARGET_DIRS = [
  path.join(studyRoot, 'docs'),
  path.join(studyRoot, 'static', 'img'),
];

const ALLOWED_EXTS = new Set(['.png', '.jpg', '.jpeg']);
const SKIP_DIRS = new Set(['node_modules', 'build', '.docusaurus', '.git', '.cache']);
const MAX_WIDTH = 1600;
const WEBP_QUALITY = 82;

async function loadSharp() {
  try {
    const mod = await import('sharp');
    return mod.default ?? mod;
  } catch (err) {
    console.error('sharp is not installed. Add it with `npm install sharp` (run inside /study).');
    process.exitCode = 1;
    return null;
  }
}

async function* walk(dir) {
  const entries = await fs.readdir(dir, {withFileTypes: true});
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      yield* walk(path.join(dir, entry.name));
    } else if (entry.isFile()) {
      yield path.join(dir, entry.name);
    }
  }
}

function shouldProcess(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!ALLOWED_EXTS.has(ext)) return false;
  const base = path.basename(filePath, ext);
  return !base.endsWith('-web');
}

function outputPath(inputPath) {
  const ext = path.extname(inputPath);
  const base = path.basename(inputPath, ext);
  const dir = path.dirname(inputPath);
  return path.join(dir, `${base}-web.webp`);
}

async function optimize(sharp, inputFile) {
  const rel = path.relative(studyRoot, inputFile);
  const outFile = outputPath(inputFile);
  const inputStat = await fs.stat(inputFile);
  try {
    const outStat = await fs.stat(outFile);
    if (outStat.mtimeMs >= inputStat.mtimeMs) {
      return; // already optimized
    }
  } catch {
    // no output yet
  }

  const image = sharp(inputFile);
  const meta = await image.metadata();
  let pipeline = image;

  if (meta.width && meta.width > MAX_WIDTH) {
    pipeline = pipeline.resize({width: MAX_WIDTH, withoutEnlargement: true});
  }

  await pipeline.webp({quality: WEBP_QUALITY}).toFile(outFile);
  const outStat = await fs.stat(outFile);

  console.log(
    `[OK] ${rel} -> ${path.relative(studyRoot, outFile)} (${meta.width || '?'}px` +
      `${meta.width && meta.width > MAX_WIDTH ? `->${Math.min(meta.width, MAX_WIDTH)}px` : ''}, ` +
      `${Math.round(outStat.size / 1024)} KB)`
  );
}

async function main() {
  const sharp = await loadSharp();
  if (!sharp) return;

  const tasks = [];
  for (const dir of TARGET_DIRS) {
    for await (const filePath of walk(dir)) {
      if (shouldProcess(filePath)) {
        tasks.push(optimize(sharp, filePath));
      }
    }
  }

  if (!tasks.length) {
    console.log('No images found to optimize (looking for png/jpg/jpeg).');
    return;
  }

  await Promise.all(tasks);
  console.log('Done. Use the *-web.webp files in markdown where possible.');
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
