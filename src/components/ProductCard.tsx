'use client';

import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { Star, Heart, Eye, Plus, MessageSquare } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Local toast state within card ---
interface ToastState {
  visible: boolean;
  message: string;
  type: 'wishlist' | 'cart' | 'view';
}

const twMerge = (...classes: string[]) => classes.filter(Boolean).join(' ');

export const ProductCard = ({ product }: { product: any }) => {
  const { addToCart, toggleWishlist, openQuickView, openBooking, wishlist } = useShop();
  const [toast, setToast] = useState<ToastState>({ visible: false, message: '', type: 'wishlist' });

  const cleanPrice = (val: any) => {
    if (typeof val === 'number') return val;
    return parseFloat(String(val).replace(/Rs\.?\s*/i, '').replace(/,/g, '').replace(/[^\d.]/g, '')) || 0;
  };

  const numPrice = cleanPrice(product.price);
  const oldPrice = product.discountPrice ? cleanPrice(product.discountPrice) : numPrice * 1.3;
  const savings = oldPrice - numPrice;
  const isWished = wishlist.some((item: any) => item.id === product.id);

  const showToast = useCallback((message: string, type: ToastState['type'] = 'wishlist') => {
    setToast({ visible: true, message, type });
    const t = setTimeout(() => setToast(s => ({ ...s, visible: false })), 2200);
    return () => clearTimeout(t);
  }, []);

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    toggleWishlist(product);
    showToast(isWished ? 'Removed from favorites' : 'Added to favorites', 'wishlist');
  };

  const handleCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart({ ...product, selectedSize: 'Standard' });
    showToast('Added to cart', 'cart');
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    openQuickView(product);
  }

  const { openCompare, compareProduct, closeCompare } = useShop();
  const isComparing = compareProduct?.id === product.id;

  const handleCompare = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (isComparing) closeCompare();
    else openCompare(product);
  };

  return (
    <div className="group relative flex flex-col h-full bg-white transition-all duration-300 w-full mb-4">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast.visible && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-4 left-4 right-4 z-50 bg-black/90 backdrop-blur-md text-white text-[9px] font-bold py-2 px-4 rounded-md text-center pointer-events-none"
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      <Link href={`/product/${product.id}`} className="block relative aspect-square bg-[#f5f5f5] mb-3 overflow-hidden cursor-pointer group/image">

        {/* Badges */}
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
          <span className="bg-[#B91C1C] text-white text-[9px] font-bold px-2 py-0.5">Sale</span>
        </div>

        {/* Floating Icons (Top Right) */}
        <div className="absolute top-2 right-2 z-10 flex flex-col gap-1.5 opacity-0 translate-x-4 group-hover/image:opacity-100 group-hover/image:translate-x-0 transition-all duration-300">
          <button
            onClick={handleWishlist}
            className="w-7 h-7 bg-white rounded-full flex items-center justify-center text-gray-700 hover:text-black shadow-sm border border-gray-100 hover:border-black transition-colors"
          >
            <Heart size={12} fill={isWished ? 'black' : 'none'} className={isWished ? 'text-black' : ''} />
          </button>
          <button
            onClick={handleQuickView}
            className="w-7 h-7 bg-white rounded-full flex items-center justify-center text-gray-700 hover:text-black shadow-sm border border-gray-100 hover:border-black transition-colors"
          >
            <Eye size={12} />
          </button>
          <button
            onClick={handleCompare}
            className={twMerge(
              "w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm border transition-colors",
              isComparing ? "border-[#B91C1C] text-[#B91C1C]" : "text-gray-700 hover:text-black border-gray-100 hover:border-black"
            )}
            title="Compare Product"
          >
            <MessageSquare size={12} />
          </button>
        </div>

        {/* Main Image */}
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain mix-blend-multiply p-4"
        />
        <div className="absolute bottom-0 left-0 right-0 p-2 translate-y-full opacity-0 group-hover/image:translate-y-0 group-hover/image:opacity-100 transition-all duration-300 ease-out z-20">
          <Button
            onClick={handleCart}
            size="full"
            variant="vogue"
            className="rounded-none h-12 text-[9px] shadow-2xl"
          >
            QUICK ADD
          </Button>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 px-1">
        <Link href={`/product/${product.id}`} className="block mb-1.5">
          <h3 className="text-[11px] font-bold text-gray-900 line-clamp-2 leading-tight group-hover:text-[#B91C1C] transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="text-[8px] text-gray-500 font-medium tracking-tight mt-1 mb-3 truncate">
          Island-Wide Delivery Available.
        </div>

        {/* Price Line */}
        <div className="flex items-center gap-1.5 flex-wrap mb-1 transition-all duration-300">
          <span className="text-[10px] text-gray-300 line-through font-medium">
            Rs {oldPrice.toLocaleString()}
          </span>
          <span className="text-[12px] font-black text-[#B91C1C] tracking-tight">
            Rs {numPrice.toLocaleString()}
          </span>
          {savings > 0 && (
            <span className="text-[9px] font-bold text-gray-500 bg-gray-50 px-1.5 py-0.5 rounded">
              Save Rs {savings.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

