import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getBlogPosts } from "@/lib/data";
import { PageHeader } from "@/components/layout/page-header";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Section } from "@/components/ui/section";
import { BlogCard } from "@/components/content/blog-card";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("seo");
  return {
    title: t("blog.title"),
    description: t("blog.description"),
  };
}

export default async function BlogPage() {
  const t = await getTranslations("blog");
  const common = await getTranslations("common");
  const posts = getBlogPosts();

  const breadcrumbItems = [
    { label: t("pageTitle"), href: "/blog" },
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: t("pageTitle"), url: "/blog" },
        ]}
      />
      <PageHeader title={t("pageTitle")} description={t("pageSubtitle")} />
      <Breadcrumb items={breadcrumbItems} />

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard
              key={post.id}
              post={post}
              readMoreLabel={common("readMore")}
            />
          ))}
        </div>
      </Section>
    </>
  );
}
