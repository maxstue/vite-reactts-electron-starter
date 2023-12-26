import React, { useContext } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { DarkModeProvider, DarkModeContext } from './context/DarkModeContext'; // Import DarkModeProvider
import { AuthProvider } from './context/AuthContext';

import 'typeface-poppins';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import Dashboard from './Dashboard';
import AppBar from './AppBar';
import Employees from './EmployeesList';

const App: React.FC = () => {
  console.log(window.ipcRenderer);
  const { darkMode } = useContext(DarkModeContext);

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
                <Route path="/dashboard" element={<Dashboard username="" />} />
                <Route path="/recruitment" element={<Dashboard username="" />} />
                <Route path="/employee" element={<Employees username="" />} />
                <Route path="/account" element={<Dashboard username="" />} />
              </Routes>
            </Router>
          </div>
        </div>
      </AuthProvider>
    </DarkModeProvider>
  );
};

export default App;
