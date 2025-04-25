import React, { useState, useEffect } from 'react';
import Autocomplete from './components/Autocomplete';
import FilterPanel from './components/FilterPanel';
import DoctorList from './components/DoctorList';
import Header from './components/Header';
import FavoritesModal from './components/FavoritesModal';
import { Doctor, FilterOptions } from './types';
import { fetchDoctors, searchDoctors, filterDoctors } from './services/apiService';
import { specialties } from './data/doctorData';

function App() {
  const [allDoctors, setAllDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFavoritesModal, setShowFavoritesModal] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    specialty: '',
    location: '',
    availability: '',
    acceptingNewPatients: false,
    sortBy: 'Relevance'
  });

  // Load doctors on initial render
  useEffect(() => {
    const loadDoctors = async () => {
      setLoading(true);
      try {
        const data = await fetchDoctors();
        setAllDoctors(data);
        setFilteredDoctors(data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDoctors();
    
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage when they change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Handle search
  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setLoading(true);
    try {
      if (query.trim() === '') {
        setFilteredDoctors(allDoctors);
      } else {
        const results = await searchDoctors(query);
        setFilteredDoctors(results);
      }
    } catch (error) {
      console.error('Error searching doctors:', error);
    } finally {
      setLoading(false);
    }
  };

  // Apply filters
  const applyFilters = () => {
    setLoading(true);
    try {
      const filtered = filterDoctors(
        searchQuery ? filteredDoctors : allDoctors,
        filters.specialty,
        filters.location,
        filters.availability,
        filters.acceptingNewPatients,
        filters.sortBy
      );
      setFilteredDoctors(filtered);
    } catch (error) {
      console.error('Error filtering doctors:', error);
    } finally {
      setLoading(false);
    }
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      specialty: '',
      location: '',
      availability: '',
      acceptingNewPatients: false,
      sortBy: 'Relevance'
    });
    setFilteredDoctors(searchQuery ? filteredDoctors : allDoctors);
  };

  // Toggle favorite
  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      if (prev.includes(id)) {
        return prev.filter(favId => favId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Get favorite doctors
  const getFavoriteDoctors = () => {
    return allDoctors.filter(doctor => favorites.includes(doctor.id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        showFavorites={() => setShowFavoritesModal(true)} 
        favoritesCount={favorites.length} 
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Find the Right Doctor for You</h1>
          <p className="mt-3 text-xl text-gray-500 sm:mt-4">
            Search our network of top-rated healthcare professionals
          </p>
        </div>
        
        <div className="max-w-xl mx-auto mb-8">
          <Autocomplete 
            placeholder="Search for doctors by name..." 
            suggestions={specialties}
            onSearch={handleSearch}
          />
        </div>
        
        <div className="md:flex md:gap-8">
          <div className="md:w-1/3 lg:w-1/4 mb-6 md:mb-0">
            <FilterPanel 
              filters={filters} 
              setFilters={setFilters} 
              applyFilters={applyFilters} 
              resetFilters={resetFilters} 
            />
          </div>
          
          <div className="md:w-2/3 lg:w-3/4">
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">
                {loading ? 'Finding doctors...' : `${filteredDoctors.length} Doctors Found`}
              </h2>
            </div>
            
            <DoctorList 
              doctors={filteredDoctors} 
              loading={loading} 
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          </div>
        </div>
      </main>
      
      <FavoritesModal 
        isOpen={showFavoritesModal} 
        onClose={() => setShowFavoritesModal(false)} 
        favorites={getFavoriteDoctors()} 
        removeFavorite={toggleFavorite} 
      />
      
      <footer className="bg-white mt-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="md:flex md:justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-6 h-6 text-blue-600"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
                <span className="ml-2 text-lg font-bold text-gray-900">MedConnect</span>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Connecting patients with the best healthcare professionals.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
              <div>
                <h3 className="text-sm font-semibold text-gray-800 tracking-wider uppercase">For Patients</h3>
                <ul className="mt-4 space-y-2">
                  <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600">Find a Doctor</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600">Book Appointments</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600">Medical Records</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-800 tracking-wider uppercase">For Doctors</h3>
                <ul className="mt-4 space-y-2">
                  <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600">Join Our Network</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600">Doctor Portal</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600">Resources</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-800 tracking-wider uppercase">Company</h3>
                <ul className="mt-4 space-y-2">
                  <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600">About Us</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600">Careers</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600">Contact</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
            <p className="text-sm text-gray-500">
              &copy; 2025 MedConnect. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <div className="flex space-x-6">
                <a href="#" className="text-gray-500 hover:text-blue-600">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-blue-600">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-blue-600">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;