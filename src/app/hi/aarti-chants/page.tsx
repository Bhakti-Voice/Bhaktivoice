import { withHindi } from "@/lib/i18n/hi-route";
import EnDefault, { generateMetadata as enMeta } from "../../aarti-chants/page";

export { revalidate } from "../../aarti-chants/page";

export const generateMetadata = withHindi(enMeta);

export default withHindi(EnDefault);
