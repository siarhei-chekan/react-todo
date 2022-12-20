import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import MyButton from '../components/UI/button/MyButton';
import MyInput from '../components/UI/input/MyInput';
import { AuthContext } from '../context';

const Login = () => {
  const { setIsAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const login = event => {
    event.preventDefault();
    setIsAuth(true);
    localStorage.setItem('auth', 'true');
    navigate('/');
  };

  return (
    <div>
      <h1>Login please</h1>
      <form onSubmit={login}>
        <MyInput type="text" placeholder='Enter your login' />
        <MyInput type="password" inputMode="numeric" placeholder="Enter your password" />
        <MyButton>Enter</MyButton>
      </form>
    </div>
  );
};

export default Login;