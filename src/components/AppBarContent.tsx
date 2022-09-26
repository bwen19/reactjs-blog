import React, { useEffect, useRef, useState } from 'react';
import { alpha, styled, useTheme } from '@mui/material/styles';
import { Box, Container, InputBase, Link, Stack, Toolbar, Typography, useMediaQuery } from '@mui/material';
import {
  CottageOutlined,
  LibraryBooksOutlined,
  TravelExploreOutlined,
  MenuRounded,
  Search as SearchIcon,
} from '@mui/icons-material';
import { IMenuConfig } from '@/api';
import { CustomIconButton, LogoButton, MenuPopper, NavLinkMui, NavList } from '@/components';

// -------------------------------------------------------------------

const menuConfig: IMenuConfig[] = [
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

// ========================// PopperMenuIcon //======================== //

function PopperMenuIcon() {
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

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  useEffect(() => {
    if (matches) setOpen(false);
  }, [matches]);

  return (
    <>
      <CustomIconButton ref={anchorRef} onClick={handleToggle}>
        <MenuRounded sx={{ fontSize: '1.6rem' }} />
      </CustomIconButton>
      <MenuPopper anchorRef={anchorRef} open={open} placement="bottom-start" onClose={handleClose}>
        <Box sx={{ minWidth: 150 }}>
          <NavList menus={menuConfig} onClose={handleClose} />
        </Box>
      </MenuPopper>
    </>
  );
}

// ========================// AppBarContent //======================== //

interface IProps {
  children: React.ReactElement;
}

export default function AppBarContent({ children }: IProps) {
  return (
    <Container maxWidth="lg">
      <Toolbar disableGutters>
        <Typography variant="h6" noWrap component="div" sx={{ mr: 6, display: { xs: 'none', md: 'flex' } }}>
          <LogoButton />
        </Typography>

        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <PopperMenuIcon />
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
