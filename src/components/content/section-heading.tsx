import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeading({ title, subtitle, centered = true, className }: SectionHeadingProps) {
  return (
    <div className={cn('mb-10 sm:mb-14', centered && 'text-center', className)}>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-secondary mb-3 sm:mb-4">{title}</h2>
      {subtitle && (
        <p className={cn('text-neutral-600 text-base sm:text-lg max-w-2xl', centered && 'mx-auto')}>{subtitle}</p>
      )}
      <div className={cn('mt-3 sm:mt-4 h-1 w-16 rounded-full bg-brand-primary', centered && 'mx-auto')} />
    </div>
  );
}
