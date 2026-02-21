'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { getCategories } from '@/lib/data';

export function QuoteRequestForm() {
  const t = useTranslations('quote');
  const categories = getCategories();

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="space-y-6 rounded-card bg-white p-6 md:p-8 shadow-card border border-neutral-100"
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="q-name" className="block text-sm font-medium text-neutral-700 mb-1.5">
            {t('form.name')} *
          </label>
          <input
            id="q-name"
            type="text"
            required
            className="w-full rounded-input border border-neutral-300 px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
          />
        </div>
        <div>
          <label htmlFor="q-email" className="block text-sm font-medium text-neutral-700 mb-1.5">
            {t('form.email')} *
          </label>
          <input
            id="q-email"
            type="email"
            required
            className="w-full rounded-input border border-neutral-300 px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="q-phone" className="block text-sm font-medium text-neutral-700 mb-1.5">
            {t('form.phone')} *
          </label>
          <input
            id="q-phone"
            type="tel"
            required
            className="w-full rounded-input border border-neutral-300 px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
          />
        </div>
        <div>
          <label htmlFor="q-company" className="block text-sm font-medium text-neutral-700 mb-1.5">
            {t('form.company')} *
          </label>
          <input
            id="q-company"
            type="text"
            required
            className="w-full rounded-input border border-neutral-300 px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="q-category" className="block text-sm font-medium text-neutral-700 mb-1.5">
            {t('form.productCategory')} *
          </label>
          <select
            id="q-category"
            required
            className="w-full rounded-input border border-neutral-300 px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 bg-white"
          >
            <option value="">{t('form.selectCategory')}</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="q-quantity" className="block text-sm font-medium text-neutral-700 mb-1.5">
            {t('form.quantity')} *
          </label>
          <input
            id="q-quantity"
            type="text"
            required
            className="w-full rounded-input border border-neutral-300 px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
            placeholder={t('form.quantityPlaceholder')}
          />
        </div>
      </div>
      <div>
        <label htmlFor="q-requirements" className="block text-sm font-medium text-neutral-700 mb-1.5">
          {t('form.requirements')} *
        </label>
        <textarea
          id="q-requirements"
          rows={5}
          required
          className="w-full rounded-input border border-neutral-300 px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 resize-none"
          placeholder={t('form.requirementsPlaceholder')}
        />
      </div>
      <div>
        <label htmlFor="q-file" className="block text-sm font-medium text-neutral-700 mb-1.5">
          {t('form.attachDrawing')}
        </label>
        <input
          id="q-file"
          type="file"
          accept=".pdf,.dwg,.dxf,.step,.stp,.jpg,.png"
          className="w-full text-sm text-neutral-600 file:mr-4 file:py-2 file:px-4 file:rounded-button file:border-0 file:text-sm file:font-semibold file:bg-brand-primary/10 file:text-brand-primary hover:file:bg-brand-primary/20 file:cursor-pointer"
        />
      </div>
      <Button type="submit" size="lg" className="w-full sm:w-auto">
        <Send className="h-4 w-4" />
        {t('form.submit')}
      </Button>
    </form>
  );
}
