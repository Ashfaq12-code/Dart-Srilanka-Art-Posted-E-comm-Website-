'use client';

import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Ruler, MessageSquare, ArrowLeft, Check, Sparkles, Search, X, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function CustomDesignPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [selectedSize, setSelectedSize] = useState('12 x 18 INCHES');
    const [customImage, setCustomImage] = useState<string | null>(null);
    const [googleQuery, setGoogleQuery] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [isBooked, setIsBooked] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [isScanning, setIsScanning] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [scanningImage, setScanningImage] = useState<string | null>(null);
    const [authLog, setAuthLog] = useState<string[]>([]);
    const [verifyToken, setVerifyToken] = useState('');
    const [securityAlert, setSecurityAlert] = useState<string | null>(null);
    const [paymentMethod, setPaymentMethod] = useState<'bank' | 'online' | null>(null);
    const [showPaymentAlert, setShowPaymentAlert] = useState(false);

    // Form States
    const [customerInfo, setCustomerInfo] = useState({
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        apartment: '',
        city: '',
        postalCode: '',
        phone: ''
    });

    const sizes = [
        { id: 's1', label: '12 x 18 INCHES', price: 4900, desc: 'Standard Studio Size', ratio: 'aspect-[2/3]' },
        { id: 's1-p', label: '12 x 18 INCHES (PREMIUM)', price: 5900, desc: 'High-Gloss Finish', ratio: 'aspect-[2/3]' },
        { id: 's2', label: '16 x 24 INCHES', price: 7900, desc: 'Medium Gallery Size', ratio: 'aspect-[2/3]' },
        { id: 's3', label: '20 x 30 INCHES', price: 10400, desc: 'Large Masterpiece Size', ratio: 'aspect-[2/3]' },
        { id: 's4', label: 'CUSTOM SIZE', price: 0, desc: 'Contact us for large murals', ratio: 'aspect-square' },
    ];

    const selectedSizeData = sizes.find(s => s.label === selectedSize) || sizes[0];
    const shipping = 800;
    const total = selectedSizeData.price + shipping;

    const startScan = async (img: string) => {
        setIsScanning(true);
        setScanningImage(img);
        setSecurityAlert(null);
        setIsVerified(false);
        setIsAuthorized(false);
        setAuthLog(['INITIALIZING SECURE HANDSHAKE...']);

        try {
            setTimeout(() => setAuthLog(prev => [...prev, 'DEEP PACKET INSPECTION...']), 800);
            setTimeout(() => setAuthLog(prev => [...prev, 'METADATA VALIDATION...']), 1600);

            const response = await fetch('/api/verify-image', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image: img }),
            });

            const data = await response.json();

            if (response.ok && data.verified) {
                setAuthLog(prev => [...prev, 'SECURITY STANDARDS: PASS', `TOKEN ISSUED: ${data.token}`]);
                setVerifyToken(data.token);
                setCustomImage(img);
                setIsVerified(true);
                setIsScanning(false);
                setScanningImage(null);
            } else {
                setAuthLog(prev => [...prev, 'CRITICAL REJECTION: SECURITY VIOLATION']);
                setSecurityAlert(data.error || 'UNAUTHORIZED_ASSET_SIGNATURE');
                setIsScanning(false);
                setScanningImage(null);
                setCustomImage(null);
            }
        } catch (error) {
            setAuthLog(prev => [...prev, 'CRITICAL: BACKEND TIMEOUT']);
            setSecurityAlert('CONNECTION_PROTOCOL_ERROR');
            setIsScanning(false);
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setIsUploading(true);
            const reader = new FileReader();
            reader.onloadend = () => {
                setIsUploading(false);
                startScan(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUrlSubmit = () => {
        if (imageUrl) {
            startScan(imageUrl);
        }
    };

    const handleWhatsAppBooking = (e: React.FormEvent) => {
        e.preventDefault();

        if (paymentMethod === 'online') {
            setShowPaymentAlert(true);
            return;
        }

        try {
            const tokenParts = verifyToken.split('-');
            const authCode = tokenParts.length > 2 ? tokenParts[2] : 'DSL_GEN_AUTH';

            const orderRef = `DSL-${Math.floor(1000 + Math.random() * 9000)}`;

            // Optimize image source for URL length
            const imageSource = (customImage && !customImage.startsWith('data:')) ? customImage : 'SECURE_VAULT_ASSET';

            const siteLink = "https://dartsrilanka.netlify.app/custom-design";

            const message = `*CUSTOM DESIGN MANIFEST*%0A%0A*SECURE AUTH:* ${verifyToken || 'SYSTEM_VERIFIED'}%0A*MANIFEST REF:* ${orderRef}%0A%0A*TECHNICAL SPECIFICATION*%0A- Size: ${selectedSize}%0A- Finish: ${selectedSize.includes('PREMIUM') ? 'High-Gloss' : 'Standard'}%0A- Asset Source: ${imageSource}%0A%0A*SETTLEMENT METHOD*%0A- Secure Bank Transfer%0A%0A*CUSTOMER COORDINATES*%0A- Name: ${customerInfo.firstName} ${customerInfo.lastName}%0A- Email: ${customerInfo.email}%0A- Address: ${customerInfo.address}%0A- City: ${customerInfo.city}%0A- Phone: ${customerInfo.phone}%0A%0A*TOTAL VALUATION:* Rs ${total.toLocaleString()}%0A%0A[ SECURE MANIFEST LINK ]%0A${siteLink}%0A%0A*AUTH CODE:* ${authCode}`;

            setIsBooked(true);
            setStep(4);

            const waUrl = `https://wa.me/94776207299?text=${message}`;
            window.open(waUrl, '_blank');
        } catch (err) {
            console.error('Booking Engine Error:', err);
            alert('Booking Error: Please ensure design is verified before submitting.');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCustomerInfo(prev => ({ ...prev, [name]: value }));
    };

    // Realistic Product Preview Component
    const ProductPreview = ({ image, scanImage, sizeRatio }: { image: string | null, scanImage: string | null, sizeRatio: string }) => (
        <div className="relative group perspective-1000">
            <motion.div
                initial={{ rotateY: -10, rotateX: 5 }}
                animate={{ rotateY: 0, rotateX: 0 }}
                className={`relative w-full max-w-[280px] mx-auto shadow-[20px_40px_60px_-15px_rgba(0,0,0,0.3)] bg-[#1a1a1a] p-3 border-[12px] border-black rounded-none transform transition-transform duration-700 group-hover:scale-105 ${sizeRatio}`}
            >
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none z-10" />
                <div className="absolute inset-[-12px] border-[1px] border-white/10 rounded-none pointer-events-none" />

                <div className="w-full h-full bg-gray-900 overflow-hidden flex items-center justify-center relative">
                    {(image || scanImage) ? (
                        <img src={image || scanImage || ''} className={`w-full h-full object-cover ${(isScanning && scanImage) ? 'blur-2xl opacity-40 grayscale' : ''}`} alt="Custom design preview" />
                    ) : (
                        <div className="text-center p-4">
                            <ImageIcon size={40} className="mx-auto mb-2 text-gray-700 opacity-20" />
                            <p className="text-[8px] font-black uppercase text-gray-700 tracking-widest">Vault Secure Slot</p>
                        </div>
                    )}

                    {isScanning && (
                        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-30 flex flex-col items-center justify-center">
                            <div className="w-full px-4 text-left">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-2 h-2 bg-[#B91C1C] rounded-full animate-ping" />
                                    <span className="text-[7px] font-black text-white uppercase tracking-[0.4em]">Server Authentication</span>
                                </div>
                                <div className="space-y-1">
                                    {authLog.map((log, i) => (
                                        <motion.p
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            key={i}
                                            className="text-[6px] font-mono text-green-500 uppercase tracking-widest flex items-center gap-1"
                                        >
                                            <span className="text-white opacity-40">[{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}]</span> {log}
                                        </motion.p>
                                    ))}
                                </div>
                            </div>
                            <motion.div
                                initial={{ top: '0%' }}
                                animate={{ top: '100%' }}
                                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                                className="absolute left-0 right-0 h-[1px] bg-[#B91C1C] shadow-[0_0_25px_5px_#B91C1C] z-40"
                            />
                        </div>
                    )}
                </div>

                <div className={`absolute -bottom-2 -right-2 px-2 py-1 text-[6px] font-black shadow-lg uppercase tracking-widest z-20 transition-colors duration-500 ${isVerified ? 'bg-green-600 text-white' : 'bg-[#B91C1C] text-white'}`}>
                    {isVerified ? 'AUTHENTICATED' : 'PROTECTED'}
                </div>
            </motion.div>
            <div className="mt-8 text-center flex items-center justify-center gap-2">
                {isVerified && !isScanning && <Check size={12} className="text-green-500" />}
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
                    {isScanning ? 'Backend Protocol Active' : isVerified ? 'Secure ID: ' + verifyToken.substring(0, 12) + '...' : 'Studio Asset Preview'}
                </span>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#fcfcfc] pt-32 pb-20 px-4">
            <div className="max-w-7xl mx-auto">

                <div className="flex items-center justify-between mb-12">
                    <Link href="/shop" className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors group">
                        <div className="p-2 rounded-none bg-white shadow-sm border border-gray-100 group-hover:border-black transition-all">
                            <ArrowLeft size={18} />
                        </div>
                        <span className="text-xs font-black uppercase tracking-widest">Back to Shop</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-black text-white px-3 py-1.5 rounded-none">
                            <div className={`w-1.5 h-1.5 rounded-full ${isScanning ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`} />
                            <span className="text-[8px] font-black uppercase tracking-widest">{isScanning ? 'Processing' : 'Secure Channel'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Sparkles size={16} className="text-[#B91C1C]" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Custom Studio v3.0</span>
                        </div>
                    </div>
                </div>

                <div className="lg:hidden mb-12 px-2">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Security Phase {step} / 3</span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-black">
                            {step === 1 ? 'Verification' : step === 2 ? 'Technical' : 'Confirmation'}
                        </span>
                    </div>
                    <div className="h-1 w-full bg-gray-100 rounded-none overflow-hidden">
                        <motion.div
                            initial={{ width: '0%' }}
                            animate={{ width: `${(step / 3) * 100}%` }}
                            className="h-full bg-black transition-all duration-500"
                        />
                    </div>
                </div>

                {!isBooked && (
                    <div className="text-center mb-16 md:mb-24">
                        <h1 className="text-4xl md:text-7xl font-normal mb-4 px-2 text-slate-700" style={{ fontFamily: 'var(--font-dancing-script)' }}>
                            Custom Design Studio
                        </h1>
                        <p className="text-gray-400 text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] max-w-lg mx-auto leading-relaxed px-4 opacity-60">
                            Secure AI Architecture • Premium Handcrafted Precision
                        </p>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 md:gap-12">

                    {!isBooked && (
                        <div className="hidden lg:block lg:col-span-1 space-y-4">
                            {[
                                { n: 1, t: 'Design Auth', d: 'Secure Scan' },
                                { n: 2, t: 'Technical Spec', d: 'Dimensions' },
                                { n: 3, t: 'Final Booking', d: 'Order Confirmation' }
                            ].map((s) => (
                                <button
                                    key={s.n}
                                    disabled={step < s.n && !isAuthorized}
                                    onClick={() => setStep(s.n)}
                                    className={`w-full p-6 rounded-none border-l-4 text-left transition-all duration-500 ${step === s.n ? 'bg-black text-white border-black shadow-xl border-l-[#B91C1C]' : 'bg-white text-gray-400 border-gray-100 opacity-60 hover:opacity-100 border-l-transparent'}`}
                                >
                                    <div className="flex items-center gap-4">
                                        <span className={`w-8 h-8 rounded-none flex items-center justify-center text-xs font-black border ${step === s.n ? 'border-white/20 bg-white/10' : 'border-gray-200'}`}>
                                            {step > s.n ? <Check size={14} /> : s.n}
                                        </span>
                                        <div>
                                            <h3 className="text-[10px] font-black uppercase tracking-widest">{s.t}</h3>
                                            <p className="text-[9px] font-medium opacity-60">{s.d}</p>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}

                    <div className={`${isBooked ? 'lg:col-span-4' : 'lg:col-span-3'}`}>
                        <div className="bg-white rounded-none p-6 md:p-12 shadow-2xl shadow-black/5 border border-gray-100 min-h-[500px] md:min-h-[650px] flex flex-col relative overflow-hidden">

                            <AnimatePresence mode="wait">
                                {isBooked ? (
                                    <motion.div
                                        key="booked"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex-1 flex flex-col"
                                    >
                                        <div className="text-center mb-8 md:mb-12">
                                            <div className="w-16 h-16 bg-black text-white rounded-none flex items-center justify-center mb-6 mx-auto shadow-xl">
                                                <Check size={32} />
                                            </div>
                                            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-2">Booking Authenticated</h2>
                                            <p className="text-gray-400 text-[10px] md:text-sm font-medium uppercase tracking-widest">Design successfully pushed to manufacture.</p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 border-t border-gray-100 pt-8 md:pt-12">
                                            <div className="space-y-6 md:space-y-8">
                                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Order Manifest</h3>
                                                <div className="flex gap-4">
                                                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-50 rounded-none border border-gray-100 flex items-center justify-center overflow-hidden">
                                                        {customImage ? <img src={customImage} className="w-full h-full object-cover" /> : <ImageIcon size={24} className="text-gray-300" />}
                                                    </div>
                                                    <div>
                                                        <h4 className="text-[10px] md:text-xs font-black uppercase tracking-tight">Technical Custom Board</h4>
                                                        <p className="text-[8px] md:text-[10px] text-gray-400 font-bold uppercase mt-1">Spec: {selectedSize}</p>
                                                        <p className="text-[8px] md:text-[10px] text-green-600 font-black uppercase tracking-widest mt-1">Status: SECURE_AUTH</p>
                                                    </div>
                                                    <div className="ml-auto">
                                                        <span className="text-xs font-black">Rs {selectedSizeData.price.toLocaleString()}.00</span>
                                                    </div>
                                                </div>

                                                <div className="pt-6 space-y-3 border-t border-gray-50">
                                                    <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                                                        <span>Subtotal</span>
                                                        <span>Rs {selectedSizeData.price.toLocaleString()}.00</span>
                                                    </div>
                                                    <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                                                        <span>Shipment</span>
                                                        <span>Rs {shipping.toLocaleString()}.00</span>
                                                    </div>
                                                    <div className="flex justify-between text-base md:text-lg font-black text-black pt-4 border-t border-gray-100">
                                                        <span>Manifest Total</span>
                                                        <span className="text-[#B91C1C]">Rs {total.toLocaleString()}.00</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-6 md:space-y-8 md:border-l md:border-gray-100 md:pl-12">
                                                <div className="flex justify-between items-center">
                                                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Owner Details</h3>
                                                    <span className="text-[8px] font-black bg-black text-white px-2 py-0.5 uppercase tracking-widest">{paymentMethod === 'online' ? 'PAID' : 'PENDING'}</span>
                                                </div>

                                                <div className="grid grid-cols-1 gap-6">
                                                    <div>
                                                        <p className="text-[8px] font-black uppercase text-gray-400 tracking-widest mb-2">Authenticated Owner</p>
                                                        <p className="text-xs font-bold truncate">{customerInfo.firstName} {customerInfo.lastName}</p>
                                                        <p className="text-xs font-medium text-gray-400">{customerInfo.email}</p>
                                                    </div>

                                                    <div>
                                                        <p className="text-[8px] font-black uppercase text-gray-400 tracking-widest mb-2">Delivery Coordinates</p>
                                                        <p className="text-[10px] md:text-xs font-bold leading-relaxed">
                                                            {customerInfo.address}, {customerInfo.city}<br />
                                                            {customerInfo.phone}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="pt-4 space-y-3">
                                                    <Button
                                                        variant="whatsapp"
                                                        className="w-full h-12 md:h-14 rounded-none text-[10px]"
                                                        onClick={() => {
                                                            const orderRef = `DSL-${Math.floor(1000 + Math.random() * 9000)}`;
                                                            const authCode = verifyToken.split('-')[2] || 'DSL_GEN_AUTH';
                                                            const message = `*CUSTOM DESIGN RE-SEND*%0A%0A*AUTH: ${verifyToken}*%0A*REF: ${orderRef}*%0A%0A*TOTAL:* Rs ${total.toLocaleString()}`;
                                                            window.open(`https://wa.me/94776469180?text=${message}`, '_blank');
                                                        }}
                                                    >
                                                        SEND MANIFEST TO WHATSAPP
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        className="w-full h-12 md:h-14 rounded-none text-[10px] border-black"
                                                        onClick={() => router.push('/shop')}
                                                    >
                                                        CLOSE VAULT
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <>
                                        {step === 1 && (
                                            <motion.div
                                                key="step1"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="flex-1 flex flex-col items-center justify-center text-center py-4"
                                            >
                                                <div className="w-full max-w-md mx-auto mb-10">
                                                    <div className="grid grid-cols-2 gap-8 md:gap-12">
                                                        <ProductPreview image={customImage} scanImage={scanningImage} sizeRatio="aspect-[2/3]" />

                                                        <div className="text-left flex flex-col justify-center">
                                                            <div className="mb-6">
                                                                <h3 className="text-[8px] font-black uppercase text-gray-400 tracking-[0.3em] mb-2">Protocol Status</h3>
                                                                <div className={`text-xs font-black uppercase tracking-widest ${isVerified ? 'text-green-600' : 'text-[#B91C1C]'}`}>
                                                                    {isScanning ? 'Scanning...' : isVerified ? 'Asset Certified' : 'Awaiting Data'}
                                                                </div>
                                                            </div>

                                                            {isVerified && !isAuthorized && (
                                                                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                                                                    <p className="text-[8px] font-bold text-gray-500 uppercase leading-relaxed mb-4">
                                                                        Backend has issued verification token. Please authorize to unlock technical configuration.
                                                                    </p>
                                                                    <Button
                                                                        variant="vogue"
                                                                        className="w-full h-12 rounded-none bg-green-600 hover:bg-green-700 text-[10px]"
                                                                        onClick={() => {
                                                                            setIsAuthorized(true);
                                                                            setStep(2);
                                                                        }}
                                                                    >
                                                                        AUTHORIZE ASSET
                                                                    </Button>
                                                                </motion.div>
                                                            )}

                                                            {securityAlert && (
                                                                <div className="p-4 bg-red-50 border border-red-100 rounded-none">
                                                                    <h4 className="text-[8px] font-black text-red-600 uppercase mb-1">Security Alert</h4>
                                                                    <p className="text-[7px] font-bold text-red-500 leading-tight uppercase tracking-widest">{securityAlert}</p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full px-2">
                                                    <button
                                                        disabled={isScanning}
                                                        onClick={() => fileInputRef.current?.click()}
                                                        className={`p-6 md:p-8 rounded-none border border-gray-200 hover:border-black hover:bg-gray-50 transition-all flex flex-col items-center gap-3 group bg-white shadow-sm ${isScanning ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                    >
                                                        <Upload size={24} className="group-hover:scale-110 transition-transform" />
                                                        <span className="text-[10px] font-black uppercase tracking-widest">Local Hardware</span>
                                                    </button>
                                                    <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*" />

                                                    <div className="p-6 md:p-8 rounded-none border border-gray-200 flex flex-col items-center gap-3 bg-white shadow-sm">
                                                        <div className="flex items-center gap-2 w-full bg-gray-50 rounded-none px-4 py-3 md:py-2 border border-gray-100">
                                                            <Search size={14} className="text-gray-400" />
                                                            <input
                                                                disabled={isScanning}
                                                                type="text"
                                                                placeholder="Search Asset..."
                                                                className="bg-transparent border-none outline-none text-xs w-full py-1"
                                                                value={googleQuery}
                                                                onChange={(e) => setGoogleQuery(e.target.value)}
                                                            />
                                                        </div>
                                                        <Button
                                                            onClick={() => googleQuery && setStep(2)}
                                                            variant="vogue"
                                                            size="sm"
                                                            className="w-full h-10 md:h-12 rounded-none"
                                                            disabled={!googleQuery || isScanning}
                                                        >
                                                            MANUAL AUTH
                                                        </Button>
                                                    </div>

                                                    <div className="p-6 md:p-8 rounded-none border border-gray-200 flex flex-col items-center gap-3 bg-white shadow-sm">
                                                        <div className="flex items-center gap-2 w-full bg-gray-50 rounded-none px-4 py-3 md:py-2 border border-gray-100">
                                                            <ImageIcon size={14} className="text-gray-400" />
                                                            <input
                                                                disabled={isScanning}
                                                                type="text"
                                                                placeholder="URL Signature..."
                                                                className="bg-transparent border-none outline-none text-xs w-full py-1"
                                                                value={imageUrl}
                                                                onChange={(e) => setImageUrl(e.target.value)}
                                                            />
                                                        </div>
                                                        <Button
                                                            onClick={handleUrlSubmit}
                                                            variant="outline"
                                                            size="sm"
                                                            className="w-full h-10 md:h-12 rounded-none border-black"
                                                            disabled={!imageUrl || isScanning}
                                                        >
                                                            PROTOCOL VERIFY
                                                        </Button>
                                                    </div>
                                                </div>

                                                <div className="mt-8 flex items-center gap-2">
                                                    <div className={`w-1.5 h-1.5 rounded-full ${isScanning ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`} />
                                                    <p className="text-[8px] md:text-[10px] text-gray-400 font-black uppercase tracking-widest">
                                                        {isScanning ? 'System Busy: Scanning Security Protocol' : 'Verified Secure Architecture Ready'}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        )}

                                        {step === 2 && (
                                            <motion.div
                                                key="step2"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="flex-1 flex flex-col lg:flex-row gap-8 md:gap-12"
                                            >
                                                <div className="flex-1 order-2 lg:order-1">
                                                    <div className="flex items-center gap-3 mb-6 md:mb-10">
                                                        <div className="w-10 h-10 bg-black text-white rounded-none flex items-center justify-center">
                                                            <Ruler size={18} />
                                                        </div>
                                                        <h2 className="text-xl font-black uppercase tracking-tight">Verified Spec</h2>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-3 md:gap-4 mb-8 md:mb-10 overflow-y-auto max-h-[300px] md:max-h-[400px] pr-2 custom-scrollbar">
                                                        {sizes.map((s) => (
                                                            <button
                                                                key={s.id}
                                                                onClick={() => setSelectedSize(s.label)}
                                                                className={`p-5 md:p-6 rounded-none border-2 text-left transition-all ${selectedSize === s.label ? 'border-black bg-black text-white shadow-lg' : 'border-gray-100 hover:border-gray-300'}`}
                                                            >
                                                                <div className="flex justify-between items-start mb-1 md:mb-2">
                                                                    <span className={`text-[8px] md:text-[10px] font-black uppercase tracking-widest ${selectedSize === s.label ? 'opacity-60' : 'text-gray-400'}`}>{s.desc}</span>
                                                                    <span className="text-[9px] md:text-[10px] font-black">{s.price > 0 ? `Rs ${s.price.toLocaleString()}` : 'Negotiable'}</span>
                                                                </div>
                                                                <h3 className="text-xs md:text-sm font-bold">{s.label}</h3>
                                                            </button>
                                                        ))}
                                                    </div>

                                                    <div className="mt-auto flex gap-4 pt-4 md:pt-6">
                                                        <Button variant="outline" className="flex-1 h-14 rounded-none" onClick={() => setStep(1)}>BACK</Button>
                                                        <Button variant="vogue" className="flex-1 h-14 rounded-none" onClick={() => setStep(3)}>CONTINUE</Button>
                                                    </div>
                                                </div>

                                                {/* Realistic Product Preview Area */}
                                                <div className="w-full lg:w-[320px] bg-gray-50 rounded-none p-6 md:p-8 flex flex-col items-center justify-center border border-gray-100 order-1 lg:order-2">
                                                    <ProductPreview image={customImage} scanImage={scanningImage} sizeRatio={selectedSizeData.ratio} />
                                                </div>
                                            </motion.div>
                                        )}

                                        {step === 3 && (
                                            <motion.div
                                                key="step3"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="flex-1 flex flex-col lg:flex-row gap-8 md:gap-12"
                                            >
                                                <form onSubmit={handleWhatsAppBooking} className="flex-[2] space-y-6 md:space-y-8 order-2 lg:order-1">
                                                    <div>
                                                        <h3 className="text-xl font-black uppercase tracking-tight mb-4 md:mb-6">Vault Owner</h3>
                                                        <input
                                                            required
                                                            type="email"
                                                            name="email"
                                                            placeholder="Secure Email *"
                                                            value={customerInfo.email}
                                                            onChange={handleInputChange}
                                                            className="w-full px-5 py-4 bg-white border border-gray-200 rounded-none outline-none focus:border-black transition-colors text-sm"
                                                        />
                                                    </div>

                                                    <div>
                                                        <h3 className="text-xl font-black uppercase tracking-tight mb-4 md:mb-6">Target Coordinates</h3>
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <input
                                                                required
                                                                type="text"
                                                                name="firstName"
                                                                placeholder="First name *"
                                                                value={customerInfo.firstName}
                                                                onChange={handleInputChange}
                                                                className="w-full px-5 py-4 bg-white border border-gray-200 rounded-none outline-none focus:border-black transition-colors text-sm"
                                                            />
                                                            <input
                                                                required
                                                                type="text"
                                                                name="lastName"
                                                                placeholder="Last name *"
                                                                value={customerInfo.lastName}
                                                                onChange={handleInputChange}
                                                                className="w-full px-5 py-4 bg-white border border-gray-200 rounded-none outline-none focus:border-black transition-colors text-sm"
                                                            />
                                                            <input
                                                                required
                                                                type="text"
                                                                name="address"
                                                                placeholder="Full Shipping Address *"
                                                                value={customerInfo.address}
                                                                onChange={handleInputChange}
                                                                className="col-span-2 w-full px-5 py-4 bg-white border border-gray-200 rounded-none outline-none focus:border-black transition-colors text-sm"
                                                            />
                                                            <input
                                                                required
                                                                type="text"
                                                                name="city"
                                                                placeholder="City *"
                                                                value={customerInfo.city}
                                                                onChange={handleInputChange}
                                                                className="w-full px-5 py-4 bg-white border border-gray-200 rounded-none outline-none focus:border-black transition-colors text-sm"
                                                            />
                                                            <input
                                                                required
                                                                type="tel"
                                                                name="phone"
                                                                placeholder="WhatsApp Mobile *"
                                                                value={customerInfo.phone}
                                                                onChange={handleInputChange}
                                                                className="w-full px-5 py-4 bg-white border border-gray-200 rounded-none outline-none focus:border-black transition-colors text-sm"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <h3 className="text-xl font-black uppercase tracking-tight mb-4 md:mb-6">Payment Settlement</h3>
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setPaymentMethod(paymentMethod === 'bank' ? null : 'bank');
                                                                    if (paymentMethod !== 'bank') setShowPaymentAlert(true);
                                                                }}
                                                                className={`p-5 border-2 rounded-none text-left transition-all ${paymentMethod === 'bank' ? 'border-[#B91C1C] bg-white shadow-lg' : 'border-gray-100 hover:border-gray-200 bg-white'}`}
                                                            >
                                                                <div className="flex items-center gap-3 mb-2">
                                                                    <div className={`p-1.5 rounded-none ${paymentMethod === 'bank' ? 'bg-[#B91C1C]/10' : 'bg-gray-50'}`}>
                                                                        <div className={`w-2 h-2 rounded-full ${paymentMethod === 'bank' ? 'bg-[#B91C1C]' : 'bg-gray-300'}`} />
                                                                    </div>
                                                                    <span className={`text-[10px] font-black uppercase tracking-widest ${paymentMethod === 'bank' ? 'text-black' : 'text-gray-400'}`}>Bank Transfer</span>
                                                                </div>
                                                                <p className={`text-[8px] font-medium leading-tight ${paymentMethod === 'bank' ? 'text-[#B91C1C]' : 'text-gray-400'}`}>SECURE MANUAL SETTLEMENT</p>
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setPaymentMethod(paymentMethod === 'online' ? null : 'online');
                                                                    if (paymentMethod !== 'online') setShowPaymentAlert(true);
                                                                }}
                                                                className={`p-5 border-2 rounded-none text-left transition-all ${paymentMethod === 'online' ? 'border-[#B91C1C] bg-white shadow-lg' : 'border-gray-100 hover:border-gray-200 bg-white'}`}
                                                            >
                                                                <div className="flex items-center gap-3 mb-2">
                                                                    <div className={`p-1.5 rounded-none ${paymentMethod === 'online' ? 'bg-[#B91C1C]/10' : 'bg-gray-50'}`}>
                                                                        <div className={`w-2 h-2 rounded-full ${paymentMethod === 'online' ? 'bg-[#B91C1C]' : 'bg-gray-300'}`} />
                                                                    </div>
                                                                    <span className={`text-[10px] font-black uppercase tracking-widest ${paymentMethod === 'online' ? 'text-black' : 'text-gray-400'}`}>Pay Online</span>
                                                                </div>
                                                                <p className={`text-[8px] font-medium leading-tight ${paymentMethod === 'online' ? 'text-[#B91C1C]' : 'text-gray-400'}`}>CREDIT / DEBIT GATEWAY</p>
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <div className="pt-6 border-t border-gray-100 flex flex-col md:flex-row gap-4">
                                                        <Button type="button" variant="outline" className="w-full md:flex-1 h-14 rounded-none" onClick={() => setStep(2)}>BACK</Button>
                                                        <Button type="submit" variant="whatsapp" className="w-full md:flex-1 h-14 rounded-none shadow-xl shadow-green-500/10" icon={<MessageSquare size={18} />}>
                                                            CONFIRM & AUTHENTICATE
                                                        </Button>
                                                    </div>
                                                </form>

                                                <div className="flex-1 space-y-6 order-1 lg:order-2">
                                                    <div className="bg-gray-50 rounded-none p-6 md:p-8 border border-gray-100">
                                                        <div className="flex justify-between items-center mb-6 md:mb-8">
                                                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Vault Preview</h3>
                                                            <div className="px-2 py-1 bg-green-500/10 text-green-600 text-[6px] font-black uppercase tracking-widest border border-green-200">Verified</div>
                                                        </div>
                                                        <ProductPreview image={customImage} scanImage={scanningImage} sizeRatio={selectedSizeData.ratio} />

                                                        <div className="mt-8 space-y-3 border-t border-gray-200 pt-6">
                                                            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-500">
                                                                <span>Base Spec</span>
                                                                <span>Rs {selectedSizeData.price.toLocaleString()}</span>
                                                            </div>
                                                            <div className="flex justify-between text-base font-black uppercase pt-4 border-t border-gray-100">
                                                                <span>Booking Total</span>
                                                                <span className="text-[#B91C1C]">Rs {total.toLocaleString()}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </>
                                )}
                            </AnimatePresence>

                        </div>
                    </div>

                </div>

            </div>
            <AnimatePresence>
                {showPaymentAlert && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 backdrop-blur-md bg-black/40">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white border border-gray-100 p-8 md:p-12 max-w-md w-full rounded-none shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-[#B91C1C]" />
                            <div className="flex flex-col items-center text-center">
                                <div className="w-16 h-16 bg-black text-white rounded-none flex items-center justify-center mb-6 shadow-xl">
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
                                    className="w-full h-14 rounded-none text-xs tracking-widest font-black"
                                    onClick={() => setShowPaymentAlert(false)}
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
