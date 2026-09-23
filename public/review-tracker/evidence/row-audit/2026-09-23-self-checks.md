# Self-service QA checks — 23 September 2026

The checks that can be completed directly against the standalone playbook were rerun after deployment.

- `manual-01`: all 63 default pages were measured at 320, 767, 768, 1080 and 1920px without root horizontal overflow; the repaired populated pricing view also passed at exactly 320px.
- `manual-21`: the current certificate Download action opened the browser print/save flow. The maintained controller tests cover the written document, print invocation, window close and blocked-popup handling.
- `manual-28`, `release-23`, `release-25`, `release-26`: portrait and landscape viewport simulations covered below 767px, 767/768px, 1080px and 1920px. The previously failing pricing and glossary layouts were rechecked after repair.
- `manual-32`: varied valid, invalid, long, accented and HTML-like values were exercised across pricing, certificate, glossary and workflow outputs.
- `manual-33`: a controlled `QuotaExceededError` against the current deployment showed “Your latest change could not be saved in this browser” and did not claim that the change was saved.
- `release-14`: the maintained suite contains the additional validation, persistence, interaction and certificate cases. All 61 tests passed.

These results also close `release-13`, because all nine recorded application defects are deployed and validated. Named browser and physical-device certification remains separate under `manual-29` and `release-15` to `release-22`.
