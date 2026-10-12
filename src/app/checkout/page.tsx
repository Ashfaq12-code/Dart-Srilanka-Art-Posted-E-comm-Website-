'use client';

import React, { useState } from 'react';
import { useShop } from '@/context/ShopContext';
import { CheckCircle2, ChevronRight, X, CreditCard, MessageSquare, Loader2, AlertCircle, Landmark, ShieldCheck } from 'lucide-react';
import { generateOrderWhatsAppLink } from '@/utils/whatsapp';
import { twMerge } from 'tailwind-merge';
import { PaymentCard } from '@/components/PaymentCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cartItems, clearCart } = useShop();
  // We'll mimic the layout using 'cc', 'whatsapp', 'mintpay'
  const [paymentMethod, setPaymentMethod] = useState<'cc' | 'whatsapp' | 'mintpay'>('whatsapp');
  const [focusedField, setFocusedField] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showSecurityAlert, setShowSecurityAlert] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [bookedOrder, setBookedOrder] = useState<any>(null);

  // Form State
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    postalCode: '',
    phone: '',
    ccNum: '',
    ccName: '',
    ccExp: '',
    ccCvv: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors.includes(name)) {
      setErrors(prev => prev.filter(err => err !== name));
    }
  };

  const parsePrice = (priceStr: string | number) => {
    if (typeof priceStr === 'number') return priceStr;
    return parseInt(priceStr.replace(/[^0-9]/g, '')) || 0;
  };

  const total = cartItems.reduce((sum, item) => sum + (parsePrice(item.price) * (item.quantity || 1)), 0);
  const shipping = 800;

  const validateForm = () => {
    const newErrors: string[] = [];
    const required = ['firstName', 'lastName', 'address', 'city', 'phone', 'email'];
    required.forEach(field => {
        if (!formData[field as keyof typeof formData]) newErrors.push(field);
    });
    setErrors(newErrors);
    if (newErrors.length > 0) {
        setShowErrorPopup(true);
        return false;
    }
    return true;
  };

  const handlePlaceOrder = () => {
     if (!validateForm()) return;
     
     if (paymentMethod === 'whatsapp') {
         const items = cartItems.map(item => ({
             id: item.id,
             name: item.name,
             price: item.price.toString(),
             quantity: item.quantity || 1
         }));
         const baseUrl = typeof window !== 'undefined' && !window.location.origin.includes('localhost') ? window.location.origin : 'https://dartsrilanka.netlify.app';
         const link = generateOrderWhatsAppLink(items, formData, total, shipping, baseUrl);
         window.open(link, '_blank');
         
         setBookedOrder({ items: [...cartItems], subtotal: total, shipping: shipping });
         setIsSuccess(true);
         setTimeout(() => {
             clearCart();
         }, 1000);
     } else {
         // Show Enterprise Hardening Alert
         setShowSecurityAlert(true);
     }
  };

  const isError = (field: string) => errors.includes(field);

  if (isSuccess) {
    return (
        <div className="min-h-screen bg-[#fafafa] flex flex-col items-center justify-center p-4 pt-32 pb-20">
            <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white border border-gray-200 overflow-hidden w-full max-w-4xl shadow-2xl shadow-black/5 rounded-3xl"
            >
                {/* Header Sub-section */}
                <div className="px-8 md:px-12 py-10 md:py-12 border-b border-gray-100 flex flex-col items-center text-center">
                   <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 size={32} className="text-white" />
                   </div>
                   <h1 className="text-3xl md:text-4xl font-black tracking-tight text-gray-900 mb-3">Order Confirmed</h1>
                   <p className="text-gray-500 text-sm md:text-base font-medium max-w-lg mx-auto">
                        {paymentMethod === 'whatsapp' 
                            ? 'Your booking request has been securely sent to our team via WhatsApp.' 
                            : 'Thank you for your purchase. We have received your order securely.'}
                   </p>
                </div>

                <div className="flex flex-col md:flex-row bg-gray-50/50">
                   {/* Left column: product data */}
                   <div className="p-8 md:p-12 md:w-[55%] border-b md:border-b-0 md:border-r border-gray-200">
                      <h3 className="text-[11px] font-black tracking-[0.2em] text-gray-400 mb-8 uppercase">Order Summary</h3>
                      
                      <div className="space-y-6 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar mb-8">
                         {bookedOrder?.items?.map((item: any) => (
                            <div key={item.cartId} className="flex gap-4 items-start">
                               <div className="w-20 h-20 bg-white border border-gray-200 rounded-xl flex items-center justify-center shrink-0 p-2 shadow-sm">
                                  <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                               </div>
                               <div className="min-w-0 flex-1">
                                  <p className="font-bold text-sm text-gray-900 line-clamp-2 leading-snug mb-1">{item.name}</p>
                                  {item.description && <p className="text-[11px] text-gray-500 line-clamp-1 mb-1">{item.description}</p>}
                                  <p className="text-[11px] text-gray-500 font-medium mb-1">Size: {item.selectedSize || 'Standard'}</p>
                                  <p className="text-[11px] text-gray-500 font-medium">Qty: {item.quantity || 1}</p>
                               </div>
                               <div className="text-sm font-bold text-gray-900 whitespace-nowrap pl-4 pt-1">
                                  Rs {(parsePrice(item.price) * (item.quantity || 1)).toLocaleString()}.00
                               </div>
                            </div>
                         ))}
                      </div>

                      <div className="pt-6 border-t border-gray-200 space-y-4">
                         <div className="flex justify-between items-center text-gray-500 font-medium text-sm">
                            <span>Subtotal</span>
                            <span>Rs {bookedOrder?.subtotal?.toLocaleString()}.00</span>
                         </div>
                         <div className="flex justify-between items-center text-gray-500 font-medium text-sm">
                            <span>Shipping</span>
                            <span>Rs {bookedOrder?.shipping?.toFixed(2)}</span>
                         </div>
                         <div className="flex justify-between items-center text-gray-900 font-black text-xl pt-2 border-t border-gray-100 mt-2">
                            <span>Total</span>
                            <span>Rs {(bookedOrder?.subtotal + bookedOrder?.shipping)?.toLocaleString()}.00</span>
                         </div>
                      </div>
                   </div>

                   {/* Right column: Info & Actions */}
                   <div className="p-8 md:p-12 md:w-[45%] flex flex-col justify-between bg-white">
                       <div>
                           <h3 className="text-[11px] font-black tracking-[0.2em] text-gray-400 mb-8 uppercase">Order Information</h3>
                           
                           <div className="space-y-6">
                               <div>
                                   <p className="text-[10px] text-gray-400 font-bold mb-1.5 uppercase tracking-widest">Contact</p>
                                   <p className="text-sm text-gray-900 font-semibold">{formData.email || 'Email missing'}</p>
                               </div>
                               <div>
                                   <p className="text-[10px] text-gray-400 font-bold mb-1.5 uppercase tracking-widest">Delivery Address</p>
                                   <p className="text-sm text-gray-900 font-semibold leading-relaxed">
                                       {formData.firstName} {formData.lastName}<br/>
                                       {formData.address}{formData.apartment ? `, ${formData.apartment}` : ''}<br/>
                                       {formData.city}{formData.postalCode ? ` ${formData.postalCode}` : ''}
                                   </p>
                               </div>
                               <div>
                                   <p className="text-[10px] text-gray-400 font-bold mb-1.5 uppercase tracking-widest">Payment Method</p>
                                   <p className="text-sm text-gray-900 font-semibold">{paymentMethod === 'whatsapp' ? 'WhatsApp Booking' : 'PayHere Secure'}</p>
                               </div>
                           </div>
                       </div>
                       
                       <div className="mt-12 pt-8 border-t border-gray-100">
                           <Link href="/shop" className="block w-full">
                               <button className="w-full py-4 bg-black text-white font-bold text-sm rounded-2xl hover:bg-[#B91C1C] transition-all shadow-lg shadow-black/10">
                                 Continue Shopping
                               </button>
                           </Link>
                       </div>
                   </div>
                </div>
            </motion.div>
        </div>
    );
  }

  return (
    <div className="bg-white min-h-screen flex flex-col lg:flex-row pt-20">
      
      {/* LEFT COLUMN: Forms */}
      <div className="w-full lg:w-[55%] xl:w-[60%] flex justify-end bg-white relative">
        <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[1px] bg-gray-200" />
        
        <div className="w-full max-w-xl px-4 lg:px-12 py-10">
          <Link href="/"><h1 className="text-2xl font-bold tracking-tight mb-8">Dart Sri Lanka</h1></Link>

          {/* Contact Section */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900">Contact</h2>
                <Link href="#" className="text-sm text-blue-600 hover:underline">Sign in</Link>
            </div>
            <input 
               type="text" 
               name="email" 
               value={formData.email} 
               onChange={handleInputChange} 
               placeholder="Email *" 
               className={twMerge("w-full p-3.5 border rounded-md text-sm outline-none transition mb-3", isError('email') ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-black')}
            />
            <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black" />
                <span className="text-sm text-gray-700">Email me with news and offers</span>
            </label>
          </div>

          {/* Delivery Section */}
          <div className="mb-10">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Delivery</h2>
            <div className="space-y-3">
               <div>
                  <select className="w-full p-3.5 border border-gray-300 rounded-md text-sm outline-none focus:border-black bg-white">
                      <option>Sri Lanka</option>
                  </select>
               </div>
               <div className="grid grid-cols-2 gap-3">
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="First name *" className={twMerge("w-full p-3.5 border rounded-md text-sm outline-none transition", isError('firstName') ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-black')} />
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Last name *" className={twMerge("w-full p-3.5 border rounded-md text-sm outline-none transition", isError('lastName') ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-black')} />
               </div>
               <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Address *" className={twMerge("w-full p-3.5 border rounded-md text-sm outline-none transition", isError('address') ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-black')} />
               <input type="text" name="apartment" value={formData.apartment} onChange={handleInputChange} placeholder="Apartment, suite, etc. (optional)" className="w-full p-3.5 border border-gray-300 rounded-md text-sm outline-none focus:border-black" />
               <div className="grid grid-cols-2 gap-3">
                  <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="City *" className={twMerge("w-full p-3.5 border rounded-md text-sm outline-none transition", isError('city') ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-black')} />
                  <input type="text" name="postalCode" value={formData.postalCode} onChange={handleInputChange} placeholder="Postal code (optional)" className="w-full p-3.5 border border-gray-300 rounded-md text-sm outline-none focus:border-black" />
               </div>
               <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="WhatsApp phone number *" className={twMerge("w-full p-3.5 border rounded-md text-sm outline-none transition", isError('phone') ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-black')} />
            </div>
          </div>

          {/* Shipping Method */}
          <div className="mb-10">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Shipping method</h2>
            <div className="border border-black bg-gray-50 rounded-md p-4 flex justify-between items-center cursor-pointer">
                <span className="text-sm font-medium text-gray-800">Standard</span>
                <span className="text-sm font-bold text-gray-900">Rs {(shipping).toFixed(2)}</span>
            </div>
          </div>

          {/* Payment */}
          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-1">Payment</h2>
            <p className="text-sm text-gray-500 mb-4">All transactions are secure and encrypted.</p>
            
            <div className="border border-gray-300 rounded-md bg-white overflow-hidden">
                
                {/* Option: WhatsApp */}
                <div onClick={() => setPaymentMethod('whatsapp')} className={twMerge("p-4 border-b border-gray-200 cursor-pointer flex items-center justify-between transition-colors", paymentMethod === 'whatsapp' ? "bg-gray-50" : "")}>
                   <div className="flex items-center gap-3">
                       <div className={twMerge("w-4 h-4 rounded-full border flex items-center justify-center", paymentMethod === 'whatsapp' ? "border-black" : "border-gray-400")}>
                           {paymentMethod === 'whatsapp' && <div className="w-2 h-2 bg-black rounded-full" />}
                       </div>
                       <span className="text-sm font-medium text-gray-900 flex items-center gap-2"><MessageSquare size={16} className="text-[#25D366]"/> WhatsApp Booking</span>
                   </div>
                </div>

                {paymentMethod === 'whatsapp' && (
                    <div className="p-4 bg-green-50 border-b border-gray-200 text-center">
                        <p className="text-sm text-green-800">Complete via WhatsApp for instant booking & real-time chat with our experts.</p>
                    </div>
                )}

                {/* Option: Credit Card */}
                <div onClick={() => setPaymentMethod('cc')} className={twMerge("p-4 border-b border-gray-200 cursor-pointer flex items-center justify-between transition-colors", paymentMethod === 'cc' ? "bg-gray-50" : "")}>
                   <div className="flex items-center gap-3">
                       <div className={twMerge("w-4 h-4 rounded-full border flex items-center justify-center", paymentMethod === 'cc' ? "border-black" : "border-gray-400")}>
                           {paymentMethod === 'cc' && <div className="w-2 h-2 bg-black rounded-full" />}
                       </div>
                       <span className="text-sm font-medium text-gray-900">Bank Card / Bank Account - PayHere</span>
                   </div>
                   <div className="flex gap-1 opacity-60">
                       <div className="w-8 h-5 bg-[#1a1f71] rounded flex items-center justify-center text-[6px] text-white">VISA</div>
                       <div className="w-8 h-5 bg-[#eb001b] rounded flex items-center justify-center text-[6px] text-white">MC</div>
                   </div>
                </div>

                {paymentMethod === 'cc' && (
                    <div className="p-4 bg-gray-50 border-b border-gray-200 flex flex-col items-center justify-center text-center">
                        <div className="py-4">
                            <PaymentCard number={formData.ccNum} name={formData.ccName} expiry={formData.ccExp} cvv={formData.ccCvv} focused={focusedField} />
                        </div>
                    </div>
                )}

                {/* Option: Mintpay */}
                <div onClick={() => setPaymentMethod('mintpay')} className={twMerge("p-4 cursor-pointer flex items-center justify-between transition-colors", paymentMethod === 'mintpay' ? "bg-gray-50" : "")}>
                   <div className="flex items-center gap-3">
                       <div className={twMerge("w-4 h-4 rounded-full border flex items-center justify-center", paymentMethod === 'mintpay' ? "border-black" : "border-gray-400")}>
                           {paymentMethod === 'mintpay' && <div className="w-2 h-2 bg-black rounded-full" />}
                       </div>
                       <span className="text-sm font-medium text-gray-900">Mintpay | Shop now. Pay later.</span>
                   </div>
                </div>
            </div>
          </div>

          <Button 
              onClick={handlePlaceOrder}
              loading={isProcessing}
              variant={paymentMethod === 'whatsapp' ? 'whatsapp' : 'vogue'}
              size="full"
              icon={paymentMethod === 'whatsapp' ? <MessageSquare size={18}/> : undefined}
              className="mb-10"
          >
              {paymentMethod === 'whatsapp' ? 'Send WhatsApp Booking' : 'Pay now'}
          </Button>
          
        </div>
      </div>

      {/* RIGHT COLUMN: Order Summary */}
      <div className="w-full lg:w-[45%] xl:w-[40%] bg-[#fafafa] flex justify-start">
         <div className="w-full max-w-lg px-4 lg:px-10 py-10 lg:sticky lg:top-20 h-fit">
             <div className="space-y-4 mb-6 pt-2">
                 {cartItems.map(item => (
                    <div key={item.cartId} className="flex gap-4 items-center">
                       <div className="relative">
                           <div className="w-16 h-16 bg-white border border-gray-200 rounded-lg flex items-center justify-center overflow-hidden drop-shadow-sm">
                               <img src={item.image} alt={item.name} className="w-12 h-12 object-contain" />
                           </div>
                           <div className="absolute -top-2 -right-2 w-5 h-5 bg-gray-500 text-white rounded-full flex items-center justify-center text-[11px] font-bold z-10 opacity-90 shadow-sm leading-none pt-0.5">
                               {item.quantity || 1}
                           </div>
                       </div>
                       <div className="flex-1">
                           <h4 className="font-medium text-[13px] text-gray-900">{item.name}</h4>
                           <p className="text-[11px] text-gray-500">{item.selectedSize || 'Standard'}</p>
                       </div>
                       <div className="text-[13px] font-medium text-gray-900">
                           Rs {(parsePrice(item.price) * (item.quantity || 1)).toLocaleString()}.00
                       </div>
                    </div>
                 ))}
             </div>



             <div className="space-y-3 pb-6 border-b border-gray-200 text-[13px]">
                 <div className="flex justify-between items-center text-gray-500">
                     <span>Subtotal</span>
                     <span className="font-medium text-gray-900">Rs {total.toLocaleString()}.00</span>
                 </div>
                 <div className="flex justify-between items-center text-gray-500">
                     <span>Shipping</span>
                     <span className="font-medium text-gray-900">Rs {shipping.toFixed(2)}</span>
                 </div>
             </div>

             <div className="flex justify-between items-center pt-4">
                 <span className="font-medium text-gray-900 text-base">Total</span>
                 <div className="flex items-end gap-2">
                    <span className="text-xs text-gray-500 font-medium pb-0.5">LKR</span>
                    <span className="text-xl font-bold text-gray-900">Rs {(total + shipping).toLocaleString()}.00</span>
                 </div>
             </div>
         </div>
      </div>

      {/* Validation Error Popup */}
      <AnimatePresence>
        {showErrorPopup && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowErrorPopup(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
             <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-white p-10 max-w-sm w-full rounded-[30px] text-center shadow-xl">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertCircle size={32} className="text-red-500" />
                </div>
                <h3 className="text-xl font-bold tracking-tight text-gray-900 mb-3">Incomplete Request!</h3>
                <p className="text-gray-500 text-sm mb-8 font-medium">Please fill in all the highlighted fields to proceed.</p>
                <button onClick={() => setShowErrorPopup(false)} className="w-full py-4 bg-black text-white font-bold tracking-widest text-[11px] uppercase rounded-full hover:bg-red-600 transition-colors">Return to review</button>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Enterprise Hardening Alert */}
      <AnimatePresence>
        {showSecurityAlert && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 backdrop-blur-md bg-black/40">
              <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-white border border-gray-100 p-8 md:p-12 max-w-md w-full rounded-3xl shadow-2xl relative overflow-hidden text-center"
              >
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#B91C1C]" />
                  <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mb-6 shadow-xl">
                          <ShieldCheck size={32} />
                      </div>
                      <h3 className="text-xl font-black uppercase tracking-tight mb-2">Protocol Finalization</h3>
                      <p className="text-[10px] font-black uppercase text-[#B91C1C] tracking-[0.2em] mb-6">Security Level: Enterprise</p>
                      
                      <div className="space-y-4 mb-8">
                          <p className="text-sm font-medium text-gray-500 leading-relaxed">
                              Our live settlement infrastructure is currently undergoing security hardening for your protection.
                          </p>
                          <div className="p-4 bg-gray-50 border border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-left">
                              Status: Automated Payment available soon. Please use 'WhatsApp Booking' for immediate checkout.
                          </div>
                      </div>

                      <Button 
                          variant="vogue" 
                          className="w-full h-14 rounded-2xl text-xs tracking-widest font-black"
                          onClick={() => setShowSecurityAlert(false)}
                      >
                          ACKNOWLEDGE PROTOCOL
                      </Button>
                  </div>
              </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
