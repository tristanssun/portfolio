import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Short links to research PDFs (e.g. tristansun.com/afib)
  async redirects() {
    return [
      {
        source: "/alzheimers",
        destination: "/research/single-nucleus-alzheimers-comorbidities.pdf",
        permanent: false,
      },
      {
        source: "/afib",
        destination: "/research/omega-3-fatty-acids-atrial-fibrillation.pdf",
        permanent: false,
      },
      {
        source: "/spheres",
        destination: "/research/diophantine-approximations-on-spheres.pdf",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
