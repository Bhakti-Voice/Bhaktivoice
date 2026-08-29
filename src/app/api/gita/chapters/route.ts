import { NextResponse } from "next/server";
import { getGitaChapters } from "@/lib/gita/storage";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const chapters = await getGitaChapters();
    return NextResponse.json({
      ok: true,
      chapters,
      total: chapters.length,
    });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error?.message || "Failed to load Gita chapters" },
      { status: 500 },
    );
  }
}
