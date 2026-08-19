import { proxyToCms } from "@/lib/cms/proxy";

type Props = { params: Promise<{ slug: string; id: string }> };

export async function POST(request: Request, { params }: Props) {
  const { slug, id } = await params;
  return proxyToCms(
    request,
    `/api/community/${encodeURIComponent(slug)}/threads/${encodeURIComponent(id)}/replies`,
  );
}
