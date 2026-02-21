import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Factory, Gauge, Clock, Zap } from "lucide-react";
import { getInfrastructure } from "@/lib/data";
import { PageHeader } from "@/components/layout/page-header";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/content/section-heading";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("seo");
  return {
    title: t("infrastructure.title"),
    description: t("infrastructure.description"),
  };
}

export default async function InfrastructurePage() {
  const t = await getTranslations("infrastructure");
  const infra = getInfrastructure();

  const breadcrumbItems = [
    { label: t("pageTitle"), href: "/infrastructure" },
  ];

  const capacityItems = [
    { icon: Factory, label: t("monthlyProduction"), value: infra.capacity.monthlyProduction },
    { icon: Clock, label: t("operatingHours"), value: infra.capacity.operatingHours },
    { icon: Gauge, label: t("standardLeadTime"), value: infra.capacity.leadTime },
    { icon: Zap, label: t("rushOrders"), value: infra.capacity.rushOrders },
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: t("pageTitle"), url: "/infrastructure" },
        ]}
      />
      <PageHeader title={t("pageTitle")} description={t("pageSubtitle")} />
      <Breadcrumb items={breadcrumbItems} />

      {/* Plant Overview */}
      <Section>
        <SectionHeading title={t("plant.title")} subtitle={t("plant.subtitle")} centered />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
            <Image
              src={infra.plant.image}
              alt={infra.plant.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-brand-secondary mb-2">{infra.plant.name}</h3>
            <p className="text-neutral-600 leading-relaxed mb-4">{infra.plant.description}</p>
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1 bg-brand-primary/10 text-brand-primary rounded-full text-sm font-medium">
                {infra.plant.area}
              </span>
              <span className="px-3 py-1 bg-brand-secondary/10 text-brand-secondary rounded-full text-sm font-medium">
                {infra.plant.location}
              </span>
            </div>
            <ul className="mt-4 space-y-2">
              {infra.plant.highlights.map((h) => (
                <li key={h} className="flex items-center gap-2 text-sm text-neutral-600">
                  <span className="w-1.5 h-1.5 bg-brand-primary rounded-full shrink-0" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Machinery */}
      <Section className="bg-neutral-50">
        <SectionHeading title={t("machinery.title")} subtitle={t("machinery.subtitle")} centered />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {infra.machines.map((machine) => (
            <div key={machine.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-neutral-100">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={machine.image}
                  alt={machine.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-brand-secondary">{machine.name}</h3>
                  <span className="text-xs bg-brand-primary/10 text-brand-primary px-2 py-1 rounded-full font-medium">
                    ×{machine.count}
                  </span>
                </div>
                <p className="text-sm text-neutral-600 mb-2">{machine.description}</p>
                <span className="text-xs text-neutral-400">{machine.brand}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Production Capacity */}
      <Section>
        <SectionHeading title={t("capacity.title")} subtitle={t("capacity.subtitle")} centered />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {capacityItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="text-center bg-brand-secondary rounded-xl p-6 text-white">
                <Icon className="w-10 h-10 mx-auto mb-3 text-brand-primary" />
                <p className="text-3xl font-bold mb-1">{item.value}</p>
                <p className="text-sm text-neutral-300">{item.label}</p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Quality Lab */}
      <Section className="bg-neutral-50">
        <SectionHeading title={t("lab.title")} subtitle={t("lab.subtitle")} centered />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          <div>
            <h3 className="text-xl font-semibold text-brand-secondary mb-2">{infra.qualityLab.name}</h3>
            <p className="text-neutral-600 leading-relaxed mb-6">{infra.qualityLab.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {infra.qualityLab.equipment.map((equip) => (
                <div key={equip.id} className="bg-white rounded-lg p-4 border border-neutral-100">
                  <h4 className="font-medium text-brand-secondary text-sm">{equip.name}</h4>
                  <p className="text-xs text-neutral-500 mt-1">{equip.brand}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
            <Image
              src={infra.qualityLab.image}
              alt={infra.qualityLab.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </Section>
    </>
  );
}
