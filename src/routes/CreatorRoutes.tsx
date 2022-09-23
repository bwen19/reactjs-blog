import { Navigate, RouteObject } from 'react-router-dom';

import { Permission } from '@/api';
import { AuthGuard, LazyLoad } from '@/components';

const CreatorLayout = LazyLoad(() => import('../pages/Creator/Layout'));
const Home = LazyLoad(() => import('../pages/Creator/Home'));
const Posts = LazyLoad(() => import('../pages/Creator/Posts'));

// ========================// Creator Routing //======================== //

const CreatorRoutes: RouteObject = {
  path: 'creator',
  element: <AuthGuard rank={Permission.AUTHOR} element={<CreatorLayout />} />,
  children: [
    { path: '', element: <Navigate to="/creator/home" /> },
    { path: 'home', element: <Home /> },
    { path: 'posts', element: <Posts /> },
  ],
};

export default CreatorRoutes;
