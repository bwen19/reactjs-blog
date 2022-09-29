import { Navigate, RouteObject } from 'react-router-dom';

import { Permission } from '@/api';
import { AuthGuard, LazyLoad } from '@/components';

const Dashboard = LazyLoad(() => import('.'));
const Overview = LazyLoad(() => import('./Overview'));
const Users = LazyLoad(() => import('./Users'));
const Posts = LazyLoad(() => import('./Posts'));
const Sessions = LazyLoad(() => import('./Sessions'));

// ========================// Dashboard Routing //======================== //

const DashboardRoutes: RouteObject = {
  path: 'dashboard',
  element: <AuthGuard rank={Permission.ADMIN} element={<Dashboard />} />,
  children: [
    { path: '', element: <Navigate to="/dashboard/overview" /> },
    { path: 'overview', element: <Overview /> },
    { path: 'users', element: <Users /> },
    { path: 'posts', element: <Posts /> },
    { path: 'sessions', element: <Sessions /> },
  ],
};

export default DashboardRoutes;
