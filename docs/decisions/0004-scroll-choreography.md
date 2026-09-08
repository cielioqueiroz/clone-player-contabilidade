# 0004 — Build a scroll-led editorial experience

The user rejected the earlier cosmetic refinement and explicitly requested a substantial motion redesign using suitable libraries. This supersedes the earlier preference for subtle CSS-only enhancements and numbered editorial cards.

Use GSAP 3.15.0 and its ScrollTrigger plugin for a coordinated hero transformation, layered graphic parallax, opposing typographic movement, and image framing. GSAP supports browser DOM/SVG animation without a React peer dependency; the installed React 19 / Next 16 application remains server rendered. Its standard no-charge license permits this personal website (https://gsap.com/standard-license/). Motion was considered, but a single GSAP timeline is a better fit for the coordinated elements. Do not add both libraries or a scroll replacement.

Add Archivo Variable 5.3.0 for display and Manrope Variable 5.3.0 for prose via Fontsource, both OFL-1.1. Serve Latin WOFF2 subsets locally and retain package license notices. No paid font or external font request is needed.

Only core GSAP and ScrollTrigger are imported. Expect roughly 45–55 KB gzip of additional animation code, to be checked against the actual production chunks. Font weights use two variable files. Native scroll remains intact, effects revert through matchMedia cleanup, no animation loops run indefinitely, and reduced motion renders the same content without positional effects. All copy and actions render without hydration. CSS/SVG artwork replaces the old triangle, avoiding a WebGL dependency.

Research: https://gsap.com/docs/v3/Plugins/ScrollTrigger/, https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/, https://motion.dev/docs/react-use-scroll, https://fontsource.org/fonts/archivo, https://fontsource.org/fonts/manrope/install. The previously sampled Instagram showcase informs the ambition and composition, not a claim of exact implementation technology.

Validation and measured bundle impact are recorded in `docs/STATUS.md`, including the home chunk size and the limits of the local performance observations.
