import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import './index.css';

import AppContext from './context/AppContext';
import Header from './components/Header';
import Error from './pages/Error';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';
import ExploreDapps from './pages/ExploreDapps';
import BlurProfile from './pages/BlurProfile';
import Profile from './pages/Profile';
import Wallet from './pages/Wallet';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        )
      },
      {
        path: '/explore-dapps',
        element: (
          <PrivateRoute>
            <ExploreDapps />
          </PrivateRoute>
        )
      },
      {
        path: '/wallet',
        element: (
          <PrivateRoute>
            <Wallet />
          </PrivateRoute>
        )
      },
      {
        path: '/home',
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        )
      },
      {
        path: '/blur-profile/:id',
        element: (
          <PrivateRoute>
            <BlurProfile />
          </PrivateRoute>
        )
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppContext>
      <RouterProvider router={router} />
    </AppContext>
  </React.StrictMode>
);
