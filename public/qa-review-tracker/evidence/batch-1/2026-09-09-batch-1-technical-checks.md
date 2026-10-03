> Audit correction — 2026-09-09: legacy supporting-evidence bundle, not a completed batch of checklist rows. Historical completion totals are withdrawn. Consult row-audit/2026-09-09-audit.md and the tracker for authoritative statuses.

# Batch 1 technical checks

**Date:** 9 September 2026  
**Target:** Current repository source and `https://aiplaybook-ve.vercel.app/`  
**Scope:** Automated tests, production build, resource loading, browser console, security controls and invalid paths.

## Results summary

| Check | Result | Evidence |
| --- | --- | --- |
| Automated regression tests | Pass | `npm test` completed with 60 tests passed and 0 failed. |
| Production build | Pass with warning | `npm run build` completed successfully after transforming 2,066 modules. The generated JavaScript bundle was approximately 802 kB and triggered the existing chunk-size warning. |
| Security regression tests | Pass | All 4 checks passed: security headers, no inline executable script, Analytics URL redaction and trusted certificate printing. |
| Dependency audit | Pass | `npm audit --json` reported 0 known vulnerabilities across 165 dependencies. |
| Production security headers | Pass | Production returned CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, COOP, CORP and HSTS. |
| Bundled production resources | Pass | The root document, CSS, JavaScript, theme initialisation and all 25 same-origin image and video assets returned HTTP 200. |
| External runtime resources | Fail | Four declared Sage font files on `fonts.cdnfonts.com` returned HTTP 404. Google Fonts, Vercel Analytics and the four inventoried Unsplash origins returned HTTP 200. |
| Browser console smoke | Pass for tested scope | Initial load, reload, Contents, a representative Section 1 activity and the Completion Certificate produced 0 captured console logs, warnings or errors in the Codex in-app Chromium browser on Windows. |
| Invalid application path | Safe 404, custom page absent | A harmless random deep path returned Vercel's generic HTTP 404. This is safe handling but does not satisfy the checklist expectation for a custom application error page. |
| Sensitive path sample | Pass | `/.env` returned HTTP 404. |

## Commands and methods

```text
npm test
npm run build
node --test --test-isolation=none tests/security-controls.test.mjs
npm audit --json
```

Production resources were inventoried from the root HTML, deployed JavaScript and runtime source. Low-volume HTTP requests checked the root document, its CSS and JavaScript, same-origin image and video assets, declared external resources, a random invalid path and `/.env`.

The browser-console smoke used the production experience in the Codex in-app Chromium browser on Windows. It covered initial load, reload, Contents, a representative Section 1 activity and the Completion Certificate. No answers were changed.

## Findings requiring follow-up

### B1-01: Declared Sage font files return 404

The following declared font files did not load from CDNFonts:

- `SageDisplayHeadline-Bold.woff`
- `SageText-Regular.woff`
- `SageText-Medium.woff`
- `SageText-Bold.woff`

The browser therefore uses fallback fonts. The production experience needs a visual font check after the resource issue is resolved or an approved fallback approach is documented.

### B1-02: Custom 404 page is absent

Unknown deep paths return Vercel's generic 404 response. This is safe but does not meet the source checklist's explicit custom-error-page expectation unless Sage agrees that the hosting response is acceptable.

### B1-03: External image and CSP need targeted verification

Source retains four Unsplash URLs. Three appear overridden or excluded from rendering. One image on the Section 1 role page may still render externally while production CSP permits only same-origin and data images. This requires a targeted page check before it is recorded as a confirmed defect.

## Limitations

- The console check was representative rather than a complete all-page interaction crawl.
- The resource check verified declared and bundled resources but did not click through every application state.
- This batch did not perform Chrome, Edge, Firefox, Safari or physical-device compatibility testing.
- The generic 404 response is recorded as a checklist mismatch, not automatically treated as a release blocker.
