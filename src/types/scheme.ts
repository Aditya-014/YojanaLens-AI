import { SupportedLanguage } from '../locales/index.ts';

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

export type LocalizedString = Record<string, string>;

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
  name: LocalizedString;
  field: string;
  operator: CriterionOperator;
  expectedValue: any;
  requiredConditionDisplay: LocalizedString;
  evidenceSource: string;
  sourceUrl?: string;
  isMandatory: boolean;
}

export interface SchemeDocument {
  name: LocalizedString;
  mandatory: boolean;
  purpose: LocalizedString;
  alternativeOptions?: LocalizedString;
  officialSourceNote?: string;
}

export interface ApplicationStep {
  stepNumber: number;
  title: LocalizedString;
  description: LocalizedString;
  channel: 'online' | 'csc' | 'bank' | 'post_office' | 'government_office';
  portalUrl?: string;
}

export interface SchemeFaq {
  question: LocalizedString;
  answer: LocalizedString;
  officialSourceNote?: string;
}

export interface Scheme {
  id: string;
  code: string;
  name: LocalizedString;
  shortName: string;
  administeringAuthority: LocalizedString;
  ministry: LocalizedString;
  category: SchemeCategory;
  officialPortalUrl: string;
  officialApplicationUrl: string;
  sourceCitation: string;
  lastVerifiedDate: string;
  isVerified: boolean;
  verificationNotes: LocalizedString;
  geographicAvailability: {
    type: 'pan_india' | 'states_only';
    applicableStates?: string[];
    description: LocalizedString;
  };
  overview: LocalizedString;
  benefitsSummary: LocalizedString & {
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
  criterionName: LocalizedString;
  userValue: any;
  userValueDisplay: LocalizedString;
  requiredConditionDisplay: LocalizedString;
  status: 'PASS' | 'FAIL' | 'UNKNOWN';
  reason: LocalizedString;
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
  summary: LocalizedString;
  evaluatedAt: string;
}

export interface AIExplanationPayload {
  schemeId: string;
  language: SupportedLanguage;
  evaluation: SchemeEvaluation;
}

export interface AIExplanationResponse {
  schemeId: string;
  language: SupportedLanguage;
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
