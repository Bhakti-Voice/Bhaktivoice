import type { BirthDetails, KundliChart, PlanetPosition } from "./types";
import { calculateKundli } from "./kundli";
import { RASI_NAMES_TE } from "@/lib/panchang/names";

export type KaalSarpType = "purna" | "anshik" | "none";
export type KaalSarpDirection = "udit" | "anudit" | "neutral";

export interface KaalSarpYogaDefinition {
  index: number; // 1 to 12
  id: string;
  nameEn: string;
  nameHi: string;
  nameTe: string;
  rahuHouse: number;
  ketuHouse: number;
  significanceEn: string;
  significanceHi: string;
  significanceTe: string;
  careerImpactEn: string;
  careerImpactHi: string;
  careerImpactTe: string;
  maritalImpactEn: string;
  maritalImpactHi: string;
  maritalImpactTe: string;
  healthImpactEn: string;
  healthImpactHi: string;
  healthImpactTe: string;
  reliefAge: number;
  silverLiningEn: string;
  silverLiningHi: string;
  silverLiningTe: string;
  specificRemedyEn: string;
  specificRemedyHi: string;
  specificRemedyTe: string;
}

export interface KaalSarpPlanetCheck {
  id: string;
  nameEn: string;
  nameHi: string;
  nameTe: string;
  house: number;
  degree: string;
  side: "hemmed" | "outside";
  distanceFromRahu: number;
}

export interface KaalSarpReport {
  hasKaalSarp: boolean;
  type: KaalSarpType;
  typeLabelEn: string;
  typeLabelHi: string;
  typeLabelTe: string;
  direction: KaalSarpDirection;
  directionLabelEn: string;
  directionLabelHi: string;
  directionLabelTe: string;
  yogaIndex: number | null; // 1 to 12 if active
  yoga: KaalSarpYogaDefinition | null;
  rahuPlacement: {
    house: number;
    rashiIndex: number;
    rashiName: string;
    rashiNameHi: string;
    rashiNameTe: string;
    degree: string;
  };
  ketuPlacement: {
    house: number;
    rashiIndex: number;
    rashiName: string;
    rashiNameHi: string;
    rashiNameTe: string;
    degree: string;
  };
  planetsHemmedCount: number;
  planetsOutsideCount: number;
  escapedPlanets: { id: string; nameEn: string; nameHi: string; nameTe: string; house: number }[];
  planetChecks: KaalSarpPlanetCheck[];
  summaryEn: string;
  summaryHi: string;
  summaryTe: string;
  remedies: {
    titleEn: string;
    titleHi: string;
    titleTe: string;
    descriptionEn: string;
    descriptionHi: string;
    descriptionTe: string;
    mantra?: string;
  }[];
}

const RASHI_NAMES = [
  "Aries (Mesha)",
  "Taurus (Vrishabha)",
  "Gemini (Mithuna)",
  "Cancer (Karka)",
  "Leo (Simha)",
  "Virgo (Kanya)",
  "Libra (Tula)",
  "Scorpio (Vrischika)",
  "Sagittarius (Dhanu)",
  "Capricorn (Makara)",
  "Aquarius (Kumbha)",
  "Pisces (Meena)",
];

const RASHI_NAMES_HI = [
  "मेष",
  "वृषभ",
  "मिथुन",
  "कर्क",
  "सिंह",
  "कन्या",
  "तुला",
  "वृश्चिक",
  "धनु",
  "मकर",
  "कुंभ",
  "मीन",
];

export const PLANET_NAMES_TE: Record<string, string> = {
  sun: "సూర్యుడు (రవి)",
  moon: "చంద్రుడు",
  mars: "కుజుడు (మంగళుడు)",
  mercury: "బుధుడు",
  jupiter: "గురుడు (బృహస్పతి)",
  venus: "శుక్రుడు",
  saturn: "శని",
  rahu: "రాహువు",
  ketu: "కేతువు",
};

export const KAAL_SARP_YOGAS: Record<number, KaalSarpYogaDefinition> = {
  1: {
    index: 1,
    id: "anant",
    nameEn: "Anant Kaal Sarp Yoga",
    nameHi: "अनंत काल सर्प योग",
    nameTe: "అనంత కాల సర్ప యోగం",
    rahuHouse: 1,
    ketuHouse: 7,
    significanceEn:
      "Rahu occupies the 1st house (Self/Lagna) and Ketu is in the 7th house (Partnership/Marriage). Creates intense personal ambition, early identity struggles, delayed recognition, and tests in marital patience.",
    significanceHi:
      "राहु लग्न (प्रथम भाव) में तथा केतु सप्तम भाव में स्थित होते हैं। जातक में असाधारण महत्वाकांक्षा, आरंभिक जीवन में पहचान का संघर्ष तथा वैवाहिक संबंधों में धैर्य की परीक्षा रहती है।",
    significanceTe:
      "రాహువు 1వ భావం (లగ్నం/ఆత్మ) మరియు కేతువు 7వ భావం (భాగస్వామ్యం/వివాహం)లో ఉంటారు. అపారమైన వ్యక్తిగత ఆశయాలు, ప్రారంభంలో గుర్తింపు కొరకు పోరాటం మరియు వైవాహిక జీవితంలో ఓర్పు అవసరం.",
    careerImpactEn:
      "Struggles and frequent shifts in career early on, followed by extraordinary sudden rise, authority, and mass leadership after age 28–33.",
    careerImpactHi:
      "आरंभिक करियर में अस्थिरता व विलंब, परंतु २८ से ३३ वर्ष की आयु के पश्चात अचानक असाधारण उन्नति, उच्च पद व सामाजिक प्रभाव प्राप्त होता है।",
    careerImpactTe:
      "ప్రారంభంలో వృత్తిలో ఒడిదుడుకులు, కానీ 28-33 ఏళ్ల వయస్సు తర్వాత ఆకస్మిక ఉన్నత పురోగతి, అధికారం మరియు ప్రజా నాయకత్వం లభిస్తుంది.",
    maritalImpactEn:
      "Ego clashes with spouse and marriage delays; requires transparent communication and mutual space.",
    maritalImpactHi:
      "जीवनसाथी के साथ वैचारिक मतभेद अथवा विवाह में विलंब की संभावना; समझदारी व सामंजस्य आवश्यक है।",
    maritalImpactTe:
      "జీవిత భాగస్వామితో అహం ఘర్షణలు మరియు వివాహంలో ఆలస్యం; స్పష్టమైన సంభాషణ మరియు పరస్పర అవగాహన అవసరం.",
    healthImpactEn: "Mental stress, restlessness, migraines, or sleep irregularities in youth.",
    healthImpactHi: "मानसिक अशांति, अनिद्रा, सिरदर्द अथवा बेचैनी की प्रवृत्ति।",
    healthImpactTe: "మానసిక ఒత్తిడి, అశాంతి, మైగ్రేన్ తలనొప్పి లేదా నిద్రలేమి సమస్యలు.",
    reliefAge: 33,
    silverLiningEn:
      "Individuals with Anant Kaal Sarp Yoga often possess brilliant minds and become revolutionary founders, statesmen, or celebrated creators.",
    silverLiningHi:
      "इस योग के जातक अत्यंत तीक्ष्ण बुद्धि के धनी होते हैं तथा समाज में युगांतरकारी नेतृत्व या विशिष्ट कीर्ति स्थापित करते हैं।",
    silverLiningTe:
      "అనంత కాల సర్ప యోగం ఉన్న వ్యక్తులు అద్భుతమైన తెలివితేటలు కలిగి ఉండి, దూరదృష్టి గల వ్యవస్థాపకులుగా, నాయకులుగా చరిత్ర సృష్టిస్తారు.",
    specificRemedyEn: "Chant Maha Mrityunjaya Mantra 108 times daily; donate black sesame seeds on Saturdays.",
    specificRemedyHi: "नित्य १०८ बार महामृत्युंजय मंत्र का जप करें तथा शनिवार को काले तिल का दान करें।",
    specificRemedyTe: "ప్రతిరోజూ 108 సార్లు మహామృత్యుంజయ మంత్రం జపించండి; శనివారం నల్ల నువ్వులను దానం చేయండి.",
  },
  2: {
    index: 2,
    id: "kulik",
    nameEn: "Kulik Kaal Sarp Yoga",
    nameHi: "कुलिक काल सर्प योग",
    nameTe: "కుళిక కాల సర్ప యోగం",
    rahuHouse: 2,
    ketuHouse: 8,
    significanceEn:
      "Rahu in the 2nd house (Wealth & Family) and Ketu in the 8th house (Longevity & Sudden Events). Financial ups and downs, harsh speech tendencies, and ancestral inheritance challenges.",
    significanceHi:
      "राहु द्वितीय भाव (धन व कुटुंब) और केतु अष्टम भाव (आयु व गुप्त धन) में स्थित होते हैं। धन के संचय में उतार-चढ़ाव, कुटुंब में मतभेद व पैतृक संपत्ति में बाधाएं आ सकती हैं।",
    significanceTe:
      "రాహువు 2వ భావం (ధనం & కుటుంబం) మరియు కేతువు 8వ భావం (ఆయుష్షు & ఆకస్మిక మార్పులు)లో ఉంటారు. ఆర్థిక ఒడిదుడుకులు, కఠిన సంభాషణ మరియు పూర్వీకుల ఆస్తిలో సవాళ్లు.",
    careerImpactEn:
      "Fluctuations in savings and speculative ventures early in life; immense wealth creation through innovative or unconventional business after age 36.",
    careerImpactHi:
      "आरंभ में धन संचय में बाधाएं; ३६ वर्ष के उपरांत नवीन व आधुनिक व्यापार अथवा विशेषज्ञता के माध्यम से विपुल धन संपदा।",
    careerImpactTe:
      "ప్రారంభంలో పొదుపు మరియు ఊహాజనిత వ్యాపారాలలో ఒడిదుడుకులు; 36 ఏళ్ల తర్వాత నూతన వ్యాపారాలు లేదా నైపుణ్యాల ద్వారా అపార ధన సంపాదన.",
    maritalImpactEn:
      "In-laws misunderstandings and friction caused by hasty speech. Cultivating gentle speech brings lasting harmony.",
    maritalImpactHi: "ससुराल पक्ष से मतभेद तथा कटु वाणी से मनमुटाव; मधुर वाणी रखने से शांति बनी रहती है।",
    maritalImpactTe:
      "అత్తమామల వైపు నుండి విభేదాలు మరియు తొందరపాటు మాటల వల్ల మనస్పర్థలు; మృదువైన సంభాషణ శాంతిని చేకూరుస్తుంది.",
    healthImpactEn: "Teeth, throat, eye strain, or sudden digestion issues.",
    healthImpactHi: "मुख, दंत, गले के विकार अथवा अचानक पाचन संबंधी असंतुलन।",
    healthImpactTe: "దంత, గొంతు, కంటి సమస్యలు లేదా ఆకస్మిక జీర్ణక్రియ లోపాలు.",
    reliefAge: 36,
    silverLiningEn:
      "Sharp oratory skills, financial acumen, and high resilience under extreme pressure.",
    silverLiningHi:
      "अद्भुत वाकपटुता, वित्तीय समझ तथा कठिनतम परिस्थितियों में भी पुनः खड़े होने का अपार आत्मबल।",
    silverLiningTe:
      "అద్భుతమైన వాక్చాతుర్యం, ఆర్థిక చతురత మరియు క్లిష్ట పరిస్థితుల్లోనూ తిరిగి నిలబడే దృఢ సంకల్పం.",
    specificRemedyEn: "Keep a silver coin or ball in your wallet; feed birds daily with multi-grains.",
    specificRemedyHi: "अपनी जेब या पर्स में चांदी की ठोस गोली रखें; नित्य पक्षियों को सप्तधान्य खिलाएं।",
    specificRemedyTe: "వెండి నాణెం లేదా చిన్న వెండి గుళికను పర్సులో ఉంచుకోండి; రోజూ పక్షులకు ధాన్యాలు వేయండి.",
  },
  3: {
    index: 3,
    id: "vasuki",
    nameEn: "Vasuki Kaal Sarp Yoga",
    nameHi: "वासुकी काल सर्प योग",
    nameTe: "వాసుకి కాల సర్ప యోగం",
    rahuHouse: 3,
    ketuHouse: 9,
    significanceEn:
      "Rahu in the 3rd house (Courage & Siblings) and Ketu in the 9th house (Fortune & Dharma). High bravery, friction with siblings or close peers, and sudden shifts in belief systems.",
    significanceHi:
      "राहु तृतीय भाव (पराक्रम व भाई-बहन) तथा केतु नवम भाव (भाग्य व धर्म) में होते हैं। जातक में अदम्य साहस होता है, परंतु भाई-बहनों से मतभेद व भाग्य में विलंब संभव है।",
    significanceTe:
      "రాహువు 3వ భావం (పరాక్రమం & సోదరులు) మరియు కేతువు 9వ భావం (భాగ్యం & ధర్మం)లో ఉంటారు. అపారమైన ధైర్యం, తోబుట్టువులతో భేదాభిప్రాయాలు మరియు భాగ్యంలో ఆలస్యం.",
    careerImpactEn:
      "Great success in media, writing, sports, sales, technology, or entrepreneurship through sheer self-made effort.",
    careerImpactHi:
      "मीडिया, लेखन, खेल, आईटी व स्वरोजगार में स्वतः के पराक्रम के बल पर महान सफलता प्राप्त होती है।",
    careerImpactTe:
      "స్వయంకృషితో మీడియా, రచన, క్రీడలు, ఐటీ లేదా వ్యాపార రంగంలో అద్భుత విజయం సాధిస్తారు.",
    maritalImpactEn: "Generally favorable; minor distance due to frequent business travels.",
    maritalImpactHi: "वैवाहिक जीवन प्रायः सामान्य; अत्यधिक यात्राओं के कारण कभी-कभी दूरी।",
    maritalImpactTe: "వైవాహిక జీవితం సాధారణంగా అనుకూలంగా ఉంటుంది; వ్యాపార ప్రయాణాల వల్ల స్వల్ప దూరం ఏర్పడవచ్చు.",
    healthImpactEn: "Blood pressure fluctuations, shoulder, arm, or ear sensitivities.",
    healthImpactHi: "कंधे, बांह अथवा कानों में संवेदनशीलता व रक्तचाप में उतार-चढ़ाव।",
    healthImpactTe: "రక్తపోటులో మార్పులు, భుజాలు లేదా చెవులలో సున్నితత్వం.",
    reliefAge: 32,
    silverLiningEn:
      "Unmatched entrepreneurial guts; does not depend on ancestral help and crafts their own empire.",
    silverLiningHi:
      "किसी के सहारे के बिना शून्य से शिखर तक अपना साम्राज्य स्वयं स्थापित करने की अद्वितीय क्षमता।",
    silverLiningTe:
      "ఎవరి మద్దతు లేకుండా శూన్యం నుండి స్వయం సామ్రాజ్యాన్ని నిర్మించే అద్భుతమైన వ్యాపార సాహస ధైర్యం.",
    specificRemedyEn: "Wear a 3-faced (Teen Mukhi) Rudraksha; chant Hanuman Chalisa daily morning and evening.",
    specificRemedyHi: "तीन मुखी रुद्राक्ष धारण करें तथा प्रातः व सायं श्री हनुमान चालीसा का पाठ करें।",
    specificRemedyTe: "మూడు ముఖాల రుద్రాక్ష ధరించండి; ఉదయం మరియు సాయంత్రం హనుమాన్ చాలీసా పారాయణం చేయండి.",
  },
  4: {
    index: 4,
    id: "shankhpal",
    nameEn: "Shankhpal Kaal Sarp Yoga",
    nameHi: "शंखपाल काल सर्प योग",
    nameTe: "శంఖపాల కాల సర్ప యోగం",
    rahuHouse: 4,
    ketuHouse: 10,
    significanceEn:
      "Rahu in the 4th house (Mother, Home, Land) and Ketu in the 10th house (Karma & Profession). Domestic restlessness, concerns regarding mother's health, and frequent career relocations.",
    significanceHi:
      "राहु चतुर्थ भाव (सुख, माता, भूमि) तथा केतु दशम भाव (कर्म, पद) में स्थित होते हैं। घरेलू सुख में कमी, माता के स्वास्थ्य की चिंता तथा कार्यक्षेत्र में बार-बार परिवर्तन।",
    significanceTe:
      "రాహువు 4వ భావం (తల్లి, ఇల్లు, భూమి) మరియు కేతువు 10వ భావం (కర్మ & వృత్తి)లో ఉంటారు. గృహంలో అశాంతి, తల్లి ఆరోగ్యంపై ఆందోళన మరియు వృత్తిలో తరచుగా మార్పులు.",
    careerImpactEn:
      "Professional hurdles and political obstacles until age 36; later establishes profound authority in real estate, management, or government.",
    careerImpactHi:
      "३६ वर्ष तक कार्यक्षेत्र में विरोध व संघर्ष; तदुपरांत भूमि, भवन, निर्माण अथवा शासन-प्रशासन में स्थायी प्रतिष्ठा।",
    careerImpactTe:
      "36 ఏళ్ల వరకు వృత్తిలో ఆటంకాలు; ఆ తర్వాత రియల్ ఎస్టేట్, పరిపాలన లేదా నిర్మాణ రంగంలో స్థిరమైన అధికారం మరియు కీర్తి.",
    maritalImpactEn: "Interference by external relatives in family life; requiring healthy boundaries.",
    maritalImpactHi: "पारिवारिक मामलों में बाहरी व्यक्तियों का हस्तक्षेप; निजी जीवन में सीमाएं तय करना आवश्यक।",
    maritalImpactTe:
      "కుటుంబ విషయాలలో బయటి వ్యక్తుల జోక్యం వల్ల ఇబ్బందులు; వ్యక్తిగత జీవితంలో హద్దులు నిర్ణయించుకోవడం ముఖ్యం.",
    healthImpactEn: "Chest congestion, respiratory issues, or anxiety related to home affairs.",
    healthImpactHi: "हृदय अथवा श्वसन संबंधी संवेदनशीलता व मानसिक अशांति।",
    healthImpactTe: "ఛాతీ, శ్వాసకోశ సున్నితత్వం లేదా గృహ సంబంధిత మానసిక ఆందోళన.",
    reliefAge: 36,
    silverLiningEn:
      "Exceptional emotional depth, protective nature toward family, and unmatched ability to rebuild homes and assets.",
    silverLiningHi: "गहन भावनात्मक संवेदनशीलता तथा संकट के समय परिवार को ढाल बनकर सुरक्षित रखने की क्षमता।",
    silverLiningTe:
      "అసాధారణ భావోద్వేగ గాఢత, కుటుంబ రక్షణ తత్వం మరియు సంక్షోభ సమయంలో కుటుంబాన్ని నిలబెట్టే శక్తి.",
    specificRemedyEn: "Offer raw milk and white flowers to a Shiva Lingam on Mondays; honor mother daily.",
    specificRemedyHi: "सोमवार को शिवलिंग पर कच्चा दूध व सफेद फूल अर्पित करें; प्रतिदिन माता के चरण स्पर्श करें।",
    specificRemedyTe: "సోమవారం శివలింగానికి పచ్చి పాలు, తెల్లటి పువ్వులు సమర్పించండి; ప్రతిరోజూ తల్లి పాదాలకు నమస్కరించండి.",
  },
  5: {
    index: 5,
    id: "padma",
    nameEn: "Padma Kaal Sarp Yoga",
    nameHi: "पद्म काल सर्प योग",
    nameTe: "పద్మ కాల సర్ప యోగం",
    rahuHouse: 5,
    ketuHouse: 11,
    significanceEn:
      "Rahu in the 5th house (Intellect, Education, Children) and Ketu in the 11th house (Gains & Network). Obstacles in higher education, delays in progeny, and speculative investment volatility.",
    significanceHi:
      "राहु पंचम भाव (बुद्धि, संतान, विद्या) तथा केतु एकादश भाव (लाभ व मित्र) में होते हैं। उच्च शिक्षा में रुकावट, संतान प्राप्ति में विलंब तथा सट्टेबाजी से हानि का भय।",
    significanceTe:
      "రాహువు 5వ భావం (బుద్ధి, విద్య, సంతానం) మరియు కేతువు 11వ భావం (లాభాలు & మిత్రులు)లో ఉంటారు. ఉన్నత విద్యలో ఆటంకాలు, సంతాన ప్రాప్తిలో ఆలస్యం మరియు ఊహాజనిత పెట్టుబడులలో నష్టభయం.",
    careerImpactEn:
      "Brilliant creative genius and innovation; supreme achievements in research, arts, philosophy, or analytics after initial academic twists.",
    careerImpactHi:
      "अद्वितीय सृजनात्मक प्रतिभा; आरंभिक शैक्षणिक अड़चनों के बाद शोध, कला, परामर्श अथवा प्रौद्योगिकी में ऐतिहासिक सफलता।",
    careerImpactTe:
      "అద్భుతమైన సృజనాత్మక ప్రతిభ; పరిశోధన, కళలు, సాంకేతికత లేదా విశ్లేషణ రంగాలలో అసాధారణ విజయం సాధిస్తారు.",
    maritalImpactEn: "Emotional misunderstandings regarding children or parental expectations.",
    maritalImpactHi: "संतान संबंधित चिंताएं अथवा दांपत्य में भावनात्मक अपेक्षाओं का असंतुलन।",
    maritalImpactTe: "సంతాన సంబంధిత విషయాలలో లేదా భావోద్వేగ అంచనాలలో అపార్థాలు.",
    healthImpactEn: "Stomach, liver, digestion, and stress-induced acidity.",
    healthImpactHi: "उदर विकार, गैस, एसिडिटी व पाचन संबंधी संवेदनशीलता।",
    healthImpactTe: "కడుపు నొప్పి, ఎసిడిటీ, కాలేయం లేదా జీర్ణ సంబంధిత సున్నితత్వం.",
    reliefAge: 38,
    silverLiningEn:
      "Profound intuitive foresight, exceptional storytelling or coding talents, and immense eventual fame.",
    silverLiningHi: "तीक्ष्ण अंतर्ज्ञान, भविष्य को भांपने की क्षमता तथा अपनी विशिष्ट बौद्धिक प्रतिभा से जगप्रसिद्ध होना।",
    silverLiningTe:
      "తీవ్రమైన అంతర్ దృష్టి, భవిష్యత్తును ముందుగానే పసిగట్టే శక్తి మరియు అపూర్వ మేధో సంపత్తితో కీర్తి ప్రతిష్టలు.",
    specificRemedyEn: "Recite Saraswati Stotram daily; plant a Bel or Peepal tree in a temple courtyard.",
    specificRemedyHi: "नित्य सरस्वती स्तोत्र का पाठ करें तथा किसी धार्मिक स्थल पर बेल अथवा पीपल का वृक्ष लगाएं।",
    specificRemedyTe: "రోజూ సరస్వతీ స్తోత్రం పఠించండి; ఆలయ ప్రాంగణంలో మారేడు (బిల్వ) లేదా రావి చెట్టును నాటండి.",
  },
  6: {
    index: 6,
    id: "mahapadma",
    nameEn: "Mahapadma Kaal Sarp Yoga",
    nameHi: "महापद्म काल सर्प योग",
    nameTe: "మహా పద్మ కాల సర్ప యోగం",
    rahuHouse: 6,
    ketuHouse: 12,
    significanceEn:
      "Rahu in the 6th house (Enemies, Debts, Litigation) and Ketu in the 12th house (Expenses & Foreign Lands). Bitter rivalry with secret opponents, health disputes, and unexpected expenditures.",
    significanceHi:
      "राहु षष्ठ भाव (शत्रु, रोग, ऋण) तथा केतु द्वादश भाव (व्यय, मोक्ष) में होते हैं। गुप्त शत्रुओं से विरोध, अदालती उलझनें तथा अनावश्यक व्यय का सामना करना पड़ सकता है।",
    significanceTe:
      "రాహువు 6వ భావం (శత్రువులు, రోగాలు, రుణాలు) మరియు కేతువు 12వ భావం (వ్యయం & విదేశాలు)లో ఉంటారు. రహస్య శత్రువుల నుండి పోటీ, చట్టపరమైన సమస్యలు మరియు అనవసర ఖర్చులు.",
    careerImpactEn:
      "Absolute triumph over competition, litigation, and political rivals. Highly favorable for lawyers, doctors, defense personnel, and competitive examinations.",
    careerImpactHi:
      "शत्रुओं व विरोधियों पर पूर्ण विजय; वकालत, चिकित्सा, सेना, पुलिस व प्रतियोगी परीक्षाओं में सर्वोच्च सफलता।",
    careerImpactTe:
      "పోటీ పరీక్షలు, న్యాయవాదం, వైద్యం, రక్షణ రంగాలలో తిరుగులేని ఆధిపత్యం మరియు శత్రువులపై సంపూర్ణ విజయం.",
    maritalImpactEn: "Minor health concerns of spouse or foreign postings causing physical separation.",
    maritalImpactHi: "जीवनसाथी का स्वास्थ्य अथवा विदेश यात्राओं के कारण अल्पकालिक दूरी।",
    maritalImpactTe: "జీవిత భాగస్వామి స్వల్ప అనారోగ్యం లేదా విదేశీ పనుల వల్ల శారీరక దూరం.",
    healthImpactEn: "Lower abdominal issues, kidney sensitivities, or foot ailments.",
    healthImpactHi: "कमर, गुर्दे अथवा पैरों में संवेदनशीलता।",
    healthImpactTe: "నడుము, మూత్రపిండాలు లేదా పాదాల సంబంధిత సమస్యలు.",
    reliefAge: 36,
    silverLiningEn:
      "Shatru Hanta (Crusher of all enemies); gains immense wealth and international success through overseas ventures.",
    silverLiningHi:
      "शत्रुहंता योग; विपरीत परिस्थितियों को अवसर में बदलकर विदेश अथवा सुदूर स्थानों से अपार धनार्जन।",
    silverLiningTe:
      "శత్రుహంత యోగం; ప్రతికూలతలను అవకాశాలుగా మార్చుకుని విదేశాల ద్వారా లేదా సుదూర ప్రాంతాల నుండి అపార సంపదను ఆర్జిస్తారు.",
    specificRemedyEn: "Feed stray dogs with bread/roti; chant Bhairav Stotra on Tuesday or Saturday nights.",
    specificRemedyHi: "काले श्वान (कुत्ते) को मीठी रोटी खिलाएं तथा शनिवार को भैरव स्तोत्र का पाठ करें।",
    specificRemedyTe: "వీధి శునకాలకు ఆహారం పెట్టండి; మంగళవారం లేదా శనివారం భైరవ స్తోత్రం పఠించండి.",
  },
  7: {
    index: 7,
    id: "takshak",
    nameEn: "Takshak Kaal Sarp Yoga",
    nameHi: "तक्षक काल सर्प योग",
    nameTe: "తక్షక కాల సర్ప యోగం",
    rahuHouse: 7,
    ketuHouse: 1,
    significanceEn:
      "Rahu in the 7th house (Marriage & Partnerships) and Ketu in the 1st house (Ascendant). Strong business instincts alongside serious marital delays, spouse temper conflicts, or partnership betrayals.",
    significanceHi:
      "राहु सप्तम भाव (विवाह व साझेदारी) तथा केतु प्रथम भाव में होते हैं। व्यापारिक तीक्ष्णता के साथ-साथ विवाह में विलंब, जीवनसाथी के स्वभाव में उग्रता अथवा व्यापारिक साझेदारों से धोखा।",
    significanceTe:
      "రాహువు 7వ భావం (వివాహం & భాగస్వామ్యం) మరియు కేతువు 1వ భావం (లగ్నం)లో ఉంటారు. అద్భుతమైన వ్యాపార నైపుణ్యాలతో పాటు వివాహంలో ఆలస్యం, భాగస్వామి స్వభావంలో దూకుడు లేదా వ్యాపార మోసాలు.",
    careerImpactEn:
      "Phenomenal business acumen, mastery of negotiations and foreign contracts after initial partnership breakdowns.",
    careerImpactHi:
      "साझेदारी के आरंभिक कड़वे अनुभवों के उपरांत स्वतंत्र व्यापार, आयात-निर्यात व विदेशी अनुबंधों में असाधारण सफलता।",
    careerImpactTe:
      "ప్రారంభంలో భాగస్వామ్య చేదు అనుభవాల తర్వాత స్వతంత్ర వ్యాపారం, అంతర్జాతీయ ఒప్పందాలు మరియు దిగుమతి-ఎగుమతులలో అపూర్వ విజయం.",
    maritalImpactEn:
      "Significant marital hurdles; demands total spiritual maturity, patience, and non-possessiveness.",
    maritalImpactHi:
      "दांपत्य में सर्वाधिक सजगता की आवश्यकता; जीवनसाथी को स्वतंत्रता व सम्मान देने से ही सुखद संबंध संभव।",
    maritalImpactTe:
      "దాంపత్యంలో అత్యంత వివేకం మరియు సహనం అవసరం; పరస్పర గౌరవం, స్వేచ్ఛ ఇవ్వడం ద్వారానే సంతోషం లభిస్తుంది.",
    healthImpactEn: "Skin sensitivities, reproductive health checks, and mental overthinking.",
    healthImpactHi: "त्वचा विकार, वात रोग तथा अत्यधिक चिंता से उत्पन्न शारीरिक शिथिलता।",
    healthImpactTe: "చర్మ సమస్యలు, వాత సంబంధిత లోపాలు మరియు అధిక ఆలోచనల వల్ల నీరసం.",
    reliefAge: 40,
    silverLiningEn:
      "Deeply magnetic personality, master negotiator, and capable of charming tough international clients.",
    silverLiningHi: "आकर्षक व्यक्तित्व, कुशल वार्ताकार तथा कठिन से कठिन व्यक्ति को अपने पक्ष में करने की कला।",
    silverLiningTe:
      "అత్యంత ఆకర్షణీయమైన వ్యక్తిత్వం, దౌత్యవేత్త చాతుర్యం మరియు కఠినమైన వ్యక్తులను కూడా ఒప్పించే ప్రతిభ.",
    specificRemedyEn: "Perform Rudrabhishek at a Jyotirlinga (Trimbakeshwar/Ujjain); keep peacock feathers in home.",
    specificRemedyHi: "त्र्यंबकेश्वर अथवा उज्जैन में रुद्राभिषेक कराएं; शयनकक्ष में मोरपंख स्थापित करें।",
    specificRemedyTe: "శ్రీకాళహస్తి లేదా త్రయంబకేశ్వర్ లో రుద్రాభిషేకం చేయించండి; పడకగదిలో నెమలి ఈకను ఉంచండి.",
  },
  8: {
    index: 8,
    id: "karkotak",
    nameEn: "Karkotak Kaal Sarp Yoga",
    nameHi: "कर्कोटक काल सर्प योग",
    nameTe: "కర్కోటక కాల సర్ప యోగం",
    rahuHouse: 8,
    ketuHouse: 2,
    significanceEn:
      "Rahu in the 8th house (Occult, Transformation, Longevity) and Ketu in the 2nd house (Speech & Wealth). Sudden life twists, hidden wealth gains, ancestral inheritance disputes, and accidents risk.",
    significanceHi:
      "राहु अष्टम भाव (आयु, गुप्त विद्या, संकट) तथा केतु द्वितीय भाव में होते हैं। जीवन में अप्रत्याशित घटनाएं, गुप्त धन की प्राप्ति, पैतृक संपत्ति में विवाद व आकस्मिक चोट का भय।",
    significanceTe:
      "రాహువు 8వ భావం (ఆయుష్షు, గూఢ విద్య, రహస్యాలు) మరియు కేతువు 2వ భావం (వాక్కు & సంపద)లో ఉంటారు. జీవితంలో ఆకస్మిక మలుపులు, రహస్య సంపద, వారసత్వ ఆస్తి వివాదాలు.",
    careerImpactEn:
      "Unmatched prowess in research, astrology, cybersecurity, mining, surgery, or deep investigative professions.",
    careerImpactHi:
      "शोध, ज्योतिष, गुप्तचर, साइबर सुरक्षा, सर्जरी व खनन के क्षेत्र में अद्भुत ख्याति व सफलता।",
    careerImpactTe:
      "పరిశోధన, జ్యోతిష్యం, సైబర్ భద్రత, మైనింగ్, సర్జరీ లేదా గూఢచర్య రంగాలలో అద్భుతమైన గుర్తింపు.",
    maritalImpactEn: "Financial secretiveness between partners; requires honesty regarding investments.",
    maritalImpactHi: "धन व वित्तीय मामलों में पारदर्शिता की कमी से तनाव; सत्यनिष्ठ संवाद आवश्यक।",
    maritalImpactTe: "ఆర్థిక విషయాలలో దాపరికాలు మనస్పర్థలకు కారణం కావచ్చు; పారదర్శకమైన సంభాషణ అవసరం.",
    healthImpactEn: "Accident vulnerability, chronic illness flare-ups, and sudden vitality drops.",
    healthImpactHi: "वाहन सावधानीपूर्वक चलाएं; मौसमी व गुप्त रोगों से बचाव रखें।",
    healthImpactTe: "ప్రయాణాలలో జాగ్రత్త అవసరం; దీర్ఘకాలిక ఆరోగ్య సమస్యల పట్ల అప్రమత్తంగా ఉండాలి.",
    reliefAge: 42,
    silverLiningEn:
      "Profound mastery of occult and hidden sciences; possesses miraculous survival power in any adversity.",
    silverLiningHi: "अदृश्य विद्याओं व गूढ़ रहस्यों के ज्ञाता; घोर विपत्ति से भी सुरक्षित बाहर निकलने की ईश्वरीय कृपा।",
    silverLiningTe:
      "గూఢ విద్యలు మరియు ఆధ్యాత్మిక రహస్యాలపై అపార పట్టు; అత్యంత క్లిష్టమైన సంక్షోభాల నుండి కూడా క్షేమంగా బయటపడే దైవకృప.",
    specificRemedyEn: "Donate copper vessels filled with mustard oil (Chhaya Daan) on Saturdays; feed ants daily.",
    specificRemedyHi: "शनिवार को कांसे या तांबे के पात्र में तेल डालकर छाया दान करें; चींटियों को आटा व शक्कर डालें।",
    specificRemedyTe: "శనివారం కంచు లేదా రాగి పాత్రలో ఆవనూనె పోసి ఛాయాదానం చేయండి; చీమలకు పిండి, చక్కెర వేయండి.",
  },
  9: {
    index: 9,
    id: "shankhachur",
    nameEn: "Shankhachur (Shankhadhar) Kaal Sarp Yoga",
    nameHi: "शंखचूड़ (शंखधार) काल सर्प योग",
    nameTe: "శంఖచూడ (శంఖధర) కాల సర్ప యోగం",
    rahuHouse: 9,
    ketuHouse: 3,
    significanceEn:
      "Rahu in the 9th house (Fortune, Dharma, Father) and Ketu in the 3rd house (Effort & Younger Siblings). Fluctuating fortune, strained relations with father or mentors, and crisis of faith in youth.",
    significanceHi:
      "राहु नवम भाव (भाग्य, धर्म, पिता) तथा केतु तृतीय भाव में होते हैं। भाग्य में अचानक उतार-चढ़ाव, पिता के साथ वैचारिक असहमति तथा युवावस्था में धार्मिक संशय।",
    significanceTe:
      "రాహువు 9వ భావం (భాగ్యం, ధర్మం, పితృ) మరియు కేతువు 3వ భావం (ప్రయత్నం & సోదరులు)లో ఉంటారు. అదృష్టంలో హెచ్చుతగ్గులు, తండ్రితో లేదా గురువులతో వైరుధ్యాలు.",
    careerImpactEn:
      "Delayed destiny till age 36; extraordinary success thereafter in law, higher academia, spiritual preaching, or global consulting.",
    careerImpactHi:
      "३६ वर्ष तक भाग्य का कम साथ; तदुपरांत विधि, उच्च शिक्षा, धर्म प्रचार अथवा वैश्विक सलाहकार के रूप में सर्वोच्च प्रतिष्ठा।",
    careerImpactTe:
      "36 ఏళ్ల వరకు అదృష్టం తక్కువగా అనిపిస్తుంది; ఆ తర్వాత న్యాయం, ఉన్నత విద్య, ఆధ్యాత్మిక ప్రవచనాలు లేదా గ్లోబల్ కన్సల్టింగ్‌లో అత్యున్నత స్థానం.",
    maritalImpactEn: "Generally stable; minor differences regarding religious or philosophical values.",
    maritalImpactHi: "वैवाहिक जीवन संतुलित; धार्मिक विचारों व जीवन मूल्यों में भिन्नता संभव।",
    maritalImpactTe: "దాంపత్యం నిలకడగా ఉంటుంది; మతపరమైన లేదా తాత్విక అభిప్రాయాలలో స్వల్ప భేదాలు ఉండవచ్చు.",
    healthImpactEn: "Thigh, hip, and joint sensitivities; nervous system exhaustion from overwork.",
    healthImpactHi: "कमर, जांघों व जोड़ों में दर्द अथवा अत्यधिक मानसिक श्रम से थकावट।",
    healthImpactTe: "నడుము, తొడలు లేదా కీళ్ల నొప్పులు; అధిక శ్రమ వల్ల అలసట.",
    reliefAge: 36,
    silverLiningEn:
      "Creates profound philosophers, spiritual reformers, and visionaries who redefine cultural norms.",
    silverLiningHi:
      "महान दार्शनिक, समाज सुधारक व युगांतकारी चिंतक बनने का योग जो समाज को नई दिशा प्रदान करते हैं।",
    silverLiningTe:
      "గొప్ప తత్వవేత్తలు, సంస్కర్తలు మరియు సమాజానికి కొత్త దిశానిర్దేశం చేసే మేధావులుగా ఎదుగుతారు.",
    specificRemedyEn: "Respect father and spiritual gurus; chant Shiva Panchakshara Stotra daily.",
    specificRemedyHi: "पिता व गुरुजनों का सम्मान करें; प्रतिदिन शिव पंचाक्षर स्तोत्र (नागेंद्रहाराय...) का पाठ करें।",
    specificRemedyTe: "తండ్రిని, గురువులను గౌరవించండి; రోజూ శివ పంచాక్షర స్తోత్రం (నాగేంద్రహారాయ...) పారాయణం చేయండి.",
  },
  10: {
    index: 10,
    id: "ghatak",
    nameEn: "Ghatak Kaal Sarp Yoga",
    nameHi: "घातक काल सर्प योग",
    nameTe: "ఘాతక కాల సర్ప యోగం",
    rahuHouse: 10,
    ketuHouse: 4,
    significanceEn:
      "Rahu in the 10th house (Karma, Fame, Authority) and Ketu in the 4th house (Inner Peace & Domestic Life). High career ambitions, office politics, scrutiny by superiors, and domestic sacrifices.",
    significanceHi:
      "राहु दशम भाव (कर्म, प्रतिष्ठा, राजपद) तथा केतु चतुर्थ भाव में होते हैं। कार्यक्षेत्र में तीव्र महत्वाकांक्षा, उच्चाधिकारियों से संघर्ष तथा कार्य व्यस्तता के कारण घरेलू सुख का त्याग।",
    significanceTe:
      "రాహువు 10వ భావం (కర్మ, అధికారం, కీర్తి) మరియు కేతువు 4వ భావం (గృహం & మనశ్శాంతి)లో ఉంటారు. ఉన్నత ఉద్యోగ ఆశయాలు, కార్యాలయ రాజకీయాలు, కుటుంబ సుఖాలను త్యాగం చేయడం.",
    careerImpactEn:
      "Extremely ambitious and hardworking; faces political sabotage early on, but attains supreme political, bureaucratic, or corporate power after age 42.",
    careerImpactHi:
      "आरंभ में षड्यंत्र व पद से विमुखता; परंतु ४२ वर्ष के उपरांत राजनीति, शासन अथवा बहुराष्ट्रीय निगमों में सर्वोच्च शक्ति।",
    careerImpactTe:
      "ప్రారంభంలో రాజకీయ అడ్డంకులు; కానీ 42 ఏళ్ల తర్వాత రాజకీయాల్లో, ప్రభుత్వంలో లేదా కార్పొరేట్ రంగంలో అత్యున్నత అధికార పీఠాన్ని అధిరోహిస్తారు.",
    maritalImpactEn: "Lack of time for spouse due to 24/7 career obsession; demands work-life harmony.",
    maritalImpactHi: "काम की अत्यधिक व्यस्तता से जीवनसाथी की उपेक्षा; पारिवारिक सामंजस्य की आवश्यकता।",
    maritalImpactTe: "పని ఒత్తిడి వల్ల జీవిత భాగస్వామికి సమయం కేటాయించలేకపోవడం; పని-కుటుంబ సమతుల్యత అవసరం.",
    healthImpactEn: "High blood pressure, stress headaches, and knee sensitivities.",
    healthImpactHi: "रक्तचाप, कार्य तनाव व घुटनों में संवेदनशीलता।",
    healthImpactTe: "రక్తపోటు, ఒత్తిడి తలనొప్పులు మరియు మోకాళ్ల సున్నితత్వం.",
    reliefAge: 42,
    silverLiningEn:
      "Unstoppable professional drive; individuals with Ghatak Yoga often leave monumental legacies and public institutions.",
    silverLiningHi:
      "अदम्य कर्मठता; इतिहास में अपनी अमिट छाप छोड़ने वाले महान प्रशासक व राजनेता इस योग में जन्म लेते हैं।",
    silverLiningTe:
      "అపారమైన కార్యదక్షత; చరిత్రలో చెరగని ముద్ర వేసే గొప్ప నిర్వాహకులు, నాయకులుగా చరిత్రకెక్కుతారు.",
    specificRemedyEn: "Pour milk on brass or silver snake idol on Nag Panchami; respect workers and subordinates.",
    specificRemedyHi: "नागपंचमी पर चांदी के नाग-नागिन का अभिषेक करें; अधीनस्थों व श्रमिकों का सम्मान करें।",
    specificRemedyTe: "నాగపంచమి నాడు వెండి నాగ ప్రతిమను పూజించండి; కార్మికులను, సహాయకులను ఆదరించండి.",
  },
  11: {
    index: 11,
    id: "vishdhar",
    nameEn: "Vishdhar (Vishakt) Kaal Sarp Yoga",
    nameHi: "विषधर (विषाक्त) काल सर्प योग",
    nameTe: "విషధర (విషాక్త) కాల సర్ప యోగం",
    rahuHouse: 11,
    ketuHouse: 5,
    significanceEn:
      "Rahu in the 11th house (Income, Gains, Social Circle) and Ketu in the 5th house (Children, Memory, Intellect). Fluctuations in income, betrayals by false friends, and concerns regarding progeny.",
    significanceHi:
      "राहु एकादश भाव (आय, लाभ, मित्र) तथा केतु पंचम भाव में होते हैं। आय में अनियमितता, धूर्त मित्रों द्वारा विश्वासघात तथा संतान संबंधी चिंताएं।",
    significanceTe:
      "రాహువు 11వ భావం (ఆదాయం, లాభాలు, మిత్రులు) మరియు కేతువు 5వ భావం (సంతానం, విద్య, మేధస్సు)లో ఉంటారు. ఆదాయంలో హెచ్చుతగ్గులు, స్నేహితుల వల్ల మోసాలు మరియు సంతాన ఆందోళనలు.",
    careerImpactEn:
      "Multiple simultaneous income streams; high profits in technology, networking, entertainment, and digital media after overcoming early financial deception.",
    careerImpactHi:
      "आय के एक से अधिक स्रोत; प्रौद्योगिकी, सोशल मीडिया व मनोरंजन उद्योग में धोखों से सीखकर भारी मुनाफा।",
    careerImpactTe:
      "ఒకటి కంటే ఎక్కువ ఆదాయ మార్గాలు; సాంకేతికత, డిజిటల్ మీడియా, నెట్‌వర్కింగ్ మరియు వినోద రంగాలలో భారీ లాభాలు.",
    maritalImpactEn: "Outside acquaintances causing jealousy or friction in marital relationship.",
    maritalImpactHi: "मित्रों व सामाजिक संपर्कों के कारण वैवाहिक जीवन में अविश्वास या ईर्ष्या से बचाव रखें।",
    maritalImpactTe: "బయటి వ్యక్తులు లేదా స్నేహితుల వల్ల దాంపత్యంలో అసూయ లేదా అపార్థాలు తలెత్తకుండా జాగ్రత్త వహించండి.",
    healthImpactEn: "Memory strain, insomnia, ear problems, or digestive slowness.",
    healthImpactHi: "स्मृति पर तनाव, अनिद्रा अथवा कानों के विकार।",
    healthImpactTe: "జ్ఞాపకశక్తిపై ఒత్తిడి, నిద్రలేమి లేదా చెవుల సమస్యలు.",
    reliefAge: 35,
    silverLiningEn:
      "Immense networking skills, visionary multi-source wealth creation, and massive social following.",
    silverLiningHi: "विशाल सामाजिक प्रभाव, अद्भुत जनसंपर्क क्षमता तथा कई माध्यमों से धन कमाने की चतुराई।",
    silverLiningTe:
      "అద్భుతమైన నెట్‌వర్కింగ్ నైపుణ్యాలు, వినూత్న మార్గాల్లో సంపద సృష్టించే చాతుర్యం మరియు అపార ప్రజాదరణ.",
    specificRemedyEn: "Donate barley (Jau) or radish on Saturdays; recite Rahu Beej Mantra 108 times.",
    specificRemedyHi: "शनिवार को जौ अथवा मूली का दान करें; ॐ भ्रां भ्रीं भ्रौं सः राहवे नमः का १०८ बार जप करें।",
    specificRemedyTe: "శనివారం బార్లీ లేదా ముల్లంగిని దానం చేయండి; రాహు బీజ మంత్రం (ఓం భ్రాం భ్రీం భ్రౌం సః రాహవే నమః) 108 సార్లు జపించండి.",
  },
  12: {
    index: 12,
    id: "sheshnag",
    nameEn: "Sheshnag Kaal Sarp Yoga",
    nameHi: "शेषनाग काल सर्प योग",
    nameTe: "శేషనాగ కాల సర్ప యోగం",
    rahuHouse: 12,
    ketuHouse: 6,
    significanceEn:
      "Rahu in the 12th house (Expenses, Foreign Lands, Liberation) and Ketu in the 6th house (Enemies & Health). Heavy secret expenditures, restless nights, litigation from unknown adversaries, and overseas triumphs.",
    significanceHi:
      "राहु द्वादश भाव (व्यय, विदेश, मोक्ष) तथा केतु षष्ठ भाव में होते हैं। भारी गुप्त व्यय, अनिद्रा, गुप्त शत्रुओं से अदालती उलझनें तथा विदेश में जाकर प्रतिष्ठा।",
    significanceTe:
      "రాహువు 12వ భావం (వ్యయం, విదేశాలు, మోక్షం) మరియు కేతువు 6వ భావం (శత్రువులు & ఆరోగ్యం)లో ఉంటారు. రహస్య ఖర్చులు, నిద్రలేమి, తెలియని వ్యక్తుల నుండి వివాదాలు మరియు విదేశాలలో అద్భుత కీర్తి.",
    careerImpactEn:
      "Phenomenal triumphs in foreign countries, import-export, hospitals, spiritual ashrams, or multinational corporations.",
    careerImpactHi:
      "विदेश में, बहुराष्ट्रीय कंपनियों, चिकित्सालयों अथवा आध्यात्मिक संस्थानों में अपार ख्याति व समृद्धि।",
    careerImpactTe:
      "విదేశాలలో, బహుళజాతి సంస్థలలో, ఆసుపత్రులలో లేదా ఆధ్యాత్మిక సంస్థలలో అపార కీర్తి మరియు శాశ్వత సంపద.",
    maritalImpactEn: "Physical distance due to international assignments; requires unwavering emotional trust.",
    maritalImpactHi: "विदेश प्रवास अथवा स्थानांतरण के कारण दूरी; परस्पर अटूट विश्वास बनाए रखना आवश्यक।",
    maritalImpactTe: "విదేశీ ఉద్యోగాల వల్ల శారీరక దూరం; బలమైన పరస్పర నమ్మకాన్ని కాపాడుకోవడం ముఖ్యం.",
    healthImpactEn: "Insomnia, eye fatigue, foot pains, and lingering psychosomatic stress.",
    healthImpactHi: "अनिद्रा, नेत्र विकार, पैरों में दर्द व अकारण चिंताएं।",
    healthImpactTe: "నిద్రలేమి, కంటి అలసట, పాదాల నొప్పులు మరియు అకారణ ఆందోళనలు.",
    reliefAge: 42,
    silverLiningEn:
      "Supreme spiritual awakening, global citizenship, and lasting philanthropic impact worldwide.",
    silverLiningHi: "उच्च कोटि का आध्यात्मिक उत्थान, वैश्विक पहचान तथा समाज सेवा में अमर कीर्ति।",
    silverLiningTe:
      "ఉన్నత ఆధ్యాత్మిక జాగృతి, అంతర్జాతీయ గుర్తింపు మరియు సమాజ సేవలో శాశ్వత కీర్తి.",
    specificRemedyEn: "Keep a peacock feather in your bedroom; recite Mahamrityunjaya Mantra before sleep.",
    specificRemedyHi: "शयनकक्ष में सिरहाने मोरपंख रखें; रात्रि शयन से पूर्व ११ बार महामृत्युंजय मंत्र का जप करें।",
    specificRemedyTe: "పడకగదిలో నెమలి ఈకను ఉంచండి; రాత్రి నిద్రించే ముందు 11 సార్లు మహామృత్యుంజయ మంత్రం జపించండి.",
  },
};

/**
 * Analyzes whether all 7 classical planets are hemmed inside the Rahu-Ketu nodal axis
 */
export function analyzeKaalSarpDosha(chart: KundliChart): KaalSarpReport {
  const rahu = chart.planets.find((p) => p.id === "rahu");
  const ketu = chart.planets.find((p) => p.id === "ketu");

  const classicalPlanetIds = ["sun", "moon", "mars", "mercury", "jupiter", "venus", "saturn"];
  const classicalPlanets = chart.planets.filter((p) => classicalPlanetIds.includes(p.id));

  const rahuHouse = rahu ? rahu.house : 1;
  const ketuHouse = ketu ? ketu.house : 7;
  const rahuRashi = rahu ? rahu.rashiIndex : 0;
  const ketuRashi = ketu ? ketu.rashiIndex : 6;

  // Let's analyze angular placement relative to Rahu
  // In houses: houses can be traced clockwise from Rahu to Ketu
  // Count distance from Rahu in houses: (planetHouse - rahuHouse + 12) % 12
  // Side 1: distance 0 to 6 (Rahu house through Ketu house)
  // Side 2: distance 6 to 12 (Ketu house through Rahu house)

  let countSide1 = 0; // between Rahu and Ketu
  let countSide2 = 0; // between Ketu and Rahu

  const planetChecks: KaalSarpPlanetCheck[] = classicalPlanets.map((planet) => {
    const distFromRahu = (planet.house - rahuHouse + 12) % 12;
    if (distFromRahu > 0 && distFromRahu < 6) {
      countSide1++;
    } else if (distFromRahu > 6 && distFromRahu < 12) {
      countSide2++;
    } else if (distFromRahu === 0) {
      // Conjunct Rahu
      countSide1 += 0.5;
      countSide2 += 0.5;
    } else if (distFromRahu === 6) {
      // Conjunct Ketu
      countSide1 += 0.5;
      countSide2 += 0.5;
    }

    const planetId = planet.id;
    const nameTe = PLANET_NAMES_TE[planetId] || planet.name;
    return {
      id: planet.id,
      nameEn: planet.name,
      nameHi: planet.nameHi,
      nameTe,
      house: planet.house,
      degree: planet.formattedDegree,
      side: "hemmed", // temporary, set below
      distanceFromRahu: distFromRahu,
    };
  });

  // Evaluate if planets are concentrated on one side
  // Pure side check
  const side1Strict = classicalPlanets.filter((p) => {
    const d = (p.house - rahuHouse + 12) % 12;
    return d >= 0 && d <= 6;
  }).length;

  const side2Strict = classicalPlanets.filter((p) => {
    const d = (p.house - rahuHouse + 12) % 12;
    return d === 0 || d >= 6;
  }).length;

  const maxOnOneSide = Math.max(side1Strict, side2Strict);
  const isSide1Dominant = side1Strict >= side2Strict;

  const escapedPlanets: { id: string; nameEn: string; nameHi: string; nameTe: string; house: number }[] = [];

  for (const check of planetChecks) {
    const isHemmed = isSide1Dominant
      ? check.distanceFromRahu >= 0 && check.distanceFromRahu <= 6
      : check.distanceFromRahu === 0 || check.distanceFromRahu >= 6;

    if (isHemmed) {
      check.side = "hemmed";
    } else {
      check.side = "outside";
      escapedPlanets.push({
        id: check.id,
        nameEn: check.nameEn,
        nameHi: check.nameHi,
        nameTe: check.nameTe,
        house: check.house,
      });
    }
  }

  const planetsHemmedCount = classicalPlanets.length - escapedPlanets.length;
  const planetsOutsideCount = escapedPlanets.length;

  let hasKaalSarp = false;
  let type: KaalSarpType = "none";
  let typeLabelEn = "No Kaal Sarp Yoga (Dosha Mukta)";
  let typeLabelHi = "काल सर्प दोष रहित (दोष मुक्त)";
  let typeLabelTe = "కాల సర్ప దోష రహితం (దోష ముక్తి)";
  let direction: KaalSarpDirection = "neutral";
  let directionLabelEn = "None";
  let directionLabelHi = "कोई नहीं";
  let directionLabelTe = "ఏదీ లేదు";
  let yogaIndex: number | null = null;
  let yoga: KaalSarpYogaDefinition | null = null;

  if (planetsOutsideCount === 0) {
    hasKaalSarp = true;
    type = "purna";
    typeLabelEn = "Complete Kaal Sarp Yoga (Purna Kaal Sarp)";
    typeLabelHi = "पूर्ण काल सर्प योग";
    typeLabelTe = "పూర్ణ కాల సర్ప యోగం";
    yogaIndex = rahuHouse;
    yoga = KAAL_SARP_YOGAS[rahuHouse] || null;

    direction = isSide1Dominant ? "udit" : "anudit";
    directionLabelEn =
      direction === "udit"
        ? "Udit Gola (Ascending - Moving Toward Rahu's Mouth)"
        : "Anudit Gola (Descending - Moving Toward Ketu's Tail)";
    directionLabelHi =
      direction === "udit"
        ? "उदित गोला (आरोही - राहु के मुख की ओर)"
        : "अनुदित गोला (अवरोही - केतु की पूंछ की ओर)";
    directionLabelTe =
      direction === "udit"
        ? "ఉదిత గోళం (ఆరోహణ - రాహు ముఖం వైపు)"
        : "అనుదిత గోళం (అవరోహణ - కేతు పుచ్ఛం వైపు)";
  } else if (planetsOutsideCount === 1) {
    hasKaalSarp = true;
    type = "anshik";
    typeLabelEn = "Partial / Mild Kaal Sarp Yoga (Anshik / Ardha Kaal Sarp)";
    typeLabelHi = "आंशिक काल सर्प योग (अर्ध काल सर्प)";
    typeLabelTe = "ఆంశిక కాల సర్ప యోగం (అర్ధ కాల సర్పం)";
    yogaIndex = rahuHouse;
    yoga = KAAL_SARP_YOGAS[rahuHouse] || null;

    direction = isSide1Dominant ? "udit" : "anudit";
    directionLabelEn =
      direction === "udit"
        ? "Udit Gola (Ascending Partial)"
        : "Anudit Gola (Descending Partial)";
    directionLabelHi =
      direction === "udit"
        ? "उदित गोला (आंशिक आरोही)"
        : "अनुदित गोला (आंशिक अवरोही)";
    directionLabelTe =
      direction === "udit"
        ? "ఉదిత గోళం (ఆంశిక ఆరోహణ)"
        : "అనుదిత గోళం (ఆంశిక అవరోహణ)";
  } else {
    hasKaalSarp = false;
    type = "none";
  }

  let summaryEn = "";
  let summaryHi = "";
  let summaryTe = "";

  if (type === "purna" && yoga) {
    summaryEn = `Your chart forms ${yoga.nameEn} (${directionLabelEn}). All 7 classical planets are hemmed within the Rahu-Ketu axis. While early life may require perseverance and resilience, this yoga often propels individuals to extraordinary heights and high acclaim around age ${yoga.reliefAge}.`;
    summaryHi = `आपकी जन्म कुंडली में ${yoga.nameHi} (${directionLabelHi}) निर्मित हो रहा है। सभी ७ ग्रह राहु-केतु अक्ष के भीतर स्थित हैं। यद्यपि आरंभिक जीवन में परिश्रम व धैर्य की परीक्षा होती है, परंतु ${yoga.reliefAge} वर्ष की आयु के पश्चात यह योग असाधारण प्रगति व प्रतिष्ठा प्रदान करता है।`;
    summaryTe = `మీ జన్మ కుండలిలో ${yoga.nameTe} (${directionLabelTe}) ఏర్పడింది. మొత్తం 7 ప్రధాన గ్రహాలు రాహు-కేతు అక్షం లోపలే బంధించబడి ఉన్నాయి. ప్రారంభ జీవితంలో కష్టాలు, సవాళ్లు ఎదురైనప్పటికీ, ${yoga.reliefAge} సంవత్సరాల వయస్సు తర్వాత ఈ యోగం అసాధారణ పురోగతి, ఉన్నత అధికారం మరియు విస్తృత ప్రజాదరణను ప్రసాదిస్తుంది.`;
  } else if (type === "anshik" && yoga) {
    const escaped = escapedPlanets.map((p) => p.nameEn).join(", ");
    const escapedHi = escapedPlanets.map((p) => p.nameHi).join(", ");
    const escapedTe = escapedPlanets.map((p) => p.nameTe).join(", ");
    summaryEn = `Your chart forms Partial ${yoga.nameEn}. Planet ${escaped} is situated outside the nodal axis, breaking the complete enclosure. This creates only mild or intermittent karmic effects, largely mitigated by your positive efforts.`;
    summaryHi = `आपकी कुंडली में आंशिक ${yoga.nameHi} है। ${escapedHi} ग्रह राहु-केतु अक्ष से बाहर है, जिससे पूर्ण दोष का भंग हो जाता है। इसका प्रभाव अति सौम्य रहता है और सामान्य उपायों से पूर्ण शांति रहती है।`;
    summaryTe = `మీ కుండలిలో ఆంశిక ${yoga.nameTe} ఏర్పడింది. ${escapedTe} గ్రహం రాహు-కేతు అక్షం వెలుపల ఉండటం వల్ల పూర్తి బంధనం తొలగిపోయింది. దీని ప్రభావం అత్యంత స్వల్పంగా ఉంటుంది మరియు సాధారణ వైదిక పరిహారాలతో సులభంగా అనుకూలత లభిస్తుంది.`;
  } else {
    summaryEn =
      "Auspicious alignment! Your birth chart is completely free of Kaal Sarp Yoga. The planets are evenly distributed on both sides of the Rahu-Ketu nodal axis, allowing free flow of career and personal fortune.";
    summaryHi =
      "शुभ योग! आपकी जन्म कुंडली काल सर्प दोष से पूर्णतः मुक्त है। ग्रह राहु-केतु अक्ष के दोनों ओर संतुलित रूप से स्थित हैं, जिससे जीवन में निर्बाध उन्नति व सफलता का मार्ग प्रशस्त रहता है।";
    summaryTe =
      "శుభ సంకేతం! మీ జన్మ కుండలిలో కాల సర్ప దోషం లేదు (దోష ముక్తి). గ్రహాలు రాహు-కేతు అక్షం యొక్క రెండు వైపులా సమతుల్యంగా విస్తరించి ఉన్నాయి, తద్వారా మీ జీవితంలో విజయానికి, ఉన్నతికి ఆటంకాలు లేకుండా అనుకూలత లభిస్తుంది.";
  }

  // Universal authentic remedies
  const remedies = [
    {
      titleEn: "Maha Mrityunjaya Mantra Japa (108 times daily)",
      titleHi: "महामृत्युंजय मंत्र का नित्य १०८ बार जप",
      titleTe: "నిత్యం 108 సార్లు మహామృత్యుంజయ మంత్ర జపం",
      descriptionEn:
        "Lord Shiva is the ultimate conqueror of time (Maha Kaal) and master of the serpent King Vasuki. Chanting the Maha Mrityunjaya Mantra with a Rudraksha mala dissolves negative karmic knots and bestows protective energy.",
      descriptionHi:
        "भगवान शिव महाकाल हैं और काल सर्प के समस्त दुष्प्रभावों के संहारक हैं। नित्य रुद्राक्ष माला से महामृत्युंजय मंत्र का १०८ बार जप करने से अभय व आरोग्य की प्राप्ति होती है।",
      descriptionTe:
        "పరమశివుడు కాలాతీతుడైన మహాకాలుడు మరియు సర్పరాజైన వాసుకికి నాథుడు. రుద్రాక్ష మాలతో నిత్యం 108 సార్లు మహామృత్యుంజయ మంత్రాన్ని జపించడం వల్ల సమస్త సర్ప దోషాల ప్రభావాలు తొలగిపోయి అభయం, ఆరోగ్యం లభిస్తాయి.",
      mantra: "ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्। उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय माऽमृतात्॥",
    },
    {
      titleEn: "Nag Panchami Sacred Offering (Silver Snake Pair)",
      titleHi: "नागपंचमी पर चांदी के नाग-नागिन का पूजन व विसर्जन",
      titleTe: "నాగపంచమి నాడు వెండి నాగ ప్రతిమల పూజ & విసర్జన",
      descriptionEn:
        "On the auspicious tithi of Nag Panchami (or any Shukla Paksha Panchami), offering milk to a Shiva Lingam and immersing a small silver pair of Nag-Nagin in holy flowing water with devotion.",
      descriptionHi:
        "नागपंचमी अथवा किसी भी शुक्ल पक्ष की पंचमी तिथि पर शिवलिंग पर कच्चा दूध अर्पित करें तथा चांदी के छोटे नाग-नागिन के जोड़े का विधिपूर्वक पूजन कर पवित्र बहते जल में प्रवाहित करें।",
      descriptionTe:
        "నాగపంచమి లేదా ఏదైనా శుక్ల పక్ష పంచమి నాడు శివలింగానికి పచ్చి పాలు సమర్పించి, చిన్న వెండి నాగ-నాగిని జంటను పూజించి పవిత్ర ప్రవహించే నదీ జలాలలో భక్తితో సమర్పించండి.",
    },
    {
      titleEn: "Trimbakeshwar / Srikalahasti Rudrabhisheka",
      titleHi: "त्र्यंबकेश्वर अथवा श्रीकालहस्ती में रुद्राभिषेक",
      titleTe: "శ్రీకాళహస్తి లేదా త్రయంబకేశ్వర్ క్షేత్రంలో రుద్రాభిషేకం",
      descriptionEn:
        "Visiting Jyotirlinga Trimbakeshwar (Nashik) or Rahu-Ketu Kshetra Srikalahasti (Andhra Pradesh) to perform a classical Shanti Sankalp yagya once in a lifetime.",
      descriptionHi:
        "जीवन में एक बार द्वादश ज्योतिर्लिंग श्री त्र्यंबकेश्वर (नासिक) अथवा राहु-केतु पीठ श्रीकालहस्ती में विधि-विधान से काल सर्प शांति अनुष्ठान शास्त्रसम्मत व परम फलदायी है।",
      descriptionTe:
        "ఆంధ్రప్రదేశ్‌లోని ప్రముఖ రాహు-కేతు క్షేత్రమైన శ్రీకాళహస్తి లేదా మహారాష్ట్ర నాసిక్ లోని జ్యోతిర్లింగ క్షేత్రమైన త్రయంబకేశ్వర్ దర్శించి కాలసర్ప దోష నివారణ పూజ లేదా రుద్రాభిషేకం చేయించుకోవడం అత్యంత శ్రేష్ఠం.",
    },
    {
      titleEn: "Rahu & Ketu Vedic Beej Mantras",
      titleHi: "राहु व केतु के वैदिक बीज मंत्र",
      titleTe: "రాహు & కేతు వైదిక బీజ మంత్రాల జపం",
      descriptionEn:
        "Chanting Rahu Beej Mantra in the evening and Ketu Beej Mantra in the morning harmonizes the shadow nodes and turns their malefic obsession into spiritual wisdom.",
      descriptionHi:
        "सायंकाल राहु मंत्र तथा प्रातः केतु मंत्र का जप करने से छाया ग्रह शांत होकर सकारात्मक बुद्धि व गुप्त ज्ञान प्रदान करते हैं।",
      descriptionTe:
        "సాయంత్రం రాహు బీజ మంత్రం మరియు ఉదయం కేతు బీజ మంత్రం జపించడం వల్ల ఛాయాగ్రహాల తీవ్రత తగ్గి జ్ఞానం, మానసిక స్పష్టత మరియు స్థిరత్వం లభిస్తాయి.",
      mantra: "రాహు: ॐ భ్రాం భ్రీం భ్రౌం సః రాహవే నమః | కేతు: ॐ స్రాం స్రీం స్రౌం సః కేతవే నమః",
    },
    {
      titleEn: "Keep a Sacred Peacock Feather (Mayur Pankh)",
      titleHi: "शयनकक्ष अथवा अध्ययन कक्ष में मोरपंख रखना",
      titleTe: "పడకగది లేదా పూజా గదిలో పవిత్ర నెమలి ఈకను ఉంచడం",
      descriptionEn:
        "Serpents naturally revere and yield before the peacock. Keeping a clean, vibrant peacock feather in your study, bedroom, or prayer altar neutralizes subtle negative planetary vibrations.",
      descriptionHi:
        "मोर सर्प का प्राकृतिक शत्रु व नियंत्रक है। अपने पूजा स्थल अथवा शयनकक्ष के सिरहाने मोरपंख रखने से नकारात्मक तरंगे व दुःस्वप्न स्वतः समाप्त हो जाते हैं।",
      descriptionTe:
        "నెమలిని చూడగానే సర్పాలు శాంతిస్తాయి. మీ అధ్యయన గదిలో, పూజా మందిరంలో లేదా పడకగదిలో పరిశుభ్రమైన నెమలి ఈకను ఉంచడం వల్ల ప్రతికూల కంపనాలు మరియు పీడకలలు తొలగిపోతాయి.",
    },
  ];

  return {
    hasKaalSarp,
    type,
    typeLabelEn,
    typeLabelHi,
    typeLabelTe,
    direction,
    directionLabelEn,
    directionLabelHi,
    directionLabelTe,
    yogaIndex,
    yoga,
    rahuPlacement: {
      house: rahuHouse,
      rashiIndex: rahuRashi,
      rashiName: RASHI_NAMES[rahuRashi],
      rashiNameHi: RASHI_NAMES_HI[rahuRashi],
      rashiNameTe: RASI_NAMES_TE[rahuRashi],
      degree: rahu ? rahu.formattedDegree : "0° 00'",
    },
    ketuPlacement: {
      house: ketuHouse,
      rashiIndex: ketuRashi,
      rashiName: RASHI_NAMES[ketuRashi],
      rashiNameHi: RASHI_NAMES_HI[ketuRashi],
      rashiNameTe: RASI_NAMES_TE[ketuRashi],
      degree: ketu ? ketu.formattedDegree : "0° 00'",
    },
    planetsHemmedCount,
    planetsOutsideCount,
    escapedPlanets,
    planetChecks,
    summaryEn,
    summaryHi,
    summaryTe,
    remedies,
  };
}

/**
 * Convenience helper to calculate Kaal Sarp report directly from birth details
 */
export function analyzeKaalSarpFromBirth(birth: BirthDetails): KaalSarpReport {
  const chart = calculateKundli(birth);
  return analyzeKaalSarpDosha(chart);
}
