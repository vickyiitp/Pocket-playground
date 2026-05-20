
import React, { useState, useRef, useEffect, useCallback } from 'react';

interface RewardCertificateProps {
    challengeTitle: string;
    photoDataUrl: string | null;
}

export const RewardCertificate: React.FC<RewardCertificateProps> = ({ challengeTitle, photoDataUrl }) => {
    const [name, setName] = useState('');
    const [isGenerated, setIsGenerated] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const drawCertificate = useCallback(async (userName: string) => {
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
        gradient.addColorStop(0, '#0f172a'); // slate-900
        gradient.addColorStop(1, '#1e1b4b'); // indigo-950
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // Decorative Corner Flourishes
        ctx.strokeStyle = '#334155'; // slate-700
        ctx.lineWidth = 1.5;
        const cornerSize = 40;
        ctx.beginPath();
        // Top-left
        ctx.moveTo(20, cornerSize + 20); ctx.lineTo(20, 20); ctx.lineTo(cornerSize + 20, 20);
        // Top-right
        ctx.moveTo(width - 20, cornerSize + 20); ctx.lineTo(width - 20, 20); ctx.lineTo(width - cornerSize - 20, 20);
        // Bottom-left
        ctx.moveTo(20, height - cornerSize - 20); ctx.lineTo(20, height - 20); ctx.lineTo(cornerSize + 20, height - 20);
        // Bottom-right
        ctx.moveTo(width - 20, height - cornerSize - 20); ctx.lineTo(width - 20, height - 20); ctx.lineTo(width - cornerSize - 20, height - 20);
        ctx.stroke();

        // Title
        ctx.fillStyle = '#f1f5f9';
        ctx.font = 'bold 48px Inter, sans-serif';
        ctx.textAlign = 'center';
        const titleY = photoDataUrl ? 80 : 100;
        ctx.fillText('Certificate of Mindfulness', width / 2, titleY);

        ctx.font = '24px Inter, sans-serif';
        ctx.fillStyle = '#cbd5e1';
        const subtitleY = photoDataUrl ? 130 : 200;
        ctx.fillText('This certifies that', width / 2, subtitleY);

        if (photoDataUrl) {
            const img = new Image();
            img.src = photoDataUrl;
            await new Promise<void>(resolve => {
                img.onload = () => {
                    const photoX = width / 2;
                    const photoY = 220;
                    const radius = 60;
                    ctx.save();
                    ctx.beginPath();
                    ctx.arc(photoX, photoY, radius, 0, Math.PI * 2, true);
                    ctx.closePath();
                    ctx.clip();
                    ctx.drawImage(img, photoX - radius, photoY - radius, radius * 2, radius * 2);
                    ctx.restore();

                    ctx.beginPath();
                    ctx.arc(photoX, photoY, radius + 2, 0, Math.PI * 2, true);
                    ctx.strokeStyle = '#67e8f9';
                    ctx.lineWidth = 4;
                    ctx.stroke();
                    resolve();
                };
                img.onerror = () => resolve();
            });
            ctx.font = 'italic bold 50px Inter, sans-serif';
            ctx.fillStyle = '#f1f5f9';
            ctx.fillText(userName, width / 2, 320);

            ctx.font = '20px Inter, sans-serif';
            ctx.fillStyle = '#cbd5e1';
            ctx.fillText(`has successfully completed the`, width / 2, 380);
            ctx.font = 'bold 20px Inter, sans-serif';
            ctx.fillText(`"${challengeTitle}"`, width / 2, 410);
            ctx.font = '20px Inter, sans-serif';
            ctx.fillText(`capturing a moment of presence and self-awareness.`, width / 2, 440);

        } else {
             // Default Emblem if no photo
            const emblemX = width / 2;
            const emblemY = 280;
            const emblemRadius = 40;
            ctx.strokeStyle = '#67e8f9';
            ctx.fillStyle = 'rgba(34, 211, 238, 0.1)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(emblemX, emblemY, emblemRadius, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            ctx.font = 'bold 40px Inter, sans-serif';
            ctx.fillStyle = '#67e8f9';
            ctx.fillText('✓', emblemX, emblemY + 15);


            ctx.font = 'italic bold 60px Inter, sans-serif';
            ctx.fillStyle = '#f1f5f9';
            ctx.fillText(userName, width / 2, 380);

            ctx.font = '20px Inter, sans-serif';
            ctx.fillStyle = '#cbd5e1';
            ctx.fillText(`has successfully completed the`, width / 2, 440);
            ctx.font = 'bold 20px Inter, sans-serif';
            ctx.fillText(`"${challengeTitle}"`, width / 2, 470);
        }

        const signatureX = width / 4 + 20;
        const dateX = width * 3 / 4 - 20;
        const lineY = height - 70;
        const labelY = height - 45;
        const textY = lineY - 12;

        // Signature
        ctx.textAlign = 'center';
        ctx.font = 'italic 28px "Brush Script MT", cursive';
        ctx.fillStyle = '#cbd5e1';
        ctx.fillText('Devil Labs', signatureX, textY);
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(signatureX - 100, lineY);
        ctx.lineTo(signatureX + 100, lineY);
        ctx.stroke();
        ctx.font = '16px Inter, sans-serif';
        ctx.fillStyle = '#94a3b8';
        ctx.fillText('Signature', signatureX, labelY);

        // Date
        const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        ctx.font = '18px Inter, sans-serif';
        ctx.fillStyle = '#cbd5e1';
        ctx.fillText(today, dateX, textY);
        ctx.beginPath();
        ctx.moveTo(dateX - 100, lineY);
        ctx.lineTo(dateX + 100, lineY);
        ctx.stroke();
        ctx.font = '16px Inter, sans-serif';
        ctx.fillText('Date', dateX, labelY);

    }, [challengeTitle, photoDataUrl]);

    const handleGenerate = () => {
        if (name.trim()) {
            setIsGenerated(true);
        }
    };

    useEffect(() => {
        if (isGenerated) {
            drawCertificate(name);
        }
    }, [isGenerated, name, drawCertificate])

    const handleDownload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const link = document.createElement('a');
        link.download = `mindfulness_certificate_${name.replace(/\s/g, '_').toLowerCase()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    };
    
    const handleShare = async () => {
        const canvas = canvasRef.current;
        if (!canvas || !navigator.share) {
            alert('Sharing is not supported on this browser.');
            return;
        }

        canvas.toBlob(async (blob) => {
            if (!blob) return;
            const file = new File([blob], `mindfulness_certificate.png`, { type: 'image/png' });
            try {
                await navigator.share({
                    title: 'My Mindfulness Certificate',
                    text: `I just completed the "${challengeTitle}" challenge!`,
                    files: [file],
                });
            } catch (error) {
                console.error('Error sharing:', error);
            }
        }, 'image/png');
    };

    if (isGenerated) {
        return (
            <div className="h-full flex flex-col justify-center items-center text-center p-2 overflow-y-auto">
                <h3 className="text-3xl font-bold text-green-400 mb-2">Challenge Complete!</h3>
                <p className="text-slate-300 mb-4">Here is your well-earned certificate.</p>
                <div className="w-full max-w-lg aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
                     <canvas ref={canvasRef} className="w-full h-full" />
                </div>
                <div className="flex space-x-4 mt-6">
                    <button onClick={handleDownload} className="px-5 py-2 font-semibold rounded-full bg-blue-600 hover:bg-blue-700 transition-colors">Download</button>
                    {navigator.share && <button onClick={handleShare} className="px-5 py-2 font-semibold rounded-full bg-purple-600 hover:bg-purple-700 transition-colors">Share</button>}
                </div>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col justify-center items-center text-center p-4 overflow-y-auto">
            <h3 className="text-3xl font-bold text-green-400">Challenge Complete!</h3>
            <p className="mt-2 text-slate-300 max-w-sm">Great job! To receive your certificate of achievement, please enter your name below.</p>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="mt-6 w-full max-w-xs px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white text-center focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <button
                onClick={handleGenerate}
                disabled={!name.trim()}
                className="mt-4 px-8 py-3 font-bold rounded-full bg-cyan-600 hover:bg-cyan-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Generate Certificate
            </button>
        </div>
    );
};
