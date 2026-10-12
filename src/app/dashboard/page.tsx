'use client';

import React, { useState } from 'react';
import { User, Package, MapPin, Download, LogOut, Settings, CreditCard, ChevronRight } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const MENU_ITEMS = [
    { id: 'dashboard', label: 'Dashboard', icon: <User size={18} /> },
    { id: 'orders', label: 'Orders', icon: <Package size={18} /> },
    { id: 'management', label: 'Management', icon: <Settings size={18} /> },
    { id: 'addresses', label: 'Addresses', icon: <MapPin size={18} /> },
    { id: 'details', label: 'Account Details', icon: <Settings size={18} /> },
    { id: 'logout', label: 'Logout', icon: <LogOut size={18} /> },
  ];

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-black uppercase tracking-[0.2em] mb-12 text-center">My Account</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Navigation */}
            <aside className="lg:w-1/4">
                <div className="bg-white rounded-[30px] shadow-sm border border-gray-100 overflow-hidden">
                    {MENU_ITEMS.map((item) => (
                        <button 
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={twMerge(
                                "w-full flex items-center justify-between px-8 py-6 transition border-b border-gray-50 last:border-0 group",
                                activeTab === item.id ? "bg-[#B91C1C] text-white" : "text-gray-500 hover:bg-gray-50 hover:text-black"
                            )}
                        >
                            <div className="flex items-center gap-4">
                                {item.icon}
                                <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                            </div>
                            <ChevronRight size={14} className={twMerge("transition-transform", activeTab === item.id ? "rotate-90" : "group-hover:translate-x-1")} />
                        </button>
                    ))}
                </div>
            </aside>

            {/* Content Area */}
            <main className="lg:w-3/4 bg-white rounded-[40px] shadow-sm border border-gray-100 p-10 min-h-[500px]">
                {activeTab === 'dashboard' && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                        <h2 className="text-2xl font-black uppercase tracking-widest mb-6">Hello, <span className="text-[#B91C1C]">Player_001</span></h2>
                        <p className="text-gray-500 text-sm leading-relaxed mb-10">
                            From your account dashboard you can view your <span className="text-black font-bold">recent orders</span>, manage your <span className="text-black font-bold">shipping and billing addresses</span>, and edit your <span className="text-black font-bold">password and account details</span>.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { icon: <Package size={32} />, label: 'Orders', count: '12 Items' },
                                { icon: <MapPin size={32} />, label: 'Addresses', count: '2 Saved' },
                                { icon: <CreditCard size={32} />, label: 'Wallet', count: 'LKR 0.00' }
                            ].map((stat, i) => (
                                <div key={i} className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:-translate-y-1 transition duration-500 cursor-pointer">
                                    <div className="text-[#B91C1C] mb-4">{stat.icon}</div>
                                    <h4 className="text-lg font-black uppercase tracking-tight mb-1">{stat.label}</h4>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.count}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'orders' && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                        <h2 className="text-2xl font-black uppercase tracking-widest mb-8">Recent Orders</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-gray-100">
                                        <th className="py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Order ID</th>
                                        <th className="py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Date</th>
                                        <th className="py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                                        <th className="py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Total</th>
                                        <th className="py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {[1, 2, 3].map(i => (
                                        <tr key={i}>
                                            <td className="py-6 font-bold text-sm">#LKA-887{i}</td>
                                            <td className="py-6 text-sm text-gray-500">Jan 1{i}, 2026</td>
                                            <td className="py-6"><span className="px-3 py-1 bg-red-50 text-[#B91C1C] text-[10px] font-black uppercase rounded-full">Completed</span></td>
                                            <td className="py-6 font-bold text-[#B91C1C] text-sm">LKR 125,000</td>
                                            <td className="py-6"><button className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black">View Details</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'management' && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                        <h2 className="text-2xl font-black uppercase tracking-widest mb-2 text-gray-900 font-cursive">~ Real-time Management ~</h2>
                        <h3 className="text-xl font-black uppercase tracking-tight mb-8">Add New Product</h3>
                        
                        <form className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-50/50 p-8 rounded-[30px] border border-gray-100">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Product Name</label>
                                <input type="text" placeholder="e.g. Target Phil Taylor Model" className="w-full p-4 bg-white border border-gray-200 rounded-2xl text-sm focus:ring-2 focus:ring-[#B91C1C]/10 outline-none" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Category</label>
                                <select className="w-full p-4 bg-white border border-gray-200 rounded-2xl text-sm outline-none">
                                    <option>Steel Tip Darts</option>
                                    <option>Soft Tip Darts</option>
                                    <option>Dartboards</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Price (LKR)</label>
                                <input type="number" placeholder="25000" className="w-full p-4 bg-white border border-gray-200 rounded-2xl text-sm outline-none" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Image URL (PNG)</label>
                                <input type="text" placeholder="https://..." className="w-full p-4 bg-white border border-gray-200 rounded-2xl text-sm outline-none" />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Product Description</label>
                                <textarea rows={4} className="w-full p-4 bg-white border border-gray-200 rounded-2xl text-sm outline-none" />
                            </div>
                            <button className="md:col-span-2 py-4 bg-[#B91C1C] text-white font-black uppercase tracking-widest text-xs rounded-full hover:bg-black transition shadow-xl shadow-red-900/10">
                                Upload Product
                            </button>
                        </form>
                    </div>
                )}

                {(activeTab === 'addresses' || activeTab === 'details') && (
                    <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in scale-95 duration-500">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6"><Settings size={32} className="text-gray-300" /></div>
                        <h3 className="text-xl font-black uppercase tracking-widest mb-2">Feature Coming Soon</h3>
                        <p className="text-gray-400 text-xs">We are currently updating our database for secure {activeTab}.</p>
                    </div>
                )}
            </main>
        </div>
      </div>
    </div>
  );
}
