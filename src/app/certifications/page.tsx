import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getCertifications } from "@/lib/data";
import { PageHeader } from "@/components/layout/page-header";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Section } from "@/components/ui/section";
import { CertificationCard } from "@/components/content/certification-card";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("seo");
  return {
    title: t("certifications.title"),
    description: t("certifications.description"),
  };
}

export default async function CertificationsPage() {
  const t = await getTranslations("certifications");
  const certifications = getCertifications();

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: t("pageTitle"), href: "/certifications" },
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: t("pageTitle"), url: "/certifications" },
        ]}
      />
      <PageHeader title={t("pageTitle")} description={t("pageSubtitle")} />
      <Breadcrumb items={breadcrumbItems} />

      <Section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert) => (
            <CertificationCard key={cert.id} certification={cert} />
          ))}
        </div>
      </Section>
    </>
  );
}
