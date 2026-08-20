import { withHindi } from "@/lib/i18n/hi-route";
import EnDefault, { generateMetadata as enMeta } from "../../spiritual-knowledge/page";

export { revalidate } from "../../spiritual-knowledge/page";

export const generateMetadata = withHindi(enMeta);

export default withHindi(EnDefault);
