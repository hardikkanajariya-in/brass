import type { NavigationItem, FooterColumn, FooterCredit } from "./common";
import type { Address } from "./company";

export interface SiteConfig {
  company: SiteCompany;
  contact: SiteContact;
  social: SiteSocial;
  seo: SiteSeo;
  navigation: NavigationItem[];
  footer: SiteFooter;
  features: SiteFeatures;
  fonts: SiteFonts;
  images: SiteImages;
}

export interface SiteCompany {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  founded: number;
  employees: string;
  exportCountries: number;
  annualCapacity: string;
  logo: string;
  logoDark: string;
}

export interface SiteContact {
  email: string;
  salesEmail: string;
  phone: string;
  phoneAlt: string;
  address: Address;
  workingHours: string;
  mapEmbedUrl: string;
}

export interface SiteSeo {
  titleTemplate: string;
  siteUrl: string;
  ogImage: string;
}

export interface SiteSocial {
  linkedin: string;
  facebook: string;
  youtube: string;
  twitter: string;
}

export interface SiteFooter {
  columns: FooterColumn[];
  credit: FooterCredit;
}

export interface SiteFeatures {
  showBlog: boolean;
  showTestimonials: boolean;
  showInfrastructure: boolean;
  showNewsletter: boolean;
  showCertifications: boolean;
}

export interface SiteFonts {
  heading: string;
  body: string;
}

export interface SiteImages {
  hero: string;
  aboutBanner: string;
  infrastructureBanner: string;
  qualityBanner: string;
  ctaBackground: string;
  servicesBanner: string;
}
