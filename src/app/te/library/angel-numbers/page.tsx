import { withTelugu } from "@/lib/i18n/te-route";
import EnDefault, { generateMetadata as enMeta } from "@/app/(en)/library/angel-numbers/page";

export const revalidate = 1800;

export const generateMetadata = withTelugu(enMeta);

export default withTelugu(EnDefault);
