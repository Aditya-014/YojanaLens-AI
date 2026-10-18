import React from 'react';
import { ShieldCheck, Heart, ExternalLink } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: 'home' | 'form' | 'schemes' | 'models' | 'tests' | 'about') => void;
  language: 'en' | 'hi';
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, language }) => {
  const isHi = language === 'hi';

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
                Yojana<span className="text-emerald-700">Lens</span> AI
              </div>
              <div className="text-xs text-stone-500">
                {isHi
                  ? 'सरकारी योजना पात्रता सहायक • नागरिक कल्याण खोज'
                  : 'Your Government Scheme Eligibility Assistant'}
              </div>
            </div>
          </div>

          {/* Quick Footer Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-stone-600">
            <button
              onClick={() => onSelectTab('form')}
              className="hover:text-emerald-700 cursor-pointer"
            >
              {isHi ? 'पात्रता जांचें' : 'Check Eligibility'}
            </button>
            <span>•</span>
            <button
              onClick={() => onSelectTab('schemes')}
              className="hover:text-emerald-700 cursor-pointer"
            >
              {isHi ? 'सभी योजनाएं' : 'Explore Schemes'}
            </button>
            <span>•</span>
            <button
              onClick={() => onSelectTab('models')}
              className="hover:text-emerald-700 cursor-pointer"
            >
              {isHi ? 'एआई मॉडल फॉलबैक' : 'AI Models & Failover'}
            </button>
            <span>•</span>
            <button
              onClick={() => onSelectTab('tests')}
              className="hover:text-emerald-700 cursor-pointer"
            >
              {isHi ? 'इकाई परीक्षण' : 'Engine Tests'}
            </button>
            <span>•</span>
            <button
              onClick={() => onSelectTab('about')}
              className="hover:text-emerald-700 cursor-pointer"
            >
              {isHi ? 'गोपनीयता नीति' : 'Privacy & Disclaimer'}
            </button>
          </div>
        </div>

        {/* Bottom Legal Notice */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p className="text-center sm:text-left max-w-2xl">
            {isHi
              ? 'महत्वपूर्ण सूचना: योजना लेंस एआई किसी भी सरकारी विभाग का आधिकारिक प्रतिनिधि नहीं है। यहाँ दिए गए परिणाम केवल प्रारंभिक मार्गदर्शन हैं। कोई भी संवेदनशील जानकारी (जैसे आधार संख्या या बैंक पासवर्ड) कभी साझा न करें।'
              : 'Public Notice: YojanaLens AI is an independent public-service discovery tool, not an official government portal. Results are preliminary and final decisions belong to respective government authorities. Never share sensitive OTPs or bank passwords.'}
          </p>

          <div className="shrink-0 font-medium">
            © 2026 YojanaLens AI • Open Public Service
          </div>
        </div>
      </div>
    </footer>
  );
};
