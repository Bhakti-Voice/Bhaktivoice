import path from "path";
import type { NextConfig } from "next";

const HTML_CACHE = "public, s-maxage=1800, stale-while-revalidate=86400";
const PRIVATE = "private, no-store";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  compress: true,
  poweredByHeader: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
    staleTimes: {
      dynamic: 300,
      static: 900,
    },
  },

  async redirects() {
    const URL_MIGRATIONS = [
      { from: "/bhagavad-gita", to: "/gita" },
      { from: "/sacred-yatra-guides", to: "/yatra" },
      { from: "/hindu-temples", to: "/temples" },
      { from: "/hindu-festivals", to: "/festivals" },
      { from: "/panchang/festivals", to: "/festivals" },
      { from: "/hindu-calendar", to: "/calendar" },
      { from: "/printable-calendar", to: "/calendar/printable" },
      { from: "/bhakti-blog", to: "/blog" },
      { from: "/bhakti-store", to: "/store" },
      { from: "/mantras-for-naam-jaap", to: "/mantras" },
      { from: "/aarti-chants", to: "/aarti" },
      { from: "/bhajan-and-kirtan", to: "/bhajans" },
      { from: "/katha-stories", to: "/katha" },
      { from: "/daily-sadhana", to: "/sadhana" },
      { from: "/devotee-community", to: "/community" },
      { from: "/vrat-upavas", to: "/vrat" },
      { from: "/kundli-milan", to: "/kundli/milan" },
      { from: "/choghadiya", to: "/muhurat/choghadiya" },
      { from: "/panchak", to: "/muhurat/panchak" },
      { from: "/bhadra", to: "/muhurat/bhadra" },
      { from: "/hora", to: "/muhurat/hora" },
      { from: "/gowri-panchangam", to: "/muhurat/gowri" },
      { from: "/shubh-dates", to: "/muhurat/shubh-dates" },
      { from: "/suvichar-card-maker", to: "/spiritual-tools/suvichar-maker" },
      { from: "/baby-names", to: "/spiritual-tools/baby-names" },
      { from: "/aaj-ki-tithi", to: "/tithi-today" },
      { from: "/daily-quotes", to: "/quotes" },
    ];

    const migrationRedirects = URL_MIGRATIONS.flatMap(({ from, to }) => [
      { source: `${from}/:path*`, destination: `${to}/:path*`, permanent: true },
      { source: `${from}`, destination: `${to}`, permanent: true },
      { source: `/hi${from}/:path*`, destination: `/hi${to}/:path*`, permanent: true },
      { source: `/hi${from}`, destination: `/hi${to}`, permanent: true },
      { source: `/te${from}/:path*`, destination: `/te${to}/:path*`, permanent: true },
      { source: `/te${from}`, destination: `/te${to}`, permanent: true },
    ]);

    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "bhaktivoice.com" }],
        destination: "https://www.bhaktivoice.com/:path*",
        permanent: true,
      },
      { source: "/index", destination: "/", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/hi/index", destination: "/hi", permanent: true },
      { source: "/hi/index.html", destination: "/hi", permanent: true },
      ...migrationRedirects,
    ];
  },
  async headers() {
    const privateSources = [
      "/login",
      "/account",
      "/profile",
      "/cart",
      "/checkout",
      "/settings",
      "/hi/login",
      "/hi/account",
      "/hi/profile",
      "/hi/cart",
      "/hi/checkout",
      "/hi/settings",
    ];
    return [
      {
        source: "/:file(favicon.ico|icon.png|icon-48.png|icon-96.png|icon-192.png|icon-512.png|apple-touch-icon.png|apple-icon.png|logo.png|site.webmanifest)",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
      {
        source: "/:file(llms.txt|llms-full.txt)",
        headers: [
          { key: "Content-Type", value: "text/plain; charset=utf-8" },
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
        ],
      },
      {
        source: "/api/stats",
        headers: [{ key: "Cache-Control", value: "public, max-age=15, s-maxage=45, stale-while-revalidate=300" }],
      },
      {
        source: "/api/quotes",
        headers: [{ key: "Cache-Control", value: "public, max-age=30, s-maxage=300, stale-while-revalidate=3600" }],
      },
      {
        source: "/api/search",
        headers: [{ key: "Cache-Control", value: "public, max-age=30, s-maxage=60, stale-while-revalidate=300" }],
      },
      {
        source: "/api/community/counts",
        headers: [{ key: "Cache-Control", value: "public, max-age=15, s-maxage=30, stale-while-revalidate=120" }],
      },
      ...privateSources.map((source) => ({
        source,
        headers: [{ key: "Cache-Control", value: PRIVATE }],
      })),
      {
        source: "/:path*",
        headers: [
          { key: "Content-Language", value: "en-IN" },
          { key: "Cache-Control", value: HTML_CACHE },
        ],
      },
      {
        source: "/hi",
        headers: [{ key: "Content-Language", value: "hi-IN" }],
      },
      {
        source: "/hi/:path*",
        headers: [{ key: "Content-Language", value: "hi-IN" }],
      },
    ];
  },
  images: {
    // Vercel Services has no /_next/image optimizer (it 404s). Serve public files directly.
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
};

export default nextConfig;
