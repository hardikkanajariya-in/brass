'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

export function ContactForm() {
  const t = useTranslations('contact');

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="space-y-6 rounded-card bg-white p-6 md:p-8 shadow-card border border-neutral-100"
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1.5">
            {t('form.name')} *
          </label>
          <input
            id="name"
            type="text"
            required
            className="w-full rounded-input border border-neutral-300 px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
            placeholder={t('form.namePlaceholder')}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1.5">
            {t('form.email')} *
          </label>
          <input
            id="email"
            type="email"
            required
            className="w-full rounded-input border border-neutral-300 px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
            placeholder={t('form.emailPlaceholder')}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1.5">
            {t('form.phone')}
          </label>
          <input
            id="phone"
            type="tel"
            className="w-full rounded-input border border-neutral-300 px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
            placeholder={t('form.phonePlaceholder')}
          />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-neutral-700 mb-1.5">
            {t('form.company')}
          </label>
          <input
            id="company"
            type="text"
            className="w-full rounded-input border border-neutral-300 px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
            placeholder={t('form.companyPlaceholder')}
          />
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 mb-1.5">
          {t('form.subject')} *
        </label>
        <input
          id="subject"
          type="text"
          required
          className="w-full rounded-input border border-neutral-300 px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
          placeholder={t('form.subjectPlaceholder')}
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1.5">
          {t('form.message')} *
        </label>
        <textarea
          id="message"
          rows={5}
          required
          className="w-full rounded-input border border-neutral-300 px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 resize-none"
          placeholder={t('form.messagePlaceholder')}
        />
      </div>
      <Button type="submit" size="lg" className="w-full sm:w-auto">
        <Send className="h-4 w-4" />
        {t('form.submit')}
      </Button>
    </form>
  );
}
