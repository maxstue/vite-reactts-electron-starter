import React from 'react';
import AppBar from './AppBar';
import { Header } from 'antd/es/layout/layout';

function App() {
  console.log(window.ipcRenderer);

  return (
    <>
      {/* Bar顶部 */}
      {window.Main && (
        <div className="flex-none">
          <AppBar />
        </div>
      )}
      {/* 头部 */}
      <Header></Header>
    </>
  );
}

export default App;
