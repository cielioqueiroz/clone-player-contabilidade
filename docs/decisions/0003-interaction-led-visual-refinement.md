# 0003 — Use restrained, dependency-free motion for the visual refinement

## Context

The user requested a less generic visual direction, responsive interaction, a header effect, and the removal of numbered slash labels. The user-provided `@altrabr` profile and one Reel were sampled as a visual reference. The observed material used dark, high-contrast editorial compositions and emphasized interaction and motion. It was not treated as a source of reusable footage, code, or implementation details.

## Decision

Keep the existing warm graphite and amber palette, then refine it with local font stacks, rounded surfaces, responsive hover and focus states, a compact translucent header after scroll, and a small pointer-responsive hero composition. Use CSS view-timeline motion where supported and preserve static readable content everywhere else. Remove numbered and slash-based section labels from rendered UI and sharing artwork.

The hero parallax is a small client island that reacts only to mouse pointers. Header state is limited to the scroll threshold. No animation package, external font, tracking, scroll hijacking, copied social media asset, or third-party script is added.

## Consequences

The interface retains server-rendered copy and links, works without JavaScript, and disables animation and transitions for reduced-motion preferences. Hover affordances are paired with keyboard focus states. The view-timeline effect is progressive: browsers without it render the final layout without hidden or low-contrast content.

## Verification

`npm run check`, `npm test`, `npm run build`, and `npm run test:e2e` passed on 2026-09-08. The Playwright suite covers desktop and mobile Chromium, header scroll state, hero pointer response, reduced motion, image loading, direct routes, accessibility checks, and viewport overflow. Visual review used local Chromium captures at 1280 × 720 and 390 × 844.