import React from 'react';
import AppBar from './AppBar';
import Header from './components/Header/Index';
import Sidebar from './components/Sidebar/Index';
import Body from './components/Body/Index';

function App() {
  console.log(window.ipcRenderer);

  return (
    <>
      <div id="win">
        {/* Bar顶部 */}
        {window.Main && <AppBar />}
        {/* 头部 */}
        <Header></Header>
        {/* 侧边栏 */}
        <div style={{ width: '300px', backgroundColor: '#fff' }}>
          <Sidebar></Sidebar>
        </div>

        {/* 内容 */}
        <Body></Body>
      </div>
    </>
  );
}

export default App;
