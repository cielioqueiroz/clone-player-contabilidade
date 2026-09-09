# Delivery status

Updated: 2026-09-08. Stage: company content and internal-page motion published; production validation complete.

## Company identity, content coverage and internal motion

The approved home design is extended with shared GSAP scroll scenes across internal pages and additional home chapters. Official source PNG logos replace the demo wordmark in navigation, footer, the illustrative app panel and Open Graph. The implementation adds three advantages, three operational benefits, the app/store/portal journey, three linked company testimonials, institutional description and principles, six source-gallery photos, nine source-attributed seal blocks, qualified company figures, expanded service subjects and company contact/corporate details. `docs/SOURCE-PARITY.md` records coverage, verified destinations and deliberate differences. No new dependency, video mirror, lead collection or tracking is introduced.

Executed local checks: lint and strict TypeScript, production build, four unit tests, the credential scanner, zero dependency-audit findings and twenty-six desktop/mobile Playwright tests passed (final browser run: 2.1 minutes). The suite now checks internal-page scroll transforms, pause/resume after navigation, reduced-motion cleanup, official logo loading, all institutional block counts and loaded gallery imagery, plus strict viewport width at 360/390/768/1440 px. Automated accessibility covers Home, Solutions, scenario, About and Contact. Review of twenty-two desktop/mobile section captures found no overflow or runtime errors. An initially detected mobile viewport expansion from the intro ornament was fixed by clipping only its decorative container; the pause button remains within the actual touch viewport. Review artifacts are ignored under `work/expanded/`. Field performance and manual assistive-technology certification are not claimed.

Commit `b2932cd` was pushed to main and Vercel deployment `dpl_Ejcpbg7AfijRxLBtssyN3swDkiqT` reported READY at https://clone-player-contabilidade.vercel.app. All twenty-six tests then passed against the public domain in 1.0 minute, including desktop/mobile animation controls, source imagery, direct routes, no-JavaScript navigation, accessibility, responsive sizing and sharing assets. GitHub Quality run `34296599802` completed successfully. Read-only HEAD checks also confirmed HTTP 200 for all three source-hosted videos and the resolved Google Play destination. The prior `79b1df9` release remains a rollback reference.

## Prior release

## Cinematic redesign

The home now uses an original metallic elliptical portal, a sticky scroll scene, opposing text movement, geometric specialty illustrations with parallax, a headquarters image reveal and an oversized closing composition. GSAP 3.15.0 and ScrollTrigger coordinate motion on native scrolling. Users can pause it, reduced-motion preferences disable choreography, and server-rendered content and navigation remain usable without JavaScript. The header changes into a rounded floating frame on scroll. Archivo and Manrope are bundled locally as variable fonts throughout the website; decorative arrows and numbered section markers are removed. Shared typography, buttons, hover/focus treatment and internal-page styling were updated alongside the home. See decision 0004 for the implementation rationale and sources.

Local acceptance on 2026-09-08: lint, strict TypeScript, production build, four unit tests and twenty desktop/mobile Playwright tests passed. The browser suite checks routes and refresh, scroll transforms, pause/resume, reduced motion, a JavaScript-disabled journey, automated accessibility, photographs, the local scenario, security headers and sharing assets. The credential scanner and dependency audit returned no findings. Manual screenshot review and a scroll recording cover the new composition; no horizontal overflow was detected at 360, 390, 768 or 1440 px across six home sections.

The production build references 601,037 bytes of uncompressed home JavaScript, including a home-exclusive chunk of 135,453 bytes (51,809 bytes when locally gzip-compressed). The two local font files total 114,940 bytes. These are artifact sizes, not measured network transfers. A single local Chromium pass against the production server, with no CPU/network throttling, observed LCP 448–704 ms and CLS 0 across the four widths. INP and field Core Web Vitals have not been measured; these local results do not establish real-device performance. Review artifacts and the motion recording remain in ignored `work/cinematic/`.

The cinematic redesign commit `8f398cf` was pushed to main under the verified user identity. Vercel deployment `dpl_6pjAYMhFR9232WQdNFZvCk4pEeiW` reported READY and assigned https://clone-player-contabilidade.vercel.app. All twenty Playwright tests then passed against that public domain in 36.3 seconds. GitHub Quality run `34257478749` completed successfully, including a clean dependency install, lint/types, unit tests, credential scan, audit, production build and browser suite on Linux. The prior `94f1497` release remains a rollback reference.

## Previous published increment

## Implemented

- Project skill with source audit, architecture, design-system, security and delivery references.
- AGENTS.md with the complete project scope and free-only constraints.
- Next.js pages for home, five services, two specialties, about, contact, local scenario, privacy, accessibility and 404.
- CSS tokens, local font stacks, original geometric hero, responsive layout, reduced-motion behavior and visible demo identification.
- Interaction-led visual refinement: a compact translucent scroll header, pointer-responsive hero art, progressive scroll entrances, rounded card surfaces, responsive hover/focus feedback, and removed numbered/slash labels across the UI and sharing artwork.
- Two credited Instagram photographs in a local photo-story interaction, with a short scroll-driven transition, keyboard/touch controls and a reduced-motion fallback.
- User-confirmed Maps headquarters address; previous site addresses are not reused.
- Original favicon and 1200 × 630 Open Graph image endpoint.
- Quality workflow, scoped secret scanner, dependency updates and behavior tests.

## Verification

On 2026-09-08, lint, strict TypeScript, production build, four unit tests and sixteen Playwright tests passed. The Playwright run covered desktop and mobile Chromium, all 15 content routes, unknown routes, direct navigation/reload, five WhatsApp destinations, local input validation/reset, reduced motion, loaded headquarters photos, manual and scroll-driven photo controls, header scroll state, pointer-responsive hero art, automated WCAG checks for home/Solutions/scenario, overflow, sharing assets and security headers. The dependency audit and publication-candidate credential scan returned no findings. These are executed checks, not a claim of exhaustive security or manual accessibility certification.

Commits `2748f4a`, `6419a0e` and `e637c19` were pushed to main under the verified user identity. Vercel Git integration reported the `e637c19` production deployment READY at https://clone-player-contabilidade.vercel.app. The public Playwright run then passed all fourteen desktop/mobile tests in 24 seconds, including direct route requests, navigation and reload, scenario interaction, scroll narrative, accessibility checks, sharing assets, noindex and security headers. GitHub About, topics and homepage are configured.

The completed increment adds a development-only CSP exception for framework tooling, an optional `PLAYWRIGHT_BASE_URL` for deployed-site checks, explicit stylesheet assertions, the dependency-free headquarters scroll story, a source-aware secret scanner and its regression test. The scanner now inspects Git publication candidates, so an ignored local `.env.local` no longer creates a false release failure while a forcibly staged environment file is rejected. Visual review at 1280 × 720 and 390 × 844 found no clipped controls or horizontal overflow in the Home opening view. The visual refinement commit `3313780` was deployed to production as READY at https://clone-player-contabilidade.vercel.app. The public Playwright run then passed all sixteen desktop/mobile tests, including direct routes, reloads, header scroll state, pointer-responsive hero art, loaded headquarters photos, accessibility checks, overflow, sharing assets, noindex and security headers. Review dependency-update PRs individually; successful checks on main do not imply every automated dependency upgrade is compatible.

Tooling limitation: ESLint 10.10.0 was tested but the React plugin bundled with Next's configuration failed on the removed `context.getFilename` API. ESLint is temporarily pinned to 9.39.5, which passes the checks and has zero known audit findings but is marked unsupported upstream. Upgrade the compatible plugin/configuration before removing this pin. Do not suppress the rules or use force upgrades to conceal incompatibility.

## Remaining design milestones

- Broader manual assistive-technology and device coverage beyond the initial automated/browser checks.
- Measured Core Web Vitals and visual refinement based on actual devices.
- Full-resolution facade asset from the company, app showcase and approved institutional claims.
- Optional 3D only after its performance value is demonstrated.

No database, auth, real lead collection, uploads, tax-calculation engine or analytics is implemented or required for this release.
