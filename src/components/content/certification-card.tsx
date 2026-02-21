import Image from 'next/image';
import { ShieldCheck } from 'lucide-react';
import type { Certification } from '@/types/certification';

interface CertificationCardProps {
  certification: Certification;
}

export function CertificationCard({ certification }: CertificationCardProps) {
  return (
    <div className="rounded-card bg-white p-6 shadow-card border border-neutral-100 text-center transition-all duration-300 hover:shadow-cardHover hover:-translate-y-1">
      <div className="relative mx-auto mb-4 h-40 w-full overflow-hidden rounded-lg">
        <Image
          src={certification.image}
          alt={certification.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="flex items-center justify-center gap-2 mb-2">
        <ShieldCheck className="h-5 w-5 text-brand-primary" />
        <h3 className="text-lg font-semibold text-brand-secondary">{certification.name}</h3>
      </div>
      <p className="text-sm text-neutral-600 mb-3">{certification.description}</p>
      <div className="text-xs text-neutral-400">
        <span>{certification.issuedBy}</span>
        <span className="mx-1">·</span>
        <span>Valid until {certification.validUntil}</span>
      </div>
    </div>
  );
}
