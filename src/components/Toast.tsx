'use client';

import React from 'react';
import { useShop } from '@/context/ShopContext';
import { CheckCircle, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Toast = () => {
  const { notification } = useShop();

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] pointer-events-none">
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="flex items-center gap-4 bg-black/90 backdrop-blur-xl text-white px-8 py-5 rounded-[25px] shadow-2xl border border-white/10 pointer-events-auto min-w-[320px]"
          >
            <div className={notification.type === 'success' ? "text-[#B91C1C]" : "text-blue-400"}>
              {notification.type === 'success' ? <CheckCircle size={24} strokeWidth={2.5} /> : <Info size={24} strokeWidth={2.5} />}
            </div>
            
            <div className="flex-1">
                <p className="text-[11px] font-black uppercase tracking-[0.15em]">
                    {notification.message}
                </p>
            </div>

            <div className="w-px h-6 bg-white/10 mx-2" />
            
            <button className="text-white/40 hover:text-white transition">
                <X size={16} strokeWidth={3} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
