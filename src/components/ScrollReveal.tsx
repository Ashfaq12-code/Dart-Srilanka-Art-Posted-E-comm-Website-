'use client';

import { useEffect, useRef, ReactNode } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right' | 'fade';

interface ScrollRevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;      // ms
  duration?: number;   // ms
  distance?: number;   // px
  className?: string;
  once?: boolean;      // animate only once (default true)
}

export function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 200,
  distance = 15,
  className = '',
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Initial hidden state applied inline so CSS does not cause layout shift
    const translateMap: Record<Direction, string> = {
      up:    `translateY(${distance}px)`,
      down:  `translateY(-${distance}px)`,
      left:  `translateX(${distance}px)`,
      right: `translateX(-${distance}px)`,
      fade:  'none',
    };

    el.style.opacity = '0';
    el.style.transform = translateMap[direction];
    el.style.transition = `opacity ${duration}ms ease, transform ${duration}ms ease`;
    el.style.transitionDelay = `${delay}ms`;
    el.style.willChange = 'opacity, transform';

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            el.style.opacity = '1';
            el.style.transform = 'none';
            if (once) observer.unobserve(el);
          } else if (!once) {
            el.style.opacity = '0';
            el.style.transform = translateMap[direction];
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [direction, delay, duration, distance, once]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
