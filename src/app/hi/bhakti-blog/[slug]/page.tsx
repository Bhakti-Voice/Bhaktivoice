import { withHindi } from "@/lib/i18n/hi-route";
import EnDefault, { generateMetadata as enMeta } from "../../../bhakti-blog/[slug]/page";

export { revalidate } from "../../../bhakti-blog/[slug]/page";

export const generateMetadata = withHindi(enMeta);

export default withHindi(EnDefault);
