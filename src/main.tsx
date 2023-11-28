import React from 'react';
import ReactDOM from 'react-dom';

import '@/common/images/Icon-Electron.png';
import App from './App';
import { HoxRoot } from 'hox';
import { ConfigProvider } from 'antd';

// import { BrowserRouter } from 'react-router-dom';
import AppBar from '@/components/AppBar';
import Login from '@/pages/Login';
import './index.scss';

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            itemPaddingInline: 10
          }
        }
      }}
    >
      <HoxRoot>
        <App />
      </HoxRoot>
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
