import React, { useEffect, useRef, useState } from 'react';
import {
  Avatar,
  Box,
  ClickAwayListener,
  Divider,
  Grow,
  IconButton,
  List,
  Paper,
  Popper,
  Typography,
} from '@mui/material';

import { User } from '@/api';
import { useAppSelector } from '@/hooks';
import MenuListItem from './MenuListItem';
import LogoutListItem from './LogoutListItem';
import menuConfig from './AccountMenuConfig';

// -------------------------------------------------------------------

export default function AccountPopper() {
  const authUser = useAppSelector((state) => state.auth.authUser) as User;
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

  return (
    <>
      <IconButton ref={anchorRef} onClick={handleToggle}>
        <Avatar alt="User" src={authUser.avatar} sx={{ width: 30, height: 30 }} />
      </IconButton>
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        transition
        disablePortal
        popperOptions={{ modifiers: [{ name: 'offset', options: { offset: [0, 10] } }] }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom-end' ? 'right top' : 'right bottom',
            }}
          >
            <Paper elevation={24} sx={{ borderRadius: '10px' }}>
              <ClickAwayListener onClickAway={handleClose}>
                <Box>
                  <Box sx={{ pt: 1.5, pb: 1, px: 2.5, display: 'flex' }}>
                    <Typography variant="body2" sx={{ color: 'text.disabled' }}>
                      Signed in as&ensp;
                    </Typography>
                    <Typography variant="subtitle2" noWrap>
                      {authUser.username}
                    </Typography>
                  </Box>
                  <Divider />
                  <List component="nav" sx={{ minWidth: 200, width: '100%', px: 1 }}>
                    {menuConfig.map((item) => (
                      <MenuListItem key={item.id} menu={item} userId={authUser.id} onClose={handleClose} />
                    ))}
                    <Divider />
                    <LogoutListItem onClose={handleClose} />
                  </List>
                </Box>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}
