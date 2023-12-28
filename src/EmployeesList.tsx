import { DarkModeContext } from './context/DarkModeContext';
import { FaPlusCircle } from 'react-icons/fa';

import React, { useState, useEffect, useContext } from 'react';
import Header from './components/header';
import Sidebar from './components/sidebar';
import Search from './components/searchBar';
import ListModeView from './components/listModeView';
import DropdownComponent from './components/dropdownList';

// Import file JSON
import departmentsData from './assets/departmentList.json';

const Employees: React.FC<{ username: string }> = ({ username }) => {
  const { darkMode } = useContext(DarkModeContext);
  const [departments, setDepartments] = useState<string[]>([]);
  
  useEffect(() => {
    // Ambil data departemen dari file JSON
    setDepartments(departmentsData.map((item) => item.department));
  }, []); // Gunakan array kosong sebagai dependencies untuk memastikan useEffect hanya dijalankan sekali setelah mounting

  return (
    <div
      className={`flex pt-10 h-screen overflow-hidden ${
        darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-800'
      }`}
    >
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <Header username={username} />
        <article className="relative flex-1 ml-2 p-4 overflow-auto">
          <button
            type="button"
            className="absolute right-16 top-20 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md inline-flex items-center gap-2"
          >
            <FaPlusCircle />
            Add Employee
          </button>
          <h2 className="font-extrabold text-2xl mt-2 mb-6">Search Employee(s)</h2>
          <span className="flex flex-row mb-10 mt-2 gap-8 h-auto">
            <section className="flex flex-col gap-4">
              <h3 className="font-bold text-xl">Employee(s)</h3>
              <Search className="" placeholder="Search" />
            </section>
            <section className="flex flex-col gap-4">
              <h3 className="font-bold text-xl">Department</h3>
              <DropdownComponent options={departments} />
            </section>
          </span>
          <h2 className="font-extrabold text-2xl mt-2 mb-6">Advanced Filter</h2>
          <Search className="mb-10" placeholder="Search by Name or ID" />
          <ListModeView />
        </article>
      </main>
    </div>
  );
};

export default Employees;
