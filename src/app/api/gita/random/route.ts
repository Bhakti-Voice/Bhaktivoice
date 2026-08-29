import { NextResponse } from "next/server";
import { getRandomGitaVerse } from "@/lib/gita/storage";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const verse = await getRandomGitaVerse();
    return NextResponse.json({
      ok: true,
      verse,
    });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error?.message || "Failed to load random Gita verse" },
      { status: 500 },
    );
  }
}
