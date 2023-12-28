import React, { useContext } from 'react';
import ToggleDarkMode from './toggleDarkMode';
import { DarkModeContext } from '../context/DarkModeContext';

const Header: React.FC<{ initialUsername?: string }> = ({ initialUsername }) => {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <header
      className={`flex justify-end items-center p-4 pr-8 shadow-md gap-5 ${
        darkMode ? ' bg-gray-800 text-white shadow-white' : ' bg-gray-200 text-gray-800'
      }`}
    >
      <ToggleDarkMode />
      <p>Hello, {initialUsername}</p>
    </header>
  );
};

export default Header;
