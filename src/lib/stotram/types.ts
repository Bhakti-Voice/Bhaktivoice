import type { BreadcrumbItem, Faq, RelatedLink, SeoPage } from "@/lib/content/types";

export type StotramCategory =
  | "shiva"
  | "vishnu"
  | "rama"
  | "hanuman"
  | "lakshmi"
  | "ganesha"
  | "durga"
  | "surya"
  | "vedic_suktam";

export type StotramVerse = {
  verseNumber: number;
  sanskrit: string;
  sanskritTe?: string;
  transliteration: string;
  hindiMeaning: string;
  englishMeaning: string;
  teluguMeaning?: string;
};

export type StotramPage = SeoPage & {
  titleHi?: string;
  titleTe?: string;
  introductionHi?: string;
  introductionTe?: string;
  metaDescriptionHi?: string;
  metaDescriptionTe?: string;
  deity: string;
  deityHi: string;
  deityTe: string;
  stotramCategory: StotramCategory;
  authorComposer: string;
  authorComposerHi: string;
  authorComposerTe?: string;
  sourceScripture: string;
  sourceScriptureHi: string;
  sourceScriptureTe?: string;
  totalVerses: number;
  bestDayToChant: string;
  bestDayToChantHi: string;
  bestDayToChantTe?: string;
  bestTimeToChant: string;
  bestTimeToChantHi: string;
  bestTimeToChantTe?: string;
  recommendedRounds: string;
  dhyanamSanskrit?: string;
  dhyanamSanskritTe?: string;
  dhyanamTransliteration?: string;
  dhyanamHindi?: string;
  dhyanamEnglish?: string;
  dhyanamTelugu?: string;
  verses: StotramVerse[];
  vidhi: string[];
  vidhiHi: string[];
  vidhiTe?: string[];
  benefits: string[];
  benefitsHi: string[];
  benefitsTe?: string[];
  phalashrutiText?: string;
  phalashrutiTextHi?: string;
  phalashrutiTextTe?: string;
  audioDuration?: string;
  audioUrl?: string;
};
