'use client';

import React, { useState, useEffect } from 'react';
import { useShop } from '@/context/ShopContext';
import { X, MessageSquare, Check, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { generateProductWhatsAppLink, CustomerInfo } from '@/utils/whatsapp';

export const WhatsAppBookingDialog = () => {
  const { isBookingOpen, bookingProduct, closeBooking } = useShop();
  const [qty, setQty] = useState(1);
  const [selectedWeight, setSelectedWeight] = useState('22g');
  const [bookingSent, setBookingSent] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    firstName: '', lastName: '', address: '', city: '', postalCode: '', phone: '', email: ''
  });

  useEffect(() => {
    if (isBookingOpen) {
       setBookingSent(false);
       setErrors([]);
       setShowErrorPopup(false);
    }
  }, [isBookingOpen]);

  if (!isBookingOpen || !bookingProduct) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
    if (errors.includes(name)) setErrors(prev => prev.filter(err => err !== name));
  };

  const validate = () => {
    const required = ['firstName', 'lastName', 'phone', 'address', 'city'];
    const newErrors = required.filter(f => !customerInfo[f as keyof CustomerInfo]);
    setErrors(newErrors);
    if (newErrors.length > 0) {
        setShowErrorPopup(true);
        return false;
    }
    return true;
  };

  const handleSend = () => {
    if (!validate()) return;
    
    const link = generateProductWhatsAppLink(
      String(bookingProduct.id),
      bookingProduct.name,
      bookingProduct.price,
      selectedWeight,
      qty,
      customerInfo,
      typeof window !== 'undefined' && !window.location.origin.includes('localhost') ? window.location.origin : 'https://dartsrilanka.netlify.app'
    );
    window.open(link, '_blank');
    setBookingSent(true);
  };

  const isError = (f: string) => errors.includes(f);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={closeBooking}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      {/* Main Dialog */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative bg-white rounded-[40px] shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header - Image 2 Style */}
        <div className="bg-[#25D366] px-8 py-8 text-white flex justify-between items-center shrink-0">
           <div>
              <div className="flex items-center gap-3 mb-1">
                <MessageSquare size={28} />
                <h1 className="text-3xl font-black tracking-tight text-white">Confirm booking</h1>
              </div>
              <p className="text-white/90 text-[11px] font-medium tracking-wide">Secure your order via WhatsApp direct</p>
           </div>
           <button onClick={closeBooking} className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
              <X size={24} />
           </button>
        </div>

        {/* Content Area */}
        <div className="flex flex-col md:flex-row overflow-y-auto">
           {/* Product Sidebar */}
           <div className="md:w-1/3 bg-gray-50/50 p-10 border-r border-gray-100 flex flex-col items-center">
              <img src={bookingProduct.image} alt={bookingProduct.name} className="w-48 h-48 object-contain mb-8 drop-shadow-xl" />
              <div className="space-y-4 w-full">
                <h3 className="font-black text-sm text-gray-900 border-b border-gray-100 pb-2">{bookingProduct.name}</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-[11px] font-bold text-gray-500">
                    <span>Weight:</span> <span className="text-gray-900">{selectedWeight}</span>
                  </div>
                  <div className="flex justify-between text-[11px] font-bold text-gray-500">
                    <span>Quantity:</span> <span className="text-gray-900">{qty}</span>
                  </div>
                  <div className="flex justify-between text-[11px] font-bold text-gray-500">
                    <span>Price:</span> <span className="text-[#B91C1C] font-black italic">LKR Rs. {bookingProduct.price.toLocaleString()}</span>
                  </div>
                </div>
              </div>
           </div>

           {/* Form/Success Side */}
           <div className="md:w-2/3 p-10 md:p-14 relative min-h-[450px] flex flex-col">
              <AnimatePresence mode="wait">
                {bookingSent ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex-1 flex flex-col items-center justify-center text-center"
                  >
                     <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-8">
                        <Check size={48} className="text-[#25D366]" />
                     </div>
                     <h2 className="text-4xl font-black tracking-tight mb-4 italic">Request sent!</h2>
                     <p className="text-gray-500 text-[11px] font-medium tracking-wide leading-relaxed mb-12 max-w-xs">
                       We have received your request on WhatsApp.
                     </p>
                     <button 
                       onClick={() => { closeBooking(); }}
                       className="px-14 py-4.5 bg-black text-white font-bold tracking-widest text-[11px] rounded-full hover:bg-[#B91C1C] transition-all shadow-xl shadow-black/10"
                     >
                       Continue shopping
                     </button>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-8"
                  >
                     <h2 className="text-[12px] font-black tracking-wide text-gray-400 border-b border-gray-50 pb-4">Personal details</h2>
                     
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                           <label className="text-[10px] font-bold text-gray-400 ml-1">First name *</label>
                           <input name="firstName" value={customerInfo.firstName} onChange={handleInputChange} className={twMerge("w-full p-4.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm outline-none focus:bg-white focus:border-[#25D366] transition", isError('firstName') && "border-red-400 bg-red-50")} />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-bold text-gray-400 ml-1">Last name *</label>
                           <input name="lastName" value={customerInfo.lastName} onChange={handleInputChange} className={twMerge("w-full p-4.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm outline-none focus:bg-white focus:border-[#25D366] transition", isError('lastName') && "border-red-400 bg-red-50")} />
                        </div>
                     </div>

                     <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 ml-1">WhatsApp phone *</label>
                        <input name="phone" value={customerInfo.phone} onChange={handleInputChange} className={twMerge("w-full p-4.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm outline-none focus:bg-white focus:border-[#25D366] transition", isError('phone') && "border-red-400 bg-red-50")} placeholder="e.g. 077 123 4567" />
                     </div>

                     <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 ml-1">Delivery address *</label>
                        <input name="address" value={customerInfo.address} onChange={handleInputChange} className={twMerge("w-full p-4.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm outline-none focus:bg-white focus:border-[#25D366] transition", isError('address') && "border-red-400 bg-red-50")} />
                     </div>

                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                           <label className="text-[10px] font-bold text-gray-400 ml-1">City *</label>
                           <input name="city" value={customerInfo.city} onChange={handleInputChange} className={twMerge("w-full p-4.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm outline-none focus:bg-white focus:border-[#25D366] transition", isError('city') && "border-red-400 bg-red-50")} />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-bold text-gray-400 ml-1">Postal code</label>
                           <input name="postalCode" value={customerInfo.postalCode} onChange={handleInputChange} className="w-full p-4.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm outline-none focus:bg-white focus:border-[#25D366] transition" />
                        </div>
                     </div>

                     <button 
                       onClick={handleSend}
                       className="w-full py-5 bg-[#25D366] text-white font-black tracking-widest text-[12px] rounded-full hover:bg-black transition-all flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(37,211,102,0.2)] mt-4"
                     >
                       <MessageSquare size={20} />
                       Send WhatsApp booking
                     </button>
                  </motion.div>
                )}
              </AnimatePresence>
           </div>
        </div>
      </motion.div>

      {/* Internal Incomplete Form Popup */}
      <AnimatePresence>
        {showErrorPopup && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center px-4">
             <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               onClick={() => setShowErrorPopup(false)}
               className="absolute inset-0 bg-black/70 backdrop-blur-md"
             />
             <motion.div 
               initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
               className="relative bg-white p-12 max-w-sm w-full rounded-[40px] text-center shadow-2xl"
             >
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-8">
                    <AlertCircle size={44} className="text-[#B91C1C]" />
                </div>
                <h3 className="text-3xl font-black tracking-tight italic mb-4">Incomplete form</h3>
                <p className="text-gray-500 text-[11px] mb-12 leading-relaxed font-bold tracking-wide">
                  Please fill in all required fields marked in red to proceed.
                </p>
                <button 
                  onClick={() => setShowErrorPopup(false)}
                  className="w-full py-5 bg-black text-white font-black tracking-widest text-[11px] rounded-full hover:bg-[#B91C1C] transition-colors shadow-lg shadow-black/10"
                >
                  Return and fix
                </button>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
