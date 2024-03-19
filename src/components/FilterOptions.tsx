import React, { FC, ChangeEvent } from 'react';
import PriceBar from './PriceBar';

interface FilterOptionsProps {
  handleSearchInput: (event: ChangeEvent<HTMLInputElement>) => void;
  handleCategoryInput: (event: ChangeEvent<HTMLSelectElement>) => void;
  handleCheckboxChange: (event: ChangeEvent<HTMLInputElement>) => void;
  checkedValues: number[];
  searchInputValue: string;
  categoryInputValue: string;
  clearAll: () => void;
}

// eslint-disable-next-line react/function-component-definition
const FilterOptions: FC<FilterOptionsProps> = ({
  handleSearchInput,
  handleCategoryInput,
  handleCheckboxChange,
  checkedValues,
  searchInputValue,
  categoryInputValue,
  clearAll
}) => {
  return (
    <div className="w-full sm:w-[calc(100%-640px)] mr-6">
      <div>
        <div className="flex justify-between">
          <h2 className="text-base md:text-lg font-bold">Filters</h2>
          <button onClick={clearAll} className="text-xs md:text-sm text-gray-400">
            Clear All
          </button>
        </div>
        <div className="relative my-4">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400 cursor-pointer"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            onChange={handleSearchInput}
            value={searchInputValue}
            type="text"
            id="search"
            className="block w-full p-2 ps-10 text-sm border outline-none border-gray-300 rounded-lg"
            placeholder="Search anything here"
            required
          />
        </div>
      </div>
      <div className="my-8">
        <h2 className="text-sm md:text-base text-gray-500 my-1">Category</h2>
        <select
          onChange={handleCategoryInput}
          value={categoryInputValue}
          className="outline-none bg-gray-200 p-2.5 rounded-10 w-full cursor-pointer"
          name=""
          id=""
        >
          <option value="">Category</option>
          <option value="top-rated">Category 1</option>
        </select>
      </div>
      <hr />
      <div className="my-6">
        <h4 className="text-sm md:text-base text-slate-500 my-1">Ratings</h4>
        <label className="flex justify-between my-4 cursor-pointer" htmlFor="checkbox1">
          <div className="flex">
            <img src="/images/star.png" className="w-5 h-5" alt="star" />
            <h3 className="ml-2">5 Stars</h3>
          </div>
          <input
            onChange={handleCheckboxChange}
            checked={checkedValues.includes(5)}
            value={5}
            type="checkbox"
            name="checkbox"
            id="checkbox1"
            className="accent-yellow-color w-4"
          />
        </label>
        <label className="flex justify-between my-4 cursor-pointer" htmlFor="checkbox2">
          <div className="flex">
            <img src="/images/star.png" className="w-5 h-5" alt="star" />
            <h3 className="ml-2">4+ Stars</h3>
          </div>
          <input
            onChange={handleCheckboxChange}
            checked={checkedValues.includes(4)}
            value={4}
            type="checkbox"
            name="checkbox"
            id="checkbox2"
            className="accent-yellow-color w-4"
          />
        </label>
        <label className="flex justify-between my-4 cursor-pointer" htmlFor="checkbox3">
          <div className="flex">
            <img src="/images/star.png" className="w-5 h-5" alt="star" />
            <h3 className="ml-2">3+ Stars</h3>
          </div>
          <input
            onChange={handleCheckboxChange}
            checked={checkedValues.includes(3)}
            value={3}
            type="checkbox"
            name="checkbox"
            id="checkbox3"
            className="accent-yellow-color w-4"
          />
        </label>
        <label className="flex justify-between my-4 cursor-pointer" htmlFor="checkbox4">
          <div className="flex">
            <img src="/images/star.png" className="w-5 h-5" alt="star" />
            <h3 className="ml-2">2+ Stars</h3>
          </div>
          <input
            onChange={handleCheckboxChange}
            checked={checkedValues.includes(2)}
            value={2}
            type="checkbox"
            name="checkbox"
            id="checkbox4"
            className="accent-yellow-color w-4"
          />
        </label>
        <label className="flex justify-between my-4 cursor-pointer" htmlFor="checkbox5">
          <div className="flex">
            <img src="/images/star.png" className="w-5 h-5" alt="star" />
            <h3 className="ml-2">1+ Stars</h3>
          </div>
          <input
            onChange={handleCheckboxChange}
            checked={checkedValues.includes(1)}
            value={1}
            type="checkbox"
            name="checkbox"
            id="checkbox5"
            className="accent-yellow-color w-4"
          />
        </label>
      </div>
      <hr />
      <div>
        <h2 className="my-3">Price Range</h2>
        <div className="flex items-center justify-center">
          <PriceBar />
        </div>
      </div>
    </div>
  );
};

export default FilterOptions;
