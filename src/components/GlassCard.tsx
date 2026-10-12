import React from 'react';
import { twMerge } from 'tailwind-merge';

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverGlow?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className,
  hoverGlow = false,
  ...props 
}) => {
  return (
    <div
      className={twMerge(
        'bg-black/40 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg text-white',
        hoverGlow && 'transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] hover:border-white/40',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
