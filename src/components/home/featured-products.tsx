import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/content/section-heading';
import { ProductCard } from '@/components/products/product-card';
import { Button } from '@/components/ui/button';
import { getFeaturedProducts, getCategoryById } from '@/lib/data';
import { ArrowRight } from 'lucide-react';

export function FeaturedProducts() {
  const t = useTranslations('home.featured');
  const tc = useTranslations('common');
  const products = getFeaturedProducts();

  return (
    <Section>
      <SectionHeading title={t('title')} subtitle={t('subtitle')} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => {
          const category = getCategoryById(product.categoryId);
          return (
            <ProductCard
              key={product.id}
              product={product}
              categorySlug={category?.slug ?? 'products'}
              viewDetailsLabel={tc('viewDetails')}
            />
          );
        })}
      </div>
      <div className="text-center mt-10">
        <Button href="/products" variant="outline" size="lg">
          {t('viewAll')}
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </Section>
  );
}
