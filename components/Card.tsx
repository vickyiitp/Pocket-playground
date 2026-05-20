import React from 'react';
import type { MicroExperience } from '../types';
import { ExperienceRenderer } from './ExperienceRenderer';
import { CATEGORIES } from '../constants';

interface CardProps {
  experience: MicroExperience;
  onSelect: (experience: MicroExperience) => void;
  onComplete?: () => void;
  isSelected?: boolean;
  hasEnoughTokens?: boolean;
  isFeatured?: boolean;
}

export const Card: React.FC<CardProps> = ({ experience, onSelect, onComplete, isSelected = false, hasEnoughTokens = true, isFeatured = false }) => {
  const { title, subtitle, duration, category, noveltyCost } = experience;
  const categoryTheme = CATEGORIES[category];
  const Icon = categoryTheme.icon;

  if (isSelected) {
    return (
        <div className="h-full flex flex-col text-white p-4 pt-10 md:p-6 md:pt-12">
            <ExperienceRenderer experience={experience} onComplete={onComplete!} />
        </div>
    );
  }
  
  const isDisabled = !hasEnoughTokens;
  const cardStyle = { '--glow-color': categoryTheme.glowColorVar } as React.CSSProperties;

  const cardClasses = `
    relative text-white h-full transition-all duration-300 ease-out group
    bg-[var(--card-bg)] backdrop-blur-xl rounded-2xl
    border border-[var(--card-border)]
    ${isDisabled 
      ? 'opacity-60 cursor-not-allowed' 
      : `cursor-pointer 
         hover:border-[var(--card-hover-border)] 
         hover:scale-[1.03] 
         hover:shadow-[0_0_25px_var(--glow-color)]
         active:scale-[1.01] active:duration-150`
    }
  `;

  if (isFeatured) {
    return (
        <div 
            className={`${cardClasses} p-4 flex flex-col sm:flex-row`}
            style={cardStyle}
            onClick={() => !isDisabled && onSelect(experience)}
            role={!isDisabled ? "button" : undefined}
            tabIndex={!isDisabled ? 0 : -1}
            aria-label={!isDisabled ? `Start featured experience: ${title}` : `Cannot start ${title}, not enough tokens`}
        >
            <div className="flex-shrink-0 w-full sm:w-24 mb-4 sm:mb-0 sm:mr-4 flex sm:flex-col items-center justify-between sm:justify-start">
                 <div className={`relative w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300`}>
                    <div className={`absolute inset-0 rounded-xl opacity-20 ${categoryTheme.textColorClass.replace('text', 'bg')}`} />
                    <Icon className={`w-7 h-7 transition-colors ${categoryTheme.textColorClass}`} />
                </div>
                <div className="text-center sm:mt-3">
                    <p className={`text-sm font-bold ${categoryTheme.textColorClass}`}>{category}</p>
                    <p className="text-sm text-slate-400">{duration} sec</p>
                </div>
            </div>
            <div className="flex flex-col flex-grow text-center sm:text-left">
                <main className="flex-grow">
                    <h3 className="text-lg font-bold text-slate-100">{title}</h3>
                    <p className="text-sm text-slate-400 mt-1">{subtitle}</p>
                </main>
                <footer className="mt-4 flex justify-between items-center">
                    <span className={`text-sm font-semibold ${noveltyCost > 0 ? 'text-yellow-400' : 'text-green-400'}`}>
                        {noveltyCost > 0 ? `💎 ${noveltyCost}` : 'Free'}
                    </span>
                    <div className={`text-sm font-semibold text-slate-200 bg-slate-700/50 px-5 py-2 rounded-full transition-colors ${!isDisabled && 'group-hover:bg-slate-600/80 group-hover:text-white'}`}>
                        {isDisabled ? 'Locked' : 'Start'}
                    </div>
                </footer>
            </div>
        </div>
    );
  }

  return (
    <div 
        className={`${cardClasses} p-3 flex flex-col`}
        style={cardStyle}
        onClick={() => !isDisabled && onSelect(experience)}
        role={!isDisabled ? "button" : undefined}
        tabIndex={!isDisabled ? 0 : -1}
        aria-label={!isDisabled ? `Start experience: ${title}` : `Cannot start ${title}, not enough tokens`}
    >
      <header className="flex justify-between items-start">
        <div className={`relative w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300`}>
           <div className={`absolute inset-0 rounded-lg opacity-20 ${categoryTheme.textColorClass.replace('text', 'bg')}`} />
           <Icon className={`w-6 h-6 transition-colors ${categoryTheme.textColorClass}`} />
        </div>
        <div className="text-right">
            <p className={`text-xs font-bold ${categoryTheme.textColorClass}`}>{category}</p>
            <p className="text-xs text-slate-400">{duration} sec</p>
        </div>
      </header>
      <main className="mt-3 flex-grow">
        <h3 className="text-lg font-bold text-slate-100">{title}</h3>
        <p className="text-sm text-slate-400 mt-1">{subtitle}</p>
      </main>
      <footer className="mt-3 flex justify-between items-center">
        <span className={`text-xs font-semibold ${noveltyCost > 0 ? 'text-yellow-400' : 'text-green-400'}`}>
            {noveltyCost > 0 ? `💎 ${noveltyCost}` : 'Free'}
        </span>
        <span className={`text-xs font-semibold text-slate-300 bg-slate-700/50 px-3 py-1 rounded-full transition-colors ${!isDisabled && 'group-hover:bg-slate-600/80 group-hover:text-white'}`}>
            {isDisabled ? 'Locked' : 'Start'}
        </span>
      </footer>
    </div>
  );
};