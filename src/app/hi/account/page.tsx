import { withHindi } from "@/lib/i18n/hi-route";
import EnDefault, { generateMetadata as enMeta } from "../../account/page";

export { revalidate } from "../../account/page";

export const generateMetadata = withHindi(enMeta);

export default withHindi(EnDefault);
