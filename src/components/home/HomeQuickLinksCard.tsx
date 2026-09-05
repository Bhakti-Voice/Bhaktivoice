import { LocaleLink } from "@/components/i18n/LocaleLink";
import { PATHS } from "@/lib/seo/paths";
import {
  Compass,
  Sparkles,
  Sun,
  Flame,
  Landmark,
  BookOpen,
  ArrowUpRight,
  Clock,
  ShieldCheck,
} from "lucide-react";
import type { ReactNode } from "react";

interface HomeQuickLinksCardProps {
  locale: string;
}

interface QuickLinkItem {
  href: string;
  label: string;
  featured?: boolean;
}

interface QuickLinkCategory {
  title: string;
  icon: ReactNode;
  badge: string;
  links: QuickLinkItem[];
}

export function HomeQuickLinksCard({ locale }: HomeQuickLinksCardProps) {
  const isHi = locale === "hi";

  const categories: QuickLinkCategory[] = [
    // 1. Shubh Muhurats & Choghadiya
    {
      title: isHi ? "शुभ मुहूर्त एवं चौघड़िया (Muhurat Hub)" : "Auspicious Muhurat & Timings",
      icon: <Clock className="h-4 w-4 text-amber-600" />,
      badge: isHi ? "शुभ वेला" : "Auspicious",
      links: [
        { href: PATHS.regionalPanchang("panchang-utilities"), label: isHi ? "आज का चौघड़िया (Day/Night)" : "Choghadiya (Day & Night)", featured: true },
        { href: PATHS.regionalPanchang("panchang-utilities"), label: isHi ? "शुभ ग्रह होरा चक्र" : "Shubha Planetary Hora" },
        { href: PATHS.shubhDates("vivah-muhurat"), label: isHi ? "शुभ विवाह मुहूर्त 2026 (कैलेंडर)" : "Vivah Muhurat (Wedding Calendar)", featured: true },
        { href: PATHS.shubhDates("griha-pravesh"), label: isHi ? "गृह प्रवेश एवं वास्तु मुहूर्त" : "Griha Pravesh Calendar" },
        { href: PATHS.shubhDates("property-purchase"), label: isHi ? "संपत्ति एवं भूमि रजिस्ट्री मुहूर्त" : "Property Purchase Calendar" },
        { href: PATHS.shubhDates("vehicle-purchase"), label: isHi ? "वाहन क्रय मुहूर्त (कार/बाइक कैलेंडर)" : "Vehicle Purchase Calendar", featured: true },
        { href: PATHS.shubhDates("business-opening"), label: isHi ? "व्यापार एवं दुकान उद्घाटन मुहूर्त" : "Business Opening Muhurat" },
        { href: PATHS.shubhDates("gold-buying"), label: isHi ? "सोना व चांदी खरीद मुहूर्त (पुष्य योग)" : "Gold Buying Muhurat" },
        { href: PATHS.shubhDates("vidyarambha"), label: isHi ? "विद्यारंभ व अक्षरारंभ संस्कार" : "Vidyarambha Muhurat" },
        { href: PATHS.shubhDates("naamkaran"), label: isHi ? "नामकरण संस्कार शुभ मुहूर्त" : "Naamkaran Samskara Muhurat" },
        { href: PATHS.shubhDates("mundan"), label: isHi ? "मुंडन (चूड़ाकरण) मुहूर्त 2026" : "Mundan Ceremony Muhurat" },
        { href: PATHS.shubhDates("karnavedha"), label: isHi ? "कर्णवेध (कान छेदन) मुहूर्त" : "Karnavedha Muhurat" },
        { href: PATHS.regionalPanchang("panchang-utilities"), label: isHi ? "राहु काल एवं यमगण्ड समय" : "Rahu Kala & Inauspicious Hours" },
        { href: PATHS.regionalPanchang("dainik-panchang"), label: isHi ? "अभिजित मुहूर्त (दैनिक श्रेष्ठ काल)" : "Abhijit Muhurat (Daily Best Time)" },
        { href: PATHS.regionalPanchang("chandrabalam"), label: isHi ? "चंद्रबलम एवं गोचर शुद्धि" : "Chandrabalam & Lunar Transit" },
        { href: PATHS.regionalPanchang("vinchudo"), label: isHi ? "विंछुड़ो विचार एवं परिहार" : "Vinchudo Dosha & Timing" },
        { href: PATHS.regionalPanchang("nakshatra"), label: isHi ? "नक्षत्र ताराबल एवं शुभाशुभ फल" : "Nakshatra Tarabalam Grid" },
        { href: PATHS.regionalPanchang("panchang-utilities"), label: isHi ? "सप्ताह के दिशाशूल एवं उपाय" : "Dishashool Directional Rules" },
      ],
    },

    // 2. Vrat, Upavas & Sacred Observances
    {
      title: isHi ? "सनातन व्रत एवं उपवास (Vrat & Upavas)" : "Sacred Vrats & Fasting Days",
      icon: <Flame className="h-4 w-4 text-orange-600" />,
      badge: isHi ? "तप व पुण्य" : "Devotion",
      links: [
        { href: PATHS.festivals, label: isHi ? "एकादशी व्रत एवं पारण समय (२४ एकादशी)" : "Ekadashi Vrat & Parana Dates", featured: true },
        { href: PATHS.festivals, label: isHi ? "प्रदोष व्रत (त्रयोदशी शिव पूजा)" : "Pradosh Vrat (Shiva Twilight)" },
        { href: PATHS.festivals, label: isHi ? "संकष्टी चतुर्थी (चंद्रोदय गणेश पूजा)" : "Sankashti Chaturthi Dates" },
        { href: PATHS.festivals, label: isHi ? "मासिक शिवरात्रि व्रत विधान" : "Masik Shivratri Vrat" },
        { href: PATHS.festivals, label: isHi ? "पूर्णिमा व्रत एवं श्री सत्यनारायण कथा" : "Purnima Vrat & Satyanarayan Puja", featured: true },
        { href: PATHS.festivals, label: isHi ? "अमावस्या एवं पितृ तर्पण श्राद्ध" : "Amavasya Pitru Tarpan Dates" },
        { href: PATHS.festivals, label: isHi ? "शारदीय व चैत्र नवरात्रि उपवास" : "Navratri 9 Days Vrat & Ghatasthapana" },
        { href: PATHS.calendar, label: isHi ? "रोहिणी व्रत एवं जैन पच्चक्खाण" : "Rohini Vrat & Ascetic Observances" },
        { href: PATHS.calendar, label: isHi ? "सम्पूर्ण मासिक व्रत-पर्व कैलेंडर 2026" : "Monthly Vrat & Festival Calendar 2026" },
      ],
    },

    // 3. Panchang & Vedic Calendars
    {
      title: isHi ? "वैदिक पंचांग एवं क्षेत्रीय पंजिका" : "Panchang & Regional Calendars",
      icon: <Sun className="h-4 w-4 text-amber-700" />,
      badge: isHi ? "लाइव काल" : "Ephemeris",
      links: [
        { href: PATHS.panchangToday, label: isHi ? "आज का दैनिक पंचांग (Live)" : "Today's Panchang (Live)", featured: true },
        { href: PATHS.panchangTomorrow, label: isHi ? "कल का अग्रिम पंचांग" : "Tomorrow's Advance Panchang" },
        { href: PATHS.panchangYesterday, label: isHi ? "बीते दिवस का पंचांग" : "Yesterday's Panchang Record" },
        { href: PATHS.calendar, label: isHi ? "हिन्दू कैलेंडर 2026 (संवत्सर)" : "Hindu Calendar 2026 (Vikram Samvat)", featured: true },
        { href: PATHS.tithi, label: isHi ? "आज की तिथि एवं चंद्र कला" : "Aaj Ki Tithi & Lunar Phase" },
        { href: PATHS.regionalPanchang("month-panchang"), label: isHi ? "मासिक पंचांग (पूर्णिमान्त/अमान्त)" : "Month Panchang (Full Grid)" },
        { href: PATHS.regionalPanchang("dainik-panchang"), label: isHi ? "दैनिक पंचांग ५ अंग विवरण" : "Dainik Panchang 5 Limbs" },
        { href: PATHS.regionalPanchang("gujarati-panchang"), label: isHi ? "गुजराती पंचांग (विक्रम संवत)" : "Gujarati Panchang" },
        { href: PATHS.regionalPanchang("marathi-panchang"), label: isHi ? "मराठी पंचांग (शालिवाहन शक)" : "Marathi Panchang" },
        { href: PATHS.regionalPanchang("bengali-panjika"), label: isHi ? "बंगाली पंजिका (सूर्याब्द)" : "Bengali Panjika" },
        { href: PATHS.regionalPanchang("tamil-panchangam"), label: isHi ? "तमिल पंचांगम (सौर मास)" : "Tamil Panchangam" },
        { href: PATHS.regionalPanchang("iskcon-panchang"), label: isHi ? "इस्कॉन वैष्णव कैलेंडर (गौराब्द)" : "ISKCON Gaurabda Calendar" },
      ],
    },

    // 4. Spiritual Sadhana, Mantras & Sacred Gita
    {
      title: isHi ? "साधना, नाम जप एवं श्रीमद्भगवद्गीता" : "Sadhana, Mantras & Gita",
      icon: <BookOpen className="h-4 w-4 text-emerald-700" />,
      badge: isHi ? "आत्मोद्धार" : "Spiritual",
      links: [
        { href: PATHS.gita, label: isHi ? "श्रीमद्भगवद्गीता (१८ अध्याय, ७०० श्लोक)" : "Srimad Bhagavad Gita (18 Chapters)", featured: true },
        { href: PATHS.naamJaap, label: isHi ? "ऑनलाइन नाम जप काउंटर" : "Online Naam Jaap Counter", featured: true },
        { href: PATHS.mala, label: isHi ? "१०८ मनकों की डिजिटल जप माला" : "108 Japa Mala Digital Counter" },
        { href: PATHS.sadhana, label: isHi ? "दैनिक आध्यात्मिक साधना कक्ष" : "Daily Sadhana Sanctuary" },
        { href: PATHS.sankalp, label: isHi ? "पावन वैदिक संकल्प पत्र" : "Sacred Vedic Sankalp" },
        { href: PATHS.diary, label: isHi ? "दैनिक भक्ति डायरी" : "Devotional Spiritual Diary" },
        { href: PATHS.mantras, label: isHi ? "महामंत्र संग्रह (हरे कृष्ण, ॐ नमः शिवाय)" : "Sacred Mahamantra Collection", featured: true },
        { href: PATHS.spirituality, label: isHi ? "सनातन आध्यात्मिक ज्ञान एवं दर्शन" : "Sanatana Spiritual Wisdom" },
      ],
    },

    // 5. Katha, Temples & Sacred Yatra
    {
      title: isHi ? "कथा, मंदिर दर्शन एवं तीर्थ यात्रा" : "Katha, Temples & Yatra",
      icon: <Landmark className="h-4 w-4 text-rose-700" />,
      badge: isHi ? "तीर्थ दर्शन" : "Pilgrimage",
      links: [
        { href: PATHS.katha, label: isHi ? "पौराणिक कथाएं एवं व्रत कथा संग्रह" : "Puranic Katha & Vrat Katha", featured: true },
        { href: PATHS.temples, label: isHi ? "भारत के प्रमुख दिव्य मन्दिर" : "Sacred Hindu Temples Directory" },
        { href: PATHS.festivals, label: isHi ? "प्रमुख हिन्दू पर्व एवं उत्सव 2026" : "All Hindu Festivals 2026", featured: true },
        { href: PATHS.yatra, label: isHi ? "चार धाम एवं ज्योतिर्लिंग यात्रा गाइड" : "Char Dham & Jyotirlinga Guides" },
        { href: PATHS.yatraPlanner, label: isHi ? "तीर्थ यात्रा मार्ग एवं बजट प्लानर" : "Yatra Route & Budget Planner" },
        { href: PATHS.blog, label: isHi ? "भक्ति वॉइस आध्यात्मिक ब्लॉग" : "Bhakti Voice Spiritual Blog" },
        { href: PATHS.community, label: isHi ? "विश्वव्यापी भक्त समुदाय" : "Global Devotee Community" },
        { href: PATHS.store, label: isHi ? "पवित्र भक्ति स्टोर (पूजा सामग्री व पुस्तकें)" : "Bhakti Store (Pooja Items & Books)" },
      ],
    },

    // 6. Aarti, Chalisa, Bhajans & Vedic Astrology Tools
    {
      title: isHi ? "आरती, चालीसा, भजन एवं ज्योतिष टूल्स" : "Aarti, Chalisa, Bhajan & Tools",
      icon: <Sparkles className="h-4 w-4 text-purple-700" />,
      badge: isHi ? "स्तुति व टूल्स" : "Devotion & Tools",
      links: [
        { href: PATHS.aarti, label: isHi ? "सम्पूर्ण नित्य आरती संग्रह" : "Complete Aarti Sangrah", featured: true },
        { href: PATHS.chalisa, label: isHi ? "चालीसा संग्रह (हनुमान, शिव, दुर्गा)" : "Chalisa Sangrah (Hanuman, Shiva)" },
        { href: PATHS.bhajan, label: isHi ? "मधुर भजन, संकीर्तन एवं लिरिक्स" : "Bhajans, Kirtan & Lyrics" },
        { href: PATHS.quotes, label: isHi ? "दैनिक प्रेरक सुविचार एवं श्लोक" : "Daily Spiritual Quotes & Thoughts" },
        { href: PATHS.suvicharMaker, label: isHi ? "सुविचार कार्ड व स्टेटस मेकर" : "Suvichar Status & Card Maker", featured: true },
        { href: PATHS.kundli, label: isHi ? "मुफ्त वैदिक जन्म कुंडली" : "Free Vedic Kundli Horoscope" },
        { href: PATHS.kundliMilan, label: isHi ? "३६ गुण अष्टकूट मिलान" : "36 Guna Kundli Milan" },
        { href: PATHS.spiritualTools, label: isHi ? "सभी वैदिक व आध्यात्मिक उपकरण →" : "All Vedic Spiritual Tools →" },
      ],
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-4 lg:px-8" id="quick-navigation">
      <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-white via-[#fffdf9] to-[#fff8f0] p-5 shadow-xs ring-1 ring-amber-500/15 sm:p-6 lg:p-7">
        {/* Header Ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-500/10 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-saffron">
              <Compass className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-serif text-base font-bold text-ink sm:text-lg">
                {isHi ? "त्वरित नेविगेशन हब (Quick Navigation Hub) — सम्पूर्ण सनातन डायरेक्टरी" : "Quick Navigation Hub — Complete Sanatana Directory"}
              </h2>
              <p className="text-[11px] text-muted sm:text-xs">
                {isHi
                  ? "शुभ मुहूर्त, दैनिक पंचांग, एकादशी-प्रदोष व्रत, श्रीमद्भगवद्गीता, नाम जप, मंदिर, आरती एवं वैदिक ज्योतिष का प्रामाणिक प्रवेश द्वार"
                  : "Direct access to Auspicious Muhurat, Daily Panchang, Ekadashi Vrats, Bhagavad Gita, Naam Jaap, Temples & Vedic Astrology Tools"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3.5 py-1 text-[11px] font-semibold text-amber-800">
            <Sparkles className="h-3.5 w-3.5 text-saffron" />
            <span>{isHi ? "60+ प्रामाणिक वैदिक सेवाएं व पृष्ठ" : "60+ Authentic Vedic Services & Pages"}</span>
          </div>
        </div>

        {/* 6-Column / Responsive Quick Links Grid */}
        <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="flex flex-col rounded-2xl bg-white/70 p-4 ring-1 ring-amber-500/10 transition-all hover:bg-white hover:shadow-sm"
            >
              <div className="mb-3 flex items-center justify-between border-b border-amber-500/10 pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-50">
                    {cat.icon}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-ink/90">
                    {cat.title}
                  </span>
                </div>
                <span className="rounded-md bg-amber-100/70 px-2 py-0.5 text-[10px] font-bold text-amber-800">
                  {cat.badge}
                </span>
              </div>

              <ul className="flex flex-col space-y-1">
                {cat.links.map((link, lIdx) => (
                  <li key={`${link.href}-${lIdx}`}>
                    <LocaleLink
                      href={link.href}
                      className="group flex items-center justify-between rounded-xl px-2.5 py-1.5 text-[12.5px] font-medium text-ink/75 transition hover:bg-amber-50/80 hover:text-saffron-deep"
                    >
                      <span className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-400/60 group-hover:bg-saffron" />
                        <span className="line-clamp-1">{link.label}</span>
                      </span>
                      {link.featured ? (
                        <span className="shrink-0 rounded-md bg-amber-50 px-1.5 py-0.5 text-[9.5px] font-bold text-amber-800 ring-1 ring-amber-300/60">
                          {isHi ? "दिव्य" : "Featured"}
                        </span>
                      ) : (
                        <ArrowUpRight className="h-3 w-3 shrink-0 text-muted/40 opacity-0 transition group-hover:text-saffron group-hover:opacity-100" />
                      )}
                    </LocaleLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Rich SEO Foundational Article & Long-Form Guide: Eliminating Thin Content & Ranking Top on Google */}
        <article className="mt-8 border-t border-amber-500/15 pt-6 text-ink/80">
          <div className="rounded-2xl bg-amber-50/40 p-5 ring-1 ring-amber-400/20 sm:p-7">
            {isHi ? (
              <div>
                <h3 className="font-serif text-lg font-bold text-ink sm:text-xl">
                  सनातन वैदिक पंचांग, शुभ मुहूर्त एवं व्रत निर्णय की वैज्ञानिक परंपरा — विस्तृत दिग्दर्शिका
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-ink/75 sm:text-sm">
                  सनातन धर्म में समय केवल क्षणों का व्यतीत होना नहीं, बल्कि एक दिव्य एवं चेतन शक्ति है। हमारे ऋषियों ने आकाशमण्डल के सूर्य, चन्द्रमा, नक्षत्रों एवं ग्रहों के परिभ्रमण को देखकर <strong>काल-विज्ञान</strong> का ऐसा सूक्ष्म गणित रचा, जो सहस्रों वर्षों से अक्षुण्ण है। भक्ति वॉइस के इस <strong>त्वरित नेविगेशन हब (Quick Navigation Hub)</strong> का मुख्य उद्देश्य प्रत्येक साधक, गृहस्थ और ज्योतिष शोधार्थी को सटीक, शुद्ध और प्रामाणिक वैदिक ज्ञान सुलभ कराना है।
                </p>

                <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div className="rounded-xl bg-white p-4 shadow-2xs ring-1 ring-amber-500/10">
                    <h4 className="flex items-center gap-2 font-serif text-sm font-bold text-amber-900 sm:text-base">
                      <Clock className="h-4 w-4 text-saffron" />
                      १. शुभ मुहूर्त का महत्व एवं शुभाशुभ समय-चक्र
                    </h4>
                    <p className="mt-2 text-xs leading-relaxed text-muted">
                      शास्त्रों में कहा गया है: <em>&apos;मुहूर्तं चाप्यनुकूलं यत्कर्म तत्सिद्धिभाजनम्&apos;</em> अर्थात् अनुकूल मुहूर्त में किया गया कर्म अनायास ही सिद्धि और सफलता प्रदान करता है।
                    </p>
                    <ul className="mt-2.5 space-y-1.5 text-xs text-muted">
                      <li><strong>चौघड़िया चक्र:</strong> दिन और रात को ८-८ भागों में बाँटकर अमृत, शुभ, लाभ, चर (शुभ) तथा रोग, काल, उद्वेग (त्याज्य) का सटीक विचार।</li>
                      <li><strong>अभिजित मुहूर्त:</strong> दिन के आठवें मुहूर्त को भगवान श्रीहरि का आशीर्वाद प्राप्त है, जो सभी प्रकार के सामान्य ग्रह-दोषों का शमन कर विजय दिलाता है।</li>
                      <li><strong>ग्रह होरा:</strong> सूर्योदय से अगले सूर्योदय तक २४ घंटों में प्रत्येक घंटे का ग्रह स्वामी निश्चित होता है, जो विशिष्ट कार्यों (जैसे गुरु होरा में विद्यारंभ, शुक्र होरा में व्यापार) के लिए सर्वोत्तम है।</li>
                      <li><strong>विवाह व गृह प्रवेश मुहूर्त:</strong> त्रिबल शुद्धि (सूर्य, चन्द्र और गुरु का बल), शुद्ध लग्न और बाण-दोष रहित शुभ तिथियों का चयन अनिवार्य होता है।</li>
                    </ul>
                  </div>

                  <div className="rounded-xl bg-white p-4 shadow-2xs ring-1 ring-amber-500/10">
                    <h4 className="flex items-center gap-2 font-serif text-sm font-bold text-amber-900 sm:text-base">
                      <Flame className="h-4 w-4 text-orange-600" />
                      २. सनातन व्रत, एकादशी एवं उपवास के नियम
                    </h4>
                    <p className="mt-2 text-xs leading-relaxed text-muted">
                      उपवास केवल भोजन का त्याग नहीं, बल्कि &apos;उप + वास&apos; अर्थात् परमात्मा के सानिध्य में वास करना है।
                    </p>
                    <ul className="mt-2.5 space-y-1.5 text-xs text-muted">
                      <li><strong>२४ एकादशी व्रत:</strong> वर्ष की प्रत्येक एकादशी (निर्जला, मोक्षदा, देवशयनी, देवप्रबोधिनी आदि) मानसिक विकारों का नाश कर मोक्ष का मार्ग प्रशस्त करती है। हरिवासर और द्वादशी पारण समय का पालन अनिवार्य है।</li>
                      <li><strong>प्रदोष व्रत:</strong> प्रत्येक पक्ष की त्रयोदशी को प्रदोष काल (सूर्यास्त के समय) में भगवान शिव और माता पार्वती की उपासना से सभी पापों और ऋणों से मुक्ति मिलती है।</li>
                      <li><strong>संकष्टी चतुर्थी:</strong> विघ्नहर्ता भगवान गणेश का व्रत, जो चंद्रोदय के समय अर्घ्य देकर पूर्ण होता है। संकटों के निवारण हेतु यह अचूक व्रत है।</li>
                      <li><strong>पूर्णिमा व सत्यनारायण व्रत:</strong> मन के कारक चंद्रमा की पूर्ण आभा में श्री सत्यनारायण भगवान की कथा और दीपदान से परिवार में सुख-समृद्धि का वास होता है।</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-5 rounded-xl bg-white p-4 shadow-2xs ring-1 ring-amber-500/10">
                  <h4 className="flex items-center gap-2 font-serif text-sm font-bold text-amber-900 sm:text-base">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    ३. पंचांग के पाँच मूल अंग (पंचांग विज्ञान)
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-muted">
                    वैदिक काल गणना में पाँच अंगों की प्रमुखता होती है:
                  </p>
                  <div className="mt-2.5 grid grid-cols-2 gap-3 text-xs sm:grid-cols-5">
                    <div className="rounded-lg bg-amber-50/60 p-2.5">
                      <span className="font-bold text-ink">१. तिथि (Tithi)</span>
                      <p className="mt-1 text-[11px] text-muted">सूर्य-चंद्र के १२° कोणीय अंतर से तिथि बनती है, जो मानसिक शक्ति एवं संकल्प को संचालित करती है।</p>
                    </div>
                    <div className="rounded-lg bg-amber-50/60 p-2.5">
                      <span className="font-bold text-ink">२. वार (Vara)</span>
                      <p className="mt-1 text-[11px] text-muted">रविवार से शनिवार तक सातों दिनों के अधिपति ग्रह मनुष्य के दैनिक स्वास्थ्य व आयु को प्रभावित करते हैं।</p>
                    </div>
                    <div className="rounded-lg bg-amber-50/60 p-2.5">
                      <span className="font-bold text-ink">३. नक्षत्र (Nakshatra)</span>
                      <p className="mt-1 text-[11px] text-muted">२७ नक्षत्रों में चंद्रमा का संचरण मानव चेतना, स्वभाव और कर्म के परिणामों की दिशा तय करता है।</p>
                    </div>
                    <div className="rounded-lg bg-amber-50/60 p-2.5">
                      <span className="font-bold text-ink">४. योग (Yoga)</span>
                      <p className="mt-1 text-[11px] text-muted">सूर्य और चंद्रमा के भोगांशों का योग (विष्कम्भ से वैधृति तक २७ योग) शरीर के प्राण और संबंधों को नियंत्रित करता है।</p>
                    </div>
                    <div className="rounded-lg bg-amber-50/60 p-2.5">
                      <span className="font-bold text-ink">५. करण (Karana)</span>
                      <p className="mt-1 text-[11px] text-muted">तिथि का आधा भाग करण कहलाता है (११ करण), जो किसी भी भौतिक कर्म की तात्कालिक सफलता या बाधा का निर्धारण करता है।</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-[11.5px] text-muted">
                  <p>
                    <strong>लोकप्रिय खोजें:</strong> आज का पंचांग, शुभ विवाह मुहूर्त 2026, चौघड़िया तालिका, एकादशी पारण समय, राहुकाल आज, गृह प्रवेश मुहूर्त, प्रदोष व्रत 2026, श्रीमद्भगवद्गीता श्लोक अर्थ सहित।
                  </p>
                  <LocaleLink href={PATHS.spiritualTools} className="inline-flex items-center gap-1 font-semibold text-saffron-deep hover:underline">
                    सभी वैदिक उपकरण देखें <ArrowUpRight className="h-3 w-3" />
                  </LocaleLink>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="font-serif text-lg font-bold text-ink sm:text-xl">
                  The Science of Vedic Panchang, Auspicious Muhurats &amp; Sacred Fasting (Vrats)
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-ink/75 sm:text-sm">
                  In Sanatana Dharma, time is not a passive continuum; it is a conscious, sacred dimension governed by the cosmic dance of the Sun, the Moon, and stellar constellations. The ancient Vedic Rishis established <strong>Jyotisha (Astronomy &amp; Astrology)</strong> as the eye of the Vedas (<em>&apos;Jyotisham Netramuchyate&apos;</em>). Our <strong>Quick Navigation Hub</strong> connects you with authentic ephemeris calculations, auspicious timings, and liturgical guidelines to harmonize your daily life with cosmic rhythms.
                </p>

                <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div className="rounded-xl bg-white p-4 shadow-2xs ring-1 ring-amber-500/10">
                    <h4 className="flex items-center gap-2 font-serif text-sm font-bold text-amber-900 sm:text-base">
                      <Clock className="h-4 w-4 text-saffron" />
                      1. Vedic Muhurat Shastra: Synchronizing Action with Planetary Cycles
                    </h4>
                    <p className="mt-2 text-xs leading-relaxed text-muted">
                      Classical treatises like <em>Muhurta Chintamani</em> and <em>Brihat Samhita</em> declare that actions initiated during favorable cosmic windows yield effortless prosperity and protection.
                    </p>
                    <ul className="mt-2.5 space-y-1.5 text-xs text-muted">
                      <li><strong>Choghadiya Timings:</strong> The partition of daytime and nighttime into 8 equal slots (Amrit, Shubh, Labh, Char for auspicious starts; Rog, Kaal, Udveg to be avoided).</li>
                      <li><strong>Abhijit Muhurat:</strong> The sacred 8th diurnal Muhurat occurring around midday, blessed by Lord Vishnu to dissolve minor afflictions and ensure triumph.</li>
                      <li><strong>Planetary Horas:</strong> 24-hour planetary divisions tuning commercial, spiritual, medical, and learning endeavors to the governing planetary energy.</li>
                      <li><strong>Major Life Muhurats:</strong> Rigorous parameters for Vivah (weddings), Griha Pravesh (housewarming), property acquisition, and vehicle purchases.</li>
                    </ul>
                  </div>

                  <div className="rounded-xl bg-white p-4 shadow-2xs ring-1 ring-amber-500/10">
                    <h4 className="flex items-center gap-2 font-serif text-sm font-bold text-amber-900 sm:text-base">
                      <Flame className="h-4 w-4 text-orange-600" />
                      2. Sacred Vrats &amp; Fasting Science (Upavas)
                    </h4>
                    <p className="mt-2 text-xs leading-relaxed text-muted">
                      Fasting in the Vedic tradition (<em>Upavas</em>, literally &apos;dwelling near the divine&apos;) purifies the physical physiology and mental faculties.
                    </p>
                    <ul className="mt-2.5 space-y-1.5 text-xs text-muted">
                      <li><strong>24 Ekadashi Fasts:</strong> Occurring on the 11th lunar day of both fortnights to detoxify the mind, eliminate karmic residues, and awaken devotion. Observing Parana timing is paramount.</li>
                      <li><strong>Pradosh Vrat:</strong> Observed on Trayodashi during twilight (Pradosham) for the propitiation of Lord Shiva, dissolving debts and spiritual stagnation.</li>
                      <li><strong>Sankashti Chaturthi:</strong> Devoted to Lord Ganesha, observed during Krishna Paksha Chaturthi and concluded after sighting the moon to remove stubborn obstacles.</li>
                      <li><strong>Purnima &amp; Satyanarayan Puja:</strong> Honoring the complete brilliance of the Full Moon to invite peace, emotional harmony, and familial abundance.</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-5 rounded-xl bg-white p-4 shadow-2xs ring-1 ring-amber-500/10">
                  <h4 className="flex items-center gap-2 font-serif text-sm font-bold text-amber-900 sm:text-base">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    3. The 5 Pillars of Vedic Panchang (Pancha-Anga)
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-muted">
                    Every daily calculation rests upon five astronomical pillars:
                  </p>
                  <div className="mt-2.5 grid grid-cols-2 gap-3 text-xs sm:grid-cols-5">
                    <div className="rounded-lg bg-amber-50/60 p-2.5">
                      <span className="font-bold text-ink">1. Tithi (Lunar Day)</span>
                      <p className="mt-1 text-[11px] text-muted">Progression of the Moon 12° ahead of the Sun, governing vital emotional stability and vows.</p>
                    </div>
                    <div className="rounded-lg bg-amber-50/60 p-2.5">
                      <span className="font-bold text-ink">2. Vara (Solar Day)</span>
                      <p className="mt-1 text-[11px] text-muted">The 7 planetary weekdays influencing bodily energy, longevity, and worldly interactions.</p>
                    </div>
                    <div className="rounded-lg bg-amber-50/60 p-2.5">
                      <span className="font-bold text-ink">3. Nakshatra</span>
                      <p className="mt-1 text-[11px] text-muted">The 27 stellar lunar mansions directing the mind, destiny, mental inclination, and Tarabalam.</p>
                    </div>
                    <div className="rounded-lg bg-amber-50/60 p-2.5">
                      <span className="font-bold text-ink">4. Yoga (Angular Sum)</span>
                      <p className="mt-1 text-[11px] text-muted">The 27 soli-lunar yogas dictating the subtle pranic field and inner vitality of relationships.</p>
                    </div>
                    <div className="rounded-lg bg-amber-50/60 p-2.5">
                      <span className="font-bold text-ink">5. Karana (Half-Tithi)</span>
                      <p className="mt-1 text-[11px] text-muted">The 11 Karana divisions governing the immediate physical accomplishment or obstruction of work.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-[11.5px] text-muted">
                  <p>
                    <strong>High-Frequency Keywords:</strong> Today Panchang, Hindu Calendar 2026, Choghadiya Today, Vivah Muhurat 2026, Griha Pravesh Muhurat, Ekadashi Vrat Dates, Pradosh Vrat, Rahu Kaal Timing, Bhagavad Gita Shlokas with Meaning.
                  </p>
                  <LocaleLink href={PATHS.spiritualTools} className="inline-flex items-center gap-1 font-semibold text-saffron-deep hover:underline">
                    Explore All Vedic Tools <ArrowUpRight className="h-3 w-3" />
                  </LocaleLink>
                </div>
              </div>
            )}
          </div>
        </article>
      </div>
    </section>
  );
}

