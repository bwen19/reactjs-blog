import { Link } from 'react-router-dom';
import { Badge, Box } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/NotificationsOutlined';
import CustomIconButton from '../CustomIconButton';
import AccountPopper from './AccountPopper';
import { useAppSelector } from '@/hooks';

// -------------------------------------------------------------------

export default function AccountSection() {
  const unreadCount = useAppSelector((state) => state.auth.unreadCount);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <CustomIconButton component={Link} to="/dashboard/notifications">
        <Badge variant="dot" overlap="circular" color="error" invisible={unreadCount === 0}>
          <NotificationsIcon sx={{ fontSize: '1.4rem' }} />
        </Badge>
      </CustomIconButton>
      <AccountPopper />
    </Box>
  );
}
