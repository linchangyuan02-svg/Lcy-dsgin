/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sliders, PlusCircle, Sparkles, MoveHorizontal } from 'lucide-react';
import { PortfolioItem } from '../types';
import { AI_PORTFOLIO } from '../data';
import { ProceduralModel } from './ProceduralModel';

interface PortfolioAIProps {
  onSelectItem: (item: PortfolioItem) => void;
}

export const PortfolioAI: React.FC<PortfolioAIProps> = ({ onSelectItem }) => {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  const [isHovered, setIsHovered] = useState(false);
  
  // Custom drag state for rows
  const [dragRow1Active, setDragRow1Active] = useState(false);
  const [dragRow2Active, setDragRow2Active] = useState(false);
  const [startX1, setStartX1] = useState(0);
  const [startX2, setStartX2] = useState(0);
  const [scrollLeft1, setScrollLeft1] = useState(0);
  const [scrollLeft2, setScrollLeft2] = useState(0);

  // Split the 50 items into 2 rows of 25 for optimal layout flow
  const row1Items = AI_PORTFOLIO.slice(0, 25);
  const row2Items = AI_PORTFOLIO.slice(25, 50);

  const speed = 0.6; // Scroll speed in pixels per frame

  // Continuous loop animation for Row 1 and Row 2
  useEffect(() => {
    let animationId: number;
    const r1 = row1Ref.current;
    const r2 = row2Ref.current;

    const tick = () => {
      // Pause animation if hovered OR active dragging
      if (!isHovered && !dragRow1Active && !dragRow2Active) {
        if (r1) {
          r1.scrollLeft += speed;
          if (r1.scrollLeft >= r1.scrollWidth - r1.clientWidth - 5) {
            r1.scrollLeft = 0;
          }
        }
        if (r2) {
          // Row 2 scrolls in the opposite direction
          r2.scrollLeft -= speed;
          if (r2.scrollLeft <= 5) {
            r2.scrollLeft = r2.scrollWidth - r2.clientWidth - 10;
          }
        }
      }
      animationId = requestAnimationFrame(tick);
    };

    animationId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationId);
  }, [isHovered, dragRow1Active, dragRow2Active]);

  // Set Row 2 to start at the end so it scrolls backward nicely
  useEffect(() => {
    if (row2Ref.current) {
      row2Ref.current.scrollLeft = row2Ref.current.scrollWidth - row2Ref.current.clientWidth - 20;
    }
  }, []);

  // Row 1 Drag Handlers
  const handleDrag1Start = (e: React.MouseEvent) => {
    if (!row1Ref.current) return;
    setDragRow1Active(true);
    setStartX1(e.pageX - row1Ref.current.offsetLeft);
    setScrollLeft1(row1Ref.current.scrollLeft);
  };
  const handleDrag1Move = (e: React.MouseEvent) => {
    if (!dragRow1Active || !row1Ref.current) return;
    e.preventDefault();
    const x = e.pageX - row1Ref.current.offsetLeft;
    const walk = (x - startX1) * 1.5;
    row1Ref.current.scrollLeft = scrollLeft1 - walk;
  };

  // Row 2 Drag Handlers
  const handleDrag2Start = (e: React.MouseEvent) => {
    if (!row2Ref.current) return;
    setDragRow2Active(true);
    setStartX2(e.pageX - row2Ref.current.offsetLeft);
    setScrollLeft2(row2Ref.current.scrollLeft);
  };
  const handleDrag2Move = (e: React.MouseEvent) => {
    if (!dragRow2Active || !row2Ref.current) return;
    e.preventDefault();
    const x = e.pageX - row2Ref.current.offsetLeft;
    const walk = (x - startX2) * 1.5;
    row2Ref.current.scrollLeft = scrollLeft2 - walk;
  };

  const handleDragEnd = () => {
    setDragRow1Active(false);
    setDragRow2Active(false);
  };

  return (
    <div className="space-y-6 py-6 overflow-hidden">
      
      {/* Title Details */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <span className="text-xl font-black text-black">10 / AI 物态作品集</span>
          <span className="text-[10px] font-mono bg-zinc-100 border border-zinc-200 text-black px-2.5 py-1 rounded-full font-bold">
            Typography Kinetics // 50 款潜空间生成
          </span>
        </div>

        <div className="flex items-center gap-3 font-mono text-[10px] text-zinc-500 select-none">
          <div className="flex items-center gap-1 bg-white border border-zinc-200 px-3 py-1.5 rounded-lg text-black font-bold">
            <Sliders className="w-3.5 h-3.5 text-black" />
            <span>鼠标悬停即可暂停排版动效</span>
          </div>
          <span className="text-zinc-300">|</span>
          <div className="flex items-center gap-1 font-bold text-black">
            <MoveHorizontal className="w-3.5 h-3.5 text-black" />
            <span>支持横向拖拽滚动</span>
          </div>
        </div>
      </div>

      {/* Marquees Wrapping Canvas */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          handleDragEnd();
        }}
        className="space-y-6 w-full"
      >
        
        {/* ROW 1: Auto Scrolls Left */}
        <div
          ref={row1Ref}
          onMouseDown={handleDrag1Start}
          onMouseMove={handleDrag1Move}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          className={`w-full overflow-x-auto flex gap-6 py-3 px-6 select-none hide-scrollbar scroll-smooth ${
            dragRow1Active ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {row1Items.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                if (!dragRow1Active) onSelectItem(item);
              }}
              className="flex-shrink-0 w-[300px] bg-white border border-zinc-200 rounded-3xl p-4 shadow-sm hover:shadow-lg hover:border-black transition-all duration-300 pointer-events-auto relative group overflow-hidden"
            >
              {/* Index label */}
              <div className="absolute top-3 left-3 z-10 font-mono text-[8px] text-black font-black bg-zinc-50 px-2 py-0.5 rounded border border-zinc-200 uppercase tracking-widest">
                DIFF_#{String(item.index).padStart(2, '0')}
              </div>

              {/* Decorative AI prompt typography in big layout block */}
              <div
                className="w-full h-[180px] rounded-2.5xl flex items-center justify-center relative overflow-hidden mt-1 border border-zinc-100"
                style={{
                  background: `linear-gradient(135deg, ${item.gradientStart}, ${item.gradientEnd})`
                }}
              >
                <ProceduralModel
                  shapeType={item.shapeType}
                  gradientStart={item.gradientStart}
                  gradientEnd={item.gradientEnd}
                  accentColor={item.accentColor}
                  complexity={item.complexity}
                />

                {/* Big typographic prompt watermark reflecting typical AI setups */}
                <div className="absolute inset-0 p-4 flex flex-col justify-between bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none">
                  <div />
                  {/* Prompt Text Layout */}
                  <div className="text-[11px] font-mono leading-tight tracking-wider text-white mix-blend-difference opacity-80 uppercase select-none w-full text-left line-clamp-2">
                    PROMPT: --v 6.0 --ar 16:9 {item.title} volumetric shader
                  </div>
                </div>

                {/* Click overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity duration-300 pointer-events-none">
                  <PlusCircle className="w-5 h-5 text-white animate-pulse" />
                  <span className="text-white text-xs font-black tracking-wider">放大概念图谱</span>
                </div>
              </div>

              {/* Metadata */}
              <div className="mt-3.5 space-y-1 text-left">
                <div className="flex justify-between items-center text-[9px] font-mono text-zinc-400">
                  <span>CFG_SCALE: 6.5</span>
                  <span>STEPS: 35</span>
                </div>
                <h4 className="text-xs font-black text-black truncate uppercase tracking-tight">
                  {item.title}
                </h4>
                <p className="text-[10px] text-zinc-550 font-light line-clamp-1 h-4">
                  {item.description}
                </p>
                <div className="flex gap-1 pt-1.5 border-t border-zinc-150 overflow-hidden">
                  {item.software.slice(0, 2).map((sw, idx) => (
                    <span key={idx} className="text-[8px] font-mono bg-zinc-100 border border-zinc-200 text-black px-1.5 py-0.5 rounded font-bold">
                      {sw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ROW 2: Auto Scrolls Right */}
        <div
          ref={row2Ref}
          onMouseDown={handleDrag2Start}
          onMouseMove={handleDrag2Move}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          className={`w-full overflow-x-auto flex gap-6 py-3 px-6 select-none hide-scrollbar scroll-smooth ${
            dragRow2Active ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {row2Items.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                if (!dragRow2Active) onSelectItem(item);
              }}
              className="flex-shrink-0 w-[300px] bg-white border border-zinc-200 rounded-3xl p-4 shadow-sm hover:shadow-lg hover:border-black transition-all duration-300 pointer-events-auto relative group overflow-hidden"
            >
              {/* Index label */}
              <div className="absolute top-3 left-3 z-10 font-mono text-[8px] text-black font-black bg-zinc-50 px-2 py-0.5 rounded border border-zinc-200 uppercase tracking-widest">
                DIFF_#{String(item.index).padStart(2, '0')}
              </div>

              {/* Decorative AI prompt typography in big layout block */}
              <div
                className="w-full h-[180px] rounded-2.5xl flex items-center justify-center relative overflow-hidden mt-1 border border-zinc-100"
                style={{
                  background: `linear-gradient(135deg, ${item.gradientStart}, ${item.gradientEnd})`
                }}
              >
                <ProceduralModel
                  shapeType={item.shapeType}
                  gradientStart={item.gradientStart}
                  gradientEnd={item.gradientEnd}
                  accentColor={item.accentColor}
                  complexity={item.complexity}
                />

                {/* Big typographic prompt watermark */}
                <div className="absolute inset-0 p-4 flex flex-col justify-between bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none">
                  <div />
                  {/* Prompt Text Layout */}
                  <div className="text-[11px] font-mono leading-tight tracking-wider text-white mix-blend-difference opacity-80 uppercase select-none w-full text-left line-clamp-2">
                    PROMPT: --style raw {item.title} fine organic mesh sub-pixel
                  </div>
                </div>

                {/* Click overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity duration-300 pointer-events-none">
                  <PlusCircle className="w-5 h-5 text-white animate-pulse" />
                  <span className="text-white text-xs font-black tracking-wider">放大概念图谱</span>
                </div>
              </div>

              {/* Metadata */}
              <div className="mt-3.5 space-y-1 text-left">
                <div className="flex justify-between items-center text-[9px] font-mono text-zinc-400">
                  <span>CFG_SCALE: 7.0</span>
                  <span>STEPS: 50</span>
                </div>
                <h4 className="text-xs font-black text-black truncate uppercase tracking-tight">
                  {item.title}
                </h4>
                <p className="text-[10px] text-zinc-550 font-light line-clamp-1 h-4">
                  {item.description}
                </p>
                <div className="flex gap-1 pt-1.5 border-t border-zinc-150 overflow-hidden">
                  {item.software.slice(0, 2).map((sw, idx) => (
                    <span key={idx} className="text-[8px] font-mono bg-zinc-100 border border-zinc-200 text-black px-1.5 py-0.5 rounded font-bold">
                      {sw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
