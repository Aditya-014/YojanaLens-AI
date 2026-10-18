import React, { useState, useEffect } from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  XCircle,
  ExternalLink,
  Sparkles,
  Calendar,
  Building2,
  Send,
  HelpCircle,
  Info,
  Cpu,
} from 'lucide-react';
import { SchemeEvaluation, AIExplanationResponse } from '../types/scheme.ts';
import { getLocale, SupportedLanguage, getLocalizedText } from '../locales/index.ts';

interface SchemeDetailModalProps {
  evaluation: SchemeEvaluation;
  onClose: () => void;
  language: SupportedLanguage;
}

export const SchemeDetailModal: React.FC<SchemeDetailModalProps> = ({
  evaluation,
  onClose,
  language,
}) => {
  const t = getLocale(language);
  const scheme = evaluation.scheme;

  const [activeTab, setActiveTab] = useState<'criteria' | 'ai' | 'documents' | 'steps' | 'faqs'>('criteria');

  // AI Explanation State
  const [aiExplanation, setAiExplanation] = useState<AIExplanationResponse | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  // Q&A State
  const [userQuestion, setUserQuestion] = useState('');
  const [qnaHistory, setQnaHistory] = useState<Array<{ q: string; a: string; meta?: any }>>([]);
  const [askingQnA, setAskingQnA] = useState(false);

  // Document checklist state (local in-memory toggle)
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});

  // Fetch AI explanation on mount or tab click
  const fetchAiExplanation = async () => {
    setLoadingAi(true);
    setAiError(null);

    try {
      const res = await fetch('/api/ai/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          schemeId: scheme.id,
          language,
          evaluation,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned HTTP ${res.status}`);
      }

      const data: AIExplanationResponse = await res.json();
      setAiExplanation(data);
    } catch (err: any) {
      console.error('Failed to load AI explanation:', err);
      setAiError(err.message || 'Failed to generate explanation.');
    } finally {
      setLoadingAi(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'ai' && !aiExplanation && !loadingAi) {
      fetchAiExplanation();
    }
  }, [activeTab, language]);

  const handleAskQuestion = async (e?: React.FormEvent, customQ?: string) => {
    if (e) e.preventDefault();
    const query = customQ || userQuestion;
    if (!query.trim() || askingQnA) return;

    setAskingQnA(true);
    const qText = query.trim();
    setUserQuestion('');

    try {
      const res = await fetch('/api/ai/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          schemeId: scheme.id,
          question: qText,
          language,
        }),
      });

      if (!res.ok) throw new Error(`Server returned HTTP ${res.status}`);
      const data = await res.json();
      setQnaHistory((prev) => [
        ...prev,
        {
          q: qText,
          a: data.answer || t.modal.qnaError,
          meta: data.modelMeta,
        },
      ]);
    } catch (err: any) {
      setQnaHistory((prev) => [
        ...prev,
        {
          q: qText,
          a: t.modal.qnaError,
        },
      ]);
    } finally {
      setAskingQnA(false);
    }
  };

  const toggleDoc = (docName: string) => {
    setCheckedDocs((prev) => ({
      ...prev,
      [docName]: !prev[docName],
    }));
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col border border-stone-200 overflow-hidden">
        {/* Modal Header */}
        <div className="p-6 border-b border-stone-200 bg-stone-50/70 flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase bg-stone-200 text-stone-800">
                {scheme.category}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                {scheme.shortName}
              </span>
              <span className="text-xs text-stone-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>
                  {t.modal.verifiedOn} {scheme.lastVerifiedDate}
                </span>
              </span>
              {scheme.isVerified && (
                <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>{t.modal.ministryVerified}</span>
                </span>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              {getLocalizedText(scheme.name, language)}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              {getLocalizedText(scheme.administeringAuthority, language)} •{' '}
              {getLocalizedText(scheme.ministry, language)}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-800 hover:bg-stone-200 transition-colors cursor-pointer"
            title={t.modal.closeBtn}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Status & Action Bar */}
        <div className="px-6 py-3 bg-white border-b border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-stone-500 font-semibold">{t.modal.statusLabel}</span>
            {evaluation.status === 'MATCH' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-bold bg-emerald-100 text-emerald-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t.status.match}</span>
              </span>
            )}
            {evaluation.status === 'NEEDS_INFORMATION' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-bold bg-amber-100 text-amber-800">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                <span>{t.status.needsInfo}</span>
              </span>
            )}
            {evaluation.status === 'DOES_NOT_MATCH' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-bold bg-slate-100 text-slate-700">
                <XCircle className="w-3.5 h-3.5 text-slate-500" />
                <span>{t.status.doesNotMatch}</span>
              </span>
            )}
            <span className="text-stone-400">
              ({evaluation.passedCount}/{evaluation.totalCriteria} {t.modal.criteriaPassed})
            </span>
          </div>

          <div className="flex items-center gap-2">
            {scheme.officialPortalUrl && (
              <a
                href={scheme.officialPortalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg border border-stone-300 hover:bg-stone-50 text-stone-700 font-semibold flex items-center gap-1.5 transition-colors"
              >
                <span>{t.modal.officialPortal}</span>
                <ExternalLink className="w-3 h-3 text-stone-400" />
              </a>
            )}

            {scheme.officialApplicationUrl && (
              <a
                href={scheme.officialApplicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <span>{t.modal.applyOnline}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 border-b border-stone-200 bg-stone-50/50 flex space-x-2 rtl:space-x-reverse overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setActiveTab('criteria')}
            className={`py-3 px-3.5 border-b-2 cursor-pointer transition-colors whitespace-nowrap ${
              activeTab === 'criteria'
                ? 'border-emerald-600 text-emerald-800 font-bold bg-white rounded-t-lg'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            📋 {t.modal.tabs.criteria}
          </button>

          <button
            onClick={() => setActiveTab('ai')}
            className={`py-3 px-3.5 border-b-2 cursor-pointer transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'ai'
                ? 'border-emerald-600 text-emerald-800 font-bold bg-white rounded-t-lg'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t.modal.tabs.ai}</span>
          </button>

          <button
            onClick={() => setActiveTab('documents')}
            className={`py-3 px-3.5 border-b-2 cursor-pointer transition-colors whitespace-nowrap ${
              activeTab === 'documents'
                ? 'border-emerald-600 text-emerald-800 font-bold bg-white rounded-t-lg'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            📑 {t.modal.tabs.documents} ({scheme.requiredDocuments.length})
          </button>

          <button
            onClick={() => setActiveTab('steps')}
            className={`py-3 px-3.5 border-b-2 cursor-pointer transition-colors whitespace-nowrap ${
              activeTab === 'steps'
                ? 'border-emerald-600 text-emerald-800 font-bold bg-white rounded-t-lg'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            🛣️ {t.modal.tabs.steps} ({scheme.applicationSteps.length})
          </button>

          <button
            onClick={() => setActiveTab('faqs')}
            className={`py-3 px-3.5 border-b-2 cursor-pointer transition-colors whitespace-nowrap ${
              activeTab === 'faqs'
                ? 'border-emerald-600 text-emerald-800 font-bold bg-white rounded-t-lg'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            ❓ {t.modal.tabs.faqs} ({scheme.faqs.length})
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: CRITERIA & EVIDENCE BREAKDOWN */}
          {activeTab === 'criteria' && (
            <div className="space-y-6">
              {/* Overview & Benefit Banner */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                  {t.modal.overviewTitle}
                </h4>
                <p className="mt-1 text-sm text-stone-700 leading-relaxed">
                  {getLocalizedText(scheme.overview, language)}
                </p>
                <div className="mt-3 pt-3 border-t border-stone-200/60 flex items-center justify-between text-xs font-semibold text-emerald-800">
                  <span>
                    {t.modal.statutoryBenefit} {getLocalizedText(scheme.benefitsSummary, language)}
                  </span>
                </div>
              </div>

              {/* Statutory Criteria Evaluation Table */}
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center justify-between">
                  <span>{t.modal.tableTitle}</span>
                  <span className="text-xs font-normal text-stone-500">
                    {t.modal.tableSubtitle}
                  </span>
                </h3>

                <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left rtl:text-right text-xs">
                      <thead className="bg-stone-100 text-stone-700 uppercase font-bold tracking-wider border-b border-stone-200">
                        <tr>
                          <th className="py-3 px-4">{t.modal.tableColCriterion}</th>
                          <th className="py-3 px-4">{t.modal.tableColUserValue}</th>
                          <th className="py-3 px-4">{t.modal.tableColCondition}</th>
                          <th className="py-3 px-4">{t.modal.tableColStatus}</th>
                          <th className="py-3 px-4">{t.modal.tableColEvidence}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100">
                        {evaluation.criteriaResults.map((c) => (
                          <tr key={c.id} className="hover:bg-stone-50/70">
                            {/* Criterion Name */}
                            <td className="py-3 px-4 font-semibold text-stone-900">
                              {getLocalizedText(c.criterionName, language)}
                            </td>

                            {/* User Value */}
                            <td className="py-3 px-4 text-stone-700">
                              <span
                                className={`px-2 py-0.5 rounded font-medium ${
                                  c.isMissingInfo
                                    ? 'bg-amber-100 text-amber-900 font-bold'
                                    : 'bg-stone-100 text-stone-800'
                                }`}
                              >
                                {getLocalizedText(c.userValueDisplay, language)}
                              </span>
                            </td>

                            {/* Required Condition */}
                            <td className="py-3 px-4 text-stone-600">
                              {getLocalizedText(c.requiredConditionDisplay, language)}
                            </td>

                            {/* Status */}
                            <td className="py-3 px-4">
                              {c.status === 'PASS' && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                  <span>{t.status.passed}</span>
                                </span>
                              )}
                              {c.status === 'UNKNOWN' && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 font-bold">
                                  <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                                  <span>{t.status.unknown}</span>
                                </span>
                              )}
                              {c.status === 'FAIL' && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 font-bold">
                                  <XCircle className="w-3.5 h-3.5 text-rose-600" />
                                  <span>{t.status.failed}</span>
                                </span>
                              )}
                            </td>

                            {/* Evidence Citation */}
                            <td className="py-3 px-4 text-stone-500 text-[11px] max-w-xs">
                              {c.evidenceCitation}
                              {c.sourceUrl && (
                                <a
                                  href={c.sourceUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="ml-1 inline-block text-emerald-700 hover:underline"
                                >
                                  [Portal]
                                </a>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Geographic Availability Note */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                <span className="font-bold text-slate-900">
                  {t.modal.scopeTitle}{' '}
                </span>
                <span>
                  {getLocalizedText(scheme.geographicAvailability.description, language)}
                </span>
              </div>
            </div>
          )}

          {/* TAB 2: AI GUIDANCE & STRICTLY GROUNDED Q&A */}
          {activeTab === 'ai' && (
            <div className="space-y-6">
              {/* Model Transparency Header */}
              {aiExplanation && (
                <div className="p-4 rounded-2xl bg-stone-900 text-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-emerald-400" />
                    <span className="font-bold text-white">
                      {t.modal.activeModelLabel}
                    </span>
                    <span className="font-mono text-emerald-300">
                      {aiExplanation.modelMeta.modelId} ({aiExplanation.modelMeta.provider})
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-stone-400 font-mono text-[11px]">
                    <span>
                      {t.modal.latencyLabel} {aiExplanation.modelMeta.latencyMs}ms
                    </span>
                    <span>•</span>
                    <span>
                      {aiExplanation.modelMeta.usedFallback
                        ? '⚠️ ' + t.status.optional
                        : '✅ ' + t.status.active}
                    </span>
                  </div>
                </div>
              )}

              {/* AI Explanation Box */}
              <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200">
                <div className="flex items-center gap-2 mb-2 text-emerald-900 font-bold text-sm">
                  <Sparkles className="w-4 h-4 text-emerald-700" />
                  <span>{t.modal.aiTitle}</span>
                </div>

                {loadingAi ? (
                  <div className="py-8 flex flex-col items-center justify-center text-center">
                    <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin mb-3"></div>
                    <span className="text-xs font-semibold text-emerald-800">
                      {t.modal.thinkingBtn}
                    </span>
                  </div>
                ) : aiError ? (
                  <div className="text-xs text-rose-700 p-3 rounded-lg bg-rose-50 border border-rose-200">
                    {aiError}
                  </div>
                ) : (
                  <div className="text-xs sm:text-sm text-stone-800 leading-relaxed whitespace-pre-line">
                    {aiExplanation?.eligibilityExplanation}
                  </div>
                )}

                <div className="mt-4 pt-3 border-t border-emerald-200/60 text-[11px] text-stone-500">
                  <span className="font-semibold text-emerald-900">
                    {t.modal.statutoryRef}
                  </span>{' '}
                  {scheme.sourceCitation}
                </div>
              </div>

              {/* Interactive Grounded Q&A Assistant */}
              <div className="p-5 rounded-2xl bg-white border border-stone-200">
                <h4 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-emerald-700" />
                  <span>{t.modal.qnaTitle}</span>
                </h4>
                <p className="text-xs text-stone-500 mb-4">
                  {t.modal.qnaSubtitle}
                </p>

                {/* Preset Fast Questions */}
                <div className="mb-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleAskQuestion(undefined, t.modal.presetQDocs)}
                    className="px-2.5 py-1 rounded-lg text-xs bg-stone-100 hover:bg-emerald-50 hover:text-emerald-800 text-stone-700 border border-stone-200 transition-colors cursor-pointer"
                  >
                    📌 {t.modal.presetQDocs}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleAskQuestion(undefined, t.modal.presetQSteps)}
                    className="px-2.5 py-1 rounded-lg text-xs bg-stone-100 hover:bg-emerald-50 hover:text-emerald-800 text-stone-700 border border-stone-200 transition-colors cursor-pointer"
                  >
                    🧭 {t.modal.presetQSteps}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleAskQuestion(undefined, t.modal.presetQBenefit)}
                    className="px-2.5 py-1 rounded-lg text-xs bg-stone-100 hover:bg-emerald-50 hover:text-emerald-800 text-stone-700 border border-stone-200 transition-colors cursor-pointer"
                  >
                    💰 {t.modal.presetQBenefit}
                  </button>
                </div>

                {/* Q&A Chat Log */}
                {qnaHistory.length > 0 && (
                  <div className="mb-4 space-y-3 max-h-64 overflow-y-auto p-3 rounded-xl bg-stone-50 border border-stone-200">
                    {qnaHistory.map((item, idx) => (
                      <div key={idx} className="space-y-1 text-xs">
                        <div className="font-bold text-emerald-900 bg-emerald-100/60 p-2 rounded-lg">
                          Q: {item.q}
                        </div>
                        <div className="text-stone-800 p-2.5 bg-white rounded-lg border border-stone-200/80 leading-relaxed whitespace-pre-line">
                          {item.a}
                          {item.meta && (
                            <div className="mt-1.5 pt-1.5 border-t border-stone-100 text-[10px] text-stone-400 font-mono">
                              Model: {item.meta.modelId} ({item.meta.provider}) • {item.meta.latencyMs}ms
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Input Bar */}
                <form onSubmit={handleAskQuestion} className="flex gap-2">
                  <input
                    type="text"
                    value={userQuestion}
                    onChange={(e) => setUserQuestion(e.target.value)}
                    placeholder={t.modal.qnaInputPlaceholder}
                    disabled={askingQnA}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent disabled:bg-stone-100"
                  />
                  <button
                    type="submit"
                    disabled={!userQuestion.trim() || askingQnA}
                    className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    {askingQnA ? (
                      <span>{t.modal.thinkingBtn}</span>
                    ) : (
                      <>
                        <span>{t.modal.askBtn}</span>
                        <Send className="w-3.5 h-3.5 rtl:rotate-180" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 3: OFFICIAL DOCUMENT READINESS CHECKLIST */}
          {activeTab === 'documents' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {t.modal.checklistTitle}
                </h3>
                <p className="text-xs text-stone-500">
                  {t.modal.checklistSubtitle}
                </p>
              </div>

              <div className="space-y-3">
                {scheme.requiredDocuments.map((doc, idx) => {
                  const docKey = `${scheme.id}_doc_${idx}`;
                  const isChecked = !!checkedDocs[docKey];

                  return (
                    <div
                      key={idx}
                      onClick={() => toggleDoc(docKey)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 ${
                        isChecked
                          ? 'bg-emerald-50/70 border-emerald-400'
                          : 'bg-white border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleDoc(docKey)}
                        className="mt-1 h-4 w-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                      />

                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-sm font-bold ${
                              isChecked ? 'text-emerald-950 line-through' : 'text-slate-900'
                            }`}
                          >
                            {getLocalizedText(doc.name, language)}
                          </span>
                          <span
                            className={`px-2 py-0.2 rounded-full text-[10px] font-bold uppercase ${
                              doc.mandatory
                                ? 'bg-rose-100 text-rose-800'
                                : 'bg-stone-100 text-stone-600'
                            }`}
                          >
                            {doc.mandatory ? t.status.mandatory : t.status.optional}
                          </span>
                        </div>
                        <p className="text-xs text-stone-600 mt-1">
                          {getLocalizedText(doc.purpose, language)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>
                  {t.modal.checklistNotice}
                </span>
              </div>
            </div>
          )}

          {/* TAB 4: STEP-BY-STEP APPLICATION ROADMAP */}
          {activeTab === 'steps' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {t.modal.stepsTitle}
                </h3>
                <p className="text-xs text-stone-500">
                  {t.modal.stepsSubtitle}
                </p>
              </div>

              <div className="space-y-4">
                {scheme.applicationSteps.map((step) => (
                  <div
                    key={step.stepNumber}
                    className="p-4 rounded-2xl bg-white border border-stone-200 flex items-start gap-4"
                  >
                    <div className="w-8 h-8 rounded-full bg-emerald-700 text-white font-extrabold flex items-center justify-center shrink-0 text-sm">
                      {step.stepNumber}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-sm font-bold text-slate-900">
                          {getLocalizedText(step.title, language)}
                        </h4>
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase bg-stone-100 text-stone-600">
                          Channel: {step.channel}
                        </span>
                      </div>

                      <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                        {getLocalizedText(step.description, language)}
                      </p>

                      {step.portalUrl && (
                        <a
                          href={step.portalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
                        >
                          <span>{t.modal.openPortalStep}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Direct Apply CTA */}
              {scheme.officialApplicationUrl && (
                <div className="pt-4 text-center">
                  <a
                    href={scheme.officialApplicationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md cursor-pointer"
                  >
                    <span>{t.modal.proceedPortalBtn}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: OFFICIAL FAQS & STATUTORY NOTES */}
          {activeTab === 'faqs' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {t.modal.faqsTitle}
                </h3>
                <p className="text-xs text-stone-500">
                  {t.modal.faqsSubtitle}
                </p>
              </div>

              <div className="space-y-3">
                {scheme.faqs.map((faq, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white border border-stone-200">
                    <h4 className="text-sm font-bold text-emerald-950 mb-1">
                      Q: {getLocalizedText(faq.question, language)}
                    </h4>
                    <p className="text-xs text-stone-700 leading-relaxed">
                      {getLocalizedText(faq.answer, language)}
                    </p>
                    {faq.officialSourceNote && (
                      <div className="mt-2 pt-2 border-t border-stone-100 text-[10px] text-stone-400">
                        Source: {faq.officialSourceNote}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <div className="text-[11px] text-stone-500">
            {t.modal.finalDiscretionNotice}
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs transition-colors cursor-pointer"
          >
            {t.modal.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
