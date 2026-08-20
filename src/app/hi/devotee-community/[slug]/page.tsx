import { withHindi } from "@/lib/i18n/hi-route";
import EnDefault, { generateMetadata as enMeta } from "../../../devotee-community/[slug]/page";

export { revalidate } from "../../../devotee-community/[slug]/page";

export const generateMetadata = withHindi(enMeta);

export default withHindi(EnDefault);
