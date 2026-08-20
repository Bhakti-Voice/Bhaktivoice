import { withHindi } from "@/lib/i18n/hi-route";
import EnDefault, { generateMetadata as enMeta } from "../../login/page";

export { revalidate } from "../../login/page";

export const generateMetadata = withHindi(enMeta);

export default withHindi(EnDefault);
