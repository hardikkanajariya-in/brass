import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowLeft, Clock, Linkedin, Facebook, Twitter } from "lucide-react";
import { getBlogPosts, getBlogPostBySlug, getRecentBlogPosts } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BlogCard } from "@/components/content/blog-card";
import { SectionHeading } from "@/components/content/section-heading";
import { MarkdownRenderer, extractHeadings } from "@/components/content/markdown-renderer";
import { TableOfContents } from "@/components/content/table-of-contents";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import siteConfig from "@config";

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

  const navT = await getTranslations("nav");

  const recentPosts = getRecentBlogPosts(3).filter((p) => p.id !== post.id).slice(0, 2);
  const headings = extractHeadings(post.content);
  const postUrl = `${siteConfig.seo.siteUrl}/blog/${post.slug}`;

  const breadcrumbItems = [
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

      {/* Hero Banner */}
      <div className="relative bg-brand-secondary overflow-hidden">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover opacity-20"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-secondary/60 via-brand-secondary/80 to-brand-secondary" />
        </div>

        <Container className="relative z-10 pt-6 pb-12 sm:pt-8 sm:pb-16 md:pb-20">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 sm:mb-8">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-neutral-400">
              <li>
                <Link href="/" className="hover:text-brand-primary transition-colors">{navT("home")}</Link>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-neutral-500">/</span>
                <Link href="/blog" className="hover:text-brand-primary transition-colors">{t("pageTitle")}</Link>
              </li>
            </ol>
          </nav>

          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-neutral-300 hover:text-brand-primary transition-colors mb-6 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t("backToBlog")}</span>
          </Link>

          {/* Post header */}
          <div className="max-w-3xl">
            <Badge variant="primary" className="mb-4 text-xs">{post.category}</Badge>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold text-white leading-tight mb-5">
              {post.title}
            </h1>
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-6 max-w-2xl">
              {post.excerpt}
            </p>

            {/* Author + Meta Row */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center text-white font-bold text-sm">
                  {post.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{post.author}</p>
                  <p className="text-neutral-400 text-xs">{formatDate(post.publishedAt)}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {t("minRead", { time: post.readTime })}
                </span>
              </div>
            </div>
          </div>
        </Container>

        {/* Decorative bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-primary via-brand-accent to-brand-primary" />
      </div>

      {/* Main Content Area */}
      <Section className="!py-10 sm:!py-14 md:!py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Article Column */}
          <div className="min-w-0">
            {/* Featured Image */}
            <div className="relative aspect-video rounded-xl overflow-hidden mb-8 sm:mb-10 shadow-lg border border-neutral-100">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 720px"
                priority
              />
            </div>

            {/* Mobile TOC (shown below image on small screens) */}
            {headings.length > 0 && (
              <div className="lg:hidden mb-8">
                <TableOfContents headings={headings} title={t("tableOfContents")} />
              </div>
            )}

            {/* Article Content */}
            <MarkdownRenderer content={post.content} className="mb-10" />

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="border-t border-neutral-200 pt-6 mb-8">
                <h3 className="text-sm font-semibold text-neutral-700 mb-3 flex items-center gap-2">
                  {t("tags")}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full bg-neutral-100 px-3.5 py-1.5 text-xs font-medium text-neutral-600 hover:bg-brand-primary/10 hover:text-brand-primary transition-colors cursor-default"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Share + Author Card */}
            <div className="border-t border-neutral-200 pt-8">
              <div className="flex flex-col sm:flex-row gap-6 sm:items-center sm:justify-between">
                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center text-white font-bold text-lg shrink-0">
                    {post.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-semibold text-brand-secondary">{post.author}</p>
                    <p className="text-xs text-neutral-500 mt-0.5 max-w-xs">{t("authorBio")}</p>
                  </div>
                </div>

                {/* Share Links */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-neutral-500 mr-1">{t("shareArticle")}:</span>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-9 h-9 rounded-full bg-neutral-100 text-neutral-500 hover:bg-[#0077b5] hover:text-white transition-all"
                    aria-label="Share on LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-9 h-9 rounded-full bg-neutral-100 text-neutral-500 hover:bg-[#1877f2] hover:text-white transition-all"
                    aria-label="Share on Facebook"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-9 h-9 rounded-full bg-neutral-100 text-neutral-500 hover:bg-[#1da1f2] hover:text-white transition-all"
                    aria-label="Share on Twitter"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Column (desktop only) */}
          <aside className="hidden lg:block space-y-6">
            {/* Sticky wrapper */}
            <div className="sticky top-24 space-y-6">
              {/* Table of Contents */}
              {headings.length > 0 && (
                <TableOfContents headings={headings} title={t("tableOfContents")} />
              )}

              {/* CTA Card */}
              <div className="rounded-xl bg-gradient-to-br from-brand-secondary to-brand-secondary/90 p-6 text-white">
                <h3 className="font-semibold mb-2 text-sm">{t("needComponents")}</h3>
                <p className="text-xs text-neutral-300 leading-relaxed mb-4">
                  {t("componentsCta")}
                </p>
                <Button href="/request-quote" size="sm" className="w-full text-xs">
                  {common("getQuote")}
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <Section className="bg-neutral-50 border-t border-neutral-100">
          <SectionHeading title={t("relatedReading")} centered />
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
