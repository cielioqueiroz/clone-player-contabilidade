# Security applicability and release controls

Initial architecture: public pre-rendered site with local educational interactions. No application database, auth, lead API, uploaded files, passwords, or analytics. “Not applicable” below is a scoped finding, not a claim that the control is unnecessary for a future backend.

| # | Requested control | Initial application and future gate |
| --- | --- | --- |
| 1 | Hide API keys | No runtime keys required. Ignore `.env*` except a safe example. Never expose server credentials via `NEXT_PUBLIC_`, HTML, source maps, logs, screenshots or client bundles. Public config is intentionally public. |
| 2 | Clean Git secrets | Review staged files, scan for likely secrets, and inspect history before release. If exposed: revoke/rotate first; remove from current code; coordinate history rewrite and collaborator cleanup separately. Never silently force-push history. |
| 3 | Public DB key | N/A: no DB. Future anon/publishable keys do not grant authorization; service-role/admin/connection secrets stay server-only. |
| 4 | RLS | N/A: no DB. For browser-accessible Postgres/Supabase, enable RLS on exposed tables, least-privilege grants, explicit tenant/owner policies; test anonymous access, user A versus B, and service-role bypass. RLS alone is insufficient. |
| 5 | Data encryption | HTTPS for transit at the platform edge. No application personal data at rest. Future persistence requires provider encryption at rest, managed keys, limited access, retention/deletion rules, and application encryption only where the threat model warrants it. |
| 6 | Server-side auth | N/A: no sign-in. Future endpoints/server actions verify session and authorization on every request; client checks are presentation only. |
| 7 | Restrict access | CI `contents: read`, fixed trusted external destinations, public-safe documents, no admin UI. Future record-level checks deny by default. |
| 8 | Mass assignment | N/A: no mutation API. Future inputs use strict field allowlists; never spread request bodies into database writes. Server derives ownerId, role and permission fields. |
| 9 | Secure cookies | No app cookies. Future sessions use HttpOnly, Secure, suitable SameSite, bounded lifetime, CSRF/origin checks and revocation. Do not store session tokens in localStorage. |
| 10 | Password hashes | N/A: no passwords. Prefer established auth; if password storage becomes necessary, vetted Argon2id with per-password salt and current parameters. Never plain text, reversible password encryption, or custom hashing. |
| 11 | Rate limit | No submission/calculation API. Edge platform protections apply to public traffic. Before adding an endpoint, enforce a shared/server-side limit with bounded storage, 429 and Retry-After; in-memory serverless counters and disabled buttons are not sufficient. |
| 12 | Bot protection | No form submission endpoint. Do not add a CAPTCHA to local interactions. If collection is added, verify Turnstile server-side, validate hostname/action, rate-limit, and reject invalid/expired/reused tokens before side effects. |
| 13 | Parameterized queries | N/A: no SQL. Future DB access uses parameterized queries/prepared statements; identifiers and sort fields require allowlists. Never concatenate input into SQL. |
| 14 | Input validation | Local walkthrough accepts fixed enumerations; unknown selections are rejected. Future API validates type, length, range, content type, body size and business rules server-side, with user-safe errors. |
| 15 | Content leakage | Publish demo-safe text only. No private source assets, staff/customer records, internal URLs, logs or env files. Review serialized props, generated HTML, JSON-LD, metadata and errors. `noindex` is not access control. |
| 16 | Upload restrictions | N/A: no uploads. Future uploads require authorization, size/count limits, extension + MIME + file signature checks, random names, separate storage, malware scan where warranted, and rejection/sanitization of active HTML/SVG. |
| 17 | Trim API responses | N/A: no custom API. Future responses use explicit public DTOs; omit secrets, internal identifiers, SQL errors, stack traces and entire model rows. |
| 18 | Security headers | Configure CSP, frame-ancestors, X-Content-Type-Options, Referrer-Policy, Permissions-Policy and X-Frame-Options. Audit Next.js inline script/style compatibility; do not claim strict CSP if unsafe-inline remains. Tighten with hashes/nonces when supported by the chosen rendering model. |
| 19 | Force HTTPS | Vercel redirects HTTP to HTTPS. Add HSTS for the deployment and verify actual response headers; do not enable preload for unrelated domains. Local HTTP remains appropriate for localhost development. |
| 20 | Dependency scan | Lock versions; `npm audit`; Dependabot; inspect package names/maintainers, install scripts, licenses and necessity. No unreviewed remote shell installers. Fix or document exploitable findings; do not use `npm audit fix --force` blindly. |

## Release gate

Run quality checks, dependency audit and scoped secret scan. Inspect Git diff, ignored files, lockfile, public assets, generated configuration and commit author. Confirm no env file, `.vercel/`, credentials, trace, or customer data is staged. A regex scan only catches known patterns; report its limits. Avoid leaking actual values in scanner errors.

Verify headers on the deployed site and test browser behavior under CSP. Initial static Next.js scripts may require `script-src 'self' 'unsafe-inline'`; this is a documented residual limitation, not full XSS protection. No arbitrary HTML rendering, embeds or remote scripts in the initial site. A future strict-CSP migration must choose static hashes or nonce-bearing server rendering deliberately and test caching/runtime cost.

Security sources for implementation details: https://cheatsheetseries.owasp.org/ and https://nextjs.org/docs/app/guides/content-security-policy. Review current primary guidance when introducing backend features.
