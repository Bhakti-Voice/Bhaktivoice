import { proxyToCms } from "@/lib/cms/proxy";

export async function POST(request: Request) {
  return proxyToCms(request, "/api/auth/sync");
}
