import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  categorySlug: string;
  viewDetailsLabel: string;
}

export function ProductCard({ product, categorySlug, viewDetailsLabel }: ProductCardProps) {
  const href = `/products/${categorySlug}/${product.slug}`;

  return (
    <div className="group rounded-card bg-white overflow-hidden shadow-card border border-neutral-100 transition-all duration-300 hover:shadow-cardHover hover:-translate-y-1">
      <Link href={href} className="block relative aspect-square overflow-hidden bg-neutral-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {product.isFeatured && <Badge variant="primary">Featured</Badge>}
          {product.isNew && <Badge variant="success">New</Badge>}
        </div>
      </Link>
      <div className="p-4">
        <Link href={href}>
          <h3 className="text-sm font-semibold text-brand-secondary mb-1 group-hover:text-brand-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-neutral-500 mb-3 line-clamp-2">{product.shortDescription}</p>
        <div className="flex flex-wrap gap-1 mb-3">
          <span className="text-[10px] bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-full">
            {product.specifications.material.split('/')[0].trim()}
          </span>
          <span className="text-[10px] bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-full">
            {product.specifications.size}
          </span>
        </div>
        <Button href={href} variant="outline" size="sm" className="w-full text-xs">
          {viewDetailsLabel}
        </Button>
      </div>
    </div>
  );
}
