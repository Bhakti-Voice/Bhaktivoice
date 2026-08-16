import { getLocale } from "@/lib/i18n/server";
import type { Metadata } from "next";
import { DEFAULT_LOCALE, stripLocale, withLocale, type Locale } from "@/lib/i18n/config";
import { SITE, absoluteUrl } from "./site";

export type BuildMetaInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  noIndex?: boolean;
  keywords?: string[];
  absoluteTitle?: boolean;
  locale?: Locale;
};

export function buildMetadata({
  title,
  description,
  path,
  image = "/images/krishna-hero.png",
  imageAlt = "Lord Krishna playing the flute by a river at sunset",
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  noIndex = false,
  keywords,
  absoluteTitle = false,
  locale = DEFAULT_LOCALE,
}: BuildMetaInput): Metadata {
  const clean = stripLocale(path);
  const localizedPath = withLocale(clean, locale);
  const url = absoluteUrl(localizedPath);
  const enUrl = absoluteUrl(clean);
  const hiUrl = absoluteUrl(withLocale(clean, "hi"));
  const imageUrl = image.startsWith("http") ? image : absoluteUrl(image);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords,
    alternates: {
      canonical: url,
      languages: {
        "en-IN": enUrl,
        "hi-IN": hiUrl,
        "x-default": enUrl,
      },
    },
    robots: noIndex
      ? { index: false, follow: true }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      locale: locale === "hi" ? "hi_IN" : "en_IN",
      type,
      publishedTime,
      modifiedTime,
      authors,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: SITE.twitter,
      title,
      description,
      images: [imageUrl],
    },
  };
}

export async function localizedMetadata(input: Omit<BuildMetaInput, "locale">): Promise<Metadata> {
  return buildMetadata({ ...input, locale: await getLocale() });
}
