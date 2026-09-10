import { execFileSync, spawnSync } from "node:child_process";
import {
  mkdtemp,
  mkdir,
  readFile,
  writeFile,
  rm,
  lstat,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve, sep } from "node:path";
import { prepareGitleaks, version } from "./gitleaks-tool.mjs";

const staged = process.argv.includes("--staged");
const cwd = process.cwd();
const git = (args, options = {}) =>
  execFileSync("git", args, { cwd, maxBuffer: 64 * 1024 * 1024, ...options });
const forbiddenPath =
  /(^|\/)\.env(?!\.example$)|\.(pem|key|p12|pfx)$|(^|\/)\.vercel\//;
const knownArgs = new Set(["--staged"]);
if (process.argv.slice(2).some((arg) => !knownArgs.has(arg)))
  throw new Error("Unknown scanner argument.");
const snapshot = await mkdtemp(join(tmpdir(), "player-publication-"));
let tool;
let findings = false;
function scan(args, label) {
  const result = spawnSync(
    tool.executable,
    [
      ...args,
      "--redact=100",
      "--no-banner",
      "--exit-code=1",
      "--log-level=error",
      "--ignore-gitleaks-allow",
      "--gitleaks-ignore-path",
      tool.directory,
    ],
    { cwd, encoding: "utf8", maxBuffer: 10 * 1024 * 1024 },
  );
  // Gitleaks output can include contextual lines: emit only status, never bodies.
  if (result.error || (result.status !== 0 && result.status !== 1))
    throw new Error(`${label} scanner failed; exit ${result.status}.`);
  if (result.status === 1) {
    findings = true;
    console.error(
      `${label}: potential credentials detected. Run Gitleaks locally with --redact=100 to investigate; values are not printed here.`,
    );
  } else console.log(`${label}: no known credential findings.`);
}
try {
  const paths = [
    ...new Set(
      git(
        staged
          ? ["diff", "--cached", "--name-only", "--diff-filter=ACMR", "-z"]
          : ["ls-files", "--cached", "--others", "--exclude-standard", "-z"],
      )
        .toString()
        .split("\0")
        .filter(Boolean),
    ),
  ];
  for (const path of paths) {
    if (forbiddenPath.test(path)) {
      findings = true;
      console.error(
        "Publication contains a prohibited environment/key/private-config path.",
      );
      continue;
    }
    const target = resolve(snapshot, path);
    if (!target.startsWith(resolve(snapshot) + sep))
      throw new Error("Publication path escapes snapshot.");
    let body;
    try {
      if (!staged && (await lstat(join(cwd, path))).isSymbolicLink())
        throw new Error("Publication symlinks require explicit review.");
      body = staged
        ? git(["show", `:${path}`])
        : await readFile(join(cwd, path));
    } catch (error) {
      if (!staged && error.code === "ENOENT") continue;
      throw error;
    }
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, body);
  }
  tool = await prepareGitleaks();
  console.log(`Gitleaks ${version}; official archive SHA-256 verified.`);
  // This config is deliberately outside the snapshot so source comments cannot
  // silence findings. Built-in provider rules and generic-secret rules apply.
  const config = join(tool.directory, "scanner-config.toml");
  await writeFile(config, "[extend]\nuseDefault = true\n");
  scan(
    ["dir", snapshot, "--config", config],
    staged ? "Staged index" : "Publication files",
  );
  if (!staged) {
    if (
      git(["rev-parse", "--is-shallow-repository"]).toString().trim() === "true"
    )
      throw new Error(
        "Full-history scanning requires a non-shallow checkout (fetch-depth: 0).",
      );
    const historyPaths = git(["log", "--all", "--format=", "--name-only", "-z"])
      .toString()
      .split(/[\0\r\n]+/)
      .filter(Boolean);
    if (historyPaths.some((path) => forbiddenPath.test(path))) {
      findings = true;
      console.error("Git history contains a prohibited private-file path.");
    }
    scan(
      ["git", cwd, "--log-opts=--all", "--config", config],
      "Reachable Git history",
    );
  }
  process.exitCode = findings ? 1 : 0;
} finally {
  // Both directories are created above with mkdtemp under the system temp root.
  await rm(snapshot, { recursive: true, force: true });
  if (tool) await rm(tool.directory, { recursive: true, force: true });
}
