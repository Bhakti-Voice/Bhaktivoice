import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { FaqList } from "@/components/seo/FaqList";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { getLocale } from "@/lib/i18n/server";
import { localizedCrumbs } from "@/lib/seo/crumbs";
import { localizedMetadata } from "@/lib/seo/metadata";
import { PATHS } from "@/lib/seo/paths";
import {
  Sun,
  Moon,
  ShieldAlert,
  Sparkles,
  AlertTriangle,
  Info,
  CheckCircle2,
  Clock,
} from "lucide-react";

export const revalidate = 1800;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isHi = locale === "hi";

  const title = isHi
    ? "सूर्य एवं चंद्र ग्रहण 2026 — सूतक काल, मोक्ष समय, गर्भवती महिलाओं के नियम व मंत्र"
    : "Surya & Chandra Grahan 2026 — Solar & Lunar Eclipse Timings, Sutak Rules & Mantras";

  const description = isHi
    ? "2026 के सभी सूर्य ग्रहण और चंद्र ग्रहण की सटीक तिथियाँ। सूतक काल का समय, स्पर्श और मोक्ष काल, गर्भवती महिलाओं के लिए सावधानियां और ग्रहण कालीन जप मंत्र।"
    : "Comprehensive guide to 2026 Solar and Lunar Eclipses. Precise Sutak Kaal start & end timings, Sparsha & Moksha periods, do's & don'ts, and sacred mantras for maximum spiritual merit.";

  return localizedMetadata({
    title,
    description,
    path: PATHS.grahan,
    keywords: isHi
      ? [
          "सूर्य ग्रहण 2026",
          "चंद्र ग्रहण 2026",
          "सूतक काल समय",
          "ग्रहण के नियम",
          "ग्रहण में गर्भवती महिलाएं क्या करें",
          "ग्रहण मोक्ष समय",
          "ग्रहण शांति मंत्र",
        ]
      : [
          "surya grahan 2026",
          "chandra grahan 2026",
          "sutak kaal timing",
          "eclipse rules hinduism",
          "solar eclipse mantras",
          "lunar eclipse moksha time",
        ],
  });
}

const FAQS_HI = [
  {
    question: "सूतक काल कब प्रारंभ होता है और इसके क्या नियम हैं?",
    answer:
      "सूर्य ग्रहण में सूतक काल ग्रहण स्पर्श से १२ घंटे (४ प्रहर) पूर्व, तथा चंद्र ग्रहण में ९ घंटे (३ प्रहर) पूर्व प्रारंभ होता है। सूतक काल में मूर्ति स्पर्श, भोजन पकाना, और शुभ कार्य वर्जित होते हैं। बच्चों, वृद्धों एवं रोगियों के लिए यह नियम शिथिल रहता है।",
  },
  {
    question: "ग्रहण काल में कौन-से मंत्रों का जप करना सर्वाधिक फलदायी है?",
    answer:
      "ग्रहण के समय किया गया मंत्र जप सामान्य दिनों की तुलना में लाख गुना अधिक फल देता है। महामृत्युंजय मंत्र, गायत्री मंत्र, और 'ॐ नमो भगवते वासुदेवाय' का जप ग्रहण की नकारात्मक किरणों से रक्षा करता है।",
  },
  {
    question: "ग्रहण समाप्ति (मोक्ष) के बाद क्या करना अनिवार्य है?",
    answer:
      "ग्रहण मोक्ष के तुरंत बाद शुद्ध जल अथवा गंगाजल मिलाकर स्नान करना चाहिए। घर के मंदिर में गंगाजल छिड़ककर शुद्धिकरण करें, ताज़ा सात्विक भोजन बनाएं और तिल, अनाज अथवा वस्त्र का दान करें।",
  },
];

const FAQS_EN = [
  {
    question: "When does Sutak Kaal begin and what are its regulations?",
    answer:
      "For a Solar Eclipse, Sutak Kaal begins 12 hours prior to eclipse contact; for a Lunar Eclipse, it begins 9 hours prior. Touching temple deities, cooking fresh meals, and starting new ventures are proscribed during Sutak, except for the elderly, young children, and the sick.",
  },
  {
    question: "Which mantras are recommended during an eclipse?",
    answer:
      "Japa performed during an eclipse is traditionally said to multiply spiritual merit a hundred-thousand fold. The Maha Mrityunjaya Mantra, Gayatri Mantra, and the Ashtakshara Mahamantra are supreme for protective energy.",
  },
  {
    question: "What should be done after the eclipse concludes (Moksha)?",
    answer:
      "Devotees should immediately take a purifying bath with Gangajal, sprinkle sacred water across the residence and alter, prepare fresh satvik food, and distribute grain and warm clothes to the needy.",
  },
];

export default async function GrahanPage() {
  const locale = await getLocale();
  const isHi = locale === "hi";

  const crumbs = localizedCrumbs(
    isHi ? "होम" : "Home",
    [isHi ? "सूर्य व चंद्र ग्रहण" : "Solar & Lunar Eclipses", PATHS.grahan]
  );

  return (
    <div className="min-h-screen bg-[#faf6f0] text-ink pb-16">
      <PageHero
        title={isHi ? "सूर्य एवं चंद्र ग्रहण मार्गदर्शिका 2026" : "Solar & Lunar Eclipse (Grahan) Guide 2026"}
        crumbs={crumbs}
        ornament
      >
        <p className="mt-3 text-xs sm:text-sm text-ink/75 max-w-3xl leading-relaxed">
          {isHi
            ? "सटीक खगोलीय ग्रहण तिथियाँ, स्पर्श व मोक्ष काल, सूतक नियम, गर्भवती महिलाओं के लिए निर्देश एवं ग्रहण काल में आत्मिक साधना।"
            : "Astronomically precise eclipse dates for 2026, Sutak Kaal intervals, rules for pregnant women, and potent japa mantras for spiritual elevation."}
        </p>
      </PageHero>

      <main className="mx-auto max-w-7xl px-4 pt-6 lg:px-8 space-y-10">
        {/* Eclipse Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Surya Grahan */}
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-amber-500/15">
            <div className="flex items-center gap-3 border-b border-line pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600">
                <Sun className="h-6 w-6" />
              </div>
              <div>
                <h2 className="font-serif text-lg font-bold text-ink">
                  {isHi ? "सूर्य ग्रहण (Solar Eclipse) 2026" : "Surya Grahan (Solar Eclipse) 2026"}
                </h2>
                <p className="text-xs text-muted">
                  {isHi ? "अमावस्या तिथि • १२ घंटे पूर्व सूतक" : "Amavasya Tithi • 12 Hours Prior Sutak"}
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-3 text-xs text-muted leading-relaxed">
              <p>
                {isHi
                  ? "जब चंद्रमा सूर्य और पृथ्वी के मध्य आ जाता है, तो सूर्य ग्रहण घटित होता है। वैदिक ज्योतिष में सूर्य आत्मा और पिता का कारक है। सूर्य ग्रहण के समय सूर्य गायत्री मंत्र का मानसिक जप परम कल्याणकारी है।"
                  : "Occurs on Amavasya when the Moon passes directly between the Sun and Earth. The Sun governs the Atman (soul) and vitality. Reciting the Surya Gayatri Mantra shields the vital prana."}
              </p>
              <div className="rounded-xl bg-amber-50 p-3 text-ink">
                <span className="font-bold text-amber-900 block mb-1">
                  {isHi ? "प्रमुख नियम एवं सावधानी:" : "Core Disciplines:"}
                </span>
                <ul className="list-disc pl-4 space-y-1 text-xs text-muted">
                  <li>{isHi ? "ग्रहण को नंगी आंखों से कदापि न देखें।" : "Never view the solar eclipse with the naked eye."}</li>
                  <li>{isHi ? "पके हुए भोजन में तुलसी पत्र (तुलसी दल) डालकर रखें।" : "Place sacred Tulsi leaves into cooked water and food items."}</li>
                  <li>{isHi ? "सूतक के १२ घंटे के दौरान मूर्ति स्पर्श न करें।" : "Do not touch altar deities during the 12-hour Sutak period."}</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Chandra Grahan */}
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-indigo-500/15">
            <div className="flex items-center gap-3 border-b border-line pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600">
                <Moon className="h-6 w-6" />
              </div>
              <div>
                <h2 className="font-serif text-lg font-bold text-ink">
                  {isHi ? "चंद्र ग्रहण (Lunar Eclipse) 2026" : "Chandra Grahan (Lunar Eclipse) 2026"}
                </h2>
                <p className="text-xs text-muted">
                  {isHi ? "पूर्णिमा तिथि • ९ घंटे पूर्व सूतक" : "Purnima Tithi • 9 Hours Prior Sutak"}
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-3 text-xs text-muted leading-relaxed">
              <p>
                {isHi
                  ? "जब पृथ्वी सूर्य और चंद्रमा के मध्य आ जाती है, तो पृथ्वी की छाया से चंद्र ग्रहण होता है। चंद्रमा मन का कारक ('चंद्रमा मनसो जातः') होने से ग्रहण के समय मन को भगवान शिव के ध्यान में एकाग्र करना चाहिए।"
                  : "Occurs on Purnima when Earth blocks solar light from reaching the Moon. As the Moon governs the mental faculty, meditating on Lord Shiva during this window harmonizes emotional equilibrium."}
              </p>
              <div className="rounded-xl bg-indigo-50 p-3 text-ink">
                <span className="font-bold text-indigo-900 block mb-1">
                  {isHi ? "मोक्ष एवं शुद्धि विधान:" : "Moksha Purification:"}
                </span>
                <ul className="list-disc pl-4 space-y-1 text-xs text-muted">
                  <li>{isHi ? "ग्रहण मोक्ष के तुरंत बाद स्नान करें।" : "Take a purifying shower immediately after eclipse Moksha."}</li>
                  <li>{isHi ? "चावल, चीनी, और सफेद वस्त्र का दान चंद्र दोष शांत करता है।" : "Donating rice, sugar, and white cloth balances lunar afflictions."}</li>
                  <li>{isHi ? "महामृत्युंजय मंत्र का १०८ बार जप करें।" : "Chant the Maha Mrityunjaya Mantra 108 times."}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed High-SEO Article */}
        <article className="rounded-3xl bg-white p-6 lg:p-10 shadow-sm ring-1 ring-amber-500/15 space-y-6 text-ink/80 text-sm leading-relaxed">
          <h2 className="font-serif text-xl font-bold text-ink sm:text-2xl border-b border-line pb-3">
            {isHi
              ? "ग्रहण का वैज्ञानिक, ज्योतिषीय एवं तात्विक प्रभाव — विस्तृत विवेचन"
              : "The Astrological & Metaphysical Science of Eclipses"}
          </h2>

          {isHi ? (
            <div className="space-y-4">
              <p>
                वैदिक ऋषि-मुनियों ने सहस्रों वर्ष पूर्व राहु और केतु को 'छाया ग्रह' (Mathematical Shadow Points) के रूप में निरूपित किया था। आधुनिक खगोल विज्ञान भी इसे <strong>Lunar Nodes</strong> (Ascending and Descending Nodes) के रूप में मान्यता देता है।
              </p>
              <h3 className="font-serif text-base font-bold text-ink pt-2">
                १. ग्रहण काल में मंत्र सिद्धि का रहस्य
              </h3>
              <p>
                शास्त्रों में ग्रहण काल को 'सिद्ध वेला' कहा गया है। इस समय ब्रह्मांडीय विद्युत-चुंबकीय क्षेत्र (Electromagnetic Grid) में तीव्र परिवर्तन होता है। इस कालखंड में किया गया कोई भी मंत्र जप सामान्य काल की तुलना में सहस्र गुना अधिक तीव्र फल प्रदान करता है। गुरु मंत्र, गायत्री मंत्र, अथवा अपने इष्टदेव के नाम का अखंड जप करने से साधक की चेतना का ऊर्ध्वारोहण होता है।
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <p>
                Ancient Vedic seers identified Rahu and Ketu not as physical planets, but as subtle shadow entities (Chhaya Grahas)—precisely corresponding to the mathematical intersection nodes of the Earth&apos;s and Moon&apos;s orbits.
              </p>
              <h3 className="font-serif text-base font-bold text-ink pt-2">
                1. Accelerated Mantra Siddhi during Eclipse Windows
              </h3>
              <p>
                Scriptures classify the eclipse duration as a potent window for rapid spiritual transmutation. The disruption of standard solar/lunar radiation creates a rare atmospheric lull, magnifying focused intentional thought and japa practice a hundred-thousand fold.
              </p>
            </div>
          )}
        </article>

        {/* FAQs */}
        <section className="rounded-3xl bg-white p-6 lg:p-8 shadow-sm ring-1 ring-amber-500/10">
          <h2 className="font-serif text-lg font-bold text-ink sm:text-xl mb-4">
            {isHi ? "ग्रहण से जुड़े प्रमुख प्रश्नोत्तरी (FAQ)" : "Frequently Asked Questions about Eclipses"}
          </h2>
          <FaqList faqs={isHi ? FAQS_HI : FAQS_EN} jsonLd />
        </section>
      </main>
    </div>
  );
}
