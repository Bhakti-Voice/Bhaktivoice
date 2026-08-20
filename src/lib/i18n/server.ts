import "server-only";
import { cache } from "react";
import { DEFAULT_LOCALE, isLocale, type Locale } from "./config";
import { messages, type Messages } from "./messages";

/** Per-request locale. Set from the `/hi` route tree — never from `headers()`, which would dynamize ISR. */
const localeRef = cache((): { current: Locale } => ({ current: DEFAULT_LOCALE }));

export function setRequestLocale(locale: Locale) {
  localeRef().current = isLocale(locale) ? locale : DEFAULT_LOCALE;
}

export async function getLocale(): Promise<Locale> {
  return localeRef().current;
}

export async function getMessages(): Promise<Messages> {
  return messages[localeRef().current];
}
