import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { ArrowRight, CheckCircle } from 'lucide-react';
import siteConfig from '@config';

export function HeroSection() {
  const t = useTranslations('home.hero');
  const tc = useTranslations('common');

  return (
    <section className="relative min-h-[480px] sm:min-h-[550px] lg:min-h-[700px] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src={siteConfig.images.hero}
          alt={t('imageAlt')}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-secondary/90 via-brand-secondary/70 to-brand-secondary/40" />
      </div>

      <Container className="relative z-10 py-20">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-primary/20 px-4 py-1.5 text-sm font-medium text-brand-primary mb-6">
            <CheckCircle className="h-4 w-4" />
            {t('badge')}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 sm:mb-6">
            {t('title')}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-neutral-200 mb-6 sm:mb-8 leading-relaxed">
            {t('subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <Button href="/products" size="lg">
              {t('exploreProducts')}
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button href="/request-quote" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-brand-secondary">
              {tc('requestQuote')}
            </Button>
          </div>
        </div>
      </Container>

      {/* Decorative brass-accent strip */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-primary via-brand-accent to-brand-primary" />
    </section>
  );
}
