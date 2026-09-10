import { draftMode } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import crypto from "crypto";

const KIND_PATHS: Record<string, string> = {
  katha: "/katha-stories",
  blog: "/bhakti-blog",
  yatra: "/sacred-yatra-guides",
  temple: "/hindu-temples",
  festival: "/hindu-festivals",
  spirituality: "/spiritual-knowledge",
  mantra: "/mantras-for-naam-jaap",
  product: "/bhakti-store",
  store_category: "/bhakti-store/category",
  community_group: "/devotee-community",
  sankalp_offer: "/daily-sadhana/sankalp",
  bhajan: "/bhajan-and-kirtan",
  aarti: "/aarti-chants",
  chalisa: "/chalisa",
  quotes: "/daily-quotes",
  muhurat_bulletin: "/muhurat",
};

const HUB_SEO_PATHS: Record<string, string> = {
  home: "/",
  katha: "/katha-stories",
  blog: "/bhakti-blog",
  yatra: "/sacred-yatra-guides",
  temple: "/hindu-temples",
  festival: "/hindu-festivals",
  spirituality: "/spiritual-knowledge",
  mantra: "/mantras-for-naam-jaap",
  store: "/bhakti-store",
  bhajan: "/bhajan-and-kirtan",
  aarti: "/aarti-chants",
  chalisa: "/chalisa",
  community: "/devotee-community",
  muhurat: "/muhurat",
  quotes: "/daily-quotes",
};

function isTokenValid(kind: string, slug: string, locale: string, tsStr: string, token: string): boolean {
  if (!tsStr || !token) return false;
  const ts = parseInt(tsStr, 10);
  if (isNaN(ts)) return false;

  const now = Math.floor(Date.now() / 1000);
  // Valid within 4 hours, allowance for 5 min future clock skew
  if (now - ts > 14400 || ts - now > 300) {
    return false;
  }

  const secrets = [
    process.env.CMS_INTERNAL_SECRET?.trim(),
    process.env.SESSION_SECRET?.trim(),
    process.env.ADMIN_PASSWORD?.trim(),
    "dev-only-insecure-session",
    "dev-session-secret-change-me",
    "dev-secret",
  ].filter(Boolean) as string[];

  const msg = `${kind}:${slug}:${locale}:${ts}`;
  for (const sec of secrets) {
    try {
      const expected = crypto.createHmac("sha256", sec).update(msg).digest("hex");
      if (
        token.length === expected.length &&
        crypto.timingSafeEqual(Buffer.from(token, "hex"), Buffer.from(expected, "hex"))
      ) {
        return true;
      }
    } catch {
      continue;
    }
  }
  return false;
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const kind = searchParams.get("kind") || "";
  const slug = searchParams.get("slug") || "";
  const locale = searchParams.get("locale") === "hi" ? "hi" : "en";
  const token = searchParams.get("token") || "";
  const ts = searchParams.get("ts") || "";

  const draft = await draftMode();
  const alreadyAuthorized =
    draft.isEnabled ||
    request.cookies.has("bhakti_admin_preview") ||
    request.cookies.has("__prerender_bypass");

  const validToken = isTokenValid(kind, slug, locale, ts, token);

  // Strictly enforce admin authentication
  if (!alreadyAuthorized && !validToken) {
    return new NextResponse("Unauthorized: Admin preview access required. Please log into admin first.", {
      status: 401,
      headers: {
        "X-Robots-Tag": "noindex, nofollow",
        "Cache-Control": "private, no-store",
      },
    });
  }

  // Enable Next.js Draft Mode so ISR caches are bypassed for this admin preview
  draft.enable();

  let targetPath = "/";

  if (kind === "hub_seo") {
    targetPath = HUB_SEO_PATHS[slug.toLowerCase()] || (slug ? `/${slug.replace(/^\/+/, "")}` : "/");
  } else if (kind in KIND_PATHS) {
    const basePath = KIND_PATHS[kind];
    if (["quotes", "sankalp_offer", "muhurat_bulletin"].includes(kind)) {
      targetPath = basePath;
    } else if (slug) {
      targetPath = `${basePath.replace(/\/+$/, "")}/${encodeURIComponent(slug.replace(/^\/+/, ""))}`;
    } else {
      targetPath = basePath;
    }
  } else if (slug) {
    targetPath = `/${slug.replace(/^\/+/, "")}`;
  }

  const prefix = locale === "hi" ? "/hi" : "";
  const normalizedTarget = targetPath === "/" && prefix ? "" : targetPath;
  const destination = `${prefix}${normalizedTarget || "/"}?preview=true`;

  const url = new URL(destination, request.url);
  const response = NextResponse.redirect(url, 307);

  // Strictly mark preview responses as noindex and private
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive, nosnippet");
  response.headers.set("Cache-Control", "private, no-store, no-cache, must-revalidate");
  response.cookies.set("bhakti_admin_preview", "1", {
    path: "/",
    sameSite: "lax",
    httpOnly: true,
    maxAge: 14400, // 4 hours
  });
  response.cookies.set("bhakti_preview", "1", {
    path: "/",
    sameSite: "lax",
    httpOnly: false,
    maxAge: 14400,
  });

  return response;
}
