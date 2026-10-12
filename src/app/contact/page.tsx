'use client';

import React from 'react';
import {
    Mail,
    Phone,
    MapPin,
    Send,
    Clock,
} from 'lucide-react';
import { MapSection } from '@/components/MapSection';
import Link from 'next/link';

export default function ContactPage() {
    return (
        <div className="bg-white min-h-screen pt-[72px] pb-24 font-sans text-gray-800">

            {/* TOP MAP SECTION */}
            <div className="w-full h-[650px] overflow-hidden border-b border-gray-100 mb-32 relative group">
                <MapSection />
                {/* Professional glass overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-white/20 pointer-events-none" />
            </div>

            {/* POLISHED BUSINESS HEADING */}
            <div className="max-w-7xl mx-auto px-4 text-center mb-20">
                <nav className="flex justify-center items-center gap-3 text-[10px] text-gray-400 mb-8 uppercase tracking-[0.4em]">
                    <Link href="/" className="hover:text-red-600 transition-colors">Home</Link>
                    <span className="text-gray-200">/</span>
                    <span className="text-gray-900 font-medium">Contact</span>
                </nav>

                <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-gray-900 leading-[0.8] mb-8 italic">
                    GET YOUR DARTS <span className="text-red-600">NOW.</span>
                </h1>

                <div className="w-20 h-1 bg-red-600 mx-auto mb-8" />

                <p className="text-[11px] font-medium text-gray-500 uppercase tracking-[0.3em] max-w-2xl mx-auto leading-relaxed">
                    Connect with our professional studio curators for bespoke acrylic designs or high-end collection inquiries.
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">

                    {/* CONTACT INFORMATION SIDEBAR */}
                    <div className="lg:col-span-1 space-y-16">

                        <section>
                            <h2 className="text-sm font-bold uppercase tracking-[0.2em] mb-10 border-l-4 border-red-600 pl-4">
                                Headquarters
                            </h2>
                            <div className="space-y-10">
                                <div className="flex gap-6 group">
                                    <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-500">
                                        <MapPin size={20} />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Location</p>
                                        <p className="text-sm font-medium leading-relaxed">
                                            Premium Tower, 7th Floor<br />
                                            Colombo 07, Sri Lanka
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-6 group">
                                    <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-500">
                                        <Phone size={20} />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Hotline</p>
                                        <p className="text-sm font-medium">
                                            <a href="tel:+94776207299" className="hover:text-red-600 transition-colors tracking-tight">077 620 7299</a>
                                        </p>
                                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">Available 24/7 on WhatsApp</p>
                                    </div>
                                </div>

                                <div className="flex gap-6 group">
                                    <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-500">
                                        <Mail size={20} />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Inquiries</p>
                                        <p className="text-sm font-medium">
                                            <a href="mailto:orders@dartsrilanka.com" className="hover:text-red-600 transition-colors">orders@dartsrilanka.com</a>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-6 group">
                                    <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-500">
                                        <Clock size={20} />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Availability</p>
                                        <p className="text-sm font-medium uppercase tracking-tighter">Always Open / 24-7</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="bg-black text-white p-10 rounded-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Send size={80} />
                            </div>
                            <h3 className="text-xs font-bold uppercase tracking-[0.3em] mb-4 text-red-600">Expert Support</h3>
                            <p className="text-xs text-gray-400 leading-relaxed font-medium">
                                Our curators are ready to help you with bespoke design requirements or order tracking. Typical response time is under 15 minutes.
                            </p>
                        </section>
                    </div>

                    {/* CONTACT FORM MAIN AREA */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="w-12 h-[2px] bg-red-600" />
                            <h2 className="text-sm font-bold uppercase tracking-[0.4em]">
                                Digital Transmission
                            </h2>
                        </div>

                        <form className="space-y-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="flex flex-col gap-3">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Full Name</label>
                                    <input
                                        type="text"
                                        placeholder="Ex. John Wick"
                                        className="w-full bg-gray-50 border-b-2 border-gray-100 px-0 py-4 text-sm font-medium outline-none focus:border-red-600 transition-all rounded-none"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="hello@studio.com"
                                        className="w-full bg-gray-50 border-b-2 border-gray-100 px-0 py-4 text-sm font-medium outline-none focus:border-red-600 transition-all rounded-none"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="flex flex-col gap-3">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Contact Number</label>
                                    <input
                                        type="tel"
                                        placeholder="+94 77 123 4567"
                                        className="w-full bg-gray-50 border-b-2 border-gray-100 px-0 py-4 text-sm font-medium outline-none focus:border-red-600 transition-all rounded-none"
                                    />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Inquiry Type</label>
                                    <select className="w-full bg-gray-50 border-b-2 border-gray-100 px-0 py-4 text-sm font-medium outline-none focus:border-red-600 transition-all rounded-none appearance-none cursor-pointer">
                                        <option>General Inquiry</option>
                                        <option>Custom Acrylic Design</option>
                                        <option>Order Tracking</option>
                                        <option>Partnership Inquiry</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Your Message</label>
                                <textarea
                                    placeholder="Briefly describe your requirements..."
                                    className="w-full bg-gray-50 border-b-2 border-gray-100 px-0 py-6 text-sm font-medium outline-none focus:border-red-600 transition-all rounded-none min-h-[150px] resize-none"
                                    required
                                ></textarea>
                            </div>

                            <button className="group relative inline-flex items-center gap-6 bg-black text-white px-12 py-5 text-[11px] font-bold uppercase tracking-[0.4em] hover:bg-red-600 transition-all shadow-2xl shadow-black/20">
                                Send Inquiry
                                <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}