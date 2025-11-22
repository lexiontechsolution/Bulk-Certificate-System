import React, { useRef, useEffect, useState, useCallback } from 'react';
import { TextConfig } from '../types';
import { Move, Download, ChevronLeft, ChevronRight, Check } from 'lucide-react';

interface CertificateCanvasProps {
  templateImage: string;
  name: string;
  config: TextConfig;
  onConfigChange: (config: TextConfig) => void;
  width?: number;
}

export const CertificateCanvas: React.FC<CertificateCanvasProps> = ({
  templateImage,
  name,
  config,
  onConfigChange,
  width = 800,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [canvasSize, setCanvasSize] = useState({ w: 800, h: 600 });
  const [imageObj, setImageObj] = useState<HTMLImageElement | null>(null);

  // Load Image
  useEffect(() => {
    const img = new Image();
    img.src = templateImage;
    img.crossOrigin = "anonymous";
    img.onload = () => {
      setImageObj(img);
      // Calculate aspect ratio to fit within container width
      const aspect = img.height / img.width;
      setCanvasSize({ w: width, h: width * aspect });
    };
  }, [templateImage, width]);

  // Draw Canvas
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imageObj) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Scale factor
    const scale = canvasSize.w / imageObj.width;

    // Clear
    ctx.clearRect(0, 0, canvasSize.w, canvasSize.h);

    // Draw Template
    ctx.drawImage(imageObj, 0, 0, canvasSize.w, canvasSize.h);

    // Draw Name
    // Note: Config coordinates are stored in "canvas space" (0-width, 0-height)
    // We need to ensure we draw relative to that.
    
    ctx.font = `${config.fontSize}px "${config.fontFamily}"`;
    ctx.fillStyle = config.color;
    ctx.textAlign = config.textAlign;
    ctx.textBaseline = 'middle';
    
    // Highlight box if dragging (optional visual cue)
    if (isDragging) {
      ctx.save();
      ctx.globalAlpha = 0.2;
      ctx.fillStyle = '#3b82f6'; // blue highlight
      const metrics = ctx.measureText(name);
      const textHeight = config.fontSize; // approximate
      let rectX = config.x;
      if(config.textAlign === 'center') rectX -= metrics.width / 2;
      if(config.textAlign === 'right') rectX -= metrics.width;
      
      ctx.fillRect(rectX - 10, config.y - textHeight/2 - 5, metrics.width + 20, textHeight + 10);
      ctx.restore();
    }

    ctx.fillText(name, config.x, config.y);

  }, [imageObj, canvasSize, config, name, isDragging]);

  useEffect(() => {
    draw();
  }, [draw]);

  // Interaction Handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Simple hit detection (approximate)
    // For better UX, we assume if they click anywhere, they want to move the text
    // unless we have multiple elements. Since we have one, global drag is fine,
    // but let's try to be slightly precise or just allow click-drag anywhere for convenience.
    // Let's allow dragging from anywhere for better UX on mobile/desktop.
    
    setIsDragging(true);
    setDragStart({ x: x - config.x, y: y - config.y });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    onConfigChange({
      ...config,
      x: x - dragStart.x,
      y: y - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="relative bg-white rounded-2xl overflow-hidden">
      {/* Modern Header Bar */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-700 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-white/80 text-sm font-medium ml-2">Certificate Preview</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-white/40 rounded-full"></div>
          <div className="w-2 h-2 bg-white/40 rounded-full"></div>
          <div className="w-2 h-2 bg-white/40 rounded-full"></div>
        </div>
      </div>

      {/* Canvas Container with Neumorphic Design */}
      <div className="p-8 bg-gradient-to-br from-slate-100 to-slate-200">
        <div className="relative inline-block rounded-2xl shadow-2xl">
          <div className="absolute inset-0 bg-white rounded-2xl shadow-inner border border-white/50"></div>
          
          <canvas
            ref={canvasRef}
            width={canvasSize.w}
            height={canvasSize.h}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="cursor-move block relative z-10 rounded-lg mx-auto transition-transform duration-300 hover:scale-[1.02]"
            style={{ touchAction: 'none' }}
          />
        </div>
      </div>

      {/* Floating Control Panel */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 px-6 py-4">
        <div className="flex items-center gap-4 text-slate-700">
          <div className="flex items-center gap-2 bg-blue-50 rounded-full px-4 py-2 border border-blue-200">
            <Move size={16} className="text-blue-600" />
            <span className="text-sm font-medium text-blue-700">Drag to reposition</span>
          </div>
          <div className="h-6 w-px bg-slate-300"></div>
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Live Preview
          </div>
        </div>
      </div>

      {/* Corner Accents */}
      <div className="absolute top-12 left-8 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-8 w-32 h-32 bg-gradient-to-tr from-green-500/10 to-cyan-500/10 rounded-full blur-xl"></div>
    </div>
  );
};