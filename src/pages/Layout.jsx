import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/UI/navbar/Navbar';
import { AuthContext } from '../context';

const Layout = () => {
  const { isAuth } = useContext(AuthContext);

  return (
    isAuth
      ?
      <div>
        <Navbar />
        <Outlet />
      </div>
      :
      <div>
        <Outlet />
      </div>
  );
};

export default Layout;