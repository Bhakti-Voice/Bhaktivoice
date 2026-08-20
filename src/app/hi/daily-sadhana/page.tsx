import { withHindi } from "@/lib/i18n/hi-route";
import EnDefault, { generateMetadata as enMeta } from "../../daily-sadhana/page";

export { revalidate } from "../../daily-sadhana/page";

export const generateMetadata = withHindi(enMeta);

export default withHindi(EnDefault);
