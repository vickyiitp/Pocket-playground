
import React, { useRef, useEffect, useCallback } from 'react';

interface ScoreShareCardProps {
    gameTitle: string;
    score: number;
    onBack: () => void;
}

export const ScoreShareCard: React.FC<ScoreShareCardProps> = ({ gameTitle, score, onBack }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const drawCard = useCallback(async () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const width = 800;
        const height = 600;
        canvas.width = width;
        canvas.height = height;

        // Background Gradient
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, '#1e293b'); // slate-800
        gradient.addColorStop(1, '#0f172a'); // slate-900
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // Game Title
        ctx.fillStyle = '#e2e8f0'; // slate-200
        ctx.font = 'bold 48px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(gameTitle, width / 2, 100);
        
        // Score
        ctx.fillStyle = '#f472b6'; // pink-400 (Microgame color)
        ctx.font = 'bold 200px Inter, sans-serif';
        ctx.shadowColor = 'rgba(244, 114, 182, 0.5)';
        ctx.shadowBlur = 20;
        ctx.fillText(score.toString(), width / 2, 350);
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;

        // Subtitle
        ctx.fillStyle = '#94a3b8'; // slate-400
        ctx.font = '32px Inter, sans-serif';
        ctx.fillText('points', width / 2, 420);

        // Logo
        ctx.font = 'bold 24px Inter, sans-serif';
        ctx.fillStyle = '#64748b'; // slate-500
        ctx.textAlign = 'right';
        ctx.fillText('PocketPlayground', width - 40, height - 40);

    }, [gameTitle, score]);

    useEffect(() => {
        drawCard();
    }, [drawCard]);

    const handleDownload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const link = document.createElement('a');
        link.download = `pocketplayground_score_${gameTitle.replace(/\s/g, '_').toLowerCase()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    };
    
    const handleShare = async () => {
        const canvas = canvasRef.current;
        if (!canvas || !navigator.share) {
            alert('Sharing is not supported on this browser. You can download the image instead.');
            return;
        }

        canvas.toBlob(async (blob) => {
            if (!blob) return;
            const file = new File([blob], `pocketplayground_score.png`, { type: 'image/png' });
            try {
                await navigator.share({
                    title: `My Score in ${gameTitle}`,
                    text: `I scored ${score} in "${gameTitle}" on PocketPlayground! Can you beat it?`,
                    files: [file],
                });
            } catch (error) {
                console.error('Error sharing:', error);
            }
        }, 'image/png');
    };

    return (
        <div className="h-full flex flex-col justify-center items-center text-center p-2 overflow-y-auto">
            <h3 className="text-2xl font-bold text-slate-100 mb-4">Share Your Score</h3>
            <div className="w-full max-w-lg aspect-[4/3] rounded-lg overflow-hidden shadow-2xl bg-slate-800">
                 <canvas ref={canvasRef} className="w-full h-full" />
            </div>
            <div className="flex space-x-4 mt-6">
                <button onClick={onBack} className="px-5 py-2 font-semibold rounded-full bg-slate-600 hover:bg-slate-700 transition-colors">Back</button>
                <button onClick={handleDownload} className="px-5 py-2 font-semibold rounded-full bg-blue-600 hover:bg-blue-700 transition-colors">Download</button>
                {navigator.share && <button onClick={handleShare} className="px-5 py-2 font-semibold rounded-full bg-purple-600 hover:bg-purple-700 transition-colors">Share</button>}
            </div>
        </div>
    );
};
