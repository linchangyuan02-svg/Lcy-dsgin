import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const HeaderNavbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Transition to sticky capsule style after scrolling down slightly (e.g. 80px)
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string, isHome: boolean = false) => {
    if (isHome) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Nav menu item definitions
  const menuItems = [
    { label: '首页', action: () => handleNavClick('', true), key: 'home' },
    { label: '包装创意落地', action: () => handleNavClick('packaging'), key: 'packaging' },
    { label: '商业视觉提案', action: () => handleNavClick('commercial-proposal'), key: 'proposal' },
    { label: '3D视觉作品', action: () => handleNavClick('rendering'), key: 'rendering' },
    { label: '关于我', action: () => handleNavClick('introduction'), key: 'about' },
    { label: '联系合作', action: () => handleNavClick('contact'), key: 'contact' },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="fixed left-0 right-0 z-50 pointer-events-none flex justify-center transition-all duration-300"
      style={{
        top: isScrolled ? '1rem' : '2rem',
      }}
    >
      <div 
        className={`pointer-events-auto flex items-center justify-between transition-all duration-300 ease-out border font-sans font-medium select-none shadow-[0_8px_32px_rgba(0,0,0,0.03)] ${
          isScrolled 
            ? 'w-[92%] sm:w-fit pl-4 pr-2 py-[1px] bg-white/70 backdrop-blur-xl border-zinc-200/40 rounded-full' 
            : 'w-[90%] max-w-7xl pl-4 pr-4 py-[1px] bg-white/10 backdrop-blur-md border-white/20 rounded-2xl'
        }`}
      >
        {/* Unified Outer Container holds the main inline navigation list */}
        <div className={`w-full flex items-center gap-x-2 sm:gap-x-4 ${isScrolled ? 'justify-center sm:justify-start' : 'justify-between'}`}>
          
          {/* Main List */}
          <div className={`flex items-center gap-1 sm:gap-2 w-full ${isScrolled ? 'justify-center' : 'justify-between'}`}>
            {menuItems.map((item) => (
              <motion.button
                key={item.key}
                onClick={item.action}
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: isScrolled ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.25)', 
                  color: isScrolled ? '#000000' : '#ffffff' 
                }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-[13px] tracking-wider rounded-full cursor-pointer transition-colors duration-250 ${
                  isScrolled 
                    ? 'text-zinc-600 font-semibold' 
                    : 'text-[#e4e4e7] font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)]'
                }`}
              >
                {item.label}
              </motion.button>
            ))}
          </div>

        </div>
      </div>
    </motion.header>
  );
};
