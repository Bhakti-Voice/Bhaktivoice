import { withTelugu } from "@/lib/i18n/te-route";
import EnDefault, { generateMetadata as enMeta } from "../../hora/page";

export const revalidate = 300;

export const generateMetadata = withTelugu(enMeta);

export default withTelugu(EnDefault);
