import { Navigate, RouteObject } from 'react-router-dom';
import { Permission } from '@/api';
import { AuthGuard, LazyLoad } from '@/components';

const Settings = LazyLoad(() => import('.'));
const Profile = LazyLoad(() => import('./Profile'));
const Password = LazyLoad(() => import('./Password'));
const Notification = LazyLoad(() => import('./Notification'));

// ========================// Settings Routing //======================== //

const SettingsRoutes: RouteObject = {
  path: 'settings',
  element: <AuthGuard rank={Permission.USER} element={<Settings />} />,
  children: [
    { path: '', element: <Navigate to="/account/profile" /> },
    { path: 'profile', element: <Profile /> },
    { path: 'password', element: <Password /> },
    { path: 'notification', element: <Notification /> },
  ],
};

export default SettingsRoutes;
