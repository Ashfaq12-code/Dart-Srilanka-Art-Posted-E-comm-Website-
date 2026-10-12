'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutGrid, MessageSquare, ShoppingCart, User } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { twMerge } from 'tailwind-merge';

export const BottomNav = () => {
  const pathname = usePathname();
  const { cartItems, isLoggedIn } = useShop();

  const NAV_ITEMS = [
    { name: 'Home', icon: Home, href: '/' },
    { name: 'Category', icon: LayoutGrid, href: '/categories' },
    { name: 'Messages', icon: MessageSquare, href: '/contact', badge: 'New' },
    { name: 'Cart', icon: ShoppingCart, href: '/cart', count: cartItems.length },
    { name: 'Account', icon: User, href: isLoggedIn ? '/account/dashboard' : '/login' },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[150] bg-white/90 backdrop-blur-xl border-t border-gray-100 pb-safe-area shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-around h-16 px-2">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={twMerge(
                "flex flex-col items-center justify-center flex-1 transition-all relative",
                isActive ? "text-[#B91C1C]" : "text-gray-400"
              )}
            >
              <div className="relative mb-1">
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} className="transition-transform duration-300" />
                {item.count !== undefined && item.count > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 bg-[#B91C1C] text-white text-[8px] font-black w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">
                    {item.count}
                  </span>
                )}
                {item.badge && (
                   <span className="absolute -top-1 -right-6 bg-red-500 text-white text-[6px] font-black px-1 rounded-full border border-white">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={twMerge(
                "text-[9px] font-bold tracking-wide",
                isActive ? "opacity-100" : "opacity-60"
              )}>
                {item.name}
              </span>
              
              {isActive && (
                 <span className="absolute -top-1 w-1 h-1 bg-[#B91C1C] rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
