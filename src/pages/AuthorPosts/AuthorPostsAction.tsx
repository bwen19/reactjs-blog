import React, { useEffect, useRef, useState } from 'react';
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  Box,
  List,
  ListItemButton,
} from '@mui/material';
import { MoreVertOutlined, EditOutlined, DeleteForeverOutlined, PreviewOutlined } from '@mui/icons-material';

// -------------------------------------------------------------------

interface IProps {
  id: number;
  onActionClick: (id: number, actionType: string) => void;
}

export default function AuthorPostsAction({ id, onActionClick }: IProps) {
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

  const handleClick = (actionType: string) => (event: React.MouseEvent) => {
    onActionClick(id, actionType);
    handleClose(event);
  };

  return (
    <>
      <IconButton ref={anchorRef} onClick={handleToggle}>
        <MoreVertOutlined fontSize="small" />
      </IconButton>

      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        transition
        popperOptions={{ modifiers: [{ name: 'offset', options: { offset: [0, 10] } }] }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom-end' ? 'left top' : 'right bottom',
            }}
          >
            <Paper elevation={24} sx={{ borderRadius: '10px' }}>
              <ClickAwayListener onClickAway={handleClose}>
                <Box>
                  <List component="nav" sx={{ minWidth: 120, width: '100%' }}>
                    <ListItemButton onClick={handleClick('preview')} sx={{ py: 0.25, fontSize: '14px' }}>
                      <ListItemIcon>
                        <PreviewOutlined sx={{ fontSize: 18 }} />
                      </ListItemIcon>
                      <ListItemText disableTypography primary="Preview" />
                    </ListItemButton>

                    <ListItemButton onClick={handleClick('edit')} sx={{ py: 0.25, fontSize: '14px' }}>
                      <ListItemIcon>
                        <EditOutlined sx={{ fontSize: 18 }} />
                      </ListItemIcon>
                      <ListItemText disableTypography primary="Edit" />
                    </ListItemButton>

                    <ListItemButton onClick={handleClick('delete')} sx={{ py: 0.25, fontSize: '14px' }}>
                      <ListItemIcon>
                        <DeleteForeverOutlined sx={{ fontSize: 18 }} />
                      </ListItemIcon>
                      <ListItemText disableTypography primary="Delete" />
                    </ListItemButton>
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
