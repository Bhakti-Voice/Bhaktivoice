import { withHindi } from "@/lib/i18n/hi-route";
import EnDefault, { generateMetadata as enMeta } from "../../bhakti-store/page";

export { revalidate } from "../../bhakti-store/page";

export const generateMetadata = withHindi(enMeta);

export default withHindi(EnDefault);
