import React, { useState } from 'react';
import { alpha, styled } from '@mui/material/styles';
import { Toolbar, Tooltip, IconButton, Typography, OutlinedInput, InputAdornment, Box } from '@mui/material';
import { DeleteForeverOutlined, SearchOutlined } from '@mui/icons-material';
import { UserAction, UserState } from '@/hooks';
import { CreateUserRequest } from '@/api';
import CreateUser from './CreateUser';

// -------------------------------------------------------------------

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  height: 80,
  display: 'flex',
  // justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

// ========================// TableToolbar //======================== //

interface IProps {
  state: UserState;
  dispatch: React.Dispatch<UserAction>;
  createUser: (req: CreateUserRequest) => Promise<void>;
  deleteUsers: () => Promise<void>;
}

export default function TableToolbar(props: IProps) {
  const { state, dispatch, createUser, deleteUsers } = props;

  const { selected } = state;
  const numSelected = selected.length;

  const [filterName, setFilterName] = useState<string>('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setFilterName(event.target.value);
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      dispatch({ type: 'setParam', param: { keyword: filterName } });
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
            <IconButton onClick={deleteUsers}>
              <DeleteForeverOutlined color="warning" />
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
          <CreateUser createUser={createUser} />
        </>
      )}
    </StyledToolbar>
  );
}
