import { styled } from '@mui/material/styles';
import { AppBar, Box, Container, Divider, List, Paper, Typography } from '@mui/material';
import { CommentOutlined, SettingsSuggestOutlined, NewReleasesOutlined } from '@mui/icons-material';
import { AccountSection, AppToolbar, NavItem } from '@/components';
import { IMenuBase } from '@/api';

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

interface IMenuConfig extends IMenuBase {
  value: string;
}

const menuConfig: IMenuConfig[] = [
  {
    id: 1,
    name: 'Reply',
    value: '/notifications/reply',
    path: '/notifications/reply',
    Icon: CommentOutlined,
  },
  {
    id: 2,
    name: 'System',
    value: '/notifications/system',
    path: '/notifications/system',
    Icon: NewReleasesOutlined,
  },
  {
    id: 3,
    name: 'Settings',
    value: '/notifications/settings',
    path: '/settings/notification',
    Icon: SettingsSuggestOutlined,
  },
];

// ========================// Notifications //======================== //

export default function Notifications() {
  return (
    <Wrapper>
      <AppBar color="dark">
        <AppToolbar>
          <AccountSection />
        </AppToolbar>
      </AppBar>
      <MainContainer maxWidth="lg">
        <Paper elevation={0} sx={{ display: 'flex', flexGrow: 1 }}>
          <Box sx={{ width: 240 }}>
            <Box sx={{ height: 64, pt: 2 }}>
              <Typography variant="h6" textAlign="center">
                Notifications
              </Typography>
            </Box>
            <Divider />
            <List component="nav" sx={{ p: 2 }}>
              {menuConfig.map((menu) => (
                <NavItem key={menu.id} menu={menu} />
              ))}
            </List>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box sx={{ flexGrow: 1 }}>Notifications</Box>
        </Paper>
      </MainContainer>
    </Wrapper>
  );
}
