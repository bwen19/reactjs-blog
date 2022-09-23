import { Link, Outlet } from 'react-router-dom';
import { AppBar, Box, Container, Paper, Tab } from '@mui/material';
import {
  LockOutlined,
  ManageAccountsOutlined,
  NotificationsOutlined,
  SecurityOutlined,
  SvgIconComponent,
} from '@mui/icons-material';
import { AccountSection, AppBarContent, CustomTabs, NavListItem } from '@/components';
import { useRouteMatch } from '@/hooks';

interface IMenu {
  id: number;
  name: string;
  value: string;
  path: string;
  Icon: SvgIconComponent;
}

const menuConfig: IMenu[] = [
  { id: 1, name: 'Profile', value: '/settings/profile', path: '/settings/profile', Icon: ManageAccountsOutlined },
  { id: 2, name: 'Password', value: '/settings/password', path: '/settings/password', Icon: LockOutlined },
  { id: 3, name: 'Sessions', value: '/settings/sessions', path: '/settings/sessions', Icon: SecurityOutlined },
  {
    id: 4,
    name: 'Notifications',
    value: '/settings/notifications',
    path: '/settings/notifications',
    Icon: NotificationsOutlined,
  },
];

export default function AccountLayout() {
  const routeMatch = useRouteMatch([
    '/settings/profile',
    '/settings/password',
    '/settings/sessions',
    '/settings/notifications',
  ]);
  const currentTab = routeMatch?.pattern?.path;

  return (
    <>
      <AppBar color="dark">
        <AppBarContent>
          <AccountSection />
        </AppBarContent>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: { xs: 10, sm: 12 } }}>
        <Paper elevation={0} sx={{ mb: 2, display: { sm: 'block', md: 'none' } }}>
          <CustomTabs value={currentTab} centered>
            {menuConfig.map(({ id, value, path, Icon }) => (
              <Tab
                disableRipple
                component={Link}
                key={id}
                // label={name}
                value={value}
                to={path}
                icon={<Icon fontSize="small" />}
                iconPosition="start"
              />
            ))}
          </CustomTabs>
        </Paper>
        <Box sx={{ display: { xs: 'block', md: 'flex' } }}>
          <Paper elevation={0} sx={{ width: 200, px: 1, flexShrink: 0, mr: 2, display: { xs: 'none', md: 'block' } }}>
            {menuConfig.map((menu) => (
              <NavListItem key={menu.id} menu={menu} />
            ))}
          </Paper>
          <Box sx={{ flexGrow: 1 }}>
            <Outlet />
          </Box>
        </Box>
      </Container>
    </>
  );
}
