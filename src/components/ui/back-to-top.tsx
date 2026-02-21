'use client';

import { ArrowUp } from 'lucide-react';
import { useScrollPosition } from '@/hooks/use-scroll-position';
import { cn } from '@/lib/utils';

export function BackToTop() {
  const { isScrolled } = useScrollPosition();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className={cn(
        'fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-brand-primary text-white shadow-lg transition-all duration-300 hover:bg-brand-primary/90 hover:scale-110 cursor-pointer',
        isScrolled ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0 pointer-events-none'
      )}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
