import React from 'react';
import { Star, MapPin, Calendar, Heart } from 'lucide-react';
import { Doctor } from '../types';

interface DoctorCardProps {
  doctor: Doctor;
  onFavorite: (id: string) => void;
  isFavorite: boolean;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onFavorite, isFavorite }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="md:flex">
        <div className="md:w-1/3 h-48 md:h-auto">
          <img 
            src={doctor.photo} 
            alt={doctor.name} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="p-4 md:p-6 md:w-2/3">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{doctor.name}</h2>
              <p className="text-blue-600">{doctor.specialty}
                {doctor.subspecialty && <span className="text-gray-600"> • {doctor.subspecialty}</span>}
              </p>
            </div>
            <button 
              onClick={() => onFavorite(doctor.id)} 
              className={`p-1 rounded-full ${isFavorite ? 'text-red-500' : 'text-gray-400 hover:text-red-500'} transition-colors`}
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart fill={isFavorite ? "currentColor" : "none"} size={24} />
            </button>
          </div>
          
          <div className="mt-2 flex items-center">
            <Star className="text-yellow-400" size={16} />
            <span className="ml-1 text-gray-700">{doctor.rating}</span>
            <span className="mx-1 text-gray-500">•</span>
            <span className="text-gray-500">{doctor.reviewCount} reviews</span>
          </div>
          
          <div className="mt-2 flex items-center text-gray-600">
            <MapPin size={16} className="mr-1" />
            <span>{doctor.location}</span>
          </div>
          
          <div className="mt-2 flex items-center text-gray-600">
            <Calendar size={16} className="mr-1" />
            <span>Available: {doctor.availability.join(", ")}</span>
          </div>
          
          <div className="mt-3">
            <p className="text-sm text-gray-600">
              {doctor.education}
            </p>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2 items-center justify-between">
            <span className={`px-3 py-1 text-xs rounded-full ${doctor.acceptingNewPatients ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
              {doctor.acceptingNewPatients ? 'Accepting New Patients' : 'Not Accepting New Patients'}
            </span>
            
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;