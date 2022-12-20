import Layout from "../pages/Layout";
import About from "../pages/About";
import Posts from "../pages/Posts";
import PostIdPage from "../pages/PostIdPage";
import Error from "../pages/Error";
import Login from "../pages/Login";

export const privateRoutes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'about',
        element: <About />
      },
      {
        path: 'posts',
        element: <Posts />,
        children: [
          {
            path: ':id',
            element: <PostIdPage />
          }
        ],
      },
      {
        path: '*',
        element: <Error />
      },
    ],
  }
];

export const publicRoutes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'login',
        element: <Login />
      },
    ],
  }
];