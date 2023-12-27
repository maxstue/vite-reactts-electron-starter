import React, { useContext } from 'react';
import { DarkModeContext } from '../context/DarkModeContext';
import { FaSearch } from 'react-icons/fa';

const Search: React.FC<{ className?: string, placeholder?: string }> = ({ className, placeholder }) => {
  const { darkMode } = useContext(DarkModeContext)
  return (
    <section className={`flex flex-col ${className}`}>
      <div className="flex flex-row gap-4">
        <span className="relative flex items-center">
          <FaSearch className="text-gray-600 absolute right-0 flex w-12" />
          <input
            type="text"
            placeholder={placeholder}
            className={`w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 ${
              darkMode ? 'focus:ring-gray-500' : 'focus:ring-gray-700'
            }`}
          />
        </span>
      </div>
    </section>
  );
};

export default Search;
