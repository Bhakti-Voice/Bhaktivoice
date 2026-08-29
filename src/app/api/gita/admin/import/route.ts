import { NextRequest, NextResponse } from "next/server";
import { importGitaJson } from "@/lib/gita/storage";
import { validateGitaJson } from "@/lib/gita/validator";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const mode = body.mode === "replace" ? "replace" : "merge";
    const payload = body.data || body;

    // Validate payload
    const validation = validateGitaJson(payload);
    if (!validation.isValid) {
      return NextResponse.json(
        {
          ok: false,
          error: "JSON validation failed.",
          errors: validation.errors,
          warnings: validation.warnings,
        },
        { status: 400 },
      );
    }

    const result = await importGitaJson(payload, mode);

    return NextResponse.json({
      ok: true,
      result,
      summary: {
        totalChapters: validation.totalChapters,
        totalVerses: validation.totalVerses,
        totalWords: validation.totalWords,
        languages: validation.languages,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error?.message || "Failed to process Gita JSON import" },
      { status: 500 },
    );
  }
}
