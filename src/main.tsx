import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { HoxRoot } from 'hox';

ReactDOM.render(
  <React.StrictMode>
    <HoxRoot>
      <App />
    </HoxRoot>
  </React.StrictMode>,
  document.getElementById('root')
);
