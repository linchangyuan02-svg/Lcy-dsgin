import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, MoveHorizontal, ZoomIn, Eye } from 'lucide-react';

export interface BrandTuningItem {
  image: string;
  title: string;
  tag: string;
}

const BRAND_TUNING_ITEMS: BrandTuningItem[] = [
  {
    image: "https://i.postimg.cc/h4rynJMd/1.png",
    title: "极简品牌空间美学",
    tag: "AESTHETIC_01"
  },
  {
    image: "https://i.postimg.cc/KcNqbKQr/1225.jpg",
    title: "材质物理折射仿真",
    tag: "MATERIAL_02"
  },
  {
    image: "https://i.postimg.cc/MZDPwctB/22.jpg",
    title: "工学折线纸艺结构",
    tag: "STRUCTURE_03"
  },
  {
    image: "https://i.postimg.cc/SQrT4XVz/23.jpg",
    title: "奢华精装礼盒工艺",
    tag: "PREMIUM_CRAFT_04"
  },
  {
    image: "https://i.postimg.cc/RCRsm3GJ/750.jpg",
    title: "刚性力学仿真检视",
    tag: "SIMULATION_05"
  },
  {
    image: "https://i.postimg.cc/c1m9WKT7/888.jpg",
    title: "光影重建物理材质",
    tag: "LIGHT_RAY_06"
  },
  {
    image: "https://i.postimg.cc/445LGKwQ/xiao-guo-tu.jpg",
    title: "高定包装打样渲染",
    tag: "RENDER_CORE_07"
  },
  {
    image: "https://i.postimg.cc/G3Q7RBzj/xiao-guo-tu2.jpg",
    title: "前庭零售场景延伸",
    tag: "RETAIL_CONCEPT_08"
  }
];

interface BrandTuningMarqueeProps {
  onSelectItem: (item: { image: string; text: string; index: number; list: { image: string; text: string }[] }) => void;
}

export const BrandTuningMarquee: React.FC<BrandTuningMarqueeProps> = ({ onSelectItem }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Duplicate items twice to ensure gapless infinite scroll coverage
  const duplicatedItems = [...BRAND_TUNING_ITEMS, ...BRAND_TUNING_ITEMS, ...BRAND_TUNING_ITEMS];

  // Helper map for lightbox cycling
  const lightboxList = BRAND_TUNING_ITEMS.map(item => ({
    image: item.image,
    text: item.title
  }));

  // Speed configuration: Fast (12s total duration for a seamless cycle of 8 items)
  const duration = isHovered ? 45 : 12;

  return (
    <div className="w-full py-20 bg-zinc-50 border-b border-zinc-150 overflow-hidden text-black relative">
      {/* Blueprint Grid Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(#e4e4e7_1px,transparent_1px)] [background-size:24px_24px] opacity-70 pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 mb-12 z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-xl font-black text-black">07 / 品牌调性的持续打磨</span>
            <span className="text-[10px] font-mono bg-black text-white hover:bg-teal-500 hover:text-black transition-colors px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
              FAST MARQUEE // 快速微调
            </span>
          </div>
          <p className="text-xs text-zinc-500 font-mono tracking-widest uppercase mt-2">
            RAPID HIGH-FREQUENCY ITERATION ON AESTHETICS, GRAPHICS, AND MATERIAL CALIBRATION.
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
          animate={{ x: [0, -2944] }} // 8 items * (344px width + 24px gap) = 2944px
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
            const originalIndex = idx % BRAND_TUNING_ITEMS.length;
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

                {/* Meta details footer with studio design cues */}
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
