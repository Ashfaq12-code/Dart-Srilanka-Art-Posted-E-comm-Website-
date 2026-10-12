'use client';

import React from 'react';
import { useShop } from '@/context/ShopContext';
import Link from 'next/link';
import { ShoppingCart, X, ArrowRight, Heart } from 'lucide-react';

export default function WishlistPage() {
    const { wishlist, toggleWishlist, addToCart } = useShop();

    return (
        <div className="min-h-screen bg-white py-16 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-[11px] font-bold text-gray-400 mb-8 px-4">
                    <Link href="/" className="hover:text-[#B91C1C]">Home</Link>
                    <span>/</span>
                    <span className="text-gray-600">Wishlist</span>
                </nav>

                {wishlist.length === 0 ? (
                    <div className="py-24 text-center border-t border-gray-100 mt-8">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mx-auto mb-6">
                            <Heart size={40} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 tracking-tighter italic uppercase">Your wishlist is empty</h2>
                        <Link href="/shop">
                            <button className="group relative inline-flex items-center gap-4 px-12 py-5 bg-black text-white font-black tracking-[0.3em] text-[10px] uppercase rounded-none overflow-hidden transition-all duration-500 hover:bg-[#B91C1C] shadow-2xl active:scale-95">
                                <span className="relative z-10">GO TO SHOP</span>
                                <ArrowRight size={18} className="relative z-10 group-hover:translate-x-2 transition-transform duration-500" />
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="mt-8">
                        {/* Desktop Header */}
                        <div className="hidden md:grid grid-cols-[120px_1fr_120px_200px_80px] border-b-2 border-gray-100 pb-4 mb-4 text-[11px] font-black uppercase text-gray-400 tracking-widest text-center">
                            <div>Image</div>
                            <div className="text-left pl-10">Product</div>
                            <div>Price</div>
                            <div>Action</div>
                            <div>Remove</div>
                        </div>

                        <div className="divide-y divide-gray-100">
                            {wishlist.map((item) => (
                                <div key={item.id} className="grid grid-cols-1 md:grid-cols-[120px_1fr_120px_200px_80px] py-8 items-center gap-6 md:gap-0 group">
                                    {/* Image */}
                                    <div className="flex justify-center">
                                        <div className="w-24 h-24 md:w-20 md:h-20 bg-gray-50 flex items-center justify-center border border-gray-100 rounded-none overflow-hidden">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                        </div>
                                    </div>

                                    {/* Info */}
                                    <div className="text-center md:text-left md:pl-10">
                                        <Link href={`/product/${item.id}`} className="hover:text-[#B91C1C] transition">
                                            <h3 className="text-[13px] md:text-sm font-black text-gray-900 leading-tight uppercase tracking-tighter italic">{item.name}</h3>
                                        </Link>
                                        <p className="text-[10px] text-gray-400 mt-1 font-bold uppercase tracking-widest md:hidden">Price: {item.price}</p>
                                    </div>

                                    {/* Price (Desktop) */}
                                    <div className="hidden md:flex justify-center font-black text-xs text-black">
                                        {item.price}
                                    </div>

                                    {/* Add to Cart */}
                                    <div className="flex justify-center px-4 md:px-0">
                                        <button
                                            onClick={() => addToCart(item)}
                                            className="w-full md:w-[160px] py-4 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-none hover:bg-[#B91C1C] transition-all shadow-xl flex items-center justify-center gap-2 group/btn"
                                        >
                                            <ShoppingCart size={14} className="group-hover/btn:scale-110 transition-transform" />
                                            ADD TO CART
                                        </button>
                                    </div>

                                    {/* Remove */}
                                    <div className="flex justify-center">
                                        <button
                                            onClick={() => toggleWishlist(item)}
                                            className="w-10 h-10 md:w-auto md:h-auto border border-gray-100 md:border-none rounded-none flex items-center justify-center text-gray-400 hover:text-red-600 transition"
                                        >
                                            <X size={20} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
