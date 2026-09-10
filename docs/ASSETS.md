# Visual assets and source record

## Current headquarters

The user confirmed the Google Maps location as the current company address: **Av. Siqueira Campos, Jardim Aureny III (Taquaralto), Palmas–TO**. Map entity: https://www.google.com/maps?cid=175021512181408638. This is derived from the supplied Maps place identifier, not from the former website addresses. Do not infer a street number or postal code.

Observed Maps photos attributed to Player Contabilidade, dated June 2026: wide and close facade views, meeting rooms, open work areas and training spaces. The user supplied direct public Maps photo links for this increment; selected image copies are stored locally under `public/images/official/player-maps-*`. Map imagery/tiles and platform branding are not website assets.

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
- Desktop office journey: five local frames move from a wide exterior context to the facade, work area, meeting table and team. The scene uses GSAP pin/scrub and remains static on mobile. The opening frame is a wide ground-level view, not an aerial image.
- Facade: suitable for a restrained vertical reveal, but request the original full-resolution company photo before using the small Maps preview as a prominent website image.

## Pharmacy Instagram reference

Source: `https://www.instagram.com/contadoresdefarmacia/`, public profile
identified as Player Contabilidade's pharmacy-focused unit. The local
`contadores-farmacia-profile.jpg` is the public profile image used as a small,
credited reference mark in the Home specialties section. Posts are not mirrored;
the interface links to the profile for the visitor's own action. Inclusion in
this independent demonstration does not establish affiliation or a reuse
license beyond the user's request.

## Identity and sharing

The user explicitly requested the official company logo and complete institutional section coverage on 2026-09-08. `public/images/official/` now contains the two unmodified 225 × 75 logo PNGs from the company's website. `PlayerLogo` uses them in the header, footer and original illustrative app panel; the OG endpoint embeds the same company logo. The visible independent-project notice remains. This replaces the former text-only demo wordmark, without changing the previously approved portal artwork.

The same folder contains the six original institutional gallery JPEGs (3024 × 4032), nine 75 × 75 badge images, and three testimonial cover PNGs. The source paths and section mapping are documented in `SOURCE-PARITY.md`. These are company-source materials incorporated at the user's request, not project-owned artwork or independently verified certification evidence. Original gallery files are kept intact, served through responsive, lazy-loaded Next Image optimization with explicit dimensions. They are historical source-gallery images, not a claim about the current confirmed headquarters. Video files are not downloaded or mirrored; each poster links explicitly to the company's original video URL.

`src/app/icon.svg` embeds the original 32 × 32 company favicon PNG, found in the official site's icon metadata at `https://playercontabilidade.com/assets/favicon-BgP-nxWn.png`, preserved locally as `public/images/official/player-symbol.png`. The SVG wrapper preserves the existing public favicon route. All decorative arrows were removed at the user's request; the official company mark is retained as supplied. `src/app/opengraph-image.tsx` generates a 1200 × 630 PNG with the official logo, original composition, the concept label and owner credit. Keep OG/title/description consistent with the non-official nature of the project. Verify absolute OG URLs on the final domain and both image endpoints before release.

The hero decomposes the official emblem into three curved SVG clipping regions, each with independent scroll displacement and rotation. The underlying pixels are from the 512 × 512 Google Play artwork for the Player app linked by the company's own website: `https://play-lh.googleusercontent.com/VYG4sgL6mW0eviVcVBX3g8dSrPV5tmxph8cNqtP22Ra53vqYEvBpegDvuO6Cdg842r4kBNOMND5lCWulnoBb=w1024-h1024-rw`. The server returns a 512 × 512 WebP, saved unmodified as `public/images/official/player-emblem-source.webp`. SVG masks isolate the emblem from the store artwork; no logo generation, upscaling service or proprietary script is used. The complete header/footer logo is unchanged. Reduced motion and pause restore the assembled mark.

The metallic portal in `hero-art.tsx` and the sector geometry are original SVG/CSS compositions. Archivo Variable and Manrope Variable are self-hosted Latin WOFF2 files from Fontsource 5.3.0, licensed OFL-1.1; their notices remain in the dependency packages. No Instagram footage or third-party executable animation code is copied into the design.

## Conflicting public facts

Instagram bio observed: +1,500 clients, +20 million saved, +100 specialists. The website references +1,000 clients and +7 million saved. These are unverified marketing claims from different sources. About displays the website snapshot with source attribution and expandable context about the conflicting figures, not as audited facts or a performance guarantee. The user resolved the address discrepancy in favor of the Maps location; the numerical claims remain unverified.
