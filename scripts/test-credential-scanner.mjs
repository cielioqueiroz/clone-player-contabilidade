import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { mkdtemp, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const directory = await mkdtemp(join(tmpdir(), "player-scanner-regression-"));
const scanner = resolve("scripts/scan-credentials.mjs");
const git = (...args) =>
  execFileSync("git", args, { cwd: directory, stdio: "pipe" });
const fake = "ghp_" + "Aa1Bb2Cc3Dd4Ee5Ff6Gg7Hh8Ii9Jj0Kk1Ll2";
const scan = (...args) =>
  spawnSync(process.execPath, [scanner, ...args], {
    cwd: directory,
    encoding: "utf8",
  });
function expectScan(status, ...args) {
  const result = scan(...args);
  assert.equal(
    result.status,
    status,
    "Unexpected scanner result (output intentionally redacted).",
  );
  assert.ok(
    !`${result.stdout}${result.stderr}`.includes(fake),
    "Scanner printed a fixture credential.",
  );
}
try {
  git("init", "--quiet");
  git("config", "user.name", "Scanner Test");
  git("config", "user.email", "scanner-test@example.invalid");
  await writeFile(join(directory, ".gitignore"), ".env*\n!.env.example\n");
  await writeFile(join(directory, ".env.local"), `TOKEN=${fake}\n`);
  git("add", ".gitignore");
  git("commit", "--quiet", "-m", "Initial fixture");
  expectScan(0); // Ignored local secrets are not publication candidates.
  await writeFile(
    join(directory, "credential.ts"),
    `export const token = '${fake}'; // gitleaks:allow\n`,
  );
  git("add", "credential.ts");
  await writeFile(
    join(directory, "credential.ts"),
    "export const token = 'removed';\n",
  );
  expectScan(1, "--staged"); // A clean working file cannot conceal a staged leak.
  git("commit", "--quiet", "-m", "Synthetic credential fixture");
  git("add", "credential.ts");
  git("commit", "--quiet", "-m", "Remove fixture");
  expectScan(1); // The deleted credential must still be found in history.
  git("add", "--force", ".env.local");
  expectScan(1, "--staged");
  console.log(
    "Scanner regressions passed: ignored local file, staged index, removed historical secret, forbidden private path and output redaction.",
  );
} finally {
  // The cleanup target is exactly the directory created by mkdtemp above.
  await rm(directory, { recursive: true, force: true });
}
