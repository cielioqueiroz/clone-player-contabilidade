import { readdir, readFile } from "node:fs/promises";
import { join, relative } from "node:path";

const ignored = new Set([
  "node_modules",
  ".git",
  ".next",
  ".vercel",
  "out",
  "coverage",
  "test-results",
  "playwright-report",
  "work",
]);
const patterns = [
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  /\bgh[pousr]_[A-Za-z0-9]{30,}\b/,
  /\bAKIA[0-9A-Z]{16}\b/,
  /\bsk_(?:live|test)_[A-Za-z0-9]{20,}\b/,
  /\bpostgres(?:ql)?:\/\/[^\s:]+:[^\s@]+@/,
];
const findings = [];
async function scan(dir) {
  for (const item of await readdir(dir, { withFileTypes: true })) {
    if (ignored.has(item.name) || item.isSymbolicLink()) continue;
    const path = join(dir, item.name);
    if (item.isDirectory()) {
      await scan(path);
      continue;
    }
    if (item.name.startsWith(".env") && item.name !== ".env.example") {
      findings.push(relative(process.cwd(), path));
      continue;
    }
    if (
      !/\.(?:[cm]?[jt]sx?|json|ya?ml|md|css|txt)$/.test(item.name) &&
      item.name !== ".env.example"
    )
      continue;
    const body = await readFile(path, "utf8");
    if (patterns.some((pattern) => pattern.test(body)))
      findings.push(relative(process.cwd(), path));
  }
}
await scan(process.cwd());
if (findings.length) {
  console.error(
    `Potential secrets found in ${findings.length} file(s):\n${findings.join("\n")}`,
  );
  process.exitCode = 1;
} else
  console.log(
    "No known credential patterns or environment files found in the scoped source scan. Manual review remains required.",
  );
