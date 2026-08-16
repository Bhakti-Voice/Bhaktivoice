import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function isHindiPath(pathname: string) {
  return pathname === "/hi" || pathname.startsWith("/hi/");
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const locale = isHindiPath(pathname) ? "hi" : "en";
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", locale);

  if (isHindiPath(pathname)) {
    const stripped = pathname === "/hi" ? "/" : pathname.slice(3) || "/";
    const url = request.nextUrl.clone();
    url.pathname = stripped;
    return NextResponse.rewrite(url, {
      request: { headers: requestHeaders },
    });
  }

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|api/|images/|audio/|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)"],
};
