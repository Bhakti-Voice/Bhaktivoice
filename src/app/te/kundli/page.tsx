import { withTelugu } from "@/lib/i18n/te-route";
import EnDefault, { generateMetadata as enMeta } from "../../kundli/page";

export const revalidate = 86400;

export const generateMetadata = withTelugu(enMeta);

export default withTelugu(EnDefault);
