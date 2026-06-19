import React, { useRef, useEffect, useCallback, useState } from 'react';
import { gsap } from 'gsap';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, ChevronLeft, ChevronRight, Maximize, Eye, ZoomIn, Layers } from 'lucide-react';
import './MagicBento.css';

const DEFAULT_PARTICLE_COUNT = 15;
const DEFAULT_SPOTLIGHT_RADIUS = 320;
const DEFAULT_GLOW_COLOR = '13, 148, 136'; // Teal accent
const MOBILE_BREAKPOINT = 768;

export interface BentoItem {
  id: number;
  cover: string;
  title: string;
  engTitle: string;
  label: string;
  description: string;
  gallery: string[];
}

export const EXPORT_BENTO_ITEMS: BentoItem[] = [
  {
    id: 1,
    cover: "https://i.postimg.cc/ZnjxNKc9/AD-AGNE-NIGHT-CREAM.jpg",
    title: "AD-AGNE 祛痘修护系列",
    engTitle: "AD-AGNE Anti-Acne Advanced Reconstruction",
    label: "抗痘晚霜 / 晶莹磨砂",
    description: "高精透光折射，还原微米级磨砂玻璃质地，光影漫反射柔润饱满。",
    gallery: [
      "https://i.postimg.cc/T1QJbY9T/AD-AGNE-FACIAL-WASH.jpg",
      "https://i.postimg.cc/tJDN6C54/AD-DA-SUNSCREEN-30.jpg",
      "https://i.postimg.cc/jddXbPxr/wei-xin-tu-pian-20241229174314.png",
      "https://i.postimg.cc/TY7cY11H/wei-xin-tu-pian-20241229174321.png"
    ]
  },
  {
    id: 2,
    cover: "https://i.postimg.cc/7P1sDqS7/AD-DA-SPOT-NIGHT-CREAM2.jpg",
    title: "AD-DA 净斑白金系列",
    engTitle: "AD-DA Spots Correction & Pearl Whitening",
    label: "淡斑晚霜 / 双层外壳",
    description: "双层厚壁高透亚克力注塑仿真，无缝边缘合缝线极致细腻。",
    gallery: [
      "https://i.postimg.cc/qBcb0p2s/AD-DA-SPOT-NIGHT-CREAM.jpg",
      "https://i.postimg.cc/y6hQB70P/AD-DA-SPOT-SUNSCREEN.jpg",
      "https://i.postimg.cc/3rjS73gQ/AD-DARR-SPOT-FACIAL-WASH.jpg",
      "https://i.postimg.cc/5NxP2DmT/AD-DR-LOTION.jpg"
    ]
  },
  {
    id: 3,
    cover: "https://i.postimg.cc/DzWpKscY/AD-BRIGHTENING-SUNSCREEN.jpg",
    title: "AD 焕白流金系列",
    engTitle: "AD Brightening Radiant Essence Guard",
    label: "美白防晒 / 渐变鎏金",
    description: "高光泽电镀漆面金属感渐变，真空电镀泵盖与泵头模型逼真。",
    gallery: [
      "https://i.postimg.cc/QMBYr5qb/ad-br-lotion.jpg",
      "https://i.postimg.cc/R03pzfTT/ad-br-night-cream.jpg",
      "https://i.postimg.cc/KYKpyL5r/ad-br-serum.jpg",
      "https://i.postimg.cc/zf9tDBd0/br-sunscreen.jpg"
    ]
  },
  {
    id: 4,
    cover: "https://i.postimg.cc/02x4Jz8s/AD-ANTI-AGING-SUNCAREEN-30.jpg",
    title: "AD 青春御龄系列",
    engTitle: "AD Age-Defying Intensive Nutrition",
    label: "抗老防晒 / 艳红哑光",
    description: "艺术级微哑光内喷漆效果，辅以烫黑极窄文字排布，高贵典雅。",
    gallery: [
      "https://i.postimg.cc/ncZWQXnP/AD-ANTI-AGING-NIGHT-CREAM.jpg",
      "https://i.postimg.cc/SNqPznyp/AD-ANTI-SERUM.jpg",
      "https://i.postimg.cc/pXxSnm2x/AD-ANTIAGING-NIGHT-CREAM.jpg",
      "https://i.postimg.cc/pXxSnm2x/AD-ANTIAGING-NIGHT-CREAM.jpg"
    ]
  },
  {
    id: 5,
    cover: "https://i.postimg.cc/jjCmdBRc/1.png",
    title: "高定真空玻璃管瓶",
    engTitle: "Premium Bespoke Glass Ampoule Flasks",
    label: "真空泵芯 / 极窄边框",
    description: "悬浮式真空内胆受力校验完美呈现，拉丝氧化铝泵帽分毫入神。",
    gallery: [
      "https://i.postimg.cc/FKqqfGKc/2.png",
      "https://i.postimg.cc/HLjRsFT2/4.png",
      "https://i.postimg.cc/wB3ZTn9k/5.png"
    ]
  },
  {
    id: 6,
    cover: "https://i.postimg.cc/GtY13VJv/AD-HY-SUNSCREEN.jpg",
    title: "AD 玻尿酸保湿系列",
    engTitle: "AD Hyaluronic Absolute Hydration",
    label: "深海沁透 / 烫银工艺",
    description: "深洋蓝半通透高分子工艺精调仿真，配以亮银印花文字排版。",
    gallery: [
      "https://i.postimg.cc/gjRPcQqR/ad-HY-lotion.jpg",
      "https://i.postimg.cc/zvW1D6SS/hy-cream.jpg",
      "https://i.postimg.cc/PJZkf9zM/hy-serum.jpg",
      "https://i.postimg.cc/sxSRfq9m/sunscreen.jpg"
    ]
  },
  {
    id: 7,
    cover: "https://i.postimg.cc/L8mMRyqQ/PEELING-CREAM.jpg",
    title: "AD 焕新角质调理霜",
    engTitle: "AD Peeling Cream & Repair Serum Duo",
    label: "角质调理 / 活肤修复",
    description: "极致漫反射物理微粒模拟，精准表现乳霜的高弹物理折射度与活性光晕。",
    gallery: [
      "https://i.postimg.cc/L8mMRyqQ/PEELING-CREAM.jpg",
      "https://i.postimg.cc/2SCfmHqX/REPAIR-SERUM.jpg"
    ]
  },
  {
    id: 8,
    cover: "https://i.postimg.cc/xCwWZgDN/6.png",
    title: "奢宠鎏金安瓶修护系列",
    engTitle: "Platinum Ampoule Restorative Collection",
    label: "鎏金安瓶 / 电镀反光",
    description: "高水准真空电镀、拉丝氧化铝与磨砂水晶玻璃合体渲染，极精细细节展现。",
    gallery: [
      "https://i.postimg.cc/qRP9FQVp/1.png",
      "https://i.postimg.cc/PxgB7Kst/4.png",
      "https://i.postimg.cc/26sPtTR1/5.png",
      "https://i.postimg.cc/nzy6WTbV/2.png",
      "https://i.postimg.cc/NM3Wnbqs/3.png"
    ]
  }
];

const createParticleElement = (x: number, y: number, color: string = DEFAULT_GLOW_COLOR) => {
  const el = document.createElement('div');
  el.className = 'particle';
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 50;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

const calculateSpotlightValues = (radius: number) => ({
  proximity: radius * 0.5,
  fadeDistance: radius * 0.75
});

const updateCardGlowProperties = (card: HTMLElement, mouseX: number, mouseY: number, glow: number, radius: number) => {
  const rect = card.getBoundingClientRect();
  const relativeX = ((mouseX - rect.left) / rect.width) * 100;
  const relativeY = ((mouseY - rect.top) / rect.height) * 100;

  card.style.setProperty('--glow-x', `${relativeX}%`);
  card.style.setProperty('--glow-y', `${relativeY}%`);
  card.style.setProperty('--glow-intensity', glow.toString());
  card.style.setProperty('--glow-radius', `${radius}px`);
};

interface ParticleCardProps {
  children: React.ReactNode;
  className?: string;
  disableAnimations?: boolean;
  style?: React.CSSProperties;
  particleCount?: number;
  glowColor?: string;
  enableTilt?: boolean;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
  onClick?: () => void;
}

const ParticleCard: React.FC<ParticleCardProps> = ({
  children,
  className = '',
  disableAnimations = false,
  style,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  enableTilt = true,
  clickEffect = true,
  enableMagnetism = true,
  onClick
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const timeoutsRef = useRef<number[]>([]);
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef<HTMLDivElement[]>([]);
  const particlesInitialized = useRef(false);
  const magnetismAnimationRef = useRef<gsap.core.Tween | null>(null);

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return;

    const { width, height } = cardRef.current.getBoundingClientRect();
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      createParticleElement(Math.random() * width, Math.random() * height, glowColor)
    );
    particlesInitialized.current = true;
  }, [particleCount, glowColor]);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(window.clearTimeout);
    timeoutsRef.current = [];
    magnetismAnimationRef.current?.kill();

    particlesRef.current.forEach(particle => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'back.in(1.7)',
        onComplete: () => {
          particle.parentNode?.removeChild(particle);
        }
      });
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;

    if (!particlesInitialized.current) {
      initializeParticles();
    }

    memoizedParticles.current.forEach((particle, index) => {
      const timeoutId = window.setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;

        const clone = particle.cloneNode(true) as HTMLDivElement;
        cardRef.current.appendChild(clone);
        particlesRef.current.push(clone);

        gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });

        gsap.to(clone, {
          x: (Math.random() - 0.5) * 80,
          y: (Math.random() - 0.5) * 80,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: 'none',
          repeat: -1,
          yoyo: true
        });

        gsap.to(clone, {
          opacity: 0.3,
          duration: 1.5,
          ease: 'power2.inOut',
          repeat: -1,
          yoyo: true
        });
      }, index * 100);

      timeoutsRef.current.push(timeoutId);
    });
  }, [initializeParticles]);

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return;

    const element = cardRef.current;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      animateParticles();

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 3,
          rotateY: 3,
          duration: 0.3,
          ease: 'power2.out',
          transformPerspective: 1000
        });
      }
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }

      if (enableMagnetism) {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!enableTilt && !enableMagnetism) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      if (enableTilt) {
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;

        gsap.to(element, {
          rotateX,
          rotateY,
          duration: 0.1,
          ease: 'power2.out',
          transformPerspective: 1000
        });
      }

      if (enableMagnetism) {
        const magnetX = (x - centerX) * 0.03;
        const magnetY = (y - centerY) * 0.03;

        magnetismAnimationRef.current = gsap.to(element, {
          x: magnetX,
          y: magnetY,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };

    const handleElementClick = (e: MouseEvent) => {
      if (clickEffect) {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const maxDistance = Math.max(
          Math.hypot(x, y),
          Math.hypot(x - rect.width, y),
          Math.hypot(x, y - rect.height),
          Math.hypot(x - rect.width, y - rect.height)
        );

        const ripple = document.createElement('div');
        ripple.style.cssText = `
          position: absolute;
          width: ${maxDistance * 2}px;
          height: ${maxDistance * 2}px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(${glowColor}, 0.3) 0%, rgba(${glowColor}, 0.1) 40%, transparent 70%);
          left: ${x - maxDistance}px;
          top: ${y - maxDistance}px;
          pointer-events: none;
          z-index: 99;
        `;

        element.appendChild(ripple);

        gsap.fromTo(
          ripple,
          { scale: 0, opacity: 1 },
          {
            scale: 1,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out',
            onComplete: () => ripple.remove()
          }
        );
      }
      
      if (onClick) {
        onClick();
      }
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('click', handleElementClick);

    return () => {
      isHoveredRef.current = false;
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('click', handleElementClick);
      clearAllParticles();
    };
  }, [animateParticles, clearAllParticles, disableAnimations, enableTilt, enableMagnetism, clickEffect, glowColor, onClick]);

  return (
    <div
      ref={cardRef}
      className={`${className} particle-container`}
      style={{ ...style, position: 'relative', overflow: 'hidden' }}
    >
      {children}
    </div>
  );
};

const GlobalSpotlight: React.FC<{
  gridRef: React.RefObject<HTMLDivElement | null>;
  disableAnimations?: boolean;
  enabled?: boolean;
  spotlightRadius?: number;
  glowColor?: string;
}> = ({
  gridRef,
  disableAnimations = false,
  enabled = true,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  glowColor = DEFAULT_GLOW_COLOR
}) => {
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const isInsideSection = useRef(false);

  useEffect(() => {
    if (disableAnimations || !gridRef?.current || !enabled) return;

    const spotlight = document.createElement('div');
    spotlight.className = 'global-spotlight';
    spotlight.style.cssText = `
      position: fixed;
      width: 600px;
      height: 600px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${glowColor}, 0.12) 0%,
        rgba(${glowColor}, 0.06) 15%,
        rgba(${glowColor}, 0.03) 30%,
        transparent 70%
      );
      z-index: 100;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    `;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const handleMouseMove = (e: MouseEvent) => {
      if (!spotlightRef.current || !gridRef.current) return;

      const section = gridRef.current.closest('.bento-section');
      const rect = section?.getBoundingClientRect();
      const mouseInside =
        rect && e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;

      isInsideSection.current = mouseInside || false;
      const cards = gridRef.current.querySelectorAll('.magic-bento-card');

      if (!mouseInside) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
        cards.forEach(card => {
          (card as HTMLElement).style.setProperty('--glow-intensity', '0');
        });
        return;
      }

      const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius);
      let minDistance = Infinity;

      cards.forEach(card => {
        const cardElement = card as HTMLElement;
        const cardRect = cardElement.getBoundingClientRect();
        const centerX = cardRect.left + cardRect.width / 2;
        const centerY = cardRect.top + cardRect.height / 2;
        const distance =
          Math.hypot(e.clientX - centerX, e.clientY - centerY) - Math.max(cardRect.width, cardRect.height) / 2;
        const effectiveDistance = Math.max(0, distance);

        minDistance = Math.min(minDistance, effectiveDistance);

        let glowIntensity = 0;
        if (effectiveDistance <= proximity) {
          glowIntensity = 1;
        } else if (effectiveDistance <= fadeDistance) {
          glowIntensity = (fadeDistance - effectiveDistance) / (fadeDistance - proximity);
        }

        updateCardGlowProperties(cardElement, e.clientX, e.clientY, glowIntensity, spotlightRadius);
      });

      gsap.to(spotlightRef.current, {
        left: e.clientX,
        top: e.clientY,
        duration: 0.1,
        ease: 'power2.out'
      });

      const targetOpacity =
        minDistance <= proximity
          ? 0.8
          : minDistance <= fadeDistance
            ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8
            : 0;

      gsap.to(spotlightRef.current, {
        opacity: targetOpacity,
        duration: targetOpacity > 0 ? 0.2 : 0.5,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      isInsideSection.current = false;
      gridRef.current?.querySelectorAll('.magic-bento-card').forEach(card => {
        (card as HTMLElement).style.setProperty('--glow-intensity', '0');
      });
      if (spotlightRef.current) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);
    };
  }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor]);

  return null;
};

interface MagicBentoProps {
  onSelectItem?: (item: BentoItem) => void;
}

export const MagicBento: React.FC<MagicBentoProps> = ({ onSelectItem }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeItem, setActiveItem] = useState<BentoItem | null>(null);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number>(0);
  const [zoomImg, setZoomImg] = useState<string | null>(null);

  // Check mobile width dynamically
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkSize = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  const handleCardClick = (item: BentoItem) => {
    setActiveItem(item);
    setActiveGalleryIndex(0);
    setZoomImg(null);
    if (onSelectItem) {
      onSelectItem(item);
    }
  };

  return (
    <div className="w-full py-24 bg-zinc-50 border-b border-zinc-150 relative text-black">
      {/* Decorative Blueprint Background Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#e4e4e7_1.2px,transparent_1.2px)] [background-size:20px_20px] opacity-70 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="mb-14 space-y-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-xl font-black text-black">03 / 外贸系列产品渲染</span>
                <span className="text-[10px] font-mono bg-teal-500 text-black px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                  BENTO GRID // 精密漫反射
                </span>
              </div>
              <p className="text-xs text-zinc-500 font-mono tracking-widest uppercase mt-2">
                FOREIGN TRADE COSMETIC EXPORT RENDERS, COMPREHENSIVE MATERIAL ACCU-MIMICRY.
              </p>
            </div>

            {/* Micro details indicator */}
            <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono">
              <div className="w-2.5 h-2.5 bg-teal-500 rounded-full animate-ping" />
              <span>MULTIPLE ALBUMS ACTIVE (CLICK TO UNVEIL)</span>
            </div>
          </div>
        </div>

        {/* Global Spotlight Controller */}
        <GlobalSpotlight
          gridRef={gridRef}
          disableAnimations={isMobile}
          enabled={true}
          spotlightRadius={DEFAULT_SPOTLIGHT_RADIUS}
          glowColor={DEFAULT_GLOW_COLOR}
        />

        {/* 3D Bento Grid Structure */}
        <div className="card-grid bento-section" ref={gridRef}>
          {EXPORT_BENTO_ITEMS.map((item) => {
            const baseClassName = "magic-bento-card magic-bento-card--border-glow group relative";
            const cardProps = {
              className: baseClassName,
              style: {
                backgroundColor: "#121214",
                '--glow-color': DEFAULT_GLOW_COLOR
              } as React.CSSProperties
            };

            return (
              <ParticleCard
                key={item.id}
                {...cardProps}
                disableAnimations={isMobile}
                particleCount={DEFAULT_PARTICLE_COUNT}
                glowColor={DEFAULT_GLOW_COLOR}
                enableTilt={true}
                clickEffect={true}
                enableMagnetism={true}
                onClick={() => handleCardClick(item)}
              >
                {/* Background Image of the Card */}
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  <img
                    src={item.cover}
                    alt={item.title}
                    className="w-full h-full object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {/* Premium dark gradient shadow overlay to keep typography readable */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-900/30 to-black/10 transition-opacity duration-300 group-hover:via-neutral-900/40" />
                </div>

                {/* Floating Meta Details / Badge */}
                <div className="magic-bento-card__header">
                  <span className="text-[9px] font-mono tracking-widest text-teal-400 bg-teal-950/80 border border-teal-500/20 px-2 py-0.5 rounded font-black uppercase">
                    {item.label.split(' / ')[0]}
                  </span>
                  <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-[10px] font-mono text-zinc-300 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10 flex items-center gap-1">
                      <Eye className="w-3 h-3 text-teal-400" /> VIEW WORKBOX
                    </span>
                  </div>
                </div>

                {/* Bottom Content Area */}
                <div className="magic-bento-card__content z-10">
                  <span className="text-[10px] font-mono text-zinc-400 mt-1 block uppercase tracking-wider">{item.engTitle}</span>
                  <h3 className="magic-bento-card__title text-lg font-black tracking-tight text-white mt-1 group-hover:text-teal-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="magic-bento-card__description text-xs text-zinc-300 leading-relaxed font-light mt-1.5 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300">
                    {item.description}
                  </p>
                </div>
              </ParticleCard>
            );
          })}
        </div>

      </div>

      {/* Pop-up Multi-Image Lightbox Slider Overlay */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-8 bg-neutral-950/95 backdrop-blur-md select-none text-white overflow-hidden"
          >
            {/* Ambient matching back glow */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-teal-500/10 rounded-full filter blur-3xl pointer-events-none" />
            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-teal-500/10 rounded-full filter blur-3xl pointer-events-none" />

            {/* Click outside target */}
            <div className="absolute inset-0" onClick={() => setActiveItem(null)} />

            <div className="relative w-full max-w-6xl bg-zinc-900 border border-zinc-800 rounded-2xl flex flex-col lg:grid lg:grid-cols-12 overflow-hidden shadow-2xl z-20">
              
              {/* Close Button */}
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 z-50 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/10 hover:border-white/30 flex items-center justify-center transition-all cursor-pointer shadow-lg hover:scale-105"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left Side: Dynamic Gallery Slider (cols-7) */}
              <div className="lg:col-span-7 bg-black/50 p-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-zinc-800 relative">
                {/* Floating count */}
                <div className="absolute top-6 left-6 z-10 bg-black/60 backdrop-blur-md border border-white/15 px-3 py-1 rounded-full text-[10px] font-mono text-zinc-300">
                  IMAGE {activeGalleryIndex + 1} OF {activeItem.gallery.length} // DETAIL RESOLUTION
                </div>

                {/* Main Slider Display Area */}
                <div className="flex-1 w-full flex items-center justify-center min-h-[320px] md:min-h-[460px] relative overflow-hidden group/zoom">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeGalleryIndex}
                      src={activeItem.gallery[activeGalleryIndex]}
                      alt="Active detail"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.04 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      referrerPolicy="no-referrer"
                      className="max-w-full max-h-[440px] md:max-h-[500px] object-contain rounded-lg shadow-md cursor-pointer hover:brightness-105 transition-all"
                      onClick={() => setZoomImg(activeItem.gallery[activeGalleryIndex])}
                    />
                  </AnimatePresence>

                  {/* Magnifier Tip overlay */}
                  <div className="absolute bottom-4 right-4 bg-teal-500/80 backdrop-blur-md px-3 py-1.5 rounded-full text-[9px] font-mono uppercase tracking-wider text-black flex items-center gap-1.5 shadow pointer-events-none opacity-0 group-hover/zoom:opacity-100 transition-opacity">
                    <ZoomIn className="w-3.5 h-3.5" /> CLICK OR TAP TO ZOOM
                  </div>

                  {/* Slider controls */}
                  <button
                    onClick={() => setActiveGalleryIndex((prev) => (prev - 1 + activeItem.gallery.length) % activeItem.gallery.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-black/60 hover:bg-black/90 text-white border border-white/10 hover:border-white/20 rounded-full flex items-center justify-center transition-all cursor-pointer shadow hover:scale-105"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  <button
                    onClick={() => setActiveGalleryIndex((prev) => (prev + 1) % activeItem.gallery.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-black/60 hover:bg-black/90 text-white border border-white/10 hover:border-white/20 rounded-full flex items-center justify-center transition-all cursor-pointer shadow hover:scale-105"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>

                {/* Inline thumbnails carousel */}
                <div className="flex gap-3 justify-center mt-4">
                  {activeItem.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveGalleryIndex(idx)}
                      className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                        idx === activeGalleryIndex ? 'border-teal-400 scale-105' : 'border-zinc-800 opacity-60 hover:opacity-100 hover:border-zinc-600'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Side: Description Meta panel (cols-5) */}
              <div className="lg:col-span-5 p-8 flex flex-col justify-between space-y-8 bg-zinc-900/40">
                <div className="space-y-6">
                  {/* Decorative tag */}
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-teal-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase font-bold">
                      FOREIGN PORTFOLIO DETAILS // NO {activeItem.id}
                    </span>
                  </div>

                  {/* Titles */}
                  <div className="space-y-2">
                    <h2 className="text-2xl font-black tracking-tight text-white font-sans">
                      {activeItem.title}
                    </h2>
                    <p className="text-[11px] text-teal-400 font-mono tracking-wider uppercase">
                      {activeItem.engTitle}
                    </p>
                  </div>

                  {/* Specifications and attributes */}
                  <div className="space-y-4 pt-4 border-t border-zinc-800">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-zinc-500">工艺标准 (STANDARDS)</span>
                      <span className="text-zinc-300 font-bold bg-zinc-800 px-2 py-0.5 rounded">FSC CERTIFIED ECO</span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-zinc-500">材质还原 (ACCURACY)</span>
                      <span className="text-zinc-300 font-bold bg-zinc-800 px-2 py-0.5 rounded">双层亚克力 / 内喷精装</span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-zinc-500">渲染输出 (OUTPUTS)</span>
                      <span className="text-zinc-300 font-bold bg-zinc-800 px-2 py-0.5 rounded">8K RAYCASTING TILE</span>
                    </div>
                  </div>

                  {/* Descriptive text */}
                  <div className="pt-4 space-y-2">
                    <div className="text-[10px] uppercase font-mono font-black text-teal-500 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5" /> 物物理性状及排版校验
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed font-light">
                      本渲染方案经受了严苛的漫反射物理光线追踪测试，准确模拟特定波长反射角、电镀金色层的阳极质感、以及特殊配重瓶芯在亚克力的二次偏振衍射。
                    </p>
                  </div>
                </div>

                {/* Fast Action Details */}
                <div className="p-4 bg-zinc-950/80 rounded-xl border border-zinc-800 text-[11px] font-mono text-zinc-400 leading-relaxed">
                  温馨提示：可以点击预览大图进行无缝缩放、查阅所有高解分辨率的微观细节图，满足设计师的审视标准。
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating HD Zoom Modality */}
      <AnimatePresence>
        {zoomImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center bg-black/98 p-4 cursor-zoom-out select-none"
            onClick={() => setZoomImg(null)}
          >
            <button
              onClick={() => setZoomImg(null)}
              className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer border border-white/10"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.img
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.92 }}
              src={zoomImg}
              alt="Zoomed Detail view"
              className="max-w-full max-h-screen object-contain rounded shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default MagicBento;
