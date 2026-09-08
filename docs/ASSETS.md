# Visual assets and source record

## Current headquarters

The user confirmed the Google Maps location as the current company address: **Av. Siqueira Campos, Jardim Aureny III (Taquaralto), Palmas–TO**. Map entity: https://www.google.com/maps?cid=175021512181408638. This is derived from the supplied Maps place identifier, not from the former website addresses. Do not infer a street number or postal code.

Observed Maps photos attributed to Player Contabilidade, dated June 2026: golden facade with reflective glazing; a meeting room with a long wood table and vertical wall panels. Low-resolution reference copies are kept locally outside the public source. Map imagery/tiles and platform branding are not website assets.

## Instagram photos selected for the concept

Source: https://www.instagram.com/playercontabilidade/p/DcMkgyREfDB/ (public post, August 18, 2026). Two frames show the same premium meeting room, first empty, then occupied by the team. Materials: stone tabletop, leather chairs, wood, warm lighting and a branded screen. The publication contains baked-in text; preserve the complete image and do not erase text, faces or marks.

| Local asset | Source frame | Dimensions | Usage |
| --- | --- | --- | --- |
| `public/images/player-meeting-room.jpg` | First image | 3277 × 4096 | Empty-room view in the headquarters story |
| `public/images/player-team-meeting.jpg` | Second image | 3277 × 4096 | Team-view toggle in the headquarters story |

The user explicitly requested these company photos for the demonstration. They remain third-party company material; user authorization to include them is not an independently verified redistribution license. Credit the company and link to the original post. Do not grant rights to these photos under any software license or claim they are original project photography. Further commercial use or unrestricted redistribution needs rights review with the owner.

Use Next Image responsive optimization, lazy loading, explicit aspect ratio and reduced-motion-compatible opacity transitions. Do not hotlink expiring Instagram CDN URLs. No downloaded photo should contain private source metadata added by this project. The interface shows original/public imagery and collects no information about pictured people.

## Motion plan

- First release: user-controlled crossfade between the room and people; visible buttons, preserved image framing, no autoplay.
- Future scroll story: short crossfade with a static fallback and keyboard equivalent; never morph faces or fabricate architectural details.
- Facade: suitable for a restrained vertical reveal, but request the original full-resolution company photo before using the small Maps preview as a prominent website image.

## Identity and sharing

`src/app/icon.svg` is an original elliptical portal favicon for the concept, not a copied company trademark. All decorative arrows were removed at the user's request. `src/app/opengraph-image.tsx` generates a 1200 × 630 PNG with original typography, the concept label and owner credit. Keep OG/title/description consistent with the non-official nature of the project. Verify absolute OG URLs on the final domain and both image endpoints before release.

The metallic portal in `hero-art.tsx` and the sector geometry are original SVG/CSS compositions. Archivo Variable and Manrope Variable are self-hosted Latin WOFF2 files from Fontsource 5.3.0, licensed OFL-1.1; their notices remain in the dependency packages. No Instagram footage or third-party executable animation code is copied into the design.

## Conflicting public facts

Instagram bio observed: +1,500 clients, +20 million saved, +100 specialists. The older website references +1,000 clients and +7 million saved. These are unverified marketing claims from different sources. The concept deliberately does not display them as audited facts. The user resolved the address discrepancy in favor of the Maps location; the numerical claims remain pending review.
