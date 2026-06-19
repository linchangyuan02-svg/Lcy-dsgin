/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { X, Calendar, Layers, Database, Sparkles, MoveRight } from 'lucide-react';
import { PortfolioItem } from '../types';
import { ProceduralModel } from './ProceduralModel';

interface LightboxProps {
  item: PortfolioItem | null;
  onClose: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 1. Frosted deep overlay backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
      />

      {/* 2. Focused Pure Image Container without any text */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: 'spring', damping: 25, stiffness: 180 }}
        className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-[24px] shadow-2xl z-10 flex items-center justify-center bg-zinc-900 border border-zinc-800"
      >
        {/* Close Button overlay */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-25 bg-black/60 hover:bg-black text-white hover:scale-105 transition-all p-2 rounded-full cursor-pointer border border-white/10"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {item.imageUrl ? (
          <img 
            src={item.imageUrl} 
            alt={item.title} 
            className="max-w-full max-h-[85vh] object-contain rounded-[24px]"
            style={{ width: 'auto', height: 'auto' }}
            referrerPolicy="no-referrer"
          />
        ) : (
          <div 
            className="w-[450px] h-[450px] max-w-full flex items-center justify-center rounded-[24px]"
            style={{
              background: `linear-gradient(135deg, ${item.gradientStart}, ${item.gradientEnd})`
            }}
          >
            <ProceduralModel
              shapeType={item.shapeType}
              gradientStart={item.gradientStart}
              gradientEnd={item.gradientEnd}
              accentColor={item.accentColor}
              complexity={item.complexity}
            />
          </div>
        )}
      </motion.div>
    </div>
  );
};
