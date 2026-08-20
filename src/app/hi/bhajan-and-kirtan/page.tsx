import { withHindi } from "@/lib/i18n/hi-route";
import EnDefault, { generateMetadata as enMeta } from "../../bhajan-and-kirtan/page";

export { revalidate } from "../../bhajan-and-kirtan/page";

export const generateMetadata = withHindi(enMeta);

export default withHindi(EnDefault);
