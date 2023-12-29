import React, { useState, useEffect, useContext } from 'react';
import { DarkModeContext } from '../context/DarkModeContext';

interface FlashMessageProps {
  type: 'success' | 'warning' | 'error';
  color: string;
  message: string;
}

const FlashMessage = ({ type, color, message }: FlashMessageProps) => {
  const { darkMode } = useContext(DarkModeContext);
  const [isVisible, setIsVisible] = useState(true);

  //   const handleClose = () => {
  //     setIsVisible(false);
  //   };

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  }, []);

  return (
    <div
      className={`fixed z-10 bottom-16 right-10 min-w-2xl w-80 px-6 py-4 rounded flex items-center justify-center duration-100 border ${
        !darkMode ? 'bg-white border-gray-800' : 'bg-[#253D78]'
      } shadow-lg`}
      style={{
        opacity: isVisible ? 1 : 0
      }}
    >
      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex items-center w-full">
          <div className="flex flex-row gap-4 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke={color} className="h-12 w-12">
              {type === 'success' && (
                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
              )}
              {type === 'warning' && (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                />
              )}
              {type === 'error' && (
                <path
                  fillRule="evenodd"
                  d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                  clipRule="evenodd"
                />
              )}
            </svg>
            <div className="text-sm">{message}</div>
          </div>
          {/* <button onClick={handleClose} className="ml-2 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              {' '}
              <g>
                {' '}
                <path fill="none" d="M0 0h24v24H0z" />{' '}
                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-11.414L9.172 7.757 7.757 9.172 10.586 12l-2.829 2.828 1.415 1.415L12 13.414l2.828 2.829 1.415-1.415L13.414 12l2.829-2.828-1.415-1.415L12 10.586z" />{' '}
              </g>{' '}
            </svg>
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default FlashMessage;
