
import React, { useState } from 'react';
import type { MicroExperience } from '../types';
import { ExperienceCategory } from '../types';

import { Microgame } from './experiences/Microgame';
import { MicroCreation } from './experiences/MicroCreation';
import { MicroChallenge } from './experiences/MicroChallenge';
import { SocialDuel } from './experiences/SocialDuel';
import { CuriosityBites } from './experiences/CuriosityBites';
import { RelaxMode } from './experiences/RelaxMode';
import { KinaestheticPlay } from './experiences/KinaestheticPlay';
import { VocalPlay } from './experiences/VocalPlay';
import { CATEGORIES } from '../constants';

interface ExperienceRendererProps {
  experience: MicroExperience;
  onComplete: () => void;
}

const renderExperience = (experience: MicroExperience, onComplete: () => void) => {
    switch (experience.category) {
        case ExperienceCategory.Microgame: return <Microgame experience={experience} />;
        case ExperienceCategory.MicroCreation: return <MicroCreation experience={experience} />;
        case ExperienceCategory.MicroChallenge: return <MicroChallenge experience={experience} />;
        case ExperienceCategory.QuickLaughs: return <MicroChallenge experience={experience as any} />;
        case ExperienceCategory.SocialDuel: return <SocialDuel experience={experience} />;
        case ExperienceCategory.CuriosityBites: return <CuriosityBites experience={experience} />;
        case ExperienceCategory.RelaxMode: return <RelaxMode experience={experience} />;
        case ExperienceCategory.KinaestheticPlay: return <KinaestheticPlay experience={experience} />;
        case ExperienceCategory.VocalPlay: return <VocalPlay experience={experience} />;
        default:
            const _exhaustiveCheck: never = experience;
            console.error(`Unknown experience category:`, _exhaustiveCheck);
            return <div className="text-red-500">Error: Unknown experience type.</div>;
    }
}

export const ExperienceRenderer: React.FC<ExperienceRendererProps> = ({ experience, onComplete }) => {
  const [view, setView] = useState<'instructions' | 'experience'>('instructions');
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  
  const categoryTheme = CATEGORIES[experience.category];
  const Icon = categoryTheme.icon;

  const handleStart = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
        setView('experience');
    }, 400); // Match animation duration
  };

  if (view === 'instructions') {
    return (
        <div 
            className="h-full flex flex-col justify-center items-center text-center p-4 sm:p-6 overflow-y-auto" 
            style={{ 
                animation: isAnimatingOut 
                    ? 'fadeOutAndScale 0.4s ease-in forwards' 
                    : 'fadeIn 0.5s' 
            }}
        >
            <div className={`relative w-20 h-20 rounded-xl flex items-center justify-center mb-6 ${categoryTheme.shadowClass}`}>
                <div className={`absolute inset-0 rounded-xl opacity-20 ${categoryTheme.textColorClass.replace('text', 'bg')}`} />
                <Icon className={`w-12 h-12 ${categoryTheme.textColorClass}`} />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-50">{experience.title}</h2>
            <p className="text-slate-400 mt-2 max-w-md">{experience.instructions}</p>
            <button
                onClick={handleStart}
                className="mt-8 px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg bg-slate-50 text-slate-900 font-bold rounded-full transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/40 active:scale-100"
                style={{ animation: 'pulse 2s infinite' }}
            >
                Start
            </button>
             <div className="absolute bottom-4 text-center">
                <button onClick={onComplete} className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors">
                    Back to feed
                </button>
            </div>
        </div>
    )
  }

  return (
    <div className="h-full flex flex-col" style={{ animation: 'fadeInAndScale 0.5s ease-out forwards' }}>
        <div className="flex-grow">
             {renderExperience(experience, onComplete)}
        </div>
        <footer className="mt-4 text-center">
            <button onClick={onComplete} className="px-6 py-2 bg-slate-800 rounded-full hover:bg-slate-700 transition-colors text-sm font-semibold">
                Finish & Return to Feed
            </button>
        </footer>
    </div>
  )
};
