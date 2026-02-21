import { cn } from '@/lib/utils';
import * as LucideIcons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  className?: string;
}

function getIcon(name: string): LucideIcon {
  const icons = LucideIcons as unknown as Record<string, LucideIcon>;
  return icons[name] || LucideIcons.Star;
}

export function FeatureCard({ icon, title, description, className }: FeatureCardProps) {
  const Icon = getIcon(icon);

  return (
    <div className={cn('group rounded-card bg-white p-6 shadow-card transition-all duration-300 hover:shadow-cardHover hover:-translate-y-1 border border-neutral-100', className)}>
      <div className="mb-4 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-brand-primary/10 text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors">
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="text-lg font-semibold text-brand-secondary mb-2">{title}</h3>
      <p className="text-sm text-neutral-600 leading-relaxed">{description}</p>
    </div>
  );
}
