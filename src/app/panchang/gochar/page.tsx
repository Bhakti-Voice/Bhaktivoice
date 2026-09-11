import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqList } from "@/components/seo/FaqList";
import { GocharCalendarView } from "@/components/panchang/GocharCalendarView";
import { getLocale, getMessages } from "@/lib/i18n/server";
import { localizedCrumbs } from "@/lib/seo/crumbs";
import { localizedMetadata } from "@/lib/seo/metadata";
import { PATHS } from "@/lib/seo/paths";
import { SITE } from "@/lib/seo/site";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isHi = locale === "hi";

  const title = isHi
    ? "दैनिक ग्रह गोचर फल एवं गोचर कैलेंडर — ९ ग्रहों का राशि परिवर्तन व भाव फल"
    : "Daily Planetary Transits (Gochar) & Transit Calendar — 9 Grahas Transit Analysis";

  const description = isHi
    ? "वैदिक ज्योतिष अनुसार दैनिक ग्रह गोचर एवं चंद्र राशि आधारित भाव फल। सूर्य, चंद्र, मंगल, बुध, गुरु, शुक्र, शनि, राहु व केतु का राशि गोचर, शुभ/अशुभ प्रभाव स्कोर एवं २०२४-२०३० का मुख्य गोचर कैलेंडर।"
    : "Vedic Planetary Transit (Gochar) dashboard and transit calendar. Real-time Sidereal positions for all 9 Grahas, house-by-house analysis from natal Moon sign, favorability score, and 2024–2030 major transit timeline.";

  return localizedMetadata({
    title,
    description,
    path: `${PATHS.panchang}/gochar`,
    keywords: isHi
      ? [
          "ग्रह गोचर आज का",
          "दैनिक गोचर फल",
          "गुरु गोचर 2026",
          "शनि गोचर 2026",
          "राहु केतु गोचर",
          "चंद्र राशि गोचर",
          "planetary transit today",
          "gochar calendar 2026",
        ]
      : [
          "planetary transits today",
          "gochar calculator",
          "vedic astrology transit calendar",
          "jupiter transit dates",
          "saturn transit dates",
          "rahu ketu transit 2026",
          "moon sign transit effects",
          "daily gochar report",
        ],
  });
}

export default async function GocharPage() {
  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isHi = locale === "hi";

  const breadcrumbs = localizedCrumbs(
    t.homeName,
    [isHi ? "पंचांग" : "Panchang", PATHS.panchang],
    [isHi ? "ग्रह गोचर" : "Planetary Transits (Gochar)", `${PATHS.panchang}/gochar`]
  );

  const faqs = isHi
    ? [
        {
          question: "ग्रह गोचर (Gochar) क्या होता है?",
          answer:
            "आकाश में ग्रहों के निरंतर संचरण को 'गोचर' कहते हैं। जन्म कुंडली के ग्रह स्थिर होते हैं, जबकि वर्तमान समय में ब्रह्मांड में गतिशील ग्रह गोचर कहलाते हैं। फलित ज्योतिष में गोचर का विश्लेषण जातक की जन्म चंद्र राशि (Moon Sign) से किया जाता है।",
        },
        {
          question: "चंद्र राशि से ही गोचर क्यों देखा जाता है?",
          answer:
            "वैदिक ज्योतिष में चंद्रमा मन, चेतना और अनुभवों का कारक है। ग्रह गोचर का सीधा प्रभाव जातक की मानसिक स्थिति, निर्णय शक्ति और दैनिक सुख-दुख पर पड़ता है, इसलिए महर्षि पराशर ने चंद्र राशि से गोचर विचार को सर्वाधिक महत्व दिया है।",
        },
        {
          question: "कौन से भावों में ग्रहों का गोचर सर्वाधिक शुभ माना जाता है?",
          answer:
            "• सूर्य: ३, ६, १०, ११वें भाव में शुभ\n• चंद्र: १, ३, ६, ७, १०, ११वें भाव में शुभ\n• मंगल: ३, ६, ११वें भाव में शुभ\n• बुध: २, ४, ६, ८, १०, ११वें भाव में शुभ\n• गुरु: २, ५, ७, ९, ११वें भाव में शुभ\n• शुक्र: १, २, ३, ४, ५, ८, ९, ११, १२वें भाव में शुभ\n• शनि, राहु, केतु: ३, ६, ११वें (उपचय) भावों में शुभ फल देते हैं।",
        },
        {
          question: "गोचर और दशा में से क्या अधिक प्रभावी होता है?",
          answer:
            "विंशोत्तरी महादशा आधारभूत नींव तय करती है, जबकि गोचर उस फल के घटित होने का तात्कालिक समय (Trigger) निर्धारित करता है। यदि दशा अनुकूल हो और गोचर भी शुभ हो, तो व्यक्ति को अभूतपूर्व सफलता मिलती है।",
        },
      ]
    : [
        {
          question: "What is Planetary Transit (Gochar)?",
          answer:
            "Gochar refers to the real-time, ongoing movement of planets through the 12 zodiac signs. While natal planets remain fixed at the moment of birth, transiting planets continuously influence life based on the houses they occupy relative to the natal Moon sign.",
        },
        {
          question: "Why is Gochar evaluated from the natal Moon sign?",
          answer:
            "The Moon governs the mind (Manas), emotions, and receptive consciousness. Planetary energies primarily affect thoughts, moods, and immediate reactions, making the Janma Rashi the classical reference point for transit readings.",
        },
        {
          question: "Which houses produce the most favorable transit results?",
          answer:
            "Generally, the Upachaya houses (3rd, 6th, 10th, 11th) are highly beneficial for malefic planets (Sun, Mars, Saturn, Rahu), while benefics (Jupiter, Venus, Mercury, waxing Moon) thrive in Kona (1st, 5th, 9th), Kendra (4th, 7th, 10th), and wealth houses (2nd, 11th).",
        },
        {
          question: "How do Dasha and Gochar interact?",
          answer:
            "Dasha creates the macro-climate and promises potential events, while Gochar acts as the timing trigger. When both Dasha and Gochar align favorably, significant milestones manifest.",
        },
      ];

  const pageTitle = isHi
    ? "दैनिक ग्रह गोचर फल एवं गोचर कैलेंडर"
    : "Daily Planetary Transits (Gochar) & Calendar";

  const subtitle = isHi
    ? "जन्म चंद्र राशि अनुसार ९ वैदिक ग्रहों का तात्कालिक भाव विश्लेषण, शुभ-अशुभ स्कोर एवं मुख्य गोचर समय-सारणी"
    : "Real-time Sidereal transit breakdown across all 12 houses from natal Moon with 2024–2030 major ingress timeline";

  return (
    <div className="space-y-8 pb-16">
      <PageHero
        title={pageTitle}
        subtitle={subtitle}
        crumbs={breadcrumbs}
      />

      <div className="container mx-auto px-4 max-w-6xl">
        <GocharCalendarView />

        <div className="mt-12">
          <FaqList faqs={faqs} title={isHi ? "गोचर से जुड़े मुख्य प्रश्न" : "Frequently Asked Questions"} />
        </div>
      </div>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: pageTitle,
          url: `${SITE.url}${PATHS.panchang}/gochar`,
          description: subtitle,
          applicationCategory: "AstrologyApplication",
          operatingSystem: "All",
        }}
      />
    </div>
  );
}
