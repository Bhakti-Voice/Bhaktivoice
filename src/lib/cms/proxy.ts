import { cmsFetchHeaders, cmsUrl } from "@/lib/cms/client";
import { NextResponse } from "next/server";

export async function proxyToCms(request: Request, path: string) {
  const incoming = new URL(request.url);
  const target = `${cmsUrl()}${path}${incoming.search}`;
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...Object.fromEntries(new Headers(cmsFetchHeaders()).entries()),
    };
    const response = await fetch(target, {
      method: request.method,
      headers,
      body: request.method === "GET" || request.method === "HEAD" ? undefined : await request.text(),
      cache: "no-store",
      signal: AbortSignal.timeout(12000),
    });
    const text = await response.text();
    return new NextResponse(text, {
      status: response.status,
      headers: { "Content-Type": response.headers.get("Content-Type") ?? "application/json" },
    });
  } catch {
    return NextResponse.json({ ok: false, stored: false, error: "CMS unavailable" }, { status: 503 });
  }
}
