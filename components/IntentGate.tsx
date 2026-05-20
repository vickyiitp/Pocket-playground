import React from 'react';
import { useSession } from '../hooks/useSession';
import { ExperienceCategory, ActiveFilterType } from '../types';

const VIBES: {
    title: string;
    subtitle: string;
    duration: number;
    filter: ActiveFilterType;
    icon: string;
    gradient: string;
    glowVar: string;
}[] = [
    {
        title: "Challenge Me",
        subtitle: "Test your skills & reflexes.",
        duration: 480,
        filter: [ExperienceCategory.Microgame, ExperienceCategory.MicroChallenge, ExperienceCategory.KinaestheticPlay],
        icon: '🏆',
        gradient: 'from-amber-500 to-red-600',
        glowVar: 'var(--category-microchallenge-glow-color)',
    },
    {
        title: "Need a Laugh",
        subtitle: "Memes, jokes, and funny trivia.",
        duration: 300,
        filter: [ExperienceCategory.QuickLaughs, ExperienceCategory.SocialDuel],
        icon: '😂',
        gradient: 'from-yellow-400 to-orange-500',
        glowVar: 'var(--category-quicklaughs-glow-color)',
    },
    {
        title: "Zone Out & Relax",
        subtitle: "Calm your mind & get creative.",
        duration: 600,
        filter: [ExperienceCategory.RelaxMode, ExperienceCategory.MicroCreation],
        icon: '🧘',
        gradient: 'from-cyan-400 to-blue-600',
        glowVar: 'var(--category-relax-glow-color)',
    },
    {
        title: "Learn a Thing",
        subtitle: "Bite-sized facts and knowledge.",
        duration: 300,
        filter: [ExperienceCategory.CuriosityBites, ExperienceCategory.VocalPlay],
        icon: '💡',
        gradient: 'from-green-400 to-teal-500',
        glowVar: 'var(--category-curiosity-glow-color)',
    }
];

export const IntentGate: React.FC = () => {
    const { startSession } = useSession();

    return (
       <div className="fixed inset-0 bg-slate-900 z-50 flex flex-col items-center justify-center p-4 text-center" style={{ animation: 'fadeIn 1s ease-out' }}>
           <div className="absolute inset-0 bg-grid-slate-800/[0.2] pointer-events-none"></div>
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(192,132,252,0.1)_0%,rgba(10,10,20,0)_50%)] pointer-events-none"></div>

            <h1 
                className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-r from-slate-200 via-slate-400 to-slate-200"
                style={{
                    backgroundSize: '200% auto',
                    animation: 'text-gradient-anim 3s linear infinite',
                }}
            >
                BREAK THE SCROLL
            </h1>
            <p className="text-slate-400 mb-12 max-w-lg text-lg">
                Your attention is valuable. Spend it on something better.
                <br/>
                <span className="font-bold">What's your vibe right now?</span>
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full max-w-6xl">
                {VIBES.map((vibe, idx) => (
                    <button
                        key={vibe.title}
                        onClick={() => startSession(vibe.duration, vibe.filter)}
                        className="intent-button-glow p-6 bg-slate-900/50 border border-slate-700 rounded-2xl text-center hover:border-slate-500 relative group overflow-hidden"
                        style={{ 
                            // Keep the entrance animation, but do not force opacity to 0 in case animations are disabled
                            animation: `slideInUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) ${idx * 0.1 + 0.3}s forwards`,
                            '--glow-color': vibe.glowVar
                        } as React.CSSProperties}
                    >
                        <div className="glow-fx"></div>
                        <div className={`absolute -inset-px rounded-2xl bg-gradient-to-br ${vibe.gradient} opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-300`}></div>
                        <div className="relative z-10 flex flex-col items-center">
                            <div className="text-5xl mb-4">{vibe.icon}</div>
                            <h2 className="text-2xl font-bold text-slate-100">{vibe.title}</h2>
                            <p className="text-slate-400 mt-1 text-sm">{vibe.subtitle}</p>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};