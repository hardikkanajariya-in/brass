import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowLeft, CheckCircle, Tag } from "lucide-react";
import {
  getProducts,
  getProductBySlug,
  getCategoryBySlug,
  getCategoryById,
  getCategories,
  getRelatedProducts,
} from "@/lib/data";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductGallery } from "@/components/products/product-gallery";
import { ProductSpecs } from "@/components/products/product-specs";
import { ProductGrid } from "@/components/products/product-grid";
import { SectionHeading } from "@/components/content/section-heading";
import { ProductJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";

interface ProductPageProps {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateStaticParams() {
  const products = getProducts();
  const categories = getCategories();
  const params: { category: string; slug: string }[] = [];

  for (const product of products) {
    const cat = categories.find((c) => c.id === product.categoryId);
    if (cat) {
      params.push({ category: cat.slug, slug: product.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { category: catSlug, slug } = await params;
  const product = getProductBySlug(slug);
  const category = getCategoryBySlug(catSlug);
  if (!product || !category) return {};
  return {
    title: product.name,
    description: product.shortDescription,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { category: catSlug, slug } = await params;
  const t = await getTranslations("products");
  const product = getProductBySlug(slug);
  const category = getCategoryBySlug(catSlug);

  if (!product || !category) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product, 4);

  const allImages = [product.image, ...product.gallery];

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: t("pageTitle"), href: "/products" },
    { label: category.name, href: `/products/${category.slug}` },
    { label: product.name, href: `/products/${category.slug}/${product.slug}` },
  ];

  return (
    <>
      <ProductJsonLd
        name={product.name}
        description={product.shortDescription}
        image={product.image}
        category={category.name}
        slug={product.slug}
        categorySlug={category.slug}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: t("pageTitle"), url: "/products" },
          { name: category.name, url: `/products/${category.slug}` },
          { name: product.name, url: `/products/${category.slug}/${product.slug}` },
        ]}
      />
      <Breadcrumb items={breadcrumbItems} />

      <Section>
        {/* Back link */}
        <Link
          href={`/products/${category.slug}`}
          className="inline-flex items-center gap-2 text-brand-primary hover:text-brand-primaryDark transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to {category.name}</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Gallery */}
          <ProductGallery images={allImages} productName={product.name} />

          {/* Product info */}
          <div className="space-y-6">
            <div>
              <div className="flex gap-2 mb-3">
                {product.isFeatured && <Badge variant="primary">Featured</Badge>}
                {product.isNew && <Badge variant="success">New</Badge>}
              </div>
              <h1 className="text-3xl font-bold text-brand-secondary mb-3">
                {product.name}
              </h1>
              <p className="text-neutral-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quick specs */}
            <div className="border-t border-b border-neutral-200 py-4 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Tag className="w-4 h-4 text-brand-primary" />
                <span className="font-medium text-neutral-700">{t("material")}:</span>
                <span className="text-neutral-600">{product.specifications.material}</span>
              </div>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-lg font-semibold text-brand-secondary mb-3">
                {t("featuresTitle")}
              </h2>
              <ul className="space-y-2">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                    <span className="text-neutral-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Applications */}
            <div>
              <h2 className="text-lg font-semibold text-brand-secondary mb-3">
                {t("applicationsTitle")}
              </h2>
              <div className="flex flex-wrap gap-2">
                {product.applications.map((app) => (
                  <Badge key={app} variant="secondary">{app}</Badge>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4">
              <Button
                href={`/request-quote?product=${product.slug}`}
                size="lg"
                className="w-full sm:w-auto"
              >
                {t("requestQuoteFor")}
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Full Specifications */}
      <Section className="bg-surface-secondary">
        <SectionHeading title={t("specsTitle")} />
        <div className="max-w-2xl">
          <ProductSpecs specifications={product.specifications} />
        </div>
      </Section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <Section>
          <SectionHeading title="Related Products" centered />
          <ProductGrid
            products={relatedProducts}
            categorySlug={category.slug}
            viewDetailsLabel={t("requestQuoteFor")}
          />
        </Section>
      )}
    </>
  );
}
