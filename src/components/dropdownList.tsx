import React from 'react';
import { FaSortDown } from 'react-icons/fa';

const DropdownComponent: React.FC<{ options: string[] }> = ({ options }) => {
  return (
    <section className="relative flex items-center">
      <FaSortDown className="text-gray-600 absolute right-3 flex h-12 -translate-y-1" />
      <select className="w-80 pl-4 py-2 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
        {/* Gunakan opsi yang diterima dari props */}
        {options.map((option, index) => (
          <option key={index}>{option}</option>
        ))}
      </select>
    </section>
  );
};

export default DropdownComponent;
