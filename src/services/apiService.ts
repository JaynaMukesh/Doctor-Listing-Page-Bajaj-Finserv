import { Doctor } from '../types';
import { doctors } from '../data/doctorData';

// Simulates API call to fetch doctors
export const fetchDoctors = (): Promise<Doctor[]> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      resolve(doctors);
    }, 500);
  });
};

// Simulates API call to search doctors by name
export const searchDoctors = (query: string): Promise<Doctor[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const results = doctors.filter(doctor => 
        doctor.name.toLowerCase().includes(query.toLowerCase())
      );
      resolve(results);
    }, 300);
  });
};

// Simulates API call to filter doctors
export const filterDoctors = (
  doctors: Doctor[],
  specialty: string,
  location: string,
  availability: string,
  acceptingNewPatients: boolean,
  sortBy: string
): Doctor[] => {
  let filtered = [...doctors];
  
  // Filter by specialty
  if (specialty) {
    filtered = filtered.filter(doctor => 
      doctor.specialty === specialty || doctor.subspecialty === specialty
    );
  }
  
  // Filter by location
  if (location) {
    filtered = filtered.filter(doctor => doctor.location === location);
  }
  
  // Filter by availability
  if (availability) {
    filtered = filtered.filter(doctor => 
      doctor.availability.includes(availability)
    );
  }
  
  // Filter by accepting new patients
  if (acceptingNewPatients) {
    filtered = filtered.filter(doctor => doctor.acceptingNewPatients);
  }
  
  // Sort results
  if (sortBy) {
    switch (sortBy) {
      case 'Name (A-Z)':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Name (Z-A)':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'Highest Rated':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Default sort by relevance (no change)
        break;
    }
  }
  
  return filtered;
};