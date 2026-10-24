import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const inventoryPath = path.join(root, 'docs', 'captures.json');
const inventory = JSON.parse(await readFile(inventoryPath, 'utf8'));
if (inventory.captures.length !== 15) throw new Error(`Expected 15 reviewed captures, found ${inventory.captures.length}`);

for (const capture of inventory.captures) {
  const relative = capture.image;
  if (path.isAbsolute(relative) || relative.includes('..') || relative.includes('\\')) {
    throw new Error(`Unsafe image path: ${relative}`);
  }
  const imagePath = path.join(root, 'docs', relative);
  const bytes = await readFile(imagePath);
  const actual = createHash('sha256').update(bytes).digest('hex');
  if (actual !== capture.sha256) throw new Error(`SHA-256 mismatch: ${relative}`);
}

const html = await readFile(path.join(root, 'docs', 'index.html'), 'utf8');
const renderer = await readFile(path.join(root, 'docs', 'gallery.js'), 'utf8');
if (!html.includes('id="capture-grid"') || !html.includes('id="result-count"')) {
  throw new Error('Gallery markup is missing its inventory-rendering targets');
}
if (!renderer.includes("fetch(inventoryUrl)") || !renderer.includes('for (const item of visible)')) {
  throw new Error('Gallery renderer is not loading and rendering the checked inventory');
}
console.log(`PASS: 15 reviewed image hashes and 15 gallery records verified.`);
