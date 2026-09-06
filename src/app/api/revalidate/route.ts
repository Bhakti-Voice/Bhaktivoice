import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  return handleRevalidate(request);
}

export async function GET(request: NextRequest) {
  return handleRevalidate(request);
}

async function handleRevalidate(request: NextRequest) {
  const secret = process.env.CMS_INTERNAL_SECRET || process.env.SESSION_SECRET || "";
  const authHeader = request.headers.get("x-bhakti-internal") || "";
  const token = request.nextUrl.searchParams.get("secret") || "";

  if (secret && authHeader !== secret && token !== secret) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  const path = request.nextUrl.searchParams.get("path");
  const kind = request.nextUrl.searchParams.get("kind");
  const slug = request.nextUrl.searchParams.get("slug");

  try {
    revalidateTag("cms");
    if (path) {
      revalidatePath(path);
      if (!path.startsWith("/hi")) {
        revalidatePath(`/hi${path}`);
      }
    }
    if (kind && slug) {
      const paths = [
        `/${kind}/${slug}`,
        `/hi/${kind}/${slug}`,
        `/bhakti-blog/${slug}`,
        `/hi/bhakti-blog/${slug}`,
        `/katha-stories/${slug}`,
        `/hi/katha-stories/${slug}`,
        `/sacred-yatra-guides/${slug}`,
        `/hi/sacred-yatra-guides/${slug}`,
        `/hindu-temples/${slug}`,
        `/hi/hindu-temples/${slug}`,
        `/hindu-festivals/${slug}`,
        `/hi/hindu-festivals/${slug}`,
        `/mantras-for-naam-jaap/${slug}`,
        `/hi/mantras-for-naam-jaap/${slug}`,
      ];
      for (const p of paths) {
        try {
          revalidatePath(p);
        } catch {}
      }
    }
    return NextResponse.json({ ok: true, revalidated: true, now: Date.now() });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Revalidation error" },
      { status: 500 },
    );
  }
}
