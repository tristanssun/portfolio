import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/webpages/pie-an-ap",
        destination: "https://hp-pie-an-ap.tristan-sun.chatgpt.site/webpages/pie-an-ap/",
      },
      {
        source: "/webpages/pie-an-ap/:path*",
        destination: "https://hp-pie-an-ap.tristan-sun.chatgpt.site/webpages/pie-an-ap/:path*",
      },
      {
        source: "/cultural-work",
        destination: "/cultural-work/index.html",
      },
    ];
  },
};

export default nextConfig;
