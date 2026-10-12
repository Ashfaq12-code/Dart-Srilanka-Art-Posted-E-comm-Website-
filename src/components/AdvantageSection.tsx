'use client';

import React from 'react';
import { Award, Target, ShieldCheck, Headphones } from 'lucide-react';

const ADVANTAGES = [
    { 
        icon: Award, 
        title: "Quality Standards", 
        desc: "All darts pass professional balance tests before shipping to ensure tournament readiness.",
        position: "top-left"
    },
    { 
        icon: Target, 
        title: "Precision Gear", 
        desc: "Advanced micro-grip designs that ensure a consistent and professional release every time.",
        position: "bottom-left"
    },
    { 
        icon: ShieldCheck, 
        title: "Official Brands", 
        desc: "We are an authorized dealer for world-leading brands Winmau, Target, and Red Dragon.",
        position: "top-right"
    },
    { 
        icon: Headphones, 
        title: "Loved By Customers", 
        desc: "Thousands of happy players across Sri Lanka trust our expert advice and quality gear.",
        position: "bottom-right"
    }
];

export const AdvantageSection = () => {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-20">
                    <span className="text-[#B91C1C] font-black uppercase tracking-[0.4em] text-[10px] mb-4 block animate-in fade-in slide-in-from-bottom-2 duration-700">~ Feature Services ~</span>
                    <h2 className="text-4xl lg:text-6xl font-black text-black uppercase tracking-tight mb-8 drop-shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-1000 italic">WHY CHOOSE US</h2>
                    <p className="text-gray-500 max-w-3xl mx-auto text-sm lg:text-base leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-1000 px-4 italic">
                        At Dart Sri Lanka, we provide professional-grade equipment and expert advice for players of all levels. 
                        Our team of experts ensures every product meets international tournament standards.
                    </p>
                </div>

                <div className="relative flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-0">
                    {/* Left Column Cards */}
                    <div className="w-full lg:w-1/3 flex flex-col gap-8 z-10">
                        {ADVANTAGES.slice(0, 2).map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <div key={i} className="bg-[#facc15]/10 border border-[#facc15]/20 p-10 rounded-[40px] text-center group hover:bg-[#B91C1C] hover:border-[#B91C1C] transition-all duration-700 cursor-default">
                                    <div className="w-16 h-16 bg-[#B91C1C] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-white group-hover:text-[#B91C1C] transition-colors shadow-lg">
                                        <Icon size={30} className="group-hover:text-[#B91C1C] text-white transition-colors" />
                                    </div>
                                    <h3 className="text-sm font-black uppercase tracking-widest text-[#B91C1C] mb-4 group-hover:text-white transition-colors">{item.title}</h3>
                                    <p className="text-gray-500 text-xs leading-relaxed group-hover:text-white/80 transition-colors">{item.desc}</p>
                                </div>
                            );
                        })}
                    </div>

                    {/* Central Product Image */}
                    <div className="w-full lg:w-1/3 relative flex items-center justify-center px-8">
                        <div className="absolute inset-0 bg-[#B91C1C]/5 rounded-full blur-3xl scale-125" />
                        <img 
                            src="https://i.ibb.co/6R2Z6r6w/Darts-Image-Center-Place.png" 
                            alt="Dart Excellence" 
                            className="relative z-10 w-full max-w-[400px] h-auto object-contain drop-shadow-[0_35px_60px_-15px_rgba(185,28,28,0.3)] animate-float"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1598424911467-fbd59d19a4e6?auto=format&fit=crop&q=80';
                            }}
                        />
                    </div>

                    {/* Right Column Cards */}
                    <div className="w-full lg:w-1/3 flex flex-col gap-8 z-10">
                        {ADVANTAGES.slice(2, 4).map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <div key={i} className="bg-[#facc15]/10 border border-[#facc15]/20 p-10 rounded-[40px] text-center group hover:bg-[#B91C1C] hover:border-[#B91C1C] transition-all duration-700 cursor-default">
                                    <div className="w-16 h-16 bg-[#B91C1C] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-white group-hover:text-[#B91C1C] transition-colors shadow-lg">
                                        <Icon size={30} className="group-hover:text-[#B91C1C] text-white transition-colors" />
                                    </div>
                                    <h3 className="text-sm font-black uppercase tracking-widest text-[#B91C1C] mb-4 group-hover:text-white transition-colors">{item.title}</h3>
                                    <p className="text-gray-500 text-xs leading-relaxed group-hover:text-white/80 transition-colors">{item.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};
