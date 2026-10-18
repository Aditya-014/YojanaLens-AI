import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  XCircle,
  Play,
  RotateCcw,
  ShieldCheck,
  Zap,
  Terminal,
  Activity,
  Layers,
} from 'lucide-react';
import { TestSuiteReport } from '../tests/testSuite.ts';

interface TestDashboardViewProps {
  language: 'en' | 'hi';
}

export const TestDashboardView: React.FC<TestDashboardViewProps> = ({ language }) => {
  const isHi = language === 'hi';

  const [report, setReport] = useState<TestSuiteReport | null>(null);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runTests = async () => {
    setRunning(true);
    setError(null);

    try {
      const res = await fetch('/api/tests/run');
      if (!res.ok) throw new Error(`Server returned HTTP ${res.status}`);
      const data: TestSuiteReport = await res.json();
      setReport(data);
    } catch (err: any) {
      console.error('Failed to run test suite:', err);
      setError(err.message || 'Failed to execute unit tests.');
    } finally {
      setRunning(false);
    }
  };

  useEffect(() => {
    runTests();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              {isHi ? 'सत्यापन व गुणवत्ता' : 'Automated Verification'}
            </span>
            <span className="text-xs text-stone-500">• Test-Driven Statutory Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {isHi ? 'इकाई परीक्षण एवं गुणवत्ता डैशबोर्ड' : 'Eligibility Engine Unit Test Suite'}
          </h2>
          <p className="mt-1 text-sm text-stone-600 max-w-2xl">
            {isHi
              ? 'यह सुइट वास्तविक पात्रता नियमों, अधूरी प्रोफ़ाइल सुरक्षा, अपवर्जन सीमाओं और एआई ग्राउंडिंग की शुद्धता को स्वचालित रूप से जांचता है।'
              : 'Verifies deterministic eligibility logic, missing profile edge-cases, statutory exclusion boundaries, and anti-hallucination grounding guardrails.'}
          </p>
        </div>

        <button
          onClick={runTests}
          disabled={running}
          className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm disabled:opacity-50 cursor-pointer self-start md:self-auto"
        >
          <Play className={`w-4 h-4 ${running ? 'animate-spin' : ''}`} />
          <span>{running ? (isHi ? 'परीक्षण जारी...' : 'Running Tests...') : (isHi ? 'सभी परीक्षण पुनः चलाएं' : 'Run All Unit Tests')}</span>
        </button>
      </div>

      {/* Summary Scorecard */}
      {report && (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs">
            <span className="text-xs font-bold text-stone-500 uppercase">Total Tests</span>
            <div className="text-3xl font-extrabold text-slate-900 mt-1">{report.totalTests}</div>
            <div className="text-xs text-stone-400 mt-0.5">Automated test assertions</div>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-800 uppercase">Passed</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-3xl font-extrabold text-emerald-900 mt-1">{report.passedTests}</div>
            <div className="text-xs text-emerald-700 mt-0.5">100% verified criteria passed</div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-500 uppercase">Failed</span>
              <XCircle className="w-4 h-4 text-stone-400" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900 mt-1">{report.failedTests}</div>
            <div className="text-xs text-stone-400 mt-0.5">Zero tolerance for regression</div>
          </div>

          <div className="p-5 rounded-2xl bg-stone-900 text-white shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 uppercase">Suite Status</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xl font-bold text-emerald-300 mt-2">
              {report.allPassed ? 'ALL TESTS PASSED' : 'TESTS FAILED'}
            </div>
            <div className="text-[11px] text-stone-400 mt-0.5">
              {new Date(report.timestamp).toLocaleTimeString()}
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs mb-8">
          {error}
        </div>
      )}

      {/* Test Suites Accordion / Details */}
      {report && (
        <div className="space-y-6">
          {report.suites.map((suite, idx) => (
            <div key={idx} className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-xs">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <h3 className="text-base font-bold text-slate-900">{suite.name}</h3>
                </div>

                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {suite.tests.filter((t) => t.passed).length}/{suite.tests.length} Passed
                </span>
              </div>

              <div className="space-y-3">
                {suite.tests.map((test, tIdx) => (
                  <div
                    key={tIdx}
                    className="p-3.5 rounded-xl bg-stone-50 border border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-start gap-2.5">
                      {test.passed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <span className="font-semibold text-slate-900">{test.testName}</span>
                        <div className="text-[11px] text-stone-500 mt-0.5">
                          <span className="text-stone-400">Expected:</span> {test.expected} •{' '}
                          <span className="text-stone-400">Actual:</span> {test.actual}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto text-stone-400 text-[11px] font-mono">
                      <span>{test.durationMs}ms</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
