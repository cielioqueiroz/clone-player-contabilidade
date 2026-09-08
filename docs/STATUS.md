# Delivery status

Updated: 2026-09-08. Stage: initial concept published; progressive headquarters story and release validation are complete locally, pending deployment of the current commit.

## Implemented

- Project skill with source audit, architecture, design-system, security and delivery references.
- AGENTS.md with the complete project scope and free-only constraints.
- Next.js pages for home, five services, two specialties, about, contact, local scenario, privacy, accessibility and 404.
- CSS tokens, original geometric hero, responsive layout, reduced-motion behavior and visible demo identification.
- Two credited Instagram photographs in a local photo-story interaction, with a short scroll-driven transition, keyboard/touch controls and a reduced-motion fallback.
- User-confirmed Maps headquarters address; previous site addresses are not reused.
- Original favicon and 1200 × 630 Open Graph image endpoint.
- Quality workflow, scoped secret scanner, dependency updates and behavior tests.

## Verification

On 2026-09-08, lint, strict TypeScript, production build, four unit tests and fourteen Playwright tests passed. The Playwright run covered desktop and mobile Chromium, all 15 content routes, unknown routes, direct navigation/reload, five WhatsApp destinations, local input validation/reset, reduced motion, manual and scroll-driven photo controls, automated WCAG checks for home/Solutions/scenario, overflow, sharing assets and security headers. The dependency audit and publication-candidate credential scan returned no findings. These are executed checks, not a claim of exhaustive security or manual accessibility certification.

Commits `2748f4a` and `6419a0e` were pushed to main under the verified user identity. GitHub Quality passed for `6419a0e`. Vercel Git integration is connected and reported the production deployment READY at https://clone-player-contabilidade.vercel.app. GitHub About, topics and homepage are configured. Representative remote HTTP/browser smoke checks remain; READY is not a substitute for those checks.

The pending delivery increment includes a development-only CSP exception for framework tooling, an optional `PLAYWRIGHT_BASE_URL` for deployed-site checks, explicit stylesheet assertions, the dependency-free headquarters scroll story, a source-aware secret scanner and its regression test. The scanner now inspects Git publication candidates, so an ignored local `.env.local` no longer creates a false release failure while a forcibly staged environment file is rejected. The complete local browser suite passed after rebuilding and starting a fresh production server. Visual review at 1280 × 720 and 390 × 844 found no clipped controls or horizontal overflow in the Home opening view. Commit, push, wait for Vercel READY, then repeat remote HTTP and browser smoke checks. Review dependency-update PRs individually; the successful main workflow does not imply every automated dependency upgrade is compatible.

Tooling limitation: ESLint 10.10.0 was tested but the React plugin bundled with Next's configuration failed on the removed `context.getFilename` API. ESLint is temporarily pinned to 9.39.5, which passes the checks and has zero known audit findings but is marked unsupported upstream. Upgrade the compatible plugin/configuration before removing this pin. Do not suppress the rules or use force upgrades to conceal incompatibility.

## Remaining design milestones

- Broader manual assistive-technology and device coverage beyond the initial automated/browser checks.
- Measured Core Web Vitals and visual refinement based on actual devices.
- Full-resolution facade asset from the company, app showcase and approved institutional claims.
- Optional 3D only after its performance value is demonstrated.

No database, auth, real lead collection, uploads, tax-calculation engine or analytics is implemented or required for this release.
