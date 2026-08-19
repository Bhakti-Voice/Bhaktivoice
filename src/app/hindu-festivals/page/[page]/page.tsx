import { redirect } from "next/navigation";
import { withLocale } from "@/lib/i18n/config";
import { getLocale } from "@/lib/i18n/server";
import { PATHS } from "@/lib/seo/paths";

type Props = { params: Promise<{ page: string }> };

export default async function FestivalsPagedRedirect({ params }: Props) {
  const { page } = await params;
  const pageNumber = Number(page);
  const locale = await getLocale();
  if (!Number.isInteger(pageNumber) || pageNumber < 2) {
    redirect(withLocale(PATHS.festivals, locale));
  }
  redirect(withLocale(`${PATHS.festivals}?page=${pageNumber}`, locale));
}
