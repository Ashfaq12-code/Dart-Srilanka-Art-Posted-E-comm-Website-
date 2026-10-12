'use client';

import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Wifi, Globe, Rocket, ShieldCheck } from 'lucide-react';

export const GlobalMapSection = () => {
  const visitLink = "https://www.google.com/maps/search/Dart+Sri+Lanka/@6.927079,79.861244,12z";
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    // Disable interactive 3D on mobile to prevent heating
    if (typeof window !== 'undefined' && window.innerWidth < 768) return;

    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    setMousePos({ x, y });
  };

  const speakLocation = useCallback((name: string) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel(); // Stop current speech
      const utterance = new SpeechSynthesisUtterance(name);
      utterance.rate = 1.1;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  const Pin = ({ top, left, name, main = false, flag = false, alwaysShow = false }: { top: string; left: string; name: string; main?: boolean; flag?: boolean; alwaysShow?: boolean }) => (
    <div className="absolute z-20" style={{ top, left }}>
      {/* Black Pulse Ring */}
      <div className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2">
        <div className="w-12 h-6 bg-black/10 rounded-[100%] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-ping" />
        <div className="w-8 h-4 bg-black/5 rounded-[100%] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>

      <motion.div
        whileHover={{ scale: 1.1, y: -5 }}
        onMouseEnter={() => speakLocation(name)}
        className="relative cursor-pointer group"
      >
        {/* Floating Label - Persistent if alwaysShow is true */}
        <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 whitespace-nowrap transition-opacity bg-black text-white text-[10px] font-bold px-3 py-2 rounded-lg shadow-xl pointer-events-none flex items-center gap-2 border border-white/10
          ${alwaysShow ? 'opacity-100 ring-4 ring-black/5' : 'opacity-0 group-hover:opacity-100'}`}>

          {flag && (
            <img src="https://flagcdn.com/lk.svg" className="w-4 h-2.5 object-cover rounded-[1px]" alt="Flag" />
          )}

          {name}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-black" />
        </div>

        {/* 3D Map Pin SVG */}
        <div className="relative">
          <svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl">
            <path d="M16 0C7.16344 0 0 7.16344 0 16C0 28 16 40 16 40C16 40 32 28 32 16C32 7.16344 24.8366 0 16 0Z" fill={main ? "#B91C1C" : "#1a1a1a"} />
            <circle cx="16" cy="16" r="6" fill="white" />
          </svg>
        </div>
      </motion.div>
    </div>
  );

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
      className="relative w-full bg-white py-24 md:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h4 className="text-[#B91C1C] font-bold text-[11px] mb-4 tracking-widest">Our global footprint</h4>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter leading-none italic mb-6">
              Strategic global <span className="text-[#B91C1C]">operations</span>
            </h2>
            <p className="max-w-2xl mx-auto text-gray-400 font-medium text-sm leading-relaxed">
              Powering professional dart enthusiasts worldwide with 15+ high-tech logistics hubs and primary operations centered in Sri Lanka.
            </p>
          </motion.div>
        </div>

        {/* 3D Map Container */}
        <div className="perspective-2000 relative overflow-x-auto md:overflow-visible scrollbar-hide pb-10 md:pb-0 touch-pan-x snap-x snap-mandatory">
          <motion.div
            animate={{
              rotateX: mousePos.y * 12,
              rotateY: mousePos.x * 12
            }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
            style={{ transformStyle: "preserve-3d" }}
            className="relative min-w-[800px] md:min-w-0 w-full aspect-[2/1] md:aspect-[2/1] bg-white-50/10 rounded-3xl snap-center"
          >
            <img
              src="https://i.ibb.co/C3ysbx9c/image-1-removebg-preview-2.png"
              alt="World Map Dashboard"
              className="w-full h-full object-contain select-none shadow-[inset_0_35px_60px_-15px_rgba(0,0,0,0.02)] pointer-events-none"
            />

            {/* Global Distribution of Specialized Hubs */}
            <Pin top="65.5%" left="66.5%" name="Dart Srilanka" main={true} flag={true} alwaysShow={true} />
            <Pin top="32%" left="48.5%" name="Kandy " /> {/* Europe */}
            <Pin top="35%" left="22%" name="Negambo " /> {/* Americas */}
            <Pin top="72%" left="82%" name="Kurunegala " /> {/* Oceania */}
            <Pin top="34%" left="88%" name="Galle " /> {/* East Asia */}
            <Pin top="38%" left="62%" name="Colombo " /> {/* Middle East */}
          </motion.div>

          {/* Business Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 md:mt-24 border-t border-gray-100 pt-16">
            {[

            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center justify-center md:justify-start gap-6 px-4"
              >
                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-[#B91C1C] border border-gray-100">

                </div>
                <div>

                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>



      <style jsx>{`
        .perspective-2000 {
          perspective: 2000px;
        }
      `}</style>
    </section>
  );
};
