import React from 'react';
import ReactDOM from 'react-dom';
import '../dist/output.css';
import App from './App';
import { DarkModeProvider } from './context/DarkModeContext';

ReactDOM.render(
  <React.StrictMode>
      <DarkModeProvider>
        <App />
      </DarkModeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
