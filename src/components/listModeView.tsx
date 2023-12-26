import React, { useState } from 'react';

const ListModeView: React.FC = () => {
  const [selectedMode, setSelectedMode] = useState('list');

  const handleModeChange = (mode: string) => {
    setSelectedMode(mode);
  };

  return (
    <div className="flex flex-col justify-between">
      <div className="flex flex-row gap-4">
        <div
          className={`cursor-pointer p-2 rounded-xl transition-all duration-300 ${
            selectedMode === 'list' ? 'border-gray-800 border-spacing-7 border-2' : ''
          }`}
          onClick={() => handleModeChange('list')}
        >
          {/* SVG for List Mode */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
        </div>
        <div
          className={`cursor-pointer p-2 rounded-xl transition-all duration-300 ${
            selectedMode === 'grid' ? 'border-gray-800 border-spacing-7 border-2' : ''
          }`}
          onClick={() => handleModeChange('grid')}
        >
          {/* SVG for Grid Mode */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ListModeView;
