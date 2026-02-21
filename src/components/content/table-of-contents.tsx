'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { List } from 'lucide-react';

interface TableOfContentsProps {
  headings: { text: string; id: string }[];
  title: string;
}

export function TableOfContents({ headings, title }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0.1 }
    );

    for (const heading of headings) {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2 text-sm font-semibold text-brand-secondary mb-4">
        <List className="w-4 h-4" />
        {title}
      </div>
      <ul className="space-y-1">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={cn(
                'block text-sm py-1.5 px-3 rounded-lg transition-all duration-200 hover:text-brand-primary hover:bg-brand-primary/5',
                activeId === heading.id
                  ? 'text-brand-primary bg-brand-primary/5 font-medium border-l-2 border-brand-primary'
                  : 'text-neutral-500'
              )}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
