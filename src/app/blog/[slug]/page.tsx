import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { getBlogPosts, getBlogPostBySlug, getRecentBlogPosts } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { BlogCard } from "@/components/content/blog-card";
import { SectionHeading } from "@/components/content/section-heading";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const t = await getTranslations("blog");
  const common = await getTranslations("common");
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const recentPosts = getRecentBlogPosts(3).filter((p) => p.id !== post.id).slice(0, 2);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: t("pageTitle"), href: "/blog" },
    { label: post.title, href: `/blog/${post.slug}` },
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: t("pageTitle"), url: "/blog" },
          { name: post.title, url: `/blog/${post.slug}` },
        ]}
      />
      <Breadcrumb items={breadcrumbItems} />

      <Section>
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-brand-primary hover:text-brand-primaryDark transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t("backToBlog")}</span>
          </Link>

          {/* Header */}
          <header className="mb-8">
            <Badge variant="primary" className="mb-4">{post.category}</Badge>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-secondary mb-4">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {t("byAuthor", { author: post.author })}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {formatDate(post.publishedAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {t("readTime", { time: `${post.readTime} min` })}
              </span>
            </div>
          </header>

          {/* Featured image */}
          <div className="relative aspect-video rounded-xl overflow-hidden mb-8 shadow-lg">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>

          {/* Content */}
          <article className="prose prose-lg prose-neutral max-w-none mb-8">
            {post.content.split("\n\n").map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </article>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="border-t border-neutral-200 pt-6">
              <h3 className="text-sm font-semibold text-neutral-700 mb-3">{t("tags")}</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </Section>

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <Section className="bg-surface-secondary">
          <SectionHeading title={t("recentPosts")} centered />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {recentPosts.map((p) => (
              <BlogCard key={p.id} post={p} readMoreLabel={common("readMore")} />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
