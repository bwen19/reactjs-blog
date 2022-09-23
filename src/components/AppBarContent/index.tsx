import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { Box, Container, InputBase, Link, Stack, Toolbar, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { LogoButton, NavLinkMui } from '@/components';
import MenuPopper, { mainMenuConfig } from './MenuPopper';

// -------------------------------------------------------------------

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
          <MenuPopper />
        </Box>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <LogoButton />
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <Stack direction="row" spacing={2.5}>
            {mainMenuConfig.map((item) => (
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
