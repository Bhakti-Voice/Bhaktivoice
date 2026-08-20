import { withHindi } from "@/lib/i18n/hi-route";
import EnDefault, { generateMetadata as enMeta } from "../../../hindu-festivals/[slug]/page";

export { revalidate } from "../../../hindu-festivals/[slug]/page";

export const generateMetadata = withHindi(enMeta);

export default withHindi(EnDefault);
