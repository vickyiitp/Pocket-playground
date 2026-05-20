import React, { useState, useEffect } from 'react';
import type { RelaxModeData } from '../../types';

interface RelaxModeProps {
  experience: RelaxModeData;
}

export const RelaxMode: React.FC<RelaxModeProps> = ({ experience }) => {
    const [breathState, setBreathState] = useState<'in' | 'hold' | 'out'>('in');
    const [timeLeft, setTimeLeft] = useState(experience.duration);
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        if (timeLeft <= 0) {
            setIsFinished(true);
            return;
        }
        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);
    
    useEffect(() => {
        if (isFinished) return;
        
        const timings = { in: 4000, hold: 4000, out: 6000 };
        let timer: ReturnType<typeof setTimeout>;

        if (breathState === 'in') {
            timer = setTimeout(() => setBreathState('hold'), timings.in);
        } else if (breathState === 'hold') {
            timer = setTimeout(() => setBreathState('out'), timings.hold);
        } else { // 'out'
            timer = setTimeout(() => setBreathState('in'), timings.out);
        }

        return () => clearTimeout(timer);
    }, [breathState, isFinished]);

    const getText = () => {
        switch (breathState) {
            case 'in': return 'Breathe In...';
            case 'out': return 'Breathe Out...';
            case 'hold': return 'Hold';
            default: return 'Relax';
        }
    }
    
    if (isFinished) {
        return (
            <div className="h-full flex flex-col justify-center items-center text-center">
                <h3 className="text-3xl font-bold text-cyan-400">Session Complete</h3>
                <p className="text-lg mt-2 text-slate-300">We hope you feel refreshed and centered.</p>
            </div>
        );
    }

    const breathDuration = breathState === 'in' ? '4s' : breathState === 'out' ? '6s' : '4s';
    const scaleClass = breathState === 'in' ? 'scale-100' : 'scale-[0.6]';

  return (
    <div className="h-full flex flex-col justify-center items-center text-center overflow-hidden">
        <div className="absolute top-4 text-lg text-white bg-slate-800/80 px-4 py-1 rounded-full">
            ⏱️ {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
        </div>
        <div className="relative w-56 h-56 flex items-center justify-center">
            {/* Base Glow */}
            <div
                className="absolute w-full h-full bg-cyan-500/30 rounded-full transition-transform ease-[cubic-bezier(0.42,0,0.58,1)] blur-2xl"
                style={{ transform: scaleClass, transitionDuration: breathDuration }}
            />
             {/* Core Orb */}
            <div
                className="absolute w-4/5 h-4/5 bg-cyan-400 rounded-full transition-transform ease-[cubic-bezier(0.42,0,0.58,1)]"
                style={{ transform: scaleClass, transitionDuration: breathDuration }}
            />
            {/* Inner Glow */}
             <div
                className="absolute w-1/2 h-1/2 bg-cyan-200/50 rounded-full transition-transform ease-[cubic-bezier(0.42,0,0.58,1)] blur-lg"
                style={{ transform: scaleClass, transitionDuration: breathDuration }}
            />

            <span className="relative text-2xl font-bold text-white z-10 transition-opacity duration-500">
              {getText()}
            </span>
        </div>
    </div>
  );
};