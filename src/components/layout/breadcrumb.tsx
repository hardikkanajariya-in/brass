import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { Container } from '@/components/ui/container';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="bg-neutral-50 border-b border-neutral-100">
      <Container className="py-3">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li>
              <Link href="/" className="flex items-center text-neutral-500 hover:text-brand-primary transition-colors">
                <Home className="h-4 w-4" />
              </Link>
            </li>
            {items.map((item, index) => (
              <li key={index} className="flex items-center gap-1.5">
                <ChevronRight className="h-3.5 w-3.5 text-neutral-400" />
                {item.href ? (
                  <Link href={item.href} className="text-neutral-500 hover:text-brand-primary transition-colors">
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-neutral-800 font-medium">{item.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </Container>
    </div>
  );
}
