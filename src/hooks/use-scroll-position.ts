'use client';

import { useState, useEffect } from 'react';

export function useScrollPosition(): { y: number; isScrolled: boolean } {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { y: scrollY, isScrolled: scrollY > 50 };
}
