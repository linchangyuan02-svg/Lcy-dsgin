import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Globe, ShieldCheck, CheckSquare, Layers, Eye } from 'lucide-react';
import CardSwap, { Card } from './CardSwap';

export const DeliveryItems = [
  {
    image: "https://i.postimg.cc/vBR2zTds/xiao-guo-tu6.jpg",
    text: "多材质组合包装打样与结构检测"
  },
  {
    image: "https://i.postimg.cc/BvPwHDky/xiao-guo-tu6-(2).jpg",
    text: "双开门折叠展示盒力学校验"
  },
  {
    image: "https://i.postimg.cc/zfHPKW66/xiao-guo-tu6-(3).jpg",
    text: "刚性护角与内托防撞吸震模型"
  },
  {
    image: "https://i.postimg.cc/W4qfgrCY/xiao-guo-tu6-(4).jpg",
    text: "出口海运特制防水防潮高定封箱"
  },
  {
    image: "https://i.postimg.cc/W4qfgrCW/xiao-guo-tu6-(5).jpg",
    text: "整单环保大豆油墨印刷落样检视"
  }
];

interface ForeignTradeDeliveryProps {
  onSelectItem: (index: number) => void;
}

export const ForeignTradeDelivery: React.FC<ForeignTradeDeliveryProps> = ({ onSelectItem }) => {
  return (
    <div className="w-full py-24 bg-white border-b border-zinc-150 overflow-hidden text-black relative">
      {/* Background blueprint grid line accent */}
      <div className="absolute inset-0 bg-[radial-gradient(#e4e4e7_1px,transparent_1px)] [background-size:32px_32px] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 space-y-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-xl font-black text-black">04 / 外贸包装项目交付落地</span>
                <span className="text-[10px] font-mono bg-neutral-900 text-white px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                  GLOBAL DELIVERY // 交付打样
                </span>
              </div>
              <p className="text-xs text-zinc-500 font-mono tracking-widest uppercase mt-2">
                FOREIGN TRADE PACKAGING STRUCTURE DESIGN, DURABILITY TEST AND WORLDWIDE DEPLOYMENT.
              </p>
            </div>
            
            {/* Quick specifications display */}
            <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-teal-500" />
              <span>EXPORT SPECIFICATION COMPLIANT</span>
            </div>
          </div>
        </div>

        {/* Core Layout Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Explanatory & Features list */}
          <div className="lg:col-span-6 space-y-8">
            <div className="border-l-2 border-teal-500 pl-6 space-y-4">
              <h3 className="text-2xl font-black tracking-tight text-neutral-900">
                极致打样标准 · 跨国物流合规
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed font-light">
                在外贸精品包装设计与大货生产环节，我们坚持对每一款包装的卡扣、物理受力结构及折线承重进行3D精密校验。从抗撞击内托纸浆、双面压痕到环保大豆油墨印刷规范，均符合国际高奢美妆包装的安全与环保双重标准。
              </p>
            </div>

            {/* Grid Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-zinc-50 border border-zinc-100 rounded-2xl flex items-start gap-3 shadow-xs">
                <Globe className="w-4 h-4 text-teal-600 mt-1 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-neutral-900 font-mono">跨国海运转运合规 (TRANSPORT PROTECTION)</h4>
                  <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">
                    专为漫长集装箱海运流程定制，模拟恒湿恒温下的纸箱挺度测试。
                  </p>
                </div>
              </div>

              <div className="p-4 bg-zinc-50 border border-zinc-100 rounded-2xl flex items-start gap-3 shadow-xs">
                <ShieldCheck className="w-4 h-4 text-neutral-800 mt-1 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-neutral-900 font-mono">2米高抗冲击跌落测试 (FALLPROOF SYSTEM)</h4>
                  <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">
                    内衬泡泡托及环保可降解纸塑结构，确保产品货架落样无暇。
                  </p>
                </div>
              </div>

              <div className="p-4 bg-zinc-50 border border-zinc-100 rounded-2xl flex items-start gap-3 shadow-xs">
                <Layers className="w-4 h-4 text-teal-600 mt-1 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-neutral-900 font-mono">多层板精密对位工艺 (ALIGNMENT EXCELLENCE)</h4>
                  <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">
                    物理刀版高精度切模，对角偏差严格控制在 0.2mm 内。
                  </p>
                </div>
              </div>

              <div className="p-4 bg-zinc-50 border border-zinc-100 rounded-2xl flex items-start gap-3 shadow-xs">
                <CheckSquare className="w-4 h-4 text-neutral-800 mt-1 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-neutral-900 font-mono">无醛无挥发绿色环保 (ECO CONSCIOUS)</h4>
                  <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">
                    严选 FSC 认证森林艺术纸与循环再生原浆，满足欧盟最新低碳准入。
                  </p>
                </div>
              </div>
            </div>

            {/* Quick interactive note */}
            <div className="flex items-center gap-2 bg-teal-50 border border-teal-100/50 p-3.5 rounded-xl text-teal-900 text-xs font-mono">
              <Sparkles className="w-4 h-4 text-teal-600 animate-pulse shrink-0" />
              <span>说明：点击右侧 3D 卡片组可向下滑动切换，双击或单击可极致放大图片。</span>
            </div>
          </div>

          {/* Right Column: Dynamic 3D CardSwap component block */}
          <div className="lg:col-span-6 flex items-center justify-center min-h-[500px] relative z-20">
            {/* Absolute decorative studio back panel border to ground the interactive component */}
            <div className="absolute inset-0 max-w-[420px] max-h-[340px] m-auto border border-zinc-200/60 rounded-3xl bg-zinc-50/50 pointer-events-none flex items-center justify-center">
              <div className="text-[10px] text-zinc-300 font-mono font-black uppercase tracking-widest translate-y-[150px]">
                3D TOUCH INTERACTIVE PANEL
              </div>
            </div>

            <div className="relative w-full h-full flex items-center justify-center">
              <CardSwap
                width={360}
                height={260}
                cardDistance={35}
                verticalDistance={38}
                delay={4200}
                pauseOnHover={true}
                skewAmount={4}
                onCardClick={(idx) => onSelectItem(idx)}
              >
                {DeliveryItems.map((item, idx) => (
                  <Card 
                    key={idx}
                    className="flex flex-col overflow-hidden relative group"
                  >
                    {/* Image Area */}
                    <div className="w-full h-full relative cursor-pointer overflow-hidden bg-zinc-150">
                      <img 
                        src={item.image} 
                        alt={item.text} 
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 ease-out"
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Interactive hovering cover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent flex flex-col justify-end p-5 text-white">
                        <span className="text-[9px] font-mono tracking-widest text-teal-400 bg-teal-950/80 w-max px-2 py-0.5 rounded border border-teal-500/30 uppercase font-black mb-1.5">
                          STAGE {idx + 1}
                        </span>
                        <h4 className="text-xs font-black tracking-wide leading-snug text-white font-sans drop-shadow">
                          {item.text}
                        </h4>
                      </div>

                      {/* Floating View Magnifier Button */}
                      <div className="absolute top-4 right-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                          <Eye className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </CardSwap>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
