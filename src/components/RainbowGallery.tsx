'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const TypewriterText = ({ text, className }: { text: string, className?: string }) => {
    const [displayed, setDisplayed] = useState('');
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (!isInView) return;
        let i = 0;
        const interval = setInterval(() => {
            i++;
            setDisplayed(text.slice(0, i));
            if (i >= text.length) clearInterval(interval);
        }, 30); // Fast typing
        return () => clearInterval(interval);
    }, [isInView, text]);

    return (
        <p ref={ref} className={className}>
            {displayed}
            <span className="animate-pulse inline-block w-1.5 h-[1em] bg-[#B91C1C] ml-1 align-middle" />
        </p>
    );
};
const GALLERY_ITEMS = [
    {
        id: 1,
        title: 'Custom Board Art',
        subtitle: 'Handcrafted • 01',
        description: 'Premium handcrafted dart board designs made with precision and creativity.',
        image: 'https://i.ibb.co/234bxsnn/output-1.gif',
        span: 'md:col-span-2 md:row-span-2'
    },
    {
        id: 2,
        title: 'Creative Patterns',
        subtitle: 'Art Craft • 02',
        description: 'Unique artistic patterns designed to enhance visual appeal and gameplay vibe.',
        image: 'https://i.ibb.co/Jjwq76JR/unnamed-2026-04-16-T124458-834.jpg',
        span: 'md:col-span-1 md:row-span-2'
    },
    {
        id: 3,
        title: 'Modern Design',
        subtitle: 'Style • 03',
        description: 'Clean and modern dart board layouts for a professional look.',
        image: 'https://i.ibb.co/99WwQ5X3/unnamed-2026-04-16-T124456-143.jpg',
        span: 'md:col-span-1 md:row-span-1'
    },
    {
        id: 4,
        title: 'Classic Craft',
        subtitle: 'Vintage • 04',
        description: 'Traditional handcrafted styles inspired by classic dart designs.',
        image: 'https://i.ibb.co/p6GVYm5g/unnamed-2026-04-16-T124452-347.jpg',
        span: 'md:col-span-1 md:row-span-1'
    },
    {
        id: 5,
        title: 'Premium Finish',
        subtitle: 'Quality • 05',
        description: 'High-quality finishing with attention to detail for durability and beauty.',
        image: 'https://i.ibb.co/HLLp1Kw3/unnamed-2026-04-16-T124449-017.jpg',
        span: 'md:col-span-2 md:row-span-1'
    },
    {
        id: 6,
        title: 'Dark Edition',
        subtitle: 'Exclusive • 06',
        description: 'Bold and dark themed designs for a powerful visual presence.',
        image: 'https://i.ibb.co/nspZ12rg/unnamed-2026-04-16-T124444-905.jpg',
        span: 'md:col-span-2 md:row-span-1'
    },
    {
        id: 7,
        title: 'Minimal Style',
        subtitle: 'Simple • 07',
        description: 'Minimal and clean board designs focused on simplicity.',
        image: 'https://i.ibb.co/bjrCBrr8/unnamed-2026-04-16-T124439-010.jpg',
        span: 'md:col-span-1 md:row-span-1'
    },
    {
        id: 8,
        title: 'Signature Collection',
        subtitle: 'Premium • 08',
        description: 'Exclusive signature designs crafted for professionals and collectors.',
        image: 'https://i.ibb.co/5WpdLYNz/unnamed-2026-04-16-T124436-046.jpg',
        span: 'md:col-span-3 md:row-span-1'
    }
];

export const RainbowGallery = () => {
    return (
        <section className="py-24 bg-[#f4f4f0] overflow-hidden relative border-white">
            <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">

                {/* Newspaper Header */}
                <div className="border-b-[2px] md:border-b-[4px] border-black mb-6 md:mb-8 pb-4 md:pb-6 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-8xl lg:text-[140px] font-black font-serif uppercase tracking-tighter text-black mb-4 leading-none"
                        style={{ fontFamily: 'Georgia, serif' }}
                    >
                        THE DAILY DART
                    </motion.h2>
                    <div className="flex flex-col md:flex-row justify-between items-center border-t-[2px] md:border-t-[3px] border-b-[2px] md:border-b-[3px] border-black py-2 md:py-3 px-2 md:px-4 uppercase text-[8px] md:text-sm font-bold tracking-[0.2em] md:tracking-widest gap-2">
                        <span>Vol. CXCIII, No. 59,997</span>
                        <span className="hidden md:block">Sri Lanka — {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        <span className="md:hidden">{new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                        <span>Darts Edition</span>
                    </div>
                </div>

                <TypewriterText
                    className="text-black max-w-2xl mx-auto text-center font-bold text-sm md:text-lg leading-relaxed mb-8 md:mb-12 border-l-2 md:border-l-4 border-r-2 md:border-r-4 border-black px-4 md:px-8 min-h-[60px] md:min-h-[80px]"
                    text="Precision isn’t just measured — it’s designed. Car wraps, boards & posters crafted as bold visual art."
                />

                {/* 3D Newspaper Puzzle Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-0 perspective-[1500px] border-[4px] border-black bg-black">
                    {GALLERY_ITEMS.map((item, i) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.05 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className={`group relative overflow-hidden bg-[#f4f4f0] border-[2px] border-black ${item.span} min-h-[300px] transition-all duration-500 ease-out hover:z-50 hover:scale-[1.02] hover:-translate-y-2 hover:shadow-[10px_10px_0px_#B91C1C] cursor-pointer`}
                        >
                            {/* Base Image - Conditionally colored or grayscale like old newspaper */}
                            <motion.img
                                src={item.image}
                                alt={item.title}
                                className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 grayscale-0 opacity-100"
                            />



                            {/* Headline overlay visible before hover */}
                            <div className="absolute bottom-4 left-4 right-4 bg-[#f4f4f0] border-[2px] border-black p-2 md:p-4 group-hover:opacity-0 transition-opacity duration-300">
                                <span className="text-black font-bold uppercase text-[10px] tracking-widest block mb-1">
                                    {item.subtitle}
                                </span>
                                <h3 className="text-black text-xl md:text-2xl font-black uppercase tracking-tighter shadow-sm" style={{ fontFamily: 'Georgia, serif' }}>
                                    {item.title}
                                </h3>
                            </div>

                            {/* Hover Details Panel */}
                            <div className="absolute inset-0 z-20 flex flex-col justify-center items-center p-6 bg-gradient-to-t from-black via-black/90 to-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                                <span className="text-white bg-red-600 px-3 py-1 font-bold uppercase text-[10px] w-fit tracking-widest mb-4 border border-white">
                                    {item.subtitle}
                                </span>
                                <h3 className="text-white text-3xl md:text-4xl font-black uppercase tracking-tighter mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                                    {item.title}
                                </h3>
                                <p className="text-gray-300 text-sm md:text-base font-medium leading-relaxed mb-8 max-w-sm px-4">
                                    {item.description}
                                </p>

                                <a href="/shop" className="text-black font-black bg-white hover:bg-red-600 hover:text-white hover:border-white uppercase text-xs md:text-sm tracking-widest px-8 py-4 border-4 border-black transition-all duration-300 shadow-[4px_4px_0px_#B91C1C]">
                                    Get your dart NOW
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
