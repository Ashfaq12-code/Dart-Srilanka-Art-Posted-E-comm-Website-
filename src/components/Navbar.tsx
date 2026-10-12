'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingCart, User, Heart, ChevronDown, Package, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';

import { twMerge } from 'tailwind-merge';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isDesignsOpen, setIsDesignsOpen] = useState(false);
  const [showSecurityAlert, setShowSecurityAlert] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null);
  const { cartItems, wishlist, setIsCartOpen, isLoggedIn, isCartOpen } = useShop();


  const NAV_LINKS = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop', mega: true },
    {
      name: 'Designs',
      href: '/shop?cat=Designs',
      dropdown: [
        { label: 'Vehicle Designs', slug: 'vehicle' },
        { label: 'Gamers Designs', slug: 'gamers' },
        { label: 'Movie Designs', slug: 'movie' },
        { label: 'Marvel Designs', slug: 'marvel' },
        { label: 'Anime Designs', slug: 'anime' },
        { label: 'Typographic Designs', slug: 'typographic' },
      ],
    },

    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const toggleMobileDropdown = (name: string) => {
    setActiveMobileDropdown(prev => (prev === name ? null : name));
  };

  return (
    <>
      {/* ─── HEADER ─── */}
      <header
        className={twMerge(
          `sticky top-0 left-0 w-full transition-transform duration-300 z-[100]`,

          /* Frosted glass effect — mobile uses solid blur, desktop stays subtle */
          'bg-white/70 dark:bg-black/75 backdrop-blur-md saturate-150 lg:bg-white/10 lg:dark:bg-black/60 lg:backdrop-blur-lg border-b border-white/30 dark:border-red-900/20 shadow-sm',

          isCartOpen ? '-translate-y-full' : 'translate-y-0'
        )}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Left: Logo only */}
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2 md:gap-3 shrink-0 select-none hover:opacity-80 transition-opacity">
                {/* Rounded Outline Emblem */}
                <div className="w-8 h-8 lg:w-12 lg:h-12 rounded-full border-[2px] md:border-[3px] border-black dark:border-white flex items-center justify-center transition-all duration-500 shadow-sm">
                  <span className="text-base lg:text-xl font-black text-black dark:text-white tracking-tighter">D.</span>
                </div>
                {/* Text Logo */}
                <div className="flex items-end tracking-[-0.05em]">
                  <span className="text-xl lg:text-3xl font-black uppercase text-black dark:text-white">DARTS</span>
                  <span className="text-[#B91C1C] text-2xl lg:text-4xl font-black leading-[0] mb-1.5 ml-0.5">.</span>
                </div>
              </Link>
            </div>

            {/* Center: Desktop Nav — white text on desktop */}
            <nav className="hidden lg:flex items-center space-x-8 h-full">
              {NAV_LINKS.map(link => (
                <div
                  key={link.name}
                  className="h-full flex items-center relative group"
                  onMouseEnter={() => {
                    if (link.mega) setIsMegaMenuOpen(true);
                    if (link.dropdown) setIsDesignsOpen(true);
                  }}
                  onMouseLeave={() => {
                    if (link.mega) setIsMegaMenuOpen(false);
                    if (link.dropdown) setIsDesignsOpen(false);
                  }}
                >
                  <Link
                    href={link.href}
                    className="text-[15px] font-bold text-gray-800 lg:text-black hover:text-[#B91C1C] transition-colors flex items-center gap-1 tracking-tight py-2 relative group-link"
                  >
                    {link.name}
                    {(link.mega || link.dropdown) && (
                      <ChevronDown size={14} className="text-[#B91C1C]" />
                    )}
                    {/* Stylish Underline Bar */}
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#B91C1C] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </Link>


                  {/* Designs dropdown */}
                  {link.dropdown && (
                    <div
                      className={twMerge(
                        'absolute top-full left-0 w-56 bg-white dark:bg-[#150505] shadow-2xl border-t-2 border-[#B91C1C] py-4 transition-all duration-300 transform origin-top z-[110]',
                        isDesignsOpen
                          ? 'opacity-100 scale-y-100 visible'
                          : 'opacity-0 scale-y-0 invisible'
                      )}
                    >
                      {link.dropdown.map(item => (
                        <Link
                          key={item.label}
                          href={`/designs/${item.slug}`}
                          className="block px-6 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:text-[#B91C1C] dark:hover:text-red-400 hover:bg-red-50/50 dark:hover:bg-red-900/20 transition-all flex items-center justify-between group/link"
                        >
                          {item.label}
                          <ChevronDown
                            size={12}
                            className="-rotate-90 opacity-0 group-hover/link:opacity-100 transition-opacity text-[#B91C1C]"
                          />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right: Icons + Login + Mobile Hamburger */}
            <div className="flex items-center space-x-4 lg:space-x-6">
              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="relative text-gray-900 lg:text-black hover:text-[#fff] lg:hover:text-[#B91C1C] transition-colors flex items-center justify-center group"
              >
                <Heart size={24} className="transition-all group-hover:fill-current" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#B91C1C] text-black text-[8px] w-3.5 h-3.5 flex items-center justify-center rounded-full font-bold">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative text-gray-700 lg:text-black hover:text-[#fff] lg:hover:text-[#B91C1C] transition-colors flex items-center justify-center group"
              >
                <ShoppingCart size={24} className="transition-all group-hover:fill-current" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#B91C1C] text-white text-[8px] w-3.5 h-3.5 flex items-center justify-center rounded-full font-bold">
                    {cartItems.length}
                  </span>
                )}
              </Link>

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden relative w-8 h-8 flex items-center justify-center text-gray-800 dark:text-white hover:text-[#B91C1C] dark:hover:text-[#B91C1C] transition-colors"
              >
                <div className="w-[22px] h-[16px] relative flex flex-col justify-between">
                  <span className={twMerge("w-full h-[2px] bg-current rounded-full transition-all duration-300 ease-out", isOpen ? "rotate-45 translate-y-[7px]" : "")} />
                  <span className={twMerge("w-full h-[2px] bg-current rounded-full transition-all duration-300 ease-out", isOpen ? "opacity-0 translate-x-4" : "")} />
                  <span className={twMerge("w-full h-[2px] bg-current rounded-full transition-all duration-300 ease-out", isOpen ? "-rotate-45 -translate-y-[7px]" : "")} />
                </div>
              </button>

              {/* Desktop Login */}
              <div className="hidden lg:block border-l border-gray-100 lg:border-black/20 pl-6">
                {isLoggedIn ? (
                  <button onClick={() => setShowSecurityAlert(true)} className="flex items-center gap-3 group">
                    <div className="w-9 h-9 rounded-full bg-gray-50 lg:bg-white/10 flex items-center justify-center text-gray-400 lg:text-black group-hover:bg-[#B91C1C] group-hover:text-white transition-all">
                      <User size={16} />
                    </div>
                    <div>
                      <p className="text-[9px] font-bold text-gray-400 lg:text-black/60 tracking-wide leading-none mb-1 text-left">My account</p>
                      <p className="text-[10px] font-black text-black lg:text-black tracking-tight text-left">Member</p>
                    </div>
                  </button>
                ) : (
                  <button onClick={() => setShowSecurityAlert(true)} className="flex items-center gap-3 group">
                    <div className="w-9 h-9 rounded-full bg-gray-50 lg:bg-white/10 flex items-center justify-center text-gray-400 lg:text-black group-hover:bg-[#B91C1C] group-hover:text-white transition-all">
                      <User size={18} />
                    </div>
                    <div className="text-left">
                      <p className="text-[9px] font-bold text-gray-400 lg:text-black/60 tracking-wide leading-none mb-1">Sign in</p>
                      <p className="text-[10px] font-black text-black lg:text-black tracking-tight">Join club</p>
                    </div>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ─── MEGA MENU — always white bg so it stays readable ─── */}
        <div
          className={twMerge(
            'absolute top-full left-0 w-full bg-white dark:bg-[#0f0000] border-b border-gray-100 dark:border-red-900/30 shadow-xl transition-all duration-300 overflow-hidden z-[90]',
            isMegaMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0 invisible'
          )}
          onMouseEnter={() => setIsMegaMenuOpen(true)}
          onMouseLeave={() => setIsMegaMenuOpen(false)}
        >
          <div className="max-w-7xl mx-auto px-8 py-10 grid grid-cols-4 gap-12">
            <div>
              <h3 className="font-bold text-[11px] tracking-wide mb-6 text-[#B91C1C]">Equipment</h3>
              <ul className="space-y-4">
                <li><Link href="/shop?cat=Steel Tip" className="text-sm text-gray-500 hover:text-[#B91C1C] transition" onClick={() => setIsMegaMenuOpen(false)}>Steel Tip Darts</Link></li>
                <li><Link href="/shop?cat=Soft Tip" className="text-sm text-gray-500 hover:text-[#B91C1C] transition" onClick={() => setIsMegaMenuOpen(false)}>Soft Tip Darts</Link></li>
                <li><Link href="/shop?cat=Dartboard" className="text-sm text-gray-500 hover:text-[#B91C1C] transition" onClick={() => setIsMegaMenuOpen(false)}>Tournament Boards</Link></li>
                <li><Link href="/shop?cat=Surround" className="text-sm text-gray-500 hover:text-[#B91C1C] transition" onClick={() => setIsMegaMenuOpen(false)}>Board Surrounds</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-[11px] tracking-wide mb-6 text-[#B91C1C]">Accessories</h3>
              <ul className="space-y-4">
                <li><Link href="/shop?cat=Shaft" className="text-sm text-gray-500 hover:text-[#B91C1C] transition" onClick={() => setIsMegaMenuOpen(false)}>Shafts &amp; Stems</Link></li>
                <li><Link href="/shop?cat=Flight" className="text-sm text-gray-500 hover:text-[#B91C1C] transition" onClick={() => setIsMegaMenuOpen(false)}>Flights &amp; Protectors</Link></li>
                <li><Link href="/shop?cat=Case" className="text-sm text-gray-500 hover:text-[#B91C1C] transition" onClick={() => setIsMegaMenuOpen(false)}>Storage Cases</Link></li>
                <li><Link href="/shop?cat=Point" className="text-sm text-gray-500 hover:text-[#B91C1C] transition" onClick={() => setIsMegaMenuOpen(false)}>Replacement Points</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-[11px] tracking-wide mb-6 text-[#B91C1C]">Top brands</h3>
              <div className="grid grid-cols-2 gap-4">
                {['TARGET', 'WINMAU', 'HARROWS', 'UNICORN'].map(brand => (
                  <div
                    key={brand}
                    className="bg-gray-50 p-3 rounded-lg flex items-center justify-center font-bold text-gray-400 text-[10px] hover:text-[#B91C1C] transition cursor-pointer border border-transparent hover:border-red-100 hover:bg-red-50/30"
                  >
                    {brand.charAt(0) + brand.slice(1).toLowerCase()}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-neutral-900 rounded-2xl p-6 flex flex-col justify-center items-center text-center text-white">
              <h3 className="font-bold text-lg mb-2">New Season Pro</h3>
              <p className="text-xs text-gray-400 mb-6 font-medium">Explore the latest tournament-grade equipment ready for 2026.</p>
              <Link
                href="/shop"
                className="px-6 py-2.5 bg-[#B91C1C] text-white text-[10px] font-bold tracking-widest rounded-full hover:bg-red-600 transition shadow-lg shadow-red-900/20"
              >
                Shop collection
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ─── MOBILE BACKDROP ─── */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[140] lg:hidden transition-all duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* ─── MOBILE SLIDE-OUT MENU ─── */}
      <div
        className={twMerge(
          'fixed inset-y-0 left-0 w-[85%] max-w-[320px] bg-white dark:bg-[#0a0000] z-[150] lg:hidden transform transition-all duration-500 ease-out flex flex-col shadow-2xl',
          isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
        )}
      >
        {/* Branded Mobile Header */}
        <div className="bg-[#B91C1C] p-6 text-white shrink-0">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border border-white flex items-center justify-center">
                <span className="text-[11px] font-black text-white tracking-tighter">D.</span>
              </div>
              <div className="flex items-end tracking-[-0.05em]">
                <span className="text-xl font-black uppercase text-white">DARTS</span>
                <span className="text-white text-2xl font-black leading-[0] mb-1 ml-0.5">.</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/wishlist" onClick={() => setIsOpen(false)} className="text-white hover:opacity-80 transition-opacity group">
                <Heart size={24} className="fill-transparent group-hover:fill-white transition-all" />
              </Link>
              <Link href="/cart" onClick={() => setIsOpen(false)} className="text-white hover:opacity-80 transition-opacity group">
                <ShoppingCart size={24} className="fill-transparent group-hover:fill-white transition-all" />
              </Link>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-6 space-y-2">
          {NAV_LINKS.map(link => (
            <div key={link.name} className="border-b border-gray-50 last:border-0 pb-2">
              {link.dropdown ? (
                <div className="space-y-4">
                  <div
                    className="flex items-center justify-between py-2 text-gray-900 font-bold text-xs tracking-wider cursor-pointer"
                    onClick={() => toggleMobileDropdown(link.name)}
                  >
                    {link.name}
                    <ChevronDown
                      size={14}
                      className={twMerge(
                        'text-[#B91C1C] transition-transform duration-300',
                        activeMobileDropdown === link.name ? 'rotate-180' : 'rotate-0'
                      )}
                    />
                  </div>
                  <div
                    className={twMerge(
                      'grid grid-cols-1 gap-3 pl-4 overflow-hidden transition-all duration-300',
                      activeMobileDropdown === link.name
                        ? 'max-h-[500px] opacity-100'
                        : 'max-h-0 opacity-0'
                    )}
                  >
                    {link.dropdown.map(item => (
                      <Link
                        key={item.label}
                        href={`/designs/${item.slug}`}
                        className="text-sm text-gray-500 flex items-center justify-between group py-1"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                        <ChevronDown
                          size={12}
                          className="-rotate-90 text-[#B91C1C] opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  href={link.href}
                  className="block py-3 text-gray-900 font-bold text-xs tracking-wider hover:text-[#B91C1C] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile Footer */}
        <div className="p-6 bg-gray-50 border-t border-gray-100 mt-auto">
          <p className="text-center text-[8px] text-gray-400 tracking-[0.3em] font-black uppercase">
            Dart Sri Lanka &copy; 2026
          </p>
        </div>
      </div>

      {/* Enterprise Hardening Alert */}
      <AnimatePresence>
        {showSecurityAlert && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 backdrop-blur-md bg-black/40">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white border border-gray-100 p-8 md:p-12 max-w-md w-full rounded-none shadow-2xl relative overflow-hidden text-center"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-[#B91C1C]" />
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-black text-white rounded-none flex items-center justify-center mb-6 shadow-xl">
                  <ShieldCheck size={32} />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight mb-2">Protocol Finalization</h3>
                <p className="text-[10px] font-black uppercase text-[#B91C1C] tracking-[0.2em] mb-6">Security Level: Enterprise</p>

                <div className="space-y-4 mb-8">
                  <p className="text-sm font-medium text-gray-500 leading-relaxed">
                    Our authentication infrastructure is currently undergoing security hardening for your protection.
                  </p>
                  <div className="p-4 bg-gray-50 border border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-left">
                    Status: Member login available soon. Please use Guest Checkout for immediate orders.
                  </div>
                </div>

                <Button
                  variant="vogue"
                  className="w-full h-14 rounded-none text-xs tracking-widest font-black"
                  onClick={() => setShowSecurityAlert(false)}
                >
                  ACKNOWLEDGE PROTOCOL
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
