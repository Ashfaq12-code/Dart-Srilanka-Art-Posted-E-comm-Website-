'use client';

import React, { useState, useEffect } from 'react';
import { useShop } from '@/context/ShopContext';
import Link from 'next/link';
import { X, AlertCircle, Edit, ShoppingBag, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';

export default function CartPage() {
  const { cartItems, removeFromCart, updateCartQty, products } = useShop();

  const [mixedProducts, setMixedProducts] = useState<any[]>([]);
  const [timeLeft, setTimeLeft] = useState(39 * 60 + 47);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(prev => prev > 0 ? prev - 1 : 0), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (products?.length > 0) {
      const available = products.filter(p => !cartItems.some(item => item.id === p.id));
      setMixedProducts([...available].sort(() => 0.5 - Math.random()).slice(0, 8));
    }
  }, [products, cartItems]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')} minutes`;
  };

  const parsePrice = (priceStr: string | number) => {
    if (typeof priceStr === 'number') return priceStr;
    return parseInt(priceStr.replace(/[^0-9]/g, '')) || 0;
  };

  const total = cartItems.reduce((sum, item) => sum + (parsePrice(item.price) * (item.quantity || 1)), 0);

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 flex flex-col items-center justify-center text-center">
        <div className="flex items-center gap-4 mb-10 opacity-20">
            {/* Rounded Outline Emblem */}
            <div className="w-20 h-20 rounded-full border-[5px] border-black flex items-center justify-center shadow-2xl">
              <span className="text-3xl font-black text-black tracking-tighter">D.</span>
            </div>
            {/* Text Logo */}
            <div className="flex items-end tracking-[-0.05em]">
               <span className="text-5xl font-black uppercase text-black">DARTS</span>
               <span className="text-[#B91C1C] text-6xl font-black leading-[0] mb-2 ml-1">.</span>
            </div>
        </div>
        <h1 className="text-2xl font-black italic tracking-tighter mb-4 uppercase">Your collection is empty</h1>
        <p className="text-gray-500 mb-10 max-w-md text-sm font-medium">Capture the extraordinary. Explore our exclusive studio collections and start your journey today.</p>
        <Link href="/shop">
            <button className="px-12 py-4 bg-black text-white font-black text-xs tracking-[0.2em] uppercase transition shadow-2xl hover:bg-[#B91C1C] hover:scale-105 transition-all">CONTINUE SHOPPING</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-24 pt-20 md:pt-32">
      <div className="max-w-6xl mx-auto px-4">
        
        <h1 className="text-xs font-bold text-gray-900 mb-4 uppercase tracking-widest">YOUR CART</h1>
        
        {/* Banner */}
        <div className="bg-[#fff4e1] border border-[#f5e0be] text-gray-800 text-[10px] md:text-xs p-3 md:p-3 mb-6 md:mb-10 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-2 font-medium text-center md:text-left rounded-lg">
           <AlertCircle size={16} className="text-[#B91C1C] shrink-0" />
           <span>Please, hurry! Someone has placed an order on one of the items you have in the cart. We'll keep it for you for <span className="font-bold underline">{formatTime(timeLeft)}</span>.</span>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-12 mb-20">
            {/* Left: Table Area */}
            <div className="lg:w-[70%]">
                {/* Header Grid */}
                <div className="grid grid-cols-[3fr_1fr_1.2fr_1fr] md:grid-cols-[4fr_1fr_1.5fr_1fr] border-b-2 border-gray-100 pb-4 mb-4">
                    <div className="text-[9px] md:text-[10px] font-black uppercase text-gray-400 tracking-wider">PRODUCT</div>
                    <div className="text-[9px] md:text-[10px] font-black uppercase text-gray-400 tracking-wider text-center">PRICE</div>
                    <div className="text-[9px] md:text-[10px] font-black uppercase text-gray-400 tracking-wider text-center">QTY</div>
                    <div className="text-[9px] md:text-[10px] font-black uppercase text-gray-400 tracking-wider text-right">TOTAL</div>
                </div>

                <div className="divide-y divide-gray-100 mb-10">
                    {cartItems.map((item) => {
                         const oldPrice = item.discountPrice ? parseInt(item.discountPrice.replace(/[^0-9]/g, '')) : item.price * 1.3;
                         const itemTotal = parsePrice(item.price) * (item.quantity || 1);
                         
                         return (
                            <div key={item.cartId} className="grid grid-cols-[3fr_1fr_1.2fr_1fr] md:grid-cols-[4fr_1fr_1.5fr_1fr] py-6 items-center gap-2 md:gap-4 relative group">
                                {/* Product Info */}
                                <div className="flex items-start gap-2 md:gap-6 min-w-0">
                                    <div className="w-12 h-16 md:w-20 md:h-24 bg-gray-50 flex items-center justify-center border border-gray-100 shrink-0">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <Link href={`/product/${item.id}`} className="font-bold text-[10px] md:text-xs text-black leading-tight hover:underline truncate">
                                            {item.name}
                                        </Link>
                                        <div className="text-[8px] md:text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-tighter">
                                            {item.selectedSize || '20x30 INCHES'}
                                        </div>
                                    </div>
                                </div>

                                {/* Price */}
                                <div className="text-center">
                                    <div className="flex flex-col items-center">
                                        <span className="text-[8px] md:text-[10px] text-gray-300 line-through">Rs{oldPrice.toLocaleString()}</span>
                                        <span className="font-bold text-[9px] md:text-xs text-black">Rs{item.price.toLocaleString()}</span>
                                    </div>
                                </div>

                                {/* Quantity */}
                                <div className="flex justify-center">
                                    <div className="flex items-center justify-between border border-gray-200 w-14 md:w-20 h-7 md:h-8">
                                        <button onClick={() => updateCartQty(item.cartId!, Math.max(1, (item.quantity || 1) - 1))} className="w-4 md:w-6 text-[10px] md:text-xs text-gray-500 hover:bg-gray-50 h-full font-bold">-</button>
                                        <span className="text-[10px] md:text-xs font-bold">{item.quantity || 1}</span>
                                        <button onClick={() => updateCartQty(item.cartId!, (item.quantity || 1) + 1)} className="w-4 md:w-6 text-[10px] md:text-xs text-gray-500 hover:bg-gray-50 h-full font-bold">+</button>
                                    </div>
                                </div>

                                {/* Total */}
                                <div className="text-right">
                                    <div className="font-black text-[10px] md:text-xs text-black">
                                        Rs{itemTotal.toLocaleString()}
                                    </div>
                                </div>

                                {/* Remove Button */}
                                <button 
                                    onClick={() => removeFromCart(item.cartId!)}
                                    className="absolute -right-2 top-2 md:top-1/2 md:-translate-y-1/2 text-gray-300 hover:text-red-600 transition"
                                >
                                    <X size={12} />
                                </button>
                            </div>
                        );
                    })}
                </div>
                
                {/* Additional Comments */}
                <div className="max-w-[300px]">
                    <label className="text-[10px] font-bold text-gray-900 block mb-2">Additional Comments</label>
                    <textarea 
                       placeholder="Special instruction for seller..." 
                       className="w-full border border-gray-200 p-3 text-[10px] resize-y min-h-[100px] outline-none focus:border-black mb-4 placeholder:text-gray-400"
                    />
                    <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500">
                       <ShieldCheck size={14} className="text-gray-700" /> Secure Shopping Guarantee
                    </div>
                </div>
            </div>

            {/* Right: Order Summary */}
            <div className="lg:w-[30%]">
                <div className="bg-[#fafafa] p-6 border border-gray-100">
                    <h2 className="text-[11px] font-black uppercase tracking-widest border-b border-gray-200 pb-4 mb-4">ORDER SUMMARY</h2>
                    
                    <div className="flex justify-between items-center pb-3 border-b border-gray-200 text-[10px]">
                        <span className="font-bold text-gray-600">Subtotal</span>
                        <span className="font-bold text-black">Rs {total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-200 text-[10px]">
                        <span className="font-bold text-gray-600">Shipping</span>
                        <span className="font-bold text-black">Rs 800.00</span>
                    </div>
                    <div className="flex justify-between items-center py-4 border-b border-gray-200 text-[11px]">
                        <span className="font-black text-black">TOTAL:</span>
                        <span className="font-black text-black">Rs {(total + 800).toLocaleString()}</span>
                    </div>
                    
                    <p className="text-[9px] text-gray-500 text-center my-6 uppercase font-bold tracking-widest">
                        Island-wide delivery: Rs. 800 fixed rate
                    </p>

                    <Link href="/checkout">
                        <button className="w-full py-4 bg-black text-white font-black text-[10px] tracking-widest uppercase mb-3 hover:bg-[#B91C1C] transition-colors">
                            PROCEED TO CHECKOUT
                        </button>
                    </Link>
                    <Link href="/shop">
                        <button className="w-full py-4 bg-white border-2 border-black text-black font-black text-[10px] tracking-widest uppercase hover:bg-gray-50 transition-colors">
                            CONTINUE SHOPPING
                        </button>
                    </Link>
                </div>
            </div>
        </div>

        {/* Recommended Segment */}
        {products && products.length > 0 && (
            <div className="border-t border-gray-200 pt-16 relative">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-900">You May Also Like</h3>
                    <div className="flex gap-2">
                        <button 
                            onClick={() => {
                                document.getElementById('cart-recommendations')?.scrollBy({ left: -320, behavior: 'smooth' });
                            }}
                            className="bg-white border border-gray-200 rounded-full p-2 hover:bg-gray-50 hover:border-black transition"
                        >
                        <ChevronLeft size={16} />
                        </button>
                        <button 
                            onClick={() => {
                                document.getElementById('cart-recommendations')?.scrollBy({ left: 320, behavior: 'smooth' });
                            }}
                            className="bg-white border border-gray-200 rounded-full p-2 hover:bg-gray-50 hover:border-black transition"
                        >
                        <ChevronRight size={16} />
                        </button>
                    </div>
                </div>

                <div 
                    id="cart-recommendations" 
                    className="flex gap-6 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-4"
                >
                    {mixedProducts.map((product) => (
                        <div key={product.id} className="min-w-[280px] w-[280px] shrink-0 snap-start">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        )}

      </div>
    </div>
  );
}
