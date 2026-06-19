/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HelpCircle, Orbit } from 'lucide-react';
import { PortfolioItem } from '../types';
import { PACKAGING_PORTFOLIO } from '../data';
import InfiniteMenu from './InfiniteMenu';

interface PortfolioSliderProps {
  onSelectItem: (item: PortfolioItem) => void;
}

export const PortfolioSlider: React.FC<PortfolioSliderProps> = ({ onSelectItem }) => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto px-6 md:px-12">
      {/* Visual Subheader Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-xl font-black text-black">01 / 从视觉到打样的全链路执行</span>
          <span className="text-[10px] font-mono bg-zinc-155 text-black px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
            3D Globe // 50 款实验打样
          </span>
        </div>

        {/* Dynamic status indicators */}
        <div className="flex items-center gap-4 text-xs font-mono text-zinc-500 select-none">
          <div className="flex items-center gap-1.5 bg-zinc-50 border border-zinc-200 px-3 py-1.5 rounded-lg text-black font-bold">
            <Orbit className="w-3.5 h-3.5 text-[#0D9488] animate-spin" style={{ animationDuration: '6s' }} />
            <span>三维球体交互（可进行转动）</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white border border-zinc-200 px-3 py-1.5 rounded-lg text-zinc-600 font-bold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>点击可对设计图谱放大详检</span>
          </div>
        </div>
      </div>

      {/* Main interactive 3D WebGL menu Container */}
      <div className="w-full">
        <InfiniteMenu items={PACKAGING_PORTFOLIO} onSelectItem={onSelectItem} scale={1.0} />
      </div>
    </div>
  );
};
