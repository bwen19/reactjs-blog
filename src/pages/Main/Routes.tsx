import { Navigate, RouteObject } from 'react-router-dom';

import { LazyLoad } from '@/components';
import MainPage from '.';

const Home = LazyLoad(() => import('./Home'));
const Blog = LazyLoad(() => import('./Blog'));
const Explore = LazyLoad(() => import('./Explore'));
const Post = LazyLoad(() => import('./Post'));
const User = LazyLoad(() => import('./User'));
const UserPosts = LazyLoad(() => import('./User/Posts'));
const News = LazyLoad(() => import('./User/News'));
const Followers = LazyLoad(() => import('./User/Followers'));
const Followings = LazyLoad(() => import('./User/Followings'));

// ========================// Main Routing //======================== //

const MainRoutes: RouteObject = {
  path: '/',
  element: <MainPage />,
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
