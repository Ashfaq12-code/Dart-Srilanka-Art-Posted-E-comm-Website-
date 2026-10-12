'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useShop } from '@/context/ShopContext';
import { Star, Heart, Share2, Shield, Truck, RotateCcw, ChevronRight, Minus, Plus, MessageSquare, Check, X, ArrowLeft, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';

export default function ProductClient({ id }: { id: string }) {
    const { products, addToCart, toggleWishlist, wishlist, openBooking, openQuickView, openCompare, compareProduct, closeCompare } = useShop();
    const router = useRouter();
    const [qty, setQty] = useState(1);
    const [isBuying, setIsBuying] = useState(false);
    const [activeTab, setActiveTab] = useState('description');
    const SIZE_CONFIG = [
        { label: '12 x 18 INCHES', price: 4900, tier: 'Standard' },
        { label: '12 x 18 INCHES (PREMIUM)', price: 5900, tier: 'Premium' },
        { label: '16 x 24 INCHES', price: 7900, tier: 'Studio' },
        { label: '20 x 30 INCHES', price: 10400, tier: 'Masterpiece' },
    ];

    const product = products.find(p => p.id === id);

    const [selectedSize, setSelectedSize] = useState(SIZE_CONFIG[0].label);
    const currentPrice = SIZE_CONFIG.find(s => s.label === selectedSize)?.price || 4900;

    const relatedProducts = product ? products.filter(p => p.type === product.type && p.id !== product.id).slice(0, 8) : [];
    const relatedRef = useRef<HTMLDivElement>(null);
    const [isRelatedHovered, setIsRelatedHovered] = useState(false);

    useEffect(() => {
        if (isRelatedHovered || relatedProducts.length === 0) return;
        const interval = setInterval(() => {
            if (relatedRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = relatedRef.current;
                if (scrollLeft + clientWidth >= scrollWidth - 10) {
                    relatedRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    relatedRef.current.scrollBy({ left: 166, behavior: 'smooth' });
                }
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [relatedProducts, isRelatedHovered]);

    const scrollRelated = (dir: 'left' | 'right') => {
        if (relatedRef.current) {
            relatedRef.current.scrollBy({ left: dir === 'left' ? -350 : 350, behavior: 'smooth' });
        }
    };

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-20">
                <div className="text-center">
                    <h1 className="text-4xl font-black italic mb-4">Product not found</h1>
                    <Link href="/shop" className="text-[#B91C1C] font-bold hover:underline">Back to shop</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white pt-24 lg:pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-4">
                {/* Navigation / Breadcrumbs */}
                <nav className="text-[11px] font-bold text-gray-400 mb-6 flex items-center gap-3 overflow-hidden">
                    <Link href="/" className="hover:text-black transition-colors shrink-0">Home</Link>
                    <ChevronRight size={10} className="shrink-0" />
                    <Link href="/shop" className="hover:text-black transition-colors shrink-0">Shop</Link>
                    <ChevronRight size={10} className="shrink-0" />
                    <span className="text-[#B91C1C] truncate underline underline-offset-4">{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    {/* Left side: Images */}
                    <div className="flex flex-col gap-4">
                        {/* Main Image */}
                        <div className="group/image bg-[#fcfcfc] rounded-lg border border-gray-100 flex items-center justify-center p-8 overflow-hidden relative aspect-square">
                            {/* Floating Icons (Top Right) */}
                            <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 opacity-0 translate-x-4 group-hover/image:opacity-100 group-hover/image:translate-x-0 transition-all duration-300">
                                <button 
                                    onClick={() => toggleWishlist(product)} 
                                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-700 hover:text-black shadow-sm border border-gray-100 hover:border-black transition-colors"
                                >
                                    <Heart size={16} fill={wishlist.some(w => w.id === product?.id) ? 'black' : 'none'} className={wishlist.some(w => w.id === product?.id) ? 'text-black' : ''} />
                                </button>
                                <button 
                                    onClick={() => openQuickView(product)} 
                                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-700 hover:text-black shadow-sm border border-gray-100 hover:border-black transition-colors"
                                >
                                    <Eye size={16} />
                                </button>
                                <button 
                                    onClick={() => {
                                        if (compareProduct?.id === product?.id) closeCompare();
                                        else openCompare(product);
                                    }} 
                                    className={twMerge(
                                        "w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border transition-colors",
                                        compareProduct?.id === product?.id ? "border-[#B91C1C] text-[#B91C1C]" : "text-gray-700 hover:text-black border-gray-100 hover:border-black"
                                    )}
                                    title="Compare Product"
                                >
                                    <MessageSquare size={16} />
                                </button>
                            </div>
                            <img
                                src={product.image}
                                alt={product.name}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        {/* Horizontal Thumbnails */}
                        <div className="flex gap-3 overflow-x-auto hide-scrollbar snap-x snap-mandatory">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className={twMerge(
                                    "aspect-square w-20 shrink-0 rounded-lg border flex items-center justify-center p-2 cursor-pointer transition-all snap-start",
                                    i === 1 ? "border-black ring-1 ring-black" : "border-gray-200 hover:border-gray-400"
                                )}>
                                    <img src={product.image} alt="" referrerPolicy="no-referrer" className="w-full h-full object-contain" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Info */}
                    <div className="flex flex-col">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            {product.name}
                        </h1>

                        <div className="text-2xl font-bold text-[#B91C1C] mb-6">
                            LKR {currentPrice.toLocaleString()}
                        </div>

                        <p className="text-gray-600 text-sm mb-8 leading-relaxed">
                            Experience precision and quality with the {product.name}. Crafted with high-grade premium acrylic, designed for both beginners and professionals. Includes Studio Guarantee and fast island-wide shipping.
                        </p>

                        {/* Options */}
                        <div className="mb-8">
                            <div className="text-sm font-bold text-gray-900 mb-3">Size</div>
                            <div className="flex flex-wrap gap-3">
                                {SIZE_CONFIG.map(s => (
                                    <button
                                        key={s.label}
                                        onClick={() => setSelectedSize(s.label)}
                                        className={twMerge(
                                            "px-4 py-2 text-xs font-medium border rounded transition-all",
                                            selectedSize === s.label
                                                ? "border-black bg-black text-white"
                                                : "border-gray-300 text-gray-700 hover:border-black"
                                        )}
                                    >
                                        {s.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Add to Cart area */}
                        <div className="flex flex-col gap-3 mb-8 pb-8 border-b border-gray-100">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center border border-gray-300 rounded h-12">
                                    <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-black transition-colors"><Minus size={14} /></button>
                                    <span className="w-10 text-center font-bold text-sm">{qty}</span>
                                    <button onClick={() => setQty(qty + 1)} className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-black transition-colors"><Plus size={14} /></button>
                                </div>

                                <button
                                    onClick={() => addToCart({ ...product, price: currentPrice, selectedSize, quantity: qty })}
                                    className="flex-1 h-12 bg-black hover:bg-gray-800 text-white font-bold text-sm rounded transition-all"
                                >
                                    Add to cart
                                </button>
                            </div>
                            <button
                                onClick={async () => {
                                    setIsBuying(true);
                                    addToCart({ ...product, price: currentPrice, selectedSize, quantity: qty }, true);
                                    // Slight delay for premium feel
                                    await new Promise(r => setTimeout(r, 800));
                                    router.push('/checkout');
                                }}
                                disabled={isBuying}
                                className="w-full h-12 bg-[#B91C1C] hover:bg-red-800 text-white font-bold text-sm rounded transition-all flex items-center justify-center gap-2"
                            >
                                {isBuying ? (
                                    <>
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        >
                                            <RotateCcw size={18} />
                                        </motion.div>
                                        PROCESSING...
                                    </>
                                ) : (
                                    "Buy now"
                                )}
                            </button>
                        </div>

                        {/* Meta */}
                        <div className="space-y-3 text-sm">
                            <div className="flex items-center gap-2">
                                <span className="text-gray-500">Category:</span>
                                <Link href="/shop" className="text-black hover:text-[#B91C1C] transition-colors">{product.type}</Link>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-gray-500">Tags:</span>
                                <span className="text-black">Premium, {product.style}, Studio Quality</span>
                            </div>
                            <div className="flex items-center gap-4 pt-4 mt-4 border-t border-gray-100">
                                <button onClick={() => toggleWishlist(product)} className="flex items-center gap-1.5 text-gray-500 hover:text-[#B91C1C] transition-colors">
                                    <Heart size={16} className={wishlist.some(w => w.id === product.id) ? "fill-[#B91C1C] text-[#B91C1C]" : ""} /> Wishlist
                                </button>
                                <button className="flex items-center gap-1.5 text-gray-500 hover:text-black transition-colors">
                                    <Share2 size={16} /> Share
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Technical Tabs */}
                <div className="border-t border-gray-200 pt-8 mb-20">
                    <div className="flex gap-8 border-b border-gray-200 mb-8 overflow-x-auto hide-scrollbar">
                        {['Customer Reviews', 'Specifications', 'Description'].map((tab, i) => {
                            const id = tab.split(' ')[0].toLowerCase();
                            return (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(id)}
                                    className={twMerge(
                                        "pb-3 text-[11px] font-bold tracking-wide transition-all relative whitespace-nowrap",
                                        activeTab === id || (activeTab === 'reviews' && id === 'customer') ? "text-black" : "text-gray-400 hover:text-black"
                                    )}
                                >
                                    {tab}
                                    {(activeTab === id || (activeTab === 'reviews' && id === 'customer')) && <motion.div layoutId="tabLine" className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-black" />}
                                </button>
                            )
                        })}
                    </div>

                    <div className="max-w-4xl">
                        <AnimatePresence mode="wait">
                            {(activeTab === 'description' || activeTab === 'specifications') && (
                                <motion.div key="desc" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
                                    <h3 className="text-xl font-bold text-gray-900">Professional Grade Engineering</h3>
                                    <p className="text-gray-600 text-[13px] leading-relaxed">Designed in collaboration with world-class players, this dart provides a perfect balance and grip consistency that second to none. The nano-grip technology ensures that your release is always smooth and predictable.</p>
                                    <img src={product.image} referrerPolicy="no-referrer" className="w-full max-w-lg h-[300px] object-contain bg-gray-50 rounded-xl p-8" alt="" />
                                    <p className="text-gray-600 text-[13px] leading-relaxed">Whether you're playing at home or on the professional stage, the {product.name} is built to withstand rigorous use while maintaining its pristine performance characteristics.</p>
                                </motion.div>
                            )}
                            {(activeTab === 'customer' || activeTab === 'reviews') && (
                                <motion.div key="rev" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                                    <div className="flex items-center gap-4 mb-4">
                                        <h3 className="text-lg font-black">Reviews</h3>
                                        <div className="flex items-center gap-1 font-bold text-sm">4.3 <Star fill="#ffc107" className="text-[#ffc107]" size={14} /></div>
                                        <span className="text-[10px] text-gray-400">479 Ratings</span>
                                    </div>
                                    <div className="space-y-6">
                                        <div className="border-b border-gray-100 pb-6 transition-all hover:bg-gray-50/50 p-2 rounded-xl">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-1">
                                                    {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="#ffc107" className="text-[#ffc107]" />)}
                                                </div>
                                                <span className="text-[10px] bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-bold">Verified Purchase</span>
                                            </div>
                                            <p className="text-[12px] text-gray-700 font-medium leading-relaxed">Absolutely stunning quality. The weight balance is exactly what I was looking for, and the finish is premium. Definitely improved my practice sessions immediately.</p>
                                            <div className="flex items-center gap-2 mt-3">
                                                <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold">ZS</div>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Zulfikar S. | 14 Apr 2026</p>
                                            </div>
                                        </div>

                                        <div className="border-b border-gray-100 pb-6 transition-all hover:bg-gray-50/50 p-2 rounded-xl">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-1">
                                                    {[...Array(5)].map((_, i) => <Star key={i} size={12} fill={i < 4 ? "#ffc107" : "none"} className="text-[#ffc107]" />)}
                                                </div>
                                                <span className="text-[10px] bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-bold">Verified Purchase</span>
                                            </div>
                                            <p className="text-[12px] text-gray-700 font-medium leading-relaxed">Great darts for the price. The delivery was incredibly fast to Kandy—arrived in just 2 days. The grip is a bit aggressive for my taste, but very high quality.</p>
                                            <div className="flex items-center gap-2 mt-3">
                                                <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold">AM</div>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Arshad M. | 02 Mar 2026</p>
                                            </div>
                                        </div>

                                        <div className="border-b border-gray-100 pb-6 transition-all hover:bg-gray-50/50 p-2 rounded-xl">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-1">
                                                    {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="#ffc107" className="text-[#ffc107]" />)}
                                                </div>
                                                <span className="text-[10px] bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-bold">Verified Purchase</span>
                                            </div>
                                            <p className="text-[12px] text-gray-700 font-medium leading-relaxed">Bought this as a gift for my husband and he loves it! He says the tournament edition feels very professional and the coloring doesn't fade at all.</p>
                                            <div className="flex items-center gap-2 mt-3">
                                                <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold">PR</div>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Piumi R. | 15 Feb 2026</p>
                                            </div>
                                        </div>

                                        <div className="border-b border-gray-100 pb-6 transition-all hover:bg-gray-50/50 p-2 rounded-xl">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-1">
                                                    {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="#ffc107" className="text-[#ffc107]" />)}
                                                </div>
                                                <span className="text-[10px] bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-bold">Verified Purchase</span>
                                            </div>
                                            <p className="text-[12px] text-gray-700 font-medium leading-relaxed">Most reliable store in Sri Lanka for darts. I've ordered 4 different sets from here and the quality is consistent every single time. 5 stars easily.</p>
                                            <div className="flex items-center gap-2 mt-3">
                                                <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold">DL</div>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Daham L. | 22 Jan 2026</p>
                                            </div>
                                        </div>

                                        <div className="pb-6 transition-all hover:bg-gray-50/50 p-2 rounded-xl">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-1">
                                                    {[...Array(5)].map((_, i) => <Star key={i} size={12} fill={i < 4 ? "#ffc107" : "none"} className="text-[#ffc107]" />)}
                                                </div>
                                                <span className="text-[10px] bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-bold">Verified Purchase</span>
                                            </div>
                                            <p className="text-[12px] text-gray-700 font-medium leading-relaxed">Island-wide delivery is great. The packaging was very secure. The product itself is high-grade material as advertised.</p>
                                            <div className="flex items-center gap-2 mt-3">
                                                <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold">NS</div>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Nimna S. | 10 Jan 2026</p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Related Products Carousel (Dense layout) */}
                {relatedProducts.length > 0 && (
                    <div className="mt-16">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-gray-900">Related items</h2>
                        </div>

                        <div
                            className="relative group"
                            onMouseEnter={() => setIsRelatedHovered(true)}
                            onMouseLeave={() => setIsRelatedHovered(false)}
                        >
                            <button onClick={() => scrollRelated('left')} className="absolute left-0 top-1/3 -translate-y-1/2 -ml-4 w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-black z-10 shadow-md">
                                <ArrowLeft size={16} />
                            </button>
                            <button onClick={() => scrollRelated('right')} className="absolute right-0 top-1/3 -translate-y-1/2 -mr-4 w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-black z-10 shadow-md">
                                <ChevronRight size={16} />
                            </button>

                            <div
                                ref={relatedRef}
                                className="flex gap-4 overflow-x-auto pb-6 hide-scrollbar scroll-smooth"
                            >
                                {relatedProducts.map(p => (
                                    <div key={p.id} className="min-w-[150px] max-w-[150px] shrink-0">
                                        <Link href={`/product/${p.id}`} className="block group/item">
                                            <div className="bg-gray-50 border border-gray-100 rounded-lg p-2 aspect-square mb-2 relative overflow-hidden flex items-center justify-center">
                                                <img src={p.image} referrerPolicy="no-referrer" className="w-full h-full object-contain group-hover/item:scale-105 transition-transform" alt="" />
                                            </div>
                                            <div className="text-[10px] text-[#B91C1C] font-bold mb-0.5 truncate">{p.name}</div>
                                            <div className="font-bold text-[13px] text-black">LKR {p.price.toLocaleString()}</div>
                                            <div className="flex items-center gap-1 mt-1 opacity-60">
                                                <span className="text-[8px] text-gray-400">Premium Quality</span>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
