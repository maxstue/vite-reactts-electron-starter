import React from 'react';
import AppBar from './components/AppBar';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Body from './components/Body';

import Login from './pages/Login';
import Home from './pages/Home';
import { globalRouters } from './router';
import { RouterProvider } from 'react-router-dom';


function App() {
  console.log(window.ipcRenderer);

  return (
    <>
      {/* 路由 */}
      {/* <RouterProvider router={globalRouters}></RouterProvider> */}
      <div id="win">
        {/* Bar顶部 */}
        {window.Main && <AppBar />}
        <Header></Header>
        <Sidebar></Sidebar>
      </div>
    </>
  );
}

export default App;
