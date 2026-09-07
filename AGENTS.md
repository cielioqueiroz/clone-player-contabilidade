# Project operating contract

## Purpose and ownership

Build a modern, accessible personal portfolio reinterpretation of Player Contabilidade. Owner: **Ciélio Queiroz** (`cielioqueiroz`). Repository: https://github.com/cielioqueiroz/clone-player-contabilidade. Local project: `D:\Projetos\_Programacao\clone-player-contabilidade`. Hosting target: Vercel team `cielio-queiroz`, Hobby plan.

The original company website and the Instagram reference are research inputs. This project is not the official website and does not represent an appointment, affiliation, tax consultation, or real customer platform. Keep this distinction visible and use original implementation and public-safe demonstration content. The user also requested company Instagram photos, a favicon and OG sharing image; consult `docs/ASSETS.md`. Use the user-confirmed current headquarters at Av. Siqueira Campos, Jardim Aureny III (Taquaralto), Palmas–TO. Do not reuse former website addresses.

## Project skill and context

Use `.agents/skills/player-project/SKILL.md` for implementation, design review, security, and delivery in this repository. Read its references according to task relevance. `docs/STATUS.md` tracks work in progress; the references define the intended system. Treat status as evidence only when backed by source or executed checks.

Source research: https://playercontabilidade.com/, its internally navigated `/sobre-nos` and `/solucoes` pages, and https://www.instagram.com/p/Dc9nfs7x79G/ by `@altrabr`. A previous blanket claim that Solutions was broken was incorrect: menu navigation works and displays five WhatsApp-linked categories; direct reload returned 404. Re-test both pathways when auditing routing.

## Product scope from start to finish

- Home: original editorial hero, specialized accounting positioning, route-based service discovery, benefits, product/technology story, and contextual CTAs.
- Solutions: **BPO Financeiro**, **Assessoria Contábil Completa**, **Legalização**, **Treinamentos**, **Planejamento Tributário**, with individual detail routes and clearly identified external WhatsApp reference links.
- About: institutional subject matter reinterpreted without unsupported numbers or certification claims.
- Specialties: pharmacies/drugstores and construction materials, with reusable detail pages.
- Simulator: local educational walkthrough first. No claimed tax-saving formula, real diagnosis, personal-data collection, or silent submission. Real calculations require approved rules, source dates, and domain tests in a separately scoped increment.
- Contact: demonstrate the contact journey; make any link to the original company's published contact explicitly identifiable. The portfolio itself does not collect leads or take bookings.
- Privacy, accessibility, and custom not-found page. Every rendered navigation destination must work through client navigation, direct entry, and refresh.
- Future approved assets: office images, app preview, certificates, and video testimonials with provenance, permission, captions, and lightweight loading. Until then, use original abstract illustrations and omit unverified endorsements.
- Motion: accessible reveal, text entrance, hover/focus feedback, and an optional scroll story. One optional 3D hero only after static design and performance pass; no mandatory cursor, scroll hijack, or content hidden behind animation.

## Free-only architecture

Use Next.js App Router, React, strict TypeScript, CSS design tokens, and content versioned in Git. Motion is the first optional animation library. GSAP, Lenis, Three.js/R3F are conditional, not mandatory dependencies. No paid CMS, database, analytics, fonts, templates, plugins, or trials. Use the supplied Vercel Hobby account for personal non-commercial demonstration under its current terms and quotas; do not silently upgrade.

Initial system: pre-rendered public pages, no application database, auth, passwords, file uploads, lead API, or analytics. Do not introduce these only to make a security checklist look complete. If a new requirement needs persistence, document the decision and reapply all relevant security controls before release.

## Engineering conventions

- Website copy in Brazilian Portuguese. Code identifiers, comments where helpful, commit messages, README, and GitHub metadata in English.
- Use feature-sized components and typed centralized content. Extract actual repetition; avoid generic framework abstractions or global state without a use case.
- Server components by default. Keep browser APIs in client islands; render headings, prose, and links without requiring hydration.
- One source of truth for route slugs, services, specialty data, and external link construction. No `href="#"`, dead CTAs, hardcoded secrets, HTML from untrusted sources, or blanket `any`.
- Use semantic landmarks, heading hierarchy, visible focus, skip link, reduced motion, responsive grids, and touch-sized controls. No hover-only information.
- Validate inputs at the trust boundary. Public environment variables are public. Never treat a public database key as authorization.
- Commit only scoped files after reviewing changes. Keep the user's verified author/committer identity; do not add automatic coauthors or tool attribution. Never fabricate signatures, rewrite existing history, or remove required third-party notices.

## Design and quality targets

Design direction: warm graphite, ivory typography, amber accents, generous editorial spacing, a custom abstract geometric hero, and restrained motion. Read the design-system reference before changing tokens or component visual behavior.

Acceptance: navigation and refresh work; no horizontal overflow at 360/390/768/1440 px; keyboard and reduced-motion paths work; browser errors are resolved; lint, typecheck, unit and relevant E2E tests pass; production build succeeds. Target Core Web Vitals LCP <=2.5 s, INP <=200 ms, CLS <=0.1, assessed with an identified environment. Targets are not measured results.

## Security and operations

The 20 requested controls are mapped with applicability and reactivation conditions in `.agents/skills/player-project/references/security.md`. Apply relevant controls now, keep others explicitly not applicable, and never claim full security from a clean dependency audit. Secrets must not enter source, commits, screenshots, prompts, build output, or browser payloads. Existing exposed credentials require revocation before coordinated history cleanup.

Keep deployment free, scoped to this project, and verifiable. GitHub Actions verifies quality; Vercel Git integration deploys commits. Avoid workflows with privileged `pull_request_target` and no automatic messages/PR comments. Use least-privilege CI permissions. Do not alter unrelated account settings or projects.

## Definition of completion

A milestone is complete only when its working implementation, relevant checks, documentation, and commit exist. A deployment is complete only after Vercel reports READY and representative production URLs are verified. Update status with remaining scope; do not describe an initial release as the finished cinematic redesign.
