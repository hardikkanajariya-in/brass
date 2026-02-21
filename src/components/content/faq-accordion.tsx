'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { FAQ } from '@/types/common';

interface FaqAccordionProps {
  faqs: FAQ[];
}

export function FaqAccordion({ faqs }: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <div className="space-y-3">
      {faqs.map((faq) => {
        const isOpen = openId === faq.id;
        return (
          <div
            key={faq.id}
            className="rounded-card border border-neutral-200 bg-white overflow-hidden transition-shadow hover:shadow-card"
          >
            <button
              onClick={() => setOpenId(isOpen ? null : faq.id)}
              className="flex w-full items-center justify-between px-6 py-4 text-left cursor-pointer"
              aria-expanded={isOpen}
            >
              <span className="text-sm font-semibold text-brand-secondary pr-4">{faq.question}</span>
              <ChevronDown
                className={cn(
                  'h-5 w-5 shrink-0 text-neutral-400 transition-transform duration-200',
                  isOpen && 'rotate-180 text-brand-primary'
                )}
              />
            </button>
            <div
              className={cn(
                'overflow-hidden transition-all duration-300',
                isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              )}
            >
              <p className="px-6 pb-4 text-sm text-neutral-600 leading-relaxed">{faq.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
