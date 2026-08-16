import { headers } from "next/headers";
import { DEFAULT_LOCALE, isLocale, localeFromPath, type Locale } from "./config";
import { messages, type Messages } from "./messages";

export async function getLocale(): Promise<Locale> {
  const h = await headers();
  const header = h.get("x-locale");
  if (isLocale(header)) return header;
  const nextUrl = h.get("next-url");
  if (nextUrl) return localeFromPath(nextUrl.split("?")[0] || "/");
  return DEFAULT_LOCALE;
}

export async function getMessages(): Promise<Messages> {
  const locale = await getLocale();
  return messages[locale];
}
