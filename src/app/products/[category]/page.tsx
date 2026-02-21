import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getCategories, getCategoryBySlug, getProductsByCategory } from "@/lib/data";
import { PageHeader } from "@/components/layout/page-header";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Section } from "@/components/ui/section";
import { ProductGrid } from "@/components/products/product-grid";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const categories = getCategories();
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};
  return {
    title: category.name,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: slug } = await params;
  const t = await getTranslations("products");
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const products = getProductsByCategory(category.id);

  const breadcrumbItems = [
    { label: t("pageTitle"), href: "/products" },
    { label: category.name, href: `/products/${category.slug}` },
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: t("pageTitle"), url: "/products" },
          { name: category.name, url: `/products/${category.slug}` },
        ]}
      />
      <PageHeader title={category.name} description={category.description} />
      <Breadcrumb items={breadcrumbItems} />

      <Section>
        <ProductGrid
          products={products}
          categorySlug={category.slug}
          viewDetailsLabel={t("requestQuoteFor")}
        />
      </Section>
    </>
  );
}
