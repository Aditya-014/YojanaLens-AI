/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { LandingHero } from './components/LandingHero.tsx';
import { ProfileForm } from './components/ProfileForm.tsx';
import { SchemeResults } from './components/SchemeResults.tsx';
import { SchemeDetailModal } from './components/SchemeDetailModal.tsx';
import { ModelDiagnosticsView } from './components/ModelDiagnosticsView.tsx';
import { TestDashboardView } from './components/TestDashboardView.tsx';
import { PrivacyAndAboutView } from './components/PrivacyAndAboutView.tsx';
import { Footer } from './components/Footer.tsx';

import { UserProfile, initialProfile } from './types/profile.ts';
import { SchemeEvaluation } from './types/scheme.ts';
import { VERIFIED_SCHEMES } from './data/verifiedSchemes.ts';
import { evaluateAllSchemes } from './engine/eligibilityEngine.ts';

export default function App() {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [currentTab, setCurrentTab] = useState<'home' | 'form' | 'schemes' | 'models' | 'tests' | 'about'>('home');
  const [profile, setProfile] = useState<UserProfile>(() => {
    // Attempt to load from sessionStorage for page refresh preservation (zero persistent server storage)
    try {
      const saved = sessionStorage.getItem('yojanalens_profile');
      if (saved) return JSON.parse(saved);
    } catch {}
    return initialProfile;
  });

  const [evaluations, setEvaluations] = useState<SchemeEvaluation[]>(() => {
    return evaluateAllSchemes(profile, VERIFIED_SCHEMES);
  });

  const [selectedSchemeForDetail, setSelectedSchemeForDetail] = useState<SchemeEvaluation | null>(null);

  // Recalculate deterministic evaluation whenever profile changes
  const handleProfileChange = (updatedProfile: UserProfile) => {
    setProfile(updatedProfile);
    try {
      sessionStorage.setItem('yojanalens_profile', JSON.stringify(updatedProfile));
    } catch {}
    const evals = evaluateAllSchemes(updatedProfile, VERIFIED_SCHEMES);
    setEvaluations(evals);
  };

  const handleFormSubmit = () => {
    const evals = evaluateAllSchemes(profile, VERIFIED_SCHEMES);
    setEvaluations(evals);
    setCurrentTab('schemes');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const matchesCount = evaluations.filter((e) => e.status === 'MATCH').length;

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 font-sans selection:bg-emerald-600 selection:text-white">
      {/* Top Sticky Navigation */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        language={language}
        onToggleLanguage={() => setLanguage((l) => (l === 'en' ? 'hi' : 'en'))}
        matchesCount={matchesCount}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <div>
            <LandingHero
              onStartForm={() => {
                setCurrentTab('form');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onBrowseSchemes={() => {
                setCurrentTab('schemes');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              language={language}
              totalVerifiedSchemes={VERIFIED_SCHEMES.length}
            />

            {/* In-page preview of evaluated schemes */}
            <div className="border-t border-stone-200/80 bg-white/50">
              <SchemeResults
                evaluations={evaluations}
                onSelectScheme={(item) => setSelectedSchemeForDetail(item)}
                onEditProfile={() => {
                  setCurrentTab('form');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                language={language}
              />
            </div>
          </div>
        )}

        {currentTab === 'form' && (
          <ProfileForm
            profile={profile}
            onChangeProfile={handleProfileChange}
            onSubmit={handleFormSubmit}
            language={language}
          />
        )}

        {currentTab === 'schemes' && (
          <SchemeResults
            evaluations={evaluations}
            onSelectScheme={(item) => setSelectedSchemeForDetail(item)}
            onEditProfile={() => {
              setCurrentTab('form');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            language={language}
          />
        )}

        {currentTab === 'models' && <ModelDiagnosticsView language={language} />}

        {currentTab === 'tests' && <TestDashboardView language={language} />}

        {currentTab === 'about' && <PrivacyAndAboutView language={language} />}
      </main>

      {/* Scheme Detail & Evidence Modal */}
      {selectedSchemeForDetail && (
        <SchemeDetailModal
          evaluation={selectedSchemeForDetail}
          onClose={() => setSelectedSchemeForDetail(null)}
          language={language}
        />
      )}

      {/* Footer */}
      <Footer
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        language={language}
      />
    </div>
  );
}
