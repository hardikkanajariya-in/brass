import type { Product } from '@/types/product';
import type { Category } from '@/types/category';
import type { Company } from '@/types/company';
import type { Testimonial } from '@/types/testimonial';
import type { Certification } from '@/types/certification';
import type { Service } from '@/types/service';
import type { BlogPost } from '@/types/blog';
import type { FAQ, InfrastructureData } from '@/types/common';

import productsData from '@/data/products.json';
import categoriesData from '@/data/categories.json';
import companyData from '@/data/company.json';
import testimonialsData from '@/data/testimonials.json';
import certificationsData from '@/data/certifications.json';
import servicesData from '@/data/services.json';
import blogData from '@/data/blog.json';
import faqsData from '@/data/faqs.json';
import infrastructureData from '@/data/infrastructure.json';

// --- Products ---
export function getProducts(): Product[] {
  return (productsData as Product[]).sort((a, b) => a.order - b.order);
}

export function getProductBySlug(slug: string): Product | undefined {
  return (productsData as Product[]).find((p) => p.slug === slug);
}

export function getProductsByCategory(categoryId: string): Product[] {
  return (productsData as Product[])
    .filter((p) => p.categoryId === categoryId)
    .sort((a, b) => a.order - b.order);
}

export function getFeaturedProducts(): Product[] {
  return (productsData as Product[]).filter((p) => p.isFeatured);
}

export function getNewProducts(): Product[] {
  return (productsData as Product[]).filter((p) => p.isNew);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return (productsData as Product[])
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, limit);
}

// --- Categories ---
export function getCategories(): Category[] {
  return (categoriesData as Category[]).sort((a, b) => a.order - b.order);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return (categoriesData as Category[]).find((c) => c.slug === slug);
}

export function getCategoryById(id: string): Category | undefined {
  return (categoriesData as Category[]).find((c) => c.id === id);
}

// --- Company ---
export function getCompany(): Company {
  return companyData as Company;
}

// --- Testimonials ---
export function getTestimonials(): Testimonial[] {
  return testimonialsData as Testimonial[];
}

// --- Certifications ---
export function getCertifications(): Certification[] {
  return certificationsData as Certification[];
}

// --- Services ---
export function getServices(): Service[] {
  return servicesData as Service[];
}

export function getServiceBySlug(slug: string): Service | undefined {
  return (servicesData as Service[]).find((s) => s.slug === slug);
}

// --- Blog ---
export function getBlogPosts(): BlogPost[] {
  return (blogData as BlogPost[]).sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return (blogData as BlogPost[]).find((p) => p.slug === slug);
}

export function getRecentBlogPosts(limit = 3): BlogPost[] {
  return getBlogPosts().slice(0, limit);
}

// --- FAQs ---
export function getFaqs(): FAQ[] {
  return faqsData as FAQ[];
}

// --- Infrastructure ---
export function getInfrastructure(): InfrastructureData {
  return infrastructureData as InfrastructureData;
}
