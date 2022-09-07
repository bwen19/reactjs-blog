import React from 'react';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import { logoutThunk } from '@/redux/authSlice';
import { useAppDispatch } from '@/hooks';

// -------------------------------------------------------------------

interface IProps {
  onClose: (event: Event | React.SyntheticEvent) => void;
}

export default function LogoutListItem({ onClose }: IProps) {
  const dispatch = useAppDispatch();

  const handleLogout = async (event: Event | React.SyntheticEvent) => {
    dispatch(logoutThunk());
    onClose(event);
  };

  return (
    <ListItemButton onClick={handleLogout} sx={{ mt: 1, py: 1, borderRadius: '10px', fontSize: '14px' }}>
      <ListItemIcon>
        <LogoutOutlinedIcon sx={{ fontSize: 18 }} />
      </ListItemIcon>
      <ListItemText disableTypography primary="Logout" />
    </ListItemButton>
  );
}
