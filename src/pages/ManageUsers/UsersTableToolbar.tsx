import React, { useState } from 'react';
import { alpha, styled } from '@mui/material/styles';
import { Toolbar, Tooltip, IconButton, Typography, OutlinedInput, InputAdornment, Box } from '@mui/material';
import { DeleteOutlined, SearchOutlined } from '@mui/icons-material';

import { deleteUsers, DeleteUsersRequest } from '@/api';
import { useAlert, useConfirm } from '@/hooks';
import CreateUser from './CreateUser';
import { useUsersContext } from './usersState';

// -------------------------------------------------------------------

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  height: 80,
  display: 'flex',
  // justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

// -------------------------------------------------------------------

export default function UsersTableToolbar() {
  const { state, dispatch } = useUsersContext();
  const { selected } = state;
  const numSelected = selected.length;

  const { confirm } = useConfirm();
  const { alertMsg } = useAlert();

  const handleDeleteSelected = async () => {
    const isConfirm = await confirm('Are you sure to delete these users?');
    if (!isConfirm) return;

    try {
      const req: DeleteUsersRequest = {
        userIds: selected,
      };
      await deleteUsers(req);
      dispatch({ type: 'reload' });
    } catch (err) {
      alertMsg(err as string, 'error');
    }
  };

  const [filterName, setFilterName] = useState<string>('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setFilterName(event.target.value);
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      dispatch({ type: 'setKeyword', keyword: filterName });
    }
  };

  return (
    <StyledToolbar
      sx={{
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <>
          <Typography component="div" variant="h6" sx={{ flexGrow: 1 }}>
            {numSelected} selected
          </Typography>
          <Tooltip title="Delete all selected users">
            <IconButton color="error" onClick={handleDeleteSelected}>
              <DeleteOutlined />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <>
          <Typography component="div" variant="h6">
            Users
          </Typography>
          <Box sx={{ flexGrow: 1, ml: 3 }}>
            <OutlinedInput
              value={filterName}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              placeholder="Search user..."
              startAdornment={
                <InputAdornment position="start">
                  <SearchOutlined sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                </InputAdornment>
              }
            />
          </Box>
          <CreateUser />
        </>
      )}
    </StyledToolbar>
  );
}
