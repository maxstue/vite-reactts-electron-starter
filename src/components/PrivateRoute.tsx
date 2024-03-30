import React, { useContext, ReactNode } from 'react';
import { Context } from '../context/AppContext';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { username } = useContext(Context);
  if (username === '') {
    return <Navigate to="/login" />;
  } else {
    return <>{children}</>;
  }
};

export default PrivateRoute;