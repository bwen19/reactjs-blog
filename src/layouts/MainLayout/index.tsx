import { Outlet } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';
import MainHeader from './MainHeader';

// -------------------------------------------------------------------

export default function MainLayout() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <MainHeader />
      <Outlet />
      <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto', bgcolor: '#282c34', color: 'background.paper' }}>
        <Container maxWidth="sm">
          <Typography variant="body2" align="center">
            {'Copyright © Eruhini '}
            {new Date().getFullYear()}
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
