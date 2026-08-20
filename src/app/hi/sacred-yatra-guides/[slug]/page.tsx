import { withHindi } from "@/lib/i18n/hi-route";
import EnDefault, { generateMetadata as enMeta } from "../../../sacred-yatra-guides/[slug]/page";

export { revalidate } from "../../../sacred-yatra-guides/[slug]/page";

export const generateMetadata = withHindi(enMeta);

export default withHindi(EnDefault);
