'use client';

import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/section';
import { StatCounter } from '@/components/content/stat-counter';

export function StatsSection() {
  const t = useTranslations('home.stats');

  const stats = [
    { value: 28, label: t('experience'), suffix: '+' },
    { value: 500, label: t('products'), suffix: '+' },
    { value: 30, label: t('countries'), suffix: '+' },
    { value: 1500, label: t('clients'), suffix: '+' },
  ];

  return (
    <Section className="bg-brand-secondary text-white">
      <div className="grid grid-cols-2 gap-4 sm:gap-8 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCounter
            key={stat.label}
            value={stat.value}
            label={stat.label}
            suffix={stat.suffix}
          />
        ))}
      </div>
    </Section>
  );
}
