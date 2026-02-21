import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

type BadgeVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning';

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-neutral-100 text-neutral-700',
  primary: 'bg-brand-primary/10 text-brand-primary',
  secondary: 'bg-brand-secondary/10 text-brand-secondary',
  success: 'bg-semantic-success/10 text-semantic-success',
  warning: 'bg-semantic-warning/10 text-semantic-warning',
};

interface BadgeProps {
  variant?: BadgeVariant;
  className?: string;
  children: ReactNode;
}

export function Badge({ variant = 'default', className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-badge px-3 py-1 text-xs font-semibold',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
