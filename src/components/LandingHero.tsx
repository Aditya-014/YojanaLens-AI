import React from 'react';
import {
  ShieldCheck,
  Search,
  Sparkles,
  Lock,
  FileText,
  ArrowRight,
  CheckCircle,
  HelpCircle,
  ExternalLink,
  Layers,
} from 'lucide-react';

interface LandingHeroProps {
  onStartForm: () => void;
  onBrowseSchemes: () => void;
  language: 'en' | 'hi';
  totalVerifiedSchemes: number;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onStartForm,
  onBrowseSchemes,
  language,
  totalVerifiedSchemes,
}) => {
  const isHi = language === 'hi';

  return (
    <div className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background Indian Public Service subtle motif */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_35%_at_50%_0%,rgba(16,185,129,0.08)_0%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-6 shadow-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>
            {isHi
              ? 'सत्यापित सरकारी योजनाओं के नियमों पर आधारित स्वतंत्र खोज उपकरण'
              : 'Grounded in Official Ministry Guidelines • Zero Hallucination Engine'}
          </span>
        </div>

        {/* Hero Headline */}
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
            {isHi ? (
              <>
                अपनी पात्रता के अनुसार{' '}
                <span className="text-emerald-700 underline decoration-emerald-300 decoration-wavy decoration-2">
                  सरकारी योजनाएं
                </span>{' '}
                खोजें
              </>
            ) : (
              <>
                Find Government Schemes That{' '}
                <span className="text-emerald-700 underline decoration-emerald-300 decoration-wavy decoration-2">
                  Fit Your Life
                </span>
              </>
            )}
          </h1>

          <p className="mt-5 text-lg sm:text-xl text-stone-600 leading-relaxed font-normal">
            {isHi
              ? 'बिना किसी बिचौलिए या गलत सूचना के जानिए कि आप और आपका परिवार किन केंद्रीय कल्याणकारी योजनाओं के पात्र हैं। स्पष्ट नियम, आधिकारिक साक्ष्य और सुरक्षित मार्गदर्शन।'
              : 'Discover Indian government schemes you may qualify for based on your personal profile. Transparent criteria evidence, missing information diagnostics, and direct links to official ministry portals.'}
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={onStartForm}
              className="px-6 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-base shadow-md hover:shadow-lg transition-all flex items-center gap-2 group cursor-pointer"
            >
              <span>{isHi ? 'पात्रता जांच शुरू करें' : 'Start Eligibility Check'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onBrowseSchemes}
              className="px-6 py-3.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-800 font-semibold text-base shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Layers className="w-4 h-4 text-emerald-700" />
              <span>
                {isHi
                  ? `सभी ${totalVerifiedSchemes} योजनाएं देखें`
                  : `Browse All ${totalVerifiedSchemes} Schemes`}
              </span>
            </button>
          </div>

          {/* Privacy Guarantee Strip */}
          <div className="mt-6 flex items-center gap-2 text-xs text-stone-500 font-medium">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>
              {isHi
                ? 'गोपनीयता वादा: हम कभी आधार संख्या, बैंक खाता या पासवर्ड नहीं मांगते।'
                : 'Privacy Promise: Zero collection of Aadhaar, bank accounts, or sensitive IDs.'}
            </span>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Deterministic Engine */}
          <div className="p-6 rounded-2xl bg-white border border-stone-200/90 shadow-xs hover:border-emerald-300 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-emerald-100/80 flex items-center justify-center text-emerald-800 mb-4">
              <CheckCircle className="w-6 h-6 text-emerald-700" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              {isHi ? '१००% नियम-आधारित इंजन' : 'Deterministic Rule Engine'}
            </h3>
            <p className="mt-2 text-sm text-stone-600 leading-relaxed">
              {isHi
                ? 'पात्रता का निर्धारण एलएलएम के अनुमान से नहीं, बल्कि आधिकारिक राजपत्र अधिसूचनाओं व नियमों के अनुसार होता है।'
                : 'Eligibility is calculated strictly through explicit, testable statutory rules—never ungrounded LLM guesswork.'}
            </p>
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center text-xs font-semibold text-emerald-700">
              <span>{isHi ? 'पारदर्शी साक्ष्य मैट्रिक्स' : 'Transparent Evidence Matrix'}</span>
            </div>
          </div>

          {/* Card 2: Grounded Bilingual AI */}
          <div className="p-6 rounded-2xl bg-white border border-stone-200/90 shadow-xs hover:border-emerald-300 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-teal-100/80 flex items-center justify-center text-teal-800 mb-4">
              <Sparkles className="w-6 h-6 text-teal-700" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              {isHi ? 'सत्यापित साक्ष्य से जुड़ा एआई' : 'Strictly Grounded AI'}
            </h3>
            <p className="mt-2 text-sm text-stone-600 leading-relaxed">
              {isHi
                ? 'सरल भाषा में पात्रता का कारण, आवश्यक कागजात और आवेदन प्रक्रिया समझें। यदि साक्ष्य में जानकारी नहीं है तो एआई स्पष्ट मना करता है।'
                : 'Explains outcomes in friendly English or Hindi. Strict anti-hallucination guardrails guarantee grounded answers.'}
            </p>
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center text-xs font-semibold text-teal-700">
              <span>{isHi ? 'द्विभाषी प्रश्नोत्तर व चेकलिस्ट' : 'Bilingual Q&A & Checklists'}</span>
            </div>
          </div>

          {/* Card 3: Model Failover Architecture */}
          <div className="p-6 rounded-2xl bg-white border border-stone-200/90 shadow-xs hover:border-emerald-300 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800 mb-4">
              <FileText className="w-6 h-6 text-slate-700" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              {isHi ? 'विश्वसनीय ३-स्तरीय फॉलबैक' : '3-Slot Failover Architecture'}
            </h3>
            <p className="mt-2 text-sm text-stone-600 leading-relaxed">
              {isHi
                ? 'प्राथमिक जेमिनी/गेम्मा मॉडल से लेकर ओपन-वेट मॉडल और नियम इंजन तक निर्बाध फॉलबैक ताकि सेवा कभी बाधित न हो।'
                : 'Primary model cascades gracefully to open-weight models and the offline statutory rule generator for 100% reliability.'}
            </p>
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center text-xs font-semibold text-slate-700">
              <span>{isHi ? 'पूर्ण पारदर्शिता व विलंबता ट्रैकिंग' : 'Model Transparency & Latency'}</span>
            </div>
          </div>
        </div>

        {/* Verified Schemes Quick Badge Row */}
        <div className="mt-14 p-5 rounded-2xl bg-stone-100/80 border border-stone-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-600"></div>
            <span className="text-xs sm:text-sm font-semibold text-stone-800">
              {isHi
                ? 'वर्तमान सत्यापित केंद्रीय योजनाएं (सितंबर २०२६ में अद्यतन):'
                : 'Current Verified Central Schemes (Updated Sept 2026):'}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {['PM-KISAN', 'PM SVANidhi', 'AB PM-JAY', 'PMMVY', 'PM Vishwakarma', 'Sukanya Samriddhi', 'PMAY-U', 'IGNOAPS Pension', 'Mudra'].map((name) => (
              <span
                key={name}
                className="px-2.5 py-1 rounded-md bg-white border border-stone-200 text-stone-700 text-xs font-medium"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
