import React, { useEffect, useState } from 'react';
import AppBar from './AppBar';
import SwitchDarkMode from './SwitchDarkMode';

function App() {
  console.log(window.ipcRenderer);

  const [isOpen, setOpen] = useState(false);
  const [isSent, setSent] = useState(false);
  const [fromMain, setFromMain] = useState<string | null>(null);

  const handleToggle = () => {
    if (isOpen) {
      setOpen(false);
      setSent(false);
    } else {
      setOpen(true);
      setFromMain(null);
    }
  };
  const sendMessageToElectron = () => {
    if (window.Main) {
      window.Main.sendMessage("Hello I'm from React World");
    } else {
      setFromMain('You are in a Browser, so no Electron functions are available');
    }
    setSent(true);
  };

  useEffect(() => {
    window.Main.removeLoading();
  }, []);

  useEffect(() => {
    if (isSent && window.Main)
      window.Main.on('message', (message: string) => {
        setFromMain(message);
      });
  }, [fromMain, isSent]);

  return (
    <div className="flex flex-col">
      {window.Main && (
        <div className="flex-none">
          <AppBar />
        </div>
      )}
      <div className="flex-auto">
        <div className="ml-4 mr-4 mt-4 flex items-center justify-between">
          <SwitchDarkMode />
        </div>
        <div className="flex flex-col justify-center items-center h-full pt-32 space-y-4">
          <h1 className="text-2xl dark:text-gray-200">Vite + React + Typescript + Electron + Tailwind</h1>
          <button
            className="bg-yellow-400 py-2 px-4 rounded focus:outline-none shadow hover:bg-yellow-200 dark:text-black"
            onClick={handleToggle}
          >
            Click Me
          </button>
          {isOpen && (
            <div className="flex flex-col space-y-4 items-center">
              <div className="flex space-x-3">
                <h1 className="text-xl dark:text-gray-50">💝 Welcome 💝, now send a message to the Main 📩📩</h1>
                <button
                  onClick={sendMessageToElectron}
                  className=" bg-green-400 rounded px-4 py-0 focus:outline-none hover:bg-green-300 dark:text-black"
                >
                  Send
                </button>
              </div>
              {isSent && (
                <div>
                  <h4 className="dark:text-green-500 text-green-600">Message sent!!</h4>
                </div>
              )}
              {fromMain && (
                <div>
                  {' '}
                  <h4 className="dark:text-yellow-200 text-yellow-800">{fromMain}</h4>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
