import React, { useEffect } from 'react';
import { Box, Zoom, useScrollTrigger } from '@mui/material';

// ========================// ScrollTop //======================== //

interface ScrollTopProps {
  children: React.ReactElement;
}

export function ScrollTop({ children }: ScrollTopProps) {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = ((event.target as HTMLDivElement).ownerDocument || document).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box onClick={handleClick} role="presentation" sx={{ position: 'fixed', bottom: 16, right: 16 }}>
        {children}
      </Box>
    </Zoom>
  );
}

// ========================// ScrollTopOnMount //======================== //

export function ScrollTopOnMount() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}

// ========================// AppBarOnScroll //======================== //

interface AppBarOnScrollProps {
  children: React.ReactElement;
}

export function AppBarOnScroll({ children }: AppBarOnScrollProps) {
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 0 });

  return React.cloneElement(children, {
    elevation: trigger ? 1 : 0,
    color: trigger ? 'dark' : 'transparent',
  });
}
