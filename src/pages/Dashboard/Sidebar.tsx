import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, Typography, Drawer, useMediaQuery, Stack, Divider } from '@mui/material';
import { CookieOutlined, PublishOutlined, SupervisorAccountOutlined } from '@mui/icons-material';

import { DRAWER_WIDTH, APP_BAR_HEIGHT } from '@/themes/constants';
import { IMenuConfig, User } from '@/api';
import { NavList, Scrollbar } from '@/components';
import { useAppSelector } from '@/hooks';

const menuConfig: IMenuConfig[] = [
  { id: 1, name: 'Overview', path: '/dashboard/overview', Icon: CookieOutlined },
  { id: 2, name: 'Users', path: '/dashboard/users', Icon: SupervisorAccountOutlined },
  { id: 3, name: 'Posts', path: '/dashboard/posts', Icon: PublishOutlined },
];

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
          <Divider />
          <Box sx={{ px: 2 }}>
            <NavList menus={menuConfig} />
          </Box>
        </Scrollbar>
      </Drawer>
    </Box>
  );
}
