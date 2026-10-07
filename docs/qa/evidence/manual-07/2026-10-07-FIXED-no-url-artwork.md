# Sharing artwork without a deployment address

The owner requested removal of the printed website address from both formats.
The source artwork removes the footer, and the current Open Graph and Twitter
metadata use the version 2 wide PNG. Both regenerated formats were inspected:
no printed URL, no clipped text. Version 1 remains available for existing links.

Focused crawler verification against the production build passed; proof:
`2026-10-07-FIXED-social-preview-no-url.json` (dimensions, PNG type and SHA-256).
Required pre-push checks: `npm test` passed (61 tests), `npm run build` passed.
