import { RootShell, baseMetadata } from "@/components/layout/RootShell";
import { setRequestLocale } from "@/lib/i18n/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  ...baseMetadata,
  keywords: [
    "భక్తి వాయిస్",
    "ఈరోజు పంచాంగం తెలుగు మంచి సమయం",
    "ఈరోజు తిథి పంచాంగం good time",
    "ఉచిత జన్మ కుండలి ఆన్‌లైన్",
    "కుండలి మిలనం తెలుగు",
    "36 గుణాల జాతక పొంతన",
    "నేటి చోఘడియా",
    "శుభ ముహూర్తాలు 2026",
    "శ్రీ హనుమాన్ చాలీసా లిరిక్స్ తెలుగు",
    "దైవిక సువిచారాలు",
    "హిందూ క్యాలెండర్ 2026",
    "ఏకాదశి వ్రత తేదీలు 2026",
  ],
  other: {
    "content-language": "te-IN",
  },
};

export const revalidate = 1800;

export default function TeluguLayout({ children }: { children: React.ReactNode }) {
  setRequestLocale("te");
  return <RootShell lang="te-IN">{children}</RootShell>;
}
