import {
  DashboardOutlined,
  NotificationsOutlined,
  PersonOutlined,
  SettingsOutlined,
  SvgIconComponent,
} from '@mui/icons-material';

// -------------------------------------------------------------------

export interface IMenu {
  id: number;
  name: string;
  path: string;
  Icon: SvgIconComponent;
  type?: string;
}

const menuConfig: IMenu[] = [
  { id: 1, name: 'Notifications', path: '/dashboard/notifications', Icon: NotificationsOutlined, type: 'notice' },
  { id: 2, name: 'Personal Profile', path: '/user', Icon: PersonOutlined, type: 'profile' },
  { id: 3, name: 'Account Settings', path: '/dashboard/account', Icon: SettingsOutlined },
  { id: 4, name: 'Dashboard', path: '/dashboard/overview', Icon: DashboardOutlined },
];

export default menuConfig;
