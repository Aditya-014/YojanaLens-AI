import React, { useState, useEffect } from 'react';
import {
  Cpu,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ExternalLink,
  RefreshCw,
  Play,
  Terminal,
  ShieldCheck,
  Zap,
  Info,
} from 'lucide-react';

interface ModelSlotInfo {
  slotId: 'primary' | 'fallback_a' | 'fallback_b' | 'deterministic_fallback';
  name: string;
  provider: string;
  modelId: string;
  isConfigured: boolean;
  termsUrl: string;
  licenseName: string;
  notes: string;
}

interface ModelDiagnosticsViewProps {
  language: 'en' | 'hi';
}

export const ModelDiagnosticsView: React.FC<ModelDiagnosticsViewProps> = ({ language }) => {
  const isHi = language === 'hi';

  const [slots, setSlots] = useState<ModelSlotInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [testResult, setTestResult] = useState<any>(null);
  const [testingSlot, setTestingSlot] = useState<string | null>(null);

  const fetchStatus = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/models/status');
      const data = await res.json();
      setSlots(data.slots || []);
    } catch (err) {
      console.error('Failed to fetch model status:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const runTestPing = async (slotId: string) => {
    setTestingSlot(slotId);
    setTestResult(null);

    try {
      const res = await fetch('/api/models/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slotId }),
      });
      const data = await res.json();
      setTestResult(data);
    } catch (err: any) {
      setTestResult({
        slotId,
        success: false,
        error: err.message,
      });
    } finally {
      setTestingSlot(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-900 text-white">
              {isHi ? 'सिस्टम आर्किटेक्चर' : 'System Architecture'}
            </span>
            <span className="text-xs text-stone-500">• 3-Slot Failover + Deterministic Rule Fallback</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {isHi ? 'एआई मॉडल स्थिति एवं फॉलबैक व्यवस्था' : 'AI Model Diagnostics & Failover Architecture'}
          </h2>
          <p className="mt-1 text-sm text-stone-600 max-w-2xl">
            {isHi
              ? 'योजना लेंस एआई एक बहुस्तरीय लचीले मॉडल एडेप्टर पर चलता है। यदि कोई प्रदाता अनुपलब्ध होता है, तो सिस्टम कभी क्रैश नहीं होता और स्वचालित रूप से सत्यापित नियमों पर लौट आता है।'
              : 'YojanaLens AI runs on a fault-tolerant multi-tier provider adapter. If external providers experience timeouts or rate limits, the system cascades gracefully to the offline deterministic rule engine.'}
          </p>
        </div>

        <button
          onClick={fetchStatus}
          className="px-4 py-2 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-800 text-xs font-semibold flex items-center gap-2 self-start md:self-auto cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>{isHi ? 'स्थिति ताज़ा करें' : 'Refresh Status'}</span>
        </button>
      </div>

      {/* Model Slots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {slots.map((slot) => {
          const isTesting = testingSlot === slot.slotId;

          return (
            <div
              key={slot.slotId}
              className={`p-6 rounded-3xl bg-white border transition-all ${
                slot.isConfigured
                  ? 'border-emerald-300 ring-1 ring-emerald-400/20 shadow-xs'
                  : 'border-stone-200 opacity-90'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                    Slot: {slot.slotId}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-0.5">{slot.name}</h3>
                </div>

                {slot.isConfigured ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{isHi ? 'सक्रिय' : 'Configured'}</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-stone-100 text-stone-600">
                    <AlertTriangle className="w-3.5 h-3.5 text-stone-400" />
                    <span>{isHi ? 'अनकॉन्फ़िगर' : 'Not Configured'}</span>
                  </span>
                )}
              </div>

              {/* Details table */}
              <div className="space-y-2 text-xs text-stone-600 mb-4 bg-stone-50 p-3.5 rounded-2xl border border-stone-100">
                <div className="flex justify-between">
                  <span className="font-semibold text-stone-500">Provider:</span>
                  <span className="font-medium text-slate-900">{slot.provider}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-stone-500">Model ID:</span>
                  <span className="font-mono text-emerald-800 font-bold">{slot.modelId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-stone-500">License:</span>
                  <span className="font-medium text-slate-800">{slot.licenseName}</span>
                </div>
              </div>

              <p className="text-xs text-stone-500 leading-relaxed mb-4">{slot.notes}</p>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                <a
                  href={slot.termsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-stone-600 hover:text-emerald-800 flex items-center gap-1"
                >
                  <span>Terms & License</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <button
                  onClick={() => runTestPing(slot.slotId)}
                  disabled={isTesting}
                  className="px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
                >
                  <Play className={`w-3 h-3 ${isTesting ? 'animate-spin' : ''}`} />
                  <span>{isTesting ? 'Testing...' : 'Test Slot Ping'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Test Diagnostic Output */}
      {testResult && (
        <div className="mb-8 p-6 rounded-3xl bg-slate-950 text-stone-100 border border-slate-800 shadow-xl font-mono text-xs">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-white">Live Slot Diagnostic Test Result</span>
            </div>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                testResult.success
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                  : 'bg-rose-950 text-rose-400 border border-rose-800'
              }`}
            >
              {testResult.success ? 'PASSED' : 'FAILED'}
            </span>
          </div>

          <div className="space-y-2">
            <div>
              <span className="text-slate-400">Target Slot:</span> {testResult.slotId}
            </div>
            {testResult.modelId && (
              <div>
                <span className="text-slate-400">Active Model:</span> {testResult.modelId}
              </div>
            )}
            <div>
              <span className="text-slate-400">Execution Latency:</span> {testResult.latencyMs}ms
            </div>
            {testResult.response && (
              <div className="p-3 bg-slate-900 rounded-xl text-emerald-300 border border-slate-800 whitespace-pre-wrap">
                Response: "{testResult.response}"
              </div>
            )}
            {testResult.failoverTrace && (
              <div className="pt-2">
                <span className="text-slate-400">Failover Trace:</span>
                <ul className="list-disc list-inside text-stone-400 mt-1 space-y-0.5">
                  {testResult.failoverTrace.map((step: string, i: number) => (
                    <li key={i}>{step}</li>
                  ))}
                </ul>
              </div>
            )}
            {testResult.message && (
              <div className="text-amber-300">Message: {testResult.message}</div>
            )}
            {testResult.error && (
              <div className="text-rose-400">Error: {testResult.error}</div>
            )}
          </div>
        </div>
      )}

      {/* Integration & Setup Instructions Guide */}
      <div className="p-6 rounded-3xl bg-white border border-stone-200">
        <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
          <Info className="w-4 h-4 text-emerald-700" />
          <span>{isHi ? 'पर्यावरण चर एवं प्रदाता विन्यास निर्देश' : 'Environment Variables & Provider Setup Guide'}</span>
        </h3>
        <p className="text-xs text-stone-600 mb-4 leading-relaxed">
          {isHi
            ? 'एआई स्टूडियो बिल्ड मोड में प्राथमिक जेमिनी एपीआई स्वचालित रूप से GEMINI_API_KEY से जुड़ा होता है। यदि आप अतिरिक्त ओपन-वेट मॉडल जोड़ना चाहते हैं, तो नीचे दिए गए सर्वर पर्यावरण चर कॉन्फ़िगर करें।'
            : 'In AI Studio Build mode, the Primary Gemini slot is pre-configured via the server-side GEMINI_API_KEY secret. To connect secondary open-weight providers, set the following environment variables:'}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
            <div className="font-bold text-slate-900 mb-1">Primary Slot (Active)</div>
            <div className="text-emerald-800">GEMINI_API_KEY="AI Studio User Secret"</div>
            <div className="text-stone-500 mt-1">Model: gemini-3.8-flash via @google/genai</div>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
            <div className="font-bold text-slate-900 mb-1">Fallback Slot A (Open-Weight)</div>
            <div className="text-stone-700">FALLBACK_A_API_KEY="your-token"</div>
            <div className="text-stone-700">FALLBACK_A_ENDPOINT="https://..."</div>
            <div className="text-stone-500 mt-1">Default Model: google/gemma-2-9b-it</div>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
            <div className="font-bold text-slate-900 mb-1">Fallback Slot B (Open-Weight)</div>
            <div className="text-stone-700">FALLBACK_B_API_KEY="your-token"</div>
            <div className="text-stone-700">FALLBACK_B_ENDPOINT="https://..."</div>
            <div className="text-stone-500 mt-1">Default Model: mistralai/Mistral-7B-Instruct</div>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
            <div className="font-bold text-slate-900 mb-1">Guaranteed Statutory Fallback</div>
            <div className="text-emerald-800">Zero Configuration Required</div>
            <div className="text-stone-500 mt-1">100% Deterministic Rule Engine</div>
          </div>
        </div>
      </div>
    </div>
  );
};
