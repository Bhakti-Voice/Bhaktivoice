import { proxyToCms } from "@/lib/cms/proxy";

export async function GET(request: Request) {
  return proxyToCms(request, "/api/diary");
}

export async function POST(request: Request) {
  return proxyToCms(request, "/api/diary");
}
