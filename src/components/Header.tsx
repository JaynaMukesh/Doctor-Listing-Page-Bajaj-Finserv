import React from 'react';
import { Heart, User, Menu } from 'lucide-react';

interface HeaderProps {
  showFavorites: () => void;
  favoritesCount: number;
}

const Header: React.FC<HeaderProps> = ({ showFavorites, favoritesCount }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-8 h-8 text-blue-600"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
              <span className="ml-2 text-xl font-bold text-gray-900">MedConnect</span>
            </a>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <nav className="flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">Find a Doctor</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">Specialties</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">Locations</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">About Us</a>
            </nav>
            
            <div className="flex items-center ml-4 space-x-3">
              <button 
                className="relative p-1 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={showFavorites}
                aria-label="Favorites"
              >
                <Heart size={24} />
                {favoritesCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {favoritesCount}
                  </span>
                )}
              </button>
              <button 
                className="p-1 text-gray-700 hover:text-blue-600 transition-colors"
                aria-label="User account"
              >
                <User size={24} />
              </button>
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#" className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium">Find a Doctor</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium">Specialties</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium">Locations</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium">About Us</a>
          </div>
          <div className="px-5 py-3 border-t border-gray-200 flex justify-between">
            <button 
              className="flex items-center text-gray-700"
              onClick={() => {
                showFavorites();
                setIsMenuOpen(false);
              }}
            >
              <Heart size={20} className="mr-1" />
              <span>Favorites ({favoritesCount})</span>
            </button>
            <button className="flex items-center text-gray-700">
              <User size={20} className="mr-1" />
              <span>Account</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;