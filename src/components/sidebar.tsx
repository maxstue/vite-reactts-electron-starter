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
      className={`w-48 p-4 border-r-[1px] z-10 ${
        darkMode ? 'bg-gray-800 text-white border-white' : 'bg-gray-200 text-gray-800 border-gray-800'
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
              backgroundColor: activePage === '/dashboard' ? '#3b82f6' : '',
              color: activePage === '/dashboard' ? 'white' : '',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '5px',
              padding: '4px 10px 4px 10px',
              borderRadius: '4px'
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
              backgroundColor: activePage === '/recruitment' ? '#3b82f6' : '',
              color: activePage === '/recruitment' ? 'white' : '',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '5px',
              padding: '4px 10px 4px 10px',
              borderRadius: '4px'
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
              backgroundColor: activePage === '/employee' ? '#3b82f6' : '',
              color: activePage === '/employee' ? 'white' : '',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '5px',
              padding: '4px 10px 4px 10px',
              borderRadius: '4px'
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
            onClick={() => navigate('/settings')}
            style={{
              backgroundColor: activePage === '/settings' ? '#3b82f6' : '',
              color: activePage === '/settings' ? 'white' : '',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '5px',
              padding: '4px 10px 4px 10px',
              borderRadius: '4px'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
              {' '}
              <g>
                {' '}
                <path fill="none" d="M0 0h24v24H0z" />{' '}
                <path d="M5.334 4.545a9.99 9.99 0 0 1 3.542-2.048A3.993 3.993 0 0 0 12 3.999a3.993 3.993 0 0 0 3.124-1.502 9.99 9.99 0 0 1 3.542 2.048 3.993 3.993 0 0 0 .262 3.454 3.993 3.993 0 0 0 2.863 1.955 10.043 10.043 0 0 1 0 4.09c-1.16.178-2.23.86-2.863 1.955a3.993 3.993 0 0 0-.262 3.455 9.99 9.99 0 0 1-3.542 2.047A3.993 3.993 0 0 0 12 20a3.993 3.993 0 0 0-3.124 1.502 9.99 9.99 0 0 1-3.542-2.047 3.993 3.993 0 0 0-.262-3.455 3.993 3.993 0 0 0-2.863-1.954 10.043 10.043 0 0 1 0-4.091 3.993 3.993 0 0 0 2.863-1.955 3.993 3.993 0 0 0 .262-3.454zM13.5 14.597a3 3 0 1 0-3-5.196 3 3 0 0 0 3 5.196z" />{' '}
              </g>{' '}
            </svg>
            Settings
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
