import { withTelugu } from "@/lib/i18n/te-route";
import EnDefault, { generateMetadata as enMeta } from "../../bhakti-store/page";

export const revalidate = 1800;

export const generateMetadata = withTelugu(enMeta);

export default withTelugu(EnDefault);
