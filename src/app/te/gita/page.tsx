import { withTelugu } from "@/lib/i18n/te-route";
import EnDefault, { generateMetadata as enMeta } from "@/app/(en)/gita/page";


export const generateMetadata = withTelugu(enMeta);

export default withTelugu(EnDefault);
