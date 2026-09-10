# 0005 — Add a desktop-only office journey

## Context

The portfolio needs a stronger scroll-led presentation inspired by premium
scrollytelling references. The repository already contains public company-source
gallery photographs and two credited Instagram frames of the meeting room.
There is no verified aerial photograph or image sequence for the current
headquarters.

## Decision

Add one desktop-only presentation scene between the hero and manifesto. It uses
four existing local images as editorial frames, with GSAP ScrollTrigger pin,
scrub, scale, and opacity transitions. The first frame is described as context,
not as an aerial view. At widths up to 800px the scene is replaced with a
static two-image presentation and no GSAP timeline is created.

Keep native scrolling. Do not add Lenis, Canvas, or Three.js for this increment.
All source images remain local, responsive, credited, and outside any software
license claim.

## Consequences

The desktop Home gains a longer pinned scene and additional responsive image
requests. The mobile path avoids the pinned timeline and uses only two images.
A future true aerial-to-interior sequence requires an approved aerial asset and
optimized frame set from the company or an explicitly licensed source.

