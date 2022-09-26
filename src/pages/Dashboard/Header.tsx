import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { AccountSection, CustomIconButton, LogoButton } from '@/components';

// -------------------------------------------------------------------

interface IProps {
  onDrawerToggle: () => void;
}

export default function DashboardHeader({ onDrawerToggle }: IProps) {
  return (
    <AppBar elevation={0} color="dark" position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: 'none', md: 'block' }, mr: 12 }}>
            <LogoButton />
          </Box>
          <CustomIconButton onClick={onDrawerToggle}>
            <Menu sx={{ fontSize: '1.6rem' }} />
          </CustomIconButton>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" color="primary.light" sx={{ ml: 3, display: { xs: 'none', md: 'block' } }}>
              Admin Dashboard
            </Typography>
          </Box>
          <Box component="span" sx={{ flexGrow: 1, display: { xs: 'block', md: 'none' } }}>
            <LogoButton />
          </Box>
          <AccountSection />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
