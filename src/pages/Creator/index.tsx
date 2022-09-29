import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Box, useMediaQuery, Button, List } from '@mui/material';
import { CottageOutlined, Inventory2Outlined, LibraryBooksOutlined } from '@mui/icons-material';
import { IMenuBase } from '@/api';
import { Header, Sidebar, MainWrapper, NavItem } from '@/components';

// -------------------------------------------------------------------

const menuConfig: IMenuBase[] = [
  { id: 1, name: 'Home', path: '/creator/home', Icon: CottageOutlined },
  { id: 2, name: 'Posts', path: '/creator/posts', Icon: LibraryBooksOutlined },
  { id: 3, name: 'Drafts', path: '/creator/drafts', Icon: Inventory2Outlined },
];

export default function Creator() {
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
      <Header title="Creator Center" onDrawerToggle={handleDrawerToggle} />
      <Sidebar open={open} onDrawerToggle={handleDrawerToggle}>
        <Box sx={{ mx: 2, my: 3 }}>
          <Button variant="contained" fullWidth>
            COMPOSE
          </Button>
        </Box>
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
