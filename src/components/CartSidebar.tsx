'use client';
import { useShop } from '@/context/ShopContext';
import { X, Edit, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export const CartSidebar = () => {
  const { isCartOpen, setIsCartOpen, cartItems, removeFromCart, updateCartQty } = useShop();

  if (!isCartOpen) return null;

  const parsePrice = (priceStr: string | number) => {
    if (typeof priceStr === 'number') return priceStr;
    return parseInt(priceStr.replace(/[^0-9]/g, '')) || 0;
  };

  const total = cartItems.reduce((sum, item) => sum + (parsePrice(item.price) * (item.quantity || 1)), 0);

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
      <div 
        className="relative w-[75vw] sm:w-full sm:max-w-[400px] bg-white h-full shadow-2xl flex flex-col transform transition-transform duration-500 translate-x-0 border-l border-gray-100"
        style={{ animation: 'slideInRight 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)' }}
      >
        <div className="p-6 pb-4 flex justify-between items-start">
          <div>
              <h2 className="text-xl font-bold text-gray-900 tracking-tight">Shopping Cart</h2>
              <p className="text-sm text-gray-500 mt-1">{cartItems.length} items</p>
          </div>
          <button onClick={() => setIsCartOpen(false)} className="text-gray-500 hover:text-black transition-colors pt-1">
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto px-6 py-2 space-y-6">
          {cartItems.map(item => {
             const oldPrice = item.discountPrice ? parseInt(item.discountPrice.replace(/[^0-9]/g, '')) : item.price * 1.3;
             return (
              <div key={item.cartId} className="flex gap-4 relative py-2 mb-2">
                <div className="w-20 h-24 bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col pt-1">
                  <h4 className="font-medium text-sm text-gray-900 line-clamp-1 pr-6">{item.name}</h4>
                  
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 my-1">
                     {item.selectedSize || 'Standard'} <Edit size={12} className="cursor-pointer hover:text-black" />
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs text-gray-400 line-through font-bold">Rs {(oldPrice).toLocaleString()}</span>
                      <span className="text-sm text-[#B91C1C] font-bold">Rs {item.price.toLocaleString()}</span>
                  </div>

                  <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center border border-gray-300 w-[72px] h-[30px]">
                          <button onClick={() => updateCartQty(item.cartId, Math.max(1, (item.quantity||1)-1))} className="w-7 h-full flex items-center justify-center text-gray-600 hover:bg-gray-50 font-medium">-</button>
                          <span className="flex-1 text-center text-xs font-medium">{item.quantity || 1}</span>
                          <button onClick={() => updateCartQty(item.cartId, (item.quantity||1)+1)} className="w-7 h-full flex items-center justify-center text-gray-600 hover:bg-gray-50 font-medium">+</button>
                      </div>
                  </div>
                </div>

                {/* Exact Match: X on the far right middle */}
                <button 
                  onClick={() => removeFromCart(item.cartId)} 
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-600 transition-colors"
                >
                    <X size={16} strokeWidth={2} />
                </button>
              </div>
            );
          })}

          {cartItems.length === 0 && (
            <div className="text-center flex flex-col items-center justify-center h-full pb-20">
                <div className="flex items-center gap-2 mb-6 opacity-10">
                  {/* Rounded Outline Emblem */}
                  <div className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center">
                    <span className="text-sm font-black text-black tracking-tighter">D.</span>
                  </div>
                  {/* Text Logo */}
                  <div className="flex items-end tracking-[-0.05em]">
                      <span className="text-xl font-black uppercase text-black">DARTS</span>
                      <span className="text-[#B91C1C] text-2xl font-black leading-[0] mb-1 ml-0.5">.</span>
                  </div>
                </div>
                <p className="font-black text-gray-900 uppercase tracking-widest text-[11px] mb-4">Your collection is empty</p>
                <Link href="/shop" onClick={() => setIsCartOpen(false)} className="px-8 py-3 bg-black text-white text-[10px] font-black uppercase tracking-widest hover:bg-[#B91C1C] transition-colors rounded-full">
                  Continue shopping
                </Link>
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
            <div className="p-6 bg-white flex flex-col">
              <div className="flex justify-center mb-6">
                 <div className="w-12 h-12 border border-gray-200 flex items-center justify-center text-gray-600">
                    <ShoppingBag size={20} strokeWidth={1.5} />
                 </div>
              </div>
              
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-gray-900 text-[13px]">Subtotal:</span>
                <span className="font-bold text-gray-900 text-sm">Rs {total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-gray-900 text-[13px]">Shipping:</span>
                <span className="font-bold text-gray-900 text-sm">Rs 800</span>
              </div>
              <div className="flex justify-between items-center mb-4 pt-4 border-t border-gray-100">
                <span className="font-bold text-gray-900 text-[13px]">Total:</span>
                <span className="font-bold text-gray-900 text-lg">Rs {(total + 800).toLocaleString()}</span>
              </div>
              
              <p className="text-[11px] text-gray-500 mb-6 uppercase tracking-wider font-bold">Island-wide delivery included</p>

              <Link href="/checkout" onClick={() => setIsCartOpen(false)} className="w-full">
                <button className="w-full py-3.5 bg-black text-white font-black text-xs tracking-widest uppercase mb-3 hover:bg-[#B91C1C] transition-colors">
                  CHECKOUT
                </button>
              </Link>
              
              <Link href="/cart" onClick={() => setIsCartOpen(false)} className="w-full">
                <button className="w-full py-3.5 bg-white border-2 border-black text-black font-black text-xs tracking-widest uppercase hover:bg-gray-50 transition-colors">
                  VIEW CART
                </button>
              </Link>
            </div>
        )}
      </div>
      <style jsx>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};
