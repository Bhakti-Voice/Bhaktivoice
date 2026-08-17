import { readFile } from "node:fs/promises";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-static";

export async function GET() {
  const body = await readFile(new URL("./icon.ico", import.meta.url));
  return new NextResponse(body, {
    headers: {
      "Content-Type": "image/x-icon",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}

export function HEAD() {
  return new NextResponse(null, {
    headers: {
      "Content-Type": "image/x-icon",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
