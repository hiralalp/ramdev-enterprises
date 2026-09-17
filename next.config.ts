import type { NextConfig } from "next";

const staticExport = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: staticExport ? "export" : undefined,
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
  ...(!staticExport && { async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  } }),
};
export default nextConfig;
