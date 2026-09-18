import { withTelugu } from "@/lib/i18n/te-route";
import EnDefault from "@/app/(en)/panchang/page";

export const revalidate = 86400;

export default withTelugu(EnDefault);
