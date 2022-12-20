import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import Error from '../pages/Error';
import Layout from '../pages/Layout';
import Posts from '../pages/Posts';
import About from '../pages/About'
import PostIdPage from '../pages/PostIdPage';
import Login from '../pages/Login';
import { AuthContext } from '../context';
import Loader from './UI/loader/Loader';

const AppRouter = () => {
  const { isAuth, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <Loader />
  }

  return (
    isAuth 
      ?
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/about' element={<About />} />
          <Route path='/posts' element={<Posts />} />
          <Route path='/posts/:id' element={<PostIdPage />} />
          <Route path='*' element={<Login />} />
        </Route>
      </Routes> 
      :
      <Routes>
        <Route path='/' element={<Login />}>
          <Route path='*' element={<Login />} />
        </Route>
      </Routes>
  );
};

export default AppRouter;