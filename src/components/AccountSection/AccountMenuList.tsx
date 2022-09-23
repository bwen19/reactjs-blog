import { useNavigate } from 'react-router-dom';
import { Divider, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { LogoutOutlined } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { logoutThunk } from '@/redux/authSlice';
import AccountMenuConfig from './AccountMenuConfig';
import { IMenuConfig, Permission } from '@/api';

// -------------------------------------------------------------------

// -------------------------------------------------------------------

interface MenuListItemProps {
  menu: IMenuConfig;
  userId: string;
  permission: Permission;
  onClose: (event: Event | React.SyntheticEvent) => void;
}

function MenuListItem(props: MenuListItemProps) {
  const { menu, userId, permission, onClose } = props;
  const { name, path, Icon, rank } = menu;

  const navigate = useNavigate();

  if (rank && permission < rank) {
    return null;
  }

  const handleListItemClick = (event: Event | React.SyntheticEvent) => {
    const directTo = name === 'Personal Homepage' ? `${path}/${userId}` : path;
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
  onClose: (event: Event | React.SyntheticEvent) => void;
}

export default function AccountMenuList({ onClose }: AccountMenuListProps) {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  const handleLogout = async (event: Event | React.SyntheticEvent) => {
    dispatch(logoutThunk());
    onClose(event);
  };

  return (
    <>
      {AccountMenuConfig.map((item) => (
        <MenuListItem
          key={item.id}
          menu={item}
          userId={auth.authUser!.id}
          permission={auth.permission}
          onClose={onClose}
        />
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
