import React from 'react';
import Slide from '@mui/material/Slide';
import useScrollTrigger from '@mui/material/useScrollTrigger';

// -------------------------------------------------------------------

interface IProps {
  children: React.ReactElement;
}

export default function HideOnScroll({ children }: IProps) {
  const trigger = useScrollTrigger({ disableHysteresis: true });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}
