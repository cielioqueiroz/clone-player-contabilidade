# Delivery, GitHub, and Vercel

## Scope

Target repository is `cielioqueiroz/clone-player-contabilidade`; local root is `D:\Projetos\_Programacao\clone-player-contabilidade`; Vercel scope is `cielio-queiroz`. Do not touch other projects. User has authorized initial commits, pushes, metadata setup and free Vercel hosting in the initial request. Reuse that authorization for this scoped delivery; do not infer approval for paid plans or unrelated communications.

## Quality sequence

1. Review changes and run `npm run check`, `npm test`, `npm run build`, relevant `npm run test:e2e`, `npm run security:scan`, and `npm audit`.
2. Browser-test representative routes at desktop/mobile widths, keyboard, reduced motion and direct reload. Validate all generated service/specialty routes and 404 recovery. Do not send messages through WhatsApp to test a link.
3. Keep checks proportional: docs-only changes do not need a full browser suite. The initial application release does.
4. Update `docs/STATUS.md` with executed checks, measured outcomes, known gaps and next work. Screenshots and metrics in README must come from this project, not the original website.

## GitHub

- Verify remote and current tree. Start `main` only if repository is empty; preserve existing history otherwise.
- Verify the GitHub account and local author. Use Ciélio Queiroz with the account's verified email or GitHub noreply email. Configure locally, not globally. No coauthor trailers, tool badges or credit banners; required dependency licenses remain.
- Use English Conventional Commits such as `docs: define project scope and delivery skill`, `feat: add navigable concept website`, `test: cover deep links and local walkthrough`, `chore: configure quality checks and deployment`.
- Stage explicit paths, review cached diff and scan before each push. Never commit `.env`, `.vercel`, node_modules, screenshots containing account data, build traces or credentials.
- README: concise identity and live link, actual features, stack, setup, architecture, scripts, scope/security, roadmap, author and reference ownership. Avoid “100% secure”, invented coverage, unsupported performance badges or “fully complete” claims.
- About: short English product description; relevant topics; verified deployed website URL only after READY. Do not publish local Windows paths in general promotional copy.

## Free deployment

Prefer native Vercel Git integration to avoid storing a deployment token in GitHub. Link only this repo to the supplied Hobby account. Use root directory `.`, Next.js detection, `npm ci`, `npm run build`, and the framework's default output. No environment secrets required for this release.

Read Vercel project linkage before deploying. Vercel Hobby is free for personal non-commercial projects subject to limits: https://vercel.com/docs/plans/hobby. Keep this a personal concept demonstration with no real bookings/lead capture, no paid analytics, no trial and no custom-domain purchase. Do not activate paid features if quotas are exceeded; report the limit.

Wait for READY, inspect build errors if any, and verify production home, Solutions direct load, a service detail, local walkthrough and 404. Check HTTPS/security headers. A dashboard screenshot or attempted deploy is not proof of success. Keep a rollback path to a known good deployment; report commit and URL.

If login or access is unavailable, finish the source, checks, skill, README and Git work that can proceed. Report precisely what is blocked and the minimal user action needed, without requesting secrets in chat.
