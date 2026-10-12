'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Box, Target, Zap, Shield, ShoppingBag } from 'lucide-react';

const CATEGORY_ITEMS = [
  { 
    id: 'steel', 
    name: 'Steel Tip', 
    fullName: 'Professional Steel Tip',
    description: 'Precision-engineered tungsten barrels for maximum grouping and trajectory control.', 
    image: 'https://i.ibb.co/jvfYkCzx/pngimg-com-darts-PNG27-removebg-preview.png', 
    count: 24,
    color: 'bg-zinc-100'
  },
  { 
    id: 'soft', 
    name: 'Soft Tip', 
    fullName: 'Modern Soft Tip',
    description: 'Advanced polymer technology for electronic dart systems and casual play.', 
    image: 'https://png.pngtree.com/png-vector/20250306/ourmid/pngtree-red-dart-with-sharp-metal-tip-for-target-game-png-image_15733824.png', 
    count: 18,
    color: 'bg-red-50'
  },
  { 
    id: 'boards', 
    name: 'Boards', 
    fullName: 'Tournament Dartboards',
    description: 'Professional grade sisal surfaces with thin wire technology for fewer bounce-outs.', 
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKTNjxday8loCpV4tEDEywaiSkqQraVuxZiQ&s', 
    count: 12,
    color: 'bg-zinc-100'
  },
  { 
    id: 'flights', 
    name: 'Flights', 
    fullName: 'Aero Pros Flights',
    description: 'Optimized aerodynamic shapes to stabilize your flight path and accuracy.', 
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvLjBddf1MV5LiJPTmWN5FK7lvaWM12g5G3Q&s', 
    count: 48,
    color: 'bg-blue-50'
  },
  { 
    id: 'shafts', 
    name: 'Shafts', 
    fullName: 'Precision Shafts',
    description: 'Lightweight and durable stems designed to survive the impact of pro-level play.', 
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN6qLvupWZTZuMj5wn5rBQGrsdmakyeQ7evg&s', 
    count: 32,
    color: 'bg-zinc-100'
  },
  { 
    id: 'accessories', 
    name: 'Gear', 
    fullName: 'Elite Accessories',
    description: 'Cases, sharpeners, and multi-tools to keep your setup in peak condition.', 
    image: 'https://images.unsplash.com/photo-1598424914671-fbd59d19a4e6?auto=format&fit=crop&q=80', 
    count: 15,
    color: 'bg-zinc-100'
  },
];

export default function CategoriesPage() {
  return (
    <div className="bg-white min-h-screen">
      
      {/* --- HERO HEADER --- */}
      <section className="pt-32 pb-20 px-4 md:px-8 border-b border-gray-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
          <motion.p 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             className="text-[#B91C1C] font-black tracking-[0.4em] uppercase text-[10px] mb-4"
          >
            ● Dart Sri Lanka Collections
          </motion.p>
          <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="text-6xl md:text-8xl font-black text-black tracking-tighter italic leading-none mb-6"
          >
            The Sectors.
          </motion.h1>
          <motion.p 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="text-gray-500 text-lg max-w-2xl font-medium tracking-wide leading-relaxed"
          >
            From professional tungsten barrels to tournament-grade boards, discover our meticulously curated sectors of performance equipment.
          </motion.p>
        </div>
        
        {/* Background Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25vw] font-black text-gray-50/50 select-none pointer-events-none z-0">
          CATEGORIES
        </div>
      </section>

      {/* --- ADVANCED GRID --- */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {CATEGORY_ITEMS.map((cat, i) => (
            <ScrollReveal key={cat.id} direction="up" delay={i * 80} duration={600}>
              <Link href={`/shop?cat=${cat.name}`} className="group block">
                <div className={`aspect-[4/5] relative rounded-[40px] overflow-hidden transition-all duration-700 ${cat.color} group-hover:shadow-2xl group-hover:shadow-black/5`}>
                  
                  {/* Image with parallax reveal */}
                  <div className="absolute inset-0 p-12 flex items-center justify-center">
                    <motion.img 
                      whileHover={{ scale: 1.1, rotate: -2 }}
                      transition={{ type: "spring", stiffness: 100 }}
                      src={cat.image} 
                      alt={cat.name} 
                      className="w-full h-full object-contain mix-blend-multiply drop-shadow-2xl" 
                    />
                  </div>

                  {/* Top Bar Info */}
                  <div className="absolute top-8 left-8 right-8 flex justify-between items-start z-20">
                    <span className="text-[10px] font-black tracking-widest text-[#B91C1C] uppercase">
                       Sector {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="w-12 h-12 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                       <ArrowRight size={20} className="text-black" />
                    </div>
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  {/* Hover Content */}
                  <div className="absolute bottom-8 left-8 right-8 z-20 translate-y-10 group-hover:translate-y-0 transition-transform duration-700">
                    <h3 className="text-4xl font-black text-white italic tracking-tighter mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                      {cat.name}
                    </h3>
                    <p className="text-white/70 text-[11px] font-medium tracking-wide line-clamp-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200">
                      {cat.description}
                    </p>
                  </div>
                </div>

                {/* Footer Info (Visible always) */}
                <div className="mt-8 flex justify-between items-center px-4">
                  <div>
                    <h4 className="text-xl font-bold text-black tracking-tight">{cat.fullName}</h4>
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">
                      {cat.count} AVAILABLE ITEMS
                    </p>
                  </div>
                  <div className="h-[1px] flex-1 bg-gray-100 mx-6 group-hover:bg-[#B91C1C] transition-colors duration-700" />
                  <Target size={16} className="text-gray-300 group-hover:text-[#B91C1C] transition-colors" />
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* --- PROMO BLOCK --- */}
      <section className="py-24 px-4 bg-zinc-950 text-white overflow-hidden relative">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between relative z-10 gap-12">
             <div className="max-w-xl">
                <span className="text-[#B91C1C] font-black tracking-[0.3em] uppercase text-[10px] mb-4 block">Dart Sri Lanka Club</span>
                <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter mb-8 leading-[0.9]">
                  Need Custom Gear?
                </h2>
                <p className="text-white/50 mb-10 text-lg leading-relaxed font-medium">
                  Looking for something specific? We provide professional consultation for island-wide club setups and professional tournament arrangements.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button variant="vogue" size="lg" className="bg-white text-black hover:bg-white/90">
                    Contact Experts
                  </Button>
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white hover:text-black">
                    View FAQ
                  </Button>
                </div>
             </div>
             
             <div className="relative group">
                <div className="absolute inset-0 bg-[#B91C1C] rounded-[50px] rotate-6 group-hover:rotate-0 transition-transform duration-1000 blur-2xl opacity-20" />
                <img 
                   src="https://png.pngtree.com/png-vector/20250306/ourmid/pngtree-red-dart-with-sharp-metal-tip-for-target-game-png-image_15733824.png" 
                   className="w-[300px] md:w-[450px] relative z-20 group-hover:scale-105 transition-transform duration-1000"
                   alt="Promo"
                />
             </div>
          </div>

          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] -mr-64 -mt-64" />
      </section>

      <footer className="py-12 border-t border-gray-100 text-center">
         <p className="text-[10px] font-black tracking-widest text-gray-300 uppercase">
           &copy; 2026 Dart Sri Lanka. All Rights Reserved.
         </p>
      </footer>
    </div>
  );
}
