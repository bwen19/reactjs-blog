import { Navigate, RouteObject } from 'react-router-dom';
import { Permission } from '@/api';
import { AuthGuard, LazyLoad } from '@/components';

const SettingsLayout = LazyLoad(() => import('../pages/Settings/Layout'));
const Profile = LazyLoad(() => import('../pages/Settings/Profile'));
const Password = LazyLoad(() => import('../pages/Settings/Password'));
const Sessions = LazyLoad(() => import('../pages/Settings/Sessions'));
const Notifications = LazyLoad(() => import('../pages/Settings/Notifications'));

// ========================// Settings Routing //======================== //

const SettingsRoutes: RouteObject = {
  path: 'settings',
  element: <AuthGuard rank={Permission.USER} element={<SettingsLayout />} />,
  children: [
    { path: '', element: <Navigate to="/account/profile" /> },
    { path: 'profile', element: <Profile /> },
    { path: 'password', element: <Password /> },
    { path: 'sessions', element: <Sessions /> },
    { path: 'notifications', element: <Notifications /> },
  ],
};

export default SettingsRoutes;
