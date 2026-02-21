import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/content/section-heading';
import { FeatureCard } from '@/components/content/feature-card';

const WHY_CHOOSE_ITEMS = [
  { icon: 'Award', titleKey: 'feature1.title', descKey: 'feature1.description' },
  { icon: 'Factory', titleKey: 'feature2.title', descKey: 'feature2.description' },
  { icon: 'Globe', titleKey: 'feature3.title', descKey: 'feature3.description' },
  { icon: 'ShieldCheck', titleKey: 'feature4.title', descKey: 'feature4.description' },
  { icon: 'Truck', titleKey: 'feature5.title', descKey: 'feature5.description' },
  { icon: 'Headset', titleKey: 'feature6.title', descKey: 'feature6.description' },
];

export function WhyChooseUs() {
  const t = useTranslations('home.whyUs');

  return (
    <Section className="bg-neutral-50">
      <SectionHeading title={t('title')} subtitle={t('subtitle')} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {WHY_CHOOSE_ITEMS.map((item) => (
          <FeatureCard
            key={item.titleKey}
            icon={item.icon}
            title={t(item.titleKey)}
            description={t(item.descKey)}
          />
        ))}
      </div>
    </Section>
  );
}
