import { withHindi } from "@/lib/i18n/hi-route";
import EnDefault, { generateMetadata as enMeta } from "@/app/kundli/page";

export const revalidate = 86400;
export const generateMetadata = withHindi(enMeta);
export default withHindi(EnDefault);
