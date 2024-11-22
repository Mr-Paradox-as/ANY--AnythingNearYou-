import React, { useState } from 'react';
import { Search, X, Sparkles } from 'lucide-react';

const SearchBar = ({ onSearch, placeholder = "Search...", className = "" }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
    }
  };

  const handleClear = () => {
    setSearchTerm('');
  };

  return (
    <div className={`w-full max-w-2xl mx-auto ${className}`}>
      <form 
        onSubmit={handleSubmit} 
        className={`relative transition-all duration-300 ${
          isFocused ? 'scale-105' : 'scale-100'
        }`}
      >
        <div className={`
          relative 
          group 
          backdrop-blur-lg 
          bg-white/80 
          dark:bg-gray-800/80 
          rounded-2xl 
          shadow-lg 
          hover:shadow-xl 
          transition-all 
          duration-300
          ${isFocused ? 'shadow-blue-500/20' : ''}
        `}>
          {/* Floating particles effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-2xl opacity-20 group-hover:opacity-100 blur transition duration-500"></div>
          
          {/* Search input container */}
          <div className="relative bg-white/90 dark:bg-gray-800/90 rounded-2xl p-1">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={placeholder}
              className="
                w-full 
                px-12 
                py-4 
                text-lg 
                bg-transparent 
                rounded-xl 
                outline-none 
                transition-all 
                duration-300
                dark:text-white
                placeholder:text-gray-400
              "
            />

            {/* Animated search icon */}
            <div className={`
              absolute 
              left-4 
              top-1/2 
              -translate-y-1/2 
              transition-transform 
              duration-300
              ${isFocused ? 'scale-110' : 'scale-100'}
            `}>
              <Search 
                className={`
                  w-6 
                  h-6 
                  transition-colors 
                  duration-300
                  ${isFocused ? 'text-blue-500' : 'text-gray-400'}
                `} 
              />
            </div>

            {/* Clear button */}
            {searchTerm && (
              <button
                type="button"
                onClick={handleClear}
                className="
                  absolute 
                  right-20 
                  top-1/2 
                  -translate-y-1/2 
                  p-1 
                  rounded-full 
                  hover:bg-gray-100 
                  dark:hover:bg-gray-700 
                  transition-colors 
                  duration-300
                "
              >
                <X className="w-5 h-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
              </button>
            )}

            {/* Search button with sparkle effect */}
            <button
              type="submit"
              className={`
                absolute 
                right-2 
                top-1/2 
                -translate-y-1/2 
                px-4 
                py-2 
                bg-gradient-to-r 
                from-blue-500 
                to-purple-500 
                text-white 
                rounded-lg 
                flex 
                items-center 
                gap-2 
                hover:from-blue-600 
                hover:to-purple-600 
                transition-all 
                duration-300 
                hover:scale-105
              `}
            >
              <Sparkles className="w-4 h-4" />
              <span>Search</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
