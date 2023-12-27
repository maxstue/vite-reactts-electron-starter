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
      <h2 className="flex items-center justify-center font-extrabold text-2xl my-16">K3PCHR</h2>
      <ul className="flex flex-col items-start justify-start h-full gap-5 font-bold pl-4">
        <label className="font-semibold text-sm">Main Menu</label>
        <li className="">
          <button
            onClick={() => navigate('/dashboard')}
            style={{
              color: activePage === '/dashboard' ? '#AF1763' : darkMode ? 'white' : 'black',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            <svg viewBox="0 0 120 120" width="20" height="20" fill="currentColor">
              <rect x="0" y="0" width="50" height="70" rx="5" />
              <rect x="60" y="0" width="50" height="30" rx="5" />
              <rect x="0" y="80" width="50" height="30" rx="5" />
              <rect x="60" y="40" width="50" height="70" rx="5" />
            </svg>
            Dashboard
          </button>
        </li>
        <li className="">
          <button
            onClick={() => navigate('/recruitment')}
            style={{
              color: activePage === '/recruitment' ? '#AF1763' : darkMode ? 'white' : 'black',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-person-plus-fill"
              viewBox="0 0 16 16"
            >
              {' '}
              <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />{' '}
              <path
                fillRule="evenodd"
                d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"
              />{' '}
            </svg>
            Recruitment
          </button>
        </li>
        <li className="">
          <button
            onClick={() => navigate('/employee')}
            style={{
              color: activePage === '/employee' ? '#AF1763' : darkMode ? 'white' : 'black',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-people-fill"
              viewBox="0 0 16 16"
            >
              {' '}
              <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />{' '}
              <path
                fillRule="evenodd"
                d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"
              />{' '}
              <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />{' '}
            </svg>
            Employee
          </button>
        </li>
        <label className="font-semibold text-sm">Other</label>
        <li className="">
          <button
            onClick={() => navigate('/account')}
            style={{
              color: activePage === '/account' ? '#AF1763' : darkMode ? 'white' : 'black',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
              {' '}
              <g>
                {' '}
                <path fill="none" d="M0 0h24v24H0z" />{' '}
                <path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zM6.023 15.416C7.491 17.606 9.695 19 12.16 19c2.464 0 4.669-1.393 6.136-3.584A8.968 8.968 0 0 0 12.16 13a8.968 8.968 0 0 0-6.137 2.416zM12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />{' '}
              </g>{' '}
            </svg>
            Account
          </button>
        </li>
        {/* <li className="">
          <button
            onClick={() => navigate('/settings')}
            style={{
              color: activePage === '/settings' ? '#AF1763' : darkMode ? 'white' : 'black',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-settings"
            >
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
            Settings
          </button>
        </li> */}
      </ul>
    </nav>
  );
};

export default Sidebar;
