import type { SiteConfig } from "@/types/site";

const siteConfig: SiteConfig = {
  company: {
    name: "BrassCraft Industries",
    shortName: "BrassCraft",
    tagline: "home.hero.tagline",
    description: "seo.home.description",
    founded: 1995,
    employees: "500+",
    exportCountries: 45,
    annualCapacity: "10M+ pieces",
    logo: "/images/logo.svg",
    logoDark: "/images/logo-dark.svg",
  },

  contact: {
    email: "info@brasscraftindustries.com",
    salesEmail: "sales@brasscraftindustries.com",
    phone: "+91-288-2567890",
    phoneAlt: "+91-288-2567891",
    address: {
      street: "Plot No. 12, Phase-II, GIDC Industrial Estate",
      area: "GIDC Industrial Estate",
      city: "Jamnagar",
      state: "Gujarat",
      country: "India",
      postalCode: "361004",
    },
    workingHours: "Mon–Sat, 9:00 AM – 6:00 PM IST",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.6!2d70.07!3d22.47!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sJamnagar!5e0!3m2!1sen!2sin!4v1",
  },

  social: {
    linkedin: "https://linkedin.com/company/brasscraft-industries",
    facebook: "https://facebook.com/brasscraftindustries",
    youtube: "https://youtube.com/@brasscraftindustries",
    twitter: "https://twitter.com/brasscraftind",
  },

  seo: {
    titleTemplate: "%s | BrassCraft Industries",
    siteUrl: "https://brasscraftindustries.com",
    ogImage: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200&h=630&auto=format&q=80",
  },

  navigation: [
    { labelKey: "nav.home", href: "/" },
    { labelKey: "nav.about", href: "/about" },
    {
      labelKey: "nav.products",
      href: "/products",
      children: [
        { labelKey: "nav.allProducts", href: "/products" },
        { labelKey: "nav.brassFittings", href: "/products/brass-fittings" },
        { labelKey: "nav.brassValves", href: "/products/brass-valves" },
        { labelKey: "nav.brassConnectors", href: "/products/brass-connectors" },
        { labelKey: "nav.brassFasteners", href: "/products/brass-fasteners" },
        { labelKey: "nav.brassInserts", href: "/products/brass-inserts" },
        { labelKey: "nav.brassTurnedParts", href: "/products/brass-turned-parts" },
        { labelKey: "nav.brassPlumbing", href: "/products/brass-plumbing-components" },
        { labelKey: "nav.brassElectrical", href: "/products/brass-electrical-components" },
      ],
    },
    { labelKey: "nav.services", href: "/services" },
    { labelKey: "nav.quality", href: "/quality" },
    { labelKey: "nav.infrastructure", href: "/infrastructure" },
    { labelKey: "nav.certifications", href: "/certifications" },
    { labelKey: "nav.blog", href: "/blog" },
    { labelKey: "nav.contact", href: "/contact" },
  ],

  footer: {
    columns: [
      {
        titleKey: "footer.quickLinks",
        links: [
          { labelKey: "nav.home", href: "/" },
          { labelKey: "nav.about", href: "/about" },
          { labelKey: "nav.services", href: "/services" },
          { labelKey: "nav.quality", href: "/quality" },
          { labelKey: "nav.contact", href: "/contact" },
          { labelKey: "nav.requestQuote", href: "/request-quote" },
        ],
      },
      {
        titleKey: "footer.productCategories",
        links: [
          { labelKey: "nav.brassFittings", href: "/products/brass-fittings" },
          { labelKey: "nav.brassValves", href: "/products/brass-valves" },
          { labelKey: "nav.brassConnectors", href: "/products/brass-connectors" },
          { labelKey: "nav.brassFasteners", href: "/products/brass-fasteners" },
          { labelKey: "nav.brassInserts", href: "/products/brass-inserts" },
          { labelKey: "nav.brassTurnedParts", href: "/products/brass-turned-parts" },
        ],
      },
    ],
    credit: {
      textKey: "footer.builtBy",
      url: "https://hardikkanajariya.in",
      companyName: "hardikkanajariya.in",
    },
  },

  features: {
    showBlog: true,
    showTestimonials: true,
    showInfrastructure: true,
    showNewsletter: true,
    showCertifications: true,
  },

  fonts: {
    heading: "Poppins",
    body: "Poppins",
  },

  images: {
    hero: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1920&q=80&auto=format",
    aboutBanner: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80&auto=format",
    infrastructureBanner: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1200&q=80&auto=format",
    qualityBanner: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1200&q=80&auto=format",
    ctaBackground: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1920&q=80&auto=format",
    servicesBanner: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&q=80&auto=format",
  },
};

export default siteConfig;
