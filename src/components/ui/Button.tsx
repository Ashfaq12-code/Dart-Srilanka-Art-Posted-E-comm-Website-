'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'whatsapp' | 'outline' | 'ghost' | 'vogue';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'icon';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button = ({
  children,
  variant = 'vogue',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left',
  className,
  disabled,
  ...props
}: ButtonProps) => {

  const variants = {
    vogue: "bg-black text-white hover:bg-[#1a1a1a] border-none shadow-lg shadow-black/10",
    primary: "bg-[#B91C1C] text-white hover:bg-[#991B1B] border-none shadow-lg shadow-red-900/10",
    secondary: "bg-[#1e3a8a] text-white hover:bg-[#1e3a8a]/90 border-none shadow-lg shadow-blue-900/10",
    whatsapp: "bg-[#25D366] text-white hover:bg-[#1da851] border-none shadow-lg shadow-green-900/10",
    outline: "bg-transparent border-2 border-black text-black hover:bg-black hover:text-white",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-600"
  };

  const sizes = {
    sm: "px-4 py-2 text-[10px] h-9 md:h-10",
    md: "px-6 md:px-8 py-3.5 text-[10px] md:text-[11px] h-12 md:h-14",
    lg: "px-8 md:px-12 py-4.5 text-[11px] md:text-[12px] h-14 md:h-16",
    xl: "px-10 md:px-14 py-5 text-[12px] md:text-[13px] h-16 md:h-20",
    full: "w-full py-4.5 text-[11px] md:text-[12px] h-14 md:h-16",
    icon: "w-10 h-10 md:w-12 md:h-12 flex items-center justify-center p-0"
  };

  return (
    <motion.button
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className={twMerge(
        "relative flex items-center justify-center gap-3 font-black tracking-[0.2em] uppercase transition-all duration-300 rounded-lg select-none disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden",
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {/* Loading Spinner */}
      {loading && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full mr-1"
        />
      )}

      {!loading && icon && iconPosition === 'left' && (
        <span className="flex-shrink-0">{icon}</span>
      )}

      <span className="relative z-10">{children}</span>

      {!loading && icon && iconPosition === 'right' && (
        <span className="flex-shrink-0">{icon}</span>
      )}
      
      {/* Subtle shine effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
    </motion.button>
  );
};
