import React, { useRef, useEffect, useState } from 'react';
import type { MicroCreationData } from '../../types';

interface MicroCreationProps {
  experience: MicroCreationData;
}

const COLORS = ['#FFFFFF', '#EF4444', '#3B82F6', '#22C55E', '#EAB308', '#A855F7'];

export const MicroCreation: React.FC<MicroCreationProps> = ({ experience }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState(COLORS[0]);
  const [timeLeft, setTimeLeft] = useState(experience.duration);
  const [isTimeUp, setIsTimeUp] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsTimeUp(true);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const parent = canvas.parentElement;
    if(!parent) return;

    canvas.width = parent.clientWidth * 2;
    canvas.height = parent.clientHeight * 2;
    canvas.style.width = `${parent.clientWidth}px`;
    canvas.style.height = `${parent.clientHeight}px`;

    const context = canvas.getContext('2d');
    if (!context) return;
    context.scale(2, 2);
    context.lineCap = 'round';
    context.strokeStyle = color;
    context.lineWidth = 5;
    contextRef.current = context;
  }, []);

  useEffect(() => {
    if (contextRef.current) {
        contextRef.current.strokeStyle = color;
    }
  }, [color]);

  const startDrawing = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement>) => {
    if (isTimeUp) return;
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current?.beginPath();
    contextRef.current?.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    if (isTimeUp) return;
    contextRef.current?.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || isTimeUp) return;
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current?.lineTo(offsetX, offsetY);
    contextRef.current?.stroke();
  };

  const clearCanvas = () => {
    if (isTimeUp) return;
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if(canvas && context) {
        context.clearRect(0,0, canvas.width, canvas.height);
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-grow relative bg-gray-900 rounded-lg">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseUp={finishDrawing}
          onMouseMove={draw}
          className={`absolute top-0 left-0 w-full h-full ${isTimeUp ? 'cursor-not-allowed' : ''}`}
        />
         {isTimeUp && (
          <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-center">
            <h3 className="text-3xl font-bold text-yellow-400">Time's Up!</h3>
            <p className="text-slate-300 mt-2">You can still admire your masterpiece.</p>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between p-2 mt-2 bg-gray-700 rounded-lg">
        <div className="font-bold text-lg text-white">⏱️ {timeLeft}s</div>
        <div className="flex space-x-2">
            {COLORS.map(c => (
                <button key={c} onClick={() => setColor(c)} style={{backgroundColor: c}} className={`w-8 h-8 rounded-full border-2 transition-all ${color === c ? 'border-white scale-110' : 'border-transparent'} ${isTimeUp ? 'cursor-not-allowed' : ''}`} disabled={isTimeUp} />
            ))}
        </div>
        <button onClick={clearCanvas} className="px-3 py-1 text-sm bg-gray-600 rounded-md hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed" disabled={isTimeUp}>Clear</button>
      </div>
    </div>
  );
};