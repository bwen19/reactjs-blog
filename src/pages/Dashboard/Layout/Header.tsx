import { AppBar, Box, Container, Toolbar } from '@mui/material';
import { FormatIndentDecreaseOutlined, FormatIndentIncreaseOutlined } from '@mui/icons-material';

import { AccountSection, CustomIconButton, LogoButton } from '@/components';

// -------------------------------------------------------------------

interface IProps {
  onDrawerToggle: () => void;
}

export default function DashboardHeader({ onDrawerToggle }: IProps) {
  return (
    <AppBar elevation={0} color="dark" position="fixed">
      <Container maxWidth="xl">
        <Toolbar variant="dense" disableGutters>
          <Box component="span" sx={{ mr: 12, display: { xs: 'none', md: 'flex' } }}>
            <LogoButton />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <CustomIconButton onClick={onDrawerToggle}>
              <FormatIndentIncreaseOutlined sx={{ fontSize: '1.4rem' }} />
            </CustomIconButton>
          </Box>
          <Box component="span" sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <LogoButton />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <CustomIconButton onClick={onDrawerToggle}>
              <FormatIndentDecreaseOutlined sx={{ fontSize: '1.4rem' }} />
            </CustomIconButton>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <AccountSection />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
