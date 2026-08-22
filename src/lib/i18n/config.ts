export const LOCALES = ["en", "hi"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "en" || value === "hi";
}

/** Next/Vercel sometimes reports the homepage pathname as `/index`. */
function withoutIndexFile(pathname: string): string {
  if (pathname === "/index" || pathname === "/index.html") return "/";
  if (pathname.endsWith("/index")) return pathname.slice(0, -"/index".length) || "/";
  if (pathname.endsWith("/index.html")) return pathname.slice(0, -"/index.html".length) || "/";
  return pathname || "/";
}

export function stripLocale(pathname: string): string {
  const path = withoutIndexFile(pathname || "/");
  if (path === "/hi") return "/";
  if (path.startsWith("/hi/")) {
    const rest = withoutIndexFile(path.slice(3) || "/");
    return rest.startsWith("/") ? rest : `/${rest}`;
  }
  return path;
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
