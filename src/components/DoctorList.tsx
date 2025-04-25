import React from 'react';
import DoctorCard from './DoctorCard';
import { Doctor } from '../types';
import { Loader2 } from 'lucide-react';

interface DoctorListProps {
  doctors: Doctor[];
  loading: boolean;
  favorites: string[];
  toggleFavorite: (id: string) => void;
}

const DoctorList: React.FC<DoctorListProps> = ({ 
  doctors, 
  loading, 
  favorites, 
  toggleFavorite 
}) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
        <p className="mt-4 text-gray-600">Loading doctors...</p>
      </div>
    );
  }

  if (doctors.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-700">No doctors found</h3>
        <p className="mt-2 text-gray-500">Try adjusting your search or filter criteria</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {doctors.map(doctor => (
        <DoctorCard 
          key={doctor.id} 
          doctor={doctor} 
          onFavorite={toggleFavorite}
          isFavorite={favorites.includes(doctor.id)}
        />
      ))}
    </div>
  );
};

export default DoctorList;