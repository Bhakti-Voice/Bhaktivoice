import { NextRequest, NextResponse } from "next/server";
import { getGitaChapter } from "@/lib/gita/storage";

export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ chapter: string }> },
) {
  try {
    const { chapter } = await context.params;
    const chapterNum = parseInt(chapter, 10);
    if (isNaN(chapterNum) || chapterNum < 1 || chapterNum > 108) {
      return NextResponse.json(
        { ok: false, error: "Invalid chapter number. Must be between 1 and 18." },
        { status: 400 },
      );
    }

    const chapterData = await getGitaChapter(chapterNum);
    if (!chapterData) {
      return NextResponse.json(
        { ok: false, error: `Chapter ${chapterNum} not found` },
        { status: 404 },
      );
    }

    return NextResponse.json({
      ok: true,
      chapter: chapterData,
    });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error?.message || "Failed to load Gita chapter" },
      { status: 500 },
    );
  }
}
