import React, { useContext } from 'react';
import { DarkModeContext } from '../context/DarkModeContext';

const Chart: React.FC = () => {
  const { darkMode } = useContext(DarkModeContext);
  // Implementasi grafik batang di sini
  return <div>Placeholder for Chart</div>;
};

export default Chart;
