import type { FestivalDetail, Observance, Paksha } from "./types";

export const FESTIVAL_DETAILS: Record<string, FestivalDetail> = {

  "maha-shivratri": {
    slug: "maha-shivratri",
    name: "Maha Shivratri",
    nameHi: "महाशिवरात्रि",
    category: "festival",
    dateString2026: "2026-02-15",
    dateString2027: "2027-03-06",
    dateString2028: "2028-02-23",
    tithiNote: "Phalguna Krishna Chaturdashi",
    tithiNoteHi: "फाल्गुन कृष्ण चतुर्दशी",
    hinduMonth: "Phalguna",
    paksha: "krishna",
    tithiNumber: 14,
    deity: "Lord Shiva",
    shortDescription: "The Great Night of Shiva, celebrating the cosmic dance of Nataraja and the sacred union of Shiva and Mata Parvati.",
    shortDescriptionHi: "भगवान शिव और माता पार्वती के पावन विवाह तथा कल्याणकारी महाकाल स्वरूप का महापर्व।",
    muhuratTitle: "Nishita Kaal Puja Muhurat",
    muhuratTiming: "12:09 AM to 01:00 AM (Midnight)",
    pujaTiming: "Four Prahar Puja throughout the night (06:12 PM to 06:48 AM)",
    vratTiming: "Fasting begins at Sunrise, Parana next day after sunrise (06:49 AM onwards)",
    significance: "Maha Shivratri signifies the victory over darkness, the divine convergence of Shiva and Shakti, and the auspicious night when Lord Shiva performed the cosmic dance of creation and dissolution (Tandava). Devotees observe fasting, perform continuous Abhishek with Ganga Jal, Milk, Belpatra, and Dhatura, and chant the sacred Panchakshari mantra.",
    pujaVidhi: [
      { step: 1, title: "Pratah Sankalp & Snan", detail: "Wake up in Brahma Muhurat, take a holy bath with Gangajal, wear clean clothes, and take a solemn vow (Sankalp) for whole-day fasting and night vigil (Jagran)." },
      { step: 2, title: "Shivalinga Abhishekam", detail: "Perform Panchamrit Abhishekam (Milk, Curd, Ghee, Honey, Sugar) followed by continuous pouring of Gangajal while chanting 'Om Namah Shivaya'." },
      { step: 3, title: "Sacred Offerings", detail: "Offer Bilva leaves (Belpatra) with three leaflets intact, Dhatura, Bhasma (sacred ash), Sandalwood paste, Akshat, and seasonal fruits like Ber." },
      { step: 4, title: "Mantra Japa & Stuti", detail: "Recite the Maha Mrityunjaya Mantra and Shiva Tandava Stotram 108 times." },
      { step: 5, title: "Aarti & Night Vigil", detail: "Perform Shiva Aarti with camphor (Karpura) and ghee lamps. Engage in Bhajan and meditation throughout all 4 Prahars." }
    ],
    vratKatha: "According to the Shiva Purana, a hunter named Lubdhaka was trapped atop a Bilva tree above a Shivalinga on this cold dark night. To keep himself awake, he plucked leaves and dropped them onto the Shivalinga without knowing. Pleased with his unintentional worship and unwavering patience, Lord Shiva granted him divine liberation (Moksha), establishing the supreme sanctity of Maha Shivratri.",
    mantra: {
      sanskrit: "ॐ नमः शिवाय ॥ ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् । उर्वारुकमिव बन्धनान्मृत्य pushyीर् मामृतात् ॥",
      transliteration: "Om Namah Shivaya || Om Tryambakam Yajamahe Sugandhim Pushti-Vardhanam | Urvarukam-Iva Bandhanan Mrityor Mukshiya Maamritat ||",
      meaning: "We worship the Three-Eyed Lord Shiva, who is fragrant and nourishes all beings. May He liberate us from death to immortality, just as a ripe cucumber is effortlessly detached from its vine."
    },
    aarti: {
      title: "Om Jai Shiv Omkara",
      lines: [
        "जय शिव ओंकारा, हर ॐ शिव ओंकारा । ब्रह्मा, विष्णु, सदाशिव, अर्द्धांगी धारा ॥",
        "एकानन चतुरानन पंचानन राजे । हंसासन गरुड़ासन वृषवाहन साजे ॥",
        "दो भुज चार चतुर्भुज दसभुज अति सोहे । त्रिगुण रूप निरखते त्रिभुवन जन मोहे ॥",
        "अक्षमाला वनमाला मुण्डमाला धारी । त्रिपुरारी कंसारी कर माला धारी ॥",
        "श्वेताम्बर पीताम्बर बाघम्बर अंगे । सनकादिक गरुड़ादिक भूतादिक संगे ॥"
      ],
      href: "/aarti-chants/shiva-aarti"
    },
    relatedBhaktiContent: [
      { title: "Maha Mrityunjaya Mantra Guide", href: "/mantras-for-naam-jaap/maha-mrityunjaya-mantra", type: "mantra" },
      { title: "Complete Shiva Aarti & Audio", href: "/aarti-chants", type: "aarti" },
      { title: "Kashi Vishwanath Darshan & History", href: "/hindu-temples", type: "temple" },
      { title: "Lord Shiva Katha & Leelas", href: "/katha-stories", type: "katha" }
    ],
    faqs: [
      { question: "What are the fasting rules for Maha Shivratri?", answer: "Devotees consume fruits, milk, curd, sabudana, and makhana (Phalahar). Salt is avoided or Sendha Namak (rock salt) is used. Grains, cereals, pulses, onion, and garlic are strictly prohibited." },
      { question: "Why is Nishita Kaal so sacred on Shivratri?", answer: "Nishita Kaal is the midnight hour when Lord Shiva manifested in the form of the infinite Lingodbhava pillar of cosmic light to Brahma and Vishnu." },
      { question: "Can women offer Belpatra to Shivalinga?", answer: "Yes, women and devotees of all backgrounds can wholeheartedly offer Belpatra and perform Jalabhishek with pure devotion." }
    ]
  },

  "holi": {
    slug: "holi",
    name: "Holi (Dhulandi)",
    nameHi: "होली (धुलेंडी)",
    category: "festival",
    dateString2026: "2026-03-04",
    dateString2027: "2027-03-22",
    dateString2028: "2028-03-11",
    tithiNote: "Phalguna Purnima / Chaitra Pratipada",
    tithiNoteHi: "फाल्गुन पूर्णिमा / चैत्र कृष्ण प्रतिपदा",
    hinduMonth: "Phalguna",
    paksha: "shukla",
    tithiNumber: 15,
    deity: "Lord Krishna & Lord Vishnu (Narasimha)",
    shortDescription: "The vibrant festival of colours celebrating divine love of Radha-Krishna, the triumph of Bhakt Prahlad over Holika, and the arrival of Spring.",
    shortDescriptionHi: "रंगों, उल्लास और राधा-कृष्ण के दिव्य प्रेम का महापर्व। भक्ति की विजय का प्रतीक।",
    muhuratTitle: "Holika Dahan Muhurat",
    muhuratTiming: "06:24 PM to 08:52 PM (Previous Evening)",
    pujaTiming: "Morning Rangoutsav starts from 07:00 AM",
    significance: "Holi signifies the eradication of ego, jealousy, and evil through the miraculous protection of Bhakt Prahlad by Lord Vishnu, and the divine playful love between Radha Rani and Shri Krishna in Braj (Vrindavan, Barsana, Mathura).",
    pujaVidhi: [
      { step: 1, title: "Holika Puja", detail: "Offer Roli, Akshat, flowers, turmeric root, Batasha, Gulal, and Raw Cotton thread (Kacha Soot) around Holika bonfire." },
      { step: 2, title: "Parikrama", detail: "Perform 3 or 7 circumambulations (Parikrama) around the holy fire and offer newly harvested wheat/gram stalks (Bhuna Gehun)." },
      { step: 3, title: "Radha Krishna Abir Arpan", detail: "On Dhulandi morning, offer pure natural Abir/Gulal at the feet of Radha Krishna before playing colours with family and friends." }
    ],
    vratKatha: "King Hiranyakashipu ordered his sister Holika, who possessed a fire-proof boon, to sit in flames with child devotee Prahlad. However, Prahlad's supreme faith in Lord Narayana preserved him unscathed, while Holika was burned to ashes.",
    mantra: {
      sanskrit: "ॐ श्री विष्णवे नमः ॥ हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे । हरे राम हरे राम राम राम हरे हरे ॥",
      transliteration: "Om Shri Vishnave Namah || Hare Krishna Hare Krishna Krishna Krishna Hare Hare | Hare Rama Hare Rama Rama Rama Hare Hare ||",
      meaning: "Salutations to Lord Vishnu and the divine Hare Krishna Mahamantra which brings divine bliss and removes all karmic impurities."
    },
    aarti: {
      title: "Om Jai Jagdish Hare",
      lines: ["ॐ जय जगदीश हरे, स्वामी जय जगदीश हरे । भक्त जनों के संकट, दास जनों के संकट, क्षण में दूर करे ॥"],
      href: "/aarti-chants"
    },
    relatedBhaktiContent: [
      { title: "Braj Ki Holi: Barsana & Vrindavan Guide", href: "/sacred-yatra-guides", type: "yatra" },
      { title: "Hare Krishna Mahamantra Sadhana", href: "/mantras-for-naam-jaap", type: "mantra" }
    ],
    faqs: [
      { question: "What is Bhadra Mukha during Holika Dahan?", answer: "Holika Dahan must never be performed during Bhadra Mukha; it is performed during Bhadra Puchha or after Bhadra ends." }
    ]
  },

  "chaitra-navratri": {
    slug: "chaitra-navratri",
    name: "Chaitra Navratri (Ghatasthapana)",
    nameHi: "चैत्र नवरात्रि (घटस्थापना)",
    category: "festival",
    dateString2026: "2026-03-20",
    dateString2027: "2027-04-07",
    dateString2028: "2028-03-27",
    tithiNote: "Chaitra Shukla Pratipada",
    tithiNoteHi: "चैत्र शुक्ल प्रतिपदा (हिन्दू नववर्ष)",
    hinduMonth: "Chaitra",
    paksha: "shukla",
    tithiNumber: 1,
    deity: "Maa Durga (Navdurga)",
    shortDescription: "Beginning of the Hindu New Year (Vikram Samvat) and the 9-day worship of Maa Durga beginning with Shailaputri.",
    shortDescriptionHi: "भारतीय नवसंवत्सर का शुभारंभ एवं माँ भगवती के नौ दिव्य स्वरूपों की नौ दिवसीय पावन आराधना।",
    muhuratTitle: "Ghatasthapana Shubh Muhurat",
    muhuratTiming: "06:18 AM to 10:14 AM (Abhijit: 11:58 AM to 12:47 PM)",
    pujaTiming: "Daily morning and evening sandhya puja",
    vratTiming: "Continuous 9-day fasting, Parana on Navami/Dashami",
    significance: "Chaitra Navratri marks the auspicious day when Lord Brahma created the universe. Devotees establish the sacred Kalash, sow Jowar (barley seeds), and recite Durga Saptashati.",
    pujaVidhi: [
      { step: 1, title: "Ghatasthapana", detail: "Place a clay pot with pure soil, sow barley seeds, and place a copper Kalash filled with Gangajal, Supari, Coin, and Mango leaves topped with a coconut wrapped in red cloth (Chunri)." },
      { step: 2, title: "Akhand Jyot", detail: "Light the sacred eternal lamp with pure cow ghee or sesame oil with sincere prayer for peace and prosperity." },
      { step: 3, title: "Durga Saptashati Path", detail: "Chant Durga Kavach, Argala Stotram, and chapters of Durga Saptashati daily." }
    ],
    vratKatha: "Maa Durga was invoked by the gods with celestial weapons to vanquish the demon Mahishasura, bestowing divine fearlessness upon the righteous.",
    mantra: {
      sanskrit: "ॐ ऐं ह्रीं क्लीं चामुण्डायै विच्चे ॥ सर्वमङ्गलमाङ्गल्ये शिवे सर्वार्थसाधिके । शरण्ये त्र्यम्बके गौरि नारायणि नमोऽस्तु ते ॥",
      transliteration: "Om Aim Hreem Kleem Chamundayai Vichche || Sarva-Mangala-Maangalye Shive Sarvaartha-Saadhike | Sharanye Tryambake Gauri Narayani Namo-stute ||",
      meaning: "Salutations to the auspicious Mother Gauri who fulfills all spiritual and worldly aspirations."
    },
    aarti: {
      title: "Jai Ambe Gauri",
      lines: ["जय अम्बे गौरी, मैया जय श्यामा गौरी । तुमको निसदिन ध्यावत, हरि ब्रह्मा शिवरी ॥"],
      href: "/aarti-chants"
    },
    relatedBhaktiContent: [
      { title: "Navdurga Mantras & Meanings", href: "/mantras-for-naam-jaap", type: "mantra" },
      { title: "Vaishno Devi Yatra Guide", href: "/sacred-yatra-guides", type: "yatra" }
    ],
    faqs: [
      { question: "What direction should the Kalash face?", answer: "The Kalash is placed in the Ishan Kon (North-East direction) on a clean wooden Chowki." }
    ]
  },

  "ram-navami": {
    slug: "ram-navami",
    name: "Ram Navami",
    nameHi: "राम नवमी",
    category: "festival",
    dateString2026: "2026-03-28",
    dateString2027: "2027-04-15",
    dateString2028: "2028-04-04",
    tithiNote: "Chaitra Shukla Navami",
    tithiNoteHi: "चैत्र शुक्ल नवमी",
    hinduMonth: "Chaitra",
    paksha: "shukla",
    tithiNumber: 9,
    deity: "Maryada Purushottam Lord Rama",
    shortDescription: "The divine appearance day of Maryada Purushottam Bhagwan Shri Ram in Ayodhya at midday during Abhijit Muhurat.",
    shortDescriptionHi: "अयोध्यापति मर्यादा पुरुषोत्तम प्रभु श्रीराम का पावन प्राकट्योत्सव।",
    muhuratTitle: "Shri Ram Janmotsav Muhurat (Madhyahna)",
    muhuratTiming: "11:12 AM to 01:38 PM (Midday 12:00 PM Peak)",
    pujaTiming: "Special Ram Janma Abhishek at exact 12:00 PM noon",
    significance: "Lord Vishnu incarnated as Shri Ram to uphold Dharma, defeat Ravana, and establish Ram Rajya—an ideal world rooted in righteousness, truth, and selflessness.",
    pujaVidhi: [
      { step: 1, title: "Panchamrit Abhishek", detail: "Bathe infant Rama (Balak Ram) with panchamrit and Gangajal in Ayodhya tradition." },
      { step: 2, title: "Offerings", detail: "Offer yellow pitambar vastra, Tulsi leaves, Panchamrit, Panjiri, and Kheer prasad." },
      { step: 3, title: "Ramcharitmanas Recitation", detail: "Chant Sundarkand or the Balkand Janma Stuti 'Bhay Pragat Kripala Din Dayala'." }
    ],
    vratKatha: "King Dasharatha performed the Putrakameshti Yajna under Sage Rishyashringa. Mata Kaushalya, Kaikeyi, and Sumitra received the divine Payas, giving birth to Lord Rama, Bharata, Lakshmana, and Shatrughna.",
    mantra: {
      sanskrit: "श्री राम जय राम जय जय राम ॥ ॐ रां रामाय नमः ॥",
      transliteration: "Shri Ram Jai Ram Jai Jai Ram || Om Ram Ramaya Namah ||",
      meaning: "Victory and glory to Bhagwan Shri Ram, the supreme embodiment of truth, righteousness, and boundless grace."
    },
    aarti: {
      title: "Shri Ram Chandra Kripalu Bhajuman",
      lines: ["श्रीरामचन्द्र कृपालु भजु मन हरण भवभय दारुणम् । नवकञ्ज लोचन कञ्ज मुख कर कञ्ज पद कञ्जारुणम् ॥"],
      href: "/aarti-chants"
    },
    relatedBhaktiContent: [
      { title: "Ayodhya Ram Mandir Darshan Guide", href: "/hindu-temples", type: "temple" },
      { title: "Shri Ram Naam Jaap Benefits", href: "/naam-jaap", type: "mantra" }
    ],
    faqs: [
      { question: "What is the best time for Ram Navami puja?", answer: "Madhyahna Kaal (around 12:00 PM midday) when Lord Ram was born under Punarvasu Nakshatra and Cancer Ascendant." }
    ]
  },

  "akshaya-tritiya": {
    slug: "akshaya-tritiya",
    name: "Akshaya Tritiya (Akha Teej)",
    nameHi: "अक्षय तृतीया (आखा तीज)",
    category: "festival",
    dateString2026: "2026-04-19",
    dateString2027: "2027-05-08",
    dateString2028: "2028-04-27",
    tithiNote: "Vaishakha Shukla Tritiya",
    tithiNoteHi: "वैशाख शुक्ल तृतीया",
    hinduMonth: "Vaishakha",
    paksha: "shukla",
    tithiNumber: 3,
    deity: "Lord Vishnu, Maa Lakshmi & Lord Parashurama",
    shortDescription: "An imperishable day of eternal prosperity (Akshaya), ideal for new beginnings, charity, gold purchase, and spiritual merits.",
    shortDescriptionHi: "अक्षय पुण्य, समृद्धि और नए कार्यों के शुभारंभ का स्वयं-सिद्ध अबूझ मुहूर्त।",
    muhuratTitle: "Shubh Muhurat for Gold Purchase & Puja",
    muhuratTiming: "05:52 AM to 12:20 PM",
    pujaTiming: "Full day is Sarva-Siddha Muhurat",
    significance: "Any charity (Daan), Japa, or virtuous action performed on Akshaya Tritiya never diminishes (Akshaya). It also marks the birth of Parashurama and the descent of River Ganga to Earth.",
    pujaVidhi: [
      { step: 1, title: "Lakshmi Narayana Puja", detail: "Worship Lakshmi-Narayana with yellow flowers, Tulsi, chana dal, and jaggery." },
      { step: 2, title: "Jal & Anna Daan", detail: "Donate earthen pots filled with water (Matka/Kalash), umbrella, fans, barley (Jau), and grains to the needy." }
    ],
    vratKatha: "When the Pandavas were in exile, Lord Krishna gifted Draupadi the Akshaya Patra, a vessel that yielded an inexhaustible supply of food until she finished eating, proving the boundless nature of divine grace.",
    mantra: {
      sanskrit: "ॐ नमो भगवते वासुदेवाय ॥ ॐ श्रीं ह्रीं क्लीं त्रिभुवन महालक्ष्म्यै अस्माकं दारिद्र्य नाशय प्रचुर धन देहि क्लीं ह्रीं श्रीं ॐ ॥",
      transliteration: "Om Namo Bhagavate Vasudevaya || Om Shreem Hreem Kleem Tribhuvana Mahalakshmyai Asmaakam Daridrya Naashaya Prachura Dhana Dehi Kleem Hreem Shreem Om ||",
      meaning: "Obeisances to Lord Vasudeva and Goddess Mahalakshmi, the dispeller of poverty and granter of eternal spiritual abundance."
    },
    aarti: {
      title: "Om Jai Lakshmi Mata",
      lines: ["ॐ जय लक्ष्मी माता, मैया जय लक्ष्मी माता । तुमको निसदिन सेवत, हर विष्णु विधाता ॥"],
      href: "/aarti-chants"
    },
    relatedBhaktiContent: [
      { title: "Lakshmi Mantra for Wealth & Peace", href: "/mantras-for-naam-jaap", type: "mantra" },
      { title: "Badrinath Kapat Opening Guide", href: "/sacred-yatra-guides", type: "yatra" }
    ],
    faqs: [
      { question: "Is fasting mandatory on Akshaya Tritiya?", answer: "Fasting is voluntary; performing Daan (charity), Japa, and Vishnu Puja yields supreme merit." }
    ]
  },

  "raksha-bandhan": {
    slug: "raksha-bandhan",
    name: "Raksha Bandhan",
    nameHi: "रक्षाबंधन",
    category: "festival",
    dateString2026: "2026-08-28",
    dateString2027: "2027-08-16",
    dateString2028: "2028-08-05",
    tithiNote: "Shravana Purnima",
    tithiNoteHi: "श्रावण पूर्णिमा",
    hinduMonth: "Shravana",
    paksha: "shukla",
    tithiNumber: 15,
    deity: "Lord Krishna & Draupadi, Lord Vishnu",
    shortDescription: "The sacred bond of love, duty, and protection between brothers and sisters, celebrated alongside Gayatri Jayanti and Shravani Upakarma.",
    shortDescriptionHi: "भाई-बहन के पवित्र स्नेह, अटूट विश्वास और रक्षा-संकल्प का महापर्व।",
    muhuratTitle: "Rakhi Tying Shubh Muhurat (Aparahna)",
    muhuratTiming: "01:45 PM to 08:30 PM (Post Bhadra)",
    pujaTiming: "Afternoon Aparahna Kaal",
    significance: "Sisters tie the protective Raksha thread (Rakhi) on their brothers' wrists with prayers for their long life, while brothers pledge lifelong support and protection.",
    pujaVidhi: [
      { step: 1, title: "Thali Preparation", detail: "Arrange Roli, Akshat, Rakhi, Diya, and sweets on a decorated Puja Thali." },
      { step: 2, title: "Tilak & Rakhi", detail: "Apply Roli-Akshat tilak on brother's forehead, tie the sacred Rakhi on right wrist, and perform Aarti." }
    ],
    vratKatha: "When Lord Krishna cut His finger while battling Shishupala, Draupadi tore a piece of her saree to bandage it. Krishna promised to protect her honor eternally, which He fulfilled during the Vastraharan in Hastinapur.",
    mantra: {
      sanskrit: "येन बद्धो बली राजा दानवेन्द्रो महाबलः । तेन त्वामभिबध्नामि रक्षे मा चल मा चल ॥",
      transliteration: "Yena Baddho Bali Raja Danavendro Mahabalah | Tena Tvam Abhibadhnami Rakshe Ma Chala Ma Chala ||",
      meaning: "I tie upon you the same protective thread with which the mighty King Bali was bound. O sacred protection, remain steadfast forever!"
    },
    aarti: {
      title: "Arti Kunjbihari Ki",
      lines: ["आरती कुंजबिहारी की, श्री गिरिधर कृष्ण मुरारी की ॥"],
      href: "/aarti-chants"
    },
    relatedBhaktiContent: [
      { title: "Krishna Katha Stories", href: "/katha-stories", type: "katha" }
    ],
    faqs: [
      { question: "Why avoid Bhadra period for Rakhi?", answer: "According to astrology, Bhadra is considered inauspicious for auspicious ceremonies like Raksha Bandhan and Holika Dahan." }
    ]
  },

  "krishna-janmashtami": {
    slug: "krishna-janmashtami",
    name: "Krishna Janmashtami",
    nameHi: "कृष्ण जन्माष्टमी",
    category: "festival",
    dateString2026: "2026-09-04",
    dateString2027: "2027-08-25",
    dateString2028: "2028-09-12",
    tithiNote: "Bhadrapada Krishna Ashtami (Rohini Nakshatra)",
    tithiNoteHi: "भाद्रपद कृष्ण अष्टमी (रोहिणी नक्षत्र)",
    hinduMonth: "Bhadrapada",
    paksha: "krishna",
    tithiNumber: 8,
    deity: "Lord Shri Krishna",
    shortDescription: "The divine birth of Yogeshwar Bhagwan Shri Krishna at midnight in Mathura to vanquish tyranny and reveal the Bhagavad Gita.",
    shortDescriptionHi: "अधर्म का नाश करने और भगवद्गीता का दिव्य संदेश देने वाले भगवान श्रीकृष्ण का पावन जन्मोत्सव।",
    muhuratTitle: "Nishita Kaal Janmotsav Puja",
    muhuratTiming: "11:58 PM to 12:44 AM (Midnight)",
    pujaTiming: "Full night celebrations, Makhan-Mishri Bhog at 12:00 AM",
    vratTiming: "Fasting throughout the day, Parana next morning (or post-midnight)",
    significance: "Bhagwan Krishna was born in Mathura's prison to Devaki and Vasudeva. Devotees fast, rock baby Krishna (Laddu Gopal) in decorated swings (Jhula), prepare 56 Bhog, and celebrate Dahi Handi.",
    pujaVidhi: [
      { step: 1, title: "Jhula & Decoration", detail: "Decorate the altar with peacock feathers, flowers, and place Laddu Gopal in a golden swing." },
      { step: 2, title: "Midnight Abhishek", detail: "At 12:00 AM, bathe Laddu Gopal with milk, saffron, honey, and Gangajal inside a conch shell (Shankha)." },
      { step: 3, title: "Chhappan Bhog", detail: "Offer fresh butter (Makhan), rock candy (Mishri), Dhaniya Panjiri, and sweets." }
    ],
    vratKatha: "To end the atrocities of King Kamsa, the Supreme Lord Vishnu manifested in His full 16 Kalas as Shri Krishna, miraculously transported across the flooded Yamuna to Gokul by Vasudeva.",
    mantra: {
      sanskrit: "ॐ नमो भगवते वासुदेवाय ॥ कृं कृष्णाय नमः ॥ हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे । हरे राम हरे राम राम राम हरे हरे ॥",
      transliteration: "Om Namo Bhagavate Vasudevaya || Krim Krishnaya Namah ||",
      meaning: "Salutations to the Supreme Lord Vasudeva, the eternal source of joy, wisdom, and universal love."
    },
    aarti: {
      title: "Aarti Kunj Bihari Ki",
      lines: ["आरती कुंजबिहारी की, श्री गिरिधर कृष्ण मुरारी की । गले में बैजंती माला, बजावे मुरली मधुर बाला ॥"],
      href: "/aarti-chants"
    },
    relatedBhaktiContent: [
      { title: "Vrindavan & Mathura Temples", href: "/hindu-temples", type: "temple" },
      { title: "Naam Jaap & Japa Mala Counter", href: "/naam-jaap", type: "mantra" }
    ],
    faqs: [
      { question: "What is Smarta vs Vaishnava Janmashtami?", answer: "Smartas celebrate on the Ashtami Tithi day, while Vaishnavas observe it when Ashtami aligns with Rohini Nakshatra and Udaya Tithi." }
    ]
  },

  "ganesh-chaturthi": {
    slug: "ganesh-chaturthi",
    name: "Ganesh Chaturthi (Vinayaka Chavithi)",
    nameHi: "गणेश चतुर्थी (विनायक चतुर्थी)",
    category: "festival",
    dateString2026: "2026-09-14",
    dateString2027: "2027-09-04",
    dateString2028: "2028-08-24",
    tithiNote: "Bhadrapada Shukla Chaturthi",
    tithiNoteHi: "भाद्रपद शुक्ल चतुर्थी",
    hinduMonth: "Bhadrapada",
    paksha: "shukla",
    tithiNumber: 4,
    deity: "Lord Ganesha (Vighnaharta)",
    shortDescription: "The grand 10-day festival honoring the arrival of Vighnaharta Ganesha with Modaks, Vedic chants, and grand processions.",
    shortDescriptionHi: "विघ्नहर्ता भगवान श्री गणेश का भव्य जन्मोत्सव एवं 10 दिवसीय गणेशोत्सव का शुभारंभ।",
    muhuratTitle: "Madhyahna Ganesha Puja Muhurat",
    muhuratTiming: "11:06 AM to 01:34 PM",
    pujaTiming: "Midday (Madhyahna) is preferred",
    significance: "Lord Ganesha is the remover of all obstacles (Vighnaharta) and the first deity to be worshipped before any auspicious beginning (Pratham Pujya).",
    pujaVidhi: [
      { step: 1, title: "Murti Sthapana", detail: "Bring eco-friendly clay Ganesha idol home with chants of 'Ganpati Bappa Morya'." },
      { step: 2, title: "Shodashopachara Puja", detail: "Offer 21 Durva blades, red Hibiscus flowers (Gudhal), Sindoor, and 21 Modaks/Laddus." },
      { step: 3, title: "Atharvashirsha Path", detail: "Recite the Ganapati Atharvashirsha with devotion." }
    ],
    vratKatha: "Goddess Parvati created Ganesha from turmeric paste as her guardian. When Shiva cut his head unaware, He replaced it with an elephant head, bestowing the boon of being worshipped first among all deities.",
    mantra: {
      sanskrit: "ॐ गं गणपतये नमः ॥ वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ । निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥",
      transliteration: "Om Gam Ganapataye Namah || Vakratunda Mahakaya Suryakoti Samaprabha | Nirvighnam Kuru Me Deva Sarva-Karyeshu Sarvada ||",
      meaning: "O Lord with the curved trunk and immense form, shining with the brilliance of a million suns, please make all my endeavors free of obstacles forever."
    },
    aarti: {
      title: "Jai Ganesh Jai Ganesh Deva",
      lines: ["जय गणेश जय गणेश जय गणेश देवा । माता जाकी पार्वती पिता महादेवा ॥"],
      href: "/aarti-chants"
    },
    relatedBhaktiContent: [
      { title: "Ashtavinayak Yatra Guide", href: "/sacred-yatra-guides", type: "yatra" },
      { title: "Ganesha Atharvashirsha", href: "/mantras-for-naam-jaap", type: "mantra" }
    ],
    faqs: [
      { question: "Why is sighting the moon avoided on Ganesh Chaturthi?", answer: "According to legend, the Moon laughed at Ganesha, receiving a curse that anyone who looks at the Moon on this day might face false allegations (Mithya Kalank)." }
    ]
  },

  "karwa-chauth": {
    slug: "karwa-chauth",
    name: "Karwa Chauth",
    nameHi: "करवा चौथ",
    category: "vrat",
    dateString2026: "2026-10-29",
    dateString2027: "2027-10-19",
    dateString2028: "2028-10-07",
    tithiNote: "Kartika Krishna Chaturthi",
    tithiNoteHi: "कार्तिक कृष्ण चतुर्थी",
    hinduMonth: "Kartika",
    paksha: "krishna",
    tithiNumber: 4,
    deity: "Maa Karwa, Lord Shiva, Mata Parvati & Moon",
    shortDescription: "Nirjala fast observed by married women for the longevity, well-being, and prosperity of their husbands, broken after sighting the Moon.",
    shortDescriptionHi: "सुहागिन महिलाओं द्वारा पति की दीर्घायु और अखण्ड सौभाग्य के लिए किया जाने वाला निर्जला व्रत।",
    muhuratTitle: "Karwa Chauth Puja Muhurat",
    muhuratTiming: "05:38 PM to 06:56 PM",
    pujaTiming: "Evening sandhya puja",
    moonriseTiming: "08:14 PM (City specific)",
    significance: "An emblem of supreme devotion and marital love. Women fast without food and water from sunrise until sighting the Moon through a sieve (Chhalni).",
    pujaVidhi: [
      { step: 1, title: "Sargi (Pre-dawn)", detail: "Eat the blessed Sargi provided by mother-in-law before sunrise." },
      { step: 2, title: "Evening Vrat Katha", detail: "Gather in traditional attire to recite the Karwa Chauth Katha and rotate the Thali." },
      { step: 3, title: "Chandra Arghya", detail: "Offer water, milk, and akshat to the Moon through a sieve and break the fast with water from the husband's hands." }
    ],
    vratKatha: "Queen Veeravati was tricked by her affectionate brothers into breaking her fast early by creating a false moon. Her husband fell ill, but through severe penance on the next Karwa Chauth, Lord Shiva and Parvati restored him to life.",
    mantra: {
      sanskrit: "ॐ नमः शिवायै शर्वाण्यै सौभाग्यं संततिं शुभाम् । प्रयच्छ भक्तियुक्तायै नारीणां हरवल्लभे ॥",
      transliteration: "Om Namah Shivayai Sharvanyai Saubhāgyam Santatim Shubham | Prayachha Bhakti-yuktāyai Nārīṇām Haravallabhe ||",
      meaning: "O Goddess Parvati, beloved of Shiva, please bestow unending marital bliss, auspicious progeny, and prosperity."
    },
    aarti: {
      title: "Om Jai Jagdish Hare & Karwa Mata Aarti",
      lines: ["जय करवा माता, मैया जय करवा माता । जो व्रत करे तुम्हारा, सब सुख पाता ॥"],
      href: "/aarti-chants"
    },
    relatedBhaktiContent: [
      { title: "Shiva Parvati Katha", href: "/katha-stories", type: "katha" }
    ],
    faqs: [
      { question: "What is Sargi?", answer: "Sargi is a traditional pre-dawn meal containing sweets, dry fruits, and fruits gifted by the mother-in-law before sunrise." }
    ]
  },

  "dhanteras": {
    slug: "dhanteras",
    name: "Dhanteras (Dhanatrayodashi)",
    nameHi: "धनतेरस (धनत्रयोदशी)",
    category: "festival",
    dateString2026: "2026-11-06",
    dateString2027: "2027-10-27",
    dateString2028: "2028-11-14",
    tithiNote: "Kartika Krishna Trayodashi",
    tithiNoteHi: "कार्तिक कृष्ण त्रयोदशी",
    hinduMonth: "Kartika",
    paksha: "krishna",
    tithiNumber: 13,
    deity: "Lord Dhanvantari, Maa Lakshmi & Lord Kubera",
    shortDescription: "The day of health, wealth, and prosperity marking the emergence of Lord Dhanvantari with the Amrit Kalash and Yamadeepdaan.",
    shortDescriptionHi: "आरोग्य के देव धन्वंतरि, धन की देवी माँ लक्ष्मी एवं कुबेर देव की पूजा तथा दीपदान का पावन दिवस।",
    muhuratTitle: "Dhanteras Puja & Buying Muhurat",
    muhuratTiming: "06:02 PM to 08:00 PM (Pradosh Kaal)",
    pujaTiming: "Pradosh Kaal & Vrishabha Lagna",
    significance: "Lord Dhanvantari, the physician of the gods, appeared on this day during Samudra Manthan carrying the pot of nectar. Lighting a 4-wick deepak for Lord Yama (Yamadeepdaan) wards off untimely death.",
    pujaVidhi: [
      { step: 1, title: "Purchase of Utensils/Gold", detail: "Buy brass, silver, gold utensils, or broom (Jhadu) representing Lakshmi." },
      { step: 2, title: "Dhanvantari & Kubera Puja", detail: "Offer coriander seeds (Dhania), batasha, and flowers to Kubera and Dhanvantari." },
      { step: 3, title: "Yamadeepdaan", detail: "Light a four-faced mustard oil lamp at the main entrance facing South." }
    ],
    vratKatha: "A young prince was fated to die on the 4th day of his marriage. His clever wife kept him awake with stories and placed all her gold at the door, dazzling Yama's serpent who silently departed.",
    mantra: {
      sanskrit: "ॐ नमो भगवते महासुदर्शनाय वासुदेवाय धन्वन्तरये अमृतकलशहस्ताय सर्वभयविनाशाय सर्वरोगनिवारणाय त्रिलोकपतये त्रिलोकनाथाय श्री महाविष्णुस्वरूप श्रीधन्वन्तरि स्वरूप श्री श्री श्री औषधचक्र नारायणाय स्वाहा ॥",
      transliteration: "Om Namo Bhagavate Dhanvantaraye Amrita-Kalasha-Hastaya Sarva-Bhaya-Vinashaya Sarva-Roga-Nivaranaya...",
      meaning: "Salutations to Lord Dhanvantari holding the nectar vessel, the destroyer of all fears and healer of all illnesses."
    },
    aarti: {
      title: "Om Jai Lakshmi Mata",
      lines: ["ॐ जय लक्ष्मी माता, मैया जय लक्ष्मी माता ॥"],
      href: "/aarti-chants"
    },
    relatedBhaktiContent: [
      { title: "Dhanvantari Mantra for Good Health", href: "/mantras-for-naam-jaap", type: "mantra" }
    ],
    faqs: [
      { question: "Why buy coriander seeds on Dhanteras?", answer: "Coriander seeds (Khada Dhania) symbolize growth, wealth, and good fortune, planted after Diwali." }
    ]
  },

  "diwali": {
    slug: "diwali",
    name: "Diwali (Deepawali / Lakshmi Puja)",
    nameHi: "दीपावली (महालक्ष्मी पूजन)",
    category: "festival",
    dateString2026: "2026-11-08",
    dateString2027: "2027-10-29",
    dateString2028: "2028-11-16",
    tithiNote: "Kartika Krishna Amavasya",
    tithiNoteHi: "कार्तिक कृष्ण अमावस्या",
    hinduMonth: "Kartika",
    paksha: "krishna",
    tithiNumber: 15,
    deity: "Mata Mahalakshmi & Lord Ganesha",
    shortDescription: "The supreme festival of lights, celebrating the return of Lord Rama to Ayodhya and the worship of Maa Lakshmi for spiritual and material illumination.",
    shortDescriptionHi: "अन्धकार पर प्रकाश, अधर्म पर धर्म की विजय का महापर्व। माँ महालक्ष्मी एवं श्री गणेश का पावन पूजन।",
    muhuratTitle: "Lakshmi Puja Shubh Muhurat (Pradosh Kaal)",
    muhuratTiming: "05:42 PM to 07:38 PM (Nishita Kaal: 11:39 PM to 12:31 AM)",
    pujaTiming: "Pradosh Kaal (Vrishabha Sthir Lagna)",
    significance: "Deepawali celebrates light over darkness, knowledge over ignorance. Ayodhya was illuminated with millions of clay diyas to welcome Lord Rama, Sita, and Lakshmana after 14 years of exile.",
    pujaVidhi: [
      { step: 1, title: "Altar Setup", detail: "Lay red/yellow silk cloth on a wooden Chowki, place Maa Lakshmi on the right and Lord Ganesha on the left." },
      { step: 2, title: "Kalash & Nava Graha", detail: "Establish the sacred Mangal Kalash with coconut and mango leaves." },
      { step: 3, title: "Lakshmi Pujan", detail: "Offer Lotus flowers (Kamal Gatta), Kheel, Batashe, Roli, Akshat, and silver coins." },
      { step: 4, title: "Deep Daan", detail: "Light 21, 51, or 108 mustard oil/ghee earthen lamps and illuminate every corner of the house." }
    ],
    vratKatha: "During the churning of the ocean (Samudra Manthan), Goddess Lakshmi emerged seated on a golden lotus. She chose Lord Vishnu as Her eternal consort, bringing peace, light, and prosperity to the cosmos.",
    mantra: {
      sanskrit: "ॐ श्रीं ह्रीं श्रीं कमले कमलालये प्रसीद प्रसीद श्रीं ह्रीं श्रीं ॐ महालक्ष्म्यै नमः ॥",
      transliteration: "Om Shreem Hreem Shreem Kamale Kamalalaye Praseeda Praseeda Shreem Hreem Shreem Om Mahalakshmyai Namah ||",
      meaning: "O supreme Mother Lakshmi, who resides upon the sacred lotus, shower Your divine grace, abundance, and spiritual wisdom upon us."
    },
    aarti: {
      title: "Om Jai Lakshmi Mata",
      lines: [
        "ॐ जय लक्ष्मी माता, मैया जय लक्ष्मी माता । तुमको निसदिन सेवत, हर विष्णु विधाता ॥",
        "उमा, रमा, ब्रह्माणी, तुम ही जग-माता । सूर्य-चन्द्रमा ध्यावत, नारद ऋषि गाता ॥",
        "जिस घर में तुम रहती, सब सद्गुण आता । सब सम्भव हो जाता, मन नहीं घबराता ॥"
      ],
      href: "/aarti-chants"
    },
    relatedBhaktiContent: [
      { title: "Shri Suktam Mantra & Meaning", href: "/mantras-for-naam-jaap", type: "mantra" },
      { title: "Lakshmi Aarti Audio & Lyrics", href: "/aarti-chants", type: "aarti" },
      { title: "Tirupati Balaji Temple Guide", href: "/hindu-temples", type: "temple" }
    ],
    faqs: [
      { question: "Why is Sthir Lagna chosen for Lakshmi Puja?", answer: "Sthir Lagna (like Taurus / Vrishabha) represents permanence, ensuring that Goddess Lakshmi's divine grace and prosperity remain constantly anchored in the household." },
      { question: "What is Nishita Kaal Puja?", answer: "Nishita Kaal (Midnight) is preferred by spiritual seekers, traders, and astrologers for intensive Mahalakshmi Japa and Shree Yantra activation." }
    ]
  },

  "devutthana-ekadashi": {
    slug: "devutthana-ekadashi",
    name: "Devutthana Ekadashi (Prabodhini / Tulsi Vivah)",
    nameHi: "देवउठनी एकादशी (प्रबोधिनी एकादशी)",
    category: "ekadashi",
    dateString2026: "2026-11-20",
    dateString2027: "2027-11-09",
    dateString2028: "2028-10-29",
    tithiNote: "Kartika Shukla Ekadashi",
    tithiNoteHi: "कार्तिक शुक्ल एकादशी",
    hinduMonth: "Kartika",
    paksha: "shukla",
    tithiNumber: 11,
    deity: "Lord Vishnu (Shaligram) & Mata Tulsi",
    shortDescription: "Lord Vishnu awakens from His 4-month cosmic slumber (Chaturmas), inaugurating the auspicious wedding season and Tulsi Vivah.",
    shortDescriptionHi: "भगवान श्री हरि विष्णु का चार माह के योगनिद्रा से जागरण। तुलसी विवाह एवं शुभ विवाह कार्यों का आरंभ।",
    muhuratTitle: "Tulsi Vivah & Puja Muhurat",
    muhuratTiming: "05:28 PM to 07:45 PM",
    pujaTiming: "Evening sandhya puja with sugarcane canopy (Mandap)",
    significance: "Marks the end of Chaturmas. Fasting on this Ekadashi is said to grant the spiritual merit of performing a thousand Ashwamedha Yagnas.",
    pujaVidhi: [
      { step: 1, title: "Sugarcane Mandap", detail: "Erect a canopy with 11 sugarcanes around the Tulsi plant." },
      { step: 2, title: "Tulsi Shaligram Vivah", detail: "Drape Tulsi with red Chunri and jewelry, offering vermillion, while worshipping Lord Shaligram." },
      { step: 3, title: "Awakening Prayer", detail: "Chant 'Uttishtha Govinda Tyaja Nidram Jagatpate' to awaken Lord Vishnu." }
    ],
    vratKatha: "Demon Jalandhar's wife Vrinda was an ardent devotee. When Vishnu took Jalandhar's form to defeat him, Vrinda gave up her body, reincarnating as the sacred holy basil (Tulsi), whom Vishnu blessed to be His eternal companion.",
    mantra: {
      sanskrit: "उत्तिष्ठोत्तिष्ठ गोविन्द त्यज निद्रां जगत्पते । त्वयि सुप्ते जगन्नाथ जगत् सुप्तं भवेदिदम् ॥",
      transliteration: "Uttishthottishtha Govinda Tyaja Nidram Jagatpate | Tvayi Supte Jagannatha Jagat Suptam Bhavedidam ||",
      meaning: "Awaken, O Govinda! Awaken, Lord of the Universe! When You sleep, the entire creation sleeps; when You awaken, life and virtue flourish."
    },
    aarti: {
      title: "Tulsi Mata Aarti",
      lines: ["जय जय तुलसी माता, मैया जय तुलसी माता । सब जग की सुख दाता, सबकी वर दाता ॥"],
      href: "/aarti-chants"
    },
    relatedBhaktiContent: [
      { title: "Tulsi Gayatri Mantra", href: "/mantras-for-naam-jaap", type: "mantra" }
    ],
    faqs: [
      { question: "Can wedding rituals begin after Devutthana Ekadashi?", answer: "Yes, auspicious ceremonies like Vivah, Griha Pravesh, and Mundan resume with great vigor." }
    ]
  },

  "makar-sankranti": {
    slug: "makar-sankranti",
    name: "Makar Sankranti (Pongal / Uttarayan)",
    nameHi: "मकर संक्रांति (उत्तरायण)",
    category: "sankranti",
    dateString2026: "2026-01-14",
    dateString2027: "2027-01-15",
    dateString2028: "2028-01-15",
    tithiNote: "Sun enters Makara Rasi (Capricorn)",
    tithiNoteHi: "सूर्य का मकर राशि में प्रवेश",
    hinduMonth: "Pausha / Magha",
    paksha: "shukla",
    tithiNumber: 1,
    deity: "Lord Surya (Sun God)",
    shortDescription: "The celestial transition of the Sun into Capricorn marking the start of Uttarayan, holy dips at Sangam, and charity of sesame (Til) and jaggery.",
    shortDescriptionHi: "सूर्यदेव के उत्तरायण गमन का महापर्व। गंगा स्नान, तिल-गुड़ दान और पतंगोत्सव।",
    muhuratTitle: "Makar Sankranti Punya Kaal",
    muhuratTiming: "07:15 AM to 05:46 PM (Maha Punya Kaal: 07:15 AM to 09:00 AM)",
    pujaTiming: "Morning holy bath & Surya Arghya",
    significance: "Days begin to grow longer and warmer. Bathing in the holy rivers at Prayagraj, Haridwar, or Ganga Sagar washes away sins, and donating Til-Gud brings immense health and spiritual vitality.",
    pujaVidhi: [
      { step: 1, title: "Surya Arghya", detail: "Offer water mixed with red flowers, Akshat, and Roli to Lord Surya from a copper vessel chanting the Gayatri Mantra." },
      { step: 2, title: "Til & Khichdi Daan", detail: "Donate black/white sesame seeds, jaggery, blankets, and Khichdi to the underprivileged." }
    ],
    vratKatha: "Lord Surya visits the house of His son Shani (ruler of Capricorn) on this day, burying old discords and symbolizing forgiveness, light, and new warmth.",
    mantra: {
      sanskrit: "ॐ सूर्याय नमः ॥ ॐ घृणिः सूर्य आदित्यो नमो नमः ॥",
      transliteration: "Om Suryaya Namah || Om Ghrinih Surya Adityo Namo Namah ||",
      meaning: "Salutations to the divine Sun God, the illumination of consciousness and sustainer of all life."
    },
    aarti: {
      title: "Surya Dev Aarti",
      lines: ["जय कश्यप नन्दन, ॐ जय अदिति नन्दन । त्रिभुवन तिमिर निकन्दन, भक्त हृदय चन्दन ॥"],
      href: "/aarti-chants"
    },
    relatedBhaktiContent: [
      { title: "Surya Gayatri Mantra", href: "/mantras-for-naam-jaap", type: "mantra" },
      { title: "Konark Sun Temple Guide", href: "/hindu-temples", type: "temple" }
    ],
    faqs: [
      { question: "What is Punya Kaal during Sankranti?", answer: "Punya Kaal is the sacred period of 6 to 8 hours surrounding the Sun's transit when charity and snana yield maximum spiritual benefit." }
    ]
  },
};

/** All 24 Ekadashi names with their Paksha and Month */
export const EKADASHI_CALENDAR = [
  { name: "Saphala Ekadashi", masa: "Pausha", paksha: "krishna" },
  { name: "Pausha Putrada Ekadashi", masa: "Pausha", paksha: "shukla" },
  { name: "Shattila Ekadashi", masa: "Magha", paksha: "krishna" },
  { name: "Jaya Ekadashi", masa: "Magha", paksha: "shukla" },
  { name: "Vijaya Ekadashi", masa: "Phalguna", paksha: "krishna" },
  { name: "Amalaki Ekadashi", masa: "Phalguna", paksha: "shukla" },
  { name: "Papmochani Ekadashi", masa: "Chaitra", paksha: "krishna" },
  { name: "Kamada Ekadashi", masa: "Chaitra", paksha: "shukla" },
  { name: "Varuthini Ekadashi", masa: "Vaishakha", paksha: "krishna" },
  { name: "Mohini Ekadashi", masa: "Vaishakha", paksha: "shukla" },
  { name: "Apara Ekadashi", masa: "Jyeshtha", paksha: "krishna" },
  { name: "Nirjala Ekadashi", masa: "Jyeshtha", paksha: "shukla" },
  { name: "Yogini Ekadashi", masa: "Ashadha", paksha: "krishna" },
  { name: "Devshayani Ekadashi", masa: "Ashadha", paksha: "shukla" },
  { name: "Kamika Ekadashi", masa: "Shravana", paksha: "krishna" },
  { name: "Shravana Putrada Ekadashi", masa: "Shravana", paksha: "shukla" },
  { name: "Aja Ekadashi", masa: "Bhadrapada", paksha: "krishna" },
  { name: "Parivartini Ekadashi", masa: "Bhadrapada", paksha: "shukla" },
  { name: "Indira Ekadashi", masa: "Ashvina", paksha: "krishna" },
  { name: "Papankusha Ekadashi", masa: "Ashvina", paksha: "shukla" },
  { name: "Rama Ekadashi", masa: "Kartika", paksha: "krishna" },
  { name: "Devutthana Ekadashi", masa: "Kartika", paksha: "shukla" },
  { name: "Utpanna Ekadashi", masa: "Margashirsha", paksha: "krishna" },
  { name: "Mokshada Ekadashi (Gita Jayanti)", masa: "Margashirsha", paksha: "shukla" },
];

export function getObservancesForTithi(input: {
  masaIndex: number;
  paksha: Paksha;
  tithiNumber: number;
  weekday: number;
  year?: number;
}): Observance[] {
  const list: Observance[] = [];

  // Recurring Tithi-based Vrats
  if (input.tithiNumber === 11) {
    const ekadashi = EKADASHI_CALENDAR[input.masaIndex * 2 + (input.paksha === "shukla" ? 1 : 0)] || { name: "Ekadashi Vrat" };
    list.push({
      name: `${ekadashi.name}`,
      nameHi: `${ekadashi.name} व्रत`,
      category: "ekadashi",
      href: `/panchang/festivals/devutthana-ekadashi`,
      description: "Sacred fast dedicated to Lord Vishnu.",
      deity: "Lord Vishnu",
      isMajor: true,
    });
  }

  if (input.tithiNumber === 13) {
    const dayNames = ["Ravi", "Soma", "Bhauma", "Budha", "Guru", "Shukra", "Shani"];
    const prefix = dayNames[input.weekday] || "";
    list.push({
      name: `${prefix} Pradosh Vrat`,
      nameHi: `${prefix} प्रदोष व्रत`,
      category: "pradosh",
      description: "Twilight fast dedicated to Lord Shiva and Mata Parvati.",
      deity: "Lord Shiva",
      isMajor: false,
    });
  }

  if (input.tithiNumber === 4) {
    if (input.paksha === "krishna") {
      list.push({
        name: "Sankashti Chaturthi",
        nameHi: "संकष्टी चतुर्थी",
        category: "sankashti",
        description: "Ganesha fast observed with Moon sighting at night.",
        deity: "Lord Ganesha",
        isMajor: false,
      });
    } else {
      list.push({
        name: "Vinayaka Chaturthi",
        nameHi: "विनायक चतुर्थी",
        category: "vrat",
        description: "Monthly Ganesha worship day.",
        deity: "Lord Ganesha",
        isMajor: false,
      });
    }
  }

  if (input.tithiNumber === 15) {
    if (input.paksha === "shukla") {
      list.push({
        name: "Satyanarayan Purnima Vrat",
        nameHi: "पूर्णिमा व्रत / सत्यनारायण पूजा",
        category: "purnima",
        description: "Full Moon day dedicated to Lord Satyanarayan and Chandra Dev.",
        deity: "Lord Vishnu",
        isMajor: true,
      });
    } else {
      list.push({
        name: "Amavasya (Darsha / Pitru Tarpan)",
        nameHi: "अमावस्या (पितृ तर्पण)",
        category: "amavasya",
        description: "New Moon day sacred for Pitru Tarpan and spiritual introspections.",
        deity: "Pitris / Lord Vishnu",
        isMajor: true,
      });
    }
  }

  // Major Annual Hindu Festivals matching (Masa + Paksha + Tithi)
  // Chaitra (masaIndex 0)
  if (input.masaIndex === 0 && input.paksha === "shukla" && input.tithiNumber === 1) {
    list.push({
      slug: "chaitra-navratri",
      name: "Chaitra Navratri / Hindu New Year",
      nameHi: "चैत्र नवरात्रि / नव संवत्सर",
      category: "festival",
      href: "/panchang/festivals/chaitra-navratri",
      isMajor: true,
    });
  }
  if (input.masaIndex === 0 && input.paksha === "shukla" && input.tithiNumber === 9) {
    list.push({
      slug: "ram-navami",
      name: "Ram Navami",
      nameHi: "राम नवमी",
      category: "festival",
      href: "/panchang/festivals/ram-navami",
      isMajor: true,
    });
  }

  // Vaishakha (masaIndex 1)
  if (input.masaIndex === 1 && input.paksha === "shukla" && input.tithiNumber === 3) {
    list.push({
      slug: "akshaya-tritiya",
      name: "Akshaya Tritiya",
      nameHi: "अक्षय तृतीया",
      category: "festival",
      href: "/panchang/festivals/akshaya-tritiya",
      isMajor: true,
    });
  }

  // Shravana (masaIndex 4)
  if (input.masaIndex === 4 && input.paksha === "shukla" && input.tithiNumber === 5) {
    list.push({
      name: "Nag Panchami",
      nameHi: "नाग पंचमी",
      category: "festival",
      isMajor: true,
    });
  }
  if (input.masaIndex === 4 && input.paksha === "shukla" && input.tithiNumber === 15) {
    list.push({
      slug: "raksha-bandhan",
      name: "Raksha Bandhan",
      nameHi: "रक्षाबंधन",
      category: "festival",
      href: "/panchang/festivals/raksha-bandhan",
      isMajor: true,
    });
  }

  // Bhadrapada (masaIndex 5)
  if (input.masaIndex === 5 && input.paksha === "krishna" && input.tithiNumber === 8) {
    list.push({
      slug: "krishna-janmashtami",
      name: "Krishna Janmashtami",
      nameHi: "श्री कृष्ण जन्माष्टमी",
      category: "festival",
      href: "/panchang/festivals/krishna-janmashtami",
      isMajor: true,
    });
  }
  if (input.masaIndex === 5 && input.paksha === "shukla" && input.tithiNumber === 4) {
    list.push({
      slug: "ganesh-chaturthi",
      name: "Ganesh Chaturthi",
      nameHi: "गणेश चतुर्थी",
      category: "festival",
      href: "/panchang/festivals/ganesh-chaturthi",
      isMajor: true,
    });
  }

  // Kartika (masaIndex 7)
  if (input.masaIndex === 7 && input.paksha === "krishna" && input.tithiNumber === 4) {
    list.push({
      slug: "karwa-chauth",
      name: "Karwa Chauth",
      nameHi: "करवा चौथ",
      category: "vrat",
      href: "/panchang/festivals/karwa-chauth",
      isMajor: true,
    });
  }
  if (input.masaIndex === 7 && input.paksha === "krishna" && input.tithiNumber === 13) {
    list.push({
      slug: "dhanteras",
      name: "Dhanteras",
      nameHi: "धनतेरस",
      category: "festival",
      href: "/panchang/festivals/dhanteras",
      isMajor: true,
    });
  }
  if (input.masaIndex === 7 && input.paksha === "krishna" && input.tithiNumber === 15) {
    list.push({
      slug: "diwali",
      name: "Diwali (Lakshmi Puja)",
      nameHi: "दीपावली (लक्ष्मी पूजन)",
      category: "festival",
      href: "/panchang/festivals/diwali",
      isMajor: true,
    });
  }
  if (input.masaIndex === 7 && input.paksha === "shukla" && input.tithiNumber === 1) {
    list.push({
      name: "Govardhan Puja / Annakut",
      nameHi: "गोवर्धन पूजा / अन्नकूट",
      category: "festival",
      isMajor: true,
    });
  }
  if (input.masaIndex === 7 && input.paksha === "shukla" && input.tithiNumber === 2) {
    list.push({
      name: "Bhai Dooj (Yama Dwitiya)",
      nameHi: "भाई दूज (यम द्वितीया)",
      category: "festival",
      isMajor: true,
    });
  }
  if (input.masaIndex === 7 && input.paksha === "shukla" && input.tithiNumber === 6) {
    list.push({
      name: "Chhath Puja (Sandhya Arghya)",
      nameHi: "छठ पूजा (संध्या अर्घ्य)",
      category: "festival",
      isMajor: true,
    });
  }
  if (input.masaIndex === 7 && input.paksha === "shukla" && input.tithiNumber === 11) {
    list.push({
      slug: "devutthana-ekadashi",
      name: "Devutthana Ekadashi / Tulsi Vivah",
      nameHi: "देवउठनी एकादशी / तुलसी विवाह",
      category: "ekadashi",
      href: "/panchang/festivals/devutthana-ekadashi",
      isMajor: true,
    });
  }

  // Phalguna (masaIndex 11)
  if (input.masaIndex === 11 && input.paksha === "krishna" && input.tithiNumber === 14) {
    list.push({
      slug: "maha-shivratri",
      name: "Maha Shivratri",
      nameHi: "महाशिवरात्रि",
      category: "festival",
      href: "/panchang/festivals/maha-shivratri",
      isMajor: true,
    });
  }
  if (input.masaIndex === 11 && input.paksha === "shukla" && input.tithiNumber === 15) {
    list.push({
      slug: "holi",
      name: "Holika Dahan / Holi",
      nameHi: "होलिका दहन / होली",
      category: "festival",
      href: "/panchang/festivals/holi",
      isMajor: true,
    });
  }

  // Sawan Somwar
  if (input.masaIndex === 4 && input.weekday === 1) {
    list.push({
      name: "Sawan Somwar Vrat",
      nameHi: "सावन सोमवार व्रत",
      category: "vrat",
      deity: "Lord Shiva",
      isMajor: true,
    });
  }

  return list;
}
