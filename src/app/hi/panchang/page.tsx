import { redirect } from "next/navigation";
import { withLocale } from "@/lib/i18n/config";
import { PATHS } from "@/lib/seo/paths";

export const revalidate = 86400;

export default function HiPanchangPage() {
  redirect(withLocale(PATHS.panchangToday, "hi"));
}
