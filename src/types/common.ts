export interface NavigationItem {
  labelKey: string;
  href: string;
  children?: NavigationItem[];
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface InfrastructurePlant {
  name: string;
  area: string;
  location: string;
  description: string;
  highlights: string[];
  image: string;
}

export interface InfrastructureCapacity {
  monthlyProduction: string;
  operatingHours: string;
  leadTime: string;
  rushOrders: string;
}

export interface InfrastructureData {
  plant: InfrastructurePlant;
  machines: Machine[];
  qualityLab: QualityLab;
  capacity: InfrastructureCapacity;
}

export interface Machine {
  id: string;
  name: string;
  count: number;
  description: string;
  brand: string;
  image: string;
}

export interface QualityLab {
  name: string;
  description: string;
  image: string;
  equipment: LabEquipment[];
}

export interface LabEquipment {
  id: string;
  name: string;
  description: string;
  brand: string;
}

export interface FooterColumn {
  titleKey: string;
  links: NavigationItem[];
}

export interface FooterCredit {
  textKey: string;
  url: string;
  companyName: string;
}
