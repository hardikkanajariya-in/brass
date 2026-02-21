'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState, type ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setDisplayChildren(children);
      setIsTransitioning(false);
    }, 50);
    return () => clearTimeout(timer);
  }, [pathname, children]);

  return (
    <div
      className={`transition-all duration-300 ease-out ${
        isTransitioning
          ? 'opacity-0 translate-y-2'
          : 'opacity-100 translate-y-0'
      }`}
    >
      {displayChildren}
    </div>
  );
}
