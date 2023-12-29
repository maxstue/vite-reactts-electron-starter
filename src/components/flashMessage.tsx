import React, { useState, useEffect, useContext } from 'react';
import { DarkModeContext } from '../context/DarkModeContext';

interface FlashMessageProps {
  type: 'success' | 'warning' | 'error' | 'info';
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
      className={`fixed z-10 bottom-16 right-10 min-w-2xl w-96 px-6 py-4 rounded flex items-center duration-100 border ${
        !darkMode ? 'bg-white border-gray-800' : 'bg-[#253D78]'
      } shadow-lg`}
      style={{
        opacity: isVisible ? 1 : 0
      }}
    >
      <div className="flex gap-4 items-center justify-between">
        <div className='flex w-fit'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke={color} width="48" height="48">
            {type === 'success' && (
              <g>
                <circle cx="12" cy="12" r="11" stroke={color} stroke-width="2" fill={color} />
                <path fill="#FFFFFF" d="M9.73 16.34l-4.48-4.48L5 14.12l4.73 4.73L18 7.59l-1.41-1.41z" />
              </g>
            )}
            {type === 'warning' && (
              <g>
                <circle cx="12" cy="12" r="11" stroke={color} stroke-width="2" fill={color} />
                <path fill="#FFFFFF" d="M12 2L2 22h20L12 2zM12 16h-2v-2h2v2zm0-4h-2V6h2v6z" />
              </g>
            )}
            {type === 'error' && (
              <g>
                <circle cx="12" cy="12" r="11" stroke={color} stroke-width="2" fill={color} />
                <path fill="#FFFFFF" d="M14 3v10h4V3h-4zM14 21v-6h4v6h-4z" />
              </g>
            )}
            {type === 'info' && (
              <g>
                <circle cx="12" cy="12" r="11" stroke={color} stroke-width="2" fill={color} />
                <path fill="#FFFFFF" d="M12 17h-1v-6h2v4h-1zM12 7.5c-.3 0-.5.2-.5.5s.2.5.5.5s.5-.2.5-.5S12.3 7 12 7z" />
              </g>
            )}
          </svg>
        </div>
        <div className="flex text-sm w-56">{message}</div>
      </div>
    </div>
  );
};

export default FlashMessage;
