'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const SplashScreen = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Quick timeout for a "snappy" feel as requested by the user
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: -100,
            transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }
          }}
          className="fixed inset-0 z-[999] bg-white flex items-center justify-center pointer-events-none"
        >
          <div className="relative flex flex-col items-center">
            {/* Background Glow */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: [0.8, 1.2, 1],
                opacity: [0, 0.2, 0.1],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute w-64 h-64 bg-[#B91C1C] rounded-full blur-[100px]"
            />

            {/* Logo Animation */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 20 }}
              animate={{
                scale: 1,
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: "easeOut" }
              }}
              className="relative z-10 flex items-center gap-4 md:gap-6"
            >
              {/* Rounded Outline Emblem */}
              <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border-[4px] md:border-[5px] border-black flex items-center justify-center shadow-2xl">
                <span className="text-3xl md:text-5xl font-black text-black tracking-tighter">D.</span>
              </div>
              {/* Text Logo */}
              <div className="flex items-end tracking-[-0.05em]">
                <span className="text-4xl md:text-7xl font-black uppercase text-black">DARTS</span>
                <span className="text-[#B91C1C] text-5xl md:text-8xl font-black leading-[0] mb-1.5 md:mb-3 ml-1">.</span>
              </div>
            </motion.div>

            {/* Premium Loading Bar */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{
                width: 200,
                opacity: 1,
                transition: { delay: 0.3, duration: 1.2, ease: "easeInOut" }
              }}
              className="h-1 bg-[#B91C1C] mt-8 rounded-full shadow-[0_0_15px_rgba(185,28,28,0.5)]"
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-gray-900 font-bold uppercase tracking-[0.2em] text-[9px] mt-6 text-center max-w-[250px]"
            >
              Arts & Crafts Store
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 1.2 }}
              className="text-[#B91C1C] font-black uppercase tracking-[0.6em] text-[8px] mt-4"
            >
              Precision Matters
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
