import { Scheme } from '../types/scheme.ts';

export const INDIAN_STATES_AND_UTS = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Lakshadweep',
  'Puducherry',
];

export const VERIFIED_SCHEMES: Scheme[] = [
  {
    id: 'pm-kisan',
    code: 'PMKISAN',
    name: {
      en: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
      hi: 'प्रधानमंत्री किसान सम्मान निधि (पीएम-किसान)',
    },
    shortName: 'PM-KISAN',
    administeringAuthority: {
      en: 'Department of Agriculture & Farmers Welfare',
      hi: 'कृषि एवं किसान कल्याण विभाग',
    },
    ministry: {
      en: 'Ministry of Agriculture and Farmers Welfare, Govt of India',
      hi: 'कृषि एवं किसान कल्याण मंत्रालय, भारत सरकार',
    },
    category: 'agriculture',
    officialPortalUrl: 'https://pmkisan.gov.in',
    officialApplicationUrl: 'https://pmkisan.gov.in/RegistrationFormNew.aspx',
    sourceCitation: 'PM-KISAN Operational Guidelines, Department of Agriculture and Farmers Welfare (Updated 2024-2025)',
    lastVerifiedDate: '2026-09-20',
    isVerified: true,
    verificationNotes: {
      en: 'Verified against official PM-KISAN portal guidelines. Landholding record (e-KYC and land seeding) is statutory requirement.',
      hi: 'आधिकारिक पीएम-किसान पोर्टल दिशानिर्देशों से सत्यापित। भूमि रिकॉर्ड और ई-केवाईसी अनिवार्य है।',
    },
    geographicAvailability: {
      type: 'pan_india',
      description: {
        en: 'All States and Union Territories across India (subject to state land records integration).',
        hi: 'भारत के सभी राज्यों और केंद्र शासित प्रदेशों में उपलब्ध।',
      },
    },
    overview: {
      en: 'A Central Sector Scheme providing income support of ₹6,000 per year in three equal 4-monthly instalments of ₹2,000 directly into the bank accounts of all landholding farmer families across India.',
      hi: 'सभी भूमिधारक किसान परिवारों को ₹6,000 प्रति वर्ष की आय सहायता, ₹2,000 की तीन समान किस्तों में सीधे बैंक खाते में प्रदान करने वाली केंद्रीय योजना।',
    },
    benefitsSummary: {
      en: '₹6,000 per annum credited directly via DBT in 3 equal instalments of ₹2,000 every 4 months.',
      hi: 'प्रत्येक 4 माह में ₹2,000 की 3 समान किस्तों में ₹6,000 प्रति वर्ष सीधे बैंक खाते में (डीबीटी)।',
      amount: '₹6,000 / year',
      periodicity: 'Quarterly / 4-monthly',
    },
    criteria: [
      {
        id: 'pmkisan_occupation',
        name: {
          en: 'Primary Occupation as Farmer',
          hi: 'मुख्य व्यवसाय किसान होना',
        },
        field: 'occupation',
        operator: 'EQUALS',
        expectedValue: 'farmer',
        requiredConditionDisplay: {
          en: 'Must be actively engaged in farming/agriculture as primary occupation',
          hi: 'मुख्य व्यवसाय के रूप में कृषि/खेती में संलग्न होना चाहिए',
        },
        evidenceSource: 'PM-KISAN Operational Guidelines Sec 2.1 (Definition of Farmer Family)',
        sourceUrl: 'https://pmkisan.gov.in',
        isMandatory: true,
      },
      {
        id: 'pmkisan_land',
        name: {
          en: 'Ownership of Cultivable Agricultural Land',
          hi: 'कृषियोग्य भूमि का स्वामित्व',
        },
        field: 'ownsCultivableLand',
        operator: 'BOOLEAN_TRUE',
        expectedValue: true,
        requiredConditionDisplay: {
          en: 'Must own cultivable agricultural land registered in land revenue records',
          hi: 'राजस्व रिकॉर्ड में पंजीकृत कृषियोग्य भूमि का स्वामित्व होना चाहिए',
        },
        evidenceSource: 'PM-KISAN Scheme Guidelines Cl. 2.1.2 & Land Seeding Mandate',
        sourceUrl: 'https://pmkisan.gov.in',
        isMandatory: true,
      },
      {
        id: 'pmkisan_exclusion_govt',
        name: {
          en: 'Not a Regular Government Employee / Institutional Landholder',
          hi: 'नियमित सरकारी कर्मचारी अथवा संस्थागत भूमिधारक नहीं होना',
        },
        field: 'occupation',
        operator: 'NOT_EQUALS',
        expectedValue: 'salaried_govt',
        requiredConditionDisplay: {
          en: 'Constitutional post holders and regular serving/retired govt employees are excluded under statutory exclusion criteria.',
          hi: 'संवैधानिक पद धारक तथा नियमित सरकारी कर्मचारी वैधानिक अपवर्जन श्रेणी में आते हैं।',
        },
        evidenceSource: 'PM-KISAN Operational Guidelines Sec 3 (Exclusion Categories)',
        sourceUrl: 'https://pmkisan.gov.in',
        isMandatory: true,
      },
    ],
    requiredDocuments: [
      {
        name: { en: 'Aadhaar Card with linked Mobile Number', hi: 'मोबाइल से जुड़ा आधार कार्ड' },
        mandatory: true,
        purpose: {
          en: 'Mandatory for Aadhaar-based OTP verification (e-KYC) and DBT payment routing.',
          hi: 'ई-केवाईसी और डीबीटी भुगतान के लिए अनिवार्य।',
        },
      },
      {
        name: { en: 'Land Ownership Document (Khatauni / RoR / 7/12 / Patta)', hi: 'भूमि स्वामित्व दस्तावेज (खतौनी / जमाबंदी)' },
        mandatory: true,
        purpose: {
          en: 'Proof that the applicant owns cultivable land registered in state revenue records.',
          hi: 'प्रमाण कि आवेदक के नाम पर राज्य राजस्व रिकॉर्ड में कृषियोग्य भूमि दर्ज है।',
        },
      },
      {
        name: { en: 'Bank Account Passbook (Aadhaar-Seeded)', hi: 'आधार से जुड़ा बैंक खाता पासबुक' },
        mandatory: true,
        purpose: {
          en: 'For Direct Benefit Transfer (DBT) verification into NPCI linked account.',
          hi: 'डीबीटी के माध्यम से सीधे खाते में राशि प्राप्त करने के लिए।',
        },
      },
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: { en: 'New Farmer Registration Online / CSC', hi: 'नया किसान पंजीकरण ऑनलाइन या सीएससी' },
        description: {
          en: 'Visit pmkisan.gov.in > Farmers Corner > New Farmer Registration. Enter Aadhaar number and select Rural or Urban Farmer.',
          hi: 'pmkisan.gov.in पर जाएं > फार्मर्स कॉर्नर > न्यू फार्मर रजिस्ट्रेशन पर क्लिक करें और आधार दर्ज करें।',
        },
        channel: 'online',
        portalUrl: 'https://pmkisan.gov.in/RegistrationFormNew.aspx',
      },
      {
        stepNumber: 2,
        title: { en: 'Complete Aadhaar OTP Authentication', hi: 'आधार ओटीपी प्रमाणीकरण' },
        description: {
          en: 'Authenticate through the OTP sent to your Aadhaar-registered mobile phone.',
          hi: 'आधार से जुड़े मोबाइल नंबर पर प्राप्त ओटीपी के माध्यम से सत्यापन पूरा करें।',
        },
        channel: 'online',
      },
      {
        stepNumber: 3,
        title: { en: 'Enter Land Survey & Khatauni Details', hi: 'खतौनी और भूमि विवरण दर्ज करें' },
        description: {
          en: 'Input district, sub-district, village, land record survey/khasra number, and upload scanned land documents.',
          hi: 'जिला, तहसील, गांव, खसरा/खाता संख्या और भूमि दस्तावेज अपलोड करें।',
        },
        channel: 'online',
      },
      {
        stepNumber: 4,
        title: { en: 'State Nodal Verification & Beneficiary Approval', hi: 'राज्य नोडल सत्यापन व अनुमोदन' },
        description: {
          en: 'Local Revenue Patwari/Lekhpal verifies land ownership, followed by District & State Level approval.',
          hi: 'स्थानीय लेखपाल/पटवारी द्वारा भूमि सत्यापन के पश्चात जिला स्तर पर स्वीकृति प्रदान की जाती है।',
        },
        channel: 'government_office',
      },
    ],
    faqs: [
      {
        question: {
          en: 'Can tenant farmers or agricultural laborers without land get PM-KISAN benefits?',
          hi: 'क्या बिना भूमि वाले बटाईदार या कृषि मजदूर पीएम-किसान का लाभ ले सकते हैं?',
        },
        answer: {
          en: 'No. The statutory scheme rules strictly require ownership of cultivable agricultural land registered in the revenue record in the farmer’s own name.',
          hi: 'नहीं। योजना के वैधानिक नियमों के अनुसार किसान के स्वयं के नाम पर राजस्व रिकॉर्ड में कृषियोग्य भूमि का स्वामित्व अनिवार्य है।',
        },
        officialSourceNote: 'PM-KISAN Operational Guidelines Sec 2.1',
      },
      {
        question: {
          en: 'Is e-KYC mandatory to receive PM-KISAN instalments?',
          hi: 'क्या पीएम-किसान की किस्त पाने के लिए ई-केवाईसी अनिवार्य है?',
        },
        answer: {
          en: 'Yes. The Ministry has mandated 100% Aadhaar-based OTP e-KYC or biometric e-KYC at CSC centers for all active beneficiaries.',
          hi: 'हाँ। मंत्रालय ने सभी सक्रिय लाभार्थियों के लिए आधार आधारित ओटीपी ई-केवाईसी या बायोमेट्रिक ई-केवाईसी अनिवार्य किया है।',
        },
        officialSourceNote: 'Department of Agriculture Notification on e-KYC compliance',
      },
    ],
  },
  {
    id: 'pm-svanidhi',
    code: 'PMSVANIDHI',
    name: {
      en: "PM Street Vendor's AtmaNirbhar Nidhi (PM SVANidhi)",
      hi: 'पीएम स्ट्रीट वेंडर्स आत्मनिर्भर निधि (पीएम स्वनिधि)',
    },
    shortName: 'PM SVANidhi',
    administeringAuthority: {
      en: 'Urban Livelihoods Division',
      hi: 'शहरी आजीविका प्रभाग',
    },
    ministry: {
      en: 'Ministry of Housing and Urban Affairs (MoHUA), Govt of India',
      hi: 'आवासन और शहरी कार्य मंत्रालय, भारत सरकार',
    },
    category: 'livelihood',
    officialPortalUrl: 'https://pmsvanidhi.mohua.gov.in',
    officialApplicationUrl: 'https://pmsvanidhi.mohua.gov.in/Home/VendorLetter',
    sourceCitation: 'PM SVANidhi Scheme Guidelines, Ministry of Housing and Urban Affairs (MoHUA), 2024',
    lastVerifiedDate: '2026-09-18',
    isVerified: true,
    verificationNotes: {
      en: 'Verified via MoHUA official portal. Working capital loan tranches: ₹10k, ₹20k, ₹50k with 7% interest subsidy and cashback on digital transactions.',
      hi: 'आवासन और शहरी कार्य मंत्रालय से सत्यापित। ₹10,000, ₹20,000 और ₹50,000 का संपार्श्विक-मुक्त ऋण, 7% ब्याज सब्सिडी के साथ।',
    },
    geographicAvailability: {
      type: 'pan_india',
      description: {
        en: 'Available across all statutory Urban Local Bodies (ULBs) and surrounding peri-urban areas in India.',
        hi: 'भारत के सभी वैधानिक शहरी स्थानीय निकायों (ULBs) और आसपास के उप-शहरी क्षेत्रों में उपलब्ध।',
      },
    },
    overview: {
      en: 'A Central Sector Scheme to facilitate affordable collateral-free working capital micro-loans to urban street vendors, hawkers, thelawalas, and service providers to resume and grow their livelihoods.',
      hi: 'शहरी रेहड़ी-पटरी वालों, ठेले वालों और फेरीवालों को अपनी आजीविका चलाने के लिए किफायती संपार्श्विक-मुक्त कार्यशील पूंजी ऋण प्रदान करने की केंद्रीय योजना।',
    },
    benefitsSummary: {
      en: 'Collateral-free working capital loan: 1st tranche ₹10,000 (1 yr), 2nd tranche ₹20,000, 3rd tranche ₹50,000. 7% interest subsidy credited directly to account + up to ₹1,200 annual digital cashback.',
      hi: 'संपार्श्विक-मुक्त ऋण: प्रथम किस्त ₹10,000 (1 वर्ष), द्वितीय ₹20,000, तृतीय ₹50,000। 7% ब्याज सब्सिडी और ₹1,200 तक डिजिटल लेनदेन कैशबैक।',
      amount: 'Up to ₹50,000',
      periodicity: 'Graduated Loan Tranches',
    },
    criteria: [
      {
        id: 'pmsvanidhi_occupation',
        name: {
          en: 'Vendor / Hawking Occupation',
          hi: 'रेहड़ी-पटरी / फेरी व्यवसाय',
        },
        field: 'occupation',
        operator: 'EQUALS',
        expectedValue: 'street_vendor',
        requiredConditionDisplay: {
          en: 'Must be actively vending goods or services on streets, pavements, or public spaces',
          hi: 'सड़क, फुटपाथ या सार्वजनिक स्थानों पर सामान अथवा सेवाएं बेचने में सक्रिय होना चाहिए',
        },
        evidenceSource: 'PM SVANidhi Guidelines Cl 3.1',
        sourceUrl: 'https://pmsvanidhi.mohua.gov.in',
        isMandatory: true,
      },
      {
        id: 'pmsvanidhi_residence',
        name: {
          en: 'Urban / Peri-Urban Location',
          hi: 'शहरी या उप-शहरी क्षेत्र में निवास/दुकान',
        },
        field: 'residence',
        operator: 'EQUALS',
        expectedValue: 'urban',
        requiredConditionDisplay: {
          en: 'Vending activity must be located in an Urban Local Body (ULB) jurisdiction',
          hi: 'दुकान या फेरी कार्य किसी शहरी स्थानीय निकाय (नगर पालिका/नगर निगम) सीमा में होना चाहिए',
        },
        evidenceSource: 'PM SVANidhi Scheme Scope Cl 2.0',
        sourceUrl: 'https://pmsvanidhi.mohua.gov.in',
        isMandatory: true,
      },
      {
        id: 'pmsvanidhi_age',
        name: {
          en: 'Minimum Age 18 Years',
          hi: 'न्यूनतम आयु 18 वर्ष',
        },
        field: 'age',
        operator: 'GREATER_THAN_OR_EQUAL',
        expectedValue: 18,
        requiredConditionDisplay: {
          en: 'Applicant must be at least 18 years old to contract a bank credit facility',
          hi: 'बैंक ऋण संविदा के लिए आवेदक की न्यूनतम आयु 18 वर्ष होनी चाहिए',
        },
        evidenceSource: 'Banking Regulations & Lending Institutions Norms under PM SVANidhi',
        sourceUrl: 'https://pmsvanidhi.mohua.gov.in',
        isMandatory: true,
      },
    ],
    requiredDocuments: [
      {
        name: { en: 'Certificate of Vending (CoV) / Identity Card or Letter of Recommendation (LoR)', hi: 'विक्रय प्रमाण पत्र (CoV) अथवा नगर निकाय से सिफारिश पत्र (LoR)' },
        mandatory: true,
        purpose: {
          en: 'Issued by Urban Local Body (ULB) / Town Vending Committee (TVC) verifying street vendor status.',
          hi: 'शहरी स्थानीय निकाय द्वारा जारी विक्रेता पहचान पत्र या सिफारिश पत्र।',
        },
      },
      {
        name: { en: 'Aadhaar Card', hi: 'आधार कार्ड' },
        mandatory: true,
        purpose: {
          en: 'For biometric/OTP identity authentication and DBT subsidy linking.',
          hi: 'पहचान सत्यापन एवं ब्याज सब्सिडी सीधे प्राप्त करने हेतु।',
        },
      },
      {
        name: { en: 'Active Savings Bank Account Details', hi: 'सक्रिय बचत बैंक खाता विवरण' },
        mandatory: true,
        purpose: {
          en: 'For loan disbursal and receiving 7% annual interest subsidy.',
          hi: 'ऋण राशि प्राप्त करने और 7% ब्याज सब्सिडी जमा कराने के लिए।',
        },
      },
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: { en: 'Check Vending Status / Apply for LoR', hi: 'विक्रेता स्थिति जांचें या LoR प्राप्त करें' },
        description: {
          en: 'Search your name in the ULB street vendor survey list on pmsvanidhi.mohua.gov.in. If not surveyed, apply for a Letter of Recommendation (LoR) from your local Municipality.',
          hi: 'पोर्टल पर नगर निकाय सर्वे सूची में अपना नाम खोजें। यदि नाम नहीं है, तो नगर पालिका से सिफारिश पत्र (LoR) लें।',
        },
        channel: 'online',
        portalUrl: 'https://pmsvanidhi.mohua.gov.in/Home/VendorLetter',
      },
      {
        stepNumber: 2,
        title: { en: 'Submit Online Application on SVANidhi Portal or CSC', hi: 'पोर्टल या सीएससी पर आवेदन जमा करें' },
        description: {
          en: 'Fill online form with Aadhaar, upload CoV/LoR, and choose your preferred lending bank.',
          hi: 'आधार से लॉगिन कर CoV/LoR अपलोड करें और अपनी पसंद का बैंक चुनें।',
        },
        channel: 'online',
      },
      {
        stepNumber: 3,
        title: { en: 'Lender Processing & Collateral-Free Sanction', hi: 'बैंक सत्यापन और ऋण स्वीकृति' },
        description: {
          en: 'The chosen bank/microfinance institution reviews the application without asking for any collateral guarantee.',
          hi: 'बैंक बिना किसी गारंटी या संपार्श्विक के आवेदन की समीक्षा कर ऋण स्वीकृत करता है।',
        },
        channel: 'bank',
      },
      {
        stepNumber: 4,
        title: { en: 'Digital Adoption & Cashback Incentive', hi: 'डिजिटल भुगतान और कैशबैक' },
        description: {
          en: 'Obtain QR code from bank/UPI provider for digital collections and earn up to ₹100 per month cashback.',
          hi: 'बैंक से क्यूआर कोड प्राप्त करें और डिजिटल लेन-देन पर प्रति माह ₹100 तक कैशबैक पाएं।',
        },
        channel: 'online',
      },
    ],
    faqs: [
      {
        question: {
          en: 'Do I need any collateral or guarantor for PM SVANidhi loans?',
          hi: 'क्या पीएम स्वनिधि ऋण के लिए किसी गारंटी या संपार्श्विक की आवश्यकता है?',
        },
        answer: {
          en: 'No collateral or third-party guarantee is required. The Credit Guarantee Fund Trust for Micro and Small Enterprises (CGTMSE) provides credit guarantee coverage to banks.',
          hi: 'नहीं, किसी गारंटी की आवश्यकता नहीं है। सीजीटीएमएसई द्वारा बैंकों को ऋण गारंटी प्रदान की जाती है।',
        },
        officialSourceNote: 'MoHUA Scheme Operational Guidelines Section 4',
      },
    ],
  },
  {
    id: 'ayushman-bharat-pmjay',
    code: 'PMJAY',
    name: {
      en: 'Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana (AB-PMJAY)',
      hi: 'आयुष्मान भारत - प्रधानमंत्री जन आरोग्य योजना (पीएम-जय)',
    },
    shortName: 'AB PM-JAY',
    administeringAuthority: {
      en: 'National Health Authority (NHA)',
      hi: 'राष्ट्रीय स्वास्थ्य प्राधिकरण (एनएचए)',
    },
    ministry: {
      en: 'Ministry of Health and Family Welfare, Govt of India',
      hi: 'स्वास्थ्य एवं परिवार कल्याण मंत्रालय, भारत सरकार',
    },
    category: 'health',
    officialPortalUrl: 'https://pmjay.gov.in',
    officialApplicationUrl: 'https://beneficiary.nha.gov.in',
    sourceCitation: 'National Health Authority Operational Guidelines for AB-PMJAY & Senior Citizens Coverage Notification 2024',
    lastVerifiedDate: '2026-09-25',
    isVerified: true,
    verificationNotes: {
      en: 'Verified via National Health Authority (NHA). Features ₹5 Lakh cashless hospitalisation per family/year. Expanded in 2024 to include all citizens aged 70+ irrespective of income.',
      hi: 'एनएचए से सत्यापित। प्रति परिवार प्रति वर्ष ₹5 लाख तक का कैशलेस अस्पताल इलाज। 70 वर्ष से अधिक आयु के सभी नागरिकों के लिए भी विस्तारित।',
    },
    geographicAvailability: {
      type: 'pan_india',
      description: {
        en: 'Active in 33+ States and Union Territories across India adhering to the NHA National Portability framework.',
        hi: 'राष्ट्रीय पोर्टेबिलिटी के साथ भारत के अधिकांश राज्यों और केंद्र शासित प्रदेशों में लागू।',
      },
    },
    overview: {
      en: 'World’s largest government-funded health assurance scheme, offering ₹5 Lakh cashless and paperless secondary and tertiary hospitalisation care per family per year across empaneled public and private hospitals.',
      hi: 'विश्व की सबसे बड़ी सरकारी स्वास्थ्य बीमा योजना, जो पात्र परिवारों को संबद्ध सरकारी और निजी अस्पतालों में प्रति वर्ष ₹5 लाख तक का कैशलेस इलाज प्रदान करती है।',
    },
    benefitsSummary: {
      en: '₹5,00,000 per family per year for secondary and tertiary inpatient hospitalization. Covers pre-existing diseases, diagnostics, medicines, ICU, surgeries, and 15 days post-hospitalisation follow-up.',
      hi: 'द्वितीयक और तृतीयक अस्पताल में भर्ती के लिए प्रति परिवार प्रति वर्ष ₹5,00,000 तक का कैशलेस इलाज।',
      amount: '₹5,00,000 / family / year',
      periodicity: 'Annual Renewable Health Cover',
    },
    criteria: [
      {
        id: 'pmjay_income_or_senior',
        name: {
          en: 'SECC Deprivation / Low Income Family (or Senior Citizen 70+)',
          hi: 'आर्थिक रूप से कमजोर परिवार (या 70+ वरिष्ठ नागरिक)',
        },
        field: 'annualIncome',
        operator: 'LESS_THAN_OR_EQUAL',
        expectedValue: 250000,
        requiredConditionDisplay: {
          en: 'Annual family income under ₹2,50,000 OR family identified in SECC 2011 deprivation criteria (Note: All senior citizens aged 70+ qualify automatically under new 2024 expansion)',
          hi: 'वार्षिक पारिवारिक आय ₹2,50,000 के भीतर अथवा SECC सूची में नाम (70+ आयु के सभी वरिष्ठ नागरिक स्वतः पात्र)',
        },
        evidenceSource: 'NHA Beneficiary Identification Criteria & AB-PMJAY Expansion Guidelines',
        sourceUrl: 'https://beneficiary.nha.gov.in',
        isMandatory: true,
      },
      {
        id: 'pmjay_not_govt_regular',
        name: {
          en: 'Not covered under CGHS / ESIC / Regular Govt Health Scheme',
          hi: 'सीजीएचएस या नियमित सरकारी स्वास्थ्य योजना का लाभार्थी न होना',
        },
        field: 'occupation',
        operator: 'NOT_EQUALS',
        expectedValue: 'salaried_govt',
        requiredConditionDisplay: {
          en: 'Regular government employees having CGHS or organized sector employees having ESIC cannot dual-claim AB-PMJAY',
          hi: 'सीजीएचएस या ईएसआईसी के अंतर्गत कवर्ड नियमित कर्मचारी पीएम-जय का दोहरा लाभ नहीं ले सकते',
        },
        evidenceSource: 'AB-PMJAY Convergence & Exclusion Rules',
        sourceUrl: 'https://pmjay.gov.in',
        isMandatory: false,
      },
    ],
    requiredDocuments: [
      {
        name: { en: 'Aadhaar Card', hi: 'आधार कार्ड' },
        mandatory: true,
        purpose: {
          en: 'Mandatory for beneficiary e-KYC and digital Ayushman card creation.',
          hi: 'ई-केवाईसी और डिजिटल आयुष्मान कार्ड बनाने के लिए।',
        },
      },
      {
        name: { en: 'Ration Card / NFSA Card / Family ID', hi: 'राशन कार्ड / परिवार पहचान पत्र' },
        mandatory: true,
        purpose: {
          en: 'Proof of family composition to link family members on the same ₹5 Lakh cover.',
          hi: 'परिवार के सदस्यों को एक ही ₹5 लाख स्वास्थ्य कवर से जोड़ने हेतु।',
        },
      },
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: { en: 'Check Eligibility on Beneficiary Portal', hi: 'लाभार्थी पोर्टल पर पात्रता जांचें' },
        description: {
          en: 'Visit beneficiary.nha.gov.in, enter your mobile number and search by Aadhaar or Ration Card number.',
          hi: 'beneficiary.nha.gov.in पर जाएं, मोबाइल नंबर दर्ज करें और आधार अथवा राशन कार्ड संख्या से खोजें।',
        },
        channel: 'online',
        portalUrl: 'https://beneficiary.nha.gov.in',
      },
      {
        stepNumber: 2,
        title: { en: 'Complete e-KYC Verification', hi: 'ई-केवाईसी पूरा करें' },
        description: {
          en: 'Authenticate using Aadhaar OTP, IRIS, or fingerprint, and capture a live photograph.',
          hi: 'आधार ओटीपी अथवा बायोमेट्रिक के माध्यम से सत्यापन करें और फोटो लें।',
        },
        channel: 'online',
      },
      {
        stepNumber: 3,
        title: { en: 'Download Ayushman Card (Golden Card)', hi: 'आयुष्मान कार्ड डाउनलोड करें' },
        description: {
          en: 'Once verified, download your PVC-compatible digital Ayushman Card carrying your unique ABHA ID.',
          hi: 'सत्यापन के बाद अपना विशिष्ट आयुष्मान कार्ड डाउनलोड करें।',
        },
        channel: 'online',
      },
      {
        stepNumber: 4,
        title: { en: 'Show Card at Empaneled Hospital Ayushman Mitra Desk', hi: 'अस्पताल में आयुष्मान मित्र काउंटर पर दिखाएं' },
        description: {
          en: 'Present your Ayushman Card at any empaneled hospital nationwide to receive 100% cashless hospitalization.',
          hi: 'कैशलेस इलाज के लिए किसी भी संबद्ध अस्पताल के आयुष्मान मित्र काउंटर पर कार्ड प्रस्तुत करें।',
        },
        channel: 'government_office',
      },
    ],
    faqs: [
      {
        question: {
          en: 'Is there any family cap or restriction on family size under PM-JAY?',
          hi: 'क्या पीएम-जय के तहत परिवार के आकार पर कोई सीमा है?',
        },
        answer: {
          en: 'No. There is no cap on family size or age of members. All eligible family members are covered under the single ₹5 Lakh pooled annual cover.',
          hi: 'नहीं। परिवार के आकार या सदस्यों की संख्या पर कोई प्रतिबंध नहीं है। सभी सदस्य ₹5 लाख के साझा कवर में शामिल हैं।',
        },
        officialSourceNote: 'NHA FAQ on Family Unit Size',
      },
    ],
  },
  {
    id: 'pm-matru-vandana-pmmvy',
    code: 'PMMVY',
    name: {
      en: 'Pradhan Mantri Matru Vandana Yojana (PMMVY)',
      hi: 'प्रधानमंत्री मातृ वंदना योजना (पीएमएमवीवाई)',
    },
    shortName: 'PMMVY',
    administeringAuthority: {
      en: 'Child Development Services Division',
      hi: 'बाल विकास सेवा प्रभाग',
    },
    ministry: {
      en: 'Ministry of Women and Child Development, Govt of India',
      hi: 'महिला एवं बाल विकास मंत्रालय, भारत सरकार',
    },
    category: 'women_child',
    officialPortalUrl: 'https://pmmvy.wcd.gov.in',
    officialApplicationUrl: 'https://pmmvy.wcd.gov.in/Citizen/Registration',
    sourceCitation: 'Mission Shakti Guidelines - PMMVY Component (2024-2025 Revision), Ministry of Women and Child Development',
    lastVerifiedDate: '2026-09-22',
    isVerified: true,
    verificationNotes: {
      en: 'Verified via MoWCD Mission Shakti manual. Provides ₹5,000 for first child in 2 installments, and ₹6,000 in single installment for second child if girl child.',
      hi: 'महिला एवं बाल विकास मंत्रालय के मिशन शक्ति दिशानिर्देशों से सत्यापित। पहले बच्चे पर ₹5,000 तथा दूसरे बच्चे के बालिका होने पर ₹6,000 की सहायता।',
    },
    geographicAvailability: {
      type: 'pan_india',
      description: {
        en: 'Operational across all districts of all States and Union Territories in India.',
        hi: 'भारत के सभी राज्यों और केंद्र शासित प्रदेशों के सभी जिलों में लागू।',
      },
    },
    overview: {
      en: 'A Direct Benefit Transfer (DBT) scheme providing conditional cash maternity incentives to pregnant women and lactating mothers for wage loss compensation, safe institutional delivery, and nutritional support.',
      hi: 'गर्भवती महिलाओं और स्तनपान कराने वाली माताओं को मजदूरी के नुकसान की भरपाई, संस्थागत प्रसव और पोषण सुधार हेतु प्रत्यक्ष लाभ अंतरण (DBT) योजना।',
    },
    benefitsSummary: {
      en: 'First child: ₹5,000 in two instalments (₹3,000 on early registration + 1 ANC, ₹2,000 on birth registration & 1st cycle vaccination). Second child: ₹6,000 in one instalment if the newborn is a girl child.',
      hi: 'प्रथम बच्चे हेतु ₹5,000 (दो किस्तों में: ₹3,000 व ₹2,000)। द्वितीय बच्चा यदि बालिका हो, तो ₹6,000 एकमुश्त सहायता।',
      amount: 'Up to ₹6,000',
      periodicity: 'Milestone-based Instalments',
    },
    criteria: [
      {
        id: 'pmmvy_gender',
        name: {
          en: 'Gender Must Be Female',
          hi: 'लिंग महिला होना अनिवार्य',
        },
        field: 'gender',
        operator: 'EQUALS',
        expectedValue: 'female',
        requiredConditionDisplay: {
          en: 'Scheme is exclusively applicable to pregnant women and lactating mothers',
          hi: 'योजना केवल गर्भवती महिलाओं और धात्री माताओं के लिए है',
        },
        evidenceSource: 'PMMVY Revised Scheme Guidelines Sec 3.1',
        sourceUrl: 'https://pmmvy.wcd.gov.in',
        isMandatory: true,
      },
      {
        id: 'pmmvy_age',
        name: {
          en: 'Minimum Age 19 Years',
          hi: 'न्यूनतम आयु 19 वर्ष',
        },
        field: 'age',
        operator: 'GREATER_THAN_OR_EQUAL',
        expectedValue: 19,
        requiredConditionDisplay: {
          en: 'Beneficiary must be 19 years of age or older at the time of pregnancy registration',
          hi: 'गर्भावस्था पंजीकरण के समय महिला की आयु 19 वर्ष या उससे अधिक होनी चाहिए',
        },
        evidenceSource: 'Prohibition of Child Marriage Act alignment in PMMVY Guidelines',
        sourceUrl: 'https://pmmvy.wcd.gov.in',
        isMandatory: true,
      },
      {
        id: 'pmmvy_maternal_status',
        name: {
          en: 'Currently Pregnant or Lactating Mother',
          hi: 'वर्तमान में गर्भवती या स्तनपान कराने वाली माता',
        },
        field: 'isPregnantOrLactating',
        operator: 'BOOLEAN_TRUE',
        expectedValue: true,
        requiredConditionDisplay: {
          en: 'Must be an expectant mother or mother of a child under statutory milestone limits',
          hi: 'गर्भवती अथवा निर्धारित आयु सीमा के भीतर नवजात शिशु की माता होना चाहिए',
        },
        evidenceSource: 'PMMVY Guidelines Sec 4.0 (Eligibility and Beneficiary Verification)',
        sourceUrl: 'https://pmmvy.wcd.gov.in',
        isMandatory: true,
      },
      {
        id: 'pmmvy_not_govt_employee',
        name: {
          en: 'Not a Regular Employee of Central / State Govt / PSU',
          hi: 'केंद्र/राज्य सरकार अथवा सार्वजनिक उपक्रम की नियमित कर्मचारी न होना',
        },
        field: 'occupation',
        operator: 'NOT_EQUALS',
        expectedValue: 'salaried_govt',
        requiredConditionDisplay: {
          en: 'Women who are in regular employment with Central/State Govt or PSUs receiving paid maternity leave are legally excluded.',
          hi: 'सरकारी या पीएसयू सेवा में सवेतन मातृत्व अवकाश पाने वाली महिलाएं इस योजना के तहत अपवर्जित हैं।',
        },
        evidenceSource: 'PMMVY Exclusion Criteria Sec 3.2',
        sourceUrl: 'https://pmmvy.wcd.gov.in',
        isMandatory: true,
      },
    ],
    requiredDocuments: [
      {
        name: { en: 'Mother and Child Protection (MCP) Card', hi: 'मातृ एवं शिशु संरक्षण (एमसीपी) कार्ड' },
        mandatory: true,
        purpose: {
          en: 'Issued by Anganwadi / Health Center recording LMP date and Antenatal Care (ANC) checks.',
          hi: 'आंगनवाड़ी या प्राथमिक स्वास्थ्य केंद्र द्वारा जारी टीकाकरण व जांच कार्ड।',
        },
      },
      {
        name: { en: 'Aadhaar Card of the Mother and Husband', hi: 'माता और पति का आधार कार्ड' },
        mandatory: true,
        purpose: {
          en: 'For biometric identification and DBT beneficiary registration.',
          hi: 'पहचान और डीबीटी खाते के सत्यापन हेतु।',
        },
      },
      {
        name: { en: 'Mother’s Own Bank / Post Office Account Passbook', hi: 'माता का स्वयं का बैंक / डाकघर खाता पासबुक' },
        mandatory: true,
        purpose: {
          en: 'Payment is routed strictly to the mother’s individual bank account (not joint account).',
          hi: 'राशि केवल माता के व्यक्तिगत खाते में भेजी जाती है।',
        },
      },
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: { en: 'Register at Local Anganwadi / ASHA / Online Portal', hi: 'आंगनवाड़ी, आशा या ऑनलाइन पोर्टल पर पंजीकरण' },
        description: {
          en: 'Register pregnancy at local Anganwadi Center (AWC) or self-register on pmmvy.wcd.gov.in within 570 days of LMP.',
          hi: 'एलएमपी के 570 दिनों के भीतर स्थानीय आंगनवाड़ी केंद्र पर पंजीकरण कराएं अथवा पोर्टल पर स्वयं आवेदन करें।',
        },
        channel: 'online',
        portalUrl: 'https://pmmvy.wcd.gov.in',
      },
      {
        stepNumber: 2,
        title: { en: 'First Instalment Verification (₹3,000)', hi: 'प्रथम किस्त सत्यापन (₹3,000)' },
        description: {
          en: 'Claimed on early registration of pregnancy and at least one Ante-Natal Check-up (ANC).',
          hi: 'गर्भावस्था के शीघ्र पंजीकरण और कम से कम एक प्रसव पूर्व जांच (ANC) पर उपलब्ध।',
        },
        channel: 'csc',
      },
      {
        stepNumber: 3,
        title: { en: 'Second Instalment on Child Birth & Vaccination (₹2,000 / ₹6,000)', hi: 'द्वितीय किस्त - शिशु जन्म व टीकाकरण पर' },
        description: {
          en: 'Claimed on institutional birth registration and primary immunization cycle completion (BCG, OPV, DPT, Hepatitis B).',
          hi: 'संस्थागत प्रसव पंजीकरण और प्रथम चक्र के संपूर्ण टीकाकरण के बाद देय।',
        },
        channel: 'csc',
      },
    ],
    faqs: [
      {
        question: {
          en: 'Can the payment be credited to the husband’s bank account?',
          hi: 'क्या यह राशि पति के बैंक खाते में जमा हो सकती है?',
        },
        answer: {
          en: 'No. The funds must be transferred strictly into the individual savings bank or post office account of the pregnant woman/mother.',
          hi: 'नहीं। नियमानुसार राशि केवल लाभार्थी महिला के व्यक्तिगत बैंक खाते में ही ट्रांसफर की जा सकती है।',
        },
        officialSourceNote: 'MoWCD DBT Directives for Mission Shakti',
      },
    ],
  },
  {
    id: 'pm-vishwakarma',
    code: 'PMVISHWAKARMA',
    name: {
      en: 'PM Vishwakarma Scheme',
      hi: 'पीएम विश्वकर्मा योजना',
    },
    shortName: 'PM Vishwakarma',
    administeringAuthority: {
      en: 'Development Commissioner (MSME)',
      hi: 'विकास आयुक्त (एमएसएमई)',
    },
    ministry: {
      en: 'Ministry of Micro, Small and Medium Enterprises (MoMSME), Govt of India',
      hi: 'सूक्ष्म, लघु और मध्यम उद्यम मंत्रालय, भारत सरकार',
    },
    category: 'livelihood',
    officialPortalUrl: 'https://pmvishwakarma.gov.in',
    officialApplicationUrl: 'https://pmvishwakarma.gov.in',
    sourceCitation: 'PM Vishwakarma Scheme Guidelines, Ministry of MSME, Ministry of Skill Development, Ministry of Finance (2023-2024)',
    lastVerifiedDate: '2026-09-15',
    isVerified: true,
    verificationNotes: {
      en: 'Verified via MoMSME official notification. Covers 18 traditional trades including Carpenter, Blacksmith, Potter, Mason, Tailor, Cobbler, Barber, Washerman.',
      hi: 'एमएसएमई मंत्रालय से सत्यापित। बढ़ई, लोहार, कुम्हार, राजमिस्त्री, दर्जी, मोची सहित 18 पारंपरिक शिल्पों को मान्यता और वित्तीय संबल।',
    },
    geographicAvailability: {
      type: 'pan_india',
      description: {
        en: 'Available across all rural and urban areas in all States and Union Territories.',
        hi: 'भारत के सभी राज्यों और केंद्र शासित प्रदेशों के ग्रामीण व शहरी दोनों क्षेत्रों में उपलब्ध।',
      },
    },
    overview: {
      en: 'A Central Sector Scheme to recognize, support, and skill traditional artisans and craftspeople working with their hands and tools across 18 notified heritage trades with PM Vishwakarma Certificate, ID, modern toolkit incentive of ₹15,000, and subsidized collateral-free enterprise credit up to ₹3 Lakh.',
      hi: 'हाथ और औजारों से काम करने वाले 18 पारंपरिक शिल्पों के कारीगरों को पहचान पत्र, ₹15,000 का टूलकिट प्रोत्साहन, कौशल प्रशिक्षण और ₹3 लाख तक का रियायती ऋण देने वाली योजना।',
    },
    benefitsSummary: {
      en: 'Recognition as Vishwakarma with Certificate & ID card. ₹15,000 e-voucher for modern toolkits. Basic & Advanced skill training with ₹500/day stipend. Collateral-free credit: Tranche 1: ₹1,00,000 (18 mo) @ 5% interest subvention; Tranche 2: ₹2,00,000 (30 mo).',
      hi: 'प्रमाण पत्र एवं पहचान पत्र। आधुनिक टूलकिट हेतु ₹15,000 का ई-वाउचर। प्रशिक्षण के दौरान ₹500 प्रतिदिन मानदेय। 5% रियायती ब्याज दर पर ₹3 लाख तक का संपार्श्विक-मुक्त ऋण।',
      amount: '₹15,000 Toolkit + ₹3 Lakh Loan',
      periodicity: 'Grant & Staged Enterprise Credit',
    },
    criteria: [
      {
        id: 'pmvishwakarma_occupation',
        name: {
          en: 'Artisan / Traditional Craftsperson in 18 Notified Trades',
          hi: '18 अधिसूचित शिल्पों में पारंपरिक कारीगर/दस्तकार',
        },
        field: 'occupation',
        operator: 'EQUALS',
        expectedValue: 'artisan_craftsperson',
        requiredConditionDisplay: {
          en: 'Must work as a traditional artisan or craftsperson using hands/tools in one of the 18 notified family-based trades (Carpenter, Blacksmith, Potter, Mason, Tailor, Cobbler, etc.)',
          hi: 'हाथों और औजारों से 18 अधिसूचित शिल्पों (जैसे बढ़ई, लोहार, कुम्हार, राजमिस्त्री, दर्जी, मोची आदि) में कार्यरत होना चाहिए',
        },
        evidenceSource: 'PM Vishwakarma Operational Guidelines Annexure 1 (List of 18 Trades)',
        sourceUrl: 'https://pmvishwakarma.gov.in',
        isMandatory: true,
      },
      {
        id: 'pmvishwakarma_age',
        name: {
          en: 'Minimum Age 18 Years',
          hi: 'न्यूनतम आयु 18 वर्ष',
        },
        field: 'age',
        operator: 'GREATER_THAN_OR_EQUAL',
        expectedValue: 18,
        requiredConditionDisplay: {
          en: 'The artisan must be at least 18 years old on the date of application',
          hi: 'आवेदन की तिथि पर कारीगर की न्यूनतम आयु 18 वर्ष होनी चाहिए',
        },
        evidenceSource: 'PM Vishwakarma Eligibility Norms Cl 3.1',
        sourceUrl: 'https://pmvishwakarma.gov.in',
        isMandatory: true,
      },
      {
        id: 'pmvishwakarma_one_per_family',
        name: {
          en: 'One Beneficiary Per Family Rule',
          hi: 'प्रति परिवार एक लाभार्थी का नियम',
        },
        field: 'occupation',
        operator: 'NOT_EQUALS',
        expectedValue: 'salaried_govt',
        requiredConditionDisplay: {
          en: 'The applicant or their family members should not be in government service, and only one member per family can receive scheme benefits.',
          hi: 'परिवार का कोई सदस्य सरकारी सेवा में नहीं होना चाहिए तथा प्रति परिवार एक सदस्य ही लाभ ले सकता है।',
        },
        evidenceSource: 'PM Vishwakarma Operational Guidelines Cl 3.3 & 3.4',
        sourceUrl: 'https://pmvishwakarma.gov.in',
        isMandatory: true,
      },
    ],
    requiredDocuments: [
      {
        name: { en: 'Aadhaar Card and Mobile Number', hi: 'आधार कार्ड व मोबाइल नंबर' },
        mandatory: true,
        purpose: {
          en: 'Biometric verification at Common Service Center (CSC).',
          hi: 'सीएससी केंद्र पर बायोमेट्रिक प्रमाणीकरण हेतु।',
        },
      },
      {
        name: { en: 'Bank Account Passbook / Statement', hi: 'बैंक खाता पासबुक' },
        mandatory: true,
        purpose: {
          en: 'To disburse training stipend and credit facilities.',
          hi: 'प्रशिक्षण वजीफा और ऋण राशि प्राप्त करने हेतु।',
        },
      },
      {
        name: { en: 'Ration Card / Family Composition Proof', hi: 'राशन कार्ड / परिवार विवरण' },
        mandatory: true,
        purpose: {
          en: 'To ensure one member per family condition.',
          hi: 'प्रति परिवार एक लाभार्थी के नियम के सत्यापन हेतु।',
        },
      },
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: { en: 'Biometric Enrolment at CSC', hi: 'सीएससी केंद्र पर बायोमेट्रिक पंजीकरण' },
        description: {
          en: 'Visit your nearest Common Service Centre (CSC) with Aadhaar and bank details for biometric registration.',
          hi: 'आधार और बैंक विवरण के साथ निकटतम सीएससी पर जाएं और बायोमेट्रिक पंजीकरण कराएं।',
        },
        channel: 'csc',
        portalUrl: 'https://pmvishwakarma.gov.in',
      },
      {
        stepNumber: 2,
        title: { en: 'Three-Tier Verification (Gram Panchayat / ULB -> District -> State)', hi: 'तीन-स्तरीय सत्यापन' },
        description: {
          en: 'Verification by Gram Panchayat Head or ULB Executive Officer, followed by District Implementation Committee screening.',
          hi: 'ग्राम प्रधान/नगर निकाय अधिकारी द्वारा सत्यापन और जिला समिति द्वारा अनुमोदन।',
        },
        channel: 'government_office',
      },
      {
        stepNumber: 3,
        title: { en: 'Skill Assessment & Basic Training (5-7 days)', hi: 'कौशल प्रशिक्षण (5-7 दिन)' },
        description: {
          en: 'Undergo 5-7 days of basic skill training with a daily stipend of ₹500.',
          hi: '₹500 प्रतिदिन वजीफे के साथ 5-7 दिन का बुनियादी कौशल प्रशिक्षण प्राप्त करें।',
        },
        channel: 'government_office',
      },
      {
        stepNumber: 4,
        title: { en: 'Toolkit e-Voucher Disbursal & Credit Access', hi: 'टूलकिट ई-वाउचर और ऋण सुविधा' },
        description: {
          en: 'Receive ₹15,000 digital e-voucher for modern tools and apply for ₹1 Lakh concessional credit.',
          hi: 'आधुनिक औजारों हेतु ₹15,000 का ई-वाउचर और ₹1 लाख का रियायती ऋण प्राप्त करें।',
        },
        channel: 'bank',
      },
    ],
    faqs: [
      {
        question: {
          en: 'Which 18 trades are officially included in PM Vishwakarma?',
          hi: 'पीएम विश्वकर्मा में कौन-से 18 शिल्प शामिल हैं?',
        },
        answer: {
          en: 'Carpenter (Suthar), Boat Maker, Armourer, Blacksmith (Lohar), Hammer & Tool Kit Maker, Locksmith, Sculptor (Moortikar)/Stone Carver, Goldsmith (Sonar), Potter (Kumhaar), Cobbler (Charmakar), Mason (Rajmistri), Basket/Mat/Broom Maker, Traditional Doll & Toy Maker, Barber (Naai), Garland maker (Malakaar), Washerman (Dhobi), Tailor (Darzi), and Fishing Net Maker.',
          hi: 'बढ़ई, नाव निर्माता, अस्त्र निर्माता, लोहार, हथौड़ा-टूलकिट निर्माता, ताला निर्माता, मूर्तिकार/पत्थर तराशने वाले, सुनार, कुम्हार, मोची, राजमिस्त्री, डलिया/चटाई/झाड़ू निर्माता, पारंपरिक गुड़िया-खिलौना निर्माता, नाई, मालाकार, धोबी, दर्जी और मछली का जाल बनाने वाले।',
        },
        officialSourceNote: 'MoMSME Gazette Notification trades list',
      },
    ],
  },
  {
    id: 'sukanya-samriddhi-yojana',
    code: 'SSY',
    name: {
      en: 'Sukanya Samriddhi Yojana (SSY)',
      hi: 'सुकन्या समृद्धि योजना (एसएसवाई)',
    },
    shortName: 'Sukanya Samriddhi',
    administeringAuthority: {
      en: 'National Savings Institute (NSI) & Department of Posts',
      hi: 'राष्ट्रीय बचत संस्थान एवं डाक विभाग',
    },
    ministry: {
      en: 'Ministry of Finance, Govt of India',
      hi: 'वित्त मंत्रालय, भारत सरकार',
    },
    category: 'financial_inclusion',
    officialPortalUrl: 'https://www.nsiindia.gov.in',
    officialApplicationUrl: 'https://www.indiapost.gov.in/Financial/Pages/Content/Sukanya-Samriddhi-Account.aspx',
    sourceCitation: 'Government Savings Promotion Act & Sukanya Samriddhi Account Rules (Ministry of Finance notifications)',
    lastVerifiedDate: '2026-09-28',
    isVerified: true,
    verificationNotes: {
      en: 'Verified via Ministry of Finance gazette notification. Highest sovereign interest rate among small savings (currently 8.2% per annum, compounded annually). Complete Triple-Tax-Exemption (EEE).',
      hi: 'वित्त मंत्रालय के राजपत्र से सत्यापित। 8.2% वार्षिक ब्याज दर, 100% कर-मुक्त (धारा 80C के तहत EEE दर्जा)।',
    },
    geographicAvailability: {
      type: 'pan_india',
      description: {
        en: 'Available at any Post Office or authorized commercial bank branch anywhere in India.',
        hi: 'भारत के किसी भी डाकघर या अधिकृत बैंक शाखा में खाता खोला जा सकता है।',
      },
    },
    overview: {
      en: 'A government-backed small deposit savings scheme launched under the Beti Bachao Beti Padhao campaign to secure the financial future, higher education, and marriage expenses of girl children with high sovereign interest and triple tax benefits.',
      hi: 'बेटी बचाओ बेटी पढ़ाओ अभियान के तहत बालिकाओं के भविष्य, उच्च शिक्षा और विवाह के लिए उच्च ब्याज दर व कर छूट प्रदान करने वाली सरकारी बचत योजना।',
    },
    benefitsSummary: {
      en: 'Sovereign interest rate (8.2% p.a.). Minimum deposit ₹250/year, maximum ₹1,50,000/year. Deposits allowed for 15 years; matures at 21 years from account opening. Exempt-Exempt-Exempt (EEE) under Section 80C of the Income Tax Act.',
      hi: '8.2% वार्षिक ब्याज दर। न्यूनतम ₹250/वर्ष, अधिकतम ₹1.5 लाख/वर्ष। 15 वर्षों तक जमा, 21 वर्ष में परिपक्वता। पूर्णतः आयकर मुक्त।',
      amount: '8.2% Interest + EEE Tax Saving',
      periodicity: 'Long-term High-Yield Savings',
    },
    criteria: [
      {
        id: 'ssy_girl_child',
        name: {
          en: 'Has a Girl Child Below 10 Years of Age',
          hi: '10 वर्ष से कम आयु की बालिका का होना',
        },
        field: 'hasGirlChildUnder10',
        operator: 'BOOLEAN_TRUE',
        expectedValue: true,
        requiredConditionDisplay: {
          en: 'Account can only be opened for a girl child from her birth until she reaches 10 years of age',
          hi: 'खाता बालिका के जन्म से लेकर 10 वर्ष की आयु पूर्ण होने तक ही खोला जा सकता है',
        },
        evidenceSource: 'Sukanya Samriddhi Account Rules Rule 3(1)',
        sourceUrl: 'https://www.indiapost.gov.in',
        isMandatory: true,
      },
      {
        id: 'ssy_citizenship',
        name: {
          en: 'Indian Resident Girl Child',
          hi: 'भारत की निवासी बालिका',
        },
        field: 'state',
        operator: 'NOT_EQUALS',
        expectedValue: '',
        requiredConditionDisplay: {
          en: 'The girl child and guardian must be resident citizens of India at account opening and until maturity',
          hi: 'बालिका और अभिभावक भारत के निवासी नागरिक होने चाहिए',
        },
        evidenceSource: 'Sukanya Samriddhi Account Rules Rule 3(2)',
        sourceUrl: 'https://www.nsiindia.gov.in',
        isMandatory: true,
      },
    ],
    requiredDocuments: [
      {
        name: { en: 'Birth Certificate of the Girl Child', hi: 'बालिका का जन्म प्रमाण पत्र' },
        mandatory: true,
        purpose: {
          en: 'Official evidence of date of birth and proof of age under 10 years.',
          hi: 'बालिका की आयु 10 वर्ष से कम होने का आधिकारिक प्रमाण।',
        },
      },
      {
        name: { en: 'Aadhaar / Identity Proof of Parent or Legal Guardian', hi: 'माता-पिता या कानूनी अभिभावक का आधार/पहचान पत्र' },
        mandatory: true,
        purpose: {
          en: 'Mandatory KYC documentation of the operating guardian.',
          hi: 'अभिभावक के केवाईसी हेतु अनिवार्य।',
        },
      },
      {
        name: { en: 'Proof of Address of Guardian', hi: 'अभिभावक का निवास प्रमाण पत्र' },
        mandatory: true,
        purpose: {
          en: 'Address proof for correspondence and passbook dispatch.',
          hi: 'पते के सत्यापन हेतु।',
        },
      },
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: { en: 'Obtain Form 1 at Post Office / Bank', hi: 'डाकघर या बैंक से फॉर्म 1 प्राप्त करें' },
        description: {
          en: 'Collect Form-1 (Application for opening Sukanya Samriddhi Account) from your local Post Office or authorized bank.',
          hi: 'डाकघर या अधिकृत बैंक शाखा से खाता खोलने का फॉर्म 1 प्राप्त करें।',
        },
        channel: 'post_office',
      },
      {
        stepNumber: 2,
        title: { en: 'Attach Birth Certificate and KYC', hi: 'जन्म प्रमाण पत्र और केवाईसी संलग्न करें' },
        description: {
          en: 'Attach the girl child’s municipal birth certificate, parent’s Aadhaar, PAN, and passport photograph.',
          hi: 'बालिका का जन्म प्रमाण पत्र, अभिभावक का आधार और फोटो संलग्न करें।',
        },
        channel: 'bank',
      },
      {
        stepNumber: 3,
        title: { en: 'Deposit Initial Amount (Minimum ₹250)', hi: 'प्रारंभिक राशि जमा करें (न्यूनतम ₹250)' },
        description: {
          en: 'Deposit initial subscription amount in cash, cheque, or demand draft to activate the account.',
          hi: 'खाता सक्रिय करने हेतु कम से कम ₹250 की राशि जमा करें।',
        },
        channel: 'post_office',
      },
      {
        stepNumber: 4,
        title: { en: 'Receive Dedicated SSY Passbook', hi: 'एसएसवाई पासबुक प्राप्त करें' },
        description: {
          en: 'Collect the dedicated SSY passbook showing account number, date of birth, and maturity date.',
          hi: 'खाता संख्या और परिपक्वता तिथि अंकित पासबुक प्राप्त करें।',
        },
        channel: 'post_office',
      },
    ],
    faqs: [
      {
        question: {
          en: 'How many SSY accounts can be opened per family?',
          hi: 'एक परिवार में कितने एसएसवाई खाते खोले जा सकते हैं?',
        },
        answer: {
          en: 'A maximum of two accounts for two girl children per family. An exception allowing three accounts is permitted only in the case of twins/triplets in the second or first delivery backed by medical certificate.',
          hi: 'एक परिवार में अधिकतम दो बालिकाओं के लिए दो खाते। जुड़वा/तिड़वा बच्चियों के जन्म के प्रमाणित मामले में ही तीसरे खाते की अनुमति है।',
        },
        officialSourceNote: 'Sukanya Samriddhi Rules 2019 Rule 4(2)',
      },
    ],
  },
  {
    id: 'pm-awas-yojana-urban',
    code: 'PMAYU',
    name: {
      en: 'Pradhan Mantri Awas Yojana - Urban 2.0 (PMAY-U)',
      hi: 'प्रधानमंत्री आवास योजना - शहरी 2.0 (पीएमएवाई-यू)',
    },
    shortName: 'PMAY-Urban',
    administeringAuthority: {
      en: 'Housing for All (HFA) Mission Directorate',
      hi: 'सबके लिए आवास (एचएफए) मिशन निदेशालय',
    },
    ministry: {
      en: 'Ministry of Housing and Urban Affairs (MoHUA), Govt of India',
      hi: 'आवासन और शहरी कार्य मंत्रालय, भारत सरकार',
    },
    category: 'housing',
    officialPortalUrl: 'https://pmay-urban.gov.in',
    officialApplicationUrl: 'https://pmay-urban.gov.in/pmayu2',
    sourceCitation: 'Cabinet Decision & PMAY-U 2.0 Guidelines (2024-2029 Housing for All Mission)',
    lastVerifiedDate: '2026-09-19',
    isVerified: true,
    verificationNotes: {
      en: 'Verified via MoHUA PMAY-U 2.0 guidelines approved by Union Cabinet. Covers EWS (income up to ₹3 Lakh) and LIG (up to ₹6 Lakh) without an existing pucca house.',
      hi: 'केंद्रीय मंत्रिमंडल द्वारा स्वीकृत पीएमएवाई-शहरी 2.0 के दिशानिर्देशों से सत्यापित। ईडब्ल्यूएस (आय ₹3 लाख तक) एवं एलआईजी (₹6 लाख तक)।',
    },
    geographicAvailability: {
      type: 'pan_india',
      description: {
        en: 'All statutory towns as per Census 2011 and subsequently notified Urban Development Authorities in India.',
        hi: 'भारत के सभी वैधानिक शहरों और अधिसूचित शहरी विकास प्राधिकरणों में लागू।',
      },
    },
    overview: {
      en: 'A flagship Central government mission addressing urban housing shortages among EWS, LIG, and Middle-Income families by providing financial assistance and interest subvention to construct or purchase a pucca house with basic civic amenities.',
      hi: 'शहरी क्षेत्रों के कमजोर और निम्न आय वर्ग के परिवारों को अपना पक्का मकान बनाने या खरीदने के लिए वित्तीय सहायता और ब्याज सब्सिडी देने का केंद्रीय मिशन।',
    },
    benefitsSummary: {
      en: 'Up to ₹2.50 Lakh financial assistance under Beneficiary-Led Construction (BLC) or Affordable Housing in Partnership (AHP), and interest subsidy of 4% on home loans up to ₹25 Lakh for EWS/LIG families.',
      hi: 'मकान निर्माण/खरीद हेतु ₹2.5 लाख तक की सरकारी सहायता अथवा 4% ब्याज सब्सिडी।',
      amount: 'Up to ₹2.50 Lakh Grant / 4% Subsidy',
      periodicity: 'Construction-milestone disbursal',
    },
    criteria: [
      {
        id: 'pmayu_residence',
        name: {
          en: 'Resident in Statutory Urban Area',
          hi: 'वैधानिक शहरी क्षेत्र का निवासी',
        },
        field: 'residence',
        operator: 'EQUALS',
        expectedValue: 'urban',
        requiredConditionDisplay: {
          en: 'Applicant must reside in a statutory urban local body or development authority area',
          hi: 'आवेदक को वैधानिक नगर पालिका/निगम अथवा विकास प्राधिकरण क्षेत्र का निवासी होना चाहिए',
        },
        evidenceSource: 'PMAY-U 2.0 Guidelines Cl 1.3',
        sourceUrl: 'https://pmay-urban.gov.in',
        isMandatory: true,
      },
      {
        id: 'pmayu_no_pucca_house',
        name: {
          en: 'No Pucca House Anywhere in India',
          hi: 'देश में कहीं भी पक्का मकान न होना',
        },
        field: 'hasExistingPuccaHouse',
        operator: 'BOOLEAN_FALSE',
        expectedValue: false,
        requiredConditionDisplay: {
          en: 'The beneficiary family must not own a pucca house in their name or family members’ names anywhere in India',
          hi: 'लाभार्थी परिवार के किसी भी सदस्य के नाम देश में कहीं भी पक्का मकान नहीं होना चाहिए',
        },
        evidenceSource: 'PMAY-U Mandatory Eligibility Condition Cl 2.1',
        sourceUrl: 'https://pmay-urban.gov.in',
        isMandatory: true,
      },
      {
        id: 'pmayu_income_cap',
        name: {
          en: 'Family Income within EWS / LIG Limits (Up to ₹6 Lakh)',
          hi: 'पारिवारिक आय सीमा (ईडब्ल्यूएस ₹3 लाख तक / एलआईजी ₹6 लाख तक)',
        },
        field: 'annualIncome',
        operator: 'LESS_THAN_OR_EQUAL',
        expectedValue: 600000,
        requiredConditionDisplay: {
          en: 'Annual family income must not exceed ₹3,00,000 for EWS assistance or ₹6,00,000 for LIG interest subsidy',
          hi: 'वार्षिक पारिवारिक आय ईडब्ल्यूएस हेतु ₹3 लाख तथा एलआईजी हेतु ₹6 लाख से अधिक नहीं होनी चाहिए',
        },
        evidenceSource: 'MoHUA Income Slab Definitions for Housing 2024',
        sourceUrl: 'https://pmay-urban.gov.in',
        isMandatory: true,
      },
    ],
    requiredDocuments: [
      {
        name: { en: 'Aadhaar Card of all family members', hi: 'परिवार के सभी सदस्यों का आधार कार्ड' },
        mandatory: true,
        purpose: {
          en: 'For biometric deduplication against national housing beneficiary databases.',
          hi: 'राष्ट्रीय आवास डेटाबेस में नाम के सत्यापन हेतु।',
        },
      },
      {
        name: { en: 'Income Certificate / Self-Declaration', hi: 'आय प्रमाण पत्र / स्व-घोषणा' },
        mandatory: true,
        purpose: {
          en: 'Proof of EWS (up to ₹3L) or LIG (up to ₹6L) classification.',
          hi: 'ईडब्ल्यूएस या एलआईजी आय वर्ग के प्रमाणीकरण हेतु।',
        },
      },
      {
        name: { en: 'Land Ownership Document / Patta (for construction)', hi: 'भूमि स्वामित्व दस्तावेज/पट्टा' },
        mandatory: false,
        purpose: {
          en: 'Required under Beneficiary-Led Construction (BLC) component to prove clear land title.',
          hi: 'स्वयं की भूमि पर निर्माण करने हेतु भू-स्वामित्व प्रमाण।',
        },
      },
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: { en: 'Online Registration on PMAY-U 2.0 Portal or CSC', hi: 'पीएमएवाई-यू पोर्टल या सीएससी पर आवेदन' },
        description: {
          en: 'Log in with Aadhaar on pmay-urban.gov.in or visit a Common Service Center (CSC).',
          hi: 'pmay-urban.gov.in पर आधार से लॉग इन करें या नजदीकी सीएससी जाएं।',
        },
        channel: 'online',
        portalUrl: 'https://pmay-urban.gov.in',
      },
      {
        stepNumber: 2,
        title: { en: 'Select Scheme Vertical (BLC / ISS / AHP)', hi: 'योजना घटक का चयन करें' },
        description: {
          en: 'Choose Beneficiary-Led Construction if you own land, or Interest Subsidy Scheme (ISS) for home loans.',
          hi: 'भूमि होने पर स्वयं निर्माण घटक या होम लोन पर ब्याज सब्सिडी का विकल्प चुनें।',
        },
        channel: 'online',
      },
      {
        stepNumber: 3,
        title: { en: 'Municipal ULB Geo-Tagging & Verification', hi: 'नगर पालिका द्वारा जियो-टैगिंग और सत्यापन' },
        description: {
          en: 'Municipality engineers inspect the plot, perform stage-wise geo-tagging, and approve the Detailed Project Report (DPR).',
          hi: 'नगर पालिका के इंजीनियर प्लॉट की जियो-टैगिंग करते हैं और प्रोजेक्ट को मंजूरी देते हैं।',
        },
        channel: 'government_office',
      },
    ],
    faqs: [
      {
        question: {
          en: 'Can I apply for PMAY-U if my parents already own a pucca house in our native village?',
          hi: 'यदि मेरे माता-पिता के नाम गांव में पक्का मकान है, तो क्या मैं शहर में आवेदन कर सकता हूँ?',
        },
        answer: {
          en: 'If you are married and form an independent family unit with separate ration/family records and no pucca property in your or spouse’s name, you can be considered. However, an undivided joint family owning a pucca house is excluded.',
          hi: 'यदि आप विवाहित हैं और एक स्वतंत्र पारिवारिक इकाई हैं जिनके नाम कोई पक्का मकान नहीं है, तो विचार किया जा सकता है। अविभाजित परिवार के पास पक्का मकान होने पर अपवर्जन लागू होता है।',
        },
        officialSourceNote: 'MoHUA Definition of Beneficiary Family Cl 2.1',
      },
    ],
  },
  {
    id: 'nsap-ignoaps-pension',
    code: 'IGNOAPS',
    name: {
      en: 'Indira Gandhi National Old Age Pension Scheme (IGNOAPS)',
      hi: 'इंदिरा गांधी राष्ट्रीय वृद्धावस्था पेंशन योजना (आईजीएनओएपीएस)',
    },
    shortName: 'Old Age Pension (IGNOAPS)',
    administeringAuthority: {
      en: 'National Social Assistance Programme (NSAP) Division',
      hi: 'राष्ट्रीय सामाजिक सहायता कार्यक्रम प्रभाग',
    },
    ministry: {
      en: 'Ministry of Rural Development, Govt of India',
      hi: 'ग्रामीण विकास मंत्रालय, भारत सरकार',
    },
    category: 'social_security',
    officialPortalUrl: 'https://nsap.nic.in',
    officialApplicationUrl: 'https://nsap.nic.in/applyonline.do',
    sourceCitation: 'NSAP Scheme Guidelines, Ministry of Rural Development, Govt of India',
    lastVerifiedDate: '2026-09-24',
    isVerified: true,
    verificationNotes: {
      en: 'Verified via Ministry of Rural Development NSAP portal. Central assistance combined with mandatory state top-up pension ranging from ₹1,000 to ₹3,000 per month.',
      hi: 'ग्रामीण विकास मंत्रालय से सत्यापित। केंद्रीय सहायता के साथ राज्य सरकार द्वारा टॉप-अप मिलाकर ₹1,000 से ₹3,000 मासिक पेंशन।',
    },
    geographicAvailability: {
      type: 'pan_india',
      description: {
        en: 'All States and Union Territories in India under the National Social Assistance Programme framework.',
        hi: 'भारत के सभी राज्यों और केंद्र शासित प्रदेशों में उपलब्ध।',
      },
    },
    overview: {
      en: 'A non-contributory social security pension providing monthly financial dignity to destitute senior citizens aged 60 years and above belonging to Below Poverty Line (BPL) families.',
      hi: 'गरीबी रेखा से नीचे (बीपीएल) परिवारों के 60 वर्ष या उससे अधिक आयु के वरिष्ठ नागरिकों को सम्मानपूर्वक जीवन यापन के लिए मासिक पेंशन योजना।',
    },
    benefitsSummary: {
      en: 'Monthly pension directly credited to bank/post office account. Age 60-79: ₹200 central + state contribution (total ₹1,000 - ₹2,500/month depending on state). Age 80+: ₹500 central + state contribution (total up to ₹3,000/month).',
      hi: 'प्रति माह बैंक खाते में पेंशन (केंद्रीय सहायता + राज्य का अंश मिलाकर ₹1,000 से ₹3,000 प्रति माह राज्यवार)।',
      amount: '₹1,000 - ₹3,000 / month',
      periodicity: 'Monthly Life Pension',
    },
    criteria: [
      {
        id: 'ignoaps_age',
        name: {
          en: 'Age 60 Years or Above',
          hi: 'आयु 60 वर्ष या उससे अधिक',
        },
        field: 'age',
        operator: 'GREATER_THAN_OR_EQUAL',
        expectedValue: 60,
        requiredConditionDisplay: {
          en: 'The applicant must have attained 60 years of age as per official identity document',
          hi: 'आधिकारिक पहचान पत्र के अनुसार आवेदक की आयु 60 वर्ष या अधिक होनी चाहिए',
        },
        evidenceSource: 'NSAP Guidelines Section 2 (IGNOAPS Eligibility)',
        sourceUrl: 'https://nsap.nic.in',
        isMandatory: true,
      },
      {
        id: 'ignoaps_bpl_income',
        name: {
          en: 'BPL / Low Income Family (Under ₹1,00,000/year)',
          hi: 'बीपीएल / अल्पाय वर्ग (पारिवारिक आय ₹1,00,000 से कम)',
        },
        field: 'annualIncome',
        operator: 'LESS_THAN_OR_EQUAL',
        expectedValue: 100000,
        requiredConditionDisplay: {
          en: 'Must belong to a household identified as Below Poverty Line (BPL) according to criteria prescribed by Govt of India',
          hi: 'भारत सरकार द्वारा निर्धारित गरीबी रेखा से नीचे (बीपीएल) परिवार से संबंधित होना चाहिए',
        },
        evidenceSource: 'NSAP Statutory BPL Criteria & State Social Welfare Rules',
        sourceUrl: 'https://nsap.nic.in',
        isMandatory: true,
      },
      {
        id: 'ignoaps_not_govt_pensioner',
        name: {
          en: 'Not receiving regular government/institutional pension',
          hi: 'नियमित सरकारी या संस्थागत पेंशनर न होना',
        },
        field: 'occupation',
        operator: 'NOT_EQUALS',
        expectedValue: 'salaried_govt',
        requiredConditionDisplay: {
          en: 'Retired government servants entitled to civil service pensions cannot claim NSAP destitute welfare pension',
          hi: 'सरकारी सेवा से सेवानिवृत्त पेंशनभोगी इस योजना के पात्र नहीं हैं',
        },
        evidenceSource: 'NSAP Operational Rules Rule 2.4',
        sourceUrl: 'https://nsap.nic.in',
        isMandatory: true,
      },
    ],
    requiredDocuments: [
      {
        name: { en: 'Age Proof (Aadhaar / Voter ID / Birth Certificate)', hi: 'आयु प्रमाण (आधार / मतदाता पहचान पत्र)' },
        mandatory: true,
        purpose: {
          en: 'Proof of having attained 60 years of age.',
          hi: '60 वर्ष की आयु पूर्ण होने का प्रमाण।',
        },
      },
      {
        name: { en: 'BPL Card / Income Certificate from Tehsildar', hi: 'बीपीएल कार्ड / तहसीलदार द्वारा जारी आय प्रमाण पत्र' },
        mandatory: true,
        purpose: {
          en: 'Statutory proof of Below Poverty Line economic status.',
          hi: 'गरीबी रेखा से नीचे होने का आधिकारिक प्रमाण।',
        },
      },
      {
        name: { en: 'Bank / Post Office Savings Account Passbook', hi: 'बैंक या डाकघर खाता पासबुक' },
        mandatory: true,
        purpose: {
          en: 'For monthly DBT pension remittance.',
          hi: 'मासिक पेंशन सीधे खाते में जमा कराने के लिए।',
        },
      },
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: { en: 'Apply Online on NSAP Portal or at Block / Tehsil Office', hi: 'एनएसएपी पोर्टल या ब्लॉक/तहसील कार्यालय में आवेदन' },
        description: {
          en: 'Submit online form at nsap.nic.in or physically at your Block Development Officer (BDO) or Municipal Social Welfare office.',
          hi: 'nsap.nic.in पर ऑनलाइन या खंड विकास अधिकारी (BDO) कार्यालय में फॉर्म जमा करें।',
        },
        channel: 'online',
        portalUrl: 'https://nsap.nic.in/applyonline.do',
      },
      {
        stepNumber: 2,
        title: { en: 'Field Verification by Social Welfare Inspector', hi: 'समाज कल्याण निरीक्षक द्वारा सत्यापन' },
        description: {
          en: 'Field staff checks the applicant’s age, living conditions, and BPL status.',
          hi: 'क्षेत्रीय कर्मचारी द्वारा आवेदक की आयु, बीपीएल स्थिति और पात्रता की जांच की जाती है।',
        },
        channel: 'government_office',
      },
      {
        stepNumber: 3,
        title: { en: 'Sanction Order & Direct Benefit Transfer Activation', hi: 'स्वीकृति आदेश और डीबीटी शुरुआत' },
        description: {
          en: 'District Social Welfare Officer issues Sanction Order with unique Pensioner ID, starting monthly bank remittance.',
          hi: 'पेंशनर आईडी के साथ स्वीकृति आदेश जारी होता है और मासिक पेंशन शुरू होती है।',
        },
        channel: 'bank',
      },
    ],
    faqs: [
      {
        question: {
          en: 'What happens when a pensioner turns 80 years old?',
          hi: 'जब पेंशनभोगी 80 वर्ष का हो जाता है तो क्या होता है?',
        },
        answer: {
          en: 'Upon reaching 80 years of age, the central assistance automatically steps up from ₹200 to ₹500 per month, increasing the total monthly disbursement significantly across all states.',
          hi: '80 वर्ष की आयु पूरी होने पर केंद्रीय सहायता स्वतः ₹200 से बढ़कर ₹500 प्रति माह हो जाती है, जिससे कुल मासिक पेंशन में वृद्धि होती है।',
        },
        officialSourceNote: 'MoRD Gazette Notification on NSAP Revision',
      },
    ],
  },
  {
    id: 'pradhan-mantri-mudra-yojana',
    code: 'PMMY',
    name: {
      en: 'Pradhan Mantri Mudra Yojana (PMMY)',
      hi: 'प्रधानमंत्री मुद्रा योजना (पीएमएमवाई)',
    },
    shortName: 'Mudra Yojana',
    administeringAuthority: {
      en: 'Micro Units Development & Refinance Agency (MUDRA)',
      hi: 'माइक्रो यूनिट्स डेवलपमेंट एंड रिफाइनेंस एजेंसी (मुद्रा)',
    },
    ministry: {
      en: 'Department of Financial Services, Ministry of Finance, Govt of India',
      hi: 'वित्तीय सेवाएं विभाग, वित्त मंत्रालय, भारत सरकार',
    },
    category: 'financial_inclusion',
    officialPortalUrl: 'https://www.mudra.org.in',
    officialApplicationUrl: 'https://www.udyamimitra.in',
    sourceCitation: 'MUDRA Scheme Guidelines, Department of Financial Services (DFS), Ministry of Finance, Govt of India (Updated 2024)',
    lastVerifiedDate: '2026-09-27',
    isVerified: true,
    verificationNotes: {
      en: 'Verified via DFS MUDRA portal. Three stages: Shishu (up to ₹50k), Kishore (₹50k to ₹5 Lakh), Tarun (₹5 Lakh to ₹10 Lakh / ₹20 Lakh). No collateral required.',
      hi: 'वित्त मंत्रालय से सत्यापित। तीन श्रेणियां: शिशु (₹50,000 तक), किशोर (₹5 लाख तक), तरुण (₹10 लाख तक)। कोई संपार्श्विक आवश्यक नहीं।',
    },
    geographicAvailability: {
      type: 'pan_india',
      description: {
        en: 'All public sector banks, private banks, regional rural banks, and MFIs across India.',
        hi: 'भारत के सभी सरकारी, निजी, क्षेत्रीय ग्रामीण बैंकों और माइक्रोफाइनेंस संस्थानों में उपलब्ध।',
      },
    },
    overview: {
      en: 'A flagship scheme to fund the unfunded by providing collateral-free institutional credit up to ₹10 Lakh (expanded to ₹20 Lakh in 2024 for proven Tarun borrowers) to micro and small non-farm enterprises.',
      hi: 'गैर-कृषि सूक्ष्म और लघु उद्यमियों को ₹10 लाख तक (तरुण श्रेणी में ₹20 लाख तक) का संपार्श्विक-मुक्त संस्थागत ऋण प्रदान करने वाली योजना।',
    },
    benefitsSummary: {
      en: 'Collateral-free institutional business loans in 3 categories: Shishu (up to ₹50,000), Kishore (₹50,001 to ₹5,00,000), and Tarun (₹5,00,001 to ₹10,00,000 / ₹20,00,000). Repayment tenure 3 to 5 years.',
      hi: 'बिना गारंटी 3 श्रेणियों में व्यापार ऋण: शिशु (₹50,000 तक), किशोर (₹5 लाख तक) और तरुण (₹10 लाख तक)। 3 से 5 वर्ष की पुनर्भुगतान अवधि।',
      amount: 'Up to ₹10 Lakh (or ₹20 Lakh)',
      periodicity: 'Term Loan / Working Capital Limit',
    },
    criteria: [
      {
        id: 'mudra_business_intent',
        name: {
          en: 'Micro-Entrepreneur / Self-Employed / Business Activity',
          hi: 'सूक्ष्म उद्यमी / स्व-व्यवसायी / व्यापारिक गतिविधि',
        },
        field: 'occupation',
        operator: 'IN',
        expectedValue: ['self_employed_business', 'street_vendor', 'artisan_craftsperson', 'daily_wage_laborer', 'other'],
        requiredConditionDisplay: {
          en: 'Must have a viable business proposal for manufacturing, processing, trading, or service sector activity',
          hi: 'विनिर्माण, प्रसंस्करण, व्यापार अथवा सेवा क्षेत्र में वैध व्यावसायिक प्रस्ताव होना चाहिए',
        },
        evidenceSource: 'MUDRA Scheme Guidelines Sec 3.1',
        sourceUrl: 'https://www.mudra.org.in',
        isMandatory: true,
      },
      {
        id: 'mudra_not_farm_land_cultivation',
        name: {
          en: 'Non-Farm Enterprise Activity',
          hi: 'गैर-कृषि व्यवसाय गतिविधि',
        },
        field: 'occupation',
        operator: 'NOT_EQUALS',
        expectedValue: 'farmer',
        requiredConditionDisplay: {
          en: 'Mudra loans are sanctioned for non-farm commercial activities (allied agri like dairy/poultry is eligible, but direct crop cultivation is under KCC)',
          hi: 'मुद्रा ऋण गैर-कृषि व्यावसायिक गतिविधियों के लिए है (सीधी फसल खेती के लिए किसान क्रेडिट कार्ड मान्य है)',
        },
        evidenceSource: 'MUDRA Operational Scope Cl 2.1',
        sourceUrl: 'https://www.mudra.org.in',
        isMandatory: false,
      },
      {
        id: 'mudra_age',
        name: {
          en: 'Minimum Age 18 Years',
          hi: 'न्यूनतम आयु 18 वर्ष',
        },
        field: 'age',
        operator: 'GREATER_THAN_OR_EQUAL',
        expectedValue: 18,
        requiredConditionDisplay: {
          en: 'Applicant must be an Indian citizen of at least 18 years of age with legal capacity to contract credit',
          hi: 'ऋण अनुबंध हेतु आवेदक की न्यूनतम आयु 18 वर्ष होनी चाहिए',
        },
        evidenceSource: 'Banking Regulations under Mudra Scheme',
        sourceUrl: 'https://www.mudra.org.in',
        isMandatory: true,
      },
    ],
    requiredDocuments: [
      {
        name: { en: 'Aadhaar / Voter ID / PAN Card', hi: 'आधार / पैन कार्ड / पहचान पत्र' },
        mandatory: true,
        purpose: {
          en: 'KYC identity and address verification.',
          hi: 'पहचान एवं पते का सत्यापन।',
        },
      },
      {
        name: { en: 'Business Proposal / Machinery Quotation', hi: 'व्यापारिक प्रस्ताव / मशीनरी कोटेशन' },
        mandatory: true,
        purpose: {
          en: 'Details of business setup, equipment purchased, or inventory requirement.',
          hi: 'व्यवसाय योजना अथवा उपकरण खरीद का विवरण।',
        },
      },
      {
        name: { en: 'Bank Account Statements (Past 6 Months)', hi: 'विगत 6 माह का बैंक खाता विवरण' },
        mandatory: false,
        purpose: {
          en: 'To evaluate banking transactions and creditworthiness for Kishore/Tarun loans.',
          hi: 'किशोर/तरुण ऋण के लिए वित्तीय लेन-देन की समीक्षा हेतु।',
        },
      },
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: { en: 'Prepare Business Proposal', hi: 'व्यवसाय प्रस्ताव तैयार करें' },
        description: {
          en: 'Identify capital requirement (Shishu up to ₹50k, Kishore up to ₹5L, or Tarun up to ₹10L).',
          hi: 'पूंजी आवश्यकता (शिशु, किशोर या तरुण श्रेणी) तय करें।',
        },
        channel: 'online',
      },
      {
        stepNumber: 2,
        title: { en: 'Apply Online via UdyamiMitra Portal or Bank Branch', hi: 'उद्यमीमित्र पोर्टल या बैंक में आवेदन करें' },
        description: {
          en: 'Submit digital application on udyamimitra.in or walk into any commercial/rural bank branch.',
          hi: 'udyamimitra.in पर ऑनलाइन आवेदन करें अथवा किसी भी बैंक शाखा में संपर्क करें।',
        },
        channel: 'online',
        portalUrl: 'https://www.udyamimitra.in',
      },
      {
        stepNumber: 3,
        title: { en: 'Collateral-Free Loan Sanction & Mudra Card', hi: 'ऋण स्वीकृति और मुद्रा कार्ड' },
        description: {
          en: 'Bank evaluates proposal without demanding collateral security, disbursing working capital via Mudra RuPay Card.',
          hi: 'बैंक बिना गारंटी के ऋण स्वीकृत कर मुद्रा रूपे कार्ड जारी करता है।',
        },
        channel: 'bank',
      },
    ],
    faqs: [
      {
        question: {
          en: 'Can a bank ask for collateral or processing fee for Shishu loans?',
          hi: 'क्या बैंक शिशु ऋण के लिए कोई गारंटी या प्रोसेसिंग फीस मांग सकता है?',
        },
        answer: {
          en: 'No. RBI and MUDRA guidelines strictly forbid banks from demanding any collateral security or third-party guarantee for loans up to ₹10 Lakh, and zero processing fee is charged for Shishu loans.',
          hi: 'नहीं। आरबीआई और मुद्रा दिशानिर्देशों के तहत ₹10 लाख तक के ऋण पर कोई गारंटी नहीं ली जा सकती, और शिशु ऋण पर कोई प्रोसेसिंग शुल्क नहीं लगता।',
        },
        officialSourceNote: 'RBI Guidelines on MUDRA Collateral Exemption',
      },
    ],
  },
];
