export const LOCALES = ["en", "hi"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "en" || value === "hi";
}

export function stripLocale(pathname: string): string {
  if (pathname === "/hi") return "/";
  if (pathname.startsWith("/hi/")) {
    const rest = pathname.slice(3);
    return rest.startsWith("/") ? rest : `/${rest}`;
  }
  return pathname || "/";
}

export function withLocale(path: string, locale: Locale): string {
  const [withoutHash, hash] = path.split("#");
  const [rawPath, search] = (withoutHash || "/").split("?");
  const clean = stripLocale(rawPath || "/");
  const prefixed =
    locale === "hi" ? (clean === "/" ? "/hi" : `/hi${clean}`) : clean === "" ? "/" : clean;
  const withSearch = search ? `${prefixed}?${search}` : prefixed;
  return hash ? `${withSearch}#${hash}` : withSearch;
}

export function localeFromPath(pathname: string): Locale {
  return pathname === "/hi" || pathname.startsWith("/hi/") ? "hi" : "en";
}
