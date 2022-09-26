import { useNavigate } from 'react-router-dom';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { IMenuConfig, Permission } from '@/api';
import { NavLinkMui } from '@/components';
import { useAppSelector } from '@/hooks';

// -------------------------------------------------------------------
// NavItem

interface NavItemProps {
  menu: IMenuConfig;
  permission: Permission;
}

function NavItem({ menu, permission }: NavItemProps) {
  const { name, path, Icon, rank } = menu;

  if (rank && permission < rank) {
    return null;
  }

  return (
    <ListItemButton
      component={NavLinkMui}
      to={path}
      sx={{ borderRadius: 2, alignItems: 'center', mb: 0.5, py: 1, pl: 2, fontSize: '14px' }}
    >
      <ListItemIcon>
        <Icon fontSize="small" />
      </ListItemIcon>
      <ListItemText disableTypography primary={name} />
    </ListItemButton>
  );
}

// -------------------------------------------------------------------
// PopperNavItem

interface PopperNavItemProps {
  menu: IMenuConfig;
  permission: Permission;
  onClose: (event: Event | React.SyntheticEvent) => void;
}

function PopperNavItem({ menu, permission, onClose }: PopperNavItemProps) {
  const navigate = useNavigate();

  const { name, path, Icon, rank } = menu;

  if (rank && permission < rank) {
    return null;
  }

  const handleNavigate = (event: Event | React.SyntheticEvent) => {
    navigate(path);
    onClose(event);
  };

  return (
    <ListItemButton
      onClick={handleNavigate}
      sx={{ borderRadius: 2, alignItems: 'center', mb: 0.5, py: 1, pl: 2, fontSize: '14px' }}
    >
      <ListItemIcon>
        <Icon fontSize="small" />
      </ListItemIcon>
      <ListItemText disableTypography primary={name} />
    </ListItemButton>
  );
}

// ========================// NavList //======================== //

interface NavListProps {
  menus: IMenuConfig[];
  onClose?: (event: Event | React.SyntheticEvent) => void;
}

export default function NavList({ menus, onClose }: NavListProps) {
  const { permission } = useAppSelector((state) => state.auth);

  return (
    <List component="nav">
      {onClose
        ? menus.map((menu) => <PopperNavItem key={menu.id} menu={menu} permission={permission} onClose={onClose} />)
        : menus.map((menu) => <NavItem key={menu.id} menu={menu} permission={permission} />)}
    </List>
  );
}
