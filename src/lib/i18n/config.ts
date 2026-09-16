export const LOCALES = ["en", "hi", "te"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "en" || value === "hi" || value === "te";
}

export function stripLocale(pathname: string): string {
  if (pathname === "/hi" || pathname === "/te") return "/";
  if (pathname.startsWith("/hi/")) {
    const rest = pathname.slice(3);
    return rest.startsWith("/") ? rest : `/${rest}`;
  }
  if (pathname.startsWith("/te/")) {
    const rest = pathname.slice(3);
    return rest.startsWith("/") ? rest : `/${rest}`;
  }
  return pathname || "/";
}

export function withLocale(path: string, locale: Locale): string {
  if (!path) return locale === "hi" ? "/hi" : locale === "te" ? "/te" : "/";
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("//") ||
    path.startsWith("mailto:") ||
    path.startsWith("tel:")
  ) {
    return path;
  }
  const [withoutHash, hash] = path.split("#");
  const [rawPath, search] = (withoutHash || "/").split("?");
  const clean = stripLocale(rawPath || "/");
  const prefix = locale === "hi" ? "/hi" : locale === "te" ? "/te" : "";
  const prefixed =
    prefix ? (clean === "/" ? prefix : `${prefix}${clean}`) : clean === "" ? "/" : clean;
  const withSearch = search ? `${prefixed}?${search}` : prefixed;
  return hash ? `${withSearch}#${hash}` : withSearch;
}

export function localeFromPath(pathname: string): Locale {
  if (pathname === "/hi" || pathname.startsWith("/hi/")) return "hi";
  if (pathname === "/te" || pathname.startsWith("/te/")) return "te";
  return "en";
}

