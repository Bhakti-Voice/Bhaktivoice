import { NextRequest, NextResponse } from "next/server";
import { getGitaVerse } from "@/lib/gita/storage";

export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ chapter: string; verse: string }> },
) {
  try {
    const { chapter, verse } = await context.params;
    const chapterNum = parseInt(chapter, 10);
    const verseNum = parseInt(verse, 10);

    if (isNaN(chapterNum) || isNaN(verseNum)) {
      return NextResponse.json(
        { ok: false, error: "Invalid chapter or verse number." },
        { status: 400 },
      );
    }

    const result = await getGitaVerse(chapterNum, verseNum);
    if (!result.verse) {
      return NextResponse.json(
        { ok: false, error: `Verse ${chapterNum}.${verseNum} not found` },
        { status: 404 },
      );
    }

    return NextResponse.json({
      ok: true,
      verse: result.verse,
      chapter: result.chapter,
      previous: result.previous,
      next: result.next,
    });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error?.message || "Failed to load Gita verse" },
      { status: 500 },
    );
  }
}
