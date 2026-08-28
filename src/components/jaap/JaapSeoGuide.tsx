import { LocaleLink } from "@/components/i18n/LocaleLink";
import { PATHS } from "@/lib/seo/paths";
import { BookOpen, Flame, HeartHandshake, HelpCircle, Info, Sparkles, Star } from "lucide-react";

export function JaapSeoGuide({ isHi = false }: { isHi?: boolean }) {
  return (
    <div className="mt-14 space-y-12 text-ink">
      {/* 1. Hero Guide Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#fffbf5] via-[#fff5e8] to-[#ffeed9] p-6 sm:p-10 border border-[#ecd9be] shadow-sm">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-orange-100 text-orange-800 border border-orange-200 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-orange-600" />
            {isHi ? "नाम जप विज्ञान एवं साधना महिमा" : "The Science & Glory of Naam Jaap"}
          </span>

          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-ink leading-tight">
            {isHi
              ? "कलियुग में केवल नाम अधारा — नाम जप का महत्व और विधि"
              : "Why Naam Jaap is the Highest Spiritual Practice (Sadhana)"}
          </h2>

          <p className="mt-4 text-base sm:text-lg leading-relaxed text-muted font-sans">
            {isHi
              ? "गोस्वामी तुलसीदास जी ने रामचरितमानस में लिखा है — 'कलयुग केवल नाम अधारा, सुमिरि सुमिरि नर उतरहिं पारा।' कलियुग में कठिन तपस्या और जटिल यज्ञों के स्थान पर केवल शुद्ध भाव से प्रभु के पावन नाम का जप ही आत्मशांति, चित्त शुद्धि और मोक्ष का सबसे सरल एवं प्रत्यक्ष मार्ग है।"
              : "In Vedic wisdom and the Bhakti tradition, Naam Jaap (mantra repetition) is celebrated as the most direct and potent path to inner serenity. Unlike elaborate rituals, divine name chanting requires no external materials—only sincere remembrance and an open heart."}
          </p>
        </div>

        {/* 3 Pillar Cards */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-white/80 backdrop-blur-sm p-5 border border-[#e8d5bf]">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold mb-3">
              108
            </div>
            <h3 className="font-serif font-semibold text-lg text-ink">
              {isHi ? "108 मनकों का रहस्य" : "Significance of 108"}
            </h3>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              {isHi
                ? "108 उपनिषद्, 27 नक्षत्रों के 4 चरण और सूर्य तथा पृथ्वी की दिव्य दूरी का अनुपात 108 है। एक माला ब्रह्मांडीय ऊर्जा से जुड़ने का पावन चक्र है।"
                : "108 represents the cosmic ratio of the distance to the Sun and Moon, 27 Nakshatras with 4 Padas, and the spiritual energy channels connecting the heart."}
            </p>
          </div>

          <div className="rounded-2xl bg-white/80 backdrop-blur-sm p-5 border border-[#e8d5bf]">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold mb-3">
              ✨
            </div>
            <h3 className="font-serif font-semibold text-lg text-ink">
              {isHi ? "चित्त शुद्धि और शांति" : "Mental Purification"}
            </h3>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              {isHi
                ? "निरंतर नाम स्मरण से मानसिक तनाव, नकारात्मक विचार और भय समाप्त होते हैं। मन में एकाग्रता और सकारात्मक ऊर्जा का संचार होता है।"
                : "Continuous divine repetition dissolves anxiety, breaks compulsive thought loops, and cultivates deep neurological tranquility and focus."}
            </p>
          </div>

          <div className="rounded-2xl bg-white/80 backdrop-blur-sm p-5 border border-[#e8d5bf]">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold mb-3">
              📿
            </div>
            <h3 className="font-serif font-semibold text-lg text-ink">
              {isHi ? "डिजिटल जप एवं एकाग्रता" : "Digital Mala Practice"}
            </h3>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              {isHi
                ? "कार्यालय, यात्रा या दिनचर्या में जब भौतिक माला उपलब्ध न हो, तब यह डिजिटल जप काउंटर आपको प्रतिदिन के संकल्प से जोड़े रखता है।"
                : "Whether traveling or sitting at work, this digital counter helps householders sustain their daily vow effortlessly without breaking the streak."}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Step-by-Step Vidhi */}
      <section className="rounded-3xl bg-white p-6 sm:p-10 border border-line shadow-sm">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200 mb-3">
            <BookOpen className="w-3.5 h-3.5 text-amber-600" />
            {isHi ? "सरल जप विधि" : "How to Practice Naam Jaap (Step-by-Step)"}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ink">
            {isHi ? "दैनिक नाम जप की सही एवं फलदायी विधि" : "The 4 Sacred Steps for Fruitful Naam Jaap"}
          </h2>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="relative p-5 rounded-2xl bg-[#fffaf4] border border-[#f0dfcc]">
            <span className="text-4xl font-serif font-bold text-orange-200/80 absolute top-3 right-4">01</span>
            <h4 className="font-serif font-semibold text-lg text-ink mt-2">
              {isHi ? "स्थान एवं आसन" : "Sacred Space"}
            </h4>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              {isHi
                ? "पूर्व या उत्तर दिशा की ओर मुख करके शांत वातावरण में रीढ़ सीधी रखकर सुखासन या पद्मासन में बैठें।"
                : "Sit comfortably with a straight spine facing East or North in a clean, quiet space to maintain alert stillness."}
            </p>
          </div>

          <div className="relative p-5 rounded-2xl bg-[#fffaf4] border border-[#f0dfcc]">
            <span className="text-4xl font-serif font-bold text-orange-200/80 absolute top-3 right-4">02</span>
            <h4 className="font-serif font-semibold text-lg text-ink mt-2">
              {isHi ? "ईष्ट स्मरण व संकल्प" : "Sankalp & Bhav"}
            </h4>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              {isHi
                ? "नेत्र बंद कर अपने आराध्य के स्वरूप का ध्यान करें और मन ही मन कम से कम 1 माला (108 बार) का संकल्प लें।"
                : "Center your mind on the Divine form or meaning, taking a gentle vow of 1, 3, or 11 malas without haste."}
            </p>
          </div>

          <div className="relative p-5 rounded-2xl bg-[#fffaf4] border border-[#f0dfcc]">
            <span className="text-4xl font-serif font-bold text-orange-200/80 absolute top-3 right-4">03</span>
            <h4 className="font-serif font-semibold text-lg text-ink mt-2">
              {isHi ? "मनसा या उपांशु जप" : "Rhythmic Chanting"}
            </h4>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              {isHi
                ? "मंत्र का उच्चारण या तो धीमी ध्वनि में (उपांशु) करें अथवा मन ही मन (मानसिक) करें। गति मध्यम और लयबद्ध रखें।"
                : "Recite with rhythm—either soft whispered (Upanshu) or silently in the mind (Manasik). Feel each syllable resonate."}
            </p>
          </div>

          <div className="relative p-5 rounded-2xl bg-[#fffaf4] border border-[#f0dfcc]">
            <span className="text-4xl font-serif font-bold text-orange-200/80 absolute top-3 right-4">04</span>
            <h4 className="font-serif font-semibold text-lg text-ink mt-2">
              {isHi ? "प्रणाम व समर्पण" : "Dedication"}
            </h4>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              {isHi
                ? "जप समाप्त होने पर 2 मिनट शांत बैठें, प्रभु के चरणों में जप का फल समर्पित करें और आज की साधना साझा करें।"
                : "Sit quietly for a minute after completion, absorbing the stillness and offering your chanting to the Divine."}
            </p>
          </div>
        </div>
      </section>

      {/* 3. Cross-Linking to Mantras & Daily Sadhana */}
      <section className="rounded-3xl bg-[#fdfbf7] p-6 sm:p-10 border border-line">
        <h2 className="font-serif text-2xl font-bold text-ink">
          {isHi ? "संबंधित पावन साधना एवं मंत्र संग्रह" : "Explore Related Mantras & Daily Sadhana"}
        </h2>
        <p className="mt-2 text-sm text-muted">
          {isHi
            ? "अपने आध्यात्मिक अभ्यास को और गहरा करने के लिए इन विशेष संग्रहों को अवश्य देखें:"
            : "Deepen your daily devotion with our curated spiritual guides, audio bhajans, and Vedic calendars:"}
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <LocaleLink
            href={PATHS.mantras}
            className="group block p-4 rounded-2xl bg-white border border-line hover:border-saffron hover:shadow-md transition"
          >
            <span className="text-xs font-semibold text-saffron uppercase tracking-wider">
              {isHi ? "मंत्र संग्रह" : "Mantra Library"}
            </span>
            <h3 className="font-serif font-semibold text-base text-ink group-hover:text-saffron-deep transition mt-1">
              {isHi ? "दैनिक नाम जप मंत्र व अर्थ" : "Sacred Mantras for Daily Jaap"}
            </h3>
            <p className="text-xs text-muted mt-1.5">
              {isHi
                ? "महामृत्युंजय, गायत्री व राम मंत्र का प्रामाणिक अर्थ"
                : "Pronunciation, Vedic meanings and significance"}
            </p>
          </LocaleLink>

          <LocaleLink
            href={PATHS.sankalp}
            className="group block p-4 rounded-2xl bg-white border border-line hover:border-saffron hover:shadow-md transition"
          >
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-wider">
              {isHi ? "साधना संकल्प" : "Sankalp Tracker"}
            </span>
            <h3 className="font-serif font-semibold text-base text-ink group-hover:text-saffron-deep transition mt-1">
              {isHi ? "राम नाम एवं महामंत्र संकल्प" : "Global Ram Naam Sankalp"}
            </h3>
            <p className="text-xs text-muted mt-1.5">
              {isHi ? "लाखों भक्तों के साथ मिलकर संकल्प पूर्ण करें" : "Join devotee groups and keep your daily vows"}
            </p>
          </LocaleLink>

          <LocaleLink
            href={PATHS.tithi}
            className="group block p-4 rounded-2xl bg-white border border-line hover:border-saffron hover:shadow-md transition"
          >
            <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider">
              {isHi ? "दैनिक पंचांग" : "Daily Panchang"}
            </span>
            <h3 className="font-serif font-semibold text-base text-ink group-hover:text-saffron-deep transition mt-1">
              {isHi ? "आज की तिथि व शुभ मुहूर्त" : "Aaj Ki Tithi & Muhurat"}
            </h3>
            <p className="text-xs text-muted mt-1.5">
              {isHi ? "ब्रह्म मुहूर्त व एकादशी व्रत की सटीक गणना" : "Accurate sunrise tithi and auspicious meditation hours"}
            </p>
          </LocaleLink>

          <LocaleLink
            href={PATHS.chalisa}
            className="group block p-4 rounded-2xl bg-white border border-line hover:border-saffron hover:shadow-md transition"
          >
            <span className="text-xs font-semibold text-red-600 uppercase tracking-wider">
              {isHi ? "चालीसा पाठ" : "Chalisa Sangrah"}
            </span>
            <h3 className="font-serif font-semibold text-base text-ink group-hover:text-saffron-deep transition mt-1">
              {isHi ? "श्री हनुमान चालीसा व स्तुति" : "Hanuman Chalisa & Stuti"}
            </h3>
            <p className="text-xs text-muted mt-1.5">
              {isHi ? "सरल हिंदी अनुवाद एवं भावार्थ सहित" : "Complete verses with Hindi and English meanings"}
            </p>
          </LocaleLink>
        </div>
      </section>
    </div>
  );
}
