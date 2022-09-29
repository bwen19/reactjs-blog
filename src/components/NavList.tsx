import { Divider, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { IMenuBase } from '@/api';
import { NavLinkMui } from '@/components';

// ========================// NavItem //======================== //

interface NavItemProps {
  menu: IMenuBase;
}

export function NavItem({ menu }: NavItemProps) {
  const { name, path, Icon } = menu;

  return (
    <ListItemButton component={NavLinkMui} to={path} sx={{ mb: 0.5 }}>
      <ListItemIcon>
        <Icon fontSize="small" />
      </ListItemIcon>
      <ListItemText disableTypography primary={name} />
    </ListItemButton>
  );
}

// ========================// PopperNavItem //======================== //

interface PopperNavItemProps {
  menu: IMenuBase;
  onClick: (event: Event | React.SyntheticEvent) => void;
  divider?: boolean;
  fullWidth?: boolean;
}

export function PopperNavItem(props: PopperNavItemProps) {
  const { menu, onClick, divider, fullWidth } = props;
  const { name, Icon } = menu;

  return (
    <>
      {divider && <Divider sx={{ my: 1 }} />}
      <ListItemButton onClick={onClick} sx={{ ...(fullWidth && { borderRadius: 0 }) }}>
        <ListItemIcon>
          <Icon fontSize="small" />
        </ListItemIcon>
        <ListItemText disableTypography primary={name} />
      </ListItemButton>
    </>
  );
}
