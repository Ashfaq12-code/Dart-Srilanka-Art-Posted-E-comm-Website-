'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Star, LayoutGrid, ChevronRight } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { ScrollReveal } from '@/components/ScrollReveal';
import { useShop } from '@/context/ShopContext';
import { notFound } from 'next/navigation';

const DESIGN_DATA: Record<string, { title: string; subtitle: string; bg: string; description: string; accent: string }> = {
  'vehicle': {
    title: 'Vehicle Design',
    subtitle: 'High-Octane Performance Aesthetic',
    bg: 'https://rukmini1.flixcart.com/image/1500/1500/xif0q/poster/e/m/r/small-porsche-car-mdf-panels-posters-gift-items-for-boys-room-original-imahfg98u3scgq6z.jpeg?q=70',
    description: 'Precision engineered visuals for those who live life in the fast lane. Our vehicle-inspired darts bring the sleek lines and professional finish of high-end automotive design to your game.',
    accent: '#B91C1C'
  },
  'gamers': {
    title: 'Gamers Design',
    subtitle: 'Level Up Your Game',
    bg: 'https://i.ibb.co/SDV56MdC/Gemini-Generated-Image-b9kmhbb9kmhbb9km.png',
    description: 'Immersive aesthetics inspired by modern gaming culture. From RGB-inspired highlights to futuristic industrial patterns, these designs are for the digital athlete.',
    accent: '#7C3AED'
  },
  'movie': {
    title: 'Movie Design',
    subtitle: 'Cinematic Precision',
    bg: 'https://i.ibb.co/8g3hHndb/Gemini-Generated-Image-8j4hzu8j4hzu8j4h.png',
    description: 'Bring the magic of the silver screen to the oche. Our movie-inspired collection features dramatic contrasts and iconic visual themes that make every throw a blockbuster moment.',
    accent: '#EA580C'
  },
  'marvel': {
    title: 'Marvel Design',
    subtitle: 'Superhuman Accuracy',
    bg: 'https://i.ibb.co/MmnhQ4W/image-3-1.png',
    description: 'Unleash your inner hero with designs inspired by the world\'s mightiest protectors. Bold colors and legendary patterns that command respect on the dartboard.',
    accent: '#DC2626'
  },
  'anime': {
    title: 'Anime Design',
    subtitle: 'Stunning Visual Artistry',
    bg: 'https://i.ibb.co/nNwN4Ld0/Gemini-Generated-Image-haem4lhaem4lhaem.png',
    description: 'Vibrant, energetic, and masterfully crafted. Our anime collection captures the dynamic spirit and unique artistic style that defines the most beloved animated epics.',
    accent: '#DB2777'
  },
  'typographic': {
    title: 'Typographic Design',
    subtitle: 'Modern Minimalist Grit',
    bg: 'https://i.ibb.co/XrnX1R0K/Gemini-Generated-Image-r25ykrr25ykrr25y.png',
    description: 'Clean lines, bold fonts, and minimalist perfection. Typographic designs for those who appreciate the beauty of form, function, and clear communication.',
    accent: '#111827'
  }
};

export default function DesignClient({ slug }: { slug: string }) {
  const data = DESIGN_DATA[slug.toLowerCase()];
  const { products } = useShop();

  if (!data) return notFound();

  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

  useEffect(() => {
    const base = products.filter(p => (p as any).type?.toLowerCase() === slug.toLowerCase());
    // Shuffle the array only on the client to avoid hydration mismatch
    setFilteredProducts([...base].sort(() => Math.random() - 0.5).slice(0, 8));
  }, [products, slug]);

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-20">
      {/* Hero Header */}
      <div className="relative w-full h-[600px] flex items-center justify-center overflow-hidden">
        <img
          src={data.bg}
          alt={data.title}
          className="absolute inset-0 w-full h-full object-cover contrast-[1.05] brightness-[1.02]"
        />
        {/* Subtle overlay for text readability only - very light */}
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#f8fafc]" />

        <div className="relative z-10 text-center px-4 max-w-4xl">
          <ScrollReveal direction="down">
            <span className="inline-block px-8 py-3 rounded-none bg-white text-black text-[20px] font-black uppercase tracking-[0.5em] mb-8 shadow-2xl">
              DARTS
            </span>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={200}>
            <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none mb-4 drop-shadow-2xl">
              {data.title}
            </h1>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={400}>
            <p className="text-xl md:text-2xl text-white/90 font-medium tracking-wide uppercase">
              {data.subtitle}
            </p>
          </ScrollReveal>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-20 relative z-20">
        <div className="bg-white rounded-none p-8 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-normal text-slate-700 mb-6 leading-tight" style={{ fontFamily: 'var(--font-dancing-script)' }}>
                {data.title} <br />
                <span className="text-[#B91C1C]">Expertly Crafted</span>
              </h2>
              <p className="text-gray-500 leading-relaxed mb-8 text-lg">
                {data.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href={`/shop?cat=${data.title.split(' ')[0]}`}
                  className="px-8 py-4 bg-black text-white rounded-none font-black uppercase text-xs tracking-widest hover:bg-[#B91C1C] transition-all flex items-center gap-3 group"
                >
                  Shop Full Collection
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <div className="flex items-center gap-2 px-6 py-4 bg-gray-50 rounded-none">
                  <Star className="text-yellow-400 fill-yellow-400" size={16} />
                  <span className="text-xs font-black uppercase text-black">GET YOUR DARTS NOW</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-square bg-gray-100 rounded-none overflow-hidden group">
                  <img src={data.bg} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-110" alt="Preview" />
                </div>
                <div className="aspect-[4/5] bg-neutral-900 rounded-none p-8 flex flex-col justify-end text-white">
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-2">Next Gen</p>
                  <h4 className="text-xl font-black uppercase leading-tight">Elite Designs</h4>
                </div>
              </div>
              <div className="space-y-4 pt-12">
                <div className="aspect-[4/5] bg-[#B91C1C] rounded-none p-8 flex flex-col justify-between text-white">
                  <LayoutGrid size={32} />
                  <h4 className="text-xl font-black uppercase leading-tight">Unique Skins</h4>
                </div>
                <div className="aspect-square bg-gray-100 rounded-none overflow-hidden group">
                  <img src={data.bg} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-110" alt="Preview" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="mt-32">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <p className="text-[#B91C1C] font-black uppercase tracking-[0.3em] text-[11px] mb-2">Featured Products</p>
              <h3 className="text-4xl md:text-5xl font-black uppercase text-black tracking-tight tracking-tight">Best in {data.title}</h3>
            </div>
            <Link href="/shop" className="text-xs font-black uppercase tracking-widest text-gray-400 hover:text-black transition flex items-center gap-2 pb-1 border-b-2 border-transparent hover:border-black">
              View All Products <ChevronRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((p, i) => (
                <ScrollReveal key={(p as any).id} direction="up" delay={0} duration={250} distance={15}>
                  <ProductCard product={p as any} />
                </ScrollReveal>
              ))
            ) : (
              <div className="col-span-full py-20 text-center bg-white rounded-none border border-dashed border-gray-200">
                <p className="text-gray-400 font-bold uppercase tracking-widest">New arrivals coming soon</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
