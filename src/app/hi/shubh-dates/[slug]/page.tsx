import { withHindi } from "@/lib/i18n/hi-route";
import EnDefault, {
  generateMetadata as enMeta,
  generateStaticParams as enStaticParams,
} from "@/app/shubh-dates/[slug]/page";

export const revalidate = 3600;

export const generateStaticParams = enStaticParams;

export const generateMetadata = withHindi(enMeta);

export default withHindi(EnDefault);
