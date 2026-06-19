import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Maximize2, 
  Minimize2, 
  Info,
  Layers,
  Sparkles,
  ExternalLink
} from 'lucide-react';

// Slide structure
interface PresentationSlide {
  url: string;
  id: number;
  label: string;
  title: string;
  description: string;
}

const COMMERCIAL_SLIDES: PresentationSlide[] = [
  {
    url: 'https://i.postimg.cc/vH2kH93z/huan-deng-pian5.jpg',
    id: 5,
    label: 'Slide 01 (P05)',
    title: '独立站视觉开发 · 创意美学定调',
    description: 'DEFINING THE LUXURY BRAND EXPERIENCE WITH ADVANCED OPTICAL RENDERING AND BALANCED TYPOGRAPHIC COMPOSITION.'
  },
  {
    url: 'https://i.postimg.cc/NfCSfTpD/huan-deng-pian8.jpg',
    id: 8,
    label: 'Slide 02 (P08)',
    title: '用户触点建构 · 核心结构表达',
    description: 'CRAFTING SYSTEMATIC PACKAGING HIERARCHIES AND METICULOUS DEEP SURFACE FINISHING CORRESPONDING TO DIGITAL OUTLETS.'
  },
  {
    url: 'https://i.postimg.cc/GhgVhYqz/huan-deng-pian15.jpg',
    id: 15,
    label: 'Slide 03 (P15)',
    title: '商业概念策划 · 极高精度提案',
    description: 'HIGH-FIDELITY ARCHITECTURAL SHELLS AND METALLIC INJECTIONS VERIFYING PREMIUM DESIGN SYSTEM SCHEMATICS.'
  },
  {
    url: 'https://i.postimg.cc/NfCSfTpp/huan-deng-pian18.jpg',
    id: 18,
    label: 'Slide 04 (P18)',
    title: '光学场景模拟 · 高端渲染重构',
    description: 'EXPLORING ULTRA-FINE PHYSICALLY BASED MATERIALS AND LIGHT DIFFRACTION TO DELIVER SENSORY DEPTH.'
  },
  {
    url: 'https://i.postimg.cc/J4Yv4JPY/huan-deng-pian21.jpg',
    id: 21,
    label: 'Slide 05 (P21)',
    title: '细节工艺演训 · 材料触感对接',
    description: 'MAPPING COMPLEX EMBOSSING, COATING, AND REFLECTIVE UV DUST CORRESPONDING TO PRECISE REPRODUCTION.'
  },
  {
    url: 'https://i.postimg.cc/65bg5RYP/huan-deng-pian24.jpg',
    id: 24,
    label: 'Slide 06 (P24)',
    title: '前沿视觉质感 · 跨境独立站体系',
    description: 'GLOBAL-READY ECOMMERCE PRESENTATIONS PAIRING MINIMALIST SWISS GRAPHICS WITH ELEGANT SCALED 3D MACRO PHOTOS.'
  },
  {
    url: 'https://i.postimg.cc/TYNFYmCS/huan-deng-pian27.jpg',
    id: 27,
    label: 'Slide 07 (P27)',
    title: '全维度美学交付 · 品牌调性打磨',
    description: 'PURSUING SYSTEMATIC EXCELLENCE ACROSS SEAMLESSLY ALIGNED PACKAGING SCHEMES AND WEB ASSETS.'
  },
  {
    url: 'https://i.postimg.cc/ZKs2K3V2/huan-deng-pian30.jpg',
    id: 30,
    label: 'Slide 08 (P30)',
    title: '光影片段雕刻 · 物理空间重构',
    description: 'THE LUXURY HARMONY OF STRUCTURAL MASS AND AMBIENT PENETRALIA SECURED THROUGH RIGOROUS REDSHIFT CALCULATIONS.'
  },
  {
    url: 'https://i.postimg.cc/GhgVhYX0/huan-deng-pian33.jpg',
    id: 33,
    label: 'Slide 09 (P33)',
    title: '智能材质探索 · 动态光影重叠',
    description: 'EXPLORING INNOVATIVE BIO-PLASTICS AND REFRACTIVE GLASS CORES WITHIN CONTROLLED PHOTOMETRIC ENVIRONMENTS.'
  },
  {
    url: 'https://i.postimg.cc/FsC8scTX/huan-deng-pian36.jpg',
    id: 36,
    label: 'Slide 10 (P36)',
    title: '未来概念包装 · 先锋方案定案',
    description: 'CONCLUDING THE IMMERSIVE PRESENTATION OF COMMERCIAL WORKFLOW INTEGRATING IDEATION SYSTEMATICS.'
  }
];

export function CommercialSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [direction, setDirection] = useState(1); // 1 = next, -1 = prev
  
  const autoPlayTimer = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Clear interval helpers
  const stopAutoplay = () => {
    if (autoPlayTimer.current) {
      clearInterval(autoPlayTimer.current);
      autoPlayTimer.current = null;
    }
  };

  // Autoplay handler
  useEffect(() => {
    if (isPlaying) {
      stopAutoplay();
      autoPlayTimer.current = setInterval(() => {
        handleNext();
      }, 5000);
    } else {
      stopAutoplay();
    }
    return () => stopAutoplay();
  }, [isPlaying, currentIndex]);

  // Touch and Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isFullscreen]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % COMMERCIAL_SLIDES.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + COMMERCIAL_SLIDES.length) % COMMERCIAL_SLIDES.length);
  };

  const handleSelectSlide = (idx: number) => {
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
    setIsPlaying(false); // pause on interaction
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Slider animation variations
  // Slide effect mimics the elegant physical flow
  const slideVariants = {
    initial: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.98
    }),
    animate: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 220, damping: 26 },
        opacity: { duration: 0.5 },
        scale: { duration: 0.5 }
      }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? '-50%' : '50%',
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { duration: 0.45, ease: 'easeInOut' },
        opacity: { duration: 0.3 }
      }
    })
  };

  return (
    <section 
      id="commercial-slideshow" 
      className={`relative w-full py-20 transition-colors duration-700 select-none ${
        isFullscreen ? 'bg-zinc-950 text-white' : 'bg-zinc-50 text-black border-b border-zinc-200'
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
      }}
    >
      {/* Decorative Blueprint Background Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.02] pointer-events-none" />
      
      {/* Section Header */}
      {!isFullscreen && (
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 mb-10 z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-xl font-black text-black uppercase tracking-tight">
                  04 / 独立站与商业视觉提案（PPT展示）
                </span>
                <span className="text-[10px] font-mono bg-zinc-900 text-white px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                  Commercial Slide-Deck
                </span>
              </div>
              <p className="text-xs text-zinc-500 font-mono tracking-widest uppercase mt-2">
                HIGH-RESOLUTION PRESENTATION SHAPE COMPREHENSIVE STRATEGIC DESIGN & DIGITAL BRANDING PROPOSALS.
              </p>
            </div>
            
            {/* Quick Helper Tip */}
            <div className="flex items-center gap-2 text-[11px] text-zinc-400 font-mono bg-white border border-zinc-200 px-3 py-1.5 rounded-md shadow-sm">
              <Info className="w-3.5 h-3.5 text-zinc-500" />
              <span>支持键盘键盘左右方向键(←/→)快速翻页</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Slide Deck Shell / Viewport */}
      <div 
        ref={containerRef}
        className={`relative mx-auto transition-all duration-500 ${
          isFullscreen 
            ? 'fixed inset-0 z-50 bg-zinc-950 flex flex-col justify-center px-4 py-8' 
            : 'max-w-7xl px-6 md:px-12'
        }`}
      >
        <div className="relative w-full max-w-[1280px] mx-auto">
          {/* Main 16:9 Image Aspect-Ratio Box */}
          <div 
            className={`relative w-full aspect-[16/9] bg-zinc-900 rounded-xl overflow-hidden shadow-2xl border ${
              isFullscreen ? 'border-zinc-800' : 'border-zinc-200/80 shadow-zinc-300/30'
            }`}
          >
            {/* Navigation Arrows inside screen */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 z-20 pointer-events-none">
              <button
                onClick={handlePrev}
                className="w-12 h-12 rounded-full flex items-center justify-center bg-black/50 hover:bg-black/80 text-white border border-white/10 hover:border-white/30 backdrop-blur-md hover:scale-105 active:scale-95 transition-all cursor-pointer pointer-events-auto opacity-0 group-hover:opacity-100 md:opacity-100"
                title="上一张 (Left Arrow)"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                className="w-12 h-12 rounded-full flex items-center justify-center bg-black/50 hover:bg-black/80 text-white border border-white/10 hover:border-white/30 backdrop-blur-md hover:scale-105 active:scale-95 transition-all cursor-pointer pointer-events-auto opacity-0 group-hover:opacity-100 md:opacity-100"
                title="下一张 (Right Arrow)"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Slide Animator */}
            <div className="absolute inset-0 overflow-hidden">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="absolute inset-0 select-none"
                >
                  <img 
                    src={COMMERCIAL_SLIDES[currentIndex].url} 
                    alt={COMMERCIAL_SLIDES[currentIndex].title}
                    className="w-full h-full object-cover select-none"
                    referrerPolicy="no-referrer"
                    draggable={false}
                  />
                  
                  {/* Bottom Text Bar in fullscreen mode */}
                  {isFullscreen && (
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 text-left flex justify-between items-end">
                      <div className="max-w-3xl">
                        <span className="text-[10px] font-mono tracking-widest text-teal-400 font-bold uppercase">
                          {COMMERCIAL_SLIDES[currentIndex].label}
                        </span>
                        <h2 className="text-xl md:text-2xl font-black text-white tracking-tight mt-1">
                          {COMMERCIAL_SLIDES[currentIndex].title}
                        </h2>
                        <p className="text-xs text-zinc-400 font-mono tracking-wide mt-1 leading-relaxed">
                          {COMMERCIAL_SLIDES[currentIndex].description}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-black font-mono text-zinc-400">
                          {String(currentIndex + 1).padStart(2, '0')} / {String(COMMERCIAL_SLIDES.length).padStart(2, '0')}
                        </span>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Fullscreen Overlay top right helper */}
            <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
              <button
                onClick={togglePlay}
                className="w-9 h-9 rounded-md bg-black/60 backdrop-blur-md border border-white/10 hover:border-white/30 text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer"
                title={isPlaying ? '暂停播放' : '自动播放'}
              >
                {isPlaying ? <Pause className="w-4 h-4 text-teal-400" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                onClick={toggleFullscreen}
                className="w-9 h-9 rounded-md bg-black/60 backdrop-blur-md border border-white/10 hover:border-white/30 text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer"
                title={isFullscreen ? '退出全屏' : '全屏展示'}
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>

            {/* Slide Index Progress Line at top edge */}
            <div className="absolute top-0 inset-x-0 h-1 bg-white/10 z-20">
              <motion.div 
                className="h-full bg-teal-400"
                initial={{ width: '0%' }}
                animate={{ width: `${((currentIndex + 1) / COMMERCIAL_SLIDES.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            
            {/* Quick Page Indicator in Bottom Center */}
            {!isFullscreen && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-mono font-bold text-white tracking-widest z-20">
                <span>{currentIndex + 1}</span>
                <span className="text-zinc-500 mx-2">/</span>
                <span className="text-zinc-400">{COMMERCIAL_SLIDES.length}</span>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Slide Info Card when NOT in fullscreen */}
        {!isFullscreen && (
          <div className="max-w-[1280px] mx-auto mt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Current Slide detailed text */}
            <div className="md:col-span-8 flex items-start gap-4 p-5 rounded-xl border border-zinc-200/70 bg-white shadow-sm shadow-zinc-200/40">
              <div className="p-3 bg-zinc-100 rounded-lg text-black">
                <Layers className="w-5 h-5 text-zinc-700" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-zinc-400 tracking-wider">
                    {COMMERCIAL_SLIDES[currentIndex].label}
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 font-mono">
                    Slide Proposal
                  </span>
                </div>
                <h3 className="text-lg font-black text-zinc-900 tracking-tight mt-1 select-text">
                  {COMMERCIAL_SLIDES[currentIndex].title}
                </h3>
                <p className="text-xs text-zinc-500 font-mono tracking-wide mt-1.5 leading-relaxed select-text">
                  {COMMERCIAL_SLIDES[currentIndex].description}
                </p>
              </div>
            </div>

            {/* Carousel Interactive Controls Panel */}
            <div className="md:col-span-4 flex flex-col gap-3">
              {/* Autoplay / Playback panel */}
              <div className="flex items-center justify-between p-4 rounded-xl border border-zinc-200/70 bg-white shadow-sm">
                <span className="text-xs font-bold font-mono text-zinc-700">AUTOPLAY (自动轮播)</span>
                <button
                  onClick={togglePlay}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-mono font-bold border transition-all cursor-pointer ${
                    isPlaying 
                      ? 'bg-teal-500/10 border-teal-500/20 text-teal-600' 
                      : 'bg-zinc-100 border-zinc-200 text-zinc-700 hover:bg-zinc-200'
                  }`}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5 text-teal-500 animated rotate" />
                      <span>ON (正在播放)</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5" />
                      <span>OFF (暂停中)</span>
                    </>
                  )}
                </button>
              </div>

              {/* Theater expansion banner */}
              <button 
                onClick={toggleFullscreen}
                className="w-full flex items-center justify-center gap-2.5 p-3.5 rounded-xl border border-zinc-900 bg-zinc-900 hover:bg-zinc-950 text-white hover:shadow-md hover:shadow-zinc-950/20 active:scale-[0.99] transition-all cursor-pointer text-xs font-bold tracking-widest uppercase font-mono"
              >
                <Maximize2 className="w-4 h-4 text-teal-400" />
                <span>进入全屏沉浸演示馆</span>
              </button>
            </div>
          </div>
        )}

        {/* Thumbnail Reel Strip - filmstrip navigation below */}
        <div className={`w-full max-w-[1280px] mx-auto mt-8 ${isFullscreen ? 'mt-4' : ''}`}>
          <div className="flex items-center gap-2.5 mb-3 px-1">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className={`text-[11px] font-mono font-bold tracking-wider uppercase ${isFullscreen ? 'text-zinc-500' : 'text-zinc-600'}`}>
              Thumbnail Deck Filmstrip (核心视效稿胶片导航)
            </span>
          </div>

          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent py-1">
            <div className="flex gap-4 min-w-max pb-2">
              {COMMERCIAL_SLIDES.map((slide, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={slide.id}
                    onClick={() => handleSelectSlide(idx)}
                    className={`relative w-[140px] aspect-[16/9] rounded-lg overflow-hidden border-2 transition-all duration-300 transform outline-none flex-shrink-0 cursor-pointer ${
                      isActive 
                        ? 'border-teal-400 scale-[1.04] shadow-md shadow-teal-400/20' 
                        : 'border-zinc-200/50 hover:border-zinc-400/80 hover:scale-[1.02] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img 
                      src={slide.url} 
                      alt={`Thumb P${slide.id}`}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Dark gradient gloss */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                    
                    {/* Small tag */}
                    <div className="absolute bottom-1 right-1.5 px-1 py-0.5 bg-black/60 rounded text-[9px] font-bold text-white font-mono scale-90">
                      P{slide.id}
                    </div>
                    
                    {/* Active highlight bar */}
                    {isActive && (
                      <div className="absolute inset-x-0 bottom-0 h-1 bg-teal-400" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
