# Architecture and implementation plan

## Decisions

Single Next.js App Router application at repository root. Use pre-rendered server components with typed Git-managed content. No CMS account, database, queues, mail provider, or auth is needed for the personal demo. CSS variables and component classes are the initial styling system; Tailwind is optional only if a documented need justifies migration. Avoid parallel styling systems.

Runtime and dependency versions are pinned in package.json/package-lock.json. Use `npm ci` for reproducibility and verify supported Node/Next combinations before upgrading. Free software is not the same as unlimited hosted usage: recheck Vercel Hobby terms/quotas. Analytics starts disabled; add only a currently verified free option if needed and without personal data.

## Repository structure

```text
.agents/skills/player-project/  executable project guidance + references
.github/workflows/             quality and dependency checks
docs/                         status, decisions, contribution guidance
public/                       owned/licensed static assets
scripts/                      deterministic checks
src/app/                      routes, metadata, layout, CSS, not-found
src/components/layout/        header and footer
src/components/sections/      hero and page sections
src/components/features/      local walkthrough interactions
src/components/ui/            only genuinely shared primitives
src/content/                  typed services, specialties, route content
src/lib/                      URL/validation helpers
tests/e2e/                    browser behavior tests
```

Create folders only when they contain useful files. Do not create empty architectural scaffolding.

## Route contract

- `/`: discovery and original hero.
- `/solucoes`: five verified service categories.
- `/solucoes/[slug]`: five generated service detail routes.
- `/sobre-nos`: preserve source-facing institutional URL; redirect `/sobre` if introduced.
- `/especialidades` and `/especialidades/[slug]`: two industries.
- `/simulador`: non-personal, local educational walkthrough with honest output.
- `/contato`: contact/reference journey, no submission backend.
- `/privacidade`, `/acessibilidade`: accurate policies for implemented behavior.
- Unknown paths: actual 404 and working recovery links.

Generate detail routes from content. Reject unknown slugs with notFound. Render route headings/links server-side. Test direct entry, navigation, and refresh.

## Domain model

`Service`: stable slug, Portuguese title, short description, deliverables, optional illustration identifier. `Specialty`: slug, title, operational context, relevant service slugs. `ReferenceLink`: source URL, label, destination classification. Use a single shared URL helper with allowlisted service slugs and fixed trusted hosts. Never accept an arbitrary redirect host or a phone number from user input.

Keep editorial copy separate from component layout. Read-only public content contains no customer records. Query parameters may choose a known service; unknown values fall back safely. No tax arithmetic is approved by this plan.

## Progressive phases

1. **Foundation (high):** corrected audit, skill, scope, architecture decisions, GitHub metadata, strict TypeScript, lockfile, design tokens, no-secret rules, quality CI.
2. **Navigable release (high):** home, five service pages, specialties, about/contact, local walkthrough, legal/accessibility text, deep-route checks, Vercel Hobby deploy.
3. **Design refinement (high):** responsive layouts, visual rhythm, editorial art direction, reusable components, accessible focus/keyboard paths.
4. **Motion (medium):** reduced-motion-aware reveal, CTA state changes, a short scroll narrative and app illustration. Baseline content stays visible. Measure before adding libraries.
5. **Approved content (medium):** owned/licensed office/product assets and captions. Verify any metrics and certification claims.
6. **Optional 3D (low):** isolated dynamic scene with poster fallback, device/performance gate, and no dependency on WebGL for navigation or meaning.
7. **Release validation (high):** dependency review, functional/a11y checks, production-route smoke checks, README/status evidence, author verification, no unresolved high-risk findings.

## Prompt contracts and context handoff

For each feature, specify: observable user outcome; current evidence; relevant files; allowed changes; public-data/privacy boundaries; design tokens; acceptance checks; and status to update. Example: “Implement `/solucoes` from the five typed entries; preserve clear reference CTAs; verify direct load, reload, keyboard focus, and 390 px layout.”

Keep historical discussion out of runtime code. Record consequential choices as short ADRs: context, decision, alternatives, consequences, verification. Persist known gaps and next steps in `docs/STATUS.md` so continuation does not require replaying the conversation.
