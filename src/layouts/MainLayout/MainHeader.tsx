import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';

import { useAppSelector } from '@/hooks';
import AccountSection from '@/components/AccountSection';
import AuthSection from '@/components/AuthSection';
import HideOnScroll from '@/components/HideOnScroll';
import LogoButton from '@/components/LogoButton';
import Menubar from './Menubar';
import MenuPopper from './MenuPopper';

// -------------------------------------------------------------------

export default function MainHeader() {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  return (
    <>
      <HideOnScroll>
        <AppBar elevation={0} color="dark">
          <Container maxWidth="xl">
            <Toolbar variant="dense" disableGutters>
              <Typography variant="h6" noWrap component="div" sx={{ mr: 6, display: { xs: 'none', md: 'flex' } }}>
                <LogoButton />
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <MenuPopper />
              </Box>
              <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <LogoButton />
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                <Menubar />
              </Box>
              <Box sx={{ flexGrow: 0 }}>{isLoggedIn ? <AccountSection /> : <AuthSection />}</Box>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
      <Toolbar id="back-to-top-anchor" />
    </>
  );
}
