import { DarkModeContext } from './context/DarkModeContext';

import React, { useContext } from 'react';
import Header from './components/header';
import Sidebar from './components/sidebar';
import Chart from './components/chart';

const Dashboard: React.FC<{ username: string }> = ({ username }) => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={`flex h-screen pt-10 ${darkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-200 text-gray-800'}`}>
      <Sidebar />
      <div className={`flex-1 flex flex-col`}>
        <Header username={username} />
        <main className="flex-1 p-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Total Employees</h2>
              <p className="text-2xl font-bold">123</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Total Departments</h2>
              <p className="text-2xl font-bold">5</p>
            </div>
          </div>
          <div className="mt-8">
            <Chart />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
