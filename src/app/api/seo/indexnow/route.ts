import { NextResponse } from "next/server";
import { submitToIndexNow } from "@/lib/seo/indexnow";
import { SITE } from "@/lib/seo/site";
import { PATHS } from "@/lib/seo/paths";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const urls: string[] = Array.isArray(body.urls) && body.urls.length > 0
      ? body.urls
      : [
          SITE.url,
          `${SITE.url}/panchang/today`,
          `${SITE.url}${PATHS.tithi}`,
          `${SITE.url}${PATHS.gita}`,
          `${SITE.url}${PATHS.spiritualTools}`,
          `${SITE.url}${PATHS.suvicharMaker}`,
          `${SITE.url}${PATHS.kundli}`,
          `${SITE.url}${PATHS.chalisa}`,
          `${SITE.url}${PATHS.mantras}`,
          `${SITE.url}${PATHS.calendar}`,
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
