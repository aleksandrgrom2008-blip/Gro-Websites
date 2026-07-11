import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/*
 * Content-Security-Policy — documented compromise:
 *
 * Next.js injects small inline bootstrap scripts into statically rendered
 * pages. A nonce-based CSP would require middleware, which forces every page
 * to render dynamically per-request and throws away static generation — a
 * real performance cost for a marketing site whose pages are 100% static.
 * Hash-based CSP is brittle: the inline chunks change with every Next.js
 * upgrade. So `script-src` allows 'unsafe-inline' but NOT 'unsafe-eval',
 * and no external script hosts exist at all. Everything else is locked to
 * 'self'. In dev, Turbopack/React Refresh additionally need 'unsafe-eval'
 * and a websocket — enabled only when NODE_ENV=development.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  `connect-src 'self'${isDev ? " ws:" : ""}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
