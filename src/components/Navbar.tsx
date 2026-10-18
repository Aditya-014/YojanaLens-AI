import React from 'react';
import { ShieldCheck, Globe, Cpu, CheckCircle2, Info, Layers } from 'lucide-react';
import { getLocale } from '../locales/index.ts';

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
  const t = getLocale(language);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      {/* Top Citizen Advisory Disclaimer Banner */}
      <div className="bg-emerald-950 text-emerald-100 text-xs px-4 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
          <div className="flex items-center gap-1.5 truncate">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="truncate opacity-95 text-emerald-200 font-medium">
              {t.disclaimer.banner}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3 shrink-0 text-emerald-300 font-medium text-[11px]">
            <span>100% Deterministic</span>
            <span>•</span>
            <span>{t.disclaimer.privacyPromise}</span>
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
                  {t.brand.name}
                  <span className="ml-1 text-xs font-semibold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                    {t.brand.badge}
                  </span>
                </span>
              </div>
              <p className="text-xs text-stone-500 font-medium">
                {t.brand.title}
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
              {t.nav.checkEligibility}
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
              <span>{t.nav.exploreSchemes}</span>
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
              <span>{t.nav.modelDiagnostics}</span>
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
              <span>{t.nav.engineTests}</span>
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
              <span>{t.nav.privacyAbout}</span>
            </button>
          </nav>

          {/* Right Action: Language Switcher */}
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleLanguage}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-stone-300 bg-stone-50 hover:bg-stone-100 text-stone-800 text-xs font-semibold transition-all shadow-xs cursor-pointer"
              title="Change Language / भाषा बदलें"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t.nav.switchLanguage}</span>
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
