import { withHindi } from "@/lib/i18n/hi-route";
import EnDefault, { generateMetadata as enMeta } from "../../settings/page";

export { revalidate } from "../../settings/page";

export const generateMetadata = withHindi(enMeta);

export default withHindi(EnDefault);
