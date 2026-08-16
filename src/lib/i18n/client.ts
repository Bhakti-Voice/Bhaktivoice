"use client";

import { usePathname } from "next/navigation";
import { localeFromPath, type Locale } from "./config";
import { messages, type Messages } from "./messages";

export function useLocale(): Locale {
  return localeFromPath(usePathname() || "/");
}

export function useMessages(): Messages {
  return messages[useLocale()];
}
