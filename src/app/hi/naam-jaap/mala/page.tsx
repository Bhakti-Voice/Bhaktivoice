import { withHindi } from "@/lib/i18n/hi-route";
import EnDefault, { generateMetadata as enMeta } from "../../../naam-jaap/mala/page";

export { revalidate } from "../../../naam-jaap/mala/page";

export const generateMetadata = withHindi(enMeta);

export default withHindi(EnDefault);
