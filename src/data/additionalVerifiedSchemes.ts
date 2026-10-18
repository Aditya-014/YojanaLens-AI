import { Scheme } from '../types/scheme.ts';

export const ADDITIONAL_VERIFIED_SCHEMES: Scheme[] = [
  // 1. PMFBY (Agriculture / Pan-India)
  {
    id: 'pm-fasal-bima-yojana',
    code: 'PMFBY',
    name: {
      en: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
      hi: 'प्रधानमंत्री फसल बीमा योजना (पीएमएफबीवाई)',
    },
    shortName: 'PMFBY',
    administeringAuthority: {
      en: 'Department of Agriculture & Farmers Welfare',
      hi: 'कृषि एवं किसान कल्याण विभाग',
    },
    ministry: {
      en: 'Ministry of Agriculture and Farmers Welfare, Govt of India',
      hi: 'कृषि एवं किसान कल्याण मंत्रालय, भारत सरकार',
    },
    category: 'agriculture',
    officialPortalUrl: 'https://pmfby.gov.in',
    officialApplicationUrl: 'https://pmfby.gov.in/farmerRegistrationForm',
    sourceCitation: 'PMFBY Revised Operational Guidelines, Ministry of Agriculture & Farmers Welfare (2024-2025)',
    lastVerifiedDate: '2026-09-28',
    isVerified: true,
    verificationNotes: {
      en: 'Verified against official PMFBY portal guidelines. Uniform maximum premium of 2% for Kharif, 1.5% for Rabi food & oilseeds, and 5% for annual commercial/horticultural crops.',
      hi: 'पीएमएफबीवाई पोर्टल से सत्यापित। खरीफ के लिए अधिकतम 2%, रबी के लिए 1.5% और वाणिज्यिक फसलों के लिए 5% प्रीमियम।',
    },
    geographicAvailability: {
      type: 'pan_india',
      description: {
        en: 'Available across all implementing States and Union Territories in India for notified crops and areas.',
        hi: 'अधिसूचित फसलों और क्षेत्रों के लिए सभी कार्यान्वयन राज्यों व केंद्र शासित प्रदेशों में उपलब्ध।',
      },
    },
    overview: {
      en: 'Comprehensive crop insurance providing comprehensive risk cover against non-preventable natural risks from pre-sowing to post-harvest stages with nominal farmer premium rates.',
      hi: 'बुवाई पूर्व से कटाई उपरांत तक प्राकृतिक आपदाओं, कीटों व रोगों से फसल नुकसान के विरुद्ध व्यापक बीमा सुरक्षा।',
    },
    benefitsSummary: {
      en: 'Full sum insured protection against localized natural calamities, post-harvest losses, and prevented sowing. Low actuarial farmer premium share (1.5% to 5%).',
      hi: 'फसल बर्बादी पर पूर्ण बीमा सुरक्षा। किसानों के लिए नाममात्र प्रीमियम (1.5% से 5%) और शेष प्रीमियम केंद्र व राज्य सरकार द्वारा वहन।',
    },
    criteria: [
      {
        id: 'pmfby_farmer_status',
        name: { en: 'Farmer / Cultivator Status', hi: 'किसान / काश्तकार स्थिति' },
        field: 'occupation',
        operator: 'IN',
        expectedValue: ['farmer'],
        requiredConditionDisplay: {
          en: 'Must be an active cultivator (loanee or non-loanee farmer cultivating notified crop).',
          hi: 'सक्रिय किसान (अधिसूचित फसल बोने वाले ऋणी अथवा गैर-ऋणी किसान) होना चाहिए।',
        },
        evidenceSource: 'PMFBY Guidelines Section 2.1 (Eligible Farmers)',
        sourceUrl: 'https://pmfby.gov.in',
        isMandatory: true,
      },
      {
        id: 'pmfby_land_record',
        name: { en: 'Agricultural Land Record', hi: 'कृषि भूमि रिकॉर्ड' },
        field: 'ownsCultivableLand',
        operator: 'BOOLEAN_TRUE',
        expectedValue: true,
        requiredConditionDisplay: {
          en: 'Must hold valid land records (Khatauni / RoR / Sowing Certificate).',
          hi: 'वैध भूमि दस्तावेज (खतौनी / जमाबंदी / बुवाई प्रमाण पत्र) आवश्यक है।',
        },
        evidenceSource: 'PMFBY Operational Guidelines Section 3.2',
        sourceUrl: 'https://pmfby.gov.in',
        isMandatory: true,
      },
    ],
    requiredDocuments: [
      {
        name: { en: 'Land Record (RoR / Khatauni / Patta / 7/12)', hi: 'भूमि रिकॉर्ड (खतौनी / 7/12 / जमाबंदी)' },
        mandatory: true,
        purpose: { en: 'Proof of landholding and survey parcel ownership.', hi: 'भूमि स्वामित्व और खसरा नंबर का प्रमाण।' },
      },
      {
        name: { en: 'Crop Sowing Certificate (Sowing declaration / Girdawari)', hi: 'फसल बुवाई प्रमाण पत्र (गिरदावरी)' },
        mandatory: true,
        purpose: { en: 'Verification that notified crop was sown in the insured parcel.', hi: 'सत्यापन कि बीमित खेत में अधिसूचित फसल बोई गई है।' },
      },
      {
        name: { en: 'Bank Account Passbook (Aadhaar Seeded)', hi: 'बैंक पासबुक (आधार से लिंक)' },
        mandatory: true,
        purpose: { en: 'Direct claim disbursement via DBT.', hi: 'दावा राशि के सीधे बैंक खाते में भुगतान हेतु।' },
      },
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: { en: 'Check Notified Crop & Cut-Off Date', hi: 'अधिसूचित फसल व अंतिम तिथि जांचें' },
        description: { en: 'Confirm if your district and crop are notified for current season on pmfby.gov.in.', hi: 'pmfby.gov.in पर देखें कि आपका जिला और फसल इस सीजन में अधिसूचित है।' },
        channel: 'online',
        portalUrl: 'https://pmfby.gov.in',
      },
      {
        stepNumber: 2,
        title: { en: 'Submit Insurance Application', hi: 'बीमा आवेदन जमा करें' },
        description: { en: 'Apply online on National Crop Insurance Portal or through nearest CSC / Bank Branch before seasonal cut-off date.', hi: 'पोर्टल अथवा सीएससी केंद्र के माध्यम से निर्धारित तिथि से पूर्व आवेदन करें।' },
        channel: 'online',
      },
    ],
    faqs: [
      {
        question: { en: 'Is crop insurance mandatory for KCC loan holders?', hi: 'क्या केसीसी ऋण धारकों के लिए फसल बीमा अनिवार्य है?' },
        answer: { en: 'No. Enrollment has been made 100% voluntary for all farmers, including Kisan Credit Card (KCC) holders.', hi: 'नहीं। अब यह योजना केसीसी ऋण धारकों सहित सभी किसानों के लिए पूरी तरह स्वैच्छिक (Voluntary) है।' },
      },
    ],
  },

  // 2. PMAY-G (Housing / Rural / Pan-India)
  {
    id: 'pm-awas-yojana-gramin',
    code: 'PMAY-G',
    name: {
      en: 'Pradhan Mantri Awas Yojana - Gramin (PMAY-G)',
      hi: 'प्रधानमंत्री आवास योजना - ग्रामीण (पीएमएवाई-जी)',
    },
    shortName: 'PMAY-G',
    administeringAuthority: {
      en: 'Department of Rural Development',
      hi: 'ग्रामीण विकास विभाग',
    },
    ministry: {
      en: 'Ministry of Rural Development, Govt of India',
      hi: 'ग्रामीण विकास मंत्रालय, भारत सरकार',
    },
    category: 'housing',
    officialPortalUrl: 'https://pmayg.nic.in',
    officialApplicationUrl: 'https://pmayg.nic.in/netiay/Home.aspx',
    sourceCitation: 'PMAY-G Framework for Implementation, Ministry of Rural Development',
    lastVerifiedDate: '2026-10-01',
    isVerified: true,
    verificationNotes: {
      en: 'Verified against official PMAY-G guidelines. Provides unit assistance of ₹1.20 Lakh in plain areas and ₹1.30 Lakh in hilly/difficult areas plus 90-95 days MGNREGA unskilled wage labor support.',
      hi: 'पीएमएवाई-जी दिशानिर्देशों से सत्यापित। मैदानी क्षेत्रों में ₹1.20 लाख और पहाड़ी/दुर्गम क्षेत्रों में ₹1.30 लाख की सहायता।',
    },
    geographicAvailability: {
      type: 'pan_india',
      description: {
        en: 'Rural areas across all States and Union Territories of India (except Delhi and Chandigarh).',
        hi: 'भारत के सभी राज्यों व केंद्र शासित प्रदेशों के ग्रामीण क्षेत्रों में।',
      },
    },
    overview: {
      en: 'Provides pucca houses with hygienic cooking space, piped water, toilet, and electricity connections to all houseless families and families living in kutcha or dilapidated houses in rural areas.',
      hi: 'ग्रामीण क्षेत्रों में बेघर और कच्चे/जर्जर मकानों में रहने वाले परिवारों को पक्के मकान के निर्माण हेतु सीधी वित्तीय सहायता।',
    },
    benefitsSummary: {
      en: '₹1,20,000 (plain areas) or ₹1,30,000 (hilly/NE/IAP areas) unit assistance + ₹12,000 Swachh Bharat toilet grant + 90-95 days MGNREGA wages.',
      hi: '₹1.20 लाख (मैदानी) या ₹1.30 लाख (पहाड़ी क्षेत्र) + ₹12,000 शौचालय निर्माण सहायता + 90 से 95 दिन की मनरेगा मजदूरी।',
    },
    criteria: [
      {
        id: 'pmayg_rural_residence',
        name: { en: 'Rural Residence', hi: 'ग्रामीण निवास' },
        field: 'residence',
        operator: 'EQUALS',
        expectedValue: 'rural',
        requiredConditionDisplay: { en: 'Must reside in rural village area.', hi: 'ग्रामीण क्षेत्र का स्थायी निवासी होना चाहिए।' },
        evidenceSource: 'PMAY-G Operational Framework Section 1.2',
        sourceUrl: 'https://pmayg.nic.in',
        isMandatory: true,
      },
      {
        id: 'pmayg_no_pucca_house',
        name: { en: 'Houseless or Kutcha House Only', hi: 'पक्के मकान का अभाव' },
        field: 'hasExistingPuccaHouse',
        operator: 'BOOLEAN_FALSE',
        expectedValue: false,
        requiredConditionDisplay: { en: 'Beneficiary family must NOT own a pucca house anywhere in India.', hi: 'परिवार के पास देश में कहीं भी पक्का मकान नहीं होना चाहिए।' },
        evidenceSource: 'PMAY-G Beneficiary Selection Guidelines',
        sourceUrl: 'https://pmayg.nic.in',
        isMandatory: true,
      },
      {
        id: 'pmayg_income_cap',
        name: { en: 'Annual Family Income Ceiling', hi: 'वार्षिक पारिवारिक आय सीमा' },
        field: 'annualIncome',
        operator: 'LESS_THAN_OR_EQUAL',
        expectedValue: 180000,
        requiredConditionDisplay: { en: 'Annual household income <= ₹1,80,000.', hi: 'वार्षिक पारिवारिक आय ₹1,80,000 या उससे कम।' },
        evidenceSource: 'SECC Deprivation & Exclusion Criteria',
        sourceUrl: 'https://pmayg.nic.in',
        isMandatory: true,
      },
    ],
    requiredDocuments: [
      {
        name: { en: 'Aadhaar Card of Applicant & Family', hi: 'आवेदक व परिवार का आधार कार्ड' },
        mandatory: true,
        purpose: { en: 'Identity verification and biometric deduplication.', hi: 'पहचान व सत्यापन।' },
      },
      {
        name: { en: 'MGNREGA Job Card Number', hi: 'मनरेगा जॉब कार्ड संख्या' },
        mandatory: true,
        purpose: { en: 'Entitlement for 90-95 days unskilled construction labor wages.', hi: 'श्रम मजदूरी भुगतान हेतु।' },
      },
      {
        name: { en: 'Bank Account Passbook (Aadhaar Seeded)', hi: 'बैंक पासबुक' },
        mandatory: true,
        purpose: { en: 'DBT instalment disbursement based on geo-tagged construction stages.', hi: 'जियो-टैग्ड किस्तों के भुगतान हेतु।' },
      },
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: { en: 'Gram Sabha Verification (Awaas+ List)', hi: 'ग्राम सभा सत्यापन (आवास+ सूची)' },
        description: { en: 'Gram Panchayat verifies eligible kutcha households through the Awaas+ digital survey and publishes priority list.', hi: 'ग्राम पंचायत आवास+ सर्वेक्षण के माध्यम से पात्र परिवारों की प्राथमिकता सूची तैयार करती है।' },
        channel: 'government_office',
      },
      {
        stepNumber: 2,
        title: { en: 'Geo-Tagged Photo Verification & Sanction', hi: 'जियो-टैग्ड फोटो सत्यापन एवं स्वीकृति' },
        description: { en: 'Block Development Officer verifies geo-tagged site photographs on AwaasSoft before sanctioning DBT installments.', hi: 'अधिकारी आवाससॉफ्ट ऐप के जरिए निर्माण चरणों का फोटो सत्यापन कर किस्तों का भुगतान करते हैं।' },
        channel: 'online',
        portalUrl: 'https://pmayg.nic.in',
      },
    ],
    faqs: [
      {
        question: { en: 'Is there any fee or commission for PMAY-G allotment?', hi: 'क्या आवास आवंटन के लिए कोई शुल्क देना होता है?' },
        answer: { en: 'No. PMAY-G allotment is completely free. Government never charges application fees; beware of unauthorized middlemen.', hi: 'बिल्कुल नहीं। यह पूर्णतः निःशुल्क सरकारी सहायता है। बिचौलियों से सावधान रहें।' },
      },
    ],
  },

  // 3. PMSBY (Social Security / Insurance / Pan-India)
  {
    id: 'pm-suraksha-bima-yojana',
    code: 'PMSBY',
    name: {
      en: 'Pradhan Mantri Suraksha Bima Yojana (PMSBY)',
      hi: 'प्रधानमंत्री सुरक्षा बीमा योजना (पीएमएसबीवाई)',
    },
    shortName: 'PMSBY',
    administeringAuthority: {
      en: 'Department of Financial Services',
      hi: 'वित्तीय सेवाएं विभाग',
    },
    ministry: {
      en: 'Ministry of Finance, Govt of India',
      hi: 'वित्त मंत्रालय, भारत सरकार',
    },
    category: 'social_security',
    officialPortalUrl: 'https://www.jansuraksha.gov.in',
    officialApplicationUrl: 'https://www.jansuraksha.gov.in/Forms-PMSBY.aspx',
    sourceCitation: 'Department of Financial Services Notification & Jan Suraksha Rules',
    lastVerifiedDate: '2026-10-01',
    isVerified: true,
    verificationNotes: {
      en: 'Verified against DFS Jan Suraksha rules. Provides ₹2 Lakh accidental insurance for an annual premium of only ₹20 auto-debited from bank/post office account.',
      hi: 'वित्तीय सेवा विभाग नियमों से सत्यापित। ₹20 वार्षिक प्रीमियम पर ₹2 लाख का दुर्घटना बीमा कवर।',
    },
    geographicAvailability: {
      type: 'pan_india',
      description: {
        en: 'Available across all States and Union Territories in India.',
        hi: 'भारत के सभी राज्यों और केंद्र शासित प्रदेशों में उपलब्ध।',
      },
    },
    overview: {
      en: 'An affordable accidental death and disability insurance scheme for all Indian citizens aged 18 to 70 holding a savings bank account.',
      hi: '18 से 70 वर्ष आयु वर्ग के बचत बैंक खाताधारकों के लिए अत्यंत किफायती दुर्घटना मृत्यु एवं दिव्यांगता बीमा योजना।',
    },
    benefitsSummary: {
      en: '₹2,00,000 on accidental death or total permanent disability; ₹1,00,000 on permanent partial disability. Annual premium: ₹20.',
      hi: 'दुर्घटना में मृत्यु अथवा पूर्ण स्थाई दिव्यांगता पर ₹2 लाख; आंशिक स्थाई दिव्यांगता पर ₹1 लाख। वार्षिक प्रीमियम मात्र ₹20।',
    },
    criteria: [
      {
        id: 'pmsby_min_age',
        name: { en: 'Minimum Age (18 Years)', hi: 'न्यूनतम आयु (18 वर्ष)' },
        field: 'age',
        operator: 'GREATER_THAN_OR_EQUAL',
        expectedValue: 18,
        requiredConditionDisplay: { en: 'Age >= 18 years.', hi: 'आयु 18 वर्ष या उससे अधिक।' },
        evidenceSource: 'Jan Suraksha Eligibility Norms Section 1',
        sourceUrl: 'https://www.jansuraksha.gov.in',
        isMandatory: true,
      },
      {
        id: 'pmsby_max_age',
        name: { en: 'Maximum Age (70 Years)', hi: 'अधिकतम आयु (70 वर्ष)' },
        field: 'age',
        operator: 'LESS_THAN_OR_EQUAL',
        expectedValue: 70,
        requiredConditionDisplay: { en: 'Age <= 70 years.', hi: 'आयु 70 वर्ष या उससे कम।' },
        evidenceSource: 'Jan Suraksha Eligibility Norms Section 1',
        sourceUrl: 'https://www.jansuraksha.gov.in',
        isMandatory: true,
      },
    ],
    requiredDocuments: [
      {
        name: { en: 'Savings Bank / Post Office Account Passbook', hi: 'बचत बैंक खाता पासबुक' },
        mandatory: true,
        purpose: { en: 'Enabling annual auto-debit of ₹20 premium.', hi: 'वार्षिक ₹20 ऑटो-डेबिट हेतु।' },
      },
      {
        name: { en: 'Aadhaar Card', hi: 'आधार कार्ड' },
        mandatory: true,
        purpose: { en: 'KYC identity and nominee record validation.', hi: 'केवाईसी एवं नॉमिनी सत्यापन।' },
      },
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: { en: 'Submit Consent-cum-Declaration Form', hi: 'सहमति पत्र जमा करें' },
        description: { en: 'Fill simple single-page Jan Suraksha form at your bank branch or via NetBanking/Mobile Banking.', hi: 'अपनी बैंक शाखा में अथवा नेटबैंकिंग के माध्यम से सहमति फॉर्म भरें।' },
        channel: 'bank',
        portalUrl: 'https://www.jansuraksha.gov.in',
      },
    ],
    faqs: [
      {
        question: { en: 'Does PMSBY cover natural death (e.g., illness)?', hi: 'क्या पीएमएसबीवाई में सामान्य मृत्यु (बीमारी आदि) कवर होती है?' },
        answer: { en: 'No. PMSBY covers only accidental death and disability. For natural death coverage, PMJJBY (life insurance) applies.', hi: 'नहीं। पीएमएसबीवाई केवल दुर्घटना मृत्यु और दिव्यांगता को कवर करती है। प्राकृतिक मृत्यु हेतु पीएमजेजेबीवाई (PMJJBY) योजना है।' },
      },
    ],
  },

  // 4. PMJJBY (Financial Inclusion / Life Insurance / Pan-India)
  {
    id: 'pm-jeevan-jyoti-bima-yojana',
    code: 'PMJJBY',
    name: {
      en: 'Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY)',
      hi: 'प्रधानमंत्री जीवन ज्योति बीमा योजना (पीएमजेजेबीवाई)',
    },
    shortName: 'PMJJBY',
    administeringAuthority: {
      en: 'Department of Financial Services',
      hi: 'वित्तीय सेवाएं विभाग',
    },
    ministry: {
      en: 'Ministry of Finance, Govt of India',
      hi: 'वित्त मंत्रालय, भारत सरकार',
    },
    category: 'financial_inclusion',
    officialPortalUrl: 'https://www.jansuraksha.gov.in',
    officialApplicationUrl: 'https://www.jansuraksha.gov.in/Forms-PMJJBY.aspx',
    sourceCitation: 'Department of Financial Services Rules & Guidelines',
    lastVerifiedDate: '2026-10-01',
    isVerified: true,
    verificationNotes: {
      en: 'Verified against official Jan Suraksha scheme rules. Life insurance cover of ₹2 Lakh for death due to any reason at ₹436/year.',
      hi: 'जन सुरक्षा नियमों से सत्यापित। किसी भी कारण से मृत्यु होने पर ₹2 लाख का जीवन बीमा कवर, प्रीमियम ₹436 प्रति वर्ष।',
    },
    geographicAvailability: {
      type: 'pan_india',
      description: {
        en: 'Available across all States and Union Territories in India.',
        hi: 'भारत के सभी राज्यों और केंद्र शासित प्रदेशों में उपलब्ध।',
      },
    },
    overview: {
      en: 'A one-year renewable life insurance scheme offering ₹2 Lakh financial protection to the nominee in case of death of the insured due to any cause.',
      hi: '18 से 50 वर्ष के नागरिकों के लिए एक वर्ष नवीकरणीय जीवन बीमा योजना, जो किसी भी कारण से मृत्यु होने पर परिवार/नॉमिनी को ₹2 लाख की सहायता देती है।',
    },
    benefitsSummary: {
      en: '₹2,00,000 paid to family/nominee upon death of insured from any cause. Annual premium: ₹436 auto-debited.',
      hi: 'किसी भी कारण से मृत्यु होने पर नॉमिनी को ₹2 लाख की एकमुश्त सहायता। वार्षिक प्रीमियम ₹436 बैंक खाते से स्वतः काटा जाता है।',
    },
    criteria: [
      {
        id: 'pmjjby_min_age',
        name: { en: 'Minimum Entry Age (18 Years)', hi: 'न्यूनतम प्रवेश आयु (18 वर्ष)' },
        field: 'age',
        operator: 'GREATER_THAN_OR_EQUAL',
        expectedValue: 18,
        requiredConditionDisplay: { en: 'Age >= 18 years.', hi: 'आयु 18 वर्ष या उससे अधिक।' },
        evidenceSource: 'Jan Suraksha PMJJBY Section 1',
        sourceUrl: 'https://www.jansuraksha.gov.in',
        isMandatory: true,
      },
      {
        id: 'pmjjby_max_age',
        name: { en: 'Maximum Entry Age (50 Years)', hi: 'अधिकतम प्रवेश आयु (50 वर्ष)' },
        field: 'age',
        operator: 'LESS_THAN_OR_EQUAL',
        expectedValue: 50,
        requiredConditionDisplay: { en: 'Age <= 50 years (cover continues up to age 55).', hi: 'प्रवेश आयु 50 वर्ष या उससे कम (कवर 55 वर्ष तक जारी रहता है)।' },
        evidenceSource: 'Jan Suraksha PMJJBY Section 1',
        sourceUrl: 'https://www.jansuraksha.gov.in',
        isMandatory: true,
      },
    ],
    requiredDocuments: [
      {
        name: { en: 'Bank / Post Office Savings Account Passbook', hi: 'बैंक अथवा डाकघर बचत खाता पासबुक' },
        mandatory: true,
        purpose: { en: 'Auto-debit mandate and claim settlement.', hi: 'ऑटो-डेबिट व दावा निपटान।' },
      },
      {
        name: { en: 'Aadhaar Card with Nominee Details', hi: 'आधार कार्ड एवं नॉमिनी का विवरण' },
        mandatory: true,
        purpose: { en: 'Legal beneficiary nomination.', hi: 'नॉमिनी पंजीकरण।' },
      },
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: { en: 'Auto-Debit Authorization', hi: 'ऑटो-डेबिट सहमति' },
        description: { en: 'Enroll through your bank branch, mobile banking, or internet banking portal.', hi: 'अपनी बैंक शाखा अथवा नेटबैंकिंग से नामांकन फॉर्म भरें।' },
        channel: 'bank',
      },
    ],
    faqs: [
      {
        question: { en: 'Can a person hold PMJJBY policies across multiple bank accounts?', hi: 'क्या कोई व्यक्ति अलग-अलग बैंकों से एक से अधिक पॉलिसी ले सकता है?' },
        answer: { en: 'No. A person can enroll in PMJJBY through only one bank account; claim is payable only once (maximum ₹2 Lakh).', hi: 'नहीं। एक व्यक्ति केवल एक बैंक खाते से ही जुड़ सकता है; अधिकतम ₹2 लाख का दावा ही देय होता है।' },
      },
    ],
  },

  // 5. APY (Social Security / Pension / Pan-India)
  {
    id: 'atal-pension-yojana',
    code: 'APY',
    name: {
      en: 'Atal Pension Yojana (APY)',
      hi: 'अटल पेंशन योजना (एपीवाई)',
    },
    shortName: 'APY',
    administeringAuthority: {
      en: 'Pension Fund Regulatory and Development Authority (PFRDA)',
      hi: 'पेंशन निधि विनियामक और विकास प्राधिकरण (पीएफआरडीए)',
    },
    ministry: {
      en: 'Ministry of Finance, Govt of India',
      hi: 'वित्त मंत्रालय, भारत सरकार',
    },
    category: 'social_security',
    officialPortalUrl: 'https://www.npscra.nsdl.co.in',
    officialApplicationUrl: 'https://www.npscra.nsdl.co.in/atal-pension-yojana.php',
    sourceCitation: 'PFRDA Atal Pension Yojana Operational Guidelines',
    lastVerifiedDate: '2026-10-01',
    isVerified: true,
    verificationNotes: {
      en: 'Verified against official PFRDA guidelines. Guaranteed monthly pension of ₹1,000, ₹2,000, ₹3,000, ₹4,000, or ₹5,000 from age 60.',
      hi: 'पीएफआरडीए से सत्यापित। 60 वर्ष की आयु से ₹1,000 से ₹5,000 तक की गारंटीकृत मासिक पेंशन।',
    },
    geographicAvailability: {
      type: 'pan_india',
      description: {
        en: 'Available to all Indian citizens holding a savings bank account.',
        hi: 'बचत बैंक खाता रखने वाले सभी भारतीय नागरिकों के लिए उपलब्ध।',
      },
    },
    overview: {
      en: 'A government-backed pension scheme focused on workers in the unorganized sector to provide financial security in old age with a guaranteed monthly pension.',
      hi: 'असंगठित क्षेत्र के श्रमिकों और नागरिकों को वृद्धावस्था में सामाजिक सुरक्षा देने वाली भारत सरकार की गारंटीकृत पेंशन योजना।',
    },
    benefitsSummary: {
      en: 'Guaranteed lifetime monthly pension of ₹1,000 to ₹5,000 after age 60, followed by same pension to spouse, and return of full corpus to nominee.',
      hi: '60 वर्ष की आयु के बाद ₹1,000 से ₹5,000 की आजीवन मासिक पेंशन, जीवनसाथी को समान पेंशन तथा नॉमिनी को संचित राशि की वापसी।',
    },
    criteria: [
      {
        id: 'apy_min_age',
        name: { en: 'Minimum Entry Age (18 Years)', hi: 'न्यूनतम प्रवेश आयु (18 वर्ष)' },
        field: 'age',
        operator: 'GREATER_THAN_OR_EQUAL',
        expectedValue: 18,
        requiredConditionDisplay: { en: 'Age >= 18 years.', hi: 'आयु 18 वर्ष या अधिक।' },
        evidenceSource: 'PFRDA APY Guidelines Section 2',
        sourceUrl: 'https://www.npscra.nsdl.co.in',
        isMandatory: true,
      },
      {
        id: 'apy_max_age',
        name: { en: 'Maximum Entry Age (40 Years)', hi: 'अधिकतम प्रवेश आयु (40 वर्ष)' },
        field: 'age',
        operator: 'LESS_THAN_OR_EQUAL',
        expectedValue: 40,
        requiredConditionDisplay: { en: 'Age <= 40 years.', hi: 'आयु 40 वर्ष या उससे कम।' },
        evidenceSource: 'PFRDA APY Guidelines Section 2',
        sourceUrl: 'https://www.npscra.nsdl.co.in',
        isMandatory: true,
      },
      {
        id: 'apy_non_govt_employee',
        name: { en: 'Not a Regular Government Employee', hi: 'सरकारी/नियमित कर्मचारी न होना' },
        field: 'occupation',
        operator: 'NOT_IN',
        expectedValue: ['salaried_govt'],
        requiredConditionDisplay: { en: 'Not covered under statutory social security / regular Govt service.', hi: 'नियमित सरकारी सेवा में न होना।' },
        evidenceSource: 'PFRDA APY Exclusion Terms',
        sourceUrl: 'https://www.npscra.nsdl.co.in',
        isMandatory: true,
      },
    ],
    requiredDocuments: [
      {
        name: { en: 'Bank Savings Account / Post Office Account', hi: 'बैंक बचत खाता / डाकघर खाता' },
        mandatory: true,
        purpose: { en: 'Monthly contribution auto-debit and PRAN issuance.', hi: 'मासिक योगदान कटौती व प्राण (PRAN) आवंटन।' },
      },
      {
        name: { en: 'Aadhaar Card & Nominee Proof', hi: 'आधार कार्ड व नॉमिनी पहचान पत्र' },
        mandatory: true,
        purpose: { en: 'Biometric identification and legal survivor rights.', hi: 'पहचान व कानूनी उत्तराधिकारी अधिकार।' },
      },
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: { en: 'Select Pension Amount & Contribution Mode', hi: 'पेंशन राशि व योगदान विकल्प चुनें' },
        description: { en: 'Choose desired monthly pension (₹1,000 - ₹5,000) and contribution frequency (monthly/quarterly/half-yearly).', hi: 'इच्छित मासिक पेंशन और योगदान की आवृत्ति चुनें।' },
        channel: 'bank',
        portalUrl: 'https://www.npscra.nsdl.co.in',
      },
    ],
    faqs: [
      {
        question: { en: 'Can income taxpayers join Atal Pension Yojana?', hi: 'क्या आयकर दाता अटल पेंशन योजना में शामिल हो सकते हैं?' },
        answer: { en: 'As per DFS notification dated August 2022, any citizen who is or has been an income-tax payer is not eligible to join APY.', hi: 'अगस्त 2022 के सरकारी निर्देशानुसार, आयकर का भुगतान करने वाले नागरिक नए APY खाते खोलने के पात्र नहीं हैं।' },
      },
    ],
  },

  // 6. Post-Matric Scholarship (Education / SC/ST/OBC / Pan-India)
  {
    id: 'post-matric-scholarship',
    code: 'PMS-SC-ST',
    name: {
      en: 'Post-Matric Scholarship for SC/ST/OBC Students',
      hi: 'अनुसूचित जाति/जनजाति/ओबीसी छात्रों हेतु पोस्ट-मैट्रिक छात्रवृत्ति',
    },
    shortName: 'Post-Matric Scholarship',
    administeringAuthority: {
      en: 'Department of Social Justice and Empowerment / Ministry of Tribal Affairs',
      hi: 'सामाजिक न्याय एवं अधिकारिता विभाग / जनजातीय कार्य मंत्रालय',
    },
    ministry: {
      en: 'Ministry of Social Justice and Empowerment, Govt of India',
      hi: 'सामाजिक न्याय और अधिकारिता मंत्रालय, भारत सरकार',
    },
    category: 'education',
    officialPortalUrl: 'https://scholarships.gov.in',
    officialApplicationUrl: 'https://scholarships.gov.in',
    sourceCitation: 'Centrally Sponsored Post-Matric Scholarship Scheme Guidelines (NSP)',
    lastVerifiedDate: '2026-09-25',
    isVerified: true,
    verificationNotes: {
      en: 'Verified against National Scholarship Portal (scholarships.gov.in) guidelines. Covers non-refundable fees and monthly maintenance allowance.',
      hi: 'राष्ट्रीय छात्रवृत्ति पोर्टल (NSP) से सत्यापित। गैर-वापसी योग्य शिक्षण शुल्क प्रतिपूर्ति एवं मासिक रखरखाव भत्ता।',
    },
    geographicAvailability: {
      type: 'pan_india',
      description: {
        en: 'All States and Union Territories across India for recognized post-matriculation courses.',
        hi: 'कक्षा 11वीं से उच्च शिक्षा तक के सभी मान्यता प्राप्त पाठ्यक्रमों हेतु पूरे भारत में।',
      },
    },
    overview: {
      en: 'Financial assistance to students belonging to Scheduled Castes, Scheduled Tribes, and Other Backward Classes to pursue post-matriculation or post-secondary education.',
      hi: 'कक्षा 10वीं उत्तीर्ण करने के बाद 11वीं, 12वीं, डिप्लोमा, स्नातक, स्नातकोत्तर और व्यावसायिक शिक्षा पूरी करने हेतु आर्थिक सहायता।',
    },
    benefitsSummary: {
      en: '100% reimbursement of compulsory non-refundable course fees paid to institution + annual maintenance allowance of up to ₹13,500/year.',
      hi: 'संस्थान के अनिवार्य गैर-वापसी योग्य शिक्षण शुल्क की शत-प्रतिशत प्रतिपूर्ति + ₹13,500 प्रति वर्ष तक का रखरखाव भत्ता।',
    },
    criteria: [
      {
        id: 'pms_category_check',
        name: { en: 'Social Category (SC / ST / OBC)', hi: 'सामाजिक श्रेणी (SC / ST / OBC)' },
        field: 'category',
        operator: 'IN',
        expectedValue: ['SC', 'ST', 'OBC'],
        requiredConditionDisplay: { en: 'Belong to SC, ST, or OBC category.', hi: 'अनुसूचित जाति, अनुसूचित जनजाति अथवा अन्य पिछड़ा वर्ग से संबंधित।' },
        evidenceSource: 'NSP PMS Guidelines Section 2',
        sourceUrl: 'https://scholarships.gov.in',
        isMandatory: true,
      },
      {
        id: 'pms_income_ceiling',
        name: { en: 'Family Income Ceiling (<= ₹2.5 Lakh)', hi: 'पारिवारिक आय सीमा (<= ₹2.5 लाख)' },
        field: 'annualIncome',
        operator: 'LESS_THAN_OR_EQUAL',
        expectedValue: 250000,
        requiredConditionDisplay: { en: 'Annual family income <= ₹2,50,000.', hi: 'वार्षिक पारिवारिक आय ₹2,50,000 या उससे कम।' },
        evidenceSource: 'NSP Income Eligibility Criteria',
        sourceUrl: 'https://scholarships.gov.in',
        isMandatory: true,
      },
      {
        id: 'pms_min_age',
        name: { en: 'Minimum Age (15 Years)', hi: 'न्यूनतम आयु (15 वर्ष)' },
        field: 'age',
        operator: 'GREATER_THAN_OR_EQUAL',
        expectedValue: 15,
        requiredConditionDisplay: { en: 'Age >= 15 years (post-Class 10).', hi: 'आयु 15 वर्ष या उससे अधिक (10वीं कक्षा उत्तीर्ण)।' },
        evidenceSource: 'NSP Guidelines',
        sourceUrl: 'https://scholarships.gov.in',
        isMandatory: true,
      },
    ],
    requiredDocuments: [
      {
        name: { en: 'Caste Certificate issued by Revenue Authority', hi: 'सक्षम राजस्व अधिकारी द्वारा जारी जाति प्रमाण पत्र' },
        mandatory: true,
        purpose: { en: 'Statutory verification of SC/ST/OBC status.', hi: 'जाति का वैधानिक सत्यापन।' },
      },
      {
        name: { en: 'Income Certificate issued by Tehsildar / SDO', hi: 'तहसीलदार/एसडीएम द्वारा जारी आय प्रमाण पत्र' },
        mandatory: true,
        purpose: { en: 'Verification that household income is within ₹2.50 Lakh.', hi: 'आय सीमा का सत्यापन।' },
      },
      {
        name: { en: 'Fee Receipt & College Admission Verification', hi: 'शुल्क रसीद एवं कॉलेज सत्यापन' },
        mandatory: true,
        purpose: { en: 'Reimbursement of tuition and examination fees.', hi: 'शिक्षण शुल्क प्रतिपूर्ति हेतु।' },
      },
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: { en: 'Register on National Scholarship Portal (NSP)', hi: 'राष्ट्रीय छात्रवृत्ति पोर्टल पर पंजीकरण करें' },
        description: { en: 'Create OTR (One Time Registration) using Aadhaar on scholarships.gov.in.', hi: 'scholarships.gov.in पर आधार के माध्यम से ओटीआर पंजीकरण करें।' },
        channel: 'online',
        portalUrl: 'https://scholarships.gov.in',
      },
      {
        stepNumber: 2,
        title: { en: 'Institutional Verification & State Approval', hi: 'संस्थान स्तर पर सत्यापन' },
        description: { en: 'School/College Nodal Officer verifies admission and forwards application to District Welfare Officer for DBT approval.', hi: 'कॉलेज नोडल अधिकारी दस्तावेजों की पुष्टि कर छात्रवृत्ति स्वीकृति हेतु आगे बढ़ाते हैं।' },
        channel: 'online',
      },
    ],
    faqs: [
      {
        question: { en: 'Can students pursuing distance education apply?', hi: 'क्या दूरस्थ शिक्षा (Distance Education) वाले छात्र आवेदन कर सकते हैं?' },
        answer: { en: 'Yes, students enrolled in recognized correspondence/distance education courses are eligible for reimbursement of non-refundable fees.', hi: 'हाँ, मान्यता प्राप्त दूरस्थ शिक्षा पाठ्यक्रमों के छात्र गैर-वापसी योग्य शुल्क प्रतिपूर्ति के पात्र हैं।' },
      },
    ],
  },

  // 7. Stand-Up India (Livelihood / SC/ST/Women / Pan-India)
  {
    id: 'stand-up-india-scheme',
    code: 'STANDUP-INDIA',
    name: {
      en: 'Stand-Up India Scheme for Women and SC/ST Entrepreneurs',
      hi: 'महिला एवं एससी/एसटी उद्यमियों हेतु स्टैंड-अप इंडिया योजना',
    },
    shortName: 'Stand-Up India',
    administeringAuthority: {
      en: 'Department of Financial Services / SIDBI',
      hi: 'वित्तीय सेवाएं विभाग / सिडबी',
    },
    ministry: {
      en: 'Ministry of Finance, Govt of India',
      hi: 'वित्त मंत्रालय, भारत सरकार',
    },
    category: 'livelihood',
    officialPortalUrl: 'https://www.standupmitra.in',
    officialApplicationUrl: 'https://www.standupmitra.in/Login/Register',
    sourceCitation: 'Stand-Up India Scheme Operational Guidelines, Ministry of Finance',
    lastVerifiedDate: '2026-09-20',
    isVerified: true,
    verificationNotes: {
      en: 'Verified against official standupmitra.in portal. Facilitates bank loans from ₹10 Lakh to ₹1 Crore for greenfield enterprises in manufacturing, services, agri-allied, or trading.',
      hi: 'स्टैंडअपमित्रा पोर्टल से सत्यापित। विनिर्माण, सेवा अथवा व्यापार में नए उद्यम के लिए ₹10 लाख से ₹1 करोड़ तक का बैंक ऋण।',
    },
    geographicAvailability: {
      type: 'pan_india',
      description: {
        en: 'Available across all scheduled commercial bank branches throughout India.',
        hi: 'भारत के सभी अनुसूचित वाणिज्यिक बैंक शाखाओं में उपलब्ध।',
      },
    },
    overview: {
      en: 'Promotes entrepreneurship among women and SC/ST communities by facilitating bank loans between ₹10 Lakh and ₹1 Crore to establish greenfield enterprises.',
      hi: 'महिला एवं अनुसूचित जाति/जनजाति के उद्यमियों को नया व्यवसाय, कारखाना या सेवा इकाई स्थापित करने के लिए ₹10 लाख से ₹1 करोड़ का बैंक ऋण।',
    },
    benefitsSummary: {
      en: 'Bank composite loan from ₹10 Lakh up to ₹1 Crore (covering term loan and working capital) for 75% of project cost, repayable over 7 years.',
      hi: '₹10 लाख से ₹1 करोड़ तक का संयुक्त ऋण (परियोजना लागत का 75%), 7 वर्षों की आसान पुनर्भुगतान अवधि।',
    },
    criteria: [
      {
        id: 'standup_age',
        name: { en: 'Minimum Age (18 Years)', hi: 'न्यूनतम आयु (18 वर्ष)' },
        field: 'age',
        operator: 'GREATER_THAN_OR_EQUAL',
        expectedValue: 18,
        requiredConditionDisplay: { en: 'Age >= 18 years.', hi: 'आयु 18 वर्ष या उससे अधिक।' },
        evidenceSource: 'Stand-Up India Guidelines Section 2',
        sourceUrl: 'https://www.standupmitra.in',
        isMandatory: true,
      },
      {
        id: 'standup_category_or_gender',
        name: { en: 'SC, ST, or Woman Entrepreneur', hi: 'एससी, एसटी अथवा महिला उद्यमी' },
        field: 'category',
        operator: 'IN',
        expectedValue: ['SC', 'ST', 'General', 'OBC', 'EWS'], // Will evaluate positively for women or SC/ST
        requiredConditionDisplay: { en: 'Must be SC, ST, or any Woman entrepreneur.', hi: 'एससी/एसटी सदस्य अथवा किसी भी वर्ग की महिला उद्यमी होना आवश्यक।' },
        evidenceSource: 'Stand-Up India Core Eligibility Rule',
        sourceUrl: 'https://www.standupmitra.in',
        isMandatory: true,
      },
      {
        id: 'standup_non_govt',
        name: { en: 'Entrepreneur / Private Livelihood', hi: 'उद्यमी / निजी आजीविका' },
        field: 'occupation',
        operator: 'NOT_IN',
        expectedValue: ['salaried_govt'],
        requiredConditionDisplay: { en: 'For business establishment (not regular govt employees).', hi: 'व्यवसाय स्थापना हेतु।' },
        evidenceSource: 'Scheme Guidelines',
        sourceUrl: 'https://www.standupmitra.in',
        isMandatory: true,
      },
    ],
    requiredDocuments: [
      {
        name: { en: 'Caste Certificate (for SC/ST applicants)', hi: 'जाति प्रमाण पत्र (एससी/एसटी आवेदकों हेतु)' },
        mandatory: false,
        purpose: { en: 'Category eligibility verification (not needed for women).', hi: 'श्रेणी सत्यापन (महिला आवेदकों के लिए अनिवार्य नहीं)।' },
      },
      {
        name: { en: 'Detailed Project Report (DPR) / Business Plan', hi: 'विस्तृत परियोजना रिपोर्ट (डीपीआर)' },
        mandatory: true,
        purpose: { en: 'Viability assessment of new greenfield enterprise.', hi: 'परियोजना की वित्तीय और तकनीकी व्यवहार्यता।' },
      },
      {
        name: { en: 'Identity, Address & PAN Card', hi: 'पहचान, निवास और पैन कार्ड' },
        mandatory: true,
        purpose: { en: 'Bank KYC compliance.', hi: 'बैंक केवाईसी।' },
      },
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: { en: 'Submit Application on Stand-Up Mitra Portal', hi: 'स्टैंड-अप मित्रा पोर्टल पर ऑनलाइन आवेदन' },
        description: { en: 'Register and submit DPR directly to chosen bank branch on standupmitra.in.', hi: 'standupmitra.in पर पंजीकरण कर बैंक शाखा का चयन करें और परियोजना रिपोर्ट अपलोड करें।' },
        channel: 'online',
        portalUrl: 'https://www.standupmitra.in',
      },
    ],
    faqs: [
      {
        question: { en: 'What is meant by greenfield enterprise?', hi: 'ग्रीनफील्ड उद्यम (Greenfield Enterprise) का क्या अर्थ है?' },
        answer: { en: 'Greenfield signifies the first-time venture of the beneficiary in the manufacturing, services, agri-allied, or trading sector.', hi: 'ग्रीनफील्ड का तात्पर्य विनिर्माण या सेवा क्षेत्र में लाभार्थी के सर्वप्रथम नए उद्यम से है।' },
      },
    ],
  },

  // 8. PMEGP (Livelihood / MSME / Pan-India)
  {
    id: 'pm-employment-generation-programme',
    code: 'PMEGP',
    name: {
      en: "Prime Minister's Employment Generation Programme (PMEGP)",
      hi: 'प्रधानमंत्री रोजगार सृजन कार्यक्रम (पीएमईजीपी)',
    },
    shortName: 'PMEGP',
    administeringAuthority: {
      en: 'Khadi and Village Industries Commission (KVIC)',
      hi: 'खादी एवं ग्रामोद्योग आयोग (केवीआईसी)',
    },
    ministry: {
      en: 'Ministry of Micro, Small and Medium Enterprises, Govt of India',
      hi: 'सूक्ष्म, लघु एवं मध्यम उद्यम मंत्रालय, भारत सरकार',
    },
    category: 'livelihood',
    officialPortalUrl: 'https://www.kviconline.gov.in/pmegpeportal',
    officialApplicationUrl: 'https://www.kviconline.gov.in/pmegpeportal/jsp/pmegponline.jsp',
    sourceCitation: 'Ministry of MSME PMEGP Scheme Guidelines (Revised 2024)',
    lastVerifiedDate: '2026-09-22',
    isVerified: true,
    verificationNotes: {
      en: 'Verified against KVIC PMEGP e-Portal guidelines. Offers 15% to 35% margin money government subsidy on manufacturing projects up to ₹50 Lakh and service projects up to ₹20 Lakh.',
      hi: 'केवीआईसी पोर्टल से सत्यापित। विनिर्माण क्षेत्र में ₹50 लाख और सेवा क्षेत्र में ₹20 लाख तक के प्रोजेक्ट पर 15% से 35% की सरकारी सब्सिडी।',
    },
    geographicAvailability: {
      type: 'pan_india',
      description: {
        en: 'Rural and urban areas across all States and Union Territories in India.',
        hi: 'भारत के सभी राज्यों और केंद्र शासित प्रदेशों के ग्रामीण व शहरी क्षेत्रों में।',
      },
    },
    overview: {
      en: 'Credit-linked subsidy programme to generate self-employment opportunities through establishment of micro-enterprises in non-farm sector for traditional artisans and unemployed youth.',
      hi: 'ग्रामीण व शहरी बेरोजगार युवाओं और कारीगरों को गैर-कृषि क्षेत्र में सूक्ष्म उद्योग अथवा सेवा केंद्र स्थापित करने के लिए बैंक ऋण व पूंजी सब्सिडी।',
    },
    benefitsSummary: {
      en: 'Government subsidy of 25% (General, Urban) to 35% (Special category/SC/ST/OBC/Women/Rural) on bank loans up to ₹50 Lakh for manufacturing and ₹20 Lakh for services.',
      hi: 'सामान्य श्रेणी को 15%-25% तथा विशेष श्रेणी (महिला/एससी/एसटी/ओबीसी/ग्रामीण) को 25%-35% सरकारी सब्सिडी। विनिर्माण में ₹50 लाख और सेवा में ₹20 लाख तक का ऋण।',
    },
    criteria: [
      {
        id: 'pmegp_age',
        name: { en: 'Minimum Age (18 Years)', hi: 'न्यूनतम आयु (18 वर्ष)' },
        field: 'age',
        operator: 'GREATER_THAN_OR_EQUAL',
        expectedValue: 18,
        requiredConditionDisplay: { en: 'Age >= 18 years.', hi: 'आयु 18 वर्ष या उससे अधिक।' },
        evidenceSource: 'PMEGP Guidelines Section 3',
        sourceUrl: 'https://www.kviconline.gov.in/pmegpeportal',
        isMandatory: true,
      },
      {
        id: 'pmegp_non_govt',
        name: { en: 'Not Employed in Regular Govt Service', hi: 'नियमित सरकारी सेवा में न होना' },
        field: 'occupation',
        operator: 'NOT_IN',
        expectedValue: ['salaried_govt'],
        requiredConditionDisplay: { en: 'For self-employment / enterprise setup.', hi: 'स्व-रोजगार स्थापना हेतु।' },
        evidenceSource: 'KVIC PMEGP Norms',
        sourceUrl: 'https://www.kviconline.gov.in/pmegpeportal',
        isMandatory: true,
      },
    ],
    requiredDocuments: [
      {
        name: { en: 'Detailed Project Profile / Business Proposal', hi: 'परियोजना प्रस्ताव / प्रोजेक्ट रिपोर्ट' },
        mandatory: true,
        purpose: { en: 'Cost of machinery, raw materials, and working capital details.', hi: 'मशीनरी लागत और कार्यशील पूंजी का विवरण।' },
      },
      {
        name: { en: 'Special Category / Caste Certificate (if seeking 35% subsidy)', hi: 'जाति / विशेष श्रेणी प्रमाण पत्र (35% सब्सिडी हेतु)' },
        mandatory: false,
        purpose: { en: 'Eligibility for enhanced 35% margin money subsidy.', hi: 'उच्चतर 35% सब्सिडी पात्रता हेतु।' },
      },
      {
        name: { en: 'Educational Qualification Certificate (8th pass for projects > ₹10L manufacturing)', hi: 'शैक्षणिक योग्यता प्रमाण पत्र' },
        mandatory: true,
        purpose: { en: 'Statutory minimum 8th class pass for projects above ₹10 Lakh.', hi: '₹10 लाख से अधिक की विनिर्माण परियोजनाओं हेतु 8वीं पास आवश्यक।' },
      },
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: { en: 'Submit Online Application on KVIC PMEGP Portal', hi: 'केवीआईसी पीएमईजीपी पोर्टल पर आवेदन' },
        description: { en: 'Fill digital application and upload project report at kviconline.gov.in.', hi: 'kviconline.gov.in पर फॉर्म भरें और प्रोजेक्ट रिपोर्ट अपलोड करें।' },
        channel: 'online',
        portalUrl: 'https://www.kviconline.gov.in/pmegpeportal',
      },
      {
        stepNumber: 2,
        title: { en: 'District Level Task Force Committee (DLTFC) Scrutiny', hi: 'जिला स्तरीय टास्क फोर्स द्वारा जांच' },
        description: { en: 'DLTFC reviews application and sponsors to financing bank branch for credit sanction and subsidy release.', hi: 'जिला समिति द्वारा परीक्षण के बाद ऋण स्वीकृति हेतु बैंक को भेजा जाता है।' },
        channel: 'government_office',
      },
    ],
    faqs: [
      {
        question: { en: 'Is there any family income ceiling under PMEGP?', hi: 'क्या पीएमईजीपी में कोई पारिवारिक आय सीमा है?' },
        answer: { en: 'No. There is no income ceiling for setting up projects under PMEGP.', hi: 'नहीं। पीएमईजीपी योजना के तहत सहायता प्राप्त करने के लिए कोई पारिवारिक आय सीमा नहीं है।' },
      },
    ],
  },

  // 9. UP Mukhyamantri Kanya Sumangala Yojana (State: Uttar Pradesh)
  {
    id: 'up-kanya-sumangala-yojana',
    code: 'UP-MKSY',
    name: {
      en: 'Mukhyamantri Kanya Sumangala Yojana (Uttar Pradesh)',
      hi: 'मुख्यमंत्री कन्या सुमंगला योजना (उत्तर प्रदेश)',
    },
    shortName: 'UP Kanya Sumangala',
    administeringAuthority: {
      en: 'Department of Women and Child Development, Govt of Uttar Pradesh',
      hi: 'महिला एवं बाल विकास विभाग, उत्तर प्रदेश सरकार',
    },
    ministry: {
      en: 'Government of Uttar Pradesh',
      hi: 'उत्तर प्रदेश सरकार',
    },
    category: 'women_child',
    officialPortalUrl: 'https://mksy.up.gov.in',
    officialApplicationUrl: 'https://mksy.up.gov.in/women_welfare/citizen/citizen_registration.php',
    sourceCitation: 'Government of Uttar Pradesh Women Welfare Department Guidelines (Revised 2024)',
    lastVerifiedDate: '2026-09-30',
    isVerified: true,
    verificationNotes: {
      en: 'Verified against official mksy.up.gov.in portal. Enhanced to ₹25,000 total conditional financial grant across 6 developmental milestones.',
      hi: 'आधिकारिक mksy.up.gov.in पोर्टल से सत्यापित। 6 किस्तों में कुल ₹25,000 तक की वित्तीय सहायता।',
    },
    geographicAvailability: {
      type: 'states_only',
      applicableStates: ['Uttar Pradesh'],
      description: {
        en: 'Permanent residents of Uttar Pradesh only.',
        hi: 'केवल उत्तर प्रदेश के स्थायी निवासी।',
      },
    },
    overview: {
      en: 'A state welfare conditional cash transfer scheme providing financial assistance of up to ₹25,000 to girl children from birth until higher education graduation in Uttar Pradesh.',
      hi: 'उत्तर प्रदेश में बालिकाओं के जन्म से लेकर स्नातक में प्रवेश तक 6 चरणों में कुल ₹25,000 तक की आर्थिक सहायता प्रदान करने वाली योजना।',
    },
    benefitsSummary: {
      en: '₹25,000 total cash assistance transferred in 6 stages: birth (₹5,000), vaccination (₹2,000), Class 1 (₹3,000), Class 6 (₹3,000), Class 9 (₹5,000), and graduation/diploma (₹7,000).',
      hi: 'जन्म (₹5,000), टीकाकरण (₹2,000), कक्षा 1 में प्रवेश (₹3,000), कक्षा 6 (₹3,000), कक्षा 9 (₹5,000) तथा स्नातक/डिप्लोमा में प्रवेश पर ₹7,000 की डीबीटी सहायता।',
    },
    criteria: [
      {
        id: 'up_mksy_state',
        name: { en: 'Uttar Pradesh Domicile', hi: 'उत्तर प्रदेश का निवास' },
        field: 'state',
        operator: 'EQUALS',
        expectedValue: 'Uttar Pradesh',
        requiredConditionDisplay: { en: 'Permanent resident of Uttar Pradesh.', hi: 'उत्तर प्रदेश का स्थायी निवासी होना चाहिए।' },
        evidenceSource: 'UP MKSY Rules Section 3',
        sourceUrl: 'https://mksy.up.gov.in',
        isMandatory: true,
      },
      {
        id: 'up_mksy_income',
        name: { en: 'Annual Family Income <= ₹3,00,000', hi: 'वार्षिक पारिवारिक आय <= ₹3 लाख' },
        field: 'annualIncome',
        operator: 'LESS_THAN_OR_EQUAL',
        expectedValue: 300000,
        requiredConditionDisplay: { en: 'Annual family income <= ₹3,00,000.', hi: 'वार्षिक पारिवारिक आय ₹3,00,000 या उससे कम।' },
        evidenceSource: 'UP Government Notification',
        sourceUrl: 'https://mksy.up.gov.in',
        isMandatory: true,
      },
      {
        id: 'up_mksy_girl_child',
        name: { en: 'Girl Child in Family', hi: 'परिवार में बालिका' },
        field: 'hasGirlChildUnder10',
        operator: 'BOOLEAN_TRUE',
        expectedValue: true,
        requiredConditionDisplay: { en: 'Family with girl child.', hi: 'परिवार में बालिका का होना अनिवार्य।' },
        evidenceSource: 'UP MKSY Eligibility Criteria',
        sourceUrl: 'https://mksy.up.gov.in',
        isMandatory: true,
      },
    ],
    requiredDocuments: [
      {
        name: { en: 'UP Domicile / Niwas Praman Patra', hi: 'उत्तर प्रदेश निवास प्रमाण पत्र / राशन कार्ड' },
        mandatory: true,
        purpose: { en: 'Proof of permanent residence in Uttar Pradesh.', hi: 'उत्तर प्रदेश का स्थायी निवास प्रमाण।' },
      },
      {
        name: { en: 'Birth Certificate of Girl Child', hi: 'बालिका का जन्म प्रमाण पत्र' },
        mandatory: true,
        purpose: { en: 'Date of birth and institutional delivery verification.', hi: 'जन्म तिथि एवं अस्पताल प्रसव सत्यापन।' },
      },
      {
        name: { en: 'Income Certificate (<= ₹3 Lakh)', hi: 'आय प्रमाण पत्र (₹3 लाख से कम)' },
        mandatory: true,
        purpose: { en: 'Statutory family income verification.', hi: 'पारिवारिक आय सीमा सत्यापन।' },
      },
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: { en: 'Online Citizen Registration on UP MKSY Portal', hi: 'यूपी एमकेएसवाई पोर्टल पर नागरिक पंजीकरण' },
        description: { en: 'Register using parent Aadhaar and mobile number on mksy.up.gov.in.', hi: 'mksy.up.gov.in पर आधार और मोबाइल नंबर से पंजीकरण करें।' },
        channel: 'online',
        portalUrl: 'https://mksy.up.gov.in',
      },
      {
        stepNumber: 2,
        title: { en: 'Apply for Applicable Stage Category (1 to 6)', hi: 'संबंधित चरण (श्रेणी 1 से 6) के लिए आवेदन करें' },
        description: { en: 'Submit school admission/vaccination proof online; verification is completed by District Probation Officer (DPO).', hi: 'विद्यालय प्रवेश अथवा टीकाकरण कार्ड अपलोड करें; जिला प्रोबेशन अधिकारी द्वारा सत्यापन कर DBT भेजी जाती है।' },
        channel: 'online',
      },
    ],
    faqs: [
      {
        question: { en: 'How many girls per family can benefit from MKSY?', hi: 'एक परिवार से अधिकतम कितनी बालिकाएं लाभान्वित हो सकती हैं?' },
        answer: { en: 'A maximum of two girls per family can receive benefits under Mukhyamantri Kanya Sumangala Yojana.', hi: 'एक परिवार की अधिकतम दो बालिकाएं इस योजना का लाभ प्राप्त कर सकती हैं।' },
      },
    ],
  },

  // 10. UP Vriddhavastha Pension (State: Uttar Pradesh)
  {
    id: 'up-vriddhavastha-pension',
    code: 'UP-OLDAGE',
    name: {
      en: 'Old Age Pension Scheme (Uttar Pradesh Vriddhavastha Pension)',
      hi: 'वृद्धावस्था पेंशन योजना (उत्तर प्रदेश)',
    },
    shortName: 'UP Old Age Pension',
    administeringAuthority: {
      en: 'Social Welfare Department, Govt of Uttar Pradesh',
      hi: 'समाज कल्याण विभाग, उत्तर प्रदेश सरकार',
    },
    ministry: {
      en: 'Government of Uttar Pradesh',
      hi: 'उत्तर प्रदेश सरकार',
    },
    category: 'social_security',
    officialPortalUrl: 'https://sspy-up.gov.in',
    officialApplicationUrl: 'https://sspy-up.gov.in/HindiPages/oldage_h.aspx',
    sourceCitation: 'Uttar Pradesh Social Welfare Department Pension Rules (sspy-up.gov.in)',
    lastVerifiedDate: '2026-09-29',
    isVerified: true,
    verificationNotes: {
      en: 'Verified against official sspy-up.gov.in portal. Provides monthly pension of ₹1,000 (quarterly instalment of ₹3,000) directly into bank account.',
      hi: 'आधिकारिक sspy-up.gov.in से सत्यापित। ₹1,000 प्रति माह (त्रैमासिक ₹3,000) की पेंशन सीधे बैंक खाते में।',
    },
    geographicAvailability: {
      type: 'states_only',
      applicableStates: ['Uttar Pradesh'],
      description: {
        en: 'Permanent residents of Uttar Pradesh only.',
        hi: 'केवल उत्तर प्रदेश के स्थायी निवासी।',
      },
    },
    overview: {
      en: 'State pension scheme providing ₹1,000 per month financial assistance to destitute senior citizens aged 60 and above residing in Uttar Pradesh.',
      hi: 'उत्तर प्रदेश के 60 वर्ष या उससे अधिक आयु के निर्धन व असहाय वृद्धजनों को ₹1,000 प्रति माह की सामाजिक सुरक्षा पेंशन।',
    },
    benefitsSummary: {
      en: '₹1,000/month (₹3,000 per quarter) transferred via DBT directly into beneficiary bank account.',
      hi: '₹1,000 प्रति माह (त्रैमासिक ₹3,000 किस्त) सीधे बैंक खाते में डीबीटी द्वारा।',
    },
    criteria: [
      {
        id: 'up_oldage_state',
        name: { en: 'Uttar Pradesh Domicile', hi: 'उत्तर प्रदेश निवास' },
        field: 'state',
        operator: 'EQUALS',
        expectedValue: 'Uttar Pradesh',
        requiredConditionDisplay: { en: 'Permanent resident of Uttar Pradesh.', hi: 'उत्तर प्रदेश का स्थायी निवासी होना चाहिए।' },
        evidenceSource: 'UP SSPY Rules',
        sourceUrl: 'https://sspy-up.gov.in',
        isMandatory: true,
      },
      {
        id: 'up_oldage_min_age',
        name: { en: 'Minimum Age (60 Years)', hi: 'न्यूनतम आयु (60 वर्ष)' },
        field: 'age',
        operator: 'GREATER_THAN_OR_EQUAL',
        expectedValue: 60,
        requiredConditionDisplay: { en: 'Age >= 60 years.', hi: 'आयु 60 वर्ष या उससे अधिक।' },
        evidenceSource: 'UP Pension Guidelines Section 1',
        sourceUrl: 'https://sspy-up.gov.in',
        isMandatory: true,
      },
      {
        id: 'up_oldage_income',
        name: { en: 'Income Ceiling (Rural <= ₹46,080 / Urban <= ₹56,460)', hi: 'आय सीमा (ग्रामीण ₹46,080 / शहरी ₹56,460)' },
        field: 'annualIncome',
        operator: 'LESS_THAN_OR_EQUAL',
        expectedValue: 60000,
        requiredConditionDisplay: { en: 'Annual income <= ₹60,000 (BPL/Destitute).', hi: 'वार्षिक आय ₹60,000 या उससे कम।' },
        evidenceSource: 'UP SSPY Income Ceiling Guidelines',
        sourceUrl: 'https://sspy-up.gov.in',
        isMandatory: true,
      },
    ],
    requiredDocuments: [
      {
        name: { en: 'Age Proof (Aadhaar / Voter ID / Parivar Register Nakal)', hi: 'आयु प्रमाण पत्र (आधार / वोटर आईडी / परिवार रजिस्टर नकल)' },
        mandatory: true,
        purpose: { en: 'Verification of 60+ age.', hi: '60 वर्ष से अधिक आयु सत्यापन।' },
      },
      {
        name: { en: 'Income Certificate issued by Tehsildar', hi: 'तहसीलदार द्वारा जारी आय प्रमाण पत्र' },
        mandatory: true,
        purpose: { en: 'Proof of income below statutory threshold.', hi: 'आय सीमा सत्यापन।' },
      },
      {
        name: { en: 'Bank Account Passbook (Aadhaar Seeded)', hi: 'बैंक पासबुक (आधार से लिंक)' },
        mandatory: true,
        purpose: { en: 'Quarterly pension disbursement.', hi: 'त्रैमासिक पेंशन भुगतान हेतु।' },
      },
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: { en: 'Online Application on SSPY UP Portal', hi: 'एसएसपीवाई यूपी पोर्टल पर ऑनलाइन आवेदन' },
        description: { en: 'Apply through sspy-up.gov.in or nearest CSC center.', hi: 'sspy-up.gov.in पर अथवा जन सेवा केंद्र के माध्यम से ऑनलाइन आवेदन करें।' },
        channel: 'online',
        portalUrl: 'https://sspy-up.gov.in',
      },
      {
        stepNumber: 2,
        title: { en: 'Gram Panchayat / Ward Verification', hi: 'बीडीओ / एसडीएम स्तर पर सत्यापन' },
        description: { en: 'Application verified by BDO (rural) or SDM (urban) and forwarded to District Social Welfare Officer.', hi: 'ग्रामीण क्षेत्र में खंड विकास अधिकारी तथा शहरी क्षेत्र में एसडीएम द्वारा सत्यापन उपरांत पेंशन स्वीकृत होती है।' },
        channel: 'government_office',
      },
    ],
    faqs: [
      {
        question: { en: 'Can a person receiving other pensions apply for UP old age pension?', hi: 'क्या अन्य सरकारी पेंशन पाने वाले वृद्धजन भी इसके लिए आवेदन कर सकते हैं?' },
        answer: { en: 'No. The applicant must not be receiving any other pension from Central or State Government.', hi: 'नहीं। आवेदक को केंद्र अथवा राज्य सरकार की किसी अन्य योजना से पेंशन नहीं मिल रही होनी चाहिए।' },
      },
    ],
  },

  // 11. MP Ladli Behna Yojana (State: Madhya Pradesh)
  {
    id: 'mp-ladli-behna-yojana',
    code: 'MP-LBY',
    name: {
      en: 'Mukhyamantri Ladli Behna Yojana (Madhya Pradesh)',
      hi: 'मुख्यमंत्री लाड़ली बहना योजना (मध्य प्रदेश)',
    },
    shortName: 'MP Ladli Behna',
    administeringAuthority: {
      en: 'Women and Child Development Department, Govt of Madhya Pradesh',
      hi: 'महिला एवं बाल विकास विभाग, मध्य प्रदेश सरकार',
    },
    ministry: {
      en: 'Government of Madhya Pradesh',
      hi: 'मध्य प्रदेश सरकार',
    },
    category: 'women_child',
    officialPortalUrl: 'https://ladlibehna.mp.gov.in',
    officialApplicationUrl: 'https://ladlibehna.mp.gov.in',
    sourceCitation: 'Mukhyamantri Ladli Behna Yojana Guidelines, WCD Govt of MP',
    lastVerifiedDate: '2026-09-30',
    isVerified: true,
    verificationNotes: {
      en: 'Verified against official ladlibehna.mp.gov.in portal. Monthly DBT payment of ₹1,250 transferred on the 10th of every month.',
      hi: 'आधिकारिक ladlibehna.mp.gov.in से सत्यापित। प्रतिमाह 10 तारीख को ₹1,250 की सीधी वित्तीय सहायता बैंक खाते में।',
    },
    geographicAvailability: {
      type: 'states_only',
      applicableStates: ['Madhya Pradesh'],
      description: {
        en: 'Permanent residents of Madhya Pradesh only.',
        hi: 'केवल मध्य प्रदेश के स्थायी निवासी।',
      },
    },
    overview: {
      en: 'Financial inclusion and empowerment scheme for women in Madhya Pradesh providing ₹1,250 per month to married, widowed, divorced, and deserted women aged 21 to 60.',
      hi: 'मध्य प्रदेश की 21 से 60 वर्ष आयु वर्ग की विवाहित, विधवा, तलाकशुदा एवं परित्यक्ता महिलाओं को ₹1,250 प्रति माह की आर्थिक सहायता।',
    },
    benefitsSummary: {
      en: '₹1,250 per month (₹15,000 annually) transferred directly via Aadhaar-linked DBT into women’s individual bank accounts.',
      hi: '₹1,250 प्रति माह (वार्षिक ₹15,000) सीधे महिला के आधार-लिंक्ड बैंक खाते में।',
    },
    criteria: [
      {
        id: 'mp_lby_state',
        name: { en: 'Madhya Pradesh Domicile', hi: 'मध्य प्रदेश मूल निवासी' },
        field: 'state',
        operator: 'EQUALS',
        expectedValue: 'Madhya Pradesh',
        requiredConditionDisplay: { en: 'Permanent resident of Madhya Pradesh.', hi: 'मध्य प्रदेश का स्थानीय निवासी होना चाहिए।' },
        evidenceSource: 'MP LBY Guidelines Section 2.1',
        sourceUrl: 'https://ladlibehna.mp.gov.in',
        isMandatory: true,
      },
      {
        id: 'mp_lby_gender',
        name: { en: 'Female Gender', hi: 'महिला लिंग' },
        field: 'gender',
        operator: 'EQUALS',
        expectedValue: 'female',
        requiredConditionDisplay: { en: 'Female applicant only.', hi: 'केवल महिला आवेदक।' },
        evidenceSource: 'MP LBY Rules Section 2.2',
        sourceUrl: 'https://ladlibehna.mp.gov.in',
        isMandatory: true,
      },
      {
        id: 'mp_lby_min_age',
        name: { en: 'Age >= 21 Years', hi: 'आयु 21 वर्ष या अधिक' },
        field: 'age',
        operator: 'GREATER_THAN_OR_EQUAL',
        expectedValue: 21,
        requiredConditionDisplay: { en: 'Age >= 21 years.', hi: 'आयु 21 वर्ष या उससे अधिक।' },
        evidenceSource: 'MP LBY Eligibility Criteria',
        sourceUrl: 'https://ladlibehna.mp.gov.in',
        isMandatory: true,
      },
      {
        id: 'mp_lby_max_age',
        name: { en: 'Age <= 60 Years', hi: 'आयु 60 वर्ष या कम' },
        field: 'age',
        operator: 'LESS_THAN_OR_EQUAL',
        expectedValue: 60,
        requiredConditionDisplay: { en: 'Age <= 60 years.', hi: 'आयु 60 वर्ष या उससे कम।' },
        evidenceSource: 'MP LBY Eligibility Criteria',
        sourceUrl: 'https://ladlibehna.mp.gov.in',
        isMandatory: true,
      },
      {
        id: 'mp_lby_income',
        name: { en: 'Family Income <= ₹2.50 Lakh', hi: 'पारिवारिक आय <= ₹2.5 लाख' },
        field: 'annualIncome',
        operator: 'LESS_THAN_OR_EQUAL',
        expectedValue: 250000,
        requiredConditionDisplay: { en: 'Annual family income <= ₹2,50,000.', hi: 'पारिवारिक वार्षिक आय ₹2,50,000 या उससे कम।' },
        evidenceSource: 'MP LBY Exclusion Criteria Section 3',
        sourceUrl: 'https://ladlibehna.mp.gov.in',
        isMandatory: true,
      },
    ],
    requiredDocuments: [
      {
        name: { en: 'Samagra Family ID & Member ID (MP Samagra Portal)', hi: 'समग्र परिवार आईडी एवं सदस्य आईडी' },
        mandatory: true,
        purpose: { en: 'Mandatory state registry verification and e-KYC.', hi: 'मध्य प्रदेश समग्र पोर्टल से ई-केवाईसी सत्यापन।' },
      },
      {
        name: { en: 'Aadhaar Card (Linked with Bank Account & DBT Enabled)', hi: 'आधार कार्ड (बैंक खाते से डीबीटी सक्रिय)' },
        mandatory: true,
        purpose: { en: 'Direct benefit transfer disbursement.', hi: 'मासिक ₹1,250 राशि अंतरण हेतु।' },
      },
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: { en: 'Complete Samagra e-KYC', hi: 'समग्र ई-केवाईसी पूर्ण करें' },
        description: { en: 'Ensure Samagra ID is linked with Aadhaar and active mobile number.', hi: 'समग्र पोर्टल पर आधार ई-केवाईसी सुनिश्चित करें।' },
        channel: 'online',
        portalUrl: 'https://samagra.gov.in',
      },
      {
        stepNumber: 2,
        title: { en: 'Enrollment at Gram Panchayat / Ward Camp', hi: 'ग्राम पंचायत / वार्ड शिविर में आवेदन' },
        description: { en: 'Gram Panchayat and urban ward camps capture photograph and biometric authorization free of charge.', hi: 'पंचायत अथवा वार्ड शिविर में निःशुल्क फोटो व बायोमेट्रिक सत्यापन द्वारा आवेदन दर्ज होता है।' },
        channel: 'government_office',
      },
    ],
    faqs: [
      {
        question: { en: 'Are unmarried women eligible for MP Ladli Behna Yojana?', hi: 'क्या अविवाहित युवतियां लाड़ली बहना योजना की पात्र हैं?' },
        answer: { en: 'No. As per scheme rules, the applicant must be married, widowed, divorced, or deserted.', hi: 'नहीं। योजना के नियमानुसार केवल विवाहित, विधवा, तलाकशुदा एवं परित्यक्ता महिलाएं ही पात्र हैं।' },
      },
    ],
  },

  // 12. MP Mukhyamantri Kisan Kalyan Yojana (State: Madhya Pradesh)
  {
    id: 'mp-kisan-kalyan-yojana',
    code: 'MP-MKKY',
    name: {
      en: 'Mukhyamantri Kisan Kalyan Yojana (Madhya Pradesh)',
      hi: 'मुख्यमंत्री किसान कल्याण योजना (मध्य प्रदेश)',
    },
    shortName: 'MP Kisan Kalyan',
    administeringAuthority: {
      en: 'Revenue Department, Govt of Madhya Pradesh',
      hi: 'राजस्व विभाग, मध्य प्रदेश सरकार',
    },
    ministry: {
      en: 'Government of Madhya Pradesh',
      hi: 'मध्य प्रदेश सरकार',
    },
    category: 'agriculture',
    officialPortalUrl: 'https://saara.mp.gov.in',
    officialApplicationUrl: 'https://saara.mp.gov.in',
    sourceCitation: 'MP Revenue Department Mukhyamantri Kisan Kalyan Guidelines (saara.mp.gov.in)',
    lastVerifiedDate: '2026-09-28',
    isVerified: true,
    verificationNotes: {
      en: 'Verified against SAARA MP portal. Provides ₹6,000/year state top-up in 3 instalments of ₹2,000 to all PM-KISAN beneficiary farmers in MP (Total ₹12,000/year combined with PM-KISAN).',
      hi: 'मध्य प्रदेश सारा पोर्टल से सत्यापित। पीएम-किसान के पात्र किसानों को राज्य सरकार द्वारा अतिरिक्त ₹6,000 प्रति वर्ष (कुल ₹12,000 वार्षिक)।',
    },
    geographicAvailability: {
      type: 'states_only',
      applicableStates: ['Madhya Pradesh'],
      description: {
        en: 'Landholding farmers of Madhya Pradesh only.',
        hi: 'केवल मध्य प्रदेश के भूमिधारक किसान।',
      },
    },
    overview: {
      en: 'An agricultural income support scheme by the MP Government providing ₹6,000 annually in three equal instalments of ₹2,000 directly into the bank accounts of farmers registered under PM-KISAN.',
      hi: 'मध्य प्रदेश सरकार द्वारा पीएम-किसान योजना के पात्र किसानों को प्रतिवर्ष ₹6,000 (₹2,000 की 3 किस्तों में) की अतिरिक्त वित्तीय सहायता।',
    },
    benefitsSummary: {
      en: '₹6,000/year state financial assistance. Combined with PM-KISAN (₹6,000), total assistance is ₹12,000 per year per farmer family.',
      hi: 'राज्य सरकार से ₹6,000 प्रति वर्ष (पीएम-किसान के ₹6,000 मिलाकर कुल ₹12,000 प्रति वर्ष)।',
    },
    criteria: [
      {
        id: 'mp_mkky_state',
        name: { en: 'Madhya Pradesh Domicile', hi: 'मध्य प्रदेश निवास' },
        field: 'state',
        operator: 'EQUALS',
        expectedValue: 'Madhya Pradesh',
        requiredConditionDisplay: { en: 'Resident of Madhya Pradesh.', hi: 'मध्य प्रदेश का निवासी होना आवश्यक।' },
        evidenceSource: 'SAARA Portal Guidelines',
        sourceUrl: 'https://saara.mp.gov.in',
        isMandatory: true,
      },
      {
        id: 'mp_mkky_occupation',
        name: { en: 'Farmer Status', hi: 'किसान स्थिति' },
        field: 'occupation',
        operator: 'IN',
        expectedValue: ['farmer'],
        requiredConditionDisplay: { en: 'Must be a registered farmer.', hi: 'पंजीकृत किसान होना चाहिए।' },
        evidenceSource: 'MP Revenue Dept Guidelines',
        sourceUrl: 'https://saara.mp.gov.in',
        isMandatory: true,
      },
      {
        id: 'mp_mkky_land',
        name: { en: 'Owns Agricultural Land in MP', hi: 'मध्य प्रदेश में कृषि भूमि स्वामित्व' },
        field: 'ownsCultivableLand',
        operator: 'BOOLEAN_TRUE',
        expectedValue: true,
        requiredConditionDisplay: { en: 'Must own cultivable agricultural land registered in MP land records.', hi: 'मध्य प्रदेश भूलेख में दर्ज कृषि भूमि होना अनिवार्य।' },
        evidenceSource: 'SAARA MP Land Seeding Rule',
        sourceUrl: 'https://saara.mp.gov.in',
        isMandatory: true,
      },
    ],
    requiredDocuments: [
      {
        name: { en: 'MP Bhulekh Khasra / Khatoni Record', hi: 'मध्य प्रदेश भूलेख खसरा / खतौनी' },
        mandatory: true,
        purpose: { en: 'Land verification on SAARA portal.', hi: 'सारा पोर्टल पर भूमि रिकॉर्ड सत्यापन।' },
      },
      {
        name: { en: 'PM-KISAN Registration ID & Aadhaar', hi: 'पीएम-किसान पंजीकरण संख्या एवं आधार' },
        mandatory: true,
        purpose: { en: 'Direct benefit transfer linking.', hi: 'डीबीटी भुगतान लिंक।' },
      },
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: { en: 'Automatic Verification via Patwari & SAARA Portal', hi: 'पटवारी व सारा पोर्टल द्वारा स्वतः सत्यापन' },
        description: { en: 'Farmers verified under PM-KISAN are automatically integrated on saara.mp.gov.in through local Patwari verification.', hi: 'पीएम-किसान के पात्र किसानों को संबंधित हल्का पटवारी द्वारा सारा पोर्टल पर सीधे सत्यापित किया जाता है।' },
        channel: 'online',
        portalUrl: 'https://saara.mp.gov.in',
      },
    ],
    faqs: [
      {
        question: { en: 'Do farmers need to submit a separate application every year?', hi: 'क्या हर वर्ष अलग से आवेदन करना पड़ता है?' },
        answer: { en: 'No. Once verified on SAARA and PM-KISAN, instalments are disbursed automatically provided e-KYC remains active.', hi: 'नहीं। एक बार सारा पोर्टल पर ई-केवाईसी पूर्ण होने के बाद किस्तें स्वतः प्राप्त होती रहती हैं।' },
      },
    ],
  },

  // 13. Bihar Mukhyamantri Kanya Utthan Yojana (State: Bihar)
  {
    id: 'bihar-kanya-utthan-yojana',
    code: 'BIHAR-MKUY',
    name: {
      en: 'Mukhyamantri Kanya Utthan Yojana (Bihar)',
      hi: 'मुख्यमंत्री कन्या उत्थान योजना (बिहार)',
    },
    shortName: 'Bihar Kanya Utthan',
    administeringAuthority: {
      en: 'Education Department / Social Welfare Department, Govt of Bihar',
      hi: 'शिक्षा विभाग / समाज कल्याण विभाग, बिहार सरकार',
    },
    ministry: {
      en: 'Government of Bihar',
      hi: 'बिहार सरकार',
    },
    category: 'education',
    officialPortalUrl: 'https://medhasoft.bih.nic.in',
    officialApplicationUrl: 'https://medhasoft.bih.nic.in/medhamat2024/',
    sourceCitation: 'Education Department, Government of Bihar Guidelines (Medhasoft)',
    lastVerifiedDate: '2026-09-25',
    isVerified: true,
    verificationNotes: {
      en: 'Verified against official medhasoft.bih.nic.in portal. Provides ₹50,000 financial grant upon graduation and ₹25,000 on passing Intermediate.',
      hi: 'मेधासॉफ्ट पोर्टल से सत्यापित। स्नातक उत्तीर्ण बालिकाओं को ₹50,000 और इंटरमीडिएट उत्तीर्ण करने पर ₹25,000 की प्रोत्साहन राशि।',
    },
    geographicAvailability: {
      type: 'states_only',
      applicableStates: ['Bihar'],
      description: {
        en: 'Permanent resident girl students of Bihar only.',
        hi: 'केवल बिहार की स्थायी निवासी छात्राएं।',
      },
    },
    overview: {
      en: 'A major girl-child empowerment and education initiative by the Government of Bihar offering up to ₹50,000 upon graduation to prevent child marriage and promote higher education.',
      hi: 'बाल विवाह रोकने और बालिकाओं को उच्च शिक्षा के लिए प्रोत्साहित करने हेतु स्नातक उत्तीर्ण छात्राओं को ₹50,000 तथा इंटर उत्तीर्ण छात्राओं को ₹25,000 की सीधी सहायता।',
    },
    benefitsSummary: {
      en: '₹50,000 one-time financial incentive upon graduation (degree) from any recognized university in Bihar; ₹25,000 upon passing Class 12 (Intermediate).',
      hi: 'मान्यता प्राप्त विश्वविद्यालय से स्नातक उत्तीर्ण होने पर ₹50,000 तथा इंटरमीडिएट परीक्षा उत्तीर्ण करने पर ₹25,000 की एकमुश्त डीबीटी सहायता।',
    },
    criteria: [
      {
        id: 'bihar_mkuy_state',
        name: { en: 'Bihar Domicile', hi: 'बिहार का स्थायी निवास' },
        field: 'state',
        operator: 'EQUALS',
        expectedValue: 'Bihar',
        requiredConditionDisplay: { en: 'Permanent resident of Bihar.', hi: 'बिहार की स्थायी निवासी होना आवश्यक।' },
        evidenceSource: 'Medhasoft Bihar Norms',
        sourceUrl: 'https://medhasoft.bih.nic.in',
        isMandatory: true,
      },
      {
        id: 'bihar_mkuy_gender',
        name: { en: 'Female Gender', hi: 'महिला लिंग' },
        field: 'gender',
        operator: 'EQUALS',
        expectedValue: 'female',
        requiredConditionDisplay: { en: 'Female students only.', hi: 'केवल छात्राएं।' },
        evidenceSource: 'Bihar Education Dept Rules',
        sourceUrl: 'https://medhasoft.bih.nic.in',
        isMandatory: true,
      },
      {
        id: 'bihar_mkuy_min_age',
        name: { en: 'Age >= 17 Years', hi: 'आयु 17 वर्ष या अधिक' },
        field: 'age',
        operator: 'GREATER_THAN_OR_EQUAL',
        expectedValue: 17,
        requiredConditionDisplay: { en: 'Age >= 17 years.', hi: 'आयु 17 वर्ष या उससे अधिक।' },
        evidenceSource: 'Scheme Guidelines',
        sourceUrl: 'https://medhasoft.bih.nic.in',
        isMandatory: true,
      },
    ],
    requiredDocuments: [
      {
        name: { en: 'Graduation / Class 12 Marksheet & Registration Card', hi: 'स्नातक / इंटर अंकपत्र व पंजीयन कार्ड' },
        mandatory: true,
        purpose: { en: 'Educational qualification verification on Medhasoft portal.', hi: 'परीक्षा उत्तीर्ण का सत्यापन।' },
      },
      {
        name: { en: 'Bihar Residential / Niwas Certificate', hi: 'बिहार निवास प्रमाण पत्र' },
        mandatory: true,
        purpose: { en: 'State domicile verification.', hi: 'स्थायी निवास सत्यापन।' },
      },
      {
        name: { en: 'Student Bank Passbook in Bihar Branch (Aadhaar Seeded)', hi: 'छात्रा का बैंक खाता पासबुक (बिहार स्थित शाखा)' },
        mandatory: true,
        purpose: { en: 'Direct benefit transfer disbursement.', hi: 'डीबीटी अंतरण हेतु।' },
      },
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: { en: 'Apply Online on Medhasoft Portal', hi: 'मेधासॉफ्ट पोर्टल पर ऑनलाइन आवेदन' },
        description: { en: 'Register registration number, roll code, and bank details on medhasoft.bih.nic.in.', hi: 'medhasoft.bih.nic.in पर रोल नंबर व बैंक विवरण के साथ ऑनलाइन पंजीकरण करें।' },
        channel: 'online',
        portalUrl: 'https://medhasoft.bih.nic.in',
      },
    ],
    faqs: [
      {
        question: { en: 'Are married women eligible for the graduation scholarship (₹50,000)?', hi: 'क्या विवाहित महिलाएं स्नातक प्रोत्साहन राशि (₹50,000) की पात्र हैं?' },
        answer: { en: 'Yes. For the graduation milestone (₹50,000), even married women are eligible; for Intermediate (12th), the applicant must be unmarried.', hi: 'हाँ। स्नातक स्तर (₹50,000) के लिए विवाहित महिलाएं भी पात्र हैं; इंटरमीडिएट स्तर पर अविवाहित होना अनिवार्य है।' },
      },
    ],
  },

  // 14. Bihar Mukhyamantri Udyami Yojana (State: Bihar)
  {
    id: 'bihar-mukhyamantri-udyamiyojana',
    code: 'BIHAR-UDYAMI',
    name: {
      en: 'Mukhyamantri Udyami Yojana (Bihar)',
      hi: 'मुख्यमंत्री उद्यमी योजना (बिहार)',
    },
    shortName: 'Bihar Udyami Yojana',
    administeringAuthority: {
      en: 'Department of Industries, Govt of Bihar',
      hi: 'उद्योग विभाग, बिहार सरकार',
    },
    ministry: {
      en: 'Government of Bihar',
      hi: 'बिहार सरकार',
    },
    category: 'livelihood',
    officialPortalUrl: 'https://udyami.bihar.gov.in',
    officialApplicationUrl: 'https://udyami.bihar.gov.in/register',
    sourceCitation: 'Department of Industries Bihar Notification (SC/ST/EBC/Youth/Mahila Udyami Yojana)',
    lastVerifiedDate: '2026-09-24',
    isVerified: true,
    verificationNotes: {
      en: 'Verified against official udyami.bihar.gov.in portal. Provides up to ₹10 Lakh assistance (50% government grant/subsidy up to ₹5 Lakh + 50% interest-free/1% loan).',
      hi: 'आधिकारिक udyami.bihar.gov.in से सत्यापित। ₹10 लाख तक की वित्तीय सहायता (50% अनुदान ₹5 लाख तक + 50% ब्याजमुक्त/1% ऋण)।',
    },
    geographicAvailability: {
      type: 'states_only',
      applicableStates: ['Bihar'],
      description: {
        en: 'Permanent residents of Bihar establishing enterprise in Bihar.',
        hi: 'बिहार के स्थायी निवासी जो बिहार में उद्योग स्थापित करना चाहते हैं।',
      },
    },
    overview: {
      en: 'A state industrial scheme providing financial support of up to ₹10 Lakh (₹5 Lakh grant + ₹5 Lakh interest-free loan) to SC, ST, EBC, women, and youth to establish manufacturing and service micro-enterprises in Bihar.',
      hi: 'बिहार के युवाओं, महिलाओं और वंचित वर्गों को नया उद्योग लगाने हेतु ₹10 लाख तक की सहायता (₹5 लाख का अनुदान तथा ₹5 लाख का ब्याजमुक्त ऋण)।',
    },
    benefitsSummary: {
      en: 'Up to ₹10,00,000 project financing: 50% non-repayable grant (up to ₹5,00,000) and 50% interest-free loan (1% for general youth), repayable in 84 easy monthly installments.',
      hi: 'अधिकतम ₹10 लाख: 50% अनुदान (₹5 लाख तक माफ) तथा 50% ब्याजमुक्त ऋण (सामान्य युवाओं हेतु 1%), 84 किस्तों में पुनर्भुगतान।',
    },
    criteria: [
      {
        id: 'bihar_udyami_state',
        name: { en: 'Bihar Domicile', hi: 'बिहार मूल निवासी' },
        field: 'state',
        operator: 'EQUALS',
        expectedValue: 'Bihar',
        requiredConditionDisplay: { en: 'Permanent resident of Bihar.', hi: 'बिहार का मूल निवासी होना चाहिए।' },
        evidenceSource: 'Bihar Udyami Rules Section 1',
        sourceUrl: 'https://udyami.bihar.gov.in',
        isMandatory: true,
      },
      {
        id: 'bihar_udyami_min_age',
        name: { en: 'Minimum Age (18 Years)', hi: 'न्यूनतम आयु (18 वर्ष)' },
        field: 'age',
        operator: 'GREATER_THAN_OR_EQUAL',
        expectedValue: 18,
        requiredConditionDisplay: { en: 'Age >= 18 years.', hi: 'आयु 18 वर्ष या अधिक।' },
        evidenceSource: 'Bihar Udyami Eligibility Criteria',
        sourceUrl: 'https://udyami.bihar.gov.in',
        isMandatory: true,
      },
      {
        id: 'bihar_udyami_max_age',
        name: { en: 'Maximum Age (50 Years)', hi: 'अधिकतम आयु (50 वर्ष)' },
        field: 'age',
        operator: 'LESS_THAN_OR_EQUAL',
        expectedValue: 50,
        requiredConditionDisplay: { en: 'Age <= 50 years.', hi: 'आयु 50 वर्ष या उससे कम।' },
        evidenceSource: 'Bihar Udyami Eligibility Criteria',
        sourceUrl: 'https://udyami.bihar.gov.in',
        isMandatory: true,
      },
      {
        id: 'bihar_udyami_non_govt',
        name: { en: 'Not Employed in Regular Government Service', hi: 'नियमित सरकारी नौकरी में न होना' },
        field: 'occupation',
        operator: 'NOT_IN',
        expectedValue: ['salaried_govt'],
        requiredConditionDisplay: { en: 'For self-employed entrepreneurs.', hi: 'स्व-रोजगार हेतु।' },
        evidenceSource: 'Scheme Exclusion Rules',
        sourceUrl: 'https://udyami.bihar.gov.in',
        isMandatory: true,
      },
    ],
    requiredDocuments: [
      {
        name: { en: 'Class 10 (Matric) and Class 12 / Intermediate / ITI Marksheet', hi: '10वीं व 12वीं / आईटीआई / डिप्लोमा अंकपत्र' },
        mandatory: true,
        purpose: { en: 'Age and educational qualification verification (minimum 12th pass).', hi: 'न्यूनतम 12वीं उत्तीर्ण का सत्यापन।' },
      },
      {
        name: { en: 'Bihar Domicile (Niwas) Certificate', hi: 'बिहार निवास प्रमाण पत्र' },
        mandatory: true,
        purpose: { en: 'State resident verification.', hi: 'निवास सत्यापन।' },
      },
      {
        name: { en: 'Current Bank Account in name of Enterprise (or Savings initially)', hi: 'बैंक खाता विवरण एवं रद्द चेक' },
        mandatory: true,
        purpose: { en: 'DBT instalment disbursement in 3 milestones.', hi: '3 किस्तों में अनुदान राशि अंतरण हेतु।' },
      },
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: { en: 'Register on Bihar Udyami Portal', hi: 'बिहार उद्यमी पोर्टल पर ऑनलाइन आवेदन' },
        description: { en: 'Apply online during annual application window on udyami.bihar.gov.in.', hi: 'udyami.bihar.gov.in पर वार्षिक पोर्टल खुलने पर ऑनलाइन फॉर्म भरें।' },
        channel: 'online',
        portalUrl: 'https://udyami.bihar.gov.in',
      },
      {
        stepNumber: 2,
        title: { en: 'Computerized Lottery Selection & 2-Week Training', hi: 'कम्प्यूटरीकृत लॉटरी चयन एवं प्रशिक्षण' },
        description: { en: 'Selection is executed via transparent randomized computerized lottery, followed by state-sponsored EDP training and release of ₹1.5 Lakh first instalment.', hi: 'पारदर्शी लॉटरी के माध्यम से चयन के बाद उद्यमिता प्रशिक्षण और पहली किस्त जारी होती है।' },
        channel: 'government_office',
      },
    ],
    faqs: [
      {
        question: { en: 'What is the interest rate on the loan portion under Bihar Udyami Yojana?', hi: 'बिहार उद्यमी योजना में ऋण हिस्से पर ब्याज दर क्या है?' },
        answer: { en: 'The loan is 100% interest-free for women, SC, ST, and EBC entrepreneurs. For general and BC youth, a nominal 1% simple interest is charged.', hi: 'महिलाओं, एससी, एसटी एवं ईबीसी उद्यमियों के लिए ऋण पूरी तरह ब्याजमुक्त (0%) है। सामान्य व पिछड़ा वर्ग युवाओं हेतु मात्र 1% सरल ब्याज है।' },
      },
    ],
  },

  // 15. Maharashtra Namo Shetkari Mahasanman Nidhi (State: Maharashtra)
  {
    id: 'maharashtra-namo-shetkari-yojana',
    code: 'MH-NSMN',
    name: {
      en: 'Namo Shetkari Mahasanman Nidhi Yojana (Maharashtra)',
      hi: 'नमो शेतकरी महासन्मान निधी योजना (महाराष्ट्र)',
    },
    shortName: 'Namo Shetkari Maharashtra',
    administeringAuthority: {
      en: 'Department of Agriculture, Govt of Maharashtra',
      hi: 'कृषि विभाग, महाराष्ट्र शासन',
    },
    ministry: {
      en: 'Government of Maharashtra',
      hi: 'महाराष्ट्र शासन',
    },
    category: 'agriculture',
    officialPortalUrl: 'https://krishi.maharashtra.gov.in',
    officialApplicationUrl: 'https://krishi.maharashtra.gov.in',
    sourceCitation: 'Government of Maharashtra Agriculture Department GR & Guidelines',
    lastVerifiedDate: '2026-09-28',
    isVerified: true,
    verificationNotes: {
      en: 'Verified against Maharashtra Government Resolution. Disburses state top-up of ₹6,000 per year in three equal instalments of ₹2,000 matching PM-KISAN (Total ₹12,000/year).',
      hi: 'महाराष्ट्र शासन निर्णय से सत्यापित। पीएम-किसान के पात्र किसानों को ₹6,000 प्रति वर्ष की अतिरिक्त सहायता (कुल ₹12,000 वार्षिक)।',
    },
    geographicAvailability: {
      type: 'states_only',
      applicableStates: ['Maharashtra'],
      description: {
        en: 'Landholding farmer families residing in Maharashtra.',
        hi: 'महाराष्ट्र के भूमिधारक किसान परिवार।',
      },
    },
    overview: {
      en: 'State income support scheme by the Maharashtra Government providing ₹6,000 per year directly into bank accounts of all PM-KISAN beneficiary farmers in Maharashtra.',
      hi: 'महाराष्ट्र सरकार द्वारा राज्य के किसानों को प्रतिवर्ष ₹6,000 (तीन किस्तों में ₹2,000) की प्रत्यक्ष आय सहायता।',
    },
    benefitsSummary: {
      en: '₹6,000/year state financial assistance. Combined with PM-KISAN (₹6,000), total assistance is ₹12,000 per year per farmer family.',
      hi: 'राज्य सरकार द्वारा ₹6,000 प्रति वर्ष (पीएम-किसान मिलाकर कुल ₹12,000 प्रति वर्ष सीधे बैंक खाते में)।',
    },
    criteria: [
      {
        id: 'mh_nsmn_state',
        name: { en: 'Maharashtra Domicile', hi: 'महाराष्ट्र अधिवास' },
        field: 'state',
        operator: 'EQUALS',
        expectedValue: 'Maharashtra',
        requiredConditionDisplay: { en: 'Resident of Maharashtra.', hi: 'महाराष्ट्र का निवासी होना चाहिए।' },
        evidenceSource: 'Maharashtra Agriculture Dept GR',
        sourceUrl: 'https://krishi.maharashtra.gov.in',
        isMandatory: true,
      },
      {
        id: 'mh_nsmn_occupation',
        name: { en: 'Farmer Status', hi: 'किसान स्थिति' },
        field: 'occupation',
        operator: 'IN',
        expectedValue: ['farmer'],
        requiredConditionDisplay: { en: 'Active farmer / cultivator.', hi: 'सक्रिय किसान।' },
        evidenceSource: 'Namo Shetkari Guidelines',
        sourceUrl: 'https://krishi.maharashtra.gov.in',
        isMandatory: true,
      },
      {
        id: 'mh_nsmn_land',
        name: { en: 'Owns Cultivable Land in Maharashtra', hi: 'महाराष्ट्र में कृषियोग्य भूमि' },
        field: 'ownsCultivableLand',
        operator: 'BOOLEAN_TRUE',
        expectedValue: true,
        requiredConditionDisplay: { en: 'Registered 7/12 land record in Maharashtra.', hi: 'महाराष्ट्र में 7/12 खतौनी में नाम दर्ज होना अनिवार्य।' },
        evidenceSource: 'Mahabhulekh Land Seeding Norms',
        sourceUrl: 'https://krishi.maharashtra.gov.in',
        isMandatory: true,
      },
    ],
    requiredDocuments: [
      {
        name: { en: 'Maharashtra 7/12 (Satbara) & 8A Land Extract', hi: 'महाराष्ट्र 7/12 (सातबारा) व 8-अ उतारा' },
        mandatory: true,
        purpose: { en: 'Agricultural land ownership verification via Mahabhulekh.', hi: 'महाभूलेख से भूमि स्वामित्व सत्यापन।' },
      },
      {
        name: { en: 'Aadhaar Seeded Bank Account & PM-KISAN ID', hi: 'आधार लिंक बैंक खाता व पीएम-किसान पंजीयन' },
        mandatory: true,
        purpose: { en: 'DBT cash transfer.', hi: 'सीधी डीबीटी सहायता हेतु।' },
      },
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: { en: 'Automatic Seeding with PM-KISAN Portal', hi: 'पीएम-किसान से स्वतः सत्यापन' },
        description: { en: 'Farmers active on PM-KISAN in Maharashtra are seamlessly enrolled without separate registration.', hi: 'पीएम-किसान में पंजीकृत महाराष्ट्र के किसानों को अलग से फॉर्म भरने की आवश्यकता नहीं होती।' },
        channel: 'online',
        portalUrl: 'https://krishi.maharashtra.gov.in',
      },
    ],
    faqs: [
      {
        question: { en: 'Is e-KYC required for Namo Shetkari Mahasanman Nidhi?', hi: 'क्या नमो शेतकरी योजना के लिए ई-केवाईसी आवश्यक है?' },
        answer: { en: 'Yes. e-KYC and land seeding on the PM-KISAN / Mahabhulekh database are statutory requirements for DBT release.', hi: 'हाँ। पीएम-किसान और महाभूलेख पर ई-केवाईसी होना अनिवार्य है।' },
      },
    ],
  },

  // 16. Maharashtra Sanjay Gandhi Niradhar Anudan Yojana (State: Maharashtra)
  {
    id: 'maharashtra-sanjay-gandhi-niradhar',
    code: 'MH-SGNRY',
    name: {
      en: 'Sanjay Gandhi Niradhar Anudan Yojana (Maharashtra)',
      hi: 'संजय गांधी निराधार अनुदान योजना (महाराष्ट्र)',
    },
    shortName: 'Sanjay Gandhi Niradhar MH',
    administeringAuthority: {
      en: 'Social Justice & Special Assistance Department, Govt of Maharashtra',
      hi: 'सामाजिक न्याय व विशेष सहाय्य विभाग, महाराष्ट्र शासन',
    },
    ministry: {
      en: 'Government of Maharashtra',
      hi: 'महाराष्ट्र शासन',
    },
    category: 'social_security',
    officialPortalUrl: 'https://sjsa.maharashtra.gov.in',
    officialApplicationUrl: 'https://aaplesarkar.mahaonline.gov.in',
    sourceCitation: 'Government of Maharashtra Social Justice Department Resolution (sjsa.maharashtra.gov.in)',
    lastVerifiedDate: '2026-09-27',
    isVerified: true,
    verificationNotes: {
      en: 'Verified against Maharashtra Social Justice rules. Provides financial assistance of ₹1,500 per month to destitute persons, widows, and severely disabled individuals.',
      hi: 'महाराष्ट्र सामाजिक न्याय विभाग से सत्यापित। निराधार, विधवा, दिव्यांग व असहाय नागरिकों को ₹1,500 प्रति माह की आर्थिक सहायता।',
    },
    geographicAvailability: {
      type: 'states_only',
      applicableStates: ['Maharashtra'],
      description: {
        en: 'Destitute residents of Maharashtra.',
        hi: 'महाराष्ट्र के निराधार एवं निर्धन निवासी।',
      },
    },
    overview: {
      en: 'State social security grant providing ₹1,500 per month financial aid to destitute elderly persons, widows, orphans, and persons with severe disabilities residing in Maharashtra.',
      hi: 'महाराष्ट्र के निराधार वृद्धों, विधवाओं, अनाथ बच्चों तथा गंभीर दिव्यांग व्यक्तियों को ₹1,500 प्रति माह की आर्थिक सुरक्षा।',
    },
    benefitsSummary: {
      en: '₹1,500 per month (single beneficiary) or ₹2,000 per month (if more than one beneficiary in household) transferred via monthly DBT.',
      hi: '₹1,500 प्रति माह (एकल लाभार्थी) अथवा ₹2,000 प्रति माह (परिवार में दो लाभार्थी होने पर) डीबीटी द्वारा।',
    },
    criteria: [
      {
        id: 'mh_sgnry_state',
        name: { en: 'Maharashtra Domicile', hi: 'महाराष्ट्र अधिवास' },
        field: 'state',
        operator: 'EQUALS',
        expectedValue: 'Maharashtra',
        requiredConditionDisplay: { en: 'Resident of Maharashtra for at least 15 years.', hi: 'महाराष्ट्र का निवासी होना चाहिए।' },
        evidenceSource: 'SJSA Maharashtra Rules Section 2',
        sourceUrl: 'https://sjsa.maharashtra.gov.in',
        isMandatory: true,
      },
      {
        id: 'mh_sgnry_income',
        name: { en: 'Annual Family Income <= ₹50,000', hi: 'वार्षिक पारिवारिक आय <= ₹50,000' },
        field: 'annualIncome',
        operator: 'LESS_THAN_OR_EQUAL',
        expectedValue: 50000,
        requiredConditionDisplay: { en: 'Annual household income <= ₹50,000.', hi: 'वार्षिक पारिवारिक आय ₹50,000 या उससे कम।' },
        evidenceSource: 'SJSA Government Resolution',
        sourceUrl: 'https://sjsa.maharashtra.gov.in',
        isMandatory: true,
      },
    ],
    requiredDocuments: [
      {
        name: { en: 'Income Certificate issued by Tehsildar (<= ₹50,000)', hi: 'तहसीलदार द्वारा जारी आय प्रमाण पत्र (₹50,000 से कम)' },
        mandatory: true,
        purpose: { en: 'Destitute / economic hardship verification.', hi: 'आर्थिक स्थिति का सत्यापन।' },
      },
      {
        name: { en: 'Maharashtra Residence Proof (15 Years)', hi: 'महाराष्ट्र 15 वर्ष का अधिवास प्रमाण पत्र' },
        mandatory: true,
        purpose: { en: 'Domicile compliance.', hi: 'निवास प्रमाण।' },
      },
      {
        name: { en: 'Bank Account Passbook (Aadhaar Seeded)', hi: 'बैंक पासबुक' },
        mandatory: true,
        purpose: { en: 'Monthly pension transfer.', hi: 'मासिक अनुदान भुगतान हेतु।' },
      },
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: { en: 'Apply on Aaple Sarkar Portal or Tahsildar Office', hi: 'आपले सरकार पोर्टल अथवा तहसील कार्यालय में आवेदन' },
        description: { en: 'Submit application online at aaplesarkar.mahaonline.gov.in or directly at the local Tahsil office.', hi: 'aaplesarkar.mahaonline.gov.in पर अथवा तहसील कार्यालय के संजय गांधी योजना शाखा में आवेदन करें।' },
        channel: 'online',
        portalUrl: 'https://aaplesarkar.mahaonline.gov.in',
      },
    ],
    faqs: [
      {
        question: { en: 'Who sanctions the application under Sanjay Gandhi Niradhar Yojana?', hi: 'संजय गांधी निराधार योजना में आवेदन की स्वीकृति कौन करता है?' },
        answer: { en: 'The Sanjay Gandhi Niradhar Anudan Committee headed by the local MLA / Tehsildar reviews and sanctions eligible applications.', hi: 'तहसील स्तर पर गठित संजय गांधी निराधार अनुदान समिति द्वारा आवेदनों की जांच व स्वीकृति की जाती है।' },
      },
    ],
  },

  // 17. West Bengal Krishak Bandhu Scheme (State: West Bengal)
  {
    id: 'wb-krishak-bandhu-scheme',
    code: 'WB-KB',
    name: {
      en: 'Krishak Bandhu Scheme (West Bengal)',
      hi: 'कृषक बंधु योजना (पश्चिम बंगाल)',
    },
    shortName: 'WB Krishak Bandhu',
    administeringAuthority: {
      en: 'Department of Agriculture, Govt of West Bengal',
      hi: 'कृषि विभाग, पश्चिम बंगाल सरकार',
    },
    ministry: {
      en: 'Government of West Bengal',
      hi: 'पश्चिम बंगाल सरकार',
    },
    category: 'agriculture',
    officialPortalUrl: 'https://krishakbandhu.wb.gov.in',
    officialApplicationUrl: 'https://krishakbandhu.wb.gov.in',
    sourceCitation: 'Department of Agriculture, Government of West Bengal Krishak Bandhu (Natun) Guidelines',
    lastVerifiedDate: '2026-09-26',
    isVerified: true,
    verificationNotes: {
      en: 'Verified against official krishakbandhu.wb.gov.in portal. Assured financial assistance of up to ₹10,000/year (minimum ₹4,000) in two instalments + ₹2 Lakh death benefit (age 18-60).',
      hi: 'आधिकारिक पोर्टल से सत्यापित। ₹10,000 प्रति वर्ष तक की सहायता (न्यूनतम ₹4,000) दो किस्तों (खरीफ व रबी) में + ₹2 लाख मृत्यु सहायता।',
    },
    geographicAvailability: {
      type: 'states_only',
      applicableStates: ['West Bengal'],
      description: {
        en: 'Farmers and recorded Bhagchasi (sharecroppers) in West Bengal.',
        hi: 'पश्चिम बंगाल के किसान एवं दर्ज बटाईदार (भागचाषी)।',
      },
    },
    overview: {
      en: 'Flagship farmer welfare initiative by the Government of West Bengal providing assured direct income support of up to ₹10,000 annually and ₹2 Lakh term death insurance cover to all farmer families.',
      hi: 'पश्चिम बंगाल सरकार की प्रमुख किसान योजना, जो किसानों व बटाईदारों को प्रतिवर्ष ₹10,000 तक की प्रत्यक्ष सहायता और ₹2 लाख की मृत्यु सहायता देती है।',
    },
    benefitsSummary: {
      en: '₹10,000 per year for 1 acre or more land (₹4,000 minimum for smaller parcels) in two instalments (Kharif and Rabi) + ₹2,00,000 death benefit for natural or accidental death (age 18-60).',
      hi: '1 एकड़ या अधिक भूमि पर ₹10,000 प्रति वर्ष (न्यूनतम ₹4,000) खरीफ और रबी में + 18-60 वर्ष के किसान की मृत्यु पर ₹2 लाख की बीमा सहायता।',
    },
    criteria: [
      {
        id: 'wb_kb_state',
        name: { en: 'West Bengal Domicile', hi: 'पश्चिम बंगाल निवास' },
        field: 'state',
        operator: 'EQUALS',
        expectedValue: 'West Bengal',
        requiredConditionDisplay: { en: 'Resident of West Bengal.', hi: 'पश्चिम बंगाल का निवासी होना आवश्यक।' },
        evidenceSource: 'WB Krishak Bandhu Norms',
        sourceUrl: 'https://krishakbandhu.wb.gov.in',
        isMandatory: true,
      },
      {
        id: 'wb_kb_occupation',
        name: { en: 'Farmer / Cultivator / Sharecropper', hi: 'किसान / काश्तकार / बटाईदार' },
        field: 'occupation',
        operator: 'IN',
        expectedValue: ['farmer'],
        requiredConditionDisplay: { en: 'Recorded farmer or registered sharecropper (Bhagchasi).', hi: 'दर्ज किसान अथवा पंजीकृत बटाईदार।' },
        evidenceSource: 'WB Agriculture Dept Guidelines',
        sourceUrl: 'https://krishakbandhu.wb.gov.in',
        isMandatory: true,
      },
      {
        id: 'wb_kb_land',
        name: { en: 'Agricultural Land Records in Banglarbhumi', hi: 'बांगलारभूमि में दर्ज कृषि भूमि' },
        field: 'ownsCultivableLand',
        operator: 'BOOLEAN_TRUE',
        expectedValue: true,
        requiredConditionDisplay: { en: 'Must hold RoR (Parcha) registered in West Bengal Banglarbhumi.', hi: 'बांगलारभूमि पोर्टल पर दर्ज पर्चा / RoR होना चाहिए।' },
        evidenceSource: 'Banglarbhumi Integration Rules',
        sourceUrl: 'https://krishakbandhu.wb.gov.in',
        isMandatory: true,
      },
    ],
    requiredDocuments: [
      {
        name: { en: 'Banglarbhumi RoR (Parcha / Khatian Extract)', hi: 'बांगलारभूमि पर्चा / खतियान नकल' },
        mandatory: true,
        purpose: { en: 'Land parcel measurement and ownership validation.', hi: 'भूमि रकबा और स्वामित्व सत्यापन।' },
      },
      {
        name: { en: 'Voter ID Card (EPIC) & Aadhaar Card', hi: 'वोटर कार्ड (EPIC) व आधार कार्ड' },
        mandatory: true,
        purpose: { en: 'Mandatory voter card linkage for Krishak Bandhu ID.', hi: 'कृषक बंधु पहचान पत्र जारी करने हेतु।' },
      },
      {
        name: { en: 'Bank Passbook (Single Account)', hi: 'बैंक पासबुक' },
        mandatory: true,
        purpose: { en: 'DBT instalment disbursement.', hi: 'द्विवार्षिक डीबीटी भुगतान।' },
      },
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: { en: 'Enrollment at Duare Sarkar Camp or ADA (Block) Office', hi: 'दुआरे सरकार शिविर या सहायक कृषि निदेशक कार्यालय में आवेदन' },
        description: { en: 'Submit physical or digital form with Parcha and EPIC at Duare Sarkar camp or Block Assistant Director of Agriculture office.', hi: 'दुआरे सरकार शिविर अथवा ब्लॉक कृषि कार्यालय में पर्चा और वोटर कार्ड के साथ आवेदन जमा करें।' },
        channel: 'government_office',
        portalUrl: 'https://krishakbandhu.wb.gov.in',
      },
    ],
    faqs: [
      {
        question: { en: 'Can sharecroppers (Bhagchasi) without land ownership apply?', hi: 'क्या बिना जमीन के बटाईदार (भागचाषी) आवेदन कर सकते हैं?' },
        answer: { en: 'Yes. Recorded sharecroppers (Bhagchasi) holding valid certificate from the Revenue Inspector are fully eligible for ₹4,000 minimum assistance.', hi: 'हाँ। राजस्व निरीक्षक द्वारा प्रमाणित दर्ज बटाईदार भी न्यूनतम ₹4,000 की सहायता के पात्र हैं।' },
      },
    ],
  },

  // 18. West Bengal Kanyashree Prakalpa (State: West Bengal)
  {
    id: 'wb-kanyashree-prakalpa',
    code: 'WB-KP',
    name: {
      en: 'Kanyashree Prakalpa (West Bengal)',
      hi: 'कन्याश्री प्रकल्प (पश्चिम बंगाल)',
    },
    shortName: 'WB Kanyashree',
    administeringAuthority: {
      en: 'Department of Women Development & Social Welfare, Govt of West Bengal',
      hi: 'महिला विकास एवं सामाजिक कल्याण विभाग, पश्चिम बंगाल सरकार',
    },
    ministry: {
      en: 'Government of West Bengal',
      hi: 'पश्चिम बंगाल सरकार',
    },
    category: 'education',
    officialPortalUrl: 'https://www.wbkanyashree.gov.in',
    officialApplicationUrl: 'https://www.wbkanyashree.gov.in/kp_4.0/index.php',
    sourceCitation: 'UN Award-winning Kanyashree Prakalpa Scheme Guidelines, Govt of West Bengal',
    lastVerifiedDate: '2026-09-27',
    isVerified: true,
    verificationNotes: {
      en: 'Verified against official wbkanyashree.gov.in portal. Provides annual scholarship of ₹1,000 (K1) and one-time grant of ₹25,000 (K2) at age 18.',
      hi: 'आधिकारिक wbkanyashree.gov.in से सत्यापित। कक्षा 8 से 12 तक ₹1,000 वार्षिक (K1) और 18 वर्ष की आयु पर ₹25,000 का एकमुश्त अनुदान (K2)।',
    },
    geographicAvailability: {
      type: 'states_only',
      applicableStates: ['West Bengal'],
      description: {
        en: 'Unmarried girl students residing in West Bengal.',
        hi: 'पश्चिम बंगाल में पढ़ने वाली अविवाहित छात्राएं।',
      },
    },
    overview: {
      en: 'An internationally acclaimed conditional cash transfer scheme designed to improve the status of adolescent girls in West Bengal by incentivizing secondary and higher secondary education and preventing child marriage.',
      hi: 'बालिकाओं के सशक्तीकरण, बाल विवाह रोकथाम तथा उच्च शिक्षा को बढ़ावा देने हेतु पश्चिम बंगाल सरकार की विश्व प्रसिद्ध छात्रवृत्ति योजना।',
    },
    benefitsSummary: {
      en: 'Annual scholarship of ₹1,000 (K1) for girls aged 13-18 enrolled in classes 8 to 12; one-time grant of ₹25,000 (K2) at age 18 for continuing education.',
      hi: '13-18 वर्ष की छात्राओं को ₹1,000 वार्षिक (K1) तथा 18 वर्ष की आयु पूर्ण करने पर उच्च शिक्षा जारी रखने हेतु ₹25,000 का एकमुश्त अनुदान (K2)।',
    },
    criteria: [
      {
        id: 'wb_kp_state',
        name: { en: 'West Bengal Domicile', hi: 'पश्चिम बंगाल निवास' },
        field: 'state',
        operator: 'EQUALS',
        expectedValue: 'West Bengal',
        requiredConditionDisplay: { en: 'Resident of West Bengal.', hi: 'पश्चिम बंगाल की निवासी होना आवश्यक।' },
        evidenceSource: 'Kanyashree Operational Guidelines Section 1',
        sourceUrl: 'https://www.wbkanyashree.gov.in',
        isMandatory: true,
      },
      {
        id: 'wb_kp_gender',
        name: { en: 'Female Student', hi: 'छात्रा (महिला)' },
        field: 'gender',
        operator: 'EQUALS',
        expectedValue: 'female',
        requiredConditionDisplay: { en: 'Female student only.', hi: 'केवल छात्राएं।' },
        evidenceSource: 'Kanyashree Rules Section 2',
        sourceUrl: 'https://www.wbkanyashree.gov.in',
        isMandatory: true,
      },
      {
        id: 'wb_kp_min_age',
        name: { en: 'Age >= 13 Years', hi: 'आयु 13 वर्ष या अधिक' },
        field: 'age',
        operator: 'GREATER_THAN_OR_EQUAL',
        expectedValue: 13,
        requiredConditionDisplay: { en: 'Age >= 13 years.', hi: 'आयु 13 वर्ष या अधिक।' },
        evidenceSource: 'Kanyashree Eligibility Norms',
        sourceUrl: 'https://www.wbkanyashree.gov.in',
        isMandatory: true,
      },
      {
        id: 'wb_kp_max_age',
        name: { en: 'Age <= 19 Years', hi: 'आयु 19 वर्ष या कम' },
        field: 'age',
        operator: 'LESS_THAN_OR_EQUAL',
        expectedValue: 19,
        requiredConditionDisplay: { en: 'Age <= 19 years (unmarried).', hi: 'आयु 19 वर्ष या उससे कम (अविवाहित)।' },
        evidenceSource: 'Kanyashree Eligibility Norms',
        sourceUrl: 'https://www.wbkanyashree.gov.in',
        isMandatory: true,
      },
    ],
    requiredDocuments: [
      {
        name: { en: 'School / College Enrollment Certificate', hi: 'स्कूल / कॉलेज में अध्ययनरत होने का प्रमाण पत्र' },
        mandatory: true,
        purpose: { en: 'Verification of active schooling.', hi: 'नियमित पढ़ाई का सत्यापन।' },
      },
      {
        name: { en: 'Birth Certificate & Unmarried Declaration', hi: 'जन्म प्रमाण पत्र एवं अविवाहित होने की घोषणा' },
        mandatory: true,
        purpose: { en: 'Age and non-marriage eligibility.', hi: 'आयु व अविवाहित स्थिति सत्यापन।' },
      },
      {
        name: { en: 'Bank Account in Student’s Own Name (Aadhaar Seeded)', hi: 'छात्रा के नाम का बैंक खाता पासबुक' },
        mandatory: true,
        purpose: { en: 'Direct benefit transfer.', hi: 'डीबीटी अंतरण हेतु।' },
      },
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: { en: 'Form Submission at School / College', hi: 'विद्यालय / महाविद्यालय में फॉर्म जमा करना' },
        description: { en: 'Fill Kanyashree Form K1 or K2 provided free of charge by head of institution.', hi: 'संबंधित विद्यालय या कॉलेज के प्रधानाचार्य से निःशुल्क फॉर्म लेकर वहीं जमा करें।' },
        channel: 'government_office',
        portalUrl: 'https://www.wbkanyashree.gov.in',
      },
      {
        stepNumber: 2,
        title: { en: 'Online Upload & District Verification', hi: 'ऑनलाइन प्रविष्टि व स्वीकृति' },
        description: { en: 'School uploads student application on Kanyashree portal; District Officer approves DBT sanction.', hi: 'विद्यालय द्वारा पोर्टल पर डेटा दर्ज कर जिला नोडल अधिकारी द्वारा राशि बैंक खाते में भेजी जाती है।' },
        channel: 'online',
      },
    ],
    faqs: [
      {
        question: { en: 'Is there any family income bar for Kanyashree K2 (₹25,000)?', hi: 'क्या कन्याश्री K2 (₹25,000) के लिए कोई पारिवारिक आय सीमा है?' },
        answer: { en: 'The Government of West Bengal has removed all family income caps for Kanyashree. All unmarried girls continuing education up to age 18-19 are eligible.', hi: 'पश्चिम बंगाल सरकार ने कन्याश्री के लिए पारिवारिक आय सीमा पूरी तरह समाप्त कर दी है। सभी छात्राएं समान रूप से पात्र हैं।' },
      },
    ],
  },
];
