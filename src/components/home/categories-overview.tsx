import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/content/section-heading';
import { CategoryCard } from '@/components/products/category-card';
import { getCategories } from '@/lib/data';

export function CategoriesOverview() {
  const t = useTranslations('home.categories');
  const tc = useTranslations('common');
  const categories = getCategories();

  return (
    <Section className="bg-neutral-50">
      <SectionHeading title={t('title')} subtitle={t('subtitle')} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            productsLabel={tc('products')}
          />
        ))}
      </div>
    </Section>
  );
}
