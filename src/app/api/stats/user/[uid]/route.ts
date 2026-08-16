import { proxyToCms } from "@/lib/cms/proxy";

type Props = { params: Promise<{ uid: string }> };

export async function GET(request: Request, { params }: Props) {
  const { uid } = await params;
  return proxyToCms(request, `/api/stats/user/${encodeURIComponent(uid)}`);
}
