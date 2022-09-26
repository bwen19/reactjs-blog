import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, Typography, Stack, Divider, useMediaQuery } from '@mui/material';
import { CookieOutlined, PublishOutlined, SupervisorAccountOutlined } from '@mui/icons-material';
import { IMenuConfig, User } from '@/api';
import { useAppSelector } from '@/hooks';
import { Header, Sidebar, MainWrapper, NavList } from '@/components';

// -------------------------------------------------------------------

const menuConfig: IMenuConfig[] = [
  { id: 1, name: 'Overview', path: '/dashboard/overview', Icon: CookieOutlined },
  { id: 2, name: 'Users', path: '/dashboard/users', Icon: SupervisorAccountOutlined },
  { id: 3, name: 'Posts', path: '/dashboard/posts', Icon: PublishOutlined },
];

// -------------------------------------------------------------------

export default function Dashboard() {
  const user = useAppSelector((state) => state.auth.authUser) as User;

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    setOpen(isDesktop);
  }, [isDesktop]);

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex' }}>
      <Header title="Admin Dashboard" onDrawerToggle={handleDrawerToggle} />
      <Sidebar open={open} onDrawerToggle={handleDrawerToggle}>
        <Stack spacing={2} alignItems="center" sx={{ my: 2, mx: 4, py: 2, bgcolor: '#e3f2fd', borderRadius: 2 }}>
          <Avatar alt="User" src={user.avatar} sx={{ width: 56, height: 56, mx: 'auto' }} />
          <Typography>{user.username}</Typography>
        </Stack>
        <Divider />
        <Box sx={{ px: 2 }}>
          <NavList menus={menuConfig} />
        </Box>
      </Sidebar>
      <MainWrapper open={open}>
        <Outlet />
      </MainWrapper>
    </Box>
  );
}
