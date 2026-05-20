
import React, { useState, useEffect } from 'react';
import type { CuriosityBitesData } from '../../types';
import { generateTTS } from '../../services/geminiService';
import { decode, decodeAudioData } from '../../utils/audioUtils';

interface CuriosityBitesProps {
  experience: CuriosityBitesData;
}

const SpeakerWaveIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5l.415-.207a.75.75 0 011.085.67V10.5m0 0h6m-6 0a.75.75 0 001.085.67l.415-.207M3 12a9 9 0 1018 0 9 9 0 00-18 0z" />
    </svg>
);


export const CuriosityBites: React.FC<CuriosityBitesProps> = ({ experience }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [timeLeft, setTimeLeft] = useState(experience.duration);

    useEffect(() => {
      if (timeLeft <= 0) return;
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }, [timeLeft]);

    const handlePlayAudio = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const fullText = experience.facts.join(' ');
            const base64Audio = await generateTTS(fullText);

            if (base64Audio) {
                const outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
                const audioBuffer = await decodeAudioData(decode(base64Audio), outputAudioContext, 24000, 1);
                const source = outputAudioContext.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(outputAudioContext.destination);
                source.start();
            } else {
                throw new Error("Received empty audio data.");
            }
        } catch (e) {
            console.error("Failed to play audio:", e);
            setError("Sorry, couldn't play audio.");
        } finally {
            setIsLoading(false);
        }
    };
    
    const progress = ((experience.duration - timeLeft) / experience.duration) * 100;

  return (
    <div className="h-full flex flex-col">
      <ul className="space-y-4 text-lg flex-grow overflow-y-auto pr-2">
        {experience.facts.map((fact, index) => (
          <li key={index} className="flex items-start space-x-3">
            <span className="text-green-400 font-bold text-xl mt-1">✓</span>
            <span className="text-gray-200">{fact}</span>
          </li>
        ))}
      </ul>
       <div className="w-full bg-slate-700 rounded-full h-2 my-4">
        <div 
            className="bg-green-400 h-2 rounded-full" 
            style={{ width: `${progress}%`, transition: 'width 1s linear' }}
        ></div>
      </div>
      <div className="text-center">
        <button onClick={handlePlayAudio} disabled={isLoading} className="inline-flex items-center space-x-2 px-6 py-3 font-semibold rounded-full bg-gray-700 hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            {isLoading ? (
                <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Generating...</span>
                </>
            ) : (
                <>
                    <SpeakerWaveIcon className="w-6 h-6" />
                    <span>Listen to Facts</span>
                </>
            )}
        </button>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
    </div>
  );
};
