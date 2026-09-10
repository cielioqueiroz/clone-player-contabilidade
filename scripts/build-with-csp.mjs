import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { readFile, readdir } from "node:fs/promises";
import { join, resolve } from "node:path";
import { contentSecurityPolicy } from "../src/lib/security-policy.ts";

const nextCli = resolve("node_modules/next/dist/bin/next");
const buildId =
  process.env.VERCEL_GIT_COMMIT_SHA ??
  process.env.GITHUB_SHA ??
  `local-${Date.now()}`;

function runBuild(scriptHashes) {
  const env = { ...process.env, PLAYER_BUILD_ID: buildId };
  if (scriptHashes) env.CSP_SCRIPT_HASHES = JSON.stringify(scriptHashes);
  else delete env.CSP_SCRIPT_HASHES;
  const result = spawnSync(process.execPath, [nextCli, "build"], {
    env,
    stdio: "inherit",
  });
  if (result.error) throw result.error;
  if (result.status !== 0)
    throw new Error(`Next.js build pass failed with exit ${result.status}.`);
}

async function collectScriptHashes() {
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
    throw new Error("No prerendered scripts found; CSP build cannot continue.");
  return { documents, hashes: [...hashes].sort() };
}

runBuild();
const collected = await collectScriptHashes();
runBuild(collected.hashes);
const verified = await collectScriptHashes();
if (JSON.stringify(verified.hashes) !== JSON.stringify(collected.hashes))
  throw new Error(
    "Inline script hashes changed between deterministic build passes.",
  );

const policy = contentSecurityPolicy({ scriptHashes: verified.hashes });
if (Buffer.byteLength(policy) > 6000)
  throw new Error(
    "CSP exceeds the project's header budget; review route-specific policies.",
  );
console.log(
  `CSP verified: ${verified.documents} static documents, ${verified.hashes.length} script hashes, ${Buffer.byteLength(policy)} header bytes.`,
);
