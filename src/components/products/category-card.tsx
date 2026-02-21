import Image from 'next/image';
import Link from 'next/link';
import * as LucideIcons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { Category } from '@/types/category';

function getIcon(name: string): LucideIcon {
  const icons = LucideIcons as unknown as Record<string, LucideIcon>;
  return icons[name] || LucideIcons.Wrench;
}

interface CategoryCardProps {
  category: Category;
  productsLabel: string;
}

export function CategoryCard({ category, productsLabel }: CategoryCardProps) {
  const Icon = getIcon(category.lucideIcon);

  return (
    <Link
      href={`/products/${category.slug}`}
      className="group relative rounded-card overflow-hidden shadow-card border border-neutral-100 transition-all duration-300 hover:shadow-cardHover hover:-translate-y-1 block"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-secondary/80 via-brand-secondary/20 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-2 text-white">
            <Icon className="h-5 w-5" />
            <h3 className="text-lg font-semibold">{category.name}</h3>
          </div>
          <p className="text-xs text-neutral-200 mt-1">
            {category.productCount} {productsLabel}
          </p>
        </div>
      </div>
      <div className="p-4 bg-white">
        <p className="text-sm text-neutral-600 line-clamp-2">{category.description}</p>
      </div>
    </Link>
  );
}
