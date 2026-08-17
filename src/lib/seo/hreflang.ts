import { stripLocale, withLocale } from "@/lib/i18n/config";
import { absoluteUrl } from "./site";

export type HreflangMap = {
  "en-IN": string;
  "hi-IN": string;
  "x-default": string;
};

/** English URL, Hindi URL, and x-default (English) for the same page. */
export function hreflangForPath(path: string): HreflangMap {
  const clean = stripLocale((path.split("?")[0] || "/").split("#")[0] || "/");
  const en = absoluteUrl(clean);
  const hi = absoluteUrl(withLocale(clean, "hi"));
  return {
    "en-IN": en,
    "hi-IN": hi,
    "x-default": en,
  };
}
