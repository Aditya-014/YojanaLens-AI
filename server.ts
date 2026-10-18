import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

import { VERIFIED_SCHEMES } from './src/data/verifiedSchemes.ts';
import { evaluateAllSchemes, evaluateEligibility } from './src/engine/eligibilityEngine.ts';
import { UserProfile } from './src/types/profile.ts';
import {
  executeWithFailover,
  generateDeterministicExplanation,
  generateDeterministicQnA,
  getModelSlotConfigs,
  testSpecificSlot,
} from './server/aiProviderAdapter.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProduction = process.env.NODE_ENV === 'production';
const PORT = Number(process.env.PORT) || 3000;

async function startServer() {
  const app = express();
  app.use(express.json());

  // 1. Health check
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'YojanaLens AI Engine',
    });
  });

  // 2. Verified Schemes Dataset
  app.get('/api/schemes', (_req: Request, res: Response) => {
    res.json({
      schemes: VERIFIED_SCHEMES,
      totalCount: VERIFIED_SCHEMES.length,
      lastVerifiedDate: '2026-09-28',
    });
  });

  // 3. Deterministic Eligibility Evaluation
  app.post('/api/evaluate', (req: Request, res: Response) => {
    try {
      const profile: UserProfile = req.body.profile;
      if (!profile || typeof profile !== 'object') {
        return res.status(400).json({ error: 'Valid profile object is required.' });
      }

      const evaluations = evaluateAllSchemes(profile, VERIFIED_SCHEMES);
      return res.json({
        evaluations,
        evaluatedAt: new Date().toISOString(),
      });
    } catch (err: any) {
      console.error('Evaluation error:', err);
      return res.status(500).json({ error: 'Internal evaluation engine error', message: err.message });
    }
  });

  // 4. AI Explanation with Genuine Failover and Grounding
  app.post('/api/ai/explain', async (req: Request, res: Response) => {
    try {
      const { schemeId, language = 'en', evaluation } = req.body;
      const lang = language === 'hi' ? 'hi' : 'en';

      const scheme = VERIFIED_SCHEMES.find((s) => s.id === schemeId);
      if (!scheme) {
        return res.status(404).json({ error: `Scheme with ID '${schemeId}' not found.` });
      }

      // Compute evaluation if not passed
      const currentEval = evaluation || evaluateEligibility(req.body.profile, scheme);

      // System instruction enforcing strict anti-hallucination and grounding
      const systemInstruction = `You are YojanaLens AI, an objective, empathetic public benefit eligibility advisor for Indian citizens.
CRITICAL CONSTITUTION:
1. Ground every statement strictly in the provided verified scheme dataset and deterministic criteria results.
2. NEVER overturn, contradict, or soften the deterministic eligibility verdict (${currentEval.status}).
3. If criteria failed or information is missing, explicitly explain the exact rule and evidence citation.
4. Do not invent benefits, deadlines, cash amounts, or application links.
5. Provide response in ${lang === 'hi' ? 'clear, respectful Hindi (हिन्दी)' : 'simple, accessible Indian English'}.
6. Avoid official government emblem imitation or claiming official decision authority. Always clarify that final discretion belongs to the administering department.`;

      const prompt = `Scheme: ${scheme.name.en} (${scheme.shortName})
Administering Authority: ${scheme.administeringAuthority.en} (${scheme.ministry.en})
Official Portal: ${scheme.officialPortalUrl}
Source Citation: ${scheme.sourceCitation}
Deterministic Status: ${currentEval.status}
Criteria Breakdown:
${currentEval.criteriaResults
  .map(
    (c: any) =>
      `- Criterion: ${c.criterionName.en} | User's Value: ${c.userValueDisplay.en} | Required: ${c.requiredConditionDisplay.en} | Status: ${c.status} | Source: ${c.evidenceCitation}`
  )
  .join('\n')}

Benefits: ${scheme.benefitsSummary.en}
Required Documents: ${scheme.requiredDocuments.map((d: any) => d.name.en).join(', ')}

Please provide:
1. A clear, friendly explanation of the eligibility result in ${lang === 'hi' ? 'Hindi' : 'English'}.
2. Concise benefits breakdown.
3. 3-4 actionable next steps.
4. Document readiness advice.
5. Important cautionary advice (mentioning preliminary nature and no application fees).`;

      const result = await executeWithFailover(prompt, systemInstruction, () =>
        generateDeterministicExplanation(currentEval, lang)
      );

      // Extract structured checklist & steps
      const fallbackExplanation = generateDeterministicExplanation(currentEval, lang);

      return res.json({
        schemeId,
        language: lang,
        eligibilityExplanation: result.text || fallbackExplanation,
        benefitsBreakdown: lang === 'hi' ? scheme.benefitsSummary.hi : scheme.benefitsSummary.en,
        actionableNextSteps: scheme.applicationSteps.map((s) =>
          lang === 'hi'
            ? `${s.stepNumber}. ${s.title.hi}: ${s.description.hi}`
            : `${s.stepNumber}. ${s.title.en}: ${s.description.en}`
        ),
        documentReadinessAdvice: scheme.requiredDocuments.map((d) =>
          lang === 'hi'
            ? `${d.name.hi} (${d.mandatory ? 'अनिवार्य' : 'वैकल्पिक'}): ${d.purpose.hi}`
            : `${d.name.en} (${d.mandatory ? 'Mandatory' : 'Optional'}): ${d.purpose.en}`
        ),
        cautionaryNotes:
          lang === 'hi'
            ? 'यह प्रारंभिक मूल्यांकन है। सरकारी पोर्टल या सीएससी पर किसी भी बिचौलिए को अनधिकृत शुल्क न दें।'
            : 'This is a preliminary discovery assessment. Never pay unauthorized fees to middlemen or unverified agents.',
        groundedSourceRef: scheme.sourceCitation,
        modelMeta: {
          slot: result.slotUsed,
          modelId: result.modelId,
          provider: result.provider,
          latencyMs: result.latencyMs,
          usedFallback: result.usedFallback,
          failoverTrace: result.failoverTrace,
        },
      });
    } catch (err: any) {
      console.error('AI Explanation error:', err);
      return res.status(500).json({ error: 'AI generation failed', message: err.message });
    }
  });

  // 5. Grounded Q&A against verified scheme data
  app.post('/api/ai/ask', async (req: Request, res: Response) => {
    try {
      const { schemeId, question, language = 'en' } = req.body;
      const lang = language === 'hi' ? 'hi' : 'en';

      if (!question || typeof question !== 'string') {
        return res.status(400).json({ error: 'Question is required.' });
      }

      const scheme = VERIFIED_SCHEMES.find((s) => s.id === schemeId);
      if (!scheme) {
        return res.status(404).json({ error: `Scheme with ID '${schemeId}' not found.` });
      }

      const deterministicQnA = generateDeterministicQnA(scheme, question, lang);

      const systemInstruction = `You are a strict, grounded Q&A assistant for Indian welfare schemes.
CRITICAL RULES:
1. Answer ONLY using the facts from the verified scheme context below.
2. If the user question cannot be answered from the provided text, reply strictly stating that the information is not present in the verified dataset and advise visiting ${scheme.officialPortalUrl}.
3. Respond in ${lang === 'hi' ? 'clear Hindi (हिन्दी)' : 'simple Indian English'}.
4. Do not invent any rules, eligibility conditions, or contact numbers.`;

      const prompt = `Scheme: ${scheme.name.en} (${scheme.shortName})
Administering: ${scheme.administeringAuthority.en}
Overview: ${scheme.overview.en}
Benefits: ${scheme.benefitsSummary.en}
Official Portal: ${scheme.officialPortalUrl}
Application URL: ${scheme.officialApplicationUrl}
Source: ${scheme.sourceCitation}
Documents: ${JSON.stringify(scheme.requiredDocuments)}
Steps: ${JSON.stringify(scheme.applicationSteps)}
FAQs: ${JSON.stringify(scheme.faqs)}

User Question: "${question}"

Provide a factual, verified answer with source reference.`;

      const result = await executeWithFailover(prompt, systemInstruction, () => deterministicQnA.answer);

      return res.json({
        schemeId,
        language: lang,
        question,
        answer: result.text || deterministicQnA.answer,
        isGroundedInVerifiedData: deterministicQnA.isGrounded,
        citedSources: [scheme.sourceCitation, scheme.officialPortalUrl],
        modelMeta: {
          slot: result.slotUsed,
          modelId: result.modelId,
          provider: result.provider,
          latencyMs: result.latencyMs,
          usedFallback: result.usedFallback,
          failoverTrace: result.failoverTrace,
        },
      });
    } catch (err: any) {
      console.error('AI Ask error:', err);
      return res.status(500).json({ error: 'AI Q&A failed', message: err.message });
    }
  });

  // 6. Model Status & Diagnostics
  app.get('/api/models/status', (_req: Request, res: Response) => {
    const slots = getModelSlotConfigs();
    res.json({
      activePrimary: slots.find((s) => s.slotId === 'primary')?.isConfigured ?? false,
      slots,
      timestamp: new Date().toISOString(),
    });
  });

  // 7. Model Test Ping
  app.post('/api/models/test', async (req: Request, res: Response) => {
    const { slotId = 'primary' } = req.body;
    try {
      const result = await testSpecificSlot(slotId);
      return res.json(result);
    } catch (err: any) {
      return res.json({
        slotId,
        success: false,
        latencyMs: 0,
        error: err.message,
      });
    }
  });

  // 8. Automated Unit Test Runner Endpoint
  app.get('/api/tests/run', async (_req: Request, res: Response) => {
    try {
      const { runAllUnitTests } = await import('./src/tests/testSuite.ts');
      const testReport = await runAllUnitTests();
      res.json(testReport);
    } catch (err: any) {
      console.error('Test run failed:', err);
      res.status(500).json({ error: 'Failed to run test suite', message: err.message });
    }
  });

  // Frontend Serving (Vite in dev, static files in production)
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 YojanaLens AI Server running on http://0.0.0.0:${PORT}`);
    console.log(`   Mode: ${isProduction ? 'Production' : 'Development'}`);
    console.log(`   Gemini API Key configured: ${Boolean(process.env.GEMINI_API_KEY)}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
