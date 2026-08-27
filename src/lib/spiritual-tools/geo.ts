import type { BirthPlace } from "./types";

export type CityEntry = BirthPlace & {
  nameHi: string;
  state: string;
  stateHi?: string;
  aliases?: string[];
};

/**
 * Exhaustive Pan-India Cities, Towns, Pilgrimages & Global Indian Diaspora Hubs
 * Covering all 28 States, 8 Union Territories, and Major Sacred Tirthas.
 */
export const INDIAN_CITIES: CityEntry[] = [
  // --- NATIONAL CAPITAL REGION ---
  { name: "New Delhi", nameHi: "नई दिल्ली", state: "Delhi", stateHi: "दिल्ली", latitude: 28.6139, longitude: 77.209, timeZone: "Asia/Kolkata", aliases: ["Delhi", "NCR", "Dilli"] },
  { name: "Noida", nameHi: "नोएडा", state: "Uttar Pradesh", stateHi: "उत्तर प्रदेश", latitude: 28.5355, longitude: 77.391, timeZone: "Asia/Kolkata", aliases: ["Gautam Buddha Nagar"] },
  { name: "Greater Noida", nameHi: "ग्रेटर नोएडा", state: "Uttar Pradesh", stateHi: "उत्तर प्रदेश", latitude: 28.4744, longitude: 77.504, timeZone: "Asia/Kolkata" },
  { name: "Ghaziabad", nameHi: "गाजियाबाद", state: "Uttar Pradesh", stateHi: "उत्तर प्रदेश", latitude: 28.6692, longitude: 77.4538, timeZone: "Asia/Kolkata" },
  { name: "Gurugram", nameHi: "गुरुग्राम", state: "Haryana", stateHi: "हरियाणा", latitude: 28.4595, longitude: 77.0266, timeZone: "Asia/Kolkata", aliases: ["Gurgaon"] },
  { name: "Faridabad", nameHi: "फरीदाबाद", state: "Haryana", stateHi: "हरियाणा", latitude: 28.4089, longitude: 77.3178, timeZone: "Asia/Kolkata" },

  // --- UTTAR PRADESH & SACRED TIRTHAS ---
  { name: "Varanasi", nameHi: "वाराणसी", state: "Uttar Pradesh", stateHi: "उत्तर प्रदेश", latitude: 25.3176, longitude: 82.9739, timeZone: "Asia/Kolkata", aliases: ["Kashi", "Banaras", "काशी", "बनारस"] },
  { name: "Ayodhya", nameHi: "अयोध्या", state: "Uttar Pradesh", stateHi: "उत्तर प्रदेश", latitude: 26.7922, longitude: 82.1998, timeZone: "Asia/Kolkata", aliases: ["Faizabad", "Saket", "फैजाबाद"] },
  { name: "Mathura", nameHi: "मथुरा", state: "Uttar Pradesh", stateHi: "उत्तर प्रदेश", latitude: 27.4924, longitude: 77.6737, timeZone: "Asia/Kolkata", aliases: ["Braj"] },
  { name: "Vrindavan", nameHi: "वृंदावन", state: "Uttar Pradesh", stateHi: "उत्तर प्रदेश", latitude: 27.582, longitude: 77.7, timeZone: "Asia/Kolkata", aliases: ["Brindavan"] },
  { name: "Prayagraj", nameHi: "प्रयागराज", state: "Uttar Pradesh", stateHi: "उत्तर प्रदेश", latitude: 25.4358, longitude: 81.8463, timeZone: "Asia/Kolkata", aliases: ["Allahabad", "इलाहाबाद", "Triveni Sangam"] },
  { name: "Lucknow", nameHi: "लखनऊ", state: "Uttar Pradesh", stateHi: "उत्तर प्रदेश", latitude: 26.8467, longitude: 80.9462, timeZone: "Asia/Kolkata" },
  { name: "Kanpur", nameHi: "कानपुर", state: "Uttar Pradesh", stateHi: "उत्तर प्रदेश", latitude: 26.4499, longitude: 80.3319, timeZone: "Asia/Kolkata" },
  { name: "Agra", nameHi: "आगरा", state: "Uttar Pradesh", stateHi: "उत्तर प्रदेश", latitude: 27.1767, longitude: 78.0081, timeZone: "Asia/Kolkata" },
  { name: "Gorakhpur", nameHi: "गोरखपुर", state: "Uttar Pradesh", stateHi: "उत्तर प्रदेश", latitude: 26.7606, longitude: 83.3732, timeZone: "Asia/Kolkata", aliases: ["Gorakhnath"] },
  { name: "Meerut", nameHi: "मेरठ", state: "Uttar Pradesh", stateHi: "उत्तर प्रदेश", latitude: 28.9845, longitude: 77.7064, timeZone: "Asia/Kolkata" },
  { name: "Bareilly", nameHi: "बरेली", state: "Uttar Pradesh", stateHi: "उत्तर प्रदेश", latitude: 28.367, longitude: 79.4304, timeZone: "Asia/Kolkata" },
  { name: "Aligarh", nameHi: "अलीगढ़", state: "Uttar Pradesh", stateHi: "उत्तर प्रदेश", latitude: 27.8974, longitude: 78.088, timeZone: "Asia/Kolkata" },
  { name: "Moradabad", nameHi: "मुरादाबाद", state: "Uttar Pradesh", stateHi: "उत्तर प्रदेश", latitude: 28.8386, longitude: 78.7733, timeZone: "Asia/Kolkata" },
  { name: "Saharanpur", nameHi: "सहारनपुर", state: "Uttar Pradesh", stateHi: "उत्तर प्रदेश", latitude: 29.9671, longitude: 77.551, timeZone: "Asia/Kolkata" },
  { name: "Jhansi", nameHi: "झांसी", state: "Uttar Pradesh", stateHi: "उत्तर प्रदेश", latitude: 25.4484, longitude: 78.5685, timeZone: "Asia/Kolkata" },
  { name: "Muzaffarnagar", nameHi: "मुजफ्फरनगर", state: "Uttar Pradesh", stateHi: "उत्तर प्रदेश", latitude: 29.4727, longitude: 77.7085, timeZone: "Asia/Kolkata" },
  { name: "Chitrakoot", nameHi: "चित्रकूट", state: "Uttar Pradesh", stateHi: "उत्तर प्रदेश", latitude: 25.2052, longitude: 80.8953, timeZone: "Asia/Kolkata" },
  { name: "Naimisharanya", nameHi: "नैमिषारण्य", state: "Uttar Pradesh", stateHi: "उत्तर प्रदेश", latitude: 27.3528, longitude: 80.4853, timeZone: "Asia/Kolkata", aliases: ["Sitapur"] },
  { name: "Mirzapur", nameHi: "मिर्जापुर", state: "Uttar Pradesh", stateHi: "उत्तर प्रदेश", latitude: 25.146, longitude: 82.569, timeZone: "Asia/Kolkata", aliases: ["Vindhyachal"] },
  { name: "Jaunpur", nameHi: "जौनपुर", state: "Uttar Pradesh", stateHi: "उत्तर प्रदेश", latitude: 25.7464, longitude: 82.6837, timeZone: "Asia/Kolkata" },
  { name: "Azamgarh", nameHi: "आजमगढ़", state: "Uttar Pradesh", stateHi: "उत्तर प्रदेश", latitude: 26.0688, longitude: 83.1837, timeZone: "Asia/Kolkata" },
  { name: "Basti", nameHi: "बस्ती", state: "Uttar Pradesh", stateHi: "उत्तर प्रदेश", latitude: 26.8021, longitude: 82.7626, timeZone: "Asia/Kolkata" },
  { name: "Gonda", nameHi: "गोंडा", state: "Uttar Pradesh", stateHi: "उत्तर प्रदेश", latitude: 27.1345, longitude: 81.9619, timeZone: "Asia/Kolkata" },
  { name: "Deoria", nameHi: "देवरिया", state: "Uttar Pradesh", stateHi: "उत्तर प्रदेश", latitude: 26.5023, longitude: 83.7791, timeZone: "Asia/Kolkata" },
  { name: "Ballia", nameHi: "बलिया", state: "Uttar Pradesh", stateHi: "उत्तर प्रदेश", latitude: 25.7581, longitude: 84.1497, timeZone: "Asia/Kolkata" },
  { name: "Ghazipur", nameHi: "गाजीपुर", state: "Uttar Pradesh", stateHi: "उत्तर प्रदेश", latitude: 25.584, longitude: 83.577, timeZone: "Asia/Kolkata" },
  { name: "Shahjahanpur", nameHi: "शाहजहांपुर", state: "Uttar Pradesh", stateHi: "उत्तर प्रदेश", latitude: 27.8805, longitude: 79.9084, timeZone: "Asia/Kolkata" },
  { name: "Firozabad", nameHi: "फिरोजाबाद", state: "Uttar Pradesh", stateHi: "उत्तर प्रदेश", latitude: 27.1591, longitude: 78.3957, timeZone: "Asia/Kolkata" },
  { name: "Mainpuri", nameHi: "मैनपुरी", state: "Uttar Pradesh", stateHi: "उत्तर प्रदेश", latitude: 27.2289, longitude: 79.0264, timeZone: "Asia/Kolkata" },
  { name: "Etawah", nameHi: "इटावा", state: "Uttar Pradesh", stateHi: "उत्तर प्रदेश", latitude: 26.7769, longitude: 79.0238, timeZone: "Asia/Kolkata" },

  // --- UTTARAKHAND (DEV BHOOMI) ---
  { name: "Haridwar", nameHi: "हरिद्वार", state: "Uttarakhand", stateHi: "उत्तराखंड", latitude: 29.9457, longitude: 78.1642, timeZone: "Asia/Kolkata", aliases: ["Mayapuri", "Gangadwar"] },
  { name: "Rishikesh", nameHi: "ऋषिकेश", state: "Uttarakhand", stateHi: "उत्तराखंड", latitude: 30.0869, longitude: 78.2676, timeZone: "Asia/Kolkata" },
  { name: "Dehradun", nameHi: "देहरादून", state: "Uttarakhand", stateHi: "उत्तराखंड", latitude: 30.3165, longitude: 78.0322, timeZone: "Asia/Kolkata" },
  { name: "Badrinath", nameHi: "बद्रीनाथ", state: "Uttarakhand", stateHi: "उत्तराखंड", latitude: 30.7433, longitude: 79.4938, timeZone: "Asia/Kolkata", aliases: ["Chamoli"] },
  { name: "Kedarnath", nameHi: "केदारनाथ", state: "Uttarakhand", stateHi: "उत्तराखंड", latitude: 30.7352, longitude: 79.0669, timeZone: "Asia/Kolkata", aliases: ["Rudraprayag"] },
  { name: "Gangotri", nameHi: "गंगोत्री", state: "Uttarakhand", stateHi: "उत्तराखंड", latitude: 30.9947, longitude: 78.9398, timeZone: "Asia/Kolkata", aliases: ["Uttarkashi"] },
  { name: "Yamunotri", nameHi: "यमुनोत्री", state: "Uttarakhand", stateHi: "उत्तराखंड", latitude: 31.014, longitude: 78.46, timeZone: "Asia/Kolkata" },
  { name: "Nainital", nameHi: "नैनीताल", state: "Uttarakhand", stateHi: "उत्तराखंड", latitude: 29.3919, longitude: 79.4542, timeZone: "Asia/Kolkata" },
  { name: "Haldwani", nameHi: "हल्द्वानी", state: "Uttarakhand", stateHi: "उत्तराखंड", latitude: 29.2183, longitude: 79.513, timeZone: "Asia/Kolkata" },
  { name: "Almora", nameHi: "अल्मोड़ा", state: "Uttarakhand", stateHi: "उत्तराखंड", latitude: 29.5971, longitude: 79.6591, timeZone: "Asia/Kolkata", aliases: ["Jageshwar"] },

  // --- BIHAR & SACRED SITES ---
  { name: "Patna", nameHi: "पटना", state: "Bihar", stateHi: "बिहार", latitude: 25.5941, longitude: 85.1376, timeZone: "Asia/Kolkata", aliases: ["Pataliputra"] },
  { name: "Gaya", nameHi: "गया", state: "Bihar", stateHi: "बिहार", latitude: 24.7914, longitude: 85.0002, timeZone: "Asia/Kolkata", aliases: ["Bodh Gaya", "Vishnupad"] },
  { name: "Muzaffarpur", nameHi: "मुजफ्फरपुर", state: "Bihar", stateHi: "बिहार", latitude: 26.1209, longitude: 85.3647, timeZone: "Asia/Kolkata" },
  { name: "Bhagalpur", nameHi: "भागलपुर", state: "Bihar", stateHi: "बिहार", latitude: 25.2425, longitude: 86.9842, timeZone: "Asia/Kolkata" },
  { name: "Darbhanga", nameHi: "दरभंगा", state: "Bihar", stateHi: "बिहार", latitude: 26.1542, longitude: 85.8918, timeZone: "Asia/Kolkata", aliases: ["Mithila"] },
  { name: "Purnia", nameHi: "पूर्णिया", state: "Bihar", stateHi: "बिहार", latitude: 25.7771, longitude: 87.4753, timeZone: "Asia/Kolkata" },
  { name: "Begusarai", nameHi: "बेगूसराय", state: "Bihar", stateHi: "बिहार", latitude: 25.4182, longitude: 86.1272, timeZone: "Asia/Kolkata" },
  { name: "Samastipur", nameHi: "समस्तीपुर", state: "Bihar", stateHi: "बिहार", latitude: 25.8629, longitude: 85.7811, timeZone: "Asia/Kolkata" },
  { name: "Ara", nameHi: "आरा", state: "Bihar", stateHi: "बिहार", latitude: 25.5541, longitude: 84.6667, timeZone: "Asia/Kolkata", aliases: ["Bhojpur", "Arrah"] },
  { name: "Chapra", nameHi: "छपरा", state: "Bihar", stateHi: "बिहार", latitude: 25.7796, longitude: 84.7499, timeZone: "Asia/Kolkata", aliases: ["Saran"] },
  { name: "Siwan", nameHi: "सीवान", state: "Bihar", stateHi: "बिहार", latitude: 26.2196, longitude: 84.3567, timeZone: "Asia/Kolkata" },
  { name: "Gopalganj", nameHi: "गोपालगंज", state: "Bihar", stateHi: "बिहार", latitude: 26.4674, longitude: 84.4447, timeZone: "Asia/Kolkata", aliases: ["Thawe"] },
  { name: "Motihari", nameHi: "मोतिहारी", state: "Bihar", stateHi: "बिहार", latitude: 26.6469, longitude: 84.9089, timeZone: "Asia/Kolkata", aliases: ["East Champaran"] },
  { name: "Bettiah", nameHi: "बेतिया", state: "Bihar", stateHi: "बिहार", latitude: 26.8024, longitude: 84.5028, timeZone: "Asia/Kolkata", aliases: ["West Champaran"] },
  { name: "Sasaram", nameHi: "सासाराम", state: "Bihar", stateHi: "बिहार", latitude: 24.949, longitude: 84.0315, timeZone: "Asia/Kolkata", aliases: ["Rohtas"] },
  { name: "Buxar", nameHi: "बक्सर", state: "Bihar", stateHi: "बिहार", latitude: 25.5647, longitude: 83.9777, timeZone: "Asia/Kolkata" },
  { name: "Nalanda", nameHi: "नालंदा", state: "Bihar", stateHi: "बिहार", latitude: 25.1357, longitude: 85.4444, timeZone: "Asia/Kolkata", aliases: ["Rajgir", "Bihar Sharif"] },
  { name: "Madhubani", nameHi: "मधुबनी", state: "Bihar", stateHi: "बिहार", latitude: 26.3547, longitude: 86.0718, timeZone: "Asia/Kolkata" },
  { name: "Saharsa", nameHi: "सहरसा", state: "Bihar", stateHi: "बिहार", latitude: 25.8835, longitude: 86.6006, timeZone: "Asia/Kolkata" },
  { name: "Katihar", nameHi: "कटिहार", state: "Bihar", stateHi: "बिहार", latitude: 25.543, longitude: 87.5684, timeZone: "Asia/Kolkata" },
  { name: "Sitamarhi", nameHi: "सीतामढ़ी", state: "Bihar", stateHi: "बिहार", latitude: 26.5986, longitude: 85.4878, timeZone: "Asia/Kolkata", aliases: ["Janaki Sthan"] },

  // --- MAHARASHTRA & SACRED JYOTIRLINGAS ---
  { name: "Mumbai", nameHi: "मुंबई", state: "Maharashtra", stateHi: "महाराष्ट्र", latitude: 19.076, longitude: 72.8777, timeZone: "Asia/Kolkata", aliases: ["Bombay", "Mumba Devi", "Thane", "Navi Mumbai"] },
  { name: "Pune", nameHi: "पुणे", state: "Maharashtra", stateHi: "महाराष्ट्र", latitude: 18.5204, longitude: 73.8567, timeZone: "Asia/Kolkata", aliases: ["Poona"] },
  { name: "Nagpur", nameHi: "नागपुर", state: "Maharashtra", stateHi: "महाराष्ट्र", latitude: 21.1458, longitude: 79.0882, timeZone: "Asia/Kolkata" },
  { name: "Nashik", nameHi: "नासिक", state: "Maharashtra", stateHi: "महाराष्ट्र", latitude: 19.9975, longitude: 73.7898, timeZone: "Asia/Kolkata", aliases: ["Trimbakeshwar", "त्र्यंबकेश्वर", "Panchavati"] },
  { name: "Chhatrapati Sambhajinagar", nameHi: "छत्रपति संभाजीनगर", state: "Maharashtra", stateHi: "महाराष्ट्र", latitude: 19.8762, longitude: 75.3433, timeZone: "Asia/Kolkata", aliases: ["Aurangabad", "औरंगाबाद", "Grishneshwar", "घृष्णेश्वर"] },
  { name: "Kolhapur", nameHi: "कोल्हापुर", state: "Maharashtra", stateHi: "महाराष्ट्र", latitude: 16.705, longitude: 74.2433, timeZone: "Asia/Kolkata", aliases: ["Mahalakshmi Temple"] },
  { name: "Solapur", nameHi: "सोलापुर", state: "Maharashtra", stateHi: "महाराष्ट्र", latitude: 17.6599, longitude: 75.9064, timeZone: "Asia/Kolkata" },
  { name: "Shirdi", nameHi: "शिर्डी", state: "Maharashtra", stateHi: "महाराष्ट्र", latitude: 19.7667, longitude: 74.4767, timeZone: "Asia/Kolkata", aliases: ["Sai Baba Temple", "Ahmednagar"] },
  { name: "Pandharpur", nameHi: "पंढरपुर", state: "Maharashtra", stateHi: "महाराष्ट्र", latitude: 17.6775, longitude: 75.3267, timeZone: "Asia/Kolkata", aliases: ["Vitthal Rukmini Temple"] },
  { name: "Bhimashankar", nameHi: "भीमाशंकर", state: "Maharashtra", stateHi: "महाराष्ट्र", latitude: 19.0722, longitude: 73.5358, timeZone: "Asia/Kolkata", aliases: ["Jyotirlinga"] },
  { name: "Amravati", nameHi: "अमरावती", state: "Maharashtra", stateHi: "महाराष्ट्र", latitude: 20.9374, longitude: 77.7796, timeZone: "Asia/Kolkata" },
  { name: "Nanded", nameHi: "नांदेड़", state: "Maharashtra", stateHi: "महाराष्ट्र", latitude: 19.1383, longitude: 77.321, timeZone: "Asia/Kolkata", aliases: ["Hazur Sahib"] },
  { name: "Sangli", nameHi: "सांगली", state: "Maharashtra", stateHi: "महाराष्ट्र", latitude: 16.8524, longitude: 74.5815, timeZone: "Asia/Kolkata" },
  { name: "Jalgaon", nameHi: "जलगांव", state: "Maharashtra", stateHi: "महाराष्ट्र", latitude: 21.0077, longitude: 75.5626, timeZone: "Asia/Kolkata" },
  { name: "Akola", nameHi: "अकोला", state: "Maharashtra", stateHi: "महाराष्ट्र", latitude: 20.7002, longitude: 77.0082, timeZone: "Asia/Kolkata" },
  { name: "Latur", nameHi: "लातूर", state: "Maharashtra", stateHi: "महाराष्ट्र", latitude: 18.4088, longitude: 76.5604, timeZone: "Asia/Kolkata" },
  { name: "Dhule", nameHi: "धुले", state: "Maharashtra", stateHi: "महाराष्ट्र", latitude: 20.9042, longitude: 74.7749, timeZone: "Asia/Kolkata" },
  { name: "Chandrapur", nameHi: "चंद्रपुर", state: "Maharashtra", stateHi: "महाराष्ट्र", latitude: 19.9615, longitude: 79.2961, timeZone: "Asia/Kolkata" },
  { name: "Satara", nameHi: "सतारा", state: "Maharashtra", stateHi: "महाराष्ट्र", latitude: 17.6805, longitude: 74.0183, timeZone: "Asia/Kolkata" },

  // --- GUJARAT & SACRED DHAMS ---
  { name: "Ahmedabad", nameHi: "अहमदाबाद", state: "Gujarat", stateHi: "गुजरात", latitude: 23.0225, longitude: 72.5714, timeZone: "Asia/Kolkata", aliases: ["Amdavad", "कर्णावती"] },
  { name: "Surat", nameHi: "सूरत", state: "Gujarat", stateHi: "गुजरात", latitude: 21.1702, longitude: 72.8311, timeZone: "Asia/Kolkata" },
  { name: "Vadodara", nameHi: "वडोदरा", state: "Gujarat", stateHi: "गुजरात", latitude: 22.3072, longitude: 73.1812, timeZone: "Asia/Kolkata", aliases: ["Baroda"] },
  { name: "Rajkot", nameHi: "राजकोट", state: "Gujarat", stateHi: "गुजरात", latitude: 22.3039, longitude: 70.8022, timeZone: "Asia/Kolkata" },
  { name: "Dwarka", nameHi: "द्वारका", state: "Gujarat", stateHi: "गुजरात", latitude: 22.2442, longitude: 68.9685, timeZone: "Asia/Kolkata", aliases: ["Dwarkadhish", "द्वारकाधीश", "Char Dham"] },
  { name: "Somnath", nameHi: "सोमनाथ", state: "Gujarat", stateHi: "गुजरात", latitude: 20.888, longitude: 70.4013, timeZone: "Asia/Kolkata", aliases: ["Prabhas Patan", "Veraval", "First Jyotirlinga"] },
  { name: "Bhavnagar", nameHi: "भावनगर", state: "Gujarat", stateHi: "गुजरात", latitude: 21.7645, longitude: 72.1519, timeZone: "Asia/Kolkata", aliases: ["Palitana"] },
  { name: "Jamnagar", nameHi: "जामनगर", state: "Gujarat", stateHi: "गुजरात", latitude: 22.4707, longitude: 70.0577, timeZone: "Asia/Kolkata" },
  { name: "Gandhinagar", nameHi: "गांधीनगर", state: "Gujarat", stateHi: "गुजरात", latitude: 23.2156, longitude: 72.6369, timeZone: "Asia/Kolkata", aliases: ["Akshardham"] },
  { name: "Junagadh", nameHi: "जूनागढ़", state: "Gujarat", stateHi: "गुजरात", latitude: 21.5222, longitude: 70.4579, timeZone: "Asia/Kolkata", aliases: ["Girnar"] },
  { name: "Ambaji", nameHi: "अंबाजी", state: "Gujarat", stateHi: "गुजरात", latitude: 24.3323, longitude: 72.8532, timeZone: "Asia/Kolkata", aliases: ["Banaskantha"] },
  { name: "Bhuj", nameHi: "भुज", state: "Gujarat", stateHi: "गुजरात", latitude: 23.242, longitude: 69.6669, timeZone: "Asia/Kolkata", aliases: ["Kutch"] },
  { name: "Anand", nameHi: "आनंद", state: "Gujarat", stateHi: "गुजरात", latitude: 22.5645, longitude: 72.9289, timeZone: "Asia/Kolkata" },
  { name: "Nadiad", nameHi: "नडियाद", state: "Gujarat", stateHi: "गुजरात", latitude: 22.6916, longitude: 72.8634, timeZone: "Asia/Kolkata", aliases: ["Santram Mandir"] },
  { name: "Navsari", nameHi: "नवसारी", state: "Gujarat", stateHi: "गुजरात", latitude: 20.95, longitude: 72.93, timeZone: "Asia/Kolkata" },
  { name: "Valsad", nameHi: "वलसाड", state: "Gujarat", stateHi: "गुजरात", latitude: 20.5992, longitude: 72.9342, timeZone: "Asia/Kolkata", aliases: ["Vapi"] },

  // --- RAJASTHAN & PILGRIMAGES ---
  { name: "Jaipur", nameHi: "जयपुर", state: "Rajasthan", stateHi: "राजस्थान", latitude: 26.9124, longitude: 75.7873, timeZone: "Asia/Kolkata", aliases: ["Pink City", "Govind Dev Ji"] },
  { name: "Jodhpur", nameHi: "जोधपुर", state: "Rajasthan", stateHi: "राजस्थान", latitude: 26.2389, longitude: 73.0243, timeZone: "Asia/Kolkata", aliases: ["Sun City"] },
  { name: "Udaipur", nameHi: "उदयपुर", state: "Rajasthan", stateHi: "राजस्थान", latitude: 24.5854, longitude: 73.7125, timeZone: "Asia/Kolkata", aliases: ["Eklingji", "Nathdwara", "नाथद्वारा"] },
  { name: "Kota", nameHi: "कोटा", state: "Rajasthan", stateHi: "राजस्थान", latitude: 25.2138, longitude: 75.8648, timeZone: "Asia/Kolkata" },
  { name: "Bikaner", nameHi: "बीकानेर", state: "Rajasthan", stateHi: "राजस्थान", latitude: 28.0229, longitude: 73.3119, timeZone: "Asia/Kolkata", aliases: ["Karni Mata", "Deshnoke"] },
  { name: "Ajmer", nameHi: "अजमेर", state: "Rajasthan", stateHi: "राजस्थान", latitude: 26.4499, longitude: 74.6399, timeZone: "Asia/Kolkata", aliases: ["Pushkar", "पुष्कर", "Brahma Temple"] },
  { name: "Khatu", nameHi: "खाटूश्यामजी", state: "Rajasthan", stateHi: "राजस्थान", latitude: 27.4339, longitude: 75.2985, timeZone: "Asia/Kolkata", aliases: ["Khatu Shyam", "Sikar", "खाटू धाम"] },
  { name: "Salasar", nameHi: "सालासर बालाजी", state: "Rajasthan", stateHi: "राजस्थान", latitude: 27.7289, longitude: 74.7214, timeZone: "Asia/Kolkata", aliases: ["Salasar Balaji", "Churu"] },
  { name: "Mehndipur", nameHi: "मेहंदीपुर बालाजी", state: "Rajasthan", stateHi: "राजस्थान", latitude: 26.9892, longitude: 76.7628, timeZone: "Asia/Kolkata", aliases: ["Balaji", "Dausa"] },
  { name: "Bhilwara", nameHi: "भीलवाड़ा", state: "Rajasthan", stateHi: "राजस्थान", latitude: 25.3216, longitude: 74.6413, timeZone: "Asia/Kolkata" },
  { name: "Alwar", nameHi: "अलवर", state: "Rajasthan", stateHi: "राजस्थान", latitude: 27.553, longitude: 76.6346, timeZone: "Asia/Kolkata" },
  { name: "Bharatpur", nameHi: "भरतपुर", state: "Rajasthan", stateHi: "राजस्थान", latitude: 27.2152, longitude: 77.503, timeZone: "Asia/Kolkata" },
  { name: "Sri Ganganagar", nameHi: "श्रीगंगानगर", state: "Rajasthan", stateHi: "राजस्थान", latitude: 29.9038, longitude: 73.8772, timeZone: "Asia/Kolkata" },

  // --- MADHYA PRADESH & SACRED JYOTIRLINGAS ---
  { name: "Ujjain", nameHi: "उज्जैन", state: "Madhya Pradesh", stateHi: "मध्य प्रदेश", latitude: 23.1765, longitude: 75.7885, timeZone: "Asia/Kolkata", aliases: ["Mahakaleshwar", "महाकालेश्वर", "Avantika", "Simhastha"] },
  { name: "Omkareshwar", nameHi: "ओंकारेश्वर", state: "Madhya Pradesh", stateHi: "मध्य प्रदेश", latitude: 22.2464, longitude: 76.1517, timeZone: "Asia/Kolkata", aliases: ["Khandwa", "Jyotirlinga", "Mamleshwar"] },
  { name: "Indore", nameHi: "इंदौर", state: "Madhya Pradesh", stateHi: "मध्य प्रदेश", latitude: 22.7196, longitude: 75.8577, timeZone: "Asia/Kolkata" },
  { name: "Bhopal", nameHi: "भोपाल", state: "Madhya Pradesh", stateHi: "मध्य प्रदेश", latitude: 23.2599, longitude: 77.4126, timeZone: "Asia/Kolkata", aliases: ["Bhojpur Temple"] },
  { name: "Gwalior", nameHi: "ग्वालियर", state: "Madhya Pradesh", stateHi: "मध्य प्रदेश", latitude: 26.2183, longitude: 78.1828, timeZone: "Asia/Kolkata" },
  { name: "Jabalpur", nameHi: "जबलपुर", state: "Madhya Pradesh", stateHi: "मध्य प्रदेश", latitude: 23.1815, longitude: 79.9864, timeZone: "Asia/Kolkata", aliases: ["Narmada Ghat", "Bhedaghat"] },
  { name: "Rewa", nameHi: "रीवा", state: "Madhya Pradesh", stateHi: "मध्य प्रदेश", latitude: 24.5362, longitude: 81.3037, timeZone: "Asia/Kolkata" },
  { name: "Sagar", nameHi: "सागर", state: "Madhya Pradesh", stateHi: "मध्य प्रदेश", latitude: 23.8388, longitude: 78.7378, timeZone: "Asia/Kolkata" },
  { name: "Satna", nameHi: "सतना", state: "Madhya Pradesh", stateHi: "मध्य प्रदेश", latitude: 24.6005, longitude: 80.8322, timeZone: "Asia/Kolkata", aliases: ["Maihar", "मैहर शारदा माता"] },
  { name: "Khajuraho", nameHi: "खजुराहो", state: "Madhya Pradesh", stateHi: "मध्य प्रदेश", latitude: 24.8318, longitude: 79.9199, timeZone: "Asia/Kolkata", aliases: ["Chhatarpur"] },
  { name: "Ratlam", nameHi: "रतलाम", state: "Madhya Pradesh", stateHi: "मध्य प्रदेश", latitude: 23.3315, longitude: 75.0367, timeZone: "Asia/Kolkata" },
  { name: "Katni", nameHi: "कटनी", state: "Madhya Pradesh", stateHi: "मध्य प्रदेश", latitude: 23.8343, longitude: 80.3963, timeZone: "Asia/Kolkata" },

  // --- KARNATAKA & SOUTH SACRED TIRTHAS ---
  { name: "Bengaluru", nameHi: "बेंगलुरु", state: "Karnataka", stateHi: "कर्नाटक", latitude: 12.9716, longitude: 77.5946, timeZone: "Asia/Kolkata", aliases: ["Bangalore"] },
  { name: "Mysuru", nameHi: "मैसूरु", state: "Karnataka", stateHi: "कर्नाटक", latitude: 12.2958, longitude: 76.6394, timeZone: "Asia/Kolkata", aliases: ["Mysore", "Chamundeshwari"] },
  { name: "Mangaluru", nameHi: "मंगलुरु", state: "Karnataka", stateHi: "कर्नाटक", latitude: 12.9141, longitude: 74.856, timeZone: "Asia/Kolkata", aliases: ["Mangalore", "Kadri Manjunatha", "Kudroli"] },
  { name: "Udupi", nameHi: "उडुपी", state: "Karnataka", stateHi: "कर्नाटक", latitude: 13.3409, longitude: 74.7421, timeZone: "Asia/Kolkata", aliases: ["Sri Krishna Temple", "Kollur Mookambika"] },
  { name: "Hubballi", nameHi: "हुबली", state: "Karnataka", stateHi: "कर्नाटक", latitude: 15.3647, longitude: 75.124, timeZone: "Asia/Kolkata", aliases: ["Hubli", "Dharwad"] },
  { name: "Belagavi", nameHi: "बेलगावी", state: "Karnataka", stateHi: "कर्नाटक", latitude: 15.8497, longitude: 74.4977, timeZone: "Asia/Kolkata", aliases: ["Belgaum"] },
  { name: "Kalaburagi", nameHi: "कलबुर्गी", state: "Karnataka", stateHi: "कर्नाटक", latitude: 17.3297, longitude: 76.8343, timeZone: "Asia/Kolkata", aliases: ["Gulbarga", "Ganagapur Dattatreya"] },
  { name: "Gokarna", nameHi: "गोकर्ण", state: "Karnataka", stateHi: "कर्नाटक", latitude: 14.5479, longitude: 74.3188, timeZone: "Asia/Kolkata", aliases: ["Mahabaleshwar Temple", "Uttara Kannada"] },
  { name: "Sringeri", nameHi: "शृंगेरी", state: "Karnataka", stateHi: "कर्नाटक", latitude: 13.418, longitude: 75.257, timeZone: "Asia/Kolkata", aliases: ["Sharada Peetham", "Chikkamagaluru"] },
  { name: "Dharmasthala", nameHi: "धर्मस्थल", state: "Karnataka", stateHi: "कर्नाटक", latitude: 12.9555, longitude: 75.3813, timeZone: "Asia/Kolkata", aliases: ["Manjunatha Swamy"] },
  { name: "Kukke Subramanya", nameHi: "कुक्के सुब्रह्मण्य", state: "Karnataka", stateHi: "कर्नाटक", latitude: 12.6644, longitude: 75.6178, timeZone: "Asia/Kolkata", aliases: ["Naga Dosha Parihara"] },
  { name: "Hampi", nameHi: "हम्पी", state: "Karnataka", stateHi: "कर्नाटक", latitude: 15.335, longitude: 76.46, timeZone: "Asia/Kolkata", aliases: ["Virupaksha Temple", "Vijayanagara", "Bellary", "Ballari"] },
  { name: "Davangere", nameHi: "दावणगेरे", state: "Karnataka", stateHi: "कर्नाटक", latitude: 14.4644, longitude: 75.9218, timeZone: "Asia/Kolkata" },
  { name: "Shivamogga", nameHi: "शिवमोग्गा", state: "Karnataka", stateHi: "कर्नाटक", latitude: 13.9299, longitude: 75.5681, timeZone: "Asia/Kolkata", aliases: ["Shimoga"] },
  { name: "Tumakuru", nameHi: "तुमकुरु", state: "Karnataka", stateHi: "कर्नाटक", latitude: 13.3392, longitude: 77.1015, timeZone: "Asia/Kolkata", aliases: ["Tumkur", "Siddaganga"] },
  { name: "Vijayapura", nameHi: "विजयपुर", state: "Karnataka", stateHi: "कर्नाटक", latitude: 16.8302, longitude: 75.71, timeZone: "Asia/Kolkata", aliases: ["Bijapur"] },

  // --- TAMIL NADU & SACRED DIVYA DESAMS ---
  { name: "Chennai", nameHi: "चेन्नई", state: "Tamil Nadu", stateHi: "तमिलनाडु", latitude: 13.0827, longitude: 80.2707, timeZone: "Asia/Kolkata", aliases: ["Madras", "Kapaleeshwarar", "Parthasarathy"] },
  { name: "Madurai", nameHi: "मदुरै", state: "Tamil Nadu", stateHi: "तमिलनाडु", latitude: 9.9252, longitude: 78.1198, timeZone: "Asia/Kolkata", aliases: ["Meenakshi Temple", "मीनाक्षी अम्मन"] },
  { name: "Rameswaram", nameHi: "रामेश्वरम", state: "Tamil Nadu", stateHi: "तमिलनाडु", latitude: 9.2876, longitude: 79.3129, timeZone: "Asia/Kolkata", aliases: ["Ramanathaswamy", "रामेश्वरम", "Char Dham", "Jyotirlinga"] },
  { name: "Kanchipuram", nameHi: "कांचीपुरम", state: "Tamil Nadu", stateHi: "तमिलनाडु", latitude: 12.8342, longitude: 79.7036, timeZone: "Asia/Kolkata", aliases: ["Kanchi Kamakshi", "Ekambareswarar", "Mokshapuri"] },
  { name: "Thanjavur", nameHi: "तंजावुर", state: "Tamil Nadu", stateHi: "तमिलनाडु", latitude: 10.787, longitude: 79.1378, timeZone: "Asia/Kolkata", aliases: ["Tanjore", "Brihadeeswarar Temple", "बृहदेश्वर मंदिर"] },
  { name: "Tiruchirappalli", nameHi: "तिरुचिरापल्ली", state: "Tamil Nadu", stateHi: "तमिलनाडु", latitude: 10.7905, longitude: 78.7047, timeZone: "Asia/Kolkata", aliases: ["Trichy", "Srirangam", "श्रीरंगम", "Ranganathaswamy"] },
  { name: "Tiruvannamalai", nameHi: "तिरुवन्नामलाई", state: "Tamil Nadu", stateHi: "तमिलनाडु", latitude: 12.2253, longitude: 79.0747, timeZone: "Asia/Kolkata", aliases: ["Arunachaleswarar", "अरुणाचल", "Ramana Maharshi"] },
  { name: "Chidambaram", nameHi: "चिदंबरम", state: "Tamil Nadu", stateHi: "तमिलनाडु", latitude: 11.3992, longitude: 79.6935, timeZone: "Asia/Kolkata", aliases: ["Nataraja Temple", "चिदंबरम नटराज"] },
  { name: "Coimbatore", nameHi: "कोयंबटूर", state: "Tamil Nadu", stateHi: "तमिलनाडु", latitude: 11.0168, longitude: 76.9558, timeZone: "Asia/Kolkata", aliases: ["Isha Yoga", "Dhyanalinga"] },
  { name: "Salem", nameHi: "सलेम", state: "Tamil Nadu", stateHi: "तमिलनाडु", latitude: 11.6643, longitude: 78.146, timeZone: "Asia/Kolkata" },
  { name: "Tirunelveli", nameHi: "तिरुनेलवेली", state: "Tamil Nadu", stateHi: "तमिलनाडु", latitude: 8.7139, longitude: 77.7567, timeZone: "Asia/Kolkata", aliases: ["Nellaiappar"] },
  { name: "Kanyakumari", nameHi: "कन्याकुमारी", state: "Tamil Nadu", stateHi: "तमिलनाडु", latitude: 8.0883, longitude: 77.5385, timeZone: "Asia/Kolkata", aliases: ["Vivekananda Rock", "Bhagavathy Amman"] },
  { name: "Palani", nameHi: "पलानी", state: "Tamil Nadu", stateHi: "तमिलनाडु", latitude: 10.45, longitude: 77.5167, timeZone: "Asia/Kolkata", aliases: ["Murugan Temple"] },
  { name: "Kumbakonam", nameHi: "कुंभकोणम", state: "Tamil Nadu", stateHi: "तमिलनाडु", latitude: 10.9602, longitude: 79.3845, timeZone: "Asia/Kolkata", aliases: ["Navagraha Temples"] },
  { name: "Vellore", nameHi: "वेल्लोर", state: "Tamil Nadu", stateHi: "तमिलनाडु", latitude: 12.9165, longitude: 79.1325, timeZone: "Asia/Kolkata", aliases: ["Golden Temple Sripuram"] },

  // --- ANDHRA PRADESH & TELANGANA ---
  { name: "Tirupati", nameHi: "तिरुपति", state: "Andhra Pradesh", stateHi: "आंध्र प्रदेश", latitude: 13.6288, longitude: 79.4192, timeZone: "Asia/Kolkata", aliases: ["Tirumala", "तिरुमाला", "Venkateswara Swamy", "बालाजी"] },
  { name: "Srisailam", nameHi: "श्रीशैलम", state: "Andhra Pradesh", stateHi: "आंध्र प्रदेश", latitude: 16.074, longitude: 78.868, timeZone: "Asia/Kolkata", aliases: ["Mallikarjuna", "मल्लिकार्जुन", "Jyotirlinga", "Kurnool"] },
  { name: "Vijayawada", nameHi: "विजयवाड़ा", state: "Andhra Pradesh", stateHi: "आंध्र प्रदेश", latitude: 16.5062, longitude: 80.648, timeZone: "Asia/Kolkata", aliases: ["Kanaka Durga Temple"] },
  { name: "Visakhapatnam", nameHi: "विशाखापट्टनम", state: "Andhra Pradesh", stateHi: "आंध्र प्रदेश", latitude: 17.6868, longitude: 83.2185, timeZone: "Asia/Kolkata", aliases: ["Vizag", "Simhachalam"] },
  { name: "Guntur", nameHi: "गुंटूर", state: "Andhra Pradesh", stateHi: "आंध्र प्रदेश", latitude: 16.3067, longitude: 80.4365, timeZone: "Asia/Kolkata" },
  { name: "Nellore", nameHi: "नेल्लोर", state: "Andhra Pradesh", stateHi: "आंध्र प्रदेश", latitude: 14.4426, longitude: 79.9865, timeZone: "Asia/Kolkata", aliases: ["Jonnavada"] },
  { name: "Rajahmundry", nameHi: "राजमुंदरी", state: "Andhra Pradesh", stateHi: "आंध्र प्रदेश", latitude: 17.0005, longitude: 81.804, timeZone: "Asia/Kolkata", aliases: ["Rajamahendravaram", "Godavari Pushkaram"] },
  { name: "Kurnool", nameHi: "कुरनूल", state: "Andhra Pradesh", stateHi: "आंध्र प्रदेश", latitude: 15.8281, longitude: 78.0373, timeZone: "Asia/Kolkata", aliases: ["Ahobilam", "Mahanandi"] },
  { name: "Anantapur", nameHi: "अनंतपुर", state: "Andhra Pradesh", stateHi: "आंध्र प्रदेश", latitude: 14.6819, longitude: 77.6006, timeZone: "Asia/Kolkata", aliases: ["Lepakshi", "Puttaparthi"] },
  { name: "Kakinada", nameHi: "काकीनाडा", state: "Andhra Pradesh", stateHi: "आंध्र प्रदेश", latitude: 16.9891, longitude: 82.2475, timeZone: "Asia/Kolkata", aliases: ["Annavaram Satyanarayana"] },
  { name: "Hyderabad", nameHi: "हैदराबाद", state: "Telangana", stateHi: "तेलंगाना", latitude: 17.385, longitude: 78.4867, timeZone: "Asia/Kolkata", aliases: ["Secunderabad", "Yadagirigutta", "Chilkur Balaji"] },
  { name: "Warangal", nameHi: "वारंगल", state: "Telangana", stateHi: "तेलंगाना", latitude: 17.9689, longitude: 79.5941, timeZone: "Asia/Kolkata", aliases: ["Thousand Pillar Temple", "Ramappa"] },
  { name: "Karimnagar", nameHi: "करीमनगर", state: "Telangana", stateHi: "तेलंगाना", latitude: 18.4386, longitude: 79.1288, timeZone: "Asia/Kolkata", aliases: ["Vemulawada Rajarajeshwara"] },
  { name: "Nizamabad", nameHi: "निजामाबाद", state: "Telangana", stateHi: "तेलंगाना", latitude: 18.6725, longitude: 78.0941, timeZone: "Asia/Kolkata" },
  { name: "Khammam", nameHi: "खम्मम", state: "Telangana", stateHi: "तेलंगाना", latitude: 17.2473, longitude: 80.1514, timeZone: "Asia/Kolkata", aliases: ["Bhadrachalam Rama Temple", "भद्राचलम"] },

  // --- KERALA & SACRED TEMPLES ---
  { name: "Thiruvananthapuram", nameHi: "तिरुवनंतपुरम", state: "Kerala", stateHi: "केरल", latitude: 8.5241, longitude: 76.9366, timeZone: "Asia/Kolkata", aliases: ["Trivandrum", "Padmanabhaswamy Temple", "पद्मनाभस्वामी"] },
  { name: "Kochi", nameHi: "कोच्चि", state: "Kerala", stateHi: "केरल", latitude: 9.9312, longitude: 76.2673, timeZone: "Asia/Kolkata", aliases: ["Cochin", "Chottanikkara", "Kalady Shankaracharya"] },
  { name: "Kozhikode", nameHi: "कोझिकोड", state: "Kerala", stateHi: "केरल", latitude: 11.2588, longitude: 75.7804, timeZone: "Asia/Kolkata", aliases: ["Calicut"] },
  { name: "Thrissur", nameHi: "त्रिशूर", state: "Kerala", stateHi: "केरल", latitude: 10.5276, longitude: 76.2144, timeZone: "Asia/Kolkata", aliases: ["Vadakkunnathan", "Guruvayur", "गुरुवायुर"] },
  { name: "Sabarimala", nameHi: "सबरीमाला", state: "Kerala", stateHi: "केरल", latitude: 9.4402, longitude: 77.0819, timeZone: "Asia/Kolkata", aliases: ["Lord Ayyappa", "Pathanamthitta"] },
  { name: "Kollam", nameHi: "कोल्लम", state: "Kerala", stateHi: "केरल", latitude: 8.8932, longitude: 76.6141, timeZone: "Asia/Kolkata", aliases: ["Quilon"] },
  { name: "Kannur", nameHi: "कन्नूर", state: "Kerala", stateHi: "केरल", latitude: 11.8745, longitude: 75.3704, timeZone: "Asia/Kolkata" },
  { name: "Alappuzha", nameHi: "अलप्पुझा", state: "Kerala", stateHi: "केरल", latitude: 9.4981, longitude: 76.3388, timeZone: "Asia/Kolkata", aliases: ["Alleppey", "Ambalapuzha Krishna"] },
  { name: "Kottayam", nameHi: "कोट्टायम", state: "Kerala", stateHi: "केरल", latitude: 9.5916, longitude: 76.5222, timeZone: "Asia/Kolkata", aliases: ["Ettumanoor Mahadeva"] },
  { name: "Palakkad", nameHi: "पालक्काड़", state: "Kerala", stateHi: "केरल", latitude: 10.7867, longitude: 76.6548, timeZone: "Asia/Kolkata" },

  // --- WEST BENGAL & ODISHA (EAST) ---
  { name: "Kolkata", nameHi: "कोलकाता", state: "West Bengal", stateHi: "पश्चिम बंगाल", latitude: 22.5726, longitude: 88.3639, timeZone: "Asia/Kolkata", aliases: ["Calcutta", "Kalighat", "Dakshineswar", "Belur Math"] },
  { name: "Howrah", nameHi: "हावड़ा", state: "West Bengal", stateHi: "पश्चिम बंगाल", latitude: 22.5958, longitude: 88.2636, timeZone: "Asia/Kolkata" },
  { name: "Siliguri", nameHi: "सिलीगुड़ी", state: "West Bengal", stateHi: "पश्चिम बंगाल", latitude: 26.7271, longitude: 88.3953, timeZone: "Asia/Kolkata" },
  { name: "Durgapur", nameHi: "दुर्गापुर", state: "West Bengal", stateHi: "पश्चिम बंगाल", latitude: 23.5204, longitude: 87.3119, timeZone: "Asia/Kolkata" },
  { name: "Asansol", nameHi: "आसनसोल", state: "West Bengal", stateHi: "पश्चिम बंगाल", latitude: 23.6739, longitude: 86.9524, timeZone: "Asia/Kolkata", aliases: ["Kalyaneshwari"] },
  { name: "Mayapur", nameHi: "मायापुर", state: "West Bengal", stateHi: "पश्चिम बंगाल", latitude: 23.4233, longitude: 88.3922, timeZone: "Asia/Kolkata", aliases: ["Nabadwip", "Chaitanya Mahaprabhu", "ISKCON Mayapur"] },
  { name: "Tarapith", nameHi: "तारापीठ", state: "West Bengal", stateHi: "पश्चिम बंगाल", latitude: 24.1147, longitude: 87.8016, timeZone: "Asia/Kolkata", aliases: ["Maa Tara", "Birbhum", "Bamakhepa"] },
  { name: "Puri", nameHi: "पुरी", state: "Odisha", stateHi: "ओडिशा", latitude: 19.8135, longitude: 85.8312, timeZone: "Asia/Kolkata", aliases: ["Jagannath Dham", "जगन्नाथ पुरी", "Char Dham", "Srikhetra"] },
  { name: "Bhubaneswar", nameHi: "भुवनेश्वर", state: "Odisha", stateHi: "ओडिशा", latitude: 20.2961, longitude: 85.8245, timeZone: "Asia/Kolkata", aliases: ["Lingaraj Temple", "Ekamra Kshetra"] },
  { name: "Cuttack", nameHi: "कटक", state: "Odisha", stateHi: "ओडिशा", latitude: 20.4625, longitude: 85.8828, timeZone: "Asia/Kolkata", aliases: ["Chandi Temple", "Barabati"] },
  { name: "Konark", nameHi: "कोणार्क", state: "Odisha", stateHi: "ओडिशा", latitude: 19.8876, longitude: 86.0945, timeZone: "Asia/Kolkata", aliases: ["Sun Temple", "सूर्य मंदिर"] },
  { name: "Rourkela", nameHi: "राउरकेला", state: "Odisha", stateHi: "ओडिशा", latitude: 22.2604, longitude: 84.8536, timeZone: "Asia/Kolkata", aliases: ["Vedvyas"] },
  { name: "Sambalpur", nameHi: "संबलपुर", state: "Odisha", stateHi: "ओडिशा", latitude: 21.4669, longitude: 83.9812, timeZone: "Asia/Kolkata", aliases: ["Samaleswari Temple"] },
  { name: "Berhampur", nameHi: "ब्रह्मपुर", state: "Odisha", stateHi: "ओडिशा", latitude: 19.3149, longitude: 84.7941, timeZone: "Asia/Kolkata", aliases: ["Brahmapur", "Tara Tarini"] },

  // --- JHARKHAND & CHHATTISGARH ---
  { name: "Ranchi", nameHi: "राँची", state: "Jharkhand", stateHi: "झारखंड", latitude: 23.3441, longitude: 85.3096, timeZone: "Asia/Kolkata", aliases: ["Jagannath Temple Ranchi", "Pahari Mandir"] },
  { name: "Deoghar", nameHi: "देवघर", state: "Jharkhand", stateHi: "झारखंड", latitude: 24.4826, longitude: 86.7001, timeZone: "Asia/Kolkata", aliases: ["Baidyanath Dham", "वैद्यनाथ धाम", "Baba Dham", "Jyotirlinga"] },
  { name: "Jamshedpur", nameHi: "जमशेदपुर", state: "Jharkhand", stateHi: "झारखंड", latitude: 22.8046, longitude: 86.2029, timeZone: "Asia/Kolkata", aliases: ["Tatanagar"] },
  { name: "Dhanbad", nameHi: "धनबाद", state: "Jharkhand", stateHi: "झारखंड", latitude: 23.7957, longitude: 86.4304, timeZone: "Asia/Kolkata" },
  { name: "Bokaro", nameHi: "बोकारो", state: "Jharkhand", stateHi: "झारखंड", latitude: 23.6693, longitude: 86.1511, timeZone: "Asia/Kolkata" },
  { name: "Hazaribagh", nameHi: "हजारीबाग", state: "Jharkhand", stateHi: "झारखंड", latitude: 23.9937, longitude: 85.3637, timeZone: "Asia/Kolkata" },
  { name: "Raipur", nameHi: "रायपुर", state: "Chhattisgarh", stateHi: "छत्तीसगढ़", latitude: 21.2514, longitude: 81.6296, timeZone: "Asia/Kolkata", aliases: ["Kankali Temple", "Mahamaya"] },
  { name: "Bilaspur", nameHi: "बिलासपुर", state: "Chhattisgarh", stateHi: "छत्तीसगढ़", latitude: 22.0797, longitude: 82.1409, timeZone: "Asia/Kolkata", aliases: ["Ratanpur Mahamaya"] },
  { name: "Durg", nameHi: "दुर्ग", state: "Chhattisgarh", stateHi: "छत्तीसगढ़", latitude: 21.1904, longitude: 81.2849, timeZone: "Asia/Kolkata", aliases: ["Bhilai"] },
  { name: "Dongargarh", nameHi: "डोंगरगढ़", state: "Chhattisgarh", stateHi: "छत्तीसगढ़", latitude: 21.1872, longitude: 80.7583, timeZone: "Asia/Kolkata", aliases: ["Bambleshwari Devi", "Rajnandgaon"] },

  // --- PUNJAB, HARYANA, HP, J&K ---
  { name: "Amritsar", nameHi: "अमृतसर", state: "Punjab", stateHi: "पंजाब", latitude: 31.634, longitude: 74.8723, timeZone: "Asia/Kolkata", aliases: ["Golden Temple", "Durgiana Temple", "स्वर्ण मंदिर"] },
  { name: "Ludhiana", nameHi: "लुधियाना", state: "Punjab", stateHi: "पंजाब", latitude: 30.901, longitude: 75.8573, timeZone: "Asia/Kolkata" },
  { name: "Jalandhar", nameHi: "जालंधर", state: "Punjab", stateHi: "पंजाब", latitude: 31.326, longitude: 75.5762, timeZone: "Asia/Kolkata", aliases: ["Devi Talab Mandir"] },
  { name: "Patiala", nameHi: "पटियाला", state: "Punjab", stateHi: "पंजाब", latitude: 30.3398, longitude: 76.3869, timeZone: "Asia/Kolkata", aliases: ["Kali Devi Mandir"] },
  { name: "Bathinda", nameHi: "बठिंडा", state: "Punjab", stateHi: "पंजाब", latitude: 30.211, longitude: 74.9455, timeZone: "Asia/Kolkata" },
  { name: "Chandigarh", nameHi: "चंडीगढ़", state: "Chandigarh", stateHi: "चंडीगढ़", latitude: 30.7333, longitude: 76.7794, timeZone: "Asia/Kolkata", aliases: ["Mansa Devi Panchkula", "Chandi Mandir", "Mohali"] },
  { name: "Kurukshetra", nameHi: "कुरुक्षेत्र", state: "Haryana", stateHi: "हरियाणा", latitude: 29.9695, longitude: 76.8783, timeZone: "Asia/Kolkata", aliases: ["Brahma Sarovar", "Jyotisar", "Gita Birthplace"] },
  { name: "Panipat", nameHi: "पानीपत", state: "Haryana", stateHi: "हरियाणा", latitude: 29.3909, longitude: 76.9635, timeZone: "Asia/Kolkata", aliases: ["Devi Temple"] },
  { name: "Ambala", nameHi: "अंबाला", state: "Haryana", stateHi: "हरियाणा", latitude: 30.3782, longitude: 76.7767, timeZone: "Asia/Kolkata" },
  { name: "Karnal", nameHi: "करनाल", state: "Haryana", stateHi: "हरियाणा", latitude: 29.6857, longitude: 76.9905, timeZone: "Asia/Kolkata" },
  { name: "Hisar", nameHi: "हिसार", state: "Haryana", stateHi: "हरियाणा", latitude: 29.1492, longitude: 75.7217, timeZone: "Asia/Kolkata" },
  { name: "Rohtak", nameHi: "रोहतक", state: "Haryana", stateHi: "हरियाणा", latitude: 28.8955, longitude: 76.6066, timeZone: "Asia/Kolkata" },
  { name: "Shimla", nameHi: "शिमला", state: "Himachal Pradesh", stateHi: "हिमाचल प्रदेश", latitude: 31.1048, longitude: 77.1734, timeZone: "Asia/Kolkata", aliases: ["Jakhoo Temple", "Tara Devi"] },
  { name: "Dharamshala", nameHi: "धर्मशाला", state: "Himachal Pradesh", stateHi: "हिमाचल प्रदेश", latitude: 32.219, longitude: 76.3234, timeZone: "Asia/Kolkata", aliases: ["Kangra", "Chamunda Devi", "Brajeshwari"] },
  { name: "Jwalamukhi", nameHi: "ज्वालामुखी", state: "Himachal Pradesh", stateHi: "हिमाचल प्रदेश", latitude: 31.8753, longitude: 76.3217, timeZone: "Asia/Kolkata", aliases: ["Jwala Ji Shaktipeeth"] },
  { name: "Chintpurni", nameHi: "चिंतपूर्णी", state: "Himachal Pradesh", stateHi: "हिमाचल प्रदेश", latitude: 31.8089, longitude: 76.1264, timeZone: "Asia/Kolkata", aliases: ["Una", "Maa Chintpurni"] },
  { name: "Mandi", nameHi: "मंडी", state: "Himachal Pradesh", stateHi: "हिमाचल प्रदेश", latitude: 31.7087, longitude: 76.932, timeZone: "Asia/Kolkata", aliases: ["Chhoti Kashi"] },
  { name: "Kullu", nameHi: "कुल्लू", state: "Himachal Pradesh", stateHi: "हिमाचल प्रदेश", latitude: 31.9579, longitude: 77.1095, timeZone: "Asia/Kolkata", aliases: ["Manali", "Bijli Mahadev"] },
  { name: "Jammu", nameHi: "जम्मू", state: "Jammu and Kashmir", stateHi: "जम्मू और कश्मीर", latitude: 32.7266, longitude: 74.857, timeZone: "Asia/Kolkata", aliases: ["Katra", "कटरा", "Vaishno Devi", "वैष्णो देवी", "Raghunath Temple"] },
  { name: "Srinagar", nameHi: "श्रीनगर", state: "Jammu and Kashmir", stateHi: "जम्मू और कश्मीर", latitude: 34.0837, longitude: 74.7973, timeZone: "Asia/Kolkata", aliases: ["Shankaracharya Temple", "Kheer Bhawani", "Amarnath Base"] },
  { name: "Leh", nameHi: "लेह", state: "Ladakh", stateHi: "लद्दाख", latitude: 34.1526, longitude: 77.5771, timeZone: "Asia/Kolkata" },

  // --- NORTH EAST & GOA ---
  { name: "Guwahati", nameHi: "गुवाहाटी", state: "Assam", stateHi: "असम", latitude: 26.1445, longitude: 91.7362, timeZone: "Asia/Kolkata", aliases: ["Kamakhya Temple", "कामाख्या शक्तिपीठ", "Umananda"] },
  { name: "Dibrugarh", nameHi: "डिब्रूगढ़", state: "Assam", stateHi: "असम", latitude: 27.4728, longitude: 94.912, timeZone: "Asia/Kolkata" },
  { name: "Silchar", nameHi: "सिलचर", state: "Assam", stateHi: "असम", latitude: 24.8333, longitude: 92.7789, timeZone: "Asia/Kolkata" },
  { name: "Shillong", nameHi: "शिलांग", state: "Meghalaya", stateHi: "मेघालय", latitude: 25.5788, longitude: 91.8933, timeZone: "Asia/Kolkata" },
  { name: "Agartala", nameHi: "अगरतला", state: "Tripura", stateHi: "त्रिपुरा", latitude: 23.8315, longitude: 91.2868, timeZone: "Asia/Kolkata", aliases: ["Tripura Sundari Temple", "Udaipur Tripura"] },
  { name: "Imphal", nameHi: "इम्फाल", state: "Manipur", stateHi: "मणिपुर", latitude: 24.817, longitude: 93.9368, timeZone: "Asia/Kolkata", aliases: ["Govindaji Temple"] },
  { name: "Gangtok", nameHi: "गंगटोक", state: "Sikkim", stateHi: "सिक्किम", latitude: 27.3389, longitude: 88.6065, timeZone: "Asia/Kolkata" },
  { name: "Aizawl", nameHi: "आइजोल", state: "Mizoram", stateHi: "मिजोरम", latitude: 23.7271, longitude: 92.7176, timeZone: "Asia/Kolkata" },
  { name: "Kohima", nameHi: "कोहिमा", state: "Nagaland", stateHi: "नागालैंड", latitude: 25.6751, longitude: 94.1086, timeZone: "Asia/Kolkata" },
  { name: "Itanagar", nameHi: "ईटानगर", state: "Arunachal Pradesh", stateHi: "अरुणाचल प्रदेश", latitude: 27.0844, longitude: 93.6053, timeZone: "Asia/Kolkata", aliases: ["Parshuram Kund"] },
  { name: "Panaji", nameHi: "पणजी", state: "Goa", stateHi: "गोवा", latitude: 15.4909, longitude: 73.8278, timeZone: "Asia/Kolkata", aliases: ["Shanta Durga", "Mangeshi Temple", "Margao", "Ponda"] },

  // --- MAJOR GLOBAL INDIAN DIASPORA HUBS ---
  { name: "Kathmandu", nameHi: "काठमांडू", state: "Nepal", stateHi: "नेपाल", latitude: 27.7172, longitude: 85.324, timeZone: "Asia/Kathmandu", aliases: ["Pashupatinath", "पशुपतिनाथ"] },
  { name: "Pokhara", nameHi: "पोखरा", state: "Nepal", stateHi: "नेपाल", latitude: 28.2096, longitude: 83.9856, timeZone: "Asia/Kathmandu", aliases: ["Muktinath Base"] },
  { name: "Janakpur", nameHi: "जनकपुर", state: "Nepal", stateHi: "नेपाल", latitude: 26.7288, longitude: 85.9244, timeZone: "Asia/Kathmandu", aliases: ["Janaki Mandir", "Mithila Dham"] },
  { name: "Dubai", nameHi: "दुबई", state: "UAE", stateHi: "संयुक्त अरब अमीरात", latitude: 25.2048, longitude: 55.2708, timeZone: "Asia/Dubai", aliases: ["BAPS Hindu Mandir Abu Dhabi", "Sharjah"] },
  { name: "Singapore", nameHi: "सिंगापुर", state: "Singapore", stateHi: "सिंगापुर", latitude: 1.3521, longitude: 103.8198, timeZone: "Asia/Singapore", aliases: ["Sri Mariamman"] },
  { name: "London", nameHi: "लंदन", state: "United Kingdom", stateHi: "यूके", latitude: 51.5074, longitude: -0.1278, timeZone: "Europe/London", aliases: ["BAPS Neasden", "UK"] },
  { name: "New York", nameHi: "न्यू यॉर्क", state: "United States", stateHi: "अमेरिका", latitude: 40.7128, longitude: -74.006, timeZone: "America/New_York", aliases: ["Flushing Temple", "New Jersey", "Robbinsville"] },
  { name: "San Francisco", nameHi: "सैन फ्रांसिस्को", state: "United States", stateHi: "अमेरिका", latitude: 37.7749, longitude: -122.4194, timeZone: "America/Los_Angeles", aliases: ["Bay Area", "Silicon Valley", "San Jose"] },
  { name: "Toronto", nameHi: "टोरंटो", state: "Canada", stateHi: "कनाडा", latitude: 43.6532, longitude: -79.3832, timeZone: "America/Toronto", aliases: ["BAPS Toronto", "Brampton", "Mississauga"] },
  { name: "Sydney", nameHi: "सिडनी", state: "Australia", stateHi: "ऑस्ट्रेलिया", latitude: -33.8688, longitude: 151.2093, timeZone: "Australia/Sydney", aliases: ["Murugan Temple Sydney", "Parramatta"] },
  { name: "Melbourne", nameHi: "मेलबर्न", state: "Australia", stateHi: "ऑस्ट्रेलिया", latitude: -37.8136, longitude: 144.9631, timeZone: "Australia/Melbourne", aliases: ["Shiva Vishnu Temple Victoria"] },
  { name: "Port Louis", nameHi: "पोर्ट लुइस", state: "Mauritius", stateHi: "मॉरीशस", latitude: -20.1609, longitude: 57.5012, timeZone: "Indian/Mauritius", aliases: ["Ganga Talao", "Grand Bassin"] },
];

/** Fast pan-India autocomplete & fuzzy search */
export function filterCities(query: string): CityEntry[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return INDIAN_CITIES.slice(0, 15);

  return INDIAN_CITIES.filter((city) => {
    if (city.name.toLowerCase().includes(needle)) return true;
    if (city.nameHi.toLowerCase().includes(needle)) return true;
    if (city.state.toLowerCase().includes(needle)) return true;
    if (city.stateHi?.toLowerCase().includes(needle)) return true;
    if (city.aliases?.some((a) => a.toLowerCase().includes(needle))) return true;
    return false;
  }).slice(0, 25);
}

export function defaultCity(): CityEntry {
  return INDIAN_CITIES[0];
}

/** Convert local birth date/time in a timezone to UTC — runs entirely in the browser. */
export function zonedLocalToUtc(date: string, time: string, timeZone: string): Date {
  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);
  let utcGuess = Date.UTC(year, month - 1, day, hour, minute);

  for (let step = 0; step < 4; step += 1) {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).formatToParts(new Date(utcGuess));

    const pick = (type: string) => Number(parts.find((part) => part.type === type)?.value || 0);
    const localHour = pick("hour") === 24 ? 0 : pick("hour");
    const diffMinutes =
      (hour - localHour) * 60 +
      (minute - pick("minute")) +
      (day - pick("day")) * 1440 +
      (month - pick("month")) * 43_200 +
      (year - pick("year")) * 525_600;
    if (diffMinutes === 0) break;
    utcGuess -= diffMinutes * 60_000;
  }

  return new Date(utcGuess);
}

export function formatTime(date: Date, timeZone: string, locale: "en" | "hi" = "en"): string {
  return new Intl.DateTimeFormat(locale === "hi" ? "hi-IN" : "en-IN", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

export function formatDateLong(date: Date, timeZone: string, locale: "en" | "hi" = "en"): string {
  return new Intl.DateTimeFormat(locale === "hi" ? "hi-IN" : "en-IN", {
    timeZone,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export async function readDeviceLocation(): Promise<BirthPlace | null> {
  if (typeof navigator === "undefined" || !navigator.geolocation) return null;

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Kolkata";
        resolve({
          name: "Your Location",
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          timeZone,
        });
      },
      () => resolve(null),
      { enableHighAccuracy: false, timeout: 12_000, maximumAge: 300_000 },
    );
  });
}
