import { withHindi } from "@/lib/i18n/hi-route";
import EnDefault, { generateMetadata as enMeta } from "../../aaj-ki-tithi/page";

export const revalidate = 3600;

export const generateMetadata = withHindi(enMeta);

export default withHindi(EnDefault);
