import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  RefreshCw,
  Play,
  Terminal,
  Info,
} from 'lucide-react';
import { getLocale, SupportedLanguage } from '../locales/index.ts';

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
  language: SupportedLanguage;
}

export const ModelDiagnosticsView: React.FC<ModelDiagnosticsViewProps> = ({ language }) => {
  const t = getLocale(language);

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
              {t.modelsView.pill}
            </span>
            <span className="text-xs text-stone-500">• {t.modelsView.subtitlePill}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {t.modelsView.title}
          </h2>
          <p className="mt-1 text-sm text-stone-600 max-w-2xl">
            {t.modelsView.desc}
          </p>
        </div>

        <button
          onClick={fetchStatus}
          className="px-4 py-2 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-800 text-xs font-semibold flex items-center gap-2 self-start md:self-auto cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>{t.modelsView.refreshBtn}</span>
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
                    {t.modelsView.slotLabel} {slot.slotId}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-0.5">{slot.name}</h3>
                </div>

                {slot.isConfigured ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{t.status.active}</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-stone-100 text-stone-600">
                    <AlertTriangle className="w-3.5 h-3.5 text-stone-400" />
                    <span>{t.status.unconfigured}</span>
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
                  <span>{isTesting ? t.modelsView.testingBtn : t.modelsView.testPingBtn}</span>
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
              {testResult.success ? 'PASSED' : 'FALLBACK USED / FAILED'}
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
          <span>{t.modelsView.guideTitle}</span>
        </h3>
        <p className="text-xs text-stone-600 mb-4 leading-relaxed">
          {t.modelsView.guideDesc}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
            <div className="font-bold text-slate-900 mb-1">Slot 1: Primary (Active)</div>
            <div className="text-emerald-800">GEMINI_API_KEY="AI Studio User Secret"</div>
            <div className="text-stone-500 mt-1">Model: gemini-3.8-flash via @google/genai</div>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
            <div className="font-bold text-slate-900 mb-1">Slot 2: Ollama Open-Weight (Optional)</div>
            <div className="text-stone-700">OLLAMA_BASE_URL="http://your-ollama-host:11434"</div>
            <div className="text-stone-700">OLLAMA_MODEL="llama3.2"</div>
            <div className="text-stone-500 mt-1">Open-Weight: Llama 3.2 / Qwen 2.5 / Mistral</div>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
            <div className="font-bold text-slate-900 mb-1">Slot 3: Hugging Face Inference (Optional)</div>
            <div className="text-stone-700">HF_TOKEN="hf_..."</div>
            <div className="text-stone-700">HF_MODEL_ID="meta-llama/Llama-3.2-3B-Instruct"</div>
            <div className="text-stone-500 mt-1">Provider: Hugging Face Serverless / Dedicated</div>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
            <div className="font-bold text-slate-900 mb-1">Slot 4: Guaranteed Statutory Fallback</div>
            <div className="text-emerald-800">Zero Configuration Required (100% Active)</div>
            <div className="text-stone-500 mt-1">Deterministic Rule Engine • Zero Hallucination</div>
          </div>
        </div>
      </div>
    </div>
  );
};
