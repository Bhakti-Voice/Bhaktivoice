import { redirect } from "next/navigation";
import { PATHS } from "@/lib/seo/paths";

export const revalidate = 86400;

export default function PanchangPage() {
  redirect(PATHS.panchangToday);
}
