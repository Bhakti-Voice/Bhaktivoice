import { withHindi } from "@/lib/i18n/hi-route";
import EnDefault, { generateMetadata as enMeta } from "../../sacred-yatra-guides/page";

export const revalidate = 1800;

export const generateMetadata = withHindi(enMeta);

export default withHindi(EnDefault);
