import { VERIFIED_SCHEMES } from '../data/verifiedSchemes.ts';
import { evaluateEligibility, evaluateCriterion } from '../engine/eligibilityEngine.ts';
import { UserProfile, initialProfile } from '../types/profile.ts';
import { generateDeterministicExplanation, generateDeterministicQnA } from '../../server/aiProviderAdapter.ts';

export interface TestCaseResult {
  suiteName: string;
  testName: string;
  passed: boolean;
  durationMs: number;
  expected: any;
  actual: any;
  details?: string;
}

export interface TestSuiteReport {
  timestamp: string;
  totalTests: number;
  passedTests: number;
  failedTests: number;
  allPassed: boolean;
  suites: {
    name: string;
    tests: TestCaseResult[];
  }[];
}

export async function runAllUnitTests(): Promise<TestSuiteReport> {
  const suites: { name: string; tests: TestCaseResult[] }[] = [];

  // ==========================================
  // SUITE 1: Deterministic Eligibility Positive Matches
  // ==========================================
  const suite1Tests: TestCaseResult[] = [];

  // Test 1.1: Small Farmer qualifies for PM-KISAN
  {
    const start = performance.now();
    const farmerProfile: UserProfile = {
      ...initialProfile,
      state: 'Uttar Pradesh',
      residence: 'rural',
      age: 42,
      gender: 'male',
      occupation: 'farmer',
      ownsCultivableLand: true,
      annualIncome: 120000,
    };
    const pmKisan = VERIFIED_SCHEMES.find((s) => s.id === 'pm-kisan')!;
    const evalResult = evaluateEligibility(farmerProfile, pmKisan);
    const passed = evalResult.status === 'MATCH' && evalResult.passedCount === pmKisan.criteria.length;
    suite1Tests.push({
      suiteName: 'Deterministic Matches',
      testName: 'Farmer owning cultivable land matches PM-KISAN',
      passed,
      durationMs: Number((performance.now() - start).toFixed(2)),
      expected: 'MATCH with all criteria passed',
      actual: `${evalResult.status} (${evalResult.passedCount}/${pmKisan.criteria.length} passed)`,
    });
  }

  // Test 1.2: Urban Street Vendor qualifies for PM SVANidhi
  {
    const start = performance.now();
    const vendorProfile: UserProfile = {
      ...initialProfile,
      state: 'Maharashtra',
      residence: 'urban',
      age: 32,
      gender: 'male',
      occupation: 'street_vendor',
      annualIncome: 140000,
    };
    const pmSvanidhi = VERIFIED_SCHEMES.find((s) => s.id === 'pm-svanidhi')!;
    const evalResult = evaluateEligibility(vendorProfile, pmSvanidhi);
    const passed = evalResult.status === 'MATCH';
    suite1Tests.push({
      suiteName: 'Deterministic Matches',
      testName: 'Urban vendor aged 32 matches PM SVANidhi',
      passed,
      durationMs: Number((performance.now() - start).toFixed(2)),
      expected: 'MATCH',
      actual: evalResult.status,
    });
  }

  // Test 1.3: Low income senior citizen qualifies for NSAP Old Age Pension
  {
    const start = performance.now();
    const seniorProfile: UserProfile = {
      ...initialProfile,
      state: 'Bihar',
      residence: 'rural',
      age: 68,
      gender: 'female',
      occupation: 'unemployed',
      annualIncome: 45000,
    };
    const nsap = VERIFIED_SCHEMES.find((s) => s.id === 'nsap-ignoaps-pension')!;
    const evalResult = evaluateEligibility(seniorProfile, nsap);
    const passed = evalResult.status === 'MATCH';
    suite1Tests.push({
      suiteName: 'Deterministic Matches',
      testName: 'Senior citizen aged 68 with income < ₹1 Lakh matches NSAP IGNOAPS',
      passed,
      durationMs: Number((performance.now() - start).toFixed(2)),
      expected: 'MATCH',
      actual: evalResult.status,
    });
  }

  suites.push({ name: 'Deterministic Matches', tests: suite1Tests });

  // ==========================================
  // SUITE 2: Missing Information (NEEDS_INFORMATION) Handling
  // ==========================================
  const suite2Tests: TestCaseResult[] = [];

  // Test 2.1: Farmer with unrecorded land ownership returns NEEDS_INFORMATION
  {
    const start = performance.now();
    const incompleteProfile: UserProfile = {
      ...initialProfile,
      state: 'Punjab',
      age: 38,
      occupation: 'farmer',
      ownsCultivableLand: null, // Missing!
      annualIncome: 180000,
    };
    const pmKisan = VERIFIED_SCHEMES.find((s) => s.id === 'pm-kisan')!;
    const evalResult = evaluateEligibility(incompleteProfile, pmKisan);
    const passed = evalResult.status === 'NEEDS_INFORMATION' && evalResult.missingFields.includes('ownsCultivableLand');
    suite2Tests.push({
      suiteName: 'Missing Information Safety',
      testName: 'Unknown land ownership yields NEEDS_INFORMATION for PM-KISAN (never false match)',
      passed,
      durationMs: Number((performance.now() - start).toFixed(2)),
      expected: 'NEEDS_INFORMATION with missing field "ownsCultivableLand"',
      actual: `${evalResult.status} [Missing: ${evalResult.missingFields.join(', ')}]`,
    });
  }

  // Test 2.2: Blank profile never matches any scheme
  {
    const start = performance.now();
    const blank = { ...initialProfile };
    const allEvals = VERIFIED_SCHEMES.map((s) => evaluateEligibility(blank, s));
    const anyMatched = allEvals.some((e) => e.status === 'MATCH');
    const passed = !anyMatched;
    suite2Tests.push({
      suiteName: 'Missing Information Safety',
      testName: 'Blank profile produces zero false MATCH verdicts',
      passed,
      durationMs: Number((performance.now() - start).toFixed(2)),
      expected: 'Zero schemes matched on blank profile',
      actual: `${allEvals.filter((e) => e.status === 'MATCH').length} matched`,
    });
  }

  suites.push({ name: 'Missing Information Safety', tests: suite2Tests });

  // ==========================================
  // SUITE 3: Statutory Ineligibility & Boundary Testing
  // ==========================================
  const suite3Tests: TestCaseResult[] = [];

  // Test 3.1: Regular government employee disqualified from PM-KISAN
  {
    const start = performance.now();
    const govtEmployee: UserProfile = {
      ...initialProfile,
      state: 'Haryana',
      residence: 'rural',
      age: 40,
      occupation: 'salaried_govt', // Excluded!
      ownsCultivableLand: true,
      annualIncome: 600000,
    };
    const pmKisan = VERIFIED_SCHEMES.find((s) => s.id === 'pm-kisan')!;
    const evalResult = evaluateEligibility(govtEmployee, pmKisan);
    const passed = evalResult.status === 'DOES_NOT_MATCH';
    suite3Tests.push({
      suiteName: 'Exclusion Clauses & Boundary Limits',
      testName: 'Government employee is disqualified from PM-KISAN under statutory exclusion',
      passed,
      durationMs: Number((performance.now() - start).toFixed(2)),
      expected: 'DOES_NOT_MATCH',
      actual: evalResult.status,
    });
  }

  // Test 3.2: Income exceeding threshold fails PM-JAY
  {
    const start = performance.now();
    const highIncomeProfile: UserProfile = {
      ...initialProfile,
      state: 'Delhi',
      residence: 'urban',
      age: 35,
      occupation: 'salaried_private',
      annualIncome: 500000, // Limit is 250000
    };
    const pmjay = VERIFIED_SCHEMES.find((s) => s.id === 'ayushman-bharat-pmjay')!;
    const evalResult = evaluateEligibility(highIncomeProfile, pmjay);
    const passed = evalResult.status === 'DOES_NOT_MATCH';
    suite3Tests.push({
      suiteName: 'Exclusion Clauses & Boundary Limits',
      testName: 'Annual income ₹5 Lakh (> ₹2.5L ceiling) fails AB-PMJAY',
      passed,
      durationMs: Number((performance.now() - start).toFixed(2)),
      expected: 'DOES_NOT_MATCH',
      actual: evalResult.status,
    });
  }

  // Test 3.3: Age below statutory minimum 19 fails PMMVY
  {
    const start = performance.now();
    const underageMother: UserProfile = {
      ...initialProfile,
      state: 'Rajasthan',
      age: 17, // Must be >= 19
      gender: 'female',
      isPregnantOrLactating: true,
      annualIncome: 150000,
    };
    const pmmvy = VERIFIED_SCHEMES.find((s) => s.id === 'pm-matru-vandana-pmmvy')!;
    const evalResult = evaluateEligibility(underageMother, pmmvy);
    const passed = evalResult.status === 'DOES_NOT_MATCH';
    suite3Tests.push({
      suiteName: 'Exclusion Clauses & Boundary Limits',
      testName: 'Age under 19 fails PMMVY age restriction',
      passed,
      durationMs: Number((performance.now() - start).toFixed(2)),
      expected: 'DOES_NOT_MATCH',
      actual: evalResult.status,
    });
  }

  suites.push({ name: 'Exclusion Clauses & Boundary Limits', tests: suite3Tests });

  // ==========================================
  // SUITE 4: Grounding & Deterministic Fallback Integrity
  // ==========================================
  const suite4Tests: TestCaseResult[] = [];

  // Test 4.1: Deterministic Explanation incorporates statutory evidence citation
  {
    const start = performance.now();
    const profile: UserProfile = {
      ...initialProfile,
      state: 'Gujarat',
      residence: 'rural',
      age: 45,
      occupation: 'farmer',
      ownsCultivableLand: true,
      annualIncome: 110000,
    };
    const pmKisan = VERIFIED_SCHEMES.find((s) => s.id === 'pm-kisan')!;
    const evalResult = evaluateEligibility(profile, pmKisan);
    const textEn = generateDeterministicExplanation(evalResult, 'en');
    const hasSource = textEn.includes('PM-KISAN Operational Guidelines');
    const hasVerdict = textEn.includes('MATCH');
    const passed = hasSource && hasVerdict;
    suite4Tests.push({
      suiteName: 'Grounding & Fallback Integrity',
      testName: 'Deterministic explanation embeds verified citations without hallucination',
      passed,
      durationMs: Number((performance.now() - start).toFixed(2)),
      expected: 'Includes statutory source citation and MATCH verdict',
      actual: passed ? 'Verified citation present' : 'Citation missing',
    });
  }

  // Test 4.2: Q&A Engine strictly refuses out-of-context ungrounded queries
  {
    const start = performance.now();
    const pmKisan = VERIFIED_SCHEMES.find((s) => s.id === 'pm-kisan')!;
    const qnaResult = generateDeterministicQnA(
      pmKisan,
      'What is the stock price of Apple Inc and who will win the cricket match?',
      'en'
    );
    const passed = qnaResult.isGrounded === false && qnaResult.answer.includes('cannot answer');
    suite4Tests.push({
      suiteName: 'Grounding & Fallback Integrity',
      testName: 'Q&A engine refuses ungrounded speculative questions outside verified scheme',
      passed,
      durationMs: Number((performance.now() - start).toFixed(2)),
      expected: 'Honest refusal to speculate on ungrounded data',
      actual: qnaResult.isGrounded ? 'Hallucinated answer' : 'Clean refusal with official portal referral',
    });
  }

  suites.push({ name: 'Grounding & Fallback Integrity', tests: suite4Tests });

  // ==========================================
  // SUITE 5: Multilingual Dictionary Parity & Key Validation
  // ==========================================
  // ==========================================
  // SUITE 5: 12 Indian Languages Translation Parity & RTL Validation
  // ==========================================
  const suite5Tests: TestCaseResult[] = [];
  {
    const start = performance.now();
    const {
      en,
      hi,
      mr,
      bn,
      ta,
      te,
      gu,
      kn,
      ml,
      pa,
      or,
      ur,
      findMissingLocaleKeys,
      isRtlLanguage,
      SUPPORTED_LANGUAGES,
      getLocale,
    } = await import('../locales/index.ts');

    const localeMap = {
      hi: { name: 'Hindi (हिन्दी)', dict: hi },
      mr: { name: 'Marathi (मराठी)', dict: mr },
      bn: { name: 'Bengali (বাংলা)', dict: bn },
      ta: { name: 'Tamil (தமிழ்)', dict: ta },
      te: { name: 'Telugu (తెలుగు)', dict: te },
      gu: { name: 'Gujarati (ગુજરાતી)', dict: gu },
      kn: { name: 'Kannada (ಕನ್ನಡ)', dict: kn },
      ml: { name: 'Malayalam (മലയാളം)', dict: ml },
      pa: { name: 'Punjabi (ਪੰਜਾਬੀ)', dict: pa },
      or: { name: 'Odia (ଓଡ଼ିଆ)', dict: or },
      ur: { name: 'Urdu (اردو)', dict: ur },
    };

    // Test 5.1: 100% key parity for all 11 Indian languages against English
    for (const [code, { name, dict }] of Object.entries(localeMap)) {
      const missingKeys = findMissingLocaleKeys(en, dict);
      const passed = missingKeys.length === 0;
      suite5Tests.push({
        suiteName: '12 Indian Languages Parity & RTL',
        testName: `${name} locale dictionary has 100% key parity with English base`,
        passed,
        durationMs: Number((performance.now() - start).toFixed(2)),
        expected: '0 missing translation keys',
        actual: passed ? '0 missing keys (100% complete)' : `Missing keys: ${missingKeys.join(', ')}`,
      });
    }

    // Test 5.2: Bidirectional symmetry (no extraneous or orphaned keys in target languages)
    for (const [code, { name, dict }] of Object.entries(localeMap)) {
      const extraKeys = findMissingLocaleKeys(dict, en);
      const passed = extraKeys.length === 0;
      suite5Tests.push({
        suiteName: '12 Indian Languages Parity & RTL',
        testName: `${name} has zero orphaned or unmapped keys (bidirectional symmetry)`,
        passed,
        durationMs: Number((performance.now() - start).toFixed(2)),
        expected: '0 orphaned keys',
        actual: passed ? '0 orphaned keys' : `Extra keys: ${extraKeys.join(', ')}`,
      });
    }

    // Test 5.3: RTL layout detection: Urdu must be RTL, other 11 must be LTR
    {
      const urduIsRtl = isRtlLanguage('ur');
      const otherRtlLangs = SUPPORTED_LANGUAGES.filter((l) => l.code !== 'ur' && isRtlLanguage(l.code));
      const passed = urduIsRtl && otherRtlLangs.length === 0;
      suite5Tests.push({
        suiteName: '12 Indian Languages Parity & RTL',
        testName: 'Urdu correctly triggers right-to-left (RTL) layout, while other 11 languages use LTR',
        passed,
        durationMs: Number((performance.now() - start).toFixed(2)),
        expected: 'Urdu is RTL, others are LTR',
        actual: passed ? 'Urdu is RTL, other 11 are LTR' : `Failed RTL check: others=${otherRtlLangs.map((l) => l.code).join(',')}`,
      });
    }

    // Test 5.4: Supported languages metadata registry completeness
    {
      const expectedCount = 12;
      const actualCount = SUPPORTED_LANGUAGES.length;
      const allHaveNames = SUPPORTED_LANGUAGES.every((l) => l.name && l.englishName && l.script);
      const passed = actualCount === expectedCount && allHaveNames;
      suite5Tests.push({
        suiteName: '12 Indian Languages Parity & RTL',
        testName: 'All 12 languages registered in metadata with valid native names and scripts',
        passed,
        durationMs: Number((performance.now() - start).toFixed(2)),
        expected: '12 languages with native names',
        actual: `${actualCount} languages registered, all valid: ${allHaveNames}`,
      });
    }

    // Test 5.5: Critical UI keys resolution across all 12 languages
    {
      let allPassed = true;
      const failedLangs: string[] = [];
      for (const langMeta of SUPPORTED_LANGUAGES) {
        const dict = getLocale(langMeta.code);
        if (
          !dict.brand?.name ||
          !dict.form?.title ||
          !dict.results?.title ||
          !dict.modal?.tabs?.criteria ||
          !dict.disclaimer?.legalDisclosure
        ) {
          allPassed = false;
          failedLangs.push(langMeta.code);
        }
      }
      suite5Tests.push({
        suiteName: '12 Indian Languages Parity & RTL',
        testName: 'Essential user flow strings resolve non-empty across all 12 languages',
        passed: allPassed,
        durationMs: Number((performance.now() - start).toFixed(2)),
        expected: 'All 12 languages resolve core UI keys',
        actual: allPassed ? 'All 12 languages resolve valid non-empty strings' : `Failed: ${failedLangs.join(', ')}`,
      });
    }
  }

  suites.push({ name: '12 Indian Languages Parity & RTL', tests: suite5Tests });

  // ==========================================
  // SUITE 6: Geographic State Restrictions & Expanded Schemes Integrity
  // ==========================================
  const suite6Tests: TestCaseResult[] = [];

  // Test 6.1: Geographic State Exclusion
  {
    const start = performance.now();
    const upProfile: UserProfile = {
      ...initialProfile,
      state: 'Uttar Pradesh',
      gender: 'female',
      age: 28,
      annualIncome: 120000,
    };
    const mpLadliBehna = VERIFIED_SCHEMES.find((s) => s.id === 'mp-ladli-behna-yojana');
    const result = mpLadliBehna ? evaluateEligibility(upProfile, mpLadliBehna) : null;
    const passed = result?.status === 'DOES_NOT_MATCH';
    suite6Tests.push({
      suiteName: 'Geographic Boundaries & State Rules',
      testName: 'Out-of-state applicant (UP resident) fails geographic check for MP Ladli Behna',
      passed,
      durationMs: Number((performance.now() - start).toFixed(2)),
      expected: 'DOES_NOT_MATCH',
      actual: result?.status,
    });
  }

  // Test 6.2: State-Specific Match for Eligible Resident
  {
    const start = performance.now();
    const mpProfile: UserProfile = {
      ...initialProfile,
      state: 'Madhya Pradesh',
      gender: 'female',
      age: 28,
      annualIncome: 120000,
    };
    const mpLadliBehna = VERIFIED_SCHEMES.find((s) => s.id === 'mp-ladli-behna-yojana');
    const result = mpLadliBehna ? evaluateEligibility(mpProfile, mpLadliBehna) : null;
    const passed = result?.status === 'MATCH';
    suite6Tests.push({
      suiteName: 'Geographic Boundaries & State Rules',
      testName: 'Eligible woman resident of Madhya Pradesh correctly matches MP Ladli Behna',
      passed,
      durationMs: Number((performance.now() - start).toFixed(2)),
      expected: 'MATCH',
      actual: result?.status,
    });
  }

  // Test 6.3: Post-Matric Scholarship Education Income Limit
  {
    const start = performance.now();
    const studentProfile: UserProfile = {
      ...initialProfile,
      age: 19,
      category: 'SC',
      annualIncome: 400000,
    };
    const pmsScheme = VERIFIED_SCHEMES.find((s) => s.id === 'post-matric-scholarship');
    const result = pmsScheme ? evaluateEligibility(studentProfile, pmsScheme) : null;
    const passed = result?.status === 'DOES_NOT_MATCH';
    suite6Tests.push({
      suiteName: 'Geographic Boundaries & State Rules',
      testName: 'Student with annual income > ₹2.5L fails Post-Matric Scholarship income criteria',
      passed,
      durationMs: Number((performance.now() - start).toFixed(2)),
      expected: 'DOES_NOT_MATCH',
      actual: result?.status,
    });
  }

  // Test 6.4: Stand-Up India Age Requirement
  {
    const start = performance.now();
    const underageApplicant: UserProfile = {
      ...initialProfile,
      age: 16,
      category: 'ST',
    };
    const standUpScheme = VERIFIED_SCHEMES.find((s) => s.id === 'stand-up-india-scheme');
    const result = standUpScheme ? evaluateEligibility(underageApplicant, standUpScheme) : null;
    const passed = result?.status === 'DOES_NOT_MATCH';
    suite6Tests.push({
      suiteName: 'Geographic Boundaries & State Rules',
      testName: 'Underage applicant (<18) fails Stand-Up India statutory age criterion',
      passed,
      durationMs: Number((performance.now() - start).toFixed(2)),
      expected: 'DOES_NOT_MATCH',
      actual: result?.status,
    });
  }

  suites.push({ name: 'Geographic Boundaries & State Rules', tests: suite6Tests });

  // Summarize report
  let totalTests = 0;
  let passedTests = 0;
  let failedTests = 0;

  for (const s of suites) {
    for (const t of s.tests) {
      totalTests++;
      if (t.passed) passedTests++;
      else failedTests++;
    }
  }

  return {
    timestamp: new Date().toISOString(),
    totalTests,
    passedTests,
    failedTests,
    allPassed: failedTests === 0,
    suites,
  };
}
