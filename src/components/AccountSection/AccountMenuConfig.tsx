import {
  AdminPanelSettingsOutlined,
  EmojiObjectsOutlined,
  NotificationsOutlined,
  PersonOutlined,
  SettingsOutlined,
} from '@mui/icons-material';
import { IMenuConfig, Permission } from '@/api';

// ========================// AccountMenuConfig //======================== //

const AccountMenuConfig: IMenuConfig[] = [
  {
    id: 1,
    name: 'Personal Homepage',
    path: '/user',
    Icon: PersonOutlined,
    rank: Permission.USER,
  },
  {
    id: 2,
    name: 'Notifications',
    path: '/settings/notifications',
    Icon: NotificationsOutlined,
    rank: Permission.USER,
    shown: true,
  },
  {
    id: 3,
    name: 'Account Settings',
    path: '/settings/profile',
    Icon: SettingsOutlined,
    rank: Permission.USER,
  },
  {
    id: 4,
    name: 'Creation Center',
    path: '/creator',
    Icon: EmojiObjectsOutlined,
    rank: Permission.AUTHOR,
    shown: true,
  },
  {
    id: 5,
    name: 'Dashboard',
    path: '/dashboard/overview',
    Icon: AdminPanelSettingsOutlined,
    rank: Permission.ADMIN,
    shown: true,
  },
];

export default AccountMenuConfig;
