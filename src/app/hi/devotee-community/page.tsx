import { withHindi } from "@/lib/i18n/hi-route";
import EnDefault, { generateMetadata as enMeta } from "../../devotee-community/page";

export { revalidate } from "../../devotee-community/page";

export const generateMetadata = withHindi(enMeta);

export default withHindi(EnDefault);
