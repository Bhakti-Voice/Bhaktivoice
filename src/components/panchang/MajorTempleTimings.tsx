"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  Landmark,
  MapPin,
  Map,
  CheckCircle2,
  AlertCircle,
  Compass,
  Navigation,
  Loader2,
} from "lucide-react";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { PATHS } from "@/lib/seo/paths";
import { createGpsCity, type CityConfig } from "@/lib/panchang/cities";

export interface TempleEntry {
  name: string;
  nameHi: string;
  nameTe: string;
  location: string;
  locationHi: string;
  locationTe: string;
  morning: string;
  evening: string;
  special: string;
  specialHi: string;
  specialTe: string;
  status: "open" | "crowded";
  image: string;
}

export interface TempleCityCluster {
  id: string;
  nameEn: string;
  nameHi: string;
  nameTe: string;
  center: { lat: number; lng: number };
  aliases: string[];
  temples: TempleEntry[];
}

export interface MajorTempleTimingsProps {
  city?: CityConfig;
  cityName?: string;
  cityNameHi?: string;
  cityNameTe?: string;
  isHi?: boolean;
  isTe?: boolean;
  onNearMeClick?: () => void;
  onSelectCity?: (city: CityConfig) => void;
}

// -------------------------------------------------------------
// Distance Utility (Haversine formula in kilometers)
// -------------------------------------------------------------
export function getDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// -------------------------------------------------------------
// 25 Comprehensive Static City & Regional Clusters
// -------------------------------------------------------------
export const TEMPLE_CLUSTERS: Record<string, TempleCityCluster> = {
  // 1. VARANASI (KASHI)
  varanasi: {
    id: "varanasi",
    nameEn: "Varanasi (Kashi)",
    nameHi: "वाराणसी (काशी)",
    nameTe: "వారణాసి (కాశీ)",
    center: { lat: 25.3176, lng: 82.9739 },
    aliases: ["varanasi", "kashi", "banaras", "benares", "mirzapur", "chandauli", "jaunpur", "ghazipur", "bhadohi", "azamgarh"],
    temples: [
      {
        name: "Shri Kashi Vishwanath Jyotirlinga",
        nameHi: "श्री काशी विश्वनाथ ज्योतिर्लिंग",
        nameTe: "శ్రీ కాశీ విశ్వనాథ జ్యోతిర్లింగం",
        location: "Lahori Tola, Kashi",
        locationHi: "लाहौरी टोला, काशी",
        locationTe: "లాహోరి తోలా, కాశీ",
        morning: "03:00 AM – 11:00 AM",
        evening: "12:00 PM – 11:00 PM",
        special: "Mangala Aarti 03:00 AM & Shringar 09:00 PM",
        specialHi: "मंगला आरती भोर 03:00 एवं शृंगार आरती रात्रि 09:00",
        specialTe: "మంగళ హారతి వేకువజామున 03:00 & శృంగార హారతి రా. 09:00",
        status: "open",
        image: "/images/varanasi-ghats.webp",
      },
      {
        name: "Sankat Mochan Hanuman Mandir",
        nameHi: "संकट मोचन हनुमान मंदिर",
        nameTe: "సంకట మోచన హనుమాన్ దేవాలయం",
        location: "Saket Nagar",
        locationHi: "साकेत नगर",
        locationTe: "సాకేత్ నగర్",
        morning: "05:00 AM – 12:00 PM",
        evening: "04:00 PM – 10:00 PM",
        special: "Hanuman Chalisa Path 07:00 PM",
        specialHi: "सामूहिक हनुमान चालीसा पाठ शाम 07:00",
        specialTe: "సామూహిక హనుమాన్ చాలీసా సా. 07:00",
        status: "crowded",
        image: "/images/hanuman-thumb.webp",
      },
      {
        name: "Kaal Bhairav Mandir (Kotwal of Kashi)",
        nameHi: "काल भैरव मंदिर (काशी के कोतवाल)",
        nameTe: "కాల భైరవ దేవాలయం (కాశీ కొత్వాల్)",
        location: "Visheshwarganj",
        locationHi: "विशेष्वरगंज",
        locationTe: "విశేశ్వర్‌గంజ్",
        morning: "05:00 AM – 01:30 PM",
        evening: "04:30 PM – 10:30 PM",
        special: "Sandhya Maha Aarti 07:30 PM",
        specialHi: "संध्या महाआरती शाम 07:30",
        specialTe: "సంధ్యా మహా హారతి సా. 07:30",
        status: "open",
        image: "/images/shiva-idol.webp",
      },
      {
        name: "Maa Annapurna Mandir",
        nameHi: "माँ अन्नपूर्णा मंदिर",
        nameTe: "శ్రీ అన్నపూర్ణా దేవి ఆలయం",
        location: "Vishwanath Gali",
        locationHi: "विश्वनाथ गली",
        locationTe: "విశ్వనాథ గల్లీ",
        morning: "04:00 AM – 11:30 AM",
        evening: "05:00 PM – 10:00 PM",
        special: "Maha Annakoot Bhog Darshan",
        specialHi: "अन्नकूट महाभोग दर्शन दोपहर 12:00",
        specialTe: "మహా అన్నకూట్ భోగ్ దర్శనం మధ్యాహ్నం 12:00",
        status: "open",
        image: "/images/puja-thali.webp",
      },
      {
        name: "Tulsi Manas Mandir",
        nameHi: "तुलसी मानस मंदिर",
        nameTe: "తులసి మానస్ దేవాలయం",
        location: "Durgakund",
        locationHi: "दुर्गाकुण्ड",
        locationTe: "దుర్గాకుండ్",
        morning: "05:30 AM – 12:00 PM",
        evening: "04:00 PM – 09:00 PM",
        special: "Ramcharitmanas Chaupai Recitation",
        specialHi: "रामचरितमानस संगीतमय चौपाई पाठ शाम 06:00",
        specialTe: "రామచరితమానస్ చౌపాయి పఠనం సా. 06:00",
        status: "open",
        image: "/images/ayodhya-mandir.webp",
      },
    ],
  },

  // 2. AYODHYA DHAM
  ayodhya: {
    id: "ayodhya",
    nameEn: "Ayodhya Dham",
    nameHi: "अयोध्या धाम",
    nameTe: "అయోధ్య ధామం",
    center: { lat: 26.7922, lng: 82.1998 },
    aliases: ["ayodhya", "faizabad", "basti", "gonda", "sultanpur", "barabanki", "akbarpur", "ambedkar nagar"],
    temples: [
      {
        name: "Shri Ram Janmabhoomi Mandir",
        nameHi: "श्री राम जन्मभूमि मंदिर",
        nameTe: "శ్రీ రామ జన్మభూమి మందిరం",
        location: "Ramkot, Ayodhya",
        locationHi: "रामकोट, अयोध्या",
        locationTe: "రామ్‌కోట్, అయోధ్య",
        morning: "06:30 AM – 12:00 PM",
        evening: "02:00 PM – 10:00 PM",
        special: "Shringar Aarti 06:30 AM & Sandhya Aarti 07:30 PM",
        specialHi: "शृंगार आरती 06:30 AM एवं संध्या आरती 07:30 PM",
        specialTe: "శృంగార హారతి ఉ. 06:30 & సంధ్యా హారతి సా. 07:30",
        status: "crowded",
        image: "/images/ayodhya-mandir.webp",
      },
      {
        name: "Hanuman Garhi Mandir",
        nameHi: "हनुमान गढ़ी मंदिर",
        nameTe: "హనుమాన్ గఢీ దేవాలయం",
        location: "Sai Nagar, Ayodhya",
        locationHi: "साईं नगर, अयोध्या",
        locationTe: "సాయి నగర్, అయోధ్య",
        morning: "05:00 AM – 12:00 PM",
        evening: "03:00 PM – 11:00 PM",
        special: "Mangala Aarti 05:00 AM & Shayan Aarti 11:00 PM",
        specialHi: "मंगला आरती 05:00 AM एवं शयन आरती 11:00 PM",
        specialTe: "మంగళ హారతి ఉ. 05:00 & శయన హారతి రా. 11:00",
        status: "open",
        image: "/images/hanuman-thumb.webp",
      },
      {
        name: "Kanak Bhawan",
        nameHi: "कनक भवन (सीता राम महल)",
        nameTe: "కనక భవన్ (సీతారాముల భవనం)",
        location: "Tulsi Nagar, Ayodhya",
        locationHi: "तुलसी नगर, अयोध्या",
        locationTe: "తులసి నగర్, అయోధ్య",
        morning: "08:00 AM – 11:30 AM",
        evening: "04:30 PM – 09:30 PM",
        special: "Bhog Aarti 11:30 AM & Sandhya 07:00 PM",
        specialHi: "भोग आरती दोपहर 11:30 एवं संध्या 07:00 PM",
        specialTe: "భోగ్ హారతి ఉ. 11:30 & సంధ్య సా. 07:00",
        status: "open",
        image: "/images/puja-thali.webp",
      },
      {
        name: "Nageshwarnath Mandir",
        nameHi: "नागेश्वरनाथ मंदिर",
        nameTe: "నాగేశ్వర్‌నాథ్ దేవాలయం",
        location: "Ram Ki Paidi, Ayodhya",
        locationHi: "राम की पैड़ी, अयोध्या",
        locationTe: "రామ్ కీ పైడీ, అయోధ్య",
        morning: "05:00 AM – 12:00 PM",
        evening: "04:00 PM – 09:00 PM",
        special: "Jalabhishek & Sandhya Aarti 06:30 PM",
        specialHi: "जलाभिषेक एवं संध्या आरती 06:30 PM",
        specialTe: "జలాభిషేకం & సంధ్యా హారతి సా. 06:30",
        status: "open",
        image: "/images/shiva-idol.webp",
      },
    ],
  },

  // 3. MATHURA & VRINDAVAN (BRAJ)
  mathura: {
    id: "mathura",
    nameEn: "Mathura & Vrindavan (Braj)",
    nameHi: "मथुरा एवं वृन्दावन (ब्रज)",
    nameTe: "మధుర & బృందావనం (బ్రజ్)",
    center: { lat: 27.4924, lng: 77.6737 },
    aliases: ["mathura", "vrindavan", "barsana", "govardhan", "gokul", "nandgaon", "agra", "hathras", "aligarh", "firozabad"],
    temples: [
      {
        name: "Shri Krishna Janmasthan Temple",
        nameHi: "श्री कृष्ण जन्मस्थान मंदिर",
        nameTe: "శ్రీ కృష్ణ జన్మస్థాన మందిరం",
        location: "Deeg Gate, Mathura",
        locationHi: "डीग गेट, मथुरा",
        locationTe: "డీగ్ గేట్, మధుర",
        morning: "05:30 AM – 12:00 PM",
        evening: "04:00 PM – 09:30 PM",
        special: "Mangala Aarti 05:30 AM & Makhan Bhog",
        specialHi: "मंगला आरती 05:30 AM एवं माखन भोग",
        specialTe: "మంగళ హారతి ఉ. 05:30 & వెన్న భోగ్",
        status: "open",
        image: "/images/krishna-hero.webp",
      },
      {
        name: "Shri Banke Bihari Mandir",
        nameHi: "श्री बांके बिहारी मंदिर",
        nameTe: "శ్రీ బంకే బిహారీ మందిరం",
        location: "Vrindavan Dham",
        locationHi: "वृन्दावन धाम",
        locationTe: "బృందావన ధామం",
        morning: "07:45 AM – 12:00 PM",
        evening: "05:30 PM – 09:30 PM",
        special: "Shringar Darshan 08:00 AM & Shayan 09:30 PM",
        specialHi: "शृंगार दर्शन 08:00 AM एवं शयन दर्शन 09:30 PM",
        specialTe: "శృంగార దర్శనం ఉ. 08:00 & శయన దర్శనం రా. 09:30",
        status: "crowded",
        image: "/images/vrindavan-temple.webp",
      },
      {
        name: "Prem Mandir (Love Temple)",
        nameHi: "प्रेम मंदिर",
        nameTe: "ప్రేమ్ మందిర్",
        location: "Raman Reti, Vrindavan",
        locationHi: "रमण रेती, वृन्दावन",
        locationTe: "రమణ్ రేతి, బృందావనం",
        morning: "05:30 AM – 12:00 PM",
        evening: "04:30 PM – 08:30 PM",
        special: "Musical Light & Fountain Show 07:30 PM",
        specialHi: "संगीतमय फव्वारा व प्रकाश लीला 07:30 PM",
        specialTe: "సంగీత లైట్ & ఫౌంటెన్ షో సా. 07:30",
        status: "open",
        image: "/images/vrindavan-temple.webp",
      },
      {
        name: "ISKCON Krishna Balaram Mandir",
        nameHi: "इस्कॉन कृष्ण बलराम मंदिर",
        nameTe: "ఇస్కాన్ కృష్ణ బలరామ మందిరం",
        location: "Bhaktivedanta Swami Marg",
        locationHi: "भक्तिवेदांत स्वामी मार्ग, वृन्दावन",
        locationTe: "భక్తివేదాంత స్వామి మార్గ్, బృందావనం",
        morning: "04:30 AM – 12:45 PM",
        evening: "04:30 PM – 08:30 PM",
        special: "Mangala Aarti 04:30 AM & Gaura Aarti 07:00 PM",
        specialHi: "मंगला आरती 04:30 AM एवं गौर आरती 07:00 PM",
        specialTe: "మంగళ హారతి ఉ. 04:30 & గౌర హారతి సా. 07:00",
        status: "open",
        image: "/images/krishna-hero.webp",
      },
      {
        name: "Radha Raman Mandir",
        nameHi: "श्री राधा रमण मंदिर",
        nameTe: "శ్రీ రాధా రమణ దేవాలయం",
        location: "Chaitanya Ghera, Vrindavan",
        locationHi: "चैतन्य घेरा, वृन्दावन",
        locationTe: "చైతన్య ఘేరా, బృందావనం",
        morning: "08:00 AM – 12:30 PM",
        evening: "06:00 PM – 09:00 PM",
        special: "Mangala Darshan (Unbroken 500-yr Holy Flame)",
        specialHi: "अखंड अग्नि दर्शन एवं मंगला आरती",
        specialTe: "అఖండ జ్యోతి దర్శనం & మంగళ హారతి",
        status: "open",
        image: "/images/puja-thali.webp",
      },
    ],
  },

  // 4. UJJAIN & MALWA (MAHAKAL)
  ujjain: {
    id: "ujjain",
    nameEn: "Ujjain & Malwa",
    nameHi: "उज्जैन एवं मालवा",
    nameTe: "ఉజ్జయిని & మాల్వా",
    center: { lat: 23.1765, lng: 75.7885 },
    aliases: ["ujjain", "indore", "dewas", "ratlam", "dhar", "omkareshwar", "khandwa", "mandsaur", "neemuch", "shajapur"],
    temples: [
      {
        name: "Shri Mahakaleshwar Jyotirlinga",
        nameHi: "श्री महाकालेश्वर ज्योतिर्लिंग",
        nameTe: "శ్రీ మహాకాళేశ్వర జ్యోతిర్లింగం",
        location: "Mahakal Lok, Ujjain",
        locationHi: "महाकाल लोक, उज्जैन",
        locationTe: "మహాకాల్ లోక్, ఉజ్జయిని",
        morning: "04:00 AM – 11:00 PM (Continuous)",
        evening: "04:00 PM – 11:00 PM",
        special: "World-Famous Bhasma Aarti 04:00 AM",
        specialHi: "विश्वप्रसिद्ध भस्म आरती भोर 04:00 AM",
        specialTe: "ప్రపంచ ప్రసిద్ధ భస్మ హారతి ఉ. 04:00",
        status: "crowded",
        image: "/images/ujjain-ghats.webp",
      },
      {
        name: "Kaal Bhairav Mandir",
        nameHi: "काल भैरव मंदिर",
        nameTe: "కాల భైరవ దేవాలయం",
        location: "Bhairavgarh, Ujjain",
        locationHi: "भैरवगढ़, उज्जैन",
        locationTe: "భైరవ్‌గఢ్, ఉజ్జయిని",
        morning: "05:00 AM – 10:00 PM",
        evening: "04:00 PM – 10:00 PM",
        special: "Prasad Chadhawa & Maha Aarti",
        specialHi: "मद्य प्रसाद अर्पण एवं संध्या महाआरती",
        specialTe: "ప్రత్యేక ప్రసాద సమర్పణ & మహా హారతి",
        status: "open",
        image: "/images/shiva-idol.webp",
      },
      {
        name: "Maa Harsiddhi Shaktipeeth",
        nameHi: "माँ हरसिद्धि शक्तिपीठ",
        nameTe: "శ్రీ హర్సిద్ధి శక్తిపీఠం",
        location: "Near Rudrasagar, Ujjain",
        locationHi: "रुद्रसागर के समीप, उज्जैन",
        locationTe: "రుద్రసాగర్ సమీపంలో, ఉజ్జయిని",
        morning: "05:00 AM – 12:00 PM",
        evening: "04:00 PM – 10:00 PM",
        special: "Deep Stambh Lighting (1008 Diyas) 07:00 PM",
        specialHi: "दीप स्तम्भ प्रज्वलन (1008 दीपक) शाम 07:00",
        specialTe: "దీప స్తంభ ప్రజ్వలన (1008 దీపాలు) సా. 07:00",
        status: "open",
        image: "/images/puja-thali.webp",
      },
      {
        name: "Shri Khajrana Ganesh Mandir",
        nameHi: "श्री खजराना गणेश मंदिर",
        nameTe: "శ్రీ ఖజ్రానా గణేష్ దేవాలయం",
        location: "Khajrana, Indore",
        locationHi: "खजराना, इंदौर",
        locationTe: "ఖజ్రానా, ఇండోర్",
        morning: "05:00 AM – 11:00 PM",
        evening: "04:00 PM – 11:00 PM",
        special: "Mangala Aarti 05:00 AM & Modak Bhog",
        specialHi: "मंगला आरती भोर 05:00 एवं मोदक महाभोग",
        specialTe: "మంగళ హారతి ఉ. 05:00 & మోదక భోగ్",
        status: "open",
        image: "/images/lotus-logo-mark.webp",
      },
      {
        name: "Omkareshwar Jyotirlinga",
        nameHi: "श्री ओंकारेश्वर ज्योतिर्लिंग",
        nameTe: "శ్రీ ఓంకారేశ్వర జ్యోతిర్లింగం",
        location: "Mandhata Island, Narmada",
        locationHi: "मांधाता द्वीप, नर्मदा तट",
        locationTe: "మాంధాత ద్వీపం, నర్మదా నది ఒడ్డు",
        morning: "05:00 AM – 12:30 PM",
        evening: "04:00 PM – 09:30 PM",
        special: "Narmada Snan Darshan & Shayan Aarti",
        specialHi: "नर्मदा स्नान दर्शन एवं शयन आरती 09:00 PM",
        specialTe: "నర్మదా స్నాన దర్శనం & శయన హారతి రా. 09:00",
        status: "open",
        image: "/images/shiva-idol.webp",
      },
    ],
  },

  // 5. HARIDWAR & RISHIKESH (DEVBHOOMI)
  haridwar: {
    id: "haridwar",
    nameEn: "Haridwar & Rishikesh",
    nameHi: "हरिद्वार एवं ऋषिकेश",
    nameTe: "హరిద్వార్ & రిషికేశ్",
    center: { lat: 29.9457, lng: 78.1642 },
    aliases: ["haridwar", "rishikesh", "roorkee", "dehradun", "uttarkashi", "tehri", "pauri", "chamoli", "rudraprayag"],
    temples: [
      {
        name: "Har Ki Pauri & Ganga Aarti",
        nameHi: "हर की पौड़ी एवं गंगा आरती",
        nameTe: "హర్ కీ పౌడీ & గంగా హారతి",
        location: "Brahmakund, Haridwar",
        locationHi: "ब्रह्मकुण्ड, हरिद्वार",
        locationTe: "బ్రహ్మకుండ్, హరిద్వార్",
        morning: "05:30 AM – 12:00 PM",
        evening: "05:00 PM – 08:30 PM",
        special: "Maha Ganga Aarti (Sunset approx 06:30 PM)",
        specialHi: "विश्वप्रसिद्ध महा गंगा आरती सूर्यास्त समय",
        specialTe: "విశ్వప్రసిద్ధ మహా గంగా హారతి సూర్యాస్తమయం వేళ",
        status: "crowded",
        image: "/images/varanasi-ghats.webp",
      },
      {
        name: "Maa Mansa Devi Mandir",
        nameHi: "माँ मनसा देवी मंदिर",
        nameTe: "మానసా దేవి ఆలయం",
        location: "Bilwa Parvat, Haridwar",
        locationHi: "बिल्व पर्वत, हरिद्वार",
        locationTe: "బిల్వ పర్వతం, హరిద్వార్",
        morning: "05:00 AM – 12:00 PM",
        evening: "02:00 PM – 09:00 PM",
        special: "Ropeway Udan Khatola & Shringar Aarti",
        specialHi: "उड़न खटोला दर्शन एवं शृंगार आरती",
        specialTe: "రోప్‌వే దర్శనం & శృంగార హారతి",
        status: "open",
        image: "/images/puja-thali.webp",
      },
      {
        name: "Maa Chandi Devi Mandir",
        nameHi: "माँ चण्डी देवी मंदिर",
        nameTe: "చండీ దేవి ఆలయం",
        location: "Neel Parvat, Haridwar",
        locationHi: "नील पर्वत, हरिद्वार",
        locationTe: "నీల్ పర్వతం, హరిద్వార్",
        morning: "06:00 AM – 12:00 PM",
        evening: "03:00 PM – 08:00 PM",
        special: "Siddhapeeth Darshan & Havan",
        specialHi: "सिद्धपीठ दर्शन एवं नित्य महाहवन",
        specialTe: "సిద్ధపీఠ దర్శనం & నిత్య హవనం",
        status: "open",
        image: "/images/lotus-logo-mark.webp",
      },
      {
        name: "Neelkanth Mahadev Mandir",
        nameHi: "नीलकंठ महादेव मंदिर",
        nameTe: "నీలకంఠ మహాదేవ ఆలయం",
        location: "Garhwal Hills, Rishikesh",
        locationHi: "गढ़वाल पर्वत, ऋषिकेश",
        locationTe: "గఢ్వాల్ పర్వతాలు, రిషికేశ్",
        morning: "05:00 AM – 01:00 PM",
        evening: "03:00 PM – 08:30 PM",
        special: "Amrit Manthan Sthal Mahabhishek",
        specialHi: "समुद्र मंथन स्थल जलाभिषेक व महाआरती",
        specialTe: "సముద్ర మథన స్థల జలాభిషేకం",
        status: "open",
        image: "/images/shiva-idol.webp",
      },
      {
        name: "Bharat Mandir (Oldest Temple in Rishikesh)",
        nameHi: "श्री भरत मंदिर",
        nameTe: "శ్రీ భరత్ దేవాలయం",
        location: "Mayakund, Rishikesh",
        locationHi: "मायाकुण्ड, ऋषिकेश",
        locationTe: "మాయాకుండ్, రిషికేశ్",
        morning: "05:00 AM – 11:30 AM",
        evening: "05:00 PM – 09:00 PM",
        special: "Saligram Shila Darshan & Sandhya Aarti",
        specialHi: "शालिग्राम शिला दर्शन व संध्या आरती",
        specialTe: "శాలిగ్రామ శిలా దర్శనం & సంధ్యా హారతి",
        status: "open",
        image: "/images/krishna-hero.webp",
      },
    ],
  },

  // 6. TIRUPATI (BALAJI)
  tirupati: {
    id: "tirupati",
    nameEn: "Tirupati & Tirumala",
    nameHi: "तिरुपति एवं तिरुमला",
    nameTe: "తిరుపతి & తిరుమల",
    center: { lat: 13.6288, lng: 79.4192 },
    aliases: ["tirupati", "tirumala", "chittoor", "kadapa", "nellore", "kalahasti", "renigunta", "puttur", "srikalahasti"],
    temples: [
      {
        name: "Tirumala Venkateswara Swamy Temple",
        nameHi: "तिरुमला वेंकटेश्वर स्वामी मंदिर",
        nameTe: "శ్రీ తిరుమల వేంకటేశ్వర స్వామి దేవాలయం",
        location: "Tirumala Seven Hills",
        locationHi: "तिरुमला सप्तगिरि",
        locationTe: "తిరుమల ఏడు కొండలు",
        morning: "03:00 AM – 11:30 AM",
        evening: "12:00 PM – 11:00 PM",
        special: "Suprabhata Seva 03:00 AM & Sahasranama",
        specialHi: "सुप्रभात सेवा भोर 03:00 एवं सहस्रनाम",
        specialTe: "సుప్రభాత సేవ వేకువజామున 03:00 & సహస్రనామార్చన",
        status: "crowded",
        image: "/images/krishna-hero.webp",
      },
      {
        name: "Sri Padmavathi Ammavari Temple",
        nameHi: "श्री पद्मावती अम्मावारी मंदिर",
        nameTe: "శ్రీ పద్మావతి అమ్మవారి ఆలయం",
        location: "Tiruchanur, Tirupati",
        locationHi: "तिरुचानूर, तिरुपति",
        locationTe: "తిరుచానూరు, తిరుపతి",
        morning: "05:00 AM – 11:45 AM",
        evening: "12:30 PM – 09:00 PM",
        special: "Kumkumarchana & Sarvadarsanam",
        specialHi: "कुंकुमार्चन सेवा एवं सर्वदर्शन",
        specialTe: "కుంకుమార్చన సేవ & సర్వదర్శనం",
        status: "open",
        image: "/images/puja-thali.webp",
      },
      {
        name: "Sri Govindaraja Swami Temple",
        nameHi: "श्री गोविंदराज स्वामी मंदिर",
        nameTe: "శ్రీ గోవిందరాజ స్వామి వారి ఆలయం",
        location: "Tirupati City Center",
        locationHi: "तिरुपति नगर केंद्र",
        locationTe: "తిరుపతి నగరం",
        morning: "05:00 AM – 12:30 PM",
        evening: "03:45 PM – 09:30 PM",
        special: "Viswaroopa Sarva Darshanam",
        specialHi: "विश्वरूप सर्वदर्शन प्रातः 05:30",
        specialTe: "విశ్వరూప సర్వదర్శనం ఉ. 05:30",
        status: "open",
        image: "/images/krishna-hero.webp",
      },
      {
        name: "Sri Kapileswara Swamy Temple",
        nameHi: "श्री कपिलेश्वर स्वामी मंदिर",
        nameTe: "శ్రీ కపిలేశ్వర స్వామి దేవాలయం",
        location: "Kapila Theertham, Tirupati",
        locationHi: "कपिला तीर्थम, तिरुपति",
        locationTe: "కపిల తీర్థం, తిరుపతి",
        morning: "05:00 AM – 12:00 PM",
        evening: "04:00 PM – 08:30 PM",
        special: "Holy Waterfall Snan & Shiva Abhishekam",
        specialHi: "तीर्थ स्नान एवं शिव महाभिषेक",
        specialTe: "తీర్థ స్నానం & శివ మహాభిషేకం",
        status: "open",
        image: "/images/shiva-idol.webp",
      },
      {
        name: "Srikalahasteeswara Temple (Rahu-Ketu Kshetra)",
        nameHi: "श्री कालहस्तीश्वर मंदिर (राहु-केतु क्षेत्र)",
        nameTe: "శ్రీ కాళహస్తీశ్వర దేవాలయం (రాహు-కేతు క్షేత్రం)",
        location: "Srikalahasti, Chittoor",
        locationHi: "श्रीकालहस्ती, चित्तूर",
        locationTe: "శ్రీకాళహస్తి, చిత్తూరు",
        morning: "06:00 AM – 12:00 PM",
        evening: "04:00 PM – 09:00 PM",
        special: "Rahu Ketu Sarpa Dosha Nivarana Puja",
        specialHi: "राहु-केतु सर्प दोष निवारण महापूजा",
        specialTe: "రాహు-కేతు సర్ప దోష నివారణ పూజ",
        status: "open",
        image: "/images/shiva-idol.webp",
      },
    ],
  },

  // 7. DELHI NCR
  delhi: {
    id: "delhi",
    nameEn: "Delhi NCR",
    nameHi: "दिल्ली राष्ट्रीय राजधानी क्षेत्र",
    nameTe: "ఢిల్లీ NCR",
    center: { lat: 28.6139, lng: 77.209 },
    aliases: ["delhi", "new delhi", "noida", "greater noida", "gurugram", "gurgaon", "faridabad", "ghaziabad", "meerut", "alwar", "sonipat", "panipat"],
    temples: [
      {
        name: "Swaminarayan Akshardham Mandir",
        nameHi: "स्वामीनारायण अक्षरधाम मंदिर",
        nameTe: "స్వామినారాయణ్ అక్షరధామ్ మందిరం",
        location: "NH 24, Pandav Nagar",
        locationHi: "एनएच 24, पांडव नगर",
        locationTe: "ఎన్‌హెచ్ 24, పాండవ నగర్",
        morning: "09:30 AM – 01:00 PM",
        evening: "04:00 PM – 08:00 PM",
        special: "Sahaj Anand Water Laser Show 07:15 PM",
        specialHi: "सहज आनंद वाटर लेजर शो शाम 07:15",
        specialTe: "సహజ్ ఆనంద్ వాటర్ లేజర్ షో సా. 07:15",
        status: "open",
        image: "/images/ayodhya-mandir.webp",
      },
      {
        name: "Jhandewalan Devi Mandir",
        nameHi: "झंडेवालान देवी मंदिर",
        nameTe: "ఝండేవాళాన్ దేవి దేవాలయం",
        location: "Karol Bagh, New Delhi",
        locationHi: "करोल बाग, नई दिल्ली",
        locationTe: "కరోల్ బాగ్, న్యూఢిల్లీ",
        morning: "05:30 AM – 12:00 PM",
        evening: "04:00 PM – 10:00 PM",
        special: "Maa Durga Aarti 07:00 PM",
        specialHi: "माँ दुर्गा दिव्य आरती शाम 07:00",
        specialTe: "మా దుర్గా దివ్య హారతి సా. 07:00",
        status: "crowded",
        image: "/images/puja-thali.webp",
      },
      {
        name: "Birla Mandir (Laxminarayan Temple)",
        nameHi: "बिड़ला मंदिर (लक्ष्मीनारायण मंदिर)",
        nameTe: "బిర్లా మందిర్ (లక్ష్మీనారాయణ దేవాలయం)",
        location: "Mandir Marg, Connaught Place",
        locationHi: "मंदिर मार्ग, कनॉट प्लेस",
        locationTe: "మందిర్ మార్గ్, కన్నాట్ ప్లేస్",
        morning: "06:00 AM – 12:30 PM",
        evening: "03:00 PM – 09:30 PM",
        special: "Laxmi Narayan Sandhya Aarti 07:00 PM",
        specialHi: "लक्ष्मीनारायण संध्या आरती शाम 07:00",
        specialTe: "లక్ష్మీనారాయణ సంధ్యా హారతి సా. 07:00",
        status: "open",
        image: "/images/krishna-hero.webp",
      },
      {
        name: "Kalkaji Mandir (Manokamna Siddha Peeth)",
        nameHi: "कालकाजी मंदिर (मनोकामना सिद्ध पीठ)",
        nameTe: "కాల్కాజీ దేవాలయం (మనోకామనా సిద్ద పీఠం)",
        location: "Kalkaji, South Delhi",
        locationHi: "कालकाजी, दक्षिण दिल्ली",
        locationTe: "కాల్కాజీ, దక్షిణ ఢిల్లీ",
        morning: "04:00 AM – 11:30 AM",
        evening: "12:00 PM – 11:30 PM",
        special: "Mata Shringar Aarti 06:00 AM & 07:00 PM",
        specialHi: "माता शृंगार आरती प्रातः 06:00 एवं शाम 07:00",
        specialTe: "మాతా శృంగార హారతి ఉ. 06:00 & సా. 07:00",
        status: "open",
        image: "/images/lotus-logo-mark.webp",
      },
      {
        name: "Pracheen Hanuman Mandir",
        nameHi: "प्राचीन हनुमान मंदिर",
        nameTe: "ప్రాచీన హనుమాన్ దేవాలయం",
        location: "Baba Kharak Singh Marg, CP",
        locationHi: "बाबा खड़क सिंह मार्ग, कनॉट प्लेस",
        locationTe: "బాబా ఖడక్ సింగ్ మార్గ్, కన్నాట్ ప్లేస్",
        morning: "05:00 AM – 11:00 PM",
        evening: "Open Continuously on Tue/Sat",
        special: "Akhand Ram Naam Jaap (Guinness Record)",
        specialHi: "अखंड श्रीराम नाम संकीर्तन (गिनीज रिकॉर्ड)",
        specialTe: "అఖండ శ్రీరామ నామ సంకీర్తన",
        status: "crowded",
        image: "/images/hanuman-thumb.webp",
      },
    ],
  },

  // 8. MUMBAI & KONKAN
  mumbai: {
    id: "mumbai",
    nameEn: "Mumbai & Konkan",
    nameHi: "मुंबई एवं कोंकण",
    nameTe: "ముంబై & కొంకణ్",
    center: { lat: 19.076, lng: 72.8777 },
    aliases: ["mumbai", "bombay", "thane", "navi mumbai", "kalyan", "dombivli", "vasai", "virar", "panvel", "raigad", "alibaug"],
    temples: [
      {
        name: "Shree Siddhivinayak Ganapati Mandir",
        nameHi: "श्री सिद्धिविनायक गणपति मंदिर",
        nameTe: "శ్రీ సిద్ధివినాయక గణపతి దేవాలయం",
        location: "Prabhadevi, Mumbai",
        locationHi: "प्रभादेवी, मुंबई",
        locationTe: "ప్రభావదేవి, ముంబై",
        morning: "05:30 AM – 12:15 PM",
        evening: "01:30 PM – 10:00 PM",
        special: "Kakad Aarti 05:30 AM & Shej Aarti 10:00 PM",
        specialHi: "काकड़ आरती भोर 05:30 एवं शेज आरती रात्रि 10:00",
        specialTe: "కాకడ్ హారతి ఉ. 05:30 & షేజ్ హారతి రా. 10:00",
        status: "crowded",
        image: "/images/lotus-logo-mark.webp",
      },
      {
        name: "Shri Mahalaxmi Mandir",
        nameHi: "श्री महालक्ष्मी मंदिर",
        nameTe: "శ్రీ మహాలక్ష్మి దేవాలయం",
        location: "Bhulabhai Desai Road, Breach Candy",
        locationHi: "भूलाभाई देसाई मार्ग, ब्रीच कैंडी",
        locationTe: "భూలాభాయ్ దేశాయ్ రోడ్, బ్రీచ్ క్యాండీ",
        morning: "06:00 AM – 12:00 PM",
        evening: "01:00 PM – 10:00 PM",
        special: "Tridevi Darshan & Dhoop Aarti 06:30 PM",
        specialHi: "त्रिदेवी दर्शन एवं धूप आरती शाम 06:30",
        specialTe: "త్రిదేవి దర్శనం & ధూప హారతి సా. 06:30",
        status: "open",
        image: "/images/puja-thali.webp",
      },
      {
        name: "Mumba Devi Mandir",
        nameHi: "मुम्बा देवी मंदिर",
        nameTe: "ముంబా దేవి దేవాలయం",
        location: "Bhuleshwar, Mumbai",
        locationHi: "भूलेश्वर, मुंबई",
        locationTe: "భూలేశ్వర్, ముంబై",
        morning: "06:00 AM – 12:00 PM",
        evening: "04:00 PM – 09:00 PM",
        special: "Patron Goddess of Mumbai Shringar Aarti",
        specialHi: "मुंबई की अधिष्ठात्री देवी शृंगार आरती",
        specialTe: "ముంబై గ్రామ దేవత శృంగార హారతి",
        status: "open",
        image: "/images/puja-thali.webp",
      },
      {
        name: "Babulnath Shiva Mandir",
        nameHi: "बाबूframeलनाथ शिव मंदिर",
        nameTe: "బాబుల్‌నాథ్ శివాలయం",
        location: "Malabar Hill, Mumbai",
        locationHi: "मालाबार हिल, मुंबई",
        locationTe: "మలబార్ హిల్, ముంబై",
        morning: "05:00 AM – 12:00 PM",
        evening: "04:00 PM – 10:00 PM",
        special: "Somwar Rudrabhishek & Sandhya Aarti",
        specialHi: "सोमवार रुद्राभिषेक एवं संध्या महाआरती",
        specialTe: "సోమవార రుద్రాభిషేకం & సంధ్యా హారతి",
        status: "open",
        image: "/images/shiva-idol.webp",
      },
      {
        name: "ISKCON Temple Juhu (Hare Krishna Land)",
        nameHi: "इस्कॉन मंदिर जुहू",
        nameTe: "ఇస్కాన్ దేవాలయం జుహు",
        location: "Juhu, Mumbai",
        locationHi: "जुहू, मुंबई",
        locationTe: "జుహు, ముంబై",
        morning: "04:30 AM – 01:00 PM",
        evening: "04:30 PM – 09:00 PM",
        special: "Mangala Aarti 04:30 AM & Sandhya Aarti 07:00 PM",
        specialHi: "मंगला आरती 04:30 AM एवं संध्या आरती 07:00 PM",
        specialTe: "మంగళ హారతి ఉ. 04:30 & సంధ్యా హారతి సా. 07:00",
        status: "open",
        image: "/images/krishna-hero.webp",
      },
    ],
  },

  // 9. PUNE & WESTERN MAHARASHTRA
  pune: {
    id: "pune",
    nameEn: "Pune & Western Maharashtra",
    nameHi: "पुणे एवं पश्चिम महाराष्ट्र",
    nameTe: "పుణే & పశ్చిమ మహారాష్ట్ర",
    center: { lat: 18.5204, lng: 73.8567 },
    aliases: ["pune", "poona", "pcmc", "pimpri", "chinchwad", "satara", "solapur", "kolhapur", "ahmednagar", "shirdi", "nashik", "trimbak"],
    temples: [
      {
        name: "Shreemant Dagdusheth Halwai Ganpati",
        nameHi: "श्रीमंत दगडूशेठ हलवाई गणपति",
        nameTe: "శ్రీమంత్ దగ్దుశేట్ హల్వాయి గణపతి",
        location: "Budhwar Peth, Pune",
        locationHi: "बुधवार पेठ, पुणे",
        locationTe: "బుధవార పేట్, పుణే",
        morning: "06:00 AM – 11:00 PM",
        evening: "04:00 PM – 11:00 PM",
        special: "Suprabhatam 06:00 AM & Maha Aarti 07:30 PM",
        specialHi: "सुप्रभात आरती 06:00 AM एवं महाआरती 07:30 PM",
        specialTe: "సుప్రభాత హారతి ఉ. 06:00 & మహా హారతి సా. 07:30",
        status: "crowded",
        image: "/images/lotus-logo-mark.webp",
      },
      {
        name: "Shri Saibaba Sansthan Temple",
        nameHi: "श्री साईबाबा समाधि मंदिर",
        nameTe: "శ్రీ సాయిబాబా సమాధి మందిరం",
        location: "Shirdi, Ahmednagar",
        locationHi: "शिर्डी, अहमदनगर",
        locationTe: "షిర్డీ, అహ్మద్‌నగర్",
        morning: "04:30 AM – 11:15 PM (Continuous)",
        evening: "04:00 PM – 11:15 PM",
        special: "Kakad Aarti 04:30 AM & Shej Aarti 10:30 PM",
        specialHi: "काकड़ आरती भोर 04:30 एवं शेज आरती रात्रि 10:30",
        specialTe: "కాకడ్ హారతి ఉ. 04:30 & షేజ్ హారతి రా. 10:30",
        status: "crowded",
        image: "/images/puja-thali.webp",
      },
      {
        name: "Alandi Sant Dnyaneshwar Samadhi",
        nameHi: "आळंदी संत ज्ञानेश्वर महाराज समाधि",
        nameTe: "ఆలంది సంత్ జ్ఞానేశ్వర్ సమాధి",
        location: "Alandi, Indrayani Riverbank",
        locationHi: "आळंदी, इंद्रायणी तट",
        locationTe: "ఆలంది, ఇంద్రాయణి నది ఒడ్డు",
        morning: "05:00 AM – 11:30 AM",
        evening: "04:00 PM – 09:30 PM",
        special: "Palkhi Darshan & Haripath Recitation",
        specialHi: "पालखी दर्शन एवं हरिपाठ शाम 07:00",
        specialTe: "పాల్కీ దర్శనం & హరిపాత్ పఠనం సా. 07:00",
        status: "open",
        image: "/images/lotus-logo-mark.webp",
      },
      {
        name: "Shri Mahalakshmi Ambabai Mandir",
        nameHi: "श्री महालक्ष्मी अंबाबाई मंदिर",
        nameTe: "శ్రీ మహాలక్ష్మి అంబాబాయి దేవాలయం",
        location: "Kolhapur, Maharashtra",
        locationHi: "कोल्हापुर, महाराष्ट्र",
        locationTe: "కొల్హాపూర్, మహారాష్ట్ర",
        morning: "05:00 AM – 11:30 AM",
        evening: "04:00 PM – 10:00 PM",
        special: "Kiranotsav Darshan & Kakad Aarti",
        specialHi: "किरणोत्सव दर्शन एवं काकड़ आरती 05:00 AM",
        specialTe: "కిరణోత్సవ దర్శనం & కాకడ్ హారతి",
        status: "open",
        image: "/images/puja-thali.webp",
      },
      {
        name: "Trimbakeshwar Jyotirlinga Mandir",
        nameHi: "श्री त्र्यंबकेश्वर ज्योतिर्लिंग मंदिर",
        nameTe: "శ్రీ త్రయంబకేశ్వర జ్యోతిర్లింగ దేవాలయం",
        location: "Trimbak, Nashik (Godavari Origin)",
        locationHi: "त्र्यंबक, नासिक (गोदावरी उद्गम)",
        locationTe: "త్రయంబక్, నాసిక్ (గోదావరి జన్మస్థలం)",
        morning: "05:30 AM – 01:00 PM",
        evening: "04:00 PM – 09:00 PM",
        special: "Rudra Snan & Golden Crown Darshan",
        specialHi: "रुद्र स्नान एवं सुवर्ण मुकुट दर्शन",
        specialTe: "రుద్ర స్నానం & స్వర్ణ కిరీట దర్శనం",
        status: "crowded",
        image: "/images/shiva-idol.webp",
      },
    ],
  },

  // 10. HYDERABAD & TELANGANA
  hyderabad: {
    id: "hyderabad",
    nameEn: "Hyderabad & Telangana",
    nameHi: "हैदराबाद एवं तेलंगाना",
    nameTe: "హైదరాబాద్ & తెలంగాణ",
    center: { lat: 17.385, lng: 78.4867 },
    aliases: ["hyderabad", "secunderabad", "cyberabad", "rangareddy", "medchal", "warangal", "karimnagar", "yadadri", "nizamabad", "khammam"],
    temples: [
      {
        name: "Chilkur Balaji Temple (Visa Balaji)",
        nameHi: "चिलकूर बालाजी मंदिर (वीजा बालाजी)",
        nameTe: "చిలుకూరు బాలాజీ దేవాలయం (వీసా బాలాజీ)",
        location: "Gandipet, Hyderabad",
        locationHi: "गांडीपेट, हैदराबाद",
        locationTe: "గండిపేట, హైదరాబాద్",
        morning: "05:00 AM – 11:30 AM",
        evening: "04:00 PM – 08:00 PM",
        special: "108 Pradakshinas & No Hundi Practice",
        specialHi: "108 परिक्रमा संकल्प (बिना हुंडी/दानपात्र)",
        specialTe: "108 ప్రదక్షిణల సంకల్పం (హుండీ లేని ఆలయం)",
        status: "crowded",
        image: "/images/krishna-hero.webp",
      },
      {
        name: "Birla Mandir (Venkateswara Temple)",
        nameHi: "बिड़ला मंदिर (वेंकटेश्वर स्वामी)",
        nameTe: "బిర్లా మందిర్ (వేంకటేశ్వర స్వామి)",
        location: "Naubat Pahad, Hill Fort Road",
        locationHi: "नौबत पहाड़, हैदराबाद",
        locationTe: "నౌబత్ పహాడ్, హైదరాబాద్",
        morning: "07:00 AM – 12:00 PM",
        evening: "03:00 PM – 09:00 PM",
        special: "Panoramic City View & Evening Aarti 07:00 PM",
        specialHi: "पर्वतीय नगर दर्शन एवं संध्या आरती 07:00 PM",
        specialTe: "నగర సుందర దృశ్యం & సంధ్యా హారతి సా. 07:00",
        status: "open",
        image: "/images/puja-thali.webp",
      },
      {
        name: "Sri Lakshmi Narasimha Swamy Temple",
        nameHi: "श्री लक्ष्मी नृसिंह स्वामी मंदिर",
        nameTe: "శ్రీ లక్ష్మీ నరసింహ స్వామి వారి దేవాలయం",
        location: "Yadagirigutta (Yadadri)",
        locationHi: "यादगिरिगुट्टा (यादाद्री)",
        locationTe: "యాదగిరిగుట్ట (యాదాద్రి)",
        morning: "04:00 AM – 12:30 PM",
        evening: "03:00 PM – 09:30 PM",
        special: "Suprabhatham & Nitya Kalyanam 09:30 AM",
        specialHi: "सुप्रभातम् एवं नित्य कल्याणम् 09:30 AM",
        specialTe: "సుప్రభాతం & నిత్య కళ్యాణం ఉ. 09:30",
        status: "open",
        image: "/images/krishna-hero.webp",
      },
      {
        name: "Shri Jagannath Temple",
        nameHi: "श्री जगन्नाथ मंदिर",
        nameTe: "శ్రీ జగన్నాథ దేవాలయం",
        location: "Road No. 12, Banjara Hills",
        locationHi: "बंजारा हिल्स, हैदराबाद",
        locationTe: "బంజారా హిల్స్, హైదరాబాద్",
        morning: "06:00 AM – 12:00 PM",
        evening: "05:00 PM – 09:00 PM",
        special: "Puri Architecture Replica & Evening Sandhya",
        specialHi: "पुरी शैली शिखर दर्शन एवं संध्या आरती",
        specialTe: "పూరీ శైలి మందిరం & సంధ్యా హారతి",
        status: "open",
        image: "/images/puja-thali.webp",
      },
      {
        name: "Peddamma Gudi Temple",
        nameHi: "पेद्दम्मा गुड़ी मंदिर",
        nameTe: "పెద్దమ్మ గుడి దేవాలయం",
        location: "Jubilee Hills, Hyderabad",
        locationHi: "जुबली हिल्स, हैदराबाद",
        locationTe: "జూబ్లీహిల్స్, హైదరాబాద్",
        morning: "06:00 AM – 01:00 PM",
        evening: "03:00 PM – 08:30 PM",
        special: "Bonalu Celebrations & Ammavari Darshan",
        specialHi: "बोनालू उत्सव एवं अम्मावारी विशेष दर्शन",
        specialTe: "బోనాల ఉత్సవాలు & అమ్మవారి ప్రత్యేక దర్శనం",
        status: "open",
        image: "/images/lotus-logo-mark.webp",
      },
    ],
  },

  // 11. BENGALURU & KARNATAKA
  bengaluru: {
    id: "bengaluru",
    nameEn: "Bengaluru & Karnataka",
    nameHi: "बेंगलुरु एवं कर्नाटक",
    nameTe: "బెంగళూరు & కర్ణాటక",
    center: { lat: 12.9716, lng: 77.5946 },
    aliases: ["bengaluru", "bangalore", "mysuru", "mysore", "tumakuru", "kolar", "ramanagara", "mandya", "hassan", "shivamogga"],
    temples: [
      {
        name: "Dodda Basavana Gudi (Bull Temple)",
        nameHi: "दोड्डा बसवन्ना गुड़ी (नंदी बैल मंदिर)",
        nameTe: "దొడ్డ బసవన గుడి (ఎద్దు దేవాలయం)",
        location: "Basavanagudi, South Bengaluru",
        locationHi: "बसवनागुड़ी, दक्षिण बेंगलुरु",
        locationTe: "బసవనగుడి, దక్షిణ బెంగళూరు",
        morning: "06:00 AM – 12:30 PM",
        evening: "05:30 PM – 09:00 PM",
        special: "Maha Nandi Abhisheka & Kadalekai Parishe",
        specialHi: "महा नंदी अभिषेक एवं कदलेकाई परिषे",
        specialTe: "మహా నంది అభిషేకం & కడలేకాయి పరిషె",
        status: "open",
        image: "/images/shiva-idol.webp",
      },
      {
        name: "Sri Someshwara Swamy Temple",
        nameHi: "श्री सोमेश्वर स्वामी मंदिर (चोल कालीन)",
        nameTe: "శ్రీ సోమేశ్వర స్వామి దేవాలయం (చోళుల కాలం)",
        location: "Ulsoor / Halasuru, Bengaluru",
        locationHi: "अलसूर / हलसूरु, बेंगलुरु",
        locationTe: "హలసూరు, బెంగళూరు",
        morning: "06:00 AM – 12:00 PM",
        evening: "05:30 PM – 09:00 PM",
        special: "Chola Dynasty Heritage & Pradosham Abhishekam",
        specialHi: "चोल कालीन वास्तुकला एवं प्रदोष महाभिषेक",
        specialTe: "చోళుల శిల్పకళ & ప్రదోష పూజ",
        status: "open",
        image: "/images/shiva-idol.webp",
      },
      {
        name: "ISKCON Sri Radha Krishna Temple",
        nameHi: "इस्कॉन श्री राधा कृष्ण मंदिर",
        nameTe: "ఇస్కాన్ శ్రీ రాధా కృష్ణ దేవాలయం",
        location: "Hare Krishna Hill, Rajajinagar",
        locationHi: "राजाजीनगर, बेंगलुरु",
        locationTe: "రాజాజీనగర్, బెంగళూరు",
        morning: "04:15 AM – 01:00 PM",
        evening: "04:15 PM – 08:30 PM",
        special: "Suprabhata 04:15 AM & Harinam Sankirtan",
        specialHi: "सुप्रभात आरती 04:15 AM एवं महासंकीर्तन",
        specialTe: "సుప్రభాతం ఉ. 04:15 & హరినామ సంకీర్తన",
        status: "crowded",
        image: "/images/krishna-hero.webp",
      },
      {
        name: "Banashankari Amma Temple",
        nameHi: "बनशंकरी अम्मा मंदिर",
        nameTe: "బనశంకరి అమ్మ దేవాలయం",
        location: "Kanakanapalya, Banashankari",
        locationHi: "बनशंकरी, बेंगलुरु",
        locationTe: "బనశంకరి, బెంగళూరు",
        morning: "06:00 AM – 01:00 PM",
        evening: "04:30 PM – 09:00 PM",
        special: "Rahu Kala Puja on Tuesday & Friday",
        specialHi: "राहुकाल विशेष पूजा एवं दीप अर्पण",
        specialTe: "మంగళ, శుక్రవారాల్లో రాహుకాల దీపారాధన",
        status: "open",
        image: "/images/puja-thali.webp",
      },
      {
        name: "Chamundeshwari Temple",
        nameHi: "श्री चामुंडेश्वरी देवी मंदिर",
        nameTe: "శ్రీ చాముండేశ్వరి దేవి ఆలయం",
        location: "Chamundi Hills, Mysuru",
        locationHi: "चामुंडी हिल्स, मैसूरु",
        locationTe: "చాముండి కొండలు, మైసూరు",
        morning: "07:30 AM – 02:00 PM",
        evening: "03:30 PM – 09:00 PM",
        special: "Maha Abhisheka 07:30 AM & Dasara Festival",
        specialHi: "महाभिषेक प्रातः 07:30 एवं भव्य दशहरा उत्सव",
        specialTe: "మహాభిషేకం ఉ. 07:30 & దసరా ఉత్సవాలు",
        status: "open",
        image: "/images/puja-thali.webp",
      },
    ],
  },

  // 12. CHENNAI & NORTHERN TAMIL NADU
  chennai: {
    id: "chennai",
    nameEn: "Chennai & Northern Tamil Nadu",
    nameHi: "चेन्नई एवं उत्तर तमिलनाडु",
    nameTe: "చెన్నై & ఉత్తర తమిళనాడు",
    center: { lat: 13.0827, lng: 80.2707 },
    aliases: ["chennai", "madras", "kanchipuram", "chengalpattu", "tiruvallur", "vellore", "mahabalipuram", "kanchi"],
    temples: [
      {
        name: "Arulmigu Kapaleeshwarar Temple",
        nameHi: "कपालेश्वरर मंदिर (मायलापुर)",
        nameTe: "కపాలీశ్వరర్ దేవాలయం (మైలాపూర్)",
        location: "Mylapore, Chennai",
        locationHi: "मायलापुर, चेन्नई",
        locationTe: "మైలాపూర్, చెన్నై",
        morning: "05:30 AM – 12:00 PM",
        evening: "04:00 PM – 09:30 PM",
        special: "Kala Sandhi 06:00 AM & Sayaratchai 06:00 PM",
        specialHi: "काल संधि पूजा 06:00 AM एवं सायरट्चै आरती",
        specialTe: "కాల సంధి పూజ ఉ. 06:00 & సాయారట్చై హారతి",
        status: "open",
        image: "/images/shiva-idol.webp",
      },
      {
        name: "Arulmigu Parthasarathy Swamy Temple",
        nameHi: "पार्थसारथी स्वामी मंदिर (महाभारत स्थल)",
        nameTe: "పార్థసారథి స్వామి ఆలయం",
        location: "Triplicane, Chennai",
        locationHi: "ट्रिप्लिकेन, चेन्नई",
        locationTe: "ట్రిప్లికేన్, చెన్నై",
        morning: "05:50 AM – 12:30 PM",
        evening: "04:00 PM – 09:00 PM",
        special: "Viswaroopa Darshan 05:50 AM & Thiru Pavai",
        specialHi: "विश्वरूप दर्शन प्रातः 05:50 एवं तिरुप्पावै",
        specialTe: "విశ్వరూప దర్శనం ఉ. 05:50 & తిరుప్పావై",
        status: "open",
        image: "/images/krishna-hero.webp",
      },
      {
        name: "Vadapalani Murugan Temple",
        nameHi: "वडपलानी मुरुगन मंदिर",
        nameTe: "వడపళని మురుగన్ దేవాలయం",
        location: "Vadapalani, Chennai",
        locationHi: "वडपलानी, चेन्नई",
        locationTe: "వడపళని, చెన్నై",
        morning: "05:30 AM – 12:30 PM",
        evening: "04:00 PM – 09:00 PM",
        special: "Palkudam Abhishekam & Uchikkalam",
        specialHi: "दूध अभिषेक एवं उचिकालम पूजा दोपहर 12:00",
        specialTe: "పాలభిషేకం & ఉచ్చికాల పూజ",
        status: "open",
        image: "/images/puja-thali.webp",
      },
      {
        name: "Sri Kamakshi Amman Temple",
        nameHi: "श्री कामाक्षी अम्मन मंदिर (शक्तिपीठ)",
        nameTe: "శ్రీ కామాక్షి అమ్మవారి దేవాలయం (శక్తిపీఠం)",
        location: "Kanchipuram, Tamil Nadu",
        locationHi: "कांचीपुरम, तमिलनाडु",
        locationTe: "కాంచీపురం, తమిళనాడు",
        morning: "05:30 AM – 12:15 PM",
        evening: "04:00 PM – 08:30 PM",
        special: "Navavarna Puja & Suvasini Archana",
        specialHi: "नवावरण पूजा एवं श्री चक्र अर्चना",
        specialTe: "నవావరణ పూజ & శ్రీచక్ర అర్చన",
        status: "open",
        image: "/images/lotus-logo-mark.webp",
      },
      {
        name: "Arulmigu Marundeeswarar Temple",
        nameHi: "मरुंदीश्वरर मंदिर (आरोग्य दाता शिव)",
        nameTe: "మరుందీశ్వరర్ దేవాలయం (ఆరోగ్య ప్రదాత శివుడు)",
        location: "Thiruvanmiyur, Chennai",
        locationHi: "तिरुवान्मियुर, चेन्नई",
        locationTe: "తిరువాన్మియూర్, చెన్నై",
        morning: "06:00 AM – 12:00 PM",
        evening: "04:00 PM – 09:00 PM",
        special: "Aushadha Prasad (Sacred Medicinal Ash)",
        specialHi: "औषध भस्म प्रसाद एवं प्रदोष काल पूजा",
        specialTe: "ఔషధ ప్రసాదం & ప్రదోష పూజ",
        status: "open",
        image: "/images/shiva-idol.webp",
      },
    ],
  },

  // 13. MADURAI & SOUTHERN TAMIL NADU
  madurai: {
    id: "madurai",
    nameEn: "Madurai & Southern Tamil Nadu",
    nameHi: "मदुरै एवं दक्षिण तमिलनाडु",
    nameTe: "మదురై & దక్షిణ తమిళనాడు",
    center: { lat: 9.9252, lng: 78.1198 },
    aliases: ["madurai", "rameswaram", "tirunelveli", "trichy", "tiruchirappalli", "thanjavur", "dindigul", "palani", "kanyakumari"],
    temples: [
      {
        name: "Arulmigu Meenakshi Sundareswarar Temple",
        nameHi: "मीनाक्षी सुंदरेश्वरर मंदिर",
        nameTe: "మీనాక్షి సుందరేశ్వరర్ దేవాలయం",
        location: "Madurai City Center",
        locationHi: "मदुरै नगर केंद्र",
        locationTe: "మదురై నగరం",
        morning: "05:00 AM – 12:30 PM",
        evening: "04:00 PM – 10:00 PM",
        special: "Thiruvanandal Seva & Bed Chamber Procession",
        specialHi: "तिरुवनंदल सेवा 05:00 AM एवं पल्ली अराइ उत्सव",
        specialTe: "తిరువనందల్ సేవ ఉ. 05:00 & పల్లి అరై ఉత్సవం",
        status: "crowded",
        image: "/images/puja-thali.webp",
      },
      {
        name: "Ramanathaswamy Jyotirlinga Temple",
        nameHi: "श्री रामनाथस्वामी ज्योतिर्लिंग",
        nameTe: "శ్రీ రామనాథస్వామి జ్యోతిర్లింగ దేవాలయం",
        location: "Rameswaram Island",
        locationHi: "रामेश्वरम द्वीप, तमिलनाडु",
        locationTe: "రామేశ్వరం ద్వీపం",
        morning: "05:00 AM – 01:00 PM",
        evening: "03:00 PM – 09:00 PM",
        special: "Spadika Linga Darshan 05:00 AM & 22 Theerthams",
        specialHi: "स्फटिक लिंग दर्शन 05:00 AM एवं 22 तीर्थ स्नान",
        specialTe: "స్పటిక లింగ దర్శనం ఉ. 05:00 & 22 పుణ్య తీర్థాలు",
        status: "crowded",
        image: "/images/shiva-idol.webp",
      },
      {
        name: "Arulmigu Dhandayuthapani Swamy Murugan",
        nameHi: "दंडायुधपाणि स्वामी मुरुगन मंदिर",
        nameTe: "దండాయుధపాణి స్వామి మురుగన్ దేవాలయం",
        location: "Palani Hills, Dindigul",
        locationHi: "पलानी हिल्स, डिंडीगुल",
        locationTe: "పళని కొండలు, దిండిగల్",
        morning: "06:00 AM – 12:30 PM",
        evening: "03:30 PM – 09:00 PM",
        special: "Navabashanam Idol Darshan & Panchamirtham",
        specialHi: "नवपाषाण विग्रह दर्शन एवं पंचामृत अभिषेक",
        specialTe: "నవపాషాణ విగ్రహ దర్శనం & పంచామృత భోగ్",
        status: "open",
        image: "/images/lotus-logo-mark.webp",
      },
      {
        name: "Brihadeeswara Temple (Big Temple)",
        nameHi: "बृहदीश्वर मंदिर (तंजौर का महान चोल मंदिर)",
        nameTe: "బృహదీశ్వర దేవాలయం (తంజావూరు)",
        location: "Thanjavur, Tamil Nadu",
        locationHi: "तंजावुर, तमिलनाडु",
        locationTe: "తంజావూరు, తమిళనాడు",
        morning: "06:00 AM – 12:30 PM",
        evening: "04:00 PM – 08:30 PM",
        special: "UNESCO Heritage Chola Architecture & Nandi Abhishekam",
        specialHi: "यूनेस्को विश्व धरोहर वास्तुकला व महा नंदी अभिषेक",
        specialTe: "యునెస్కో వారసత్వ సంపద & మహా నంది పూజ",
        status: "open",
        image: "/images/shiva-idol.webp",
      },
      {
        name: "Sri Ranganathaswamy Temple",
        nameHi: "श्री रंगनाथस्वामी मंदिर (श्रीरंगम)",
        nameTe: "శ్రీ రంగనాథస్వామి ఆలయం (శ్రీరంగం)",
        location: "Srirangam Island, Trichy",
        locationHi: "श्रीरंगम द्वीप, तिरुचिरापल्ली",
        locationTe: "శ్రీరంగం, తిరుచ్చి",
        morning: "06:00 AM – 01:00 PM",
        evening: "03:30 PM – 09:00 PM",
        special: "Vishwaroopa Seva 06:00 AM & 108 Divya Desam Chief",
        specialHi: "विश्वरूप सेवा प्रातः 06:00 एवं 108 दिव्य देशम् प्रधान",
        specialTe: "విశ్వరూప సేవ ఉ. 06:00 & 108 దివ్య దేశాల అధిపతి",
        status: "open",
        image: "/images/krishna-hero.webp",
      },
    ],
  },

  // 14. KOLKATA & BENGAL
  kolkata: {
    id: "kolkata",
    nameEn: "Kolkata & Bengal",
    nameHi: "कोलकाता एवं पश्चिम बंगाल",
    nameTe: "కోల్‌కతా & పశ్చిమ బెంగాల్",
    center: { lat: 22.5726, lng: 88.3639 },
    aliases: ["kolkata", "calcutta", "howrah", "hooghly", "north 24 parganas", "south 24 parganas", "barasat", "kalyani", "durgapur", "asansol"],
    temples: [
      {
        name: "Dakshineswar Kali Temple",
        nameHi: "दक्षिणेश्वर काली मंदिर",
        nameTe: "దక్షిణేశ్వర్ కాళీ ఆలయం",
        location: "Dakshineswar, Hooghly Bank",
        locationHi: "दक्षिणेश्वर, हुगली तट",
        locationTe: "దక్షిణేశ్వర్, హూగ్లీ నది తీరం",
        morning: "06:00 AM – 12:30 PM",
        evening: "03:30 PM – 09:00 PM",
        special: "Maa Bhavatarini Sandhya Aarti 07:00 PM",
        specialHi: "माँ भवतारिणी संध्या महाआरती शाम 07:00",
        specialTe: "మా భవతారిణి సంధ్యా హారతి సా. 07:00",
        status: "crowded",
        image: "/images/puja-thali.webp",
      },
      {
        name: "Kalighat Kali Shaktipeeth",
        nameHi: "कालीघाट काली शक्तिपीठ",
        nameTe: "కాళీఘాట్ కాళీ శక్తిపీఠం",
        location: "Kalighat, Kolkata",
        locationHi: "कालीघाट, कोलकाता",
        locationTe: "కాళీఘాట్, కోల్‌కతా",
        morning: "05:00 AM – 02:00 PM",
        evening: "05:00 PM – 10:30 PM",
        special: "Maha Mangala Aarti & Bhog Darshan",
        specialHi: "महा मंगला आरती एवं चरणामृत दर्शन",
        specialTe: "మహా మంగళ హారతి & చరణామృత దర్శనం",
        status: "crowded",
        image: "/images/puja-thali.webp",
      },
      {
        name: "Belur Math (Ramakrishna Mission HQ)",
        nameHi: "बेलूर मठ (रामकृष्ण मिशन मुख्यालय)",
        nameTe: "బేలూర్ మఠం (రామకృష్ణ మిషన్)",
        location: "Belur, Howrah",
        locationHi: "बेलूर, हावड़ा",
        locationTe: "బేలూర్, హౌరా",
        morning: "06:30 AM – 11:30 AM",
        evening: "04:00 PM – 08:30 PM",
        special: "Evening Vesper Prayer & Meditation 06:30 PM",
        specialHi: "संध्या आरती एवं सामूहिक ध्यान शाम 06:30",
        specialTe: "సంధ్యా ప్రార్థన & సామూహిక ధ్యానం సా. 06:30",
        status: "open",
        image: "/images/lotus-logo-mark.webp",
      },
      {
        name: "Birla Mandir (Laxmi Narayan Temple)",
        nameHi: "बिड़ला मंदिर कोलकाता",
        nameTe: "బిర్లా మందిర్ కోల్‌కతా",
        location: "Ballygunge, Kolkata",
        locationHi: "बालीगंज, कोलकाता",
        locationTe: "బల్లిగంజ్, కోల్‌కతా",
        morning: "05:30 AM – 11:00 AM",
        evening: "04:30 PM – 09:00 PM",
        special: "Radha Krishna Shringar & Choral Aarti",
        specialHi: "राधा कृष्ण दिव्य शृंगार एवं भजन संध्या",
        specialTe: "రాధా కృష్ణ శృంగార హారతి",
        status: "open",
        image: "/images/krishna-hero.webp",
      },
      {
        name: "Thanthania Kalibari",
        nameHi: "ठनठनिया कालीबाड़ी",
        nameTe: "ఠన్‌ఠనియా కాళీబారీ",
        location: "College Street, Kolkata",
        locationHi: "कॉलेज स्ट्रीट, कोलकाता",
        locationTe: "కాలేజ్ స్ట్రీట్, కోల్‌కతా",
        morning: "06:00 AM – 11:30 AM",
        evening: "03:00 PM – 08:30 PM",
        special: "300-year-old Clay Siddheswari Kali Idol",
        specialHi: "300 वर्ष प्राचीन सिद्धेश्वरी काली दर्शन",
        specialTe: "300 ఏళ్ల పురాతన సిద్ధేశ్వరి కాళీ దర్శనం",
        status: "open",
        image: "/images/puja-thali.webp",
      },
    ],
  },

  // 15. JAIPUR & RAJASTHAN
  jaipur: {
    id: "jaipur",
    nameEn: "Jaipur & Rajasthan",
    nameHi: "जयपुर एवं राजस्थान",
    nameTe: "జైపూర్ & రాజస్థాన్",
    center: { lat: 26.9124, lng: 75.7873 },
    aliases: ["jaipur", "pink city", "ajmer", "pushkar", "dausa", "tonk", "sikar", "churu", "jhunjhunu", "alwar", "khatu", "salasar"],
    temples: [
      {
        name: "Shri Govind Dev Ji Mandir",
        nameHi: "श्री गोविंद देव जी मंदिर",
        nameTe: "శ్రీ గోవింద్ దేవ్ జీ ఆలయం",
        location: "City Palace Complex, Jaipur",
        locationHi: "सिटी पैलेस परिसर, जयपुर",
        locationTe: "సిటీ ప్యాలెస్ కాంప్లెక్స్, జైపూర్",
        morning: "04:30 AM – 12:00 PM",
        evening: "05:00 PM – 09:15 PM",
        special: "Mangala Aarti 04:30 AM & Shringar 07:30 AM",
        specialHi: "मंगला आरती 04:30 AM एवं शृंगार 07:30 AM",
        specialTe: "మంగళ హారతి ఉ. 04:30 & శృంగార హారతి",
        status: "crowded",
        image: "/images/krishna-hero.webp",
      },
      {
        name: "Moti Dungri Ganesh Mandir",
        nameHi: "मोती डूंगरी गणेश मंदिर",
        nameTe: "మోతీ దుంగ్రీ గణేష్ ఆలయం",
        location: "Jawahar Lal Nehru Marg, Jaipur",
        locationHi: "जवाहर लाल नेहरू मार्ग, जयपुर",
        locationTe: "జవహర్‌లాల్ నెహ్రూ మార్గ్, జైపూర్",
        morning: "05:00 AM – 01:30 PM",
        evening: "04:30 PM – 09:30 PM",
        special: "Sindoor Lepan Darshan & Modak Bhog",
        specialHi: "सिन्दूर लेपन दर्शन एवं मोदक महाभोग",
        specialTe: "సిందూర లేపన దర్శనం & మోదక భోగ్",
        status: "open",
        image: "/images/lotus-logo-mark.webp",
      },
      {
        name: "Birla Mandir (Laxmi Narayan Temple)",
        nameHi: "बिड़ला मंदिर (लक्ष्मी नारायण)",
        nameTe: "బిర్లా మందిర్ (లక్ష్మీ నారాయణ)",
        location: "Tilak Nagar, Jaipur",
        locationHi: "तिलक नगर, जयपुर",
        locationTe: "తిలక్ నగర్, జైపూర్",
        morning: "06:00 AM – 12:00 PM",
        evening: "03:00 PM – 09:00 PM",
        special: "White Marble Architecture & Sandhya Aarti",
        specialHi: "श्वेत संगमरमर स्थापत्य एवं संध्या आरती",
        specialTe: "తెల్లటి పాలరాతి మందిరం & సంధ్యా హారతి",
        status: "open",
        image: "/images/puja-thali.webp",
      },
      {
        name: "Shri Khatu Shyam Ji Mandir",
        nameHi: "श्री खाटू श्याम जी मंदिर",
        nameTe: "శ్రీ ఖాటూ శ్యామ్ జీ ఆలయం",
        location: "Khatu, Sikar District",
        locationHi: "खाटू, सीकर जिला",
        locationTe: "ఖాటూ, సికార్ జిల్లా",
        morning: "04:30 AM – 12:30 PM",
        evening: "04:00 PM – 10:00 PM",
        special: "Hare Ka Sahara Darshan & Chappan Bhog",
        specialHi: "हारे का सहारा दर्शन एवं छप्पन भोग",
        specialTe: "హారే కా సహారా దర్శనం & ఛప్పన్ భోగ్",
        status: "crowded",
        image: "/images/krishna-hero.webp",
      },
      {
        name: "Salasar Balaji Mandir",
        nameHi: "श्री सालासर बालाजी मंदिर",
        nameTe: "శ్రీ సాలాసర్ బాలాజీ దేవాలయం",
        location: "Salasar, Churu District",
        locationHi: "सालासर, चूरू जिला",
        locationTe: "సాలాసర్, చూరూ జిల్లా",
        morning: "05:00 AM – 10:30 PM (Continuous)",
        evening: "04:00 PM – 10:30 PM",
        special: "Moong Dhal Churma Bhog & Dhuni Puja",
        specialHi: "मूंज दाल चूरमा भोग एवं अखंड धूणी दर्शन",
        specialTe: "ప్రత్యేక చూర్మా భోగ్ & అఖండ ధూని పూజ",
        status: "open",
        image: "/images/hanuman-thumb.webp",
      },
    ],
  },

  // 16. PURI & ODISHA TIRTHAS
  puri: {
    id: "puri",
    nameEn: "Puri & Bhubaneswar (Odisha)",
    nameHi: "पुरी एवं भुवनेश्वर (ओडिशा)",
    nameTe: "పూరీ & భువనేశ్వర్ (ఒడిశా)",
    center: { lat: 19.8135, lng: 85.8312 },
    aliases: ["puri", "bhubaneswar", "cuttack", "khordha", "konark", "jagatsinghpur", "kendrapada", "ganjam"],
    temples: [
      {
        name: "Shree Jagannath Temple",
        nameHi: "श्री जगन्नाथ मंदिर (चार धाम)",
        nameTe: "శ్రీ జగన్నాథ దేవాలయం (చార్ ధామ్)",
        location: "Grand Road, Puri",
        locationHi: "बड़ा दांड, पुरी",
        locationTe: "గ్రాండ్ రోడ్, పూరీ",
        morning: "05:00 AM – 01:00 PM",
        evening: "04:00 PM – 11:30 PM",
        special: "Mangala Alati 05:00 AM & Mahaprasad Ananda Bazar",
        specialHi: "मंगला आरती 05:00 AM एवं आनंद बाजार महाप्रसाद",
        specialTe: "మంగళ హారతి ఉ. 05:00 & ఆనంద బజార్ మహాప్రసాదం",
        status: "crowded",
        image: "/images/krishna-hero.webp",
      },
      {
        name: "Lingaraj Temple",
        nameHi: "लिंगराज मंदिर (भुवनेश्वर)",
        nameTe: "లింగరాజ్ దేవాలయం (భువనేశ్వర్)",
        location: "Old Town, Bhubaneswar",
        locationHi: "ओल्ड टाउन, भुवनेश्वर",
        locationTe: "ఓల్డ్ టౌన్, భువనేశ్వర్",
        morning: "06:00 AM – 12:30 PM",
        evening: "03:30 PM – 09:00 PM",
        special: "Harihara Swaroopa Abhishekam & Alati",
        specialHi: "हरिहर स्वरूप जलाभिषेक एवं संध्या महाआरती",
        specialTe: "హరిహర స్వరూప అభిషేకం & సంధ్యా హారతి",
        status: "open",
        image: "/images/shiva-idol.webp",
      },
      {
        name: "Maa Gundicha Temple",
        nameHi: "माँ गुंडिचा मंदिर (मौसी माँ)",
        nameTe: "గుండిచా మందిరం (మౌసి మా)",
        location: "Grand Road, Puri",
        locationHi: "बड़ा दांड का अंतिम छोर, पुरी",
        locationTe: "పూరీ, ఒడిశా",
        morning: "06:00 AM – 12:00 PM",
        evening: "04:00 PM – 09:00 PM",
        special: "Rath Yatra Garden Residence & Sandhya Aarti",
        specialHi: "रथयात्रा विश्राम स्थल एवं विशेष भोग",
        specialTe: "రథయాత్ర నివాసం & సంధ్యా పూజ",
        status: "open",
        image: "/images/ayodhya-mandir.webp",
      },
      {
        name: "Mukteshvara Temple",
        nameHi: "मुक्तेश्वर मंदिर (ओडिशा का वास्तुकला रत्न)",
        nameTe: "ముక్తేశ్వర దేవాలయం",
        location: "Old Town, Bhubaneswar",
        locationHi: "ओल्ड टाउन, भुवनेश्वर",
        locationTe: "ఓల్డ్ టౌన్, భువనేశ్వర్",
        morning: "06:30 AM – 12:00 PM",
        evening: "04:00 PM – 08:30 PM",
        special: "Famous Torana Archway & Marichi Kunda Snan",
        specialHi: "प्रसिद्ध तोरण द्वार एवं मरीचि कुण्ड दर्शन",
        specialTe: "ప్రసిద్ధ తోరణ ద్వారం & మరీచి కుండ స్నానం",
        status: "open",
        image: "/images/shiva-idol.webp",
      },
      {
        name: "Konark Ramachandi & Sun Temple",
        nameHi: "कोणार्क रामचंडी एवं सूर्य मंदिर",
        nameTe: "కోణార్క్ సూర్య దేవాలయం & రామచండీ",
        location: "Konark Marine Drive",
        locationHi: "कोणार्क मरीन ड्राइव",
        locationTe: "కోణార్క్, ఒడిశా",
        morning: "06:00 AM – 06:00 PM",
        evening: "06:00 PM – 08:30 PM (Light & Sound)",
        special: "Surya Pooja & Ocean Shore Darshan",
        specialHi: "सूर्योदय दर्शन एवं समुद्र तट संध्या आरती",
        specialTe: "సూర్యోదయ పూజ & సముద్ర తీర హారతి",
        status: "open",
        image: "/images/puja-thali.webp",
      },
    ],
  },

  // 17. AHMEDABAD & GUJARAT PILGRIMAGES
  ahmedabad: {
    id: "ahmedabad",
    nameEn: "Ahmedabad & Gujarat",
    nameHi: "अहमदाबाद एवं गुजरात",
    nameTe: "అహ్మదాబాద్ & గుజరాత్",
    center: { lat: 23.0225, lng: 72.5714 },
    aliases: ["ahmedabad", "gandhinagar", "vadodara", "surat", "rajkot", "somnath", "dwarka", "junagadh", "bhavnagar", "mehsana", "ambaji"],
    temples: [
      {
        name: "Somnath Jyotirlinga Temple",
        nameHi: "श्री सोमनाथ ज्योतिर्लिंग (प्रथम ज्योतिर्लिंग)",
        nameTe: "శ్రీ సోమనాథ జ్యోతిర్లింగం (ప్రథమ జ్యోతిర్లింగం)",
        location: "Prabhas Patan, Veraval",
        locationHi: "प्रभास पाटन, वेरावल",
        locationTe: "ప్రభాస్ పటాన్, వేరావల్",
        morning: "06:00 AM – 12:30 PM",
        evening: "03:30 PM – 10:00 PM",
        special: "Mangala Aarti 07:00 AM & Light Sound Show 08:00 PM",
        specialHi: "प्रातः आरती 07:00 AM एवं ध्वनि-प्रकाश शो 08:00 PM",
        specialTe: "ఉదయ హారతి ఉ. 07:00 & లైట్-సౌండ్ షో రా. 08:00",
        status: "crowded",
        image: "/images/shiva-idol.webp",
      },
      {
        name: "Dwarkadhish Temple (Jagat Mandir)",
        nameHi: "द्वारकाधीश मंदिर (जगत मंदिर, चार धाम)",
        nameTe: "ద్వారకాధీశ్ దేవాలయం (జగత్ మందిరం)",
        location: "Dwarka, Gomti Coast",
        locationHi: "द्वारका, गोमती तट",
        locationTe: "ద్వారక, గోమతి నది ఒడ్డు",
        morning: "06:30 AM – 01:00 PM",
        evening: "05:00 PM – 09:30 PM",
        special: "Mangala Aarti 06:30 AM & 52-Gaj Dhwajarohan",
        specialHi: "मंगला आरती 06:30 AM एवं 52 गज ध्वजारोहण",
        specialTe: "మంగళ హారతి ఉ. 06:30 & 52 గజాల ధ్వజారోహణ",
        status: "crowded",
        image: "/images/krishna-hero.webp",
      },
      {
        name: "Swaminarayan Akshardham Mandir",
        nameHi: "स्वामीनारायण अक्षरधाम मंदिर",
        nameTe: "స్వామినారాయణ్ అక్షరధామ్",
        location: "Sector 20, Gandhinagar",
        locationHi: "सेक्टर 20, गांधीनगर",
        locationTe: "సెక్టార్ 20, గాంధీనగర్",
        morning: "09:30 AM – 01:00 PM",
        evening: "04:00 PM – 07:30 PM",
        special: "Sat-Chit-Anand Water Show 07:30 PM",
        specialHi: "सत्-चित्-आनंद जल शो शाम 07:30",
        specialTe: "సత్-చిత్-ఆనంద్ వాటర్ షో సా. 07:30",
        status: "open",
        image: "/images/ayodhya-mandir.webp",
      },
      {
        name: "Maa Ambaji Shaktipeeth",
        nameHi: "माँ अंबाजी शक्तिपीठ",
        nameTe: "మా అంబాజీ శక్తిపీఠం",
        location: "Gabbar Hill, Banaskantha",
        locationHi: "गब्बर पर्वत, बनासकांठा",
        locationTe: "గబ్బర్ హిల్, గుజరాత్",
        morning: "07:00 AM – 11:30 AM",
        evening: "03:30 PM – 09:00 PM",
        special: "Viso Yantra Worship & Evening Aarti",
        specialHi: "श्री विसो यंत्र दर्शन एवं संध्या आरती 07:00 PM",
        specialTe: "శ్రీ వీసో యంత్ర దర్శనం & సంధ్యా హారతి",
        status: "open",
        image: "/images/puja-thali.webp",
      },
      {
        name: "Camp Hanuman Mandir",
        nameHi: "कैम्प हनुमान मंदिर",
        nameTe: "క్యాంప్ హనుమాన్ దేవాలయం",
        location: "Ahmedabad Cantonment",
        locationHi: "अहमदाबाद कैंट",
        locationTe: "అహ్మదాబాద్ కంటోన్మెంట్",
        morning: "05:30 AM – 12:00 PM",
        evening: "04:30 PM – 10:00 PM",
        special: "Tuesday & Saturday Maha Aarti",
        specialHi: "मंगलवार व शनिवार महाआरती व चोला अर्पण",
        specialTe: "మంగళ & శనివారాల్లో విశేష హారతి",
        status: "open",
        image: "/images/hanuman-thumb.webp",
      },
    ],
  },

  // 18. LUCKNOW & CENTRAL UP
  lucknow: {
    id: "lucknow",
    nameEn: "Lucknow & Central UP",
    nameHi: "लखनऊ एवं मध्य उत्तर प्रदेश",
    nameTe: "లక్నో & మధ్య ఉత్తర ప్రదేశ్",
    center: { lat: 26.8467, lng: 80.9462 },
    aliases: ["lucknow", "kanpur", "unnao", "raebareli", "sitapur", "hardoi", "lakhimpur", "barabanki"],
    temples: [
      {
        name: "Mankameshwar Mahadev Mandir",
        nameHi: "मनकामेश्वर महादेव मंदिर",
        nameTe: "మనకామేశ్వర్ మహాదేవ్ దేవాలయం",
        location: "Daliganj, Gomti Bank",
        locationHi: "डालीगंज, गोमती तट",
        locationTe: "డాలిగంజ్, గోమతి తీరం",
        morning: "05:00 AM – 12:00 PM",
        evening: "04:00 PM – 10:30 PM",
        special: "Somwar Bhasma Shringar & Evening Aarti",
        specialHi: "सोमवार भस्म शृंगार एवं गोमती महाआरती",
        specialTe: "సోమవార భస్మ శృంగారం & గోమతి హారతి",
        status: "crowded",
        image: "/images/shiva-idol.webp",
      },
      {
        name: "Chandrika Devi Mandir",
        nameHi: "माँ चंद्रिका देवी मंदिर",
        nameTe: "చంద్రికా దేవి ఆలయం",
        location: "Kathwara, Sitapur Road",
        locationHi: "कठवारा, सीतापुर रोड",
        locationTe: "కథ్వారా, సీతాపూర్ రోడ్",
        morning: "05:00 AM – 01:00 PM",
        evening: "03:30 PM – 09:00 PM",
        special: "Mahasnan in Holy Kund & Shringar",
        specialHi: "पवित्र कुण्ड स्नान एवं माता शृंगार आरती",
        specialTe: "పవిత్ర కుండ స్నానం & శృంగార హారతి",
        status: "open",
        image: "/images/puja-thali.webp",
      },
      {
        name: "Hanuman Setu Mandir",
        nameHi: "हनुमान सेतु मंदिर",
        nameTe: "హనుమాన్ సేతు దేవాలయం",
        location: "Near Lucknow University",
        locationHi: "लखनऊ विश्वविद्यालय के समीप",
        locationTe: "లక్నో యూనివర్సిటీ సమీపంలో",
        morning: "05:00 AM – 12:30 PM",
        evening: "04:00 PM – 10:30 PM",
        special: "Neem Karoli Baba Sthapana & Hanuman Chalisa",
        specialHi: "नीब करौरी बाबा स्थापना एवं सामूहिक सुंदरकाण्ड",
        specialTe: "నీమ్ కరోలి బాబా స్థాపించిన హనుమాన్ మందిరం",
        status: "open",
        image: "/images/hanuman-thumb.webp",
      },
      {
        name: "Pracheen Aliganj Hanuman Mandir",
        nameHi: "प्राचीन अलीगंज हनुमान मंदिर",
        nameTe: "ప్రాచీన అలీగంజ్ హనుమాన్ దేవాలయం",
        location: "Aliganj, Lucknow",
        locationHi: "अलीगंज, लखनऊ",
        locationTe: "అలీగంజ్, లక్నో",
        morning: "05:00 AM – 12:00 PM",
        evening: "04:00 PM – 11:00 PM",
        special: "Bada Mangal Mahotsav (Jyeshtha Month)",
        specialHi: "बड़ा मंगल महोत्सव एवं सिंदूर महाभिषेक",
        specialTe: "బడా మంగళ్ ఉత్సవం & సిందూర అభిషేకం",
        status: "crowded",
        image: "/images/hanuman-thumb.webp",
      },
      {
        name: "JK Temple (Radhakrishna Mandir)",
        nameHi: "जेके मंदिर (श्री राधाकृष्ण मंदिर)",
        nameTe: "జేకే మందిర్ (రాధాకృష్ణ దేవాలయం)",
        location: "Govind Nagar, Kanpur",
        locationHi: "गोविंद नगर, कानपुर",
        locationTe: "గోవింద్ నగర్, కాన్పూర్",
        morning: "06:00 AM – 11:30 AM",
        evening: "04:30 PM – 09:00 PM",
        special: "Modern Marble Architecture & Sandhya Aarti",
        specialHi: "भव्य संगमरमर स्थापत्य एवं संध्या महाआरती",
        specialTe: "అద్భుత పాలరాతి శిల్పం & సంధ్యా హారతి",
        status: "open",
        image: "/images/krishna-hero.webp",
      },
    ],
  },

  // 19. PATNA & BIHAR PILGRIMAGES
  patna: {
    id: "patna",
    nameEn: "Patna & Bihar",
    nameHi: "पटना एवं बिहार",
    nameTe: "పాట్నా & బీహార్",
    center: { lat: 25.5941, lng: 85.1376 },
    aliases: ["patna", "gaya", "nalanda", "rajgir", "vaishali", "muzaffarpur", "darbhanga", "bhagalpur", "arrah", "bihar"],
    temples: [
      {
        name: "Mahavir Mandir (Patna Junction)",
        nameHi: "महावीर मंदिर (पटना जंक्शन)",
        nameTe: "మహావీర్ దేవాలయం (పాట్నా జంక్షన్)",
        location: "Station Roundabout, Patna",
        locationHi: "स्टेशन गोलंबर, पटना",
        locationTe: "స్టేషన్ రోడ్డు, పాట్నా",
        morning: "05:00 AM – 11:00 PM (Continuous)",
        evening: "04:00 PM – 11:00 PM",
        special: "Twin Hanuman Vigraha & Naivedyam Ladoo",
        specialHi: "युगल हनुमान विग्रह एवं तिरुपति नैवेद्यम् भोग",
        specialTe: "జంట హనుమాన్ విగ్రహాలు & ప్రసిద్ధ నైవేద్యం లడ్డు",
        status: "crowded",
        image: "/images/hanuman-thumb.webp",
      },
      {
        name: "Maa Patan Devi (Badi Patan Devi)",
        nameHi: "माँ बड़ी पाटन देवी (शक्तिपीठ)",
        nameTe: "మా పాట్నా దేవి (శక్తిపీఠం)",
        location: "Gulzarbagh, Patna City",
        locationHi: "गुलजारबाग, पटना सिटी",
        locationTe: "గుల్జార్‌బాగ్, పాట్నా",
        morning: "05:30 AM – 12:30 PM",
        evening: "04:00 PM – 09:30 PM",
        special: "Patan Pith Sandhya Aarti & Shringar",
        specialHi: "पाटन पीठ संध्या महाआरती एवं शृंगार",
        specialTe: "పాట్నా పీఠ సంధ్యా హారతి & శృంగార దర్శనం",
        status: "open",
        image: "/images/puja-thali.webp",
      },
      {
        name: "Vishnupad Mandir",
        nameHi: "विष्णुपद मंदिर (गया धाम)",
        nameTe: "విష్ణుపాద దేవాలయం (గయా ధామం)",
        location: "Chandrachur Hills, Gaya",
        locationHi: "फल्गु नदी तट, गया",
        locationTe: "ఫల్గు నది తీరం, గయ",
        morning: "05:00 AM – 01:00 PM",
        evening: "03:30 PM – 09:00 PM",
        special: "Lord Vishnu Footprint Darshan & Pind Daan",
        specialHi: "श्री हरि चरण चिह्न दर्शन एवं पिंडदान तर्पण",
        specialTe: "శ్రీమహావిష్ణువు పాదముద్రల దర్శనం & పిండ ప్రదానం",
        status: "crowded",
        image: "/images/krishna-hero.webp",
      },
      {
        name: "Takht Sri Patna Sahib",
        nameHi: "तख्त श्री पटना साहिब (गुरुद्वारा)",
        nameTe: "తఖ్త్ శ్రీ పాట్నా సాహిబ్",
        location: "Patna City",
        locationHi: "पटना साहिब, पटना",
        locationTe: "పాట్నా సాహిబ్, పాట్నా",
        morning: "04:00 AM – 10:00 PM",
        evening: "Open Continuously",
        special: "Birthplace of Guru Gobind Singh Ji & Langar",
        specialHi: "श्री गुरु गोबिंद सिंह जी जन्मस्थान व गुरु का लंगर",
        specialTe: "శ్రీ గురు గోవింద్ సింగ్ జన్మస్థలం & గురు లంగర్",
        status: "open",
        image: "/images/lotus-logo-mark.webp",
      },
      {
        name: "Mangla Gauri Mandir",
        nameHi: "माँ मंगला गौरी शक्तिपीठ",
        nameTe: "మా మంగళ గౌరీ శక్తిపీఠం",
        location: "Gaya, Bihar",
        locationHi: "गया, बिहार",
        locationTe: "గయ, బీహార్",
        morning: "05:30 AM – 12:00 PM",
        evening: "04:00 PM – 08:30 PM",
        special: "Tuesday Mangala Gauri Vrat Darshan",
        specialHi: "मंगलवार मंगला गौरी व्रत विशेष दर्शन",
        specialTe: "మంగళ గౌరీ వ్రత దర్శనం & ప్రత్యేక హారతి",
        status: "open",
        image: "/images/puja-thali.webp",
      },
    ],
  },

  // 20. PRAYAGRAJ (TRIVENI SANGAM)
  prayagraj: {
    id: "prayagraj",
    nameEn: "Prayagraj (Sangam)",
    nameHi: "प्रयागराज (संगम)",
    nameTe: "ప్రయాగ్‌రాజ్ (త్రివేణి సంగమం)",
    center: { lat: 25.4358, lng: 81.8463 },
    aliases: ["prayagraj", "allahabad", "sangam", "kaushambi", "pratapgarh", "fatehpur", "chitrakoot", "banda"],
    temples: [
      {
        name: "Bade Hanuman Mandir (Lete Hue Hanuman Ji)",
        nameHi: "बड़े हनुमान मंदिर (लेटे हुए हनुमान जी)",
        nameTe: "బడే హనుమాన్ దేవాలయం (శయనించిన హనుమంతుడు)",
        location: "Sangam Shore, Prayagraj",
        locationHi: "संगम तट, प्रयागराज",
        locationTe: "సంగమ తీరం, ప్రయాగ్‌రాజ్",
        morning: "05:00 AM – 01:00 PM",
        evening: "03:00 PM – 10:30 PM",
        special: "Ganga Snan Jalabhishek & Sindoor Chola",
        specialHi: "गंगा जल से चरण स्पर्श एवं सिंदूर चोला अर्पण",
        specialTe: "గంగా జలాలతో పాదాల అభిషేకం & సిందూర పూజ",
        status: "crowded",
        image: "/images/hanuman-thumb.webp",
      },
      {
        name: "Alopi Devi Shaktipeeth",
        nameHi: "अलोपी देवी शक्तिपीठ",
        nameTe: "అలోపి దేవి శక్తిపీఠం",
        location: "Alopibagh, Prayagraj",
        locationHi: "अलोपीबाग, प्रयागराज",
        locationTe: "అలోపీబాగ్, ప్రయాగ్‌రాజ్",
        morning: "05:30 AM – 12:30 PM",
        evening: "04:00 PM – 09:30 PM",
        special: "Worship of Sacred Doli (Palanquin) without idol",
        specialHi: "अदृश्य विग्रह रूपी पवित्र डोली का पूजन",
        specialTe: "విగ్రహం లేని పవిత్ర పల్లకీ పూజ",
        status: "open",
        image: "/images/puja-thali.webp",
      },
      {
        name: "Mankameshwar Mahadev Mandir",
        nameHi: "मनकामेश्वर महादेव मंदिर",
        nameTe: "మనకామేశ్వర్ మహాదేవ్ దేవాలయం",
        location: "Saraswati Ghat, Yamuna Bank",
        locationHi: "सरस्वती घाट, यमुना तट",
        locationTe: "సరస్వతీ ఘాట్, యమునా నది తీరం",
        morning: "05:00 AM – 12:00 PM",
        evening: "04:00 PM – 09:30 PM",
        special: "Yamuna Maha Aarti & Rudrabhisheka",
        specialHi: "यमुना महाआरती एवं सोमवार रुद्राभिषेक",
        specialTe: "యమునా మహా హారతి & రుద్రాభిషేకం",
        status: "open",
        image: "/images/shiva-idol.webp",
      },
      {
        name: "Nagvasuki Mandir",
        nameHi: "नागवासुकी मंदिर",
        nameTe: "నాగవాసుకి దేవాలయం",
        location: "Daraganj, Prayagraj",
        locationHi: "दारागंज, प्रयागराज",
        locationTe: "దారాగంజ్, ప్రయాగ్‌రాజ్",
        morning: "05:30 AM – 12:00 PM",
        evening: "04:00 PM – 08:30 PM",
        special: "Nag Panchami Mahapuja & Kalsarp Nivarana",
        specialHi: "नाग पंचमी महापूजा एवं कालसर्प दोष शांति",
        specialTe: "నాగ పంచమి విశేష పూజ & కాలసర్ప దోష నివారణ",
        status: "open",
        image: "/images/shiva-idol.webp",
      },
      {
        name: "Kamadgiri & Ramghat",
        nameHi: "कामदगिरि पर्वत एवं रामघाट",
        nameTe: "కామద్గిరి పర్వతం & రామ్‌ఘాట్",
        location: "Chitrakoot Dham (Near Prayagraj)",
        locationHi: "चित्रकूट धाम",
        locationTe: "చిత్రకూట్ ధామం",
        morning: "05:00 AM – 12:00 PM",
        evening: "04:00 PM – 09:00 PM",
        special: "5-km Holy Parikrama & Mandakini Aarti",
        specialHi: "5 किमी पवित्र परिक्रमा एवं मंदाकिनी आरती",
        specialTe: "5 కి.మీ పవిత్ర ప్రదక్షిణ & మందాకినీ హారతి",
        status: "open",
        image: "/images/ayodhya-mandir.webp",
      },
    ],
  },

  // 21. AMRITSAR & PUNJAB
  amritsar: {
    id: "amritsar",
    nameEn: "Amritsar & Punjab",
    nameHi: "अमृतसर एवं पंजाब",
    nameTe: "అమృత్‌సర్ & పంజాబ్",
    center: { lat: 31.634, lng: 74.8723 },
    aliases: ["amritsar", "jalandhar", "ludhiana", "bathinda", "pathankot", "hoshiarpur", "gurdaspur", "chandigarh", "mohali", "panchkula"],
    temples: [
      {
        name: "Sri Harmandir Sahib (Golden Temple)",
        nameHi: "श्री हरिमंदिर साहिब (स्वर्ण मंदिर)",
        nameTe: "శ్రీ హర్‌మందిర్ సాహిబ్ (గోల్డెన్ టెంపుల్)",
        location: "Amritsar City Center",
        locationHi: "अमृतसर नगर केंद्र",
        locationTe: "అమృత్‌సర్ నగరం",
        morning: "03:00 AM – 11:00 PM",
        evening: "Open 24 Hours (Continuous Langar)",
        special: "Palki Sahib Ceremony 04:00 AM & 10:30 PM",
        specialHi: "पालकी साहिब सेवा भोर 04:00 एवं रात 10:30",
        specialTe: "పాల్కీ సాహిబ్ సేవ ఉ. 04:00 & రా. 10:30",
        status: "crowded",
        image: "/images/lotus-logo-mark.webp",
      },
      {
        name: "Shree Durgiana Mandir (Lakshmi Narayan)",
        nameHi: "श्री दुर्ग्याणा मंदिर (लक्ष्मी नारायण)",
        nameTe: "శ్రీ దుర్గ్యాణా దేవాలయం",
        location: "Hathi Gate, Amritsar",
        locationHi: "हाथी गेट, अमृतसर",
        locationTe: "హాతీ గేట్, అమృత్‌సర్",
        morning: "05:00 AM – 12:30 PM",
        evening: "04:00 PM – 10:00 PM",
        special: "Holy Sarovar Snan & Sandhya Aarti 07:00 PM",
        specialHi: "पवित्र सरोवर स्नान एवं संध्या महाआरती",
        specialTe: "పవిత్ర సరోవర స్నానం & సంధ్యా హారతి",
        status: "open",
        image: "/images/puja-thali.webp",
      },
      {
        name: "Bhagwan Valmiki Tirath Sthal",
        nameHi: "भगवान वाल्मीकि तीर्थ स्थल (रामतीर्थ)",
        nameTe: "భగవాన్ వాల్మీకి తీర్థ స్థలం",
        location: "Ram Tirath Road, Amritsar",
        locationHi: "रामतीर्थ रोड, अमृतसर",
        locationTe: "రామ్‌తీర్థ్ రోడ్, అమృత్‌సర్",
        morning: "05:00 AM – 12:00 PM",
        evening: "04:00 PM – 09:00 PM",
        special: "Luv-Kush Birthplace & Ashwamedha Sthal",
        specialHi: "लव-कुश जन्मस्थली एवं अश्वमेध यज्ञ स्थल",
        specialTe: "లవ-కుశుల జన్మస్థలం & అశ్వమేధ యాగ క్షేత్రం",
        status: "open",
        image: "/images/ayodhya-mandir.webp",
      },
      {
        name: "Shri Mansa Devi Mandir",
        nameHi: "माता मनसा देवी मंदिर (पंचकूला)",
        nameTe: "మానసా దేవి దేవాలయం (పంచకుల)",
        location: "Panchkula / Chandigarh",
        locationHi: "पंचकूला, चंडीगढ़",
        locationTe: "పంచకుల, చండీగఢ్",
        morning: "05:00 AM – 12:30 PM",
        evening: "04:00 PM – 10:00 PM",
        special: "Navratri Mela & Shringar Aarti 07:00 AM",
        specialHi: "नवरात्रि मेला एवं शृंगार आरती प्रातः 07:00",
        specialTe: "నవరాత్రి మేళా & శృంగార హారతి ఉ. 07:00",
        status: "open",
        image: "/images/puja-thali.webp",
      },
      {
        name: "Pracheen Shiv Mandir",
        nameHi: "प्राचीन शिव मंदिर",
        nameTe: "ప్రాచీన శివాలయం",
        location: "Model Town, Jalandhar",
        locationHi: "मॉडल टाउन, जालंधर",
        locationTe: "మోడల్ టౌన్, జలంధర్",
        morning: "05:30 AM – 12:00 PM",
        evening: "04:30 PM – 09:30 PM",
        special: "Daily Rudrabhisheka & Sandhya Aarti",
        specialHi: "नित्य रुद्राभिषेक एवं संध्या महाआरती",
        specialTe: "నిత్య రుద్రాభిషేకం & సంధ్యా హారతి",
        status: "open",
        image: "/images/shiva-idol.webp",
      },
    ],
  },

  // 22. KERALA & GOD'S OWN COUNTRY
  kerala: {
    id: "kerala",
    nameEn: "Kerala Pilgrimages",
    nameHi: "केरल के प्रमुख तीर्थ",
    nameTe: "కేరళ పుణ్యక్షేత్రాలు",
    center: { lat: 9.9312, lng: 76.2673 },
    aliases: ["kochi", "cochin", "thiruvananthapuram", "trivandrum", "kottayam", "thrissur", "kollam", "alappuzha", "palakkad", "kozhikode", "calicut", "kannur", "sabarimala", "guruvayur"],
    temples: [
      {
        name: "Sri Padmanabhaswamy Temple",
        nameHi: "श्री पद्मनाభस्वामी मंदिर",
        nameTe: "శ్రీ పద్మనాభస్వామి దేవాలయం",
        location: "East Fort, Thiruvananthapuram",
        locationHi: "ईस्ट फोर्ट, तिरुवनंतपुरम",
        locationTe: "ఈస్ట్ ఫోర్ట్, తిరువనంతపురం",
        morning: "03:30 AM – 12:00 PM",
        evening: "05:00 PM – 08:30 PM",
        special: "Ananthasayanam 3-Door Darshan & Nirmalyam",
        specialHi: "अनंतशयन त्रि-द्वार दर्शन एवं निर्माल्यम 03:30 AM",
        specialTe: "అనంతశయన ముక్కోణ దర్శనం & నిర్మాల్యం ఉ. 03:30",
        status: "crowded",
        image: "/images/krishna-hero.webp",
      },
      {
        name: "Guruvayur Sri Krishna Temple",
        nameHi: "गुरुवायूर श्री कृष्ण मंदिर",
        nameTe: "గురువాయూర్ శ్రీ కృష్ణ దేవాలయం",
        location: "Guruvayur, Thrissur",
        locationHi: "गुरुवायूर, त्रिशूर",
        locationTe: "గురువాయూర్, త్రిసూర్",
        morning: "03:00 AM – 12:30 PM",
        evening: "04:30 PM – 09:15 PM",
        special: "Nirmalya Darshan 03:00 AM & Udayasthamana",
        specialHi: "निर्माल्य दर्शन भोर 03:00 एवं उदयस्थमन पूजा",
        specialTe: "నిర్మాల్య దర్శనం వేకువజామున 03:00 & ఉదయస్తమన పూజ",
        status: "crowded",
        image: "/images/krishna-hero.webp",
      },
      {
        name: "Sabarimala Sri Dharma Sastha Temple",
        nameHi: "सबरीमाला श्री अय्यप्पा स्वामी मंदिर",
        nameTe: "శబరిమల శ్రీ ధర్మశాస్తా అయ్యప్ప స్వామి ఆలయం",
        location: "Periyar Tiger Reserve, Pathanamthitta",
        locationHi: "पेरियार पर्वत, पथनमथिट्टा",
        locationTe: "పెరియార్ కొండలు, పతనంతిట్ట",
        morning: "03:00 AM – 01:00 PM",
        evening: "03:00 PM – 11:00 PM",
        special: "Harivarasanam 11:00 PM & 18 Golden Steps",
        specialHi: "हरिवरासनम् शयन पाठ एवं 18 पवित्र स्वर्ण सीढ़ियां",
        specialTe: "హరివరాసనం రా. 11:00 & 18 బంగారు మెట్లు",
        status: "crowded",
        image: "/images/lotus-logo-mark.webp",
      },
      {
        name: "Chottanikkara Bhagavathy Temple",
        nameHi: "चोट्टानिक्करा भगवती मंदिर",
        nameTe: "చోట్టానిక్కర భగవతి దేవాలయం",
        location: "Chottanikkara, Kochi",
        locationHi: "चोट्टानिक्करा, कोच्चि",
        locationTe: "చోట్టానిక్కర, కొచ్చి",
        morning: "04:00 AM – 12:00 PM",
        evening: "04:00 PM – 08:45 PM",
        special: "Guruthi Puja in Kizhukkavu 08:30 PM",
        specialHi: "कीझुक्कावु गुरुथी महापूजा शाम 08:30",
        specialTe: "గురుతి విశేష పూజ రా. 08:30",
        status: "open",
        image: "/images/puja-thali.webp",
      },
      {
        name: "Vadakkunnathan Shiva Temple",
        nameHi: "वडक्कुन्नाथन शिव मंदिर (त्रिशूर)",
        nameTe: "వడక్కున్నాథన్ శివాలయం (త్రిసూర్)",
        location: "Thrissur Round, Kerala",
        locationHi: "त्रिशूर, केरल",
        locationTe: "త్రిసూర్, కేరళ",
        morning: "03:00 AM – 10:30 AM",
        evening: "04:00 PM – 08:30 PM",
        special: "Ghee Lingam (Neyyabhishekam) & Thrissur Pooram",
        specialHi: "घृत लिंगम (अखंड घी अभिषेक) एवं त्रिशूर पूरम",
        specialTe: "నెయ్యభిషేకం & ప్రసిద్ధ త్రిసూర్ పూరం",
        status: "open",
        image: "/images/shiva-idol.webp",
      },
    ],
  },

  // 23. GUWAHATI & NORTH EAST
  guwahati: {
    id: "guwahati",
    nameEn: "Guwahati & North East",
    nameHi: "गुवाहाटी एवं पूर्वोत्तर",
    nameTe: "గౌహతి & ఈశాన్య భారతం",
    center: { lat: 26.1445, lng: 91.7362 },
    aliases: ["guwahati", "gauhati", "kamakhya", "dispur", "assam", "shillong", "silchar", "dibrugarh", "jorhat", "tezpur", "agartala"],
    temples: [
      {
        name: "Maa Kamakhya Devalaya (Nilachal Hill)",
        nameHi: "माँ कामाख्या देवालय (नीलांचल पर्वत)",
        nameTe: "మా కామాఖ్య దేవాలయం (నీలాచల్ కొండ)",
        location: "Nilachal Hill, Guwahati",
        locationHi: "नीलांचल पर्वत, गुवाहाटी",
        locationTe: "నీలాచల్ కొండ, గౌహతి",
        morning: "05:30 AM – 01:00 PM",
        evening: "02:30 PM – 05:30 PM",
        special: "Yoni Mudra Garbhagriha Darshan & Aarti",
        specialHi: "योनि मुद्रा गर्भगृह दर्शन एवं संध्या महाआरती",
        specialTe: "యోని ముద్ర గర్భగుడి దర్శనం & సంధ్యా హారతి",
        status: "crowded",
        image: "/images/puja-thali.webp",
      },
      {
        name: "Umananda Temple (Peacock Island)",
        nameHi: "उमानंद मंदिर (मयूर द्वीप, ब्रह्मपुत्र)",
        nameTe: "ఉమానంద దేవాలయం (బ్రహ్మపుత్ర నది)",
        location: "Peacock Island, Brahmaputra",
        locationHi: "मयूर द्वीप, ब्रह्मपुत्र नदी",
        locationTe: "పీకాక్ ఐలాండ్, బ్రహ్మపుత్ర నది",
        morning: "05:30 AM – 12:00 PM",
        evening: "02:00 PM – 05:00 PM",
        special: "River Ferry Darshan & Bhasmachal Shiva",
        specialHi: "नौका यात्रा दर्शन एवं भस्माचल शिव पूजन",
        specialTe: "బోట్ ప్రయాణం & భస్మాచల శివ పూజ",
        status: "open",
        image: "/images/shiva-idol.webp",
      },
      {
        name: "Navagraha Temple",
        nameHi: "नवग्रह मंदिर (चित्राचल पर्वत)",
        nameTe: "నవగ్రహ దేవాలయం (చిత్రాచల్ కొండ)",
        location: "Chitrachal Hill, Guwahati",
        locationHi: "चित्राचल पर्वत, गुवाहाटी",
        locationTe: "చిత్రాచల్ హిల్, గౌహతి",
        morning: "06:00 AM – 12:30 PM",
        evening: "04:00 PM – 08:00 PM",
        special: "9 Celestial Lingas Shanti Puja",
        specialHi: "नवग्रह शिवलिंग नवग्रह शांति महापूजा",
        specialTe: "నవగ్రహ శాంతి విశేష పూజ",
        status: "open",
        image: "/images/lotus-logo-mark.webp",
      },
      {
        name: "Basistha Ashram Temple",
        nameHi: "वशिष्ठ आश्रम मंदिर",
        nameTe: "వశిష్ట ఆశ్రమ దేవాలయం",
        location: "Basistha, South Guwahati",
        locationHi: "वशिष्ठ, दक्षिण गुवाहाटी",
        locationTe: "వశిష్ట, దక్షిణ గౌహతి",
        morning: "06:00 AM – 12:00 PM",
        evening: "03:30 PM – 07:30 PM",
        special: "Triveni Rivulets & Sage Vashistha Cave",
        specialHi: "संध्या, ललिता, कांता त्रिवेणी संगम एवं ऋषि गुफा",
        specialTe: "త్రివేణి సంగమం & వశిష్ట మహర్షి గుహ",
        status: "open",
        image: "/images/shiva-idol.webp",
      },
      {
        name: "Sukreswar Shiva Temple",
        nameHi: "शुक्रेश्वर शिव मंदिर",
        nameTe: "శుక్రేశ్వర శివాలయం",
        location: "Panbazar, Brahmaputra Bank",
        locationHi: "पानबाजार, ब्रह्मपुत्र तट",
        locationTe: "పాన్‌బజార్, బ్రహ్మపుత్ర తీరం",
        morning: "06:00 AM – 12:30 PM",
        evening: "04:00 PM – 08:00 PM",
        special: "Largest Shiva Linga & Brahmaputra Sunset",
        specialHi: "विशाल शिवलिंग दर्शन एवं ब्रह्मपुत्र सूर्यास्त",
        specialTe: "విశాల శివలింగ దర్శనం & సూర్యాస్తమయ దృశ్యం",
        status: "open",
        image: "/images/shiva-idol.webp",
      },
    ],
  },

  // 24. JAMMU & KASHMIR / HIMALAYAS
  jammu_kashmir: {
    id: "jammu_kashmir",
    nameEn: "Jammu & Kashmir (Himalayas)",
    nameHi: "जम्मू एवं कश्मीर (हिमालय)",
    nameTe: "జమ్మూ & కాశ్మీర్ (హిమాలయాలు)",
    center: { lat: 32.99, lng: 74.95 },
    aliases: ["jammu", "katra", "vaishno devi", "srinagar", "udhampur", "anantnag", "baramulla", "leh", "ladakh", "amarnath"],
    temples: [
      {
        name: "Shri Mata Vaishno Devi Shrine",
        nameHi: "श्री माता वैष्णो देवी श्राइन",
        nameTe: "శ్రీ మాతా వైష్ణో దేవి భవన్",
        location: "Trikuta Hills, Katra",
        locationHi: "त्रिकुटा पर्वत, कटड़ा",
        locationTe: "త్రికూట పర్వతం, కత్రా",
        morning: "05:00 AM – 12:00 PM",
        evening: "04:00 PM – 10:00 PM (Open 24 Hours)",
        special: "Pindi Darshan & Atka Aarti (Live Telecast)",
        specialHi: "पवित्र पिंडी दर्शन एवं अट्का महाआरती",
        specialTe: "పవిత్ర పిండీ దర్శనం & అట్కా మహా హారతి",
        status: "crowded",
        image: "/images/puja-thali.webp",
      },
      {
        name: "Raghunath Mandir",
        nameHi: "श्री रघुनाथ मंदिर",
        nameTe: "శ్రీ రఘునాథ దేవాలయం",
        location: "City Center, Jammu",
        locationHi: "नगर केंद्र, जम्मू",
        locationTe: "జమ్మూ నగరం",
        morning: "06:00 AM – 12:30 PM",
        evening: "04:00 PM – 09:00 PM",
        special: "Million Shaligram Shilas & Ram Darbar",
        specialHi: "लाखों शालिग्राम शिला दर्शन एवं राम दरबार",
        specialTe: "లక్షలాది శాలిగ్రామ శిలలు & రాముని దర్బార్",
        status: "open",
        image: "/images/ayodhya-mandir.webp",
      },
      {
        name: "Bawe Wali Mata Mandir",
        nameHi: "बावे वाली माता (महाकाली मंदिर)",
        nameTe: "బావే వాలీ మాతా (మహాకాళి దేవాలయం)",
        location: "Bahu Fort, Tawi Riverbank",
        locationHi: "बाहू किला, तवी नदी तट",
        locationTe: "బాహు కోట, తావి నది తీరం",
        morning: "05:00 AM – 12:00 PM",
        evening: "04:00 PM – 09:30 PM",
        special: "Tuesday & Sunday Maha Aarti",
        specialHi: "मंगलवार व रविवार महाआरती एवं हलवा भोग",
        specialTe: "మంగళ & ఆదివారాల్లో విశేష హారతి",
        status: "open",
        image: "/images/puja-thali.webp",
      },
      {
        name: "Shankaracharya Shiva Temple",
        nameHi: "शंकराचार्य मंदिर (शंकराचार्य पर्वत)",
        nameTe: "శంకరాచార్య శివాలయం (శ్రీనగర్)",
        location: "Gopadari Hill, Srinagar",
        locationHi: "गोपाद्रि पर्वत, श्रीनगर",
        locationTe: "శ్రీనగర్, కాశ్మీర్",
        morning: "07:00 AM – 01:00 PM",
        evening: "03:00 PM – 07:00 PM",
        special: "Adi Shankara Tapasthali & Dal Lake View",
        specialHi: "आदि शंकराचार्य तपस्थली एवं डल झील दर्शन",
        specialTe: "ఆది శంకరాచార్యుల తపోస్థలం & దాల్ సరస్సు దృశ్యం",
        status: "open",
        image: "/images/shiva-idol.webp",
      },
      {
        name: "Maa Kheer Bhawani Temple",
        nameHi: "माँ क्षीर भवानी मंदिर",
        nameTe: "మా క్షీర భవాని ఆలయం",
        location: "Tulmulla, Ganderbal, Kashmir",
        locationHi: "तुलमुल, गांदरबल, कश्मीर",
        locationTe: "తులముల్లా, కాశ్మీర్",
        morning: "06:00 AM – 12:00 PM",
        evening: "04:00 PM – 08:00 PM",
        special: "Miraculous Color-Changing Sacred Spring",
        specialHi: "चमत्कारी रंग बदलने वाले पवित्र जल कुण्ड दर्शन",
        specialTe: "రంగులు మారే పవిత్ర అమృత జలధార",
        status: "open",
        image: "/images/puja-thali.webp",
      },
    ],
  },

  // 25. ALL-INDIA NATIONAL SACRED PILGRIMAGES (CHAR DHAM & MAHA JYOTIRLINGAS)
  national: {
    id: "national",
    nameEn: "All-India Sacred Pilgrimages",
    nameHi: "अखिल भारतीय प्रमुख महातीर्थ",
    nameTe: "అఖిల భారత ప్రధాన పుణ్యక్షేత్రాలు",
    center: { lat: 20.5937, lng: 78.9629 },
    aliases: ["national", "all-india", "india", "bharat", "pilgrimage", "chardham"],
    temples: [
      {
        name: "Tirumala Venkateswara Swamy Temple",
        nameHi: "श्री तिरुमला वेंकटेश्वर स्वामी",
        nameTe: "శ్రీ తిరుమల వేంకటేశ్వర స్వామి",
        location: "Tirupati, Andhra Pradesh",
        locationHi: "तिरुपति, आंध्र प्रदेश",
        locationTe: "తిరుపతి, ఆంధ్రప్రదేశ్",
        morning: "03:00 AM – 11:30 AM",
        evening: "12:00 PM – 11:00 PM",
        special: "Suprabhata Seva 03:00 AM",
        specialHi: "सुप्रभात सेवा भोर 03:00 AM",
        specialTe: "సుప్రభాత సేవ వేకువజామున 03:00",
        status: "crowded",
        image: "/images/krishna-hero.webp",
      },
      {
        name: "Shri Kashi Vishwanath Jyotirlinga",
        nameHi: "श्री काशी विश्वनाथ ज्योतिर्लिंग",
        nameTe: "శ్రీ కాశీ విశ్వనాథ జ్యోతిర్లింగం",
        location: "Varanasi, Uttar Pradesh",
        locationHi: "वाराणसी, उत्तर प्रदेश",
        locationTe: "వారణాసి, ఉత్తర ప్రదేశ్",
        morning: "03:00 AM – 11:00 AM",
        evening: "12:00 PM – 11:00 PM",
        special: "Mangala Aarti 03:00 AM & Shringar",
        specialHi: "मंगला आरती भोर 03:00 AM",
        specialTe: "మంగళ హారతి వేకువజామున 03:00",
        status: "open",
        image: "/images/varanasi-ghats.webp",
      },
      {
        name: "Shri Ram Janmabhoomi Mandir",
        nameHi: "श्री राम जन्मभूमि मंदिर",
        nameTe: "శ్రీ రామ జన్మభూమి మందిరం",
        location: "Ayodhya Dham, UP",
        locationHi: "अयोध्या धाम, उत्तर प्रदेश",
        locationTe: "అయోధ్య ధామం, ఉత్తర ప్రదేశ్",
        morning: "06:30 AM – 12:00 PM",
        evening: "02:00 PM – 10:00 PM",
        special: "Shringar Aarti 06:30 AM & Sandhya 07:30 PM",
        specialHi: "शृंगार आरती 06:30 AM एवं संध्या 07:30 PM",
        specialTe: "శృంగార హారతి ఉ. 06:30 & సంధ్య సా. 07:30",
        status: "crowded",
        image: "/images/ayodhya-mandir.webp",
      },
      {
        name: "Shree Jagannath Temple (Char Dham)",
        nameHi: "श्री जगन्नाथ मंदिर (चार धाम)",
        nameTe: "శ్రీ జగన్నాథ దేవాలయం (చార్ ధామ్)",
        location: "Puri, Odisha",
        locationHi: "पुरी, ओडिशा",
        locationTe: "పూరీ, ఒడిశా",
        morning: "05:00 AM – 01:00 PM",
        evening: "04:00 PM – 11:30 PM",
        special: "Mangala Alati 05:00 AM & Mahaprasad",
        specialHi: "मंगला आरती 05:00 AM एवं महाप्रसाद",
        specialTe: "మంగళ హారతి ఉ. 05:00 & మహాప్రసాదం",
        status: "crowded",
        image: "/images/krishna-hero.webp",
      },
      {
        name: "Shri Mahakaleshwar Jyotirlinga",
        nameHi: "श्री महाकालेश्वर ज्योतिर्लिंग",
        nameTe: "శ్రీ మహాకాళేశ్వర జ్యోతిర్లింగం",
        location: "Ujjain, Madhya Pradesh",
        locationHi: "उज्जैन, मध्य प्रदेश",
        locationTe: "ఉజ్జయిని, మధ్యప్రదేశ్",
        morning: "04:00 AM – 11:00 PM (Continuous)",
        evening: "04:00 PM – 11:00 PM",
        special: "Bhasma Aarti 04:00 AM & Sandhya 07:00 PM",
        specialHi: "विश्वप्रसिद्ध भस्म आरती भोर 04:00 AM",
        specialTe: "ప్రపంచ ప్రసిద్ధ భస్మ హారతి ఉ. 04:00",
        status: "crowded",
        image: "/images/ujjain-ghats.webp",
      },
      {
        name: "Shri Banke Bihari Mandir",
        nameHi: "श्री बांके बिहारी मंदिर",
        nameTe: "శ్రీ బంకే బిహారీ మందిరం",
        location: "Vrindavan, Uttar Pradesh",
        locationHi: "वृन्दावन, उत्तर प्रदेश",
        locationTe: "బృందావనం, ఉత్తర ప్రదేశ్",
        morning: "07:45 AM – 12:00 PM",
        evening: "05:30 PM – 09:30 PM",
        special: "Shringar Darshan 08:00 AM",
        specialHi: "शृंगार दर्शन प्रातः 08:00 AM",
        specialTe: "శృంగార దర్శనం ఉ. 08:00",
        status: "crowded",
        image: "/images/vrindavan-temple.webp",
      },
    ],
  },
};

// -------------------------------------------------------------
// Cluster Resolution Function
// -------------------------------------------------------------
export interface ResolvedClusterResult {
  cluster: TempleCityCluster;
  distanceKm?: number;
  isGpsMatched?: boolean;
}

export function resolveTempleCluster(
  city?: CityConfig,
  cityName?: string
): ResolvedClusterResult {
  const cityId = (city?.id || "").toLowerCase().trim();
  const nameLower = (city?.name || cityName || "").toLowerCase().trim();

  const isGps =
    cityId.startsWith("gps_") ||
    cityId.startsWith("custom_") ||
    nameLower.includes("gps") ||
    nameLower.includes("मेरा स्थान") ||
    nameLower.includes("నా స్థానం");

  // 1. Direct ID or Alias Match (only if not a GPS/custom coordinate string)
  if (!isGps && cityId) {
    for (const cluster of Object.values(TEMPLE_CLUSTERS)) {
      if (cluster.id === "national") continue;
      if (
        cluster.id === cityId ||
        cluster.aliases.some((a) => cityId === a || nameLower === a || nameLower.includes(a))
      ) {
        return { cluster };
      }
    }
  }

  // 2. Latitude / Longitude Haversine Matching (Essential for GPS & nearby towns)
  const lat = city?.latitude;
  const lng = city?.longitude;

  if (typeof lat === "number" && typeof lng === "number" && !isNaN(lat) && !isNaN(lng)) {
    let closestCluster: TempleCityCluster | null = null;
    let minDistance = Infinity;

    for (const cluster of Object.values(TEMPLE_CLUSTERS)) {
      if (cluster.id === "national") continue;
      const dist = getDistanceKm(lat, lng, cluster.center.lat, cluster.center.lng);
      if (dist < minDistance) {
        minDistance = dist;
        closestCluster = cluster;
      }
    }

    if (closestCluster) {
      return {
        cluster: closestCluster,
        distanceKm: Math.round(minDistance),
        isGpsMatched: isGps,
      };
    }
  }

  // 3. Match by name substring if city object wasn't fully hydrated
  if (nameLower && !isGps) {
    for (const cluster of Object.values(TEMPLE_CLUSTERS)) {
      if (cluster.id === "national") continue;
      if (cluster.aliases.some((a) => nameLower.includes(a))) {
        return { cluster };
      }
    }
  }

  // 4. Fallback to All-India National Sacred Pilgrimage
  return { cluster: TEMPLE_CLUSTERS.national };
}

// -------------------------------------------------------------
// Main Component
// -------------------------------------------------------------
export function MajorTempleTimings({
  city,
  cityName,
  cityNameHi,
  cityNameTe,
  isHi = false,
  isTe = false,
  onNearMeClick,
  onSelectCity,
}: MajorTempleTimingsProps) {
  // Allow user to manually toggle specific spiritual cities or stay on Auto
  const [selectedClusterKey, setSelectedClusterKey] = useState<string | null>(null);
  const [gpsDetecting, setGpsDetecting] = useState(false);

  // When active city changes from parent, reset manual tab to Auto
  useEffect(() => {
    setSelectedClusterKey(null);
  }, [city?.id, city?.name, city?.latitude, city?.longitude, cityName]);

  // Auto-detected cluster based on active city / GPS coordinates
  const resolved = useMemo(() => {
    return resolveTempleCluster(city, cityName);
  }, [city, cityName]);

  const activeCluster = useMemo(() => {
    if (selectedClusterKey && TEMPLE_CLUSTERS[selectedClusterKey]) {
      return TEMPLE_CLUSTERS[selectedClusterKey];
    }
    return resolved.cluster;
  }, [selectedClusterKey, resolved.cluster]);

  const isGpsActive =
    (city?.id || "").startsWith("gps_") ||
    (cityName || "").includes("GPS") ||
    (cityName || "").includes("जीपीएस") ||
    (cityName || "").includes("జీపీఎస్");

  const displayLocation = isTe
    ? cityNameTe || city?.name || cityName || activeCluster.nameTe
    : isHi
    ? cityNameHi || city?.nameHi || cityName || activeCluster.nameHi
    : cityName || city?.name || activeCluster.nameEn;

  const clusterTitle = isTe
    ? activeCluster.nameTe
    : isHi
    ? activeCluster.nameHi
    : activeCluster.nameEn;

  // Handle direct GPS location detection
  const handleGpsTrigger = () => {
    if (onNearMeClick) {
      onNearMeClick();
      return;
    }

    if (typeof navigator === "undefined" || !navigator.geolocation) {
      return;
    }

    setGpsDetecting(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGpsDetecting(false);
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        const gpsCity = createGpsCity({
          latitude: lat,
          longitude: lon,
          elevationMeters: pos.coords.altitude || 0,
          label: isTe
            ? "నా స్థానం (GPS)"
            : isHi
            ? "मेरा स्थान (GPS)"
            : "My Location (GPS)",
        });
        if (onSelectCity) {
          onSelectCity(gpsCity);
        }
      },
      () => {
        setGpsDetecting(false);
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  };

  // Quick Switcher City Pills
  const quickPills = [
    {
      key: "auto",
      labelEn: isGpsActive
        ? `Auto: My Location (GPS)`
        : `Auto: ${cityName || city?.name || "Nearest"}`,
      labelHi: isGpsActive
        ? `स्वतः: मेरा स्थान (GPS)`
        : `स्वतः: ${cityNameHi || city?.nameHi || "निकटतम"}`,
      labelTe: isGpsActive
        ? `ఆటో: నా స్థానం (GPS)`
        : `ఆటో: ${cityNameTe || city?.name || "సమీప"}`,
      isAuto: true,
    },
    { key: "varanasi", labelEn: "Kashi", labelHi: "काशी", labelTe: "కాశీ" },
    { key: "ayodhya", labelEn: "Ayodhya", labelHi: "अयोध्या", labelTe: "అయోధ్య" },
    { key: "mathura", labelEn: "Mathura", labelHi: "मथुरा", labelTe: "మధుర" },
    { key: "ujjain", labelEn: "Ujjain", labelHi: "उज्जैन", labelTe: "ఉజ్జయిని" },
    { key: "tirupati", labelEn: "Tirupati", labelHi: "तिरुपति", labelTe: "తిరుపతి" },
    { key: "delhi", labelEn: "Delhi", labelHi: "दिल्ली", labelTe: "ఢిల్లీ" },
    { key: "mumbai", labelEn: "Mumbai", labelHi: "मुंबई", labelTe: "ముంబై" },
    { key: "pune", labelEn: "Pune / Shirdi", labelHi: "पुणे / शिर्डी", labelTe: "పుణే / షిర్డీ" },
    { key: "bengaluru", labelEn: "Bengaluru", labelHi: "बेंगलुरु", labelTe: "బెంగళూరు" },
    { key: "hyderabad", labelEn: "Hyderabad", labelHi: "हैदराबाद", labelTe: "హైదరాబాద్" },
    { key: "chennai", labelEn: "Chennai", labelHi: "चेन्नई", labelTe: "చెన్నై" },
    { key: "kolkata", labelEn: "Kolkata", labelHi: "कोलकाता", labelTe: "కోల్‌కతా" },
    { key: "jaipur", labelEn: "Jaipur", labelHi: "जयपुर", labelTe: "జైపూర్" },
    { key: "puri", labelEn: "Puri Dham", labelHi: "जगन्नाथ पुरी", labelTe: "పూరీ ధామం" },
    { key: "national", labelEn: "All-India", labelHi: "अखिल भारतीय", labelTe: "అఖిల భారత" },
  ];

  return (
    <section className="rounded-3xl border border-amber-200/80 bg-white p-5 shadow-xs sm:p-6 lg:p-7 space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-line pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-800 shadow-2xs">
            <Landmark className="h-5 w-5" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-serif text-lg font-bold text-ink sm:text-xl">
                {isTe
                  ? `ప్రధాన దేవాలయ దర్శన వేళలు — ${clusterTitle}`
                  : isHi
                  ? `प्रमुख मंदिर दर्शन समय — ${clusterTitle}`
                  : `Major Temple Timings — ${clusterTitle}`}
              </h2>

              {/* Distance or Nearest Badge */}
              {selectedClusterKey === null && resolved.distanceKm !== undefined && (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-bold text-amber-900 border border-amber-300 shadow-2xs">
                  <Navigation className="h-3 w-3 text-amber-700" />
                  {isTe
                    ? `సమీపంలో (~${resolved.distanceKm} కి.మీ)`
                    : isHi
                    ? `निकटतम (~${resolved.distanceKm} किमी)`
                    : `Nearest (~${resolved.distanceKm} km)`}
                </span>
              )}
            </div>

            <p className="text-xs text-muted mt-0.5">
              {isTe
                ? `ప్రత్యక్ష దర్శనం, ఆరతి వేళలు మరియు ఆలయ కపాట స్థితి (${displayLocation} ఆధారంగా)`
                : isHi
                ? `आज का दैनिक दर्शन, आरती समय एवं कपाट स्थिति (${displayLocation} के अनुसार)`
                : `Daily darshan schedules, special aarti, and gate status (Serving ${displayLocation})`}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <button
            onClick={handleGpsTrigger}
            disabled={gpsDetecting}
            type="button"
            className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-sand/60 px-3 py-1.5 text-xs font-semibold text-ink hover:border-amber-400 hover:bg-amber-50 transition active:scale-95 shadow-2xs cursor-pointer disabled:opacity-60"
            title="Auto-detect nearest temples based on GPS location"
          >
            {gpsDetecting ? (
              <Loader2 className="h-3.5 w-3.5 text-saffron animate-spin" />
            ) : (
              <MapPin className="h-3.5 w-3.5 text-saffron" />
            )}
            <span>
              {gpsDetecting
                ? isTe
                  ? "గుర్తిస్తోంది..."
                  : isHi
                  ? "खोज रहे हैं..."
                  : "Locating..."
                : isTe
                ? "నా స్థానం (GPS)"
                : isHi
                ? "मेरा स्थान (GPS)"
                : "My Location (GPS)"}
            </span>
          </button>

          <LocaleLink
            href={PATHS.temples}
            className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-sand/60 px-3 py-1.5 text-xs font-semibold text-ink hover:border-amber-400 hover:bg-amber-50 transition active:scale-95 shadow-2xs"
          >
            <Map className="h-3.5 w-3.5 text-blue-600" />
            <span>{isTe ? "దేవాలయాల జాబితా" : isHi ? "मंदिर सूची" : "Temple Directory"}</span>
          </LocaleLink>
        </div>
      </div>

      {/* Quick City Switcher Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-[11px] font-bold text-muted uppercase tracking-wider shrink-0 flex items-center gap-1 mr-1">
          <Compass className="h-3.5 w-3.5 text-saffron-deep" />
          <span>{isTe ? "నగరం:" : isHi ? "नगर:" : "City:"}</span>
        </span>
        {quickPills.map((pill) => {
          const isSelected = pill.isAuto
            ? selectedClusterKey === null
            : selectedClusterKey === pill.key;
          const label = isTe ? pill.labelTe : isHi ? pill.labelHi : pill.labelEn;

          return (
            <button
              key={pill.key}
              type="button"
              onClick={() => {
                if (pill.isAuto) {
                  setSelectedClusterKey(null);
                } else {
                  setSelectedClusterKey(pill.key);
                }
              }}
              className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold transition active:scale-95 cursor-pointer ${
                isSelected
                  ? "bg-[#ea580c] text-white shadow-xs font-bold"
                  : "border border-amber-200/80 bg-amber-50/50 text-[#5c4033] hover:border-amber-400 hover:bg-white hover:text-ink"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Mobile Card List View (Phones) */}
      <div className="space-y-3 md:hidden">
        {activeCluster.temples.map((t, idx) => {
          const templeName = isTe ? t.nameTe : isHi ? t.nameHi : t.name;
          const locationName = isTe ? t.locationTe : isHi ? t.locationHi : t.location;
          const specialInfo = isTe ? t.specialTe : isHi ? t.specialHi : t.special;

          return (
            <div
              key={idx}
              className="rounded-2xl border border-line/80 bg-white p-3.5 shadow-2xs space-y-2.5 transition hover:border-amber-300"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-line bg-sand shadow-2xs">
                    <Image
                      src={t.image}
                      alt={templeName}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-serif font-bold text-ink text-sm truncate">
                      {templeName}
                    </h4>
                    <p className="text-[11px] text-muted truncate">
                      {locationName}
                    </p>
                  </div>
                </div>

                <div className="shrink-0">
                  {t.status === "open" ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800 border border-emerald-300">
                      <CheckCircle2 className="h-3 w-3" />
                      {isTe ? "తెరిచి ఉంది" : isHi ? "खुला है" : "Open"}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-900 border border-amber-300">
                      <AlertCircle className="h-3 w-3" />
                      {isTe ? "రద్దీగా ఉంది" : isHi ? "भीड़ है" : "Crowded"}
                    </span>
                  )}
                </div>
              </div>

              {/* Darshan Timings Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs border-t border-line/60 pt-2">
                <div className="rounded-xl bg-amber-50/50 p-2 border border-amber-200/50">
                  <span className="block text-[10px] font-bold text-amber-900/70 uppercase">
                    {isTe ? "ఉదయ దర్శనం" : isHi ? "प्रातः दर्शन" : "Morning"}
                  </span>
                  <span className="font-serif font-semibold text-ink text-xs block mt-0.5">
                    {t.morning}
                  </span>
                </div>
                <div className="rounded-xl bg-orange-50/50 p-2 border border-orange-200/50">
                  <span className="block text-[10px] font-bold text-orange-900/70 uppercase">
                    {isTe ? "సాయం దర్శనం" : isHi ? "सायं दर्शन" : "Evening"}
                  </span>
                  <span className="font-serif font-semibold text-ink text-xs block mt-0.5">
                    {t.evening}
                  </span>
                </div>
              </div>

              {/* Special Aarti */}
              <div className="rounded-xl bg-sand/40 p-2 border border-line text-xs">
                <span className="font-bold text-saffron-deep block text-[10px] uppercase">
                  {isTe ? "ప్రత్యేక ఆరతి & పూజ:" : isHi ? "विशेष आरती एवं दर्शन:" : "Special Aarti & Puja:"}
                </span>
                <span className="text-ink/90 text-xs mt-0.5 block">
                  {specialInfo}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto rounded-2xl border border-line shadow-2xs">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-sand/80 text-muted font-bold uppercase tracking-wider text-[11px] border-b border-line">
              <th className="py-2.5 px-3 rounded-l-xl">
                {isTe ? "ప్రధాన దేవాలయం" : isHi ? "प्रमुख मंदिर" : "Major Temple"}
              </th>
              <th className="py-2.5 px-3">
                {isTe ? "ప్రాంతం" : isHi ? "स्थान" : "Location"}
              </th>
              <th className="py-2.5 px-3">
                {isTe ? "ఉదయ దర్శనం" : isHi ? "प्रातः दर्शन" : "Morning Darshan"}
              </th>
              <th className="py-2.5 px-3">
                {isTe ? "సాయం దర్శనం" : isHi ? "सायं दर्शन" : "Evening Darshan"}
              </th>
              <th className="py-2.5 px-3">
                {isTe ? "ప్రత్యేకం" : isHi ? "विशेष" : "Special Aarti"}
              </th>
              <th className="py-2.5 px-3 rounded-r-xl text-center">
                {isTe ? "స్థితి" : isHi ? "लाइव स्थिति" : "Live Status"}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line/60 text-xs text-ink">
            {activeCluster.temples.map((t, idx) => {
              const templeName = isTe ? t.nameTe : isHi ? t.nameHi : t.name;
              const locationName = isTe ? t.locationTe : isHi ? t.locationHi : t.location;
              const specialInfo = isTe ? t.specialTe : isHi ? t.specialHi : t.special;

              return (
                <tr key={idx} className="hover:bg-amber-50/40 transition">
                  {/* Temple Name + Thumb */}
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2.5">
                      <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-lg border border-line bg-sand shadow-2xs">
                        <Image
                          src={t.image}
                          alt={templeName}
                          fill
                          sizes="32px"
                          className="object-cover"
                        />
                      </div>
                      <span className="font-serif font-bold text-ink hover:text-saffron transition">
                        {templeName}
                      </span>
                    </div>
                  </td>

                  {/* Location */}
                  <td className="py-3 px-3 text-muted">{locationName}</td>

                  {/* Morning Darshan */}
                  <td className="py-3 px-3 font-medium text-ink/90 whitespace-nowrap">{t.morning}</td>

                  {/* Evening Darshan */}
                  <td className="py-3 px-3 font-medium text-ink/90 whitespace-nowrap">{t.evening}</td>

                  {/* Special */}
                  <td className="py-3 px-3 text-muted">{specialInfo}</td>

                  {/* Status Badge */}
                  <td className="py-3 px-3 text-center">
                    {t.status === "open" ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800 border border-emerald-300">
                        <CheckCircle2 className="h-3 w-3" />
                        {isTe ? "తెరిచి ఉంది" : isHi ? "खुला है" : "Open"}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-bold text-amber-900 border border-amber-300">
                        <AlertCircle className="h-3 w-3" />
                        {isTe ? "రద్దీగా ఉంది" : isHi ? "भीड़ है" : "Crowded"}
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer Link */}
      <div className="pt-2 border-t border-line/60 flex items-center justify-between text-xs">
        <span className="text-muted">
          {isTe
            ? `మొత్తం ${activeCluster.temples.length} ప్రముఖ దేవాలయాలు చూపించబడుతున్నాయి`
            : isHi
            ? `कुल ${activeCluster.temples.length} प्रमुख मंदिरों के दर्शन समय प्रदर्शित`
            : `Showing ${activeCluster.temples.length} major temples in ${clusterTitle}`}
        </span>
        <LocaleLink
          href={PATHS.temples}
          className="group inline-flex items-center gap-1 font-bold text-saffron-deep hover:text-saffron transition"
        >
          <span>
            {isTe
              ? `మరిన్ని దేవాలయాలను అన్వేషించండి`
              : isHi
              ? `और मंदिर देखें`
              : `View All Temples`}
          </span>
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </LocaleLink>
      </div>
    </section>
  );
}
