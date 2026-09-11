import type { Faq } from "@/lib/content/types";

export const SPIRITUAL_TOOL_FAQS = {
  landing: [
    {
      question: "Are all spiritual tools on BhaktiVoice completely free to use?",
      answer:
        "Yes, 100% free forever. All Vedic calculators—including Daily Panchang, Hindu Calendar 2026, Janam Kundli, and Kundli Milan—are freely available to devotees with no hidden fees, subscriptions, or login requirements.",
    },
    {
      question: "Is my personal birth data and location kept private and secure?",
      answer:
        "Yes, absolutely. All calculations run client-side right inside your web browser. Your birth date, time, latitude, and longitude are never saved, tracked, or sent to any remote servers.",
    },
    {
      question: "What spiritual and Vedic tools are available on BhaktiVoice?",
      answer:
        "BhaktiVoice provides a complete suite of authentic Vedic tools: (1) Live Daily Panchang with Shubh Muhurat and Choghadiya, (2) Interactive Hindu Calendar 2026 with Tithi, Vrat & Festivals, (3) Free Janam Kundli birth chart generator, (4) 36 Guna Ashtakoot Kundli Milan for marriage compatibility, and (5) Aaj Ki Tithi live tracker.",
    },
    {
      question: "How accurate are the Panchang and Shubh Muhurat calculations?",
      answer:
        "Our calculation engine uses rigorous mathematical astronomy based on Surya Siddhanta principles, calculating true solar and lunar angular positions, sunrise/sunset, tithi end timings, Rahu Kaal, Abhijit Muhurat, and Day/Night Choghadiyas tailored to your specific city.",
    },
    {
      question: "How does 36 Guna Kundli Milan work for marriage compatibility?",
      answer:
        "Kundli Milan performs the traditional Vedic Ashtakoot test across 8 categories: Varna (work affinity), Vashya (dominance), Tara (destiny/health), Yoni (temperament), Graha Maitri (friendship), Gana (nature), Bhakoot (emotional harmony & prosperity), and Nadi (genetic health & spiritual compatibility) totaling 36 Gunas. A score of 18 or above is considered auspicious.",
    },
    {
      question: "Can I use these Vedic tools on mobile devices without downloading an app?",
      answer:
        "Yes. All BhaktiVoice tools are lightweight, ultra-fast web applications designed to work smoothly on mobile phones, tablets, and desktops directly through any web browser without needing to install any app.",
    },
    {
      question: "How does the Hindu Calendar 2026 help in planning fasts and festivals?",
      answer:
        "The Hindu Calendar provides complete monthly views highlighting Ekadashis, Purnimas, Amavasyas, Pradosh Vrats, Sankranti dates, and major festivals along with auspicious timings, Puja Vidhi, Vrat Katha, and 1-click export to Google and Apple Calendar.",
    },
  ] satisfies Faq[],

  panchang: [
    {
      question: "What is Panchang?",
      answer:
        "Panchang is the traditional Hindu astronomical almanac based on five limbs (Pancha-Anga) — Tithi (lunar day), Vara (solar day), Nakshatra (lunar mansion), Yoga (soli-lunar angle), and Karana (half tithi). Devotees consult it for Shubh Muhurat, fasting, and daily spiritual sadhana.",
    },
    {
      question: "Is this location-specific?",
      answer:
        "Yes. BhaktiVoice calculates exact sunrise, sunset, moonrise, Rahu Kaal, and Choghadiyas based on the geographic latitude and longitude of your chosen city in India or globally.",
    },
    {
      question: "What is the difference between Abhijit Muhurat and Rahu Kaal?",
      answer:
        "Abhijit Muhurat is the most auspicious midday window (approximately 48 minutes around solar noon) ideal for starting new endeavors. Rahu Kaal is an inauspicious daily period of approximately 90 minutes ruled by Rahu during which auspicious beginnings should be avoided.",
    },
  ] satisfies Faq[],

  kundli: [
    {
      question: "Is my birth data safe?",
      answer:
        "Absolutely. Your date, exact time, and birthplace are computed locally in your browser and never stored or transmitted to external servers.",
    },
    {
      question: "What do I need to generate a Kundli?",
      answer:
        "Enter your exact date of birth, time of birth, and birthplace. For the most accurate Ascendant (Lagna) and planetary house positions, use the precise time recorded on your official birth record.",
    },
    {
      question: "What are the 16 Divisional Charts (Shodashvarga) in Vedic astrology?",
      answer:
        "Shodashvarga refers to the 16 harmonic sub-divisional charts formulated by Maharishi Parashara: D-1 (Rashi - physical life), D-2 (Hora - wealth), D-3 (Drekkana - siblings & courage), D-4 (Chaturthamsha - fortune & property), D-7 (Saptamsha - progeny), D-9 (Navamsha - spouse, dharma & inner self), D-10 (Dashamsha - career & status), D-12 (Dwadashamsha - parents), D-16 (Shodashamsha - vehicles & pleasures), D-20 (Vimshamsha - spirituality), D-24 (Chaturvimshamsha - learning & intellect), D-27 (Saptavimshamsha - strength), D-30 (Trimshamsha - misfortunes & evils), D-40 (Khavedamsha - auspiciousness), D-45 (Akshavedamsha - character), and D-60 (Shashtiamsha - karmic past life).",
    },
    {
      question: "How does the Parashari Ashtakavarga system evaluate strength?",
      answer:
        "Ashtakavarga evaluates the relative benefic influence (Bindus) of the 7 major planets across all 12 houses. The total Sarvashtakavarga (SAV) score is 337 points. Houses with 28 or more Bindus indicate strength, prosperity, and auspicious transit results, while houses below 25 require remedial astrological attention.",
    },
  ] satisfies Faq[],

  milan: [
    {
      question: "How many Gunas are required for marriage compatibility?",
      answer:
        "In traditional Vedic astrology, a minimum of 18 out of 36 Gunas is required for a viable match. A score between 18–24 is considered average, 25–32 is very good, and 33–36 is exceptionally auspicious.",
    },
    {
      question: "What is Ashtakoot Milan?",
      answer:
        "Ashtakoot Milan is the 8-fold Vedic compatibility method evaluating Varna, Vashya, Tara, Yoni, Graha Maitri, Gana, Bhakoot, and Nadi — totaling 36 Gunas to ensure physical, psychological, financial, and spiritual harmony.",
    },
  ] satisfies Faq[],
} as const;

export const SPIRITUAL_TOOL_FAQS_HI = {
  landing: [
    {
      question: "क्या भक्ति वॉइस के सभी आध्यात्मिक एवं वैदिक उपकरण निःशुल्क हैं?",
      answer:
        "हाँ, भक्ति वॉइस पर उपलब्ध सभी वैदिक टूल्स—जैसे दैनिक पंचांग, हिन्दू कैलेंडर 2026, जन्म कुंडली और कुंडली मिलान—पूरी तरह 100% निःशुल्क हैं। इनके उपयोग के लिए किसी प्रकार का शुल्क, सब्सक्रिप्शन या पंजीकरण आवश्यक नहीं है।",
    },
    {
      question: "क्या मेरी जन्म तिथि, समय और स्थान की जानकारी सुरक्षित और गोपनीय है?",
      answer:
        "हाँ, पूर्ण रूप से सुरक्षित और निजी है। हमारे सभी उपकरण सीधे आपके ब्राउज़र में चलते हैं। आपके द्वारा दर्ज की गई जन्म तिथि, जन्म समय, शहर या जीपीएस लोकेशन की जानकारी कभी भी किसी सर्वर पर स्टोर या शेयर नहीं की जाती।",
    },
    {
      question: "भक्ति वॉइस पर कौन-कौन से आध्यात्मिक उपकरण उपलब्ध हैं?",
      answer:
        "भक्ति वॉइस पर प्रमुख वैदिक उपकरण उपलब्ध हैं: (1) आज का पंचांग (शुभ मुहूर्त, राहु काल और चौघड़िया सहित), (2) हिन्दू कैलेंडर 2026 (मासिक तिथि, व्रत और त्यौहार), (3) मुफ्त जन्म कुंडली निर्माण, (4) 36 गुण अष्टकूट कुंडली मिलान (विवाह अनुकूलता), और (5) आज की तिथि लाइव ट्रैकर।",
    },
    {
      question: "पंचांग और शुभ मुहूर्त की गणना कितनी सटीक है?",
      answer:
        "हमारा पंचांग इंजन सूर्य सिद्धांत और आधुनिक खगोलीय गणितीय सूत्रों पर आधारित है। यह सूर्य-चंद्रमा के सटीक कोणीय अंतर के आधार पर तिथि, नक्षत्र, योग, करण, सूर्योदय-सूर्यास्त, अभिजित मुहूर्त, राहु काल और दिन-रात के चौघड़िया की नगर-वार सटीक गणना करता है।",
    },
    {
      question: "विवाह हेतु 36 गुण कुंडली मिलान (अष्टकूट मिलान) कैसे कार्य करता है?",
      answer:
        "कुंडली मिलान वैदिक ज्योतिष के 8 महत्वपूर्ण आयामों का विश्लेषण करता है: वर्ण (1 गुण), वश्य (2 गुण), तारा (3 गुण), योनि (4 गुण), ग्रह मैत्री (5 गुण), गण (6 गुण), भकूट (7 गुण), और नाड़ी (8 गुण)—कुल 36 गुण। वैवाहिक जीवन में सुख-समृद्धि हेतु 18 या उससे अधिक गुणों का मिलना शुभ माना जाता है।",
    },
    {
      question: "क्या मैं बिना किसी ऐप को डाउनलोड किए मोबाइल पर इन टूल्स का उपयोग कर सकता हूँ?",
      answer:
        "हाँ, बिल्कुल। भक्ति वॉइस के सभी टूल्स बेहद तेज़ और मोबाइल-फ्रेंडली हैं। आप किसी भी स्मार्टफोन, टैबलेट या कंप्यूटर के ब्राउज़र पर बिना कोई ऐप इंस्टॉल किए इनका सहजता से उपयोग कर सकते हैं।",
    },
    {
      question: "हिन्दू कैलेंडर 2026 व्रत और त्यौहारों के लिए कैसे उपयोगी है?",
      answer:
        "हिन्दू कैलेंडर 2026 में पूरे वर्ष के सभी 12 महीनों की तिथियाँ, एकादशी, प्रदोष व्रत, पूर्णिमा, अमावस्या, संक्रांति और प्रमुख त्यौहारों की तिथियाँ, पूजा विधि, व्रत कथा और शुभ मुहूर्त उपलब्ध हैं। आप त्यौहारों को सीधे अपने गूगल/एप्पल कैलेंडर में भी जोड़ सकते हैं।",
    },
  ] satisfies Faq[],

  panchang: [
    {
      question: "पंचांग क्या है और इसके पाँच अंग कौन से हैं?",
      answer:
        "पंचांग हिन्दू काल-गणना का मूल आधार है जो पाँच अंगों से मिलकर बना है — तिथि, वार, नक्षत्र, योग और करण। धार्मिक अनुष्ठान, व्रत-पर्व, शुभ मुहूर्त और दैनिक साधना हेतु पंचांग का मार्गदर्शन लिया जाता है।",
    },
    {
      question: "क्या पंचांग की गणना शहर के अनुसार बदलती है?",
      answer:
        "हाँ, सूर्योदय और सूर्यास्त का समय प्रत्येक शहर के अक्षांश और देशांतर के अनुसार बदलता है, जिससे तिथियों की समाप्ति और चौघड़िया मुहूर्त का समय भी स्थान के अनुसार सटीक रूप से निर्धारित होता है।",
    },
    {
      question: "अभिजित मुहूर्त और राहु काल में क्या अंतर है?",
      answer:
        "अभिजित मुहूर्त प्रतिदिन दोपहर का अत्यंत शुभ समय (लगभग 48 मिनट) होता है, जिसमें कोई भी नया या शुभ कार्य आरम्भ करना अत्यंत फलदायी माना जाता है। वहीं राहु काल लगभग 90 मिनट की अशुभ अवधि होती है, जिसमें शुभ कार्यों को टालना चाहिए।",
    },
  ] satisfies Faq[],

  kundli: [
    {
      question: "क्या मेरी जन्म कुंडली की जानकारी सुरक्षित है?",
      answer:
        "हाँ, आपकी जन्म तिथि, समय और स्थान की गणना केवल आपके डिवाइस में होती है और यह कहीं भी स्टोर नहीं की जाती।",
    },
    {
      question: "सटीक जन्म कुंडली बनाने के लिए क्या आवश्यक है?",
      answer:
        "सटीक लग्न और ग्रह स्थिति हेतु सटीक जन्म तिथि, जन्म समय (घंटे और मिनट) और जन्म स्थान दर्ज करें।",
    },
    {
      question: "वैदिक ज्योतिष में 16 वर्ग कुंडलियां (षोडशवर्ग) क्या होती हैं?",
      answer:
        "महर्षि पराशर द्वारा प्रतिपादित 16 वर्ग कुंडलियां जीवन के विभिन्न क्षेत्रों का सूक्ष्म विश्लेषण करती हैं: D-1 लग्न (शारीरिक जीवन), D-2 होरा (धन-संपत्ति), D-3 द्रेष्काण (भाई-बहन व पराक्रम), D-7 सप्तमांश (संतान), D-9 नवांश (विवाह व धर्म), D-10 दशमांश (आजीविका, करियर व मान-प्रतिष्ठा), D-12 द्वादशांश (माता-पिता), D-30 त्रिंशांश (अरिष्ट व कष्ट) तथा D-60 षष्ट्यंश (पूर्व जन्म के संचित कर्म)।",
    },
    {
      question: "महर्षि पराशर अष्टाकवर्ग पद्धति कैसे काम करती है?",
      answer:
        "अष्टाकवर्ग में 7 प्रमुख ग्रहों द्वारा 12 भावों में दिए गए शुभ अंकों (बिंदुओं) का मूल्यांकन किया जाता है। कुल सर्वाष्टाकवर्ग (SAV) 337 बिंदुओं का होता है। जिस भाव में 28 या अधिक बिंदु होते हैं, वह भाव बलिष्ठ एवं शुभ फलदायी होता है, जबकि 25 से कम बिंदु वाले भावों में सावधानी आवश्यक होती है।",
    },
  ] satisfies Faq[],

  milan: [
    {
      question: "विवाह के लिए कितने गुण मिलना आवश्यक माना जाता है?",
      answer:
        "वैदिक अष्टकूट मिलान में कुल 36 में से कम से कम 18 गुणों का मिलना अनुकूल माना जाता है। 18 से 24 गुण मध्यम, 25 से 32 गुण उत्तम और 33 से 36 गुण अति उत्तम माने जाते हैं।",
    },
    {
      question: "अष्टकूट मिलान क्या है?",
      answer:
        "अष्टकूट मिलान में वर्ण, वश्य, तारा, योनि, ग्रह मैत्री, गण, भकूट और नाड़ी—इन 8 घटकों के कुल 36 गुणों का मिलान कर वर-वधू के मानसिक, शारीरिक, आर्थिक और पारिवारिक सामंजस्य की जांच की जाती है।",
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
    "panchang online",
    "hindu calendar 2026",
    "free kundli",
    "kundli milan hindi",
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
    "kundli in hindi",
    "online kundli",
    "birth chart calculator",
    "free kundli reading online",
    "exact janam patrika by date of birth",
    "vedic astrology chart",
    "16 divisional charts",
    "shodashvarga chart calculator",
    "navamsha chart d9",
    "dashamsha chart d10",
    "ashtakavarga calculator",
    "sarvashtakavarga points calculator",
    "parashari ashtakavarga",
    "south indian kundli online",
    "east indian kundli chart",
    "kundli kaise dekhe",
    "janam kundali online free in hindi",
    "manglik dosha calculator",
    "vimshottari dasha calculator",
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
