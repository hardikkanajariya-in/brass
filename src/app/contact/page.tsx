import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import siteConfig from "@config";
import { getFaqs } from "@/lib/data";
import { PageHeader } from "@/components/layout/page-header";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/content/section-heading";
import { FaqAccordion } from "@/components/content/faq-accordion";
import { ContactForm } from "@/components/forms/contact-form";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/json-ld";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("seo");
  return {
    title: t("contact.title"),
    description: t("contact.description"),
  };
}

export default async function ContactPage() {
  const t = await getTranslations("contact");
  const tc = await getTranslations("common");
  const faqs = getFaqs();

  const breadcrumbItems = [
    { label: t("pageTitle"), href: "/contact" },
  ];

  const contactInfo = [
    {
      icon: Mail,
      label: tc("email"),
      value: siteConfig.contact.email,
      href: `mailto:${siteConfig.contact.email}`,
    },
    {
      icon: Phone,
      label: tc("phone"),
      value: siteConfig.contact.phone,
      href: `tel:${siteConfig.contact.phone}`,
    },
    {
      icon: MapPin,
      label: tc("address"),
      value: `${siteConfig.contact.address.street}, ${siteConfig.contact.address.city}, ${siteConfig.contact.address.state} ${siteConfig.contact.address.postalCode}, ${siteConfig.contact.address.country}`,
    },
    {
      icon: Clock,
      label: tc("workingHours"),
      value: siteConfig.contact.workingHours,
    },
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: t("pageTitle"), url: "/contact" },
        ]}
      />
      <FaqJsonLd faqs={faqs} />
      <PageHeader title={t("pageTitle")} description={t("pageSubtitle")} />
      <Breadcrumb items={breadcrumbItems} />

      <Section>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-xl font-semibold text-brand-secondary mb-2">
              {t("info.title")}
            </h2>
            <p className="text-neutral-600 mb-6">{t("info.subtitle")}</p>
            <div className="space-y-6">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-brand-primary/10 rounded-lg flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-brand-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-neutral-700">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-sm text-brand-primary hover:underline">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm text-neutral-600">{item.value}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>
      </Section>

      {/* Map */}
      <section className="bg-neutral-50">
        <div className="relative w-full h-60 sm:h-72 md:h-80 lg:h-96">
          <iframe
            src={siteConfig.contact.mapEmbedUrl}
            className="absolute inset-0 w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="BrassCraft Industries Location"
          />
        </div>
      </section>

      {/* FAQs */}
      <Section>
        <SectionHeading title={t("faqTitle")} centered />
        <div className="max-w-3xl mx-auto">
          <FaqAccordion faqs={faqs} />
        </div>
      </Section>
    </>
  );
}
