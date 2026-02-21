import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/layout/page-header";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Section } from "@/components/ui/section";
import { QuoteRequestForm } from "@/components/forms/quote-request-form";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("seo");
  return {
    title: t("quote.title"),
    description: t("quote.description"),
  };
}

export default async function RequestQuotePage() {
  const t = await getTranslations("quote");

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: t("pageTitle"), href: "/request-quote" },
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: t("pageTitle"), url: "/request-quote" },
        ]}
      />
      <PageHeader title={t("pageTitle")} description={t("pageSubtitle")} />
      <Breadcrumb items={breadcrumbItems} />

      <Section>
        <div className="max-w-3xl mx-auto">
          <QuoteRequestForm />
        </div>
      </Section>
    </>
  );
}
