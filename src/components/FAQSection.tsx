'use client';

import React, { useState } from 'react';
import { ChevronDown, Plus, Minus, HelpCircle } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const FAQS = [
    { q: "What is your return policy for professional darts?", a: "We offer a 14-day hassle-free return policy for unused professional darts in their original packaging. Tungsten barrels must be in pristine condition to qualify for a full refund." },
    { q: "How long does island-wide delivery take?", a: "Standard delivery within Colombo takes 24-48 hours. For island-wide delivery, please allow 3-5 business days via our trusted courier partners." },
    { q: "Do you offer custom dart designs for teams?", a: "Yes! We specialize in custom team flights and laser-engraved barrels. Reach out via our WhatsApp support for a personalized quote and design consultation." },
    { q: "Are the darts suitable for beginners or only pros?", a: "We stock a wide variety! From low-cost brass darts for beginners to 97% tungsten precision darts for tournament players. Check our 'Style' filter in the shop to find your match." },
];

export const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <span className="text-[#B91C1C] font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Common Questions</span>
                    <h2 className="text-4xl lg:text-5xl font-black text-black uppercase tracking-tight mb-4">FAQ & Support.</h2>
                    <p className="text-gray-400 text-sm max-w-md mx-auto">Find answers to the most common questions about our products and services.</p>
                </div>

                <div className="space-y-4">
                    {FAQS.map((faq, i) => (
                        <div
                            key={i}
                            className={twMerge(
                                "border border-black-100 rounded-[10px] overflow-hidden transition-all duration-500",
                                openIndex === i ? "bg-gray-50 shadow-xl -white-200/40 border-transparent" : "bg-white hover:bg-gray-50/50"
                            )}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full flex items-center justify-between p-8 text-left group"
                            >
                                <span className={twMerge(
                                    "text-sm font-black uppercase tracking-wider transition-colors",
                                    openIndex === i ? "text-[#B91C1C]" : "text-black group-hover:text-[#B91C1C]"
                                )}>
                                    {faq.q}
                                </span>
                                <div className={twMerge(
                                    "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                                    openIndex === i ? "bg-[#B91C1C] text-white rotate-180" : "bg-gray-100 text-gray-400 group-hover:bg-[#B91C1C] group-hover:text-white"
                                )}>
                                    <ChevronDown size={18} />
                                </div>
                            </button>

                            {/* Static/Loading Line Animation */}
                            <div className="px-8">
                                <div className={twMerge(
                                    "h-0.5 bg-gradient-to-r from-[#B91C1C] to-transparent transition-all duration-700 ease-out",
                                    openIndex === i ? "w-full" : "w-0"
                                )} />
                            </div>

                            <div className={twMerge(
                                "overflow-hidden transition-all duration-500 ease-in-out",
                                openIndex === i ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                            )}>
                                <div className="p-8 pt-0 text-gray-500 text-sm leading-relaxed border-t border-gray-100/50">
                                    {faq.a}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Still have questions?</p>
                    <button className="px-10 py-4 bg-black hover:bg-[#B91C1C] text-white font-black uppercase tracking-widest text-[10px] rounded-full transition shadow-xl flex items-center justify-center gap-3 mx-auto">
                        Contact Support <HelpCircle size={16} />
                    </button>
                </div>
            </div>

            {/* Decorative background numbers or shapes */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 -ml-20 text-[200px] font-black text-gray-50 leading-none select-none">?</div>
        </section>
    );
};
