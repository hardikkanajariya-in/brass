import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getServices } from "@/lib/data";
import { PageHeader } from "@/components/layout/page-header";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/content/section-heading";
import { ServiceCard } from "@/components/content/service-card";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("seo");
  return {
    title: t("services.title"),
    description: t("services.description"),
  };
}

export default async function ServicesPage() {
  const t = await getTranslations("services");
  const common = await getTranslations("common");
  const services = getServices();

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: t("pageTitle"), href: "/services" },
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: t("pageTitle"), url: "/services" },
        ]}
      />
      <PageHeader title={t("pageTitle")} description={t("pageSubtitle")} />
      <Breadcrumb items={breadcrumbItems} />

      <Section>
        <SectionHeading
          title={t("capabilities.title")}
          subtitle={t("capabilities.subtitle")}
          centered
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              learnMoreLabel={common("learnMore")}
            />
          ))}
        </div>
      </Section>
    </>
  );
}
