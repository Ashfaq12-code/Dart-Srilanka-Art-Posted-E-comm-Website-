import React, { useState } from 'react';

const BRANDS = [
  { id: 1, name: 'STEALTH', image: '' },
  { id: 2, name: 'TITANIUM', image: '' },
  { id: 3, name: 'VORTEX', image: '' },
  { id: 4, name: 'APEX', image: '' },
  { id: 5, name: 'NEXUS', image: '' },
  { id: 6, name: 'OBSIDIAN', image: '' },
  { id: 7, name: 'QUANTUM', image: '' },
  { id: 8, name: 'ECLIPSE', image: '' },
  { id: 9, name: 'PHANTOM', image: '' },
  { id: 10, name: 'ZENITH', image: '' },
];

export const BrandMarquee = () => {
  const [isHovered, setIsHovered] = useState(false);

  // Duplicate the array to create a seamless infinite loop
  const duplicatedBrands = [...BRANDS, ...BRANDS, ...BRANDS];

  return (
    <section className="py-20 bg-white dark:bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-10 text-center">
        <h2 className="text-sm font-bold tracking-[0.2em] text-red-700 dark:text-gray-500 uppercase">
          Trusted by Partners
        </h2>
      </div>

      <div
        className="relative w-full flex items-center h-40 overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Left and Right Gradients for smooth fade in/out */}
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-white dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

        <style>
          {`
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-33.3333%); }
            }
            .animate-marquee {
              animation: marquee 20s linear infinite;
              display: flex;
              width: max-content;
            }
            .animate-marquee:hover {
              animation-play-state: paused;
            }
          `}
        </style>

        <div className="flex w-max animate-marquee">
          {duplicatedBrands.map((brand, idx) => (
            <div
              key={`${brand.id}-${idx}`}
              className="flex items-center justify-center mx-8 w-48 h-24 group transition-all duration-500 cursor-pointer"
            >
              <div className="relative w-full h-full flex items-center justify-center filter grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                {brand.image ? (
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <span className="font-serif italic font-black text-4xl tracking-tighter text-black dark:text-white drop-shadow-sm group-hover:scale-110 group-hover:text-[#B91C1C] dark:group-hover:text-[#B91C1C] transition-all duration-300">
                    {brand.name}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
