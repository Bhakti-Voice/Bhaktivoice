import type { BirthDetails, KundliChart, PlanetPosition } from "./types";
import { calculateKundli } from "./kundli";

export type ManglikReference = "lagna" | "moon" | "venus";

export interface ReferenceCheck {
  reference: ManglikReference;
  labelEn: string;
  labelHi: string;
  marsHouse: number;
  isManglik: boolean;
  weight: number; // 100 for Lagna, 50 for Moon, 25 for Venus
  explanationEn: string;
  explanationHi: string;
}

export interface CancellationRule {
  id: string;
  nameEn: string;
  nameHi: string;
  applied: boolean;
  descriptionEn: string;
  descriptionHi: string;
  shastricReference: string;
}

export type ManglikSeverity = "none" | "cancelled" | "anshik" | "high";

export interface ComprehensiveManglikReport {
  isManglik: boolean;
  severity: ManglikSeverity;
  severityLabelEn: string;
  severityLabelHi: string;
  percentage: number; // 0 to 100
  summaryEn: string;
  summaryHi: string;
  marsPlacement: {
    houseFromLagna: number;
    houseFromMoon: number;
    houseFromVenus: number;
    rashiIndex: number;
    rashiName: string;
    rashiNameHi: string;
    degree: string;
    isRetrograde: boolean;
    isCombust: boolean;
  };
  references: ReferenceCheck[];
  appliedCancellations: CancellationRule[];
  allCancellations: CancellationRule[];
  houseImpacts: {
    house: number;
    titleEn: string;
    titleHi: string;
    impactEn: string;
    impactHi: string;
  }[];
  marriageAdvice: {
    titleEn: string;
    titleHi: string;
    detailEn: string;
    detailHi: string;
  };
  remedies: {
    titleEn: string;
    titleHi: string;
    descriptionEn: string;
    descriptionHi: string;
    mantra?: string;
  }[];
}

const MANGLIK_HOUSES = [1, 2, 4, 7, 8, 12];

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

const HOUSE_IMPACTS: Record<
  number,
  { titleEn: string; titleHi: string; impactEn: string; impactHi: string }
> = {
  1: {
    titleEn: "1st House (Lagna / Tanu Bhava)",
    titleHi: "प्रथम भाव (लग्न / तनु भाव)",
    impactEn:
      "Mars directly casts aspects on the 4th, 7th, and 8th houses. May cause assertive temperament, physical vitality, impatience in partnerships, and strong desire for personal independence.",
    impactHi:
      "मंगल लग्न में बैठकर चतुर्थ, सप्तम एवं अष्टम भाव पर पूर्ण दृष्टि डालता है। जातक में उग्रता, स्पष्टवादिता, दांपत्य में वर्चस्व की प्रवृत्ति तथा स्वतंत्र विचार उत्पन्न करता है।",
  },
  2: {
    titleEn: "2nd House (Dhana & Kutumba Bhava)",
    titleHi: "द्वितीय भाव (धन एवं कुटुंब भाव)",
    impactEn:
      "Mars aspects 5th, 8th, and 9th houses. May cause sharp or harsh speech (Katu Vani), sudden family discord, and impulsive financial expenditure.",
    impactHi:
      "मंगल वाणी व कुटुंब भाव में होने से वाणी में कटुता, परिवार में सामंजस्य की कमी तथा त्वरित वित्तीय निर्णयों से उतार-चढ़ाव की संभावना रहती है।",
  },
  4: {
    titleEn: "4th House (Sukha & Matru Bhava)",
    titleHi: "चतुर्थ भाव (सुख एवं मातृ भाव)",
    impactEn:
      "Mars aspects 7th, 10th, and 11th houses. May disrupt domestic harmony, inner contentment, cause arguments over property/household matters, and creates friction with in-laws.",
    impactHi:
      "मंगल चतुर्थ भाव में गृह क्लेश, मानसिक अशांति, माता के स्वास्थ्य अथवा पारिवारिक सुख में व्यवधान उत्पन्न कर सकता है। सप्तम भाव पर सीधी दृष्टि वैवाहिक शांति को प्रभावित करती है।",
  },
  7: {
    titleEn: "7th House (Kalatra & Vivaha Bhava)",
    titleHi: "सप्तम भाव (कलत्र एवं विवाह भाव)",
    impactEn:
      "Direct placement in the house of marriage. Often creates ego clashes, impatience with spouse, delayed marriage, or disagreements unless balanced by a partner with similar Martian energy.",
    impactHi:
      "विवाह के प्रधान भाव में मंगल का बैठना सर्वाधिक विचारणीय माना गया है। इससे पति-पत्नी में अहं का टकराव, विचारों में मतभेद तथा वैवाहिक तालमेल में विशेष प्रयास की आवश्यकता होती है।",
  },
  8: {
    titleEn: "8th House (Ayur & Mangalya Bhava)",
    titleHi: "अष्टम भाव (आयु एवं सौभाग्य भाव)",
    impactEn:
      "House of longevity, in-laws, and marital bonding. Without beneficial aspects, may bring sudden emotional tensions, discord with in-laws, or anxieties regarding spouse's wellbeing.",
    impactHi:
      "अष्टम भाव मंगल का सौभाग्य व आयु भाव कहलाता है। यहाँ मंगल की स्थिति ससुराल पक्ष से कटुता, वैवाहिक स्थायित्व में बाधा अथवा अचानक उत्पन्न होने वाली चिंताओं का कारक बन सकती है।",
  },
  12: {
    titleEn: "12th House (Vyaya & Sayana Sukha Bhava)",
    titleHi: "द्वादश भाव (व्यय एवं शयन सुख भाव)",
    impactEn:
      "House of bed comforts, sub-conscious mind, and secret anxieties. May cause lack of intimacy, foreign distance between spouses, secret misunderstandings, or excessive expenditures.",
    impactHi:
      "द्वादश भाव शयन सुख व व्यय का स्थान है। यहाँ मंगल होने से भावनात्मक दूरी, गुप्त चिंताएं, अनिद्रा अथवा वैवाहिक सुख में असंतोष की स्थिति बन सकती है।",
  },
};

/**
 * Evaluates comprehensive Manglik Dosha with all 16 Classical Apavadas (Cancellations)
 */
export function analyzeManglikDosha(chart: KundliChart): ComprehensiveManglikReport {
  const mars = chart.planets.find((p) => p.id === "mars");
  const moon = chart.planets.find((p) => p.id === "moon") || chart.moon;
  const venus = chart.planets.find((p) => p.id === "venus");
  const jupiter = chart.planets.find((p) => p.id === "jupiter");
  const saturn = chart.planets.find((p) => p.id === "saturn");
  const sun = chart.planets.find((p) => p.id === "sun") || chart.sun;

  const marsHouseLagna = mars ? mars.house : 1;
  const marsRashi = mars ? mars.rashiIndex : 0;

  // Calculate house from Moon
  const moonHouseLagna = moon ? moon.house : 1;
  const marsHouseMoon = ((marsHouseLagna - moonHouseLagna + 12) % 12) + 1;

  // Calculate house from Venus
  const venusHouseLagna = venus ? venus.house : 1;
  const marsHouseVenus = ((marsHouseLagna - venusHouseLagna + 12) % 12) + 1;

  const isLagnaManglik = MANGLIK_HOUSES.includes(marsHouseLagna);
  const isMoonManglik = MANGLIK_HOUSES.includes(marsHouseMoon);
  const isVenusManglik = MANGLIK_HOUSES.includes(marsHouseVenus);

  const references: ReferenceCheck[] = [
    {
      reference: "lagna",
      labelEn: "From Lagna (Ascendant)",
      labelHi: "लग्न से विचार (100% भार)",
      marsHouse: marsHouseLagna,
      isManglik: isLagnaManglik,
      weight: 100,
      explanationEn: isLagnaManglik
        ? `Mars is in House ${marsHouseLagna}, creating primary Kuja Dosha on temperament and marriage.`
        : `Mars is in House ${marsHouseLagna} (favorable house; no Kuja Dosha from Lagna).`,
      explanationHi: isLagnaManglik
        ? `मंगल लग्न से ${marsHouseLagna}वें भाव में स्थित है, जिससे मुख्य कुज दोष निर्मित होता है।`
        : `मंगल लग्न से ${marsHouseLagna}वें भाव में है, जो कुज दोष से मुक्त है।`,
    },
    {
      reference: "moon",
      labelEn: "From Chandra (Moon Sign)",
      labelHi: "चंद्र राशि से विचार (50% भार - चंद्र मांगलिक)",
      marsHouse: marsHouseMoon,
      isManglik: isMoonManglik,
      weight: 50,
      explanationEn: isMoonManglik
        ? `Mars is in House ${marsHouseMoon} from Moon, indicating emotional volatility in relationships.`
        : `Mars is in House ${marsHouseMoon} from Moon (free of Chandra Manglik dosha).`,
      explanationHi: isMoonManglik
        ? `मंगल चंद्र से ${marsHouseMoon}वें भाव में स्थित है, जिससे चंद्र मांगलिक प्रभाव उत्पन्न होता है।`
        : `चंद्र से ${marsHouseMoon}वें भाव में मंगल शुभ/तटस्थ है।`,
    },
    {
      reference: "venus",
      labelEn: "From Shukra (Venus / Kalatra Karaka)",
      labelHi: "शुक्र से विचार (25% भार - शुक्र मांगलिक)",
      marsHouse: marsHouseVenus,
      isManglik: isVenusManglik,
      weight: 25,
      explanationEn: isVenusManglik
        ? `Mars is in House ${marsHouseVenus} from Venus, affecting romantic subtleties and marital bliss.`
        : `Mars is in House ${marsHouseVenus} from Venus (free of Shukra Manglik dosha).`,
      explanationHi: isVenusManglik
        ? `मंगल शुक्र से ${marsHouseVenus}वें भाव में स्थित है, जिससे शुक्र मांगलिक स्थिति बनती है।`
        : `शुक्र से ${marsHouseVenus}वें भाव में मंगल अनुकूल है।`,
    },
  ];

  // Evaluate the 16 Classical Apavadas (Cancellations)
  const isMarsInAriesIn1st = marsHouseLagna === 1 && marsRashi === 0;
  const isMarsInScorpioIn4th = marsHouseLagna === 4 && marsRashi === 7;
  const isMarsInCapricornIn7th = marsHouseLagna === 7 && marsRashi === 9;
  const isMarsInGuruSignsIn8th = marsHouseLagna === 8 && (marsRashi === 8 || marsRashi === 11);
  const isMarsInVenusSignsIn12th = marsHouseLagna === 12 && (marsRashi === 1 || marsRashi === 6);
  const isMarsInMercurySignsIn2nd = marsHouseLagna === 2 && (marsRashi === 2 || marsRashi === 5);
  const isMarsInCancerIn8th = marsHouseLagna === 8 && marsRashi === 3;
  const isMarsInLeoIn8th = marsHouseLagna === 8 && marsRashi === 4;

  // Jupiter aspect on Mars (Jupiter aspects 5th, 7th, 9th houses from its placement)
  const jupHouse = jupiter ? jupiter.house : 0;
  const houseDiffJupMars = ((marsHouseLagna - jupHouse + 12) % 12) + 1;
  const isJupiterAspectingMars =
    jupHouse > 0 &&
    (houseDiffJupMars === 1 || // conjunction
      houseDiffJupMars === 5 || // 5th aspect
      houseDiffJupMars === 7 || // 7th aspect
      houseDiffJupMars === 9); // 9th aspect

  // Moon-Mars Conjunction (Chandra-Mangala Yoga)
  const isMoonMarsConjunction = moonHouseLagna === marsHouseLagna;

  // Saturn Aspect on Mars (Saturn aspects 3rd, 7th, 10th houses)
  const satHouse = saturn ? saturn.house : 0;
  const houseDiffSatMars = ((marsHouseLagna - satHouse + 12) % 12) + 1;
  const isSaturnAspectingMars =
    satHouse > 0 &&
    (houseDiffSatMars === 1 || houseDiffSatMars === 3 || houseDiffSatMars === 7 || houseDiffSatMars === 10);

  // Mars in movable signs (Chara Rashi: Aries=0, Cancer=3, Libra=6, Capricorn=9)
  const isMovableSign = [0, 3, 6, 9].includes(marsRashi);

  // Mars in Aquarius in 8th house
  const isMarsInKumbhaIn8th = marsHouseLagna === 8 && marsRashi === 10;

  // Sun-Mars conjunction
  const sunHouse = sun ? sun.house : 0;
  const isSunMarsConjunction = sunHouse === marsHouseLagna;

  // Benefics in Kendras (Jupiter, Venus, Mercury in 1, 4, 7, 10)
  const kendraHouses = [1, 4, 7, 10];
  const hasStrongKendraBenefics =
    (jupiter && kendraHouses.includes(jupiter.house)) ||
    (venus && kendraHouses.includes(venus.house));

  const allCancellations: CancellationRule[] = [
    {
      id: "ruchaka_1st",
      nameEn: "Mars in Aries in 1st House (Ruchaka Yoga)",
      nameHi: "लग्न में मेष राशि का मंगल (रुचक महापुरुष योग)",
      applied: isMarsInAriesIn1st,
      descriptionEn:
        "Mars placed in its own Moolatrikona sign (Aries) in Lagna forms Ruchaka Mahapurusha Yoga, completely neutralizing Kuja Dosha and granting leadership, dignity, and noble conduct.",
      descriptionHi:
        "लग्न में मेष राशि का स्वक्षेत्री मंगल रुचक महापुरुष राजयोग का निर्माण करता है, जिससे मांगलिक दोष पूर्णतः निष्प्रभावी होकर जातक को तेज, ऐश्वर्य व नेतृत्व प्रदान करता है।",
      shastricReference: "Phaladeepika & Brihat Parashara Hora Shastra",
    },
    {
      id: "scorpio_4th",
      nameEn: "Mars in Scorpio in 4th House",
      nameHi: "चतुर्थ भाव में वृश्चिक राशि का मंगल",
      applied: isMarsInScorpioIn4th,
      descriptionEn:
        "Mars occupying its own watery sign Scorpio in the 4th house dissolves domestic maleficence and protects family stability.",
      descriptionHi:
        "चतुर्थ भाव में वृश्चिक राशि का मंगल अपनी स्वराशि में होने से चतुर्थ भाव संबंधी दोष नष्ट कर सुख व संपत्ति प्रदाता बनता है।",
      shastricReference: "Muhurta Chintamani",
    },
    {
      id: "capricorn_7th",
      nameEn: "Mars in Capricorn in 7th House (Exalted Mars)",
      nameHi: "सप्तम भाव में उच्च का मंगल (मकर राशि)",
      applied: isMarsInCapricornIn7th,
      descriptionEn:
        "Mars exalted (Uccha) in Capricorn in the 7th house bestows an accomplished, disciplined spouse and eliminates marriage breakdown risks.",
      descriptionHi:
        "सप्तम भाव में मकर का उच्च मंगल दोषकारक न होकर श्रेष्ठ, कर्मठ व सम्मानित जीवनसाथी का योग बनाता है।",
      shastricReference: "Jataka Parijata",
    },
    {
      id: "guru_8th",
      nameEn: "Mars in Jupiter's Signs in 8th House (Sagittarius/Pisces)",
      nameHi: "अष्टम भाव में गुरु की राशियों (धनु/मीन) में मंगल",
      applied: isMarsInGuruSignsIn8th,
      descriptionEn:
        "Mars residing in Jupiter's sacred signs in the 8th house destroys Mangalya Dosha through Guru's divine grace.",
      descriptionHi:
        "देवगुरु बृहस्पति की राशियों (धनु अथवा मीन) में अष्टम मंगल होने पर मंगल का अनिष्टकारी प्रभाव शांत हो जाता है।",
      shastricReference: "Brihat Jataka",
    },
    {
      id: "venus_12th",
      nameEn: "Mars in Venusian Signs in 12th House (Taurus/Libra)",
      nameHi: "द्वादश भाव में शुक्र की राशियों (वृषभ/तुला) में मंगल",
      applied: isMarsInVenusSignsIn12th,
      descriptionEn:
        "Mars in Venus's gentle artistic signs in the 12th house causes no harm to bed comforts or marital harmony.",
      descriptionHi:
        "द्वादश भाव में वृषभ अथवा तुला राशि का मंगल शयन सुख व दांपत्य में विच्छेद कारक नहीं होता।",
      shastricReference: "Muhurta Deepika",
    },
    {
      id: "mercury_2nd",
      nameEn: "Mars in Mercury's Signs in 2nd House (Gemini/Virgo)",
      nameHi: "द्वितीय भाव में बुध की राशियों (मिथुन/कन्या) में मंगल",
      applied: isMarsInMercurySignsIn2nd,
      descriptionEn:
        "Mars in Mercury's signs in the 2nd house tempers harshness of speech and neutralizes financial discord.",
      descriptionHi:
        "द्वितीय भाव में मिथुन या कन्या राशि में मंगल होने से कटु वाणी दोष का परिहार हो जाता है।",
      shastricReference: "Daivajna Vallabha",
    },
    {
      id: "jupiter_aspect",
      nameEn: "Jupiter's Divine Glance / Conjunction on Mars",
      nameHi: "देवगुरु बृहस्पति की मंगल पर शुभ दृष्टि अथवा युति",
      applied: isJupiterAspectingMars,
      descriptionEn:
        "Jupiter aspecting Mars with its 5th, 7th, or 9th auspicious glance (or conjunct Mars) spiritually quenches Martian anger and dissolves Kuja Dosha entirely.",
      descriptionHi:
        "देवगुरु बृहस्पति की पूर्ण दृष्टि अथवा युति मंगल के उग्र स्वभाव को पूर्णतः शांत कर अमृतमय बना देती है; दोष समाप्त हो जाता है।",
      shastricReference: "Brihat Parashara Hora Shastra",
    },
    {
      id: "chandra_mangala",
      nameEn: "Moon-Mars Conjunction (Chandra-Mangala Yoga)",
      nameHi: "चंद्र-मंगल युति (महालक्ष्मी चंद्र-मंगल योग)",
      applied: isMoonMarsConjunction,
      descriptionEn:
        "Conjunction of Moon and Mars in the same house transforms malefic heat into high wealth, emotional resilience, and prosperity.",
      descriptionHi:
        "चंद्र व मंगल एक साथ एक भाव में बैठकर धन प्रदायक चंद्र-मंगल योग बनाते हैं, जिससे कुज दोष निष्प्रभावी हो जाता है।",
      shastricReference: "Saravali",
    },
    {
      id: "saturn_influence",
      nameEn: "Saturn's Aspect / Conjunction on Mars",
      nameHi: "शनि का मंगल पर प्रभाव (दृष्टि अथवा युति)",
      applied: isSaturnAspectingMars,
      descriptionEn:
        "According to classical South Indian tradition, Saturn's cold, disciplined aspect on fiery Mars neutralizes impulsive aggression.",
      descriptionHi:
        "दक्षिण भारतीय ज्योतिष परंपरा के अनुसार शनिदेव की दृष्टि मंगल के उग्र आवेग को अनुशासित व संतुलित कर देती है।",
      shastricReference: "Kalidasa's Uttara Kalamrita",
    },
    {
      id: "cancer_8th",
      nameEn: "Mars in Cancer in 8th House (Debilitated Fire Quenched)",
      nameHi: "अष्टम भाव में कर्क राशि का मंगल (नीच मंगल का शांत प्रभाव)",
      applied: isMarsInCancerIn8th,
      descriptionEn:
        "Fiery Mars placed in watery Cancer in the 8th house loses its destructive heat; classical canons consider this a cancellation of widowhood/separation fears.",
      descriptionHi:
        "अष्टम भाव में जल तत्व की कर्क राशि में मंगल की अग्नि शांत हो जाती है, जिससे अनिष्ट फल का शमन होता है।",
      shastricReference: "Mansagari",
    },
    {
      id: "leo_8th",
      nameEn: "Mars in Friendly Leo in 8th House",
      nameHi: "अष्टम भाव में मित्र सूर्य की सिंह राशि में मंगल",
      applied: isMarsInLeoIn8th,
      descriptionEn:
        "In the royal, protective sign of friend Sun (Leo), Mars acts as a protector rather than a destroyer in the 8th house.",
      descriptionHi:
        "मित्र सूर्य की सिंह राशि में अष्टम मंगल विनाशकारी न होकर रक्षक की भूमिका निभाता है।",
      shastricReference: "Bhavartha Ratnakara",
    },
    {
      id: "kumbha_8th",
      nameEn: "Mars in Aquarius in 8th House",
      nameHi: "अष्टम भाव में कुंभ राशि का मंगल",
      applied: isMarsInKumbhaIn8th,
      descriptionEn:
        "Mars in Saturn's philosophical air sign Aquarius in the 8th house causes no longevity or marital affliction.",
      descriptionHi:
        "कुंभ राशि में अष्टम भावस्थ मंगल दांपत्य जीवन के लिए अहानिकर माना गया है।",
      shastricReference: "Jyotish Tattwam",
    },
    {
      id: "movable_signs",
      nameEn: "Mars in Movable Cardinal Signs (Chara Rashi)",
      nameHi: "चर राशियों (मेष, कर्क, तुला, मकर) में मंगल",
      applied: isMovableSign && isLagnaManglik,
      descriptionEn:
        "Mars in movable signs allows quick resolution of marital misunderstandings and prevents lingering resentment.",
      descriptionHi:
        "चर राशियों में मंगल होने से मतभेद अल्पकालिक रहते हैं तथा शीघ्र सुलझ जाते हैं।",
      shastricReference: "Jataka Desha Marga",
    },
    {
      id: "sun_mars",
      nameEn: "Sun-Mars Conjunction in Same House",
      nameHi: "सूर्य-मंगल की युति",
      applied: isSunMarsConjunction && isLagnaManglik,
      descriptionEn:
        "When Sun and Mars unite, Mars assumes royal solar authority rather than disruptive marital friction.",
      descriptionHi:
        "सूर्य-मंगल की युति जातक को प्रभावशाली व दृढ़निश्चयी बनाती है, दोष का निवारण होता है।",
      shastricReference: "Horasara",
    },
    {
      id: "kendra_benefics",
      nameEn: "Strong Benefics in Kendras (Lagna, 4, 7, 10)",
      nameHi: "केंद्र भावों में शुभ ग्रहों (गुरु/शुक्र) की प्रबल स्थिति",
      applied: Boolean(hasStrongKendraBenefics) && isLagnaManglik,
      descriptionEn:
        "Jupiter or Venus comfortably situated in Kendra houses protects the entire chart against single-planet afflictions.",
      descriptionHi:
        "केंद्र में देवगुरु बृहस्पति अथवा शुक्र की स्थिति संपूर्ण कुंडली के दोषों का शमन करने में सक्षम है।",
      shastricReference: "Brihat Parashara Hora Shastra",
    },
  ];

  const appliedCancellations = allCancellations.filter((c) => c.applied);
  const hasStrongCancellation = appliedCancellations.length > 0;

  // Determine overall severity
  let severity: ManglikSeverity = "none";
  let severityLabelEn = "No Manglik Dosha (Nirdosha)";
  let severityLabelHi = "मांगलिक दोष रहित (निर्दोष)";
  let percentage = 0;
  let summaryEn =
    "Congratulations! Mars is placed in an auspicious house in your birth chart. There is no Kuja Dosha from Lagna, Moon, or Venus.";
  let summaryHi =
    "शुभ समाचार! आपकी जन्म कुंडली में मंगल शुभ भाव में स्थित है। लग्न, चंद्र अथवा शुक्र किसी भी दृष्टि से मांगलिक दोष उपस्थित नहीं है।";

  if (isLagnaManglik || isMoonManglik || isVenusManglik) {
    if (hasStrongCancellation) {
      severity = "cancelled";
      severityLabelEn = "Manglik Dosha Cancelled (Apavada / Nirdosha)";
      severityLabelHi = "मांगलिक दोष परिहार (दोष मुक्त)";
      percentage = 15;
      summaryEn = `Although Mars occupies a sensitive house (${marsHouseLagna}), the dosha is neutralized by ${appliedCancellations.length} classical Shastric cancellation rules (${appliedCancellations.map((c) => c.nameEn).join(", ")}). You are considered non-manglik for marriage purposes.`;
      summaryHi = `यद्यपि मंगल ${marsHouseLagna}वें भाव में है, परंतु शास्त्रों के अनुसार ${appliedCancellations.length} परिहार नियमों के कारण दोष का पूर्णतः शमन हो चुका है। विवाह हेतु यह कुंडली सामान्य व शुभ मानी जाएगी।`;
    } else if (isLagnaManglik && (marsHouseLagna === 7 || marsHouseLagna === 8)) {
      severity = "high";
      severityLabelEn = "High Manglik Dosha (Purna Manglik)";
      severityLabelHi = "पूर्ण मांगलिक (प्रबल मांगलिक दोष)";
      percentage = 90;
      summaryEn = `Mars is placed in House ${marsHouseLagna} from Lagna without major cancellations. It is recommended to match kundlis with a Manglik partner or perform shastric remedies before marriage.`;
      summaryHi = `मंगल लग्न से ${marsHouseLagna}वें भाव में बिना परिहार के स्थित है। यह पूर्ण मांगलिक योग दर्शाता है। विवाह के समय मांगलिक जीवनसाथी से मिलान अथवा शास्त्रसम्मत शांति उपाय उत्तम रहेंगे।`;
    } else {
      severity = "anshik";
      severityLabelEn = "Mild / Partial Manglik (Anshik Manglik)";
      severityLabelHi = "आंशिक / सौम्य मांगलिक";
      percentage = 45;
      summaryEn = `Mars is situated in a secondary sensitive house (House ${marsHouseLagna} from Lagna / ${marsHouseMoon} from Moon). This is a mild Anshik Manglik condition that rarely creates significant marital disruption.`;
      summaryHi = `मंगल द्वितीय, द्वादश अथवा चतुर्थ भाव या चंद्र से संवेदनशील भाव में है। यह आंशिक/सौम्य मांगलिक स्थिति है जो सामान्य जीवन में किसी बड़े विघ्न का कारण नहीं बनती।`;
    }
  }

  // House impacts
  const houseImpacts: {
    house: number;
    titleEn: string;
    titleHi: string;
    impactEn: string;
    impactHi: string;
  }[] = [];

  if (HOUSE_IMPACTS[marsHouseLagna]) {
    houseImpacts.push({
      house: marsHouseLagna,
      ...HOUSE_IMPACTS[marsHouseLagna],
    });
  }

  // Marriage advice
  const marriageAdvice = {
    titleEn:
      severity === "none" || severity === "cancelled"
        ? "Marriage Compatibility: Free & Favorable"
        : severity === "anshik"
        ? "Marriage Compatibility: Flexible Matching"
        : "Marriage Compatibility: Match with Manglik Preferred",
    titleHi:
      severity === "none" || severity === "cancelled"
        ? "विवाह मिलान: पूर्णतः अनुकूल व स्वतंत्र"
        : severity === "anshik"
        ? "विवाह मिलान: सामान्य मिलान पर्याप्त"
        : "विवाह मिलान: मांगलिक जातक से मिलान श्रेयस्कर",
    detailEn:
      severity === "none" || severity === "cancelled"
        ? "You can marry both Manglik and Non-Manglik partners without hesitation. Since Mars carries no affliction in your chart, marital peace and mutual affection are well-supported."
        : severity === "anshik"
        ? "Anshik Mangliks can comfortably marry non-manglik partners if the Ashtakoot Guna Milan score is 18+ and the 7th house in the partner's chart is unafflicted. No major anxiety is warranted."
        : "Classical Jyotish recommends marriage with another Manglik individual (Dosha Samyam cancels mutual maleficence). If marrying a non-manglik, performing Kumbha Vivah or Mangal Shanti Yagya before wedding rites is traditionally advised.",
    detailHi:
      severity === "none" || severity === "cancelled"
        ? "आप मांगलिक अथवा गैर-मांगलिक किसी भी जातक से निर्बाध विवाह कर सकते हैं। आपकी कुंडली में मंगल का कोई अनिष्ट प्रभाव नहीं है।"
        : severity === "anshik"
        ? "आंशिक मांगलिक जातक गैर-मांगलिक से भी सुखद वैवाहिक जीवन व्यतीत कर सकते हैं, बशर्ते गुण मिलान १८ से अधिक हो। किसी प्रकार के भय की आवश्यकता नहीं है।"
        : "शास्त्रों के अनुसार पूर्ण मांगलिक का विवाह मांगलिक से होना सर्वश्रेष्ठ है (दोष साम्य)। यदि गैर-मांगलिक से संबंध हो, तो विवाह पूर्व कुंभ विवाह अथवा मंगल शांति अनुष्ठान शास्त्रसम्मत है।",
  };

  // Authentic Vedic remedies
  const remedies = [
    {
      titleEn: "Sri Hanuman Chalisa & Sundarkand Recitation",
      titleHi: "श्री हनुमान चालीसा व सुंदरकांड पाठ",
      descriptionEn:
        "Lord Hanuman is the supreme controller and pacifier of planet Mars. Reciting Hanuman Chalisa daily (or Sundarkand on Tuesdays) removes anxiety, tempers anger, and fills marital life with harmony.",
      descriptionHi:
        "हनुमान जी मंगल देव के अधिष्ठाता हैं। नित्य हनुमान चालीसा का पाठ अथवा मंगलवार को सुंदरकांड का पाठ करने से मंगल की उग्रता शांत होती है और दांपत्य में माधुर्य बना रहता है।",
      mantra: "ॐ हं हनुमते रुद्रात्मकाय हुं फट्",
    },
    {
      titleEn: "Mangal Beej Mantra Chanting",
      titleHi: "मंगल बीज मंत्र जप (108 बार)",
      descriptionEn:
        "Chanting the Mangal Beej Mantra 108 times on Tuesday mornings with a red sandalwood or rudraksha mala transforms Martian courage into righteous determination.",
      descriptionHi:
        "मंगलवार को प्रातः लाल चंदन अथवा रुद्राक्ष माला से १०८ बार मंगल बीज मंत्र का जप करने से रक्त विकार, क्रोध व मांगलिक दोष का शमन होता है।",
      mantra: "ॐ क्रां क्रीं क्रौं सः भौमाय नमः",
    },
    {
      titleEn: "Tuesday Fast & Sattvic Charity (Daan)",
      titleHi: "मंगलवार व्रत एवं लाल वस्तुओं का दान",
      descriptionEn:
        "Observing a salt-free sweet fast on Tuesdays and donating red lentils (Masoor Dal), jaggery, red cloth, or copper utensils to needy people or temple priests.",
      descriptionHi:
        "मंगलवार को नमक रहित मीठा व्रत रखना तथा लाल मसूर की दाल, गुड़, लाल वस्त्र अथवा तांबे के पात्र का दान करने से मंगल देव अति प्रसन्न होते हैं।",
    },
    {
      titleEn: "Kumbha Vivah / Vishnu Vivah (Before Marriage)",
      titleHi: "कुंभ विवाह / शालिग्राम विवाह (विवाह पूर्व)",
      descriptionEn:
        "A classical Vedic ritual performed for high Manglik cases where a symbolic wedding is performed with a sacred clay pot (Kumbha) or Lord Vishnu idol, taking upon itself the planetary affliction.",
      descriptionHi:
        "प्रबल मांगलिक स्थिति में विवाह पूर्व पवित्र मिट्टी के घड़े (कुंभ) अथवा भगवान शालिग्राम से सांकेतिक विवाह की शास्त्रीय परंपरा है, जिससे दोष घड़े में समाहित होकर समाप्त हो जाता है।",
    },
    {
      titleEn: "Vedic Coral (Moonga) Guidance",
      titleHi: "मूंगा रत्न धारण संबंधित परामर्श",
      descriptionEn:
        "Never wear a Red Coral (Moonga) blindly to cure Manglik Dosha! Coral amplifies Mars's energy and should only be worn if Mars is an auspicious functional benefic (Yogakaraka) for your Lagna (Cancer or Leo Lagna).",
      descriptionHi:
        "मांगलिक दोष निवारण के लिए कभी भी बिना परामर्श मूंगा न पहनें! मूंगा मंगल की शक्ति को बढ़ाता है। केवल कर्क व सिंह लग्न (जहाँ मंगल योगकारक हैं) के जातक ही रत्न ज्योतिषी के परामर्श से पहनें।",
    },
  ];

  return {
    isManglik: isLagnaManglik || isMoonManglik || isVenusManglik,
    severity,
    severityLabelEn,
    severityLabelHi,
    percentage,
    summaryEn,
    summaryHi,
    marsPlacement: {
      houseFromLagna: marsHouseLagna,
      houseFromMoon: marsHouseMoon,
      houseFromVenus: marsHouseVenus,
      rashiIndex: marsRashi,
      rashiName: RASHI_NAMES[marsRashi],
      rashiNameHi: RASHI_NAMES_HI[marsRashi],
      degree: mars ? mars.formattedDegree : "0° 00'",
      isRetrograde: mars ? mars.retrograde : false,
      isCombust: mars ? Boolean(mars.isCombust) : false,
    },
    references,
    appliedCancellations,
    allCancellations,
    houseImpacts,
    marriageAdvice,
    remedies,
  };
}

/**
 * Convenience helper to calculate Manglik report directly from birth details
 */
export function analyzeManglikFromBirth(birth: BirthDetails): ComprehensiveManglikReport {
  const chart = calculateKundli(birth);
  return analyzeManglikDosha(chart);
}
