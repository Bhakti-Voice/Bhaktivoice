import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/profile",
        "/account",
        "/settings",
        "/checkout",
        "/cart",
        "/login",
        "/search",
        "/api",
        "/hi/profile",
        "/hi/account",
        "/hi/settings",
        "/hi/checkout",
        "/hi/cart",
        "/hi/login",
        "/hi/search",
      ],
    },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
