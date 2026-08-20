import { cmsFetchHeaders, cmsUrl } from "@/lib/cms/client";
import { NextResponse } from "next/server";

const LIVE_PATHS = ["/api/jaap", "/api/community", "/api/diary", "/api/saved", "/api/auth"];
const PUBLIC_GETS = ["/api/community/counts"];

function isLivePath(path: string) {
  if (PUBLIC_GETS.some((prefix) => path === prefix || path.startsWith(`${prefix}/`))) return false;
  return LIVE_PATHS.some((prefix) => path === prefix || path.startsWith(`${prefix}/`));
}

function revalidateFor(path: string) {
  if (path.includes("/stats")) return 45;
  if (path.includes("/search")) return 60;
  if (path.includes("/quotes")) return 300;
  if (path.includes("/community/counts")) return 30;
  return 1800;
}

export async function proxyToCms(request: Request, path: string) {
  const incoming = new URL(request.url);
  const target = `${cmsUrl()}${path}${incoming.search}`;
  const method = request.method;
  const isRead = method === "GET" || method === "HEAD";
  const hasAuth = Boolean(request.headers.get("authorization"));
  const live = !isRead || hasAuth || isLivePath(path);
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...Object.fromEntries(new Headers(cmsFetchHeaders()).entries()),
    };
    const authorization = request.headers.get("authorization");
    if (authorization) headers.Authorization = authorization;
    const response = await fetch(target, {
      method,
      headers,
      body: isRead ? undefined : await request.text(),
      ...(live ? { cache: "no-store" as const } : { next: { revalidate: revalidateFor(path) } }),
      signal: AbortSignal.timeout(8000),
    });
    const text = await response.text();
    const cacheControl = live
      ? "private, no-store"
      : response.headers.get("Cache-Control") || "public, max-age=15, s-maxage=60, stale-while-revalidate=300";
    return new NextResponse(text, {
      status: response.status,
      headers: {
        "Content-Type": response.headers.get("Content-Type") ?? "application/json",
        "Cache-Control": cacheControl,
      },
    });
  } catch {
    return NextResponse.json({ ok: false, stored: false, error: "CMS unavailable" }, { status: 503 });
  }
}
