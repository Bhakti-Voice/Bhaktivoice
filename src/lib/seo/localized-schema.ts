import { getLocale } from "@/lib/i18n/server";
import { articleSchema, itemListSchema } from "@/lib/seo/schema";

export async function localizedItemListSchema(
  name: string,
  items: { name: string; url: string }[],
) {
  return itemListSchema(name, items, await getLocale());
}

export async function localizedArticleSchema(
  input: Parameters<typeof articleSchema>[0],
) {
  return articleSchema({ ...input, locale: input.locale ?? (await getLocale()) });
}
