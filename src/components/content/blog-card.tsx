import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Calendar, Clock } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import type { BlogPost } from '@/types/blog';

interface BlogCardProps {
  post: BlogPost;
  readMoreLabel: string;
}

export function BlogCard({ post, readMoreLabel }: BlogCardProps) {
  const t = useTranslations('blog');
  return (
    <article className="group rounded-card bg-white overflow-hidden shadow-card border border-neutral-100 transition-all duration-300 hover:shadow-cardHover hover:-translate-y-1">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute top-3 left-3">
            <Badge variant="primary">{post.category}</Badge>
          </div>
        </div>
      </Link>
      <div className="p-6">
        <div className="flex items-center gap-4 text-xs text-neutral-500 mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {formatDate(post.publishedAt)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {t('minRead', { time: post.readTime })}
          </span>
        </div>
        <Link href={`/blog/${post.slug}`}>
          <h3 className="text-lg font-semibold text-brand-secondary mb-2 group-hover:text-brand-primary transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>
        <p className="text-sm text-neutral-600 mb-4 line-clamp-3">{post.excerpt}</p>
        <Link
          href={`/blog/${post.slug}`}
          className="text-sm font-semibold text-brand-primary hover:underline"
        >
          {readMoreLabel} →
        </Link>
      </div>
    </article>
  );
}
