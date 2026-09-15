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
    },
  },
};
