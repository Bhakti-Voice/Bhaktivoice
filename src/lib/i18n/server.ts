import { headers } from "next/headers";
import { DEFAULT_LOCALE, isLocale, type Locale } from "./config";
import { messages, type Messages } from "./messages";

export async function getLocale(): Promise<Locale> {
  const header = (await headers()).get("x-locale");
  return isLocale(header) ? header : DEFAULT_LOCALE;
}

export async function getMessages(): Promise<Messages> {
  const locale = await getLocale();
  return messages[locale];
}
