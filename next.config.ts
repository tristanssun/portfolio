import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/cultural-work",
        destination: "/cultural-work/index.html",
      },
    ];
  },
};

export default nextConfig;
