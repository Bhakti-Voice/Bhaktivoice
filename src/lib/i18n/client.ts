"use client";

import { usePathname } from "next/navigation";
import { localeFromPath, type Locale } from "./config";
import { messages, type Messages } from "./messages";
import { navMessages, type NavMessages } from "./nav-messages";

export function useLocale(): Locale {
  return localeFromPath(usePathname() || "/");
}

export function useNavMessages(): NavMessages {
  return navMessages[useLocale()];
}

export function useMessages(): Messages {
  return messages[useLocale()];
}
