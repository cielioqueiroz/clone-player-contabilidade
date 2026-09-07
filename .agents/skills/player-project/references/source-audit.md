# Source audit and migration

Observed on 2026-09-06; website and platform content may change. Evidence source: public rendered pages and screenshots, not application source code.

## Routing correction

Starting at https://playercontabilidade.com/ and selecting **Soluções** successfully renders `/solucoes`. Refreshing that URL returned a plain Not Found / 404 page. The difference is consistent with missing deep-route server fallback in a client-routed app, but the server configuration was not inspected. Do not report the menu as universally broken.

## Solutions inventory

| Category | Subjects visible in the source, summarized | CTA |
| --- | --- | --- |
| BPO Financeiro | Receivables/payables, payroll processing, treasury, financial systems | Saber mais → WhatsApp |
| Assessoria Contábil Completa | Management reporting, assets/liabilities, regulatory matters | Saber mais → WhatsApp |
| Legalização | Digital certificate, brands/patents, product tax registration, business opening/closure | Saber mais → WhatsApp |
| Treinamentos | Corporate/financial training, compliance/ethics, innovation | Saber mais → WhatsApp |
| Planejamento Tributário | Tax regime, credits, consulting/audit, special regimes, budgets | Saber mais → WhatsApp |

All five cards used `https://wa.me/5511994453204` with a generic, prefilled greeting. The page also repeats benefits, app links, simulator CTA, and footer. Card destination inspection verifies the intended URL, not that the recipient will respond. No message was sent.

## Other observed pages

Home: dark hero; specialization; two industry links; three illustrated advantages; three testimonial videos; three operational benefits; app downloads; diagnosis CTA; footer with contact and corporate identifiers; cookie banner; floating WhatsApp.

About: company description; mission/vision/values; animated metrics; six-image structure gallery; nine certification-related cards; testimonials; diagnosis and footer. Metrics and certifications are source claims, not independently verified facts. Do not reproduce certification badges as endorsements of this demo.

The original simulator opens an introductory modal and then asks for a full name. Subsequent steps were not inspected to avoid submitting invented data to a live lead flow. Do not invent its full workflow.

## Motion reference

https://www.instagram.com/p/Dc9nfs7x79G/ belongs to https://www.instagram.com/altrabr/. Public profile focuses on technology, business, design, and site workflows. The observed Reel includes a SEASATS example described as interactive scroll in the hero, and an editorial figure/object composition. The footage is a curated showcase; its caption is not proof of authorship, framework, rendering technique, or mobile performance. Only parts of its short sequence were visually sampled. Do not claim a frame-by-frame audit or attribute GSAP, Three.js, or a shader to it without further evidence.

## Reproducible migration

1. Inventory public pages, menu behavior, headings, section order, CTA labels and destinations. Respect robots/terms, cache responses, stay on an explicit domain allowlist, and limit requests (one at a time, about one per second if scripting is needed).
2. Record `sourceUrl`, `observedAt`, `contentType`, `status`, `proposedRoute`, `assetOwner`, `licenseOrPermission`, and `reviewStatus` for imported material.
3. Extract visible facts and page relationships. Never copy executable bundles, private endpoints, unpublished records, cookies, or credentials.
4. Re-author prose and graphics. Keep business claims qualified or omit them until approved. Use owned/licensed visuals; do not hotlink testimonials or blindly mirror assets.
5. Map paths to typed local content and real pages. Check direct loads and refresh in addition to menu clicks; handle old `/sobre-nos` explicitly.
6. Before publication, check every visible link and its intent. External company contacts must say they belong to the original company and require the visitor's own action. Do not auto-launch WhatsApp.

No app download, Onvio destination, permission, certificate, or real customer metric should be invented to fill a gap.

## Company Instagram and current headquarters update

The user added https://www.instagram.com/playercontabilidade/ and the Google Maps listing. See root `docs/ASSETS.md` for the selected meeting-room/team frames, source dates, usage constraints, and effects. The user confirmed that the Maps address is current; it supersedes the old addresses for this project. The Instagram bio uses higher client/savings counts than the website, which remains an unresolved source discrepancy, not a reason to choose the larger numbers automatically.
