import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { alpha, styled } from '@mui/material/styles';
import { Box, Container, InputBase, Link, List, Stack, Toolbar, Typography } from '@mui/material';
import {
  CottageOutlined,
  LibraryBooksOutlined,
  TravelExploreOutlined,
  MenuRounded,
  Search as SearchIcon,
} from '@mui/icons-material';
import { IMenuBase } from '@/api';
import { CustomIconButton, LogoButton, MenuPopper, NavLinkMui, PopperNavItem } from '@/components';

// -------------------------------------------------------------------

const menuConfig: IMenuBase[] = [
  { id: 1, name: 'Home', path: '/', Icon: CottageOutlined },
  { id: 2, name: 'Blog', path: '/blog', Icon: LibraryBooksOutlined },
  { id: 3, name: 'Explore', path: '/explore', Icon: TravelExploreOutlined },
];

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.grey[300],
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: 20,
  width: 'auto',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '12ch',
    '&:focus': {
      width: '20ch',
    },
  },
}));

// -------------------------------------------------------------------
// MenuSection

function MenuSection() {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    setOpen(false);
  };

  const handleClick = (path: string) => (event: Event | React.SyntheticEvent) => {
    navigate(path);
    handleClose(event);
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <CustomIconButton ref={anchorRef} onClick={handleToggle}>
        <MenuRounded sx={{ fontSize: '1.6rem' }} />
      </CustomIconButton>
      <MenuPopper anchorEl={anchorRef.current} open={open} placement="bottom-start" onClose={handleClose}>
        <List component="nav" sx={{ minWidth: 150 }}>
          {menuConfig.map((menu) => (
            <PopperNavItem key={menu.id} menu={menu} onClick={handleClick(menu.path)} fullWidth />
          ))}
        </List>
      </MenuPopper>
    </>
  );
}

// ========================// AppToolbar //======================== //

interface IProps {
  children: React.ReactElement;
}

export default function AppToolbar({ children }: IProps) {
  return (
    <Container maxWidth="xl">
      <Toolbar disableGutters>
        <Typography variant="h6" noWrap component="div" sx={{ mr: 6, display: { xs: 'none', md: 'flex' } }}>
          <LogoButton />
        </Typography>

        <Box sx={{ flexGrow: 1, display: { xs: 'block', md: 'none' } }}>
          <MenuSection />
        </Box>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <LogoButton />
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <Stack direction="row" spacing={2.5}>
            {menuConfig.map((item) => (
              <Link key={item.id} component={NavLinkMui} variant="subtitle1" to={item.path} sx={{ color: 'grey.100' }}>
                {item.name}
              </Link>
            ))}
          </Stack>
        </Box>
        <Search sx={{ display: { xs: 'none', md: 'flex' } }}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
        </Search>
        <Box sx={{ flexGrow: 0 }}>{children}</Box>
      </Toolbar>
    </Container>
  );
}
