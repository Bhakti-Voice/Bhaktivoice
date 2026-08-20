import { withHindi } from "@/lib/i18n/hi-route";
import EnDefault, { generateMetadata as enMeta } from "../../daily-quotes/page";

export { revalidate } from "../../daily-quotes/page";

export const generateMetadata = withHindi(enMeta);

export default withHindi(EnDefault);
