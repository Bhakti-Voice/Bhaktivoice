import { withHindi } from "@/lib/i18n/hi-route";
import EnDefault, { generateMetadata as enMeta } from "../page";

export { revalidate } from "../page";

export const generateMetadata = withHindi(enMeta);

export default withHindi(EnDefault);
