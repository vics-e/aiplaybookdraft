import { createRequire } from 'node:module';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

// Use a local Playwright installation or NODE_PATH pointing to the Codex runtime.
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const root = new URL('../', import.meta.url);
const output = new URL('public/social/', root);
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, channel: process.env.PLAYWRIGHT_CHANNEL || 'chrome' });
try {
  const page = await browser.newPage({ deviceScaleFactor: 1 });
  await page.goto(new URL('docs/social-sharing/card.html', root).href);
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].map(image => image.decode()));
  });
  for (const [layout, width, height, name] of [
    ['wide', 1200, 630, 'ai-playbook-preview-v1.png'],
    ['square', 1080, 1080, 'ai-playbook-square-v1.png'],
  ]) {
    await page.setViewportSize({ width, height });
    await page.evaluate(layout => { document.body.dataset.layout = layout; }, layout);
    await page.locator('.card').screenshot({ path: fileURLToPath(new URL(name, output)) });
    console.log(`Generated ${name}: ${width} × ${height}`);
  }
} finally {
  await browser.close();
}
