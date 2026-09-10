import { test } from "node:test";
import assert from "node:assert/strict";
import { contentSecurityPolicy } from "../../src/lib/security-policy.ts";

test("production denies inline script execution and rejects policy injection", () => {
  const policy = contentSecurityPolicy();
  const directive = policy
    .split(";")
    .map((value) => value.trim())
    .find((value) => value.startsWith("script-src "));
  assert.equal(directive, "script-src 'self'");
  assert.ok(policy.includes("script-src-attr 'none'"));
  assert.ok(policy.includes("frame-src https://www.google.com"));
  assert.ok(!policy.includes("frame-src *"));
  assert.throws(() =>
    contentSecurityPolicy({ scriptHashes: ["'; script-src *"] }),
  );
  assert.ok(!policy.includes("unsafe-eval"));
});

test("development retains Next.js tooling without weakening production defaults", () => {
  assert.ok(
    contentSecurityPolicy({ development: true }).includes("unsafe-eval"),
  );
  assert.ok(!contentSecurityPolicy().includes("unsafe-eval"));
});
