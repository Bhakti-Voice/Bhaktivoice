import { NextResponse } from "next/server";
import { unifiedSearch } from "@/lib/search/unified-search";
import { cmsUrl } from "@/lib/cms/client";
import type { SearchHit } from "@/lib/cms/client";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") ?? "").trim();
  const locale = (searchParams.get("locale") ?? "en") === "hi" ? "hi" : "en";
  const format = searchParams.get("format");

  if (!q) {
    if (format === "array") {
      return NextResponse.json([]);
    }
    return NextResponse.json({ results: [], directAnswer: null, total: 0 });
  }

  // 1. Run local unified search (instant, guaranteed zero-downtime)
  const unified = await unifiedSearch(q, locale);
  const combinedHits: SearchHit[] = [...unified.results];

  // 2. Opportunistically augment with CMS hits if backend is available
  try {
    const cmsController = new AbortController();
    const timeoutId = setTimeout(() => cmsController.abort(), 1200);

    const cmsRes = await fetch(`${cmsUrl()}/api/search?q=${encodeURIComponent(q)}&locale=${locale}`, {
      signal: cmsController.signal,
    }).catch(() => null);

    clearTimeout(timeoutId);

    if (cmsRes && cmsRes.ok) {
      const cmsData = await cmsRes.json().catch(() => []);
      if (Array.isArray(cmsData)) {
        const existingHrefs = new Set(combinedHits.map((h) => h.href));
        for (const hit of cmsData) {
          if (hit.href && !existingHrefs.has(hit.href)) {
            existingHrefs.add(hit.href);
            combinedHits.push(hit);
          }
        }
      }
    }
  } catch {
    // Gracefully ignore CMS network timeouts and rely on unified results
  }

  if (format === "array") {
    return NextResponse.json(combinedHits);
  }

  return NextResponse.json({
    results: combinedHits,
    directAnswer: unified.directAnswer,
    total: combinedHits.length,
  });
}
