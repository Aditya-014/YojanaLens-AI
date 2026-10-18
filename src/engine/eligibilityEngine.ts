import { UserProfile } from '../types/profile.ts';
import {
  CriterionEvaluationResult,
  EligibilityStatus,
  Scheme,
  SchemeCriterion,
  SchemeEvaluation,
} from '../types/scheme.ts';

/**
 * Formats user profile field value for transparent display in English and Hindi.
 */
export function formatUserValueDisplay(field: string, value: any): { en: string; hi: string } {
  if (value === null || value === undefined || value === '') {
    return {
      en: 'Not Provided / Unknown',
      hi: 'प्रदान नहीं किया गया / अज्ञात',
    };
  }

  if (typeof value === 'boolean') {
    return value
      ? { en: 'Yes', hi: 'हाँ' }
      : { en: 'No', hi: 'नहीं' };
  }

  if (field === 'annualIncome') {
    const formatted = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
    return {
      en: `${formatted} / year`,
      hi: `${formatted} / वर्ष`,
    };
  }

  if (field === 'age') {
    return {
      en: `${value} years`,
      hi: `${value} वर्ष`,
    };
  }

  const occupationMap: Record<string, { en: string; hi: string }> = {
    farmer: { en: 'Farmer / Cultivator', hi: 'किसान / काश्तकार' },
    street_vendor: { en: 'Street Vendor / Hawkers', hi: 'रेहड़ी-पटरी / फेरीवाला' },
    artisan_craftsperson: { en: 'Artisan / Traditional Craftsperson', hi: 'कारीगर / पारंपरिक दस्तकार' },
    daily_wage_laborer: { en: 'Daily Wage / Construction Worker', hi: 'दैनिक वेतनभोगी / निर्माण श्रमिक' },
    unemployed: { en: 'Unemployed / Job Seeker', hi: 'बेरोजगार' },
    student: { en: 'Student', hi: 'विद्यार्थी' },
    salaried_private: { en: 'Salaried (Private Sector)', hi: 'वेतनभोगी (निजी क्षेत्र)' },
    salaried_govt: { en: 'Salaried (Government / PSU)', hi: 'वेतनभोगी (सरकारी / पीएसयू)' },
    self_employed_business: { en: 'Self-Employed / Micro Business', hi: 'स्व-रोजगार / लघु व्यवसाय' },
    other: { en: 'Other Occupation', hi: 'अन्य व्यवसाय' },
  };

  if (field === 'occupation' && occupationMap[value]) {
    return occupationMap[value];
  }

  if (field === 'residence') {
    return value === 'urban'
      ? { en: 'Urban Area', hi: 'शहरी क्षेत्र' }
      : { en: 'Rural Area', hi: 'ग्रामीण क्षेत्र' };
  }

  if (field === 'gender') {
    const map: Record<string, { en: string; hi: string }> = {
      female: { en: 'Female', hi: 'महिला' },
      male: { en: 'Male', hi: 'पुरुष' },
      transgender: { en: 'Transgender', hi: 'ट्रांसजेंडर' },
      other: { en: 'Other', hi: 'अन्य' },
    };
    return map[value] || { en: String(value), hi: String(value) };
  }

  return {
    en: String(value),
    hi: String(value),
  };
}

/**
 * Evaluates a single criterion deterministically against user profile.
 */
export function evaluateCriterion(
  criterion: SchemeCriterion,
  profile: UserProfile
): CriterionEvaluationResult {
  const rawValue = (profile as any)[criterion.field];
  const isUnknown = rawValue === null || rawValue === undefined || rawValue === '';

  const display = formatUserValueDisplay(criterion.field, rawValue);

  if (isUnknown) {
    return {
      id: criterion.id,
      criterionName: criterion.name,
      userValue: rawValue,
      userValueDisplay: display,
      requiredConditionDisplay: criterion.requiredConditionDisplay,
      status: 'UNKNOWN',
      reason: {
        en: `Information for "${criterion.name.en}" is missing from your profile.`,
        hi: `आपकी प्रोफ़ाइल में "${criterion.name.hi}" की जानकारी दर्ज नहीं है।`,
      },
      evidenceCitation: criterion.evidenceSource,
      sourceUrl: criterion.sourceUrl,
      isMissingInfo: true,
    };
  }

  let pass = false;
  let reasonText: { en: string; hi: string };

  switch (criterion.operator) {
    case 'EQUALS':
      pass = rawValue === criterion.expectedValue;
      reasonText = pass
        ? {
            en: `Profile matches the statutory requirement (${display.en}).`,
            hi: `प्रोफ़ाइल आवश्यक शर्त (${display.hi}) से मेल खाती है।`,
          }
        : {
            en: `Current profile value (${display.en}) does not meet the requirement: ${criterion.requiredConditionDisplay.en}.`,
            hi: `वर्तमान मान (${display.hi}) आवश्यक शर्त (${criterion.requiredConditionDisplay.hi}) को पूरा नहीं करता।`,
          };
      break;

    case 'NOT_EQUALS':
      pass = rawValue !== criterion.expectedValue;
      reasonText = pass
        ? {
            en: `Profile satisfies non-exclusion requirement (${display.en}).`,
            hi: `प्रोफ़ाइल अपवर्जन मुक्त शर्त (${display.hi}) को पूरा करती है।`,
          }
        : {
            en: `Disqualified under statutory exclusion clause: ${criterion.requiredConditionDisplay.en}.`,
            hi: `सांविधिक अपवर्जन नियम के तहत अयोग्य: ${criterion.requiredConditionDisplay.hi}।`,
          };
      break;

    case 'IN':
      pass = Array.isArray(criterion.expectedValue) && criterion.expectedValue.includes(rawValue);
      reasonText = pass
        ? {
            en: `Value is within the officially eligible category list (${display.en}).`,
            hi: `मान आधिकारिक रूप से पात्र श्रेणियों (${display.hi}) में शामिल है।`,
          }
        : {
            en: `Value (${display.en}) is not among the eligible categories for this scheme.`,
            hi: `मान (${display.hi}) इस योजना की पात्र श्रेणियों में शामिल नहीं है।`,
          };
      break;

    case 'NOT_IN':
      pass = Array.isArray(criterion.expectedValue) && !criterion.expectedValue.includes(rawValue);
      reasonText = pass
        ? {
            en: `Profile is not in excluded groups.`,
            hi: `प्रोफ़ाइल अपवर्जित समूहों में शामिल नहीं है।`,
          }
        : {
            en: `Value falls into statutory excluded list.`,
            hi: `मान सांविधिक अपवर्जित सूची में आता है।`,
          };
      break;

    case 'GREATER_THAN_OR_EQUAL':
      pass = typeof rawValue === 'number' && rawValue >= Number(criterion.expectedValue);
      reasonText = pass
        ? {
            en: `Age/Value (${display.en}) meets or exceeds minimum requirement (>= ${criterion.expectedValue}).`,
            hi: `मान (${display.hi}) न्यूनतम आवश्यकता (>= ${criterion.expectedValue}) को पूरा करता है।`,
          }
        : {
            en: `Age/Value (${display.en}) is below the statutory minimum of ${criterion.expectedValue}.`,
            hi: `मान (${display.hi}) न्यूनतम वैधानिक सीमा (${criterion.expectedValue}) से कम है।`,
          };
      break;

    case 'LESS_THAN_OR_EQUAL':
      pass = typeof rawValue === 'number' && rawValue <= Number(criterion.expectedValue);
      reasonText = pass
        ? {
            en: `Annual income/value (${display.en}) is within the statutory ceiling (<= ₹${criterion.expectedValue.toLocaleString('en-IN')}).`,
            hi: `वार्षिक आय/मान (${display.hi}) वैधानिक सीमा (<= ₹${criterion.expectedValue.toLocaleString('en-IN')}) के भीतर है।`,
          }
        : {
            en: `Annual income/value (${display.en}) exceeds the statutory limit of ₹${criterion.expectedValue.toLocaleString('en-IN')}.`,
            hi: `वार्षिक आय/मान (${display.hi}) वैधानिक सीमा (₹${criterion.expectedValue.toLocaleString('en-IN')}) से अधिक है।`,
          };
      break;

    case 'BOOLEAN_TRUE':
      pass = rawValue === true;
      reasonText = pass
        ? {
            en: `Confirmed: Requirement is met (${display.en}).`,
            hi: `सत्यापित: शर्त पूरी होती है (${display.hi})।`,
          }
        : {
            en: `Requirement not satisfied: Condition must be confirmed as Yes.`,
            hi: `शर्त पूरी नहीं हुई: इस शर्त का 'हाँ' होना अनिवार्य है।`,
          };
      break;

    case 'BOOLEAN_FALSE':
      pass = rawValue === false;
      reasonText = pass
        ? {
            en: `Confirmed: Condition satisfied (${display.en}).`,
            hi: `सत्यापित: शर्त पूरी होती है (${display.hi})।`,
          }
        : {
            en: `Disqualified: Beneficiary cannot satisfy requirement if condition is true.`,
            hi: `अयोग्य: यदि यह स्थिति 'हाँ' है, तो लाभार्थी योजना के पात्र नहीं हो सकते।`,
          };
      break;

    default:
      pass = false;
      reasonText = {
        en: 'Unsupported evaluation operator.',
        hi: 'असमर्थित मूल्यांकन ऑपरेटर।',
      };
  }

  return {
    id: criterion.id,
    criterionName: criterion.name,
    userValue: rawValue,
    userValueDisplay: display,
    requiredConditionDisplay: criterion.requiredConditionDisplay,
    status: pass ? 'PASS' : 'FAIL',
    reason: reasonText,
    evidenceCitation: criterion.evidenceSource,
    sourceUrl: criterion.sourceUrl,
    isMissingInfo: false,
  };
}

/**
 * Pure deterministic evaluation function for a single scheme against a profile.
 * Separates explicit business logic from any LLM assumptions.
 */
export function evaluateEligibility(profile: UserProfile, scheme: Scheme): SchemeEvaluation {
  if (!scheme.isVerified) {
    return {
      schemeId: scheme.id,
      scheme,
      status: 'UNVERIFIED',
      criteriaResults: [],
      missingFields: [],
      passedCount: 0,
      failedCount: 0,
      unknownCount: 0,
      totalCriteria: 0,
      matchScorePercentage: 0,
      summary: {
        en: 'This scheme data is currently marked unverified. Criteria rules cannot be evaluated with legal certainty.',
        hi: 'इस योजना का डेटा वर्तमान में असत्यापित चिह्नित है। कानूनी निश्चितता के साथ पात्रता की जांच नहीं की जा सकती।',
      },
      evaluatedAt: new Date().toISOString(),
    };
  }

  // Geographic Availability Check
  if (
    scheme.geographicAvailability.type === 'states_only' &&
    scheme.geographicAvailability.applicableStates &&
    profile.state
  ) {
    if (!scheme.geographicAvailability.applicableStates.includes(profile.state)) {
      return {
        schemeId: scheme.id,
        scheme,
        status: 'DOES_NOT_MATCH',
        criteriaResults: [
          {
            id: 'geo_state_check',
            criterionName: { en: 'Geographic State Availability', hi: 'भौगोलिक राज्य उपलब्धता' },
            userValue: profile.state,
            userValueDisplay: { en: profile.state, hi: profile.state },
            requiredConditionDisplay: {
              en: `Only available in: ${scheme.geographicAvailability.applicableStates.join(', ')}`,
              hi: `केवल इन राज्यों में उपलब्ध: ${scheme.geographicAvailability.applicableStates.join(', ')}`,
            },
            status: 'FAIL',
            reason: {
              en: `Scheme is not notified in ${profile.state}.`,
              hi: `योजना ${profile.state} में अधिसूचित नहीं है।`,
            },
            evidenceCitation: scheme.sourceCitation,
            isMissingInfo: false,
          },
        ],
        missingFields: [],
        passedCount: 0,
        failedCount: 1,
        unknownCount: 0,
        totalCriteria: 1,
        matchScorePercentage: 0,
        summary: {
          en: `Not available in your state (${profile.state}).`,
          hi: `आपके राज्य (${profile.state}) में यह योजना उपलब्ध नहीं है।`,
        },
        evaluatedAt: new Date().toISOString(),
      };
    }
  }

  const results: CriterionEvaluationResult[] = [];
  const missingFields: string[] = [];

  for (const criterion of scheme.criteria) {
    const result = evaluateCriterion(criterion, profile);
    results.push(result);

    if (result.isMissingInfo) {
      if (!missingFields.includes(criterion.field)) {
        missingFields.push(criterion.field);
      }
    }
  }

  const failedMandatory = results.some((r) => r.status === 'FAIL');
  const unknownMandatory = results.some((r) => r.status === 'UNKNOWN');
  const passedCount = results.filter((r) => r.status === 'PASS').length;
  const failedCount = results.filter((r) => r.status === 'FAIL').length;
  const unknownCount = results.filter((r) => r.status === 'UNKNOWN').length;
  const totalCriteria = results.length;

  let status: EligibilityStatus = 'DOES_NOT_MATCH';
  let summary: { en: string; hi: string };

  if (failedMandatory) {
    status = 'DOES_NOT_MATCH';
    summary = {
      en: `Preliminary assessment indicates you do not meet ${failedCount} of the statutory criteria.`,
      hi: `प्रारंभिक मूल्यांकन के अनुसार आप ${failedCount} अनिवार्य शर्तों को पूरा नहीं करते हैं।`,
    };
  } else if (unknownMandatory) {
    status = 'NEEDS_INFORMATION';
    summary = {
      en: `Potential match, but ${unknownCount} piece(s) of key profile information are missing to confirm eligibility.`,
      hi: `संभावित पात्रता, परंतु पुष्टि करने के लिए प्रोफ़ाइल में ${unknownCount} आवश्यक विवरण दर्ज करना बाकी है।`,
    };
  } else {
    status = 'MATCH';
    summary = {
      en: `All ${passedCount} verified eligibility criteria are satisfied based on your provided profile!`,
      hi: `आपकी दर्ज प्रोफ़ाइल के आधार पर सभी ${passedCount} सत्यापित पात्रता शर्तें पूरी होती हैं!`,
    };
  }

  const matchScorePercentage =
    totalCriteria > 0
      ? Math.round((passedCount / totalCriteria) * 100)
      : 0;

  return {
    schemeId: scheme.id,
    scheme,
    status,
    criteriaResults: results,
    missingFields,
    passedCount,
    failedCount,
    unknownCount,
    totalCriteria,
    matchScorePercentage,
    summary,
    evaluatedAt: new Date().toISOString(),
  };
}

/**
 * Evaluates all verified schemes against a user profile.
 */
export function evaluateAllSchemes(profile: UserProfile, schemes: Scheme[]): SchemeEvaluation[] {
  return schemes.map((scheme) => evaluateEligibility(profile, scheme));
}
