import React, { useState, useEffect, useContext } from 'react';
import { DarkModeContext } from '../context/DarkModeContext';

interface FlashMessageProps {
  type: 'success' | 'warning' | 'error' | 'info';
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
      className={`fixed z-10 bottom-16 right-10 min-w-2xl w-96 px-6 py-4 rounded flex items-center duration-100 border-4 ${
        !darkMode ? 'bg-white border-gray-800 text-gray-800' : 'bg-[#253D78] text-white'
      } shadow-lg`}
      style={{
        opacity: isVisible ? 1 : 0
      }}
    >
      <div className="flex gap-4 items-center justify-between">
        <div className="flex">
          {type === 'success' && (
            <div className={`px-4 py-2 rounded-lg bg-success w-fit`}>
              <p className={`text-bold text-white`}>[SUCCESS]</p>
            </div>
          )}
          {type === 'warning' && (
            <div className={`px-4 py-2 rounded-lg bg-warning w-fit`}>
              <p className={`text-bold text-white`}>[WARNING]</p>
            </div>
          )}
          {type === 'error' && (
            <div className={`px-4 py-2 rounded-lg bg-error w-fit`}>
              <p className={`text-bold text-white`}>[ERROR]</p>
            </div>
          )}
          {type === 'info' && (
            <div className={`px-4 py-2 rounded-lg bg-info w-fit`}>
              <p className={`text-bold text-white`}>[INFO]</p>
            </div>
          )}
        </div>
        <div className="flex text-sm font-bold">{message}</div>
      </div>
    </div>
  );
};

export default FlashMessage;
