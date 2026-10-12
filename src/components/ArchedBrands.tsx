import React from 'react';
import { motion } from 'framer-motion';

const BRANDS = [
  'STEALTH', 'TITANIUM', 'VORTEX', 'APEX', 'NEXUS',
  'OBSIDIAN', 'QUANTUM', 'ECLIPSE', 'PHANTOM', 'ZENITH'
];

export const ArchedBrands = () => {
  const [radius, setRadius] = React.useState(320);
  const [containerHeight, setContainerHeight] = React.useState(450);

  React.useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth < 768) {
        setRadius(140);
        setContainerHeight(350);
      } else {
        setRadius(320);
        setContainerHeight(450);
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <section className="relative py-24 md:py-32 bg-white dark:bg-[#0a0a0a] overflow-hidden border-t border-gray-100 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 relative z-20 text-center">
        <div className="mb-12 md:mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[10px] uppercase tracking-[0.6em] font-black text-[#B91C1C] mb-4"
          >
            Elite Partners
          </motion.p>
          <h2 className="text-2xl md:text-5xl font-black text-black dark:text-white uppercase tracking-tighter max-w-2xl mx-auto leading-none">
            Global Design Network <br className="hidden md:block" /> & <span className="text-[#B91C1C]">Roadmap</span>
          </h2>
        </div>

        <div className="relative flex items-center justify-center -mt-6 md:-mt-10" style={{ height: containerHeight }}>
          {/* Static Decoration Rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[800px] h-[350px] md:h-[800px] border-[1px] border-dashed border-gray-100 dark:border-white/5 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] md:w-[600px] h-[280px] md:h-[600px] border-[1px] border-gray-200/50 dark:border-white/10 rounded-full" />

          {/* Central Hub */}
          <div className="relative z-30 group">
            <div className="w-20 h-20 md:w-28 md:h-28 bg-black dark:bg-white rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(0,0,0,0.1)] dark:shadow-[0_0_50px_rgba(255,255,255,0.05)] group-hover:scale-110 transition-transform duration-500 border-[4px] md:border-[6px] border-black dark:border-white">
              <span className="text-white dark:text-black font-black text-2xl md:text-4xl tracking-tighter">D.</span>
            </div>
            <div className="absolute inset-0 bg-[#B91C1C] rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
          </div>

          {/* Rotating Brands Container */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 flex items-center justify-center p-2"
          >
            {BRANDS.map((brand, i) => {
              const total = BRANDS.length;
              const angle = (i / total) * 360;

              return (
                <div
                  key={`${brand}-${i}`}
                  className="absolute"
                  style={{
                    transform: `rotate(${angle}deg) translateY(-${radius}px)`
                  }}
                >
                  {/* Counter-rotating child to keep text upright */}
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, y: -10 }}
                      className="group flex flex-col items-center cursor-pointer px-3 py-1.5 md:px-5 md:py-2.5 bg-white/80 dark:bg-black/40 backdrop-blur-xl border border-gray-100 dark:border-white/10 rounded-lg md:rounded-xl shadow-lg hover:border-[#B91C1C] transition-all duration-300"
                    >
                      <span className="text-[9px] md:text-sm font-black tracking-tight text-gray-500 dark:text-white/30 group-hover:text-black dark:group-hover:text-white transition-colors uppercase italic whitespace-nowrap">
                        {brand}
                      </span>
                    </motion.div>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Decorative Gradient Overlay to hide brands when they go below half circle if desired */}
      {/* But user usually likes to see the full rotation if it's "roadmap" */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-[#0a0a0a] to-transparent z-40 pointer-events-none" />
    </section>
  );
};
