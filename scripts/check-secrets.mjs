import { readFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
const patterns = [
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  /\bgh[pousr]_[A-Za-z0-9]{30,}\b/,
  /\bAKIA[0-9A-Z]{16}\b/,
  /\bsk_(?:live|test)_[A-Za-z0-9]{20,}\b/,
  /\bpostgres(?:ql)?:\/\/[^\s:]+:[^\s@]+@/,
];
const findings = [];
// Include tracked files even when forcibly added through an ignore rule.
const files = execFileSync(
  "git",
  ["ls-files", "--cached", "--others", "--exclude-standard", "-z"],
  { encoding: "utf8", maxBuffer: 10 * 1024 * 1024 },
).split("\0").filter(Boolean);
for (const path of new Set(files)) {
  if (/(^|\/)\.env(?!\.example$)|\.(pem|key|p12|pfx)$|(^|\/)\.vercel\//.test(path)) {
    findings.push(path);
    continue;
  }
  if (!/\.(?:[cm]?[jt]sx?|json|ya?ml|md|css|txt)$/.test(path) && !path.endsWith(".env.example")) continue;
  let body;
  try {
    body = await readFile(path, "utf8");
  } catch (error) {
    if (error.code === "ENOENT") continue; // Tracked deletion pending staging.
    throw error;
  }
  if (patterns.some((pattern) => pattern.test(body))) findings.push(path);
}
if (findings.length) {
  console.error(
    `Potential secrets found in ${findings.length} file(s):\n${findings.join("\n")}`,
  );
  process.exitCode = 1;
} else
  console.log(
    "No known credential patterns or private environment files found in Git publication candidates. Ignored local files are excluded; manual review remains required.",
  );
