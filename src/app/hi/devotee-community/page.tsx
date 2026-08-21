import { withHindi } from "@/lib/i18n/hi-route";
import EnDefault, { generateMetadata as enMeta } from "../../devotee-community/page";

export const revalidate = 300;

export const generateMetadata = withHindi(enMeta);

export default withHindi(EnDefault);
