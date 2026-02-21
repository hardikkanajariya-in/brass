import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { ArrowRight } from 'lucide-react';
import siteConfig from '@config';

export function CtaSection() {
  const t = useTranslations('home.cta');

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={siteConfig.images.ctaBackground}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-brand-secondary/85" />
      </div>
      <Container className="relative z-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('title')}</h2>
        <p className="text-lg text-neutral-200 max-w-2xl mx-auto mb-8">{t('subtitle')}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="/request-quote" size="lg">
            {t('primaryButton')}
            <ArrowRight className="h-5 w-5" />
          </Button>
          <Button href="/contact" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-brand-secondary">
            {t('secondaryButton')}
          </Button>
        </div>
      </Container>
    </section>
  );
}
