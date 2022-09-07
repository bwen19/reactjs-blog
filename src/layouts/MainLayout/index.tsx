import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

import MainHeader from './MainHeader';
import MainFooter from './MainFooter';

// -------------------------------------------------------------------

export default function MainLayout() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <MainHeader />
      <Outlet />
      <MainFooter />
    </Box>
  );
}
