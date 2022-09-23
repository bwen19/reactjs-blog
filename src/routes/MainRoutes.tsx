import { Navigate, RouteObject } from 'react-router-dom';

import { LazyLoad } from '@/components';
import MainLayout from '@/pages/Main/Layout';

const Home = LazyLoad(() => import('../pages/Main/Home'));
const Blog = LazyLoad(() => import('../pages/Main/Blog'));
const Explore = LazyLoad(() => import('../pages/Main/Explore'));
const Post = LazyLoad(() => import('../pages/Main/Post'));
const User = LazyLoad(() => import('../pages/Main/User'));
const UserPosts = LazyLoad(() => import('../pages/Main/User/Posts'));
const News = LazyLoad(() => import('../pages/Main/User/News'));
const Followers = LazyLoad(() => import('../pages/Main/User/Followers'));
const Followings = LazyLoad(() => import('../pages/Main/User/Followings'));

// ========================// Main Routing //======================== //

const MainRoutes: RouteObject = {
  path: '/',
  element: <MainLayout />,
  children: [
    { path: '', element: <Home /> },
    { path: 'home', element: <Navigate to="/" /> },
    { path: 'blog', element: <Blog /> },
    { path: 'explore', element: <Explore /> },
    { path: 'post/:postId', element: <Post /> },
    {
      path: 'user/:userId',
      element: <User />,
      children: [
        { path: '', element: <UserPosts /> },
        { path: 'news', element: <News /> },
        { path: 'followers', element: <Followers /> },
        { path: 'followings', element: <Followings /> },
      ],
    },
  ],
};

export default MainRoutes;
