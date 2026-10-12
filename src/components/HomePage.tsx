'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import { ProductCard } from '@/components/ProductCard';
import { ScrollReveal } from '@/components/ScrollReveal';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { MapSection } from '@/components/MapSection';
import { FAQSection } from '@/components/FAQSection';
import { ClientReviews } from '@/components/ClientReviews';
import { BrandMarquee } from '@/components/BrandMarquee';
import { ArchedBrands } from '@/components/ArchedBrands';
import { AdvantageCarousel } from '@/components/AdvantageCarousel';
import { GlobalMapSection } from '@/components/GlobalMapSection';
import { Button } from '@/components/ui/Button';

const HERO_SLIDES = [
  { id: 1, title: 'The Cinematic Experience.', subtitle: 'Immerse yourself in precision gear inspired by legendary ghost movies and blockbusters.', img: 'https://i.ibb.co/67d7DR85/Gemini-Generated-Image-cic1jfcic1jfcic1-removebg-preview-1.png', color: 'text-[#1e3a8a]', barColor: '#FB923C' }, // Orange
  { id: 2, title: 'Level Up Your Game.', subtitle: 'Equip yourself with the tools for legendary victories.', img: 'https://i.ibb.co/TDjJXMSD/Gemini-Generated-Image-2tsqmu2tsqmu2tsq-removebg-preview-1.png', color: 'text-[#B91C1C]', barColor: '#B91C1C' }, // Official Red
  { id: 3, title: 'Animated Precision.', subtitle: 'Vibrant, energetic style inspired by the most beloved cartoons & animation.', img: 'https://i.ibb.co/XfyhVrb9/Gemini-Generated-Image-gouhobgouhobgouh-removebg-preview-1.png', color: 'text-[#1a1a1a]', barColor: '#3B82F6' }  // Blue
];

const CATEGORIES_RAW = [
  { name: 'Vehicle Designs', type: 'Vehicle', path: '/designs/vehicle', image: 'https://i.ibb.co/wFRZmLDV/unnamed-2.jpg' },
  { name: 'Gamers Designs', type: 'Gamers', path: '/designs/gamers', image: 'https://i.ibb.co/TxVJgCf3/unnamed-4.jpg' },
  { name: 'Movie Designs', type: 'Movie', path: '/designs/movie', image: 'https://i.ibb.co/V01r90ZT/unnamed-5.jpg' },
  { name: 'Marvel Designs', type: 'Marvel', path: '/designs/marvel', image: 'https://i.ibb.co/KxbPwQvm/unnamed-6.jpg' },
  { name: 'Anime Designs', type: 'Anime', path: '/designs/anime', image: 'https://i.ibb.co/21hjDg7c/unnamed-7.jpg' },
  { name: 'Typographic', type: 'Typographic', path: '/designs/typographic', image: 'https://i.ibb.co/gMHWzg9z/unnamed-8.jpg' },
  { name: 'Marvel Designs', type: 'Marvel', path: '/designs/gamers', image: 'https://i.ibb.co/sJ3Bz7ZM/unnamed-9.jpg' },
  { name: 'Gamers Designs', type: 'Gamers', path: '/designs/movie', image: 'https://i.ibb.co/7d5vnb25/unnamed-10.jpg' },
  { name: 'Movie Designs', type: 'Movie', path: '/designs/movie', image: 'https://i.ibb.co/gFthvrHy/unnamed-11.jpg' },
  { name: 'Anime Designs', type: 'Anime', path: '/designs/movie', image: 'https://i.ibb.co/TMtmTz2q/unnamed-12.jpg' },
  { name: 'Movie Designs', type: 'Movie', path: '/designs/marvel', image: 'https://i.ibb.co/PsvnR22R/unnamed-13.jpg' },
  { name: 'Typographic', type: 'Typographic', path: '/designs/gamers', image: 'https://i.ibb.co/tpwMrS61/unnamed-14.jpg' },
  { name: 'Vehicle Designs', type: 'Vehicle', path: '/designs/typographic', image: 'https://i.ibb.co/wZ5MhQYf/unnamed-15.jpg' },

];

export const HomePage = () => {
  const { products } = useShop();

  const [currentSlide, setCurrentSlide] = useState(0);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  // Derive dynamic counts for categories + Shuffle for Real-time feel
  const CATEGORIES = useMemo(() => {
    const base = CATEGORIES_RAW.map(cat => ({
      ...cat,
      items: `${products.filter(p => p.type === cat.type).length} Products`
    }));
    return base;
  }, [products]);

  // Featured Edition Products: Random selection of 15 from catalog
  const [shuffledProducts, setShuffledProducts] = useState<any[]>([]);

  useEffect(() => {
    if (products.length > 0) {
      const shuffled = [...products]
        .sort(() => Math.random() - 0.5)
        .slice(0, 15)
        .map((p, i) => ({ ...p, instanceId: `instance_${i}` }));
      setShuffledProducts(shuffled);
    }
  }, [products]);

  useEffect(() => {
    const sliderTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);

    return () => {
      clearInterval(sliderTimer);
    };
  }, []);

  // AUTO SCROLL (CATEGORY)
  useEffect(() => {
    if (isHovering) return;

    const interval = setInterval(() => {
      if (!categoriesRef.current) return;

      const el = categoriesRef.current;
      const maxScroll = el.scrollWidth - el.clientWidth;

      if (el.scrollLeft >= maxScroll - 10) {
        el.scrollTo({ left: 0, behavior: 'auto' }); // Use auto here for instant reset
      } else {
        el.scrollBy({ left: 320, behavior: 'smooth' });
      }
    }, 5000); // More relaxed interval

    return () => clearInterval(interval);
  }, [isHovering]);

  const scrollLeftCategory = () => {
    categoriesRef.current?.scrollBy({ left: -250, behavior: 'smooth' });
  };

  const scrollRightCategory = () => {
    categoriesRef.current?.scrollBy({ left: 250, behavior: 'smooth' });
  };

  // MANUAL SCROLL BUTTONS (PRODUCTS)
  const scrollLeftProducts = () => {
    productsRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRightProducts = () => {
    productsRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <div className="w-full flex-col flex overflow-hidden bg-white dark:bg-transparent">

      {/* Hero Section Background Container */}
      <div className="relative">
        <div className="absolute top-0 left-0 right-0 h-[100vh] z-0 bg-[#f8fafc] dark:bg-transparent pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-[#f1f5f9] to-[#ffffff] dark:from-transparent dark:to-transparent" />
        </div>
      </div>

      <section className="relative h-screen min-h-[700px] w-full bg-transparent overflow-hidden -mt-32 pt-32">
        {/* Progress indicator handled by TopBar */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="absolute inset-0 z-0 flex flex-col md:flex-row items-start md:items-center justify-start md:justify-center max-w-7xl mx-auto px-4"
          >
            <div className="w-full md:w-1/2 z-20 pt-32 md:pt-0 px-2 md:px-0">
              <p className="text-black dark:text-gray-300 font-bold text-[9px] uppercase tracking-[0.3em] mb-4 opacity-70">New Arrival</p>
              <h1 className="text-4xl md:text-7xl font-black text-black dark:text-white mb-6 leading-[1.1] tracking-tighter">
                {HERO_SLIDES[currentSlide].title.split('.')[0]}.
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-sm md:text-lg mb-10 max-w-sm md:max-w-md leading-relaxed font-medium">
                {HERO_SLIDES[currentSlide].subtitle}
              </p>
              <Link href="/shop" className="block w-fit">
                <Button
                  size="lg"
                  variant="vogue"
                  className="w-fit min-w-[220px] rounded-full shadow-2xl transition-all duration-500 border-none group/btn px-10 md:px-12"
                  icon={<ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                  iconPosition="right"
                >
                  GET DART NOW
                </Button>
              </Link>
            </div>
            <div className="w-full md:w-1/2 h-[45vh] md:h-full relative flex items-center justify-center mt-auto md:mt-0 pb-16 md:pb-0">
              {/* Dynamic Realistic Back-glow - Bold & Polished (Optimized for Mobile) */}
              <motion.div
                key={`glow-${currentSlide}`}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 0.6, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                style={{ backgroundColor: HERO_SLIDES[currentSlide].barColor }}
                className="absolute w-[200px] h-[200px] md:w-[80%] md:h-[80%] rounded-full blur-[60px] md:blur-[140px] z-0"
              />
              <div className="absolute bottom-[20%] w-[60%] h-[20px] bg-black/10 rounded-[100%] blur-[12px]" />
              <img
                src={HERO_SLIDES[currentSlide].img}
                alt="Hero"
                referrerPolicy="no-referrer"
                className="max-h-full md:max-h-[66%] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.2)] z-10 transition-transform duration-1000"
              />
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-30">
          {HERO_SLIDES.map((slide, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-3 rounded-full transition-all duration-500 shadow-sm`}
              style={{
                width: i === currentSlide ? '32px' : '12px',
                backgroundColor: i === currentSlide ? slide.barColor : '#D1D5DB'
              }}
            />
          ))}
        </div>
      </section>

      {/* SHOP ESSENTIALS */}
      <section className="relative z-10 py-24 bg-white dark:bg-transparent">
        <div className="max-w-7xl mx-auto px-4 text-center mb-10">
          <h4 className="text-[#B91C1C] font-cursive text-3xl mb-2">~ Shop Essentials ~</h4>
          <h2 className="text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tighter"></h2>
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <button
            onClick={scrollLeftCategory}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white dark:bg-black shadow-lg p-3 rounded-full hover:scale-110 transition"
          >
            <ChevronLeft />
          </button>

          <button
            onClick={scrollRightCategory}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white dark:bg-black shadow-lg p-3 rounded-full hover:scale-110 transition"
          >
            <ChevronRight />
          </button>

          <div
            ref={categoriesRef}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="flex gap-6 overflow-x-auto scroll-smooth hide-scrollbar px-10"
          >
            {CATEGORIES.map((cat, i) => (
              <Link key={i} href={cat.path} className="min-w-[160px] text-center group">
                <div className="w-40 h-40 bg-gray-100 dark:bg-[#1a1a1a] rounded-2xl flex items-center justify-center overflow-hidden border border-transparent group-hover:border-[#B91C1C] transition-all duration-300">
                  <img 
                    src={cat.image} 
                    referrerPolicy="no-referrer" 
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                </div>
                <div className="mt-4">
                  <p className="font-black text-xs uppercase tracking-tighter text-black dark:text-white block h-8 leading-tight">{cat.name}</p>
                  <p className="text-[10px] font-bold text-[#B91C1C] uppercase tracking-widest mt-1 opacity-70 group-hover:opacity-100 transition-opacity">{cat.items}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <AdvantageCarousel />
      <ArchedBrands />

      {/* Weekly Offers Carousel */}
      <section className="relative z-10 py-16 bg-[#f8fafc] dark:bg-transparent">
        <div className="max-w-7xl mx-auto px-4">
          <ScrollReveal direction="up">
            <div className="text-center mb-10">
              <h4 className="text-[#B91C1C] font-cursive text-3xl mb-2">~ Visit Our Shop ~</h4>
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4 italic"></h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">Explore our exclusive collections drafted with elite precision and professional aesthetics.</p>
            </div>
          </ScrollReveal>

          <div className="relative group"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <button onClick={scrollLeftProducts} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 lg:-translate-x-5 w-10 h-10 lg:w-12 lg:h-12 bg-white dark:bg-[#1a0505] rounded-full shadow-lg flex items-center justify-center z-20 text-gray-600 dark:text-gray-300 hover:text-[#B91C1C] hover:scale-110 transition lg:opacity-0 lg:group-hover:opacity-100">
              <ChevronLeft size={20} />
            </button>
            <button onClick={scrollRightProducts} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 lg:translate-x-5 w-10 h-10 lg:w-12 lg:h-12 bg-white dark:bg-[#1a0505] rounded-full shadow-lg flex items-center justify-center z-20 text-gray-600 dark:text-gray-300 hover:text-[#B91C1C] hover:scale-110 transition lg:opacity-0 lg:group-hover:opacity-100">
              <ChevronRight size={20} />
            </button>
            <div ref={productsRef} className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 lg:flex lg:overflow-x-auto lg:gap-6 hide-scrollbar snap-x py-4 px-2">
              {shuffledProducts.map((product, i) => (
                <ScrollReveal key={product.instanceId} direction="up" delay={i * 50} className={`lg:min-w-[280px] lg:max-w-[280px] snap-center shrink-0 ${i >= 8 ? 'hidden lg:block' : ''}`}>
                  <ProductCard product={product} />
                </ScrollReveal>
              ))}
            </div>

            <div className="flex justify-center mt-10 md:mt-12">
              <Link href="/shop">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative px-8 md:px-10 py-3.5 md:py-4 bg-black dark:bg-white text-white dark:text-black rounded-full font-bold tracking-[0.15em] text-[10px] md:text-xs overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <div className="absolute inset-0 w-0 bg-[#B91C1C] group-hover:w-full transition-all duration-500 ease-out z-0" />
                  <span className="relative z-10 flex items-center gap-2">
                    SHOW MORE PRODUCTS
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <GlobalMapSection />
      <BrandMarquee />
      <ScrollReveal direction="up"><FAQSection /></ScrollReveal>
      <ScrollReveal direction="up"><ClientReviews /></ScrollReveal>
      <ScrollReveal direction="up">
        <section className="relative w-full mt-32">
          <div className="max-w-7xl mx-auto px-4 mb-16 text-center">
            <h4 className="text-[#B91C1C] font-cursive text-3xl mb-2">~ Our Location ~</h4>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter leading-none italic mb-6">
              <span className="text-red-600"></span>
            </h2>
            <div className="w-16 h-1 bg-red-600 mx-auto" />
          </div>

          <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden border-t border-gray-100 group shadow-[0_-20px_50px_-20px_rgba(0,0,0,0.05)]">
            <MapSection />
            <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-white/10 pointer-events-none" />
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
};
