'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Menu, X, ChevronDown, Phone, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { useScrollPosition } from '@/hooks/use-scroll-position';
import siteConfig from '@config';
import type { NavigationItem } from '@/types/common';

function TopBar() {
  const t = useTranslations('common');
  return (
    <div className="hidden bg-brand-secondary text-white text-sm xl:block">
      <Container className="flex items-center justify-between py-2">
        <div className="flex items-center gap-6">
          <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-2 hover:text-brand-primary transition-colors">
            <Mail className="h-3.5 w-3.5" />
            {siteConfig.contact.email}
          </a>
          <a href={`tel:${siteConfig.contact.phone}`} className="flex items-center gap-2 hover:text-brand-primary transition-colors">
            <Phone className="h-3.5 w-3.5" />
            {siteConfig.contact.phone}
          </a>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-neutral-300">{t('workingHours')}: {siteConfig.contact.workingHours}</span>
        </div>
      </Container>
    </div>
  );
}

function DesktopNav({ items }: { items: NavigationItem[] }) {
  const t = useTranslations();
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = (key: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenDropdown(key);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenDropdown(null), 200);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <nav className="hidden xl:flex items-center gap-0.5" aria-label="Main navigation">
      {items.map((item) => {
        const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
        const hasChildren = item.children && item.children.length > 0;

        if (hasChildren) {
          return (
            <div
              key={item.labelKey}
              className="relative"
              onMouseEnter={() => handleMouseEnter(item.labelKey)}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href={item.href}
                className={cn(
                  'flex items-center gap-1 px-2.5 py-2 text-[13px] font-medium rounded-md transition-colors whitespace-nowrap',
                  isActive ? 'text-brand-primary' : 'text-neutral-700 hover:text-brand-primary'
                )}
              >
                {t(item.labelKey)}
                <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', openDropdown === item.labelKey && 'rotate-180')} />
              </Link>
              <div
                className={cn(
                  'absolute left-0 top-full z-50 min-w-[220px] rounded-lg bg-white py-2 shadow-xl border border-neutral-100 transition-all duration-200',
                  openDropdown === item.labelKey ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
                )}
              >
                {item.children?.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className={cn(
                      'block px-4 py-2.5 text-sm transition-colors',
                      pathname === child.href ? 'text-brand-primary bg-brand-primary/5 font-medium' : 'text-neutral-600 hover:text-brand-primary hover:bg-neutral-50'
                    )}
                  >
                    {t(child.labelKey)}
                  </Link>
                ))}
              </div>
            </div>
          );
        }

        return (
          <Link
            key={item.labelKey}
            href={item.href}
            className={cn(
              'px-2.5 py-2 text-[13px] font-medium rounded-md transition-colors whitespace-nowrap',
              isActive ? 'text-brand-primary' : 'text-neutral-700 hover:text-brand-primary'
            )}
          >
            {t(item.labelKey)}
          </Link>
        );
      })}
    </nav>
  );
}

function MobileNav({ items, isOpen, onClose }: { items: NavigationItem[]; isOpen: boolean; onClose: () => void }) {
  const t = useTranslations();
  const pathname = usePathname();
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    onClose();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/50 transition-opacity xl:hidden',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />
      <div
        className={cn(
          'fixed inset-y-0 right-0 z-50 w-[280px] sm:w-[320px] bg-white shadow-2xl transition-transform duration-300 xl:hidden overflow-y-auto',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-neutral-100">
          <span className="text-lg font-bold text-brand-secondary">{siteConfig.company.shortName}</span>
          <button onClick={onClose} className="p-2 rounded-md hover:bg-neutral-100 cursor-pointer" aria-label="Close menu">
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="p-4 space-y-1" aria-label="Mobile navigation">
          {items.map((item) => {
            const isActive = pathname === item.href;
            const hasChildren = item.children && item.children.length > 0;

            return (
              <div key={item.labelKey}>
                <div className="flex items-center">
                  <Link
                    href={item.href}
                    className={cn(
                      'flex-1 py-3 px-3 text-sm font-medium rounded-md transition-colors',
                      isActive ? 'text-brand-primary bg-brand-primary/5' : 'text-neutral-700 hover:text-brand-primary hover:bg-neutral-50'
                    )}
                    onClick={onClose}
                  >
                    {t(item.labelKey)}
                  </Link>
                  {hasChildren && (
                    <button
                      onClick={() => setExpandedItem(expandedItem === item.labelKey ? null : item.labelKey)}
                      className="p-3 cursor-pointer"
                      aria-label="Toggle submenu"
                    >
                      <ChevronDown className={cn('h-4 w-4 transition-transform', expandedItem === item.labelKey && 'rotate-180')} />
                    </button>
                  )}
                </div>
                {hasChildren && expandedItem === item.labelKey && (
                  <div className="ml-4 space-y-1 border-l-2 border-neutral-100 pl-3">
                    {item.children?.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          'block py-2 px-3 text-sm rounded-md transition-colors',
                          pathname === child.href ? 'text-brand-primary font-medium' : 'text-neutral-500 hover:text-brand-primary'
                        )}
                        onClick={onClose}
                      >
                        {t(child.labelKey)}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
        <div className="p-4 border-t border-neutral-100">
          <Button href="/request-quote" size="md" className="w-full">
            {t('common.requestQuote')}
          </Button>
        </div>
      </div>
    </>
  );
}

export function Header() {
  const t = useTranslations('common');
  const { isScrolled } = useScrollPosition();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <a href="#main-content" className="skip-to-content">
        {t('skipToContent')}
      </a>
      <TopBar />
      <header
        className={cn(
          'sticky top-0 z-30 w-full bg-white transition-shadow duration-300',
          isScrolled && 'shadow-md'
        )}
      >
        <Container className="flex items-center justify-between h-14 sm:h-16 xl:h-20">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center text-white font-bold text-lg">
              B
            </div>
            <div className="hidden sm:block">
              <span className="block text-lg font-bold text-brand-secondary leading-tight">
                {siteConfig.company.shortName}
              </span>
              <span className="block text-[10px] text-neutral-500 leading-tight tracking-wider uppercase">
                {t('precisionBrass')}
              </span>
            </div>
          </Link>

          <DesktopNav items={siteConfig.navigation} />

          <div className="flex items-center gap-3">
            <Button href="/request-quote" size="sm" className="hidden xl:inline-flex text-[13px] !px-4 !py-2">
              {t('requestQuote')}
            </Button>
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 rounded-md hover:bg-neutral-100 xl:hidden cursor-pointer"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </Container>
      </header>
      <MobileNav
        items={siteConfig.navigation}
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </>
  );
}
