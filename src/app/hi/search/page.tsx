import { withHindi } from "@/lib/i18n/hi-route";
import EnDefault, { generateMetadata as enMeta } from "../../search/page";

export { revalidate } from "../../search/page";

export const generateMetadata = withHindi(enMeta);

export default withHindi(EnDefault);
