# Batch 7 — layout and compatibility rows

Date: 9 September 2026. Rows: manual-01–05, 28–29; release-15–26 (19 rows).

## Method

315 actual default page renders: all 63 pages at 320x900, 767x900, 768x900, 1080x900 and 1920x1080 CSS viewport sizes, in Codex in-app Chromium. The browser viewport API did not change the measured viewport (remained 1280x720). Consequently a loopback-only fixed-size iframe fixture was used. The iframe's HTML clientWidth/scrollWidth and content headings were measured directly. Where vertical scrollbars appear, clientWidth is 15px smaller than the requested viewport. The iframe layout is real browser CSS layout, but not browser/device certification.

The fixture serves **downloaded deployed assets**, not the different current local build. Deployment index-DMyzCq9x.js / index-CPVA6P7o.css differs from local index-BIJShCbD.js / index-BOtbYXAw.css. Live HTTP/CSP checks were separate; the local fixture does not reproduce production CSP/analytics behaviour.

`matrix.json` retains per-page widths, document heights, headings, overflow candidates and 1920px input inventories. `page-*-320.txt/.png` capture DOM and initial viewport screenshots. These 63 screenshots do **not** cover every scrolled, expanded or filled state and are not called a full visual review. Counts are render observations, not checklist rows.

## Confirmed defects

- **QA-01, page 43, 320px:** pricing worksheet pairs very narrow time fields. Labels are cramped and guidance controls protrude from the time panel. `pricing-320-overlap.png` was captured after focusing the time field. Fails manual-02, manual-28 and release-26.
- **QA-02, page 60, 1080px:** glossary heading and definition card text overflow narrow assigned columns. Screenshot `glossary-1080-overflow.png`; measured heading 245px client / 285px content; body text 40px client / 82px content. Fails manual-03, manual-04 and release-24.

No root horizontal overflow in the 315 observed renders. That alone does not establish usability. Overflow in intentionally scrolling strips (pages 18, 22, 24, 25, 26, 31, 34, 38, 50, 53), screen-reader-only text and transformed decorations is not automatically a defect. manual-01 remains Partial pending all interactive states. Font 404s do not by themselves prove inconsistent typography; manual-05 needs Sage's font/fallback baseline.

## Browser/device limits

Installed Chrome 150.0.7871.125 and Edge 152.0.4191.66 were detected, but CUA createBrowserTab returned unavailable for each. No separate UI run is claimed. No Firefox installed, as instructed. Safari/macOS, Galaxy Tab A9+, both iPads, specified iPhones and Samsung S25 are unavailable. Latest-version certification and physical portrait/landscape remain manual QA. Remote PageSpeed Chromium is not a Windows 11 Chrome test.

## Dispositions

Failed: manual-02, 03, 04, 28; release-24, 26. Partial: manual-01; release-23, 25. Needs Sage or QA: manual-05, 29; release-15–22. No rows passed from measurements alone.

Batch 7 complete
- 12 of 67 checked
- 3 completed with evidence
- 9 failed
- remaining manual/Sage confirmations: full interactive visual states, approved fonts, all specified external browsers/devices, certificate save and release governance
Now moving to Batch 8
