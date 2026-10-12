'use client';

import Link from 'next/link';
import {
  Truck,
  ShieldCheck,
  PackageSearch,
  ChevronUp,
  Mail,
  MapPin,
  Clock,
  Phone,
  CreditCard,
  CheckCircle2
} from 'lucide-react';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaWhatsapp, FaTiktok } from 'react-icons/fa';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-white text-black mt-20 font-sans overflow-hidden border-t border-gray-100">

      {/* PREMIUM RED GLOW SHADOWS */}
      <div className="absolute top-0 left-1/4 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#B91C1C]/20 to-transparent blur-sm" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#B91C1C]/[0.02] blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#B91C1C]/[0.01] blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />




      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-12">

          {/* Column 1: Brand & Bio */}
          <div className="space-y-8">
            <Link href="/" className="inline-block group">
              <div className="flex items-center gap-3">
                {/* Rounded Outline Emblem */}
                <div className="w-12 h-12 rounded-full border-[3px] border-black flex items-center justify-center group-hover:border-[#B91C1C] group-hover:bg-[#B91C1C] transition-all duration-500 shadow-sm">
                  <span className="text-xl font-black text-black group-hover:text-white transition-colors tracking-tighter">D.</span>
                </div>
                {/* Text Logo */}
                <div className="flex items-end tracking-[-0.05em]">
                  <span className="text-3xl font-black uppercase text-black">DARTS</span>
                  <span className="text-[#B91C1C] text-4xl font-black leading-[0] mb-1.5 ml-0.5">.</span>
                </div>
              </div>
            </Link>
            <p className="text-sm text-gray-500 font-medium leading-relaxed max-w-xs">
              Sri Lanka's premier studio for high-end acrylic design prints. We transform your favorite movies, vehicles, and gaming characters into stunning wall-mounted masterpieces.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/share/1DvsfbsY3x/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-gray-50 hover:bg-[#B91C1C] hover:text-white transition-all flex items-center justify-center text-gray-400 border border-gray-100"><FaFacebookF size={14} /></a>
              <a href="https://www.instagram.com/dartssrilanka" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-gray-50 hover:bg-[#B91C1C] hover:text-white transition-all flex items-center justify-center text-gray-400 border border-gray-100"><FaInstagram size={14} /></a>
              <a href="https://wa.me/94776207299" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-gray-50 hover:bg-[#B91C1C] hover:text-white transition-all flex items-center justify-center text-gray-400 border border-gray-100"><FaWhatsapp size={14} /></a>
              <a href="https://www.tiktok.com/@dartssrilanka" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-gray-50 hover:bg-[#B91C1C] hover:text-white transition-all flex items-center justify-center text-gray-400 border border-gray-100"><FaTiktok size={14} /></a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-900 mb-8 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-[#B91C1C]"></span> Explore
            </h3>
            <ul className="space-y-4">
              {['Vehicle Designs', 'Gamers Hub', 'Movie Classics', 'Marvel Universe', 'Anime Series', 'Typographic Art'].map((item) => (
                <li key={item}>
                  <Link href={`/shop?cat=${item.split(' ')[0]}`} className="text-sm font-bold text-gray-500 hover:text-[#B91C1C] hover:translate-x-1 transition-all inline-block uppercase tracking-wider">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-900 mb-8 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-[#B91C1C]"></span> Studio
            </h3>
            <ul className="space-y-6">
              <li className="flex gap-4 items-start">
                <div className="w-10 h-10 shrink-0 rounded-2xl bg-gray-50 flex items-center justify-center text-[#B91C1C] border border-gray-100"><MapPin size={18} /></div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Location</p>
                  <span className="text-sm font-bold text-gray-700">7th Floor, Premium Tower, Colombo, SL.</span>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <div className="w-10 h-10 shrink-0 rounded-2xl bg-gray-50 flex items-center justify-center text-[#B91C1C] border border-gray-100"><Phone size={18} /></div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Hotline</p>
                  <a href="tel:+94776207299" className="text-sm font-bold text-gray-700 hover:text-[#B91C1C] transition-all">077 620 7299</a>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <div className="w-10 h-10 shrink-0 rounded-2xl bg-gray-50 flex items-center justify-center text-[#B91C1C] border border-gray-100"><Mail size={18} /></div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Email Us</p>
                  <span className="text-sm font-bold text-gray-700">orders@dartsrilanka.com</span>
                </div>
              </li>
            </ul>
          </div>


        </div>

        {/* 3. Bottom Bar: Legal & Payment */}
        <div className="mt-20 pt-10 border-t border-gray-100">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-10">

            <div className="flex flex-col items-center lg:items-start gap-2">
              <p className="text-[10px] font-black text-black-400 uppercase tracking-[0.2em] text-center lg:text-left">
                © {new Date().getFullYear()} <span className="text-[#B91C1C]">Dartsrilanka.</span> Powered By ALH (Pvt) Ltd.
              </p>
              <div className="flex gap-6 mt-2">
                <Link href="/privacy" className="text-[9px] font-bold text-gray-400 hover:text-black uppercase tracking-widest">Privacy Policy</Link>
                <Link href="/terms" className="text-[9px] font-bold text-gray-400 hover:text-black uppercase tracking-widest">Terms of Service</Link>
              </div>
            </div>

            {/* REALISTIC PAYMENT ICONS */}
            <div className="flex flex-wrap justify-center items-center gap-6 saturate-0 opacity-40 hover:saturate-100 hover:opacity-100 transition-all duration-700">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4 md:h-5 " />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6 md:h-7" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-5 md:h-6" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg" alt="Amex" className="h-6 md:h-7" />
            </div>

            {/* BACK TO TOP BUTTON */}
            <button
              onClick={scrollToTop}
              className="w-14 h-14 bg-black text-white hover:bg-[#B91C1C] rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-90 group relative overflow-hidden"
              aria-label="Back to Top"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-[#B91C1C] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <ChevronUp size={24} className="relative z-10 group-hover:-translate-y-1 transition-transform" />
            </button>

          </div>
        </div>
      </div>

      {/* MOBILE RESPONSIVE FIX FOR CENTERED LAYOUT */}
      <style jsx>{`
        @media (max-width: 768px) {
          footer {
            text-align: left;
          }
          .flex-start {
            justify-content: flex-start;
          }
          ul {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </footer>
  );
};

