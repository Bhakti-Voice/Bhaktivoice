import { withHindi } from "@/lib/i18n/hi-route";
import EnDefault, {
  generateMetadata as enMeta,
  generateStaticParams as enStaticParams,
} from "@/app/panchang/festivals/[slug]/page";

export const revalidate = 86400;

export const generateStaticParams = enStaticParams;

export const generateMetadata = withHindi(enMeta);

export default withHindi(EnDefault);
