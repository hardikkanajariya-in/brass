import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Linkedin, Facebook, Youtube, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { Container } from '@/components/ui/container';
import siteConfig from '@config';

export function Footer() {
  const t = useTranslations();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-secondary text-white">
      {/* Main footer */}
      <Container className="py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center text-white font-bold text-lg">
                B
              </div>
              <span className="text-xl font-bold">{siteConfig.company.shortName}</span>
            </div>
            <p className="text-neutral-300 text-sm leading-relaxed mb-6">
              {t('footer.description')}
            </p>
            <div className="space-y-3 text-sm">
              <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-2 text-neutral-300 hover:text-brand-primary transition-colors">
                <Mail className="h-4 w-4 shrink-0" />
                {siteConfig.contact.email}
              </a>
              <a href={`tel:${siteConfig.contact.phone}`} className="flex items-center gap-2 text-neutral-300 hover:text-brand-primary transition-colors">
                <Phone className="h-4 w-4 shrink-0" />
                {siteConfig.contact.phone}
              </a>
              <div className="flex items-start gap-2 text-neutral-300">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{siteConfig.contact.address.city}, {siteConfig.contact.address.state}, {siteConfig.contact.address.country}</span>
              </div>
            </div>
          </div>

          {/* Footer columns */}
          {siteConfig.footer.columns.map((column) => (
            <div key={column.titleKey}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-primary mb-4">
                {t(column.titleKey)}
              </h3>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-300 hover:text-white transition-colors"
                    >
                      {t(link.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social & Newsletter */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-primary mb-4">
              {t('footer.followUs')}
            </h3>
            <div className="flex items-center gap-3 mb-6">
              {siteConfig.social.linkedin && (
                <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-brand-primary transition-colors" aria-label="LinkedIn">
                  <Linkedin className="h-4 w-4" />
                </a>
              )}
              {siteConfig.social.facebook && (
                <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-brand-primary transition-colors" aria-label="Facebook">
                  <Facebook className="h-4 w-4" />
                </a>
              )}
              {siteConfig.social.youtube && (
                <a href={siteConfig.social.youtube} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-brand-primary transition-colors" aria-label="YouTube">
                  <Youtube className="h-4 w-4" />
                </a>
              )}
              {siteConfig.social.twitter && (
                <a href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-brand-primary transition-colors" aria-label="Twitter">
                  <Twitter className="h-4 w-4" />
                </a>
              )}
            </div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-primary mb-3">
              {t('footer.certifications')}
            </h3>
            <p className="text-sm text-neutral-300">
              ISO 9001 · ISO 14001 · CE · RoHS · REACH
            </p>
          </div>
        </div>
      </Container>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-sm text-neutral-400 md:flex-row">
          <p>© {currentYear} {siteConfig.company.name}. {t('footer.allRightsReserved')}</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              {t('footer.privacyPolicy')}
            </Link>
            <span className="text-neutral-600">•</span>
            <span>
              {t('footer.builtBy')}{' '}
              <a
                href={siteConfig.footer.credit.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary hover:underline"
              >
                {siteConfig.footer.credit.companyName}
              </a>
            </span>
          </div>
        </Container>
      </div>
    </footer>
  );
}
