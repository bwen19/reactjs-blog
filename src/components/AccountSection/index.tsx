import { Box } from '@mui/material';
import AccountPopper from './AccountPopper';
import NotificationIcon from './NotificationIcon';

// -------------------------------------------------------------------

export default function AccountSection() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <NotificationIcon />
      <AccountPopper />
    </Box>
  );
}
