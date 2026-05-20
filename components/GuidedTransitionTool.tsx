import React, { useState, useEffect, useRef } from 'react';
import { useSession } from '../hooks/useSession';
import { generateGuidedTransitionAudio } from '../services/geminiService';
import { decode, decodeAudioData } from '../utils/audioUtils';

const SCRIPT = `
(Calm, gentle voice over soft ambient music)
"Find a comfortable position, and gently close your eyes. Take a slow, deep breath in... and now, a long, full breath out. You've just spent some time in a digital space. Now, let's bring our awareness back to the room around us. Notice the feeling of the chair beneath you... the temperature of the air on your skin. Wiggle your fingers and toes. You are present, here and now. When you're ready, slowly open your eyes. Carry this calm with you into the rest of your day."
`;

const PlayIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.647c1.295.742 1.295 2.545 0 3.286L7.279 20.99c-1.25.717-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
    </svg>
);


export const GuidedTransitionTool: React.FC = () => {
    const { resetApp } = useSession();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    
    const audioContextRef = useRef<AudioContext | null>(null);
    const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);


    const handlePlayAudio = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const base64Audio = await generateGuidedTransitionAudio(SCRIPT);

            if (base64Audio) {
                if (!audioContextRef.current) {
                    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
                }
                const audioContext = audioContextRef.current;
                const audioBuffer = await decodeAudioData(decode(base64Audio), audioContext, 24000, 1);
                
                if (audioSourceRef.current) {
                    audioSourceRef.current.stop();
                }

                const source = audioContext.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(audioContext.destination);
                source.start();
                setIsPlaying(true);
                source.onended = () => setIsPlaying(false);
                audioSourceRef.current = source;
            } else {
                throw new Error("Received empty audio data.");
            }
        } catch (e) {
            console.error("Failed to play audio:", e);
            setError("Sorry, couldn't play audio at this time.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 z-50 flex flex-col items-center justify-center p-4 text-center transition-opacity duration-500" style={{animation: 'fadeIn 1s ease-out'}}>
             <div className="absolute inset-0 bg-grid-slate-700/[0.05]"></div>
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(30,64,175,0.3)_0%,rgba(10,10,20,0)_50%)] animate-[aurora_15s_infinite_linear]"></div>

            <h1 className="text-4xl font-bold text-slate-100 mb-4">Let's Wind Down</h1>
            <p className="text-slate-300 max-w-md mb-8">
                Take a moment to transition back to your day. Press play for a short guided audio exercise.
            </p>

            <button
                onClick={handlePlayAudio}
                disabled={isLoading || isPlaying}
                className="w-24 h-24 rounded-full bg-slate-50 text-slate-900 flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20"
                aria-label="Play guided audio"
            >
                {isLoading ? (
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-slate-900"></div>
                ) : (
                    <PlayIcon className="w-12 h-12"/>
                )}
            </button>
            {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
            {isPlaying && <p className="text-cyan-400 text-sm mt-4 animate-pulse">Playing...</p>}
            
            <button
                onClick={resetApp}
                className="absolute bottom-8 px-6 py-2 bg-slate-800/50 rounded-full hover:bg-slate-700/70 transition-colors text-sm font-semibold text-slate-300"
            >
                Skip & Start New Session
            </button>
        </div>
    );
};