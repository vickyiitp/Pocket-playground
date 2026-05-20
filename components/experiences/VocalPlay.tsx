
import React, { useState, useEffect, useRef } from 'react';
import type { VocalPlayData } from '../../types';

interface VocalPlayProps {
  experience: VocalPlayData;
}

export const VocalPlay: React.FC<VocalPlayProps> = ({ experience }) => {
  const [status, setStatus] = useState<'ready' | 'listening' | 'finished'>('ready');
  const [error, setError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(experience.duration);
  const streamRef = useRef<MediaStream | null>(null);

  const startListening = async () => {
    setError(null);
    try {
      // Simple microphone access request to ensure permission is granted.
      // A real implementation would use Web Speech API or send audio to Gemini.
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      setTimeLeft(experience.duration);
      setStatus('listening');
    } catch (err) {
      console.error("Microphone access denied:", err);
      setError("Microphone access was denied. Please enable it in your browser settings.");
    }
  };

  useEffect(() => {
    if (status === 'listening') {
      if (timeLeft <= 0) {
        setStatus('finished');
        return;
      }
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [status, timeLeft]);
  
    useEffect(() => {
    return () => {
      // Cleanup mic stream on component unmount
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  if (status === 'finished') {
    return (
      <div className="h-full flex flex-col justify-center items-center text-center">
        <h3 className="text-2xl font-bold text-green-400">Time's Up!</h3>
        <p className="text-4xl font-bold mt-2">Great Effort!</p>
        <p className="text-sm text-gray-500 max-w-sm mt-4 italic">"{experience.shareText}"</p>
      </div>
    );
  }

  if (status === 'listening') {
      return (
         <div className="h-full flex flex-col justify-center items-center text-center relative">
            <div className="absolute top-4 text-2xl font-bold text-white bg-black/50 px-4 py-2 rounded-lg">⏱️ {timeLeft}</div>
            <div className="animate-pulse flex flex-col items-center">
                 <svg className="w-16 h-16 text-orange-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m12 7.5v-1.5a6 6 0 00-6-6v-1.5a6 6 0 00-6 6v1.5m6 7.5a6 6 0 003.75-10.604M12 9.75v-1.5a6 6 0 016 6v1.5a6 6 0 01-6-6z" />
                </svg>
                <p className="text-2xl font-bold text-orange-400 mt-4">Listening...</p>
            </div>
         </div>
      )
  }

  return (
    <div className="h-full flex flex-col justify-center items-center text-center p-4 overflow-y-auto">
        <h3 className="text-2xl font-bold text-yellow-400 mb-4">{experience.title}</h3>
        <p className="text-slate-400 mb-6 max-w-sm">{experience.instructions}</p>
        <button onClick={startListening} className="px-6 py-3 text-lg font-bold rounded-full bg-orange-600 hover:bg-orange-700 transition-colors">
            Start Listening
        </button>
        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
    </div>
  );
};
