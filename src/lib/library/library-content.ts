import type { Locale } from "@/lib/i18n/config";
import type { Faq } from "@/lib/content/types";

export interface LibraryCollectionItem {
  title: string;
  subtitle: string;
  description: string;
  href: string;
  badge: string;
  iconName: "sparkles" | "compass" | "moon" | "eye";
  active: boolean;
  buttonText: string;
}

export interface LibraryPageContent {
  homeLabel: string;
  libraryLabel: string;
  heroBadge: string;
  title: string;
  subtitle: string;
  description: string;
  collections: LibraryCollectionItem[];
  faqTitle: string;
  faqs: Faq[];
}

export const LIBRARY_CONTENT: Record<Locale, LibraryPageContent> = {
  en: {
    homeLabel: "Home",
    libraryLabel: "Library",
    heroBadge: "Spiritual Knowledge Hub",
    title: "Spiritual Library",
    subtitle: "Sacred Wisdom, Divine Symbols & Inner Guidance",
    description:
      "Welcome to the BhaktiVoice Library. We curate sacred wisdom, recurring celestial signs, angelic synchronicities, and meditative companions designed to ground your daily life in devotion, clarity, and peace.",
    collections: [
      {
        title: "Angel Numbers & Sacred Numerology",
        subtitle: "Divine whispers and repeating number sequences",
        description:
          "Explore comprehensive spiritual meanings for angel numbers like 111, 444, 555, 777, and 1111. Understand synchronicities, love alignments, twin flame journeys, and life direction guided by higher consciousness.",
        href: "/library/angel-numbers",
        badge: "Active Collection",
        iconName: "sparkles",
        active: true,
        buttonText: "Explore Angel Numbers",
      },
      {
        title: "Sacred Yantras & Divine Geometry",
        subtitle: "Mystical diagrams for meditation and concentration",
        description:
          "Discover geometric representations of primordial cosmic sounds and mantras. Learn how Sri Yantra and traditional mandalas focus prana and quiet the restless mind during sadhana.",
        href: "#",
        badge: "Coming Soon",
        iconName: "compass",
        active: false,
        buttonText: "In Preparation",
      },
      {
        title: "Vedic Dream Meanings (Swapna Shastra)",
        subtitle: "Sacred interpretations of spiritual visions",
        description:
          "Understand auspicious signs, sacred rivers, deities, and temple darshans experienced in dreams according to classical Vedic dream treatises and traditional wisdom.",
        href: "#",
        badge: "Coming Soon",
        iconName: "moon",
        active: false,
        buttonText: "In Preparation",
      },
      {
        title: "Chakra Wisdom & Energy Alignment",
        subtitle: "Harmonizing subtle energy through breath and devotion",
        description:
          "Practical, grounded guides to the seven subtle chakras. Pair daily mantra japa, rhythmic pranayama, and sincere prayer to cultivate emotional balance and spiritual discernment.",
        href: "#",
        badge: "Coming Soon",
        iconName: "eye",
        active: false,
        buttonText: "In Preparation",
      },
    ],
    faqTitle: "Frequently Asked Questions About the Spiritual Library",
    faqs: [
      {
        question: "What is the BhaktiVoice Spiritual Library and how does it help spiritual seekers?",
        answer:
          "The BhaktiVoice Spiritual Library is a curated repository of sacred knowledge, contemplative wisdom, and spiritual guidance designed for modern seekers and householders. Rather than presenting abstract or complex theological debates, our library organizes practical spiritual tools, sacred numbers, scriptural interpretations, and meditative symbology into accessible, clear guides. Whether you are curious about recurring synchronicities like angel numbers, seeking to understand the philosophy of sacred mantras, or looking for practical ways to bring quiet devotion into a busy routine, this library provides grounded, authentic wisdom to help you cultivate inner peace and deeper spiritual awareness every single day.",
      },
      {
        question: "What topics and collections are available within the BhaktiVoice Spiritual Library?",
        answer:
          "Our spiritual library encompasses a diverse range of sacred disciplines. Key collections include Angel Numbers & Sacred Numerology (decoding repeating number sequences like 111, 444, 555, and 777), Sacred Yantras & Divine Geometry (exploring traditional diagrams such as the Sri Yantra and their role in meditation), Vedic Dream Meanings or Swapna Shastra (interpreting auspicious dreams of temples, rivers, and divine visions), and Chakra Alignment (integrating subtle breath awareness, sound vibration, and daily japa). New collections covering stotras, sacred plants, and spiritual symbology are continuously being added.",
      },
      {
        question: "Why are Angel Numbers and repeating numbers featured alongside sacred wisdom?",
        answer:
          "Numbers are the primordial structural language of creation. In traditions across the world, recurring numbers—such as 111, 333, 555, or 888—are recognized as subtle synchronicities or whispers from the cosmos and guardian guides, urging us to pause, reflect, and realign our thoughts. In our library, angel numbers are treated not as commercial fortune-telling or superstition, but as gentle mindfulness touchpoints. Seeing repeating numbers serves as an invitation to return to conscious awareness, take a calm breath, evaluate your current intentions, and trust in divine timing.",
      },
      {
        question: "How does sacred numerology connect with Indian philosophy and Sanatan Dharma?",
        answer:
          "Indian spiritual traditions have honored sacred mathematics for thousands of years. The foundational philosophical school of Sankhya literally translates to 'number' or 'enumeration', categorizing the 24 cosmic tattvas that form reality. From the single primordial vibration of Om (1) to the cosmic balance of Shiva-Shakti (2), the three gunas (3), the four Purusharthas (4), and the sacred 108 beads of the japa mala, numbers are viewed as tangible reflections of cosmic harmony. Our library bridges ancient Vedic reverence for numerical order with universal synchronicities to provide deep, contemplative meaning.",
      },
      {
        question: "How do Angel Numbers differ from traditional Vedic Astrology (Jyotish)?",
        answer:
          "Vedic Astrology (Jyotish Shastra) is a rigorous astronomical and karmic science based on exact planetary positions, birth charts (Janma Kundli), nakshatras, and planetary dashas calculated at the exact moment and location of birth. In contrast, angel numbers and synchronistic signs operate as real-time intuitive reminders in everyday consciousness. While a birth horoscope maps lifelong karmic tendencies, noticing an angel number like 555 on a clock or ticket is an immediate, spontaneous encouragement from the universe to stay centered, calm, and hopeful during a specific moment of decision or stress.",
      },
      {
        question: "How can householders use this library for their daily sadhana and spiritual growth?",
        answer:
          "Householder life requires spiritual practices that are realistic, sustainable, and free of unnecessary rigidity. You can use the BhaktiVoice Library in three simple steps: first, read our guides in the morning or before sleep for 10 minutes to instill noble, uplifting contemplation in your mind; second, whenever you encounter synchronicities or emotional challenges during the day, reference our specific meanings to shift your perspective from worry to spiritual clarity; third, pair your reading with practical sadhana using our free tools—such as sitting for 108 repetitions of Ram Naam or Om Namah Shivaya with our peaceful jaap counter.",
      },
      {
        question: "What are common signs of a spiritual awakening, and how does this library help navigate them?",
        answer:
          "A spiritual awakening often begins quietly: feeling that material pursuits alone do not bring lasting fulfillment, experiencing heightened intuition, seeking solitude, having vivid dreams, or frequently noticing repeating numbers like 1111, 222, and 555 everywhere you look. Often, seekers also go through confusion or what is traditionally called the 'dark night of the soul', where old routines lose their appeal. Our library normalizes these experiences, providing compassionate clarity and grounded scriptural context so you realize that your shifts in consciousness are natural stepping stones toward spiritual maturity and peace.",
      },
      {
        question: "How does Vedic Swapna Shastra interpret dreams of temples, rivers, and divine darshan?",
        answer:
          "According to classical Indian treatises like the Agni Purana and Prashna Upanishad, dreams occur in the 'Taijasa' or subtle luminous state of consciousness. Dreams of climbing mountain shrines, bathing in holy rivers like the Ganga, receiving prasad, or beholding deities like Lord Shiva or Sri Krishna are traditionally interpreted as auspicious signs indicating purification of past samskaras and blessings on your life path. Our upcoming Swapna Shastra collection within the library details these classical classifications with authentic Vedic references, helping you distinguish between regular mental processing and genuine spiritual visions.",
      },
      {
        question: "Are all articles, tools, and guides in the BhaktiVoice Library completely free to access?",
        answer:
          "Yes, the BhaktiVoice Spiritual Library is 100% free and openly accessible to all devotees and truth-seekers worldwide. There are no paywalls, hidden fees, subscriptions, or mandatory registrations required to read our angel number guides, study spiritual symbolism, or explore sacred texts. We believe that genuine spiritual wisdom and devotion (Bhakti) belong to everyone. Our mission is to keep this knowledge pure, dignified, transparent, and readily available for your personal sadhana without distraction.",
      },
      {
        question: "Is the BhaktiVoice Library fully available in Indian languages like Hindi and Telugu?",
        answer:
          "Yes, the entire BhaktiVoice platform—including our Spiritual Library, Angel Numbers collection, daily panchang, and jaap counters—is natively crafted in English, Hindi (हिंदी), and Telugu (తెలుగు). Rather than relying on inaccurate machine translation, our content is thoughtfully written with authentic regional terminology, traditional devotional idioms, and accurate cultural resonance. You can switch between languages seamlessly using the language selector in the header or by visiting the regional URL pathways (/hi/library and /te/library).",
      },
    ],
  },
  hi: {
    homeLabel: "होम",
    libraryLabel: "लाइब्रेरी",
    heroBadge: "आध्यात्मिक ज्ञान केंद्र",
    title: "आध्यात्मिक लाइब्रेरी",
    subtitle: "पवित्र ज्ञान, दिव्य प्रतीक और आंतरिक मार्गदर्शन",
    description:
      "भक्ति वॉइस लाइब्रेरी में आपका स्वागत है। यहाँ हम प्राचीन सनातन ज्ञान, आकाशीय संकेत, एंजेल नंबर्स और आध्यात्मिक साधना पद्धतियों का ऐसा प्रामाणिक संकलन प्रस्तुत करते हैं जो आपके दैनिक जीवन में शांति, स्पष्टता और भक्ति का संचार कर सके।",
    collections: [
      {
        title: "एंजेल नंबर्स और दिव्य अंकशास्त्र",
        subtitle: "दैवीय संकेत और बार-बार दिखने वाली संख्याएं",
        description:
          "555, 777, 888 और 1111 जैसे एंजेल नंबर्स के गहन आध्यात्मिक अर्थ जानें। समझें कि ब्रह्मांड आपके साथ कैसे संवाद करता है, जीवन के मोड़ पर मार्गदर्शन देता है और आंतरिक चेतना को जागृत करता है।",
        href: "/library/angel-numbers",
        badge: "सक्रिय संग्रह",
        iconName: "sparkles",
        active: true,
        buttonText: "एंजेल नंबर्स देखें",
      },
      {
        title: "पवित्र यंत्र और दिव्य ज्यामिति",
        subtitle: "ध्यान और एकाग्रता के लिए रहस्यमयी आकृतियां",
        description:
          "मंत्रों और ब्रह्मांडीय ऊर्जाओं के ज्यामितीय स्वरूप को जानें। समझें कि श्री यंत्र और पारंपरिक मंडल कैसे घर के वातावरण को पवित्र और मन को शांत करने में सहायक होते हैं।",
        href: "#",
        badge: "शीघ्र आ रहा है",
        iconName: "compass",
        active: false,
        buttonText: "तैयारी जारी",
      },
      {
        title: "वैदिक स्वप्न शास्त्र (Swapna Shastra)",
        subtitle: "स्वप्नों में दिखने वाले दिव्य संकेतों का अर्थ",
        description:
          "सपनों में मंदिर, देवी-देवताओं के दर्शन, पवित्र नदियों और शुभ प्रतीकों का शास्त्रीय अर्थ समझें। जानें कि स्वप्न हमारी सूक्ष्म चेतना और भविष्य के बारे में क्या संकेत देते हैं।",
        href: "#",
        badge: "शीघ्र आ रहा है",
        iconName: "moon",
        active: false,
        buttonText: "तैयारी जारी",
      },
      {
        title: "चक्र जागरण और ऊर्जा संतुलन",
        subtitle: "जप, प्राणायाम और भक्ति से सूक्ष्म शरीर का संतुलन",
        description:
          "मूलाधार से सहस्रार तक सातों सूक्ष्म चक्रों का व्यावहारिक मार्गदर्शन। नाम जप, श्वास की गति और भक्ति भाव से मानसिक शांति और आत्मिक ऊर्जा को संतुलित करना सीखें।",
        href: "#",
        badge: "शीघ्र आ रहा है",
        iconName: "eye",
        active: false,
        buttonText: "तैयारी जारी",
      },
    ],
    faqTitle: "आध्यात्मिक लाइब्रेरी के संबंध में प्रमुख प्रश्न (FAQ)",
    faqs: [
      {
        question: "भक्ति वॉइस आध्यात्मिक लाइब्रेरी क्या है और यह साधकों की कैसे सहायता करती है?",
        answer:
          "भक्ति वॉइस आध्यात्मिक लाइब्रेरी सनातन ज्ञान, व्यावहारिक साधना और दिव्य मार्गदर्शन का एक प्रामाणिक संकलन है, जिसे आधुनिक जीवन शैली और गृहस्थ साधकों को ध्यान में रखकर तैयार किया गया है। यहाँ हम जटिल गूढ़ विषयों को अत्यंत सरल, स्पष्ट और हृदयस्पर्शी भाषा में प्रस्तुत करते हैं। चाहे आप बार-बार दिखने वाले एंजेल नंबर्स के आध्यात्मिक अर्थ समझना चाहते हों, पवित्र मंत्रों के गूढ़ प्रभाव को जानना चाहते हों, या अपनी दैनिक दिनचर्या में शांत भक्ति को शामिल करना चाहते हों—हमारी लाइब्रेरी आपको आत्म-शांति, विवेक और आध्यात्मिक चेतना के विस्तार के लिए विश्वसनीय मार्गदर्शन प्रदान करती है।",
      },
      {
        question: "भक्ति वॉइस लाइब्रेरी में कौन-से मुख्य विषय और संग्रह उपलब्ध हैं?",
        answer:
          "हमारी आध्यात्मिक लाइब्रेरी में विभिन्न आध्यात्मिक विषयों का विस्तृत संकलन है। इसके प्रमुख संग्रहों में 'एंजेल नंबर्स और दिव्य अंकशास्त्र' (जैसे 111, 444, 555, 777 जैसी पुनरावृत्ति संख्याओं का अर्थ), 'पवित्र यंत्र और दिव्य ज्यामिति' (श्री यंत्र जैसे आकृतियों का ध्यान में उपयोग), 'वैदिक स्वप्न शास्त्र' (सपनों में मंदिर, देवी-देवता और पवित्र नदियों के दर्शन का शास्त्रीय अर्थ), तथा 'चक्र विज्ञान और ऊर्जा संतुलन' (नाम जप और प्राणायाम के माध्यम से सूक्ष्म नाड़ियों की शुद्धि) शामिल हैं। समय-समय पर इसमें नए विषय जोड़े जाते हैं।",
      },
      {
        question: "पारंपरिक आध्यात्मिक ज्ञान के साथ एंजेल नंबर्स को लाइब्रेरी में क्यों शामिल किया गया है?",
        answer:
          "संख्याएं वास्तव में सृष्टि की मूल संरचनात्मक भाषा हैं। दुनिया भर की आध्यात्मिक परंपराओं में बार-बार दिखने वाली संख्याओं (जैसे 111, 333, 555, 777) को ब्रह्मांडीय संकेत या ईश्वरीय संदेश माना गया है, जो हमें रुकने, अंतर्मुखी होने और अपने विचारों को सही दिशा देने की प्रेरणा देते हैं। हमारी लाइब्रेरी में एंजेल नंबर्स को किसी अंधविश्वास या भविष्य बताने के साधन के रूप में नहीं, बल्कि दैनिक सजगता (Mindfulness) के प्रतीक के रूप में प्रस्तुत किया गया है। जब भी आप इन संख्याओं को देखते हैं, यह आपको सांसारिक भागदौड़ के बीच रुककर ईश्वर के प्रति कृतज्ञ होने का स्मरण कराती हैं।",
      },
      {
        question: "पवित्र अंकशास्त्र का भारतीय दर्शन और सनातन धर्म से क्या संबंध है?",
        answer:
          "भारतीय दर्शन में संख्याओं और गणित को अनादि काल से ब्रह्म का स्वरूप माना गया है। सनातन दर्शन का प्रमुख स्तंभ 'सांख्य दर्शन' स्वयं संख्या (गणना और तत्त्वों की व्यवस्था) पर आधारित है, जो सृष्टि के 24 तत्त्वों का विश्लेषण करता है। अद्वैत का एक ओंकार (1), शिव-शक्ति का द्वैत (2), त्रिगुण (सत्व, रज, तम - 3), चार पुरुषार्थ (4), और जप माला के 108 मनके—ये सभी स्पष्ट करते हैं कि ब्रह्मांड में कुछ भी आकस्मिक नहीं है, बल्कि सब कुछ एक दिव्य गणितीय संतुलन में बंधा है। हमारी लाइब्रेरी इसी दार्शनिक दृष्टि को आधुनिक संदर्भ में उजागर करती है।",
      },
      {
        question: "एंजेल नंबर्स और पारंपरिक वैदिक ज्योतिष (कुंडली) में क्या अंतर है?",
        answer:
          "वैदिक ज्योतिष (ज्योतिष शास्त्र) एक अत्यंत सूक्ष्म और खगोलीय विज्ञान है, जो व्यक्ति के जन्म समय, अक्षांश, नक्षत्रों और ग्रहों की महादशाओं पर आधारित होता है। यह जन्मकुंडली के माध्यम से जीवन के कर्म चक्र और प्रवृत्तियों को दर्शाता है। इसके विपरीत, एंजेल नंबर्स तात्कालिक और सहज चेतना के संकेत होते हैं। जहाँ कुंडली आपके जीवन का विस्तृत मानचित्र है, वहीं किसी घड़ी या रसीद पर 555 या 777 दिखना उस क्षण में मन को शांत रखने, ईश्वर का स्मरण करने और सकारात्मक निर्णय लेने का एक तात्कालिक आध्यात्मिक संदेश होता है।",
      },
      {
        question: "गृहस्थ साधक दैनिक साधना और आत्म-उन्नति के लिए इस लाइब्रेरी का उपयोग कैसे कर सकते हैं?",
        answer:
          "गृहस्थ जीवन में ऐसी साधना की आवश्यकता होती है जो व्यावहारिक, सरल और निरंतर निभाई जा सके। आप भक्ति वॉइस लाइब्रेरी का लाभ तीन प्रकार से ले सकते हैं: पहला, प्रातःकाल या रात्रि में सोने से पूर्व 10 मिनट इन लेखों और आध्यात्मिक प्रतीकों को पढ़ें जिससे मन में सात्विक विचार स्थापित हों; दूसरा, दिनभर में जब भी कोई मानसिक तनाव या संशय आए, तो इन ज्ञान सूत्रों से मार्गदर्शन प्राप्त करें; और तीसरा, इस अध्ययन को व्यावहारिक साधना से जोड़ें—जैसे हमारे निःशुल्क नाम जप काउंटर के साथ 108 बार राम नाम या ॐ नमः शिवाय का शांत जप करें।",
      },
      {
        question: "आध्यात्मिक जागृति (Spiritual Awakening) के सामान्य लक्षण क्या हैं और यह लाइब्रेरी उसमें कैसे सहायक है?",
        answer:
          "आध्यात्मिक जागृति प्रायः बहुत मौन रूप से आरंभ होती है: सांसारिक भौतिक वस्तुओं से आंतरिक तृप्ति न मिलना, अंतःप्रेरणा (Intuition) का अचानक तीव्र होना, एकांत में बैठने की इच्छा, गहरे विचार आना, या बार-बार 1111, 222 और 555 जैसी संख्याएं दिखाई देना। कई बार साधक मानसिक द्वंद्व या पुराने दृष्टिकोण के टूटने से गुजरते हैं। हमारी लाइब्रेरी इन अनुभवों को अत्यंत स्वाभाविक और सरल रूप में समझाती है, जिससे आपको यह भरोसा मिलता है कि यह आंतरिक उथल-पुथल किसी भय का कारण नहीं, बल्कि आपकी आत्मा की परिपक्वता और ईश्वर की ओर बढ़ने का स्वाभाविक चरण है।",
      },
      {
        question: "वैदिक स्वप्न शास्त्र के अनुसार मंदिर, पवित्र नदियों और देवी-देवताओं के सपनों का क्या अर्थ होता है?",
        answer:
          "अग्नि पुराण और प्रश्नोपनिषद जैसे प्रामाणिक भारतीय ग्रंथों के अनुसार, स्वप्न हमारी चेतना की 'तैजस' (सूक्ष्म) अवस्था में घटित होते हैं। सपने में प्राचीन मंदिर के दर्शन करना, गंगा या यमुना जैसी पवित्र नदियों में स्नान, प्रसाद मिलना या भगवान शिव, श्रीकृष्ण अथवा माँ दुर्गा के दर्शन होना अत्यंत शुभ फलदायी माना गया है। यह पूर्व संचित संस्कारों की शुद्धि और ईश्वरीय कृपा का संकेत होता है। हमारी लाइब्रेरी का आगामी 'स्वप्न शास्त्र' संग्रह इन शास्त्रीय प्रमाणों को विस्तार से प्रस्तुत करता है ताकि आप सामान्य मानसिक विचारों और सच्चे आध्यात्मिक स्वप्नों के अंतर को स्पष्ट समझ सकें।",
      },
      {
        question: "क्या भक्ति वॉइस लाइब्रेरी के सभी लेख, मार्गदर्शिकाएं और साधन पूरी तरह से निःशुल्क हैं?",
        answer:
          "हाँ, भक्ति वॉइस आध्यात्मिक लाइब्रेरी का प्रत्येक लेख, एंजेल नंबर मार्गदर्शिका और साधन विश्वभर के सभी भक्तों और साधकों के लिए पूर्णतः निःशुल्क और खुला है। हमारे किसी भी लेख को पढ़ने, यंत्रों का अध्ययन करने या आध्यात्मिक ज्ञान प्राप्त करने के लिए कोई सब्सक्रिप्शन, शुल्क या अनिवार्य लॉगिन की आवश्यकता नहीं है। हमारा दृढ़ विश्वास है कि भगवद्-ज्ञान और भक्ति पर प्रत्येक आत्मा का स्वाभाविक अधिकार है, इसलिए हम इस मंच को पूरी तरह सुलभ, विज्ञापन-रहित और पवित्र बनाए रखने के लिए समर्पित हैं।",
      },
      {
        question: "क्या भक्ति वॉइस लाइब्रेरी हिंदी और तेलुगु जैसी भारतीय भाषाओं में पूरी तरह उपलब्ध है?",
        answer:
          "जी हाँ, भक्ति वॉइस का पूरा मंच—जिसमें हमारी आध्यात्मिक लाइब्रेरी, एंजेल नंबर्स संग्रह, दैनिक पंचांग और जप काउंटर शामिल हैं—अंग्रेजी के साथ-साथ हिंदी (हिंदी) और तेलुगु (తెలుగు) में भी प्रामाणिक रूप से उपलब्ध है। हम किसी यंत्रवत या गलत अनुवाद के बजाय पारंपरिक धार्मिक शब्दावली, भक्तिमय भाव और सांस्कृतिक गरिमा का विशेष ध्यान रखते हैं। आप हेडर में दिए गए भाषा विकल्प से या सीधे संबंधित लिंक (/hi/library और /te/library) पर जाकर अपनी पसंदीदा भाषा में इसका लाभ ले सकते हैं।",
      },
    ],
  },
  te: {
    homeLabel: "హోమ్",
    libraryLabel: "లైబ్రరీ",
    heroBadge: "ఆధ్యాత్మిక జ్ఞాన కేంద్రం",
    title: "ఆధ్యాత్మిక లైబ్రరీ",
    subtitle: "పవిత్ర జ్ఞానం, దివ్య సంకేతాలు & అంతరంగ మార్గదర్శనం",
    description:
      "భక్తి వాయిస్ లైబ్రరీకి స్వాగతం. మీ దైనందిన జీవితంలో ప్రశాంతత, స్పష్టత మరియు భక్తి భావాన్ని నింపేందుకు పవిత్ర వేద జ్ఞానం, దేవదూత సంఖ్యలు (Angel Numbers), దివ్య సంకేతాలు మరియు ఆధ్యాత్మిక సాధనా మార్గదర్శకాలను మేము ఇక్కడ అందిస్తున్నాము.",
    collections: [
      {
        title: "దేవదూత సంఖ్యలు & పవిత్ర సంఖ్యాశాస్త్రం",
        subtitle: "దివ్య సంకేతాలు మరియు పునరావృత సంఖ్యలు",
        description:
          "555, 777, 888 మరియు 1111 వంటి దేవదూత సంఖ్యల (Angel Numbers) లోతైన ఆధ్యాత్మిక అర్థాలను తెలుసుకోండి. విశ్వం మీకు పంపే సంకేతాలు, జీవిత గమ్యం మరియు ఆధ్యాత్మిక ఎదుగుదలను అర్థం చేసుకోండి.",
        href: "/library/angel-numbers",
        badge: "యాక్టివ్ కలెక్షన్",
        iconName: "sparkles",
        active: true,
        buttonText: "దేవదూత సంఖ్యలను అన్వేషించండి",
      },
      {
        title: "పవిత్ర యంత్రాలు & దివ్య జ్యామితి",
        subtitle: "ధ్యానం మరియు ఏకాగ్రత కోసం యంత్ర రహస్యాలు",
        description:
          "శ్రీ యంత్రం మరియు ప్రాచీన పవిత్ర జ్యామితీయ నమూనాల విశిష్టతను తెలుసుకోండి. ధ్యానంలో మనస్సును నిలకడగా ఉంచేందుకు మరియు సానుకూల తరంగాలను పెంచేందుకు ఇవి ఎలా ఉపయోగపడతాయో గ్రహించండి.",
        href: "#",
        badge: "త్వరలో అందుబాటులోకి",
        iconName: "compass",
        active: false,
        buttonText: "సిద్ధమవుతోంది",
      },
      {
        title: "వేద స్వప్న శాస్త్రం (Swapna Shastra)",
        subtitle: "కలలో కనిపించే దివ్య సంకేతాల అర్థాలు",
        description:
          "కలలలో దేవుళ్ళు, ఆలయాలు, పవిత్ర నదులు మరియు శుభ శకునాలు కనిపించినప్పుడు వాటి ఫలితాలను ప్రాచీన స్వప్న శాస్త్ర గ్రంథాల ఆధారంగా విశ్లేషించండి.",
        href: "#",
        badge: "త్వరలో అందుబాటులోకి",
        iconName: "moon",
        active: false,
        buttonText: "సిద్ధమవుతోంది",
      },
      {
        title: "చక్ర విజ్ఞానం & శక్తి సమతుల్యత",
        subtitle: "భక్తి మరియు ప్రాణాయామం ద్వారా షట్చక్రాల శుద్ధి",
        description:
          "మూలాధారం నుండి సహస్రారం వరకు ఉన్న ఏడు చక్రాల ప్రాముఖ్యతను తెలుసుకోండి. నిత్య నామజపం, శ్వాస నియంత్రణ మరియు భక్తితో అంతర్గత శాంతిని ఎలా పెంపొందించుకోవాలో నేర్చుకోండి.",
        href: "#",
        badge: "త్వరలో అందుబాటులోకి",
        iconName: "eye",
        active: false,
        buttonText: "సిద్ధమవుతోంది",
      },
    ],
    faqTitle: "ఆధ్యాత్మిక లైబ్రరీ గురించి తరచుగా అడిగే ప్రశ్నలు (FAQ)",
    faqs: [
      {
        question: "భక్తి వాయిస్ ఆధ్యాత్మిక లైబ్రరీ అంటే ఏమిటి మరియు ఇది సాధకులకు ఎలా ఉపయోగపడుతుంది?",
        answer:
          "భక్తి వాయిస్ ఆధ్యాత్మిక లైబ్రరీ అనేది ఆధునిక కాలపు సాధకులు మరియు గృహస్థుల కోసం రూపొందించబడిన పవిత్ర జ్ఞాన భాండాగారం. సంక్లిష్టమైన ఆధ్యాత్మిక విషయాలను గందరగోళం లేకుండా అత్యంత సరళమైన, స్పష్టమైన మరియు ఆచరణాత్మక శైలిలో ఇక్కడ పొందుపరిచాము. జీవితంలో తరచూ కనిపించే ఏంజెల్ నంబర్స్ (దేవదూత సంఖ్యలు) దివ్య సంకేతాలను అర్థం చేసుకోవాలన్నా, ప్రాచీన మంత్రాల విశిష్టతను తెలుసుకోవాలన్నా, లేదా రోజూవారీ జీవితంలో మనశ్శాంతిని పెంపొందించుకోవాలన్నా ఈ లైబ్రరీ మీకు ఒక నమ్మకమైన ఆధ్యాత్మిక మార్గదర్శిగా నిలుస్తుంది.",
      },
      {
        question: "భక్తి వాయిస్ లైబ్రరీలో ఏయే ముఖ్యమైన విభాగాలు మరియు అంశాలు అందుబాటులో ఉన్నాయి?",
        answer:
          "మా ఆధ్యాత్మిక లైబ్రరీలో వివిధ రకాల పవిత్ర అంశాలు పొందుపరచబడ్డాయి. వీటిలో ముఖ్యంగా 'దేవదూత సంఖ్యలు మరియు పవిత్ర సంఖ్యాశాస్త్రం' (111, 444, 555, 777 వంటి పునరావృత సంఖ్యల అర్థాలు), 'పవిత్ర యంత్రాలు & దివ్య జ్యామితి' (శ్రీ యంత్రం ప్రాముఖ్యత మరియు ధ్యాన విధానాలు), 'వేద స్వప్న శాస్త్రం' (కలలలో కనిపించే ఆలయాలు, దేవుళ్ళు మరియు పవిత్ర నదుల ఫలితాలు), మరియు 'చక్ర విజ్ఞానం & ప్రాణశక్తి సమతుల్యత' (నిత్య జపం, శ్వాస ద్వారా అంతశ్చేతన శుద్ధి) వంటి విలువైన విభాగాలు ఉన్నాయి.",
      },
      {
        question: "ప్రాచీన ఆధ్యాత్మిక గ్రంథాలతో పాటు ఏంజెల్ నంబర్స్‌ను లైబ్రరీలో ఎందుకు చేర్చారు?",
        answer:
          "సృష్టి యొక్క నిర్మాణంలో సంఖ్యలు అత్యంత ప్రాచీనమైన మరియు గంభీరమైన భాష. ప్రపంచవ్యాప్తంగా వివిధ సంప్రదాయాలలో 111, 333, 555, 777 వంటి సంఖ్యలు మాటిమాటికీ కనిపించడాన్ని విశ్వం లేదా దైవిక శక్తులు అందించే పవిత్ర సంకేతాలుగా భావిస్తారు. మా లైబ్రరీలో ఈ సంఖ్యలను మూఢనమ్మకంగా కాకుండా, నిత్య జీవితంలో మనస్సును మేల్కొలిపే 'ఆధ్యాత్మిక అప్రమత్తత'గా విశ్లేషించాము. పదేపదే ఈ సంఖ్యలు కనిపించినప్పుడు అవి మన అంతశ్చేతనను సరిచూసుకోవడానికి మరియు దైవ కృపపై నమ్మకం ఉంచడానికి సహకరిస్తాయి.",
      },
      {
        question: "పవిత్ర సంఖ్యాశాస్త్రానికి భారతీయ సనాతన ధర్మానికి ఉన్న సంబంధం ఏమిటి?",
        answer:
          "భారతీయ సనాతన ధర్మంలో సంఖ్యలకు అత్యంత పవిత్రమైన స్థానం ఉంది. ప్రాచీన షడ్దర్శనాలలో ఒకటైన 'సాంఖ్య దర్శనం' సృష్టిలోని 24 తత్వాల సంఖ్యాపరమైన విశ్లేషణపైనే ఆధారపడి ఉంది. ఏకమేవాద్వితీయమైన ఓంకారం (1), శివ-శక్తుల ద్వైతం (2), సత్వ-రజో-తమో గుణాలు (3), చతుర్విధ పురుషార్థాలు (4), మరియు జపమాలలో ఉండే 108 పూసలు అన్నీ సృష్టిలోని దివ్య సంఖ్యా నియమాన్ని సూచిస్తాయి. మా లైబ్రరీ ఈ వేద జ్ఞానాన్ని ఆధునిక ప్రపంచపు అనుభవాలతో జోడించి లోతైన అవగాహనను అందిస్తుంది.",
      },
      {
        question: "ఏంజెల్ నంబర్స్ మరియు వేద జ్యోతిష్యం (కుండలి) మధ్య ఉన్న తేడా ఏమిటి?",
        answer:
          "వేద జ్యోతిష్య శాస్త్రం అనేది ఒక వ్యక్తి పుట్టిన సమయం, ప్రదేశం, నక్షత్రాలు మరియు గ్రహాల దశాభుక్తులపై ఆధారపడిన శాస్త్రీయ ఖగోళ విశ్లేషణ. ఇది సమగ్ర జీవిత గమనాన్ని మరియు కర్మ ఫలితాలను వివరిస్తుంది. అయితే, ఏంజెల్ నంబర్స్ అనేవి అనుకోకుండా మన కళ్ళముందు కనిపించే తక్షణ అంతర్దృష్టి సంకేతాలు. ఉదాహరణకు ఒక ముఖ్యమైన పనిలో ఉన్నప్పుడు గడియారంలో 555 లేదా 777 కనిపించడం అనేది ఆ క్షణంలో మనస్సును ప్రశాంతంగా ఉంచుకోవాలని, ఆందోళన చెందవద్దని విశ్వం ఇచ్చే ఒక ప్రోత్సాహకర సంకేతం మాత్రమే.",
      },
      {
        question: "గృహస్థులు తమ దైనందిన సాధన మరియు ఆత్మ వికాసం కోసం ఈ లైబ్రరీని ఎలా ఉపయోగించుకోవాలి?",
        answer:
          "గృహస్థ జీవితంలో ఎటువంటి ఒత్తిడి లేకుండా ప్రతిరోజూ ఆచరించగలిగే ఆధ్యాత్మిక సాధన ఎంతో అవసరం. మా లైబ్రరీని మీరు మూడు సులభమైన దశలలో ఉపయోగించుకోవచ్చు: మొదటిది, ఉదయం లేదా రాత్రి పడుకునే ముందు 10 నిమిషాలు ఈ వ్యాసాలను చదివి మనస్సును పవిత్ర భావాలతో నింపుకోవడం; రెండవది, రోజువారీ పనులలో ఆందోళన కలిగినప్పుడు ఈ వివరణలను చదివి సానుకూల దృక్పథాన్ని పొందడం; మూడవది, ఈ జ్ఞానాన్ని ఆచరణలో పెడుతూ మా ఉచిత నామజప కౌంటర్ ద్వారా ప్రతిరోజూ 108 సార్లు ఇష్టదైవ నామాన్ని జపించడం.",
      },
      {
        question: "ఆధ్యాత్మిక మేల్కొలుపు (Spiritual Awakening) ప్రధాన సంకేతాలు ఏమిటి మరియు ఈ లైబ్రరీ ఎలా మార్గదర్శనం చేస్తుంది?",
        answer:
          "ఆధ్యాత్మిక చైతన్యం మేల్కొన్నప్పుడు మనిషిలో కొన్ని సహజ మార్పులు కనిపిస్తాయి: భౌతిక విషయాల పట్ల తాత్కాలిక వైరాగ్యం, అంతర్దృష్టి పెరగడం, ప్రశాంతత కోసం ఒంటరిగా గడపాలనిపించడం, అర్థవంతమైన కలలు రావడం, మరియు పదేపదే 1111, 222, 555 వంటి సంఖ్యలు కనిపించడం. ఈ సమయంలో కొందరికి గందరగోళం కూడా కలగవచ్చు. అటువంటి పరిస్థితులలో మా లైబ్రరీ ఇచ్చే వివరణలు సాధకులలో ఆత్మవిశ్వాసాన్ని నింపి, ఇది ఆత్మ వికాసంలో ఒక పవిత్రమైన దశ అని గుర్తించేలా చేస్తాయి.",
      },
      {
        question: "ప్రాచీన వేద స్వప్న శాస్త్రం ప్రకారం కలలలో ఆలయాలు, పవిత్ర నదులు మరియు దైవ దర్శనం కలగడం దేనికి సంకేతం?",
        answer:
          "అగ్ని పురాణం మరియు ప్రశ్నోపనిషత్తు వంటి ప్రాచీన గ్రంథాల ప్రకారం కలలు అనేవి మన అంతశ్చేతన యొక్క 'తైజస' (సూక్ష్మ) స్థితిలో సంభవిస్తాయి. కలలో పవిత్ర దేవాలయాలు, గంగా-గోదావరి వంటి పుణ్యనదుల స్నానం, ప్రసాదం స్వీకరించడం లేదా శ్రీకృష్ణుడు, పరమశివుని దర్శనం కలగడం అత్యంత శుభప్రదమైన ఫలితాలను సూచిస్తాయి. ఇది పూర్వ జన్మ కర్మల పరిహారానికి మరియు దైవ అనుగ్రహానికి నిదర్శనం. మా లైబ్రరీలోని రాబోయే 'స్వప్న శాస్త్రం' విభాగం వీటి గురించి ప్రామాణిక గ్రంథాల ఆధారంగా సమగ్ర వివరణలను అందిస్తుంది.",
      },
      {
        question: "భక్తి వాయిస్ లైబ్రరీలోని సమాచారం మరియు మార్గదర్శకాలు పూర్తిగా ఉచితంగా లభిస్తాయా?",
        answer:
          "అవును, భక్తి వాయిస్ ఆధ్యాత్మిక లైబ్రరీలోని ప్రతి వ్యాసం, దేవదూత సంఖ్యల వివరణ మరియు సాధన మార్గదర్శకాలు ప్రపంచవ్యాప్తంగా ఉన్న భక్తులందరికీ 100% ఉచితంగా అందుబాటులో ఉంటాయి. ఎటువంటి సబ్‌స్క్రిప్షన్లు, దాగి ఉన్న రుసుములు లేదా లాగిన్ నిబంధనలు లేకుండా మీరు ఈ సమాచారాన్ని నేరుగా చదువుకోవచ్చు. పవిత్రమైన ఆధ్యాత్మిక జ్ఞానం మరియు భక్తి భావన అందరికీ సమానంగా చెందాలనే ఉద్దేశంతో మేము ఈ వేదికను స్వచ్ఛంగా మరియు ఉచితంగా నిర్వహిస్తున్నాము.",
      },
      {
        question: "భక్తి వాయిస్ లైబ్రరీ సమాచారం తెలుగు మరియు హిందీ వంటి భారతీయ భాషలలో కూడా లభిస్తుందా?",
        answer:
          "ఖచ్చితంగా, భక్తి వాయిస్ ఆధ్యాత్మిక లైబ్రరీ, దేవదూత సంఖ్యల విశ్లేషణ, దైనందిన పంచాంగం మరియు జప సాధనలన్నీ ఇంగ్లీష్‌తో పాటు తెలుగు (తెలుగు) మరియు హిందీ (हिंदी) భాషలలో సంపూర్ణంగా అందుబాటులో ఉన్నాయి. కేవలం యాంత్రిక అనువాదం కాకుండా మన సంప్రదాయ పారమార్థిక పదజాలం మరియు భక్తి పూర్వక శైలిలో ఈ సమాచారాన్ని సిద్ధం చేశాము. వెబ్‌సైట్ పైభాగంలో ఉన్న లాంగ్వేజ్ సెలెక్టర్ ద్వారా లేదా నేరుగా /te/library మరియు /hi/library లింకుల ద్వారా మీ మాతృభాషలో సులభంగా చదువుకోవచ్చు.",
      },
    ],
  },
};

export function getLibraryContent(locale: Locale): LibraryPageContent {
  return LIBRARY_CONTENT[locale] || LIBRARY_CONTENT.en;
}
