export type SchemeCategory =
  | 'agriculture'
  | 'livelihood'
  | 'health'
  | 'women_child'
  | 'housing'
  | 'social_security'
  | 'financial_inclusion'
  | 'education';

export type EligibilityStatus = 'MATCH' | 'NEEDS_INFORMATION' | 'DOES_NOT_MATCH' | 'UNVERIFIED';

export type CriterionOperator =
  | 'EQUALS'
  | 'NOT_EQUALS'
  | 'IN'
  | 'NOT_IN'
  | 'GREATER_THAN_OR_EQUAL'
  | 'LESS_THAN_OR_EQUAL'
  | 'BETWEEN'
  | 'BOOLEAN_TRUE'
  | 'BOOLEAN_FALSE'
  | 'CUSTOM_FN';

export interface SchemeCriterion {
  id: string;
  name: { en: string; hi: string };
  field: string;
  operator: CriterionOperator;
  expectedValue: any;
  requiredConditionDisplay: { en: string; hi: string };
  evidenceSource: string;
  sourceUrl?: string;
  isMandatory: boolean;
}

export interface SchemeDocument {
  name: { en: string; hi: string };
  mandatory: boolean;
  purpose: { en: string; hi: string };
  alternativeOptions?: { en: string; hi: string };
  officialSourceNote?: string;
}

export interface ApplicationStep {
  stepNumber: number;
  title: { en: string; hi: string };
  description: { en: string; hi: string };
  channel: 'online' | 'csc' | 'bank' | 'post_office' | 'government_office';
  portalUrl?: string;
}

export interface SchemeFaq {
  question: { en: string; hi: string };
  answer: { en: string; hi: string };
  officialSourceNote?: string;
}

export interface Scheme {
  id: string;
  code: string;
  name: { en: string; hi: string };
  shortName: string;
  administeringAuthority: { en: string; hi: string };
  ministry: { en: string; hi: string };
  category: SchemeCategory;
  officialPortalUrl: string;
  officialApplicationUrl: string;
  sourceCitation: string;
  lastVerifiedDate: string;
  isVerified: boolean;
  verificationNotes: { en: string; hi: string };
  geographicAvailability: {
    type: 'pan_india' | 'states_only';
    applicableStates?: string[];
    description: { en: string; hi: string };
  };
  overview: { en: string; hi: string };
  benefitsSummary: {
    en: string;
    hi: string;
    amount?: string;
    periodicity?: string;
  };
  criteria: SchemeCriterion[];
  requiredDocuments: SchemeDocument[];
  applicationSteps: ApplicationStep[];
  faqs: SchemeFaq[];
}

export interface CriterionEvaluationResult {
  id: string;
  criterionName: { en: string; hi: string };
  userValue: any;
  userValueDisplay: { en: string; hi: string };
  requiredConditionDisplay: { en: string; hi: string };
  status: 'PASS' | 'FAIL' | 'UNKNOWN';
  reason: { en: string; hi: string };
  evidenceCitation: string;
  sourceUrl?: string;
  isMissingInfo: boolean;
}

export interface SchemeEvaluation {
  schemeId: string;
  scheme: Scheme;
  status: EligibilityStatus;
  criteriaResults: CriterionEvaluationResult[];
  missingFields: string[];
  passedCount: number;
  failedCount: number;
  unknownCount: number;
  totalCriteria: number;
  matchScorePercentage: number;
  summary: { en: string; hi: string };
  evaluatedAt: string;
}

export interface AIExplanationPayload {
  schemeId: string;
  language: 'en' | 'hi';
  evaluation: SchemeEvaluation;
}

export interface AIExplanationResponse {
  schemeId: string;
  language: 'en' | 'hi';
  eligibilityExplanation: string;
  benefitsBreakdown: string;
  actionableNextSteps: string[];
  documentReadinessAdvice: string[];
  cautionaryNotes: string;
  groundedSourceRef: string;
  modelMeta: {
    slot: 'primary' | 'fallback_a' | 'fallback_b' | 'deterministic_fallback';
    modelId: string;
    provider: string;
    latencyMs: number;
    usedFallback: boolean;
    failoverTrace?: string[];
  };
}

export interface AIQnAPayload {
  schemeId: string;
  language: 'en' | 'hi';
  question: string;
  evaluation?: SchemeEvaluation;
}

export interface AIQnAResponse {
  schemeId: string;
  language: 'en' | 'hi';
  question: string;
  answer: string;
  isGroundedInVerifiedData: boolean;
  citedSources: string[];
  modelMeta: {
    slot: 'primary' | 'fallback_a' | 'fallback_b' | 'deterministic_fallback';
    modelId: string;
    provider: string;
    latencyMs: number;
    usedFallback: boolean;
    failoverTrace?: string[];
  };
}
