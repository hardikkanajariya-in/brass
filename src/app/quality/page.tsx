import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ShieldCheck, Search, Settings, PackageCheck } from "lucide-react";
import siteConfig from "@config";
import { getInfrastructure, getCertifications } from "@/lib/data";
import { PageHeader } from "@/components/layout/page-header";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/content/section-heading";
import { CertificationCard } from "@/components/content/certification-card";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("seo");
  return {
    title: t("quality.title"),
    description: t("quality.description"),
  };
}

const processIcons = [Search, Settings, ShieldCheck, PackageCheck];

export default async function QualityPage() {
  const t = await getTranslations("quality");
  const infra = getInfrastructure();
  const certifications = getCertifications();

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: t("pageTitle"), href: "/quality" },
  ];

  const processSteps = [
    { key: "incoming" as const, icon: processIcons[0] },
    { key: "inProcess" as const, icon: processIcons[1] },
    { key: "final" as const, icon: processIcons[2] },
    { key: "dispatch" as const, icon: processIcons[3] },
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: t("pageTitle"), url: "/quality" },
        ]}
      />
      <PageHeader title={t("pageTitle")} description={t("pageSubtitle")} />
      <Breadcrumb items={breadcrumbItems} />

      {/* Quality Process */}
      <Section>
        <SectionHeading
          title={t("process.title")}
          subtitle={t("process.subtitle")}
          centered
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.key}
                className="relative bg-white rounded-xl p-6 shadow-sm border border-neutral-100 text-center"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 bg-brand-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <div className="w-14 h-14 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mt-4 mb-4">
                  <Icon className="w-7 h-7 text-brand-primary" />
                </div>
                <h3 className="text-lg font-semibold text-brand-secondary mb-2">
                  {t(`process.${step.key}.title`)}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {t(`process.${step.key}.description`)}
                </p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Testing Equipment */}
      <Section className="bg-surface-secondary">
        <SectionHeading
          title={t("equipment.title")}
          subtitle={t("equipment.subtitle")}
          centered
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {infra.qualityLab.equipment.map((equip) => (
            <div
              key={equip.id}
              className="bg-white rounded-xl p-6 shadow-sm border border-neutral-100"
            >
              <h3 className="font-semibold text-brand-secondary mb-2">{equip.name}</h3>
              <p className="text-sm text-neutral-600 mb-2">{equip.description}</p>
              <span className="text-xs text-brand-primary font-medium">{equip.brand}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Certifications */}
      {siteConfig.features.showCertifications && (
        <Section>
          <SectionHeading
            title="Our Certifications"
            centered
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert) => (
              <CertificationCard key={cert.id} certification={cert} />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
