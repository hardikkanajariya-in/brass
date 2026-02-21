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
  const { ref, isInView } = useIntersectionObserver({ threshold: 0.3 });
  const [displayValue, setDisplayValue] = useState(0);
  const numericValue = typeof value === 'string' ? parseInt(value.replace(/[^\d]/g, ''), 10) : value;
  const isNumeric = !isNaN(numericValue) && typeof value === 'number';

  useEffect(() => {
    if (!isInView || !isNumeric) return;

    const duration = 2000;
    const steps = 60;
    const increment = numericValue / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        setDisplayValue(numericValue);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, numericValue, isNumeric]);

  return (
    <div ref={ref} className={cn('text-center', className)}>
      <div className="text-4xl md:text-5xl font-bold text-brand-primary mb-2">
        {prefix}
        {isNumeric ? displayValue.toLocaleString() : value}
        {suffix}
      </div>
      <p className="text-sm text-neutral-600 font-medium">{label}</p>
    </div>
  );
}
