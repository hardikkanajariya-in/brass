import { ProductCard } from './product-card';
import type { Product } from '@/types/product';

interface ProductGridProps {
  products: Product[];
  categorySlug: string;
  viewDetailsLabel: string;
}

export function ProductGrid({ products, categorySlug, viewDetailsLabel }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-neutral-500">No products found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          categorySlug={categorySlug}
          viewDetailsLabel={viewDetailsLabel}
        />
      ))}
    </div>
  );
}
