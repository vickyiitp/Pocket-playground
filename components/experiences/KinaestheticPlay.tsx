
import React, { useState, useRef, useEffect } from 'react';
import type { KinaestheticPlayData } from '../../types';

interface KinaestheticPlayProps {
  experience: KinaestheticPlayData;
}

export const KinaestheticPlay: React.FC<KinaestheticPlayProps> = ({ experience }) => {
  const [status, setStatus] = useState<'ready' | 'playing' | 'finished'>('ready');
  const [error, setError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(experience.duration);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    setError(null);
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setTimeLeft(experience.duration);
      setStatus('playing');
    } catch (err) {
      console.error("Camera access denied:", err);
      setError("Camera access was denied. Please enable it in your browser settings.");
      setStatus('ready');
    }
  };

  useEffect(() => {
    if (status === 'playing') {
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
      // Cleanup camera stream on component unmount
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  if (status === 'finished') {
    return (
      <div className="h-full flex flex-col justify-center items-center text-center">
        <h3 className="text-2xl font-bold text-green-400">Great job!</h3>
        <p className="text-4xl font-bold mt-2">You did it!</p>
        <p className="text-sm text-gray-500 max-w-sm mt-4 italic">"{experience.shareText}"</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col justify-center items-center text-center">
      {status === 'ready' ? (
        <div className="h-full w-full flex flex-col justify-center items-center text-center p-4 overflow-y-auto">
            <h3 className="text-2xl font-bold text-yellow-400 mb-4">{experience.title}</h3>
            <p className="text-slate-400 mb-6 max-w-sm">{experience.instructions}</p>
            <button onClick={startCamera} className="px-6 py-3 text-lg font-bold rounded-full bg-rose-600 hover:bg-rose-700 transition-colors">
                Start Camera
            </button>
            {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
        </div>
      ) : (
         <div className="w-full h-full flex flex-col items-center justify-center relative">
            <div className="absolute top-2 text-2xl font-bold text-white bg-black/50 px-4 py-2 rounded-lg">⏱️ {timeLeft}</div>
            <p className="text-xl font-semibold animate-pulse mb-2">Game in Progress...</p>
            <div className="w-full max-w-md aspect-video bg-slate-950 rounded-lg overflow-hidden relative">
                <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover transform scale-x-[-1]"></video>
            </div>
         </div>
      )}
    </div>
  );
};
