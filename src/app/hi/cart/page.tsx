import { withHindi } from "@/lib/i18n/hi-route";
import EnDefault, { generateMetadata as enMeta } from "../../cart/page";

export { revalidate } from "../../cart/page";

export const generateMetadata = withHindi(enMeta);

export default withHindi(EnDefault);
