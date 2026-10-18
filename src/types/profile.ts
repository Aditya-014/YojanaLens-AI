export interface UserProfile {
  // Geographic
  state: string;
  residence: 'rural' | 'urban' | '';

  // Demographics
  age: number | null;
  gender: 'male' | 'female' | 'transgender' | 'other' | '';
  category: 'General' | 'OBC' | 'SC' | 'ST' | 'EWS' | '';
  maritalStatus: 'single' | 'married' | 'widowed' | 'divorced' | '';

  // Socio-economic & Education
  educationLevel: 'below_10th' | '10th_pass' | '12th_pass' | 'diploma' | 'graduate' | 'post_graduate' | 'other' | '';
  occupation:
    | 'farmer'
    | 'street_vendor'
    | 'artisan_craftsperson'
    | 'daily_wage_laborer'
    | 'unemployed'
    | 'student'
    | 'salaried_private'
    | 'salaried_govt'
    | 'self_employed_business'
    | 'other'
    | '';
  annualIncome: number | null;

  // Specific scheme conditions
  ownsCultivableLand: boolean | null;
  landHoldingHectares: number | null;
  isPregnantOrLactating: boolean | null;
  hasDisability: boolean | null;
  disabilityPercentage: number | null;
  hasExistingPuccaHouse: boolean | null;
  hasGirlChildUnder10: boolean | null;
  isMinority: boolean | null;
  isTraditionalCraftsperson: boolean | null;
  isEnrolledInSchoolOrCollege: boolean | null;
}

export const initialProfile: UserProfile = {
  state: '',
  residence: '',
  age: null,
  gender: '',
  category: '',
  maritalStatus: '',
  educationLevel: '',
  occupation: '',
  annualIncome: null,
  ownsCultivableLand: null,
  landHoldingHectares: null,
  isPregnantOrLactating: null,
  hasDisability: null,
  disabilityPercentage: null,
  hasExistingPuccaHouse: null,
  hasGirlChildUnder10: null,
  isMinority: null,
  isTraditionalCraftsperson: null,
  isEnrolledInSchoolOrCollege: null,
};

export interface FieldExplanation {
  field: keyof UserProfile;
  label: { en: string; hi: string };
  reason: { en: string; hi: string };
  sensitiveNotice: { en: string; hi: string };
}

export const PROFILE_FIELD_REASONS: Record<string, { en: string; hi: string; why: { en: string; hi: string } }> = {
  state: {
    en: 'State / Union Territory',
    hi: 'राज्य / केंद्र शासित प्रदेश',
    why: {
      en: 'Identifies whether central schemes apply in your region or if state-specific guidelines exist.',
      hi: 'यह निर्धारित करता है कि क्या केंद्रीय योजनाएं आपके क्षेत्र में लागू हैं या राज्य-विशिष्ट नियम हैं।',
    },
  },
  residence: {
    en: 'Area of Residence (Rural / Urban)',
    hi: 'निवास का क्षेत्र (ग्रामीण / शहरी)',
    why: {
      en: 'Many schemes like PMAY-Urban or PM SVANidhi are restricted to urban areas, while others cater to rural regions.',
      hi: 'पीएम आवास योजना (शहरी) या पीएम स्वनिधि जैसी योजनाएं शहरी क्षेत्रों के लिए हैं, जबकि कुछ ग्रामीण क्षेत्रों के लिए हैं।',
    },
  },
  age: {
    en: 'Age (in years)',
    hi: 'आयु (वर्षों में)',
    why: {
      en: 'Most welfare programs have statutory minimum or maximum age brackets (e.g. 18-40 for skills, 60+ for pensions).',
      hi: 'अधिकांश कल्याणकारी योजनाओं में न्यूनतम या अधिकतम आयु सीमा होती है (जैसे 60+ वृद्धावस्था पेंशन के लिए)।',
    },
  },
  gender: {
    en: 'Gender',
    hi: 'लिंग',
    why: {
      en: 'Certain schemes like PMMVY are exclusively designed for women or offer affirmative relaxation.',
      hi: 'मातृत्व वंदना योजना (PMMVY) जैसी योजनाएं विशेष रूप से महिलाओं के लिए हैं।',
    },
  },
  category: {
    en: 'Social Category / Caste',
    hi: 'सामाजिक वर्ग / जाति श्रेणी',
    why: {
      en: 'Used solely to evaluate eligibility for statutory reservations or affirmative financial assistance.',
      hi: 'केवल सांविधिक आरक्षण या लक्षित वित्तीय सहायता की पात्रता जांचने के लिए।',
    },
  },
  occupation: {
    en: 'Primary Occupation',
    hi: 'मुख्य व्यवसाय',
    why: {
      en: 'Directly maps to targeted livelihood schemes like PM-KISAN for farmers, PM SVANidhi for vendors, or PM Vishwakarma for artisans.',
      hi: 'किसानों के लिए पीएम-किसान, रेहड़ी-पटरी वालों के लिए स्वनिधि या कारीगरों के लिए विश्वकर्मा योजना से मिलान करता है।',
    },
  },
  annualIncome: {
    en: 'Annual Family Income (₹ INR)',
    hi: 'वार्षिक पारिवारिक आय (₹ रुपये)',
    why: {
      en: 'Government schemes have statutory income cutoffs (e.g. ₹2.5 Lakh for PM-JAY, ₹3 Lakh for PMAY-U EWS). We never collect tax returns or account numbers.',
      hi: 'सरकारी योजनाओं में अनिवार्य आय सीमाएं होती हैं (जैसे आयुष्मान भारत के लिए ₹2.5 लाख तक)। हम कोई संवेदनशील दस्तावेज नहीं मांगते।',
    },
  },
  ownsCultivableLand: {
    en: 'Land Ownership Status',
    hi: 'कृषि भूमि स्वामित्व स्थिति',
    why: {
      en: 'Required exclusively for PM-KISAN, which mandates ownership of cultivable agricultural land.',
      hi: 'विशेष रूप से पीएम-किसान योजना के लिए आवश्यक, जिसके लिए कृषियोग्य भूमि का स्वामित्व अनिवार्य है।',
    },
  },
  isPregnantOrLactating: {
    en: 'Maternal Status',
    hi: 'मातृत्व स्थिति',
    why: {
      en: 'Required strictly to determine eligibility for the Pradhan Mantri Matru Vandana Yojana (PMMVY).',
      hi: 'केवल प्रधानमंत्री मातृ वंदना योजना (PMMVY) की पात्रता जांचने के लिए आवश्यक।',
    },
  },
  hasDisability: {
    en: 'Persons with Disabilities (Divyangjan)',
    hi: 'दिव्यांगजन स्थिति',
    why: {
      en: 'Identifies eligibility for disability allowances, assistive aids, and special criteria relaxations.',
      hi: 'दिव्यांगता भत्ते, सहायक उपकरण और विशेष पात्रता छूट की पहचान के लिए।',
    },
  },
  hasExistingPuccaHouse: {
    en: 'Owns a Pucca House Anywhere in India',
    hi: 'क्या भारत में कहीं भी पक्का मकान है?',
    why: {
      en: 'PMAY-Urban statutory rules mandate that the beneficiary family must not own a pucca house in their name or family members’ names anywhere in India.',
      hi: 'पीएम आवास योजना के नियमानुसार लाभार्थी परिवार के पास देश में कहीं भी पक्का मकान नहीं होना चाहिए।',
    },
  },
  hasGirlChildUnder10: {
    en: 'Has Girl Child under 10 years of age',
    hi: 'क्या 10 वर्ष से कम आयु की बालिका है?',
    why: {
      en: 'Required exclusively for the Sukanya Samriddhi Yojana (SSY) savings account scheme.',
      hi: 'विशेष रूप से सुकन्या समृद्धि योजना (SSY) बचत खाते की पात्रता के लिए आवश्यक।',
    },
  },
};
