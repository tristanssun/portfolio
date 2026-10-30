import type { NextConfig } from "next";

const fundraiser = process.env.FUNDRAISER_ORIGIN || "https://aws.pie4cancer.org";

const nextConfig: NextConfig = {
  async headers() {
    return ["/board", "/admin", "/webpages/pie-an-ap", "/webpages/pie-an-ap/board", "/webpages/pie-an-ap/admin"].map(source => ({
      source,
      headers: [{ key: "Vercel-CDN-Cache-Control", value: "no-store" }],
    }));
  },
  async redirects() {
    return [
      { source: "/donate", destination: "https://app.schoolfundr.org/fund/hpstucowokc", permanent: false },
      // Short links to research PDFs
      { source: "/alzheimers", destination: "/research/single-nucleus-alzheimers-comorbidities.pdf", permanent: false },
      { source: "/afib", destination: "/research/omega-3-fatty-acids-atrial-fibrillation.pdf", permanent: false },
      { source: "/spheres", destination: "/research/diophantine-approximations-on-spheres.pdf", permanent: false },
    ];
  },
  async rewrites() {
    return { fallback: [
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
    ] };
  },
};

export default nextConfig;
