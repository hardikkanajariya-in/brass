import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import siteConfig from "@config";
import { getCompany } from "@/lib/data";
import { PageHeader } from "@/components/layout/page-header";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/content/section-heading";
import { FeatureCard } from "@/components/content/feature-card";
import { Timeline } from "@/components/content/timeline";
import { TeamMemberCard } from "@/components/content/team-member-card";
import { StatCounter } from "@/components/content/stat-counter";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("seo");
  return {
    title: t("about.title"),
    description: t("about.description"),
  };
}

export default async function AboutPage() {
  const t = await getTranslations("about");
  const company = getCompany();

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: t("pageTitle"), href: "/about" },
  ];

  const stats = [
    { value: company.stats.yearsExperience, suffix: "+", label: "Years Experience" },
    { value: company.stats.productsManufactured, suffix: "+", label: "Products" },
    { value: company.stats.countriesServed, suffix: "+", label: "Countries Served" },
    { value: company.stats.satisfiedClients, suffix: "+", label: "Satisfied Clients" },
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: t("pageTitle"), url: "/about" },
        ]}
      />
      <PageHeader title={t("pageTitle")} description={t("pageSubtitle")} />
      <Breadcrumb items={breadcrumbItems} />

      {/* Company Overview */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading title={t("overview.title")} />
            <p className="text-neutral-600 leading-relaxed mb-4">
              {t("overview.description")}
            </p>
            <p className="text-neutral-600 leading-relaxed">
              {t("overview.description2")}
            </p>
          </div>
          <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
            <Image
              src={siteConfig.images.aboutBanner}
              alt={siteConfig.company.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </Section>

      {/* Mission & Vision */}
      <Section className="bg-surface-secondary">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-neutral-100">
            <div className="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-brand-secondary mb-3">{t("mission.title")}</h3>
            <p className="text-neutral-600 leading-relaxed">{t("mission.description")}</p>
          </div>
          <div className="bg-white rounded-xl p-8 shadow-sm border border-neutral-100">
            <div className="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-brand-secondary mb-3">{t("vision.title")}</h3>
            <p className="text-neutral-600 leading-relaxed">{t("vision.description")}</p>
          </div>
        </div>
      </Section>

      {/* Core Values */}
      <Section>
        <SectionHeading
          title={t("values.title")}
          centered
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {company.coreValues.map((value) => (
            <FeatureCard
              key={value.id}
              icon={value.icon}
              title={value.title}
              description={value.description}
            />
          ))}
        </div>
      </Section>

      {/* Stats */}
      <Section className="bg-brand-secondary">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <StatCounter
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              className="text-white"
            />
          ))}
        </div>
      </Section>

      {/* Milestones */}
      <Section>
        <SectionHeading
          title={t("milestones.title")}
          subtitle={t("milestones.subtitle")}
          centered
        />
        <Timeline
          items={company.milestones.map((m) => ({
            year: m.year,
            title: m.title,
            description: m.description,
          }))}
        />
      </Section>

      {/* Team */}
      <Section className="bg-surface-secondary">
        <SectionHeading
          title={t("team.title")}
          subtitle={t("team.subtitle")}
          centered
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {company.team.map((member) => (
            <TeamMemberCard
              key={member.id}
              name={member.name}
              role={member.role}
              bio={member.bio}
              image={member.image}
            />
          ))}
        </div>
      </Section>
    </>
  );
}
