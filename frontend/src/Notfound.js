import React from 'react';
import {Link} from "react-router-dom";

const Notfound = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-6xl font-semibold mb-6">404</h1>
        <p className="text-xl font-medium mb-6">Page Not Found</p>
        <p className="text-gray-500">The page you are looking for does not exist. <Link to="/">Click here</Link> to go back to Home </p>
      </div>
    </div>
  );
};

export default Notfound;
