import React from 'react';

export const SkeletonCard: React.FC = () => {
  return (
    <div 
        className="p-3 flex flex-col h-full bg-[var(--card-bg)] backdrop-blur-xl rounded-2xl border border-[var(--card-border)] animate-pulse"
        aria-hidden="true"
    >
        <header className="flex justify-between items-start">
          <div className="w-10 h-10 rounded-lg bg-slate-700"></div>
          <div className="text-right space-y-2">
              <div className="h-3 w-16 bg-slate-700 rounded"></div>
              <div className="h-3 w-10 bg-slate-700 rounded"></div>
          </div>
        </header>
        <main className="mt-3 flex-grow space-y-2">
          <div className="h-5 w-3/4 bg-slate-700 rounded"></div>
          <div className="h-4 w-1/2 bg-slate-700 rounded"></div>
        </main>
        <footer className="mt-3 flex justify-between items-center">
          <div className="h-4 w-8 bg-slate-700 rounded"></div>
          <div className="h-6 w-12 bg-slate-700 rounded-full"></div>
        </footer>
    </div>
  );
};