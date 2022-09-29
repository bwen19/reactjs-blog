import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, List, Typography, useMediaQuery } from '@mui/material';
import { CookieOutlined, LibraryBooksOutlined, SupervisorAccountOutlined, TokenOutlined } from '@mui/icons-material';
import { IMenuBase, User } from '@/api';
import { useAppSelector } from '@/hooks';
import { Header, Sidebar, MainWrapper, NavItem } from '@/components';

// -------------------------------------------------------------------

const menuConfig: IMenuBase[] = [
  { id: 1, name: 'Overview', path: '/dashboard/overview', Icon: CookieOutlined },
  { id: 2, name: 'Users', path: '/dashboard/users', Icon: SupervisorAccountOutlined },
  { id: 3, name: 'Sessions', path: '/dashboard/sessions', Icon: TokenOutlined },
  { id: 4, name: 'Posts', path: '/dashboard/posts', Icon: LibraryBooksOutlined },
];

const InfoWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  margin: 16,
  padding: 16,
  borderRadius: 8,
  backgroundColor: '#f5f5f5',
});
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
        <InfoWrapper>
          <Avatar alt="User" src={user.avatar} sx={{ width: 48, height: 48 }} />
          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle1">{user.username}</Typography>
            <Typography variant="body2" color="text.secondary">
              {user.role}
            </Typography>
          </Box>
        </InfoWrapper>
        <List component="nav" sx={{ px: 2 }}>
          {menuConfig.map((menu) => (
            <NavItem key={menu.id} menu={menu} />
          ))}
        </List>
      </Sidebar>
      <MainWrapper open={open}>
        <Outlet />
      </MainWrapper>
    </Box>
  );
}
