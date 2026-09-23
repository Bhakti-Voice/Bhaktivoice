import { permanentRedirect } from "next/navigation";
import { withLocale } from "@/lib/i18n/config";
import { getLocale } from "@/lib/i18n/server";
import { PATHS } from "@/lib/seo/paths";

export default async function FestivalsPagedRedirect() {
  const locale = await getLocale();
  permanentRedirect(withLocale(PATHS.festivals, locale));
}