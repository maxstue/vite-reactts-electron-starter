import React, { useState, useEffect, useContext } from 'react';
import { DarkModeContext } from '../context/DarkModeContext';

interface FlashMessageProps {
  type: 'success' | 'warning' | 'error';
  message: string;
}

const FlashMessage = ({ type, message }: FlashMessageProps) => {
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
      className={`absolute z-10 bottom-0 right-0 w-fit h-fit px-6 py-4 rounded flex items-center justify-center ${
        !darkMode ? 'bg-white' : 'bg-gray-900'
      } shadow-lg`}
      style={{
        opacity: isVisible ? 1 : 0
      }}
    >
      <div className="flex flex-col items-center justify-center h-full w-full">
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              {type === 'success' && (
                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
              )}
              {type === 'warning' && (
                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm0-8v6h2V7h-2z" />
              )}
              {type === 'error' && (
                <>
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                  <line x1="12" y1="9" x2="12" y2="13"></line>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </>
              )}
            </svg>
            <div className="text-sm text-center">{message}</div>
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
