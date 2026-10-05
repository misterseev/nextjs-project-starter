import type { NextConfig } from "next";
import { parseServerEnv } from "./src/shared/config/env.schema";
const env = parseServerEnv(process.env);

const nextConfig: NextConfig = {
  typedRoutes: true,
  poweredByHeader: false,
  reactStrictMode: true,
  images: { remotePatterns: [] },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          // Compatible with static RSC output; add a script/nonce policy per product.
          {
            key: "Content-Security-Policy",
            value:
              "base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'",
          },
          ...(!env.isIndexable
            ? [{ key: "X-Robots-Tag", value: "noindex, nofollow" }]
            : []),
        ],
      },
      {
        source: "/api/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};
export default nextConfig;
