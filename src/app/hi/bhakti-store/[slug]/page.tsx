import { withHindi } from "@/lib/i18n/hi-route";
import EnDefault, { generateMetadata as enMeta } from "../../../bhakti-store/[slug]/page";

export const revalidate = 1800;

export const generateMetadata = withHindi(enMeta);

export default withHindi(EnDefault);
