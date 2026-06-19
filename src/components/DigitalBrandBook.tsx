import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, ExternalLink, Sparkles, Layers, ShieldCheck, Maximize } from 'lucide-react';

export const DigitalBrandBook: React.FC = () => {
  const epubUrl = "https://flbook.com.cn/c/4H6jBEWr1Z#page/1";

  return (
    <div className="w-full py-24 bg-white border-b border-zinc-150 overflow-hidden text-black relative">
      {/* Delicate background blueprint grid lines */}
      <div className="absolute inset-0 bg-[radial-gradient(#e4e4e7_1px,transparent_1px)] [background-size:32px_32px] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="mb-14 space-y-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-xl font-black text-black">09 / 线上数字美学品牌手册「电子书」</span>
                <span className="text-[10px] font-mono bg-teal-500 text-black px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                  FLIPBOOK SYSTEM // 3D交互阅读
                </span>
              </div>
              <p className="text-xs text-zinc-500 font-mono tracking-widest uppercase mt-2">
                ELEGANT INTERACTIVE FLIPBOOK BLUEPRINT FOR BRAND BRANDING & SPATIAL STANDARDS.
              </p>
            </div>

            {/* Quick Actions / Link */}
            <a 
              href={epubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-black hover:bg-neutral-800 text-white text-xs font-mono font-bold uppercase tracking-widest rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              id="ext-fullscreen-button"
            >
              <span>外部全屏悦览</span>
              <ExternalLink className="w-4 h-4 ml-0.5 text-teal-400" />
            </a>
          </div>
        </div>

        {/* Dynamic Split Layout: Specs & Interactive Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Conceptual & Tactile Specifications */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="border-l-2 border-black pl-5 space-y-3">
                <h3 className="text-xl font-black tracking-tight text-black">美学秩序 · 数字化映射</h3>
                <p className="text-sm text-zinc-600 leading-relaxed font-light">
                  通过轻量级 3D 物理引擎线上重构，完美映射纸张触感。手册全面承载了品牌美学共振、中轴陈列配比以及物理纸张的微厚度，为未来零售实体空间的设计打样及材质落地提供极高保真度的阅览范式。
                </p>
              </div>

              {/* Bullet Details Cards */}
              <div className="grid grid-cols-1 gap-4 pt-2">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-zinc-50 border border-zinc-100 shadow-sm hover:shadow transition-shadow">
                  <div className="p-2 bg-white rounded-lg border border-zinc-200">
                    <BookOpen className="w-4 h-4 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-black font-mono tracking-wide uppercase">书感微光拟真 (LIGHT RECONSTRUCTION)</h4>
                    <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">
                      模拟高精艺术哑粉纸张的真实反光，支持流式平滑翻页动作。
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-zinc-50 border border-zinc-100 shadow-sm hover:shadow transition-shadow">
                  <div className="p-2 bg-white rounded-lg border border-zinc-200">
                    <Layers className="w-4 h-4 text-neutral-800" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-black font-mono tracking-wide uppercase">整装工艺解析 (CRAFT STANDARDS)</h4>
                    <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">
                      完美适配 240g 高定艺术哑粉内页、UV水晶凸版激凸及锁线精装立体构筑。
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-zinc-50 border border-zinc-100 shadow-sm hover:shadow transition-shadow">
                  <div className="p-2 bg-white rounded-lg border border-zinc-200">
                    <ShieldCheck className="w-4 h-4 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-black font-mono tracking-wide uppercase">安全认证及缓存 (SECURITY VERIFIED)</h4>
                    <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">
                      极速首屏预渲染，支持双指自由捏合自适应及跨端高保真矢量文字渲染。
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Micro studio details label */}
            <div className="p-5 rounded-2xl bg-neutral-950 text-white space-y-2 relative overflow-hidden group">
              <div className="absolute right-0 top-0 w-24 h-24 bg-teal-500/10 rounded-full filter blur-xl group-hover:bg-teal-500/20 transition-all duration-700 pointer-events-none" />
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-teal-400" />
                <span className="text-[10px] uppercase font-mono tracking-wider font-extrabold text-teal-400">DESIGN SPECIFICATION</span>
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                "本手册是线下店面空间与亚克力造景美学的灵魂，所有色彩配比、透光反射系数及物理留白规则均经由科学论证。"
              </p>
            </div>
          </div>

          {/* Right Column: Beautiful High-Fidelity Desktop Browser Mockup Frame with Iframe inside */}
          <div className="lg:col-span-8 flex flex-col justify-center">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-full rounded-2xl border border-zinc-300 shadow-xl overflow-hidden bg-white select-none group"
            >
              {/* Premium Mac-style Window Topbar */}
              <div className="w-full h-11 bg-zinc-100 border-b border-zinc-200 flex items-center justify-between px-4">
                {/* Simulated Window Dots */}
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                  <div className="w-3 h-3 rounded-full bg-green-400/80" />
                </div>

                {/* Simulated Window Address Bar */}
                <div className="max-w-[400px] w-full bg-white border border-zinc-200 h-6.5 rounded-md text-[10px] font-mono flex items-center justify-between px-3 text-zinc-500 shadow-inner">
                  <span className="truncate">flbook.com.cn/c/4H6jBEWr1Z#page/1</span>
                  <div className="flex items-center gap-1 text-zinc-400">
                    <Maximize className="w-3 h-3" />
                  </div>
                </div>

                {/* Empty place-holder info */}
                <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400 uppercase font-black tracking-widest">
                  <span className="hidden sm:inline bg-zinc-200 text-zinc-600 px-2 py-0.5 rounded text-[8px]">SSL SECURE</span>
                </div>
              </div>

              {/* Active Iframe Container with fine shadow effects inside */}
              <div className="relative w-full aspect-video min-h-[460px] md:min-h-[560px] lg:min-h-[640px] bg-zinc-50 overflow-hidden">
                <iframe
                  src={epubUrl}
                  title="Aesthetics Brand Manual"
                  className="absolute inset-0 w-full h-full border-0"
                  allowFullScreen
                  referrerPolicy="no-referrer"
                  allow="autoplay; fullscreen"
                />
              </div>

              {/* Browser Bottom-Status Toolbar decoration */}
              <div className="w-full h-10 bg-zinc-50 border-t border-zinc-100 flex items-center justify-between px-5 text-[10px] font-mono text-zinc-400">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                  <span className="font-bold text-zinc-600 uppercase">Interactive Online Blueprint // Ready</span>
                </div>
                <div>v1.0.4 PREMIUM EDITION</div>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </div>
  );
};
