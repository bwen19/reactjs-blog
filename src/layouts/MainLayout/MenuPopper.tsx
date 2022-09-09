import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ClickAwayListener,
  Grow,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
} from '@mui/material';
import { CottageOutlined, InfoOutlined, MenuRounded } from '@mui/icons-material';
import { CustomIconButton } from '@/components';

// -------------------------------------------------------------------

export interface MenuItem {
  id: number;
  name: string;
  path: string;
  icon: JSX.Element;
}

export const mainMenuConfig: MenuItem[] = [
  { id: 1, name: 'Home', path: '/', icon: <CottageOutlined sx={{ fontSize: 18 }} /> },
  { id: 2, name: 'About', path: '/about', icon: <InfoOutlined sx={{ fontSize: 18 }} /> },
];
// -------------------------------------------------------------------

export default function MenuPopper() {
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

  const handleListItemClick = (path: string) => (event: Event | React.SyntheticEvent) => {
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
        <MenuRounded sx={{ fontSize: '1.4rem' }} />
      </CustomIconButton>
      <Popper
        placement="bottom-start"
        open={open}
        anchorEl={anchorRef.current}
        transition
        disablePortal
        popperOptions={{ modifiers: [{ name: 'offset', options: { offset: [0, 18] } }] }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom',
            }}
          >
            <Paper elevation={24} sx={{ borderRadius: '8px' }}>
              <ClickAwayListener onClickAway={handleClose}>
                <List component="nav" sx={{ minWidth: 160, width: '100%', px: 1 }}>
                  {mainMenuConfig.map((item) => (
                    <ListItemButton
                      key={item.id}
                      onClick={handleListItemClick(item.path)}
                      sx={{ mb: 0.5, py: 1, borderRadius: '10px', fontSize: '14px' }}
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText disableTypography primary={item.name} />
                    </ListItemButton>
                  ))}
                </List>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}
