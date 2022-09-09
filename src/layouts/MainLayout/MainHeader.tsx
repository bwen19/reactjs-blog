import { AppBar, Box, Button, Container, Link, Stack, Toolbar, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { showAuthDialog } from '@/redux/authSlice';
import { AccountSection, HideOnScroll, LogoButton, NavLinkMui } from '@/components';
import MenuPopper, { mainMenuConfig } from './MenuPopper';

// -------------------------------------------------------------------

export default function MainHeader() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  const signIn = () => dispatch(showAuthDialog(true));
  const signUp = () => dispatch(showAuthDialog(false));

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
                <Stack direction="row" spacing={2.5}>
                  {mainMenuConfig.map((item) => (
                    <Link key={item.id} component={NavLinkMui} to={item.path} sx={{ color: 'grey.300' }}>
                      {item.name}
                    </Link>
                  ))}
                </Stack>
              </Box>
              <Box sx={{ flexGrow: 0 }}>
                {isLoggedIn ? (
                  <AccountSection />
                ) : (
                  <Stack spacing={1} direction="row">
                    <Button color="neutral" size="small" variant="text" onClick={signIn}>
                      Sign in
                    </Button>
                    <Button color="neutral" size="small" variant="outlined" onClick={signUp}>
                      Sign up
                    </Button>
                  </Stack>
                )}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
      <Toolbar id="back-to-top-anchor" />
    </>
  );
}
