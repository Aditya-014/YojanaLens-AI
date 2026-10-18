# YojanaLens AI — Your Government Scheme Eligibility Assistant
> **योजना लेंस एआई — भारत सरकार की कल्याणकारी योजनाओं का पारदर्शी पात्रता सहायक**

An independent, AI-powered public-benefit discovery application designed to help Indian citizens discover central government welfare schemes they may qualify for based on their personal profile. Built with a **strict separation between deterministic statutory eligibility rules and the AI explanation layer**, ensuring zero hallucination, evidence-backed transparency, and full citizen privacy.

---

## 📑 Table of Contents
1. [Problem Statement & Project Mission](#problem-statement--project-mission)
2. [Key Implemented Features](#key-implemented-features)
3. [Architecture & Technology Stack](#architecture--technology-stack)
4. [Verified Schemes Dataset](#verified-schemes-dataset)
5. [Deterministic Eligibility Engine](#deterministic-eligibility-engine)
6. [AI Model Provider Adapter & 3-Tier Failover Design](#ai-model-provider-adapter--3-tier-failover-design)
7. [Exact Model IDs, Routes, Terms & Licenses](#exact-model-ids-routes-terms--licenses)
8. [Privacy & Security Constitution](#privacy--security-constitution)
9. [Installation & Run Instructions](#installation--run-instructions)
10. [Environment Variables & Secret Configuration](#environment-variables--secret-configuration)
11. [Automated Testing & Quality Suite](#automated-testing--quality-suite)
12. [Known Limitations & Roadmap](#known-limitations--roadmap)
13. [Open Source License](#open-source-license)

---

## 1. Problem Statement & Project Mission

Millions of Indian citizens—farmers, urban street vendors, traditional artisans, expectant mothers, and senior citizens—miss out on life-changing welfare assistance because eligibility guidelines are buried in complex gazette notifications, spread across fragmented ministry portals, or misrepresented by exploitative middlemen.

**YojanaLens AI** solves this by:
- Giving citizens an honest, preliminary evaluation of their eligibility across verified central schemes.
- Explaining the exact reason and evidence behind every criterion in clear **English or Hindi (हिन्दी)**.
- Diagnosing missing information (`NEEDS_INFORMATION`) rather than falsely predicting a match.
- Guiding users directly to verified official application portals (`pmkisan.gov.in`, `pmsvanidhi.mohua.gov.in`, `beneficiary.nha.gov.in`, etc.).
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
- **Bilingual Experience (English / हिन्दी):** Complete UI strings, criteria definitions, scheme overviews, and AI explanations instantly switchable between English and Hindi.
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
   │ - Pure TypeScript Rules    │   │ 1. Primary (Gemini 3.8/Gemma│
   │ - Zero LLM Guesswork       │   │ 2. Fallback A (Open-Weight) │
   │ - 100% Offline Testable    │   │ 3. Fallback B (Open-Weight) │
   │ - Verified Scheme Database │   │ 4. Deterministic Generator  │
   └────────────────────────────┘   └─────────────────────────────┘
```

- **Frontend:** React 19, TypeScript, Lucide React icons, Tailwind CSS v4.
- **Backend Runtime:** Node.js + Express with TSX runtime.
- **AI SDK:** Official `@google/genai` TypeScript SDK (server-side only, `User-Agent: aistudio-build`).
- **Dev Server:** Express hosting Vite middleware mode on port 3000.

---

## 4. Verified Schemes Dataset

All schemes in `src/data/verifiedSchemes.ts` have been curated from official operational guidelines:

| # | Scheme Short Name | Administering Authority | Official Portal | Verification Date |
|---|---|---|---|---|
| 1 | **PM-KISAN** | Dept of Agriculture & Farmers Welfare | https://pmkisan.gov.in | 2026-09-20 |
| 2 | **PM SVANidhi** | Ministry of Housing & Urban Affairs (MoHUA) | https://pmsvanidhi.mohua.gov.in | 2026-09-18 |
| 3 | **AB PM-JAY** | National Health Authority (NHA) | https://pmjay.gov.in | 2026-09-25 |
| 4 | **PMMVY** | Ministry of Women & Child Development | https://pmmvy.wcd.gov.in | 2026-09-22 |
| 5 | **PM Vishwakarma** | Ministry of MSME | https://pmvishwakarma.gov.in | 2026-09-15 |
| 6 | **Sukanya Samriddhi (SSY)**| National Savings Institute / India Post | https://nsiindia.gov.in | 2026-09-28 |
| 7 | **PMAY-Urban 2.0** | Ministry of Housing & Urban Affairs | https://pmay-urban.gov.in | 2026-09-19 |
| 8 | **IGNOAPS Pension** | Ministry of Rural Development | https://nsap.nic.in | 2026-09-24 |
| 9 | **PM Mudra Yojana** | Dept of Financial Services, Ministry of Finance | https://www.mudra.org.in | 2026-09-27 |

---

## 5. Deterministic Eligibility Engine

The engine in `src/engine/eligibilityEngine.ts` is completely decoupled from LLMs:
- **Rule Independence:** Evaluates age brackets, income ceilings, land ownership status, residence, and statutory exclusion clauses using pure conditional logic.
- **Missing Information Integrity:** Missing fields never convert into a match. If an unknown field is required, the verdict is strictly `NEEDS_INFORMATION`.
- **Exclusion Enforcement:** Excludes institutional landholders, regular government employees, or families owning a pucca house from applicable schemes.

---

## 6. AI Model Provider Adapter & 3-Tier Failover Design

The adapter in `server/aiProviderAdapter.ts` implements genuine failover:

```
┌──────────────────────────────────────────────────────────────┐
│                    User Request / Question                   │
└──────────────────────────────┬───────────────────────────────┘
                               │
                ┌──────────────▼─────────────┐
                │ Slot 1: Primary Model      │
                │ Gemini 3.8 Flash / Gemma   │
                └──────┬──────────────┬──────┘
             [Success] │              │ [Timeout / 429 / Error]
                       │       ┌──────▼─────────────────────┐
                       │       │ Slot 2: Fallback A         │
                       │       │ Open-Weight (Gemma 2 9B)   │
                       │       └──────┬──────────────┬──────┘
                       │   [Success]  │              │ [Error / Unconfigured]
                       │              │       ┌──────▼─────────────────────┐
                       │              │       │ Slot 3: Fallback B         │
                       │              │       │ Open-Weight (Mistral 7B)   │
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
1. **Never substitute an unrelated proprietary model.**
2. **Always validate model response** before sending to client.
3. **If all remote AI providers fail**, the built-in Deterministic Rule Generator produces an evidence-grounded explanation directly from the verified criteria matrix. The application is **100% operational even with zero external AI credentials**.

---

## 7. Exact Model IDs, Routes, Terms & Licenses

| Slot | Model ID | Provider | Route / SDK | Terms & License |
|---|---|---|---|---|
| **Primary** | `gemini-3.8-flash` | Google GenAI | `ai.models.generateContent` via `@google/genai` | [Google APIs Terms of Service](https://ai.google.dev/terms) |
| **Fallback A** | `google/gemma-2-9b-it` | Configurable Open-Weight Host (HF / Groq / vLLM) | POST `/chat/completions` or Inference API | [Gemma Terms of Use](https://ai.google.dev/gemma/terms) |
| **Fallback B** | `mistralai/Mistral-7B-Instruct-v0.3` | Configurable Open-Weight Host | POST `/chat/completions` | [Apache 2.0 / Mistral Terms](https://mistral.ai/terms/) |
| **Rule Fallback** | `yojanalens-rule-engine-v1` | Built-in Stateless Rule Engine | Internal Pure TS Engine | MIT License (Open Source) |

---

## 8. Privacy & Security Constitution

- **Zero Logging of Sensitive Data:** Profiles are evaluated in memory and discarded upon session end.
- **Server-Only Credentials:** API secrets are stored strictly on the server (`process.env.GEMINI_API_KEY`). The browser bundle contains zero API keys.
- **No Aadhaar / Bank Collection:** Application strictly forbids requesting identity numbers or financial account credentials.

---

## 9. Installation & Run Instructions

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

# 4. Run automated test suite
npm test
```

The application will be accessible at `http://localhost:3000`.

---

## 10. Environment Variables & Secret Configuration

Copy `.env.example` to `.env`:
```bash
# In AI Studio, GEMINI_API_KEY is injected automatically from user secrets
GEMINI_API_KEY="your-gemini-api-key"

# Primary model ID
PRIMARY_MODEL_ID="gemini-3.8-flash"

# Optional Fallback Slot A (HuggingFace / Groq / OpenAI compatible)
FALLBACK_A_API_KEY=""
FALLBACK_A_ENDPOINT=""
FALLBACK_A_MODEL_ID="google/gemma-2-9b-it"

# Optional Fallback Slot B
FALLBACK_B_API_KEY=""
FALLBACK_B_ENDPOINT=""
FALLBACK_B_MODEL_ID="mistralai/Mistral-7B-Instruct-v0.3"

PORT=3000
```

---

## 11. Automated Testing & Quality Suite

The test suite in `src/tests/testSuite.ts` covers 4 automated suites:
1. **Deterministic Matches:** Small farmer qualifies for PM-KISAN, urban vendor qualifies for PM SVANidhi, senior citizen qualifies for IGNOAPS.
2. **Missing Information Safety:** Unrecorded landholding yields `NEEDS_INFORMATION`; blank profile never outputs false positives.
3. **Exclusion Clauses & Boundary Limits:** Government employee disqualified from PM-KISAN; income > ₹2.5L fails PM-JAY; age < 19 fails PMMVY.
4. **Grounding & Fallback Integrity:** Deterministic fallback embeds verified legal citations; Q&A engine strictly refuses out-of-context ungrounded queries.

Run tests via terminal:
```bash
npm test
```
Or open the **"Engine Tests"** tab directly in the web UI.

---

## 12. Known Limitations & Roadmap

- **State-Specific Top-Up Schemes:** Currently covers pan-India Central Sector and Centrally Sponsored schemes. State-specific schemes (e.g. Rythu Bandhu, Ladli Behna) will be added in Phase 2.
- **Real-Time Land Records (e-Dharti / Bhulekh):** Landholding status is currently self-declared; future integrations can offer voluntary API verification via state land record portals.
- **Language Coverage:** Currently supports English and Hindi; regional languages (Tamil, Telugu, Bengali, Marathi) planned for subsequent releases.

---

## 13. Open Source License

Distributed under the **MIT License**. See `LICENSE` for details.
