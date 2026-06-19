/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, GraduationCap, Cpu, Layers, Sparkles, Code, CheckCircle } from 'lucide-react';
import { USER_INFO, WORK_EXPERIENCE, EDUCATION, SOFTWARE_TOOLS } from '../data';

export const IntroSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'career' | 'stack'>('profile');
  const [stackFilter, setStackFilter] = useState<'ALL' | '3D' | 'Rendering' | 'Design' | 'AI'>('ALL');

  const filteredTools = SOFTWARE_TOOLS.filter(t => stackFilter === 'ALL' || t.category === stackFilter);

  return (
    <section id="introduction" className="relative w-full py-24 px-6 md:px-12 lg:px-24 bg-white overflow-hidden">
      {/* Structural abstract background details */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-zinc-100 rounded-full filter blur-[100px] pointer-events-none opacity-40" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-zinc-100 rounded-full filter blur-[120px] pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header with high contrast sizes (造字工房悦黑 aesthetics) */}
        <div className="flex flex-col items-start gap-2 mb-16 border-b border-zinc-200 pb-8">
          <div className="flex items-center gap-2 text-xs font-mono tracking-[0.3em] text-black font-black uppercase">
            <span>RESUME // OVERVIEW</span>
            <div className="w-8 h-px bg-black" />
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-black tracking-tight">
            关于我 <span className="font-extralight text-zinc-400 font-mono">/ PROFILE</span>
          </h2>
          <p className="text-sm text-zinc-650 font-light mt-2 max-w-xl">
            在理智的光影参数与感性的视觉修辞之间，探索产品包装的高级雕塑感与质感。
          </p>
        </div>

        {/* Modular Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-start">
          
          {/* Navigation Sidebar Selector */}
          <div className="lg:col-span-1 flex lg:flex-col gap-2 p-1.5 bg-zinc-50 rounded-2xl border border-zinc-200 sticky top-6 z-20 overflow-x-auto">
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full text-left px-5 py-3.5 rounded-xl text-xs font-bold tracking-wider uppercase flex items-center gap-3 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'profile'
                  ? 'bg-black text-white shadow-sm'
                  : 'text-zinc-500 hover:bg-zinc-100 hover:text-black'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>自我介绍 & 学历</span>
            </button>
            <button
              onClick={() => setActiveTab('career')}
              className={`w-full text-left px-5 py-3.5 rounded-xl text-xs font-bold tracking-wider uppercase flex items-center gap-3 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'career'
                  ? 'bg-black text-white shadow-sm'
                  : 'text-zinc-500 hover:bg-zinc-100 hover:text-black'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>工作经历</span>
            </button>
            <button
              onClick={() => setActiveTab('stack')}
              className={`w-full text-left px-5 py-3.5 rounded-xl text-xs font-bold tracking-wider uppercase flex items-center gap-3 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'stack'
                  ? 'bg-black text-white shadow-sm'
                  : 'text-zinc-500 hover:bg-zinc-100 hover:text-black'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>软件工具栈</span>
            </button>
          </div>

          {/* Active Content Panel */}
          <div className="lg:col-span-3 min-h-[480px]">
            <AnimatePresence mode="wait">
              
              {/* Profile & Education Tab */}
              {activeTab === 'profile' && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-12"
                >
                  {/* Biography detail Card */}
                  <div className="bg-white border border-zinc-200 rounded-3xl p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-zinc-100 rounded-full filter blur-2xl" />
                    
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl font-black text-black inline-block">{USER_INFO.name}</span>
                        <span className="text-xs bg-zinc-100 text-black px-3 py-1 rounded-full font-black tracking-wider">
                          ACTIVE DESIGNER
                        </span>
                      </div>
                      <div className="text-xs font-mono text-zinc-550 uppercase tracking-[0.2em] font-bold">
                        {USER_INFO.role}
                      </div>
                      
                      <div className="w-12 h-0.5 bg-black/40 my-2" />
                      
                      <p className="text-sm text-black font-light leading-relaxed tracking-wide">
                        {USER_INFO.bioBrief}
                      </p>
                      
                      <div className="bg-zinc-50 border-l-4 border-black p-4 rounded-r-3xl mt-4">
                        <p className="text-xs italic text-black tracking-wider font-light">
                          &quot;{USER_INFO.quote}&quot;
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Education details */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 text-sm font-mono tracking-widest text-black">
                      <GraduationCap className="w-5 h-5 text-black" />
                      <span>教育背景 // EDUCATION</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {EDUCATION.map((edu, idx) => (
                        <div
                          key={edu.id}
                          className="bg-white border border-zinc-200 rounded-2xl p-6 hover:border-black transition-all duration-300 relative overflow-hidden group"
                        >
                          <div className="absolute top-0 left-0 w-1.5 h-full bg-zinc-200 group-hover:bg-black transition-all" />
                          <div className="text-xs font-mono text-zinc-400 mb-2">{edu.period}</div>
                          <h4 className="text-base font-bold text-black">{edu.school}</h4>
                          <p className="text-xs text-black font-bold mb-3">{edu.major}</p>
                          <ul className="space-y-1.5 list-none pl-0">
                            {edu.achievements.map((item, idy) => (
                              <li key={idy} className="text-xs text-zinc-650 font-light leading-relaxed flex items-start gap-1.5">
                                <span className="text-black mt-1">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Career History Tab */}
              {activeTab === 'career' && (
                <motion.div
                  key="career"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-8"
                >
                  <div className="relative border-l-2 border-zinc-200 ml-4 pl-8 space-y-12 py-2">
                    {WORK_EXPERIENCE.map((work) => (
                      <div key={work.id} className="relative group">
                        
                        {/* Bullet Point Indicator */}
                        <div className="absolute -left-[41px] top-1 w-6 h-6 rounded-full bg-white border-2 border-zinc-300 flex items-center justify-center group-hover:border-black transition-colors shadow-sm">
                          <div className="w-2.5 h-2.5 rounded-full bg-zinc-200 group-hover:bg-black transition-colors" />
                        </div>

                        {/* Card Info */}
                        <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm hover:border-black transition-all duration-300 relative">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                            <div>
                              <span className="text-xs font-mono text-black font-black tracking-wider">{work.period}</span>
                              <h3 className="text-lg font-black text-black mt-0.5">{work.company}</h3>
                            </div>
                            <span className="px-3 py-1 rounded-full bg-zinc-50 text-black border border-zinc-200 text-[10px] font-mono font-bold uppercase self-start sm:self-auto">
                              {work.role}
                            </span>
                          </div>

                          <ul className="space-y-2.5 list-none pl-0 mb-5">
                            {work.description.map((desc, idx) => (
                              <li key={idx} className="text-xs text-zinc-650 font-light leading-relaxed flex items-start gap-2">
                                <CheckCircle className="w-3.5 h-3.5 text-black shrink-0 mt-0.5" />
                                <span>{desc}</span>
                              </li>
                            ))}
                          </ul>

                          {/* Material Process Tags */}
                          <div className="flex flex-wrap gap-2 pt-3 border-t border-zinc-150">
                            {work.tags.map((tag, idx) => (
                              <span
                                key={idx}
                                className="text-[10px] bg-zinc-50 border border-zinc-200 rounded px-2.5 py-1 text-zinc-500 font-mono tracking-wider hover:bg-black hover:text-white hover:border-black transition-all cursor-default"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Software Tool Stack Tab */}
              {activeTab === 'stack' && (
                <motion.div
                  key="stack"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-8"
                >
                  {/* Category filters */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {(['ALL', '3D', 'Rendering', 'Design', 'AI'] as const).map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setStackFilter(cat)}
                        className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider transition-all cursor-pointer ${
                          stackFilter === cat
                            ? 'bg-black text-white shadow-sm'
                            : 'bg-white text-zinc-500 hover:bg-zinc-150 border border-zinc-200'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Skills Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredTools.map((tool) => (
                      <div
                        key={tool.name}
                        className="bg-white border border-zinc-200 rounded-2xl p-5 hover:border-black transition-all duration-300"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-2.5 h-2.5 rounded-full"
                              style={{ backgroundColor: tool.color }}
                            />
                            <span className="text-xs font-mono text-zinc-400">[{tool.category}]</span>
                            <span className="text-sm font-bold text-black">{tool.name}</span>
                          </div>
                          <span className="text-[10px] font-mono text-black font-black tracking-wider">{tool.level}</span>
                        </div>

                        {/* Custom visual progress track */}
                        <div className="w-full bg-zinc-100 rounded-full h-1.5 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${tool.percentage}%` }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className="h-full rounded-full bg-black"
                          />
                        </div>
                        <div className="flex justify-between items-center mt-1 text-[9px] font-mono text-zinc-400">
                          <span>0% EXP</span>
                          <span>{tool.percentage}% MASTERY</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Note on hybrid pipelines */}
                  <div className="p-5 rounded-3xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-650 font-light leading-relaxed flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-black shrink-0 animate-pulse" />
                    <span>
                      <strong>三维协同管线：</strong>以 C4D/Blender 建立精密拓扑，经 Cycles/Octane 施加精美高亮材质，最终融入 Midjourney/SD 进行创意贴图扩增与质感修复，形成新一代先锋包装设计资产。
                    </span>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};
