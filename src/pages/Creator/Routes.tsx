import { Navigate, RouteObject } from 'react-router-dom';

import { Permission } from '@/api';
import { AuthGuard, LazyLoad } from '@/components';

const Creator = LazyLoad(() => import('.'));
const Home = LazyLoad(() => import('./Home'));
const Posts = LazyLoad(() => import('./Posts'));
const Drafts = LazyLoad(() => import('./Drafts'));

// ========================// Creator Routing //======================== //

const CreatorRoutes: RouteObject = {
  path: 'creator',
  element: <AuthGuard rank={Permission.AUTHOR} element={<Creator />} />,
  children: [
    { path: '', element: <Navigate to="/creator/home" /> },
    { path: 'home', element: <Home /> },
    { path: 'posts', element: <Posts /> },
    { path: 'drafts', element: <Drafts /> },
  ],
};

export default CreatorRoutes;
