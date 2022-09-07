import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { ListItemButton, ListItemIcon, ListItemText, useMediaQuery } from '@mui/material';
import { IMenu } from './AccountMenuConfig';

// -------------------------------------------------------------------

interface IProps {
  menu: IMenu;
  userId: number;
  onClose: (event: Event | React.SyntheticEvent) => void;
}

export default function MenuListItem({ menu, userId, onClose }: IProps) {
  const { name, type, path, Icon } = menu;

  const navigate = useNavigate();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

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
