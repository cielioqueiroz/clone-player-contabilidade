# 0002 — Keep the headquarters story dependency-free and controllable

## Context

The Home page needs a short narrative connecting the selected office images to the project theme. The original implementation already provided explicit room/team controls and respected reduced-motion preferences.

## Decision

Use the existing client island to update the image stage while the story passes through the viewport on larger screens. Keep the two buttons as the keyboard and touch alternative, preserve the initial room view in the server-rendered markup, and remove scroll-driven updates when reduced motion is requested. CSS supplies the sticky composition and opacity transition; no animation package is added.

## Consequences

The interaction uses one small browser-only scroll listener with `requestAnimationFrame` throttling. The copy, address, image credit, and controls remain available without JavaScript. This is a short visual transition, not scroll hijacking or a pinned sequence. The behavior is covered by browser tests at desktop and mobile widths.

## Verification

`npm run check`, `npm test`, `npm run build`, `npm run test:e2e`, `npm run security:scan`, and `npm audit --audit-level=high` passed on 2026-09-08. Visual review used local Chromium screenshots at 1280 × 720 and 390 × 844.
