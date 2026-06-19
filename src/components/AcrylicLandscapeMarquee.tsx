import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MoveHorizontal, ZoomIn, Eye } from 'lucide-react';

export interface AcrylicLandscapeItem {
  image: string;
  title: string;
  tag: string;
}

const ACRYLIC_LANDSCAPE_ITEMS: AcrylicLandscapeItem[] = [
  {
    image: "https://i.postimg.cc/fW3wV0qv/2.png",
    title: "艺术亚克力透明屏视觉造景",
    tag: "ACRYLIC_01"
  },
  {
    image: "https://i.postimg.cc/KcdmBvdm/3.png",
    title: "重叠光影折射空间层叠",
    tag: "ACRYLIC_02"
  },
  {
    image: "https://i.postimg.cc/wvGGKMhk/3.jpg",
    title: "发光展台材质极致反射",
    tag: "ACRYLIC_03"
  },
  {
    image: "https://i.postimg.cc/pVgPzXgy/33.jpg",
    title: "通透立体极简道具陈列",
    tag: "ACRYLIC_04"
  },
  {
    image: "https://i.postimg.cc/rmDLRvjr/chen-lie2.png",
    title: "轻量模块化产品陈列台",
    tag: "ACRYLIC_05"
  },
  {
    image: "https://i.postimg.cc/NFTqpmWj/chen-lie6.png",
    title: "高亮折射中轴展示陈列柜",
    tag: "ACRYLIC_06"
  },
  {
    image: "https://i.postimg.cc/Mpz2mc54/chen-lie-jia-kang-shuai-xi-lie.jpg",
    title: "「抗衰系列」高定极简陈列架",
    tag: "ACRYLIC_07"
  },
  {
    image: "https://i.postimg.cc/d3dP4rzT/chen-lie-jia3.jpg",
    title: "透明亚克力美妆背柜陈列",
    tag: "ACRYLIC_08"
  },
  {
    image: "https://i.postimg.cc/9FdH9PP3/chen-lie-jia5.png",
    title: "悬浮发光矩阵概念陈列区",
    tag: "ACRYLIC_09"
  }
];

interface AcrylicLandscapeMarqueeProps {
  onSelectItem: (item: { image: string; text: string; index: number; list: { image: string; text: string }[] }) => void;
}

export const AcrylicLandscapeMarquee: React.FC<AcrylicLandscapeMarqueeProps> = ({ onSelectItem }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Duplicate items to ensure smooth wrap-around infinite scroll
  const duplicatedItems = [...ACRYLIC_LANDSCAPE_ITEMS, ...ACRYLIC_LANDSCAPE_ITEMS, ...ACRYLIC_LANDSCAPE_ITEMS];

  const lightboxList = ACRYLIC_LANDSCAPE_ITEMS.map(item => ({
    image: item.image,
    text: item.title
  }));

  // Fast scrolling speed: total loop of 9 items with total width (~3312px)
  const duration = isHovered ? 45 : 13;

  return (
    <div className="w-full py-20 bg-zinc-50 border-b border-zinc-150 overflow-hidden text-black relative">
      {/* Blueprint Grid Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(#e4e4e7_1px,transparent_1px)] [background-size:24px_24px] opacity-70 pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 mb-12 z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-xl font-black text-black">08 / 线下空间亚克力视觉造景</span>
            <span className="text-[10px] font-mono bg-black text-white hover:bg-teal-500 hover:text-black transition-colors px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
              LIGHT MARQUEE // 快速漫游
            </span>
          </div>
          <p className="text-xs text-zinc-500 font-mono tracking-widest uppercase mt-2">
            ACRYLIC VISUAL LANDSCAPING, REFLECTION SIMULATION AND OFFLINE retail DISPLAY DESIGN.
          </p>
        </div>

        {/* Dynamic Tips & Meta */}
        <div className="flex items-center gap-4 text-xs font-mono text-zinc-500 select-none">
          <div className="flex items-center gap-1.5 bg-white border border-zinc-200 px-3 py-1.5 rounded-lg text-black font-bold">
            <MoveHorizontal className="w-3.5 h-3.5 text-teal-600" />
            <span>速览模式 (鼠标悬停可减速)</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white border border-zinc-200 px-3 py-1.5 rounded-lg text-zinc-600 font-bold">
            <ZoomIn className="w-3.5 h-3.5" />
            <span>单击任意图片极致放大</span>
          </div>
        </div>
      </div>

      {/* Marquee Container */}
      <div 
        className="relative w-full overflow-hidden py-4 z-10 select-none cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Soft edge masking simulation */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-zinc-50 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-zinc-50 to-transparent z-20 pointer-events-none" />

        <motion.div 
          className="flex gap-6 w-max"
          animate={{ x: [0, -3312] }} // 9 items * (344px width + 24px gap) = 3312px
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: duration,
              ease: "linear",
            }
          }}
        >
          {duplicatedItems.map((item, idx) => {
            const originalIndex = idx % ACRYLIC_LANDSCAPE_ITEMS.length;
            return (
              <div 
                key={idx}
                onClick={() => onSelectItem({
                  image: item.image,
                  text: item.title,
                  index: originalIndex,
                  list: lightboxList
                })}
                className="relative w-[340px] shrink-0 group rounded-2xl bg-white border border-zinc-200 hover:border-black transition-all duration-300 shadow-sm hover:shadow-md overflow-hidden flex flex-col"
              >
                {/* Image area */}
                <div className="relative w-full h-[220px] overflow-hidden bg-zinc-100">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle glass hover overlay */}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                    <span className="flex items-center gap-1.5 bg-black/70 backdrop-blur-md text-white text-[10px] uppercase font-mono px-3.5 py-1.5 rounded-full border border-white/20 tracking-wider">
                      <Eye className="w-3.5 h-3.5" /> VIEWER
                    </span>
                  </div>
                </div>

                {/* Meta details footer */}
                <div className="p-4 border-t border-zinc-100 flex flex-col justify-between flex-1 bg-white">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">{item.tag}</span>
                    <span className="text-[8px] font-mono text-zinc-300 border border-zinc-200 px-1.5 rounded uppercase font-bold">RAW RENDER</span>
                  </div>
                  <h4 className="text-sm font-black text-black mt-1.5 group-hover:text-teal-600 transition-colors">
                    {item.title}
                  </h4>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};
