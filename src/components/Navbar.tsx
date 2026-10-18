import React from 'react';
import { ShieldCheck, Globe, Cpu, CheckCircle2, Info, BookOpen, Layers } from 'lucide-react';

interface NavbarProps {
  currentTab: 'home' | 'form' | 'schemes' | 'models' | 'tests' | 'about';
  onSelectTab: (tab: 'home' | 'form' | 'schemes' | 'models' | 'tests' | 'about') => void;
  language: 'en' | 'hi';
  onToggleLanguage: () => void;
  matchesCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  language,
  onToggleLanguage,
  matchesCount,
}) => {
  const isHi = language === 'hi';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      {/* Top Citizen Advisory Disclaimer Banner */}
      <div className="bg-emerald-900 text-emerald-100 text-xs px-4 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
          <div className="flex items-center gap-1.5 truncate">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-medium text-emerald-200">
              {isHi ? 'नागरिक सूचना:' : 'Public Benefit Notice:'}
            </span>
            <span className="truncate opacity-90">
              {isHi
                ? 'यह एक स्वतंत्र नागरिक खोज मंच है, आधिकारिक सरकारी वेबसाइट नहीं। अंतिम निर्णय संबंधित मंत्रालय का होता है।'
                : 'Independent citizen discovery assistant. Not an official government portal. Final discretion rests with respective ministries.'}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3 shrink-0 text-emerald-300">
            <span>{isHi ? '१००% नियम आधारित' : '100% Deterministic Engine'}</span>
            <span>•</span>
            <span>{isHi ? 'गोपनीयता सुरक्षित' : 'Zero Data Retained'}</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Title */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => onSelectTab('home')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-700 via-teal-800 to-slate-900 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-slate-900">
                  Yojana<span className="text-emerald-700">Lens</span>
                  <span className="ml-1 text-xs font-semibold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                    AI
                  </span>
                </span>
              </div>
              <p className="text-xs text-stone-500 font-medium">
                {isHi ? 'योजना लेंस — सरकारी योजना पात्रता सहायक' : 'Government Scheme Eligibility Assistant'}
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => onSelectTab('form')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentTab === 'form'
                  ? 'bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              {isHi ? 'पात्रता जांचें' : 'Check Eligibility'}
            </button>

            <button
              onClick={() => onSelectTab('schemes')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                currentTab === 'schemes'
                  ? 'bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Layers className="w-4 h-4 text-stone-400" />
              <span>{isHi ? 'सभी योजनाएं' : 'Explore Schemes'}</span>
              {matchesCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 rounded-full text-xs bg-emerald-600 text-white font-bold">
                  {matchesCount}
                </span>
              )}
            </button>

            <button
              onClick={() => onSelectTab('models')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                currentTab === 'models'
                  ? 'bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Cpu className="w-4 h-4 text-stone-400" />
              <span>{isHi ? 'एआई मॉडल व फॉलबैक' : 'AI Models & Failover'}</span>
            </button>

            <button
              onClick={() => onSelectTab('tests')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                currentTab === 'tests'
                  ? 'bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-stone-400" />
              <span>{isHi ? 'परीक्षण व गुणवत्ता' : 'Engine Tests'}</span>
            </button>

            <button
              onClick={() => onSelectTab('about')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                currentTab === 'about'
                  ? 'bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Info className="w-4 h-4 text-stone-400" />
              <span>{isHi ? 'गोपनीयता व सीमाएं' : 'Privacy & About'}</span>
            </button>
          </nav>

          {/* Right Action: Language Switcher */}
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleLanguage}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-stone-300 bg-stone-50 hover:bg-stone-100 text-stone-700 text-xs font-semibold transition-all shadow-xs cursor-pointer"
              title="Change Language / भाषा बदलें"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-600" />
              <span>{language === 'en' ? 'हिन्दी में बदलें' : 'Switch to English'}</span>
            </button>

            {/* Mobile menu trigger */}
            <div className="flex md:hidden">
              <button
                onClick={() => onSelectTab(currentTab === 'schemes' ? 'form' : 'schemes')}
                className="p-2 text-stone-600 rounded-lg hover:bg-stone-100"
              >
                <Layers className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
