import React, { useState, useContext } from 'react';
import { DarkModeContext } from './context/DarkModeContext';

import Icon from './assets/icons/Icon-Electron.png';

function AppBar() {
  const { darkMode } = useContext(DarkModeContext);
  const [isMaximize, setMaximize] = useState(false);

  return (
    <>
      <div
        className={`py-1 flex justify-between draggable fixed top-0 left-0 right-0 z-10 shadow-md ${
          darkMode ? 'text-gray-200 shadow-gray-300' : 'text-gray-800'
        }`}
      >
        <div className="inline-flex ml-4 gap-2">
          <img className="h-6 lg:-ml-2" src={Icon} alt="Icon of Electron" />
          <p className="text-xs md:pt-1 md:-ml-1 lg:-ml-2">K3PCHR</p>
        </div>
        <div className="inline-flex -mt-1">
          <button onClick={window.Main.Minimize} className="undraggable md:px-4 lg:px-3 pt-1 hover:bg-gray-300">
            &#8211;
          </button>
          <button onClick={() => {}} className="undraggable px-6 lg:px-5 pt-1 text-gray-400 pointer-events-none">
            {isMaximize ? '\u2752' : '⃞'}
          </button>
          <button onClick={window.Main.Close} className="undraggable px-4 pt-1 hover:bg-red-500 hover:text-white">
            &#10005;
          </button>
        </div>
      </div>
    </>
  );
}

export default AppBar;
