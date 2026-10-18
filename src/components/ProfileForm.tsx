import React, { useState } from 'react';
import {
  HelpCircle,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Info,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { UserProfile, PROFILE_FIELD_REASONS } from '../types/profile.ts';
import { INDIAN_STATES_AND_UTS } from '../data/verifiedSchemes.ts';

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
          title={isHi ? 'यह जानकारी क्यों मांगी जा रही है?' : 'Why is this detail needed?'}
        >
          <HelpCircle className="w-3.5 h-3.5" />
        </button>

        {isOpen && (
          <div className="absolute z-30 w-72 p-3 text-xs bg-slate-900 text-stone-100 rounded-xl shadow-xl -top-2 left-6 border border-slate-700 animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between gap-1 mb-1">
              <span className="font-bold text-emerald-400">
                {isHi ? 'आवश्यकता का कारण:' : 'Why we need this:'}
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
          {isHi ? 'नागरिक प्रोफ़ाइल विवरण' : 'Citizen Eligibility Profile'}
        </h2>
        <p className="mt-2 text-sm sm:text-base text-stone-600 max-w-2xl mx-auto">
          {isHi
            ? 'नीचे अपनी बुनियादी जानकारी दर्ज करें। हम न्यूनतम आवश्यक विवरण ही मांगते हैं और हर सवाल का कारण स्पष्ट रूप से समझाते हैं।'
            : 'Enter your basic details below. We request only the minimum required information and clearly explain why each detail is needed.'}
        </p>

        {/* Privacy Notice Card */}
        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs text-left max-w-2xl">
          <Lock className="w-4 h-4 text-amber-700 shrink-0" />
          <span>
            {isHi
              ? 'सुरक्षा गारंटी: यह उपकरण कभी आधार नंबर, बैंक खाता विवरण, ओटीपी या पासवर्ड नहीं मांगता। आपकी जानकारी आपके ब्राउज़र सत्र तक ही सीमित है।'
              : 'Zero Sensitive Credentials: We never ask for Aadhaar numbers, bank account numbers, passwords, or OTPs. All data stays strictly in your session.'}
          </span>
        </div>
      </div>

      {/* Preset Personas for Fast Evaluation */}
      <div className="mb-8 p-4 rounded-2xl bg-white border border-stone-200 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-700" />
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              {isHi ? 'त्वरित परीक्षण प्रोफ़ाइल (क्लिक करके भरें):' : 'Quick Test Personas (Click to Load):'}
            </span>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="text-xs font-semibold text-stone-500 hover:text-stone-800 flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{isHi ? 'रीसेट करें' : 'Reset Form'}</span>
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => loadSampleProfile('farmer')}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors cursor-pointer"
          >
            🌾 {isHi ? 'छोटे किसान (उ.प्र.)' : 'Small Farmer (UP)'}
          </button>
          <button
            type="button"
            onClick={() => loadSampleProfile('vendor')}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200 hover:bg-teal-100 transition-colors cursor-pointer"
          >
            🛒 {isHi ? 'शहरी रेहड़ी-पटरी विक्रेता (महाराष्ट्र)' : 'Urban Street Vendor (MH)'}
          </button>
          <button
            type="button"
            onClick={() => loadSampleProfile('artisan')}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 transition-colors cursor-pointer"
          >
            🔨 {isHi ? 'पारंपरिक कारीगर / बढ़ई (राजस्थान)' : 'Artisan / Carpenter (RJ)'}
          </button>
          <button
            type="button"
            onClick={() => loadSampleProfile('mother')}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-50 text-rose-800 border border-rose-200 hover:bg-rose-100 transition-colors cursor-pointer"
          >
            👶 {isHi ? 'गर्भवती / धात्री माता (म.प्र.)' : 'Expectant Mother (MP)'}
          </button>
          <button
            type="button"
            onClick={() => loadSampleProfile('senior')}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-800 border border-indigo-200 hover:bg-indigo-100 transition-colors cursor-pointer"
          >
            👴 {isHi ? 'वरिष्ठ नागरिक ६७ वर्ष (बिहार)' : 'Senior Citizen 67y (Bihar)'}
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
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold flex items-center justify-center">
                1
              </span>
              <span>{isHi ? 'स्थान एवं जनसांख्यिकी' : 'Location & Demographics'}</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* State / UT */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                {isHi ? 'राज्य / केंद्र शासित प्रदेश' : 'State / Union Territory'}
                {renderWhyTag('state')}
              </label>
              <select
                value={profile.state}
                onChange={(e) => updateField('state', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
              >
                <option value="">{isHi ? '-- राज्य चुनें --' : '-- Select State/UT --'}</option>
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
                {isHi ? 'निवास का क्षेत्र' : 'Area of Residence'}
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
                  🌾 {isHi ? 'ग्रामीण (Rural)' : 'Rural Area'}
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
                  🏙️ {isHi ? 'शहरी (Urban)' : 'Urban Area'}
                </button>
              </div>
            </div>

            {/* Age */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                {isHi ? 'आयु (वर्षों में)' : 'Age (in Years)'}
                {renderWhyTag('age')}
              </label>
              <input
                type="number"
                min="0"
                max="120"
                placeholder={isHi ? 'उदा. 35' : 'e.g. 35'}
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
                {isHi ? 'लिंग' : 'Gender'}
                {renderWhyTag('gender')}
              </label>
              <select
                value={profile.gender}
                onChange={(e) => updateField('gender', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
              >
                <option value="">{isHi ? '-- लिंग चुनें --' : '-- Select Gender --'}</option>
                <option value="female">{isHi ? 'महिला (Female)' : 'Female'}</option>
                <option value="male">{isHi ? 'पुरुष (Male)' : 'Male'}</option>
                <option value="transgender">{isHi ? 'ट्रांसजेंडर (Transgender)' : 'Transgender'}</option>
                <option value="other">{isHi ? 'अन्य (Other)' : 'Other'}</option>
              </select>
            </div>

            {/* Social Category / Caste */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                {isHi ? 'सामाजिक वर्ग / जाति श्रेणी' : 'Social Category / Caste'}
                {renderWhyTag('category')}
              </label>
              <select
                value={profile.category}
                onChange={(e) => updateField('category', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
              >
                <option value="">{isHi ? '-- श्रेणी चुनें --' : '-- Select Category --'}</option>
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
                {isHi ? 'वैवाहिक स्थिति' : 'Marital Status'}
              </label>
              <select
                value={profile.maritalStatus}
                onChange={(e) => updateField('maritalStatus', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
              >
                <option value="">{isHi ? '-- चुनें --' : '-- Select Marital Status --'}</option>
                <option value="married">{isHi ? 'विवाहित (Married)' : 'Married'}</option>
                <option value="single">{isHi ? 'अविवाहित (Single)' : 'Single'}</option>
                <option value="widowed">{isHi ? 'विधवा / विधुर (Widowed)' : 'Widowed'}</option>
                <option value="divorced">{isHi ? 'तलाकशुदा (Divorced)' : 'Divorced'}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Livelihood & Income */}
        <div className="p-6 rounded-2xl bg-white border border-stone-200/90 shadow-xs">
          <div className="border-b border-stone-100 pb-3 mb-5">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold flex items-center justify-center">
                2
              </span>
              <span>{isHi ? 'आजीविका एवं पारिवारिक आय' : 'Livelihood & Family Income'}</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Primary Occupation */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                {isHi ? 'मुख्य व्यवसाय / कार्य' : 'Primary Occupation'}
                {renderWhyTag('occupation')}
              </label>
              <select
                value={profile.occupation}
                onChange={(e) => updateField('occupation', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
              >
                <option value="">{isHi ? '-- व्यवसाय चुनें --' : '-- Select Occupation --'}</option>
                <option value="farmer">🌾 {isHi ? 'किसान / कृषि (Farmer)' : 'Farmer / Agriculture'}</option>
                <option value="street_vendor">🛒 {isHi ? 'रेहड़ी-पटरी / फेरीवाला (Street Vendor)' : 'Street Vendor / Hawker'}</option>
                <option value="artisan_craftsperson">🔨 {isHi ? 'पारंपरिक कारीगर / दस्तकार (Artisan)' : 'Traditional Artisan / Craftsperson'}</option>
                <option value="daily_wage_laborer">🧱 {isHi ? 'दैनिक मजदूर / निर्माण श्रमिक (Daily Wage)' : 'Daily Wage / Construction Laborer'}</option>
                <option value="self_employed_business">💼 {isHi ? 'स्व-रोजगार / लघु व्यापार (Micro Business)' : 'Self-Employed / Micro Business'}</option>
                <option value="student">🎓 {isHi ? 'विद्यार्थी (Student)' : 'Student'}</option>
                <option value="unemployed">⏳ {isHi ? 'बेरोजगार / गृहिणी (Unemployed / Homemaker)' : 'Unemployed / Homemaker'}</option>
                <option value="salaried_private">🏢 {isHi ? 'वेतनभोगी (निजी कंपनी)' : 'Salaried (Private Sector)'}</option>
                <option value="salaried_govt">🏛️ {isHi ? 'वेतनभोगी (सरकारी / पीएसयू कर्मचारी)' : 'Salaried (Govt / PSU Regular)'}</option>
                <option value="other">📌 {isHi ? 'अन्य व्यवसाय (Other)' : 'Other'}</option>
              </select>
            </div>

            {/* Annual Family Income */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                {isHi ? 'वार्षिक पारिवारिक आय (₹ रुपये)' : 'Annual Family Income (₹ INR)'}
                {renderWhyTag('annualIncome')}
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-stone-400 font-bold">₹</span>
                <input
                  type="number"
                  min="0"
                  step="5000"
                  placeholder={isHi ? 'उदा. 150000' : 'e.g. 150000'}
                  value={profile.annualIncome === null ? '' : profile.annualIncome}
                  onChange={(e) =>
                    updateField('annualIncome', e.target.value === '' ? null : Number(e.target.value))
                  }
                  className="w-full pl-8 pr-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
                />
              </div>
              <p className="mt-1 text-[11px] text-stone-500">
                {isHi
                  ? 'परिवार के सभी सदस्यों की कुल वार्षिक आय।'
                  : 'Total combined annual income of all household members.'}
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Specific Welfare Conditions */}
        <div className="p-6 rounded-2xl bg-white border border-stone-200/90 shadow-xs">
          <div className="border-b border-stone-100 pb-3 mb-5">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold flex items-center justify-center">
                3
              </span>
              <span>
                {isHi
                  ? 'विशेष योजना-संबंधित परिस्थितियां'
                  : 'Scheme-Specific Criteria (Only when applicable)'}
              </span>
            </h3>
            <p className="mt-1 text-xs text-stone-500">
              {isHi
                ? 'ये प्रश्न केवल विशिष्ट योजनाओं (जैसे पीएम-किसान, मातृ वंदना, सुकन्या समृद्धि या आवास योजना) की शर्तों के सत्यापन के लिए हैं।'
                : 'These details are strictly required to verify conditions for targeted programs like PM-KISAN, PMMVY, SSY, or PMAY.'}
            </p>
          </div>

          <div className="space-y-4">
            {/* Cultivable Land (Relevant for PM-KISAN) */}
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-sm font-bold text-stone-800">
                  {isHi ? 'क्या आपके नाम कृषियोग्य भूमि दर्ज है?' : 'Do you own cultivable agricultural land in your name?'}
                  {renderWhyTag('ownsCultivableLand')}
                </span>
                <p className="text-xs text-stone-500 mt-0.5">
                  {isHi
                    ? 'पीएम-किसान सम्मान निधि के लिए राजस्व रिकॉर्ड में नाम होना अनिवार्य शर्त है।'
                    : 'Mandatory statutory requirement under PM-KISAN operational rules.'}
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
                  {isHi ? 'हाँ (Yes)' : 'Yes'}
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
                  {isHi ? 'नहीं (No)' : 'No'}
                </button>
              </div>
            </div>

            {/* Maternal Status (Relevant for PMMVY) */}
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-sm font-bold text-stone-800">
                  {isHi ? 'क्या आप वर्तमान में गर्भवती महिला अथवा स्तनपान कराने वाली माता हैं?' : 'Are you currently pregnant or a lactating mother?'}
                  {renderWhyTag('isPregnantOrLactating')}
                </span>
                <p className="text-xs text-stone-500 mt-0.5">
                  {isHi
                    ? 'प्रधानमंत्री मातृ वंदना योजना (PMMVY) मातृत्व प्रोत्साहन के लिए।'
                    : 'Required strictly to evaluate Pradhan Mantri Matru Vandana Yojana.'}
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
                  {isHi ? 'हाँ (Yes)' : 'Yes'}
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
                  {isHi ? 'नहीं (No)' : 'No'}
                </button>
              </div>
            </div>

            {/* Existing Pucca House (Relevant for PMAY-Urban) */}
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-sm font-bold text-stone-800">
                  {isHi ? 'क्या आपके या आपके परिवार के नाम भारत में कहीं भी पक्का मकान है?' : 'Does any family member own a pucca house anywhere in India?'}
                  {renderWhyTag('hasExistingPuccaHouse')}
                </span>
                <p className="text-xs text-stone-500 mt-0.5">
                  {isHi
                    ? 'पीएम आवास योजना के नियमों के अनुसार परिवार के पास पक्का मकान नहीं होना चाहिए।'
                    : 'PMAY-Urban statutory rules mandate that beneficiary family must be pucca-houseless.'}
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
                  {isHi ? 'हाँ (Yes)' : 'Yes'}
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
                  {isHi ? 'नहीं (No)' : 'No'}
                </button>
              </div>
            </div>

            {/* Girl Child under 10 (Relevant for Sukanya Samriddhi) */}
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-sm font-bold text-stone-800">
                  {isHi ? 'क्या आपके परिवार में १० वर्ष से कम आयु की बालिका है?' : 'Do you have a girl child below 10 years of age?'}
                  {renderWhyTag('hasGirlChildUnder10')}
                </span>
                <p className="text-xs text-stone-500 mt-0.5">
                  {isHi
                    ? 'सुकन्या समृद्धि योजना (SSY) में उच्च ब्याज बचत खाता खोलने के लिए।'
                    : 'Required exclusively for opening a Sukanya Samriddhi Yojana (SSY) account.'}
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
                  {isHi ? 'हाँ (Yes)' : 'Yes'}
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
                  {isHi ? 'नहीं (No)' : 'No'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
          <div className="text-xs text-stone-500">
            {isHi
              ? 'सत्यापन तुरंत नियम-आधारित इंजन द्वारा किया जाएगा।'
              : 'Evaluation is executed immediately via the deterministic rule engine.'}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleReset}
              className="w-1/2 sm:w-auto px-5 py-3 rounded-xl border border-stone-300 bg-white hover:bg-stone-100 text-stone-700 font-semibold text-sm transition-colors cursor-pointer"
            >
              {isHi ? 'साफ़ करें' : 'Clear Form'}
            </button>

            <button
              type="submit"
              className="w-1/2 sm:w-auto px-7 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{isHi ? 'पात्रता की गणना करें' : 'Evaluate Eligibility'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
