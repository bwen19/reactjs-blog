import { Navigate, useRoutes } from 'react-router-dom';

import MainLayout from '@/layouts/MainLayout';
import LazyLoader from './LazyLoader';
import { AuthGuard, RoleGuard } from './Guards';

// -------------------------------------------------------------------

const Home = LazyLoader(() => import('../pages/Home'));
const About = LazyLoader(() => import('../pages/About'));
const ReadPost = LazyLoader(() => import('../pages/ReadPost'));
const UserProfile = LazyLoader(() => import('../pages/UserProfile'));

const DashboardLayout = LazyLoader(() => import('../layouts/DashboardLayout'));
const Dashboard = LazyLoader(() => import('../pages/DashboardDefault'));
const Notifications = LazyLoader(() => import('../pages/Notifications'));
const AccountSettings = LazyLoader(() => import('../pages/AccountSettings'));
const AuthorPosts = LazyLoader(() => import('../pages/AuthorPosts'));
const NewPost = LazyLoader(() => import('../pages/NewPost'));
const Users = LazyLoader(() => import('../pages/ManageUsers'));
const Posts = LazyLoader(() => import('../pages/ManagePosts'));

const PageNotFound = LazyLoader(() => import('../pages/PageNotFound'));

// ---------------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: '', element: <Home /> },
        { path: 'home', element: <Navigate to="/" /> },
        { path: 'about', element: <About /> },
        { path: 'post/:postId', element: <ReadPost /> },
        { path: 'user/:userId', element: <UserProfile /> },
      ],
    },
    {
      path: 'dashboard',
      element: <AuthGuard element={<DashboardLayout />} />,
      children: [
        { path: 'overview', element: <Dashboard /> },
        { path: '', element: <Navigate to="/dashboard/overview" /> },
        { path: 'notifications', element: <Notifications /> },
        { path: 'account', element: <AccountSettings /> },
        { path: 'content', element: <RoleGuard allow="author" element={<AuthorPosts />} /> },
        { path: 'new-post', element: <RoleGuard allow="author" element={<NewPost />} /> },
        { path: 'users', element: <RoleGuard allow="admin" element={<Users />} /> },
        { path: 'posts', element: <RoleGuard allow="admin" element={<Posts />} /> },
      ],
    },
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
