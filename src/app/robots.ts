import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo/site";

const PREVIEW_DISALLOW = [
  "/*?*preview=*",
  "/*?*admin_preview=*",
  "/api/preview",
  "/api/preview/*",
  "/api/disable-preview",
];

const BOT_DISALLOW = [
  "/admin",
  "/api",
  "/api/",
  "/api/backend",
  ...PREVIEW_DISALLOW,
];

const PRIVATE = [
  "/profile",
  "/account",
  "/settings",
  "/checkout",
  "/cart",
  "/login",
  "/search",
  "/admin",
  "/api",
  "/api/",
  "/api/backend",
  "/hi/profile",
  "/hi/account",
  "/hi/settings",
  "/hi/checkout",
  "/hi/cart",
  "/hi/login",
  "/hi/search",
  ...PREVIEW_DISALLOW,
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: PRIVATE,
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: BOT_DISALLOW,
      },
      {
        userAgent: "Googlebot-Image",
        allow: "/",
        disallow: BOT_DISALLOW,
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: BOT_DISALLOW,
      },
      // AI Search Engines & Generative Search Bots (GEO)
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: PRIVATE,
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: PRIVATE,
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: PRIVATE,
      },
      {
        userAgent: "Applebot-Extended",
        allow: "/",
        disallow: PRIVATE,
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: PRIVATE,
      },
      {
        userAgent: "cohere-ai",
        allow: "/",
        disallow: PRIVATE,
      },
      {
        userAgent: "Meta-ExternalAgent",
        allow: "/",
        disallow: PRIVATE,
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
