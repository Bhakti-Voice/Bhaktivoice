"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { AngelNumberPage } from "@/lib/content/types";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { AngelNumberCard } from "./AngelNumberCard";
import { CelestialPoster } from "./CelestialPoster";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { trackEvent } from "@/components/analytics/GoogleAnalytics";
import {
  ArrowRight,
  Briefcase,
  Calendar,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Feather,
  Flower2,
  Heart,
  HelpCircle,
  Lightbulb,
  Link as LinkIcon,
  MessageCircle,
  Sparkles,
  Star,
  Users,
} from "lucide-react";

import { useLocale } from "@/lib/i18n/client";
import type { Locale } from "@/lib/i18n/config";

export interface AngelNumberDetailViewProps {
  page: AngelNumberPage;
  related: AngelNumberPage[];
}

// Multi-language curated themes for the horizontal scroll showcase
const THEMES = [
  {
    id: "all",
    labels: { en: "All Numbers", hi: "सभी नंबर्स", te: "అన్ని సంఖ్యలు" },
    icon: "🌟",
  },
  {
    id: "transformation",
    labels: { en: "Transformation & Growth", hi: "परिवर्तन और विकास", te: "మార్పు & ఎదుగుదల" },
    icon: "✨",
    match: ["555", "500", "505", "55"],
  },
  {
    id: "abundance",
    labels: { en: "Abundance & Wealth", hi: "समृद्धि और धन", te: "సంపద & సమృద్ధి" },
    icon: "💎",
    match: ["888", "498", "808", "88"],
  },
  {
    id: "awakening",
    labels: { en: "Spiritual Awakening", hi: "आध्यात्मिक जागरण", te: "ఆధ్యాత్మిక జాగృతి" },
    icon: "🕊️",
    match: ["777", "111", "497", "717"],
  },
  {
    id: "protection",
    labels: { en: "Divine Protection", hi: "ईश्वरीय सुरक्षा", te: "దైవిక రక్షణ" },
    icon: "🛡️",
    match: ["444", "498", "414", "44"],
  },
  {
    id: "love",
    labels: { en: "Love & Twin Flame", hi: "प्रेम और ट्विन फ्लेम", te: "ప్రేమ & ట్విన్ ఫ్లేమ్" },
    icon: "💖",
    match: ["222", "499", "666", "212"],
  },
];

// Trilingual At-a-Glance attributes dictionary for common angel numbers
type LocalizedString = { en: string; hi: string; te: string };

const GLANCE_DATA: Record<
  string,
  {
    coreMeaning: LocalizedString;
    love: LocalizedString;
    career: LocalizedString;
    twinFlame: LocalizedString;
    spirituality: LocalizedString;
    quote: LocalizedString;
    keywords: LocalizedString;
  }
> = {
  "111": {
    coreMeaning: {
      en: "New beginnings",
      hi: "नई शुरुआत व प्रकटीकरण",
      te: "నూతన ఆరంభాలు & సంకల్పం",
    },
    love: {
      en: "Fresh start & open heart",
      hi: "खुला हृदय और नया प्रेम अध्याय",
      te: "స్వచ్ఛమైన హృదయం & కొత్త అధ్యాయం",
    },
    career: {
      en: "New opportunities & focus",
      hi: "नए अवसर और लक्ष्य एकाग्रता",
      te: "నూతన అవకాశాలు & ఏకాగ్రత",
    },
    twinFlame: {
      en: "Manifestation & union",
      hi: "ट्विन फ्लेम प्रकटीकरण और मिलन",
      te: "ఆధ్యాత్మిక కలయిక & ప్రకటీకరణ",
    },
    spirituality: {
      en: "Thoughts turning into reality",
      hi: "विचारों का वास्तविकता में रूपांतरण",
      te: "ఆలోచనలు నిజమయ్యే పవిత్ర సమయం",
    },
    quote: {
      en: "Your thoughts are rapidly manifesting into physical reality.",
      hi: "आपके विचार तेजी से भौतिक वास्तविकता में प्रकट हो रहे हैं।",
      te: "మీ ఆలోచనలు వేగంగా భౌతిక వాస్తవంగా రూపాంతరం చెందుతున్నాయి.",
    },
    keywords: {
      en: "New Beginnings  •  Intention  •  Manifestation",
      hi: "नई शुरुआत  •  संकल्प  •  प्रकटीकरण",
      te: "నూతన ఆరంభాలు  •  సంకల్పం  •  ప్రకటీకరణ",
    },
  },
  "222": {
    coreMeaning: {
      en: "Divine balance",
      hi: "ईश्वरीय संतुलन और धैर्य",
      te: "దైవిక సమతుల్యత & ఓర్పు",
    },
    love: {
      en: "Growth & harmony",
      hi: "प्रेम में सामंजस्य और गहरा विश्वास",
      te: "ప్రేమలో సామరస్యం & ప్రగాఢ నమ్మకం",
    },
    career: {
      en: "Patience & collaboration",
      hi: "धैर्य, सहयोग और निरंतर प्रयास",
      te: "ఓర్పు, సహకారం & నిరంతర కృషి",
    },
    twinFlame: {
      en: "Alignment & soul connection",
      hi: "आत्मिक जुड़ाव और सामंजस्य",
      te: "ఆత్మ అనుసంధానం & సమన్వయం",
    },
    spirituality: {
      en: "Trust in universal timing",
      hi: "ब्रह्मांडीय समय पर पूर्ण विश्वास",
      te: "దైవిక సమయంపై సంపూర్ణ విశ్వాసం",
    },
    quote: {
      en: "Have faith. Everything is working out for your highest good.",
      hi: "विश्वास रखें, सब कुछ आपके परम कल्याण के लिए घटित हो रहा है।",
      te: "నమ్మకం ఉంచండి, అంతా మీ శ్రేయస్సు కోసమే జరుగుతోంది.",
    },
    keywords: {
      en: "Balance  •  Trust  •  Harmony",
      hi: "संतुलन  •  विश्वास  •  सामंजस्य",
      te: "సమతుల్యత  •  విశ్వాసం  •  సామరస్యం",
    },
  },
  "333": {
    coreMeaning: {
      en: "Divine alignment",
      hi: "ईश्वरीय संरेखण व संतुलन",
      te: "దైవిక అనుసంధానం & సమతుల్యత",
    },
    love: {
      en: "Growth & harmony",
      hi: "प्रेम में वृद्धि और सामंजस्य",
      te: "ప్రేమలో వృద్ధి & సామరస్యం",
    },
    career: {
      en: "Creativity & expansion",
      hi: "रचनात्मकता और कार्य विस्तार",
      te: "సృజనాత్మకత & పని విస్తరణ",
    },
    twinFlame: {
      en: "Union & support",
      hi: "आत्मिक सहयोग और एकता",
      te: "ఆత్మ సహకారం & ఐక్యత",
    },
    spirituality: {
      en: "Guidance from Ascended Masters",
      hi: "सिद्ध गुरुओं का दिव्य मार्गदर्शन",
      te: "సిద్ధ గురువుల దివ్య మార్గదర్శకత్వం",
    },
    quote: {
      en: "You are exactly where you need to be.",
      hi: "आप ठीक वहीं हैं जहां इस समय आपको होना चाहिए।",
      te: "మీరు సరిగ్గా ఉండవలసిన పవిత్ర మార్గంలోనే ఉన్నారు.",
    },
    keywords: {
      en: "Creativity  •  Protection  •  Support",
      hi: "रचनात्मकता  •  सुरक्षा  •  सहयोग",
      te: "సృజనాత్మకత  •  రక్షణ  •  సహకారం",
    },
  },
  "444": {
    coreMeaning: {
      en: "Divine protection",
      hi: "ईश्वरीय सुरक्षा और संबल",
      te: "దైవిక రక్షణ & ఆశీస్సులు",
    },
    love: {
      en: "Security & honest devotion",
      hi: "सुरक्षा और निस्वार्थ समर्पण",
      te: "భరోసా & నిజాయితీగల అంకితభావం",
    },
    career: {
      en: "Diligence & solid foundations",
      hi: "कठिन परिश्रम और मजबूत नींव",
      te: "నిరంతర కృషి & బలమైన పునాది",
    },
    twinFlame: {
      en: "Anchored & enduring bond",
      hi: "दृढ़ और अटूट आत्मिक संबंध",
      te: "స్థిరమైన మరియు శాశ్వత బంధం",
    },
    spirituality: {
      en: "Surrounded by guardian angels",
      hi: "अंगरक्षक देवदूतों का संरक्षण",
      te: "రక్షక దేవదూతల నిరంతర తోడు",
    },
    quote: {
      en: "You are surrounded by angels who love, guide, and protect you.",
      hi: "आप उन देवदूतों से घिरे हैं जो आपसे प्रेम करते हैं और आपकी रक्षा करते हैं।",
      te: "మిమ్మల్ని ప్రేమించే మరియు రక్షించే దేవదూతలు ఎల్లప్పుడూ మీతోనే ఉన్నారు.",
    },
    keywords: {
      en: "Protection  •  Stability  •  Guidance",
      hi: "सुरक्षा  •  स्थिरता  •  मार्गदर्शन",
      te: "రక్షణ  •  స్థిరత్వం  •  మార్గదర్శకత్వం",
    },
  },
  "555": {
    coreMeaning: {
      en: "Major transformation",
      hi: "महत्वपूर्ण जीवन परिवर्तन",
      te: "ముఖ్యమైన జీవన పరివర్తన",
    },
    love: {
      en: "Positive change & passion",
      hi: "सकारात्मक बदलाव और नई ऊर्जा",
      te: "సానుకూల మార్పు & నూతన ఉత్తేజం",
    },
    career: {
      en: "Bold career breakthroughs",
      hi: "साहसी निर्णय और कार्य सफलता",
      te: "ధైర్యమైన నిర్ణయాలు & గొప్ప విజయం",
    },
    twinFlame: {
      en: "Soul evolution & freedom",
      hi: "आत्मिक विकास और मुक्ति",
      te: "ఆధ్యాత్మిక వికాసం & స్వేచ్ఛ",
    },
    spirituality: {
      en: "Embracing your destiny",
      hi: "अपने जीवन के उद्देश्य को स्वीकारना",
      te: "మీ నిజమైన జీవిత గమ్యాన్ని స్వీకరించడం",
    },
    quote: {
      en: "Embrace the changes unfolding; they are aligning your life.",
      hi: "होने वाले परिवर्तनों को स्वीकारें; वे आपके जीवन को संवार रहे हैं।",
      te: "వస్తున్న మార్పులను ఆహ్వానించండి; అవి మీ జీవితాన్ని ఉన్నతంగా తీర్చిదిద్దుతున్నాయి.",
    },
    keywords: {
      en: "Change  •  Growth  •  Freedom",
      hi: "बदलाव  •  विकास  •  मुक्ति",
      te: "మార్పు  •  ఎదుగుదల  •  స్వేచ్ఛ",
    },
  },
  "777": {
    coreMeaning: {
      en: "Spiritual awakening",
      hi: "आध्यात्मिक जागरण और सौभाग्य",
      te: "ఆధ్యాత్మిక జాగృతి & అదృష్టం",
    },
    love: {
      en: "Soulmate depth & sacred union",
      hi: "गहरा आत्मिक प्रेम और पवित्र मिलन",
      te: "గాఢమైన ఆత్మ ప్రేమ & పవిత్ర కలయిక",
    },
    career: {
      en: "Divine luck & intuition",
      hi: "ईश्वरीय भाग्य और अंतर्ज्ञान",
      te: "దైవిక అదృష్టం & అంతర్దృష్టి",
    },
    twinFlame: {
      en: "Deep spiritual synchronicity",
      hi: "अलौकिक संयोग और परस्पर समझ",
      te: "అద్భుత ఆధ్యాత్మిక సమన్వయం",
    },
    spirituality: {
      en: "Highest cosmic alignment",
      hi: "सर्वोच्च ब्रह्मांडीय सामंजस्य",
      te: "ఉన్నత ఆధ్యాత్మిక అనుసంధానం",
    },
    quote: {
      en: "You are in perfect harmony with universal wisdom and timing.",
      hi: "आप ब्रह्मांडीय ज्ञान और सही समय के साथ पूर्ण सामंजस्य में हैं।",
      te: "మీరు విశ్వ జ్ఞానం మరియు సరైన సమయంతో సంపూర్ణ సమన్వయంలో ఉన్నారు.",
    },
    keywords: {
      en: "Luck  •  Intuition  •  Awakening",
      hi: "भाग्य  •  अंतर्ज्ञान  •  जागरण",
      te: "అదృష్టం  •  అంతర్దృష్టి  •  జాగృతి",
    },
  },
  "888": {
    coreMeaning: {
      en: "Infinite abundance",
      hi: "अनंत समृद्धि और वैभव",
      te: "అనంతమైన సంపద & శ్రేయస్సు",
    },
    love: {
      en: "Generosity & emotional fullness",
      hi: "उदारता, आनंद और भावनात्मक तृप्ति",
      te: "ఔదార్యం, ఆనందం & భావోద్వేగ తృప్తి",
    },
    career: {
      en: "Financial reward & success",
      hi: "आर्थिक लाभ और महान सफलता",
      te: "ఆర్థిక లాభం & గొప్ప విజయం",
    },
    twinFlame: {
      en: "Karmic balance & harmony",
      hi: "कर्म संतुलन और आत्मिक शांति",
      te: "కర్మ సమతుల్యత & ఆత్మ శాంతి",
    },
    spirituality: {
      en: "Universal flow of prosperity",
      hi: "समृद्धि का अनवरत ब्रह्मांडीय प्रवाह",
      te: "నిరంతర దైవిక సంపద ప్రవాహం",
    },
    quote: {
      en: "The universe is endlessly abundant and showering you with blessings.",
      hi: "ब्रह्मांड असीम रूप से समृद्ध है और आप पर अपनी कृपा बरसा रहा है।",
      te: "విశ్వం అనంతమైన సంపన్నమైనది మరియు మీపై దీవెనలు కురిపిస్తోంది.",
    },
    keywords: {
      en: "Abundance  •  Karma  •  Prosperity",
      hi: "समृद्धि  •  कर्म  •  वैभव",
      te: "సంపద  •  కర్మ  •  శ్రేయస్సు",
    },
  },
  "999": {
    coreMeaning: {
      en: "Sacred completion",
      hi: "पवित्र पूर्णता और पुनर्जन्म",
      te: "పవిత్ర పరిపూర్ణత & పునర్జన్మ",
    },
    love: {
      en: "Closure of old cycles & rebirth",
      hi: "पुराने चक्रों का अंत और नई शुरुआत",
      te: "పాత బంధాల ముగింపు & నూతన ఆరంభం",
    },
    career: {
      en: "Stepping into soul purpose",
      hi: "आत्मिक उद्देश्य और सेवा का मार्ग",
      te: "ఆత్మ లక్ష్యం & సేవా మార్గం",
    },
    twinFlame: {
      en: "Final phase of readiness",
      hi: "आत्मिक मिलन की पूर्ण तैयारी",
      te: "ఆధ్యాత్మిక కలయికకు సంసిద్ధత",
    },
    spirituality: {
      en: "Surrendering to divine culmination",
      hi: "ईश्वर की इच्छा के आगे समर्पण",
      te: "దైవ సంకల్పానికి సంపూర్ణ శరణాగతి",
    },
    quote: {
      en: "A significant chapter is closing so a glorious one can begin.",
      hi: "एक महत्वपूर्ण अध्याय समाप्त हो रहा है ताकि एक गौरवशाली नया अध्याय शुरू हो सके।",
      te: "ఒక గొప్ప అధ్యాయం ప్రారంభం కావడానికి ఒక పాత అధ్యాయం ముగుస్తోంది.",
    },
    keywords: {
      en: "Completion  •  Closure  •  Rebirth",
      hi: "पूर्णता  •  समापन  •  पुनर्जन्म",
      te: "పూర్తి  •  ముగింపు  •  పునర్జన్మ",
    },
  },
  "1111": {
    coreMeaning: {
      en: "Cosmic portal",
      hi: "ब्रह्मांडीय द्वार और आध्यात्मिक जागृति",
      te: "దైవిక ద్వారం & ఆధ్యాత్మిక జాగృతి",
    },
    love: {
      en: "Twin flame awakening & reunion",
      hi: "ट्विन फ्लेम जागृति और पवित्र मिलन",
      te: "ట్విన్ ఫ్లేమ్ జాగృతి & కలయిక",
    },
    career: {
      en: "Visionary leadership & purpose",
      hi: "दूरदर्शी नेतृत्व और बड़ा उद्देश्य",
      te: "దూరదృష్టి నాయకత్వం & ఉన్నత లక్ష్యం",
    },
    twinFlame: {
      en: "Sacred divine mirror",
      hi: "पवित्र आत्मिक दर्पण का साक्षात्कार",
      te: "పవిత్ర ఆత్మ ప్రతిబింబం",
    },
    spirituality: {
      en: "Direct gateway to higher realms",
      hi: "उच्च लोकों से सीधा आध्यात्मिक संपर्क",
      te: "ఉన్నత లోకాలతో ప్రత్యక్ష అనుసంధానం",
    },
    quote: {
      en: "Your spirit is awakening to its highest divine truth.",
      hi: "आपकी आत्मा अपने सर्वोच्च ईश्वरीय सत्य के प्रति जागृत हो रही है।",
      te: "మీ ఆత్మ తన అత్యున్నత దైవిక సత్యం వైపు మేల్కొంటోంది.",
    },
    keywords: {
      en: "Awakening  •  Portal  •  Intuition",
      hi: "जागरण  •  दिव्य द्वार  •  अंतर्ज्ञान",
      te: "జాగృతి  •  ద్వారం  •  అంతర్దృష్టి",
    },
  },
  "1212": {
    coreMeaning: {
      en: "Higher consciousness",
      hi: "उच्च चेतना और सकारात्मक कदम",
      te: "ఉన్నత చైతన్యం & ఆశావాదం",
    },
    love: {
      en: "Mutual respect & shared vision",
      hi: "परस्पर सम्मान और साझा दृष्टिकोण",
      te: "పరస్పర గౌరవం & ఉమ్మడి ఆశయం",
    },
    career: {
      en: "Courage to pursue passions",
      hi: "सपनों को साकार करने का साहस",
      te: "లక్ష్యాలను సాధించే ఆత్మవిశ్వాసం",
    },
    twinFlame: {
      en: "Synchronistic soul journey",
      hi: "अद्भुत आत्मिक तालमेल",
      te: "అద్భుతమైన ఆత్మ ప్రయాణం",
    },
    spirituality: {
      en: "Ascension into peace and clarity",
      hi: "शांति और स्पष्टता की ओर आरोहण",
      te: "శాంతి మరియు స్పష్టత వైపు ఎదుగుదల",
    },
    quote: {
      en: "Step fearlessly out of your comfort zone toward your dreams.",
      hi: "अपने सपनों की दिशा में निर्भय होकर आगे बढ़ें।",
      te: "మీ కలల దిశగా భయం లేకుండా ఆత్మవిశ్వాసంతో ముందడుగు వేయండి.",
    },
    keywords: {
      en: "Ascension  •  Courage  •  Clarity",
      hi: "आरोहण  •  साहस  •  स्पष्टता",
      te: "ఎదుగుదల  •  ధైర్యం  •  స్పష్టత",
    },
  },
  "500": {
    coreMeaning: {
      en: "Freedom & expansion",
      hi: "स्वतंत्रता और जीवन विस्तार",
      te: "స్వేచ్ఛ & జీవన విస్తరణ",
    },
    love: {
      en: "Authentic self-expression",
      hi: "प्रेम में सच्ची अभिव्यक्ति",
      te: "ప్రేమలో నిష్కల్మష భావవ్యక్తీకరణ",
    },
    career: {
      en: "New horizons & liberation",
      hi: "नए अवसर और कार्य मुक्ति",
      te: "నూతన అవకాశాలు & విముక్తి",
    },
    twinFlame: {
      en: "Spontaneous connection",
      hi: "सहज और गहरा आत्मिक संबंध",
      te: "సహజమైన మరియు గాఢమైన అనుబంధం",
    },
    spirituality: {
      en: "Walking in total faith",
      hi: "ईश्वर पर अटूट आस्था के साथ चलना",
      te: "దైవంపై పరిపూర్ణ విశ్వాసంతో నడవడం",
    },
    quote: {
      en: "Release all limitations; new adventures await your spirit.",
      hi: "सभी सीमाओं को छोड़ दें; नए दिव्य अनुभव आपकी प्रतीक्षा कर रहे हैं।",
      te: "అన్ని అడ్డంకులను వీడండి; నూతన ఆధ్యాత్మిక అనుభవాలు మీ కోసం వేచి ఉన్నాయి.",
    },
    keywords: {
      en: "Freedom  •  Expansion  •  New Paths",
      hi: "मुक्ति  •  विस्तार  •  नया मार्ग",
      te: "స్వేచ్ఛ  •  విస్తరణ  •  కొత్త దారి",
    },
  },
  "499": {
    coreMeaning: {
      en: "Soul mission",
      hi: "जीवन का उद्देश्य और सेवा",
      te: "జీవిత లక్ష్యం & దైవిక సేవ",
    },
    love: {
      en: "Patience & sacred service",
      hi: "धैर्य और निस्वार्थ प्रेम",
      te: "ఓర్పు & నిస్వార్థ ప్రేమ",
    },
    career: {
      en: "Fulfilling your dharma",
      hi: "अपने धर्म और कर्तव्य का पालन",
      te: "మీ ధర్మం మరియు కర్తవ్య నిర్వహణ",
    },
    twinFlame: {
      en: "Mutual spiritual growth",
      hi: "पारस्परिक आध्यात्मिक उन्नति",
      te: "పరస్పర ఆధ్యాత్మిక వికాసం",
    },
    spirituality: {
      en: "Devotion to your true path",
      hi: "सत्य मार्ग के प्रति पूर्ण समर्पण",
      te: "సత్య మార్గం పట్ల అంకితభావం",
    },
    quote: {
      en: "Trust divine timing and dedicate yourself to your purpose.",
      hi: "ईश्वरीय समय पर भरोसा रखें और अपने उद्देश्य को समर्पित रहें।",
      te: "దైవిక సమయంపై నమ్మకం ఉంచండి మరియు మీ ఉన్నత లక్ష్యానికి అంకితమవ్వండి.",
    },
    keywords: {
      en: "Purpose  •  Dharma  •  Divine Timing",
      hi: "उद्देश्य  •  धर्म  •  ईश्वरीय समय",
      te: "లక్ష్యం  •  ధర్మం  •  దైవిక సమయం",
    },
  },
  "498": {
    coreMeaning: {
      en: "Divine support",
      hi: "ईश्वरीय संबल और कृपा",
      te: "దైవిక మద్దతు & అనుగ్రహం",
    },
    love: {
      en: "Emotional grounding & care",
      hi: "भावनात्मक स्थिरता और अपनत्व",
      te: "భావోద్వేగ స్థిరత్వం & ఆప్యాయత",
    },
    career: {
      en: "Abundant rewards for service",
      hi: "कठिन परिश्रम का उचित फल",
      te: "కృషికి తగిన ఉత్తమ ప్రతిఫలం",
    },
    twinFlame: {
      en: "Balanced life partnership",
      hi: "संतुलित और समर्पित साझेदारी",
      te: "సమతుల్య మరియు అంకితభావ భాగస్వామ్యం",
    },
    spirituality: {
      en: "Unconditional universal support",
      hi: "ब्रह्मांड की असीम सुरक्षा और कृपा",
      te: "విశ్వం యొక్క నిరంతర తోడు",
    },
    quote: {
      en: "You are held and sustained by divine grace through every step.",
      hi: "ईश्वर की कृपा हर कदम पर आपका मार्गदर्शन और संरक्षण कर रही है।",
      te: "ప్రతి అడుగులోనూ దైవిక కృప మిమ్మల్ని నడిపిస్తూ రక్షిస్తోంది.",
    },
    keywords: {
      en: "Support  •  Stability  •  Abundance",
      hi: "सहयोग  •  स्थिरता  •  समृद्धि",
      te: "సహకారం  •  స్థిరత్వం  •  సంపద",
    },
  },
  "497": {
    coreMeaning: {
      en: "Inner wisdom",
      hi: "आत्म-ज्ञान और अंतर्दृष्टि",
      te: "అంతర్జ్ఞానం & అంతర్దృష్టి",
    },
    love: {
      en: "Spiritual companionship",
      hi: "आध्यात्मिक सानिध्य और गहरा प्रेम",
      te: "ఆధ్యాత్మిక సహవాసం & గాఢమైన ప్రేమ",
    },
    career: {
      en: "Research, insight & advisory",
      hi: "शोध, ज्ञान और उचित निर्णय",
      te: "పరిశోధన, జ్ఞానం & సరైన నిర్ణయం",
    },
    twinFlame: {
      en: "Telepathic understanding",
      hi: "हृदय से हृदय का आत्मिक जुड़ाव",
      te: "హృదయాల మధ్య పవిత్ర అనుసంధానం",
    },
    spirituality: {
      en: "Deep contemplative reflection",
      hi: "गहरा ध्यान और आत्म-चिंतन",
      te: "గాఢమైన ధ్యానం & ఆత్మపరిశీలన",
    },
    quote: {
      en: "Quiet your mind; the answers already reside within your soul.",
      hi: "अपने मन को शांत करें; सभी उत्तर पहले से ही आपकी आत्मा में हैं।",
      te: "మనస్సును ప్రశాంతంగా ఉంచండి; అన్ని సమాధానాలు మీ ఆత్మలోనే ఉన్నాయి.",
    },
    keywords: {
      en: "Wisdom  •  Contemplation  •  Intuition",
      hi: "ज्ञान  •  चिंतन  •  अंतर्ज्ञान",
      te: "జ్ఞానం  •  ధ్యానం  •  అంతర్దృష్టి",
    },
  },
};

function getGlanceData(num: string, page: AngelNumberPage, locale: Locale) {
  const item = GLANCE_DATA[num];
  if (item) {
    return {
      coreMeaning: item.coreMeaning[locale] || item.coreMeaning.en,
      love: item.love[locale] || item.love.en,
      career: item.career[locale] || item.career.en,
      twinFlame: item.twinFlame[locale] || item.twinFlame.en,
      spirituality: item.spirituality[locale] || item.spirituality.en,
      quote: item.quote[locale] || item.quote.en,
      keywords: item.keywords[locale] || item.keywords.en,
    };
  }

  // Smart localized fallback
  return {
    coreMeaning:
      locale === "hi"
        ? page.category || "दिव्य संरेखण व संतुलन"
        : locale === "te"
        ? "దైవిక అనుసంధానం & సమతుల్యత"
        : page.category || "Divine alignment",
    love:
      locale === "hi"
        ? "प्रेम में सामंजस्य और विश्वास"
        : locale === "te"
        ? "ప్రేమలో సామరస్యం & నమ్మకం"
        : "Growth & soul harmony",
    career:
      locale === "hi"
        ? "कार्य में उन्नति और स्पष्टता"
        : locale === "te"
        ? "కెరీర్‌లో పురోగతి & స్పష్టత"
        : "Expansion & clarity",
    twinFlame:
      locale === "hi"
        ? "आत्मिक मिलन और सहयोग"
        : locale === "te"
        ? "ఆత్మ కలయిక & సహకారం"
        : "Union & support",
    spirituality:
      locale === "hi"
        ? "ईश्वरीय मार्गदर्शन और कृपा"
        : locale === "te"
        ? "దివ్య మార్గదర్శకత్వం"
        : "Guidance from Ascended Masters",
    quote:
      locale === "hi"
        ? "आप ठीक वहीं हैं जहां इस समय आपको होना चाहिए।"
        : locale === "te"
        ? "మీరు సరిగ్గా ఉండవలసిన పవిత్ర మార్గంలోనే ఉన్నారు."
        : page.excerpt || "You are exactly where you need to be.",
    keywords:
      locale === "hi"
        ? "सकारात्मकता  •  सुरक्षा  •  समृद्धि"
        : locale === "te"
        ? "రక్షణ  •  స్థిరత్వం  •  సమృద్ధి"
        : "Creativity  •  Protection  •  Support",
  };
}

export function AngelNumberDetailView({ page, related }: AngelNumberDetailViewProps) {
  const locale = useLocale();
  const displayNumber = page.number || page.slug.match(/(\d+)/)?.[1] || "111";
  const glance = getGlanceData(displayNumber, page, locale);

  // Breadcrumbs localized: Home > Library > Angel Numbers > Angel Number [Number] Meaning
  const homeLabel = locale === "te" ? "హోమ్" : locale === "hi" ? "होम" : "Home";
  const libraryLabel = locale === "te" ? "లైబ్రరీ" : locale === "hi" ? "लाइब्रेरी" : "Library";
  const angelLabel = locale === "te" ? "దేవదూత సంఖ్యలు" : locale === "hi" ? "एंजेल नंबर्स" : "Angel Numbers";
  
  const shortBreadcrumbTitle = useMemo(() => {
    if (locale === "hi") {
      return page.titleHi ? page.titleHi.split(/[:|]/)[0].trim() : `एंजेल नंबर ${displayNumber} का अर्थ`;
    }
    if (locale === "te") {
      return (page as any).titleTe ? (page as any).titleTe.split(/[:|]/)[0].trim() : `ఏంజెల్ సంఖ్య ${displayNumber} అర్థం`;
    }
    return `Angel Number ${displayNumber} Meaning`;
  }, [locale, page, displayNumber]);

  const breadcrumbs = [
    { name: homeLabel, href: "/" },
    { name: libraryLabel, href: "/library" },
    { name: angelLabel, href: "/library/angel-numbers" },
    { name: shortBreadcrumbTitle, href: `/library/angel-numbers/${page.slug}` },
  ];

  // Section navigation tabs localized
  const [activeTab, setActiveTab] = useState<string>("overview");

  const NAV_TABS = [
    { id: "overview", label: locale === "hi" ? "अवलोकन" : locale === "te" ? "అవలోకనం" : "Overview", icon: Sparkles },
    { id: "meaning", label: locale === "hi" ? "अर्थ व महत्व" : locale === "te" ? "అర్థం & ప్రాముఖ్యత" : "Meaning", icon: Feather },
    { id: "love", label: locale === "hi" ? "प्रेम और संबंध" : locale === "te" ? "ప్రేమ & బంధాలు" : "Love & Relationships", icon: Heart },
    { id: "career", label: locale === "hi" ? "करियर और धन" : locale === "te" ? "కెరీర్ & సంపద" : "Career & Money", icon: Briefcase },
    { id: "spiritual", label: locale === "hi" ? "आध्यात्मिक विकास" : locale === "te" ? "ఆధ్యాత్మిక వృద్ధి" : "Spiritual Growth", icon: Flower2 },
    { id: "what-to-do", label: locale === "hi" ? "क्या करें" : locale === "te" ? "ఏమి చేయాలి" : "What to Do", icon: Lightbulb },
    { id: "faqs", label: locale === "hi" ? "अक्सर पूछे जाने वाले प्रश्न" : locale === "te" ? "ప్రశ్నోత్తరాలు" : "FAQs", icon: HelpCircle },
  ];

  // Track page view event in GA4
  useEffect(() => {
    trackEvent("view_item", {
      content_type: "angel_number",
      item_id: displayNumber,
      item_name: page.title,
    });
  }, [displayNumber, page.title]);

  // Interaction states
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      trackEvent("share", {
        method: "copy_link",
        content_type: "angel_number",
        item_id: displayNumber,
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Theme-based horizontal scroll state
  const [selectedTheme, setSelectedTheme] = useState<string>("all");
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 280;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Accordion state for FAQs
  const [expandedFaqs, setExpandedFaqs] = useState<Record<number, boolean>>({
    0: true, // First item expanded by default
  });

  const faqs = page.faqs && page.faqs.length > 0 ? page.faqs : [
    {
      question:
        locale === "hi"
          ? `मुझे घड़ी पर बार-बार ${displayNumber} क्यों दिखाई देता है?`
          : locale === "te"
          ? `గడియారంలో నాకు పదే పదే ${displayNumber} ఎందుకు కనిపిస్తుంది?`
          : `Why do I keep seeing ${displayNumber} on the clock?`,
      answer:
        locale === "hi"
          ? `घड़ियों, रसीदों या अन्य स्थानों पर बार-बार ${displayNumber} देखना एक पवित्र संकेत है कि आपके देवदूत और ब्रह्मांड आपको दिव्य मार्गदर्शन और सकारात्मक आशीर्वाद भेज रहे हैं।`
          : locale === "te"
          ? `గడియారాలు లేదా రసీదులలో పదే పదే ${displayNumber} కనిపించడం అనేది మీ సంరక్షక దేవదూతలు మీకు దివ్య మార్గదర్శకత్వాన్ని మరియు ఆశీస్సులను పంపుతున్నారని తెలిపే పవిత్ర సంకేతం.`
          : `Seeing ${displayNumber} repeatedly on clocks, receipts, or timestamps is a sacred synchronicity confirming that your guardian angels and the universe are sending divine guidance.`,
    },
    {
      question:
        locale === "hi"
          ? `प्रेम और संबंधों में ${displayNumber} का क्या अर्थ है?`
          : locale === "te"
          ? `ప్రేమ మరియు బంధాలలో ${displayNumber} ప్రాముఖ్యత ఏమిటి?`
          : `What does ${displayNumber} mean in love and relationships?`,
      answer:
        locale === "hi"
          ? `प्रेम में, ${displayNumber} आत्मिक विकास, सामंजस्य और विश्वास का प्रतीक है। यह खुले दिल से संवाद करने और ईश्वरीय समय पर भरोसा करने का संदेश देता है।`
          : locale === "te"
          ? `ప్రేమలో ${displayNumber} ఆధ్యాత్మిక ఎదుగుదల, సామరస్యం మరియు నమ్మకాన్ని సూచిస్తుంది. ఇది మనస్ఫూర్తిగా కమ్యూనికేట్ చేయాలని సూచిస్తుంది.`
          : `In love, ${displayNumber} signifies growth, harmony, and mutual spiritual evolution. It encourages vulnerability, authentic communication, and trusting divine timing.`,
    },
    {
      question:
        locale === "hi"
          ? `क्या ${displayNumber} एक बड़ा जीवन परिवर्तन करने का संकेत है?`
          : locale === "te"
          ? `${displayNumber} పెద్ద జీవిత మార్పును సూచించే సంకేతమా?`
          : `Is ${displayNumber} a sign of Ascended Masters?`,
      answer:
        locale === "hi"
          ? `हाँ, ${displayNumber} को सिद्ध गुरुओं और ब्रह्मांड का एक स्पष्ट संकेत माना जाता है जो आपको बिना किसी डर के अपने आत्मा के सच्चे मार्ग पर चलने का भरोसा दिलाता है।`
          : locale === "te"
          ? `అవును, ${displayNumber} అనేది మీ జీవితంలో సానుకూల మార్పులను ధైర్యంగా స్వీకరించాలని తెలిపే విశ్వ సంకేతం.`
          : `Yes, ${displayNumber} is widely recognized as the signature frequency of Ascended Masters, assuring you that you are protected, supported, and surrounded by enlightened guides.`,
    },
  ];

  const allFaqsExpanded = useMemo(() => {
    return faqs.length > 0 && faqs.every((_, i) => expandedFaqs[i]);
  }, [faqs, expandedFaqs]);

  const toggleAllFaqs = () => {
    if (allFaqsExpanded) {
      setExpandedFaqs({});
    } else {
      const next: Record<number, boolean> = {};
      faqs.forEach((_, i) => {
        next[i] = true;
      });
      setExpandedFaqs(next);
    }
  };

  const toggleFaq = (idx: number) => {
    setExpandedFaqs((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // Tags
  const tags = page.tags && page.tags.length > 0 ? page.tags : [
    locale === "hi" ? "एंजेल नंबर" : locale === "te" ? "ఏంజెల్ సంఖ్య" : "Angel Numbers",
    displayNumber,
    locale === "hi" ? "प्रकटीकरण" : locale === "te" ? "ప్రకటీకరణ" : "Manifestation",
    locale === "hi" ? "नई शुरुआत" : locale === "te" ? "నూతన ఆరంభం" : "New Beginnings",
    locale === "hi" ? "अध्यात्म" : locale === "te" ? "ఆధ్యాత్మికత" : "Spiritual Growth",
  ];

  // Themed items for horizontal scroll from DB
  const themedItems = useMemo(() => {
    const baseList = related || [];
    if (selectedTheme === "all") return baseList;

    const currentTheme = THEMES.find((t) => t.id === selectedTheme);
    if (!currentTheme?.match) return baseList;

    const matchSet = new Set(currentTheme.match);
    const matched = baseList.filter((item) => {
      const num = item.number || item.slug.replace(/[^0-9]/g, "");
      return (
        matchSet.has(num) ||
        (item.category && item.category.toLowerCase().includes(selectedTheme))
      );
    });

    return matched.length > 0 ? matched : baseList;
  }, [related, selectedTheme]);

  return (
    <article className="min-h-screen bg-[#faf8f5] text-[#1c1917] pt-4 pb-16">
      {/* Top Breadcrumb Bar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-4">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      {/* Main Container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">

        {/* ============================================================== */}
        {/* TOP ROW: Left Hero Content + Right Golden Poster + Sidebar      */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Main Hero Column (8 Cols on Desktop) */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              {/* Left Column: Badges, H1 Title, Excerpt, Tags */}
              <div className="md:col-span-7 flex flex-col justify-center">
                {/* Meta Badge & Info Row */}
                <div className="flex flex-wrap items-center gap-2.5 text-xs text-stone-500 mb-3">
                  <span className="inline-flex items-center rounded-full bg-[#feece4] border border-[#fbd4c8] px-2.5 py-0.5 text-[10.5px] font-bold tracking-wider text-[#c2410c] uppercase">
                    {locale === "hi" ? "एंजेल नंबर" : locale === "te" ? "దేవదూత సంఖ్య" : "ANGEL NUMBER"}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-stone-400" />
                    <span>{page.publishedAt || "2026-09-21"}</span>
                  </span>
                  <span className="text-stone-300">•</span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    <span>{page.readingTime || (locale === "hi" ? "5 मिनट" : locale === "te" ? "5 నిమిషాలు" : "5 min read")}</span>
                  </span>
                  <span className="text-stone-300">•</span>
                  <span className="font-medium text-stone-700">
                    {page.author || (locale === "hi" ? "भक्ति वॉइस आध्यात्मिक डेस्क" : locale === "te" ? "భక్తి వాయిస్ ఆధ్యాత్మిక డెస్క్" : "Bhakti Voice Spiritual Desk")}
                  </span>
                </div>

                {/* Main H1 Title */}
                <h1 className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-bold tracking-tight text-[#1c1917] leading-[1.25]">
                  {page.h1 || page.title}
                </h1>

                {/* Subtitle / Excerpt */}
                <p className="mt-3 text-xs sm:text-[13.5px] text-stone-600 leading-relaxed max-w-xl">
                  {page.metaDescription ||
                    page.introduction ||
                    (locale === "hi"
                      ? `${displayNumber} देखना तीव्र प्रकटीकरण का एक शक्तिशाली संकेत है। जानें कि ${displayNumber} एंजेल नंबर का आपके प्रेम जीवन, करियर और आत्मिक यात्रा पर क्या प्रभाव पड़ता है।`
                      : locale === "te"
                      ? `${displayNumber} కనిపించడం అనేది ఒక బలమైన ఆధ్యాత్మిక సంకేతం. మీ జీవితం, ప్రేమ మరియు లక్ష్యాలపై ${displayNumber} ఏంజెల్ సంఖ్య చూపే పవిత్ర ప్రభావాన్ని తెలుసుకోండి.`
                      : `What does ${displayNumber} mean? Explore the spiritual significance of angel number ${displayNumber}. Discover how seeing ${displayNumber} everywhere influences your love life, career, and twin flame journey.`)}
                </p>

                {/* Tags Row */}
                <div className="mt-4 flex flex-wrap items-center gap-1.5">
                  {tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center rounded-full bg-[#fdfaf6] border border-[#ebdccb] px-3 py-1 text-[11px] font-medium text-[#78350f] hover:bg-amber-100/60 transition-colors select-none"
                    >
                      #{tag.replace(/^#/, "")}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: Celestial Artwork Poster */}
              <div className="md:col-span-5 flex items-center justify-center">
                <CelestialPoster
                  number={displayNumber}
                  keywords={glance.keywords}
                  quote={glance.quote}
                />
              </div>

            </div>
          </div>

          {/* ============================================================== */}
          {/* RIGHT 4 COLUMNS: Sticky Sidebar with Complete Translations      */}
          {/* ============================================================== */}
          <aside className="lg:col-span-4 space-y-6 lg:row-span-2">

            {/* SIDEBAR CARD 1: [Number] at a Glance */}
            <div className="rounded-2xl bg-white border border-[#ebdccb] p-5 shadow-2xs">
              {/* Header with Winged Halo and Localized Title */}
              <div className="flex items-center gap-3 mb-5">
                <WingedHaloEmblem className="w-14 h-9 shrink-0 text-amber-500" />
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1c1917] tracking-tight">
                  {locale === "hi"
                    ? `${displayNumber} एक नज़र में`
                    : locale === "te"
                    ? `${displayNumber} ఒక్క చూపులో`
                    : `${displayNumber} at a Glance`}
                </h3>
              </div>

              {/* Key-Value Attributes List Localized */}
              <div className="space-y-3.5 text-xs sm:text-[13px]">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 font-medium text-[#c25424]">
                    <Star className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>{locale === "hi" ? "मुख्य अर्थ" : locale === "te" ? "ప్రధాన అర్థం" : "Core Meaning"}</span>
                  </div>
                  <span className="text-stone-600 text-right text-xs sm:text-[13px]">{glance.coreMeaning}</span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 font-medium text-[#c25424]">
                    <Heart className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>{locale === "hi" ? "प्रेम संबंध" : locale === "te" ? "ప్రేమ జీవితం" : "Love"}</span>
                  </div>
                  <span className="text-stone-600 text-right text-xs sm:text-[13px]">{glance.love}</span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 font-medium text-[#c25424]">
                    <Briefcase className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>{locale === "hi" ? "करियर व कार्य" : locale === "te" ? "కెరీర్ & వృత్తి" : "Career"}</span>
                  </div>
                  <span className="text-stone-600 text-right text-xs sm:text-[13px]">{glance.career}</span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 font-medium text-[#c25424]">
                    <Users className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>{locale === "hi" ? "ट्विन फ्लेम" : locale === "te" ? "ట్విన్ ఫ్లేమ్" : "Twin Flame"}</span>
                  </div>
                  <span className="text-stone-600 text-right text-xs sm:text-[13px]">{glance.twinFlame}</span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 font-medium text-[#c25424]">
                    <Flower2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>{locale === "hi" ? "आध्यात्मिकता" : locale === "te" ? "ఆధ్యాత్మికత" : "Spirituality"}</span>
                  </div>
                  <span className="text-stone-600 text-right text-xs sm:text-[13px]">{glance.spirituality}</span>
                </div>
              </div>

              {/* Quote Callout Box Localized */}
              <div className="mt-5 pt-1">
                <div className="rounded-xl bg-[#fcf6ed] border border-[#f5ebd7] p-3.5 flex items-start gap-2.5">
                  <span className="font-serif text-2xl font-bold text-[#d35400] leading-none select-none shrink-0">❝</span>
                  <p className="font-serif italic text-xs sm:text-[12.5px] leading-snug pt-0.5 text-[#2c1810]">
                    &ldquo;{glance.quote}&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* SIDEBAR CARD 2: Divine Message for You (Nama Jaap CTA Localized) */}
            <div className="rounded-2xl bg-white border border-[#ebdccb] p-4.5 shadow-2xs">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#fdf0e4] border border-[#fadcc5] flex items-center justify-center font-serif text-lg font-bold text-[#b45309] shrink-0">
                  ॐ
                </div>
                <div>
                  <h3 className="font-serif text-sm font-bold text-[#1c1917]">
                    {locale === "hi"
                      ? "आपके लिए ईश्वरीय संदेश"
                      : locale === "te"
                      ? "మీ కోసం దైవిక సందేశం"
                      : "Divine Message for You"}
                  </h3>
                  <p className="mt-1 text-xs text-stone-600 leading-relaxed">
                    {locale === "hi"
                      ? "एक महान संकेत कि आपके जीवन में सकारात्मक और दिव्य परिवर्तन तेजी से घटित हो रहे हैं।"
                      : locale === "te"
                      ? "మీ జీవిత మార్గంలో శుభప్రదమైన మరియు సానుకూల మార్పులు వేగంగా జరుగుతున్నాయని తెలిపే పవిత్ర సంకేతం."
                      : "A monumental signal that major, positive transformations are unfolding rapidly across your life path."}
                  </p>
                </div>
              </div>
              <LocaleLink
                href="/naam-jaap"
                onClick={() =>
                  trackEvent("cta_click", {
                    cta_name: "begin_nama_jaap",
                    angel_number: displayNumber,
                  })
                }
                className="mt-3 w-full flex items-center justify-center gap-1.5 py-2 px-4 rounded-full bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white text-xs font-semibold hover:brightness-110 shadow-xs transition-all cursor-pointer"
              >
                <span>{locale === "hi" ? "नाम जप शुरू करें" : locale === "te" ? "నామ జపం ప్రారంభించండి" : "Begin Nama Jaap"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </LocaleLink>
            </div>

            {/* SIDEBAR CARD 3: Share This Knowledge Localized */}
            <div className="rounded-2xl bg-white border border-[#ebdccb] p-4.5 shadow-2xs">
              <h3 className="font-serif text-sm font-bold text-[#1c1917]">
                {locale === "hi"
                  ? "यह दिव्य ज्ञान साझा करें"
                  : locale === "te"
                  ? "ఈ పవిత్ర జ్ఞానాన్ని పంచుకోండి"
                  : "Share This Knowledge"}
              </h3>
              <p className="text-[11px] text-stone-500 mt-0.5 mb-3">
                {locale === "hi"
                  ? "दूसरों के साथ आध्यात्मिक ज्ञान और प्रकाश फैलाएं।"
                  : locale === "te"
                  ? "ఇతరులతో దైవిక జ్ఞానాన్ని పంచుకోండి."
                  : "Spread divine wisdom with others."}
              </p>
              
              {/* Circular Social Share Buttons */}
              <div className="flex items-center justify-between gap-1.5 mb-3">
                {/* WhatsApp */}
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(page.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent("share", {
                      method: "whatsapp",
                      content_type: "angel_number",
                      item_id: displayNumber,
                    })
                  }
                  className="w-9 h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                  title="Share on WhatsApp"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                </a>

                {/* Telegram */}
                <a
                  href={`https://t.me/share/url?url=${encodeURIComponent(page.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent("share", {
                      method: "telegram",
                      content_type: "angel_number",
                      item_id: displayNumber,
                    })
                  }
                  className="w-9 h-9 rounded-full bg-[#0088cc] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                  title="Share on Telegram"
                >
                  <SendIcon className="w-4 h-4 fill-white" />
                </a>

                {/* Facebook */}
                <a
                  href={`https://www.facebook.com/sharer/sharer.php`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent("share", {
                      method: "facebook",
                      content_type: "angel_number",
                      item_id: displayNumber,
                    })
                  }
                  className="w-9 h-9 rounded-full bg-[#1877f2] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                  title="Share on Facebook"
                >
                  <FacebookIcon className="w-4 h-4 fill-white" />
                </a>

                {/* X / Twitter */}
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(page.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent("share", {
                      method: "twitter",
                      content_type: "angel_number",
                      item_id: displayNumber,
                    })
                  }
                  className="w-9 h-9 rounded-full bg-[#000000] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                  title="Share on X"
                >
                  <XIcon className="w-3.5 h-3.5 fill-white" />
                </a>

                {/* General Link / Copy */}
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="w-9 h-9 rounded-full bg-stone-100 text-stone-700 flex items-center justify-center hover:bg-stone-200 transition-colors cursor-pointer"
                  title="Copy Link"
                >
                  <LinkIcon className="w-4 h-4" />
                </button>
              </div>

              {/* Full Width Copy Link Button */}
              <button
                type="button"
                onClick={handleCopyLink}
                className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-full border border-[#ebdccb] bg-white hover:bg-stone-50 text-stone-700 text-xs font-medium transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-semibold">
                      {locale === "hi" ? "लिंक कॉपी हो गया!" : locale === "te" ? "లింక్ కాపీ అయింది!" : "Link Copied!"}
                    </span>
                  </>
                ) : (
                  <>
                    <LinkIcon className="w-3.5 h-3.5 text-stone-400" />
                    <span>
                      {locale === "hi" ? "लिंक कॉपी करें" : locale === "te" ? "లింక్ కాపీ చేయండి" : "Copy Link"}
                    </span>
                  </>
                )}
              </button>
            </div>

            {/* SIDEBAR CARD 4: Related Tools Localized */}
            <div className="rounded-2xl bg-white border border-[#ebdccb] p-4.5 shadow-2xs">
              <h3 className="font-serif text-sm font-bold text-[#1c1917] mb-2.5">
                {locale === "hi"
                  ? "संबंधित आध्यात्मिक साधन"
                  : locale === "te"
                  ? "సంబంధిత సాధనాలు"
                  : "Related Tools"}
              </h3>
              <div className="space-y-1.5">
                {[
                  {
                    title: locale === "hi" ? "नाम जप काउंटर" : locale === "te" ? "నామ జప కౌంటర్" : "Name Jaap Counter",
                    desc: locale === "hi" ? "मन को ईश्वर से जोड़ें" : locale === "te" ? "మనస్సును దైవంతో అనుసంధానించండి" : "Keep your mind connected",
                    href: "/naam-jaap",
                    icon: Sparkles,
                    color: "text-amber-700 bg-amber-50",
                  },
                  {
                    title: locale === "hi" ? "दैनिक पंचांग" : locale === "te" ? "దిన పంచాంగం" : "Daily Panchang",
                    desc: locale === "hi" ? "आज की तिथि व शुभ मुहूर्त देखें" : locale === "te" ? "నేటి తిథి మరియు శుభ ముహూర్తం" : "Check today's tithi & muhurat",
                    href: "/panchang",
                    icon: Calendar,
                    color: "text-orange-700 bg-orange-50",
                  },
                  {
                    title: locale === "hi" ? "राशिफल व कुंडली" : locale === "te" ? "రాశిఫలాలు & జాతకం" : "Zodiac & Kundli",
                    desc: locale === "hi" ? "अपना ज्योतिषीय चक्र जानें" : locale === "te" ? "మీ జ్యోతిష్య చక్రం తెలుసుకోండి" : "Discover your cosmic blueprint",
                    href: "/panchang",
                    icon: Flower2,
                    color: "text-rose-700 bg-rose-50",
                  },
                  {
                    title: locale === "hi" ? "व्रत एवं त्योहार कैलेंडर" : locale === "te" ? "పండుగల క్యాలెండర్" : "Festival Calendar",
                    desc: locale === "hi" ? "कोई भी पवित्र पर्व न चूकें" : locale === "te" ? "పవిత్రమైన పర్వదినాలను తెలుసుకోండి" : "Never miss a sacred day",
                    href: "/festivals",
                    icon: Clock,
                    color: "text-emerald-700 bg-emerald-50",
                  },
                ].map((tool, idx) => {
                  const ToolIcon = tool.icon;
                  return (
                    <LocaleLink
                      key={idx}
                      href={tool.href}
                      className="group flex items-center justify-between p-2 rounded-xl hover:bg-[#faf5ee] border border-transparent hover:border-[#ebdccb] transition-all"
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${tool.color}`}
                        >
                          <ToolIcon className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-[#1c1917] group-hover:text-amber-900 transition-colors">
                            {tool.title}
                          </div>
                          <div className="text-[10px] text-stone-500">{tool.desc}</div>
                        </div>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-stone-700 group-hover:translate-x-0.5 transition-all" />
                    </LocaleLink>
                  );
                })}
              </div>
            </div>

          </aside>

          {/* ============================================================== */}
          {/* MAIN COLUMN BODY: Horizontal Nav Tabs + Content Sections      */}
          {/* ============================================================== */}
          <div className="lg:col-span-8 space-y-6">

            {/* SECTION NAVIGATION TABS (Horizontal Pill Bar Below Tags - Localized) */}
            <div className="sticky top-16 z-20 -mx-4 px-4 sm:mx-0 sm:px-0 py-2 bg-[#faf8f5]/95 backdrop-blur-md border-y border-[#e8dfd2]">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
                {NAV_TABS.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => {
                        scrollToSection(tab.id);
                        trackEvent("select_content", {
                          content_type: "angel_number_tab",
                          item_id: tab.id,
                          angel_number: displayNumber,
                        });
                      }}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                        isActive
                          ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-xs font-semibold"
                          : "bg-white text-stone-700 border border-[#e8dfd2] hover:border-amber-400 hover:text-amber-800 hover:bg-[#fff9f2]"
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-amber-600/80"}`} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CARD 1: Overview */}
            <section
              id="overview"
              className="relative overflow-hidden rounded-2xl bg-white border border-[#ebdccb] p-6 sm:p-7 shadow-2xs"
            >
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1c1917] mb-3">
                {locale === "hi" ? "अवलोकन" : locale === "te" ? "అవలోకనం" : "Overview"}
              </h2>
              
              <div className="text-xs sm:text-sm text-stone-700 leading-relaxed space-y-3 relative z-10">
                <p>
                  {page.introduction ||
                    (locale === "hi"
                      ? `एंजेल नंबर ${displayNumber} को देखना ब्रह्मांड से एक सीधा संकेत है कि आपके लिए एक ऊर्जावान पोर्टल अभी खुला है। आपके विचार, इरादे और विश्वास तेजी से वास्तविकता में प्रकट हो रहे हैं, जो इसे इस बात पर सख्ती से ध्यान केंद्रित करने का एक महत्वपूर्ण समय बनाता है कि आप वास्तव में क्या चाहते हैं।`
                      : locale === "te"
                      ? `ఏంజెల్ సంఖ్య ${displayNumber} కనిపించడం అనేది మీ ఆధ్యాత్మిక ప్రయాణంలో ఒక అద్భుతమైన సంకేతం. మీ ఆలోచనలు మరియు ప్రార్థనలు దైవిక శక్తులతో సంపూర్ణ సమన్వయంలో ఉన్నాయి.`
                      : `Angel number ${displayNumber} is a powerful message from the universe and the Ascended Masters. It is a sign that you are not alone, and divine guidance is surrounding you. This number carries the energies of creativity, growth, protection, and support. When you repeatedly see ${displayNumber}, it's a reminder to trust your path and embrace the opportunities coming your way.`)}
                </p>
                {page.excerpt && page.excerpt !== page.introduction && (
                  <p>{page.excerpt}</p>
                )}
              </div>

              {/* Callout Quote Box with Lotus Icon Localized */}
              <div className="mt-5 rounded-r-xl bg-[#fffbf2] border-l-4 border-amber-500 p-4 sm:p-5 flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-amber-100/80 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Flower2 className="w-4 h-4 text-amber-600" />
                </div>
                <p className="font-serif italic text-xs sm:text-[13.5px] text-stone-700 leading-relaxed">
                  &ldquo;{locale === "hi"
                    ? `${displayNumber} देखना ब्रह्मांड का एक सौम्य स्मरण है कि आप पूरी तरह से समर्थित, निर्देशित और अपने उच्च उद्देश्य के साथ संरेखित हैं।`
                    : locale === "te"
                    ? `${displayNumber} కనిపించడం అనేది మీరు దైవిక మార్గదర్శకత్వంలో ఉన్నారని మరియు మీ ఉన్నత లక్ష్యానికి అనుగుణంగా నడుస్తున్నారని విశ్వం ఇచ్చే పవిత్ర సందేశం.`
                    : `Seeing ${displayNumber} is a gentle reminder from the universe that you are supported, guided, and aligned with your higher purpose.`}&rdquo;
                </p>
              </div>
            </section>

            {/* CARD 2: Meaning */}
            <section
              id="meaning"
              className="relative overflow-hidden rounded-2xl bg-white border border-[#ebdccb] p-6 sm:p-7 shadow-2xs"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-[#e8f3fb] border border-[#cbe3f7] flex items-center justify-center text-[#0369a1] shrink-0 font-serif font-bold text-base">
                  △
                </div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1c1917]">
                  {page.body?.[0]?.heading ||
                    (locale === "hi"
                      ? `प्रकटीकरण (Manifestation) और ${displayNumber} का महत्व`
                      : locale === "te"
                      ? `${displayNumber} యొక్క ఆధ్యాత్మిక ప్రాముఖ్యత`
                      : `The Spiritual Meaning of ${displayNumber}`)}
                </h2>
              </div>
              <div className="text-xs sm:text-sm text-stone-700 leading-relaxed space-y-3 relative z-10">
                {page.body?.[0]?.paragraphs ? (
                  page.body[0].paragraphs.map((p, idx) => <p key={idx}>{p}</p>)
                ) : (
                  <>
                    <p>
                      {locale === "hi"
                        ? `जब ${displayNumber} आपके दैनिक जीवन में बार-बार प्रकट होता है, तो यह आपकी सकारात्मक ऊर्जा और ईश्वरीय विधान के बीच एक मजबूत तालमेल को दर्शाता है। आपकी प्रार्थनाएं सुन ली गई हैं, और ब्रह्मांडीय शक्तियां आपकी सहायता के लिए परिस्थितियां तैयार कर रही हैं।`
                        : locale === "te"
                        ? `${displayNumber} పదే పదే కనిపించినప్పుడు, మీ ప్రార్థనలు వినబడ్డాయని మరియు దైవిక శక్తులు మీకు సహాయం చేయడానికి సిద్ధంగా ఉన్నాయని సూచిస్తుంది.`
                        : `When ${displayNumber} appears repeatedly in your daily experience, it signals a strong alignment between your mental intentions and cosmic law. Your prayers have been heard, and universal forces are actively organizing circumstances to assist you.`}
                    </p>
                    <p>
                      {locale === "hi"
                        ? `सकारात्मक सोच बनाए रखें और संशयों को त्याग दें। आपके द्वारा उठाया गया हर सही कदम आपके जीवन में सकारात्मकता की नई लहर पैदा करेगा।`
                        : locale === "te"
                        ? `సానుకూల దృక్పథాన్ని కలిగి ఉండండి మరియు భయాలను వీడండి. మీ ప్రతి సత్సంకల్పం శుభ ఫలితాలను ఇస్తుంది.`
                        : `Maintain focused optimism and let go of doubts. Every step you take in devotion and clarity creates a ripple of positive manifestations in your reality.`}
                    </p>
                  </>
                )}
              </div>
            </section>

            {/* CARD 3: Love & Relationships */}
            <section
              id="love"
              className="relative overflow-hidden rounded-2xl bg-white border border-[#ebdccb] p-6 sm:p-7 shadow-2xs"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-[#fdeef1] border border-[#fad2da] flex items-center justify-center text-[#be123c] shrink-0">
                  <Heart className="w-4 h-4 fill-[#be123c]" />
                </div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1c1917]">
                  {page.body?.[1]?.heading ||
                    (locale === "hi"
                      ? `प्रेम और ट्विन फ्लेम में ${displayNumber}`
                      : locale === "te"
                      ? `ప్రేమ మరియు బంధాలలో ${displayNumber}`
                      : `Love & Twin Flames in ${displayNumber}`)}
                </h2>
              </div>
              <div className="text-xs sm:text-sm text-stone-700 leading-relaxed space-y-3 relative z-10">
                {page.body?.[1]?.paragraphs ? (
                  page.body[1].paragraphs.map((p, idx) => <p key={idx}>{p}</p>)
                ) : (
                  <p>
                    {locale === "hi"
                      ? `अंकशास्त्र और रिश्तों में, ${displayNumber} आपसी सम्मान, सच्ची समझ और सामंजस्य पर बल देता है। यह पुराने गिले-शिकवों को भुलाकर खुले दिल से आगे बढ़ने का आह्वान करता है।`
                      : locale === "te"
                      ? `సంబంధాలలో ${displayNumber} పరస్పర గౌరవం, నిజమైన అవగాహన మరియు సామరస్యాన్ని నొక్కి చెబుతుంది.`
                      : `In twin flame numerology and relationships, ${displayNumber} emphasizes harmony, mutual respect, and honest communication. It calls for dissolving past resentments and allowing heart-centered understanding to heal all bonds.`}
                  </p>
                )}
              </div>
            </section>

            {/* CARD 4: FAQs Localized */}
            <section
              id="faqs"
              className="rounded-2xl bg-white border border-[#ebdccb] p-6 sm:p-7 shadow-2xs"
            >
              <div className="flex items-center justify-between mb-4 border-b border-[#f2e7db] pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#fdeee9] border border-[#facdc2] flex items-center justify-center text-[#c2410c] shrink-0 font-serif font-bold text-sm">
                    ?
                  </div>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1c1917]">
                    {locale === "hi"
                      ? "अक्सर पूछे जाने वाले प्रश्न"
                      : locale === "te"
                      ? "తరచుగా అడిగే ప్రశ్నలు"
                      : "Frequently Asked Questions"}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={toggleAllFaqs}
                  className="text-xs font-semibold text-[#d35400] hover:text-amber-600 hover:underline cursor-pointer"
                >
                  {allFaqsExpanded
                    ? locale === "hi"
                      ? "सभी समेटें −"
                      : locale === "te"
                      ? "అన్నీ కుదించండి −"
                      : "Collapse All −"
                    : locale === "hi"
                    ? "सभी खोलें +"
                    : locale === "te"
                    ? "అన్నీ విస్తరించండి +"
                    : "Expand All +"}
                </button>
              </div>

              <div className="space-y-2.5">
                {faqs.map((faq, idx) => {
                  const isExpanded = !!expandedFaqs[idx];
                  return (
                    <div
                      key={idx}
                      className="rounded-xl border border-[#ebdccb] bg-[#faf7f2] overflow-hidden transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(idx)}
                        className="w-full flex items-center justify-between gap-3 p-3.5 text-left text-xs sm:text-sm font-semibold text-[#1c1917] hover:text-[#d35400] cursor-pointer"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-stone-400 shrink-0 transition-transform duration-200 ${
                            isExpanded ? "rotate-180 text-amber-700" : ""
                          }`}
                        />
                      </button>
                      {isExpanded && (
                        <div className="px-3.5 pb-3.5 pt-0 text-xs sm:text-[13px] text-stone-600 leading-relaxed border-t border-[#f0e4d7]/70 mt-1">
                          <p className="pt-2">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

          </div>

        </div>

        {/* ================================================================ */}
        {/* BOTTOM SECTION: "Explore More Angel Numbers" Localized            */}
        {/* ================================================================ */}
        <section className="mt-12 pt-8 border-t border-[#ebdccb]">
          {/* Header Row with Navigation Arrows */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1c1917]">
                {locale === "hi"
                  ? "अन्य एंजेल नंबर्स देखें"
                  : locale === "te"
                  ? "మరిన్ని ఏంజెల్ సంఖ్యలను అన్వేషించండి"
                  : "Explore More Angel Numbers"}
              </h2>
              <p className="text-xs text-stone-600 mt-0.5">
                {locale === "hi"
                  ? "ब्रह्मांडीय ऊर्जा और विषय के अनुसार वर्गीकृत दिव्य संख्याओं का अन्वेषण करें।"
                  : locale === "te"
                  ? "దైవిక ప్రకంపనలు మరియు ప్రాముఖ్యత ఆధారంగా వర్గీకరించబడిన పవిత్ర సంఖ్యలు."
                  : "Browse divine number sequences categorized by cosmic vibration and theme."}
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-auto">
              <LocaleLink
                href="/library/angel-numbers"
                className="text-xs font-semibold text-[#d35400] hover:text-amber-600 hover:underline inline-flex items-center gap-1 mr-1"
              >
                <span>{locale === "hi" ? "सभी देखें" : locale === "te" ? "అన్నీ చూడండి" : "View All"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </LocaleLink>

              {/* Horizontal Scroll Controls */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => scroll("left")}
                  className="w-8 h-8 rounded-full border border-[#ebdccb] bg-white hover:bg-[#faf5ee] text-stone-600 flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
                  aria-label="Scroll left"
                  title="Previous Numbers"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scroll("right")}
                  className="w-8 h-8 rounded-full border border-[#ebdccb] bg-white hover:bg-[#faf5ee] text-stone-600 flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
                  aria-label="Scroll right"
                  title="Next Numbers"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Theme Filter Pills Localized */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 mb-4">
            {THEMES.map((theme) => {
              const isSelected = selectedTheme === theme.id;
              const label = theme.labels[locale] || theme.labels.en;
              return (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => {
                    setSelectedTheme(theme.id);
                    if (scrollRef.current) {
                      scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
                    }
                  }}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-xs font-semibold"
                      : "bg-white text-stone-700 border border-[#e8dfd2] hover:border-amber-400 hover:text-amber-800 hover:bg-[#fff9f2]"
                  }`}
                >
                  <span>{theme.icon}</span>
                  <span>{label}</span>
                </button>
              );
            })}
          </div>

          {/* Horizontal Scroll Carousel of Angel Numbers */}
          <div
            ref={scrollRef}
            className="flex items-stretch gap-3.5 sm:gap-4 overflow-x-auto pb-4 pt-1 no-scrollbar scroll-smooth snap-x snap-mandatory"
          >
            {themedItems.map((item) => (
              <div
                key={item.slug}
                className="w-[240px] sm:w-[260px] shrink-0 snap-start flex"
              >
                <AngelNumberCard
                  slug={item.slug}
                  number={item.number}
                  title={item.title}
                  excerpt={item.excerpt || (item as any).introduction || ""}
                  publishedAt={item.publishedAt}
                  heroImage={(item as any).heroImage}
                  category={item.category || "Angel Number"}
                />
              </div>
            ))}
          </div>
        </section>

      </div>
    </article>
  );
}

// Beautiful Winged Halo Emblem matching the reference UI
function WingedHaloEmblem({ className = "w-14 h-9" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 56"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="haloRingGrad" x1="25" y1="4" x2="75" y2="12" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f59e0b" />
          <stop offset="0.5" stopColor="#fde68a" />
          <stop offset="1" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="angelWingL" x1="48" y1="20" x2="6" y2="10" gradientUnits="userSpaceOnUse">
          <stop stopColor="#d97706" />
          <stop offset="0.4" stopColor="#f59e0b" />
          <stop offset="0.8" stopColor="#fef08a" />
          <stop offset="1" stopColor="#fffbeb" />
        </linearGradient>
        <linearGradient id="angelWingR" x1="52" y1="20" x2="94" y2="10" gradientUnits="userSpaceOnUse">
          <stop stopColor="#d97706" />
          <stop offset="0.4" stopColor="#f59e0b" />
          <stop offset="0.8" stopColor="#fef08a" />
          <stop offset="1" stopColor="#fffbeb" />
        </linearGradient>
      </defs>

      {/* Floating Golden Halo Ring */}
      <ellipse
        cx="50"
        cy="9"
        rx="18"
        ry="4.5"
        stroke="url(#haloRingGrad)"
        strokeWidth="2.5"
        fill="none"
      />

      {/* Left Angel Wing */}
      <path
        d="M46 22 C38 17 26 13 8 16 C14 22 22 28 34 30 C22 29 13 33 10 39 C18 40 28 38 38 35 C28 38 22 43 20 48 C28 47 37 42 46 32 Z"
        fill="url(#angelWingL)"
        opacity="0.9"
      />

      {/* Right Angel Wing */}
      <path
        d="M54 22 C62 17 74 13 92 16 C86 22 78 28 66 30 C78 29 87 33 90 39 C82 40 72 38 62 35 C72 38 78 43 80 48 C72 47 63 42 54 32 Z"
        fill="url(#angelWingR)"
        opacity="0.9"
      />
    </svg>
  );
}

// Social SVG helper icons
function SendIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
