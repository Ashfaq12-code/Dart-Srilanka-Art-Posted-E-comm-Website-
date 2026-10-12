'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ADVANTAGES = [
    {
        id: 1,
        title: "TEKKEN 8",
        img: "https://i.ibb.co/j9RcQCdL/unnamed-16.jpg",
        desc: "Precision tungsten darts."
    },
    {
        id: 2,
        title: "CALL of DUTY",
        img: "https://i.ibb.co/xqWLC3TN/unnamed-17.jpg",
        desc: "Durable aerodynamic flights."
    },
    {
        id: 3,
        title: "PORSCHE EDTION",
        img: "https://i.ibb.co/WvyKhgzr/unnamed-19.jpg",
        desc: "Tournament-approved dartboard."
    },
    {
        id: 4,
        title: "MEDRES AMG",
        img: "https://i.ibb.co/pjSjdV8X/unnamed-20.jpg",
        desc: "Premium protective cases."
    },
    {
        id: 5,
        title: "DED POOL",
        img: "https://i.ibb.co/8403LhmG/unnamed-21.jpg",
        desc: "Lightweight balanced shafts."
    },
    {
        id: 6,
        title: "CATALYST",
        img: "https://i.ibb.co/C52fLHF5/unnamed-22.jpg",
        desc: "Lightweight balanced shafts."
    },
    {
        id: 7,
        title: "MIND GAMES",
        img: "https://i.ibb.co/XkVh6wZm/unnamed-23.jpg",
        desc: "Lightweight balanced shafts."
    },

];

export const AdvantageCarousel = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    // Dynamic Suffle for the Gallery
    const shuffledAdvantages = useMemo(() => {
        return [...ADVANTAGES].sort(() => Math.random() - 0.5);
    }, []);

    const scrollTo = (index: number) => {
        if (scrollRef.current) {
            const cardWidth = 320; // Approx card width + gap
            scrollRef.current.scrollTo({
                left: index * cardWidth,
                behavior: 'smooth'
            });
            setActiveIndex(index);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const nextIndex = (activeIndex + 1) % shuffledAdvantages.length;
            scrollTo(nextIndex);
        }, 5000);
        return () => clearInterval(interval);
    }, [activeIndex, shuffledAdvantages.length]);

    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <p className="font-cursive text-2xl text-[#B91C1C] mb-2 tracking-wide italic">~ CHECK OUR ART GALLERY ~</p>
                    <h2 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tighter italic"></h2>
                </div>

                <div className="relative group">
                    <div
                        ref={scrollRef}
                        className="flex overflow-x-auto gap-8 pb-10 hide-scrollbar snap-x snap-mandatory px-4 lg:px-0"
                    >
                        {shuffledAdvantages.map((item, i) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="min-w-[280px] lg:min-w-[320px] snap-center"
                            >
                                <div className="bg-white rounded-[40px] overflow-hidden shadow-lg lg:shadow-2xl shadow-gray-200/50 border border-gray-50 flex flex-col items-center p-2 group/card h-full transition-transform duration-500 lg:hover:-translate-y-2">
                                    <div className="w-full aspect-[4/5] rounded-[36px] overflow-hidden relative">
                                        <img
                                            src={item.img}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                    </div>
                                    <div className="p-8 text-center w-full">
                                        <h3 className="text-xl font-black text-gray-900 tracking-tight mb-3 italic">{item.title}</h3>
                                        <p className="text-[11px] text-gray-400 font-bold mb-6 tracking-wide truncate">{item.desc}</p>
                                        <button className="text-[11px] font-bold text-[#B91C1C] tracking-[0.1em] border-b-2 border-[#B91C1C] pb-1 hover:text-black hover:border-black transition-colors italic">
                                            See more
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Dots Navigation */}
                    <div className="flex justify-center gap-3 mt-8">
                        {shuffledAdvantages.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => scrollTo(i)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${i === activeIndex ? 'bg-[#B91C1C] w-8' : 'bg-gray-200'}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
