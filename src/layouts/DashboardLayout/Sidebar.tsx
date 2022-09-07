import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Avatar, Box, Typography, Drawer, useMediaQuery, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { DRAWER_WIDTH, APP_BAR_HEIGHT } from '@/themes/constants';
import { useAppSelector } from '@/hooks';
import { User } from '@/api';
import Scrollbar from '@/components/Scrollbar';
import NavSection from './NavSection';

// -------------------------------------------------------------------

interface IProps {
  open: boolean;
  onDrawerToggle: () => void;
}

export default function DashboardSidebar({ open, onDrawerToggle }: IProps) {
  const { pathname } = useLocation();
  const user = useAppSelector((state) => state.auth.authUser) as User;

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  useEffect(() => {
    if (open && !isDesktop) {
      onDrawerToggle();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const drawerContent = (
    <Scrollbar
      sx={{
        height: isDesktop ? `calc(100vh - ${APP_BAR_HEIGHT}px)` : 'calc(100vh - 16px)',
        '& .simplebar-content': { height: isDesktop ? `calc(100vh - ${APP_BAR_HEIGHT}px)` : 'calc(100vh - 16px)' },
      }}
    >
      <Stack spacing={2} alignItems="center" sx={{ my: 2, mx: 4, py: 2, bgcolor: '#e3f2fd', borderRadius: 2 }}>
        <Avatar alt="User" src={user.avatar} sx={{ width: 56, height: 56, mx: 'auto' }} />
        <Typography>{user.username}</Typography>
      </Stack>
      <NavSection />
    </Scrollbar>
  );

  return (
    <Box
      component="div"
      sx={{ flexShrink: { md: 0 }, width: isDesktop ? DRAWER_WIDTH : 'auto' }}
      aria-label="mailbox folders"
    >
      <Drawer
        variant={isDesktop ? 'persistent' : 'temporary'}
        open={open}
        onClose={onDrawerToggle}
        PaperProps={{
          sx: {
            width: DRAWER_WIDTH,
            borderRight: 'none',
            [theme.breakpoints.up('md')]: { top: `${APP_BAR_HEIGHT}px` },
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}
