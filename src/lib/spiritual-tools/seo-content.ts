import type { Faq } from "@/lib/content/types";

export const SPIRITUAL_TOOL_FAQS = {
  panchang: [
    {
      question: "What is Panchang?",
      answer:
        "Panchang is the traditional Hindu calendar based on five limbs — Tithi, Vaar, Nakshatra, Yoga, and Karana. Devotees use it for muhurat, vrata, and daily sadhana.",
    },
    {
      question: "Is this location-specific?",
      answer:
        "Yes. BhaktiVoice calculates sunrise, sunset, and Rahu Kaal from your latitude and longitude on your device. No birth or location data is sent to our servers.",
    },
  ] satisfies Faq[],
  kundli: [
    {
      question: "Is my data safe?",
      answer:
        "Absolutely. Your date, time, and place of birth are processed locally in your browser and never stored or transmitted to BhaktiVoice servers.",
    },
    {
      question: "What do I need to generate a Kundli?",
      answer:
        "Enter your exact date of birth, time of birth, and birthplace. For best results use the precise time recorded on your birth certificate.",
    },
  ] satisfies Faq[],
  milan: [
    {
      question: "How many Gunas are required for marriage?",
      answer:
        "Traditional Ashtakoot Milan considers 18 out of 36 Gunas as the minimum for a viable match. Higher scores indicate stronger compatibility.",
    },
    {
      question: "What is Ashtakoot Milan?",
      answer:
        "Ashtakoot Milan is an eight-point Vedic compatibility test covering Varna, Vashya, Tara, Yoni, Graha Maitri, Gana, Bhakoot, and Nadi — totaling 36 Gunas.",
    },
  ] satisfies Faq[],
  landing: [
    {
      question: "Are these tools really private?",
      answer:
        "Yes. All Spiritual Tools on BhaktiVoice run entirely in your browser. Your birth details and location never leave your device.",
    },
  ] satisfies Faq[],
} as const;

export const SPIRITUAL_TOOL_KEYWORDS = {
  landing: [
    "spiritual tools",
    "vedic calculators",
    "astrology tools",
    "free online hindu spiritual tools",
    "secure vedic astrology calculators",
    "client side birth chart generator",
  ],
  panchang: [
    "daily panchang",
    "aaj ka panchang",
    "hindu calendar",
    "today panchang by location",
    "shubh muhurat today",
    "rahu kaal timings today",
  ],
  kundli: [
    "free kundli",
    "janam kundli",
    "birth chart calculator",
    "free kundli reading online",
    "exact janam patrika by date of birth",
    "vedic astrology chart",
  ],
  milan: [
    "kundli milan",
    "guna milan",
    "marriage matching",
    "ashtakoot",
    "36 guna milan by date of birth",
    "kundli matching for marriage",
  ],
} as const;
