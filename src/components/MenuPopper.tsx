import React from 'react';
import { ClickAwayListener, Grow, Paper, Popper, PopperPlacementType } from '@mui/material';
import { placement2transform } from '@/utils';

// ========================// MenuPopper //======================== //

interface IProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  placement: PopperPlacementType;
  onClose: (event: Event | React.SyntheticEvent) => void;
  children: React.ReactElement;
}

export default function MenuPopper(props: IProps) {
  const { anchorEl, open, placement: pm, children, onClose } = props;

  return (
    <Popper
      placement={pm}
      open={open}
      anchorEl={anchorEl}
      transition
      disablePortal
      popperOptions={{
        modifiers: [{ name: 'offset', options: { offset: [0, 16] } }],
      }}
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin: placement2transform(placement),
          }}
        >
          <Paper elevation={24} sx={{ borderRadius: 2 }}>
            <ClickAwayListener onClickAway={onClose}>{children}</ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
}
