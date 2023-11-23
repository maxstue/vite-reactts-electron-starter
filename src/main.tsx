import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { HoxRoot } from 'hox';
import { ConfigProvider } from 'antd';

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
