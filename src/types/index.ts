export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  subspecialty?: string;
  photo: string;
  rating: number;
  reviewCount: number;
  education: string;
  availability: string[];
  location: string;
  acceptingNewPatients: boolean;
}

export interface FilterOptions {
  specialty: string;
  location: string;
  availability: string;
  acceptingNewPatients: boolean;
  sortBy: string;
}