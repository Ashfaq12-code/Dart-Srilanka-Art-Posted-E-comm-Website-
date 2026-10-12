'use client';

import React, { useState } from 'react';
import { useShop } from '@/context/ShopContext';
import { 
  LayoutDashboard, ShoppingBag, Package, Users, Settings, 
  Plus, Search, Edit3, Trash2, CheckCircle, Clock, Truck, 
  ArrowUpRight, TrendingUp, DollarSign
} from 'lucide-react';
import { twMerge } from 'tailwind-merge';

export default function AdminDashboard() {
  const { products, orders, addProduct, deleteProduct, updateOrderStatus, logout } = useShop();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  // Stats
  const totalEarnings = orders.reduce((sum, o) => sum + parseFloat(o.total.replace(/[^0-9.]/g, '')), 0);
  const pendingOrders = orders.filter(o => o.status === 'Pending').length;

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-gray-100 flex flex-col pt-12">
        <div className="px-8 mb-12">
            <h1 className="text-xl font-black uppercase tracking-widest text-[#B91C1C]">Admin Hub</h1>
            <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">Control Center</p>
        </div>

        <nav className="flex-1 px-4 space-y-2">
            {[
                { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={18} /> },
                { id: 'orders', label: 'Manage Orders', icon: <ShoppingBag size={18} /> },
                { id: 'products', label: 'Manage Products', icon: <Package size={18} /> },
                { id: 'customers', label: 'Customers', icon: <Users size={18} /> },
                { id: 'settings', label: 'System Settings', icon: <Settings size={18} /> },
            ].map(item => (
                <button 
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={twMerge(
                        "w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all",
                        activeTab === item.id ? "bg-[#B91C1C] text-white shadow-xl shadow-red-100" : "text-gray-400 hover:bg-gray-50 hover:text-black"
                    )}
                >
                    {item.icon}
                    {item.label}
                </button>
            ))}
        </nav>

        <div className="p-8 border-t border-gray-50">
            <button 
                onClick={logout}
                className="flex items-center gap-4 text-xs font-black uppercase text-gray-400 hover:text-[#B91C1C] transition shadow-sm"
            >
                <ArrowUpRight size={18} className="rotate-180" />
                Sign Out
            </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12 overflow-y-auto">
        <header className="flex justify-between items-center mb-16">
            <div>
                <h2 className="text-3xl font-black uppercase tracking-tight text-black">
                    {activeTab === 'overview' && 'Dashboard Overview'}
                    {activeTab === 'orders' && 'Order Management'}
                    {activeTab === 'products' && 'Product Inventory'}
                </h2>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-2">Welcome back, Administrator</p>
            </div>
            
            <div className="flex gap-4">
                <div className="relative">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                    <input 
                        type="text" 
                        placeholder="Search records..." 
                        className="bg-white border border-gray-100 rounded-2xl py-4 pl-14 pr-8 text-xs font-bold outline-none focus:ring-1 focus:ring-gray-200"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                {activeTab === 'products' && (
                    <button 
                        onClick={() => {
                            const newP = {
                                id: Date.now().toString(),
                                name: "New Premium Dart Set",
                                price: "Rs. 18,500",
                                image: "https://images.unsplash.com/photo-1598424911467-fbd59d19a4e6?auto=format&fit=crop&q=80",
                                type: "Steel Tip",
                                badge: "NEW"
                            };
                            addProduct(newP);
                        }}
                        className="bg-black text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center gap-3 hover:bg-[#B91C1C] transition shadow-lg shadow-gray-200"
                    >
                        <Plus size={18} />
                        Add Product
                    </button>
                )}
            </div>
        </header>

        {activeTab === 'overview' && (
            <div className="space-y-12">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-50 text-center md:text-left">
                        <div className="w-14 h-14 bg-red-50 text-[#B91C1C] rounded-2xl flex items-center justify-center mb-6 mx-auto md:mx-0"><DollarSign size={24} /></div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Total Earnings</p>
                        <h3 className="text-3xl font-black text-black">Rs. {totalEarnings.toLocaleString()}</h3>
                        <div className="mt-4 flex items-center justify-center md:justify-start gap-2 text-[10px] font-bold text-[#B91C1C] uppercase tracking-widest">
                            <TrendingUp size={14} /> +12% from last month
                        </div>
                    </div>
                    <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-50 text-center md:text-left">
                        <div className="w-14 h-14 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mb-6 mx-auto md:mx-0"><ShoppingBag size={24} /></div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Active Orders</p>
                        <h3 className="text-3xl font-black text-black">{orders.length}</h3>
                        <p className="mt-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">{pendingOrders} awaiting shipment</p>
                    </div>
                    <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-50 text-center md:text-left">
                        <div className="w-14 h-14 bg-purple-50 text-purple-500 rounded-2xl flex items-center justify-center mb-6 mx-auto md:mx-0"><Package size={24} /></div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Total Products</p>
                        <h3 className="text-3xl font-black text-black">{products.length}</h3>
                        <p className="mt-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Across 8 Categories</p>
                    </div>
                </div>

                {/* Recent Activity (Placeholder) */}
                <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-50">
                    <h4 className="text-lg font-black uppercase tracking-tight mb-8">System Health</h4>
                    <div className="h-64 bg-gray-50 rounded-3xl flex items-center justify-center text-gray-300 font-bold uppercase tracking-widest text-xs italic">
                        Real-time analytics chart placeholder
                    </div>
                </div>
            </div>
        )}

        {activeTab === 'orders' && (
            <div className="bg-white rounded-[40px] shadow-sm border border-gray-50 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50/50">
                        <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                            <th className="px-8 py-6">Order ID</th>
                            <th className="px-8 py-6">Customer</th>
                            <th className="px-8 py-6">Status</th>
                            <th className="px-8 py-6">Total</th>
                            <th className="px-8 py-6">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-8 py-20 text-center text-gray-300 font-bold uppercase tracking-widest text-xs italic">No orders received yet</td>
                            </tr>
                        ) : (
                            orders.map(order => (
                                <tr key={order.id} className="text-xs font-bold uppercase tracking-tight text-gray-600">
                                    <td className="px-8 py-6 font-black text-black">#{order.id.slice(0, 8)}</td>
                                    <td className="px-8 py-6">{order.customer}</td>
                                    <td className="px-8 py-6">
                                        <span className={twMerge(
                                            "inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[9px] font-black",
                                            order.status === 'Pending' ? "bg-amber-50 text-amber-600" :
                                            order.status === 'Shipped' ? "bg-blue-50 text-blue-600" : "bg-red-50 text-[#B91C1C]"
                                        )}>
                                            {order.status === 'Pending' && <Clock size={12} />}
                                            {order.status === 'Shipped' && <Truck size={12} />}
                                            {order.status === 'Delivered' && <CheckCircle size={12} />}
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-black">{order.total}</td>
                                    <td className="px-8 py-6 flex gap-3">
                                        <button 
                                            onClick={() => updateOrderStatus(order.id, 'Shipped')}
                                            className="px-4 py-2 bg-gray-50 rounded-xl hover:bg-blue-500 hover:text-white transition"
                                        >Ship</button>
                                        <button 
                                            onClick={() => updateOrderStatus(order.id, 'Delivered')}
                                            className="px-4 py-2 bg-gray-50 rounded-xl hover:bg-[#B91C1C] hover:text-white transition"
                                        >Finish</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        )}

        {activeTab === 'products' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.map(product => (
                    <div key={product.id} className="bg-white p-6 rounded-[35px] shadow-sm border border-gray-50 group hover:shadow-xl transition-all">
                        <div className="relative h-48 rounded-[25px] overflow-hidden mb-6">
                            <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={product.name} />
                            <button 
                                onClick={() => deleteProduct(product.id)}
                                className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-red-500 transition-colors"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                        <h4 className="text-[11px] font-black uppercase tracking-tight text-black mb-1">{product.name}</h4>
                        <div className="flex justify-between items-center mt-4">
                            <span className="text-xs font-black text-[#B91C1C]">{product.price}</span>
                            <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">{product.type}</span>
                        </div>
                        <button className="w-full mt-6 py-3 bg-gray-50 text-[9px] font-black uppercase tracking-[0.2em] rounded-xl flex items-center justify-center gap-2 hover:bg-black hover:text-white transition">
                            <Edit3 size={14} />
                            Quick Edit
                        </button>
                    </div>
                ))}
            </div>
        )}
      </main>
    </div>
  );
}
