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
