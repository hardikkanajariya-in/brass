import { cn } from '@/lib/utils';

interface TimelineItem {
  year: number;
  title: string;
  description: string;
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export function Timeline({ items, className }: TimelineProps) {
  return (
    <div className={cn('relative', className)}>
      {/* Vertical line */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-neutral-200 md:left-1/2 md:-translate-x-px" />

      <div className="space-y-8">
        {items.map((item, index) => (
          <div
            key={item.year}
            className={cn(
              'relative flex flex-col md:flex-row md:items-center',
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            )}
          >
            {/* Dot */}
            <div className="absolute left-4 w-3 h-3 rounded-full bg-brand-primary border-2 border-white shadow-sm md:left-1/2 md:-translate-x-1.5 z-10" />

            {/* Content */}
            <div className={cn('ml-12 md:ml-0 md:w-1/2', index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12')}>
              <span className="inline-block text-sm font-bold text-brand-primary bg-brand-primary/10 px-3 py-1 rounded-full mb-2">
                {item.year}
              </span>
              <h3 className="text-lg font-semibold text-brand-secondary mb-1">{item.title}</h3>
              <p className="text-sm text-neutral-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
