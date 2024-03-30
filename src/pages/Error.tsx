import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const Error: FC = () => {
  return (
    <div className="text-center">
      <h2>Error</h2>
      <Link to="/register" className="border border-red-600  py-2 px-5">
        Back to home
      </Link>
    </div>
  );
};

export default Error;
