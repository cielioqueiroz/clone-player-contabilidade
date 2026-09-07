# ADR 0001: Static-first personal demonstration

Status: accepted for the initial release.

The requested deliverable combines a reusable engineering skill, a new repository and free Vercel hosting. A marketing concept does not require real lead collection, a database or authentication. Adding those would create avoidable operational and privacy requirements.

Use Next.js pre-rendered routes, typed Git content, CSS tokens and small local React interactions. Keep the public experience clearly non-official, non-commercial and noindex. Motion packages, database services, tracking and server mutations are deferred until an actual requirement exists and free-use constraints are checked.

Consequences: zero runtime API keys; repeatable build; useful deep links; limited data exposure; content edits use Git. The simulator demonstrates a journey, not a fiscal calculation. Initial CSP allows Next.js inline scripts; strict hashes/nonces require a separate tested rendering decision. No authentication, DB, RLS or upload control is claimed as implemented.
