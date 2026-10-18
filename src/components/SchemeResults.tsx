import React, { useState, useMemo } from 'react';
import {
  CheckCircle2,
  AlertCircle,
  XCircle,
  HelpCircle,
  Search,
  ChevronRight,
  Building2,
  ShieldCheck,
  Edit3,
} from 'lucide-react';
import { SchemeEvaluation, EligibilityStatus, SchemeCategory } from '../types/scheme.ts';
import { getLocale, SupportedLanguage, getLocalizedText } from '../locales/index.ts';

interface SchemeResultsProps {
  evaluations: SchemeEvaluation[];
  onSelectScheme: (evaluation: SchemeEvaluation) => void;
  onEditProfile: () => void;
  language: SupportedLanguage;
}

export const SchemeResults: React.FC<SchemeResultsProps> = ({
  evaluations,
  onSelectScheme,
  onEditProfile,
  language,
}) => {
  const t = getLocale(language);

  const [statusFilter, setStatusFilter] = useState<'ALL' | EligibilityStatus>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<'ALL' | SchemeCategory>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Counts
  const matchedCount = evaluations.filter((e) => e.status === 'MATCH').length;
  const needsInfoCount = evaluations.filter((e) => e.status === 'NEEDS_INFORMATION').length;
  const doesNotMatchCount = evaluations.filter((e) => e.status === 'DOES_NOT_MATCH').length;

  const filteredEvaluations = useMemo(() => {
    return evaluations.filter((item) => {
      // Status filter
      if (statusFilter !== 'ALL' && item.status !== statusFilter) return false;

      // Category filter
      if (categoryFilter !== 'ALL' && item.scheme.category !== categoryFilter) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const s = item.scheme;
        const text = `${Object.values(s.name).join(' ')} ${s.shortName} ${Object.values(s.administeringAuthority).join(' ')} ${Object.values(s.benefitsSummary).join(' ')}`.toLowerCase();
        if (!text.includes(q)) return false;
      }

      return true;
    });
  }, [evaluations, statusFilter, categoryFilter, searchQuery]);

  const getStatusBadge = (status: EligibilityStatus) => {
    switch (status) {
      case 'MATCH':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t.status.match}</span>
          </span>
        );
      case 'NEEDS_INFORMATION':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>{t.status.needsInfo}</span>
          </span>
        );
      case 'DOES_NOT_MATCH':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-300">
            <XCircle className="w-3.5 h-3.5 text-slate-500" />
            <span>{t.status.doesNotMatch}</span>
          </span>
        );
      case 'UNVERIFIED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-300">
            <HelpCircle className="w-3.5 h-3.5 text-purple-600" />
            <span>{t.status.unverified}</span>
          </span>
        );
    }
  };

  const getCategoryLabel = (category: SchemeCategory) => {
    return t.categories[category] || category;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Banner with Stats & Edit Profile Button */}
      <div className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-xs mb-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                {t.results.badge}
              </span>
              <span className="text-xs text-stone-500">
                • {t.results.engineNotice}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {t.results.title}
            </h2>
            <p className="mt-1 text-sm text-stone-600">
              {t.results.subtitle}
            </p>
          </div>

          <button
            onClick={onEditProfile}
            className="px-4 py-2.5 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-800 text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-xs cursor-pointer shrink-0"
          >
            <Edit3 className="w-4 h-4 text-emerald-700" />
            <span>{t.results.editProfile}</span>
          </button>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-stone-100">
          <div
            onClick={() => setStatusFilter('MATCH')}
            className={`p-4 rounded-2xl border cursor-pointer transition-all ${
              statusFilter === 'MATCH'
                ? 'bg-emerald-50/80 border-emerald-400 ring-2 ring-emerald-500/20'
                : 'bg-emerald-50/40 border-emerald-200/80 hover:bg-emerald-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                {t.results.matchedSchemes}
              </span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-black text-emerald-900">{matchedCount}</span>
              <span className="text-xs text-emerald-700 font-medium">
                {matchedCount === 1 ? 'scheme' : 'schemes'}
              </span>
            </div>
            <p className="mt-1 text-xs text-emerald-800/80">
              {t.results.allCriteriaSatisfied}
            </p>
          </div>

          <div
            onClick={() => setStatusFilter('NEEDS_INFORMATION')}
            className={`p-4 rounded-2xl border cursor-pointer transition-all ${
              statusFilter === 'NEEDS_INFORMATION'
                ? 'bg-amber-50/80 border-amber-400 ring-2 ring-amber-500/20'
                : 'bg-amber-50/40 border-amber-200/80 hover:bg-amber-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                {t.results.needsInfoTitle}
              </span>
              <AlertCircle className="w-4 h-4 text-amber-600" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-black text-amber-900">{needsInfoCount}</span>
              <span className="text-xs text-amber-700 font-medium">
                {needsInfoCount === 1 ? 'scheme' : 'schemes'}
              </span>
            </div>
            <p className="mt-1 text-xs text-amber-800/80">
              {t.results.missingFieldsHint}
            </p>
          </div>

          <div
            onClick={() => setStatusFilter('DOES_NOT_MATCH')}
            className={`p-4 rounded-2xl border cursor-pointer transition-all ${
              statusFilter === 'DOES_NOT_MATCH'
                ? 'bg-slate-100 border-slate-400 ring-2 ring-slate-500/20'
                : 'bg-stone-50 border-stone-200 hover:bg-stone-100'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                {t.results.doesNotMatchTitle}
              </span>
              <XCircle className="w-4 h-4 text-stone-500" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-black text-stone-800">{doesNotMatchCount}</span>
              <span className="text-xs text-stone-600 font-medium">
                {doesNotMatchCount === 1 ? 'scheme' : 'schemes'}
              </span>
            </div>
            <p className="mt-1 text-xs text-stone-600">
              {t.results.doesNotMatchHint}
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="mb-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Status Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setStatusFilter('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              statusFilter === 'ALL'
                ? 'bg-slate-900 text-white'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            {`${t.results.filterAll} (${evaluations.length})`}
          </button>
          <button
            onClick={() => setStatusFilter('MATCH')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              statusFilter === 'MATCH'
                ? 'bg-emerald-700 text-white'
                : 'bg-white text-emerald-800 hover:bg-emerald-50 border border-emerald-200'
            }`}
          >
            {`${t.results.filterMatches} (${matchedCount})`}
          </button>
          <button
            onClick={() => setStatusFilter('NEEDS_INFORMATION')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              statusFilter === 'NEEDS_INFORMATION'
                ? 'bg-amber-700 text-white'
                : 'bg-white text-amber-800 hover:bg-amber-50 border border-amber-200'
            }`}
          >
            {`${t.results.filterNeedsInfo} (${needsInfoCount})`}
          </button>
          <button
            onClick={() => setStatusFilter('DOES_NOT_MATCH')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              statusFilter === 'DOES_NOT_MATCH'
                ? 'bg-slate-700 text-white'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            {`${t.results.filterNoMatch} (${doesNotMatchCount})`}
          </button>
        </div>

        {/* Search Input */}
        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder={t.results.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-stone-300 bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
          />
        </div>
      </div>

      {/* Category Filter Chips Bar */}
      <div className="mb-6 flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none text-xs">
        <button
          onClick={() => setCategoryFilter('ALL')}
          className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
            categoryFilter === 'ALL'
              ? 'bg-slate-900 text-white'
              : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          {t.categories.all}
        </button>
        {(
          [
            'agriculture',
            'livelihood',
            'health',
            'women_child',
            'housing',
            'social_security',
            'financial_inclusion',
            'education',
          ] as SchemeCategory[]
        ).map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              categoryFilter === cat
                ? 'bg-emerald-800 text-white'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            {getCategoryLabel(cat)}
          </button>
        ))}
      </div>

      {/* Scheme Cards Grid */}
      {filteredEvaluations.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white border border-stone-200">
          <HelpCircle className="w-10 h-10 text-stone-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900">
            {t.results.noMatchTitle}
          </h3>
          <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
            {t.results.noMatchDesc}
          </p>
          <button
            onClick={() => {
              setStatusFilter('ALL');
              setCategoryFilter('ALL');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 cursor-pointer"
          >
            {t.results.resetFilters}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvaluations.map((item) => {
            const s = item.scheme;
            const isMatch = item.status === 'MATCH';
            const isNeedsInfo = item.status === 'NEEDS_INFORMATION';

            return (
              <div
                key={s.id}
                className={`flex flex-col justify-between rounded-2xl bg-white border transition-all duration-200 hover:shadow-md ${
                  isMatch
                    ? 'border-emerald-300 hover:border-emerald-500 ring-1 ring-emerald-400/20'
                    : isNeedsInfo
                    ? 'border-amber-300 hover:border-amber-500'
                    : 'border-stone-200 opacity-90 hover:opacity-100'
                }`}
              >
                <div className="p-5">
                  {/* Category & Status Row */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider truncate">
                      {getCategoryLabel(s.category)}
                    </span>
                    {getStatusBadge(item.status)}
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-slate-900 line-clamp-2">
                    {getLocalizedText(s.name, language)}
                  </h3>
                  <div className="text-xs text-emerald-800 font-semibold mt-0.5">
                    {s.shortName}
                  </div>

                  {/* Ministry */}
                  <div className="flex items-center gap-1.5 text-xs text-stone-500 mt-2">
                    <Building2 className="w-3.5 h-3.5 shrink-0 text-stone-400" />
                    <span className="truncate">{getLocalizedText(s.administeringAuthority, language)}</span>
                  </div>

                  {/* Benefit Highlight Box */}
                  <div className="mt-4 p-3 rounded-xl bg-stone-50 border border-stone-100">
                    <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                      {t.results.keyBenefit}
                    </div>
                    <div className="text-xs font-semibold text-slate-800 mt-0.5 line-clamp-2">
                      {getLocalizedText(s.benefitsSummary, language)}
                    </div>
                  </div>

                  {/* Criteria Progress & Missing Info */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-stone-600 font-medium">
                        {t.results.statutoryCriteria}
                      </span>
                      <span className="font-bold text-slate-800">
                        {item.passedCount}/{item.totalCriteria}{' '}
                        <span className="text-stone-400 font-normal">
                          ({item.matchScorePercentage}%)
                        </span>
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-1.5 rounded-full bg-stone-100 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          isMatch
                            ? 'bg-emerald-600'
                            : isNeedsInfo
                            ? 'bg-amber-500'
                            : 'bg-slate-400'
                        }`}
                        style={{ width: `${item.matchScorePercentage}%` }}
                      />
                    </div>

                    {/* Detailed hint below progress */}
                    {isNeedsInfo && item.missingFields.length > 0 && (
                      <p className="mt-2 text-[11px] text-amber-800 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 text-amber-600 shrink-0" />
                        <span>
                          {item.unknownCount} • {t.results.missingFieldsHint}
                        </span>
                      </p>
                    )}

                    {!isMatch && !isNeedsInfo && item.failedCount > 0 && (
                      <p className="mt-2 text-[11px] text-stone-500 font-medium flex items-center gap-1">
                        <XCircle className="w-3 h-3 text-stone-400 shrink-0" />
                        <span>
                          {item.failedCount} • {t.results.doesNotMatchHint}
                        </span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="px-5 py-3.5 bg-stone-50/70 border-t border-stone-100 rounded-b-2xl flex items-center justify-between gap-2">
                  <div className="text-[11px] text-stone-400 font-medium">
                    {s.isVerified && (
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                        <ShieldCheck className="w-3 h-3" />
                        <span>{t.results.verifiedEvidence}</span>
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => onSelectScheme(item)}
                    className="px-3.5 py-1.5 rounded-xl bg-white border border-stone-300 hover:border-emerald-600 hover:bg-emerald-50 text-stone-800 hover:text-emerald-900 text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
                  >
                    <span>{t.results.inspectEvidence}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-emerald-700 rtl:rotate-180 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
