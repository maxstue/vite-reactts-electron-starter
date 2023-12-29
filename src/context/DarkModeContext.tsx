import React, { createContext, useEffect, useState } from 'react';

export const DarkModeContext = createContext({
  darkMode: false,
  toggleDarkMode: () => {}
});

export const DarkModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    // Baca nilai dari localStorage saat inisialisasi
    const storedDarkMode = localStorage.getItem('darkMode');
    return storedDarkMode ? JSON.parse(storedDarkMode) : false;
  });

  useEffect(() => {
    // Simpan nilai darkMode ke localStorage setiap kali nilainya berubah
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode: any) => !prevDarkMode);
  };

  return <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>{children}</DarkModeContext.Provider>;
};
