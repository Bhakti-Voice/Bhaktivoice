export type ContentStatus = "published" | "draft";

export type RelatedLink = {
  href: string;
  label: string;
  kind:
    | "yatra"
    | "temple"
    | "mantra"
    | "festival"
    | "katha"
    | "blog"
    | "spirituality"
    | "product"
    | "page";
};

export type Faq = {
  question: string;
  answer: string;
};

export type BreadcrumbItem = {
  name: string;
  href: string;
};

export type SeoPage = {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  introduction: string;
  heroImage: string;
  heroImageAlt: string;
  category: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  lastReviewed?: string;
  relatedArticles: RelatedLink[];
  relatedDestinations: RelatedLink[];
  relatedTemples: RelatedLink[];
  relatedMantras: RelatedLink[];
  relatedFestivals: RelatedLink[];
  relatedKatha: RelatedLink[];
  faqs: Faq[];
  breadcrumbs: BreadcrumbItem[];
  schemaType:
    | "Article"
    | "TouristDestination"
    | "TouristAttraction"
    | "FAQPage"
    | "Product"
    | "WebPage";
  status: ContentStatus;
  cta: {
    title: string;
    body: string;
    href: string;
    label: string;
  };
};

export type MantraPage = SeoPage & {
  mantra: string;
  pronunciation: string;
  suggestedCount: string;
  deity: string;
  howToChant: string[];
  significance: string;
  traditionalBenefits: string[];
};

export type YatraPage = SeoPage & {
  destination: string;
  state: string;
  category: "destination" | "itinerary" | "places" | "darshan";
  filters: string[];
  whyVisit: string;
  significance: string;
  places: { name: string; note: string; href?: string }[];
  temples: RelatedLink[];
  bestTime: string;
  howToReach: string;
  itinerary: { day: string; plan: string }[];
  nearby: string[];
  food: string;
  stay: string;
  tips: string[];
};

export type TemplePage = SeoPage & {
  deity: string;
  location: string;
  destinationSlug: string;
  history: string;
  architecture: string;
  bestTime: string;
  timingsNote: string;
  darshanNote: string;
  howToReach: string;
  nearbyPlaces: string[];
};

export type FestivalPage = SeoPage & {
  monthHint: string;
  dateNote: string;
  story: string;
  traditions: string[];
  puja: string;
};

export type SpiritualityPage = SeoPage & {
  sections: { heading: string; body: string }[];
};

export type BlogPost = SeoPage & {
  excerpt: string;
  readingTime: string;
  tags: string[];
  body: { heading?: string; paragraphs: string[] }[];
};

export type KathaSeries = SeoPage & {
  subtitle: string;
  episodes: { number: number; title: string; duration: string; summary: string }[];
  language: string;
  duration: string;
  rating: string;
  ratingsCount: string;
};

export type Product = SeoPage & {
  name: string;
  priceInr: number;
  categorySlug: string;
  description: string;
  outOfStock: boolean;
};

export type StoreCategory = {
  slug: string;
  name: string;
  description: string;
  href: string;
};

export type CommunityGroup = {
  slug: string;
  name: string;
  text: string;
  members: number;
};

export type SankalpOffer = {
  slug: string;
  title: string;
  text: string;
  href: string;
};

export type HubSeo = {
  slug?: string;
  heading: string;
  paragraphs: string[];
  points?: string[];
  faqs: Faq[];
};
