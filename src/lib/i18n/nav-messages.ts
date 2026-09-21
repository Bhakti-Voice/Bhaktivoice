import type { Locale } from "./config";

export interface NavMessages {
  htmlLang: string;
  homeName: string;
  more: string;
  search: string;
  searchPlaceholder: string;
  signIn: string;
  profile: string;
  openMenu: string;
  nav: {
    home: string;
    gita: string;
    naamJaap: string;
    katha: string;
    yatra: string;
    sadhana: string;
    community: string;
    store: string;
    blog: string;
    temples: string;
    festivals: string;
    tithi: string;
    quotes: string;
    mantras: string;
    bhajan: string;
    aarti: string;
    chalisa: string;
    spirituality: string;
    yatraPlanner: string;
    sankalp: string;
    diary: string;
    jaap: string;
    myJourney: string;
    moreTitle: string;
    spiritualTools: string;
    library: string;
    angelNumbers: string;
  };
}

export const navMessages: Record<Locale, NavMessages> = {
  en: {
    htmlLang: "en",
    homeName: "Home",
    more: "More",
    search: "Search",
    searchPlaceholder: "Search Bhakti...",
    signIn: "Sign In",
    profile: "Profile",
    openMenu: "Open menu",
    nav: {
      home: "Home",
      gita: "Bhagavad Gita",
      naamJaap: "Naam Jaap",
      katha: "Katha",
      yatra: "Yatra",
      sadhana: "Sadhana",
      community: "Community",
      store: "Store",
      blog: "Blogs",
      temples: "Temples",
      festivals: "Festivals",
      tithi: "Aaj Ki Tithi",
      quotes: "Quotes",
      mantras: "Mantras",
      bhajan: "Bhajan",
      aarti: "Aarti",
      chalisa: "Chalisa",
      spirituality: "Spiritual Knowledge",
      yatraPlanner: "Yatra Planner",
      sankalp: "Sankalp",
      diary: "Bhakti Diary",
      jaap: "Jaap",
      myJourney: "My Journey",
      moreTitle: "More from Bhakti Voice",
      spiritualTools: "Spiritual Tools",
      library: "Library",
      angelNumbers: "Angel Numbers",
    },
  },
  hi: {
    htmlLang: "hi",
    homeName: "होम",
    more: "और",
    search: "खोजें",
    searchPlaceholder: "भक्ति खोजें...",
    signIn: "साइन इन",
    profile: "प्रोफ़ाइल",
    openMenu: "मेनू खोलें",
    nav: {
      home: "होम",
      gita: "भगवद्गीता",
      naamJaap: "नाम जप",
      katha: "कथा",
      yatra: "यात्रा",
      sadhana: "साधना",
      community: "समुदाय",
      store: "भंडार",
      blog: "ब्लॉग",
      temples: "मंदिर",
      festivals: "त्योहार",
      tithi: "आज की तिथि",
      quotes: "उद्धरण",
      mantras: "मंत्र",
      bhajan: "भजन",
      aarti: "आरती",
      chalisa: "चालीसा",
      spirituality: "आध्यात्मिक ज्ञान",
      yatraPlanner: "यात्रा योजना",
      sankalp: "संकल्प",
      diary: "भक्ति डायरी",
      jaap: "जप",
      myJourney: "मेरी यात्रा",
      moreTitle: "भक्ति वॉइस से और",
      spiritualTools: "आध्यात्मिक उपकरण",
      library: "लाइब्रेरी",
      angelNumbers: "एंजेल नंबर्स",
    },
  },
  te: {
    htmlLang: "te",
    homeName: "హోమ్",
    more: "మరిన్ని",
    search: "శోధించండి",
    searchPlaceholder: "భక్తి అన్వేషణ...",
    signIn: "లాగిన్",
    profile: "ప్రొఫైల్",
    openMenu: "మెనూ తెరవండి",
    nav: {
      home: "హోమ్",
      gita: "భగవద్గీత",
      naamJaap: "నామ జపం",
      katha: "భక్తి కథలు",
      yatra: "తీర్థయాత్రలు",
      sadhana: "దైవ సాధన",
      community: "భక్త సమాజం",
      store: "భక్తి భండార్",
      blog: "ఆధ్యాత్మిక బ్లాగులు",
      temples: "పుణ్యక్షేత్రాలు & ఆలయాలు",
      festivals: "పండుగలు & వ్రతాలు",
      tithi: "ఈరోజు తిథి & పంచాంగం",
      quotes: "సుభాషితాలు & సూక్తులు",
      mantras: "దివ్య మంత్రాలు",
      bhajan: "భజనలు & కీర్తనలు",
      aarti: "మంగళ హారతులు",
      chalisa: "స్తోత్రాలు & చాలీసాలు",
      spirituality: "ఆధ్యాత్మిక జ్ఞానం",
      yatraPlanner: "యాత్రా ప్రణాళిక",
      sankalp: "సంకల్పం",
      diary: "భక్తి డైరీ",
      jaap: "జపం",
      myJourney: "నా ఆధ్యాత్మిక ప్రయాణం",
      moreTitle: "భక్తి వాయిస్ మరిన్ని సేవలు",
      spiritualTools: "ఆధ్యాత్మిక పరికరాలు",
      library: "లైబ్రరీ",
      angelNumbers: "దేవదూత సంఖ్యలు",
    },
  },
};

