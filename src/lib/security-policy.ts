export function contentSecurityPolicy({
  development = false,
  scriptHashes = [],
}: {
  development?: boolean;
  scriptHashes?: string[];
} = {}): string {
  if (scriptHashes.some((hash) => !/^sha256-[A-Za-z0-9+/]{43}=$/.test(hash))) {
    throw new Error("Invalid CSP script hash");
  }
  return [
    "default-src 'self'",
    `script-src 'self' ${development ? "'unsafe-inline' 'unsafe-eval'" : scriptHashes.map((hash) => `'${hash}'`).join(" ")}`.trim(),
    "script-src-attr 'none'",
    // GSAP sets style properties; this exception does not authorize scripts.
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self'",
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'none'",
    "frame-src https://www.google.com",
    "frame-ancestors 'none'",
    "form-action 'self'",
    ...(!development ? ["upgrade-insecure-requests"] : []),
  ].join("; ");
}
