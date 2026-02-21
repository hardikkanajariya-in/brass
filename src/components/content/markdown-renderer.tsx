'use client';

import { useMemo } from 'react';
import { cn } from '@/lib/utils';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

interface ContentBlock {
  type: 'h2' | 'h3' | 'p';
  text: string;
  id?: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim();
}

function parseInline(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  // Match **bold** and *italic* patterns
  const regex = /(\*\*(.+?)\*\*)|(\*(.+?)\*)/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    if (match[1]) {
      // Bold
      nodes.push(
        <strong key={match.index} className="font-semibold text-brand-secondary">
          {match[2]}
        </strong>
      );
    } else if (match[3]) {
      // Italic
      nodes.push(
        <em key={match.index}>{match[4]}</em>
      );
    }

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes.length > 0 ? nodes : [text];
}

function parseContent(content: string): ContentBlock[] {
  const blocks: ContentBlock[] = [];
  const lines = content.split('\n\n');

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    if (trimmed.startsWith('### ')) {
      const text = trimmed.slice(4);
      blocks.push({ type: 'h3', text, id: slugify(text) });
    } else if (trimmed.startsWith('## ')) {
      const text = trimmed.slice(3);
      blocks.push({ type: 'h2', text, id: slugify(text) });
    } else {
      blocks.push({ type: 'p', text: trimmed });
    }
  }

  return blocks;
}

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  const blocks = useMemo(() => parseContent(content), [content]);

  return (
    <article className={cn('space-y-6', className)}>
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'h2':
            return (
              <h2
                key={i}
                id={block.id}
                className="text-xl sm:text-2xl font-bold text-brand-secondary mt-10 mb-4 pb-2 border-b border-neutral-100 scroll-mt-24"
              >
                {parseInline(block.text)}
              </h2>
            );
          case 'h3':
            return (
              <h3
                key={i}
                id={block.id}
                className="text-lg sm:text-xl font-semibold text-brand-secondary mt-8 mb-3 scroll-mt-24"
              >
                {parseInline(block.text)}
              </h3>
            );
          case 'p':
            return (
              <p
                key={i}
                className="text-neutral-600 leading-relaxed text-[15px] sm:text-base"
              >
                {parseInline(block.text)}
              </p>
            );
        }
      })}
    </article>
  );
}

export function extractHeadings(content: string): { text: string; id: string }[] {
  const headings: { text: string; id: string }[] = [];
  const lines = content.split('\n\n');

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('## ') && !trimmed.startsWith('### ')) {
      const text = trimmed.slice(3);
      headings.push({ text, id: slugify(text) });
    }
  }

  return headings;
}
