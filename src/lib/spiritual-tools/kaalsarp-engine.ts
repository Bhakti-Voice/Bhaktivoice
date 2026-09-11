import type { BirthDetails, KundliChart, PlanetPosition } from "./types";
import { calculateKundli } from "./kundli";

export type KaalSarpType = "purna" | "anshik" | "none";
export type KaalSarpDirection = "udit" | "anudit" | "neutral";

export interface KaalSarpYogaDefinition {
  index: number; // 1 to 12
  id: string;
  nameEn: string;
  nameHi: string;
  rahuHouse: number;
  ketuHouse: number;
  significanceEn: string;
  significanceHi: string;
  careerImpactEn: string;
  careerImpactHi: string;
  maritalImpactEn: string;
  maritalImpactHi: string;
  healthImpactEn: string;
  healthImpactHi: string;
  reliefAge: number;
  silverLiningEn: string;
  silverLiningHi: string;
  specificRemedyEn: string;
  specificRemedyHi: string;
}

export interface KaalSarpPlanetCheck {
  id: string;
  nameEn: string;
  nameHi: string;
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
  direction: KaalSarpDirection;
  directionLabelEn: string;
  directionLabelHi: string;
  yogaIndex: number | null; // 1 to 12 if active
  yoga: KaalSarpYogaDefinition | null;
  rahuPlacement: {
    house: number;
    rashiIndex: number;
    rashiName: string;
    rashiNameHi: string;
    degree: string;
  };
  ketuPlacement: {
    house: number;
    rashiIndex: number;
    rashiName: string;
    rashiNameHi: string;
    degree: string;
  };
  planetsHemmedCount: number;
  planetsOutsideCount: number;
  escapedPlanets: { id: string; nameEn: string; nameHi: string; house: number }[];
  planetChecks: KaalSarpPlanetCheck[];
  summaryEn: string;
  summaryHi: string;
  remedies: {
    titleEn: string;
    titleHi: string;
    descriptionEn: string;
    descriptionHi: string;
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

export const KAAL_SARP_YOGAS: Record<number, KaalSarpYogaDefinition> = {
  1: {
    index: 1,
    id: "anant",
    nameEn: "Anant Kaal Sarp Yoga",
    nameHi: "अनंत काल सर्प योग",
    rahuHouse: 1,
    ketuHouse: 7,
    significanceEn:
      "Rahu occupies the 1st house (Self/Lagna) and Ketu is in the 7th house (Partnership/Marriage). Creates intense personal ambition, early identity struggles, delayed recognition, and tests in marital patience.",
    significanceHi:
      "राहु लग्न (प्रथम भाव) में तथा केतु सप्तम भाव में स्थित होते हैं। जातक में असाधारण महत्वाकांक्षा, आरंभिक जीवन में पहचान का संघर्ष तथा वैवाहिक संबंधों में धैर्य की परीक्षा रहती है।",
    careerImpactEn:
      "Struggles and frequent shifts in career early on, followed by extraordinary sudden rise, authority, and mass leadership after age 28–33.",
    careerImpactHi:
      "आरंभिक करियर में अस्थिरता व विलंब, परंतु २८ से ३३ वर्ष की आयु के पश्चात अचानक असाधारण उन्नति, उच्च पद व सामाजिक प्रभाव प्राप्त होता है।",
    maritalImpactEn:
      "Ego clashes with spouse and marriage delays; requires transparent communication and mutual space.",
    maritalImpactHi:
      "जीवनसाथी के साथ वैचारिक मतभेद अथवा विवाह में विलंब की संभावना; समझदारी व सामंजस्य आवश्यक है।",
    healthImpactEn: "Mental stress, restlessness, migraines, or sleep irregularities in youth.",
    healthImpactHi: "मानसिक अशांति, अनिद्रा, सिरदर्द अथवा बेचैनी की प्रवृत्ति।",
    reliefAge: 33,
    silverLiningEn:
      "Individuals with Anant Kaal Sarp Yoga often possess brilliant minds and become revolutionary founders, statesmen, or celebrated creators.",
    silverLiningHi:
      "इस योग के जातक अत्यंत तीक्ष्ण बुद्धि के धनी होते हैं तथा समाज में युगांतरकारी नेतृत्व या विशिष्ट कीर्ति स्थापित करते हैं।",
    specificRemedyEn: "Chant Maha Mrityunjaya Mantra 108 times daily; donate black sesame seeds on Saturdays.",
    specificRemedyHi: "नित्य १०८ बार महामृत्युंजय मंत्र का जप करें तथा शनिवार को काले तिल का दान करें।",
  },
  2: {
    index: 2,
    id: "kulik",
    nameEn: "Kulik Kaal Sarp Yoga",
    nameHi: "कुलिक काल सर्प योग",
    rahuHouse: 2,
    ketuHouse: 8,
    significanceEn:
      "Rahu in the 2nd house (Wealth & Family) and Ketu in the 8th house (Longevity & Sudden Events). Financial ups and downs, harsh speech tendencies, and ancestral inheritance challenges.",
    significanceHi:
      "राहु द्वितीय भाव (धन व कुटुंब) और केतु अष्टम भाव (आयु व गुप्त धन) में स्थित होते हैं। धन के संचय में उतार-चढ़ाव, कुटुंब में मतभेद व पैतृक संपत्ति में बाधाएं आ सकती हैं।",
    careerImpactEn:
      "Fluctuations in savings and speculative ventures early in life; immense wealth creation through innovative or unconventional business after age 36.",
    careerImpactHi:
      "आरंभ में धन संचय में बाधाएं; ३६ वर्ष के उपरांत नवीन व आधुनिक व्यापार अथवा विशेषज्ञता के माध्यम से विपुल धन संपदा।",
    maritalImpactEn:
      "In-laws misunderstandings and friction caused by hasty speech. Cultivating gentle speech brings lasting harmony.",
    maritalImpactHi: "ससुराल पक्ष से मतभेद तथा कटु वाणी से मनमुटाव; मधुर वाणी रखने से शांति बनी रहती है।",
    healthImpactEn: "Teeth, throat, eye strain, or sudden digestion issues.",
    healthImpactHi: "मुख, दंत, गले के विकार अथवा अचानक पाचन संबंधी असंतुलन।",
    reliefAge: 36,
    silverLiningEn:
      "Sharp oratory skills, financial acumen, and high resilience under extreme pressure.",
    silverLiningHi:
      "अद्भुत वाकपटुता, वित्तीय समझ तथा कठिनतम परिस्थितियों में भी पुनः खड़े होने का अपार आत्मबल।",
    specificRemedyEn: "Keep a silver coin or ball in your wallet; feed birds daily with multi-grains.",
    specificRemedyHi: "अपनी जेब या पर्स में चांदी की ठोस गोली रखें; नित्य पक्षियों को सप्तधान्य खिलाएं।",
  },
  3: {
    index: 3,
    id: "vasuki",
    nameEn: "Vasuki Kaal Sarp Yoga",
    nameHi: "वासुकी काल सर्प योग",
    rahuHouse: 3,
    ketuHouse: 9,
    significanceEn:
      "Rahu in the 3rd house (Courage & Siblings) and Ketu in the 9th house (Fortune & Dharma). High bravery, friction with siblings or close peers, and sudden shifts in belief systems.",
    significanceHi:
      "राहु तृतीय भाव (पराक्रम व भाई-बहन) तथा केतु नवम भाव (भाग्य व धर्म) में होते हैं। जातक में अदम्य साहस होता है, परंतु भाई-बहनों से मतभेद व भाग्य में विलंब संभव है।",
    careerImpactEn:
      "Great success in media, writing, sports, sales, technology, or entrepreneurship through sheer self-made effort.",
    careerImpactHi:
      "मीडिया, लेखन, खेल, आईटी व स्वरोजगार में स्वतः के पराक्रम के बल पर महान सफलता प्राप्त होती है।",
    maritalImpactEn: "Generally favorable; minor distance due to frequent business travels.",
    maritalImpactHi: "वैवाहिक जीवन प्रायः सामान्य; अत्यधिक यात्राओं के कारण कभी-कभी दूरी।",
    healthImpactEn: "Blood pressure fluctuations, shoulder, arm, or ear sensitivities.",
    healthImpactHi: "कंधे, बांह अथवा कानों में संवेदनशीलता व रक्तचाप में उतार-चढ़ाव।",
    reliefAge: 32,
    silverLiningEn:
      "Unmatched entrepreneurial guts; does not depend on ancestral help and crafts their own empire.",
    silverLiningHi:
      "किसी के सहारे के बिना शून्य से शिखर तक अपना साम्राज्य स्वयं स्थापित करने की अद्वितीय क्षमता।",
    specificRemedyEn: "Wear a 3-faced (Teen Mukhi) Rudraksha; chant Hanuman Chalisa daily morning and evening.",
    specificRemedyHi: "तीन मुखी रुद्राक्ष धारण करें तथा प्रातः व सायं श्री हनुमान चालीसा का पाठ करें।",
  },
  4: {
    index: 4,
    id: "shankhpal",
    nameEn: "Shankhpal Kaal Sarp Yoga",
    nameHi: "शंखपाल काल सर्प योग",
    rahuHouse: 4,
    ketuHouse: 10,
    significanceEn:
      "Rahu in the 4th house (Mother, Home, Land) and Ketu in the 10th house (Karma & Profession). Domestic restlessness, concerns regarding mother's health, and frequent career relocations.",
    significanceHi:
      "राहु चतुर्थ भाव (सुख, माता, भूमि) तथा केतु दशम भाव (कर्म, पद) में स्थित होते हैं। घरेलू सुख में कमी, माता के स्वास्थ्य की चिंता तथा कार्यक्षेत्र में बार-बार परिवर्तन।",
    careerImpactEn:
      "Professional hurdles and political obstacles until age 36; later establishes profound authority in real estate, management, or government.",
    careerImpactHi:
      "३६ वर्ष तक कार्यक्षेत्र में विरोध व संघर्ष; तदुपरांत भूमि, भवन, निर्माण अथवा शासन-प्रशासन में स्थायी प्रतिष्ठा।",
    maritalImpactEn: "Interference by external relatives in family life; requiring healthy boundaries.",
    maritalImpactHi: "पारिवारिक मामलों में बाहरी व्यक्तियों का हस्तक्षेप; निजी जीवन में सीमाएं तय करना आवश्यक।",
    healthImpactEn: "Chest congestion, respiratory issues, or anxiety related to home affairs.",
    healthImpactHi: "हृदय अथवा श्वसन संबंधी संवेदनशीलता व मानसिक अशांति।",
    reliefAge: 36,
    silverLiningEn:
      "Exceptional emotional depth, protective nature toward family, and unmatched ability to rebuild homes and assets.",
    silverLiningHi: "गहन भावनात्मक संवेदनशीलता तथा संकट के समय परिवार को ढाल बनकर सुरक्षित रखने की क्षमता।",
    specificRemedyEn: "Offer raw milk and white flowers to a Shiva Lingam on Mondays; honor mother daily.",
    specificRemedyHi: "सोमवार को शिवलिंग पर कच्चा दूध व सफेद फूल अर्पित करें; प्रतिदिन माता के चरण स्पर्श करें।",
  },
  5: {
    index: 5,
    id: "padma",
    nameEn: "Padma Kaal Sarp Yoga",
    nameHi: "पद्म काल सर्प योग",
    rahuHouse: 5,
    ketuHouse: 11,
    significanceEn:
      "Rahu in the 5th house (Intellect, Education, Children) and Ketu in the 11th house (Gains & Network). Obstacles in higher education, delays in progeny, and speculative investment volatility.",
    significanceHi:
      "राहु पंचम भाव (बुद्धि, संतान, विद्या) तथा केतु एकादश भाव (लाभ व मित्र) में होते हैं। उच्च शिक्षा में रुकावट, संतान प्राप्ति में विलंब तथा सट्टेबाजी से हानि का भय।",
    careerImpactEn:
      "Brilliant creative genius and innovation; supreme achievements in research, arts, philosophy, or analytics after initial academic twists.",
    careerImpactHi:
      "अद्वितीय सृजनात्मक प्रतिभा; आरंभिक शैक्षणिक अड़चनों के बाद शोध, कला, परामर्श अथवा प्रौद्योगिकी में ऐतिहासिक सफलता।",
    maritalImpactEn: "Emotional misunderstandings regarding children or parental expectations.",
    maritalImpactHi: "संतान संबंधित चिंताएं अथवा दांपत्य में भावनात्मक अपेक्षाओं का असंतुलन।",
    healthImpactEn: "Stomach, liver, digestion, and stress-induced acidity.",
    healthImpactHi: "उदर विकार, गैस, एसिडिटी व पाचन संबंधी संवेदनशीलता।",
    reliefAge: 38,
    silverLiningEn:
      "Profound intuitive foresight, exceptional storytelling or coding talents, and immense eventual fame.",
    silverLiningHi: "तीक्ष्ण अंतर्ज्ञान, भविष्य को भांपने की क्षमता तथा अपनी विशिष्ट बौद्धिक प्रतिभा से जगप्रसिद्ध होना।",
    specificRemedyEn: "Recite Saraswati Stotram daily; plant a Bel or Peepal tree in a temple courtyard.",
    specificRemedyHi: "नित्य सरस्वती स्तोत्र का पाठ करें तथा किसी धार्मिक स्थल पर बेल अथवा पीपल का वृक्ष लगाएं।",
  },
  6: {
    index: 6,
    id: "mahapadma",
    nameEn: "Mahapadma Kaal Sarp Yoga",
    nameHi: "महापद्म काल सर्प योग",
    rahuHouse: 6,
    ketuHouse: 12,
    significanceEn:
      "Rahu in the 6th house (Enemies, Debts, Litigation) and Ketu in the 12th house (Expenses & Foreign Lands). Bitter rivalry with secret opponents, health disputes, and unexpected expenditures.",
    significanceHi:
      "राहु षष्ठ भाव (शत्रु, रोग, ऋण) तथा केतु द्वादश भाव (व्यय, मोक्ष) में होते हैं। गुप्त शत्रुओं से विरोध, अदालती उलझनें तथा अनावश्यक व्यय का सामना करना पड़ सकता है।",
    careerImpactEn:
      "Absolute triumph over competition, litigation, and political rivals. Highly favorable for lawyers, doctors, defense personnel, and competitive examinations.",
    careerImpactHi:
      "शत्रुओं व विरोधियों पर पूर्ण विजय; वकालत, चिकित्सा, सेना, पुलिस व प्रतियोगी परीक्षाओं में सर्वोच्च सफलता।",
    maritalImpactEn: "Minor health concerns of spouse or foreign postings causing physical separation.",
    maritalImpactHi: "जीवनसाथी का स्वास्थ्य अथवा विदेश यात्राओं के कारण अल्पकालिक दूरी।",
    healthImpactEn: "Lower abdominal issues, kidney sensitivities, or foot ailments.",
    healthImpactHi: "कमर, गुर्दे अथवा पैरों में संवेदनशीलता।",
    reliefAge: 36,
    silverLiningEn:
      "Shatru Hanta (Crusher of all enemies); gains immense wealth and international success through overseas ventures.",
    silverLiningHi:
      "शत्रुहंता योग; विपरीत परिस्थितियों को अवसर में बदलकर विदेश अथवा सुदूर स्थानों से अपार धनार्जन।",
    specificRemedyEn: "Feed stray dogs with bread/roti; chant Bhairav Stotra on Tuesday or Saturday nights.",
    specificRemedyHi: "काले श्वान (कुत्ते) को मीठी रोटी खिलाएं तथा शनिवार को भैरव स्तोत्र का पाठ करें।",
  },
  7: {
    index: 7,
    id: "takshak",
    nameEn: "Takshak Kaal Sarp Yoga",
    nameHi: "तक्षक काल सर्प योग",
    rahuHouse: 7,
    ketuHouse: 1,
    significanceEn:
      "Rahu in the 7th house (Marriage & Partnerships) and Ketu in the 1st house (Ascendant). Strong business instincts alongside serious marital delays, spouse temper conflicts, or partnership betrayals.",
    significanceHi:
      "राहु सप्तम भाव (विवाह व साझेदारी) तथा केतु प्रथम भाव में होते हैं। व्यापारिक तीक्ष्णता के साथ-साथ विवाह में विलंब, जीवनसाथी के स्वभाव में उग्रता अथवा व्यापारिक साझेदारों से धोखा।",
    careerImpactEn:
      "Phenomenal business acumen, mastery of negotiations and foreign contracts after initial partnership breakdowns.",
    careerImpactHi:
      "साझेदारी के आरंभिक कड़वे अनुभवों के उपरांत स्वतंत्र व्यापार, आयात-निर्यात व विदेशी अनुबंधों में असाधारण सफलता।",
    maritalImpactEn:
      "Significant marital hurdles; demands total spiritual maturity, patience, and non-possessiveness.",
    maritalImpactHi:
      "दांपत्य में सर्वाधिक सजगता की आवश्यकता; जीवनसाथी को स्वतंत्रता व सम्मान देने से ही सुखद संबंध संभव।",
    healthImpactEn: "Skin sensitivities, reproductive health checks, and mental overthinking.",
    healthImpactHi: "त्वचा विकार, वात रोग तथा अत्यधिक चिंता से उत्पन्न शारीरिक शिथिलता।",
    reliefAge: 40,
    silverLiningEn:
      "Deeply magnetic personality, master negotiator, and capable of charming tough international clients.",
    silverLiningHi: "आकर्षक व्यक्तित्व, कुशल वार्ताकार तथा कठिन से कठिन व्यक्ति को अपने पक्ष में करने की कला।",
    specificRemedyEn: "Perform Rudrabhishek at a Jyotirlinga (Trimbakeshwar/Ujjain); keep peacock feathers in home.",
    specificRemedyHi: "त्र्यंबकेश्वर अथवा उज्जैन में रुद्राभिषेक कराएं; शयनकक्ष में मोरपंख स्थापित करें।",
  },
  8: {
    index: 8,
    id: "karkotak",
    nameEn: "Karkotak Kaal Sarp Yoga",
    nameHi: "कर्कोटक काल सर्प योग",
    rahuHouse: 8,
    ketuHouse: 2,
    significanceEn:
      "Rahu in the 8th house (Occult, Transformation, Longevity) and Ketu in the 2nd house (Speech & Wealth). Sudden life twists, hidden wealth gains, ancestral inheritance disputes, and accidents risk.",
    significanceHi:
      "राहु अष्टम भाव (आयु, गुप्त विद्या, संकट) तथा केतु द्वितीय भाव में होते हैं। जीवन में अप्रत्याशित घटनाएं, गुप्त धन की प्राप्ति, पैतृक संपत्ति में विवाद व आकस्मिक चोट का भय।",
    careerImpactEn:
      "Unmatched prowess in research, astrology, cybersecurity, mining, surgery, or deep investigative professions.",
    careerImpactHi:
      "शोध, ज्योतिष, गुप्तचर, साइबर सुरक्षा, सर्जरी व खनन के क्षेत्र में अद्भुत ख्याति व सफलता।",
    maritalImpactEn: "Financial secretiveness between partners; requires honesty regarding investments.",
    maritalImpactHi: "धन व वित्तीय मामलों में पारदर्शिता की कमी से तनाव; सत्यनिष्ठ संवाद आवश्यक।",
    healthImpactEn: "Accident vulnerability, chronic illness flare-ups, and sudden vitality drops.",
    healthImpactHi: "वाहन सावधानीपूर्वक चलाएं; मौसमी व गुप्त रोगों से बचाव रखें।",
    reliefAge: 42,
    silverLiningEn:
      "Profound mastery of occult and hidden sciences; possesses miraculous survival power in any adversity.",
    silverLiningHi: "अदृश्य विद्याओं व गूढ़ रहस्यों के ज्ञाता; घोर विपत्ति से भी सुरक्षित बाहर निकलने की ईश्वरीय कृपा।",
    specificRemedyEn: "Donate copper vessels filled with mustard oil (Chhaya Daan) on Saturdays; feed ants daily.",
    specificRemedyHi: "शनिवार को कांसे या तांबे के पात्र में तेल डालकर छाया दान करें; चींटियों को आटा व शक्कर डालें।",
  },
  9: {
    index: 9,
    id: "shankhachur",
    nameEn: "Shankhachur (Shankhadhar) Kaal Sarp Yoga",
    nameHi: "शंखचूड़ (शंखधार) काल सर्प योग",
    rahuHouse: 9,
    ketuHouse: 3,
    significanceEn:
      "Rahu in the 9th house (Fortune, Dharma, Father) and Ketu in the 3rd house (Effort & Younger Siblings). Fluctuating fortune, strained relations with father or mentors, and crisis of faith in youth.",
    significanceHi:
      "राहु नवम भाव (भाग्य, धर्म, पिता) तथा केतु तृतीय भाव में होते हैं। भाग्य में अचानक उतार-चढ़ाव, पिता के साथ वैचारिक असहमति तथा युवावस्था में धार्मिक संशय।",
    careerImpactEn:
      "Delayed destiny till age 36; extraordinary success thereafter in law, higher academia, spiritual preaching, or global consulting.",
    careerImpactHi:
      "३६ वर्ष तक भाग्य का कम साथ; तदुपरांत विधि, उच्च शिक्षा, धर्म प्रचार अथवा वैश्विक सलाहकार के रूप में सर्वोच्च प्रतिष्ठा।",
    maritalImpactEn: "Generally stable; minor differences regarding religious or philosophical values.",
    maritalImpactHi: "वैवाहिक जीवन संतुलित; धार्मिक विचारों व जीवन मूल्यों में भिन्नता संभव।",
    healthImpactEn: "Thigh, hip, and joint sensitivities; nervous system exhaustion from overwork.",
    healthImpactHi: "कमर, जांघों व जोड़ों में दर्द अथवा अत्यधिक मानसिक श्रम से थकावट।",
    reliefAge: 36,
    silverLiningEn:
      "Creates profound philosophers, spiritual reformers, and visionaries who redefine cultural norms.",
    silverLiningHi:
      "महान दार्शनिक, समाज सुधारक व युगांतकारी चिंतक बनने का योग जो समाज को नई दिशा प्रदान करते हैं।",
    specificRemedyEn: "Respect father and spiritual gurus; chant Shiva Panchakshara Stotra daily.",
    specificRemedyHi: "पिता व गुरुजनों का सम्मान करें; प्रतिदिन शिव पंचाक्षर स्तोत्र (नागेंद्रहाराय...) का पाठ करें।",
  },
  10: {
    index: 10,
    id: "ghatak",
    nameEn: "Ghatak Kaal Sarp Yoga",
    nameHi: "घातक काल सर्प योग",
    rahuHouse: 10,
    ketuHouse: 4,
    significanceEn:
      "Rahu in the 10th house (Karma, Fame, Authority) and Ketu in the 4th house (Inner Peace & Domestic Life). High career ambitions, office politics, scrutiny by superiors, and domestic sacrifices.",
    significanceHi:
      "राहु दशम भाव (कर्म, प्रतिष्ठा, राजपद) तथा केतु चतुर्थ भाव में होते हैं। कार्यक्षेत्र में तीव्र महत्वाकांक्षा, उच्चाधिकारियों से संघर्ष तथा कार्य व्यस्तता के कारण घरेलू सुख का त्याग।",
    careerImpactEn:
      "Extremely ambitious and hardworking; faces political sabotage early on, but attains supreme political, bureaucratic, or corporate power after age 42.",
    careerImpactHi:
      "आरंभ में षड्यंत्र व पद से विमुखता; परंतु ४२ वर्ष के उपरांत राजनीति, शासन अथवा बहुराष्ट्रीय निगमों में सर्वोच्च शक्ति।",
    maritalImpactEn: "Lack of time for spouse due to 24/7 career obsession; demands work-life harmony.",
    maritalImpactHi: "काम की अत्यधिक व्यस्तता से जीवनसाथी की उपेक्षा; पारिवारिक सामंजस्य की आवश्यकता।",
    healthImpactEn: "High blood pressure, stress headaches, and knee sensitivities.",
    healthImpactHi: "रक्तचाप, कार्य तनाव व घुटनों में संवेदनशीलता।",
    reliefAge: 42,
    silverLiningEn:
      "Unstoppable professional drive; individuals with Ghatak Yoga often leave monumental legacies and public institutions.",
    silverLiningHi:
      "अदम्य कर्मठता; इतिहास में अपनी अमिट छाप छोड़ने वाले महान प्रशासक व राजनेता इस योग में जन्म लेते हैं।",
    specificRemedyEn: "Pour milk on brass or silver snake idol on Nag Panchami; respect workers and subordinates.",
    specificRemedyHi: "नागपंचमी पर चांदी के नाग-नागिन का अभिषेक करें; अधीनस्थों व श्रमिकों का सम्मान करें।",
  },
  11: {
    index: 11,
    id: "vishdhar",
    nameEn: "Vishdhar (Vishakt) Kaal Sarp Yoga",
    nameHi: "विषधर (विषाक्त) काल सर्प योग",
    rahuHouse: 11,
    ketuHouse: 5,
    significanceEn:
      "Rahu in the 11th house (Income, Gains, Social Circle) and Ketu in the 5th house (Children, Memory, Intellect). Fluctuations in income, betrayals by false friends, and concerns regarding progeny.",
    significanceHi:
      "राहु एकादश भाव (आय, लाभ, मित्र) तथा केतु पंचम भाव में होते हैं। आय में अनियमितता, धूर्त मित्रों द्वारा विश्वासघात तथा संतान संबंधी चिंताएं।",
    careerImpactEn:
      "Multiple simultaneous income streams; high profits in technology, networking, entertainment, and digital media after overcoming early financial deception.",
    careerImpactHi:
      "आय के एक से अधिक स्रोत; प्रौद्योगिकी, सोशल मीडिया व मनोरंजन उद्योग में धोखों से सीखकर भारी मुनाफा।",
    maritalImpactEn: "Outside acquaintances causing jealousy or friction in marital relationship.",
    maritalImpactHi: "मित्रों व सामाजिक संपर्कों के कारण वैवाहिक जीवन में अविश्वास या ईर्ष्या से बचाव रखें।",
    healthImpactEn: "Memory strain, insomnia, ear problems, or digestive slowness.",
    healthImpactHi: "स्मृति पर तनाव, अनिद्रा अथवा कानों के विकार।",
    reliefAge: 35,
    silverLiningEn:
      "Immense networking skills, visionary multi-source wealth creation, and massive social following.",
    silverLiningHi: "विशाल सामाजिक प्रभाव, अद्भुत जनसंपर्क क्षमता तथा कई माध्यमों से धन कमाने की चतुराई।",
    specificRemedyEn: "Donate barley (Jau) or radish on Saturdays; recite Rahu Beej Mantra 108 times.",
    specificRemedyHi: "शनिवार को जौ अथवा मूली का दान करें; ॐ भ्रां भ्रीं भ्रौं सः राहवे नमः का १०८ बार जप करें।",
  },
  12: {
    index: 12,
    id: "sheshnag",
    nameEn: "Sheshnag Kaal Sarp Yoga",
    nameHi: "शेषनाग काल सर्प योग",
    rahuHouse: 12,
    ketuHouse: 6,
    significanceEn:
      "Rahu in the 12th house (Expenses, Foreign Lands, Liberation) and Ketu in the 6th house (Enemies & Health). Heavy secret expenditures, restless nights, litigation from unknown adversaries, and overseas triumphs.",
    significanceHi:
      "राहु द्वादश भाव (व्यय, विदेश, मोक्ष) तथा केतु षष्ठ भाव में होते हैं। भारी गुप्त व्यय, अनिद्रा, गुप्त शत्रुओं से अदालती उलझनें तथा विदेश में जाकर प्रतिष्ठा।",
    careerImpactEn:
      "Phenomenal triumphs in foreign countries, import-export, hospitals, spiritual ashrams, or multinational corporations.",
    careerImpactHi:
      "विदेश में, बहुराष्ट्रीय कंपनियों, चिकित्सालयों अथवा आध्यात्मिक संस्थानों में अपार ख्याति व समृद्धि।",
    maritalImpactEn: "Physical distance due to international assignments; requires unwavering emotional trust.",
    maritalImpactHi: "विदेश प्रवास अथवा स्थानांतरण के कारण दूरी; परस्पर अटूट विश्वास बनाए रखना आवश्यक।",
    healthImpactEn: "Insomnia, eye fatigue, foot pains, and lingering psychosomatic stress.",
    healthImpactHi: "अनिद्रा, नेत्र विकार, पैरों में दर्द व अकारण चिंताएं।",
    reliefAge: 42,
    silverLiningEn:
      "Supreme spiritual awakening, global citizenship, and lasting philanthropic impact worldwide.",
    silverLiningHi: "उच्च कोटि का आध्यात्मिक उत्थान, वैश्विक पहचान तथा समाज सेवा में अमर कीर्ति।",
    specificRemedyEn: "Keep a peacock feather in your bedroom; recite Mahamrityunjaya Mantra before sleep.",
    specificRemedyHi: "शयनकक्ष में सिरहाने मोरपंख रखें; रात्रि शयन से पूर्व ११ बार महामृत्युंजय मंत्र का जप करें।",
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

    return {
      id: planet.id,
      nameEn: planet.name,
      nameHi: planet.nameHi,
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

  const escapedPlanets: { id: string; nameEn: string; nameHi: string; house: number }[] = [];

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
  let direction: KaalSarpDirection = "neutral";
  let directionLabelEn = "None";
  let directionLabelHi = "कोई नहीं";
  let yogaIndex: number | null = null;
  let yoga: KaalSarpYogaDefinition | null = null;

  if (planetsOutsideCount === 0) {
    hasKaalSarp = true;
    type = "purna";
    typeLabelEn = "Complete Kaal Sarp Yoga (Purna Kaal Sarp)";
    typeLabelHi = "पूर्ण काल सर्प योग";
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
  } else if (planetsOutsideCount === 1) {
    hasKaalSarp = true;
    type = "anshik";
    typeLabelEn = "Partial / Mild Kaal Sarp Yoga (Anshik / Ardha Kaal Sarp)";
    typeLabelHi = "आंशिक काल सर्प योग (अर्ध काल सर्प)";
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
  } else {
    hasKaalSarp = false;
    type = "none";
  }

  let summaryEn = "";
  let summaryHi = "";

  if (type === "purna" && yoga) {
    summaryEn = `Your chart forms ${yoga.nameEn} (${directionLabelEn}). All 7 classical planets are hemmed within the Rahu-Ketu axis. While early life may require perseverance and resilience, this yoga often propels individuals to extraordinary heights and high acclaim around age ${yoga.reliefAge}.`;
    summaryHi = `आपकी जन्म कुंडली में ${yoga.nameHi} (${directionLabelHi}) निर्मित हो रहा है। सभी ७ ग्रह राहु-केतु अक्ष के भीतर स्थित हैं। यद्यपि आरंभिक जीवन में परिश्रम व धैर्य की परीक्षा होती है, परंतु ${yoga.reliefAge} वर्ष की आयु के पश्चात यह योग असाधारण प्रगति व प्रतिष्ठा प्रदान करता है।`;
  } else if (type === "anshik" && yoga) {
    const escaped = escapedPlanets.map((p) => p.nameEn).join(", ");
    const escapedHi = escapedPlanets.map((p) => p.nameHi).join(", ");
    summaryEn = `Your chart forms Partial ${yoga.nameEn}. Planet ${escaped} is situated outside the nodal axis, breaking the complete enclosure. This creates only mild or intermittent karmic effects, largely mitigated by your positive efforts.`;
    summaryHi = `आपकी कुंडली में आंशिक ${yoga.nameHi} है। ${escapedHi} ग्रह राहु-केतु अक्ष से बाहर है, जिससे पूर्ण दोष का भंग हो जाता है। इसका प्रभाव अति सौम्य रहता है और सामान्य उपायों से पूर्ण शांति रहती है।`;
  } else {
    summaryEn =
      "Auspicious alignment! Your birth chart is completely free of Kaal Sarp Yoga. The planets are evenly distributed on both sides of the Rahu-Ketu nodal axis, allowing free flow of career and personal fortune.";
    summaryHi =
      "शुभ योग! आपकी जन्म कुंडली काल सर्प दोष से पूर्णतः मुक्त है। ग्रह राहु-केतु अक्ष के दोनों ओर संतुलित रूप से स्थित हैं, जिससे जीवन में निर्बाध उन्नति व सफलता का मार्ग प्रशस्त रहता है।";
  }

  // Universal authentic remedies
  const remedies = [
    {
      titleEn: "Maha Mrityunjaya Mantra Japa (108 times daily)",
      titleHi: "महामृत्युंजय मंत्र का नित्य १०८ बार जप",
      descriptionEn:
        "Lord Shiva is the ultimate conqueror of time (Maha Kaal) and master of the serpent King Vasuki. Chanting the Maha Mrityunjaya Mantra with a Rudraksha mala dissolves negative karmic knots and bestows protective energy.",
      descriptionHi:
        "भगवान शिव महाकाल हैं और काल सर्प के समस्त दुष्प्रभावों के संहारक हैं। नित्य रुद्राक्ष माला से महामृत्युंजय मंत्र का १०८ बार जप करने से अभय व आरोग्य की प्राप्ति होती है।",
      mantra: "ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्। उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय माऽमृतात्॥",
    },
    {
      titleEn: "Nag Panchami Sacred Offering (Silver Snake Pair)",
      titleHi: "नागपंचमी पर चांदी के नाग-नागिन का पूजन व विसर्जन",
      descriptionEn:
        "On the auspicious tithi of Nag Panchami (or any Shukla Paksha Panchami), offering milk to a Shiva Lingam and immersing a small silver pair of Nag-Nagin in holy flowing water with devotion.",
      descriptionHi:
        "नागपंचमी अथवा किसी भी शुक्ल पक्ष की पंचमी तिथि पर शिवलिंग पर कच्चा दूध अर्पित करें तथा चांदी के छोटे नाग-नागिन के जोड़े का विधिपूर्वक पूजन कर पवित्र बहते जल में प्रवाहित करें।",
    },
    {
      titleEn: "Trimbakeshwar / Srikalahasti Rudrabhisheka",
      titleHi: "त्र्यंबकेश्वर अथवा श्रीकालहस्ती में रुद्राभिषेक",
      descriptionEn:
        "Visiting Jyotirlinga Trimbakeshwar (Nashik) or Rahu-Ketu Kshetra Srikalahasti (Andhra Pradesh) to perform a classical Shanti Sankalp yagya once in a lifetime.",
      descriptionHi:
        "जीवन में एक बार द्वादश ज्योतिर्लिंग श्री त्र्यंबकेश्वर (नासिक) अथवा राहु-केतु पीठ श्रीकालहस्ती में विधि-विधान से काल सर्प शांति अनुष्ठान शास्त्रसम्मत व परम फलदायी है।",
    },
    {
      titleEn: "Rahu & Ketu Vedic Beej Mantras",
      titleHi: "राहु व केतु के वैदिक बीज मंत्र",
      descriptionEn:
        "Chanting Rahu Beej Mantra in the evening and Ketu Beej Mantra in the morning harmonizes the shadow nodes and turns their malefic obsession into spiritual wisdom.",
      descriptionHi:
        "सायंकाल राहु मंत्र तथा प्रातः केतु मंत्र का जप करने से छाया ग्रह शांत होकर सकारात्मक बुद्धि व गुप्त ज्ञान प्रदान करते हैं।",
      mantra: "राहु: ॐ भ्रां भ्रीं भ्रौं सः राहवे नमः | केतु: ॐ स्रां स्रीं स्रौं सः केतवे नमः",
    },
    {
      titleEn: "Keep a Sacred Peacock Feather (Mayur Pankh)",
      titleHi: "शयनकक्ष अथवा अध्ययन कक्ष में मोरपंख रखना",
      descriptionEn:
        "Serpents naturally revere and yield before the peacock. Keeping a clean, vibrant peacock feather in your study, bedroom, or prayer altar neutralizes subtle negative planetary vibrations.",
      descriptionHi:
        "मोर सर्प का प्राकृतिक शत्रु व नियंत्रक है। अपने पूजा स्थल अथवा शयनकक्ष के सिरहाने मोरपंख रखने से नकारात्मक तरंगे व दुःस्वप्न स्वतः समाप्त हो जाते हैं।",
    },
  ];

  return {
    hasKaalSarp,
    type,
    typeLabelEn,
    typeLabelHi,
    direction,
    directionLabelEn,
    directionLabelHi,
    yogaIndex,
    yoga,
    rahuPlacement: {
      house: rahuHouse,
      rashiIndex: rahuRashi,
      rashiName: RASHI_NAMES[rahuRashi],
      rashiNameHi: RASHI_NAMES_HI[rahuRashi],
      degree: rahu ? rahu.formattedDegree : "0° 00'",
    },
    ketuPlacement: {
      house: ketuHouse,
      rashiIndex: ketuRashi,
      rashiName: RASHI_NAMES[ketuRashi],
      rashiNameHi: RASHI_NAMES_HI[ketuRashi],
      degree: ketu ? ketu.formattedDegree : "0° 00'",
    },
    planetsHemmedCount,
    planetsOutsideCount,
    escapedPlanets,
    planetChecks,
    summaryEn,
    summaryHi,
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
