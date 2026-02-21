'use client';

import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface StatCounterProps {
  value: number | string;
  label: string;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export function StatCounter({ value, label, suffix = '', prefix = '', className }: StatCounterProps) {
  const { ref, isInView } = useIntersectionObserver({ threshold: 0.05, rootMargin: '50px' });
  const numericValue = typeof value === 'string' ? parseInt(value.replace(/[^\d]/g, ''), 10) : value;
  const isNumeric = !isNaN(numericValue) && numericValue > 0;
  const [displayValue, setDisplayValue] = useState(isNumeric ? numericValue : 0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!isInView || !isNumeric || hasAnimated) return;

    // Reset to 0 and animate up
    setDisplayValue(0);
    const duration = 2000;
    const steps = 60;
    const increment = numericValue / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        setDisplayValue(numericValue);
        clearInterval(timer);
        setHasAnimated(true);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, numericValue, isNumeric, hasAnimated]);

  return (
    <div ref={ref} className={cn('text-center', className)}>
      <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-primary mb-2">
        {prefix}
        {isNumeric ? displayValue.toLocaleString() : value}
        {suffix}
      </div>
      <p className="text-sm font-medium opacity-80">{label}</p>
    </div>
  );
}
