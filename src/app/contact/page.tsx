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
  const faqs = getFaqs();

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: t("pageTitle"), href: "/contact" },
  ];

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: siteConfig.contact.email,
      href: `mailto:${siteConfig.contact.email}`,
    },
    {
      icon: Phone,
      label: "Phone",
      value: siteConfig.contact.phone,
      href: `tel:${siteConfig.contact.phone}`,
    },
    {
      icon: MapPin,
      label: "Address",
      value: `${siteConfig.contact.address.street}, ${siteConfig.contact.address.city}, ${siteConfig.contact.address.state} ${siteConfig.contact.address.postalCode}, ${siteConfig.contact.address.country}`,
    },
    {
      icon: Clock,
      label: "Working Hours",
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
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
      <Section className="bg-surface-secondary py-0">
        <div className="relative w-full h-80">
          <iframe
            src={siteConfig.contact.mapEmbedUrl}
            className="absolute inset-0 w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="BrassCraft Industries Location"
          />
        </div>
      </Section>

      {/* FAQs */}
      <Section>
        <SectionHeading title="Frequently Asked Questions" centered />
        <div className="max-w-3xl mx-auto">
          <FaqAccordion faqs={faqs} />
        </div>
      </Section>
    </>
  );
}
