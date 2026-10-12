'use client';
import { useShop } from '@/context/ShopContext';
import { X, Star, Heart, Share2, Copy, MessageSquare, ChevronLeft, ChevronRight, Eye, Ruler, Shield, Minus, Plus, RotateCcw } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { SizeChart } from './SizeChart';

const SIZE_CONFIG = [
  { label: '12 x 18 Inches', price: 4900, tier: 'Standard' },
  { label: '12 x 18 Inches (Premium)', price: 5900, tier: 'Premium' },
  { label: '16 x 24 Inches', price: 7900, tier: 'Studio' },
  { label: '20 x 30 Inches', price: 10400, tier: 'Masterpiece' },
];

export const QuickViewModal = () => {
  const { isQuickViewOpen, quickViewProduct, closeQuickView, addToCart, openBooking, toggleWishlist, wishlist } = useShop();
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [isBuying, setIsBuying] = useState(false);
  const [selectedSize, setSelectedSize] = useState(SIZE_CONFIG[0].label);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);

  if (!isQuickViewOpen || !quickViewProduct) return null;

  const currentPrice = SIZE_CONFIG.find(s => s.label === selectedSize)?.price || 4900;
  const oldPrice = currentPrice * 1.3;
  const savings = oldPrice - currentPrice;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={closeQuickView} />
      
      {/* Size Chart Modal Integration */}
      <SizeChart isOpen={isSizeChartOpen} onClose={() => setIsSizeChartOpen(false)} selectedSize={selectedSize} onSelectSize={(s) => { setSelectedSize(s); setIsSizeChartOpen(false); }} />

      <div className="relative bg-white w-full max-w-5xl shadow-2xl flex flex-col md:flex-row overflow-y-auto md:overflow-hidden animate-float-in max-h-[95vh] md:max-h-[85vh] rounded-none overflow-hidden border border-gray-100">
        
        {/* Main Close Button */}
        <button onClick={closeQuickView} className="absolute top-6 right-6 text-gray-400 hover:text-black z-20 transition-all hover:rotate-90">
          <X size={28} />
        </button>

        {/* Left: Images */}
        <div className="w-full md:w-1/2 p-4 md:p-8 flex flex-col gap-4 bg-white shrink-0">
            {/* Main Image */}
            <div className="bg-[#fcfcfc] rounded-none border border-gray-100 flex items-center justify-center p-8 overflow-hidden relative aspect-square w-full">
                <img 
                    src={quickViewProduct.image} 
                    alt={quickViewProduct.name} 
                    referrerPolicy="no-referrer"
                    className={twMerge(
                        "w-full h-full object-contain mix-blend-multiply transition-all duration-300",
                        quickViewProduct.type?.toLowerCase() === 'vehicle' && selectedColorIdx === 1 ? "hue-rotate-90 saturate-200" : "",
                        quickViewProduct.type?.toLowerCase() === 'vehicle' && selectedColorIdx === 2 ? "hue-rotate-180 saturate-200" : "",
                        quickViewProduct.type?.toLowerCase() === 'vehicle' && selectedColorIdx === 3 ? "-hue-rotate-[50deg] saturate-200" : ""
                    )} 
                />
            </div>

            {/* Horizontal Thumbnails */}
            <div className="flex gap-3 overflow-x-auto hide-scrollbar snap-x snap-mandatory">
                {[0, 1, 2, 3].map((idx) => (
                    <div 
                        key={idx} 
                        onClick={() => setSelectedColorIdx(idx)}
                        className={twMerge(
                            "aspect-square w-20 shrink-0 rounded-none border flex items-center justify-center p-2 cursor-pointer transition-all snap-start",
                            selectedColorIdx === idx ? "border-black ring-1 ring-black" : "border-gray-200 hover:border-gray-400"
                        )}
                    >
                        <img 
                            src={quickViewProduct.image} 
                            referrerPolicy="no-referrer"
                            className={twMerge(
                                "w-full h-full object-contain",
                                quickViewProduct.type?.toLowerCase() === 'vehicle' && idx === 1 ? "hue-rotate-90 saturate-200" : "",
                                quickViewProduct.type?.toLowerCase() === 'vehicle' && idx === 2 ? "hue-rotate-180 saturate-200" : "",
                                quickViewProduct.type?.toLowerCase() === 'vehicle' && idx === 3 ? "-hue-rotate-[50deg] saturate-200" : ""
                            )}
                            alt="Variation" 
                        />
                    </div>
                ))}
            </div>
            
            {quickViewProduct.type?.toLowerCase() === 'vehicle' && (
                <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-[0.1em] mt-2">
                    <span className="text-[#B91C1C]">Note:</span> Variations are for display only.
                </p>
            )}
        </div>

        {/* Right: Info */}
        <div className="w-full md:w-1/2 p-4 md:p-8 md:overflow-y-auto custom-scrollbar flex flex-col relative shrink-0">
            {/* Mobile Close Button */}
            <button onClick={closeQuickView} className="md:hidden absolute top-2 right-2 p-2 bg-gray-100 rounded-none text-black z-20">
                <X size={16} />
            </button>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {quickViewProduct.name}
            </h1>

            <div className="text-2xl font-bold text-[#B91C1C] mb-6">
                LKR {currentPrice.toLocaleString()}
            </div>

            <p className="text-gray-600 text-sm mb-8 leading-relaxed">
                Experience precision and quality with the {quickViewProduct.name}. Crafted with high-grade premium acrylic, designed for both beginners and professionals. Includes Studio Guarantee and fast island-wide shipping.
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
                                "px-4 py-2 text-xs font-medium border rounded-none transition-all",
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
                    <div className="flex items-center border border-gray-300 rounded-none h-12">
                        <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-black transition-colors"><Minus size={14} /></button>
                        <span className="w-10 text-center font-bold text-sm">{qty}</span>
                        <button onClick={() => setQty(qty + 1)} className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-black transition-colors"><Plus size={14} /></button>
                    </div>

                    <button
                        onClick={() => { addToCart({ ...quickViewProduct, price: currentPrice, selectedSize, quantity: qty }); closeQuickView(); }}
                        className="flex-1 h-12 bg-black hover:bg-gray-800 text-white font-bold text-sm rounded-none transition-all"
                    >
                        Add to cart
                    </button>
                </div>
                <button
                    onClick={async () => {
                        setIsBuying(true);
                        addToCart({ ...quickViewProduct, price: currentPrice, selectedSize, quantity: qty }, true);
                        // Slight delay for premium feel
                        await new Promise(r => setTimeout(r, 800));
                        closeQuickView();
                        router.push('/checkout');
                    }}
                    disabled={isBuying}
                    className="w-full h-12 bg-[#B91C1C] hover:bg-red-800 text-white font-bold text-sm rounded-none transition-all flex items-center justify-center gap-2"
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
                    <Link href="/shop" onClick={closeQuickView} className="text-black hover:text-[#B91C1C] transition-colors">{quickViewProduct.type}</Link>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-gray-500">Tags:</span>
                    <span className="text-black">Premium, {quickViewProduct.style}, Studio Quality</span>
                </div>
                <div className="flex items-center gap-4 pt-4 mt-4 border-t border-gray-100">
                    <button onClick={() => toggleWishlist(quickViewProduct)} className="flex items-center gap-1.5 text-gray-500 hover:text-[#B91C1C] transition-colors">
                        <Heart size={16} className={wishlist.some(w => w.id === quickViewProduct.id) ? "fill-[#B91C1C] text-[#B91C1C]" : ""} /> Wishlist
                    </button>
                    <button className="flex items-center gap-1.5 text-gray-500 hover:text-black transition-colors">
                        <Share2 size={16} /> Share
                    </button>
                </div>
            </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes floatIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float-in {
          animation: floatIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
