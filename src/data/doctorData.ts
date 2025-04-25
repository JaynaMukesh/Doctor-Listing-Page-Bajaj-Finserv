import { Doctor } from '../types';

export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    subspecialty: 'Interventional Cardiology',
    photo: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.8,
    reviewCount: 124,
    education: 'Harvard Medical School',
    availability: ['Monday', 'Wednesday', 'Friday'],
    location: 'New York City',
    acceptingNewPatients: true
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Neurology',
    subspecialty: 'Neurological Surgery',
    photo: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.9,
    reviewCount: 89,
    education: 'Johns Hopkins University',
    availability: ['Tuesday', 'Thursday'],
    location: 'Boston',
    acceptingNewPatients: true
  },
  {
    id: '3',
    name: 'Dr. James Wilson',
    specialty: 'Orthopedics',
    subspecialty: 'Sports Medicine',
    photo: 'https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.7,
    reviewCount: 156,
    education: 'Stanford University',
    availability: ['Monday', 'Wednesday', 'Friday'],
    location: 'Los Angeles',
    acceptingNewPatients: false
  },
  {
    id: '4',
    name: 'Dr. Emily Rodriguez',
    specialty: 'Pediatrics',
    subspecialty: 'Pediatric Cardiology',
    photo: 'https://images.pexels.com/photos/5214958/pexels-photo-5214958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.9,
    reviewCount: 203,
    education: 'Yale School of Medicine',
    availability: ['Monday', 'Tuesday', 'Thursday'],
    location: 'Chicago',
    acceptingNewPatients: true
  },
  {
    id: '5',
    name: 'Dr. David Kim',
    specialty: 'Dermatology',
    photo: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.6,
    reviewCount: 78,
    education: 'Columbia University',
    availability: ['Wednesday', 'Friday'],
    location: 'Seattle',
    acceptingNewPatients: true
  },
  {
    id: '6',
    name: 'Dr. Lisa Patel',
    specialty: 'Oncology',
    subspecialty: 'Hematology',
    photo: 'https://images.pexels.com/photos/5407214/pexels-photo-5407214.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.8,
    reviewCount: 167,
    education: 'University of Pennsylvania',
    availability: ['Monday', 'Thursday', 'Friday'],
    location: 'Philadelphia',
    acceptingNewPatients: true
  },
  {
    id: '7',
    name: 'Dr. Robert Taylor',
    specialty: 'Gastroenterology',
    photo: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.7,
    reviewCount: 92,
    education: 'Duke University School of Medicine',
    availability: ['Tuesday', 'Wednesday'],
    location: 'San Francisco',
    acceptingNewPatients: false
  },
  {
    id: '8',
    name: 'Dr. Amanda Wright',
    specialty: 'Psychiatry',
    photo: 'https://images.pexels.com/photos/5215015/pexels-photo-5215015.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.9,
    reviewCount: 145,
    education: 'University of California, San Francisco',
    availability: ['Monday', 'Tuesday', 'Friday'],
    location: 'Los Angeles',
    acceptingNewPatients: true
  }
];

export const specialties = [
  'Cardiology',
  'Neurology',
  'Orthopedics',
  'Pediatrics',
  'Dermatology',
  'Oncology',
  'Gastroenterology',
  'Psychiatry',
  'Endocrinology',
  'Pulmonology',
  'Rheumatology',
  'Ophthalmology',
  'Urology',
  'Nephrology',
  'Allergy & Immunology',
  'Infectious Disease',
  'Hematology'
];

export const locations = [
  'New York City',
  'Boston',
  'Los Angeles',
  'Chicago',
  'Seattle',
  'Philadelphia',
  'San Francisco',
  'Miami',
  'Houston',
  'Denver',
  'Atlanta',
  'Phoenix',
  'Austin'
];

export const availabilityOptions = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday'
];

export const sortOptions = [
  'Relevance',
  'Name (A-Z)',
  'Name (Z-A)',
  'Highest Rated'
];