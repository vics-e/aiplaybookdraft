# Social sharing preview — 7 October 2026

The production HTML originally had no `og:image`, `og:url` or Twitter card.
The pre-change crawler response is in `2026-10-07-FAILED-social-preview.json`.

Added an absolute, versioned PNG image URL, image type, dimensions and alt text,
canonical URL, site name, locale and Twitter large-image metadata to `index.html`.
The wide and square artwork reuse the existing logo and cover background.

Verified locally against the production build with a `facebookexternalhit/1.1`
user agent using `scripts/check-social-preview.mjs`. Both images return HTTP 200
as `image/png`, have the declared dimensions, and their SHA-256 hashes match the
generated files. Proof: `2026-10-07-FIXED-social-preview.json`.

- `npm test`: all 61 tests passed.
- `npm run build`: passed; the existing large bundle advisory remains.
- Wide artwork: `public/social/ai-playbook-preview-v1.png`, 1200 × 630.
- Square artwork: `public/social/ai-playbook-square-v1.png`, 1080 × 1080.
- Both rendered images inspected visually for readable, unclipped text.

Actual WhatsApp, iMessage, LinkedIn and device-specific preview layouts and cache
refresh: Needs Sage or QA (owner: Victor / QA). Crawler and image verification
does not constitute proof of each app's display. Existing tracker history remains
unchanged; this report supplies focused evidence for the new sharing metadata.
