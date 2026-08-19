import { proxyToCms } from "@/lib/cms/proxy";

type Props = { params: Promise<{ slug: string }> };

export async function POST(request: Request, { params }: Props) {
  const { slug } = await params;
  return proxyToCms(request, `/api/community/${encodeURIComponent(slug)}/join`);
}
