# Batch 6 — actual checklist rows

Date: 9 September 2026, 23:42–23:46 BST. Target: existing Vercel deployment.

| Row | Result | Actual check |
|---|---|---|
| manual-07 | Failed | Low-volume HTTP requests reconfirmed four Sage font 404s; paths/timestamps in http-checks.json. |
| manual-17 | Failed | Google PageSpeed's expanded console audit reports font resource errors. Capture: pagespeed-console.txt. In-app console log API returned no errors on its sampled journey, so the earlier clean-console claim was incomplete. |
| manual-19 | Failed | Invalid route returned generic Vercel NOT_FOUND, not custom application 404. |
| manual-35 | Passed | Same invalid route returned a safe HTTP 404. This row checks invalid URLs, separately from custom error-page presentation. |
| manual-37 | Passed | Google PageSpeed web UI completed mobile and desktop runs, with improvement findings retained. API attempt returned 429; web fallback succeeded. |
| manual-38 | Passed | Lighthouse Accessibility ran within PageSpeed and returned scores/findings on both profiles. |

## Tool evidence and limitations

Google PageSpeed report captured 23:42 BST using Lighthouse 13.4.1 and HeadlessChromium 151.0.7922.71. Mobile: Moto G Power emulation, slow 4G. Desktop: emulated desktop, custom throttling. No CrUX field data available.

| Metric | Mobile | Desktop |
|---|---:|---:|
| Performance | 70 | 90 |
| Accessibility | 100 | 100 |
| Best practices | 96 | 96 |
| SEO | 91 | 91 |
| First contentful paint | 2.7s | 0.6s |
| Largest contentful paint | 11.3s | 2.0s |
| Total blocking time | 110ms | 20ms |
| Cumulative layout shift | 0 | 0 |

Findings: image-delivery savings 1,432KiB mobile / 1,398KiB desktop; render-blocking savings 790ms / 160ms; unused JavaScript 126KiB; missing explicit image dimensions; four/one long main-thread tasks. Mobile document request latency audit itself errored; do not treat it as a valid measurement. Font 404 console errors and absent meta description are recorded, not fixed.

The source PDF asks to **run** these two tools to identify improvements. These two row passes do not assert an approved performance target or full accessibility compliance. Ten Lighthouse manual checks remain, along with all-page keyboard and screen-reader testing. The live role page's rendered DOM contained no external photo at inspection; the earlier suspected external-image CSP defect was not reproduced.

Artifacts: pagespeed-mobile.txt/.png, pagespeed-desktop.txt/.png, pagespeed-console.txt, pagespeed-url.txt, http-checks.json, production-headers.json and production-role.txt/.png.

Batch 6 complete
- 6 of 67 checked
- 3 completed with evidence
- 3 failed
- remaining manual/Sage confirmations: certificate save, required-field rules, release scope/sign-off and browser/device coverage
Now moving to Batch 7
