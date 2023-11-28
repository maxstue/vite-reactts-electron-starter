import React from 'react';
import AppBar from './components/AppBar';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Body from './components/Body';

import Login from './pages/Login';
import Home from './pages/Home';


function App() {
  console.log(window.ipcRenderer);

  return (
    <>
      {/* <Home></Home>
      <Login></Login> */}
      <AppBar></AppBar>
      <Body></Body>
    </>
  );

  return (
    <>
      {/* 路由 */}
      {/* <RouterProvider router={globalRouters}></RouterProvider> */}
      <div id="win">
        {/* Bar顶部 */}
        {window.Main && <AppBar />}
        <Header></Header>
        {/* <Login></Login> */}
      </div>
    </>
  );
}

export default App;
