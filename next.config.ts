import type { NextConfig } from "next";
import { contentSecurityPolicy } from "./src/lib/security-policy";

const isDevelopment = process.env.NODE_ENV === "development";
// Production hashes are derived from the exact prerendered HTML after build.
const csp = contentSecurityPolicy({ development: isDevelopment });

const config: NextConfig = {
  poweredByHeader: false,
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
