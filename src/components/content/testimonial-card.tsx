import { Star } from 'lucide-react';
import Image from 'next/image';
import type { Testimonial } from '@/types/testimonial';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="rounded-card bg-white p-6 shadow-card border border-neutral-100 flex flex-col h-full">
      <div className="flex items-center gap-1 mb-4">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < testimonial.rating ? 'fill-brand-primary text-brand-primary' : 'text-neutral-300'}`}
          />
        ))}
      </div>
      <p className="text-sm text-neutral-600 leading-relaxed flex-1 mb-6">
        &ldquo;{testimonial.text}&rdquo;
      </p>
      <div className="flex items-center gap-3 pt-4 border-t border-neutral-100">
        <div className="relative h-10 w-10 overflow-hidden rounded-full shrink-0">
          <Image src={testimonial.image} alt={testimonial.name} fill className="object-cover" sizes="40px" />
        </div>
        <div>
          <p className="text-sm font-semibold text-brand-secondary">{testimonial.name}</p>
          <p className="text-xs text-neutral-500">{testimonial.role}, {testimonial.company}</p>
          <p className="text-xs text-neutral-400">{testimonial.country}</p>
        </div>
      </div>
    </div>
  );
}
