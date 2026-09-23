import { withTelugu } from "@/lib/i18n/te-route";
import EnDefault, { generateMetadata as enMeta } from "@/app/(en)/muhurat/shubh-dates/[slug]/page";

export const revalidate = 3600;

export const generateMetadata = withTelugu(enMeta);

export default withTelugu(EnDefault);
