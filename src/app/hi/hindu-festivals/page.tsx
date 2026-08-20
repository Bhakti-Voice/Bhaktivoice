import { withHindi } from "@/lib/i18n/hi-route";
import EnDefault, { generateMetadata as enMeta } from "../../hindu-festivals/page";

export { revalidate } from "../../hindu-festivals/page";

export const generateMetadata = withHindi(enMeta);

export default withHindi(EnDefault);
