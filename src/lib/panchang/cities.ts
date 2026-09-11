export type CityConfig = {
  id: string;
  name: string;
  nameHi: string;
  state: string;
  stateHi: string;
  country?: string;
  countryHi?: string;
  latitude: number;
  longitude: number;
  elevationMeters: number;
  timeZone: string;
};

export const CITIES: CityConfig[] = [
  // --- Metros & Major State Capitals ---
  { id: "delhi", name: "Delhi", nameHi: "नई दिल्ली", state: "Delhi", stateHi: "दिल्ली", latitude: 28.6139, longitude: 77.209, elevationMeters: 216, timeZone: "Asia/Kolkata" },
  { id: "mumbai", name: "Mumbai", nameHi: "मुंबई", state: "Maharashtra", stateHi: "महाराष्ट्र", latitude: 19.076, longitude: 72.8777, elevationMeters: 14, timeZone: "Asia/Kolkata" },
  { id: "bengaluru", name: "Bengaluru", nameHi: "बेंगलुरु", state: "Karnataka", stateHi: "कर्नाटक", latitude: 12.9716, longitude: 77.5946, elevationMeters: 920, timeZone: "Asia/Kolkata" },
  { id: "hyderabad", name: "Hyderabad", nameHi: "हैदराबाद", state: "Telangana", stateHi: "तेलंगाना", latitude: 17.385, longitude: 78.4867, elevationMeters: 542, timeZone: "Asia/Kolkata" },
  { id: "chennai", name: "Chennai", nameHi: "चेन्नई", state: "Tamil Nadu", stateHi: "तमिलनाडु", latitude: 13.0827, longitude: 80.2707, elevationMeters: 6, timeZone: "Asia/Kolkata" },
  { id: "kolkata", name: "Kolkata", nameHi: "कोलकाता", state: "West Bengal", stateHi: "पश्चिम बंगाल", latitude: 22.5726, longitude: 88.3639, elevationMeters: 9, timeZone: "Asia/Kolkata" },
  { id: "pune", name: "Pune", nameHi: "पुणे", state: "Maharashtra", stateHi: "महाराष्ट्र", latitude: 18.5204, longitude: 73.8567, elevationMeters: 560, timeZone: "Asia/Kolkata" },
  { id: "ahmedabad", name: "Ahmedabad", nameHi: "अहमदाबाद", state: "Gujarat", stateHi: "गुजरात", latitude: 23.0225, longitude: 72.5714, elevationMeters: 53, timeZone: "Asia/Kolkata" },
  { id: "jaipur", name: "Jaipur", nameHi: "जयपुर", state: "Rajasthan", stateHi: "राजस्थान", latitude: 26.9124, longitude: 75.7873, elevationMeters: 431, timeZone: "Asia/Kolkata" },
  { id: "lucknow", name: "Lucknow", nameHi: "लखनऊ", state: "Uttar Pradesh", stateHi: "उत्तर प्रदेश", latitude: 26.8467, longitude: 80.9462, elevationMeters: 123, timeZone: "Asia/Kolkata" },
  { id: "chandigarh", name: "Chandigarh", nameHi: "चंडीगढ़", state: "Chandigarh", stateHi: "चंडीगढ़", latitude: 30.7333, longitude: 76.7794, elevationMeters: 321, timeZone: "Asia/Kolkata" },
  { id: "patna", name: "Patna", nameHi: "पटना", state: "Bihar", stateHi: "बिहार", latitude: 25.5941, longitude: 85.1376, elevationMeters: 53, timeZone: "Asia/Kolkata" },
  { id: "bhopal", name: "Bhopal", nameHi: "भोपाल", state: "Madhya Pradesh", stateHi: "मध्य प्रदेश", latitude: 23.2599, longitude: 77.4126, elevationMeters: 527, timeZone: "Asia/Kolkata" },
  { id: "indore", name: "Indore", nameHi: "इंदौर", state: "Madhya Pradesh", stateHi: "मध्य प्रदेश", latitude: 22.7196, longitude: 75.8577, elevationMeters: 553, timeZone: "Asia/Kolkata" },
  { id: "nagpur", name: "Nagpur", nameHi: "नागपुर", state: "Maharashtra", stateHi: "महाराष्ट्र", latitude: 21.1458, longitude: 79.0882, elevationMeters: 310, timeZone: "Asia/Kolkata" },
  { id: "surat", name: "Surat", nameHi: "सूरत", state: "Gujarat", stateHi: "गुजरात", latitude: 21.1702, longitude: 72.8311, elevationMeters: 13, timeZone: "Asia/Kolkata" },
  { id: "vadodara", name: "Vadodara", nameHi: "वडोदरा", state: "Gujarat", stateHi: "गुजरात", latitude: 22.3072, longitude: 73.1812, elevationMeters: 39, timeZone: "Asia/Kolkata" },
  { id: "rajkot", name: "Rajkot", nameHi: "राजकोट", state: "Gujarat", stateHi: "गुजरात", latitude: 22.3039, longitude: 70.8022, elevationMeters: 128, timeZone: "Asia/Kolkata" },
  { id: "kanpur", name: "Kanpur", nameHi: "कानपुर", state: "Uttar Pradesh", stateHi: "उत्तर प्रदेश", latitude: 26.4499, longitude: 80.3319, elevationMeters: 126, timeZone: "Asia/Kolkata" },
  { id: "agra", name: "Agra", nameHi: "आगरा", state: "Uttar Pradesh", stateHi: "उत्तर प्रदेश", latitude: 27.1767, longitude: 78.0081, elevationMeters: 171, timeZone: "Asia/Kolkata" },
  { id: "meerut", name: "Meerut", nameHi: "मेरठ", state: "Uttar Pradesh", stateHi: "उत्तर प्रदेश", latitude: 28.9845, longitude: 77.7064, elevationMeters: 219, timeZone: "Asia/Kolkata" },
  { id: "ghaziabad", name: "Ghaziabad", nameHi: "गाजियाबाद", state: "Uttar Pradesh", stateHi: "उत्तर प्रदेश", latitude: 28.6692, longitude: 77.4538, elevationMeters: 214, timeZone: "Asia/Kolkata" },
  { id: "noida", name: "Noida", nameHi: "नोएडा", state: "Uttar Pradesh", stateHi: "उत्तर प्रदेश", latitude: 28.5355, longitude: 77.391, elevationMeters: 200, timeZone: "Asia/Kolkata" },
  { id: "faridabad", name: "Faridabad", nameHi: "फरीदाबाद", state: "Haryana", stateHi: "हरियाणा", latitude: 28.4089, longitude: 77.3178, elevationMeters: 204, timeZone: "Asia/Kolkata" },
  { id: "gurugram", name: "Gurugram", nameHi: "गुरुग्राम", state: "Haryana", stateHi: "हरियाणा", latitude: 28.4595, longitude: 77.0266, elevationMeters: 217, timeZone: "Asia/Kolkata" },
  { id: "ludhiana", name: "Ludhiana", nameHi: "लुधियाना", state: "Punjab", stateHi: "पंजाब", latitude: 30.901, longitude: 75.8573, elevationMeters: 244, timeZone: "Asia/Kolkata" },
  { id: "amritsar", name: "Amritsar", nameHi: "अमृतसर", state: "Punjab", stateHi: "पंजाब", latitude: 31.634, longitude: 74.8723, elevationMeters: 234, timeZone: "Asia/Kolkata" },
  { id: "jodhpur", name: "Jodhpur", nameHi: "जोधपुर", state: "Rajasthan", stateHi: "राजस्थान", latitude: 26.2389, longitude: 73.0243, elevationMeters: 231, timeZone: "Asia/Kolkata" },
  { id: "udaipur", name: "Udaipur", nameHi: "उदयपुर", state: "Rajasthan", stateHi: "राजस्थान", latitude: 24.5854, longitude: 73.7125, elevationMeters: 598, timeZone: "Asia/Kolkata" },
  { id: "kota", name: "Kota", nameHi: "कोटा", state: "Rajasthan", stateHi: "राजस्थान", latitude: 25.2138, longitude: 75.8648, elevationMeters: 271, timeZone: "Asia/Kolkata" },
  { id: "ranchi", name: "Ranchi", nameHi: "राँची", state: "Jharkhand", stateHi: "झारखंड", latitude: 23.3441, longitude: 85.3096, elevationMeters: 651, timeZone: "Asia/Kolkata" },
  { id: "jamshedpur", name: "Jamshedpur", nameHi: "जमशेदपुर", state: "Jharkhand", stateHi: "झारखंड", latitude: 22.8046, longitude: 86.2029, elevationMeters: 135, timeZone: "Asia/Kolkata" },
  { id: "raipur", name: "Raipur", nameHi: "रायपुर", state: "Chhattisgarh", stateHi: "छत्तीसगढ़", latitude: 21.2514, longitude: 81.6296, elevationMeters: 298, timeZone: "Asia/Kolkata" },
  { id: "bilaspur", name: "Bilaspur", nameHi: "बिलासपुर", state: "Chhattisgarh", stateHi: "छत्तीसगढ़", latitude: 22.0797, longitude: 82.1391, elevationMeters: 262, timeZone: "Asia/Kolkata" },
  { id: "bhubaneswar", name: "Bhubaneswar", nameHi: "भुवनेश्वर", state: "Odisha", stateHi: "ओडिशा", latitude: 20.2961, longitude: 85.8245, elevationMeters: 45, timeZone: "Asia/Kolkata" },
  { id: "cuttack", name: "Cuttack", nameHi: "कटक", state: "Odisha", stateHi: "ओडिशा", latitude: 20.4625, longitude: 85.8828, elevationMeters: 36, timeZone: "Asia/Kolkata" },
  { id: "guwahati", name: "Guwahati", nameHi: "गुवाहाटी", state: "Assam", stateHi: "असम", latitude: 26.1445, longitude: 91.7362, elevationMeters: 55, timeZone: "Asia/Kolkata" },
  { id: "visakhapatnam", name: "Visakhapatnam", nameHi: "विशाखापत्तनम", state: "Andhra Pradesh", stateHi: "आंध्र प्रदेश", latitude: 17.6868, longitude: 83.2185, elevationMeters: 45, timeZone: "Asia/Kolkata" },
  { id: "vijayawada", name: "Vijayawada", nameHi: "विजयवाड़ा", state: "Andhra Pradesh", stateHi: "आंध्र प्रदेश", latitude: 16.5062, longitude: 80.648, elevationMeters: 11, timeZone: "Asia/Kolkata" },
  { id: "coimbatore", name: "Coimbatore", nameHi: "कोयंबटूर", state: "Tamil Nadu", stateHi: "तमिलनाडु", latitude: 11.0168, longitude: 76.9558, elevationMeters: 411, timeZone: "Asia/Kolkata" },
  { id: "madurai", name: "Madurai", nameHi: "मदुरै", state: "Tamil Nadu", stateHi: "तमिलनाडु", latitude: 9.9252, longitude: 78.1198, elevationMeters: 101, timeZone: "Asia/Kolkata" },
  { id: "kochi", name: "Kochi", nameHi: "कोच्चि", state: "Kerala", stateHi: "केरल", latitude: 9.9312, longitude: 76.2673, elevationMeters: 4, timeZone: "Asia/Kolkata" },
  { id: "thiruvananthapuram", name: "Thiruvananthapuram", nameHi: "तिरुवनंतपुरम", state: "Kerala", stateHi: "केरल", latitude: 8.5241, longitude: 76.9366, elevationMeters: 10, timeZone: "Asia/Kolkata" },
  { id: "mysuru", name: "Mysuru", nameHi: "मैसूरु", state: "Karnataka", stateHi: "कर्नाटक", latitude: 12.2958, longitude: 76.6394, elevationMeters: 763, timeZone: "Asia/Kolkata" },
  { id: "mangaluru", name: "Mangaluru", nameHi: "मंगलुरु", state: "Karnataka", stateHi: "कर्नाटक", latitude: 12.9141, longitude: 74.856, elevationMeters: 22, timeZone: "Asia/Kolkata" },
  { id: "dehradun", name: "Dehradun", nameHi: "देहरादून", state: "Uttarakhand", stateHi: "उत्तराखंड", latitude: 30.3165, longitude: 78.0322, elevationMeters: 640, timeZone: "Asia/Kolkata" },
  { id: "shimla", name: "Shimla", nameHi: "शिमला", state: "Himachal Pradesh", stateHi: "हिमाचल प्रदेश", latitude: 31.1048, longitude: 77.1734, elevationMeters: 2276, timeZone: "Asia/Kolkata" },
  { id: "srinagar", name: "Srinagar", nameHi: "श्रीनगर", state: "Jammu & Kashmir", stateHi: "जम्मू और कश्मीर", latitude: 34.0837, longitude: 74.7973, elevationMeters: 1585, timeZone: "Asia/Kolkata" },
  { id: "jammu", name: "Jammu", nameHi: "जम्मू", state: "Jammu & Kashmir", stateHi: "जम्मू", latitude: 32.7266, longitude: 74.857, elevationMeters: 327, timeZone: "Asia/Kolkata" },
  { id: "goa", name: "Panaji (Goa)", nameHi: "पणजी (गोवा)", state: "Goa", stateHi: "गोवा", latitude: 15.4909, longitude: 73.8278, elevationMeters: 7, timeZone: "Asia/Kolkata" },

  // --- Major Hindu Tirthas & Spiritual Holy Cities ---
  { id: "varanasi", name: "Varanasi (Kashi)", nameHi: "वाराणसी (काशी)", state: "Uttar Pradesh", stateHi: "उत्तर प्रदेश", latitude: 25.3176, longitude: 82.9739, elevationMeters: 80, timeZone: "Asia/Kolkata" },
  { id: "ayodhya", name: "Ayodhya", nameHi: "अयोध्या", state: "Uttar Pradesh", stateHi: "उत्तर प्रदेश", latitude: 26.7922, longitude: 82.1998, elevationMeters: 102, timeZone: "Asia/Kolkata" },
  { id: "mathura", name: "Mathura", nameHi: "मथुरा", state: "Uttar Pradesh", stateHi: "उत्तर प्रदेश", latitude: 27.4924, longitude: 77.6737, elevationMeters: 174, timeZone: "Asia/Kolkata" },
  { id: "vrindavan", name: "Vrindavan", nameHi: "वृंदावन", state: "Uttar Pradesh", stateHi: "उत्तर प्रदेश", latitude: 27.5806, longitude: 77.7006, elevationMeters: 170, timeZone: "Asia/Kolkata" },
  { id: "prayagraj", name: "Prayagraj (Allahabad)", nameHi: "प्रयागराज (इलाहाबाद)", state: "Uttar Pradesh", stateHi: "उत्तर प्रदेश", latitude: 25.4358, longitude: 81.8463, elevationMeters: 98, timeZone: "Asia/Kolkata" },
  { id: "haridwar", name: "Haridwar", nameHi: "हरिद्वार", state: "Uttarakhand", stateHi: "उत्तराखंड", latitude: 29.9457, longitude: 78.1642, elevationMeters: 314, timeZone: "Asia/Kolkata" },
  { id: "rishikesh", name: "Rishikesh", nameHi: "ऋषिकेश", state: "Uttarakhand", stateHi: "उत्तराखंड", latitude: 30.0869, longitude: 78.2676, elevationMeters: 372, timeZone: "Asia/Kolkata" },
  { id: "badrinath", name: "Badrinath", nameHi: "बद्रीनाथ", state: "Uttarakhand", stateHi: "उत्तराखंड", latitude: 30.7433, longitude: 79.4938, elevationMeters: 3100, timeZone: "Asia/Kolkata" },
  { id: "kedarnath", name: "Kedarnath", nameHi: "केदारनाथ", state: "Uttarakhand", stateHi: "उत्तराखंड", latitude: 30.7352, longitude: 79.0669, elevationMeters: 3583, timeZone: "Asia/Kolkata" },
  { id: "ujjain", name: "Ujjain (Mahakal)", nameHi: "उज्जैन (महाकाल)", state: "Madhya Pradesh", stateHi: "मध्य प्रदेश", latitude: 23.1765, longitude: 75.7885, elevationMeters: 494, timeZone: "Asia/Kolkata" },
  { id: "omkareshwar", name: "Omkareshwar", nameHi: "ओंकारेश्वर", state: "Madhya Pradesh", stateHi: "मध्य प्रदेश", latitude: 22.2465, longitude: 76.1506, elevationMeters: 185, timeZone: "Asia/Kolkata" },
  { id: "puri", name: "Jagannath Puri", nameHi: "जगन्नाथ पुरी", state: "Odisha", stateHi: "ओडिशा", latitude: 19.8135, longitude: 85.8312, elevationMeters: 0, timeZone: "Asia/Kolkata" },
  { id: "dwarka", name: "Dwarka", nameHi: "द्वारका", state: "Gujarat", stateHi: "गुजरात", latitude: 22.2442, longitude: 68.9685, elevationMeters: 7, timeZone: "Asia/Kolkata" },
  { id: "somnath", name: "Somnath", nameHi: "सोमनाथ", state: "Gujarat", stateHi: "गुजरात", latitude: 20.888, longitude: 70.4013, elevationMeters: 10, timeZone: "Asia/Kolkata" },
  { id: "tirupati", name: "Tirupati (Balaji)", nameHi: "तिरुपति (बालाजी)", state: "Andhra Pradesh", stateHi: "आंध्र प्रदेश", latitude: 13.6288, longitude: 79.4192, elevationMeters: 153, timeZone: "Asia/Kolkata" },
  { id: "rameswaram", name: "Rameswaram", nameHi: "रामेश्वरम", state: "Tamil Nadu", stateHi: "तमिलनाडु", latitude: 9.2876, longitude: 79.3129, elevationMeters: 10, timeZone: "Asia/Kolkata" },
  { id: "kanchipuram", name: "Kanchipuram", nameHi: "कांचीपुरम", state: "Tamil Nadu", stateHi: "तमिलनाडु", latitude: 12.8342, longitude: 79.7036, elevationMeters: 83, timeZone: "Asia/Kolkata" },
  { id: "shirdi", name: "Shirdi", nameHi: "शिरडी", state: "Maharashtra", stateHi: "महाराष्ट्र", latitude: 19.7667, longitude: 74.4767, elevationMeters: 504, timeZone: "Asia/Kolkata" },
  { id: "trimbakeshwar", name: "Trimbakeshwar (Nashik)", nameHi: "त्र्यंबकेश्वर (नासिक)", state: "Maharashtra", stateHi: "महाराष्ट्र", latitude: 19.9385, longitude: 73.5306, elevationMeters: 620, timeZone: "Asia/Kolkata" },
  { id: "pushkar", name: "Pushkar", nameHi: "पुष्कर", state: "Rajasthan", stateHi: "राजस्थान", latitude: 26.4897, longitude: 74.5511, elevationMeters: 510, timeZone: "Asia/Kolkata" },
  { id: "gaya", name: "Gaya (Bodh Gaya)", nameHi: "गया (बोधगया)", state: "Bihar", stateHi: "बिहार", latitude: 24.7914, longitude: 85.0002, elevationMeters: 111, timeZone: "Asia/Kolkata" },
  { id: "kurukshetra", name: "Kurukshetra", nameHi: "कुरुक्षेत्र", state: "Haryana", stateHi: "हरियाणा", latitude: 29.9695, longitude: 76.8783, elevationMeters: 260, timeZone: "Asia/Kolkata" },
  { id: "hampi", name: "Hampi", nameHi: "हम्पी", state: "Karnataka", stateHi: "कर्नाटक", latitude: 15.335, longitude: 76.46, elevationMeters: 467, timeZone: "Asia/Kolkata" },
  { id: "kolhapur", name: "Kolhapur (Mahalakshmi)", nameHi: "कोल्हापुर (महालक्ष्मी)", state: "Maharashtra", stateHi: "महाराष्ट्र", latitude: 16.705, longitude: 74.2433, elevationMeters: 569, timeZone: "Asia/Kolkata" },

  // --- Major International & NRI Global Hubs ---
  { id: "new-york", name: "New York", nameHi: "न्यूयॉर्क", state: "New York", stateHi: "न्यूयॉर्क", country: "United States", countryHi: "अमेरिका", latitude: 40.7128, longitude: -74.006, elevationMeters: 10, timeZone: "America/New_York" },
  { id: "san-jose", name: "San Jose (Silicon Valley)", nameHi: "सैन जोस (सिलिकॉन वैली)", state: "California", stateHi: "कैलिफ़ोर्निया", country: "United States", countryHi: "अमेरिका", latitude: 37.3382, longitude: -121.8863, elevationMeters: 25, timeZone: "America/Los_Angeles" },
  { id: "san-francisco", name: "San Francisco", nameHi: "सैन फ्रांसिस्को", state: "California", stateHi: "कैलिफ़ोर्निया", country: "United States", countryHi: "अमेरिका", latitude: 37.7749, longitude: -122.4194, elevationMeters: 16, timeZone: "America/Los_Angeles" },
  { id: "los-angeles", name: "Los Angeles", nameHi: "लॉस एंजिल्स", state: "California", stateHi: "कैलिफ़ोर्निया", country: "United States", countryHi: "अमेरिका", latitude: 34.0522, longitude: -118.2437, elevationMeters: 89, timeZone: "America/Los_Angeles" },
  { id: "chicago", name: "Chicago", nameHi: "शिकागो", state: "Illinois", stateHi: "इलिनोइस", country: "United States", countryHi: "अमेरिका", latitude: 41.8781, longitude: -87.6298, elevationMeters: 181, timeZone: "America/Chicago" },
  { id: "dallas", name: "Dallas", nameHi: "डलास", state: "Texas", stateHi: "टेक्सास", country: "United States", countryHi: "अमेरिका", latitude: 32.7767, longitude: -96.797, elevationMeters: 131, timeZone: "America/Chicago" },
  { id: "houston", name: "Houston", nameHi: "ह्यूस्टन", state: "Texas", stateHi: "टेक्सास", country: "United States", countryHi: "अमेरिका", latitude: 29.7604, longitude: -95.3698, elevationMeters: 14, timeZone: "America/Chicago" },
  { id: "seattle", name: "Seattle", nameHi: "सिएटल", state: "Washington", stateHi: "वॉशिंगटन", country: "United States", countryHi: "अमेरिका", latitude: 47.6062, longitude: -122.3321, elevationMeters: 53, timeZone: "America/Los_Angeles" },
  { id: "atlanta", name: "Atlanta", nameHi: "अटलांटा", state: "Georgia", stateHi: "जॉर्जिया", country: "United States", countryHi: "अमेरिका", latitude: 33.749, longitude: -84.388, elevationMeters: 320, timeZone: "America/New_York" },
  { id: "london", name: "London", nameHi: "लंदन", state: "England", stateHi: "इंग्लैंड", country: "United Kingdom", countryHi: "ब्रिटेन", latitude: 51.5074, longitude: -0.1278, elevationMeters: 11, timeZone: "Europe/London" },
  { id: "leicester", name: "Leicester", nameHi: "लीसेस्टर", state: "England", stateHi: "इंग्लैंड", country: "United Kingdom", countryHi: "ब्रिटेन", latitude: 52.6369, longitude: -1.1398, elevationMeters: 67, timeZone: "Europe/London" },
  { id: "birmingham", name: "Birmingham", nameHi: "बर्मिंघम", state: "England", stateHi: "इंग्लैंड", country: "United Kingdom", countryHi: "ब्रिटेन", latitude: 52.4862, longitude: -1.8904, elevationMeters: 140, timeZone: "Europe/London" },
  { id: "toronto", name: "Toronto", nameHi: "टोरंटो", state: "Ontario", stateHi: "ओंटारियो", country: "Canada", countryHi: "कनाडा", latitude: 43.6532, longitude: -79.3832, elevationMeters: 76, timeZone: "America/Toronto" },
  { id: "vancouver", name: "Vancouver", nameHi: "वैंकूवर", state: "British Columbia", stateHi: "ब्रिटिश कोलंबिया", country: "Canada", countryHi: "कनाडा", latitude: 49.2827, longitude: -123.1207, elevationMeters: 70, timeZone: "America/Vancouver" },
  { id: "dubai", name: "Dubai", nameHi: "दुबई", state: "Dubai", stateHi: "दुबई", country: "UAE", countryHi: "संयुक्त अरब अमीरात", latitude: 25.2048, longitude: 55.2708, elevationMeters: 5, timeZone: "Asia/Dubai" },
  { id: "abu-dhabi", name: "Abu Dhabi", nameHi: "अबू धाबी", state: "Abu Dhabi", stateHi: "अबू धाबी", country: "UAE", countryHi: "संयुक्त अरब अमीरात", latitude: 24.4539, longitude: 54.3773, elevationMeters: 7, timeZone: "Asia/Dubai" },
  { id: "singapore", name: "Singapore", nameHi: "सिंगापुर", state: "Singapore", stateHi: "सिंगापुर", country: "Singapore", countryHi: "सिंगापुर", latitude: 1.3521, longitude: 103.8198, elevationMeters: 15, timeZone: "Asia/Singapore" },
  { id: "kuala-lumpur", name: "Kuala Lumpur", nameHi: "क्वालालंपुर", state: "Federal Territory", stateHi: "क्वालालंपुर", country: "Malaysia", countryHi: "मलेशिया", latitude: 3.139, longitude: 101.6869, elevationMeters: 66, timeZone: "Asia/Kuala_Lumpur" },
  { id: "sydney", name: "Sydney", nameHi: "सिडनी", state: "New South Wales", stateHi: "न्यू साउथ वेल्स", country: "Australia", countryHi: "ऑस्ट्रेलिया", latitude: -33.8688, longitude: 151.2093, elevationMeters: 19, timeZone: "Australia/Sydney" },
  { id: "melbourne", name: "Melbourne", nameHi: "मेलबर्न", state: "Victoria", stateHi: "विक्टोरिया", country: "Australia", countryHi: "ऑस्ट्रेलिया", latitude: -37.8136, longitude: 144.9631, elevationMeters: 31, timeZone: "Australia/Melbourne" },
  { id: "auckland", name: "Auckland", nameHi: "ऑकलैंड", state: "Auckland", stateHi: "ऑकलैंड", country: "New Zealand", countryHi: "न्यूजीलैंड", latitude: -36.8485, longitude: 174.7633, elevationMeters: 26, timeZone: "Pacific/Auckland" },
  { id: "port-louis", name: "Port Louis", nameHi: "पोर्ट लुइस", state: "Port Louis", stateHi: "पोर्ट लुइस", country: "Mauritius", countryHi: "मॉरीशस", latitude: -20.1609, longitude: 57.5012, elevationMeters: 8, timeZone: "Indian/Mauritius" },
  { id: "kathmandu", name: "Kathmandu", nameHi: "काठमांडू", state: "Bagmati", stateHi: "बागमती", country: "Nepal", countryHi: "नेपाल", latitude: 27.7172, longitude: 85.324, elevationMeters: 1400, timeZone: "Asia/Kathmandu" },
  { id: "bangkok", name: "Bangkok", nameHi: "बैंकॉक", state: "Bangkok", stateHi: "बैंकॉक", country: "Thailand", countryHi: "थाईलैंड", latitude: 13.7563, longitude: 100.5018, elevationMeters: 1, timeZone: "Asia/Bangkok" },
  { id: "frankfurt", name: "Frankfurt", nameHi: "फ्रैंकफर्ट", state: "Hesse", stateHi: "हेस्से", country: "Germany", countryHi: "जर्मनी", latitude: 50.1109, longitude: 8.6821, elevationMeters: 112, timeZone: "Europe/Berlin" },
];

export const DEFAULT_CITY = CITIES[0]; // Delhi
export const DELHI = DEFAULT_CITY;

export function getCityById(id?: string | null): CityConfig {
  if (!id) return DEFAULT_CITY;
  const target = id.toLowerCase().trim();
  const found = CITIES.find((c) => c.id.toLowerCase() === target || c.name.toLowerCase() === target);
  return found || DEFAULT_CITY;
}

export function searchCities(query: string): CityConfig[] {
  const q = query.toLowerCase().trim();
  if (!q) return CITIES.slice(0, 20);
  return CITIES.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.nameHi.includes(q) ||
      c.state.toLowerCase().includes(q) ||
      (c.country && c.country.toLowerCase().includes(q)),
  ).slice(0, 30);
}
