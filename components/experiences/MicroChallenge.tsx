
import React, { useState, useRef, useEffect } from 'react';
import type { MicroChallengeData } from '../../types';
import { RewardCertificate } from '../RewardCertificate';

const CameraIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.776 48.776 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
    </svg>
);


interface MicroChallengeProps {
  experience: MicroChallengeData;
}

export const MicroChallenge: React.FC<MicroChallengeProps> = ({ experience }) => {
  const [view, setView] = useState<'challenge' | 'camera' | 'reward'>('challenge');
  const [error, setError] = useState<string | null>(null);
  const [capturedPhotoUrl, setCapturedPhotoUrl] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(experience.duration);
  const [isTimeUp, setIsTimeUp] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (view !== 'challenge' || isTimeUp) return;

    if (timeLeft <= 0) {
      setIsTimeUp(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, view, isTimeUp]);


  const startCamera = async () => {
    setError(null);
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      setView('camera');
    } catch (err) {
      console.error("Camera access denied:", err);
      setError("Camera access was denied. Please enable it in your browser settings.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setView('challenge');
  }

  const takePhoto = () => {
     if(videoRef.current) {
         const canvas = document.createElement('canvas');
         canvas.width = videoRef.current.videoWidth;
         canvas.height = videoRef.current.videoHeight;
         const ctx = canvas.getContext('2d');
         ctx?.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
         
         const photoUrl = canvas.toDataURL('image/jpeg');
         setCapturedPhotoUrl(photoUrl);

         if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
         }
         setView('reward');
     }
  }
  
  const handleCompleteWithoutPhoto = () => {
    setCapturedPhotoUrl(null);
    setView('reward');
  }

  // Effect to handle camera stream attachment after the video element is mounted
  useEffect(() => {
    if (view === 'camera' && videoRef.current && streamRef.current) {
        videoRef.current.srcObject = streamRef.current;
    }
  }, [view]);

  // Cleanup camera stream on component unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  if (view === 'reward') {
    return <RewardCertificate challengeTitle={experience.title} photoDataUrl={capturedPhotoUrl} />;
  }

  if (view === 'camera') {
    return (
        <div className="h-full flex flex-col justify-center items-center text-center">
            <div className="w-full aspect-video bg-slate-950 rounded-lg overflow-hidden relative">
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover"></video>
            </div>
            <div className="flex space-x-4 mt-4">
                <button onClick={takePhoto} className="px-6 py-3 text-lg font-bold rounded-full bg-green-600 hover:bg-green-700 transition-colors">
                    Take Photo & Complete
                </button>
                <button onClick={stopCamera} className="px-4 py-3 text-sm font-semibold rounded-full bg-slate-600 hover:bg-slate-700 transition-colors">
                    Cancel
                </button>
            </div>
        </div>
    )
  }
  
  const cameraEnabledChallenges = ['mch_boredom_1', 'mch_1_v2'];

  return (
    <div className="h-full flex flex-col justify-center items-center text-center p-4 overflow-y-auto">
        <div className={`text-7xl font-bold mb-4 transition-colors ${timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-white'}`}>{timeLeft}</div>
        {isTimeUp && <p className="text-red-500 font-bold mb-4">Time's up!</p>}
        <p className="text-gray-300 text-lg">Challenge:</p>
        <h3 className="text-4xl font-bold my-4 text-yellow-400">{experience.challenge}</h3>
        <p className="text-sm text-gray-500 max-w-sm mb-6">
        {experience.instructions}
        </p>
        <div className="flex space-x-4">
            <button onClick={handleCompleteWithoutPhoto} className="px-6 py-3 text-lg font-bold rounded-full bg-green-600 hover:bg-green-700 transition-colors">
            I did it!
            </button>
            {cameraEnabledChallenges.includes(experience.id) && (
                <button onClick={startCamera} className="p-3 text-lg font-bold rounded-full bg-blue-600 hover:bg-blue-700 transition-colors" aria-label="Record challenge">
                    <CameraIcon className="w-6 h-6"/>
                </button>
            )}
        </div>
        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
    </div>
  );
};
