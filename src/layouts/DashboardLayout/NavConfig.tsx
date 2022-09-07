import {
  CookieOutlined,
  NotificationsOutlined,
  ManageAccountsOutlined,
  ArticleOutlined,
  BorderColorOutlined,
  SupervisorAccountOutlined,
  PublishOutlined,
  SvgIconComponent,
} from '@mui/icons-material';
import { UserRole } from '@/api';

// -------------------------------------------------------------------

export interface INavGroup {
  id: number;
  title: string;
  role: UserRole;
  items: INavItem[];
}

export interface INavItem {
  id: number;
  name: string;
  path: string;
  icon: SvgIconComponent;
}

const navConfig: INavGroup[] = [
  {
    id: 1,
    title: 'Dashboard',
    role: 'user',
    items: [
      { id: 1, name: 'Overview', path: '/dashboard/overview', icon: CookieOutlined },
      { id: 2, name: 'Notifications', path: '/dashboard/notifications', icon: NotificationsOutlined },
      { id: 3, name: 'Account Settings', path: '/dashboard/account', icon: ManageAccountsOutlined },
    ],
  },
  {
    id: 2,
    title: 'Author',
    role: 'author',
    items: [
      { id: 1, name: 'Author Posts', path: '/dashboard/content', icon: ArticleOutlined },
      { id: 2, name: 'New Post', path: '/dashboard/new-post', icon: BorderColorOutlined },
    ],
  },
  {
    id: 3,
    title: 'Administration',
    role: 'admin',
    items: [
      { id: 1, name: 'Users', path: '/dashboard/users', icon: SupervisorAccountOutlined },
      { id: 2, name: 'Posts', path: '/dashboard/posts', icon: PublishOutlined },
    ],
  },
];

export default navConfig;
