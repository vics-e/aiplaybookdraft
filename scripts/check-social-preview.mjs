import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';

const [base = 'https://aiplaybook-ve.vercel.app/', output] = process.argv.slice(2);
const response = await fetch(base, { headers: { 'User-Agent': 'facebookexternalhit/1.1' } });
assert.equal(response.status, 200, 'Crawler can retrieve HTML');
const html = await response.text();
const meta = Object.fromEntries([...html.matchAll(/<meta\s+(?:property|name)="([^"]+)"\s+content="([^"]*)"[^>]*>/g)].map(match => [match[1], match[2]]));
const report = { url: base, status: response.status, metadata: meta, images: [] };
const failure = ['og:image', 'og:url', 'twitter:card'].filter(key => !meta[key]);
if (failure.length) {
  report.result = 'FAILED';
  report.missing = failure;
  if (output) await writeFile(output, JSON.stringify(report, null, 2) + '\n');
  throw new Error(`Missing social metadata: ${failure.join(', ')}`);
}
assert.equal(meta['og:url'], 'https://aiplaybook-ve.vercel.app/');
assert.equal(meta['og:image'], 'https://aiplaybook-ve.vercel.app/social/ai-playbook-preview-v2.png');
assert.equal(meta['og:image:width'], '1200');
assert.equal(meta['og:image:height'], '630');
assert.equal(meta['og:image:type'], 'image/png');
assert.ok(meta['og:image:alt']);
assert.equal(meta['twitter:card'], 'summary_large_image');
assert.equal(meta['twitter:image'], meta['og:image']);
assert.match(html, /<link rel="canonical" href="https:\/\/aiplaybook-ve\.vercel\.app\/"/);
for (const [name, width, height] of [
  ['ai-playbook-preview-v2.png', 1200, 630],
  ['ai-playbook-square-v2.png', 1080, 1080],
]) {
  const path = `social/${name}`;
  const asset = await fetch(new URL(path, base), { headers: { 'User-Agent': 'facebookexternalhit/1.1' } });
  assert.equal(asset.status, 200, `${name} returns 200`);
  assert.match(asset.headers.get('content-type') || '', /image\/png/);
  const bytes = Buffer.from(await asset.arrayBuffer());
  assert.equal(bytes.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
  assert.equal(bytes.readUInt32BE(16), width);
  assert.equal(bytes.readUInt32BE(20), height);
  const source = await readFile(new URL(`../public/${path}`, import.meta.url));
  const hash = createHash('sha256').update(bytes).digest('hex');
  assert.equal(hash, createHash('sha256').update(source).digest('hex'), 'Served image matches generated artwork');
  report.images.push({ url: new URL(path, base).href, status: asset.status, type: asset.headers.get('content-type'), width, height, bytes: bytes.length, sha256: hash });
}
report.result = 'PASSED';
if (output) await writeFile(output, JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report, null, 2));
