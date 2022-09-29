import { Link, Outlet } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import { AppBar, Box, Container, List, Paper, Tab, useMediaQuery } from '@mui/material';
import { LockOutlined, ManageAccountsOutlined, EditNotificationsOutlined } from '@mui/icons-material';
import { useRouteMatch } from '@/hooks';
import { IMenuBase } from '@/api';
import { AccountSection, AppToolbar, CustomTabs, NavItem } from '@/components';

// -------------------------------------------------------------------

const Wrapper = styled('div')({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
});

const MainContainer = styled(Container)(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  paddingTop: 80,
  paddingBottom: 32,
  [theme.breakpoints.up('sm')]: {
    paddingTop: 96,
  },
}));

const Sidebar = styled('div')(({ theme }) => ({
  flexShrink: 0,
  width: 200,
  padding: 16,
  marginRight: 16,
  display: 'block',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

interface IMenuConfig extends IMenuBase {
  value: string;
}

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
    name: 'Notification',
    value: '/settings/notification',
    path: '/settings/notification',
    Icon: EditNotificationsOutlined,
  },
];

// ========================// Settings //======================== //

export default function Settings() {
  const routeMatch = useRouteMatch(['/settings/profile', '/settings/password', '/settings/notification']);
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
        <Box sx={{ display: 'flex', flexGrow: 1 }}>
          <Sidebar>
            <List>
              {menuConfig.map((menu) => (
                <NavItem key={menu.id} menu={menu} />
              ))}
            </List>
          </Sidebar>
          <Paper elevation={0} sx={{ flexGrow: 1, p: 2 }}>
            <Outlet />
          </Paper>
        </Box>
      </MainContainer>
    </Wrapper>
  );
}
