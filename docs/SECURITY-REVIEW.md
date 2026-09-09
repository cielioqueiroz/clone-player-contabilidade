# Security control review

Reviewed on 2026-09-09 against source based on `e3f0228`, the current production build and https://clone-player-contabilidade.vercel.app. Typography and route-scroll changes in the same increment do not introduce data handling or new dependencies.

This is a bounded source/configuration review with read-only production checks, not a penetration test or security certification. The application is a public personal demonstration: no database, sign-in, passwords, business mutation API, uploads or lead submission. Next.js still serves framework resources such as image optimization and generated metadata; static content does not remove all infrastructure attack surface. Company reference destinations are separate services outside this review.

## Executed evidence

- `npm audit --audit-level=high`: zero known vulnerabilities at the time of the check. ESLint remains on the documented unsupported 9.x line because the installed React plugin was incompatible with ESLint 10. Audit results do not prove that packages are non-malicious or free of unknown vulnerabilities.
- `npm run security:scan`: no known credential patterns or private environment files in Git publication candidates. The committed scanner uses five credential-pattern families and does not scan Git history. CI runs it with the default shallow checkout.
- Supplemental local history inspection: 12 commits reachable from locally available refs, 146 unique candidate text blobs, zero matches for those same known credential patterns and zero private environment/key paths. This does not cover deleted/unreachable refs, remote-only branches, logs, issues, credentials in images or every provider's token format.
- Supplemental build inspection: 144 JavaScript, JSON, HTML and CSS artifacts under `.next/static` and `.next/server/app`, zero matches for the known credential patterns. Environment file contents were not printed or included in the report.
- Production `http://.../solucoes`: HTTP 308 to the equivalent HTTPS URL. HTTPS returned 200 with HSTS `max-age=31536000`.
- Production response included CSP, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, a camera/microphone/geolocation restriction and `X-Robots-Tag: noindex, nofollow`. No `Set-Cookie` on the inspected response.
- A fresh Chromium context completed the production scenario: zero cookies, zero localStorage entries and zero sessionStorage entries afterward.
- Read-only requests to `/.env`, `/.git/config` and `/api`: 404. These sample checks are not an exhaustive file-disclosure test.
- Source inspection found no app cookies, storage tokens, SQL, authentication, arbitrary HTML rendering, custom fetch-based integration or server actions. The scenario accepts three exact values and rejects unknown/malformed input; unit and browser coverage exercise this boundary without POST requests.

## The twenty requested controls

The user's combined cookies/password entry is separated below to retain twenty distinct controls.

| # | Control | Current status and evidence | Suggested implementation or future gate |
| --- | --- | --- | --- |
| 1 | Hide API keys | Applied to current scope. No runtime integration keys are needed; `.env*` and `.vercel/` are ignored and flagged if published. | Future credentials belong in server-only deployment variables. Public browser keys are visible by definition; never put a privileged key in `NEXT_PUBLIC_*`. |
| 2 | Remove secrets from Git | Partial prevention. Candidate-file scanner is in CI; supplemental reachable-history scan found no known patterns. No leak was established and no history was rewritten. | Add a maintained secret scanner with full-history checkout, redacted findings and pre-commit checks. If a credential leaks, revoke/rotate it before coordinated history cleanup. |
| 3 | Public database key | Not applicable: no database or DB client. | For a future browser DB client, expose only the provider's publishable/anonymous key. Keep service/admin/connection secrets server-only and rely on authorization policies, not key concealment. |
| 4 | Row-level security | Not applicable: no tables. | If exposed database tables are added, enable RLS with least-privilege owner/tenant policies and test anonymous and cross-user access, including privileged-key bypass. |
| 5 | Data encryption | HTTPS applied and verified. Application data-at-rest encryption is not applicable because no visitor records are persisted. Hosting access logs are a separate provider responsibility. | Before persistence, define encryption at rest, key management, backups, retention and deletion. |
| 6 | Server-side authentication | Not applicable: no account or private route. | Verify session and authorization on every protected server endpoint/action. Hiding a button is not authorization. |
| 7 | Access restriction | Applied at code/CI scope; account governance not verified. Pages intentionally public, no admin surface, CI only has `contents: read`. | Review GitHub/Vercel membership and MFA, protect main with required checks, pin CI actions to reviewed commit SHAs. These account settings were not changed or claimed verified. |
| 8 | Mass assignment prevention | Not applicable: no mutation endpoint. | Allowlist writable fields; derive role, ownership and permissions on the server. Never spread an incoming body into a database update. |
| 9 | Cookie protection | Not applicable to app sessions: app defines no cookies and the inspected production response set none. | Future session cookies: HttpOnly, Secure, suitable SameSite, expiry/revocation and CSRF/origin protection. |
| 10 | Password hashing | Not applicable: no passwords. | Prefer maintained authentication; if storing passwords becomes necessary, use vetted Argon2id with per-password salt and current parameters. |
| 11 | Rate limiting | No application-specific quota or 429 policy. Vercel documents automatic DDoS mitigation, which is distinct from endpoint/user limits. | Before a submission or sensitive endpoint, enforce shared server-side limits and return 429/Retry-After. Review edge traffic and relevant free-plan limits for public resources. |
| 12 | Bot protection | Platform-level mitigation only; no configured app challenge or CAPTCHA. There is no submission endpoint to protect. | If a real form is introduced, use server-verified challenge tokens alongside validation and rate limiting. Do not add a challenge to this purely local walkthrough. |
| 13 | Parameterized queries | Not applicable: no SQL. | Use prepared/parameterized statements; allowlist dynamic identifiers and sort fields. |
| 14 | Input validation | Applied to existing interaction. `getRecommendation` accepts only three exact known values; unknown values return null. Dynamic route slugs resolve through the catalog or 404. | A future server boundary must also check types, lengths, ranges, body size/content type and business rules. TypeScript and browser validation alone would be insufficient. |
| 15 | Content leakage prevention | No known secret found in the reviewed source/history/build; sampled private-file URLs return 404. Published company content is deliberately public. | Continue reviewing serialized props, build output, source maps, errors and assets. A server component may still serialize data to the browser. `noindex` is not confidentiality or access control. |
| 16 | Upload restrictions | Not applicable: no upload UI/endpoint. Repository-owned images are not visitor uploads. | Before uploads: authorize, limit size/count, verify extension/MIME/signature, use random names and isolated storage, and reject or sanitize active content. |
| 17 | Trim API responses | Not applicable to business data: no custom API response model. Framework endpoints still exist. | Future APIs should return explicit public DTOs with only required fields, omitting credentials, internal errors and full database records. |
| 18 | Security headers | Applied with a documented limitation: production headers verified, but CSP allows inline scripts/styles. It is not a strict CSP. | Evaluate a stricter script policy in report-only mode. Test build hashes versus per-request nonces, static caching, Next.js hydration and GSAP styles before enforcing it. Simply deleting `unsafe-inline` can break the site. |
| 19 | Force HTTPS | Applied. Actual HTTP 308 redirect and HTTPS/HSTS verified. | Keep regression checks for redirects and headers. Do not apply HSTS preload to unrelated domains. |
| 20 | Dependency scanning | Applied. Lockfile, `npm ci`, CI audit and Dependabot configured; current audit has zero findings. | Review update PRs and install scripts; migrate the unsupported ESLint line when its plugin compatibility is resolved. A vulnerability database scan does not establish supply-chain integrity. |

## Recommended order

1. Expand and automate redacted secret scanning for reachable history and new commits. This closes an existing coverage gap without changing the product.
2. Review repository/deployment access, MFA, branch protection and CI action pinning. Account settings remain outside the verified evidence here.
3. Prototype a stricter CSP in report-only mode and verify static routing, hydration, styles and caching before enforcement. This is a deliberate engineering increment, not a single-header edit.
4. Reapply database/authentication/API/upload controls when those features are actually introduced; adding an unused backend would increase the current attack surface.

No CAPTCHA, database, authentication system, firewall rule, account setting or paid service was added as part of this assessment.

## Primary guidance consulted

- [Next.js CSP guide](https://nextjs.org/docs/app/guides/content-security-policy): inline-script compatibility, nonce rendering tradeoffs and experimental SRI.
- [OWASP Secrets Management](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html): secret lifecycle and revocation.
- [OWASP REST Security](https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html): future endpoint authorization, input validation and response boundaries.
- [Vercel DDoS mitigation](https://vercel.com/docs/vercel-firewall/ddos-mitigation): automatic platform protection and its limits relative to application controls.
- [Gitleaks](https://github.com/gitleaks/gitleaks): candidate scanner for a separately implemented CI improvement; its upstream currently accepts security patches only, so recheck maintenance and alternatives before adoption.
