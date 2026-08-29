import { NextResponse } from "next/server";
import { getGitaStats } from "@/lib/gita/storage";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const stats = await getGitaStats();
    return NextResponse.json({
      ok: true,
      stats,
    });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error?.message || "Failed to load Gita statistics" },
      { status: 500 },
    );
  }
}
