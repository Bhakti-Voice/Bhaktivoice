import { SITE, absoluteUrl } from "./site";
import { DEFAULT_LOCALE, withLocale, type Locale } from "@/lib/i18n/config";
import type { BreadcrumbItem, Faq } from "@/lib/content/types";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    slogan: SITE.tagline,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/logo.png"),
      width: 192,
      height: 192,
    },
    sameAs: [],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    name: SITE.name,
    url: `${SITE.url}/`,
    description: SITE.description,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE.url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}

export function articleSchema(input: {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  author: string;
  path: string;
  locale?: Locale;
}) {
  const pageUrl = absoluteUrl(withLocale(input.path, input.locale ?? DEFAULT_LOCALE));
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.headline,
    description: input.description,
    image: input.image.startsWith("http") ? input.image : absoluteUrl(input.image),
    datePublished: input.datePublished,
    dateModified: input.dateModified,
    author: {
      "@type": "Person",
      name: input.author,
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/logo.png"),
      },
    },
    inLanguage: (input.locale ?? DEFAULT_LOCALE) === "hi" ? "hi-IN" : "en-IN",
    mainEntityOfPage: pageUrl,
  };
}

export function faqSchema(faqs: Faq[]) {
  if (!faqs.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function itemListSchema(
  name: string,
  items: { name: string; url: string }[],
  locale: Locale = DEFAULT_LOCALE,
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: item.url.startsWith("http") ? item.url : absoluteUrl(withLocale(item.url, locale)),
    })),
  };
}

export function touristDestinationSchema(input: {
  name: string;
  description: string;
  image: string;
  path: string;
  locale?: Locale;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: input.name,
    description: input.description,
    image: input.image.startsWith("http") ? input.image : absoluteUrl(input.image),
    url: absoluteUrl(withLocale(input.path, input.locale ?? DEFAULT_LOCALE)),
    inLanguage: (input.locale ?? DEFAULT_LOCALE) === "hi" ? "hi-IN" : "en-IN",
  };
}

export function touristAttractionSchema(input: {
  name: string;
  description: string;
  image: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: input.name,
    description: input.description,
    image: input.image.startsWith("http") ? input.image : absoluteUrl(input.image),
    url: absoluteUrl(input.path),
  };
}

export function productSchema(input: {
  name: string;
  description: string;
  image: string;
  path: string;
  priceInr: number;
  outOfStock?: boolean;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: input.name,
    description: input.description,
    image: input.image.startsWith("http") ? input.image : absoluteUrl(input.image),
    url: absoluteUrl(input.path),
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: input.priceInr,
      availability: input.outOfStock
        ? "https://schema.org/OutOfStock"
        : "https://schema.org/InStock",
    },
  };
}
