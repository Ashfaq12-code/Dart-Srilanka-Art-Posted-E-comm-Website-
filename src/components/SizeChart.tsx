'use client';

import React from 'react';
import { X, Check, Info, Ruler, Zap, Truck, ShieldCheck, Box } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

interface SizeChartProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSize?: string;
  onSelectSize?: (size: string) => void;
}

const ACRYLIC_SIZES = [
  { size: '12 x 18 Inches', price: 'Rs. 4,900', tier: 'Standard', desc: 'Ideal for compact spaces, bedrooms, or starter collections.', features: ['8mm Thickness', 'UV Resistant', 'Glossy Finish'], color: '#3B82F6' },
  { size: '12 x 18 Inches (Premium)', price: 'Rs. 5,900', tier: 'Premium', desc: 'Enhanced clarity and premium edge polishing for a sleek look.', features: ['10mm Thickness', 'Diamond Polishing', 'Ultra-Vivid'], color: '#10B981' },
  { size: '16 x 24 Inches', price: 'Rs. 7,900', tier: 'Studio Choice', desc: 'The perfect mid-size for living rooms and office setups.', features: ['10mm Thickness', 'High Precision', 'Vibrant Edge'], color: '#F59E0B' },
  { size: '20 x 30 Inches', price: 'Rs. 10,400', tier: 'Masterpiece', desc: 'Our grandest size for maximum visual impact and luxury feel.', features: ['12mm Thickness', 'Gallery Grade', 'Edge-to-Edge'], color: '#B91C1C' },
];

export function SizeChart({ isOpen, onClose, selectedSize, onSelectSize }: SizeChartProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative bg-white rounded-[40px] w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-[0_0_100px_rgba(185,28,28,0.1)] flex flex-col border border-gray-100">
        
        {/* Header */}
        <div className="bg-black px-8 py-6 flex items-center justify-between shrink-0 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 blur-sm pointer-events-none">
             <Ruler size={120} className="text-white rotate-12" />
          </div>
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-[#B91C1C] flex items-center justify-center shadow-lg shadow-red-500/20">
              <Ruler size={22} className="text-white" />
            </div>
            <div>
              <h2 className="text-white font-black text-xl italic uppercase tracking-tighter">Acrylic <span className="text-[#B91C1C]">Size Guide.</span></h2>
              <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em]">Select your perfect masterpiece</p>
            </div>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#B91C1C] transition-all text-white relative z-10">
            <X size={20} />
          </button>
        </div>

        {/* Delivery Alert */}
        <div className="bg-[#B91C1C]/5 px-8 py-3 border-b border-[#B91C1C]/10 flex items-center justify-center gap-3">
            <Truck size={16} className="text-[#B91C1C]" />
            <p className="text-[10px] font-black text-[#B91C1C] uppercase tracking-widest">Flat Delivery Charge: Rs. 800 Island-wide</p>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 custom-scrollbar p-6 space-y-4">
          <p className="text-center text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">
            Compare our professional sizing and pricing tiers
          </p>

          {ACRYLIC_SIZES.map(item => {
            const isSel = selectedSize === item.size;
            return (
              <div
                key={item.size}
                onClick={() => onSelectSize?.(item.size)}
                className={twMerge(
                  'group flex flex-col md:flex-row items-start md:items-center gap-6 p-6 rounded-[32px] border-2 transition-all duration-500 cursor-pointer relative overflow-hidden',
                  isSel ? 'border-[#B91C1C] bg-red-50/50' : 'border-gray-50 bg-gray-50/50 hover:border-gray-200'
                )}
              >
                {/* Size Visualizer Background */}
                <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                   <Box size={140} />
                </div>

                <div className="w-full md:w-32 h-20 rounded-2xl bg-white border border-gray-100 flex flex-col items-center justify-center shadow-sm shrink-0 group-hover:scale-105 transition-transform duration-500">
                    <span className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Dimensions</span>
                    <span className="font-black text-sm text-gray-900">{item.size.split(' ')[0]} x {item.size.split(' ')[2]}</span>
                </div>

                <div className="flex-1 min-w-0 relative z-10">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="font-black text-base text-gray-900 italic uppercase tracking-tight">{item.size}</h3>
                    <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-white border border-gray-100 shadow-sm text-[#B91C1C]">
                      {item.tier}
                    </span>
                  </div>
                  <p className="text-[11px] font-bold text-gray-500 mb-4 leading-relaxed line-clamp-2">{item.desc}</p>
                  <div className="flex flex-wrap gap-3">
                    {item.features.map(f => (
                      <span key={f} className="flex items-center gap-1 text-[9px] font-black text-gray-400 uppercase tracking-widest bg-gray-100/50 px-2 py-1 rounded-lg">
                        <Check size={10} className="text-[#B91C1C]" /> {f}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2 shrink-0 w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-gray-100">
                   <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Base Price</span>
                   <span className="text-xl font-black text-[#B91C1C] italic">{item.price}</span>
                   {isSel && (
                     <div className="w-6 h-6 rounded-full bg-[#B91C1C] flex items-center justify-center text-white scale-110 shadow-lg shadow-red-500/20">
                        <Check size={14} strokeWidth={3} />
                     </div>
                   )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Info */}
        <div className="px-8 py-6 border-t border-gray-100 bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                   {[1,2,3].map(i => (
                     <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                     </div>
                   ))}
                </div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">1,200+ Studio Orders Complete</p>
            </div>
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <ShieldCheck size={16} className="text-green-500" />
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Secure Product</span>
                </div>
                <button 
                  onClick={onClose}
                  className="px-10 py-4 bg-black text-white font-black uppercase italic tracking-[0.2em] text-[10px] rounded-2xl hover:bg-[#B91C1C] transition-all active:scale-95 shadow-xl shadow-black/5"
                >
                  {selectedSize ? 'Confirm Selection' : 'Close Guide'}
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}
