"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { withLocale } from "@/lib/i18n/config";
import { useLocale } from "@/lib/i18n/client";

type Props = ComponentProps<typeof Link>;

export function LocaleLink({ href, ...props }: Props) {
  const locale = useLocale();
  const localized =
    typeof href === "string" ? withLocale(href, locale) : href;
  return <Link href={localized} {...props} />;
}
