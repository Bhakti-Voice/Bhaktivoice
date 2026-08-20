import path from "path";
import type { NextConfig } from "next";

const HTML_CACHE = "public, s-maxage=1800, stale-while-revalidate=86400";
const PRIVATE = "private, no-store";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  compress: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ["lucide-react"],
    staleTimes: {
      dynamic: 300,
      static: 900,
    },
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "bhaktivoice.com" }],
        destination: "https://www.bhaktivoice.com/:path*",
        permanent: true,
      },
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
    ],
  },
};

export default nextConfig;
