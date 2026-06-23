# Asset Performance Review

This review covers project assets and likely load-performance risks.

The biggest issue is image size. Two PNG files are extremely large and are bundled into the production build. These should be compressed, resized, or converted before a V1 release.

## 1. Very Large Image Files

Current local assets in `src/assets/`:

| File | Size | Risk |
|---|---:|---|
| `src/assets/401a764ba6882b8cc4eaee28ab8349b4feeb6652.png` | 43,917,223 bytes, about 43.9 MB | Critical |
| `src/assets/c4dcd24a1a26454f51b76968c451f7d30c463cc8.png` | 38,262,013 bytes, about 38.3 MB | Critical |
| `src/assets/7d10c58b13d65e57e14197ae9cce3c931f5cc649.png` | 1,414,605 bytes, about 1.4 MB | Medium |
| `src/assets/85dce1db2c171f8d15f5e966d3ca5f37099a8078.png` | 114,327 bytes, about 114 KB | Low |

The production `dist/assets/` folder currently contains these same large files after build:

| Built file | Size |
|---|---:|
| `dist/assets/401a764ba6882b8cc4eaee28ab8349b4feeb6652-D9vsv8Tk.png` | 43.9 MB |
| `dist/assets/c4dcd24a1a26454f51b76968c451f7d30c463cc8-D9xHoU6T.png` | 38.3 MB |
| `dist/assets/7d10c58b13d65e57e14197ae9cce3c931f5cc649-CGSaNzco.png` | 1.4 MB |
| `dist/assets/85dce1db2c171f8d15f5e966d3ca5f37099a8078-GEpxqMcU.png` | 114 KB |

The two largest images together add about **82 MB** of image payload. That is too large for a normal web page.

## 2. Where The Images Are Used

### Sage Logo

File:

- `src/assets/85dce1db2c171f8d15f5e966d3ca5f37099a8078.png`

Used in:

- `src/app/SageAIPlaybook.tsx`
- `src/app/components/PageContent.tsx`

Imports:

```tsx
import sageLogo from 'figma:asset/85dce1db2c171f8d15f5e966d3ca5f37099a8078.png';
```

Rendered in:

- Sidebar header logo.
- Cover page bottom-right logo.

Current size is acceptable.

### Cover Background

File:

- `src/assets/7d10c58b13d65e57e14197ae9cce3c931f5cc649.png`

Used in:

- `src/app/components/PageContent.tsx`

Import:

```tsx
import coverBackground from 'figma:asset/7d10c58b13d65e57e14197ae9cce3c931f5cc649.png';
```

Rendered in the cover page:

```tsx
<img
  src={coverBackground}
  alt=""
  className="absolute w-full h-full object-cover"
/>
```

Current size is about 1.4 MB. This is not terrible, but it can probably still be improved.

### AI-Assisted Firms Image

File:

- `src/assets/c4dcd24a1a26454f51b76968c451f7d30c463cc8.png`

Used in:

- `src/app/components/PageContent.tsx`

Import:

```tsx
import aiAssistedFirmsImage from 'figma:asset/c4dcd24a1a26454f51b76968c451f7d30c463cc8.png';
```

Rendered when:

```tsx
page.id === 's1-intro'
```

Current displayed class:

```tsx
'w-full h-96 object-cover object-center'
```

This is a critical performance risk. The displayed size is constrained visually, but the browser still downloads the full 38.3 MB PNG.

### AI Dividend Image

File:

- `src/assets/401a764ba6882b8cc4eaee28ab8349b4feeb6652.png`

Used in:

- `src/app/components/PageContent.tsx`

Import:

```tsx
import aiDividendImage from 'figma:asset/401a764ba6882b8cc4eaee28ab8349b4feeb6652.png';
```

Rendered when:

```tsx
page.id === 's5-dividend'
```

Current displayed class:

```tsx
'w-full h-80 object-cover object-center'
```

This is the largest asset in the project and is a critical performance risk. The browser downloads about 43.9 MB for an image that is displayed at a much smaller visual size.

## 3. Compress, Resize, Replace, Or Convert?

### `401a764ba6882b8cc4eaee28ab8349b4feeb6652.png`

Recommendation: **replace or convert to WebP/AVIF immediately**.

Best option for V1:

- Resize to the maximum displayed width needed by the app.
- Convert to WebP.
- Target under 300-500 KB if possible.

This image appears inside a content card at `h-80`, not as a full-resolution downloadable image. There is no reason for a 43.9 MB PNG in the initial web bundle.

### `c4dcd24a1a26454f51b76968c451f7d30c463cc8.png`

Recommendation: **replace or convert to WebP/AVIF immediately**.

Best option for V1:

- Resize to the maximum displayed width needed by the app.
- Convert to WebP.
- Target under 300-700 KB depending on detail.

This image appears at `h-96`, so it should be optimized for web display, not source-quality export.

### `7d10c58b13d65e57e14197ae9cce3c931f5cc649.png`

Recommendation: **compress or convert to WebP**.

This is the cover background and may need higher visual quality, but 1.4 MB can likely be reduced.

Suggested target:

- 300-900 KB depending on quality and dimensions.

### `85dce1db2c171f8d15f5e966d3ca5f37099a8078.png`

Recommendation: **keep for now**.

At about 114 KB, this is acceptable for V1. If optimizing later, consider SVG if the logo source is vector, or WebP/PNG optimization if not.

## 4. Potentially Unused Assets

All four local files in `src/assets/` appear to be referenced by live code:

| Asset | Referenced? | Used live? |
|---|---|---|
| `85dce1db2c171f8d15f5e966d3ca5f37099a8078.png` | Yes | Yes |
| `7d10c58b13d65e57e14197ae9cce3c931f5cc649.png` | Yes | Yes |
| `c4dcd24a1a26454f51b76968c451f7d30c463cc8.png` | Yes | Yes |
| `401a764ba6882b8cc4eaee28ab8349b4feeb6652.png` | Yes | Yes |

Based on current references, none of these assets should be removed without replacing their usage first.

There may be unused image URLs in `playbookData.ts` because some pages provide remote `image` URLs that are overridden by local imported images for specific page IDs:

```tsx
src={page.id === 's1-intro' ? aiAssistedFirmsImage : page.id === 's5-dividend' ? aiDividendImage : page.image}
```

For `s1-intro` and `s5-dividend`, the `page.image` URL in `playbookData.ts` is not the image actually displayed. Those remote URLs are harmless for bundle size, but they can confuse future editors.

## 5. Bundle Size And Loading Concerns

Current production build outputs include:

| Output | Size |
|---|---:|
| JavaScript bundle | about 471 KB |
| CSS bundle | about 130 KB |
| Largest PNG | about 43.9 MB |
| Second-largest PNG | about 38.3 MB |

The JavaScript and CSS bundles are not the main problem. The image payload is the issue.

Performance concerns:

- Initial page load can be slow on normal networks.
- Mobile users may have a poor experience or large data usage.
- The browser has to download and decode very large PNGs.
- Large images can delay rendering or cause memory pressure.
- If both large images are discovered early by the browser, total transfer can become extremely high.
- The Vite build copies the images directly, so production keeps the same large sizes.

The app imports large images statically:

```tsx
import aiAssistedFirmsImage from 'figma:asset/...png';
import aiDividendImage from 'figma:asset/...png';
```

Static imports are fine, but the imported files must be web-optimized.

## 6. Simple Fix Plan For Improving Load Speed

### Step 1: Replace The Two Huge PNGs

Replace:

- `src/assets/c4dcd24a1a26454f51b76968c451f7d30c463cc8.png`
- `src/assets/401a764ba6882b8cc4eaee28ab8349b4feeb6652.png`

with resized WebP versions.

Suggested approach:

- Export each image around 1600px wide maximum, or lower if visual quality remains acceptable.
- Convert to WebP.
- Keep quality around 75-85.
- Aim for each file to be under 500 KB if possible.

Then update imports in `PageContent.tsx` to point to the new `.webp` files.

### Step 2: Optimize The Cover Background

Replace or convert:

- `src/assets/7d10c58b13d65e57e14197ae9cce3c931f5cc649.png`

Suggested approach:

- Export around 1920px wide if used full-bleed.
- Convert to WebP.
- Aim for under 1 MB, ideally under 500-700 KB.

### Step 3: Keep The Logo For Now

Keep:

- `src/assets/85dce1db2c171f8d15f5e966d3ca5f37099a8078.png`

Optional later:

- Replace with SVG if available.
- Optimize PNG if no vector source exists.

### Step 4: Add Lazy Loading Where Appropriate

In `ImageWithFallback.tsx` or individual image usages, consider:

```tsx
loading="lazy"
```

Do this for non-cover images. Avoid lazy-loading the main above-the-fold cover image unless testing confirms it does not harm perceived load.

### Step 5: Review Remote Images In `playbookData.ts`

Some `page.image` URLs exist in the data file. Confirm whether they are still needed.

If a local optimized image replaces a remote image, remove the unused URL from the data entry or add a comment explaining why it remains.

### Step 6: Rebuild And Check `dist/assets`

After replacing images, run:

```bash
npm run build
```

Then inspect:

```text
dist/assets/
```

Expected result:

- No image file should be tens of megabytes.
- Largest image should ideally be under 1 MB.
- Total image payload should be dramatically smaller.

## 7. Safe For V1 Vs Can Wait

### Safe And Recommended For V1

These are low-risk and high-impact:

1. Replace the two huge PNGs with optimized WebP files.
2. Compress or convert the cover background.
3. Keep the same visual images, just optimized for web.
4. Rebuild and confirm `dist/assets` no longer contains 38 MB or 44 MB files.

These changes should not alter app behaviour. They only change asset format/size and import paths.

### Also Safe For V1, But Requires Light Testing

1. Add `loading="lazy"` to below-the-fold images.
2. Add width/height or stable aspect-ratio styles to image containers.
3. Remove unused remote `page.image` URLs where local images are always used.

These are still safe, but should be tested in the browser to confirm no visual regressions.

### Can Wait Until After V1

1. Full responsive image setup using `srcset` and multiple image sizes.
2. AVIF versions in addition to WebP.
3. CDN hosting for assets.
4. Automated image optimization pipeline.
5. Replacing the logo PNG with SVG.
6. Code-splitting or route-level lazy loading.
7. Deeper JavaScript bundle analysis.

The JavaScript bundle is not the urgent issue. The urgent issue is image payload.

## Final Recommendation

Before any public or stakeholder-facing V1, optimize the two huge content images.

The current build ships roughly 82 MB across just two PNG files. That is the primary load-speed risk in this project.

The safest V1 improvement is to keep the same images visually, but replace them with resized WebP versions and update the imports in `PageContent.tsx`.
