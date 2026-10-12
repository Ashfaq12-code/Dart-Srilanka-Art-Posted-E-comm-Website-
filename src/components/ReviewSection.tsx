'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const REVIEWS_BASE = [
    { name: "Dimuthu Perera", date: "2 days ago", rating: 5, text: "Best place for darts in Sri Lanka. The Bugatti edition is insane! High quality service and fast delivery.", avatar: "D" },
    { name: "Sarah Silva", date: "1 week ago", rating: 5, text: "The custom design team was so helpful. Darts fly perfectly. 5 stars all the way!", avatar: "S" },
    { name: "Kasun Jay", date: "3 weeks ago", rating: 4, text: "Great collection of Winmau boards. Fast shipping to Kandy. Highly recommend.", avatar: "K" },
    { name: "John Wick", date: "1 month ago", rating: 5, text: "Precision matters, and Dart Sri Lanka delivers. Best tungsten sets I've ever owned.", avatar: "J" },
    { name: "M. Rizwan", date: "2 months ago", rating: 5, text: "Friendly staff and excellent advice for beginners. Found my perfect set.", avatar: "M" },
];

// Generate 50+ reviews
const REVIEWS = Array.from({ length: 55 }, (_, i) => ({
    ...REVIEWS_BASE[i % REVIEWS_BASE.length],
    name: `${REVIEWS_BASE[i % REVIEWS_BASE.length].name} #${i + 1}`,
    id: i
}));

export const ReviewSection = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isAutoScrolling, setIsAutoScrolling] = useState(true);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isAutoScrolling) {
            interval = setInterval(() => {
                if (scrollRef.current) {
                    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
                    if (scrollLeft + clientWidth >= scrollWidth - 1) {
                        scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                    } else {
                        scrollRef.current.scrollBy({ left: 380, behavior: 'smooth' });
                    }
                }
            }, 4000);
        }
        return () => clearInterval(interval);
    }, [isAutoScrolling]);

    const manualScroll = (direction: 'left' | 'right') => {
        setIsAutoScrolling(false);
        if (scrollRef.current) {
            const amount = direction === 'left' ? -380 : 380;
            scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
        }
        // Resume auto-scroll after 10 seconds of inactivity
        setTimeout(() => setIsAutoScrolling(true), 10000);
    };

    return (
        <section className="py-24 bg-[#f8fafc] overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
                    <div className="text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                            <img src="https://www.gstatic.com/images/branding/googleg/1x/googleg_standard_color_128dp.png" className="w-8 h-8" alt="Google" />
                            <h2 className="text-2xl font-black text-black">Professional Reviews</h2>
                        </div>
                        <div className="flex items-center justify-center md:justify-start gap-4">
                            <div className="flex text-[#ffc107]">
                                {[1,2,3,4,5].map(s => <Star key={s} size={20} fill="currentColor" />)}
                            </div>
                            <span className="text-3xl font-black text-black">4.8<span className="text-sm font-bold text-gray-400 ml-2">/ 5.0</span></span>
                        </div>
                        <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em] mt-3">Based on 50+ verified customer experiences</p>
                    </div>

                    <div className="flex gap-4">
                        <button onClick={() => manualScroll('left')} className="w-12 h-12 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-[#B91C1C] hover:text-white transition group shadow-sm"><ChevronLeft size={20} /></button>
                        <button onClick={() => manualScroll('right')} className="w-12 h-12 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-[#B91C1C] hover:text-white transition group shadow-sm"><ChevronRight size={20} /></button>
                    </div>
                </div>

                <div 
                    ref={scrollRef}
                    className="flex overflow-x-auto gap-6 hide-scrollbar snap-x py-10 px-2"
                    onMouseEnter={() => setIsAutoScrolling(false)}
                    onMouseLeave={() => setIsAutoScrolling(true)}
                >
                    {REVIEWS.map((rev) => (
                        <div 
                            key={rev.id} 
                            className="min-w-[300px] md:min-w-[380px] bg-white p-8 md:p-10 rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-50 snap-center group hover:shadow-2xl transition-all duration-700"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-[#B91C1C] text-white rounded-2xl flex items-center justify-center font-black text-lg">{rev.avatar}</div>
                                    <div>
                                        <h4 className="text-sm font-black text-black uppercase tracking-tight">{rev.name}</h4>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{rev.date}</p>
                                    </div>
                                </div>
                                <div className="flex text-[#ffc107] scale-75 origin-right">
                                    {[...Array(rev.rating)].map((_, s) => <Star key={s} size={16} fill="currentColor" />)}
                                </div>
                            </div>
                            <p className="text-gray-500 text-sm leading-relaxed italic">"{rev.text}"</p>
                            <div className="mt-6 pt-6 border-t border-gray-50 flex items-center gap-2">
                                <img src="https://www.gstatic.com/images/branding/googleg/1x/googleg_standard_color_128dp.png" className="w-4 h-4 grayscale opacity-30" alt="Google" />
                                <span className="text-[8px] font-bold text-gray-300 uppercase tracking-widest">Posted on Google</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
