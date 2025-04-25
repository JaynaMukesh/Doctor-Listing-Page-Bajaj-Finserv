import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';

interface AutocompleteProps {
  placeholder: string;
  suggestions: string[];
  onSearch: (value: string) => void;
}

const Autocomplete: React.FC<AutocompleteProps> = ({ 
  placeholder, 
  suggestions, 
  onSearch 
}) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (inputValue.trim() === '') {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const filtered = suggestions.filter(
      suggestion => suggestion.toLowerCase().includes(inputValue.toLowerCase())
    );
    
    setFilteredSuggestions(filtered);
    setShowSuggestions(true);
    setActiveSuggestionIndex(0);
  }, [inputValue, suggestions]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current && 
        !inputRef.current.contains(event.target as Node) &&
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Enter key
    if (e.key === 'Enter') {
      if (showSuggestions && filteredSuggestions.length > 0) {
        setInputValue(filteredSuggestions[activeSuggestionIndex]);
        setShowSuggestions(false);
        onSearch(filteredSuggestions[activeSuggestionIndex]);
      } else {
        onSearch(inputValue);
      }
    } 
    // Arrow up key
    else if (e.key === 'ArrowUp') {
      if (activeSuggestionIndex > 0) {
        setActiveSuggestionIndex(activeSuggestionIndex - 1);
      }
      e.preventDefault();
    } 
    // Arrow down key
    else if (e.key === 'ArrowDown') {
      if (activeSuggestionIndex < filteredSuggestions.length - 1) {
        setActiveSuggestionIndex(activeSuggestionIndex + 1);
      }
      e.preventDefault();
    }
    // Escape key
    else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setShowSuggestions(false);
    onSearch(suggestion);
    inputRef.current?.focus();
  };

  const handleSubmit = () => {
    onSearch(inputValue);
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full">
      <div className="relative flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => inputValue && setShowSuggestions(true)}
          placeholder={placeholder}
          className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        />
        <button 
          onClick={handleSubmit}
          className="absolute right-3 text-gray-500 hover:text-blue-600 transition-colors"
          aria-label="Search"
        >
          <Search size={20} />
        </button>
      </div>
      
      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul 
          ref={suggestionsRef}
          className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto"
        >
          {filteredSuggestions.map((suggestion, index) => (
            <li 
              key={index}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                index === activeSuggestionIndex ? 'bg-blue-50 text-blue-700' : ''
              }`}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;