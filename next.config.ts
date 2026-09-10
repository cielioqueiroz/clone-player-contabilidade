import type { NextConfig } from "next";
import { contentSecurityPolicy } from "./src/lib/security-policy";

const isDevelopment = process.env.NODE_ENV === "development";
const serializedHashes = process.env.CSP_SCRIPT_HASHES;
const parsedHashes: unknown = serializedHashes
  ? JSON.parse(serializedHashes)
  : [];
if (!Array.isArray(parsedHashes))
  throw new Error("CSP_SCRIPT_HASHES must be an array");
const scriptHashes: string[] = parsedHashes.map((value) => {
  if (typeof value !== "string")
    throw new Error("CSP_SCRIPT_HASHES must contain only strings");
  return value;
});
// The second production build receives hashes collected from the first pass.
const csp = contentSecurityPolicy({
  development: isDevelopment,
  scriptHashes,
});

const config: NextConfig = {
  poweredByHeader: false,
  generateBuildId: async () =>
    process.env.PLAYER_BUILD_ID ??
    process.env.VERCEL_GIT_COMMIT_SHA ??
    process.env.GITHUB_SHA ??
    "local-build",
  images: {
    qualities: [68, 72, 75, 85],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          { key: "Strict-Transport-Security", value: "max-age=31536000" },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
    ];
  },
};
export default config;
