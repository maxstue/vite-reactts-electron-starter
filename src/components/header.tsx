import React, { useContext } from 'react';
import ToggleDarkMode from './toggleDarkMode';
import { DarkModeContext } from '../context/DarkModeContext';

const Header: React.FC<{ username: string }> = ({ username }) => {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <header
      className={`flex justify-end items-center p-4 pr-5 shadow-lg gap-5 ${
        darkMode ? ' bg-gray-800 text-white shadow-white' : ' bg-gray-200 text-gray-800'
      }`}
    >
      <div>
        <ToggleDarkMode />
      </div>
      <div>
        <p>Hello, {username}</p>
      </div>
    </header>
  );
};

export default Header;
