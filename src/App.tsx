/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail, ArrowUpRight, Copyright, ChevronUp, ChevronLeft, ChevronRight, Sparkles, Orbit, Layers } from 'lucide-react';

import { VenetianBlinds } from './components/VenetianBlinds';
import { HeaderNavbar } from './components/HeaderNavbar';
import { IntroSection } from './components/IntroSection';
import { PortfolioSlider } from './components/PortfolioSlider';
import { ProductCompareShowcase } from './components/ProductCompareShowcase';
import { PortfolioAI } from './components/PortfolioAI';
import { Lightbox } from './components/Lightbox';
import { LetterGlitch } from './components/LetterGlitch';

import { USER_INFO } from './data';
import { PortfolioItem } from './types';
import CircularGallery from './components/CircularGallery';
import { BoothCompareLightbox } from './components/BoothCompareLightbox';
import { ChromaGrid } from './components/ChromaGrid';
import { BrandTuningMarquee } from './components/BrandTuningMarquee';
import { AcrylicLandscapeMarquee } from './components/AcrylicLandscapeMarquee';
import { DigitalBrandBook } from './components/DigitalBrandBook';
import { ForeignTradeDelivery, DeliveryItems } from './components/ForeignTradeDelivery';
import { MagicBento } from './components/MagicBento';
import { CommercialSlideshow } from './components/CommercialSlideshow';

const BoothItems = [
  { 
    image: "https://i.postimg.cc/NfD5bDdk/3-1.jpg", 
    text: "东京奢玩概念展台 | TOKYO",
    compareImages: {
      left: "https://i.postimg.cc/QxmHSmf1/3.jpg",
      right: "https://i.postimg.cc/PryPKySW/3-2.jpg"
    }
  },
  { 
    image: "https://i.postimg.cc/VLgd4gKT/33.png", 
    text: "巴黎先锋美陈空间 | PARIS",
    compareImages: {
      left: "https://i.postimg.cc/VLgd4gKT/33.png",
      right: "https://i.postimg.cc/bwvd5nMp/44.png"
    }
  },
  { 
    image: "https://i.postimg.cc/qv7gFKYM/hang-zhou-zhan-hui-(2).jpg", 
    text: "杭州茶叙艺术展位 | HANGZHOU",
    compareImages: {
      left: "https://i.postimg.cc/9Qfzk9Sh/hang-zhou-zhan-hui-(1).jpg",
      right: "https://i.postimg.cc/6pQTPZS3/hang-zhou-zhan-hui-(3).jpg"
    }
  },
  { 
    image: "https://i.postimg.cc/wBCv3GBh/hua-ban-1.png", 
    text: "伦敦金属悬浮沙龙 | LONDON",
    compareImages: {
      left: "https://i.postimg.cc/wBCv3GBh/hua-ban-1.png",
      right: "https://i.postimg.cc/N09FscBJ/hua-ban-1-kao-bei-6.png"
    }
  },
  { 
    image: "https://i.postimg.cc/MGMH6Sz8/hua-ban-1-kao-bei-8.jpg", 
    text: "纽约温润极简展览 | NEW YORK",
    compareImages: {
      left: "https://i.postimg.cc/K8s4hzSv/hua-ban-1-kao-bei-2.png",
      right: "https://i.postimg.cc/R0kFqDZ2/hua-ban-1-kao-bei-9.jpg"
    }
  },
  { 
    image: "https://i.postimg.cc/3xbWQR5g/hua-ban-1-kao-bei-4.png", 
    text: "米兰材质解构橱窗 | MILAN",
    compareImages: {
      left: "https://i.postimg.cc/3xbWQR5g/hua-ban-1-kao-bei-4.png",
      right: "https://i.postimg.cc/fbtyzNDj/hua-ban-1-kao-bei-5.png"
    }
  },
  { 
    image: "https://i.postimg.cc/nLyzMPLm/wei-xin-tu-pian-20260616135219-18-8.jpg", 
    text: "首尔未来肌能快闪 | SEOUL" 
  },
  { 
    image: "https://i.postimg.cc/8zCsYv3V/e-luo-si.jpg", 
    text: "莫斯科金属体构想 | MOSCOW" 
  },
  { 
    image: "https://i.postimg.cc/rpBmzPp0/shang-hai.jpg", 
    text: "上海潮流重构空间 | SHANGHAI" 
  },
  { 
    image: "https://i.postimg.cc/XYvXP5hM/231.png", 
    text: "法兰克福几何研学 | FRANKFURT" 
  },
  { 
    image: "https://i.postimg.cc/nLyzMPLm/wei-xin-tu-pian-20260616135219-18-8.jpg", 
    text: "前沿概念材质空间 | RECONSTRUCT" 
  }
];

const ChantingChromaItems = [
  {
    image: "https://i.postimg.cc/L8pfyvKx/hua-ban-3.png",
    title: "前庭概念全案 A",
    subtitle: "「前庭后院」主题门店",
    handle: "PROPOSAL A",
    borderColor: "#14b8a6",
    gradient: "linear-gradient(145deg, #14b8a6, #000000)"
  },
  {
    image: "https://i.postimg.cc/fTXmjpFq/hua-ban-1-kao-bei-3.png",
    title: "后院禅意全案 B",
    subtitle: "「前庭后院」主题门店",
    handle: "PROPOSAL B",
    borderColor: "#3b82f6",
    gradient: "linear-gradient(145deg, #3b82f6, #000000)"
  },
  {
    image: "https://i.postimg.cc/qMnyXSYj/hua-ban-1-kao-bei-2.png",
    title: "微缩园林全案 C",
    subtitle: "「前庭后院」主题门店",
    handle: "PROPOSAL C",
    borderColor: "#f59e0b",
    gradient: "linear-gradient(145deg, #f59e0b, #000000)"
  },
  {
    image: "https://i.postimg.cc/pLH80kbB/hua-ban-2.png",
    title: "金石光影全案 D",
    subtitle: "「前庭后院」主题门店",
    handle: "PROPOSAL D",
    borderColor: "#10b981",
    gradient: "linear-gradient(145deg, #10b981, #000000)"
  },
  {
    image: "https://i.postimg.cc/52VvPpdS/hua-ban-1.png",
    title: "东方重构全案 E",
    subtitle: "「前庭后院」主题门店",
    handle: "PROPOSAL E",
    borderColor: "#8b5cf6",
    gradient: "linear-gradient(145deg, #8b5cf6, #000000)"
  },
  {
    image: "https://i.postimg.cc/Bn0DhNf9/hua-ban-4.png",
    title: "全景空间布局 F",
    subtitle: "「前庭后院」主题门店",
    handle: "PROPOSAL F",
    borderColor: "#ec4899",
    gradient: "linear-gradient(145deg, #ec4899, #000000)"
  }
];

const VisionSlides = [
  {
    image: "https://i.postimg.cc/XvLgQqRp/1-2.jpg",
    title: "极致物理性 · 材质触感研习",
    subtitle: "DEFINING ULTRA-PRECISE LIGHT ATTENUATION, SPECULAR DEPTH, AND STRUCTURAL FORM IN VIRTUAL SPACE FOR THE FUTURE OF PACKAGING PRE-VISUALIZATION."
  },
  {
    image: "https://i.postimg.cc/XYxt94DD/3-AOV-yuan.jpg",
    title: "全案光影重建 · 空间物理演算法",
    subtitle: "VIRTUAL SPATIAL RENDERING AND PHYSICAL OPTICAL RECONSTRUCTION VERIFYING COMPLEX HIGH-END PRODUCT DISPLAY SYSTEMS."
  },
  {
    image: "https://i.postimg.cc/jjrhVtVf/wei-biao-ti-2.jpg",
    title: "高感美学 · 奢华质感打样",
    subtitle: "REFINING VISUAL GRAPHICS, EMBOSSED CRAFT STANDARDS, AND VOLUMETRIC HARMONY FOR HIGH-END COSMETIC BRANDING AND EXPERIMENTAL RECONSTRUCTION."
  }
];

const BrandTuningItems = [
  {
    image: "https://i.postimg.cc/h4rynJMd/1.png",
    text: "极简品牌空间美学"
  },
  {
    image: "https://i.postimg.cc/KcNqbKQr/1225.jpg",
    text: "材质物理折射仿真"
  },
  {
    image: "https://i.postimg.cc/MZDPwctB/22.jpg",
    text: "工学折线纸艺结构"
  },
  {
    image: "https://i.postimg.cc/SQrT4XVz/23.jpg",
    text: "奢华精装礼盒工艺"
  },
  {
    image: "https://i.postimg.cc/RCRsm3GJ/750.jpg",
    text: "刚性力学仿真检视"
  },
  {
    image: "https://i.postimg.cc/c1m9WKT7/888.jpg",
    text: "光影重建物理材质"
  },
  {
    image: "https://i.postimg.cc/445LGKwQ/xiao-guo-tu.jpg",
    text: "高定包装打样渲染"
  },
  {
    image: "https://i.postimg.cc/G3Q7RBzj/xiao-guo-tu2.jpg",
    text: "前庭零售场景延伸"
  }
];

const AcrylicLandscapeItems = [
  {
    image: "https://i.postimg.cc/fW3wV0qv/2.png",
    text: "艺术亚克力透明屏视觉造景"
  },
  {
    image: "https://i.postimg.cc/KcdmBvdm/3.png",
    text: "重叠光影折射空间层叠"
  },
  {
    image: "https://i.postimg.cc/wvGGKMhk/3.jpg",
    text: "发光展台材质极致反射"
  },
  {
    image: "https://i.postimg.cc/pVgPzXgy/33.jpg",
    text: "通透立体极简道具陈列"
  },
  {
    image: "https://i.postimg.cc/rmDLRvjr/chen-lie2.png",
    text: "轻量模块化产品陈列台"
  },
  {
    image: "https://i.postimg.cc/NFTqpmWj/chen-lie6.png",
    text: "高亮折射中轴展示陈列柜"
  },
  {
    image: "https://i.postimg.cc/Mpz2mc54/chen-lie-jia-kang-shuai-xi-lie.jpg",
    text: "「抗衰系列」高定极简陈列架"
  },
  {
    image: "https://i.postimg.cc/d3dP4rzT/chen-lie-jia3.jpg",
    text: "透明亚克力美妆背柜陈列"
  },
  {
    image: "https://i.postimg.cc/9FdH9PP3/chen-lie-jia5.png",
    text: "悬浮发光矩阵概念陈列区"
  }
];

export default function App() {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [selectedBoothIndex, setSelectedBoothIndex] = useState<number | null>(null);
  const [selectedChantingIndex, setSelectedChantingIndex] = useState<number | null>(null);
  const [selectedTuningIndex, setSelectedTuningIndex] = useState<number | null>(null);
  const [selectedAcrylicIndex, setSelectedAcrylicIndex] = useState<number | null>(null);
  const [selectedDeliveryIndex, setSelectedDeliveryIndex] = useState<number | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % VisionSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);
  
  const mainContentRef = useRef<HTMLDivElement>(null);

  // Smooth scroll handler to scroll down past the Venetian Blinds cover
  const handleScrollDown = () => {
    const nextSection = document.getElementById('vision-cover');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-white antialiased overflow-x-hidden selection:bg-black selection:text-white select-none">
      
      {/* Dynamic Consolidated Floating Glassmorphic Sticky Header */}
      <HeaderNavbar />
      
      {/* 1. Venetian Blinds Home Cover (Text-only 3D Slats) */}
      <VenetianBlinds onScrollDown={handleScrollDown} />

      {/* 2. Main Body with Fixed Background Alternation (固定背景交替) */}
      <div ref={mainContentRef} className="relative z-10 w-full bg-white">
        
        {/* New Screen 2 / Section 1: Cinematic Vision Cover Image Slider */}
        <div id="vision-cover" className="relative w-full min-h-[85vh] md:min-h-screen bg-black flex flex-col justify-between overflow-hidden group">
          <style>{`
            @keyframes dynamicLightSweepSlider {
              0% {
                transform: translate(-120%, -120%) rotate(-35deg);
              }
              30% {
                transform: translate(120%, 120%) rotate(-35deg);
              }
              100% {
                transform: translate(120%, 120%) rotate(-35deg);
              }
            }
          `}</style>

          {/* Sildes Container */}
          <div className="absolute inset-0">
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
                className="absolute inset-0"
              >
                <img 
                  src={VisionSlides[activeSlide].image} 
                  alt={VisionSlides[activeSlide].title} 
                  className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-1000 ease-out cursor-pointer"
                  referrerPolicy="no-referrer"
                />
                
                {/* Elegant warm-golden slash sheen layer */}
                <div 
                  className="absolute inset-0 pointer-events-none mix-blend-screen opacity-[0.4] group-hover:opacity-[0.1] transition-opacity duration-1000"
                  style={{
                    width: '300%',
                    height: '300%',
                    top: '-100%',
                    left: '-100%',
                    background: 'linear-gradient(115deg, rgba(255,253,245,0) 35%, rgba(255,253,245,0.02) 42%, rgba(255,251,235,0.4) 50%, rgba(255,253,245,0.02) 58%, rgba(255,253,245,0) 65%)',
                    animation: 'dynamicLightSweepSlider 8s cubic-bezier(0.25, 1, 0.5, 1) infinite'
                  }}
                />

                {/* Fine overlay gradient for cinematic mystery & typography relief */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/45 transition-opacity duration-1000 ease-out group-hover:opacity-0" />
                
                {/* Active Info text layered perfectly inside slide */}
                <div className="absolute inset-x-0 bottom-20 md:bottom-28 z-10 max-w-7xl mx-auto px-6 md:px-12 text-left space-y-4 transition-all duration-1000 ease-out group-hover:opacity-0 group-hover:translate-y-4 pointer-events-none">
                  <div className="w-12 h-1 bg-teal-400 mb-2" />
                  <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none font-sans drop-shadow-md">
                    {VisionSlides[activeSlide].title}
                  </h2>
                  <p className="text-xs md:text-sm text-zinc-300 font-mono tracking-widest uppercase max-w-2xl leading-relaxed">
                    {VisionSlides[activeSlide].subtitle}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slide Navigation Buttons */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 md:px-8 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={() => setActiveSlide((prev) => (prev - 1 + VisionSlides.length) % VisionSlides.length)}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-black/40 backdrop-blur-md text-white border border-white/10 hover:bg-black/60 hover:border-white/35 hover:scale-105 active:scale-95 transition-all cursor-pointer pointer-events-auto shadow-lg"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button
              onClick={() => setActiveSlide((prev) => (prev + 1) % VisionSlides.length)}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-black/40 backdrop-blur-md text-white border border-white/10 hover:bg-black/60 hover:border-white/35 hover:scale-105 active:scale-95 transition-all cursor-pointer pointer-events-auto shadow-lg"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>

          {/* Dot indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-20">
            {VisionSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSlide(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === activeSlide ? 'w-8 bg-teal-400' : 'w-1.5 bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Parallax Alternating Section 1: Packaging Design Portfolio with LetterGlitch digital background */}
        <div id="packaging" className="relative w-full py-16 bg-white border-b border-zinc-150 overflow-hidden">
          <LetterGlitch 
            glitchColors={['#0d9488', '#14b8a6', '#2dd4bf', '#27272a', '#71717a']} 
            glitchSpeed={55} 
            smooth={true} 
            outerVignette={false} 
            centerVignette={false}
          />
          <PortfolioSlider onSelectItem={setSelectedItem} />
        </div>

        {/* Screen 4: Commercial Slide Proposal Deck */}
        <div id="commercial-proposal">
          <CommercialSlideshow />
        </div>

        {/* Parallax Alternating Section 2: 3D Rendering Portfolio with interactive color-clay comparison */}
        <div id="rendering" className="relative w-full py-16 bg-white border-b border-zinc-150">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#000000_0.5px,transparent_0.5px),linear-gradient(to_bottom,#000000_0.5px,transparent_0.5px)] bg-[size:48px_48px] opacity-[0.015] pointer-events-none" />
          <ProductCompareShowcase />
        </div>

        {/* New Section 03: Foreign Trade Product Rendering (外贸系列产品渲染) with MagicBento */}
        <div id="foreign-trade-rendering">
          <MagicBento />
        </div>

        {/* New Section 04: Foreign Trade Packaging Delivery & Fulfillment (外贸包装项目交付落地) */}
        <div id="delivery">
          <ForeignTradeDelivery onSelectItem={(index) => setSelectedDeliveryIndex(index)} />
        </div>

        {/* New Fifth Screen: 「前庭后院」主题门店 整店输出全案方案 with ChromaGrid */}
        <div id="chanting" className="relative w-full py-20 bg-zinc-950 border-b border-zinc-900 overflow-hidden text-white">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_0.5px,transparent_0.5px),linear-gradient(to_bottom,#ffffff_0.5px,transparent_0.5px)] bg-[size:48px_48px] opacity-[0.015] pointer-events-none" />
          
          <div className="relative max-w-7xl mx-auto px-6 md:px-12 mb-12 z-10">
            <div className="flex items-center gap-3">
              <span className="text-xl font-black text-white hover:text-teal-400 transition-colors uppercase tracking-tight">
                05 / 「前庭后院」主题门店 整店输出全案方案
              </span>
              <span className="text-[10px] font-mono bg-teal-500/10 border border-teal-500/20 text-teal-400 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                Store Design // Premium Full Plan
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-mono tracking-widest uppercase mt-2">
              INTERACTIVE CHROMA RAYS & GLOW EFFECT CONVEYING SENSORY ORIENTAL LUXURY SPACE CONCEPT.
            </p>
          </div>

          <div className="relative w-full min-h-[560px] select-none z-10 flex items-center justify-center">
            <ChromaGrid
              items={ChantingChromaItems}
              radius={280}
              damping={0.45}
              fadeOut={0.6}
              columns={3}
              rows={2}
              onItemClick={(index) => setSelectedChantingIndex(index)}
            />
          </div>
        </div>

        {/* Fifth Screen: Exhibition Booth 3D Design & Rendering with CircularGallery */}
        <div id="booth" className="relative w-full py-20 bg-white border-b border-zinc-150 overflow-hidden">
          <LetterGlitch 
            glitchColors={['#0d9488', '#14b8a6', '#2dd4bf', '#27272a', '#71717a']} 
            glitchSpeed={55} 
            smooth={true} 
            outerVignette={false} 
            centerVignette={false}
          />
          <div className="relative max-w-7xl mx-auto px-6 md:px-12 mb-8 z-10">
            <div className="flex items-center gap-3">
              <span className="text-xl font-black text-black">06 / 国内外展位3D效果设计与渲染</span>
              <span className="text-[10px] font-mono bg-zinc-155 text-black px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                Exhibition Space // Circular 3D
              </span>
            </div>
            <p className="text-xs text-zinc-500 font-mono tracking-widest uppercase mt-2">
              BENDING PHYSICAL PERSPECTIVE THROUGH CYLINDRICAL GL RENDERING FOR CONCEPTUAL EXHIBITIONS WORLDWIDE.
            </p>
          </div>
          <div className="relative w-full h-[520px] select-none z-10">
            <CircularGallery
              items={BoothItems}
              bend={3}
              textColor="#000000"
              borderRadius={0.06}
              scrollSpeed={2.5}
              scrollEase={0.03}
              font="bold 22px Inter"
              onItemClick={(index) => setSelectedBoothIndex(index)}
              showText={false}
            />
          </div>
        </div>

        {/* Section 05: Brand Tuning Infinite Marquee (品牌调性的持续打磨) */}
        <div id="brand-tuning">
          <BrandTuningMarquee onSelectItem={({ index }) => setSelectedTuningIndex(index)} />
        </div>

        {/* Section 06: Acrylic Landscape Infinite Marquee (线下空间亚克力视觉造景) */}
        <div id="acrylic-landscape">
          <AcrylicLandscapeMarquee onSelectItem={({ index }) => setSelectedAcrylicIndex(index)} />
        </div>

        {/* Section 07: Online Digital Brand Book (线上数字品牌美学手册 电子书) */}
        <div id="digital-brand-book">
          <DigitalBrandBook />
        </div>

        {/* Parallax Alternating Section 4: Resume / Introduction (关于我) placed just before contact info */}
        <div className="relative w-full bg-white">
          <IntroSection />
        </div>

        {/* 5. Minimal Elegant Footer / Contact Section (网站最底部联系方式) */}
        <footer 
          className="relative w-full py-24 px-6 md:px-12 lg:px-24 bg-white border-t border-zinc-200 text-black relative overflow-hidden"
          id="contact"
        >
          {/* Subtle minimal geometric point in background */}
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-zinc-100 rounded-full filter blur-[140px] pointer-events-none" />

          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
            
            {/* Left Block: Design Studio Identity */}
            <div className="md:col-span-6 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono tracking-[0.3em] text-black font-black uppercase">
                  <span>GET IN TOUCH // CONTACT </span>
                  <Sparkles className="w-3.5 h-3.5 text-black" />
                </div>
                <h2 className="text-3xl md:text-5xl font-black tracking-tight text-black uppercase">
                  联系方式
                </h2>
              </div>
              <p className="text-sm text-zinc-600 font-light leading-relaxed max-w-md">
                欢迎各位有设计需求的老板，私信我，期待您的召唤！
              </p>

              {/* Contacts Array - only phone, email, and qr as requested */}
              <div className="space-y-4 pt-4 font-mono text-xs">
                
                {/* Contact Phone */}
                <div className="flex items-center gap-4 bg-white border border-zinc-200 p-4 rounded-2xl w-fit min-w-[280px] shadow-sm hover:border-black transition-all group">
                  <div className="p-3 bg-zinc-100 rounded-xl text-black group-hover:bg-black group-hover:text-white transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <span className="text-[9px] text-zinc-400 block tracking-widest uppercase font-bold">联系电话 \ PHONE</span>
                    <a href={`tel:${USER_INFO.phone}`} className="text-sm font-black text-black">
                      {USER_INFO.phone}
                    </a>
                  </div>
                </div>

                {/* Contact Email */}
                <div className="flex items-center gap-4 bg-white border border-zinc-200 p-4 rounded-2xl w-fit min-w-[280px] shadow-sm hover:border-black transition-all group">
                  <div className="p-3 bg-zinc-100 rounded-xl text-black group-hover:bg-black group-hover:text-white transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <span className="text-[9px] text-zinc-400 block tracking-widest uppercase font-bold">电子邮箱 \ EMAIL</span>
                    <a href={`mailto:${USER_INFO.email}`} className="text-sm font-black text-black">
                      {USER_INFO.email}
                    </a>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Block: WeChat QR Code & Copyright Statement */}
            <div className="md:col-span-6 flex flex-col items-center md:items-end justify-between h-full space-y-12">
              <div />
              
              {/* WeChat QR Box */}
              <div className="flex flex-col sm:flex-row items-center gap-6 bg-white border border-zinc-200 p-6 rounded-[32px] shadow-sm hover:border-black transition-all">
                <div className="shrink-0 relative group">
                  {/* Real Generated QR code */}
                  <img
                    src={USER_INFO.wechatQR}
                    alt="微信二维码"
                    className="w-32 h-32 rounded-2xl border border-zinc-100 object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/5 rounded-2xl pointer-events-none" />
                </div>
                
                <div className="text-zinc-600 text-left max-w-[200px] space-y-1.5">
                  <div className="font-mono text-[9px] bg-zinc-100 border border-zinc-200 px-2 py-1 rounded text-black font-black tracking-widest uppercase w-fit">
                    WECHAT CONTACT
                  </div>
                  <h4 className="text-sm font-bold text-black">扫码添加微信</h4>
                  <p className="text-xs font-light text-zinc-500 leading-relaxed">
                    使用微信扫描此二维码，实时讨论3D与包装创意方案并进行学术交流。
                  </p>
                </div>
              </div>

              {/* Base Copyright and action bar */}
              <div className="w-full flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-zinc-200 text-[10px] font-mono text-zinc-500 gap-4">
                <div className="flex items-center gap-1.5">
                  <Copyright className="w-3.5 h-3.5 text-black" />
                  <span className="font-bold text-black">2026 {USER_INFO.name}. ALL RIGHTS RESERVED.</span>
                </div>
                
                <div className="flex items-center gap-6">
                  <span className="hover:text-black hover:font-bold transition-all cursor-pointer">PRIVACY SYSTEM</span>
                  <button
                    onClick={scrollToTop}
                    className="flex items-center gap-1.5 bg-white hover:bg-black hover:text-white border border-black px-3.5 py-1.5 rounded-lg cursor-pointer transition-all"
                  >
                    <span className="font-black text-[10px]">回置顶部</span>
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </footer>

      </div>

      {/* 3. Global Lightbox Magnifier Modal (Click-to-Zoom layout) */}
      <AnimatePresence>
        {selectedItem && (
          <Lightbox
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
          />
        )}
      </AnimatePresence>

      {/* 3.5. Booth Compare Lightbox (Splitscreen Slider Layout) */}
      <AnimatePresence>
        {selectedBoothIndex !== null && (
          <BoothCompareLightbox
            item={BoothItems[selectedBoothIndex]}
            onClose={() => setSelectedBoothIndex(null)}
            onPrev={() => setSelectedBoothIndex((prev) => (prev !== null ? (prev - 1 + BoothItems.length) % BoothItems.length : null))}
            onNext={() => setSelectedBoothIndex((prev) => (prev !== null ? (prev + 1) % BoothItems.length : null))}
          />
        )}
      </AnimatePresence>

      {/* 3.6. Chanting Lightbox (Dual Reuse of BoothCompareLightbox) */}
      <AnimatePresence>
        {selectedChantingIndex !== null && (
          <BoothCompareLightbox
            item={{
              image: ChantingChromaItems[selectedChantingIndex].image,
              text: ChantingChromaItems[selectedChantingIndex].title
            }}
            onClose={() => setSelectedChantingIndex(null)}
            onPrev={() => setSelectedChantingIndex((prev) => (prev !== null ? (prev - 1 + ChantingChromaItems.length) % ChantingChromaItems.length : null))}
            onNext={() => setSelectedChantingIndex((prev) => (prev !== null ? (prev + 1) % ChantingChromaItems.length : null))}
          />
        )}
      </AnimatePresence>

      {/* 3.7. Brand Tuning Lightbox (Standard Single Image Reuse of BoothCompareLightbox) */}
      <AnimatePresence>
        {selectedTuningIndex !== null && (
          <BoothCompareLightbox
            item={BrandTuningItems[selectedTuningIndex]}
            onClose={() => setSelectedTuningIndex(null)}
            onPrev={() => setSelectedTuningIndex((prev) => (prev !== null ? (prev - 1 + BrandTuningItems.length) % BrandTuningItems.length : null))}
            onNext={() => setSelectedTuningIndex((prev) => (prev !== null ? (prev + 1) % BrandTuningItems.length : null))}
          />
        )}
      </AnimatePresence>

      {/* 3.8. Acrylic Landscape Lightbox (Standard Single Image Reuse of BoothCompareLightbox) */}
      <AnimatePresence>
        {selectedAcrylicIndex !== null && (
          <BoothCompareLightbox
            item={AcrylicLandscapeItems[selectedAcrylicIndex]}
            onClose={() => setSelectedAcrylicIndex(null)}
            onPrev={() => setSelectedAcrylicIndex((prev) => (prev !== null ? (prev - 1 + AcrylicLandscapeItems.length) % AcrylicLandscapeItems.length : null))}
            onNext={() => setSelectedAcrylicIndex((prev) => (prev !== null ? (prev + 1) % AcrylicLandscapeItems.length : null))}
          />
        )}
      </AnimatePresence>

      {/* 3.9. Foreign Trade Packaging Delivery Lightbox (Standard Single Image Reuse of BoothCompareLightbox) */}
      <AnimatePresence>
        {selectedDeliveryIndex !== null && (
          <BoothCompareLightbox
            item={DeliveryItems[selectedDeliveryIndex]}
            onClose={() => setSelectedDeliveryIndex(null)}
            onPrev={() => setSelectedDeliveryIndex((prev) => (prev !== null ? (prev - 1 + DeliveryItems.length) % DeliveryItems.length : null))}
            onNext={() => setSelectedDeliveryIndex((prev) => (prev !== null ? (prev + 1) % DeliveryItems.length : null))}
          />
        )}
      </AnimatePresence>

      {/* 4. Background Ambient Audio Iframe (Hidden, width/height set to 0) */}
      <iframe
        src="https://6a22f949d7468043ca6127fa--preeminent-pasca-efeb82.netlify.app/"
        width="0"
        height="0"
        allow="autoplay"
        style={{ display: 'none', border: 'none' }}
        title="Background Music Player"
      />
    </div>
  );
}
