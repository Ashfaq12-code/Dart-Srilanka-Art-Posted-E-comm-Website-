'use client';

import React, { useState } from 'react';
import { Play, Pause, Sparkles, Target, Compass, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/ScrollReveal';

export default function AboutPage() {
    const [isPlaying, setIsPlaying] = useState(false);
    return (
        <div className="bg-white dark:bg-black min-h-screen pt-44 pb-32 overflow-hidden">

            {/* HERO SECTION */}
            <section className="max-w-7xl mx-auto px-4 mb-32">
                <ScrollReveal direction="up">
                    <div className="text-center">
                        <h4 className="text-[#B91C1C] font-cursive text-3xl mb-4">~ The Story of D. ~</h4>
                        <h1 className="text-5xl md:text-8xl font-black text-gray-900 dark:text-white tracking-tighter italic uppercase leading-none mb-8">
                            PRECISION <span className="text-red-600">&</span> PASSION.
                        </h1>
                        <div className="w-24 h-1.5 bg-red-600 mx-auto mb-12" />
                        <p className="max-w-2xl mx-auto text-gray-500 dark:text-gray-400 text-sm md:text-base leading-relaxed uppercase tracking-widest font-medium">
                            Sri Lanka’s premier destination for cinematic poster design and elite visual storytelling.
                        </p>
                    </div>
                </ScrollReveal>
            </section>

            {/* CORE PILLARS */}
            <section className="max-w-7xl mx-auto px-4 mb-44">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* VISION */}
                    <ScrollReveal direction="up" delay={100}>
                        <div className="group p-12 bg-[#fafafa] dark:bg-[#0a0a0a] rounded-[2.5rem] border border-gray-100 dark:border-white/5 hover:border-red-600/20 transition-all duration-500 text-center">
                            <div className="w-16 h-16 bg-white dark:bg-black rounded-2xl flex items-center justify-center shadow-xl mb-8 mx-auto group-hover:scale-110 transition-transform">
                                <Compass className="text-red-600" size={28} />
                            </div>
                            <h3 className="text-sm font-black tracking-[0.3em] text-gray-900 dark:text-white mb-6 uppercase">Our Vision</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-xs leading-loose tracking-widest uppercase">
                                To become Sri Lanka’s leading platform for premium poster design, inspiring creativity through innovation.
                            </p>
                        </div>
                    </ScrollReveal>

                    {/* WHAT WE DO */}
                    <ScrollReveal direction="up" delay={200}>
                        <div className="group p-12 bg-black text-white rounded-[2.5rem] shadow-2xl shadow-black/20 text-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-6 opacity-10">
                                <Sparkles size={100} />
                            </div>
                            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8 mx-auto group-hover:scale-110 transition-transform border border-white/10">
                                <Target className="text-red-500" size={28} />
                            </div>
                            <h3 className="text-sm font-black tracking-[0.3em] text-white mb-6 uppercase">What We Do</h3>
                            <p className="text-gray-300 text-xs leading-loose tracking-widest uppercase mb-8">
                                We create cinematic, high-impact poster designs inspired by global trends and cinematic visuals.
                            </p>
                            <Link href="/contact" className="inline-flex items-center gap-2 text-[10px] font-black tracking-[0.4em] uppercase text-red-500 hover:text-white transition-colors">
                                WORK WITH US <ArrowRight size={14} />
                            </Link>
                        </div>
                    </ScrollReveal>

                    {/* MISSION */}
                    <ScrollReveal direction="up" delay={300}>
                        <div className="group p-12 bg-[#fafafa] dark:bg-[#0a0a0a] rounded-[2.5rem] border border-gray-100 dark:border-white/5 hover:border-red-600/20 transition-all duration-500 text-center">
                            <div className="w-16 h-16 bg-white dark:bg-black rounded-2xl flex items-center justify-center shadow-xl mb-8 mx-auto group-hover:scale-110 transition-transform">
                                <Play className="text-red-600 ml-1" size={28} fill="currentColor" />
                            </div>
                            <h3 className="text-sm font-black tracking-[0.3em] text-gray-900 dark:text-white mb-6 uppercase">Our Mission</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-xs leading-loose tracking-widest uppercase">
                                To provide affordable, high-quality poster design services that empower creators with impactful visuals.
                            </p>
                        </div>
                    </ScrollReveal>

                </div>
            </section>

            {/* DEEP DIVE SECTION */}
            <section className="bg-gray-50 dark:bg-white/5 py-32 relative">
                <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-20">

                    {/* TEXT CONTENT */}
                    <div className="w-full lg:w-1/2">
                        <ScrollReveal direction="left">
                            <h4 className="text-red-600 font-bold text-[10px] uppercase tracking-[0.4em] mb-6">About Dart Srilanka</h4>
                            <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-8 tracking-tighter leading-[1.1] italic uppercase">
                                WE BUILD <span className="text-red-600">STORIES.</span>
                            </h2>
                            <div className="space-y-6">
                                <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed font-medium">
                                    Poster Design Art Boards delivers affordable, high-quality poster designs that help businesses and creators stand out through impactful visuals and professional creative support.
                                </p>
                                <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed">
                                    We believe great design is not just about visuals, but the impact it creates. Our designs combine bold typography, cinematic visuals, and modern creativity to deliver powerful storytelling.
                                </p>
                            </div>
                            <div className="mt-12">
                                <Link href="/shop">
                                    <button className="px-12 py-5 bg-black dark:bg-white dark:text-black text-white font-black text-[11px] uppercase tracking-[0.3em] hover:bg-red-600 dark:hover:bg-red-600 dark:hover:text-white transition-all duration-500 shadow-2xl shadow-black/20 active:scale-95">
                                        EXPLORE THE SHOP
                                    </button>
                                </Link>
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* IMAGE PREVIEW */}
                    <div className="w-full lg:w-1/2 relative">
                        <ScrollReveal direction="right">
                            <div
                                className="relative z-10 w-full aspect-video rounded-[3rem] overflow-hidden shadow-2xl group border-[12px] border-white dark:border-black cursor-pointer bg-black"
                                onClick={() => setIsPlaying(!isPlaying)}
                            >
                                <img
                                    src={isPlaying ? "https://i.ibb.co/BHrXsQkW/converted-1.gif" : "https://i.ibb.co/8gR28j8R/81-E834l-KEJL-AC-UF894-1000-QL80.jpg"}
                                    alt="Creative Studio"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl"
                                    >
                                        {isPlaying ? (
                                            <Pause size={28} className="text-black" fill="currentColor" />
                                        ) : (
                                            <Play size={28} className="text-black ml-1" fill="currentColor" />
                                        )}
                                    </motion.div>
                                </div>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-600/10 rounded-full blur-[60px]" />
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-red-600/10 rounded-full blur-[60px]" />
                        </ScrollReveal>
                    </div>

                </div>
            </section>

        </div>
    );
}