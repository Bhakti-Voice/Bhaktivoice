import { withHindi } from "@/lib/i18n/hi-route";
import EnDefault, { generateMetadata as enMeta } from "../../../sacred-yatra-guides/planner/page";

export { revalidate } from "../../../sacred-yatra-guides/planner/page";

export const generateMetadata = withHindi(enMeta);

export default withHindi(EnDefault);
