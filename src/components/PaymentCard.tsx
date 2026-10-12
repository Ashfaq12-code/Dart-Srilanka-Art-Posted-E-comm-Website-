'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PaymentCardProps {
  number: string;
  name: string;
  expiry: string;
  cvv: string;
  focused: string;
}

export const PaymentCard: React.FC<PaymentCardProps> = ({ number, name, expiry, cvv, focused }) => {
  const isFlipped = focused === 'cvv';

  const formatNumber = (num: string) => {
    const d = num.replace(/\D/g, '').padEnd(16, '•');
    return `${d.slice(0, 4)} ${d.slice(4, 8)} ${d.slice(8, 12)} ${d.slice(12, 16)}`;
  };

  return (
    <div className="perspective-1000 w-[300px] h-[190px] mx-auto lg:mx-0">
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
        className="relative w-full h-full preserve-3d"
      >
        {/* Front of Card */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-[20px] p-6 bg-gradient-to-br from-gray-900 to-black text-white shadow-2xl flex flex-col justify-between overflow-hidden">
          {/* Decorative pattern */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
          
          <div className="flex justify-between items-start relative z-10">
            <div className="w-10 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-md shadow-inner" />
            <div className="flex gap-1">
              <div className="w-8 h-8 rounded-full bg-red-500/80" />
              <div className="w-8 h-8 rounded-full bg-yellow-500/80 -ml-4" />
            </div>
          </div>

          <div className="relative z-10">
            <div className="text-gray-400 text-[8px] uppercase tracking-widest mb-1">Card Number</div>
            <div className="font-mono text-lg tracking-[0.2em]">{formatNumber(number)}</div>
          </div>

          <div className="flex justify-between items-end relative z-10">
            <div className="flex-1">
              <div className="text-gray-400 text-[8px] uppercase tracking-widest mb-1">Card Holder</div>
              <div className="text-xs font-bold uppercase tracking-wider truncate">{name || 'YOUR NAME'}</div>
            </div>
            <div className="w-12">
              <div className="text-gray-400 text-[8px] uppercase tracking-widest mb-1">Expires</div>
              <div className="text-xs font-bold">{expiry || 'MM/YY'}</div>
            </div>
          </div>
        </div>

        {/* Back of Card */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-[20px] bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 shadow-2xl flex flex-col py-6" style={{ transform: 'rotateY(180deg)' }}>
          <div className="w-full h-10 bg-black mb-4" />
          <div className="px-6 flex flex-col">
            <div className="text-right text-[8px] uppercase text-gray-500 mb-1 pr-2 tracking-widest">CVV</div>
            <div className="bg-white/10 h-8 rounded-lg flex items-center justify-end px-4 font-mono text-white tracking-widest italic border border-white/5">
              {cvv || '•••'}
            </div>
          </div>
          <div className="mt-auto px-6 h-4 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-full mx-4" />
        </div>
      </motion.div>
    </div>
  );
};
