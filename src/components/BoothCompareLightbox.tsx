import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, HelpCircle } from 'lucide-react';

export interface BoothCompareItem {
  image: string;
  text: string;
  compareImages?: {
    left: string;
    right: string;
  };
}

interface BoothCompareLightboxProps {
  item: BoothCompareItem;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}

export const BoothCompareLightbox: React.FC<BoothCompareLightboxProps> = ({
  item,
  onClose,
  onPrev,
  onNext
}) => {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  // Handle drag positioning for the comparison slider
  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1 || isDragging.current) {
      handleMove(e.clientX);
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    handleMove(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDragging.current = false;
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  const hasComparison = !!item.compareImages;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 backdrop-blur-xl select-none"
    >
      {/* Top bar with labels and controls */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-900 bg-black/40 backdrop-blur-sm z-10">
        <div className="flex flex-col text-left">
          <span className="text-[10px] font-mono text-zinc-500 tracking-wider font-bold uppercase">
            3D EXHIBITION CONCEPT COMPARISON
          </span>
          <h3 className="text-sm font-black text-white tracking-tight uppercase">
            {item.text}
          </h3>
        </div>

        <div className="flex items-center gap-4">
          {hasComparison && (
            <div className="hidden md:flex items-center gap-2 bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-400 font-mono px-3 py-1.5 rounded-full select-none">
              <HelpCircle className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
              <span>左右拖拽中央刻度线，对偶方案实时物理对比</span>
            </div>
          )}
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-full cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main interactive area */}
      <div className="relative flex-1 flex items-center justify-center p-4 md:p-8 overflow-hidden">
        {/* Navigation Arrows */}
        {onPrev && (
          <button
            onClick={onPrev}
            className="absolute left-4 md:left-6 p-3 md:p-4 text-zinc-400 hover:text-white bg-zinc-900/50 hover:bg-zinc-800 border border-zinc-800/50 hover:border-zinc-700 rounded-full cursor-pointer transition-all z-20 group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
          </button>
        )}

        {onNext && (
          <button
            onClick={onNext}
            className="absolute right-4 md:right-6 p-3 md:p-4 text-zinc-400 hover:text-white bg-zinc-900/50 hover:bg-zinc-800 border border-zinc-800/50 hover:border-zinc-700 rounded-full cursor-pointer transition-all z-20 group"
          >
            <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        )}

        {/* Comparison content stage */}
        <div className="relative w-full h-full max-w-5xl max-h-[75vh] bg-zinc-950/40 border border-zinc-900 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center">
          {hasComparison && item.compareImages ? (
            /* DUAL IMAGE COMPARISON SLIDER */
            <div
              ref={containerRef}
              className="relative w-full h-full cursor-col-resize select-none overflow-hidden touch-none"
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
            >
              {/* Left / Base Image (full container size, cropped by slide percentage) */}
              <div 
                className="absolute inset-0 select-none pointer-events-none"
                style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
              >
                <img
                  src={item.compareImages.left}
                  alt="方案 A"
                  className="w-full h-full object-contain pointer-events-none"
                  referrerPolicy="no-referrer"
                />
                {/* Visual side tag A */}
                <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-sm border border-zinc-800/80 px-3.5 py-1.5 rounded-lg text-[10px] font-mono font-bold text-white uppercase select-none">
                  A / 前期概念设计方案
                </div>
              </div>

              {/* Right / Comp Image (always full, underneath B) */}
              <div 
                className="absolute inset-0 select-none pointer-events-none"
                style={{ clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)` }}
              >
                <img
                  src={item.compareImages.right}
                  alt="方案 B"
                  className="w-full h-full object-contain pointer-events-none"
                  referrerPolicy="no-referrer"
                />
                {/* Visual side tag B */}
                <div className="absolute bottom-6 right-6 bg-teal-500/80 backdrop-blur-sm px-3.5 py-1.5 rounded-lg text-[10px] font-mono font-bold text-white uppercase select-none">
                  B / 3D深化效果与渲染
                </div>
              </div>

              {/* Slider boundary controller line */}
              <div
                className="absolute top-0 bottom-0 z-30 w-1 flex items-center justify-center cursor-col-resize hover:scale-x-150 active:scale-x-150 transition-all"
                style={{ left: `${sliderPosition}%` }}
                onPointerDown={handlePointerDown}
                onPointerUp={handlePointerUp}
              >
                {/* Horizontal guide line */}
                <div className="absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-white/70 via-teal-400 to-white/70 shadow-[0_0_10px_rgba(20,184,166,0.5)]" />
                
                {/* Rounded touch grab handle button */}
                <div className="absolute w-8 h-8 rounded-full border-2 border-teal-400 bg-zinc-950 flex flex-col justify-between items-center py-2 shadow-xl ring-4 ring-black/50 pointer-events-none">
                  <div className="flex gap-1 items-center justify-center">
                    <span className="w-1 h-3 bg-teal-400/80 rounded-full" />
                    <span className="w-1 h-3 bg-teal-400/80 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* SINGLE FULL IMAGE VIEWER */
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={item.image}
                alt={item.text}
                className="max-w-full max-h-full object-contain select-none pointer-events-none"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-sm border border-zinc-800/80 px-3.5 py-1.5 rounded-lg text-[10px] font-mono font-bold text-white uppercase select-none">
                3D 高精物性渲染图
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom info area */}
      <div className="bg-black/65 py-4 px-6 md:py-6 md:px-12 border-t border-zinc-900 shrink-0 text-center flex flex-col items-center gap-1.5 z-10 select-none">
        <p className="text-[11px] text-zinc-400 font-medium tracking-wide">
          {hasComparison ? '左右滑动对比不同创意方向与3D最终深化效果' : '高清展台三维空间设计效果精选'}
        </p>
        <span className="text-[9px] font-mono text-zinc-600 tracking-wider uppercase">
          PRESS ARROWS FOR NAVIGATION // ESC TO RETREAT
        </span>
      </div>
    </motion.div>
  );
};
