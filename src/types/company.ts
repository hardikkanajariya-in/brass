export interface Company {
  name: string;
  tagline: string;
  established: number;
  overview: string;
  mission: string;
  vision: string;
  coreValues: CoreValue[];
  milestones: Milestone[];
  team: TeamMember[];
  stats: CompanyStats;
  address: Address;
}

export interface CoreValue {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Milestone {
  year: number;
  title: string;
  description: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface CompanyStats {
  yearsExperience: number;
  productsManufactured: number;
  countriesServed: number;
  satisfiedClients: number;
  monthlyCapacity: string;
  qualityCertifications: number;
}

export interface Address {
  street: string;
  area: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}
