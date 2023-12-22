import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { DarkModeContext } from '../context/DarkModeContext';

const Sidebar: React.FC = () => {
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [activePage, setActivePage] = useState('/dashboard');

  useEffect(() => {
    // Update active page when location changes
    setActivePage(location.pathname);
  }, [location.pathname]);

  return (
    <nav
      className={`w-48 p-4 shadow-md shadow-[rgba(0, 0, 15, 0.5)_10px_5px_4px_0px] inset-20 z-10 ${
        darkMode ? 'bg-gray-800 text-white shadow-white' : 'bg-gray-200 text-gray-800'
      }

      `}
    >
      <ul className="flex flex-col items-center justify-center h-full gap-4">
        <li className="">
          <button
            onClick={() => navigate('/dashboard')}
            style={activePage === '/dashboard' ? { color: '#AF1763' } : { color: darkMode ? 'white' : 'black' }}
          >
            Dashboard
          </button>
        </li>
        <li className="">
          <button
            onClick={() => navigate('/recruitment')}
            style={activePage === '/recruitment' ? { color: '#AF1763' } : { color: darkMode ? 'white' : 'black' }}
          >
            Recruitment
          </button>
        </li>
        <li className="">
          <button
            onClick={() => navigate('/employee')}
            style={activePage === '/employee' ? { color: '#AF1763' } : { color: darkMode ? 'white' : 'black' }}
          >
            Employee
          </button>
        </li>
        <li className="">
          <button
            onClick={() => navigate('/account')}
            style={activePage === '/account' ? { color: '#AF1763' } : { color: darkMode ? 'white' : 'black' }}
          >
            Account
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
