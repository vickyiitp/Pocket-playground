import React, { useState } from 'react';
import { Card } from './components/Card';
import type { MicroExperience, ActiveFilterType } from './types';
import { ExperienceCategory } from './types';
import { INITIAL_EXPERIENCES } from './constants';
import { useSession } from './hooks/useSession';
import { IntentGate } from './components/IntentGate';
import { EndOfSessionModal } from './components/EndOfSessionModal';
import { GuidedTransitionTool } from './components/GuidedTransitionTool';
import { SatiationNudge } from './components/SatiationNudge';
import { LandingPage } from './components/LandingPage';
import { fetchMoreExperiences } from './services/apiService';
import { SkeletonCard } from './components/SkeletonCard';

const VIBE_FILTERS: { name: string; filter: ActiveFilterType }[] = [
    { name: 'All', filter: 'All' },
    {
        name: "Challenge Me",
        filter: [ExperienceCategory.Microgame, ExperienceCategory.MicroChallenge, ExperienceCategory.KinaestheticPlay],
    },
    {
        name: "Need a Laugh",
        filter: [ExperienceCategory.QuickLaughs, ExperienceCategory.SocialDuel],
    },
    {
        name: "Zone Out & Relax",
        filter: [ExperienceCategory.RelaxMode, ExperienceCategory.MicroCreation],
    },
    {
        name: "Learn a Thing",
        filter: [ExperienceCategory.CuriosityBites, ExperienceCategory.VocalPlay],
    }
];

const PocketPlaygroundLogo = () => (
  <div className="anim-logo-intro" style={{ ['--anim-delay' as any]: '0.2s' }}>
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.5 7.5L4.5 10.5V19.5H13.5L16.5 16.5V7.5H7.5Z" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16.5 7.5L13.5 10.5M13.5 10.5L7.5 16.5M13.5 10.5V16.5H7.5" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10.5 4.5H19.5V13.5L16.5 16.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div>
);


const App: React.FC = () => {
  const [experiences, setExperiences] = useState<MicroExperience[]>(INITIAL_EXPERIENCES);
  const [selectedExperience, setSelectedExperience] = useState<MicroExperience | null>(null);
  const [showLanding, setShowLanding] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  
  const { 
    appState, 
    sessionTimeLeft,
    noveltyTokens,
    satiationNudge,
    initialSessionFilter,
    spendTokens,
    addExperienceToHistory,
    clearSatiationNudge
  } = useSession();

  const [activeFilter, setActiveFilter] = useState<ActiveFilterType>(initialSessionFilter);

  const handleSelectExperience = (experience: MicroExperience) => {
    if (noveltyTokens >= experience.noveltyCost) {
      setSelectedExperience(experience);
    } else {
      console.log("Not enough novelty tokens.");
    }
  };

  const handleCloseExperience = () => {
    if (selectedExperience) {
      addExperienceToHistory(selectedExperience);
    }
    setSelectedExperience(null);
  };
  
  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    const newExperiences = await fetchMoreExperiences();
    setExperiences(prev => [...prev, ...newExperiences]);
    setIsLoadingMore(false);
  };

  const filteredExperiences = experiences.filter(exp => {
    if (activeFilter === 'All') return true;
    if (Array.isArray(activeFilter)) {
      return activeFilter.includes(exp.category);
    }
    return exp.category === activeFilter;
  });

  // Debug filtered experiences and filter state
  React.useEffect(() => {
    // Keep this lightweight; remove after investigating
    console.debug('[Feed] experiences:', experiences.length, 'filtered:', filteredExperiences.length, 'filter:', activeFilter);
  }, [experiences, filteredExperiences, activeFilter]);

  // Debugging log to check filteredExperiences
  console.log('Filtered Experiences:', filteredExperiences);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleFilterClick = (filter: ActiveFilterType) => {
    setActiveFilter(filter);
    if (satiationNudge) {
      if (Array.isArray(filter) && filter.includes(satiationNudge.recommendedCategory as ExperienceCategory)) {
        clearSatiationNudge();
      }
    }
  };
  
  if (showLanding) return <LandingPage onEnter={() => setShowLanding(false)} />;
  if (appState === 'INTENT_GATE') return <IntentGate />;
  if (appState === 'GUIDED_TRANSITION') return <GuidedTransitionTool />;

  return (
    <div className="flex flex-col h-full">
      <header 
        className="sticky top-0 z-20 bg-[rgba(10,10,20,0.8)] backdrop-blur-lg pt-4 pb-3 px-4 sm:px-6 border-b border-slate-300/10"
      >
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
            <div className="relative group anim-slide-up" style={{ ['--anim-delay' as any]: '0.1s' }}>
                <div className="flex items-center gap-2 cursor-help text-base sm:text-lg font-bold bg-slate-800/70 px-4 py-1.5 rounded-full border border-slate-700 text-yellow-300">
                    <span>💎 {noveltyTokens}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-slate-400 group-hover:text-slate-200 transition-colors">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.852l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                    </svg>
                </div>
                <div className="absolute top-full left-0 mt-2 w-60 p-2 bg-slate-900 border border-slate-700 rounded-md shadow-lg text-center text-xs text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-30">
                    Novelty Gems are used for high-intensity games and creative tools. They recharge every few hours.
                </div>
            </div>
             <div className="text-center order-first sm:order-none">
                <div className="flex items-center justify-center gap-2">
                    <PocketPlaygroundLogo />
          <h1
            className="text-2xl sm:text-3xl font-bold tracking-tight anim-slide-up"
            style={{ ['--anim-delay' as any]: '0.3s', ['--anim-duration' as any]: '0.8s' }}
          >
                        <span
              className="bg-gradient-to-r from-slate-200 via-violet-400 to-cyan-400 bg-clip-text text-transparent animate-shimmer"
                        >
                            PocketPlayground
                        </span>
                    </h1>
                </div>
                <p 
                  className="text-xs text-slate-400 mt-1 anim-slide-up"
                  style={{ ['--anim-delay' as any]: '0.5s', ['--anim-duration' as any]: '0.8s' }}
                >
                  Your mindful space for addiction-free micro-experiences.
                </p>
            </div>
            <div 
              className="text-base sm:text-lg font-bold bg-slate-800/70 px-4 py-1.5 rounded-full border border-slate-700 anim-slide-up"
              style={{ ['--anim-delay' as any]: '0.1s' }}
            >
                ⏱️ {formatTime(sessionTimeLeft)}
            </div>
        </div>
       
        <nav className="mt-4 overflow-x-auto pb-1">
          <ul className="flex justify-center space-x-2 md:space-x-4 whitespace-nowrap text-xs md:text-sm">
            {VIBE_FILTERS.map((vibe, idx) => {
              const isActive = JSON.stringify(activeFilter) === JSON.stringify(vibe.filter);
              const hasNudge = satiationNudge && Array.isArray(vibe.filter) && vibe.filter.includes(satiationNudge.recommendedCategory as ExperienceCategory);

              return (
                <li key={vibe.name} className="anim-slide-up" style={{ ['--anim-delay' as any]: `${(idx * 0.05 + 0.6).toFixed(2)}s` }}>
                  <button
                    onClick={() => handleFilterClick(vibe.filter)}
                    className={`px-3 py-1.5 font-semibold rounded-md transition-all duration-300 relative ${
                      isActive
                        ? 'text-slate-50'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {vibe.name}
                    {isActive && 
                      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-slate-50 rounded-full"></span>
                    }
                    {hasNudge && (
                      <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
      
      <main className="flex-grow p-4 sm:p-6 overflow-y-auto">
        {satiationNudge && <SatiationNudge nudge={satiationNudge} onDismiss={clearSatiationNudge} />}
        
        <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {filteredExperiences.map((exp, idx) => (
                    <div
                      key={exp.id}
                      className="anim-pop-in"
                      style={{ ['--anim-delay' as any]: `${(idx * 0.05).toFixed(2)}s` }}
                    >
                      <Card
                          experience={exp}
                          onSelect={handleSelectExperience}
                          hasEnoughTokens={noveltyTokens >= exp.noveltyCost}
                      />
                    </div>
                ))}
                {isLoadingMore && (
                    <>
                        {[...Array(4)].map((_, idx) => (
                           <SkeletonCard key={`skel-${idx}`} />
                        ))}
                    </>
                )}
            </div>

            {filteredExperiences.length === 0 && !isLoadingMore && (
                <div className="text-center py-20 anim-fade-in">
                    <p className="text-2xl font-bold text-slate-400">No Experiences Found</p>
                    <p className="text-slate-500 mt-2">Try selecting a different category to explore.</p>
                </div>
            )}

            {!isLoadingMore && (
                <div className="text-center mt-10">
                    <button
                        onClick={handleLoadMore}
                        className="px-8 py-3 font-semibold rounded-full bg-slate-800/70 border border-slate-700 text-slate-300 hover:bg-slate-700/90 hover:border-slate-600 transition-all duration-300"
                    >
                        Load More Experiences
                    </button>
                </div>
            )}
        </section>
      </main>

      {selectedExperience && (
  <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-30 flex items-center justify-center p-4 anim-pop-in" style={{ ['--anim-duration' as any]: '0.5s' }}>
           <div className="w-full max-w-2xl h-[90vh] max-h-[700px] bg-slate-900 rounded-2xl shadow-2xl relative border border-slate-700/80 flex flex-col overflow-y-auto">
                 <button 
                    onClick={handleCloseExperience} 
                    className="absolute top-3 right-3 text-slate-400 hover:text-white z-10 p-2 rounded-full bg-slate-800/50 hover:bg-slate-700/70 transition-colors"
                    aria-label="Close"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                 </button>
                 <Card 
                    experience={selectedExperience} 
                    isSelected={true} 
                    onSelect={() => {}} 
                    onComplete={() => {
                      spendTokens(selectedExperience.noveltyCost);
                      handleCloseExperience();
                    }}
                />
            </div>
        </div>
      )}

      {appState === 'SESSION_ENDED' && <EndOfSessionModal />}
    </div>
  );
};

export default App;