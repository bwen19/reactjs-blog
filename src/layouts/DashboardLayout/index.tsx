import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

import { DRAWER_WIDTH } from '@/themes/constants';
import Header from './Header';
import Sidebar from './Sidebar';

// -------------------------------------------------------------------

interface MainProps {
  open: boolean;
}

const StyledMain = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<MainProps>(({ theme, open }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: theme.spacing(9),
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
}));

// -------------------------------------------------------------------

export default function DashboardLayout() {
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
      <Header onDrawerToggle={handleDrawerToggle} />
      <Sidebar open={open} onDrawerToggle={handleDrawerToggle} />
      <StyledMain open={open}>
        <Outlet />
      </StyledMain>
    </Box>
  );
}
