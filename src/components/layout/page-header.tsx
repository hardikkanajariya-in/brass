import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
  children?: ReactNode;
}

export function PageHeader({ title, description, className, children }: PageHeaderProps) {
  return (
    <div className={cn('bg-gradient-to-r from-brand-secondary to-brand-secondary/90 text-white py-12 sm:py-16 md:py-20 lg:py-24', className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-5">{title}</h1>
        {description && (
          <p className="text-sm sm:text-base md:text-lg text-neutral-200 max-w-2xl leading-relaxed">{description}</p>
        )}
        {children}
      </div>
    </div>
  );
}
