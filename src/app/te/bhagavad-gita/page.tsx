import { withTelugu } from "@/lib/i18n/te-route";
import EnDefault, { generateMetadata as enMeta } from "../../bhagavad-gita/page";


export const generateMetadata = withTelugu(enMeta);

export default withTelugu(EnDefault);
