import React, { useState, useEffect } from 'react';
import type { SocialDuelData } from '../../types';

type DuelState = 'question' | 'waiting' | 'result';

export const SocialDuel: React.FC<{ experience: SocialDuelData }> = ({ experience }) => {
  const [state, setState] = useState<DuelState>('question');
  const [choice, setChoice] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(experience.duration);

  const handleChoice = (index: number) => {
    setChoice(index);
    setState('waiting');
  };

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (state === 'waiting') {
      timer = setTimeout(() => {
        setState('result');
      }, 1500);
    }
    return () => clearTimeout(timer);
  }, [state]);
  
  useEffect(() => {
    if (state !== 'question' || timeLeft <= 0) {
      if (timeLeft <= 0 && state === 'question') {
        handleChoice(-1); // Use -1 to indicate timeout
      }
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [state, timeLeft]);


  const renderContent = () => {
    switch (state) {
      case 'question':
        return (
          <div className="relative w-full h-full flex flex-col justify-center items-center">
            <div className="absolute top-4 right-4 text-xl font-bold text-white bg-slate-800/80 px-3 py-1 rounded-lg">⏱️ {timeLeft}</div>
            <h3 className="text-2xl font-bold text-center mb-6">{experience.question}</h3>
            <div className="grid grid-cols-2 gap-4 w-full max-w-md">
              {experience.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleChoice(index)}
                  className="p-4 text-lg font-semibold rounded-lg bg-gray-700 hover:bg-purple-600 transition-colors h-24 flex items-center justify-center text-center"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );
      case 'waiting':
        return (
          <div className="text-center">
            <h3 className="text-xl font-bold">Waiting for opponent...</h3>
            <div className="mt-4 animate-pulse"> opponent is choosing </div>
          </div>
        );
      case 'result':
        if (choice === -1) {
          return (
            <div className="text-center">
              <h3 className="text-4xl font-bold text-yellow-400">Time's Up!</h3>
              <p className="mt-2 text-lg">The correct answer was: <span className="font-bold">{experience.options[experience.correctOption]}</span></p>
            </div>
          );
        }
        const isCorrect = choice === experience.correctOption;
        return (
          <div className="text-center">
            <h3 className={`text-4xl font-bold ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
              {isCorrect ? 'You Win!' : 'You Lose!'}
            </h3>
            <p className="mt-2 text-lg">The correct answer was: <span className="font-bold">{experience.options[experience.correctOption]}</span></p>
          </div>
        );
    }
  };

  return (
    <div className="h-full flex flex-col justify-center items-center">
      {renderContent()}
    </div>
  );
};