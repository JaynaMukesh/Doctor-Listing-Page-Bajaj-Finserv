import React from 'react';
import { X } from 'lucide-react';
import { Doctor } from '../types';

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: Doctor[];
  removeFavorite: (id: string) => void;
}

const FavoritesModal: React.FC<FavoritesModalProps> = ({ 
  isOpen, 
  onClose, 
  favorites, 
  removeFavorite 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Saved Doctors</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="overflow-y-auto p-4 max-h-[70vh]">
          {favorites.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">You haven't saved any doctors yet.</p>
              <p className="mt-2 text-gray-500 text-sm">
                Click the heart icon on a doctor's card to save them to your favorites.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {favorites.map(doctor => (
                <li key={doctor.id} className="py-4">
                  <div className="flex items-start">
                    <img 
                      src={doctor.photo} 
                      alt={doctor.name} 
                      className="h-16 w-16 object-cover rounded-full"
                    />
                    <div className="ml-4 flex-1">
                      <h3 className="font-medium text-gray-800">{doctor.name}</h3>
                      <p className="text-sm text-blue-600">{doctor.specialty}</p>
                      <p className="text-sm text-gray-500">{doctor.location}</p>
                    </div>
                    <button
                      onClick={() => removeFavorite(doctor.id)}
                      className="text-gray-400 hover:text-red-500"
                      aria-label="Remove from favorites"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        <div className="border-t p-4">
          <button
            onClick={onClose}
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default FavoritesModal;