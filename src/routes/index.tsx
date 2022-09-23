import { Navigate, useRoutes } from 'react-router-dom';

import { LazyLoad } from '@/components';
import MainRoutes from './MainRoutes';
import SettingsRoutes from './SettingsRoutes';
import CreatorRoutes from './CreatorRoutes';
import DashboardRoutes from './DashboardRoutes';

const PageNotFound = LazyLoad(() => import('../pages/PageNotFound'));

// ========================// Render Routing //======================== //

export default function Routes() {
  return useRoutes([
    MainRoutes,
    SettingsRoutes,
    CreatorRoutes,
    DashboardRoutes,
    {
      path: '404',
      element: <PageNotFound />,
    },
    {
      path: '*',
      element: <Navigate to="/404" />,
    },
  ]);
}
