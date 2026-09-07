<div align="center">

# Player Contabilidade · Concept

**Clarity for the next move.**

A personal website concept exploring how editorial design, accessible interactions, and thoughtful engineering can make accounting easier to understand.

[Explore the source](https://github.com/cielioqueiroz/clone-player-contabilidade) · [Project scope](AGENTS.md) · [Engineering skill](.agents/skills/player-project/SKILL.md) · [Delivery status](docs/STATUS.md)

</div>

---

## The project

An independent portfolio study by **Ciélio Queiroz**, inspired by Player Contabilidade's public website and its current headquarters. This is not the company's official website, a booking service, or a tax advisory product.

The first release establishes a complete navigation foundation and a reusable engineering playbook. Advanced scroll storytelling and optional 3D remain deliberate follow-up milestones.

## What's inside

- Original graphite-and-amber design system, responsive layouts, and a geometric hero.
- Five service categories with individual pages and explicit reference links to the original company's WhatsApp.
- Two specialty pages, About, Contact, Privacy, Accessibility, and a real 404 page.
- A local scenario explorer: no account, lead submission, personal-data storage, or tax calculations.
- A headquarters photo story using two company Instagram images, credited to their original publication.
- An original SVG favicon and a 1200 × 630 Open Graph sharing image.
- TypeScript, automated accessibility and route checks, security headers, dependency checks, and a project skill for continued delivery.

## Stack and cost

| Layer | Choice |
| --- | --- |
| Application | Next.js App Router + React |
| Language | Strict TypeScript |
| Design | CSS tokens, semantic components, reduced-motion-aware CSS |
| Content | Typed files versioned in Git |
| Testing | Node test runner, Playwright, axe-core |
| Quality | ESLint, dependency audit, scoped secret scan |
| Hosting | Vercel Hobby, for personal non-commercial use within its quotas |

No runtime API keys, paid CMS, database, authentication service, analytics subscription, or purchased assets are required. Motion, GSAP, Lenis and R3F are evaluated only when a specific feature needs them. Free hosting remains subject to [Vercel's current Hobby terms and limits](https://vercel.com/docs/plans/hobby).

## Run locally

Use Node.js 24 LTS and npm.

```bash
git clone https://github.com/cielioqueiroz/clone-player-contabilidade.git
cd clone-player-contabilidade
npm ci
npm run dev
```

Open `http://localhost:3000`. There is no environment configuration to fill in for this release.

## Useful commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start development |
| `npm run check` | Lint and type-check |
| `npm test` | Verify local domain behavior |
| `npm run build` | Create the production build |
| `npm run start` | Serve the production build |
| `npm run test:e2e` | Verify routes, interactions, responsive behavior and automated accessibility |
| `npm run security:scan` | Check source for known credential patterns |
| `npm audit` | Review known dependency vulnerabilities |

Before running E2E checks for the first time, run `npx playwright install chromium`, then `npm run build`.

## Architecture

```text
.agents/skills/player-project/  Project skill and engineering references
.github/                       Quality workflow and dependency updates
docs/                          Decisions, provenance, status, contribution guide
public/images/                 Credited company reference photography
scripts/                       Focused release checks
src/
  app/                         Pages, metadata, favicon, OG image and styles
  components/                  Layout, sections, UI and local interactions
  content/                     Typed service and specialty catalog
  lib/                         Pure domain and URL helpers
tests/                         Unit and end-to-end behavior checks
```

Server rendering is the default. Small client components handle navigation state, the photo toggle and the local scenario explorer. Direct URLs and page refresh are tested alongside menu navigation.

## Project skill

The repository includes [`player-project`](.agents/skills/player-project/SKILL.md), a project-scoped delivery skill covering discovery, architecture, prompt/context contracts, design, motion, security, testing, GitHub, and Vercel.

Its references are loaded by task relevance, while [`AGENTS.md`](AGENTS.md) keeps the stable scope and [`docs/STATUS.md`](docs/STATUS.md) records completed work and the next bounded step. To continue work in a compatible coding environment, invoke `$player-project` from this repository.

## Security and privacy

The [security matrix](.agents/skills/player-project/references/security.md) maps all 20 requested controls to this architecture. Database keys, RLS, authentication, password hashing, uploads, SQL queries and server mutation protection are explicitly not applicable until those capabilities exist.

This version defines no application cookies or tracking. Hosting infrastructure may still process request metadata. The initial CSP permits Next.js inline scripts; this limitation is documented rather than presented as strict CSP. Automated scans and accessibility checks are useful evidence, not security certification or a replacement for manual review.

## Roadmap

- Foundation: scope, project skill, architecture, design tokens and free deployment.
- Navigable concept: service/specialty routes, local interactions, headquarters story and sharing assets.
- Refinement: broader device testing, typography polish, measured performance and scroll narrative.
- Optional: approved full-resolution facade imagery, app showcase and a performance-budgeted 3D experiment.

See [delivery status](docs/STATUS.md) for verified progress rather than treating the roadmap as a completion claim.

## References and asset ownership

[Company website](https://playercontabilidade.com/) · [Company Instagram](https://www.instagram.com/playercontabilidade/) · [Motion reference](https://www.instagram.com/p/Dc9nfs7x79G/) · [Current headquarters](https://www.google.com/maps?cid=175021512181408638)

The implementation, favicon and sharing artwork are created for this concept. Company names, photos and other third-party material retain their respective ownership. See [asset provenance](docs/ASSETS.md) for the two selected Instagram images, source dates, current address and usage limitations. No proprietary application code was copied.

---

Created and maintained by [Ciélio Queiroz](https://github.com/cielioqueiroz).
