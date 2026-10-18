# YojanaLens AI — Your Government Scheme Eligibility Assistant
> **योजना लेंस एआई — भारत सरकार एवं राज्य सरकारों की कल्याणकारी योजनाओं का पारदर्शी पात्रता सहायक**

An independent, AI-powered public-benefit discovery application designed to help Indian citizens discover central and state government welfare schemes they qualify for based on their personal profile. Built with a **strict separation between deterministic statutory eligibility rules and the AI explanation layer**, ensuring zero hallucination, evidence-backed transparency, and full citizen privacy.

---

## 📑 Table of Contents
1. [Problem Statement & Project Mission](#problem-statement--project-mission)
2. [Key Implemented Features](#key-implemented-features)
3. [Architecture & Technology Stack](#architecture--technology-stack)
4. [Verified Schemes Dataset (27 Authoritative Schemes)](#verified-schemes-dataset-27-authoritative-schemes)
5. [Deterministic Eligibility Engine](#deterministic-eligibility-engine)
6. [AI Model Provider Adapter & 4-Slot Failover Pipeline](#ai-model-provider-adapter--4-slot-failover-pipeline)
7. [Exact Model IDs, Routes, Terms & Licenses](#exact-model-ids-routes-terms--licenses)
8. [Land Records & Privacy Constitution](#land-records--privacy-constitution)
9. [Complete Multilingual Architecture & Dictionary Parity](#complete-multilingual-architecture--dictionary-parity)
10. [Installation & Run Instructions](#installation--run-instructions)
11. [Environment Variables & Secret Configuration](#environment-variables--secret-configuration)
12. [Automated Testing & Quality Suite (6 Suites / 16 Tests)](#automated-testing--quality-suite-6-suites--16-tests)
13. [Hackathon Demo Walkthrough Flow](#hackathon-demo-walkthrough-flow)
14. [Open Source License](#open-source-license)

---

## 1. Problem Statement & Project Mission

Millions of Indian citizens—farmers, urban street vendors, traditional artisans, expectant mothers, students, and senior citizens—miss out on life-changing welfare assistance because eligibility guidelines are buried in complex gazette notifications, spread across fragmented ministry portals, or misrepresented by exploitative middlemen.

**YojanaLens AI** solves this by:
- Giving citizens an honest, preliminary evaluation of their eligibility across verified central and state schemes.
- Explaining the exact reason and evidence behind every criterion in clear **English or Hindi (हिन्दी)**.
- Diagnosing missing information (`NEEDS_INFORMATION`) rather than falsely predicting a match.
- Guiding users directly to verified official application portals (`pmkisan.gov.in`, `pmayg.nic.in`, `ladlibehna.mp.gov.in`, etc.).
- Clearly clarifying that it is **not an official government portal** and that final discretion belongs solely to the respective statutory department.

---

## 2. Key Implemented Features

- **Distinctive Indian Public-Benefit Design:** Accessible, dignified light theme with deep emerald (`#064E3B`) and Ashoka blue accents, responsive typography, and mobile-friendly touch targets.
- **Zero Sensitive Credential Collection:** Never requests or accepts Aadhaar numbers, bank account numbers, passwords, or OTPs. Collects only the minimum demographic and socio-economic parameters needed for statutory matching.
- **Why We Ask This Contextual Tooltips:** Every single profile input (age, income, landholding, residence, maternal status) features an explanatory tag stating the exact statutory necessity.
- **Fast-Test Persona Presets:** Pre-configured one-click personas (Small Farmer UP, Urban Vendor MH, Artisan RJ, Expectant Mother MP, Senior Citizen BR) for immediate testing.
- **Deterministic 4-State Engine:**
  - `MATCH`: All required criteria satisfied based on available verified rules.
  - `NEEDS_INFORMATION`: One or more relevant criteria are unknown or missing in the profile.
  - `DOES_NOT_MATCH`: At least one confirmed criterion fails or falls under an exclusion clause.
  - `UNVERIFIED`: Scheme information insufficiently verified.
- **Criterion-by-Criterion Evidence Table:** Displays user's value, required condition, status (PASS/FAIL/UNKNOWN), and statutory citation quote with official portal link.
- **Bilingual Experience (English / हिन्दी):** 100% dictionary-based translation. Complete UI strings, criteria definitions, scheme overviews, and AI explanations instantly switchable between English and Hindi with persistence in `localStorage`.
- **Category Filter Chips Bar:** Filter schemes by All, Agriculture, MSME & Livelihood, Healthcare, Women & Children, Housing, Pensions & Social Security, Financial Inclusion, and Education.
- **Strictly Grounded AI Explanation & Q&A:** AI responses are strictly anchored in verified scheme context; the model explicitly refuses to speculate on topics outside the supplied dataset.
- **Document Readiness Checklist:** Interactive checklist allowing citizens to mark off required documents and understand mandatory vs optional requirements.
- **Step-by-Step Application Roadmap:** Detailed channels (Online, CSC, Bank, Post Office) with direct verified application links.
- **AI Model Diagnostics & Failover Dashboard:** Real-time visibility into active model slots, provider health, terms of service, live test pings, and execution latency.
- **In-App Automated Unit Test Suite:** Run unit tests directly from the UI or CLI with full assertion reports.

---

## 3. Architecture & Technology Stack

```
   ┌──────────────────────────────────────────────────────────────┐
   │                    React 19 + TypeScript                     │
   │               (Vite SPA + Tailwind CSS v4)                   │
   │  - LandingHero       - ProfileForm       - SchemeResults     │
   │  - DetailModal       - ModelDiagnostics  - TestDashboard     │
   └──────────────────────────────┬───────────────────────────────┘
                                  │ JSON REST API
   ┌──────────────────────────────▼───────────────────────────────┐
   │                    Express Server (server.ts)                 │
   │  - POST /api/evaluate     - POST /api/ai/explain             │
   │  - POST /api/ai/ask       - GET /api/models/status           │
   │  - POST /api/models/test  - GET /api/tests/run               │
   └──────────────┬───────────────────────────────┬───────────────┘
                  │                               │
   ┌──────────────▼─────────────┐   ┌─────────────▼───────────────┐
   │   Deterministic Engine     │   │     AI Provider Adapter     │
   │ (src/engine/eligibility...)│   │ (server/aiProviderAdapter)  │
   │ - Pure TypeScript Rules    │   │ 1. Primary: Gemini 3.8 Flash│
   │ - Zero LLM Guesswork       │   │ 2. Secondary: Ollama API    │
   │ - 100% Offline Testable    │   │ 3. Tertiary: Hugging Face   │
   │ - 27 Verified Schemes DB   │   │ 4. Deterministic Fallback   │
   └────────────────────────────┘   └─────────────────────────────┘
```

- **Frontend:** React 19, TypeScript, Lucide React icons, Tailwind CSS v4.
- **Backend Runtime:** Node.js + Express with TSX runtime.
- **AI SDK:** Official `@google/genai` TypeScript SDK (server-side only, `User-Agent: aistudio-build`).
- **Dev Server:** Express hosting Vite middleware mode on port 3000.

---

## 4. Verified Schemes Dataset (27 Authoritative Schemes)

All schemes in `src/data/verifiedSchemes.ts` and `src/data/additionalVerifiedSchemes.ts` have been curated from official operational guidelines:

### Central Sector & Centrally Sponsored Schemes (Pan-India)
| # | Scheme Short Name | Category | Administering Authority | Official Portal | Verification Date |
|---|---|---|---|---|---|
| 1 | **PM-KISAN** | Agriculture | Dept of Agriculture & Farmers Welfare | https://pmkisan.gov.in | 2026-09-20 |
| 2 | **PM SVANidhi** | Livelihood / MSME | Ministry of Housing & Urban Affairs (MoHUA) | https://pmsvanidhi.mohua.gov.in | 2026-09-18 |
| 3 | **AB PM-JAY** | Healthcare | National Health Authority (NHA) | https://pmjay.gov.in | 2026-09-25 |
| 4 | **PMMVY** | Women & Child | Ministry of Women & Child Development | https://pmmvy.wcd.gov.in | 2026-09-22 |
| 5 | **PM Vishwakarma** | Livelihood | Ministry of MSME | https://pmvishwakarma.gov.in | 2026-09-15 |
| 6 | **Sukanya Samriddhi (SSY)**| Women & Child | National Savings Institute / India Post | https://nsiindia.gov.in | 2026-09-28 |
| 7 | **PMAY-Urban 2.0** | Housing | Ministry of Housing & Urban Affairs | https://pmay-urban.gov.in | 2026-09-19 |
| 8 | **IGNOAPS Pension** | Social Security | Ministry of Rural Development | https://nsap.nic.in | 2026-09-24 |
| 9 | **PM Mudra Yojana** | Financial Inclusion | Dept of Financial Services, Ministry of Finance | https://www.mudra.org.in | 2026-09-27 |
| 10 | **PM Fasal Bima (PMFBY)** | Agriculture | Dept of Agriculture & Farmers Welfare | https://pmfby.gov.in | 2026-09-28 |
| 11 | **PMAY-Gramin (PMAY-G)** | Housing | Ministry of Rural Development | https://pmayg.nic.in | 2026-10-01 |
| 12 | **PM Suraksha Bima (PMSBY)** | Social Security | Dept of Financial Services, Ministry of Finance | https://www.jansuraksha.gov.in | 2026-10-01 |
| 13 | **PM Jeevan Jyoti (PMJJBY)** | Financial Inclusion | Dept of Financial Services, Ministry of Finance | https://www.jansuraksha.gov.in | 2026-10-01 |
| 14 | **Atal Pension Yojana (APY)** | Social Security | PFRDA, Ministry of Finance | https://www.npscra.nsdl.co.in | 2026-10-01 |
| 15 | **Post-Matric Scholarship** | Education | Ministry of Social Justice / Tribal Affairs | https://scholarships.gov.in | 2026-09-25 |
| 16 | **Stand-Up India** | Livelihood | Dept of Financial Services / SIDBI | https://www.standupmitra.in | 2026-09-20 |
| 17 | **PMEGP** | Livelihood / MSME | KVIC, Ministry of MSME | https://www.kviconline.gov.in/pmegpeportal | 2026-09-22 |

### State-Specific Verified Schemes
| # | Scheme Short Name | State | Category | Administering Authority | Official Portal |
|---|---|---|---|---|---|
| 18 | **UP Kanya Sumangala** | Uttar Pradesh | Women & Child | Dept of Women & Child Development, UP | https://mksy.up.gov.in |
| 19 | **UP Old Age Pension** | Uttar Pradesh | Social Security | Social Welfare Dept, Uttar Pradesh | https://sspy-up.gov.in |
| 20 | **MP Ladli Behna** | Madhya Pradesh | Women & Child | Women & Child Development, MP | https://ladlibehna.mp.gov.in |
| 21 | **MP Kisan Kalyan** | Madhya Pradesh | Agriculture | Revenue Department, MP | https://saara.mp.gov.in |
| 22 | **Bihar Kanya Utthan** | Bihar | Education | Education Department, Bihar | https://medhasoft.bih.nic.in |
| 23 | **Bihar Udyami Yojana** | Bihar | Livelihood | Department of Industries, Bihar | https://udyami.bihar.gov.in |
| 24 | **MH Namo Shetkari** | Maharashtra | Agriculture | Department of Agriculture, Maharashtra | https://krishi.maharashtra.gov.in |
| 25 | **MH Sanjay Gandhi Niradhar** | Maharashtra | Social Security | Social Justice & Special Assistance, MH | https://sjsa.maharashtra.gov.in |
| 26 | **WB Krishak Bandhu** | West Bengal | Agriculture | Department of Agriculture, West Bengal | https://krishakbandhu.wb.gov.in |
| 27 | **WB Kanyashree Prakalpa** | West Bengal | Education | Women Development & Social Welfare, WB | https://www.wbkanyashree.gov.in |

---

## 5. Deterministic Eligibility Engine

The engine in `src/engine/eligibilityEngine.ts` is completely decoupled from LLMs:
- **Rule Independence:** Evaluates age brackets, income ceilings, land ownership status, residence, state boundaries, and statutory exclusion clauses using pure conditional logic.
- **Geographic State Checks:** State-specific schemes strictly disqualify out-of-state profiles (`DOES_NOT_MATCH`) or prompt for missing state details (`NEEDS_INFORMATION`).
- **Missing Information Integrity:** Missing fields never convert into a match. If an unknown field is required, the verdict is strictly `NEEDS_INFORMATION`.
- **Exclusion Enforcement:** Excludes institutional landholders, regular government employees, or families owning a pucca house from applicable schemes.

---

## 6. AI Model Provider Adapter & 4-Slot Failover Pipeline

The adapter in `server/aiProviderAdapter.ts` implements genuine failover across 3 real AI model slots and a guaranteed deterministic fallback:

```
┌──────────────────────────────────────────────────────────────┐
│                    User Request / Question                   │
└──────────────────────────────┬───────────────────────────────┘
                               │
                ┌──────────────▼─────────────┐
                │ Slot 1: Primary Model      │
                │ Google Gemini 3.8 Flash    │
                │ (via @google/genai SDK)    │
                └──────┬──────────────┬──────┘
             [Success] │              │ [Timeout / 429 / Error / Unconfigured]
                       │       ┌──────▼─────────────────────┐
                       │       │ Slot 2: Secondary Model    │
                       │       │ Ollama Chat API            │
                       │       │ (Llama 3.2 / Qwen 2.5)     │
                       │       └──────┬──────────────┬──────┘
                       │   [Success]  │              │ [Error / Unconfigured]
                       │              │       ┌──────▼─────────────────────┐
                       │              │       │ Slot 3: Tertiary Model     │
                       │              │       │ Hugging Face Inference     │
                       │              │       │ (Llama 3.2 3B Instruct)    │
                       │              │       └──────┬──────────────┬──────┘
                       │              │   [Success]  │              │ [Error / Unconfigured]
                       │              │              │       ┌──────▼─────────────────────┐
                       │              │              │       │ Slot 4: Guaranteed Engine  │
                       │              │              │       │ Deterministic Rule Fallback│
                       │              │              │       └──────────────┬─────────────┘
                       ▼              ▼              ▼                      ▼
                   ───────────────────────────────────────────────────────────
                                Verified Grounded Response
                    (Includes Model ID, Slot, Latency & Failover Trace)
```

### Failover Guarantees
1. **Never substitute an unrelated proprietary model silently.**
2. **Always validate model response** before sending to client.
3. **If all remote AI providers fail or are unconfigured**, the built-in Deterministic Rule Generator produces an evidence-grounded explanation directly from the verified criteria matrix. The application is **100% operational even with zero external AI credentials**.

---

## 7. Exact Model IDs, Routes, Terms & Licenses

| Slot | Config Env Var | Model ID | Provider | Route / SDK | Terms & License |
|---|---|---|---|---|---|
| **Slot 1 (Primary)** | `GEMINI_API_KEY` | `gemini-3.8-flash` | Google GenAI | `ai.models.generateContent` via `@google/genai` | [Google APIs Terms of Service](https://ai.google.dev/terms) |
| **Slot 2 (Secondary)** | `OLLAMA_BASE_URL` | `llama3.2` | Ollama-compatible Server | POST `/api/chat` or `/v1/chat/completions` | [Llama 3.2 Community License / Apache 2.0](https://ollama.com) |
| **Slot 3 (Tertiary)** | `HF_TOKEN` | `meta-llama/Llama-3.2-3B-Instruct` | Hugging Face Inference | POST `/models/{model_id}` or Router v1 | [Open-Weight License](https://huggingface.co/docs/inference-endpoints) |
| **Slot 4 (Statutory)** | None (Built-in) | `yojanalens-rule-engine-v1` | Built-in Rule Engine | Internal Pure TS Engine | MIT License (Open Source) |

---

## 8. Land Records & Privacy Constitution

- **Self-Declared Landholding Notice:** Agricultural land ownership is transparently marked as self-declared for eligibility discovery. The UI features direct verified links to official state land records portals:
  - Uttar Pradesh: [UP Bhulekh](https://upbhulekh.gov.in)
  - Madhya Pradesh: [MP Bhulekh](https://mpbhulekh.gov.in)
  - Bihar: [Bihar Bhumi](https://biharbhumi.bihar.gov.in)
  - Maharashtra: [Mahabhulekh](https://bhulekh.mahabhumi.gov.in)
  - West Bengal: [Banglarbhumi](https://banglarbhumi.gov.in)
  - Central: [Digital India Land Records Modernization Programme (DILRMP)](https://dilrmp.gov.in)
- **Zero Logging of Sensitive Data:** Profiles are evaluated in memory and discarded upon session end.
- **Server-Only Credentials:** API secrets are stored strictly on the server (`process.env.GEMINI_API_KEY`, `process.env.HF_TOKEN`). The browser bundle contains zero API keys.
- **No Aadhaar / Bank Collection:** Application strictly forbids requesting identity numbers, OTPs, or passwords.

---

## 9. Complete 12 Indian Languages Multilingual Architecture & RTL Support

YojanaLens AI provides native, zero-English-fallback internationalization across **12 major Indian languages**:

| # | Language | Native Name | Script | Direction | Dictionary File | Key Parity |
|---|---|---|---|---|---|---|
| 1 | English | English | Latin | LTR | `src/locales/en.ts` | Base Reference |
| 2 | Hindi | हिन्दी | Devanagari | LTR | `src/locales/hi.ts` | 100% (0 missing keys) |
| 3 | Marathi | मराठी | Devanagari | LTR | `src/locales/mr.ts` | 100% (0 missing keys) |
| 4 | Bengali | বাংলা | Bengali | LTR | `src/locales/bn.ts` | 100% (0 missing keys) |
| 5 | Tamil | தமிழ் | Tamil | LTR | `src/locales/ta.ts` | 100% (0 missing keys) |
| 6 | Telugu | తెలుగు | Telugu | LTR | `src/locales/te.ts` | 100% (0 missing keys) |
| 7 | Gujarati | ગુજરાતી | Gujarati | LTR | `src/locales/gu.ts` | 100% (0 missing keys) |
| 8 | Kannada | ಕನ್ನಡ | Kannada | LTR | `src/locales/kn.ts` | 100% (0 missing keys) |
| 9 | Malayalam | മലയാളം | Malayalam | LTR | `src/locales/ml.ts` | 100% (0 missing keys) |
| 10 | Punjabi | ਪੰਜਾਬੀ | Gurmukhi | LTR | `src/locales/pa.ts` | 100% (0 missing keys) |
| 11 | Odia | ଓଡ଼ିଆ | Odia | LTR | `src/locales/or.ts` | 100% (0 missing keys) |
| 12 | Urdu | اردو | Perso-Arabic | **RTL** | `src/locales/ur.ts` | 100% (0 missing keys) |

### Key Features of the i18n System:
- **Instant Switching without Page Reload:** Seamless React state update with document-level `dir="rtl"` and `lang` attribute propagation.
- **Persistent Across Sessions:** Selection remembered via `localStorage.getItem('yojanalens_language')`.
- **Urdu Right-to-Left (RTL) Layout:** Automatically flips text direction, inputs, navigation, dropdowns, and margins using Tailwind's `rtl:` variants and `dir="rtl"`.
- **Preservation of Official Requirements:** Scheme names, statutory guidelines, cash amounts, dates, and official government portal links are preserved with complete legal accuracy.
- **Dual Language Navigation Controls:** Includes both the quick English/Hindi toggle button and the clean 12-language native name dropdown popover.
- **Automated Dictionary Parity Testing:** Suite 5 in `src/tests/testSuite.ts` tests all 11 non-English dictionaries against English for both 100% completeness and zero orphaned keys.

---

## 10. Installation & Run Instructions

### Prerequisites
- Node.js 20+
- npm 10+

### Step-by-Step Setup
```bash
# 1. Install dependencies
npm install

# 2. Run the full-stack dev server (Express + Vite on port 3000)
npm run dev

# 3. Build for production
npm run build

# 4. Run automated test suite (39 automated assertions)
npm test
```

The application will be accessible at `http://localhost:3000`.

---

## 11. Environment Variables & Secret Configuration

Copy `.env.example` to `.env`:
```bash
# Slot 1: Primary Model (Google Gemini API via @google/genai)
# AI Studio automatically injects GEMINI_API_KEY from user secrets.
GEMINI_API_KEY="your-gemini-api-key"
PRIMARY_MODEL_ID="gemini-3.8-flash"

# Slot 2: Secondary Open-Weight Provider (Ollama Chat API - Optional)
OLLAMA_BASE_URL=""
OLLAMA_MODEL="llama3.2"
OLLAMA_API_KEY=""

# Slot 3: Tertiary Open-Weight Provider (Hugging Face Inference - Optional)
HF_TOKEN=""
HF_MODEL_ID="meta-llama/Llama-3.2-3B-Instruct"

PORT=3000
```

---

## 12. Automated Testing & Quality Suite (6 Suites / 39 Tests)

The test suite in `src/tests/testSuite.ts` covers 6 comprehensive automated test suites:
1. **Deterministic Matches:** Small farmer qualifies for PM-KISAN, urban vendor qualifies for PM SVANidhi, senior citizen qualifies for NSAP IGNOAPS.
2. **Missing Information Safety:** Unrecorded landholding yields `NEEDS_INFORMATION`; blank profile never outputs false positives.
3. **Exclusion Clauses & Boundary Limits:** Government employee disqualified from PM-KISAN; income > ₹2.5L fails PM-JAY; age < 19 fails PMMVY.
4. **Grounding & Fallback Integrity:** Deterministic fallback embeds verified legal citations; Q&A engine strictly refuses out-of-context ungrounded queries.
5. **12 Indian Languages Translation Parity & RTL Validation:**
   - 100% key parity for all 11 non-English locales (Hindi, Marathi, Bengali, Tamil, Telugu, Gujarati, Kannada, Malayalam, Punjabi, Odia, Urdu) against English reference dictionary.
   - Bidirectional key symmetry (0 orphaned keys in any target language).
   - Right-to-Left (RTL) validation (Urdu correctly detected as RTL, all 11 other languages detected as LTR).
   - Metadata registry validation for all 12 languages with native scripts.
   - Core UI flow string resolution verification across all 12 languages.
6. **Geographic Boundaries & State Rules:** Out-of-state exclusion (UP resident fails MP Ladli Behna), eligible resident match, education income limits, and age boundary restrictions.

Run tests via terminal:
```bash
npm test
```
Or open the **"Engine Tests"** tab directly in the web UI.

---

## 13. Hackathon Demo Walkthrough Flow

For live presentations and judging demos:
1. **Landing Hero:** Showcase the public-service green/blue design, grounded trust pill, and 12-language selector (English, हिन्दी, मराठी, বাংলা, தமிழ், తెలుగు, ગુજરાતી, ಕನ್ನಡ, മലയാളം, ਪੰਜਾਬੀ, ଓଡ଼ିଆ, اردو).
2. **Instant Language Switching & Urdu RTL:** Select Urdu to show dynamic Right-to-Left navigation, mirrored layouts, and authentic typography, then switch to Marathi, Bengali, Tamil, etc., demonstrating zero page reload and instant updates.
3. **Persona Preset Check:** Click *"Farmer (UP)"* or *"Expectant Mother (MP)"* in the profile form to autofill realistic citizen parameters without typing.
4. **Transparent Criteria Breakdown:** Click *"Evaluate Eligibility"*; examine the results dashboard showing `MATCH`, `NEEDS_INFORMATION`, and `DOES_NOT_MATCH` cards with statutory citations.
5. **Category Filtering:** Filter across Agriculture, MSME, Healthcare, Housing, Women & Child, and Education.
6. **Detailed Modal & Grounded Q&A:** Click *"View Scheme Details & Apply"* on PM-KISAN or MP Ladli Behna. Review the Document Checklist and ask a question (e.g., *"What documents are needed?"*). Observe the cited sources and model metadata badge showing active provider slot and latency in the selected language.
7. **Model Diagnostics & Failover:** Navigate to the *"AI Diagnostics"* tab to review active slots, latency benchmarks, and run live test pings on the 4-tier pipeline.
8. **Automated Test Dashboard:** Navigate to *"Engine Tests"* tab and run all 39 unit tests directly in the browser to demonstrate 100% test pass rate, multi-language parity, and failover resilience.

---

## 14. Open Source License

Distributed under the **MIT License**. See `LICENSE` for details.
