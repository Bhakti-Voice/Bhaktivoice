export type CityConfig = {
  id: string;
  name: string;
  nameHi: string;
  state: string;
  stateHi: string;
  latitude: number;
  longitude: number;
  elevationMeters: number;
  timeZone: string;
};

export const CITIES: CityConfig[] = [
  {
    id: "delhi",
    name: "Delhi",
    nameHi: "नई दिल्ली",
    state: "Delhi",
    stateHi: "दिल्ली",
    latitude: 28.6139,
    longitude: 77.209,
    elevationMeters: 216,
    timeZone: "Asia/Kolkata",
  },
  {
    id: "mumbai",
    name: "Mumbai",
    nameHi: "मुंबई",
    state: "Maharashtra",
    stateHi: "महाराष्ट्र",
    latitude: 19.076,
    longitude: 72.8777,
    elevationMeters: 14,
    timeZone: "Asia/Kolkata",
  },
  {
    id: "bengaluru",
    name: "Bengaluru",
    nameHi: "बेंगलुरु",
    state: "Karnataka",
    stateHi: "कर्नाटक",
    latitude: 12.9716,
    longitude: 77.5946,
    elevationMeters: 920,
    timeZone: "Asia/Kolkata",
  },
  {
    id: "hyderabad",
    name: "Hyderabad",
    nameHi: "हैदराबाद",
    state: "Telangana",
    stateHi: "तेलंगाना",
    latitude: 17.385,
    longitude: 78.4867,
    elevationMeters: 542,
    timeZone: "Asia/Kolkata",
  },
  {
    id: "chennai",
    name: "Chennai",
    nameHi: "चेन्नई",
    state: "Tamil Nadu",
    stateHi: "तमिलनाडु",
    latitude: 13.0827,
    longitude: 80.2707,
    elevationMeters: 6,
    timeZone: "Asia/Kolkata",
  },
  {
    id: "kolkata",
    name: "Kolkata",
    nameHi: "कोलकाता",
    state: "West Bengal",
    stateHi: "पश्चिम बंगाल",
    latitude: 22.5726,
    longitude: 88.3639,
    elevationMeters: 9,
    timeZone: "Asia/Kolkata",
  },
  {
    id: "pune",
    name: "Pune",
    nameHi: "पुणे",
    state: "Maharashtra",
    stateHi: "महाराष्ट्र",
    latitude: 18.5204,
    longitude: 73.8567,
    elevationMeters: 560,
    timeZone: "Asia/Kolkata",
  },
  {
    id: "jaipur",
    name: "Jaipur",
    nameHi: "जयपुर",
    state: "Rajasthan",
    stateHi: "राजस्थान",
    latitude: 26.9124,
    longitude: 75.7873,
    elevationMeters: 431,
    timeZone: "Asia/Kolkata",
  },
  {
    id: "agra",
    name: "Agra",
    nameHi: "आगरा",
    state: "Uttar Pradesh",
    stateHi: "उत्तर प्रदेश",
    latitude: 27.1767,
    longitude: 78.0081,
    elevationMeters: 171,
    timeZone: "Asia/Kolkata",
  },
  {
    id: "varanasi",
    name: "Varanasi",
    nameHi: "वाराणसी",
    state: "Uttar Pradesh",
    stateHi: "उत्तर प्रदेश",
    latitude: 25.3176,
    longitude: 82.9739,
    elevationMeters: 80,
    timeZone: "Asia/Kolkata",
  },
  {
    id: "lucknow",
    name: "Lucknow",
    nameHi: "लखनऊ",
    state: "Uttar Pradesh",
    stateHi: "उत्तर प्रदेश",
    latitude: 26.8467,
    longitude: 80.9462,
    elevationMeters: 123,
    timeZone: "Asia/Kolkata",
  },
  {
    id: "ahmedabad",
    name: "Ahmedabad",
    nameHi: "अहमदाबाद",
    state: "Gujarat",
    stateHi: "गुजरात",
    latitude: 23.0225,
    longitude: 72.5714,
    elevationMeters: 53,
    timeZone: "Asia/Kolkata",
  },
];

export const DEFAULT_CITY = CITIES[0]; // Delhi
export const DELHI = DEFAULT_CITY;

export function getCityById(id?: string | null): CityConfig {
  if (!id) return DEFAULT_CITY;
  const found = CITIES.find((c) => c.id.toLowerCase() === id.toLowerCase());
  return found || DEFAULT_CITY;
}
