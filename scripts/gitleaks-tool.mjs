import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

export const version = "8.30.1";
const releases = {
  "win32-x64": [
    "windows_x64.zip",
    "d29144deff3a68aa93ced33dddf84b7fdc26070add4aa0f4513094c8332afc4e",
  ],
  "linux-x64": [
    "linux_x64.tar.gz",
    "551f6fc83ea457d62a0d98237cbad105af8d557003051f41f3e7ca7b3f2470eb",
  ],
  "darwin-arm64": [
    "darwin_arm64.tar.gz",
    "b40ab0ae55c505963e365f271a8d3846efbc170aa17f2607f13df610a9aeb6a5",
  ],
};

export async function prepareGitleaks() {
  const release = releases[`${process.platform}-${process.arch}`];
  if (!release)
    throw new Error(
      "Unsupported scanner platform; add a verified official release digest first.",
    );
  const [suffix, checksum] = release;
  const cache = join(tmpdir(), "player-gitleaks-downloads");
  await mkdir(cache, { recursive: true });
  const name = `gitleaks_${version}_${suffix}`;
  const archive = join(cache, name);
  let bytes;
  try {
    bytes = await readFile(archive);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    const response = await fetch(
      `https://github.com/gitleaks/gitleaks/releases/download/v${version}/${name}`,
    );
    if (!response.ok)
      throw new Error(`Scanner download failed: HTTP ${response.status}`);
    bytes = Buffer.from(await response.arrayBuffer());
    if (createHash("sha256").update(bytes).digest("hex") !== checksum)
      throw new Error("Scanner archive checksum mismatch.");
    await writeFile(archive, bytes);
  }
  if (createHash("sha256").update(bytes).digest("hex") !== checksum)
    throw new Error("Cached scanner archive checksum mismatch.");
  const directory = await mkdtemp(join(tmpdir(), "player-gitleaks-exec-"));
  const executable = process.platform === "win32" ? "gitleaks.exe" : "gitleaks";
  const tar =
    process.platform === "win32"
      ? join(process.env.SystemRoot ?? "C:\\Windows", "System32", "tar.exe")
      : "tar";
  execFileSync(tar, ["-xf", archive, "-C", directory, executable]);
  return { executable: join(directory, executable), directory };
}
