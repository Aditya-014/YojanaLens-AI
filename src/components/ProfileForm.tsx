import React, { useState } from 'react';
import {
  HelpCircle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Lock,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';
import { UserProfile, PROFILE_FIELD_REASONS } from '../types/profile.ts';
import { INDIAN_STATES_AND_UTS } from '../data/verifiedSchemes.ts';
import { getLocale } from '../locales/index.ts';

interface ProfileFormProps {
  profile: UserProfile;
  onChangeProfile: (profile: UserProfile) => void;
  onSubmit: () => void;
  language: 'en' | 'hi';
}

export const ProfileForm: React.FC<ProfileFormProps> = ({
  profile,
  onChangeProfile,
  onSubmit,
  language,
}) => {
  const isHi = language === 'hi';
  const t = getLocale(language);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const updateField = (field: keyof UserProfile, value: any) => {
    onChangeProfile({
      ...profile,
      [field]: value,
    });
  };

  const handleReset = () => {
    onChangeProfile({
      state: '',
      residence: '',
      age: null,
      gender: '',
      category: '',
      maritalStatus: '',
      educationLevel: '',
      occupation: '',
      annualIncome: null,
      ownsCultivableLand: null,
      landHoldingHectares: null,
      isPregnantOrLactating: null,
      hasDisability: null,
      disabilityPercentage: null,
      hasExistingPuccaHouse: null,
      hasGirlChildUnder10: null,
      isMinority: null,
      isTraditionalCraftsperson: null,
      isEnrolledInSchoolOrCollege: null,
    });
  };

  const loadSampleProfile = (personaKey: string) => {
    switch (personaKey) {
      case 'farmer':
        onChangeProfile({
          state: 'Uttar Pradesh',
          residence: 'rural',
          age: 42,
          gender: 'male',
          category: 'OBC',
          maritalStatus: 'married',
          educationLevel: '10th_pass',
          occupation: 'farmer',
          annualIncome: 120000,
          ownsCultivableLand: true,
          landHoldingHectares: 1.2,
          isPregnantOrLactating: false,
          hasDisability: false,
          disabilityPercentage: null,
          hasExistingPuccaHouse: false,
          hasGirlChildUnder10: false,
          isMinority: false,
          isTraditionalCraftsperson: false,
          isEnrolledInSchoolOrCollege: false,
        });
        break;
      case 'vendor':
        onChangeProfile({
          state: 'Maharashtra',
          residence: 'urban',
          age: 34,
          gender: 'male',
          category: 'General',
          maritalStatus: 'married',
          educationLevel: 'below_10th',
          occupation: 'street_vendor',
          annualIncome: 140000,
          ownsCultivableLand: false,
          landHoldingHectares: null,
          isPregnantOrLactating: false,
          hasDisability: false,
          disabilityPercentage: null,
          hasExistingPuccaHouse: false,
          hasGirlChildUnder10: false,
          isMinority: false,
          isTraditionalCraftsperson: false,
          isEnrolledInSchoolOrCollege: false,
        });
        break;
      case 'artisan':
        onChangeProfile({
          state: 'Rajasthan',
          residence: 'rural',
          age: 28,
          gender: 'male',
          category: 'OBC',
          maritalStatus: 'married',
          educationLevel: '10th_pass',
          occupation: 'artisan_craftsperson',
          annualIncome: 110000,
          ownsCultivableLand: false,
          landHoldingHectares: null,
          isPregnantOrLactating: false,
          hasDisability: false,
          disabilityPercentage: null,
          hasExistingPuccaHouse: false,
          hasGirlChildUnder10: false,
          isMinority: false,
          isTraditionalCraftsperson: true,
          isEnrolledInSchoolOrCollege: false,
        });
        break;
      case 'mother':
        onChangeProfile({
          state: 'Madhya Pradesh',
          residence: 'rural',
          age: 24,
          gender: 'female',
          category: 'SC',
          maritalStatus: 'married',
          educationLevel: '12th_pass',
          occupation: 'unemployed',
          annualIncome: 95000,
          ownsCultivableLand: false,
          landHoldingHectares: null,
          isPregnantOrLactating: true,
          hasDisability: false,
          disabilityPercentage: null,
          hasExistingPuccaHouse: false,
          hasGirlChildUnder10: true,
          isMinority: false,
          isTraditionalCraftsperson: false,
          isEnrolledInSchoolOrCollege: false,
        });
        break;
      case 'senior':
        onChangeProfile({
          state: 'Bihar',
          residence: 'rural',
          age: 67,
          gender: 'male',
          category: 'SC',
          maritalStatus: 'widowed',
          educationLevel: 'below_10th',
          occupation: 'unemployed',
          annualIncome: 45000,
          ownsCultivableLand: false,
          landHoldingHectares: null,
          isPregnantOrLactating: false,
          hasDisability: false,
          disabilityPercentage: null,
          hasExistingPuccaHouse: false,
          hasGirlChildUnder10: false,
          isMinority: false,
          isTraditionalCraftsperson: false,
          isEnrolledInSchoolOrCollege: false,
        });
        break;
    }
  };

  const renderWhyTag = (fieldKey: string) => {
    const info = PROFILE_FIELD_REASONS[fieldKey];
    if (!info) return null;

    const isOpen = activeTooltip === fieldKey;

    return (
      <div className="relative inline-block ml-1.5 align-middle">
        <button
          type="button"
          onClick={() => setActiveTooltip(isOpen ? null : fieldKey)}
          className="text-stone-400 hover:text-emerald-700 transition-colors p-0.5 rounded cursor-pointer"
          title={t.form.whyButton}
        >
          <HelpCircle className="w-3.5 h-3.5" />
        </button>

        {isOpen && (
          <div className="absolute z-30 w-72 p-3 text-xs bg-slate-900 text-stone-100 rounded-xl shadow-xl -top-2 left-6 border border-slate-700 animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between gap-1 mb-1">
              <span className="font-bold text-emerald-400">
                {t.form.whyTitle}
              </span>
              <button
                type="button"
                onClick={() => setActiveTooltip(null)}
                className="text-stone-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <p className="leading-relaxed">{isHi ? info.why.hi : info.why.en}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Title & Description */}
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          {t.form.title}
        </h2>
        <p className="mt-2 text-sm sm:text-base text-stone-600 max-w-2xl mx-auto">
          {t.form.subtitle}
        </p>

        {/* Privacy Notice Card */}
        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs text-left max-w-2xl">
          <Lock className="w-4 h-4 text-amber-700 shrink-0" />
          <span>
            {t.disclaimer.legalDisclosure}
          </span>
        </div>
      </div>

      {/* Preset Personas for Fast Evaluation */}
      <div className="mb-8 p-4 rounded-2xl bg-white border border-stone-200 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-700" />
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              {t.form.quickTestPersonas}
            </span>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="text-xs font-semibold text-stone-500 hover:text-stone-800 flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{t.form.resetForm}</span>
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => loadSampleProfile('farmer')}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors cursor-pointer"
          >
            {t.form.personas.farmer}
          </button>
          <button
            type="button"
            onClick={() => loadSampleProfile('vendor')}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200 hover:bg-teal-100 transition-colors cursor-pointer"
          >
            {t.form.personas.vendor}
          </button>
          <button
            type="button"
            onClick={() => loadSampleProfile('artisan')}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 transition-colors cursor-pointer"
          >
            {t.form.personas.artisan}
          </button>
          <button
            type="button"
            onClick={() => loadSampleProfile('mother')}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-50 text-rose-800 border border-rose-200 hover:bg-rose-100 transition-colors cursor-pointer"
          >
            {t.form.personas.mother}
          </button>
          <button
            type="button"
            onClick={() => loadSampleProfile('senior')}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-800 border border-indigo-200 hover:bg-indigo-100 transition-colors cursor-pointer"
          >
            {t.form.personas.senior}
          </button>
        </div>
      </div>

      {/* Main Profile Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="space-y-8"
      >
        {/* Section 1: Location & Demographics */}
        <div className="p-6 rounded-2xl bg-white border border-stone-200/90 shadow-xs">
          <div className="border-b border-stone-100 pb-3 mb-5">
            <h3 className="text-base font-bold text-slate-900">
              {t.form.sections.location}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* State / UT */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                {t.form.fields.state}
                {renderWhyTag('state')}
              </label>
              <select
                value={profile.state}
                onChange={(e) => updateField('state', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
              >
                <option value="">{t.form.fields.statePlaceholder}</option>
                {INDIAN_STATES_AND_UTS.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            {/* Residence (Rural / Urban) */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                {t.form.fields.residence}
                {renderWhyTag('residence')}
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => updateField('residence', 'rural')}
                  className={`py-2.5 px-3 rounded-xl border text-sm font-semibold transition-all cursor-pointer ${
                    profile.residence === 'rural'
                      ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                      : 'bg-stone-50 border-stone-300 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  🌾 {t.form.fields.rural}
                </button>
                <button
                  type="button"
                  onClick={() => updateField('residence', 'urban')}
                  className={`py-2.5 px-3 rounded-xl border text-sm font-semibold transition-all cursor-pointer ${
                    profile.residence === 'urban'
                      ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                      : 'bg-stone-50 border-stone-300 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  🏙️ {t.form.fields.urban}
                </button>
              </div>
            </div>

            {/* Age */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                {t.form.fields.age}
                {renderWhyTag('age')}
              </label>
              <input
                type="number"
                min="0"
                max="120"
                placeholder={t.form.fields.agePlaceholder}
                value={profile.age === null ? '' : profile.age}
                onChange={(e) =>
                  updateField('age', e.target.value === '' ? null : Number(e.target.value))
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                {t.form.fields.gender}
                {renderWhyTag('gender')}
              </label>
              <select
                value={profile.gender}
                onChange={(e) => updateField('gender', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
              >
                <option value="">{t.form.fields.genderPlaceholder}</option>
                <option value="female">{t.form.fields.female}</option>
                <option value="male">{t.form.fields.male}</option>
                <option value="transgender">{t.form.fields.transgender}</option>
                <option value="other">{t.form.fields.other}</option>
              </select>
            </div>

            {/* Social Category / Caste */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                {t.form.fields.category}
                {renderWhyTag('category')}
              </label>
              <select
                value={profile.category}
                onChange={(e) => updateField('category', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
              >
                <option value="">{t.form.fields.categoryPlaceholder}</option>
                <option value="General">General / सामान्य</option>
                <option value="OBC">OBC / अन्य पिछड़ा वर्ग</option>
                <option value="SC">SC / अनुसूचित जाति</option>
                <option value="ST">ST / अनुसूचित जनजाति</option>
                <option value="EWS">EWS / आर्थिक रूप से कमजोर वर्ग</option>
              </select>
            </div>

            {/* Marital Status */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                {t.form.fields.maritalStatus}
              </label>
              <select
                value={profile.maritalStatus}
                onChange={(e) => updateField('maritalStatus', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
              >
                <option value="">{t.form.fields.maritalPlaceholder}</option>
                <option value="married">{t.form.fields.married}</option>
                <option value="single">{t.form.fields.single}</option>
                <option value="widowed">{t.form.fields.widowed}</option>
                <option value="divorced">{t.form.fields.divorced}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Livelihood & Income */}
        <div className="p-6 rounded-2xl bg-white border border-stone-200/90 shadow-xs">
          <div className="border-b border-stone-100 pb-3 mb-5">
            <h3 className="text-base font-bold text-slate-900">
              {t.form.sections.livelihood}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Primary Occupation */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                {t.form.fields.occupation}
                {renderWhyTag('occupation')}
              </label>
              <select
                value={profile.occupation}
                onChange={(e) => updateField('occupation', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
              >
                <option value="">{t.form.fields.occupationPlaceholder}</option>
                <option value="farmer">🌾 {t.form.fields.occupations.farmer}</option>
                <option value="street_vendor">🛒 {t.form.fields.occupations.vendor}</option>
                <option value="artisan_craftsperson">🔨 {t.form.fields.occupations.artisan}</option>
                <option value="daily_wage_laborer">🧱 {t.form.fields.occupations.dailyWage}</option>
                <option value="self_employed_business">💼 {t.form.fields.occupations.business}</option>
                <option value="student">🎓 {t.form.fields.occupations.student}</option>
                <option value="unemployed">⏳ {t.form.fields.occupations.unemployed}</option>
                <option value="salaried_private">🏢 {t.form.fields.occupations.salariedPrivate}</option>
                <option value="salaried_govt">🏛️ {t.form.fields.occupations.salariedGovt}</option>
                <option value="other">📌 {t.form.fields.occupations.other}</option>
              </select>
            </div>

            {/* Annual Family Income */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                {t.form.fields.income}
                {renderWhyTag('annualIncome')}
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-stone-400 font-bold">₹</span>
                <input
                  type="number"
                  min="0"
                  step="5000"
                  placeholder={t.form.fields.incomePlaceholder}
                  value={profile.annualIncome === null ? '' : profile.annualIncome}
                  onChange={(e) =>
                    updateField('annualIncome', e.target.value === '' ? null : Number(e.target.value))
                  }
                  className="w-full pl-8 pr-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
                />
              </div>
              <p className="mt-1 text-[11px] text-stone-500">
                {t.form.fields.incomeHelp}
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Specific Welfare Conditions */}
        <div className="p-6 rounded-2xl bg-white border border-stone-200/90 shadow-xs">
          <div className="border-b border-stone-100 pb-3 mb-5">
            <h3 className="text-base font-bold text-slate-900">
              {t.form.sections.specific}
            </h3>
            <p className="mt-1 text-xs text-stone-500">
              {t.form.sections.specificDesc}
            </p>
          </div>

          <div className="space-y-4">
            {/* Cultivable Land */}
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-sm font-bold text-stone-800">
                  {t.form.fields.land}
                  {renderWhyTag('ownsCultivableLand')}
                </span>
                <p className="text-xs text-stone-500 mt-0.5">
                  {t.form.fields.landHelp}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => updateField('ownsCultivableLand', true)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                    profile.ownsCultivableLand === true
                      ? 'bg-emerald-700 text-white border-emerald-700'
                      : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  {t.form.yes}
                </button>
                <button
                  type="button"
                  onClick={() => updateField('ownsCultivableLand', false)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                    profile.ownsCultivableLand === false
                      ? 'bg-slate-700 text-white border-slate-700'
                      : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  {t.form.no}
                </button>
              </div>
            </div>

            {profile.ownsCultivableLand === true && (
              <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950">
                <div className="flex items-center gap-2 font-bold mb-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>{t.form.fields.landNoticeTitle}</span>
                </div>
                <p className="leading-relaxed text-amber-900/90 mb-2.5">
                  {t.form.fields.landNoticeBody}
                </p>
                <div className="text-[11px] font-bold text-amber-900 mb-1.5">
                  {t.form.fields.landPortalsTitle}
                </div>
                <div className="flex flex-wrap gap-2">
                  <a
                    href="https://upbhulekh.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-amber-300 text-amber-900 font-semibold hover:bg-amber-100"
                  >
                    UP Bhulekh
                    <ExternalLink className="w-3 h-3 text-amber-700" />
                  </a>
                  <a
                    href="https://mpbhulekh.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-amber-300 text-amber-900 font-semibold hover:bg-amber-100"
                  >
                    MP Bhulekh
                    <ExternalLink className="w-3 h-3 text-amber-700" />
                  </a>
                  <a
                    href="https://biharbhumi.bihar.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-amber-300 text-amber-900 font-semibold hover:bg-amber-100"
                  >
                    Bihar Bhumi
                    <ExternalLink className="w-3 h-3 text-amber-700" />
                  </a>
                  <a
                    href="https://bhulekh.mahabhumi.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-amber-300 text-amber-900 font-semibold hover:bg-amber-100"
                  >
                    Mahabhulekh (MH)
                    <ExternalLink className="w-3 h-3 text-amber-700" />
                  </a>
                  <a
                    href="https://banglarbhumi.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-amber-300 text-amber-900 font-semibold hover:bg-amber-100"
                  >
                    Banglarbhumi (WB)
                    <ExternalLink className="w-3 h-3 text-amber-700" />
                  </a>
                  <a
                    href="https://dilrmp.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-amber-300 text-amber-900 font-semibold hover:bg-amber-100"
                  >
                    DILRMP Central
                    <ExternalLink className="w-3 h-3 text-amber-700" />
                  </a>
                </div>
              </div>
            )}

            {/* Maternal Status */}
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-sm font-bold text-stone-800">
                  {t.form.fields.mother}
                  {renderWhyTag('isPregnantOrLactating')}
                </span>
                <p className="text-xs text-stone-500 mt-0.5">
                  {t.form.fields.motherHelp}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => updateField('isPregnantOrLactating', true)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                    profile.isPregnantOrLactating === true
                      ? 'bg-emerald-700 text-white border-emerald-700'
                      : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  {t.form.yes}
                </button>
                <button
                  type="button"
                  onClick={() => updateField('isPregnantOrLactating', false)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                    profile.isPregnantOrLactating === false
                      ? 'bg-slate-700 text-white border-slate-700'
                      : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  {t.form.no}
                </button>
              </div>
            </div>

            {/* Existing Pucca House */}
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-sm font-bold text-stone-800">
                  {t.form.fields.house}
                  {renderWhyTag('hasExistingPuccaHouse')}
                </span>
                <p className="text-xs text-stone-500 mt-0.5">
                  {t.form.fields.houseHelp}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => updateField('hasExistingPuccaHouse', true)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                    profile.hasExistingPuccaHouse === true
                      ? 'bg-slate-700 text-white border-slate-700'
                      : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  {t.form.yes}
                </button>
                <button
                  type="button"
                  onClick={() => updateField('hasExistingPuccaHouse', false)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                    profile.hasExistingPuccaHouse === false
                      ? 'bg-emerald-700 text-white border-emerald-700'
                      : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  {t.form.no}
                </button>
              </div>
            </div>

            {/* Girl Child under 10 */}
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-sm font-bold text-stone-800">
                  {t.form.fields.girlChild}
                  {renderWhyTag('hasGirlChildUnder10')}
                </span>
                <p className="text-xs text-stone-500 mt-0.5">
                  {t.form.fields.girlChildHelp}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => updateField('hasGirlChildUnder10', true)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                    profile.hasGirlChildUnder10 === true
                      ? 'bg-emerald-700 text-white border-emerald-700'
                      : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  {t.form.yes}
                </button>
                <button
                  type="button"
                  onClick={() => updateField('hasGirlChildUnder10', false)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                    profile.hasGirlChildUnder10 === false
                      ? 'bg-slate-700 text-white border-slate-700'
                      : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  {t.form.no}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
          <div className="text-xs text-stone-500">
            {t.form.evalNotice}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleReset}
              className="w-1/2 sm:w-auto px-5 py-3 rounded-xl border border-stone-300 bg-white hover:bg-stone-100 text-stone-700 font-semibold text-sm transition-colors cursor-pointer"
            >
              {t.form.clearBtn}
            </button>

            <button
              type="submit"
              className="w-1/2 sm:w-auto px-7 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{t.form.evaluateBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
