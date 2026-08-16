import { proxyToCms } from "@/lib/cms/proxy";

export async function GET(request: Request) {
  return proxyToCms(request, "/api/stats");
}
