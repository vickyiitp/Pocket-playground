import React, { useState, useEffect } from 'react';
import type { MicrogameData } from '../../types';
import { ScoreShareCard } from '../ScoreShareCard';

interface MicrogameProps {
  experience: MicrogameData;
}

export const Microgame: React.FC<MicrogameProps> = ({ experience }) => {
  const [score, setScore] = useState(0);
  const [dotPosition, setDotPosition] = useState({ top: '50%', left: '50%' });
  const [view, setView] = useState<'playing' | 'gameOver' | 'sharing'>('playing');
  const [timeLeft, setTimeLeft] = useState(experience.duration);

  useEffect(() => {
    if (view !== 'playing') return;

    if (timeLeft <= 0) {
      setView('gameOver');
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, view]);


  const handleDotClick = () => {
    if (view !== 'playing') return;
    setScore(s => s + 1);
    setDotPosition({
      top: `${Math.random() * 80 + 10}%`,
      left: `${Math.random() * 80 + 10}%`,
    });
  };

  if (view === 'sharing') {
    return (
        <ScoreShareCard 
            gameTitle={experience.title}
            score={score}
            onBack={() => setView('gameOver')}
        />
    );
  }

  if (view === 'gameOver') {
    const shareMessage = experience.shareText.replace('{score}', score.toString());
    return (
      <div className="h-full flex flex-col justify-center items-center text-center">
        <h3 className="text-2xl font-bold text-yellow-400">Time's Up!</h3>
        <p className="text-4xl font-bold mt-2">{score}</p>
        <p className="text-lg text-gray-400">points</p>
        <p className="text-sm text-gray-500 max-w-sm mt-4 italic">"{shareMessage}"</p>
         <button 
            onClick={() => setView('sharing')}
            className="mt-6 px-6 py-3 font-semibold rounded-full bg-purple-600 hover:bg-purple-700 transition-colors"
        >
            Share Score
        </button>
      </div>
    );
  }

  return (
    <div className="h-full relative bg-gray-900 rounded-lg">
      <div className="absolute top-2 left-3 text-xl font-bold text-white">⏱️ {timeLeft}</div>
      <div className="absolute top-2 right-3 text-xl font-bold text-white">Score: {score}</div>
      <button
        onClick={handleDotClick}
        className="absolute w-12 h-12 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all duration-100 ease-out shadow-lg hover:scale-110"
        style={{ top: dotPosition.top, left: dotPosition.left }}
        aria-label="Tap the dot"
      />
    </div>
  );
};