import { withHindi } from "@/lib/i18n/hi-route";
import EnDefault, { generateMetadata as enMeta } from "../../../spiritual-knowledge/[slug]/page";

export { revalidate } from "../../../spiritual-knowledge/[slug]/page";

export const generateMetadata = withHindi(enMeta);

export default withHindi(EnDefault);
