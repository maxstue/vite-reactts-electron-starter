import React from 'react';
import { FaSortDown } from 'react-icons/fa';

const DropdownComponent: React.FC = () => {
  return (
    <section className="relative flex items-center">
      <FaSortDown className="text-gray-600 absolute right-3 flex h-12 -translate-y-1" />
      <select className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
        <option>All</option>
        <option>Laravel 9 with React</option>
        <option>React wit</option>
        <option>React With Headle</option>
      </select>
    </section>
  );
};

export default DropdownComponent;
