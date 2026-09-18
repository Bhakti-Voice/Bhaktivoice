import { withTelugu } from "@/lib/i18n/te-route";
import EnDefault, {
  generateMetadata as enMeta,
  generateStaticParams as enStaticParams,
} from "@/app/(en)/bhakti-blog/page/[page]/page";

export const revalidate = 1800;

export const generateStaticParams = enStaticParams;
export const generateMetadata = withTelugu(enMeta);

export default withTelugu(EnDefault);
