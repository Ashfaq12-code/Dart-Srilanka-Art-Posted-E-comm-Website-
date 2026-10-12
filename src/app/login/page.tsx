'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, User, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';

export default function LoginPage() {
  const { login } = useShop();
  const router = useRouter();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showSecurityAlert, setShowSecurityAlert] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSecurityAlert(true);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-12">
            <Link href="/" className="hover:text-black">Home</Link>
            <span>/</span>
            <span className="text-black">Sign in</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Login Card */}
          <div className="bg-white p-10 md:p-16 rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col justify-between">
            <div>
                <div className="flex items-center gap-4 mb-10">
                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400">
                        <User size={24} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-black uppercase tracking-tight">Login Here</h2>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Manage your account and orders</p>
                    </div>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <div className="relative">
                            <User className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                            <input 
                                type="text" 
                                placeholder="Username / email address" 
                                className="w-full bg-gray-50 border-none rounded-2xl py-5 pl-16 pr-8 text-sm font-bold outline-none focus:ring-2 focus:ring-[#B91C1C]/10 transition"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="relative">
                            <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                            <input 
                                type="password" 
                                placeholder="Password" 
                                className="w-full bg-gray-50 border-none rounded-2xl py-5 pl-16 pr-8 text-sm font-bold outline-none focus:ring-2 focus:ring-[#B91C1C]/10 transition"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between px-2">
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <input type="checkbox" className="w-5 h-5 rounded-lg border-gray-200 text-[#B91C1C] focus:ring-[#B91C1C]" />
                            <span className="text-[10px] font-black uppercase text-gray-400 group-hover:text-black transition">Remember me</span>
                        </label>
                        <Link href="/forgot" className="text-[10px] font-black uppercase text-gray-400 hover:text-[#B91C1C] transition">Forget Password?</Link>
                    </div>

                    <button 
                        type="submit"
                        disabled={isLoggingIn}
                        className="w-full py-5 bg-[#B91C1C] text-white text-[11px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-black transition-all flex items-center justify-center gap-3 group shadow-xl shadow-red-100 disabled:opacity-50"
                    >
                        {isLoggingIn ? "Authenticating..." : "Login Now"}
                        {!isLoggingIn && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
                    </button>
                </form>
            </div>
          </div>

          {/* Right: Sign Up Card */}
          <div className="bg-white p-10 md:p-16 rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-gray-100">
             <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400">
                    <Lock size={24} />
                </div>
                <div>
                    <h2 className="text-2xl font-black text-black uppercase tracking-tight">Sign Up</h2>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Create a new account today</p>
                </div>
            </div>

            <form className="space-y-6">
                <div className="relative">
                    <User className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                    <input 
                        type="text" 
                        placeholder="User name" 
                        className="w-full bg-gray-50 border-none rounded-2xl py-5 pl-16 pr-8 text-sm font-bold outline-none focus:ring-2 focus:ring-black/5 transition"
                    />
                </div>
                <div className="relative">
                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                    <input 
                        type="email" 
                        placeholder="Email address" 
                        className="w-full bg-gray-50 border-none rounded-2xl py-5 pl-16 pr-8 text-sm font-bold outline-none focus:ring-2 focus:ring-black/5 transition"
                    />
                </div>
                <div className="relative">
                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        className="w-full bg-gray-50 border-none rounded-2xl py-5 pl-16 pr-8 text-sm font-bold outline-none focus:ring-2 focus:ring-black/5 transition"
                    />
                </div>

                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2 mb-6">Already Have Account?</p>

                <button 
                  type="button"
                  onClick={() => setShowSecurityAlert(true)}
                  className="w-full py-5 bg-[#1e1b4b] text-white text-[11px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-black transition-all flex items-center justify-center gap-3 group shadow-xl shadow-indigo-100"
                >
                    Register Now
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </form>
          </div>
        </div>

        {/* Footer Features (Visible on Mobile too) */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
                { label: "FAST DELIVERY", sub: "Islandwide Shipping", icon: <ArrowRight /> },
                { label: "SAFE PAYMENT", sub: "100% Secure Checkout", icon: <CheckCircle2 /> },
                { label: "ONLINE DISCOUNT", sub: "Bulk Buy Offers", icon: <ArrowRight /> },
                { label: "HELP CENTER", sub: "24/7 Priority Support", icon: <Mail /> },
            ].map((f, i) => (
                <div key={i} className="text-center group cursor-pointer">
                    <div className="w-14 h-14 bg-white rounded-2xl mx-auto flex items-center justify-center text-[#B91C1C] mb-4 shadow-sm group-hover:bg-[#B91C1C] group-hover:text-white transition-all duration-500">
                        {React.cloneElement(f.icon as React.ReactElement<any>, { size: 24 })}
                    </div>
                    <h4 className="text-[11px] font-black uppercase tracking-widest text-black mb-1">{f.label}</h4>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tight">{f.sub}</p>
                </div>
            ))}
        </div>
      </div>

      {/* Enterprise Hardening Alert */}
      <AnimatePresence>
        {showSecurityAlert && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 backdrop-blur-md bg-black/40">
              <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-white border border-gray-100 p-8 md:p-12 max-w-md w-full rounded-[40px] shadow-2xl relative overflow-hidden text-center"
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
                              Our authentication infrastructure is currently undergoing security hardening for your protection.
                          </p>
                          <div className="p-4 bg-gray-50 border border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-left">
                              Status: Member login available soon. Please use Guest Checkout for immediate orders.
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
