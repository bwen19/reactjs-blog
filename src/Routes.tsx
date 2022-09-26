import { useRoutes } from 'react-router-dom';

import MainRoutes from './pages/Main/Routes';
import NotificationsRoutes from './pages/Notifications/Routes';
import SettingsRoutes from './pages/Settings/Routes';
import CreatorRoutes from './pages/Creator/Routes';
import DashboardRoutes from './pages/Dashboard/Routes';
import PageNotFoundRoutes from './pages/PageNotFound/Routes';

// ========================// Render Routing //======================== //

export default function Routes() {
  return useRoutes([
    MainRoutes,
    NotificationsRoutes,
    SettingsRoutes,
    CreatorRoutes,
    DashboardRoutes,
    ...PageNotFoundRoutes,
  ]);
}
