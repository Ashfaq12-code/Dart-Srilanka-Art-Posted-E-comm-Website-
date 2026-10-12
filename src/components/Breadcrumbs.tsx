'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumbs = () => {
  const pathname = usePathname();
  if (pathname === '/') return null; // Don't show on home page

  const paths = pathname.split('/').filter((p) => p !== '');

  return (
    <div className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-4 lg:py-6">
        <nav className="flex flex-col items-center justify-center space-y-2">
          {/* Page Title */}
          <h1 className="text-2xl lg:text-3xl font-black text-gray-900 tracking-tighter italic">
            {(paths[paths.length - 1]?.replace(/-/g, ' ') || 'Shop').charAt(0).toUpperCase() + (paths[paths.length - 1]?.replace(/-/g, ' ') || 'Shop').slice(1)}
          </h1>
          
          {/* Breadcrumb Path */}
          <div className="flex items-center text-[11px] font-bold text-gray-400">
            <Link href="/" className="hover:text-[#B91C1C] transition-colors flex items-center gap-1.5 group">
              <Home size={12} className="group-hover:scale-110 transition-transform" /> 
              <span>Home</span>
            </Link>
            
            {paths.map((path, index) => {
              const href = `/${paths.slice(0, index + 1).join('/')}`;
              const isLast = index === paths.length - 1;
              const title = path.replace(/-/g, ' ');

              return (
                <div key={path} className="flex items-center">
                  <ChevronRight size={12} className="mx-3 text-gray-300" />
                  {isLast ? (
                    <span className="text-[#B91C1C] capitalize">{title}</span>
                  ) : (
                    <Link href={href} className="hover:text-[#B91C1C] transition-colors capitalize">
                      {title}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
};
