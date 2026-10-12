'use client';

import React from 'react';
import { Target, Truck, ShieldCheck, Headphones, Zap, Star, Award, TrendingUp } from 'lucide-react';

export const FeatureSection = () => {
    return (
        <div className="bg-white">
            {/* 1. How It Works - Image 5 top sction */}
            <section className="py-24 border-b border-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-[#B91C1C] font-bold text-[11px] mb-4 block tracking-widest">Process experience</span>
                        <h2 className="text-4xl lg:text-5xl font-black text-black tracking-tight mb-4 italic">How it works.</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden lg:block absolute top-[60px] left-[10%] right-[10%] h-px bg-dashed border-t border-dashed border-gray-100 z-0" />
                        
                        {[
                            { icon: Target, title: "Select Gear", desc: "Choose from our premium collection of darts and accessories." },
                            { icon: Zap, title: "Customize", desc: "Add professional shafts and flights to match your playstyle." },
                            { icon: Truck, title: "Fast Shipping", desc: "We ship island-wide with tracking and safe packaging." },
                            { icon: Star, title: "Play Like Pro", desc: "Reach new levels with precision tungsten and tournament bards." },
                        ].map((step, i) => {
                            const Icon = step.icon;
                            return (
                                <div key={i} className="relative z-10 flex flex-col items-center text-center group">
                                    <div className="w-24 h-24 bg-gray-50 rounded-[35px] flex items-center justify-center text-black mb-8 group-hover:bg-[#B91C1C] group-hover:text-white group-hover:scale-110 transition-all duration-500 shadow-sm border border-gray-100">
                                        <Icon size={36} />
                                    </div>
                                    <h3 className="text-lg font-black tracking-tight mb-3 text-black italic">{i + 1}. {step.title}</h3>
                                    <p className="text-gray-400 text-xs leading-relaxed max-w-[200px]">{step.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 2. Why Choose Us - Image 5 feature section */}
            <section className="py-24 bg-[#f8fafc]">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="relative">
                            <div className="absolute inset-0 bg-[#B91C1C]/10 rounded-full blur-[100px] -m-20 scale-75" />
                            <img 
                                src="https://images.unsplash.com/photo-1598424911467-fbd59d19a4e6?auto=format&fit=crop&q=80" 
                                className="relative z-10 w-full h-[600px] object-cover rounded-[60px] shadow-2xl animate-float"
                                alt="Why Choose Us"
                            />
                            {/* Floating Stats */}
                            <div className="absolute top-10 -right-10 z-20 bg-white p-8 rounded-[40px] shadow-2xl animate-bounce-slow border border-gray-100">
                                <p className="text-3xl font-black text-[#B91C1C]">97%</p>
                                <p className="text-[10px] font-bold text-gray-400">Tungsten purity</p>
                            </div>
                            <div className="absolute bottom-20 -left-10 z-20 bg-black text-white p-8 rounded-[40px] shadow-2xl animate-bounce-slow delay-1000">
                                <p className="text-3xl font-black text-[#B91C1C]">58K+</p>
                                <p className="text-[10px] font-bold text-gray-400">TikTok fans</p>
                            </div>
                        </div>

                        <div className="space-y-12">
                            <div>
                                <span className="text-[#B91C1C] font-bold text-[11px] mb-4 block tracking-widest">The advantage</span>
                                <h2 className="text-4xl lg:text-6xl font-black text-black tracking-tight mb-8 italic">Why professional players <span className="text-[#B91C1C]">choose us.</span></h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                {[
                                    { icon: <Award />, title: "Quality Standards", desc: "All darts pass professional balance tests before shipping." },
                                    { icon: <TrendingUp />, title: "Precision Gear", desc: "Micro-grip designs that ensure consistent release." },
                                    { icon: <ShieldCheck />, title: "Official Brands", desc: "Authorized dealer for Winmau, Target, and Red Dragon." },
                                    { icon: <Headphones />, title: "24/7 Support", desc: "Real players ready to help you on WhatsApp any time." },
                                ].map((feat, i) => (
                                    <div key={i} className="group p-8 bg-white rounded-[40px] border border-gray-100 hover:shadow-2xl transition-all duration-700">
                                        <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-[#B91C1C] mb-6 group-hover:scale-110 transition-transform">{feat.icon}</div>
                                        <h3 className="text-sm font-black uppercase tracking-tight mb-3 text-black">{feat.title}</h3>
                                        <p className="text-gray-500 text-xs leading-relaxed">{feat.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
