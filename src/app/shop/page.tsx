'use client';

import React, { useState, useMemo, useEffect, useRef, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ProductCard } from '@/components/ProductCard';
import { ScrollReveal } from '@/components/ScrollReveal';
import { LayoutGrid, List, ChevronDown, ChevronLeft, ArrowRight, Filter, X, Search, Sparkles } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { useShop } from '@/context/ShopContext';
import { Button } from '@/components/ui/Button';
type CatName = string;

// Base category names
const CATEGORY_NAMES = [
  'All', 'Vehicle', 'Gamers', 'Movie', 'Marvel', 'Anime', 'Typographic'
];

const DESIGN_CATEGORIES = ['Vehicle', 'Gamers', 'Movie', 'Marvel', 'Anime', 'Typographic'];
const COLORS = ['#1e40af', '#dc2626', '#facc15', '#1a1a1a', '#9ca3af'];
const BRANDS = ['Target', 'Winmau', 'Red Dragon', 'Harrows', 'Unicorn'];
const ITEMS_PER_PAGE = 12;

const BANNER_CONFIG: Record<string, { bg: string; edition: string }> = {
  'Vehicle': { bg: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80', edition: 'VEHICLE EDITION' },
  'Gamers': { bg: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80', edition: 'GAMERS EDITION' },
  'Anime': { bg: 'https://img.freepik.com/free-photo/anime-eyes-illustration_23-2151660514.jpg?semt=ais_incoming&w=740&q=80', edition: 'ANIME EDITION' },
  'Marvel': { bg: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&q=80', edition: 'MARVEL EDITION' },
  'Movie': { bg: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80', edition: 'MOVIE EDITION' },
  'Typographic': { bg: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80', edition: 'TYPOGRAPHIC EDITION' },
  'default': { bg: 'https://i.ibb.co/234bxsnn/output-1.gif', edition: 'PRO SHOP COLLECTION' },
};

// Typing animation hook
function useTypingEffect(text: string, speed = 55) {
  const [displayed, setDisplayed] = useState('');
  const prev = useRef('');
  useEffect(() => {
    if (text === prev.current) return;
    prev.current = text;
    setDisplayed('');
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  return displayed;
}

function ShopContent() {
  const { products, isCompareOpen, compareProduct, closeCompare, openQuickView, addToCart } = useShop();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Dynamic Categories calculation
  const CATEGORIES = useMemo(() => {
    return CATEGORY_NAMES.map(name => {
      const count = name === 'All'
        ? products.length
        : products.filter(p => (p as any).type?.toLowerCase() === name.toLowerCase()).length;
      return { name, count };
    });
  }, [products]);

  // States
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<number>(10000);
  const [sortBy, setSortBy] = useState('default');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [shuffleSeed, setShuffleSeed] = useState(0);

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [gridVisible, setGridVisible] = useState(true);
  const [isStudioExpanded, setIsStudioExpanded] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productTopRef = useRef<HTMLDivElement>(null);
  const studioRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sync state FROM URL on load and changes
  useEffect(() => {
    const cat = searchParams.get('cat');
    const price = searchParams.get('price');
    const sort = searchParams.get('sort');
    const q = searchParams.get('q');
    const styles = searchParams.get('styles');
    const page = searchParams.get('page');

    if (cat) setSelectedCategory(cat);
    if (price) setPriceRange(Number(price));
    if (sort) setSortBy(sort);
    if (q) setSearchQuery(q);
    if (styles) setSelectedStyles(styles.split(','));
    if (page) setCurrentPage(Number(page));
  }, [searchParams]);

  // Sync state TO URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory) params.set('cat', selectedCategory);
    if (priceRange < 10000) params.set('price', priceRange.toString());
    if (sortBy !== 'default') params.set('sort', sortBy);
    if (searchQuery) params.set('q', searchQuery);
    if (selectedStyles.length > 0) params.set('styles', selectedStyles.join(','));
    if (currentPage > 1) params.set('page', currentPage.toString());

    const query = params.toString();
    const url = `/shop${query ? `?${query}` : ''}`;
    window.history.replaceState({ ...window.history.state, as: url, url }, '', url);
  }, [selectedCategory, priceRange, sortBy, searchQuery, selectedStyles, currentPage]);

  const handleCategoryChange = (name: string) => {
    setSelectedCategory(name === 'All' ? null : name);
    setShuffleSeed(Math.random()); // Shuffle on category change
    if (isMobileFilterOpen) setIsMobileFilterOpen(false);
  };

  // Scroll to product heading on page change
  const goToPage = (page: number) => {
    setCurrentPage(page);
    setTimeout(() => {
      productTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  // Reset page, animate grid, and scroll to top on filter change
  useEffect(() => {
    setGridVisible(false);
    setCurrentPage(1);
    setTimeout(() => {
      productTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
    const t = setTimeout(() => setGridVisible(true), 200);
    return () => clearTimeout(t);
  }, [selectedCategory, priceRange, sortBy, searchQuery, selectedStyles]);

  // Initial load shuffle
  useEffect(() => {
    setShuffleSeed(Math.random());
  }, []);

  // Animate grid on page change
  useEffect(() => {
    setGridVisible(false);
    const t = setTimeout(() => setGridVisible(true), 150);
    return () => clearTimeout(t);
  }, [currentPage]);

  const bannerConfig = useMemo(() => {
    if (!selectedCategory) return BANNER_CONFIG['default'];
    const key = Object.keys(BANNER_CONFIG).find(k => k.toLowerCase() === selectedCategory.toLowerCase());
    return key ? BANNER_CONFIG[key] : BANNER_CONFIG['default'];
  }, [selectedCategory]);
  const editionText = useTypingEffect(bannerConfig.edition);
  const isDesignCat = useMemo(() => {
    if (!selectedCategory) return false;
    return DESIGN_CATEGORIES.some(cat => cat.toLowerCase() === selectedCategory.toLowerCase());
  }, [selectedCategory]);

  const filteredProducts = useMemo(() => {
    // Basic filter
    const base = products.filter(p => {
      // Category Match
      const catMatch = !selectedCategory ||
        (p as any).type?.toLowerCase() === selectedCategory.toLowerCase();

      // Price Match
      const priceStr = String((p as any).price || '0');
      const priceNum = parseInt(priceStr.replace(/[^0-9]/g, '')) || 0;
      const priceMatch = priceNum <= priceRange;

      // Search Match
      const nameMatch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase());

      // Style Match
      const styleMatch = selectedStyles.length === 0 || selectedStyles.includes(p.style || '');

      return catMatch && priceMatch && nameMatch && styleMatch;
    });

    // Custom sorting
    if (sortBy === 'price-low') {
      return [...base].sort((a, b) => {
        const pA = parseInt(String((a as any).price || '0').replace(/[^0-9]/g, '')) || 0;
        const pB = parseInt(String((b as any).price || '0').replace(/[^0-9]/g, '')) || 0;
        return pA - pB;
      });
    }
    if (sortBy === 'price-high') {
      return [...base].sort((a, b) => {
        const pA = parseInt(String((a as any).price || '0').replace(/[^0-9]/g, '')) || 0;
        const pB = parseInt(String((b as any).price || '0').replace(/[^0-9]/g, '')) || 0;
        return pB - pA;
      });
    }
    if (sortBy === 'rating') {
      return [...base].sort((a, b) => ((b as any).rating || 0) - ((a as any).rating || 0));
    }

    // Default: SHUFFLE logic (based on seed) to ensure "middle and last" items get exposure
    if (sortBy === 'default' && shuffleSeed > 0) {
      return [...base].sort((a, b) => {
        // Simple pseudo-random distribution using string characters and the seed
        const hashA = a.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const hashB = b.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

        const valA = Math.sin(hashA + shuffleSeed * 10000);
        const valB = Math.sin(hashB + shuffleSeed * 10000);
        return valA - valB;
      });
    }

    // fallback
    return base;
  }, [products, selectedCategory, priceRange, sortBy, searchQuery, selectedStyles, shuffleSeed]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const pagedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );



  // Visible page numbers (max 5 around current)
  const pageNumbers = useMemo(() => {
    const pages: number[] = [];
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  }, [currentPage, totalPages]);

  return (
    <div className="bg-[#f8fafc] min-h-screen">

      {/* ===================== BANNER ===================== */}
      <div className="w-full h-[320px] md:h-[400px] bg-black relative flex items-end justify-center overflow-hidden">
        <img
          key={bannerConfig.bg}
          src={bannerConfig.bg}
          className="absolute inset-0 w-full h-full object-cover opacity-50 transition-opacity duration-700"
          style={{ animation: 'kenBurns 12s ease-in-out infinite alternate' }}
          alt="Category Banner"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

        <div className="relative z-10 text-center px-4 pb-10 w-full">
          {/* Big BG "DARTS" watermark */}
          <p
            className="text-white/10 font-black uppercase select-none leading-none"
            style={{ fontSize: 'clamp(80px, 20vw, 220px)', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '-0.15em' }}
          >
            DARTS
          </p>

          {/* Typing edition sub-heading */}
          <h1 className="text-white font-black italic tracking-tighter drop-shadow-2xl"
            style={{ fontSize: 'clamp(32px, 6vw, 64px)' }}>
            {editionText.charAt(0).toUpperCase() + editionText.slice(1).toLowerCase()}
            <span className="inline-block w-1 h-[1em] bg-[#B91C1C] ml-2 align-middle animate-pulse" />
          </h1>

          {/* Mobile Back Button */}
          <button
            onClick={() => window.history.back()}
            className="lg:hidden absolute top-10 left-6 z-20 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 active:scale-90 transition-all"
          >

          </button>

          <div className="flex items-center justify-center gap-3 text-[#B91C1C] font-bold text-[11px] mt-3 tracking-wide">
            <span className="hover:text-white transition cursor-pointer">Home</span>
            <span className="text-white/40">/</span>
            <span className="text-white/60">Shop</span>
            {selectedCategory && (
              <><span className="text-white/40">/</span>
                <span className="text-white capitalize">{selectedCategory}</span></>
            )}
          </div>
        </div>
      </div>

      {/* ===================== MAIN ===================== */}
      <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col lg:flex-row gap-8">

        {/* ===================== MOBILE OVERLAY ===================== */}
        <AnimatePresence>
          {isMobileFilterOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] lg:hidden"
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isMobileFilterOpen && (
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[280px] bg-white z-[110] shadow-2xl lg:hidden flex flex-col p-6 overflow-y-auto"
            >
              {/* Mobile Close */}
              <div className="flex justify-between items-center mb-10 border-b border-gray-100 pb-4">
                <h2 className="font-black text-lg uppercase tracking-tight">Filters</h2>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:text-black hover:bg-gray-100 transition-all active:scale-90"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Mobile Content */}
              <div className="space-y-10">
                {/* Search Mobile */}
                <div>
                  <h3 className="font-black text-[14px] uppercase tracking-[0.1em] mb-4 pb-2 border-b-2 border-red-600 inline-block">Search</h3>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Keyword..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-red-600/20"
                    />
                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                  </div>
                </div>

                {/* Categories Mobile Content */}
                <div>
                  <h3 className="font-black text-[14px] uppercase tracking-[0.1em] mb-6 pb-2 border-b-2 border-red-600 inline-block">Product categories</h3>
                  <ul className="space-y-1">
                    {CATEGORIES.map(cat => {
                      const isActive = cat.name === 'All' ? !selectedCategory : selectedCategory === cat.name;
                      return (
                        <li key={cat.name}
                          onClick={() => { handleCategoryChange(cat.name); }}
                          className={twMerge(
                            "flex justify-between items-center cursor-pointer py-3.5 px-3 rounded-xl transition-all duration-300",
                            isActive ? "bg-red-50/70 text-red-600 font-black shadow-sm" : "hover:bg-gray-50 text-gray-500 hover:text-black font-semibold"
                          )}>
                          <span className="text-sm tracking-wide">{cat.name}</span>
                          <span className={twMerge(
                            "text-[10px] w-8 h-5 flex items-center justify-center rounded-full font-black select-none",
                            isActive ? "bg-red-600 text-white" : "bg-gray-100 text-gray-400"
                          )}>{cat.count}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Price filter Mobile Content */}
                <div>
                  <h3 className="font-black text-[14px] uppercase tracking-[0.1em] mb-6 pb-2 border-b-2 border-red-600 inline-block">Filter by price</h3>
                  <input type="range" min="0" max="10000" step="500"
                    value={priceRange} onChange={e => setPriceRange(parseInt(e.target.value))}
                    className="w-full h-1 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-red-600"
                  />
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-[11px] font-bold text-gray-400 italic">LKR 0 — <span className="text-black not-italic font-black">{priceRange.toLocaleString()}</span></span>
                  </div>
                </div>

                {/* Styles Mobile Content */}
                <div>
                  <h3 className="font-black text-[14px] uppercase tracking-[0.1em] mb-4 pb-2 border-b-2 border-red-600 inline-block">Filter by Style</h3>
                  <ul className="space-y-4 pt-2">
                    {['Beginner', 'Pro', 'Tournament'].map(style => {
                      const isActive = selectedStyles.includes(style);
                      return (
                        <li key={style}
                          onClick={() => {
                            setSelectedStyles(prev =>
                              prev.includes(style) ? prev.filter(s => s !== style) : [...prev, style]
                            );
                          }}
                          className="flex items-center gap-4 cursor-pointer group"
                        >
                          <div className={twMerge(
                            "w-6 h-6 border-2 rounded-lg transition-all flex items-center justify-center",
                            isActive ? "border-red-600 bg-red-600" : "border-gray-100 bg-gray-50"
                          )}>
                            {isActive && <div className="w-2.5 h-2.5 bg-white rounded-sm" />}
                          </div>
                          <span className={twMerge(
                            "text-xs font-bold transition-all uppercase tracking-tighter",
                            isActive ? "text-black" : "text-gray-400"
                          )}>{style}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="pt-6">
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="w-full py-4 bg-red-600 text-white rounded-xl font-black uppercase tracking-widest text-[11px] shadow-xl shadow-red-500/20 active:scale-95 transition-all"
                  >
                    Apply Filters
                  </button>
                  <button
                    onClick={() => { setSelectedCategory(null); setPriceRange(10000); setSearchQuery(''); setSelectedStyles([]); setShuffleSeed(Math.random()); }}
                    className="w-full mt-4 py-4 border-2 border-dashed border-gray-100 text-gray-400 rounded-xl font-black uppercase tracking-widest text-[11px] active:scale-95 transition-all"
                  >
                    Reset All
                  </button>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* ---- DESKTOP Sidebar (Only visible on LG) ---- */}
        <aside className="hidden lg:block lg:w-1/4 space-y-10 bg-white p-8 rounded-[40px] shadow-2xl shadow-black/[0.03] border border-gray-100 h-fit sticky top-32">
          {/* Search */}
          <div>
            <h3 className="font-black text-[14px] uppercase tracking-[0.1em] mb-6 pb-2 border-b-2 border-red-600 inline-block">Search</h3>
            <div className="relative group">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 border border-transparent focus:border-red-600 focus:bg-white p-4 rounded-2xl text-xs font-bold transition-all outline-none"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-red-600 transition-colors" size={16} />
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-black text-[14px] uppercase tracking-[0.1em] mb-8 pb-2 border-b-2 border-red-600 inline-block">Product categories</h3>
            <ul className="space-y-1">
              {CATEGORIES.map(cat => {
                const isActive = cat.name === 'All' ? !selectedCategory : selectedCategory === cat.name;
                return (
                  <li key={cat.name}
                    onClick={() => handleCategoryChange(cat.name)}
                    className={twMerge(
                      "flex justify-between items-center cursor-pointer py-3.5 px-3 rounded-2xl transition-all duration-300",
                      isActive ? "bg-red-50/70 text-red-600 font-black shadow-sm" : "hover:bg-gray-50 text-gray-500 hover:text-black font-semibold"
                    )}>
                    <span className="text-sm tracking-wide">{cat.name}</span>
                    <span className={twMerge(
                      "text-[10px] w-9 h-5 flex items-center justify-center rounded-full font-black",
                      isActive ? "bg-red-600 text-white" : "bg-gray-100 text-gray-400 shadow-inner"
                    )}>{cat.count}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Price filter */}
          <div>
            <h3 className="font-black text-[14px] uppercase tracking-[0.1em] mb-6 pb-2 border-b-2 border-red-600 inline-block">Filter by price</h3>
            <input type="range" min="0" max="10000" step="500"
              value={priceRange} onChange={e => setPriceRange(parseInt(e.target.value))}
              className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-red-600 shadow-inner"
            />
            <div className="flex justify-between items-center mt-6">
              <span className="text-[11px] font-bold text-gray-400 italic tracking-tight">Price: LKR 0 — <span className="text-black not-italic font-black">{priceRange.toLocaleString()}</span></span>
              <button className="text-[9px] bg-red-600 text-white px-5 py-2 rounded-full font-black uppercase tracking-wider hover:bg-black transition-all hover:-translate-y-0.5 shadow-lg shadow-red-500/20 active:scale-95">Filter</button>
            </div>
          </div>

          {/* Professional Styles */}
          <div>
            <h3 className="font-black text-[14px] uppercase tracking-[0.1em] mb-4 pb-2 border-b-2 border-red-600 inline-block">Filter by Style</h3>
            <ul className="space-y-3 pt-2">
              {['Beginner', 'Pro', 'Tournament'].map(style => {
                const isActive = selectedStyles.includes(style);
                return (
                  <li key={style}
                    onClick={() => {
                      setSelectedStyles(prev =>
                        prev.includes(style) ? prev.filter(s => s !== style) : [...prev, style]
                      );
                    }}
                    className="flex items-center gap-4 cursor-pointer group"
                  >
                    <div className={twMerge(
                      "w-6 h-6 border-2 rounded-lg transition-all flex items-center justify-center",
                      isActive ? "border-red-600 bg-red-600" : "border-gray-100 bg-gray-50 group-hover:border-red-600"
                    )}>
                      {isActive && <div className="w-2.5 h-2.5 bg-white rounded-sm" />}
                    </div>
                    <span className={twMerge(
                      "text-xs font-bold transition-all uppercase tracking-tighter",
                      isActive ? "text-black" : "text-gray-400 group-hover:text-black"
                    )}>{style}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <button onClick={() => { setSelectedCategory(null); setPriceRange(10000); setSearchQuery(''); setSelectedStyles([]); setShuffleSeed(Math.random()); }}
            className="w-full py-5 border-2 border-dashed border-gray-100 text-gray-400 font-black uppercase tracking-widest text-[9px] rounded-3xl hover:border-red-600 hover:text-red-600 transition-all duration-500 active:scale-95 group">
            <span className="flex items-center justify-center gap-2">
              Reset Gallery Filters <X size={12} />
            </span>
          </button>
        </aside>

        {/* ---- Main Content ---- */}
        <main className="lg:w-3/4">

          {/* Centered Stylish Heading */}
          <div ref={productTopRef} className="mb-16 text-center pt-4">
            <h2 className="text-4xl md:text-7xl font-normal text-slate-700 mb-4" style={{ fontFamily: 'var(--font-dancing-script)' }}>
              {selectedCategory ? `${selectedCategory} Edition` : 'Studio Collection'}
            </h2>
            <div className="flex flex-col items-center gap-6">
              <p className="text-gray-400 text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase opacity-60">
                Premium Professional Gear — Handcrafted in Kandy
              </p>
              
              <button 
                onClick={() => setIsMobileFilterOpen(true)} 
                className="lg:hidden flex items-center gap-3 bg-white border border-gray-100 text-black px-8 py-3.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl shadow-black/5 active:scale-95 transition-all"
              >
                <Filter size={14} className="text-[#B91C1C]" /> Refine Collection
              </button>
            </div>
          </div>

          {/* Mobile Category Scroller (Variety Selector) */}
          <div className="lg:hidden mb-8 -mx-4 px-4 overflow-x-auto hide-scrollbar flex gap-3 pb-2 sticky top-[64px] z-40 bg-[#f8fafc]/80 backdrop-blur-md py-4">
            {CATEGORIES.map(cat => {
              const isActive = cat.name === 'All' ? !selectedCategory : selectedCategory === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => handleCategoryChange(cat.name)}
                  className={twMerge(
                    "whitespace-nowrap px-8 py-3.5 rounded-none text-[10px] font-black uppercase tracking-widest transition-all border-2",
                    isActive
                      ? "bg-black border-black text-white shadow-xl"
                      : "bg-white border-gray-100 text-gray-400 hover:border-black hover:text-black"
                  )}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* Toolbar */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button onClick={() => setViewMode('grid')}
                className={twMerge("p-2 rounded-lg transition", viewMode === 'grid' ? "bg-red-50 text-[#B91C1C]" : "text-gray-400 hover:bg-gray-50")}>
                <LayoutGrid size={18} />
              </button>
              <button onClick={() => setViewMode('list')}
                className={twMerge("p-2 rounded-lg transition", viewMode === 'list' ? "bg-red-50 text-[#B91C1C]" : "text-gray-400 hover:bg-gray-50")}>
                <List size={18} />
              </button>
              <p className="text-xs text-gray-500 font-medium">
                Showing <span className="font-bold text-black">{(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)}</span> of <span className="font-bold text-[#B91C1C]">{filteredProducts.length}</span> products
              </p>
            </div>

            <div className="relative group min-w-[200px] w-full sm:w-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-gray-50 border-none rounded-xl px-5 py-3 text-[10px] font-black uppercase tracking-widest outline-none appearance-none cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <option value="default">Default Sorting</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Average Rating</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
            </div>
          </div>

          {/* Advanced Custom Studio Entry (Accordion on Mobile) */}
          <div ref={studioRef} className="mb-12 group relative overflow-hidden bg-white border border-gray-100 shadow-2xl shadow-black/5 p-0 md:p-12">
            {/* Mobile Toggle Header */}
            <button 
              onClick={() => setIsStudioExpanded(!isStudioExpanded)}
              className="lg:hidden w-full flex items-center justify-between p-6 bg-red-50/30 border-b border-gray-50"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border-[2px] border-black flex items-center justify-center bg-white shadow-sm">
                  <span className="text-xs font-black text-black tracking-tighter">D.</span>
                </div>
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-black">Customize Design Studio</span>
              </div>
              <motion.div
                animate={{ rotate: isStudioExpanded ? 180 : 0 }}
                className="text-[#B91C1C]"
              >
                <ChevronDown size={20} />
              </motion.div>
            </button>

            <AnimatePresence>
              {(isStudioExpanded || isDesktop) && (
                <motion.div
                  initial={!isDesktop ? { height: 0, opacity: 0 } : false}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-8 md:p-0">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#B91C1C]/5 rounded-bl-[100px] -mr-10 -mt-10 transition-all duration-700 group-hover:scale-150 hidden md:block" />
                    <div className="relative flex flex-col md:flex-row items-center justify-between gap-10">
                      <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left flex-1">
                        <div className="relative group shrink-0 hidden md:block">
                          <div className="w-16 h-16 rounded-full border-[3px] border-black flex items-center justify-center transition-all duration-500 bg-white group-hover:rotate-12">
                            <span className="text-2xl font-black text-black tracking-tighter">D.</span>
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#B91C1C] rounded-full border-[3px] border-white shadow-lg" />
                        </div>
                        <div>
                          <div className="flex flex-col md:flex-row items-center md:items-end gap-3 mb-3">
                            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter italic leading-none">Advanced Custom Studio</h3>
                            <span className="bg-[#B91C1C] text-white text-[9px] font-black px-3 py-1 rounded-none tracking-[0.2em] uppercase mb-1">NEW FEATURE</span>
                          </div>
                          <p className="text-gray-500 text-[11px] font-bold uppercase tracking-widest max-w-lg leading-relaxed opacity-70">
                            Upload your own images, choose custom sizes, or search Google for specific dart board designs. Premium high-definition printing guaranteed.
                          </p>
                        </div>
                      </div>
                      <div className="w-full md:w-fit shrink-0">
                        <Link href="/custom-design" className="block w-full">
                          <Button
                            variant="vogue"
                            className="w-full md:w-fit h-14 px-12 rounded-none text-[11px] font-black tracking-[0.2em] shadow-2xl border-none group/btn bg-black text-white hover:bg-[#B91C1C] transition-all"
                          >
                            START DESIGNING <ArrowRight size={16} className="ml-3 group-hover:translate-x-2 transition-transform" />
                          </Button>
                        </Link>
                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.3em] mt-4 text-center md:text-right italic">Premium Customization Service</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

      {/* Product Grid with scroll-reveal animation */}
      <div
        className={twMerge(
          "grid gap-4 lg:gap-6",
          viewMode === 'grid' ? "grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
        )}
      >
        {pagedProducts.map((product, i) => (
          <ScrollReveal key={(product as any).id} direction="up" delay={i * 45} duration={380}>
            <ProductCard product={product as any} />
          </ScrollReveal>
        ))}
      </div>

      {/* Empty state */}
      {pagedProducts.length === 0 && (
        <div className="text-center py-28 flex flex-col items-center">
          <div className="flex items-center gap-3 mb-8 opacity-20">
            {/* Rounded Outline Emblem */}
            <div className="w-16 h-16 rounded-full border-[4px] border-black flex items-center justify-center">
              <span className="text-2xl font-black text-black tracking-tighter">D.</span>
            </div>
            {/* Text Logo */}
            <div className="flex items-end tracking-[-0.05em]">
              <span className="text-4xl font-black uppercase text-black">DARTS</span>
              <span className="text-[#B91C1C] text-5xl font-black leading-[0] mb-1.5 ml-0.5">.</span>
            </div>
          </div>
          <p className="font-black text-lg text-gray-900 uppercase tracking-widest italic">Target Missed</p>
          <p className="text-sm mt-2 text-gray-400 font-medium">Adjust your filters or price range to find your perfect match.</p>
        </div>
      )}
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-16 pb-8">
          {/* Prev Button */}
          <motion.button
            whileHover={currentPage !== 1 ? { scale: 1.1 } : {}}
            whileTap={currentPage !== 1 ? { scale: 0.95 } : {}}
            className={twMerge(
              "w-12 h-12 flex items-center justify-center rounded-full transition-colors duration-300 shadow-sm border border-gray-100",
              currentPage === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none border-none"
                : "bg-white text-black hover:bg-[#B91C1C] hover:text-white hover:border-[#B91C1C]"
            )}
            onClick={() => goToPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={20} />
          </motion.button>

          {/* Page Numbers */}
          <div className="flex items-center gap-3">
            {pageNumbers.map(page => {
              const isActive = page === currentPage;
              return (
                <motion.button
                  key={page}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => goToPage(page)}
                  className={twMerge(
                    "relative w-12 h-12 flex items-center justify-center rounded-full text-sm font-black transition-colors duration-300 z-10 border",
                    isActive ? "text-white border-transparent" : "text-black bg-white border-gray-100 shadow-sm hover:text-white hover:bg-[#B91C1C] hover:border-[#B91C1C]"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-pagination"
                      className="absolute inset-0 bg-[#B91C1C] rounded-full shadow-lg shadow-red-900/30 -z-10"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  {page}
                </motion.button>
              );
            })}
          </div>

          {/* Next Button */}
          <motion.button
            whileHover={currentPage !== totalPages ? { scale: 1.1 } : {}}
            whileTap={currentPage !== totalPages ? { scale: 0.95 } : {}}
            className={twMerge(
              "w-12 h-12 flex items-center justify-center rounded-full transition-colors duration-300 shadow-sm border border-gray-100",
              currentPage === totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none border-none"
                : "bg-white text-black hover:bg-[#B91C1C] hover:text-white hover:border-[#B91C1C]"
            )}
            onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            <ArrowRight size={20} />
          </motion.button>
        </div>
      )}

      {/* Page info */}
      {totalPages > 1 && (
        <p className="text-center text-xs text-gray-400 mt-4 font-medium uppercase tracking-widest">
          Page {currentPage} of {totalPages}
        </p>
      )}
        </main>
      </div>




      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes kenBurns {
          from { transform: scale(1.0); }
          to   { transform: scale(1.08); }
        }
      `}</style>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen items-center justify-center flex">Loading...</div>}>
      <ShopContent />
    </Suspense>
  );
}
