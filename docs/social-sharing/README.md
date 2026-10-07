# Sharing the AI Playbook

Share https://aiplaybook-ve.vercel.app/ to use the site's link preview.
The metadata is in the initial HTML, so link crawlers do not need JavaScript.

- Automatic link preview: `/social/ai-playbook-preview-v1.png` (1200 × 630).
- Square artwork for a manual post: `/social/ai-playbook-square-v1.png` (1080 × 1080).

Both reuse the existing Sage logo and playbook cover. Edit `card.html`, then run
`node scripts/generate-social-images.mjs` with Playwright and Chrome available
(or set `PLAYWRIGHT_CHANNEL` to another installed Playwright browser channel).
In Codex, set `NODE_PATH` to the bundled Node packages returned by
`load_workspace_dependencies` before running the script. The generated PNGs are
committed, so production builds do not require Playwright.

After changing artwork, use a new versioned filename and update the Open Graph
and Twitter image URLs in `index.html` so cached images can be replaced.
Sharing apps control their own preview layout and cache refresh; an existing
conversation may continue to display an older preview.
