import { withHindi } from "@/lib/i18n/hi-route";
import EnDefault, { generateMetadata as enMeta } from "../../checkout/page";

export { revalidate } from "../../checkout/page";

export const generateMetadata = withHindi(enMeta);

export default withHindi(EnDefault);
