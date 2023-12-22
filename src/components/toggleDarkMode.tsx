import React, { useContext, useEffect } from 'react';
import { DarkModeContext } from '../context/DarkModeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const ToggleDarkMode: React.FC = () => {
  const { toggleDarkMode, darkMode } = useContext(DarkModeContext);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <button
      className={`rounded-lg px-4 py-2 shadow-xl duration-100 ${
        darkMode ? 'text-gray-200 hover:text-gray-400 bg-gray-700 hover:bg-gray-900 shadow-white' : 'text-gray-800 hover:text-gray-600 bg-gray-100 hover:bg-gray-300'
      }`}
      onClick={toggleDarkMode}
      style={{ display: 'flex', alignItems: 'center' }}
    >
      <FontAwesomeIcon icon={darkMode ? faMoon : faSun} />
    </button>
  );
};

export default ToggleDarkMode;
