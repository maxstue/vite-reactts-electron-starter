import React, { useState, useContext } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { DarkModeProvider, DarkModeContext } from './context/DarkModeContext'; // Import DarkModeProvider
import { AuthProvider } from './context/AuthContext';

import 'typeface-poppins';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import Dashboard from './Dashboard';
import AppBar from './AppBar';
import Employees from './EmployeesList';
import Recruitment from './Recruitment';
import Settings from './Settings';

const App: React.FC = () => {
  console.log(window.ipcRenderer);
  const { darkMode } = useContext(DarkModeContext);
  const [appUsername, setAppUsername] = useState('AdminHR');

  return (
    <DarkModeProvider>
      <AuthProvider>
        <div className="flex flex-col">
          {window.Main && <AppBar />}
          <div className={`flex-auto ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
            <Router>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot" element={<ForgotPassword />} />
                <Route path="/dashboard" element={<Dashboard initialUsername={appUsername} />} />
                <Route path="/recruitment" element={<Recruitment initialUsername={appUsername} />} />
                <Route path="/employee" element={<Employees initialUsername={appUsername} />} />
                <Route
                  path="/settings"
                  element={<Settings initialUsernameProp={appUsername} onUpdateUsername={setAppUsername} />}
                />
              </Routes>
            </Router>
          </div>
        </div>
      </AuthProvider>
    </DarkModeProvider>
  );
};

export default App;
