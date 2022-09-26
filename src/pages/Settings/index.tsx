import { Link, Outlet } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import { AppBar, Box, Container, Paper, Tab, useMediaQuery } from '@mui/material';
import { LockOutlined, ManageAccountsOutlined, NotificationsOutlined } from '@mui/icons-material';
import { AccountSection, AppToolbar, CustomTabs, NavList } from '@/components';
import { useRouteMatch } from '@/hooks';
import { IMenuConfig } from '@/api';

// -------------------------------------------------------------------

const Wrapper = styled('div')({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
});

const MainContainer = styled(Container)(({ theme }) => ({
  paddingTop: 80,
  [theme.breakpoints.up('sm')]: {
    paddingTop: 96,
  },
}));

// -------------------------------------------------------------------

const menuConfig: IMenuConfig[] = [
  {
    id: 1,
    name: 'Profile',
    value: '/settings/profile',
    path: '/settings/profile',
    Icon: ManageAccountsOutlined,
  },
  {
    id: 2,
    name: 'Password',
    value: '/settings/password',
    path: '/settings/password',
    Icon: LockOutlined,
  },
  {
    id: 3,
    name: 'Notifications',
    value: '/settings/notifications',
    path: '/settings/notifications',
    Icon: NotificationsOutlined,
  },
];

// ========================// Settings //======================== //

export default function Settings() {
  const routeMatch = useRouteMatch(['/settings/profile', '/settings/password', '/settings/notifications']);
  const currentTab = routeMatch?.pattern?.path;

  const theme = useTheme();
  const shown = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Wrapper>
      <AppBar color="dark">
        <AppToolbar>
          <AccountSection />
        </AppToolbar>
      </AppBar>
      <MainContainer maxWidth="md">
        <Paper elevation={0} sx={{ mb: 2, display: { sm: 'block', md: 'none' } }}>
          <CustomTabs value={currentTab} centered>
            {shown &&
              menuConfig.map(({ id, value, path, Icon }) => (
                <Tab disableRipple component={Link} key={id} value={value} to={path} icon={<Icon />} />
              ))}
          </CustomTabs>
        </Paper>
        <Box sx={{ height: '100%', display: { xs: 'block', md: 'flex' } }}>
          <Paper elevation={0} sx={{ width: 200, px: 2, flexShrink: 0, mr: 2, display: { xs: 'none', md: 'block' } }}>
            <NavList menus={menuConfig} />
          </Paper>
          <Box sx={{ flexGrow: 1 }}>
            <Outlet />
          </Box>
        </Box>
      </MainContainer>
    </Wrapper>
  );
}
