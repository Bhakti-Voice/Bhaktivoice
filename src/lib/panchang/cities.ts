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
  isCustom?: boolean;
  district?: string;
  aliases?: string[];
};

export const CITIES: CityConfig[] = [
  // ==========================================
  // 1. NATIONAL METROS & CAPITAL REGION
  // ==========================================
  { id: "delhi", name: "Delhi", nameHi: "नई दिल्ली", state: "Delhi", stateHi: "दिल्ली", latitude: 28.6139, longitude: 77.209, elevationMeters: 216, timeZone: "Asia/Kolkata", aliases: ["New Delhi", "NCR", "Dilli"] },
  { id: "mumbai", name: "Mumbai", nameHi: "मुंबई", state: "Maharashtra", stateHi: "महाराष्ट्र", latitude: 19.076, longitude: 72.8777, elevationMeters: 14, timeZone: "Asia/Kolkata", aliases: ["Bombay"] },
  { id: "bengaluru", name: "Bengaluru", nameHi: "बेंगलुरु", state: "Karnataka", stateHi: "कर्नाटक", latitude: 12.9716, longitude: 77.5946, elevationMeters: 920, timeZone: "Asia/Kolkata", aliases: ["Bangalore"] },
  { id: "hyderabad", name: "Hyderabad", nameHi: "हैदराबाद", state: "Telangana", stateHi: "तेलंगाना", latitude: 17.385, longitude: 78.4867, elevationMeters: 542, timeZone: "Asia/Kolkata", aliases: ["Secunderabad"] },
  { id: "chennai", name: "Chennai", nameHi: "चेन्नई", state: "Tamil Nadu", stateHi: "तमिलनाडु", latitude: 13.0827, longitude: 80.2707, elevationMeters: 6, timeZone: "Asia/Kolkata", aliases: ["Madras"] },
  { id: "kolkata", name: "Kolkata", nameHi: "कोलकाता", state: "West Bengal", stateHi: "पश्चिम बंगाल", latitude: 22.5726, longitude: 88.3639, elevationMeters: 9, timeZone: "Asia/Kolkata", aliases: ["Calcutta"] },
  { id: "pune", name: "Pune", nameHi: "पुणे", state: "Maharashtra", stateHi: "महाराष्ट्र", latitude: 18.5204, longitude: 73.8567, elevationMeters: 560, timeZone: "Asia/Kolkata", aliases: ["Poona"] },
  { id: "ahmedabad", name: "Ahmedabad", nameHi: "अहमदाबाद", state: "Gujarat", stateHi: "गुजरात", latitude: 23.0225, longitude: 72.5714, elevationMeters: 53, timeZone: "Asia/Kolkata", aliases: ["Amdavad", "Karnavati"] },
  { id: "jaipur", name: "Jaipur", nameHi: "जयपुर", state: "Rajasthan", stateHi: "राजस्थान", latitude: 26.9124, longitude: 75.7873, elevationMeters: 431, timeZone: "Asia/Kolkata", aliases: ["Pink City"] },
  { id: "lucknow", name: "Lucknow", nameHi: "लखनऊ", state: "Uttar Pradesh", stateHi: "उत्तर प्रदेश", latitude: 26.8467, longitude: 80.9462, elevationMeters: 123, timeZone: "Asia/Kolkata" },
  { id: "chandigarh", name: "Chandigarh", nameHi: "चंडीगढ़", state: "Chandigarh", stateHi: "चंडीगढ़", latitude: 30.7333, longitude: 76.7794, elevationMeters: 321, timeZone: "Asia/Kolkata" },
  { id: "patna", name: "Patna", nameHi: "पटना", state: "Bihar", stateHi: "बिहार", latitude: 25.5941, longitude: 85.1376, elevationMeters: 53, timeZone: "Asia/Kolkata", aliases: ["Pataliputra"] },
  { id: "bhopal", name: "Bhopal", nameHi: "भोपाल", state: "Madhya Pradesh", stateHi: "मध्य प्रदेश", latitude: 23.2599, longitude: 77.4126, elevationMeters: 527, timeZone: "Asia/Kolkata" },
  { id: "indore", name: "Indore", nameHi: "इंदौर", state: "Madhya Pradesh", stateHi: "मध्य प्रदेश", latitude: 22.7196, longitude: 75.8577, elevationMeters: 553, timeZone: "Asia/Kolkata" },
  { id: "nagpur", name: "Nagpur", nameHi: "नागपुर", state: "Maharashtra", stateHi: "महाराष्ट्र", latitude: 21.1458, longitude: 79.0882, elevationMeters: 310, timeZone: "Asia/Kolkata" },
  { id: "surat", name: "Surat", nameHi: "सूरत", state: "Gujarat", stateHi: "गुजरात", latitude: 21.1702, longitude: 72.8311, elevationMeters: 13, timeZone: "Asia/Kolkata" },
  { id: "vadodara", name: "Vadodara", nameHi: "वडोदरा", state: "Gujarat", stateHi: "गुजरात", latitude: 22.3072, longitude: 73.1812, elevationMeters: 39, timeZone: "Asia/Kolkata", aliases: ["Baroda"] },
  { id: "rajkot", name: "Rajkot", nameHi: "राजकोट", state: "Gujarat", stateHi: "गुजरात", latitude: 22.3039, longitude: 70.8022, elevationMeters: 128, timeZone: "Asia/Kolkata" },
  { id: "kanpur", name: "Kanpur", nameHi: "कानपुर", state: "Uttar Pradesh", stateHi: "उत्तर प्रदेश", latitude: 26.4499, longitude: 80.3319, elevationMeters: 126, timeZone: "Asia/Kolkata" },
  { id: "agra", name: "Agra", nameHi: "आगरा", state: "Uttar Pradesh", stateHi: "उत्तर प्रदेश", latitude: 27.1767, longitude: 78.0081, elevationMeters: 171, timeZone: "Asia/Kolkata" },
  { id: "meerut", name: "Meerut", nameHi: "मेरठ", state: "Uttar Pradesh", stateHi: "उत्तर प्रदेश", latitude: 28.9845, longitude: 77.7064, elevationMeters: 219, timeZone: "Asia/Kolkata" },
  { id: "ghaziabad", name: "Ghaziabad", nameHi: "गाजियाबाद", state: "Uttar Pradesh", stateHi: "उत्तर प्रदेश", latitude: 28.6692, longitude: 77.4538, elevationMeters: 214, timeZone: "Asia/Kolkata" },
  { id: "noida", name: "Noida", nameHi: "नोएडा", state: "Uttar Pradesh", stateHi: "उत्तर प्रदेश", latitude: 28.5355, longitude: 77.391, elevationMeters: 200, timeZone: "Asia/Kolkata", aliases: ["Gautam Buddha Nagar"] },
  { id: "greater-noida", name: "Greater Noida", nameHi: "ग्रेटर नोएडा", state: "Uttar Pradesh", stateHi: "उत्तर प्रदेश", latitude: 28.4744, longitude: 77.504, elevationMeters: 200, timeZone: "Asia/Kolkata" },
  { id: "faridabad", name: "Faridabad", nameHi: "फरीदाबाद", state: "Haryana", stateHi: "हरियाणा", latitude: 28.4089, longitude: 77.3178, elevationMeters: 204, timeZone: "Asia/Kolkata" },
  { id: "gurugram", name: "Gurugram", nameHi: "गुरुग्राम", state: "Haryana", stateHi: "हरियाणा", latitude: 28.4595, longitude: 77.0266, elevationMeters: 217, timeZone: "Asia/Kolkata", aliases: ["Gurgaon"] },
  { id: "ludhiana", name: "Ludhiana", nameHi: "लुधियाना", state: "Punjab", stateHi: "पंजाब", latitude: 30.901, longitude: 75.8573, elevationMeters: 244, timeZone: "Asia/Kolkata" },
  { id: "amritsar", name: "Amritsar", nameHi: "अमृतसर", state: "Punjab", stateHi: "पंजाब", latitude: 31.634, longitude: 74.8723, elevationMeters: 234, timeZone: "Asia/Kolkata" },
  { id: "jodhpur", name: "Jodhpur", nameHi: "जोधपुर", state: "Rajasthan", stateHi: "राजस्थान", latitude: 26.2389, longitude: 73.0243, elevationMeters: 231, timeZone: "Asia/Kolkata" },
  { id: "udaipur", name: "Udaipur", nameHi: "उदयपुर", state: "Rajasthan", stateHi: "राजस्थान", latitude: 24.5854, longitude: 73.7125, elevationMeters: 598, timeZone: "Asia/Kolkata" },
  { id: "kota", name: "Kota", nameHi: "कोटा", state: "Rajasthan", stateHi: "राजस्थान", latitude: 25.2138, longitude: 75.8648, elevationMeters: 271, timeZone: "Asia/Kolkata" },
  { id: "ranchi", name: "Ranchi", nameHi: "राँची", state: "Jharkhand", stateHi: "झारखंड", latitude: 23.3441, longitude: 85.3096, elevationMeters: 651, timeZone: "Asia/Kolkata" },
  { id: "jamshedpur", name: "Jamshedpur", nameHi: "जमशेदपुर", state: "Jharkhand", stateHi: "झारखंड", latitude: 22.8046, longitude: 86.2029, elevationMeters: 135, timeZone: "Asia/Kolkata", aliases: ["Tatanagar"] },
  { id: "raipur", name: "Raipur", nameHi: "रायपुर", state: "Chhattisgarh", stateHi: "छत्तीसगढ़", latitude: 21.2514, longitude: 81.6296, elevationMeters: 298, timeZone: "Asia/Kolkata" },
  { id: "bilaspur", name: "Bilaspur", nameHi: "बिलासपुर", state: "Chhattisgarh", stateHi: "छत्तीसगढ़", latitude: 22.0797, longitude: 82.1391, elevationMeters: 262, timeZone: "Asia/Kolkata" },
  { id: "bhubaneswar", name: "Bhubaneswar", nameHi: "भुवनेश्वर", state: "Odisha", stateHi: "ओडिशा", latitude: 20.2961, longitude: 85.8245, elevationMeters: 45, timeZone: "Asia/Kolkata" },
  { id: "cuttack", name: "Cuttack", nameHi: "कटक", state: "Odisha", stateHi: "ओडिशा", latitude: 20.4625, longitude: 85.8828, elevationMeters: 36, timeZone: "Asia/Kolkata" },
  { id: "guwahati", name: "Guwahati", nameHi: "गुवाहाटी", state: "Assam", stateHi: "असम", latitude: 26.1445, longitude: 91.7362, elevationMeters: 55, timeZone: "Asia/Kolkata", aliases: ["Gauhati", "Kamakhya"] },
  { id: "visakhapatnam", name: "Visakhapatnam", nameHi: "विशाखापत्तनम", state: "Andhra Pradesh", stateHi: "आंध्र प्रदेश", latitude: 17.6868, longitude: 83.2185, elevationMeters: 45, timeZone: "Asia/Kolkata", aliases: ["Vizag"] },
  { id: "vijayawada", name: "Vijayawada", nameHi: "विजयवाड़ा", state: "Andhra Pradesh", stateHi: "आंध्र प्रदेश", latitude: 16.5062, longitude: 80.648, elevationMeters: 11, timeZone: "Asia/Kolkata", aliases: ["Bezawada", "Kanaka Durga"] },
  { id: "coimbatore", name: "Coimbatore", nameHi: "कोयंबटूर", state: "Tamil Nadu", stateHi: "तमिलनाडु", latitude: 11.0168, longitude: 76.9558, elevationMeters: 411, timeZone: "Asia/Kolkata", aliases: ["Kovai"] },
  { id: "madurai", name: "Madurai", nameHi: "मदुरै", state: "Tamil Nadu", stateHi: "तमिलनाडु", latitude: 9.9252, longitude: 78.1198, elevationMeters: 101, timeZone: "Asia/Kolkata", aliases: ["Meenakshi"] },
  { id: "kochi", name: "Kochi", nameHi: "कोच्चि", state: "Kerala", stateHi: "केरल", latitude: 9.9312, longitude: 76.2673, elevationMeters: 4, timeZone: "Asia/Kolkata", aliases: ["Cochin", "Ernakulam"] },
  { id: "thiruvananthapuram", name: "Thiruvananthapuram", nameHi: "तिरुवनंतपुरम", state: "Kerala", stateHi: "केरल", latitude: 8.5241, longitude: 76.9366, elevationMeters: 10, timeZone: "Asia/Kolkata", aliases: ["Trivandrum", "Padmanabhaswamy"] },
  { id: "mysuru", name: "Mysuru", nameHi: "मैसूरु", state: "Karnataka", stateHi: "कर्नाटक", latitude: 12.2958, longitude: 76.6394, elevationMeters: 763, timeZone: "Asia/Kolkata", aliases: ["Mysore", "Chamundeshwari"] },
  { id: "mangaluru", name: "Mangaluru", nameHi: "मंगलुरु", state: "Karnataka", stateHi: "कर्नाटक", latitude: 12.9141, longitude: 74.856, elevationMeters: 22, timeZone: "Asia/Kolkata", aliases: ["Mangalore", "Kudla"] },
  { id: "dehradun", name: "Dehradun", nameHi: "देहरादून", state: "Uttarakhand", stateHi: "उत्तराखंड", latitude: 30.3165, longitude: 78.0322, elevationMeters: 640, timeZone: "Asia/Kolkata" },
  { id: "shimla", name: "Shimla", nameHi: "शिमला", state: "Himachal Pradesh", stateHi: "हिमाचल प्रदेश", latitude: 31.1048, longitude: 77.1734, elevationMeters: 2276, timeZone: "Asia/Kolkata" },
  { id: "srinagar", name: "Srinagar", nameHi: "श्रीनगर", state: "Jammu & Kashmir", stateHi: "जम्मू और कश्मीर", latitude: 34.0837, longitude: 74.7973, elevationMeters: 1585, timeZone: "Asia/Kolkata" },
  { id: "jammu", name: "Jammu", nameHi: "जम्मू", state: "Jammu & Kashmir", stateHi: "जम्मू", latitude: 32.7266, longitude: 74.857, elevationMeters: 327, timeZone: "Asia/Kolkata" },
  { id: "goa", name: "Panaji (Goa)", nameHi: "पणजी (गोवा)", state: "Goa", stateHi: "गोवा", latitude: 15.4909, longitude: 73.8278, elevationMeters: 7, timeZone: "Asia/Kolkata", aliases: ["Panjim"] },

  // ==========================================
  // 2. SACRED HINDU TIRTHAS & TEMPLE TOWNS
  // ==========================================
  { id: "varanasi", name: "Varanasi (Kashi)", nameHi: "वाराणसी (काशी)", state: "Uttar Pradesh", stateHi: "उत्तर प्रदेश", latitude: 25.3176, longitude: 82.9739, elevationMeters: 80, timeZone: "Asia/Kolkata", aliases: ["Kashi", "Banaras", "काशी", "बनारस", "विश्वनाथ"] },
  { id: "ayodhya", name: "Ayodhya", nameHi: "अयोध्या", state: "Uttar Pradesh", stateHi: "उत्तर प्रदेश", latitude: 26.7922, longitude: 82.1998, elevationMeters: 102, timeZone: "Asia/Kolkata", aliases: ["Faizabad", "Saket", "Ram Janmabhoomi"] },
  { id: "mathura", name: "Mathura", nameHi: "मथुरा", state: "Uttar Pradesh", stateHi: "उत्तर प्रदेश", latitude: 27.4924, longitude: 77.6737, elevationMeters: 174, timeZone: "Asia/Kolkata", aliases: ["Krishna Janmabhoomi", "Braj"] },
  { id: "vrindavan", name: "Vrindavan", nameHi: "वृंदावन", state: "Uttar Pradesh", stateHi: "उत्तर प्रदेश", latitude: 27.5806, longitude: 77.7006, elevationMeters: 170, timeZone: "Asia/Kolkata", aliases: ["Brindavan", "Banke Bihari"] },
  { id: "barsana", name: "Barsana", nameHi: "बरसाना", state: "Uttar Pradesh", stateHi: "उत्तर प्रदेश", latitude: 27.6496, longitude: 77.3789, elevationMeters: 185, timeZone: "Asia/Kolkata", aliases: ["Radha Rani"] },
  { id: "govardhan", name: "Govardhan", nameHi: "गोवर्धन", state: "Uttar Pradesh", stateHi: "उत्तर प्रदेश", latitude: 27.4998, longitude: 77.4648, elevationMeters: 180, timeZone: "Asia/Kolkata", aliases: ["Giriraj"] },
  { id: "gokul", name: "Gokul", nameHi: "गोकुल", state: "Uttar Pradesh", stateHi: "उत्तर प्रदेश", latitude: 27.4428, longitude: 77.7171, elevationMeters: 170, timeZone: "Asia/Kolkata" },
  { id: "prayagraj", name: "Prayagraj (Allahabad)", nameHi: "प्रयागराज (इलाहाबाद)", state: "Uttar Pradesh", stateHi: "उत्तर प्रदेश", latitude: 25.4358, longitude: 81.8463, elevationMeters: 98, timeZone: "Asia/Kolkata", aliases: ["Allahabad", "Triveni Sangam", "Kumbh Mela"] },
  { id: "haridwar", name: "Haridwar", nameHi: "हरिद्वार", state: "Uttarakhand", stateHi: "उत्तराखंड", latitude: 29.9457, longitude: 78.1642, elevationMeters: 314, timeZone: "Asia/Kolkata", aliases: ["Mayapuri", "Har Ki Pauri"] },
  { id: "rishikesh", name: "Rishikesh", nameHi: "ऋषिकेश", state: "Uttarakhand", stateHi: "उत्तराखंड", latitude: 30.0869, longitude: 78.2676, elevationMeters: 372, timeZone: "Asia/Kolkata", aliases: ["Yoga Capital"] },
  { id: "badrinath", name: "Badrinath", nameHi: "बद्रीनाथ", state: "Uttarakhand", stateHi: "उत्तराखंड", latitude: 30.7433, longitude: 79.4938, elevationMeters: 3100, timeZone: "Asia/Kolkata", aliases: ["Badri Vishal", "Char Dham"] },
  { id: "kedarnath", name: "Kedarnath", nameHi: "केदारनाथ", state: "Uttarakhand", stateHi: "उत्तराखंड", latitude: 30.7352, longitude: 79.0669, elevationMeters: 3583, timeZone: "Asia/Kolkata", aliases: ["Kedar Dham", "Jyotirlinga"] },
  { id: "gangotri", name: "Gangotri", nameHi: "गंगोत्री", state: "Uttarakhand", stateHi: "उत्तराखंड", latitude: 30.9947, longitude: 78.9398, elevationMeters: 3100, timeZone: "Asia/Kolkata" },
  { id: "yamunotri", name: "Yamunotri", nameHi: "यमुनोत्री", state: "Uttarakhand", stateHi: "उत्तराखंड", latitude: 31.014, longitude: 78.46, elevationMeters: 3293, timeZone: "Asia/Kolkata" },
  { id: "ujjain", name: "Ujjain (Mahakal)", nameHi: "उज्जैन (महाकाल)", state: "Madhya Pradesh", stateHi: "मध्य प्रदेश", latitude: 23.1765, longitude: 75.7885, elevationMeters: 494, timeZone: "Asia/Kolkata", aliases: ["Mahakaleshwar", "Avanti", "Avantika"] },
  { id: "omkareshwar", name: "Omkareshwar", nameHi: "ओंकारेश्वर", state: "Madhya Pradesh", stateHi: "मध्य प्रदेश", latitude: 22.2465, longitude: 76.1506, elevationMeters: 185, timeZone: "Asia/Kolkata", aliases: ["Mamleshwar", "Narmada"] },
  { id: "puri", name: "Jagannath Puri", nameHi: "जगन्नाथ पुरी", state: "Odisha", stateHi: "ओडिशा", latitude: 19.8135, longitude: 85.8312, elevationMeters: 5, timeZone: "Asia/Kolkata", aliases: ["Purushottam Kshetra", "Shree Jagannatha"] },
  { id: "dwarka", name: "Dwarka", nameHi: "द्वारका", state: "Gujarat", stateHi: "गुजरात", latitude: 22.2442, longitude: 68.9685, elevationMeters: 7, timeZone: "Asia/Kolkata", aliases: ["Dwarkadhish", "Mokshapuri"] },
  { id: "somnath", name: "Somnath", nameHi: "सोमनाथ", state: "Gujarat", stateHi: "गुजरात", latitude: 20.888, longitude: 70.4013, elevationMeters: 10, timeZone: "Asia/Kolkata", aliases: ["Prabhas Patan", "First Jyotirlinga"] },
  { id: "tirupati", name: "Tirupati (Balaji)", nameHi: "तिरुपति (बालाजी)", state: "Andhra Pradesh", stateHi: "आंध्र प्रदेश", latitude: 13.6288, longitude: 79.4192, elevationMeters: 153, timeZone: "Asia/Kolkata", aliases: ["Tirumala", "Venkateswara", "Seven Hills"] },
  { id: "rameswaram", name: "Rameswaram", nameHi: "रामेश्वरम", state: "Tamil Nadu", stateHi: "तमिलनाडु", latitude: 9.2876, longitude: 79.3129, elevationMeters: 10, timeZone: "Asia/Kolkata", aliases: ["Ramanathaswamy", "Dhanushkodi"] },
  { id: "kanchipuram", name: "Kanchipuram", nameHi: "कांचीपुरम", state: "Tamil Nadu", stateHi: "तमिलनाडु", latitude: 12.8342, longitude: 79.7036, elevationMeters: 83, timeZone: "Asia/Kolkata", aliases: ["Kanchi", "Kamakshi Amman"] },
  { id: "chidambaram", name: "Chidambaram", nameHi: "चिदंबरम", state: "Tamil Nadu", stateHi: "तमिलनाडु", latitude: 11.3992, longitude: 79.6935, elevationMeters: 6, timeZone: "Asia/Kolkata", aliases: ["Nataraja Temple"] },
  { id: "thanjavur", name: "Thanjavur", nameHi: "तंजावुर", state: "Tamil Nadu", stateHi: "तमिलनाडु", latitude: 10.787, longitude: 79.1378, elevationMeters: 57, timeZone: "Asia/Kolkata", aliases: ["Brihadeeswara", "Tanjore"] },
  { id: "tiruvannamalai", name: "Tiruvannamalai", nameHi: "तिरुवन्नामलाई", state: "Tamil Nadu", stateHi: "तमिलनाडु", latitude: 12.2253, longitude: 79.0747, elevationMeters: 171, timeZone: "Asia/Kolkata", aliases: ["Arunachala", "Annamalaiyar"] },
  { id: "srirangam", name: "Srirangam (Trichy)", nameHi: "श्रीरंगम (त्रिची)", state: "Tamil Nadu", stateHi: "तमिलनाडु", latitude: 10.8624, longitude: 78.6917, elevationMeters: 85, timeZone: "Asia/Kolkata", aliases: ["Ranganathaswamy", "Tiruchirappalli"] },
  { id: "sabarimala", name: "Sabarimala", nameHi: "सबरीमाला", state: "Kerala", stateHi: "केरल", latitude: 9.4404, longitude: 77.0818, elevationMeters: 468, timeZone: "Asia/Kolkata", aliases: ["Ayyappa Swamy"] },
  { id: "guruvayur", name: "Guruvayur", nameHi: "गुरुवायुर", state: "Kerala", stateHi: "केरल", latitude: 10.5947, longitude: 76.0409, elevationMeters: 10, timeZone: "Asia/Kolkata", aliases: ["Guruvayoorappan"] },
  { id: "udupi", name: "Udupi", nameHi: "उडुपी", state: "Karnataka", stateHi: "कर्नाटक", latitude: 13.3409, longitude: 74.7421, elevationMeters: 39, timeZone: "Asia/Kolkata", aliases: ["Sri Krishna Temple", "Kanaka Kindi"] },
  { id: "sringeri", name: "Sringeri", nameHi: "शृंगेरी", state: "Karnataka", stateHi: "कर्नाटक", latitude: 13.4187, longitude: 75.257, elevationMeters: 672, timeZone: "Asia/Kolkata", aliases: ["Sharada Peetham", "Adi Shankara"] },
  { id: "dharmasthala", name: "Dharmasthala", nameHi: "धर्मस्थल", state: "Karnataka", stateHi: "कर्नाटक", latitude: 12.9567, longitude: 75.3817, elevationMeters: 105, timeZone: "Asia/Kolkata", aliases: ["Manjunatha"] },
  { id: "gokarna", name: "Gokarna", nameHi: "गोकर्ण", state: "Karnataka", stateHi: "कर्नाटक", latitude: 14.5479, longitude: 74.3188, elevationMeters: 12, timeZone: "Asia/Kolkata", aliases: ["Mahabaleshwar Temple", "Atmalinga"] },
  { id: "kollur", name: "Kollur", nameHi: "कोल्लूर", state: "Karnataka", stateHi: "कर्नाटक", latitude: 13.8647, longitude: 74.8142, elevationMeters: 120, timeZone: "Asia/Kolkata", aliases: ["Mookambika Temple"] },
  { id: "kukke-subramanya", name: "Kukke Subramanya", nameHi: "कुक्के सुब्रह्मण्य", state: "Karnataka", stateHi: "कर्नाटक", latitude: 12.6644, longitude: 75.6172, elevationMeters: 110, timeZone: "Asia/Kolkata", aliases: ["Sarpa Dosha", "Subrahmanya"] },
  { id: "shirdi", name: "Shirdi", nameHi: "शिरडी", state: "Maharashtra", stateHi: "महाराष्ट्र", latitude: 19.7667, longitude: 74.4767, elevationMeters: 504, timeZone: "Asia/Kolkata", aliases: ["Sai Baba"] },
  { id: "trimbakeshwar", name: "Trimbakeshwar (Nashik)", nameHi: "त्र्यंबकेश्वर (नासिक)", state: "Maharashtra", stateHi: "महाराष्ट्र", latitude: 19.9385, longitude: 73.5306, elevationMeters: 620, timeZone: "Asia/Kolkata", aliases: ["Kumbh Nashik", "Godavari Origin"] },
  { id: "bhimashankar", name: "Bhimashankar", nameHi: "भीमाशंकर", state: "Maharashtra", stateHi: "महाराष्ट्र", latitude: 19.0722, longitude: 73.5358, elevationMeters: 975, timeZone: "Asia/Kolkata", aliases: ["Jyotirlinga"] },
  { id: "grishneshwar", name: "Grishneshwar (Ellora)", nameHi: "घृष्णेश्वर (एलोरा)", state: "Maharashtra", stateHi: "महाराष्ट्र", latitude: 20.0249, longitude: 75.1719, elevationMeters: 600, timeZone: "Asia/Kolkata", aliases: ["Ghushmeshwar", "Chhatrapati Sambhajinagar"] },
  { id: "kolhapur", name: "Kolhapur (Mahalakshmi)", nameHi: "कोल्हापुर (महालक्ष्मी)", state: "Maharashtra", stateHi: "महाराष्ट्र", latitude: 16.705, longitude: 74.2433, elevationMeters: 569, timeZone: "Asia/Kolkata", aliases: ["Ambabai", "Karveer Nivasini"] },
  { id: "pandharpur", name: "Pandharpur", nameHi: "पंढरपुर", state: "Maharashtra", stateHi: "महाराष्ट्र", latitude: 17.6775, longitude: 75.3267, elevationMeters: 462, timeZone: "Asia/Kolkata", aliases: ["Vithoba", "Vitthal Rukmini", "Warkari"] },
  { id: "tuljapur", name: "Tuljapur", nameHi: "तुळजापूर", state: "Maharashtra", stateHi: "महाराष्ट्र", latitude: 18.0069, longitude: 76.0717, elevationMeters: 648, timeZone: "Asia/Kolkata", aliases: ["Tulja Bhavani", "Chhatrapati Shivaji"] },
  { id: "srisailam", name: "Srisailam", nameHi: "श्रीशैलम", state: "Andhra Pradesh", stateHi: "आंध्र प्रदेश", latitude: 16.0739, longitude: 78.8686, elevationMeters: 476, timeZone: "Asia/Kolkata", aliases: ["Mallikarjuna", "Bhramaramba"] },
  { id: "deoghar", name: "Deoghar (Baidyanath)", nameHi: "देवघर (बैद्यनाथ धाम)", state: "Jharkhand", stateHi: "झारखंड", latitude: 24.4854, longitude: 86.6997, elevationMeters: 254, timeZone: "Asia/Kolkata", aliases: ["Baba Baidyanath", "Sultanganj Kanwar"] },
  { id: "kamakhya", name: "Kamakhya (Guwahati)", nameHi: "कामाख्या (गुवाहाटी)", state: "Assam", stateHi: "असम", latitude: 26.1664, longitude: 91.7056, elevationMeters: 170, timeZone: "Asia/Kolkata", aliases: ["Ambubachi Mela", "Shakti Peeth"] },
  { id: "kalighat", name: "Kalighat (Kolkata)", nameHi: "कालीघाट (कोलकाता)", state: "West Bengal", stateHi: "पश्चिम बंगाल", latitude: 22.5204, longitude: 88.3444, elevationMeters: 9, timeZone: "Asia/Kolkata", aliases: ["Maa Kali", "Shakti Peeth"] },
  { id: "tarapith", name: "Tarapith", nameHi: "तारापीठ", state: "West Bengal", stateHi: "पश्चिम बंगाल", latitude: 24.1132, longitude: 87.8047, elevationMeters: 45, timeZone: "Asia/Kolkata", aliases: ["Maa Tara", "Bama Khepa"] },
  { id: "dakshineswar", name: "Dakshineswar", nameHi: "दक्षिणेश्वर", state: "West Bengal", stateHi: "पश्चिम बंगाल", latitude: 22.6558, longitude: 88.3575, elevationMeters: 11, timeZone: "Asia/Kolkata", aliases: ["Ramakrishna Paramahamsa", "Bhavatarini"] },
  { id: "katra", name: "Katra (Vaishno Devi)", nameHi: "कटरा (वैष्णो देवी)", state: "Jammu & Kashmir", stateHi: "जम्मू और कश्मीर", latitude: 32.9933, longitude: 74.9323, elevationMeters: 875, timeZone: "Asia/Kolkata", aliases: ["Mata Vaishno Devi", "Bhavan"] },
  { id: "amarnath", name: "Amarnath", nameHi: "अमरनाथ धाम", state: "Jammu & Kashmir", stateHi: "जम्मू और कश्मीर", latitude: 34.2155, longitude: 75.5034, elevationMeters: 3888, timeZone: "Asia/Kolkata", aliases: ["Baba Barfani", "Holy Cave"] },
  { id: "pushkar", name: "Pushkar", nameHi: "पुष्कर", state: "Rajasthan", stateHi: "राजस्थान", latitude: 26.4897, longitude: 74.5511, elevationMeters: 510, timeZone: "Asia/Kolkata", aliases: ["Lord Brahma Temple", "Sarovar"] },
  { id: "khatu-shyam", name: "Khatu Shyam", nameHi: "खाटू श्याम जी", state: "Rajasthan", stateHi: "राजस्थान", latitude: 27.3621, longitude: 75.3056, elevationMeters: 430, timeZone: "Asia/Kolkata", aliases: ["Barbarika", "Hare Ka Sahara"] },
  { id: "salasar", name: "Salasar Balaji", nameHi: "सालासर बालाजी", state: "Rajasthan", stateHi: "राजस्थान", latitude: 27.7214, longitude: 74.7217, elevationMeters: 310, timeZone: "Asia/Kolkata", aliases: ["Anjani Mata", "Hanuman Ji"] },
  { id: "nathdwara", name: "Nathdwara", nameHi: "नाथद्वारा", state: "Rajasthan", stateHi: "राजस्थान", latitude: 24.9317, longitude: 73.8219, elevationMeters: 585, timeZone: "Asia/Kolkata", aliases: ["Shrinathji", "Pushtimarg"] },
  { id: "ambaji", name: "Ambaji", nameHi: "अंबाजी", state: "Gujarat", stateHi: "गुजरात", latitude: 24.3314, longitude: 72.8519, elevationMeters: 480, timeZone: "Asia/Kolkata", aliases: ["Arasuri Ambaji", "Gabbar Hill"] },
  { id: "pavagadh", name: "Pavagadh (Kalika Mata)", nameHi: "पावागढ़ (कालिका माता)", state: "Gujarat", stateHi: "गुजरात", latitude: 22.4631, longitude: 73.5358, elevationMeters: 762, timeZone: "Asia/Kolkata", aliases: ["Mahakali Temple", "Champaner"] },
  { id: "palitana", name: "Palitana", nameHi: "पालीताणा", state: "Gujarat", stateHi: "गुजरात", latitude: 21.5222, longitude: 71.8258, elevationMeters: 67, timeZone: "Asia/Kolkata", aliases: ["Shatrunjaya", "Jain Tirth"] },
  { id: "gaya", name: "Gaya (Bodh Gaya)", nameHi: "गया (बोधगया)", state: "Bihar", stateHi: "बिहार", latitude: 24.7914, longitude: 85.0002, elevationMeters: 111, timeZone: "Asia/Kolkata", aliases: ["Vishnupad", "Pind Daan", "Phalguni"] },
  { id: "kurukshetra", name: "Kurukshetra", nameHi: "कुरुक्षेत्र", state: "Haryana", stateHi: "हरियाणा", latitude: 29.9695, longitude: 76.8783, elevationMeters: 260, timeZone: "Asia/Kolkata", aliases: ["Brahma Sarovar", "Gita Jayanti", "Jyotisar"] },
  { id: "chitrakoot", name: "Chitrakoot", nameHi: "चित्रकूट", state: "Madhya Pradesh", stateHi: "मध्य प्रदेश", latitude: 25.2052, longitude: 80.8953, elevationMeters: 140, timeZone: "Asia/Kolkata", aliases: ["Kamadgiri", "Mandakini", "Ramghat"] },
  { id: "maihar", name: "Maihar (Sharda Devi)", nameHi: "मैहर (शारदा देवी)", state: "Madhya Pradesh", stateHi: "मध्य प्रदेश", latitude: 24.2678, longitude: 80.7583, elevationMeters: 367, timeZone: "Asia/Kolkata", aliases: ["Trikoota Parvat", "Maa Sharda"] },
  { id: "orchha", name: "Orchha (Ram Raja)", nameHi: "ओरछा (राम राजा)", state: "Madhya Pradesh", stateHi: "मध्य प्रदेश", latitude: 25.3519, longitude: 78.6425, elevationMeters: 240, timeZone: "Asia/Kolkata", aliases: ["Ram Raja Sarkar", "Betwa River"] },

  // ==========================================
  // 3. MAJOR INDIAN REGIONAL DISTRICTS & CITIES
  // ==========================================
  // Maharashtra
  { id: "nashik", name: "Nashik", nameHi: "नासिक", state: "Maharashtra", stateHi: "महाराष्ट्र", latitude: 19.9975, longitude: 73.7898, elevationMeters: 560, timeZone: "Asia/Kolkata", aliases: ["Nasik", "Panchavati"] },
  { id: "aurangabad", name: "Chhatrapati Sambhajinagar", nameHi: "छत्रपति संभाजीनगर", state: "Maharashtra", stateHi: "महाराष्ट्र", latitude: 19.8762, longitude: 75.3433, elevationMeters: 569, timeZone: "Asia/Kolkata", aliases: ["Aurangabad", "Ellora", "Ajanta"] },
  { id: "thane", name: "Thane", nameHi: "ठाणे", state: "Maharashtra", stateHi: "महाराष्ट्र", latitude: 19.2183, longitude: 72.9781, elevationMeters: 7, timeZone: "Asia/Kolkata" },
  { id: "navi-mumbai", name: "Navi Mumbai", nameHi: "नवी मुंबई", state: "Maharashtra", stateHi: "महाराष्ट्र", latitude: 19.033, longitude: 73.0297, elevationMeters: 10, timeZone: "Asia/Kolkata", aliases: ["Vashi", "Nerul", "Belapur"] },
  { id: "kalyan", name: "Kalyan-Dombivli", nameHi: "कल्याण-डोंबिवली", state: "Maharashtra", stateHi: "महाराष्ट्र", latitude: 19.2403, longitude: 73.1305, elevationMeters: 9, timeZone: "Asia/Kolkata", aliases: ["Kalyan", "Dombivli"] },
  { id: "solapur", name: "Solapur", nameHi: "सोलापूर", state: "Maharashtra", stateHi: "महाराष्ट्र", latitude: 17.6599, longitude: 75.9064, elevationMeters: 458, timeZone: "Asia/Kolkata", aliases: ["Siddheshwar"] },
  { id: "amravati", name: "Amravati", nameHi: "अमरावती", state: "Maharashtra", stateHi: "महाराष्ट्र", latitude: 20.9374, longitude: 77.7796, elevationMeters: 343, timeZone: "Asia/Kolkata" },
  { id: "nanded", name: "Nanded", nameHi: "नांदेड", state: "Maharashtra", stateHi: "महाराष्ट्र", latitude: 19.1383, longitude: 77.321, elevationMeters: 362, timeZone: "Asia/Kolkata", aliases: ["Hazur Sahib"] },
  { id: "jalgaon", name: "Jalgaon", nameHi: "जलगांव", state: "Maharashtra", stateHi: "महाराष्ट्र", latitude: 21.0077, longitude: 75.5626, elevationMeters: 209, timeZone: "Asia/Kolkata" },
  { id: "akola", name: "Akola", nameHi: "अकोला", state: "Maharashtra", stateHi: "महाराष्ट्र", latitude: 20.7002, longitude: 77.0082, elevationMeters: 282, timeZone: "Asia/Kolkata" },
  { id: "latur", name: "Latur", nameHi: "लातूर", state: "Maharashtra", stateHi: "महाराष्ट्र", latitude: 18.4088, longitude: 76.5604, elevationMeters: 631, timeZone: "Asia/Kolkata" },
  { id: "dhule", name: "Dhule", nameHi: "धुले", state: "Maharashtra", stateHi: "महाराष्ट्र", latitude: 20.9042, longitude: 74.7749, elevationMeters: 240, timeZone: "Asia/Kolkata" },
  { id: "ahmednagar", name: "Ahilyanagar (Ahmednagar)", nameHi: "अहिल्यानगर (अहमदनगर)", state: "Maharashtra", stateHi: "महाराष्ट्र", latitude: 19.0952, longitude: 74.7496, elevationMeters: 656, timeZone: "Asia/Kolkata" },

  // Gujarat
  { id: "bhavnagar", name: "Bhavnagar", nameHi: "भावनगर", state: "Gujarat", stateHi: "गुजरात", latitude: 21.7645, longitude: 72.1519, elevationMeters: 24, timeZone: "Asia/Kolkata" },
  { id: "jamnagar", name: "Jamnagar", nameHi: "जामनगर", state: "Gujarat", stateHi: "गुजरात", latitude: 22.4707, longitude: 70.0577, elevationMeters: 20, timeZone: "Asia/Kolkata" },
  { id: "junagadh", name: "Junagadh", nameHi: "जूनागढ़", state: "Gujarat", stateHi: "गुजरात", latitude: 21.5222, longitude: 70.4579, elevationMeters: 107, timeZone: "Asia/Kolkata", aliases: ["Girnar", "Bhavnath"] },
  { id: "gandhinagar", name: "Gandhinagar", nameHi: "गांधीनगर", state: "Gujarat", stateHi: "गुजरात", latitude: 23.2156, longitude: 72.6369, elevationMeters: 81, timeZone: "Asia/Kolkata", aliases: ["Akshardham Gujarat"] },
  { id: "anand", name: "Anand", nameHi: "आणंद", state: "Gujarat", stateHi: "गुजरात", latitude: 22.5645, longitude: 72.9289, elevationMeters: 39, timeZone: "Asia/Kolkata", aliases: ["Amul", "Milk City"] },
  { id: "nadiad", name: "Nadiad", nameHi: "नडियाद", state: "Gujarat", stateHi: "गुजरात", latitude: 22.6916, longitude: 72.8634, elevationMeters: 35, timeZone: "Asia/Kolkata", aliases: ["Santram Mandir"] },
  { id: "morbi", name: "Morbi", nameHi: "मोरबी", state: "Gujarat", stateHi: "गुजरात", latitude: 22.812, longitude: 70.8384, elevationMeters: 54, timeZone: "Asia/Kolkata" },
  { id: "mehsana", name: "Mehsana", nameHi: "मेहसाणा", state: "Gujarat", stateHi: "गुजरात", latitude: 23.588, longitude: 72.3693, elevationMeters: 81, timeZone: "Asia/Kolkata", aliases: ["Modhera Sun Temple"] },
  { id: "bharuch", name: "Bharuch", nameHi: "भरूच", state: "Gujarat", stateHi: "गुजरात", latitude: 21.7051, longitude: 72.9959, elevationMeters: 15, timeZone: "Asia/Kolkata", aliases: ["Bhrigu Kshetra"] },
  { id: "vapi", name: "Vapi", nameHi: "वापी", state: "Gujarat", stateHi: "गुजरात", latitude: 20.3893, longitude: 72.9106, elevationMeters: 27, timeZone: "Asia/Kolkata" },

  // Uttar Pradesh & Bihar
  { id: "gorakhpur", name: "Gorakhpur", nameHi: "गोरखपुर", state: "Uttar Pradesh", stateHi: "उत्तर प्रदेश", latitude: 26.7606, longitude: 83.3732, elevationMeters: 84, timeZone: "Asia/Kolkata", aliases: ["Gorakhnath Mandir", "Gita Press"] },
  { id: "bareilly", name: "Bareilly", nameHi: "बरेली", state: "Uttar Pradesh", stateHi: "उत्तर प्रदेश", latitude: 28.367, longitude: 79.4304, elevationMeters: 168, timeZone: "Asia/Kolkata" },
  { id: "aligarh", name: "Aligarh", nameHi: "अलीगढ़", state: "Uttar Pradesh", stateHi: "उत्तर प्रदेश", latitude: 27.8974, longitude: 78.088, elevationMeters: 178, timeZone: "Asia/Kolkata" },
  { id: "moradabad", name: "Moradabad", nameHi: "मुरादाबाद", state: "Uttar Pradesh", stateHi: "उत्तर प्रदेश", latitude: 28.8386, longitude: 78.7733, elevationMeters: 193, timeZone: "Asia/Kolkata" },
  { id: "saharanpur", name: "Saharanpur", nameHi: "सहारनपुर", state: "Uttar Pradesh", stateHi: "उत्तर प्रदेश", latitude: 29.9671, longitude: 77.551, elevationMeters: 275, timeZone: "Asia/Kolkata", aliases: ["Shakumbhari Devi"] },
  { id: "jhansi", name: "Jhansi", nameHi: "झांसी", state: "Uttar Pradesh", stateHi: "उत्तर प्रदेश", latitude: 25.4484, longitude: 78.5685, elevationMeters: 284, timeZone: "Asia/Kolkata" },
  { id: "muzaffarnagar", name: "Muzaffarnagar", nameHi: "मुजफ्फरनगर", state: "Uttar Pradesh", stateHi: "उत्तर प्रदेश", latitude: 29.4727, longitude: 77.7085, elevationMeters: 249, timeZone: "Asia/Kolkata" },
  { id: "bhagalpur", name: "Bhagalpur", nameHi: "भागलपुर", state: "Bihar", stateHi: "बिहार", latitude: 25.2425, longitude: 86.9842, elevationMeters: 52, timeZone: "Asia/Kolkata", aliases: ["Silk City"] },
  { id: "muzaffarpur", name: "Muzaffarpur", nameHi: "मुजफ्फरपुर", state: "Bihar", stateHi: "बिहार", latitude: 26.1209, longitude: 85.3647, elevationMeters: 60, timeZone: "Asia/Kolkata", aliases: ["Garibnath Temple"] },
  { id: "darbhanga", name: "Darbhanga", nameHi: "दरभंगा", state: "Bihar", stateHi: "बिहार", latitude: 26.1542, longitude: 85.8918, elevationMeters: 52, timeZone: "Asia/Kolkata", aliases: ["Mithila", "Shyama Mai"] },
  { id: "purnia", name: "Purnia", nameHi: "पूर्णिया", state: "Bihar", stateHi: "बिहार", latitude: 25.7771, longitude: 87.4753, elevationMeters: 36, timeZone: "Asia/Kolkata" },
  { id: "begusarai", name: "Begusarai", nameHi: "बेगूसराय", state: "Bihar", stateHi: "बिहार", latitude: 25.4182, longitude: 86.1272, elevationMeters: 41, timeZone: "Asia/Kolkata", aliases: ["Simaria Ghat"] },

  // Madhya Pradesh & Rajasthan
  { id: "gwalior", name: "Gwalior", nameHi: "ग्वालियर", state: "Madhya Pradesh", stateHi: "मध्य प्रदेश", latitude: 26.2183, longitude: 78.1828, elevationMeters: 197, timeZone: "Asia/Kolkata" },
  { id: "jabalpur", name: "Jabalpur", nameHi: "जबलपुर", state: "Madhya Pradesh", stateHi: "मध्य प्रदेश", latitude: 23.1815, longitude: 79.9864, elevationMeters: 411, timeZone: "Asia/Kolkata", aliases: ["Bhedaghat", "Dhuandhar"] },
  { id: "sagar", name: "Sagar", nameHi: "सागर", state: "Madhya Pradesh", stateHi: "मध्य प्रदेश", latitude: 23.8388, longitude: 78.7378, elevationMeters: 529, timeZone: "Asia/Kolkata" },
  { id: "satna", name: "Satna", nameHi: "सतना", state: "Madhya Pradesh", stateHi: "मध्य प्रदेश", latitude: 24.5805, longitude: 80.8291, elevationMeters: 315, timeZone: "Asia/Kolkata" },
  { id: "rewa", name: "Rewa", nameHi: "रीवा", state: "Madhya Pradesh", stateHi: "मध्य प्रदेश", latitude: 24.5362, longitude: 81.3037, elevationMeters: 304, timeZone: "Asia/Kolkata" },
  { id: "bikaner", name: "Bikaner", nameHi: "बीकानेर", state: "Rajasthan", stateHi: "राजस्थान", latitude: 28.0229, longitude: 73.3119, elevationMeters: 242, timeZone: "Asia/Kolkata", aliases: ["Karni Mata Deshnok"] },
  { id: "ajmer", name: "Ajmer", nameHi: "अजमेर", state: "Rajasthan", stateHi: "राजस्थान", latitude: 26.4499, longitude: 74.6399, elevationMeters: 480, timeZone: "Asia/Kolkata" },
  { id: "bhilwara", name: "Bhilwara", nameHi: "भीलवाड़ा", state: "Rajasthan", stateHi: "राजस्थान", latitude: 25.3407, longitude: 74.6313, elevationMeters: 421, timeZone: "Asia/Kolkata" },
  { id: "alwar", name: "Alwar", nameHi: "अलवर", state: "Rajasthan", stateHi: "राजस्थान", latitude: 27.553, longitude: 76.6346, elevationMeters: 271, timeZone: "Asia/Kolkata" },
  { id: "sikar", name: "Sikar", nameHi: "सीकर", state: "Rajasthan", stateHi: "राजस्थान", latitude: 27.6094, longitude: 75.1398, elevationMeters: 437, timeZone: "Asia/Kolkata", aliases: ["Shekhawati"] },

  // South India (Karnataka, Tamil Nadu, Andhra, Telangana, Kerala)
  { id: "hubballi", name: "Hubballi-Dharwad", nameHi: "हुबली-धारवाड़", state: "Karnataka", stateHi: "कर्नाटक", latitude: 15.3647, longitude: 75.124, elevationMeters: 671, timeZone: "Asia/Kolkata", aliases: ["Hubli", "Dharwad"] },
  { id: "belagavi", name: "Belagavi", nameHi: "बेलगावी", state: "Karnataka", stateHi: "कर्नाटक", latitude: 15.8497, longitude: 74.4977, elevationMeters: 751, timeZone: "Asia/Kolkata", aliases: ["Belgaum"] },
  { id: "kalaburagi", name: "Kalaburagi", nameHi: "कलबुर्गी", state: "Karnataka", stateHi: "कर्नाटक", latitude: 17.3297, longitude: 76.8343, elevationMeters: 454, timeZone: "Asia/Kolkata", aliases: ["Gulbarga"] },
  { id: "hampi", name: "Hampi (Hospet)", nameHi: "हम्पी (होसपेट)", state: "Karnataka", stateHi: "कर्नाटक", latitude: 15.335, longitude: 76.46, elevationMeters: 467, timeZone: "Asia/Kolkata", aliases: ["Virupaksha", "Vijayanagara", "Kishkindha"] },
  { id: "salem", name: "Salem", nameHi: "सेलम", state: "Tamil Nadu", stateHi: "तमिलनाडु", latitude: 11.6643, longitude: 78.146, elevationMeters: 278, timeZone: "Asia/Kolkata" },
  { id: "tiruchirappalli", name: "Tiruchirappalli", nameHi: "तिरुचिरापल्ली", state: "Tamil Nadu", stateHi: "तमिलनाडु", latitude: 10.7905, longitude: 78.7047, elevationMeters: 88, timeZone: "Asia/Kolkata", aliases: ["Trichy", "Rockfort"] },
  { id: "tirunelveli", name: "Tirunelveli", nameHi: "तिरुनेलवेली", state: "Tamil Nadu", stateHi: "तमिलनाडु", latitude: 8.7139, longitude: 77.7567, elevationMeters: 47, timeZone: "Asia/Kolkata", aliases: ["Nellaiappar"] },
  { id: "vellore", name: "Vellore", nameHi: "वेल्लोर", state: "Tamil Nadu", stateHi: "तमिलनाडु", latitude: 12.9165, longitude: 79.1325, elevationMeters: 216, timeZone: "Asia/Kolkata", aliases: ["Sripuram Golden Temple"] },
  { id: "guntur", name: "Guntur", nameHi: "गुंटूर", state: "Andhra Pradesh", stateHi: "आंध्र प्रदेश", latitude: 16.3067, longitude: 80.4365, elevationMeters: 33, timeZone: "Asia/Kolkata" },
  { id: "nellore", name: "Nellore", nameHi: "नेल्लोर", state: "Andhra Pradesh", stateHi: "आंध्र प्रदेश", latitude: 14.4426, longitude: 79.9865, elevationMeters: 18, timeZone: "Asia/Kolkata" },
  { id: "kurnool", name: "Kurnool", nameHi: "कुरनूल", state: "Andhra Pradesh", stateHi: "आंध्र प्रदेश", latitude: 15.8281, longitude: 78.0373, elevationMeters: 273, timeZone: "Asia/Kolkata", aliases: ["Ahobilam", "Mahanandi"] },
  { id: "rajahmundry", name: "Rajahmundry", nameHi: "राजमुंदरी", state: "Andhra Pradesh", stateHi: "आंध्र प्रदेश", latitude: 17.0005, longitude: 81.804, elevationMeters: 14, timeZone: "Asia/Kolkata", aliases: ["Godavari Pushkaram"] },
  { id: "warangal", name: "Warangal", nameHi: "वारंगल", state: "Telangana", stateHi: "तेलंगाना", latitude: 17.9784, longitude: 79.5941, elevationMeters: 266, timeZone: "Asia/Kolkata", aliases: ["Thousand Pillar Temple", "Bhadrakali"] },
  { id: "nizamabad", name: "Nizamabad", nameHi: "निजामाबाद", state: "Telangana", stateHi: "तेलंगाना", latitude: 18.6725, longitude: 78.0941, elevationMeters: 395, timeZone: "Asia/Kolkata" },
  { id: "karimnagar", name: "Karimnagar", nameHi: "करीमनगर", state: "Telangana", stateHi: "तेलंगाना", latitude: 18.4386, longitude: 79.1288, elevationMeters: 265, timeZone: "Asia/Kolkata", aliases: ["Vemulawada Rajarajeshwara"] },
  { id: "thrissur", name: "Thrissur", nameHi: "त्रिशूर", state: "Kerala", stateHi: "केरल", latitude: 10.5276, longitude: 76.2144, elevationMeters: 3, timeZone: "Asia/Kolkata", aliases: ["Trichur", "Vadakkunnathan", "Pooram"] },
  { id: "kozhikode", name: "Kozhikode", nameHi: "कोझिकोड", state: "Kerala", stateHi: "केरल", latitude: 11.2588, longitude: 75.7804, elevationMeters: 1, timeZone: "Asia/Kolkata", aliases: ["Calicut"] },
  { id: "kollam", name: "Kollam", nameHi: "कोल्लम", state: "Kerala", stateHi: "केरल", latitude: 8.8932, longitude: 76.6141, elevationMeters: 3, timeZone: "Asia/Kolkata", aliases: ["Quilon"] },
  { id: "palakkad", name: "Palakkad", nameHi: "पालक्काड", state: "Kerala", stateHi: "केरल", latitude: 10.7867, longitude: 76.6548, elevationMeters: 84, timeZone: "Asia/Kolkata" },

  // Punjab, Haryana, HP, UK, J&K, Northeast
  { id: "jalandhar", name: "Jalandhar", nameHi: "जालंधर", state: "Punjab", stateHi: "पंजाब", latitude: 31.326, longitude: 75.5762, elevationMeters: 228, timeZone: "Asia/Kolkata" },
  { id: "patiala", name: "Patiala", nameHi: "पटियाला", state: "Punjab", stateHi: "पंजाब", latitude: 30.3398, longitude: 76.3869, elevationMeters: 250, timeZone: "Asia/Kolkata" },
  { id: "panipat", name: "Panipat", nameHi: "पानीपत", state: "Haryana", stateHi: "हरियाणा", latitude: 29.3909, longitude: 76.9635, elevationMeters: 219, timeZone: "Asia/Kolkata" },
  { id: "ambala", name: "Ambala", nameHi: "अंबाला", state: "Haryana", stateHi: "हरियाणा", latitude: 30.3782, longitude: 76.7767, elevationMeters: 264, timeZone: "Asia/Kolkata" },
  { id: "rohtak", name: "Rohtak", nameHi: "रोहतक", state: "Haryana", stateHi: "हरियाणा", latitude: 28.8955, longitude: 76.6066, elevationMeters: 220, timeZone: "Asia/Kolkata" },
  { id: "dharamshala", name: "Dharamshala", nameHi: "धर्मशाला", state: "Himachal Pradesh", stateHi: "हिमाचल प्रदेश", latitude: 32.219, longitude: 76.3234, elevationMeters: 1457, timeZone: "Asia/Kolkata", aliases: ["Kangra", "Chamunda Devi"] },
  { id: "kullu", name: "Kullu-Manali", nameHi: "कुल्लू-मनाली", state: "Himachal Pradesh", stateHi: "हिमाचल प्रदेश", latitude: 31.9579, longitude: 77.1095, elevationMeters: 1279, timeZone: "Asia/Kolkata", aliases: ["Bijli Mahadev", "Hadimba Temple"] },
  { id: "leh", name: "Leh (Ladakh)", nameHi: "लेह (लद्दाख)", state: "Ladakh", stateHi: "लद्दाख", latitude: 34.1526, longitude: 77.5771, elevationMeters: 3524, timeZone: "Asia/Kolkata" },
  { id: "siliguri", name: "Siliguri", nameHi: "सिलीगुड़ी", state: "West Bengal", stateHi: "पश्चिम बंगाल", latitude: 26.7271, longitude: 88.3953, elevationMeters: 122, timeZone: "Asia/Kolkata" },
  { id: "agartala", name: "Agartala", nameHi: "अगरतला", state: "Tripura", stateHi: "त्रिपुरा", latitude: 23.8315, longitude: 91.2868, elevationMeters: 15, timeZone: "Asia/Kolkata", aliases: ["Tripura Sundari"] },
  { id: "shillong", name: "Shillong", nameHi: "शिलांग", state: "Meghalaya", stateHi: "मेघालय", latitude: 25.5788, longitude: 91.8933, elevationMeters: 1525, timeZone: "Asia/Kolkata" },
  { id: "imphal", name: "Imphal", nameHi: "इम्फाल", state: "Manipur", stateHi: "मणिपुर", latitude: 24.817, longitude: 93.9368, elevationMeters: 786, timeZone: "Asia/Kolkata", aliases: ["Govindaji Temple"] },
  { id: "port-blair", name: "Port Blair", nameHi: "पोर्ट ब्लेयर", state: "Andaman & Nicobar", stateHi: "अंडमान और निकोबार", latitude: 11.6234, longitude: 92.7265, elevationMeters: 16, timeZone: "Asia/Kolkata" },
  { id: "puducherry", name: "Puducherry", nameHi: "पुडुचेरी", state: "Puducherry", stateHi: "पुडुचेरी", latitude: 11.9416, longitude: 79.8083, elevationMeters: 3, timeZone: "Asia/Kolkata", aliases: ["Pondicherry", "Auroville", "Manakula Vinayagar"] },

  // ==========================================
  // 4. MAJOR GLOBAL NRI & INTERNATIONAL CITIES
  // ==========================================
  // United States
  { id: "new-york", name: "New York", nameHi: "न्यूयॉर्क", state: "New York", stateHi: "न्यूयॉर्क", country: "United States", countryHi: "अमेरिका", latitude: 40.7128, longitude: -74.006, elevationMeters: 10, timeZone: "America/New_York", aliases: ["NYC", "Manhattan", "Queens", "Brooklyn"] },
  { id: "jersey-city", name: "Jersey City", nameHi: "जर्सी सिटी", state: "New Jersey", stateHi: "न्यू जर्सी", country: "United States", countryHi: "अमेरिका", latitude: 40.7178, longitude: -74.0431, elevationMeters: 9, timeZone: "America/New_York", aliases: ["JC", "India Square"] },
  { id: "edison", name: "Edison", nameHi: "एडिसन", state: "New Jersey", stateHi: "न्यू जर्सी", country: "United States", countryHi: "अमेरिका", latitude: 40.5187, longitude: -74.4121, elevationMeters: 40, timeZone: "America/New_York", aliases: ["Oak Tree Road", "Little India"] },
  { id: "san-jose", name: "San Jose (Silicon Valley)", nameHi: "सैन जोस (सिलिकॉन वैली)", state: "California", stateHi: "कैलिफ़ोर्निया", country: "United States", countryHi: "अमेरिका", latitude: 37.3382, longitude: -121.8863, elevationMeters: 25, timeZone: "America/Los_Angeles", aliases: ["Bay Area", "Silicon Valley"] },
  { id: "san-francisco", name: "San Francisco", nameHi: "सैन फ्रांसिस्को", state: "California", stateHi: "कैलिफ़ोर्निया", country: "United States", countryHi: "अमेरिका", latitude: 37.7749, longitude: -122.4194, elevationMeters: 16, timeZone: "America/Los_Angeles", aliases: ["SF"] },
  { id: "sunnyvale", name: "Sunnyvale", nameHi: "सनीवेल", state: "California", stateHi: "कैलिफ़ोर्निया", country: "United States", countryHi: "अमेरिका", latitude: 37.3688, longitude: -122.0363, elevationMeters: 38, timeZone: "America/Los_Angeles", aliases: ["Fremont", "Santa Clara"] },
  { id: "los-angeles", name: "Los Angeles", nameHi: "लॉस एंजिल्स", state: "California", stateHi: "कैलिफ़ोर्निया", country: "United States", countryHi: "अमेरिका", latitude: 34.0522, longitude: -118.2437, elevationMeters: 89, timeZone: "America/Los_Angeles", aliases: ["LA", "Artesia"] },
  { id: "chicago", name: "Chicago", nameHi: "शिकागो", state: "Illinois", stateHi: "इलिनोइस", country: "United States", countryHi: "अमेरिका", latitude: 41.8781, longitude: -87.6298, elevationMeters: 181, timeZone: "America/Chicago", aliases: ["Devon Avenue", "Naperville"] },
  { id: "dallas", name: "Dallas", nameHi: "डलास", state: "Texas", stateHi: "टेक्सास", country: "United States", countryHi: "अमेरिका", latitude: 32.7767, longitude: -96.797, elevationMeters: 131, timeZone: "America/Chicago", aliases: ["DFW", "Plano", "Frisco", "Irving"] },
  { id: "houston", name: "Houston", nameHi: "ह्यूस्टन", state: "Texas", stateHi: "टेक्सास", country: "United States", countryHi: "अमेरिका", latitude: 29.7604, longitude: -95.3698, elevationMeters: 14, timeZone: "America/Chicago", aliases: ["Sugar Land"] },
  { id: "austin", name: "Austin", nameHi: "ऑस्टिन", state: "Texas", stateHi: "टेक्सास", country: "United States", countryHi: "अमेरिका", latitude: 30.2672, longitude: -97.7431, elevationMeters: 149, timeZone: "America/Chicago" },
  { id: "seattle", name: "Seattle", nameHi: "सिएटल", state: "Washington", stateHi: "वॉशिंगटन", country: "United States", countryHi: "अमेरिका", latitude: 47.6062, longitude: -122.3321, elevationMeters: 53, timeZone: "America/Los_Angeles", aliases: ["Bellevue", "Redmond"] },
  { id: "atlanta", name: "Atlanta", nameHi: "अटलांटा", state: "Georgia", stateHi: "जॉर्जिया", country: "United States", countryHi: "अमेरिका", latitude: 33.749, longitude: -84.388, elevationMeters: 320, timeZone: "America/New_York", aliases: ["Alpharetta", "Duluth"] },
  { id: "boston", name: "Boston", nameHi: "बोस्टन", state: "Massachusetts", stateHi: "मैसाचुसेट्स", country: "United States", countryHi: "अमेरिका", latitude: 42.3601, longitude: -71.0589, elevationMeters: 43, timeZone: "America/New_York" },
  { id: "philadelphia", name: "Philadelphia", nameHi: "फिलाडेल्फिया", state: "Pennsylvania", stateHi: "पेंसिल्वेनिया", country: "United States", countryHi: "अमेरिका", latitude: 39.9526, longitude: -75.1652, elevationMeters: 12, timeZone: "America/New_York", aliases: ["Philly"] },
  { id: "washington-dc", name: "Washington D.C.", nameHi: "वाशिंगटन डी.सी.", state: "District of Columbia", stateHi: "कोलंबिया", country: "United States", countryHi: "अमेरिका", latitude: 38.9072, longitude: -77.0369, elevationMeters: 6, timeZone: "America/New_York", aliases: ["DC", "Chantilly", "Fairfax"] },
  { id: "phoenix", name: "Phoenix", nameHi: "फीनिक्स", state: "Arizona", stateHi: "एरिज़ोना", country: "United States", countryHi: "अमेरिका", latitude: 33.4484, longitude: -112.074, elevationMeters: 331, timeZone: "America/Phoenix", aliases: ["Scottsdale", "Tempe"] },

  // United Kingdom
  { id: "london", name: "London", nameHi: "लंदन", state: "England", stateHi: "इंग्लैंड", country: "United Kingdom", countryHi: "ब्रिटेन", latitude: 51.5074, longitude: -0.1278, elevationMeters: 11, timeZone: "Europe/London", aliases: ["Wembley", "Harrow", "Southall", "Neasden Temple"] },
  { id: "leicester", name: "Leicester", nameHi: "लीसेस्टर", state: "England", stateHi: "इंग्लैंड", country: "United Kingdom", countryHi: "ब्रिटेन", latitude: 52.6369, longitude: -1.1398, elevationMeters: 67, timeZone: "Europe/London", aliases: ["Belgrave Road", "Golden Mile"] },
  { id: "birmingham", name: "Birmingham", nameHi: "बर्मिंघम", state: "England", stateHi: "इंग्लैंड", country: "United Kingdom", countryHi: "ब्रिटेन", latitude: 52.4862, longitude: -1.8904, elevationMeters: 140, timeZone: "Europe/London" },
  { id: "manchester", name: "Manchester", nameHi: "मैनचेस्टर", state: "England", stateHi: "इंग्लैंड", country: "United Kingdom", countryHi: "ब्रिटेन", latitude: 53.4808, longitude: -2.2426, elevationMeters: 38, timeZone: "Europe/London" },
  { id: "slough", name: "Slough", nameHi: "स्लो", state: "England", stateHi: "इंग्लैंड", country: "United Kingdom", countryHi: "ब्रिटेन", latitude: 51.5105, longitude: -0.595, elevationMeters: 30, timeZone: "Europe/London" },
  { id: "edinburgh", name: "Edinburgh", nameHi: "एडिनबर्ग", state: "Scotland", stateHi: "स्कॉटलैंड", country: "United Kingdom", countryHi: "ब्रिटेन", latitude: 55.9533, longitude: -3.1883, elevationMeters: 47, timeZone: "Europe/London" },

  // Canada
  { id: "toronto", name: "Toronto", nameHi: "टोरंटो", state: "Ontario", stateHi: "ओंटारियो", country: "Canada", countryHi: "कनाडा", latitude: 43.6532, longitude: -79.3832, elevationMeters: 76, timeZone: "America/Toronto", aliases: ["GTA"] },
  { id: "brampton", name: "Brampton", nameHi: "ब्रैम्पटन", state: "Ontario", stateHi: "ओंटारियो", country: "Canada", countryHi: "कनाडा", latitude: 43.7315, longitude: -79.7624, elevationMeters: 218, timeZone: "America/Toronto", aliases: ["Bramalea", "Chinguacousy"] },
  { id: "mississauga", name: "Mississauga", nameHi: "मिसिसॉगा", state: "Ontario", stateHi: "ओंटारियो", country: "Canada", countryHi: "कनाडा", latitude: 43.589, longitude: -79.6441, elevationMeters: 156, timeZone: "America/Toronto" },
  { id: "vancouver", name: "Vancouver", nameHi: "वैंकूवर", state: "British Columbia", stateHi: "ब्रिटिश कोलंबिया", country: "Canada", countryHi: "कनाडा", latitude: 49.2827, longitude: -123.1207, elevationMeters: 70, timeZone: "America/Vancouver", aliases: ["Surrey", "Richmond"] },
  { id: "calgary", name: "Calgary", nameHi: "कैलगरी", state: "Alberta", stateHi: "अल्बर्टा", country: "Canada", countryHi: "कनाडा", latitude: 51.0447, longitude: -114.0719, elevationMeters: 1045, timeZone: "America/Edmonton" },

  // Middle East / Gulf
  { id: "dubai", name: "Dubai", nameHi: "दुबई", state: "Dubai", stateHi: "दुबई", country: "UAE", countryHi: "संयुक्त अरब अमीरात", latitude: 25.2048, longitude: 55.2708, elevationMeters: 5, timeZone: "Asia/Dubai", aliases: ["Bur Dubai Shiva Temple"] },
  { id: "abu-dhabi", name: "Abu Dhabi", nameHi: "अबू धाबी", state: "Abu Dhabi", stateHi: "अबू धाबी", country: "UAE", countryHi: "संयुक्त अरब अमीरात", latitude: 24.4539, longitude: 54.3773, elevationMeters: 7, timeZone: "Asia/Dubai", aliases: ["BAPS Hindu Mandir"] },
  { id: "sharjah", name: "Sharjah", nameHi: "शारजाह", state: "Sharjah", stateHi: "शारजाह", country: "UAE", countryHi: "संयुक्त अरब अमीरात", latitude: 25.3573, longitude: 55.4033, elevationMeters: 4, timeZone: "Asia/Dubai" },
  { id: "doha", name: "Doha", nameHi: "दोहा", state: "Doha", stateHi: "दोहा", country: "Qatar", countryHi: "क़तर", latitude: 25.2854, longitude: 51.531, elevationMeters: 13, timeZone: "Asia/Qatar" },
  { id: "muscat", name: "Muscat", nameHi: "मस्कट", state: "Muscat", stateHi: "मस्कट", country: "Oman", countryHi: "ओमान", latitude: 23.588, longitude: 58.3829, elevationMeters: 15, timeZone: "Asia/Muscat", aliases: ["Muttrah Shiva Temple"] },
  { id: "kuwait-city", name: "Kuwait City", nameHi: "कुवैत सिटी", state: "Al Asimah", stateHi: "कुवैत", country: "Kuwait", countryHi: "कुवैत", latitude: 29.3759, longitude: 47.9774, elevationMeters: 10, timeZone: "Asia/Kuwait" },
  { id: "bahrain", name: "Manama", nameHi: "मनामा (बहरीन)", state: "Capital", stateHi: "बहरीन", country: "Bahrain", countryHi: "बहरीन", latitude: 26.2285, longitude: 50.586, elevationMeters: 6, timeZone: "Asia/Bahrain", aliases: ["Shrinathji Temple Bahrain"] },

  // Asia-Pacific, Australia & New Zealand
  { id: "singapore", name: "Singapore", nameHi: "सिंगापुर", state: "Singapore", stateHi: "सिंगापुर", country: "Singapore", countryHi: "सिंगापुर", latitude: 1.3521, longitude: 103.8198, elevationMeters: 15, timeZone: "Asia/Singapore", aliases: ["Sri Mariamman", "Little India SG"] },
  { id: "kuala-lumpur", name: "Kuala Lumpur", nameHi: "क्वालालंपुर", state: "Federal Territory", stateHi: "क्वालालंपुर", country: "Malaysia", countryHi: "मलेशिया", latitude: 3.139, longitude: 101.6869, elevationMeters: 66, timeZone: "Asia/Kuala_Lumpur", aliases: ["Batu Caves", "Murugan"] },
  { id: "sydney", name: "Sydney", nameHi: "सिडनी", state: "New South Wales", stateHi: "न्यू साउथ वेल्स", country: "Australia", countryHi: "ऑस्ट्रेलिया", latitude: -33.8688, longitude: 151.2093, elevationMeters: 19, timeZone: "Australia/Sydney", aliases: ["Parramatta", "Helensburgh Temple"] },
  { id: "melbourne", name: "Melbourne", nameHi: "मेलबर्न", state: "Victoria", stateHi: "विक्टोरिया", country: "Australia", countryHi: "ऑस्ट्रेलिया", latitude: -37.8136, longitude: 144.9631, elevationMeters: 31, timeZone: "Australia/Melbourne" },
  { id: "brisbane", name: "Brisbane", nameHi: "ब्रिसबेन", state: "Queensland", stateHi: "क्वींसलैंड", country: "Australia", countryHi: "ऑस्ट्रेलिया", latitude: -27.4698, longitude: 153.0251, elevationMeters: 28, timeZone: "Australia/Brisbane" },
  { id: "perth", name: "Perth", nameHi: "पर्थ", state: "Western Australia", stateHi: "पश्चिमी ऑस्ट्रेलिया", country: "Australia", countryHi: "ऑस्ट्रेलिया", latitude: -31.9505, longitude: 115.8605, elevationMeters: 18, timeZone: "Australia/Perth" },
  { id: "auckland", name: "Auckland", nameHi: "ऑकलैंड", state: "Auckland", stateHi: "ऑकलैंड", country: "New Zealand", countryHi: "न्यूजीलैंड", latitude: -36.8485, longitude: 174.7633, elevationMeters: 26, timeZone: "Pacific/Auckland" },
  { id: "wellington", name: "Wellington", nameHi: "वेलिंगटन", state: "Wellington", stateHi: "वेलिंगटन", country: "New Zealand", countryHi: "न्यूजीलैंड", latitude: -41.2865, longitude: 174.7762, elevationMeters: 14, timeZone: "Pacific/Auckland" },
  { id: "suva", name: "Suva (Fiji)", nameHi: "सुवा (फिजी)", state: "Central", stateHi: "फिजी", country: "Fiji", countryHi: "फिजी", latitude: -18.1248, longitude: 178.4501, elevationMeters: 20, timeZone: "Pacific/Fiji", aliases: ["Nadi", "Sri Siva Subramaniya"] },

  // Europe & Rest of the World
  { id: "frankfurt", name: "Frankfurt", nameHi: "फ्रैंकफर्ट", state: "Hesse", stateHi: "हेस्से", country: "Germany", countryHi: "जर्मनी", latitude: 50.1109, longitude: 8.6821, elevationMeters: 112, timeZone: "Europe/Berlin" },
  { id: "berlin", name: "Berlin", nameHi: "बर्लिन", state: "Berlin", stateHi: "बर्लिन", country: "Germany", countryHi: "जर्मनी", latitude: 52.52, longitude: 13.405, elevationMeters: 34, timeZone: "Europe/Berlin" },
  { id: "munich", name: "Munich", nameHi: "म्यूनिख", state: "Bavaria", stateHi: "बावारिया", country: "Germany", countryHi: "जर्मनी", latitude: 48.1351, longitude: 11.582, elevationMeters: 519, timeZone: "Europe/Berlin" },
  { id: "paris", name: "Paris", nameHi: "पेरिस", state: "Île-de-France", stateHi: "फ्रांस", country: "France", countryHi: "फ्रांस", latitude: 48.8566, longitude: 2.3522, elevationMeters: 35, timeZone: "Europe/Paris" },
  { id: "amsterdam", name: "Amsterdam", nameHi: "एम्स्टर्डम", state: "North Holland", stateHi: "नीदरलैंड्स", country: "Netherlands", countryHi: "नीदरलैंड्स", latitude: 52.3676, longitude: 4.9041, elevationMeters: 2, timeZone: "Europe/Amsterdam" },
  { id: "dublin", name: "Dublin", nameHi: "डबलिन", state: "Leinster", stateHi: "आयरलैंड", country: "Ireland", countryHi: "आयरलैंड", latitude: 53.3498, longitude: -6.2603, elevationMeters: 20, timeZone: "Europe/Dublin" },
  { id: "port-louis", name: "Port Louis", nameHi: "पोर्ट लुइस", state: "Port Louis", stateHi: "पोर्ट लुइस", country: "Mauritius", countryHi: "मॉरीशस", latitude: -20.1609, longitude: 57.5012, elevationMeters: 8, timeZone: "Indian/Mauritius", aliases: ["Ganga Talao", "Grand Bassin"] },
  { id: "johannesburg", name: "Johannesburg", nameHi: "जोहान्सबर्ग", state: "Gauteng", stateHi: "दक्षिण अफ्रीका", country: "South Africa", countryHi: "दक्षिण अफ्रीका", latitude: -26.2041, longitude: 28.0473, elevationMeters: 1753, timeZone: "Africa/Johannesburg", aliases: ["Durban"] },
  { id: "kathmandu", name: "Kathmandu", nameHi: "काठमांडू", state: "Bagmati", stateHi: "बागमती", country: "Nepal", countryHi: "नेपाल", latitude: 27.7172, longitude: 85.324, elevationMeters: 1400, timeZone: "Asia/Kathmandu", aliases: ["Pashupatinath"] },
  { id: "pokhara", name: "Pokhara", nameHi: "पोखरा", state: "Gandaki", stateHi: "नेपाल", country: "Nepal", countryHi: "नेपाल", latitude: 28.2096, longitude: 83.9856, elevationMeters: 822, timeZone: "Asia/Kathmandu" },
  { id: "bangkok", name: "Bangkok", nameHi: "बैंकॉक", state: "Bangkok", stateHi: "बैंकॉक", country: "Thailand", countryHi: "थाईलैंड", latitude: 13.7563, longitude: 100.5018, elevationMeters: 1, timeZone: "Asia/Bangkok", aliases: ["Erawan Shrine Brahma"] },
  { id: "tokyo", name: "Tokyo", nameHi: "टोक्यो", state: "Kanto", stateHi: "जापान", country: "Japan", countryHi: "जापान", latitude: 35.6762, longitude: 139.6503, elevationMeters: 40, timeZone: "Asia/Tokyo" },
];

export const DEFAULT_CITY = CITIES[0]; // Delhi
export const DELHI = DEFAULT_CITY;

export const POPULAR_CITIES: CityConfig[] = [
  CITIES[0], // Delhi
  CITIES[1], // Mumbai
  CITIES[2], // Bengaluru
  CITIES[51], // Varanasi
  CITIES[52], // Ayodhya
  CITIES[68], // Tirupati
  CITIES[67], // Somnath
  CITIES[66], // Dwarka
  CITIES[65], // Puri
  CITIES[63], // Ujjain
  CITIES[150], // New York
  CITIES[166], // London
  CITIES[172], // Toronto
  CITIES[177], // Dubai
  CITIES[186], // Sydney
];

/**
 * Creates a valid CityConfig from arbitrary coordinates entered by a user.
 */
export function createCustomCity(params: {
  name: string;
  nameHi?: string;
  state?: string;
  stateHi?: string;
  country?: string;
  countryHi?: string;
  latitude: number;
  longitude: number;
  elevationMeters?: number;
  timeZone?: string;
}): CityConfig {
  const lat = Math.round(params.latitude * 10000) / 10000;
  const lon = Math.round(params.longitude * 10000) / 10000;
  const id = `custom_${lat >= 0 ? "+" : ""}${lat.toFixed(4)}_${lon >= 0 ? "+" : ""}${lon.toFixed(4)}`;
  return {
    id,
    name: params.name || `Custom (${lat.toFixed(2)}°, ${lon.toFixed(2)}°)`,
    nameHi: params.nameHi || params.name || `कस्टम स्थान (${lat.toFixed(2)}°, ${lon.toFixed(2)}°)`,
    state: params.state || "Custom Location",
    stateHi: params.stateHi || "कस्टम स्थान",
    country: params.country || "Custom",
    countryHi: params.countryHi || "कस्टम",
    latitude: lat,
    longitude: lon,
    elevationMeters: params.elevationMeters ?? 0,
    timeZone: params.timeZone || "Asia/Kolkata",
    isCustom: true,
  };
}

/**
 * Creates a valid CityConfig from device GPS coordinates.
 */
export function createGpsCity(params: {
  latitude: number;
  longitude: number;
  elevationMeters?: number;
  timeZone?: string;
  label?: string;
  labelHi?: string;
}): CityConfig {
  const lat = Math.round(params.latitude * 10000) / 10000;
  const lon = Math.round(params.longitude * 10000) / 10000;
  const id = `gps_${lat >= 0 ? "+" : ""}${lat.toFixed(4)}_${lon >= 0 ? "+" : ""}${lon.toFixed(4)}`;
  let tz = params.timeZone;
  if (!tz && typeof Intl !== "undefined") {
    tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  }
  return {
    id,
    name: params.label || `My GPS Location (${lat.toFixed(2)}°, ${lon.toFixed(2)}°)`,
    nameHi: params.labelHi || `मेरा जीपीएस स्थान (${lat.toFixed(2)}°, ${lon.toFixed(2)}°)`,
    state: "Device GPS",
    stateHi: "डिवाइस जीपीएस",
    country: "GPS",
    countryHi: "जीपीएस",
    latitude: lat,
    longitude: lon,
    elevationMeters: params.elevationMeters ?? 0,
    timeZone: tz || "Asia/Kolkata",
    isCustom: true,
  };
}

/**
 * Resolves a city by ID or custom ID.
 * Supports static IDs (e.g. "mumbai", "new-york"), aliases,
 * or custom dynamic coordinate IDs (e.g. "custom_+28.6139_+77.2090", "gps_+19.0760_+72.8777").
 */
export function getCityById(id?: string | null, customCities?: CityConfig[]): CityConfig {
  if (!id) return DEFAULT_CITY;
  const target = id.toLowerCase().trim();

  // 1. Check customCities array if passed
  if (customCities && customCities.length > 0) {
    const customMatch = customCities.find(
      (c) => c.id.toLowerCase() === target || c.name.toLowerCase() === target
    );
    if (customMatch) return customMatch;
  }

  // 2. Direct ID or Name match in built-in list
  const found = CITIES.find((c) => c.id.toLowerCase() === target || c.name.toLowerCase() === target);
  if (found) return found;

  // 3. Match aliases
  const aliasFound = CITIES.find((c) =>
    c.aliases?.some((a) => a.toLowerCase() === target)
  );
  if (aliasFound) return aliasFound;

  // 4. Handle dynamic custom / GPS ID format: (custom|gps)_LAT_LON
  if (target.startsWith("custom_") || target.startsWith("gps_")) {
    const parts = target.split("_");
    if (parts.length >= 3) {
      const lat = parseFloat(parts[1]);
      const lon = parseFloat(parts[2]);
      if (!isNaN(lat) && !isNaN(lon) && lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180) {
        return target.startsWith("gps_")
          ? createGpsCity({ latitude: lat, longitude: lon })
          : createCustomCity({ name: `Custom (${lat.toFixed(2)}°, ${lon.toFixed(2)}°)`, latitude: lat, longitude: lon });
      }
    }
  }

  return DEFAULT_CITY;
}

/**
 * Searches built-in comprehensive index with instant prefix & fuzzy match.
 */
export function searchCities(query: string, limit: number = 30): CityConfig[] {
  const q = query.toLowerCase().trim();
  if (!q) return CITIES.slice(0, limit);

  // Exact prefix matches first, then substring
  return CITIES.filter((c) => {
    return (
      c.name.toLowerCase().includes(q) ||
      c.nameHi.includes(q) ||
      c.state.toLowerCase().includes(q) ||
      (c.country && c.country.toLowerCase().includes(q)) ||
      c.aliases?.some((a) => a.toLowerCase().includes(q) || a.includes(q))
    );
  }).slice(0, limit);
}
