import { withHindi } from "@/lib/i18n/hi-route";
import EnDefault, { generateMetadata as enMeta } from "../../printable-calendar/page";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const generateMetadata = withHindi(enMeta);
export default withHindi(EnDefault);
