
import React from 'react';

interface SatiationNudgeProps {
  nudge: {
    fromCategory: string;
    recommendedCategory: string;
  };
  onDismiss: () => void;
}

export const SatiationNudge: React.FC<SatiationNudgeProps> = ({ nudge, onDismiss }) => {
  return (
    <div 
        className="bg-slate-700/70 backdrop-blur-md border border-slate-600 rounded-lg p-4 mb-4 flex items-center justify-between"
        style={{ animation: 'slideInUp 0.5s ease-out forwards' }}
    >
      <div className="flex items-center">
        <div className="text-2xl mr-4">💡</div>
        <div>
          <h4 className="font-bold text-slate-100">Time for a change of pace?</h4>
          <p className="text-sm text-slate-300">
            You've been enjoying <span className="font-semibold">{nudge.fromCategory}</span>. Why not try a <span className="font-semibold text-cyan-400">{nudge.recommendedCategory}</span> next?
          </p>
        </div>
      </div>
      <button onClick={onDismiss} className="text-slate-400 hover:text-white p-2 rounded-full" aria-label="Dismiss nudge">
         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};
