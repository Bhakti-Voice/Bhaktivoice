import { RootShell, baseMetadata } from "@/components/layout/RootShell";
import { setRequestLocale } from "@/lib/i18n/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  ...baseMetadata,
  keywords: [
    "Bhakti Voice",
    "Aaj Ka Panchang",
    "Today Panchang",
    "Aaj Ka Panchang in Hindi 2026 Today",
    "Today Tithi",
    "Aaj Ki Tithi",
    "Free Kundli Online",
    "Janam Kundli by Date of Birth and Time",
    "Kundli Milan for Marriage",
    "Aaj Ka Choghadiya Muhurat",
    "Today Hora Timings",
    "Rahu Kaal Today",
    "Hanuman Chalisa Lyrics and Meaning",
    "Gayatri Mantra Meaning",
    "Maha Mrityunjaya Mantra 108 Times",
    "Ekadashi 2026 Dates and Fasting Time",
    "Hindu Calendar 2026",
    "Daily Devotional Quotes",
    "Online 108 Japa Counter",
  ],
  other: {
    "content-language": "en-IN",
  },
};

export const revalidate = 1800;

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  setRequestLocale("en");
  return <RootShell lang="en-IN">{children}</RootShell>;
}
