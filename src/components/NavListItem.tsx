import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { IMenuConfig } from '@/api';
import { NavLinkMui } from '@/components';

interface IProps {
  menu: IMenuConfig;
}

export default function NavListItem({ menu }: IProps) {
  const { name, path, Icon } = menu;
  return (
    <ListItemButton
      component={NavLinkMui}
      to={path}
      sx={{ borderRadius: 2, alignItems: 'flex-start', mb: 0.5, py: 1, pl: 2, fontSize: '14px' }}
    >
      <ListItemIcon>
        <Icon fontSize="small" />
      </ListItemIcon>
      <ListItemText disableTypography primary={name} />
    </ListItemButton>
  );
}
