import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import siteConfig from "@config";
import { HeroSection } from "@/components/home/hero-section";
import { CategoriesOverview } from "@/components/home/categories-overview";
import { FeaturedProducts } from "@/components/home/featured-products";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { StatsSection } from "@/components/home/stats-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { CtaSection } from "@/components/home/cta-section";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("seo");
  return {
    title: t("home.title"),
    description: t("home.description"),
    openGraph: {
      title: t("home.title"),
      description: t("home.description"),
      url: siteConfig.seo.siteUrl,
    },
  };
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoriesOverview />
      <FeaturedProducts />
      <WhyChooseUs />
      <StatsSection />
      {siteConfig.features.showTestimonials && <TestimonialsSection />}
      <CtaSection />
    </>
  );
}
