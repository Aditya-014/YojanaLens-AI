import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { getLocale, SupportedLanguage } from '../locales/index.ts';

interface FooterProps {
  onSelectTab: (tab: 'home' | 'form' | 'schemes' | 'models' | 'tests' | 'about') => void;
  language: SupportedLanguage;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, language }) => {
  const t = getLocale(language);

  return (
    <footer className="mt-16 bg-white border-t border-stone-200">
      {/* Tricolor Subtle Top Stripe */}
      <div className="h-1.5 w-full bg-gradient-to-r from-amber-500 via-stone-200 to-emerald-600" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-stone-100">
          {/* Logo & Subtitle */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-700 to-slate-900 flex items-center justify-center text-white shadow-xs">
              <ShieldCheck className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <div className="text-base font-bold text-slate-900">
                {t.brand.name}
              </div>
              <div className="text-xs text-stone-500">
                {t.footer.tagline}
              </div>
            </div>
          </div>

          {/* Quick Footer Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-stone-600">
            <button
              onClick={() => onSelectTab('form')}
              className="hover:text-emerald-700 cursor-pointer"
            >
              {t.nav.checkEligibility}
            </button>
            <span>•</span>
            <button
              onClick={() => onSelectTab('schemes')}
              className="hover:text-emerald-700 cursor-pointer"
            >
              {t.nav.exploreSchemes}
            </button>
            <span>•</span>
            <button
              onClick={() => onSelectTab('models')}
              className="hover:text-emerald-700 cursor-pointer"
            >
              {t.nav.modelDiagnostics}
            </button>
            <span>•</span>
            <button
              onClick={() => onSelectTab('tests')}
              className="hover:text-emerald-700 cursor-pointer"
            >
              {t.nav.engineTests}
            </button>
            <span>•</span>
            <button
              onClick={() => onSelectTab('about')}
              className="hover:text-emerald-700 cursor-pointer"
            >
              {t.nav.privacyAbout}
            </button>
          </div>
        </div>

        {/* Bottom Legal Notice */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p className="text-center sm:text-left max-w-2xl">
            {t.footer.disclaimer}
          </p>

          <div className="shrink-0 font-medium">
            {t.footer.copyright}
          </div>
        </div>
      </div>
    </footer>
  );
};
