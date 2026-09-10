import { draftMode } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const redirectPath = searchParams.get("redirect") || "/";

  // Disable Next.js Draft Mode
  const draft = await draftMode();
  draft.disable();

  // Strip preview parameter from redirect destination if present
  let cleanRedirect = redirectPath.replace(/[?&]preview=[^&]+/, "").replace(/\?$/, "");
  if (!cleanRedirect.startsWith("/")) {
    cleanRedirect = "/";
  }

  const url = new URL(cleanRedirect, request.url);
  const response = NextResponse.redirect(url, 307);

  // Clear preview cookies
  response.cookies.delete("bhakti_preview");
  response.cookies.delete("bhakti_admin_preview");

  return response;
}
