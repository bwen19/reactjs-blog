import { Navigate, RouteObject } from 'react-router-dom';
import { LazyLoad } from '@/components';

const PageNotFound = LazyLoad(() => import('.'));

// ========================// PageNotFound Routing //======================== //

const PageNotFoundRoutes: RouteObject[] = [
  {
    path: '404',
    element: <PageNotFound />,
  },
  {
    path: '*',
    element: <Navigate to="/404" />,
  },
];

export default PageNotFoundRoutes;
