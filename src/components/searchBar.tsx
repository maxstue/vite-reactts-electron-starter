import React from "react";

const Search: React.FC = () => {
    return (
      <div className="flex flex-col justify-between">
        <div className="flex flex-row gap-4">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <button type="button" className="bg-gray-900 hover:bg-gray-700 text-white py-2 px-4 rounded-md">
            Search
          </button>
        </div>
      </div>
    );
}

export default Search;