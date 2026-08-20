import { withHindi } from "@/lib/i18n/hi-route";
import EnDefault, { generateMetadata as enMeta } from "../../../mantras-for-naam-jaap/[slug]/page";

export { revalidate } from "../../../mantras-for-naam-jaap/[slug]/page";

export const generateMetadata = withHindi(enMeta);

export default withHindi(EnDefault);
