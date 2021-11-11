import React from 'react';
import Icon from './Icon-Electron.png';

export default function AppBar() {
  return (
    <>
      <div className="py-0.5 flex justify-between draggable">
        <div className="inline-flex">
          <img className="h-6" src={Icon} alt="Icon of Electron" />
          <p className="text-xs pt-1 -ml-1">Vite App</p>
        </div>
        <div className="inline-flex -mt-1">
          <button onClick={window.Main.Minimize} className="undraggable px-4 pt-1 hover:bg-gray-300">
            &#8211;
          </button>
          <button onClick={window.Main.Maximize} className="undraggable px-6 pt-1 hover:bg-gray-300">
            &#8414;
          </button>
          <button onClick={window.Main.Close} className="undraggable px-4 pt-1 hover:bg-red-500 hover:text-white">
            &#10005;
          </button>
        </div>
      </div>
      <div className="bg-gray-900 text-white undraggable">
        <ul className="flex text-center">
          <li className=" text-sm w-8  hover:bg-gray-700">File</li>
          <li className="text-sm w-8   hover:bg-gray-700">Edit</li>
          <li className="text-sm w-10  hover:bg-gray-700">View</li>
          <li className="text-sm w-14  hover:bg-gray-700 ">Window</li>
          <li className="text-sm w-9  hover:bg-gray-700 ">Help</li>
        </ul>
      </div>
    </>
  );
}
