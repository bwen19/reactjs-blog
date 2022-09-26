import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import { AppBar, Box, Container, Drawer, Toolbar, Typography, useMediaQuery } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { DRAWER_WIDTH, APP_BAR_HEIGHT } from '@/themes/constants';
import { AccountSection, CustomIconButton, LogoButton, SimpleScrollbar } from '@/components';

// ========================// Header //======================== //

interface HeaderProps {
  title: string;
  onDrawerToggle: () => void;
}

export function Header({ title, onDrawerToggle }: HeaderProps) {
  return (
    <AppBar elevation={0} color="dark" position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: 'none', md: 'block' }, mr: 12 }}>
            <LogoButton />
          </Box>
          <CustomIconButton onClick={onDrawerToggle}>
            <Menu sx={{ fontSize: '1.6rem' }} />
          </CustomIconButton>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" color="primary.light" sx={{ ml: 3, display: { xs: 'none', md: 'block' } }}>
              {title}
            </Typography>
          </Box>
          <Box component="span" sx={{ flexGrow: 1, display: { xs: 'block', md: 'none' } }}>
            <LogoButton />
          </Box>
          <AccountSection />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

// ========================// Sidebar //======================== //

interface SidebarProps {
  open: boolean;
  children: React.ReactNode;
  onDrawerToggle: () => void;
}

export function Sidebar({ open, children, onDrawerToggle }: SidebarProps) {
  const { pathname } = useLocation();

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
        <SimpleScrollbar
          sx={{
            height: isDesktop ? `calc(100vh - ${APP_BAR_HEIGHT}px)` : 'calc(100vh - 16px)',
            '& .simplebar-content': { height: isDesktop ? `calc(100vh - ${APP_BAR_HEIGHT}px)` : 'calc(100vh - 16px)' },
          }}
        >
          {children}
        </SimpleScrollbar>
      </Drawer>
    </Box>
  );
}

// ========================// MainWrapper //======================== //

interface MainProps {
  open: boolean;
}

export const MainWrapper = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<MainProps>(
  ({ theme, open }) => ({
    flexGrow: 1,
    overflow: 'auto',
    minHeight: '100%',
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(4),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    ...(!open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      [theme.breakpoints.up('md')]: {
        marginLeft: -DRAWER_WIDTH,
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
      },
    }),
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }),
);
