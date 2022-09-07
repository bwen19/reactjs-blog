import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Avatar, Badge, ButtonBase } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/NotificationsOutlined';

// -------------------------------------------------------------------

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  borderRadius: '8px',
  width: '24px',
  height: '24px',
  transition: 'all .2s ease-in-out',
  background: theme.palette.dark.main,
  color: theme.palette.grey[400],
  '&:hover': {
    background: theme.palette.grey[300],
    color: theme.palette.primary.dark,
  },
}));

// -------------------------------------------------------------------

export default function NotificationIcon() {
  return (
    <ButtonBase
      component={Link}
      to="/dashboard/notifications"
      sx={{ borderRadius: '12px', mr: 1, display: { xs: 'none', md: 'block' } }}
    >
      <StyledAvatar>
        <Badge variant="dot" overlap="circular" color="error" invisible={false}>
          <NotificationsIcon sx={{ fontSize: '1.2rem' }} />
        </Badge>
      </StyledAvatar>
    </ButtonBase>
  );
}
