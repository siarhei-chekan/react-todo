import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context';
import MyButton from '../button/MyButton';

const Navbar = () => {
  const {setIsAuth} = useContext(AuthContext);
  const navigate = useNavigate();

  const logOut = () => {
    setIsAuth(false);
    localStorage.removeItem('auth');
    navigate('/login');
  };

  return (
    <div className='navbar'>
      <MyButton onClick={logOut}>Logout</MyButton>
      <div className='navbar__links'>
        <Link to='about'>About Pages</Link>
        <Link to='posts'>Posts</Link>
      </div>      
    </div>
  );
};

export default Navbar;