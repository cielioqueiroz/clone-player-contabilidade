import { createHash } from "node:crypto";
import { readFile, readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { contentSecurityPolicy } from "../src/lib/security-policy.ts";

// Read this build's exact HTML, including framework error documents. No second
// build, fixed nonce or hand-maintained list of hydration scripts is involved.
const hashes = new Set();
let documents = 0;
for (const directory of [".next/server/app", ".next/server/pages"]) {
  for (const path of await readdir(directory, { recursive: true })) {
    if (!path.endsWith(".html")) continue;
    const html = await readFile(join(directory, path), "utf8");
    documents++;
    for (const [, attributes, body] of html.matchAll(
      /<script\b([^>]*)>([\s\S]*?)<\/script>/gi,
    )) {
      if (/\bsrc\s*=/i.test(attributes) || !body) continue;
      hashes.add(
        `sha256-${createHash("sha256").update(body).digest("base64")}`,
      );
    }
  }
}
if (!documents || !hashes.size)
  throw new Error(
    "No prerendered scripts found; CSP build cannot be finalized.",
  );
const policy = contentSecurityPolicy({ scriptHashes: [...hashes].sort() });
if (Buffer.byteLength(policy) > 6000)
  throw new Error(
    "CSP exceeds the project's header budget; review route-specific policies.",
  );

// Both next start and the Vercel Next.js adapter consume these generated routes.
// Fail closed if a framework upgrade changes that contract.
const manifestPath = ".next/routes-manifest.json";
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
if (manifest.version !== 3)
  throw new Error("Unsupported Next.js routes manifest version.");
const headers = manifest.headers
  .filter((route) => route.source === "/(.*)")
  .flatMap((route) => route.headers)
  .filter((header) => header.key.toLowerCase() === "content-security-policy");
if (headers.length !== 1) throw new Error("Expected one global CSP header.");
headers[0].value = policy;
await writeFile(manifestPath, JSON.stringify(manifest));
console.log(
  `CSP finalized: ${documents} static documents, ${hashes.size} script hashes, ${Buffer.byteLength(policy)} header bytes. Inline scripts and event handlers require authorization.`,
);
