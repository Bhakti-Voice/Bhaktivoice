import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqList } from "@/components/seo/FaqList";
import { KaalSarpTool } from "@/components/spiritual-tools/KaalSarpTool";
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
    ? "కాల సర్ప దోష కాలిక్యులేటర్ — 12 రకాల కాల సర్ప యోగాలు & వైదిక నివారణలు"
    : isHi
    ? "काल सर्प दोष कैलकुलेटर — 12 प्रकार के काल सर्प योग, उदित/अनुदित एवं वैदिक उपाय"
    : "Kaal Sarp Dosha Calculator — 12 Types of Kaal Sarp Yoga, Udit/Anudit Check & Vedic Remedies";
  const description = isTe
    ? "100% ఖచ్చితమైన వైదిక గణనతో కాల సర్ప దోషాన్ని ఆన్‌లైన్‌లో లెక్కించండి. అనంత నుండి శేషనాగ వరకు 12 రకాల కాల సర్ప యోగాలు, పూర్ణ/ఆంశిక ప్రభావం మరియు ప్రామాణిక శాస్త్ర నివారణలు."
    : isHi
    ? "100% सटीक वैदिक गणना द्वारा काल सर्प दोष की ऑनलाइन जांच करें। अनंत से शेषनाग तक 12 प्रकार के काल सर्प योग, पूर्ण व आंशिक प्रभाव एवं प्रामाणिक शास्त्रीय उपाय।"
    : "Calculate Kaal Sarp Dosha online with 100% astronomical accuracy. Identify all 12 classical Kaal Sarp Yogas (Anant to Sheshnag), Udit vs Anudit Gola direction, Purna vs Anshik enclosure, life milestones, and authentic Shastric remedies.";

  return localizedMetadata({
    title,
    description,
    path: PATHS.kaalSarpDosha,
    keywords: isTe
      ? [
          "కాల సర్ప దోష కాలిక్యులేటర్",
          "కాల సర్ప యోగం పరీక్ష",
          "12 రకాల కాల సర్ప దోషాలు",
          "అనంత కాల సర్ప యోగం",
          "పూర్ణ కాల సర్ప దోషం",
          "కాల సర్ప దోష నివారణ పూజ",
          "శ్రీకాళహస్తి కాలసర్ప దోష నివారణ",
          "మహామృత్యుంజయ మంత్ర జపం",
          "రాహు కేతు దోష పరిహారాలు",
        ]
      : isHi
      ? [
          "काल सर्प दोष कैलकुलेटर",
          "काल सर्प योग चेक करें",
          "12 प्रकार के काल सर्प दोष",
          "अनंत काल सर्प योग",
          "आंशिक काल सर्प दोष",
          "काल सर्प दोष निवारण उपाय",
          "त्र्यंबकेश्वर काल सर्प पूजा",
          "राहु केतु दोष शांति",
          "महामृत्युंजय मंत्र जप",
          "काल सर्प योग के लक्षण और उपाय",
        ]
      : [
          "kaal sarp dosha calculator",
          "kaal sarp yoga check by date of birth",
          "12 types of kaal sarp dosha",
          "anant kaal sarp yoga",
          "udit vs anudit kaal sarp",
          "anshik kaal sarp yoga",
          "kaal sarp dosha remedies",
          "trimbakeshwar kaal sarp puja",
          "rahu ketu axis in kundli",
          "mahamrityunjaya mantra for kaal sarp",
        ],
  });
}

export default async function KaalSarpDoshaPage() {
  const [t, locale] = await Promise.all([getMessages(), getLocale()]);
  const isHi = locale === "hi";
  const isTe = locale === "te";

  const breadcrumbs = localizedCrumbs(
    t.homeName,
    [isTe ? "కుండలి" : isHi ? "कुंडली" : "Kundli", PATHS.kundli],
    [isTe ? "కాల సర్ప దోష కాలిక్యులేటర్" : isHi ? "काल सर्प दोष कैलकुलेटर" : "Kaal Sarp Dosha Calculator", PATHS.kaalSarpDosha]
  );

  const faqs = [
    {
      question: "What is Kaal Sarp Yoga (Kaal Sarp Dosha) in Vedic Astrology?",
      answer:
        "Kaal Sarp Yoga is formed in a birth chart when all seven classical planets (Sun, Moon, Mars, Mercury, Jupiter, Venus, and Saturn) are situated on one side of the nodal axis between Rahu (the serpent's head) and Ketu (the serpent's tail). In Sanskrit, 'Kaal' signifies Time and 'Sarpa' signifies the Serpent.",
    },
    {
      question: "What are the 12 classical types of Kaal Sarp Yoga?",
      answer:
        "The 12 types are determined by the house position of Rahu (1 through 12): (1) Anant (1st H), (2) Kulik (2nd H), (3) Vasuki (3rd H), (4) Shankhpal (4th H), (5) Padma (5th H), (6) Mahapadma (6th H), (7) Takshak (7th H), (8) Karkotak (8th H), (9) Shankhachur (9th H), (10) Ghatak (10th H), (11) Vishdhar (11th H), and (12) Sheshnag (12th H). Each yoga highlights specific karmic tests and eventual breakthroughs.",
    },
    {
      question: "What is the difference between Purna Kaal Sarp and Anshik Kaal Sarp?",
      answer:
        "Purna (Full) Kaal Sarp Yoga occurs when all seven classical grahas are strictly enclosed within the Rahu-Ketu axis with zero planets outside. Anshik (Partial / Ardha) Kaal Sarp occurs when six planets are hemmed inside the axis, but exactly one planet has escaped outside. Anshik Kaal Sarp has a mild, intermittent influence that is easily managed.",
    },
    {
      question: "What do Udit Gola and Anudit Gola mean in Kaal Sarp Yoga?",
      answer:
        "Because Rahu and Ketu naturally move retrograde (backward): When the planets are progressing in zodiacal order toward Rahu's mouth, it is termed Udit Gola (Ascending) Kaal Sarp, causing intense early-life effort and tremendous later-life authority. When planets move away toward Ketu's tail, it is termed Anudit Gola (Descending) Kaal Sarp, encouraging spiritual introversion and intellectual depth.",
    },
    {
      question: "Can an individual with Kaal Sarp Yoga achieve great success?",
      answer:
        "Absolutely! Many of the world's most influential leaders, scientists, and visionaries possessed Kaal Sarp Yoga (including Jawaharlal Nehru, Sachin Tendulkar, and Abraham Lincoln). Kaal Sarp Yoga creates intense concentration and an unstoppable drive. While the years before age 33–42 involve testing trials, the subsequent years often bring phenomenal acclaim and historic achievements.",
    },
    {
      question: "What are the most authentic Shastric remedies for Kaal Sarp Dosha?",
      answer:
        "Authentic classical remedies include: (1) Daily chanting of the Maha Mrityunjaya Mantra (108 times) with a Rudraksha mala, (2) Performing Rudrabhisheka at a Jyotirlinga (such as Trimbakeshwar or Mahakaleshwar), (3) Offering milk to a Shiva Lingam and immersing a silver pair of Nag-Nagin on Nag Panchami, (4) Chanting Rahu and Ketu Beej Mantras, and (5) Keeping a sacred peacock feather in the bedroom.",
    },
  ];

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Vedic Kaal Sarp Dosha Calculator",
    applicationCategory: "LifestyleApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
    description:
      "Free online Vedic Kaal Sarp Dosha (Yoga) calculator identifying all 12 classical yogas, Udit vs Anudit Gola direction, planetary axis distribution, and authentic Shastric remedies.",
    url: `${SITE.url}${PATHS.kaalSarpDosha}`,
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <JsonLd data={appSchema} />

      <PageHero
        title="Kaal Sarp Dosha Calculator"
        subtitle="100% accurate astronomical detection of all 12 Kaal Sarp Yogas (Anant to Sheshnag), Udit/Anudit direction, planetary nodal axis distribution, and authentic Vedic remedies."
        crumbs={breadcrumbs}
      />

      <div className="mt-8">
        <KaalSarpTool />
      </div>

      {/* Educational Guide Section */}
      <section className="mt-14 rounded-3xl border border-sand bg-white/80 p-6 shadow-sm backdrop-blur-sm md:p-8">
        <h2 className="font-serif text-2xl font-bold text-ink">
          Demystifying Kaal Sarp Yoga: A Catalyst for Greatness
        </h2>
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted">
          <p>
            In Vedic astrology, Rahu represents the head of the cosmic serpent (worldly obsession, future karma,
            and insatiable drive), while Ketu represents the tail (past life mastery, detachment, and spiritual
            moksha). When all seven visible planets are enclosed on one side of this axis, life takes on a focused,
            karmic intensity.
          </p>
          <p>
            Far from being an insurmountable curse, classical masters note that individuals with Kaal Sarp Yoga
            are rarely ordinary. They are pushed by unseen forces to overcome extraordinary odds. The key
            to mastering Kaal Sarp Yoga lies in spiritual grounding, worshipping Lord Shiva (the lord of Time and
            Vasuki), and persevering through early hurdles until the relief milestones (ages 28, 33, 36, or 42) arrive.
          </p>
          <p>
            Use this tool to discover your exact Kaal Sarp classification, understand which life area is being
            refined, and implement constructive Shastric remedies.
          </p>
        </div>
      </section>

      <FaqList faqs={faqs} title="Frequently Asked Questions about Kaal Sarp Yoga" />
    </div>
  );
}
