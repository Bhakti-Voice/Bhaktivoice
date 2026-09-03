import { NextResponse } from "next/server";
import { submitToIndexNow } from "@/lib/seo/indexnow";
import { SITE } from "@/lib/seo/site";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const urls: string[] = Array.isArray(body.urls) && body.urls.length > 0
      ? body.urls
      : [
          SITE.url,
          `${SITE.url}/panchang/today`,
          `${SITE.url}/aaj-ki-tithi`,
          `${SITE.url}/bhagavad-gita`,
          `${SITE.url}/spiritual-tools`,
          `${SITE.url}/suvichar-card-maker`,
          `${SITE.url}/kundli`,
          `${SITE.url}/chalisa`,
          `${SITE.url}/mantras-for-naam-jaap`,
          `${SITE.url}/hindu-calendar`,
        ];

    const result = await submitToIndexNow(urls);
    return NextResponse.json(result, { status: result.ok ? 200 : 500 });
  } catch (error) {
    return NextResponse.json(
      { ok: false, message: error instanceof Error ? error.message : "Error in IndexNow route" },
      { status: 500 }
    );
  }
}
