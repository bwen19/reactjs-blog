import React from 'react';
import useScrollTrigger from '@mui/material/useScrollTrigger';

// -------------------------------------------------------------------

interface IProps {
  children: React.ReactElement;
}

export default function AppBarOnScroll({ children }: IProps) {
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 0 });

  return React.cloneElement(children, {
    elevation: trigger ? 1 : 0,
    color: trigger ? 'dark' : 'transparent',
  });
}
