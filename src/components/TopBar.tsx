'use client';
import React from 'react';
import Link from 'next/link';
import { User, LogOut, Package, Settings, LogIn } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { useShop } from '@/context/ShopContext';
import { twMerge } from 'tailwind-merge';

export const TopBar = () => {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const { isLoggedIn, logout, isCartOpen } = useShop();


  return (
    <div
      className={twMerge(
        "text-white text-[11px] lg:text-xs font-medium py-2.5 px-4 z-[110] relative w-full border-b border-white/10 transition-all duration-700 bg-black",
        isCartOpen ? "-translate-y-full" : "translate-y-0"
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          <span className="hidden sm:flex items-center gap-2 opacity-90 hover:opacity-100 transition-opacity">
            <span className="animate-pulse">🔥</span> Limited Stock: Get Your Darts Now!
          </span>
          <span className="sm:hidden flex items-center gap-1 font-bold">
            🔥 20% Off all darts
          </span>
        </div>

        <div className="flex items-center space-x-4 lg:space-x-6">
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="flex items-center gap-1.5 hover:text-gray-200 transition">
                <User size={14} />
                <span className="hidden xs:inline">My account</span>
              </Link>
              <button
                onClick={logout}
                className="flex items-center gap-1.5 hover:text-gray-200 transition border-l border-white/20 pl-4"
              >
                <LogOut size={14} />
                <span className="hidden xs:inline">Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link href="/login" className="flex items-center gap-1.5 hover:text-gray-200 transition">
                <LogIn size={14} />
                Sign in
              </Link>
              <Link href="/login" className="hidden xs:flex items-center gap-1.5 hover:text-gray-200 transition border-l border-white/20 pl-4">
                Join now
              </Link>
            </div>
          )}

          <div className="flex items-center gap-2 border-l border-white/20 pl-4">
            <select className="bg-transparent border-none text-white text-[10px] lg:text-xs cursor-pointer focus:outline-none focus:ring-0 font-bold appearance-none hover:text-gray-200 transition">
              <option className="text-black">LKR</option>
              <option className="text-black">USD</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
