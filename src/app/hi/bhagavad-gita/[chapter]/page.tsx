import { withHindi } from "@/lib/i18n/hi-route";
import EnPage, {
  generateMetadata as enMeta,
  generateStaticParams as enStaticParams,
} from "@/app/bhagavad-gita/[chapter]/page";

export const revalidate = 86400;
export const generateStaticParams = enStaticParams;
export const generateMetadata = withHindi(enMeta);
export default withHindi(EnPage);
