import React, { createContext, useState } from 'react';

export const DarkModeContext = createContext({
  darkMode: false,
  toggleDarkMode: () => {}
});

export const DarkModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Tambahkan tipe untuk children
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>{children}</DarkModeContext.Provider>;
};
