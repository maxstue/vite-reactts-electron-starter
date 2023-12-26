import { DarkModeContext } from './context/DarkModeContext';

import React, { useContext } from 'react';
import Header from './components/header';
import Sidebar from './components/sidebar';
import Search from './components/searchBar';
import ListModeView from './components/listModeView';

const Employees: React.FC<{ username: string }> = ({ username }) => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div
      className={`flex pt-10 h-screen overflow-hidden ${
        darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-800'
      }`}
    >
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <Header username={username} />
        <article className="flex-1 p-4 overflow-auto">
          <h1 className="font-extrabold text-3xl mt-2 mb-6 px-4">Search Employee(s)</h1>
          <Search />
          <button type="button" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
            Add Employee
          </button>
          <ListModeView />
        </article>
      </main>
    </div>
  );
};

export default Employees;
