import React from 'react';
import { useSession } from '../hooks/useSession';

export const EndOfSessionModal: React.FC = () => {
  const { extendSession, startGuidedTransition, extensionsRemaining } = useSession();

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 flex items-end sm:items-center justify-center p-4" style={{ animation: 'fadeIn 0.5s ease-out' }}>
      <div 
        className="w-full max-w-md bg-slate-900 rounded-2xl shadow-2xl p-8 text-center border border-slate-700/80"
        style={{ animation: 'slideInUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards' }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">Your session is up!</h2>
        <p className="text-slate-400 mt-3">
          Taking breaks is key to staying sharp. We hope this was a refreshing pause in your day.
        </p>

        <div className="flex flex-col space-y-4 mt-8">
          <button
            onClick={startGuidedTransition}
            className="w-full px-6 py-4 bg-slate-50 text-slate-900 font-bold rounded-full text-lg hover:scale-105 active:scale-100 transition-transform relative overflow-hidden group"
          >
             <span className="absolute inset-0 bg-gradient-to-r from-white to-slate-200 opacity-0 group-hover:opacity-100 transition-opacity"></span>
             <span className="relative">Finish For Now</span>
          </button>
          
          <button
            onClick={extendSession}
            disabled={extensionsRemaining <= 0}
            className="w-full px-6 py-3 bg-slate-700/70 text-slate-300 font-semibold rounded-full hover:bg-slate-600/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {extensionsRemaining > 0
              ? `Add 5 More Minutes (${extensionsRemaining} left today)`
              : 'No extensions remaining'}
          </button>
        </div>
      </div>
    </div>
  );
};