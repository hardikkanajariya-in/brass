import Image from 'next/image';
import * as LucideIcons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { Service } from '@/types/service';
import { Button } from '@/components/ui/button';

function getIcon(name: string): LucideIcon {
  const icons = LucideIcons as unknown as Record<string, LucideIcon>;
  return icons[name] || LucideIcons.Star;
}

interface ServiceCardProps {
  service: Service;
  learnMoreLabel: string;
}

export function ServiceCard({ service, learnMoreLabel }: ServiceCardProps) {
  const Icon = getIcon(service.icon);

  return (
    <div className="group rounded-card bg-white overflow-hidden shadow-card border border-neutral-100 transition-all duration-300 hover:shadow-cardHover hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-brand-primary text-white">
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-brand-secondary mb-2">{service.title}</h3>
        <p className="text-sm text-neutral-600 mb-4">{service.shortDescription}</p>
        <ul className="space-y-1.5 mb-4">
          {service.features.slice(0, 4).map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-neutral-600">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-primary shrink-0" />
              {f}
            </li>
          ))}
        </ul>
        <Button href={`/services#${service.slug}`} variant="outline" size="sm" className="w-full">
          {learnMoreLabel}
        </Button>
      </div>
    </div>
  );
}
