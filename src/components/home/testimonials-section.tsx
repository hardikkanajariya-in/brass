import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/content/section-heading';
import { TestimonialCard } from '@/components/content/testimonial-card';
import { getTestimonials } from '@/lib/data';

export function TestimonialsSection() {
  const t = useTranslations('home.testimonials');
  const testimonials = getTestimonials();

  return (
    <Section>
      <SectionHeading title={t('title')} subtitle={t('subtitle')} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
    </Section>
  );
}
