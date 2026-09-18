import type { NextConfig } from "next";

const fundraiser = process.env.FUNDRAISER_ORIGIN || "https://hp-pie-an-ap.tristan-sun.chatgpt.site";

const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: "/donate", destination: "https://app.schoolfundr.org/fund/hpstucowokc", permanent: false }];
  },
  async rewrites() {
    return [
      ...[
        "/board", "/admin", "/pie-assets/:path*", "/api/:path*",
        "/aps/:path*", "/fonts/:path*", "/pie4cancer-social-v1.png",
        "/favicon.svg", "/apple-touch-icon.png",
      ].map(source => ({ source, destination: `${fundraiser}${source}` })),
      {
        source: "/webpages/pie-an-ap",
        destination: `${fundraiser}/board`,
      },
      {
        source: "/webpages/pie-an-ap/:path*",
        destination: `${fundraiser}/webpages/pie-an-ap/:path*`,
      },
      {
        source: "/cultural-work",
        destination: "/cultural-work/index.html",
      },
    ];
  },
};

export default nextConfig;
