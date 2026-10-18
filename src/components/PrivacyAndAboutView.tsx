import React from 'react';
import {
  ShieldCheck,
  Lock,
  FileCheck2,
  ExternalLink,
  AlertTriangle,
} from 'lucide-react';
import { getLocale, SupportedLanguage } from '../locales/index.ts';

interface PrivacyAndAboutViewProps {
  language: SupportedLanguage;
}

export const PrivacyAndAboutView: React.FC<PrivacyAndAboutViewProps> = ({ language }) => {
  const t = getLocale(language);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Title */}
      <div className="text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 mb-3">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
          <span>{t.aboutView.pill}</span>
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900">
          {t.aboutView.title}
        </h2>
        <p className="mt-2 text-sm text-stone-600 max-w-xl mx-auto">
          {t.aboutView.desc}
        </p>
      </div>

      {/* 1. Official Non-Government Legal Disclaimer */}
      <div className="p-6 rounded-3xl bg-amber-50/80 border border-amber-300 text-amber-950">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-900 mb-1">
              {t.aboutView.disclaimerTitle}
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed text-amber-900/90">
              {t.disclaimer.legalDisclosure}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Privacy Constitution */}
      <div className="p-8 rounded-3xl bg-white border border-stone-200/90 shadow-xs space-y-6">
        <div className="border-b border-stone-100 pb-4">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Lock className="w-5 h-5 text-emerald-700" />
            <span>{t.aboutView.constitutionTitle}</span>
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            {t.aboutView.constitutionDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs text-stone-700">
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
            <span className="font-bold text-slate-900 block mb-1">
              🚫 {t.aboutView.privacyCard1Title}
            </span>
            <p className="text-stone-600 leading-relaxed">
              {t.aboutView.privacyCard1Desc}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
            <span className="font-bold text-slate-900 block mb-1">
              💾 {t.aboutView.privacyCard2Title}
            </span>
            <p className="text-stone-600 leading-relaxed">
              {t.aboutView.privacyCard2Desc}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
            <span className="font-bold text-slate-900 block mb-1">
              🛡️ {t.aboutView.privacyCard3Title}
            </span>
            <p className="text-stone-600 leading-relaxed">
              {t.aboutView.privacyCard3Desc}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
            <span className="font-bold text-slate-900 block mb-1">
              🔍 {t.aboutView.privacyCard4Title}
            </span>
            <p className="text-stone-600 leading-relaxed">
              {t.aboutView.privacyCard4Desc}
            </p>
          </div>
        </div>
      </div>

      {/* 3. Methodology & Verification Process */}
      <div className="p-8 rounded-3xl bg-white border border-stone-200/90 shadow-xs space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <FileCheck2 className="w-5 h-5 text-emerald-700" />
          <span>{t.aboutView.methodologyTitle}</span>
        </h3>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
          {t.aboutView.methodologyDesc}
        </p>

        <div className="pt-2">
          <span className="text-xs font-bold text-slate-900 block mb-2">
            {t.aboutView.verifiedPortalsTitle}
          </span>
          <div className="flex flex-wrap gap-2 text-xs">
            {[
              { name: 'PM-KISAN (Agri)', url: 'https://pmkisan.gov.in' },
              { name: 'PM SVANidhi (MoHUA)', url: 'https://pmsvanidhi.mohua.gov.in' },
              { name: 'AB-PMJAY (NHA)', url: 'https://pmjay.gov.in' },
              { name: 'PMMVY (MoWCD)', url: 'https://pmmvy.wcd.gov.in' },
              { name: 'PM Vishwakarma (MSME)', url: 'https://pmvishwakarma.gov.in' },
              { name: 'Sukanya Samriddhi (India Post)', url: 'https://www.indiapost.gov.in' },
              { name: 'PMAY-Urban (MoHUA)', url: 'https://pmay-urban.gov.in' },
              { name: 'IGNOAPS (Rural Dev)', url: 'https://nsap.nic.in' },
              { name: 'MUDRA (Finance)', url: 'https://www.mudra.org.in' },
            ].map((item) => (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 rounded-lg bg-stone-100 hover:bg-emerald-50 text-stone-800 hover:text-emerald-900 font-medium inline-flex items-center gap-1 border border-stone-200 transition-colors"
              >
                <span>{item.name}</span>
                <ExternalLink className="w-3 h-3 text-stone-400" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Contact & Updates */}
      <div className="p-6 rounded-3xl bg-stone-100 border border-stone-200 text-xs text-stone-600 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="font-bold text-slate-900 block mb-0.5">
            {t.aboutView.noticeTitle}
          </span>
          <span>
            {t.aboutView.noticeDesc}
          </span>
        </div>

        <div className="text-xs font-semibold text-emerald-800 bg-white px-3 py-1.5 rounded-xl border border-stone-300">
          Open Source • MIT License
        </div>
      </div>
    </div>
  );
};
