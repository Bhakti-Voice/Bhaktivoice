import { withHindi } from "@/lib/i18n/hi-route";
import EnDefault, { generateMetadata as enMeta } from "../../profile/page";

export { revalidate } from "../../profile/page";

export const generateMetadata = withHindi(enMeta);

export default withHindi(EnDefault);
