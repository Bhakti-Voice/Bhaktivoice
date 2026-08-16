import { cmsUrl } from "@/lib/cms/client";
import { NextResponse } from "next/server";

export async function proxyToCms(request: Request, path: string) {
  const incoming = new URL(request.url);
  const url = new URL(path, `${cmsUrl()}/`);
  incoming.searchParams.forEach((value, key) => url.searchParams.set(key, value));
  try {
    const response = await fetch(url.toString(), {
      method: request.method,
      headers: { "Content-Type": "application/json" },
      body: request.method === "GET" || request.method === "HEAD" ? undefined : await request.text(),
      cache: "no-store",
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
