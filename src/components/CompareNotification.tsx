'use client';
import { useShop } from '@/context/ShopContext';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CompareNotification = () => {
  const { isCompareOpen, compareProduct, closeCompare, addToCart, openQuickView } = useShop();

  return (
    <AnimatePresence>
      {isCompareOpen && compareProduct && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-2xl bg-white text-black p-6 rounded-2xl shadow-2xl border border-gray-200"
        >
          <div className="flex justify-between items-start mb-6 border-b border-gray-100 pb-4">
            <div>
              <h4 className="text-xl font-bold text-gray-900 tracking-tight">Product Comparison</h4>
              <p className="text-xs text-gray-500 mt-1">Inspecting Spec Sheet</p>
            </div>
            <button onClick={closeCompare} className="p-2 text-gray-400 hover:text-black hover:bg-gray-50 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="grid grid-cols-[100px_1fr] gap-6 items-center bg-gray-50 p-6 rounded-xl border border-gray-100 mb-6">
            <div className="aspect-square bg-white rounded-lg overflow-hidden border border-gray-200 p-2">
              <img src={compareProduct.image} className="w-full h-full object-contain mix-blend-multiply" alt={compareProduct.name} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4 leading-tight">{compareProduct.name}</h3>
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                <div>
                  <p className="text-xs text-gray-500 font-medium mb-1">Material</p>
                  <p className="text-sm font-bold text-gray-900">{compareProduct.material || 'Premium Acrylic'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium mb-1">Thickness</p>
                  <p className="text-sm font-bold text-gray-900">{compareProduct.weight || '10mm - 12mm'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium mb-1">Style</p>
                  <p className="text-sm font-bold text-gray-900">{compareProduct.style || 'High Performance'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium mb-1">Availability</p>
                  <p className="text-sm font-bold text-green-600">In Stock</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => { closeCompare(); openQuickView(compareProduct); }}
              className="flex-1 h-12 text-sm font-bold rounded border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              View Specs
            </button>
            <button
              onClick={() => { addToCart(compareProduct); closeCompare(); }}
              className="flex-1 h-12 bg-black hover:bg-gray-800 text-white text-sm font-bold rounded transition-colors"
            >
              Quick Add
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
