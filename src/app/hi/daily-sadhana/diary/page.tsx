import { withHindi } from "@/lib/i18n/hi-route";
import EnDefault, { generateMetadata as enMeta } from "../../../daily-sadhana/diary/page";

export const revalidate = 3600;

export const generateMetadata = withHindi(enMeta);

export default withHindi(EnDefault);
