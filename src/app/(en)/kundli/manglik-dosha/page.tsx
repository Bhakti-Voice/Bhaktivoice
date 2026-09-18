import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqList } from "@/components/seo/FaqList";
import { ManglikTool } from "@/components/spiritual-tools/ManglikTool";
import { getLocale, getMessages } from "@/lib/i18n/server";
import { localizedCrumbs } from "@/lib/seo/crumbs";
import { localizedMetadata } from "@/lib/seo/metadata";
import { PATHS } from "@/lib/seo/paths";
import { SITE } from "@/lib/seo/site";

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isTe = locale === "te";
  const isHi = locale === "hi";

  const title = isTe
    ? "మాంగ్లిక్ దోష కాలిక్యులేటర్ — 16 మినహాయింపులు (పరిహారాలు) & ఖచ్చితమైన కుజ దోషం నివేదిక"
    : isHi
    ? "मांगलिक दोष कैलकुलेटर — 16 अपवाद (परिहार) एवं प्रामाणिक मंगल दोष निवारण उपाय"
    : "Manglik Dosha Calculator — 100% Accurate Kuja Dosha Check with 16 Cancellations & Vedic Remedies";
  const description = isTe
    ? "కుజ దోషం (మాంగ్లిక్ దోషం) ఆన్‌లైన్‌లో 100% ఖచ్చితత్వంతో తనిఖీ చేయండి. లగ్న, చంద్ర, శుక్ర త్రిపాద విచారం, 16 శాస్త్రోక్త అపవాదాలు, ఆంశిక vs పూర్ణ తీవ్రత మరియు ప్రామాణిక నివారణలు."
    : isHi
    ? "मंगल दोष (कुज दोष) की ऑनलाइन 100% सटीक जांच करें। लग्न, चंद्र व शुक्र से त्रिपद विचार, 16 शास्त्रीय अपवाद (परिहार), आंशिक बनाम पूर्ण दोष मीटर एवं प्रामाणिक वैदिक उपाय।"
    : "Check Manglik Dosha (Kuja Dosha) online with 100% precision. Comprehensive Tripada Vichara (Lagna, Moon, Venus), 16 classical cancellations (Apavadas), Anshik vs Purna severity meter, and authentic Vedic remedies.";

  return localizedMetadata({
    title,
    description,
    path: PATHS.manglikDosha,
    keywords: isTe
      ? [
          "మాంగ్లిక్ దోష కాలిక్యులేటర్",
          "కుజ దోషం నివారణ",
          "ఆంశిక మాంగ్లిక్ దోషం",
          "కుజ దోష మినహాయింపులు",
          "మాంగ్లిక్ వివాహ పొంతన",
          "కుంభ వివాహం నియమాలు",
          "వైదిక కుజ దోష నివారణలు",
          "కుండలిలో కుజ దోషం",
        ]
      : isHi
      ? [
          "मांगलिक दोष कैलकुलेटर",
          "मांगलिक दोष चेक करें",
          "आंशिक मांगलिक क्या होता है",
          "मांगलिक दोष निवारण के उपाय",
          "कुंभ विवाह नियम",
          "क्या मांगलिक गैर-मांगलिक से शादी कर सकता है",
          "मंगल दोष जन्म कुंडली",
          "भौम दोष कैलकुलेटर",
          "16 मांगलिक दोष अपवाद",
          "वैदिक मंगल दोष शांति",
        ]
      : [
          "manglik dosha calculator",
          "kuja dosha check online",
          "anshik manglik test",
          "manglik dosha cancellation rules",
          "can manglik marry non manglik",
          "mangal dosha check by date of birth",
          "bhauma dosha calculator",
          "manglik compatibility test",
          "kumbha vivah rules",
          "vedic remedies for manglik dosha",
          "16 apavadas of mangal dosha",
        ],
  });
}

export default async function ManglikDoshaPage() {
  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isHi = locale === "hi";
  const isTe = locale === "te";

  const breadcrumbs = localizedCrumbs(
    t.homeName,
    [isTe ? "కుండలి" : isHi ? "कुंडली" : "Kundli", PATHS.kundli],
    [isTe ? "మాంగ్లిక్ దోష కాలిక్యులేటర్" : isHi ? "मांगलिक दोष कैलकुलेटर" : "Manglik Dosha Calculator", PATHS.manglikDosha]
  );

  const faqs = [
    {
      question: "What is Manglik Dosha (Kuja Dosha) in Vedic Astrology?",
      answer:
        "Manglik Dosha (also termed Kuja Dosha or Bhauma Dosha) is an astrological combination occurring when Mars (Mangal) is situated in the 1st, 2nd, 4th, 7th, 8th, or 12th house from the Ascendant (Lagna), natal Moon, or Venus in a birth chart. Because Mars governs passion, aggression, and raw fire, its placement in houses connected to marriage and temperament demands careful assessment.",
    },
    {
      question: "What is the difference between Anshik Manglik and Purna Manglik?",
      answer:
        "Purna (High) Manglik occurs when Mars is placed in the primary marriage houses (7th or 8th house) from Lagna without benefic aspects or classical cancellations. Anshik (Partial / Mild) Manglik occurs when Mars is situated in secondary houses (such as the 12th, 2nd, or 4th house) or present only from the Moon/Venus. Anshik Manglik has a gentle impact and rarely creates severe marital friction.",
    },
    {
      question: "Can a Manglik person marry a Non-Manglik person?",
      answer:
        "Yes! Classical treatises confirm that marriage between a Manglik and non-Manglik is completely viable if: (1) One of the 16 classical cancellation rules applies, (2) The Ashtakoot Guna Milan score is 18 or above with healthy Bhakoot and Nadi harmony, or (3) The partner's horoscope has Saturn, Rahu, or Mars balancing the corresponding sensitive house.",
    },
    {
      question: "What are the 16 classical cancellations (Apavadas) for Kuja Dosha?",
      answer:
        "Authored in classical texts like Brihat Parashara Hora Shastra and Muhurta Chintamani, key cancellations include: Mars in Aries in 1st house (Ruchaka Yoga), Mars in Scorpio in 4th house, Mars in Capricorn in 7th house (Exalted), Mars in Sagittarius/Pisces in 8th house, Jupiter's 5th/7th/9th aspect on Mars, Moon-Mars conjunction (Chandra-Mangala Yoga), and Mars in movable cardinal signs.",
    },
    {
      question: "What are the most authentic Vedic remedies for Manglik Dosha?",
      answer:
        "The most effective classical remedies include daily recitation of Sri Hanuman Chalisa or Sundarkand on Tuesdays, chanting the Mangal Beej Mantra ('Om Kram Kreem Kroum Sah Bhaumaya Namah') 108 times, observing Tuesday salt-free sweet fasts, donating red lentils (masoor dal) or copper to the needy, and performing Kumbha Vivah before wedding rites in high-severity cases.",
    },
    {
      question: "Should someone with Manglik Dosha wear a Red Coral (Moonga)?",
      answer:
        "No, never wear Red Coral blindly to cure Manglik Dosha! Coral amplifies Martian energy. It should only be worn if Mars is an auspicious functional benefic (Yogakaraka) for your ascendant (specifically Cancer or Leo Lagna), evaluated by an expert astrologer.",
    },
  ];

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Vedic Manglik Dosha Calculator",
    applicationCategory: "LifestyleApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
    description:
      "Free online Vedic Manglik Dosha (Kuja Dosha) calculator evaluating Tripada Vichara (Lagna, Moon, Venus), 16 classical cancellations, and authentic Shastric remedies.",
    url: `${SITE.url}${PATHS.manglikDosha}`,
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <JsonLd data={appSchema} />

      <PageHero
        title="Manglik Dosha Calculator"
        subtitle="100% accurate Vedic Kuja Dosha evaluation across Lagna, Chandra, and Shukra with 16 classical cancellations, severity meter, and authentic Shastric remedies."
        crumbs={breadcrumbs}
      />

      <div className="mt-8">
        <ManglikTool />
      </div>

      {/* Educational Guide Section */}
      <section className="mt-14 rounded-3xl border border-sand bg-white/80 p-6 shadow-sm backdrop-blur-sm md:p-8">
        <h2 className="font-serif text-2xl font-bold text-ink">
          Understanding Kuja Dosha (Manglik Dosha) in Vedic Astrology
        </h2>
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted">
          <p>
            In Vedic astrology (Jyotish), Mars represents courage, vitality, blood, passion, and ambition.
            When Mars aligns with houses that govern marital harmony, emotional sharing, and domestic life
            (houses 1, 2, 4, 7, 8, and 12), its intense heat can create assertiveness or impatience.
          </p>
          <p>
            However, popular folklore often misrepresents Manglik Dosha as a feared curse. Ancient masters like
            <strong> Maharshi Parashara</strong> and <strong>Varahamihira</strong> provided precise rules
            of cancellation (<em>Apavadas</em>). In reality, more than 60% of apparent Manglik horoscopes
            possess complete cancellation due to planetary exaltation, own-sign strength, or Jupiter&apos;s
            protective glance.
          </p>
          <p>
            Our engine conducts a rigorous <strong>Tripada Vichara</strong> (evaluating Mars from the Ascendant,
            natal Moon, and Venus) to give you an authentic, fear-free understanding of your horoscope.
          </p>
        </div>
      </section>

      <FaqList faqs={faqs} title="Frequently Asked Questions about Manglik Dosha" />
    </div>
  );
}
