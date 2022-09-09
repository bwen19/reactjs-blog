import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Divider, ListItemButton, ListItemIcon, ListItemText, useMediaQuery } from '@mui/material';
import {
  DashboardOutlined,
  LogoutOutlined,
  NotificationsOutlined,
  PersonOutlined,
  SettingsOutlined,
  SvgIconComponent,
} from '@mui/icons-material';
import { useAppDispatch } from '@/hooks';
import { logoutThunk } from '@/redux/authSlice';

// -------------------------------------------------------------------

interface IMenu {
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

// -------------------------------------------------------------------

interface MenuListItemProps {
  menu: IMenu;
  userId: number;
  isDesktop: boolean;
  onClose: (event: Event | React.SyntheticEvent) => void;
}

function MenuListItem(props: MenuListItemProps) {
  const { menu, userId, isDesktop, onClose } = props;
  const { name, type, path, Icon } = menu;

  const navigate = useNavigate();

  if (isDesktop && menu.type === 'notice') {
    return null;
  }

  const handleListItemClick = (event: Event | React.SyntheticEvent) => {
    const directTo = type === 'profile' ? `${path}/${userId}` : path;
    navigate(directTo);
    onClose(event);
  };

  return (
    <ListItemButton onClick={handleListItemClick} sx={{ mb: 0.5, py: 1, borderRadius: '10px', fontSize: '14px' }}>
      <ListItemIcon>
        <Icon sx={{ fontSize: 18 }} />
      </ListItemIcon>
      <ListItemText disableTypography primary={name} />
    </ListItemButton>
  );
}

// -------------------------------------------------------------------

interface AccountMenuListProps {
  userId: number;
  onClose: (event: Event | React.SyntheticEvent) => void;
}

export default function AccountMenuList({ userId, onClose }: AccountMenuListProps) {
  const dispatch = useAppDispatch();

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const handleLogout = async (event: Event | React.SyntheticEvent) => {
    dispatch(logoutThunk());
    onClose(event);
  };

  return (
    <>
      {menuConfig.map((item) => (
        <MenuListItem key={item.id} menu={item} userId={userId} isDesktop={isDesktop} onClose={onClose} />
      ))}
      <Divider />
      <ListItemButton onClick={handleLogout} sx={{ mt: 1, py: 1, borderRadius: '10px', fontSize: '14px' }}>
        <ListItemIcon>
          <LogoutOutlined sx={{ fontSize: 18 }} />
        </ListItemIcon>
        <ListItemText disableTypography primary="Logout" />
      </ListItemButton>
    </>
  );
}
