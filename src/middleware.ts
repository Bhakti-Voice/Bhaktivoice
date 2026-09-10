import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const previewRequested =
    searchParams.get("preview") === "true" ||
    searchParams.get("preview") === "1" ||
    searchParams.get("admin_preview") === "1";

  const hasAdminAuth =
    request.cookies.has("bhakti_admin_preview") ||
    request.cookies.has("__prerender_bypass");

  // If preview is requested without admin authentication, strip preview params and redirect to clean public URL
  if (previewRequested && !hasAdminAuth && !pathname.startsWith("/api/preview") && !pathname.startsWith("/admin")) {
    const cleanUrl = request.nextUrl.clone();
    cleanUrl.searchParams.delete("preview");
    cleanUrl.searchParams.delete("admin_preview");
    cleanUrl.searchParams.delete("token");
    cleanUrl.searchParams.delete("ts");
    return NextResponse.redirect(cleanUrl);
  }

  const isPreview = (previewRequested && hasAdminAuth) || pathname.startsWith("/api/preview") || pathname.startsWith("/admin");

  const requestHeaders = new Headers(request.headers);
  if (isPreview) {
    requestHeaders.set("x-bhakti-preview", "1");
  }

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  if (isPreview) {
    // Strictly prevent search engines from indexing preview pages
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive, nosnippet");
    // Ensure browsers and CDNs never cache preview pages
    response.headers.set("Cache-Control", "private, no-store, no-cache, must-revalidate");
    // Set preview cookie so subsequent client interactions know preview mode is active
    response.cookies.set("bhakti_preview", "1", {
      path: "/",
      sameSite: "lax",
      httpOnly: false,
    });
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt, etc.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|bmp|woff|woff2|ttf|eot)$).*)",
  ],
};
