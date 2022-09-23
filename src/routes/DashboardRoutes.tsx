import { Navigate, RouteObject } from 'react-router-dom';

import { Permission } from '@/api';
import { AuthGuard, LazyLoad } from '@/components';

const DashboardLayout = LazyLoad(() => import('../pages/Dashboard/Layout'));
const Overview = LazyLoad(() => import('../pages/Dashboard/Overview'));
const Users = LazyLoad(() => import('../pages/Dashboard/Users'));
const Posts = LazyLoad(() => import('../pages/Dashboard/Posts'));

// ========================// Dashboard Routing //======================== //

const DashboardRoutes: RouteObject = {
  path: 'dashboard',
  element: <AuthGuard rank={Permission.ADMIN} element={<DashboardLayout />} />,
  children: [
    { path: '', element: <Navigate to="/dashboard/overview" /> },
    { path: 'overview', element: <Overview /> },
    { path: 'users', element: <Users /> },
    { path: 'posts', element: <Posts /> },
  ],
};

export default DashboardRoutes;
