import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/layout/page-header";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Section } from "@/components/ui/section";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("privacy");
  return {
    title: t("pageTitle"),
  };
}

export default async function PrivacyPolicyPage() {
  const t = await getTranslations("privacy");

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: t("pageTitle"), href: "/privacy-policy" },
  ];

  const sections = ["collection", "usage", "protection", "cookies", "contact"] as const;

  return (
    <>
      <PageHeader title={t("pageTitle")} />
      <Breadcrumb items={breadcrumbItems} />

      <Section>
        <div className="max-w-3xl mx-auto">
          <p className="text-sm text-neutral-500 mb-4">{t("lastUpdated")}</p>
          <p className="text-neutral-600 leading-relaxed mb-8">{t("intro")}</p>

          <div className="space-y-8">
            {sections.map((key) => (
              <div key={key}>
                <h2 className="text-xl font-semibold text-brand-secondary mb-3">
                  {t(`sections.${key}.title`)}
                </h2>
                <p className="text-neutral-600 leading-relaxed">
                  {t(`sections.${key}.content`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
