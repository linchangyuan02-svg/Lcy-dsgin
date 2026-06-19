/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { USER_INFO } from '../data';

interface VenetianBlindsProps {
  onScrollDown: () => void;
}

export const VenetianBlinds: React.FC<VenetianBlindsProps> = ({ onScrollDown }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Trigger blind opening sequence shortly after mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  // 12 slats representing the physical blinds overlaying the background text
  const slatsCount = 12;

  return (
    <div className="relative w-full h-screen bg-white flex flex-col justify-between overflow-hidden">
      
      {/* 1. Underlying Clean Background Cover - Solid Pristine White with Auto-Playing Background Video */}
      <div className="absolute inset-0 bg-white overflow-hidden">
        <video
          src="https://private-user-images.githubusercontent.com/291725100/604422389-e86ac53b-2a5a-4d29-9b5e-ff20851b2dbc.mp4?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3ODEwMTg1ODUsIm5iZiI6MTc4MTAxODI4NSwicGF0aCI6Ii8yOTE3MjUxMDAvNjA0NDIyMzg5LWU4NmFjNTNiLTJhNWEtNGQyOS05YjVlLWZmMjA4NTFiMmRiYy5tcDQ_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjYwNjA5JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI2MDYwOVQxNTE4MDVaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1kNjMyNTI5YzQ1ODk5N2YzMWEzNDk4YTE5NDczMWIwOGJjNGViODdiNzA5M2NhNTg1ODM2ZGM5YmNhYzgyMjVhJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZyZXNwb25zZS1jb250ZW50LXR5cGU9dmlkZW8lMkZtcDQifQ.-FvGXud6UM2jPHuLaqrUCPQxN3gBYH_0zlNou-JhqjY"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-95 transition-opacity duration-1000"
        />
        {/* Subtle absolute overlay shade to ensure background sits elegantly behind typography elements */}
        <div className="absolute inset-0 bg-white/10 pointer-events-none" />
      </div>

      {/* 3. Primary Typographic Layout (Mockup Replica) */}
      <div className="relative z-10 flex-1 flex flex-col justify-between p-6 sm:p-10 select-none w-full h-full max-w-7xl mx-auto">
        {/* Navigation is now dynamically controlled by the global HeaderNavbar wrapper */}
        <div />

        {/* No Bottom Bar elements per request */}
      </div>

      {/* 4. Physical Venetian Blind Overlay (3D Flipping Slats) */}
      <div className="absolute inset-0 grid grid-cols-1 grid-rows-12 pointer-events-none z-20">
        {Array.from({ length: slatsCount }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ rotateX: 0 }}
            animate={{ rotateX: isOpen ? 92 : 0 }}
            transition={{
              duration: 1.4,
              delay: i * 0.08,
              ease: [0.25, 1, 0.5, 1]
            }}
            style={{
              originY: 0,
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden'
            }}
            className="relative w-full h-full bg-gradient-to-r from-zinc-100 via-white to-zinc-50 border-b border-zinc-200/65 shadow-inner"
          >
            {/* Fine texture lines on each slat representing physical venetian blinds cords & slits */}
            <div className="absolute left-[15%] top-0 bottom-0 w-px bg-zinc-200/40" />
            <div className="absolute right-[15%] top-0 bottom-0 w-px bg-zinc-200/40" />
            <div className="absolute inset-0 flex items-center justify-between px-10 text-[9px] font-mono text-zinc-300 uppercase tracking-[0.2em] select-none opacity-40">
              <span>SLAT_{String(i + 1).padStart(2, '0')}</span>
              <span>DEG: {isOpen ? '92°' : '0°'}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
