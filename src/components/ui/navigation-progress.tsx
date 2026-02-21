'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { usePathname } from 'next/navigation';

export function NavigationProgress() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startProgress = useCallback(() => {
    setIsNavigating(true);
    setIsVisible(true);
    setProgress(0);

    // Clear any existing interval
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    // Animate progress in stages: fast to 30%, slow to 70%, very slow to 90%
    let current = 0;
    intervalRef.current = setInterval(() => {
      current += current < 30 ? 8 : current < 70 ? 3 : 0.5;
      if (current >= 90) {
        current = 90;
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
      setProgress(current);
    }, 50);
  }, []);

  const completeProgress = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    setProgress(100);
    timeoutRef.current = setTimeout(() => {
      setIsNavigating(false);
      timeoutRef.current = setTimeout(() => {
        setIsVisible(false);
        setProgress(0);
      }, 200);
    }, 300);
  }, []);

  // Complete progress when pathname changes
  useEffect(() => {
    if (isNavigating) {
      completeProgress();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Intercept link clicks to start progress
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');

      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href) return;

      // Only intercept internal navigation (same origin, not hash-only, not external)
      if (
        href.startsWith('/') &&
        !href.startsWith('//') &&
        href !== pathname &&
        !href.startsWith('#') &&
        !anchor.hasAttribute('download') &&
        anchor.target !== '_blank'
      ) {
        startProgress();
      }
    };

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, [pathname, startProgress]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[100] h-[3px] pointer-events-none"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full bg-gradient-to-r from-brand-primary via-brand-accent to-brand-primary transition-all duration-200 ease-out"
        style={{
          width: `${progress}%`,
          opacity: isNavigating ? 1 : 0,
          transition: progress === 100
            ? 'width 300ms ease-out, opacity 200ms ease-out 300ms'
            : 'width 200ms ease-out',
        }}
      >
        {/* Glow effect at the tip */}
        <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white/40 to-transparent" />
        <div className="absolute right-0 top-0 h-[5px] w-3 rounded-full bg-white/60 shadow-[0_0_10px_var(--colors-brand-primary),0_0_5px_var(--colors-brand-primary)]" />
      </div>
    </div>
  );
}
