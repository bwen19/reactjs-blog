import { styled } from '@mui/material/styles';
import { AppBar, Box, Container, Toolbar, Avatar, ButtonBase } from '@mui/material';
import { MenuOpenOutlined } from '@mui/icons-material';

import LogoButton from '@/components/LogoButton';
import AccountSection from '@/components/AccountSection';

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

interface IProps {
  onDrawerToggle: () => void;
}

export default function DashboardHeader({ onDrawerToggle }: IProps) {
  return (
    <AppBar elevation={0} color="dark" position="fixed">
      <Container maxWidth="xl">
        <Toolbar variant="dense" disableGutters>
          <Box component="span" sx={{ mr: 6, display: { xs: 'none', md: 'flex' } }}>
            <LogoButton />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <ButtonBase onClick={onDrawerToggle} sx={{ borderRadius: '12px' }}>
              <StyledAvatar>
                <MenuOpenOutlined sx={{ fontSize: '1.2rem' }} />
              </StyledAvatar>
            </ButtonBase>
          </Box>
          <Box component="span" sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <LogoButton />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <ButtonBase onClick={onDrawerToggle} sx={{ borderRadius: '12px' }}>
              <StyledAvatar>
                <MenuOpenOutlined sx={{ fontSize: '1.2rem' }} />
              </StyledAvatar>
            </ButtonBase>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <AccountSection />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
