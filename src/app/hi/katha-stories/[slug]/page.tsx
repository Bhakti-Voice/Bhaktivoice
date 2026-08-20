import { withHindi } from "@/lib/i18n/hi-route";
import EnDefault, { generateMetadata as enMeta } from "../../../katha-stories/[slug]/page";

export { revalidate } from "../../../katha-stories/[slug]/page";

export const generateMetadata = withHindi(enMeta);

export default withHindi(EnDefault);
