import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqList } from "@/components/seo/FaqList";
import { TarabalamView } from "@/components/panchang/TarabalamView";
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
    ? "दैनिक ताराबलम् एवं चंद्रबलम् कैलकुलेटर — आज का दिन आपके लिए कैसा रहेगा? (Tara Chakra)"
    : "Daily Tarabalam & Chandrabalam Calculator — Is Today Auspicious for You? (Tara Chakra)";

  const description = isHi
    ? "अपने जन्म नक्षत्र और चंद्र राशि से जानें आज का व्यक्तिगत ताराबल और चंद्रबल। ९ तारा चक्र (सम्पत, क्षेम, साधना, विपत, प्रत्यक, निधन), अष्टम चंद्र दोष विचार, और शुभ मुहूर्त निर्णय।"
    : "Calculate your personalized daily Tarabalam and Chandrabalam online. Instant Tara Chakra analysis (Sampat, Kshema, Sadhana, Vipat, Naidhana), Ashtama Chandra check, and auspiciousness rating for travel and business.";

  return localizedMetadata({
    title,
    description,
    path: `${PATHS.panchang}/tarabalam`,
    keywords: isHi
      ? [
          "ताराबलम् कैलकुलेटर",
          "चंद्रबलम आज का",
          "आज का दिन मेरे लिए कैसा है",
          "तारा चक्र विचार",
          "अष्टम चंद्र दोष",
          "सम्पत तारा",
          "साधना तारा",
          "tarabalam today",
          "chandrabalam calculator",
        ]
      : [
          "tarabalam calculator",
          "chandrabalam today",
          "tara chakra calculator",
          "daily personal muhurat",
          "is today good for me astrology",
          "ashtama chandra dosha check",
          "sampat tara meaning",
          "kshema tara",
          "vedic astrology daily strength",
        ],
  });
}

export default async function TarabalamPage() {
  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isHi = locale === "hi";

  const breadcrumbs = localizedCrumbs(
    t.homeName,
    [isHi ? "पंचांग" : "Panchang", PATHS.panchang],
    [isHi ? "ताराबलम् व चंद्रबलम्" : "Tarabalam & Chandrabalam", `${PATHS.panchang}/tarabalam`]
  );

  const faqs = isHi
    ? [
        {
          question: "ताराबलम् (Tarabalam) क्या होता है?",
          answer:
            "ताराबलम् व्यक्ति के जन्म नक्षत्र से दैनिक गोचर नक्षत्र के अंतर की गणना है। यह ९ तारों (जन्म, सम्पत, विपत, क्षेम, प्रत्यक, साधना, निधन, मित्र, परम मित्र) के चक्र में विभाजित होता है। सम्पत, क्षेम, साधना, मित्र व परम मित्र तारा सर्वाधिक शुभ होते हैं।",
        },
        {
          question: "चंद्रबलम् (Chandrabalam) क्या है और अष्टम चंद्र दोष क्यों त्याज्य है?",
          answer:
            "चंद्रबलम् जन्म चंद्र राशि से गोचर चंद्रमा के भाव स्थान की गणना है। १, ३, ६, ७, १०, ११वें भाव में चंद्रमा शुभ फल देता है। जन्म राशि से आठवें भाव में चंद्रमा का गोचर 'अष्टम चंद्र दोष' कहलाता है, जिसमें मानसिक अशांति व कार्यों में अड़चनें आती हैं।",
        },
        {
          question: "यदि ताराबल अशुभ हो तो क्या उपाय करें?",
          answer:
            "विपत तारा में गुड़ का दान, प्रत्यक तारा में सेंधा नमक का दान, और निधन तारा में काले तिल का दान अथवा महामृत्युंजय मंत्र का जप करने से दोष की शांति होती है।",
        },
      ]
    : [
        {
          question: "What is Tarabalam (Tara Chakra)?",
          answer:
            "Tarabalam is the cosmic strength derived from the distance between your birth star (Janma Nakshatra) and the transiting Moon's star. It cycles through 9 categories: Janma, Sampat, Vipat, Kshema, Pratyak, Sadhana, Naidhana, Mitra, and Parama Mitra.",
        },
        {
          question: "What is Chandrabalam and Ashtama Chandra?",
          answer:
            "Chandrabalam evaluates transit Moon relative to your natal Moon sign. Transits in houses 1, 3, 6, 7, 10, and 11 are auspicious. The 8th house transit is Ashtama Chandra, considered strictly inauspicious for starting critical enterprises.",
        },
        {
          question: "How do I remedy an inauspicious Tara?",
          answer:
            "For Vipat Tara, donate jaggery; for Pratyak Tara, donate salt or worship Lord Shiva; for Naidhana Tara, donate black sesame seeds and chant the Maha Mrityunjaya mantra.",
        },
      ];

  const pageTitle = isHi
    ? "दैनिक ताराबलम् एवं चंद्रबलम् कैलकुलेटर"
    : "Daily Tarabalam & Chandrabalam Calculator";

  const subtitle = isHi
    ? "अपने जन्म नक्षत्र और चंद्र राशि से जानें आज का व्यक्तिगत मुहूर्त बल एवं ९ तारा चक्र"
    : "Instant personalized daily strength evaluation: 9 Tara Chakra, Ashtama Chandra & 27 Nakshatras matrix";

  return (
    <div className="space-y-8 pb-16">
      <PageHero
        title={pageTitle}
        subtitle={subtitle}
        crumbs={breadcrumbs}
      />

      <div className="container mx-auto px-4 max-w-6xl">
        <TarabalamView />

        <div className="mt-12">
          <FaqList faqs={faqs} title={isHi ? "ताराबल एवं चंद्रबल से जुड़े मुख्य प्रश्न" : "Frequently Asked Questions"} />
        </div>
      </div>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: pageTitle,
          url: `${SITE.url}${PATHS.panchang}/tarabalam`,
          description: subtitle,
          applicationCategory: "AstrologyApplication",
          operatingSystem: "All",
        }}
      />
    </div>
  );
}
