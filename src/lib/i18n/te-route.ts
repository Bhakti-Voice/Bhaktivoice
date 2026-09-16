import type { Locale } from "./config";
import { setRequestLocale } from "./server";

/** Bind a page or `generateMetadata` to a locale route tree so CMS + copy stay ISR-friendly. */
export function withLocale<A extends unknown[], R>(locale: Locale, fn: (...args: A) => R) {
  return (...args: A): R => {
    setRequestLocale(locale);
    return fn(...args);
  };
}

export function withTelugu<A extends unknown[], R>(fn: (...args: A) => R) {
  return withLocale("te", fn);
}
