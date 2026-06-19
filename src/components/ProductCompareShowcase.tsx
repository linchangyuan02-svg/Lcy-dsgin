import React, { useState, useRef, useEffect } from 'react';
import mainImage from '../assets/images/regenerated_image_1781070883592.jpg';
import cardImage2 from '../assets/images/regenerated_image_1781578348161.png';

interface CompareProduct {
  id: string;
  title: string;
  colorImg: string;
  compareImg: string;
}

// Curated high-fidelity product color render pairings
const COMPARE_DATA: CompareProduct[] = [
  {
    id: 'comp-1',
    title: '第一张图',
    colorImg: 'https://i.postimg.cc/B6Fy4KxF/hua-ban-1.png',
    compareImg: 'https://i.postimg.cc/ncfsFftQ/hua-ban-1-kao-bei-5.png'
  },
  {
    id: 'comp-2',
    title: '第二张图',
    colorImg: 'https://i.postimg.cc/1zf27TXr/hua-ban-1-kao-bei-10.png',
    compareImg: 'https://i.postimg.cc/wj67N5Mv/hua-ban-1-kao-bei.png'
  },
  {
    id: 'comp-3',
    title: '第三张图',
    colorImg: 'https://i.postimg.cc/J48w7PYH/hua-ban-1-kao-bei-2.png',
    compareImg: 'https://i.postimg.cc/0y8bSGj6/hua-ban-1.png'
  },
  {
    id: 'comp-4',
    title: '第四张图',
    colorImg: 'https://i.postimg.cc/Gm3ZG917/hua-ban-1-kao-bei-3.png',
    compareImg: 'https://i.postimg.cc/RVx3SxzW/hua-ban-1-kao-bei-2.png'
  },
  {
    id: 'comp-5',
    title: '第五张图',
    colorImg: 'https://i.postimg.cc/YCXT3krw/hua-ban-1-kao-bei-4.png',
    compareImg: 'https://i.postimg.cc/0y8bSGQX/hua-ban-1-kao-bei-8.png'
  },
  {
    id: 'comp-6',
    title: '第六张图',
    colorImg: 'https://i.postimg.cc/cL1Vw6SN/hua-ban-1-kao-bei-5.png',
    compareImg: 'https://i.postimg.cc/hP8XhZS6/hua-ban-1-kao-bei-7.png'
  },
  {
    id: 'comp-7',
    title: '第七张图',
    colorImg: 'https://i.postimg.cc/y8f2PB1d/hua-ban-1-kao-bei-6.png',
    compareImg: 'https://i.postimg.cc/4NvYn2Jz/hua-ban-1-kao-bei-6.png'
  },
  {
    id: 'comp-8',
    title: '第八张图',
    colorImg: 'https://i.postimg.cc/Cxv9NYhZ/hua-ban-1-kao-bei-7.png',
    compareImg: 'https://i.postimg.cc/jdYWxYrj/hua-ban-1-kao-bei-4.png'
  },
  {
    id: 'comp-9',
    title: '第九张图',
    colorImg: 'https://i.postimg.cc/K89CNFGB/hua-ban-1-kao-bei-8.png',
    compareImg: 'https://i.postimg.cc/bwzsn0rX/hua-ban-1-kao-bei-9.png'
  },
  {
    id: 'comp-10',
    title: '第十张图',
    colorImg: 'https://i.postimg.cc/vmck2jTL/hua-ban-1-kao-bei-9.png',
    compareImg: 'https://i.postimg.cc/t4XY6dJX/hua-ban-1-kao-bei-10.png'
  }
];

export const ProductCompareShowcase: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<CompareProduct | null>(null);

  // Pinterest horizontal swipe track state with advanced scroll velocity physics
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeftState, setScrollLeftState] = useState<number>(0);
  const [isHoveredTrack, setIsHoveredTrack] = useState<boolean>(false);

  // Velocity tracking variables for premium organic sway
  const [scrollVelocity, setScrollVelocity] = useState<number>(0);
  const lastScrollLeft = useRef<number>(0);
  const lastScrollTime = useRef<number>(0);

  // Monitor scroll progress and calculate instantaneous velocity
  const handleScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const now = performance.now();
    const currentScrollLeft = el.scrollLeft;
    const dt = now - lastScrollTime.current;

    if (dt > 10) {
      const dx = currentScrollLeft - lastScrollLeft.current;
      const speedRaw = dx / dt; // pixels per millisecond
      // Filter out huge wrap-around loops to prevent jitter on end-of-track jumps
      if (Math.abs(dx) < 300) {
        setScrollVelocity(prev => prev * 0.75 + speedRaw * 0.25);
      }
      lastScrollLeft.current = currentScrollLeft;
      lastScrollTime.current = now;
    } else if (lastScrollTime.current === 0) {
      lastScrollLeft.current = currentScrollLeft;
      lastScrollTime.current = now;
    }
  };

  // Smoothly decay scroll velocity back to zero when idle
  useEffect(() => {
    let decayFrameId: number;
    const decay = () => {
      setScrollVelocity(prev => {
        if (Math.abs(prev) < 0.005) return 0;
        return prev * 0.88; // Organic smooth drag decay
      });
      decayFrameId = requestAnimationFrame(decay);
    };
    decayFrameId = requestAnimationFrame(decay);
    return () => cancelAnimationFrame(decayFrameId);
  }, []);

  // Fast continuous auto-scrolling effect
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    let animationFrameId: number;
    // Fast automatic speed: 3.0 pixels per frame for perfect cinematic roll
    const scrollSpeed = 3.0;

    const scrollTick = () => {
      // Scroll if not dragged, not hovered
      if (!isDown && !isHoveredTrack) {
        el.scrollLeft += scrollSpeed;
        
        // Endless loop wrap
        const maxScroll = el.scrollWidth - el.clientWidth;
        if (el.scrollLeft >= maxScroll - 2) {
          el.scrollLeft = 2; // Jump back smoothly
        }
      }
      animationFrameId = requestAnimationFrame(scrollTick);
    };

    animationFrameId = requestAnimationFrame(scrollTick);
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDown, isHoveredTrack]);

  // Mouse drag-to-scroll controls for desktop
  const onMouseDown = (e: React.MouseEvent) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setIsDown(true);
    setStartX(e.pageX - el.offsetLeft);
    setScrollLeftState(el.scrollLeft);
  };

  const onMouseLeave = () => {
    setIsDown(false);
  };

  const onMouseUp = () => {
    setIsDown(false);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDown) return;
    e.preventDefault();
    const el = scrollContainerRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX) * 2.8; // High swipe sensitivity for fast desktop drag
    el.scrollLeft = scrollLeftState - walk;
  };

  // Connect vertical wheel motions to high-speed horizontal scrolling when hovering the track
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      // Acceleration multiplier (2.2x) for lightning-fast horizontal scrolling
      el.scrollLeft += e.deltaY * 2.2;
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', onWheel);
    };
  }, []);

  // Tripled elements array for seamless infinite looping
  const INFINITE_DATA = [...COMPARE_DATA, ...COMPARE_DATA, ...COMPARE_DATA, ...COMPARE_DATA, ...COMPARE_DATA];

  return (
    <div className="relative w-full overflow-hidden select-none py-4 bg-white">
      <div className="px-6 sm:px-12 mb-4">
        <span className="text-xl font-black text-black">02 / 从设计到细节的全方位渲染</span>
      </div>
      {/* Horizontal Viewport */}
      <div
        ref={scrollContainerRef}
        onMouseDown={onMouseDown}
        onMouseLeave={() => {
          onMouseLeave();
          setIsHoveredTrack(false);
        }}
        onMouseEnter={() => setIsHoveredTrack(true)}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        onScroll={handleScroll}
        className="w-full overflow-x-auto overflow-y-visible cursor-grab active:cursor-grabbing flex items-center gap-6 sm:gap-8 py-6 scrollbar-none snap-x select-none"
        style={{ 
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        {/* Left spacing safety padding filler */}
        <div className="w-[16px] sm:w-[48px] shrink-0 pointer-events-none" />

        {INFINITE_DATA.map((item, index) => {
          // Dynamic kinetic physics parameters calculated in real time
          const baseRotations = [-0.6, 0.8, -1.2, 0.5, -0.8, 1.1, -0.5];
          const baseRot = baseRotations[index % baseRotations.length] || 0;
          
          // Micro kinetic rotation based on scroll speed (organic soft sway)
          const dynamicRot = baseRot + Math.max(-10, Math.min(10, scrollVelocity * 12));
          // Squeeze down slightly on movement speed for subtle physical weight / elastic depth
          const dynamicScale = 1 - Math.min(0.04, Math.abs(scrollVelocity) * 0.015);
          // Side-to-side shear skew for high speeds
          const dynamicSkew = Math.max(-2, Math.min(2, scrollVelocity * 3));

          return (
            <div
              key={`${item.id}-${index}`}
              onClick={() => setSelectedProduct(item)}
              style={{
                transform: `rotateZ(${dynamicRot}deg) skewX(${dynamicSkew}deg) scale(${dynamicScale})`,
                transition: 'transform 450ms cubic-bezier(0.1, 0.9, 0.2, 1)',
                transformOrigin: 'bottom center'
              }}
              className="relative h-[180px] sm:h-[260px] md:h-[320px] aspect-square shrink-0 rounded-[20px] overflow-hidden bg-zinc-50 border border-zinc-200/40 shadow-[0_8px_30px_rgba(0,0,0,0.04)] select-none cursor-pointer"
            >
              <img
                src={item.colorImg}
                alt={item.title}
                className="w-full h-full object-cover select-none transition-transform duration-500 hover:scale-103"
                referrerPolicy="no-referrer"
              />
            </div>
          );
        })}

        {/* Right spacing safety padding filler */}
        <div className="w-[16px] sm:w-[48px] shrink-0 pointer-events-none" />
      </div>

      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </div>
  );
};

const ProductModal: React.FC<{ product: CompareProduct, onClose: () => void }> = ({ product, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md" onClick={onClose}>
      <div 
        className="relative w-full max-w-2xl bg-zinc-950 rounded-2xl overflow-hidden shadow-2xl select-none border border-neutral-800/40" 
        onClick={e => e.stopPropagation()}
      >
        {/* Header bar within the direct modal */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-sm">
          <span className="text-[11px] font-mono text-zinc-400 tracking-wider font-bold uppercase">
            3D RENDER DETAIL // 高精渲染细节
          </span>
          <button 
            onClick={onClose}
            className="text-zinc-500 hover:text-white text-xs cursor-pointer tracking-wider font-mono uppercase bg-zinc-900 hover:bg-zinc-800 px-3 py-1 rounded-md transition-colors"
          >
            ✕ CLOSE
          </button>
        </div>

        {/* High quality single image display */}
        <div className="relative w-full aspect-square bg-zinc-950 flex items-center justify-center p-2.5">
          <img 
            src={product.colorImg} 
            className="w-full h-full object-contain rounded-lg pointer-events-none select-none" 
            alt={product.title} 
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </div>
  );
};
