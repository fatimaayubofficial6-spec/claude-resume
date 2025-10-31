import { useEffect, useRef } from 'react';
import { useResumeStore } from '../store/useResumeStore';

export const LayoutDebugger: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { wordBoxes, uploadedImage, showDebugger } = useResumeStore();

  useEffect(() => {
    if (!showDebugger || !canvasRef.current || !uploadedImage) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.src = uploadedImage;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      ctx.strokeStyle = 'red';
      ctx.lineWidth = 2;

      wordBoxes.forEach((box) => {
        ctx.strokeRect(box.x, box.y, box.width, box.height);
      });

      ctx.strokeStyle = 'blue';
      ctx.lineWidth = 3;
      const midX = canvas.width / 2;
      ctx.beginPath();
      ctx.moveTo(midX, 0);
      ctx.lineTo(midX, canvas.height);
      ctx.stroke();
    };
  }, [wordBoxes, uploadedImage, showDebugger]);

  if (!showDebugger) return null;

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6 mt-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Layout Debugger</h3>
      <p className="text-sm text-gray-600 mb-4">
        Red boxes show detected words. Blue line shows column division.
      </p>
      <div className="overflow-auto max-h-[600px] border border-gray-200 rounded">
        <canvas ref={canvasRef} className="max-w-full h-auto" />
      </div>
    </div>
  );
};
