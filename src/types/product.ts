export interface Product {
  id: string;
  slug: string;
  name: string;
  categoryId: string;
  shortDescription: string;
  description: string;
  image: string;
  gallery: string[];
  specifications: ProductSpecifications;
  applications: string[];
  features: string[];
  isFeatured: boolean;
  isNew: boolean;
  order: number;
}

export interface ProductSpecifications {
  material: string;
  size: string;
  threadType: string;
  pressure: string;
  temperature: string;
  finish: string;
  [key: string]: string;
}
