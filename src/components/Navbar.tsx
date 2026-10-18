import React, { useState, useRef, useEffect } from 'react';
import {
  ShieldCheck,
  Globe,
  Cpu,
  CheckCircle2,
  Info,
  Layers,
  ChevronDown,
  Check,
  Languages,
} from 'lucide-react';
import {
  getLocale,
  SupportedLanguage,
  SUPPORTED_LANGUAGES,
} from '../locales/index.ts';

interface NavbarProps {
  currentTab: 'home' | 'form' | 'schemes' | 'models' | 'tests' | 'about';
  onSelectTab: (tab: 'home' | 'form' | 'schemes' | 'models' | 'tests' | 'about') => void;
  language: SupportedLanguage;
  onSelectLanguage: (lang: SupportedLanguage) => void;
  onToggleLanguage: () => void;
  matchesCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  language,
  onSelectLanguage,
  onToggleLanguage,
  matchesCount,
}) => {
  const t = getLocale(language);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const currentLangMeta =
    SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];

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
            <span>12 Indian Languages</span>
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
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                currentTab === 'form'
                  ? 'bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              {t.nav.checkEligibility}
            </button>

            <button
              onClick={() => onSelectTab('schemes')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
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
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
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
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
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
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                currentTab === 'about'
                  ? 'bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Info className="w-4 h-4 text-stone-400" />
              <span>{t.nav.privacyAbout}</span>
            </button>
          </nav>

          {/* Right Action: Language Controls (Quick Toggle + 12-Language Dropdown) */}
          <div className="flex items-center gap-2" ref={dropdownRef}>
            {/* Quick English/Hindi Toggle (Requirement 1: Keep current English/Hindi toggle functionality) */}
            <button
              onClick={onToggleLanguage}
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700 text-xs font-semibold transition-all cursor-pointer"
              title="Quick Toggle: English ⇄ हिन्दी"
              aria-label="Toggle English and Hindi"
            >
              <Languages className="w-3.5 h-3.5 text-emerald-700" />
              <span>{t.nav.switchLanguage}</span>
            </button>

            {/* 12 Indian Languages Clean Dropdown Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-emerald-600/30 bg-emerald-50/70 hover:bg-emerald-100 text-emerald-900 text-xs font-bold transition-all shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-600"
                aria-haspopup="listbox"
                aria-expanded={isDropdownOpen}
                aria-label={t.nav.selectLanguage}
              >
                <Globe className="w-3.5 h-3.5 text-emerald-700" />
                <span className="font-semibold">{currentLangMeta.name}</span>
                <span className="hidden lg:inline text-[11px] text-emerald-800 font-normal">
                  ({currentLangMeta.englishName})
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-emerald-700 transition-transform ${
                    isDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* 12 Languages Menu Dropdown Popover */}
              {isDropdownOpen && (
                <div
                  className="absolute right-0 rtl:left-0 rtl:right-auto mt-2 w-72 sm:w-80 bg-white rounded-xl shadow-xl border border-stone-200 py-2 z-50 text-stone-900 animate-in fade-in zoom-in-95 duration-100"
                  role="listbox"
                  aria-label="Select Language"
                >
                  <div className="px-3 py-1.5 border-b border-stone-100 flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                      12 Indian Languages (भारतीय भाषाएं)
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                      RTL Supported
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-1 p-1.5 max-h-80 overflow-y-auto">
                    {SUPPORTED_LANGUAGES.map((lang) => {
                      const isSelected = lang.code === language;
                      return (
                        <button
                          key={lang.code}
                          type="button"
                          onClick={() => {
                            onSelectLanguage(lang.code);
                            setIsDropdownOpen(false);
                          }}
                          className={`flex items-center justify-between px-3 py-2 rounded-lg text-left rtl:text-right text-xs transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-emerald-600 text-white font-bold shadow-xs'
                              : 'hover:bg-stone-100 text-stone-800'
                          }`}
                          role="option"
                          aria-selected={isSelected}
                        >
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold leading-tight">
                              {lang.name}
                            </span>
                            <span
                              className={`text-[10px] ${
                                isSelected ? 'text-emerald-100' : 'text-stone-500'
                              }`}
                            >
                              {lang.englishName}
                              {lang.isRtl ? ' (RTL)' : ''}
                            </span>
                          </div>

                          {isSelected && <Check className="w-4 h-4 shrink-0 ml-1.5 rtl:mr-1.5 rtl:ml-0" />}
                        </button>
                      );
                    })}
                  </div>

                  <div className="px-3 pt-2 pb-1 border-t border-stone-100 text-[10px] text-stone-500 text-center">
                    Instant in-place translation • Saves preference locally
                  </div>
                </div>
              )}
            </div>

            {/* Mobile menu trigger */}
            <div className="flex md:hidden">
              <button
                onClick={() => onSelectTab(currentTab === 'schemes' ? 'form' : 'schemes')}
                className="p-2 text-stone-600 rounded-lg hover:bg-stone-100 cursor-pointer"
                aria-label="Toggle Tab"
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
