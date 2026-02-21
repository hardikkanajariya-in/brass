import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getCategories } from "@/lib/data";
import { PageHeader } from "@/components/layout/page-header";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Section } from "@/components/ui/section";
import { CategoryCard } from "@/components/products/category-card";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("seo");
  return {
    title: t("products.title"),
    description: t("products.description"),
  };
}

export default async function ProductsPage() {
  const t = await getTranslations("products");
  const tc = await getTranslations("common");
  const categories = getCategories();

  const breadcrumbItems = [
    { label: t("pageTitle"), href: "/products" },
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: t("pageTitle"), url: "/products" },
        ]}
      />
      <PageHeader title={t("pageTitle")} description={t("pageSubtitle")} />
      <Breadcrumb items={breadcrumbItems} />

      <Section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              productsLabel={tc("products")}
            />
          ))}
        </div>
      </Section>
    </>
  );
}
