import { proxyToCms } from "@/lib/cms/proxy";

export async function GET(request: Request) {
  return proxyToCms(request, "/api/saved");
}

export async function POST(request: Request) {
  return proxyToCms(request, "/api/saved");
}
