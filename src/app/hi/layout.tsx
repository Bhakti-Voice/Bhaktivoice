import { RootShell, baseMetadata } from "@/components/layout/RootShell";
import { setRequestLocale } from "@/lib/i18n/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  ...baseMetadata,
  keywords: [
    "भक्ति वॉइस",
    "आज का पंचांग",
    "आज का पंचांग 2026",
    "आज की तिथि क्या है",
    "आज का चौघड़िया मुहूर्त",
    "फ्री जन्म कुंडली ऑनलाइन",
    "जन्म कुंडली जन्म तिथि से",
    "कुंडली मिलान 36 गुण",
    "श्री हनुमान चालीसा",
    "दैनिक सुविचार",
    "आज का सुविचार प्रेमानंद जी महाराज",
    "गायत्री मंत्र अर्थ सहित",
    "महामृत्युंजय मंत्र 108 बार",
    "एकादशी व्रत तिथियाँ 2026",
    "हिन्दू कैलेंडर 2026",
  ],
  other: {
    "content-language": "hi-IN",
  },
};

export const revalidate = 1800;

export default function HindiLayout({ children }: { children: React.ReactNode }) {
  setRequestLocale("hi");
  return <RootShell lang="hi-IN">{children}</RootShell>;
}
