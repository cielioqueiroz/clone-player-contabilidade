import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { execFileSync, spawnSync } from "node:child_process";

test("publication scan excludes local secrets but rejects forced staging and source credentials", () => {
  const cwd = mkdtempSync(join(tmpdir(), "player-secret-scan-"));
  const scanner = resolve("scripts/check-secrets.mjs");
  const scan = () => spawnSync(process.execPath, [scanner], { cwd, encoding: "utf8" });
  try {
    execFileSync("git", ["init", "--quiet"], { cwd });
    writeFileSync(join(cwd, ".gitignore"), ".env*\n!.env.example\n");
    writeFileSync(join(cwd, ".env.local"), "LOCAL_ONLY=example\n");
    assert.equal(scan().status, 0);
    execFileSync("git", ["add", "--force", ".env.local"], { cwd });
    assert.equal(scan().status, 1);
    execFileSync("git", ["rm", "--cached", ".env.local"], { cwd });
    const fakeCredential = "ghp_" + "a".repeat(36);
    writeFileSync(join(cwd, "source.ts"), `export const key = '${fakeCredential}';`);
    const result = scan();
    assert.equal(result.status, 1);
    assert.ok(result.stderr.includes("source.ts"));
    assert.ok(!result.stderr.includes(fakeCredential));
  } finally {
    rmSync(cwd, { recursive: true, force: true });
  }
});
