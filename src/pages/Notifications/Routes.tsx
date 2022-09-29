import { RouteObject } from 'react-router-dom';
import { Permission } from '@/api';
import { AuthGuard, LazyLoad } from '@/components';

const Notifications = LazyLoad(() => import('.'));

// ========================// Notifications Routing //======================== //

const NotificationsRoutes: RouteObject = {
  path: 'notifications',
  element: <AuthGuard rank={Permission.USER} element={<Notifications />} />,
};

export default NotificationsRoutes;
