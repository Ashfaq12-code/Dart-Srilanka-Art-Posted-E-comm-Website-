'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatbotProps {
    isOpen: boolean;
    onClose: () => void;
}

const QUICK_REPLIES = [
    "Darts for Beginners",
    "Shipping to Colombo",
    "Tungsten Content",
    "Return Policy",
    "Track my Order"
];

export const Chatbot = ({ isOpen, onClose }: ChatbotProps) => {
    const [messages, setMessages] = useState([
        { text: 'Hello! I am the Dart LKA AI assistant. How can I help you today?', sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = (text: string) => {
        if (!text.trim()) return;
        
        setMessages(prev => [...prev, { text, sender: 'user' }]);
        if (input) setInput('');
        
        // Mock reply logic
        setTimeout(() => {
            let reply = "I can definitely help with that! Would you like to see our latest collections?";
            if (text.toLowerCase().includes("shipping")) reply = "We offer island-wide delivery within 2-3 working days. Costs vary by region.";
            if (text.toLowerCase().includes("beginner")) reply = "For beginners, we highly recommend our 22g-24g Steel Tip sets. They offer great stability.";
            
            setMessages(prev => [...prev, { text: reply, sender: 'bot' }]);
        }, 800);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[150]"
                    />

                    {/* Chat Drawer */}
                    <motion.div 
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 bottom-0 w-full max-w-[450px] bg-white z-[160] shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="bg-black p-10 flex justify-between items-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#B91C1C]/10 rounded-full blur-3xl -mr-10 -mt-10" />
                            
                            <div className="flex items-center gap-5 relative z-10">
                                <div className="w-14 h-14 bg-[#B91C1C] rounded-[20px] flex items-center justify-center text-white shadow-xl shadow-red-500/20">
                                    <Bot size={28} strokeWidth={2.5} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-black text-white uppercase tracking-tight">AI Assistant</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <div className="w-1.5 h-1.5 bg-[#B91C1C] rounded-full animate-pulse" />
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active Now</p>
                                    </div>
                                </div>
                            </div>
                            
                            <button 
                                onClick={onClose}
                                className="w-12 h-12 rounded-2xl bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition group relative z-10"
                            >
                                <X size={20} strokeWidth={3} className="group-hover:rotate-90 transition-transform duration-300" />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div 
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-10 space-y-8 scroll-smooth"
                        >
                            {messages.map((msg, i) => (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    key={i} 
                                    className={`flex items-start gap-4 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                                >
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${msg.sender === 'bot' ? 'bg-gray-100 text-gray-400' : 'bg-black text-white'}`}>
                                        {msg.sender === 'bot' ? <Bot size={14} /> : <User size={14} />}
                                    </div>
                                    <div className={`max-w-[80%] p-6 rounded-[25px] text-[13px] font-bold leading-relaxed shadow-sm border ${
                                        msg.sender === 'bot' 
                                            ? 'bg-gray-50 border-gray-100 text-gray-800 rounded-tl-sm' 
                                            : 'bg-black border-black text-white rounded-tr-sm'
                                    }`}>
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Quick Replies / Keyboard */}
                        <div className="px-10 pb-4">
                            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                                {QUICK_REPLIES.map(q => (
                                    <button 
                                        key={q}
                                        onClick={() => handleSend(q)}
                                        className="whitespace-nowrap px-5 py-3 bg-gray-50 hover:bg-black hover:text-white rounded-full text-[10px] font-black uppercase tracking-widest text-gray-400 border border-gray-100 transition-all flex items-center gap-2 group"
                                    >
                                        {q}
                                        <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Input Area */}
                        <div className="p-10 border-t border-gray-100 bg-white">
                            <form 
                                onSubmit={(e) => { e.preventDefault(); handleSend(input); }} 
                                className="relative group"
                            >
                                <input 
                                    type="text" 
                                    value={input}
                                    onChange={e => setInput(e.target.value)}
                                    placeholder="Type your message..." 
                                    className="w-full bg-gray-50 border-none rounded-[25px] py-6 pl-8 pr-20 text-[11px] font-black uppercase tracking-widest outline-none focus:ring-2 focus:ring-black/5 transition-all"
                                />
                                <button 
                                    type="submit" 
                                    className="absolute right-3 top-1/2 -translate-y-1/2 w-14 h-14 bg-black text-white rounded-2xl flex items-center justify-center hover:bg-[#B91C1C] transition-all shadow-xl shadow-gray-200 group-hover:scale-105"
                                >
                                    <Send size={18} strokeWidth={2.5} />
                                </button>
                            </form>
                            <p className="text-center text-[9px] font-bold text-gray-300 uppercase tracking-widest mt-6 flex items-center justify-center gap-2">
                                <Sparkles size={10} /> Automated Support Center
                            </p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
