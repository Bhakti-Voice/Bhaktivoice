import type { Faq } from "./types";

export type HubSeoId =
  | "home"
  | "naam-jaap"
  | "mala"
  | "katha"
  | "yatra"
  | "planner"
  | "temples"
  | "festivals"
  | "spirituality"
  | "mantras"
  | "blog"
  | "sadhana"
  | "sankalp"
  | "diary"
  | "community"
  | "store"
  | "aarti"
  | "chalisa"
  | "bhajan"
  | "more"
  | "tithi";

export type HubSeo = {
  heading: string;
  paragraphs: string[];
  points?: string[];
  faqs: Faq[];
};
