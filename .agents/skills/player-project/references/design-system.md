# Design system and motion contract

## Direction

An editorial accounting/technology concept: warm charcoal backgrounds, ivory typography, precise amber accents, geometric light, and clear information hierarchy. The original company's identity is a reference, not a licensed asset library. Use a typographic demo wordmark and original abstract illustration.

## Tokens

| Token | Initial value / intent |
| --- | --- |
| background | `#111310` |
| surface | `#1B1E18` |
| surface raised | `#25291F` |
| text | `#F3F0E7` |
| muted text | `#B8BBAF` |
| accent | `#F7B54A` with dark text |
| border | `#3C4135` |
| spacing | 4, 8, 12, 16, 24, 32, 48, 64, 96, 128 px |
| content width | max 1240 px; 24 px minimum side gutter on desktop |
| radius | 10 px controls, 20 px surfaces; restrained use of pills |
| duration | 140–220 ms controls, 400–650 ms entrances |

Tokens live in CSS and must agree with this reference. Prefer self-hosted open-license typography when added; initial local system typography requires no remote font request. Keep body text at least 16 px, comfortable line length around 60–70 characters, and fluid headline sizing with clamp. Accent is not the only indicator of state. Verify contrast in the actual rendered combinations.

## Composition

Home hero: asymmetric 7/5 composition with oversized headline, deliberate line breaks, two meaningful links, small section index, and a geometric amber visual. Small screens use a single-column layout; the visual is decorative and does not push the headline beyond the opening viewport. Maintain a visible demonstration label without turning it into the main headline.

Solutions: numbered editorial cards; concise problem statement, readable deliverables, internal “Explore” action, clearly identified original-company WhatsApp link when present. Grid collapses 2 → 1 columns. Never nest links or buttons inside a full-card anchor.

About: prose-led composition with capability blocks rather than fabricated team photos/metrics. Specialties: intentional route cards, not hover-only disclosure. Local simulator: fieldset/legend for choices, validation, result announcement, reset control and explicit non-diagnostic language.

## Component and interaction states

Header has a visible active route, accessible mobile navigation, and keyboard reachability. Prefer native details/summary for the initial mobile menu. CTA: default, hover, focus-visible, active, disabled only with reason. Forms use persistent labels, field errors, and non-color feedback. External links indicate destination and open with `rel="noopener noreferrer"` if new-tab behavior is used. Carousels, when added, need controls, pause, and non-drag alternatives.

## Motion budget

High priority: responsive layout, hierarchy, focus, and subtle transform/opacity feedback. Medium: staggered entrance (40–70 ms between a few elements), one scroll narrative, product illustration depth. Low: custom pointer decoration, WebGL, shaders. Never let animation hide the only copy or delay interaction.

CSS owns simple effects; Motion may own React transitions. GSAP is reserved for a separately scoped scroll timeline; it must not animate the same properties/elements as Motion. Lenis is off by default; native scrolling is the baseline. If enabled later, honor reduced motion, keyboard navigation, hash anchors, browser find, restoration, and touch. Do not intercept scrolling for a long pinned sequence.

R3F/Three.js only after measuring the static release: dynamic import, static poster, no canvas-based text, DPR cap around 1.5, pause offscreen/background, recover context loss, avoid heavy postprocessing, and test low-power mobile. A pre-rendered static figure is acceptable and often preferable. No spinning object merely to satisfy “3D”.

`prefers-reduced-motion: reduce` removes positional entrances, parallax, smooth scrolling and decorative loops. Content stays visible. Focus and state feedback remain immediate. Do not run a continuous animation without a pause strategy.

## Acceptance

Inspect 360/390, 768 and 1440 px widths; browser zoom; long Portuguese strings; keyboard order; reduced motion; disabled JavaScript for content; and direct route loading. No horizontal overflow or clipped controls. Target LCP <=2.5 s, INP <=200 ms, CLS <=0.1; report measured conditions, never assert a target as an achievement. Measure actual route bundles before accepting heavy effects.
