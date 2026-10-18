import React, { useState, useEffect } from 'react';
import {
  X,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertCircle,
  HelpCircle,
  Sparkles,
  FileText,
  ListOrdered,
  Cpu,
  Send,
  Building2,
  Calendar,
  Layers,
  ArrowRight,
  BookOpen,
  Info,
} from 'lucide-react';
import { SchemeEvaluation, AIExplanationResponse, AIQnAResponse } from '../types/scheme.ts';

interface SchemeDetailModalProps {
  evaluation: SchemeEvaluation;
  onClose: () => void;
  language: 'en' | 'hi';
}

export const SchemeDetailModal: React.FC<SchemeDetailModalProps> = ({
  evaluation,
  onClose,
  language,
}) => {
  const isHi = language === 'hi';
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
    if (aiExplanation) return;
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
      setAiError(err.message || 'Failed to generate AI explanation.');
    } finally {
      setLoadingAi(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'ai') {
      fetchAiExplanation();
    }
  }, [activeTab, language]);

  const handleAskQuestion = async (e?: React.FormEvent, presetQuestion?: string) => {
    if (e) e.preventDefault();
    const query = (presetQuestion || userQuestion).trim();
    if (!query) return;

    setAskingQnA(true);
    setUserQuestion('');

    try {
      const res = await fetch('/api/ai/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          schemeId: scheme.id,
          question: query,
          language,
          evaluation,
        }),
      });

      const data: AIQnAResponse = await res.json();
      setQnaHistory((prev) => [
        ...prev,
        {
          q: query,
          a: data.answer,
          meta: data.modelMeta,
        },
      ]);
    } catch (err: any) {
      setQnaHistory((prev) => [
        ...prev,
        {
          q: query,
          a: isHi
            ? 'क्षमा करें, उत्तर प्राप्त करने में समस्या हुई। कृपया पुनः प्रयास करें।'
            : 'Apologies, failed to receive an answer. Please retry.',
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Top Header */}
        <div className="p-6 bg-stone-50 border-b border-stone-200 flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                {scheme.shortName}
              </span>
              <span className="text-xs text-stone-500 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>
                  {isHi ? 'अंतिम सत्यापन:' : 'Verified on:'} {scheme.lastVerifiedDate}
                </span>
              </span>
              {scheme.isVerified && (
                <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>{isHi ? 'मंत्रालय से सत्यापित' : 'Ministry Verified'}</span>
                </span>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              {isHi ? scheme.name.hi : scheme.name.en}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              {isHi ? scheme.administeringAuthority.hi : scheme.administeringAuthority.en} •{' '}
              {isHi ? scheme.ministry.hi : scheme.ministry.en}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-800 hover:bg-stone-200 transition-colors cursor-pointer"
            title="Close / बंद करें"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Official Links & Status Banner */}
        <div className="px-6 py-3 bg-emerald-900 text-emerald-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-emerald-200">{isHi ? 'पात्रता स्थिति:' : 'Status:'}</span>
            <span className="px-2.5 py-0.5 rounded-full font-bold bg-white text-emerald-950">
              {evaluation.status}
            </span>
            <span className="text-emerald-300">
              ({evaluation.passedCount}/{evaluation.totalCriteria} {isHi ? 'शर्तें पूरी' : 'criteria passed'})
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={scheme.officialPortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white font-semibold transition-colors"
            >
              <span>{isHi ? 'आधिकारिक पोर्टल' : 'Official Portal'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {scheme.officialApplicationUrl && (
              <a
                href={scheme.officialApplicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-colors"
              >
                <span>{isHi ? 'सीधे आवेदन करें' : 'Apply Online'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-stone-200 px-6 bg-stone-50/50 overflow-x-auto">
          <button
            onClick={() => setActiveTab('criteria')}
            className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'criteria'
                ? 'border-emerald-700 text-emerald-800'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            📋 {isHi ? 'पात्रता नियम व साक्ष्य' : 'Criteria & Evidence'}
          </button>

          <button
            onClick={() => setActiveTab('ai')}
            className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'ai'
                ? 'border-emerald-700 text-emerald-800'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>{isHi ? 'एआई मार्गदर्शन व प्रश्नोत्तर' : 'AI Explanation & Q&A'}</span>
          </button>

          <button
            onClick={() => setActiveTab('documents')}
            className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'documents'
                ? 'border-emerald-700 text-emerald-800'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            📑 {isHi ? 'आवश्यक दस्तावेज चेकलिस्ट' : 'Document Checklist'}
          </button>

          <button
            onClick={() => setActiveTab('steps')}
            className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'steps'
                ? 'border-emerald-700 text-emerald-800'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            🧭 {isHi ? 'आवेदन कैसे करें (कदम)' : 'Application Steps'}
          </button>

          <button
            onClick={() => setActiveTab('faqs')}
            className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'faqs'
                ? 'border-emerald-700 text-emerald-800'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            ❓ {isHi ? 'सरकारी प्रश्नोत्तरी' : 'Official FAQs'}
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
                  {isHi ? 'योजना का उद्देश्य व लाभ:' : 'Scheme Overview & Entitlement:'}
                </h4>
                <p className="mt-1 text-sm text-stone-700 leading-relaxed">
                  {isHi ? scheme.overview.hi : scheme.overview.en}
                </p>
                <div className="mt-3 pt-3 border-t border-stone-200/60 flex items-center justify-between text-xs font-semibold text-emerald-800">
                  <span>{isHi ? 'प्रदत्त लाभ:' : 'Statutory Benefit:'} {isHi ? scheme.benefitsSummary.hi : scheme.benefitsSummary.en}</span>
                </div>
              </div>

              {/* Statutory Criteria Evaluation Table */}
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center justify-between">
                  <span>{isHi ? 'सत्यापित पात्रता नियम मैट्रिक्स' : 'Verified Statutory Criteria Matrix'}</span>
                  <span className="text-xs font-normal text-stone-500">
                    {isHi ? 'प्रत्येक शर्त का पारदर्शी मूल्यांकन' : 'Transparent Criterion Breakdown'}
                  </span>
                </h3>

                <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-stone-100 text-stone-700 uppercase font-bold tracking-wider border-b border-stone-200">
                        <tr>
                          <th className="py-3 px-4">{isHi ? 'पात्रता नियम' : 'Criterion'}</th>
                          <th className="py-3 px-4">{isHi ? 'आपकी प्रोफ़ाइल मान' : 'Your Profile Value'}</th>
                          <th className="py-3 px-4">{isHi ? 'आवश्यक सरकारी शर्त' : 'Required Condition'}</th>
                          <th className="py-3 px-4">{isHi ? 'परिणाम' : 'Status'}</th>
                          <th className="py-3 px-4">{isHi ? 'कानूनी साक्ष्य / स्रोत' : 'Source Evidence'}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100">
                        {evaluation.criteriaResults.map((c) => (
                          <tr key={c.id} className="hover:bg-stone-50/70">
                            {/* Criterion Name */}
                            <td className="py-3 px-4 font-semibold text-stone-900">
                              {isHi ? c.criterionName.hi : c.criterionName.en}
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
                                {isHi ? c.userValueDisplay.hi : c.userValueDisplay.en}
                              </span>
                            </td>

                            {/* Required Condition */}
                            <td className="py-3 px-4 text-stone-600">
                              {isHi ? c.requiredConditionDisplay.hi : c.requiredConditionDisplay.en}
                            </td>

                            {/* Status */}
                            <td className="py-3 px-4">
                              {c.status === 'PASS' && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                  <span>{isHi ? 'सफल (PASS)' : 'PASS'}</span>
                                </span>
                              )}
                              {c.status === 'FAIL' && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 font-bold">
                                  <XCircle className="w-3.5 h-3.5 text-rose-600" />
                                  <span>{isHi ? 'विफल (FAIL)' : 'FAIL'}</span>
                                </span>
                              )}
                              {c.status === 'UNKNOWN' && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 font-bold">
                                  <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                                  <span>{isHi ? 'विवरण शेष' : 'MISSING'}</span>
                                </span>
                              )}
                            </td>

                            {/* Evidence Citation */}
                            <td className="py-3 px-4 text-stone-500 text-[11px]">
                              <span>{c.evidenceCitation}</span>
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
                  {isHi ? 'भौगोलिक विस्तार:' : 'Geographic Scope:'}{' '}
                </span>
                <span>
                  {isHi
                    ? scheme.geographicAvailability.description.hi
                    : scheme.geographicAvailability.description.en}
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
                      {isHi ? 'सक्रिय एआई मॉडल:' : 'Active Model:'}
                    </span>
                    <span className="font-mono text-emerald-300">
                      {aiExplanation.modelMeta.modelId} ({aiExplanation.modelMeta.slot})
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-stone-400">
                    <span>
                      {isHi ? 'विलंबता:' : 'Latency:'} {aiExplanation.modelMeta.latencyMs}ms
                    </span>
                    <span>•</span>
                    <span>
                      {aiExplanation.modelMeta.usedFallback
                        ? isHi
                          ? '⚠️ फॉलबैक प्रयुक्त'
                          : '⚠️ Fallback Used'
                        : isHi
                        ? '✅ प्राथमिक मॉडल'
                        : '✅ Primary Slot'}
                    </span>
                  </div>
                </div>
              )}

              {/* AI Explanation Box */}
              <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200">
                <div className="flex items-center gap-2 mb-2 text-emerald-900 font-bold text-sm">
                  <Sparkles className="w-4 h-4 text-emerald-700" />
                  <span>
                    {isHi
                      ? 'योजना लेंस एआई: पात्रता का सरल विश्लेषण'
                      : 'YojanaLens AI: Simple Eligibility Explanation'}
                  </span>
                </div>

                {loadingAi ? (
                  <div className="py-8 flex flex-col items-center justify-center text-center">
                    <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin mb-3"></div>
                    <span className="text-xs font-semibold text-emerald-800">
                      {isHi
                        ? 'सत्यापित साक्ष्य से निष्कर्ष तैयार किया जा रहा है...'
                        : 'Generating grounded explanation from verified statutory evidence...'}
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
                    {isHi ? 'कानूनी संदर्भ:' : 'Statutory Reference:'}
                  </span>{' '}
                  {scheme.sourceCitation}
                </div>
              </div>

              {/* Interactive Grounded Q&A Assistant */}
              <div className="p-5 rounded-2xl bg-white border border-stone-200">
                <h4 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-emerald-700" />
                  <span>
                    {isHi
                      ? 'इस योजना के बारे में सवाल पूछें (साक्ष्य आधारित प्रश्नोत्तर)'
                      : 'Ask a Question about this Scheme (Strictly Grounded)'}
                  </span>
                </h4>
                <p className="text-xs text-stone-500 mb-4">
                  {isHi
                    ? 'हम केवल इस योजना के आधिकारिक राजपत्र व दिशानिर्देशों से उत्तर देते हैं। मनगढ़ंत जानकारी नहीं दी जाती।'
                    : 'Responses are strictly grounded in verified ministry data. The AI will refuse to speculate on out-of-scope topics.'}
                </p>

                {/* Preset Fast Questions */}
                <div className="mb-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      handleAskQuestion(
                        undefined,
                        isHi
                          ? 'आवेदन के लिए कौन-कौन से दस्तावेज अनिवार्य हैं?'
                          : 'What mandatory documents are required to apply?'
                      )
                    }
                    className="px-2.5 py-1 rounded-lg text-xs bg-stone-100 hover:bg-emerald-50 hover:text-emerald-800 text-stone-700 border border-stone-200 transition-colors cursor-pointer"
                  >
                    📌 {isHi ? 'अनिवार्य दस्तावेज क्या हैं?' : 'What documents are required?'}
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleAskQuestion(
                        undefined,
                        isHi
                          ? 'आवेदन की आधिकारिक प्रक्रिया क्या है?'
                          : 'What are the official steps to apply?'
                      )
                    }
                    className="px-2.5 py-1 rounded-lg text-xs bg-stone-100 hover:bg-emerald-50 hover:text-emerald-800 text-stone-700 border border-stone-200 transition-colors cursor-pointer"
                  >
                    🧭 {isHi ? 'आवेदन कैसे करें?' : 'How do I apply?'}
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleAskQuestion(
                        undefined,
                        isHi
                          ? 'इस योजना में कुल कितना लाभ मिलता है?'
                          : 'What is the exact benefit amount provided?'
                      )
                    }
                    className="px-2.5 py-1 rounded-lg text-xs bg-stone-100 hover:bg-emerald-50 hover:text-emerald-800 text-stone-700 border border-stone-200 transition-colors cursor-pointer"
                  >
                    💰 {isHi ? 'कुल कितना लाभ मिलता है?' : 'What is the exact benefit?'}
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
                        <div className="text-stone-800 bg-white p-2.5 rounded-lg border border-stone-200 leading-relaxed whitespace-pre-line">
                          {item.a}
                          {item.meta && (
                            <div className="mt-1.5 pt-1.5 border-t border-stone-100 text-[10px] text-stone-400 flex items-center justify-between">
                              <span>Model: {item.meta.modelId}</span>
                              <span>{item.meta.latencyMs}ms</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Input form */}
                <form onSubmit={handleAskQuestion} className="flex gap-2">
                  <input
                    type="text"
                    value={userQuestion}
                    onChange={(e) => setUserQuestion(e.target.value)}
                    placeholder={
                      isHi
                        ? 'उदा. क्या मुझे बैंक गारंटी देनी होगी? या क्या ई-केवाईसी अनिवार्य है?'
                        : 'e.g. Do I need collateral? Or is e-KYC mandatory?'
                    }
                    className="flex-1 px-3.5 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    disabled={askingQnA || !userQuestion.trim()}
                    className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    {askingQnA ? (
                      <span className="animate-pulse">{isHi ? 'जांच जारी...' : 'Thinking...'}</span>
                    ) : (
                      <>
                        <span>{isHi ? 'पूछें' : 'Ask'}</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 3: REQUIRED DOCUMENTS CHECKLIST */}
          {activeTab === 'documents' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {isHi ? 'आधिकारिक दस्तावेज तत्परता चेकलिस्ट' : 'Official Document Readiness Checklist'}
                  </h3>
                  <p className="text-xs text-stone-500">
                    {isHi
                      ? 'आवेदन से पूर्व सुनिश्चित करें कि आपके पास निम्नलिखित वैध दस्तावेज उपलब्ध हैं।'
                      : 'Check off the documents you have ready before proceeding to the official portal.'}
                  </p>
                </div>

                <div className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                  {Object.values(checkedDocs).filter(Boolean).length} / {scheme.requiredDocuments.length}{' '}
                  {isHi ? 'तैयार हैं' : 'ready'}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {scheme.requiredDocuments.map((doc, idx) => {
                  const docKey = doc.name.en;
                  const isChecked = Boolean(checkedDocs[docKey]);

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
                            {isHi ? doc.name.hi : doc.name.en}
                          </span>
                          <span
                            className={`px-2 py-0.2 rounded-full text-[10px] font-bold uppercase ${
                              doc.mandatory
                                ? 'bg-rose-100 text-rose-800'
                                : 'bg-stone-100 text-stone-600'
                            }`}
                          >
                            {doc.mandatory
                              ? isHi
                                ? 'अनिवार्य'
                                : 'Mandatory'
                              : isHi
                              ? 'वैकल्पिक'
                              : 'Optional'}
                          </span>
                        </div>
                        <p className="text-xs text-stone-600 mt-1">
                          {isHi ? doc.purpose.hi : doc.purpose.en}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>
                  {isHi
                    ? 'महत्वपूर्ण: सभी सरकारी योजनाओं के लिए आधार कार्ड का आपके सक्रिय मोबाइल नंबर एवं बैंक खाते (डीबीटी एनपीसीआई मैपर) से जुड़ा होना अनिवार्य है।'
                    : 'Important Notice: Ensure your Aadhaar card is linked to your active mobile number and seeded with your bank account for Direct Benefit Transfer (DBT).'}
                </span>
              </div>
            </div>
          )}

          {/* TAB 4: STEP-BY-STEP APPLICATION ROADMAP */}
          {activeTab === 'steps' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {isHi ? 'आधिकारिक आवेदन प्रक्रिया' : 'Step-by-Step Application Roadmap'}
                </h3>
                <p className="text-xs text-stone-500">
                  {isHi
                    ? 'संबंधित मंत्रालय द्वारा अधिसूचित वास्तविक आवेदन प्रक्रिया।'
                    : 'Official application workflow as documented by the administering ministry.'}
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
                          {isHi ? step.title.hi : step.title.en}
                        </h4>
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase bg-stone-100 text-stone-600">
                          Channel: {step.channel}
                        </span>
                      </div>

                      <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                        {isHi ? step.description.hi : step.description.en}
                      </p>

                      {step.portalUrl && (
                        <a
                          href={step.portalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
                        >
                          <span>{isHi ? 'पोर्टल पर जाएं' : 'Open Portal Step'}</span>
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
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md"
                  >
                    <span>{isHi ? 'आधिकारिक आवेदन पोर्टल पर जाएं' : 'Proceed to Official Application Portal'}</span>
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
                  {isHi ? 'आधिकारिक प्रश्नोत्तरी व वैधानिक स्पष्टीकरण' : 'Verified FAQs & Operational Clarifications'}
                </h3>
                <p className="text-xs text-stone-500">
                  {isHi
                    ? 'मंत्रालय के दिशानिर्देशों से संकलित वास्तविक स्पष्टीकरण।'
                    : 'Statutory clarifications compiled directly from scheme operational manuals.'}
                </p>
              </div>

              <div className="space-y-3">
                {scheme.faqs.map((faq, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white border border-stone-200">
                    <h4 className="text-sm font-bold text-emerald-950 mb-1">
                      Q: {isHi ? faq.question.hi : faq.question.en}
                    </h4>
                    <p className="text-xs text-stone-700 leading-relaxed">
                      {isHi ? faq.answer.hi : faq.answer.en}
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
            {isHi
              ? 'अंतिम पात्रता निर्णय संबंधित सरकारी विभाग द्वारा किया जाता है।'
              : 'Final eligibility decisions belong strictly to the respective government authority.'}
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs transition-colors cursor-pointer"
          >
            {isHi ? 'बंद करें' : 'Close View'}
          </button>
        </div>
      </div>
    </div>
  );
};
