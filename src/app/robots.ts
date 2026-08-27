import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo/site";

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
        disallow: ["/admin", "/api", "/api/", "/api/backend"],
      },
      {
        userAgent: "Googlebot-Image",
        allow: "/",
        disallow: ["/admin", "/api", "/api/", "/api/backend"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/admin", "/api", "/api/", "/api/backend"],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
